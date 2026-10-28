import React from 'react';
import { IFS } from './registry.js';
// Approval chain pattern (Patterns file, page "Approval chain" 12:157840): the reviewer flow (review → note → approve or
// request more information) and the owner flow (see each reviewer's state → push → publish / send for review again).
// IFS DS components missing from the kit: status, stat, info-hint-item, Investment-value-impact, table-review.
// Pattern composites: ApprovalChainTable, ApprovalChainPanel, ReadinessEvaluation (+ ReadinessSection, ReadinessFacts), SplitButton.

const apCx = (...a) => IFS.cx(...a);
// Controlled/uncontrolled value helper.
function useApValue(value, defaultValue, onChange) {
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const v = controlled ? value : inner;
  const set = (next, ...extra) => { if (!controlled) setInner(next); onChange && onChange(next, ...extra); };
  return [v, set];
}
// Close something when a pointer goes down outside `ref`.
function useApOutside(ref, active, onOutside) {
  React.useEffect(() => {
    if (!active) return;
    const h = e => { if (ref.current && !ref.current.contains(e.target)) onOutside(e); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [active, onOutside]);
}

/* ===================================================== status ===================================================== */
// Figma: status (12:210060 in the Patterns file; IFS DS set "status", key 84df17a7, library b0bad471) — the 32px state mark
// in the approval chain's first column. Props: type success|rejected|awaiting|empty, label (accessible name; defaults per type).
// awaiting = the reviewer is overdue ("it's time to notify the user", Figma note); empty = not acted yet.
const AP_STATUS = {
  success: { icon: 'status-success-filled', label: 'Approved' },
  rejected: { icon: 'status-error-filled', label: 'Revisions required' },
  awaiting: { icon: 'clock-filled', label: 'Awaiting, time to notify' },
  empty: { icon: null, label: 'Not acted yet' },
};
function ApprovalStatus({ type = 'empty', label, className, ...rest }) {
  const s = AP_STATUS[type] || AP_STATUS.empty;
  return (
    <span role="img" aria-label={label || s.label} className={apCx('ifs-ap-status', `ifs-ap-status--${type}`, className)} {...rest}>
      <span className="ifs-ap-status__icon">{s.icon ? <IFS.Icon name={s.icon} size={20} /> : <span className="ifs-ap-status__empty" />}</span>
    </span>
  );
}

/* ===================================================== stat ===================================================== */
// Figma: stat (12:121119) — one card of the row: quick-stat-card, or compare-quick-stat-card when `compare` is given.
// Props: title, value, description (10px caption line under the value), trend (e.g. "4.8%") + trendDirection up|down,
// compare = { from, to, fromLabel = 'Current', toLabel = 'Proposed' } (replaces value/description).
function QuickStatCard({ title, value, description, trend, trendDirection = 'up', compare, className, ...rest }) {
  return (
    <div className={apCx('ifs-quick-stat', compare && 'ifs-quick-stat--compare', className)} {...rest}>
      <div className="ifs-quick-stat__top">
        <span className="ifs-quick-stat__title">{title}</span>
        {trend != null && (
          <span className={apCx('ifs-quick-stat__trend', trendDirection === 'down' && 'ifs-quick-stat__trend--down')}>
            <IFS.Icon name={trendDirection === 'down' ? 'arrow-caret-down-filled' : 'arrow-caret-up-filled'} size={12} />{trend}
          </span>
        )}
      </div>
      {compare ? (
        <div className="ifs-quick-stat__compare">
          <div className="ifs-quick-stat__side">
            <span className="ifs-quick-stat__value ifs-quick-stat__value--from">{compare.from}</span>
            <span className="ifs-quick-stat__caption">{compare.fromLabel || 'Current'}</span>
          </div>
          <IFS.Icon name="arrow-right" size={12} className="ifs-quick-stat__arrow" />
          <div className="ifs-quick-stat__side">
            <span className="ifs-quick-stat__value">{compare.to}</span>
            <span className="ifs-quick-stat__caption">{compare.toLabel || 'Proposed'}</span>
          </div>
        </div>
      ) : (
        <div className="ifs-quick-stat__body">
          <span className="ifs-quick-stat__value">{value}</span>
          {description != null && <span className="ifs-quick-stat__caption">{description}</span>}
        </div>
      )}
    </div>
  );
}

// Figma: stat (12:121119, key c74437d8) — the executive-summary row of equal-width quick-stat cards (Figma draws 4: one compare + three plain).
// Props: items = QuickStatCard props[].
function Stat({ items = [], className, ...rest }) {
  return <div className={apCx('ifs-stat', className)} {...rest}>{items.map((it, i) => <QuickStatCard key={it.key != null ? it.key : i} {...it} />)}</div>;
}

/* ===================================================== info-hint-item ===================================================== */
// Figma: info-hint-item (12:121968, key d3dc02ed) — 16px rounded swatch + name (+ optional icon + value). Used as chart legend entries.
// Props: label, color (any CSS colour, e.g. 'var(--data-viz-alert-data-5)'), neutral (the grey "Unchanged" swatch with a border),
// icon (icon name, Figma masterIcon), value.
function InfoHintItem({ label, color, neutral, icon, value, className, style, ...rest }) {
  return (
    <div className={apCx('ifs-info-hint', value != null && 'ifs-info-hint--value', className)} style={style} {...rest}>
      <span aria-hidden="true" className={apCx('ifs-info-hint__swatch', neutral && 'ifs-info-hint__swatch--neutral')}
        style={!neutral && color ? { background: color } : undefined} />
      <span className="ifs-info-hint__name">{label}</span>
      {icon && <IFS.Icon name={icon} size={16} className="ifs-info-hint__icon" />}
      {value != null && <span className="ifs-info-hint__value">{value}</span>}
    </div>
  );
}

/* ===================================================== Investment-value-impact ===================================================== */
const IVI_TONE = {
  loss: step => `var(--data-viz-alert-data-${step || 4})`,
  gain: step => `var(--data-viz-deep-green-data-${step || 4})`,
  unchanged: () => 'var(--background-color-alpha-white-base)',
};
const IVI_METRICS = [
  { title: 'Investments re-scored', value: '1,621' },
  { title: 'Net value change', value: '-3.1%', direction: 'down', tone: 'danger' },
  { title: 'Materially impacted', value: '225' },
  { title: 'Funding-tier changes', value: '38' },
];
const IVI_BINS = [
  { label: 'Major loss', value: 51, tone: 'loss', step: 5 }, { label: 'Moderate loss', value: 60, tone: 'loss', step: 4 },
  { label: 'Minor loss', value: 84, tone: 'loss', step: 3 }, { label: 'No material change', value: 200, tone: 'unchanged' },
  { label: 'Minor gain', value: 101, tone: 'gain', step: 3 }, { label: 'Moderate gain', value: 93, tone: 'gain', step: 4 },
  { label: 'Major gain', value: 48, tone: 'gain', step: 5 },
];
const IVI_LEGEND = [
  { label: 'Loss', color: IVI_TONE.loss(5) }, { label: 'Unchanged', neutral: true }, { label: 'Gain', color: IVI_TONE.gain(5) },
];

// Figma: Investment-value-impact (12:121973, key fabd8e0b; IFS DS now publishes it as "review-data-visualisation") — the
// review card: chart header, metric strip (dividers between), a caption, a distribution column chart and an info-hint legend.
// Props: title, metrics = [{ title, value, direction up|down, tone danger|success }], description,
// bins = [{ label, value, tone loss|unchanged|gain, step 3|4|5 (colour depth), color (override) }], max (axis top, default 250),
// ticks (axis count, default 6), legend = InfoHintItem props[] (false hides), button (DataVizHeader right button),
// format(bin) → tooltip text, onBinClick(bin, i).
function InvestmentValueImpact({ title = 'Investment value impact', metrics = IVI_METRICS,
  description = "Value change measured as % of each investment's total value (NPV) under the proposed framework vs. current.",
  bins = IVI_BINS, max = 250, ticks = 6, legend = IVI_LEGEND, button, format, onBinClick, className, ...rest }) {
  const axis = Array.from({ length: ticks }, (_, i) => Math.round(max - (max / (ticks - 1)) * i));
  const tip = b => (format ? format(b) : `${b.label}: ${b.value} investments`);
  return (
    <section className={apCx('ifs-ivi', className)} aria-label={typeof title === 'string' ? title : undefined} {...rest}>
      <IFS.DataVizHeader title={title} button={button} draggable={false} />
      {metrics && metrics.length > 0 && (
        <div className="ifs-ivi__metrics">
          {metrics.map((m, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="ifs-ivi__divider" aria-hidden="true" />}
              <div className="ifs-ivi__metric">
                <span className="ifs-ivi__metric-title">{m.title}</span>
                <span className={apCx('ifs-ivi__metric-value', m.tone && `ifs-ivi__metric-value--${m.tone}`)}>
                  {m.direction && <IFS.Icon name={m.direction === 'down' ? 'arrow-caret-down-filled' : 'arrow-caret-up-filled'} size={16} />}
                  {m.value}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
      {description && <p className="ifs-ivi__text">{description}</p>}
      <div className="ifs-ivi__chart">
        <div className="ifs-ivi__axis" aria-hidden="true">{axis.map(v => <span key={v}>{v}</span>)}</div>
        <div className="ifs-ivi__plot-col">
          <div className="ifs-ivi__plot">
            <div className="ifs-ivi__lines" aria-hidden="true">{axis.map(v => <span key={v} className="ifs-ivi__line" />)}</div>
            <div className="ifs-ivi__bars" role="list" aria-label="Distribution">
              {bins.map((b, i) => {
                const h = Math.max(0, Math.min(1, b.value / max)) * 192;
                const fill = b.color || (IVI_TONE[b.tone] || IVI_TONE.unchanged)(b.step);
                return (
                  <IFS.Tooltip key={b.label} content={tip(b)}>
                    <div role="listitem" tabIndex={0} aria-label={tip(b)} className="ifs-ivi__item"
                      onClick={onBinClick ? () => onBinClick(b, i) : undefined} style={onBinClick ? { cursor: 'pointer' } : undefined}>
                      <span className="ifs-ivi__bar" style={{ height: h, background: fill }} />
                    </div>
                  </IFS.Tooltip>
                );
              })}
            </div>
          </div>
          <div className="ifs-ivi__labels" aria-hidden="true">{bins.map(b => <span key={b.label}>{b.label}</span>)}</div>
        </div>
      </div>
      {legend && <div className="ifs-ivi__legend">{legend.map((l, i) => <InfoHintItem key={i} {...l} />)}</div>}
    </section>
  );
}

/* ===================================================== table-review ===================================================== */
// "$3.1M" → 3100000, "2.6" → 2.6, "+$1.3M" → 1300000 (for sorting).
const apNum = s => {
  if (typeof s === 'number') return s;
  const str = String(s || '');
  const n = parseFloat(str.replace(/[^0-9.\-]/g, '')) || 0;
  const mult = /B\b/i.test(str) ? 1e9 : /M\b/i.test(str) ? 1e6 : /K\b/i.test(str) ? 1e3 : 1;
  return (/^\s*-/.test(str) && n > 0 ? -n : n) * mult;
};
function FromTo({ v, direction }) {
  if (!v) return null;
  return (
    <span className="ifs-table-review__fromto">
      <span>{v.from}</span><IFS.Icon name="arrow-right" size={12} />
      <span className={apCx('ifs-table-review__to', direction && `ifs-table-review__to--${direction}`)}>{v.to}</span>
    </span>
  );
}
const TR_LABELS = { name: 'Investment', type: 'Type', total: 'Total value', change: 'Value change', ratio: 'Value / cost ratio' };

// Figma: table-review (12:122378, key 8bd2618e; IFS DS now publishes it as "review-investment-table") — the grouped investment
// table on review screens: Investment, Type (white badge), Total value (from → to), Value change (▲/▼), Value / cost ratio (from → to).
// Built on the kit Table (grouping, sorting, filter icons). Property 1=Default shows the "Unchanged" group collapsed; Variant2 expanded.
// Props: rows = [{ id, group, name, type, total: { from, to }, change: { value, direction up|down }, ratio: { from, to } }],
// defaultCollapsed = group titles collapsed at first, labels = column-title overrides, onFilter(key) (filter icon on
// Investment / Type), sort / defaultSort / onSortChange, onRowClick / selectedId.
function TableReview({ rows = [], defaultCollapsed = [], labels, onFilter, sort, defaultSort, onSortChange, onRowClick, selectedId, className, ...rest }) {
  const L = { ...TR_LABELS, ...labels };
  const columns = [
    { key: 'name', title: L.name, filter: { onClick: () => onFilter && onFilter('name') }, render: r => <span className="ifs-table-review__name">{r.name}</span> },
    { key: 'type', title: L.type, filter: { onClick: () => onFilter && onFilter('type') }, render: r => r.type ? <IFS.Badge color="white" size="m">{r.type}</IFS.Badge> : null },
    { key: 'total', title: L.total, sortable: true, sortValue: r => apNum(r.total && r.total.to), render: r => <FromTo v={r.total} direction={r.change && r.change.direction} /> },
    { key: 'change', title: L.change, sortable: true, sortValue: r => apNum(r.change && r.change.value), render: r => r.change ? (
      <span className={apCx('ifs-table-review__change', r.change.direction && `ifs-table-review__change--${r.change.direction}`)}>
        {r.change.direction && <IFS.Icon name={r.change.direction === 'down' ? 'arrow-caret-down-filled' : 'arrow-caret-up-filled'} size={12} />}{r.change.value}
      </span>) : null },
    { key: 'ratio', title: L.ratio, sortable: true, sortValue: r => apNum(r.ratio && r.ratio.to), render: r => <FromTo v={r.ratio} direction={r.change && r.change.direction} /> },
    { key: '_end', title: '', width: 48, render: () => null },
  ];
  return (
    <div className={apCx('ifs-table-review', className)} {...rest}>
      <IFS.Table columns={columns} rows={rows} groupBy="group" defaultCollapsed={defaultCollapsed}
        sort={sort} defaultSort={defaultSort} onSortChange={onSortChange} onRowClick={onRowClick} selectedId={selectedId} />
    </div>
  );
}

/* ===================================================== SplitButton ===================================================== */
// Pattern helper: header main action + dropdown menu — built from Button, IconButton, Menu. Figma draws it as (Figma: button + caret icon-button, the menu is a
// single-select-list-molecule with a description line). Props: children = label, type (default primary), size (default s),
// iconLeft, disabled, onClick, items = [{ label, description, onClick, disabled }] (absent/empty = no dropdown),
// menuLabel (accessible name of the caret). Esc / outside click close the menu.
function SplitButton({ children, type = 'primary', size = 's', iconLeft, disabled, onClick, items, menuLabel = 'More actions', className }) {
  const [open, setOpen] = React.useState(false);
  const hasMenu = items && items.length > 0;
  return (
    <span className={apCx('ifs-split-button', className)}>
      <IFS.Button type={type} size={size} iconLeft={iconLeft} disabled={disabled} onClick={onClick}>{children}</IFS.Button>
      {hasMenu && <IFS.Menu open={open} onOpenChange={setOpen} width={240} align="end" label={menuLabel}
        items={items.map(it => ({ label: it.label, description: it.description, icon: it.icon, disabled: it.disabled, danger: it.danger, onClick: it.onClick ? () => it.onClick() : undefined }))}
        trigger={<IFS.IconButton type={type} size={size} icon="arrow-caret-down-filled" label={menuLabel} disabled={disabled} />} />}
    </span>
  );
}

/* ===================================================== Readiness evaluation ===================================================== */
// Pattern helper: key/value rows inside a readiness section — built from table-header/table-cell looks (Figma: tableHeader type=row + tableCell text, 40px, rounded).
// Props: rows = [[label, value, tone danger|success]] or [{ label, value, tone }].
function ReadinessFacts({ rows = [], className, ...rest }) {
  return (
    <div className={apCx('ifs-readiness-facts', className)} {...rest}>
      {rows.map((r, i) => {
        const [label, value, tone] = Array.isArray(r) ? r : [r.label, r.value, r.tone];
        return (
          <div key={i} className="ifs-readiness-facts__row">
            <span className="ifs-readiness-facts__label">{label}</span>
            <span className={apCx('ifs-readiness-facts__value', tone && `ifs-readiness-facts__value--${tone}`)}>{value}</span>
          </div>
        );
      })}
    </div>
  );
}

// Pattern helper: one collapsible readiness card — built from Badge, Counter, Icon (Figma: content-card-organism M with a caret title row and a badge-atom
// Color=False or counter-atom on the right). Props: title, badge = { label, tone danger|success|neutral, icon } or a string,
// count (counter instead of a badge), open / defaultOpen / onOpenChange, children (body: <p> text, ReadinessFacts, …).
function ReadinessSection({ title, badge, count, open, defaultOpen = false, onOpenChange, children, className, ...rest }) {
  const [isOpen, setOpen] = useApValue(open, defaultOpen, onOpenChange);
  const b = badge == null ? null : typeof badge === 'object' ? badge : { label: badge };
  const id = React.useId ? React.useId() : undefined;
  return (
    <div className={apCx('ifs-readiness-section', isOpen && 'is-open', className)} {...rest}>
      <button type="button" className="ifs-readiness-section__head" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(!isOpen)}>
        <IFS.Icon name={isOpen ? 'arrow-caret-down-filled' : 'arrow-caret-right-filled'} size={16} />
        <span className="ifs-readiness-section__title">{title}</span>
        {b && <IFS.Badge color="false" size="s" iconLeft={b.icon} className={apCx('ifs-readiness-section__badge', b.tone && `ifs-readiness-section__badge--${b.tone}`)}>{b.label}</IFS.Badge>}
        {count != null && <IFS.Counter size="m">{count}</IFS.Counter>}
      </button>
      {isOpen && children != null && <div id={id} className="ifs-readiness-section__body">{children}</div>}
    </div>
  );
}

// Pattern helper: Readiness Evaluation sidebar content — built from ProgressRing, ReadinessStatus, ReadinessSection (place it in IFS.Panel). Figma: a content card (summary title + text, then
// "Approval readiness" with a 16px progress ring and status-readiness rows) followed by ReadinessSections.
// Props: summary = { title, text }, readiness (0–100; omit to hide the head), readinessLabel (default "Approval readiness"),
// checks = [{ label, type done|warning, right }] (ReadinessStatus rows), sections = [{ id, title, badge, count, content }],
// openSections / defaultOpenSections / onOpenSectionsChange (array of ids).
function ReadinessEvaluation({ summary, readiness, readinessLabel = 'Approval readiness', checks = [], sections = [],
  openSections, defaultOpenSections = [], onOpenSectionsChange, className, ...rest }) {
  const [opened, setOpened] = useApValue(openSections, defaultOpenSections, onOpenSectionsChange);
  return (
    <div className={apCx('ifs-readiness-eval', className)} {...rest}>
      {(summary || readiness != null || checks.length > 0) && (
        <div className="ifs-readiness-card">
          {summary && <div className="ifs-readiness-card__summary">
            {summary.title && <span className="ifs-readiness-card__title">{summary.title}</span>}
            {summary.text && <p className="ifs-readiness-card__text">{summary.text}</p>}
          </div>}
          {(readiness != null || checks.length > 0) && <div className="ifs-readiness-card__checks">
            {readiness != null && <div className="ifs-readiness-card__head">{readinessLabel}
              <span className="ifs-readiness-card__pct"><IFS.ProgressRing value={readiness} size={16} label={readinessLabel} />{readiness}%</span></div>}
            {checks.map((c, i) => <IFS.ReadinessStatus key={i} type={c.type || 'done'} right={c.right}>{c.label}</IFS.ReadinessStatus>)}
          </div>}
        </div>
      )}
      {sections.map(s => (
        <ReadinessSection key={s.id} title={s.title} badge={s.badge} count={s.count} open={opened.includes(s.id)}
          onOpenChange={o => setOpened(o ? [...opened, s.id] : opened.filter(x => x !== s.id))}>{s.content}</ReadinessSection>
      ))}
    </div>
  );
}

/* ===================================================== Approval chain ===================================================== */
// Pattern helper: approval chain shell (sidebar / full / popover) — built from IconButton (Figma: sidebar-organism titled "Approval chain"; a floating card under the
// "Approval chain" header button on the reviewer screen; the content area when expanded).
// Props: mode sidebar | full | popover, collapsed (sidebar only: 84px rail), title, onExpandedChange(full: boolean)
// (diagonal expand / collapse button), onCollapsedChange(collapsed) (sidebar bar-arrow button), onClose (popover ✕),
// style (position the popover), children.
function ApprovalChainPanel({ mode = 'sidebar', collapsed, title = 'Approval chain', onExpandedChange, onCollapsedChange, onClose, children, className, style }) {
  const full = mode === 'full';
  const toggle = onCollapsedChange && mode !== 'popover' && (
    <IFS.IconButton className="ifs-apc-panel__toggle" icon="arrow-bar-right" type="ghost" size="s"
      label={collapsed ? 'Expand panel' : 'Collapse panel'} aria-expanded={!collapsed} onClick={() => onCollapsedChange(!collapsed)} />
  );
  if (collapsed && mode === 'sidebar') return <aside className={apCx('ifs-apc-panel', 'ifs-apc-panel--collapsed', className)} style={style} aria-label={title}>{toggle}</aside>;
  return (
    <aside className={apCx('ifs-apc-panel', `ifs-apc-panel--${mode}`, className)} style={style} aria-label={typeof title === 'string' ? title : undefined}
      role={mode === 'popover' ? 'dialog' : undefined}>
      <div className="ifs-apc-panel__header">
        <h2 className="ifs-apc-panel__title">{title}</h2>
        <div className="ifs-apc-panel__buttons">
          {onExpandedChange && <IFS.IconButton icon={full ? 'arrow-diagonal-collapse' : 'arrow-diagonal-expand'} type="ghost" size="s"
            label={full ? 'Exit full screen' : 'Full screen'} onClick={() => onExpandedChange(!full)} />}
          {mode === 'popover' && onClose && <IFS.IconButton icon="system-close" type="ghost" size="s" label="Close" onClick={onClose} />}
          {toggle}
        </div>
      </div>
      <div className="ifs-apc-panel__content ifs-scroll">{children}</div>
    </aside>
  );
}

const APC_STATES = [
  { value: 'success', label: 'Approved' }, { value: 'awaiting', label: 'Awaiting' },
  { value: 'rejected', label: 'Rejected' }, { value: 'revisions', label: 'Revisions required' },
];
const apcMatch = (status, sel) => sel.some(s => (s === 'awaiting' ? status === 'awaiting' || status === 'empty' || !status : s === status));
const apcHours = (pushedAt, now, cooldown) => Math.max(0, cooldown * 36e5 - (now - pushedAt));
const apcLeft = ms => (ms < 36e5 ? `${Math.max(1, Math.ceil(ms / 6e4))}m` : `${Math.ceil(ms / 36e5)}h`);

// The note cell: text (with Edit / Delete for its author), "+ Add note", or the inline editor (saved on click outside).
function ApcNote({ row, canAdd, canEdit, editing, onStartEdit, onSave, onCancel, onDelete }) {
  const [draft, setDraft] = React.useState(row.note ? row.note.text : '');
  const ref = React.useRef(null);
  React.useEffect(() => { if (editing) setDraft(row.note ? row.note.text : ''); }, [editing]);
  const commit = React.useCallback(() => onSave(draft), [draft, onSave]);
  useApOutside(ref, editing, commit);
  if (editing) {
    return (
      <div ref={ref} className="ifs-apc__editor" onKeyDown={e => { if (e.key === 'Escape') { e.stopPropagation(); onCancel(); } }}>
        <IFS.TextArea size="m" autoFocus value={draft} onChange={v => setDraft(v)} placeholder="Add a note for this approver" aria-label="Note" />
      </div>
    );
  }
  if (row.note && row.note.text) {
    return (
      <div className={apCx('ifs-apc__note', canEdit && 'ifs-apc__note--editable')} title={row.note.text}>
        <span className="ifs-apc__note-text">{row.note.text}</span>
        {canEdit && <span className="ifs-apc__note-menu"><IFS.ActionMenu label="Note actions" items={[
          { label: 'Edit', icon: 'system-edit-rename', onClick: onStartEdit },
          { label: 'Delete', icon: 'system-trash-delete', destructive: true, onClick: onDelete },
        ]} /></span>}
      </div>
    );
  }
  return canAdd ? <IFS.Button type="ghost" size="s" iconLeft="system-plus" onClick={onStartEdit}>Add note</IFS.Button> : null;
}

// Pattern helper: the approval chain table with note/push/filter rules — built from ApprovalStatus, Avatar, Button, ActionMenu, Popover, Search, Chip, TextArea, Tooltip, EmptyState. Figma draws it on this page — a table with a status rail (status + dashed connector),
// USER (filter when > 3 approvers), NOTE, and in the full view COMMENT, LAST NOTIFIED and an action column.
// Props:
//   approvers / defaultApprovers / onChange(approvers) — [{ id, name, role, avatar (Avatar props), status success|awaiting|empty|rejected|revisions,
//     note: { text, authorId } | null, comment, lastNotified, pushedAt (ms), replaced: { name, avatar } (previous reviewer), action: { label, icon, onClick } }]
//   currentUserId (adds "(You)", decides note rights), ownerId (the investment owner; owner = currentUserId === ownerId),
//   view compact | full, details (full view: force the COMMENT / LAST NOTIFIED / action columns; default = when any row has that data), filterable (default: more than 3 approvers), onPush(approver) (owner's manual reminder on an awaiting row:
//   shows the "Reminder sent." toast, stamps Last notified, then "Notified" + live countdown tooltip for pushCooldownHours, default 24),
//   onNoteChange(approver, note|null, previous).
// Rules built in (Figma notes): approvers add a note to their own row; the owner adds a note to any approver's row; only a
// note's author can edit or delete it; the filter applies live (state chips + name/role search, Clear all, "No results found").
function ApprovalChainTable({ approvers, defaultApprovers = [], onChange, currentUserId, ownerId, view = 'compact', details, filterable,
  onPush, onNoteChange, pushCooldownHours = 24, className, ...rest }) {
  const [list, setList] = useApValue(approvers, defaultApprovers, onChange);
  const [editing, setEditing] = React.useState(null);
  const [query, setQuery] = React.useState('');
  const [states, setStates] = React.useState([]);
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => { const t = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(t); }, []);
  // Full view adds COMMENT / LAST NOTIFIED / actions once any approver has that data (Figma: the owner's expanded chain shows only
  // USER + NOTE until reviewers comment or get notified); `details` forces them on/off.
  const full = view === 'full' && (details != null ? details : list.some(r => r.comment || r.lastNotified || r.action || r.status === 'awaiting'));
  const isOwner = ownerId != null && ownerId === currentUserId;
  const showFilter = filterable != null ? filterable : list.length > 3;
  const active = (states.length ? 1 : 0) + (query.trim() ? 1 : 0);
  const q = query.trim().toLowerCase();
  const rows = list.filter(r => (!states.length || apcMatch(r.status, states))
    && (!q || `${r.name} ${r.role || ''}`.toLowerCase().includes(q)));
  const update = (id, patch) => setList(list.map(r => (r.id === id ? { ...r, ...patch } : r)));
  const cols = full ? 'minmax(0,1.02fr) minmax(0,1fr) minmax(0,1fr) 140px 101px' : 'minmax(0,1fr) minmax(0,1fr)';
  const viewClass = view === 'full' ? 'full' : 'compact';

  const saveNote = row => text => {
    setEditing(null);
    const prev = row.note || null;
    const t = (text || '').trim();
    if (!t) { if (!prev) return; }
    if (prev && t === prev.text) return;
    const note = t ? { text: t, authorId: currentUserId } : null;
    update(row.id, { note });
    onNoteChange && onNoteChange(row, note, prev);
    if (prev) IFS.toast({ title: note ? 'Note updated' : 'Note deleted', duration: 4000 });
  };
  const deleteNote = row => {
    const prev = row.note;
    update(row.id, { note: null });
    onNoteChange && onNoteChange(row, null, prev);
    IFS.toast({ title: 'Note deleted', duration: 4000 });
  };

  const filter = showFilter && (
    <IFS.Popover align="start" width={240} title="Filter" count={active || undefined} showClose={false}
      trigger={<button type="button" aria-label="Filter approvers" className={apCx('ifs-table-filter', active > 0 && 'ifs-table-filter--applied')}><IFS.Icon name="system-filter" size={16} /></button>}>
      <div className="ifs-apc__filter">
        {active > 0 && <span className="ifs-apc__filter-clear"><IFS.Button type="ghost" size="s" onClick={() => { setQuery(''); setStates([]); }}>Clear all</IFS.Button></span>}
        <IFS.Search placeholder="Search by name, role..." value={query} onChange={v => setQuery(v)} />
        <div className="ifs-apc__chips" role="group" aria-label="Approval state">
          <IFS.Chip selected={!states.length} onChange={() => setStates([])}>All</IFS.Chip>
          {APC_STATES.map(s => <IFS.Chip key={s.value} selected={states.includes(s.value)}
            onChange={on => setStates(on ? [...states, s.value] : states.filter(x => x !== s.value))}>{s.label}</IFS.Chip>)}
        </div>
      </div>
    </IFS.Popover>
  );

  return (
    <div className={apCx('ifs-apc', `ifs-apc--${viewClass}`, className)} style={{ '--apc-cols': cols }} role="table" aria-label="Approval chain" {...rest}>
      <div className="ifs-apc__head" role="row">
        <span role="columnheader" aria-label="Status" />
        <span role="columnheader" className="ifs-apc__th">User{filter}</span>
        <span role="columnheader" className="ifs-apc__th">Note</span>
        {full && <><span role="columnheader" className="ifs-apc__th">Comment</span>
          <span role="columnheader" className="ifs-apc__th">Last notified</span><span role="columnheader" className="ifs-apc__th" aria-label="Actions" /></>}
      </div>
      {rows.length === 0 && <div className="ifs-apc__empty"><IFS.EmptyState cause="no-results" size="section" heading="No results found"
        body="Try another name or state." /></div>}
      {rows.map(r => {
        const you = r.id === currentUserId;
        const status = r.status === 'revisions' ? 'rejected' : (r.status || 'empty');
        const canAdd = !r.note && (isOwner ? r.id !== ownerId : you);
        const canEdit = !!(r.note && r.note.authorId === currentUserId);
        const pushedLeft = r.pushedAt ? apcHours(r.pushedAt, now, pushCooldownHours) : 0;
        return (
          <div key={r.id} className="ifs-apc__row" role="row">
            <span className="ifs-apc__rail" role="cell"><ApprovalStatus type={status} /></span>
            <div className="ifs-apc__cell" role="cell">
              {r.replaced && <span className="ifs-apc__replaced">
                <IFS.Avatar size="s" name={r.replaced.name} type="auto" status="online" {...r.replaced.avatar} />
                <IFS.Icon name="arrow-chevron-right" size={16} />
              </span>}
              <IFS.Avatar size="s" name={r.name} type="auto" {...r.avatar} />
              <span className="ifs-apc__user">
                <span className="ifs-apc__name">{r.name}{you ? ' (You)' : ''}</span>
                {r.role && <span className="ifs-apc__role">{r.role}</span>}
              </span>
              {r.replaced && <IFS.Tooltip type="left" content="This reviewer was replaced by another stakeholder.">
                <span className="ifs-apc__info" tabIndex={0} aria-label={`Replaced ${r.replaced.name}`}><IFS.Icon name="system-info-hint" size={16} /></span>
              </IFS.Tooltip>}
            </div>
            <div className={apCx('ifs-apc__cell', (editing === r.id || (r.note && r.note.text)) && 'ifs-apc__cell--has-note')} role="cell">
              <ApcNote row={r} canAdd={canAdd} canEdit={canEdit} editing={editing === r.id}
                onStartEdit={() => setEditing(r.id)} onCancel={() => setEditing(null)} onSave={saveNote(r)} onDelete={() => deleteNote(r)} />
            </div>
            {full && <>
              <div className="ifs-apc__cell ifs-apc__cell--text" role="cell">{r.comment}</div>
              <div className="ifs-apc__cell ifs-apc__cell--text" role="cell"><span className="ifs-apc__date">{r.lastNotified}</span></div>
              <div className="ifs-apc__cell ifs-apc__action" role="cell">
                {isOwner && status === 'awaiting' && (pushedLeft > 0
                  ? <IFS.Tooltip type="bottom" content={`You can push again in ${apcLeft(pushedLeft)}`}>
                      <span className="ifs-apc__tip" tabIndex={0}><IFS.Button type="secondary" size="s" iconLeft="system-notification" disabled>Notified</IFS.Button></span>
                    </IFS.Tooltip>
                  : <IFS.IconButton type="secondary" size="s" icon="system-notification" label={`Push ${r.name}`}
                      onClick={() => { const at = Date.now(); setNow(at); update(r.id, { pushedAt: at, lastNotified: new Date(at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) });
                        IFS.toast({ title: 'Reminder sent.', description: `You can push again in ${pushCooldownHours}h.`, duration: 4000 }); onPush && onPush(r); }} />)}
                {r.action && <IFS.Button type="secondary" size="s" iconLeft={r.action.icon} onClick={() => r.action.onClick && r.action.onClick(r)}>{r.action.label}</IFS.Button>}
              </div>
            </>}
          </div>
        );
      })}
    </div>
  );
}

Object.assign(IFS, { ApprovalStatus, QuickStatCard, Stat, InfoHintItem, InvestmentValueImpact, TableReview, SplitButton,
  ReadinessFacts, ReadinessSection, ReadinessEvaluation, ApprovalChainPanel, ApprovalChainTable });
export { ApprovalStatus, QuickStatCard, Stat, InfoHintItem, InvestmentValueImpact, TableReview, SplitButton,
  ReadinessFacts, ReadinessSection, ReadinessEvaluation, ApprovalChainPanel, ApprovalChainTable };
