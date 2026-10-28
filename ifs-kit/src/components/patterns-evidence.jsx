import React from 'react';
import { IFS } from './registry.js';

// Evidence Chain pattern (Patterns › Evidence Chain 12:339982, section 31:74911). Rules live in guide/patterns/evidence.md.

const cx = (...a) => a.filter(Boolean).join(' ');
function useCtl(value, def, onChange) {
  const [inner, setInner] = React.useState(def);
  const controlled = value !== undefined;
  return [controlled ? value : inner, (v, ...r) => { if (!controlled) setInner(v); onChange && onChange(v, ...r); }];
}

/* ------------------------------------------------------------------------------------------ */
// Figma: source-card (fafdbabda4e12538ef46da239997daad283c2291; IFS DS 1440:5362). The Patterns file instances older copies
// of the set: "Property 1=Default" (file + quote + badge, 12:192928), "Variant2" (file + plain text + badge, 12:192934),
// "Variant3" (user + quote, 31:74319) and a second "source card" set "State=Default" (label + quote, 31:74840).
// One piece of evidence behind a Cooper value: where it came from, what it says, and what it supports.
// Props: type file|user (Figma Type) — file: `title` on a Tertiary S button (icon, default system-file; null = label only),
//   onOpen opens the source; user: `user` = Avatar props ({ name, initials, type }) + name (Heading/H3/medium).
// content quote|text (Figma Content: quote = left rule + inset, text = plain paragraph), children = the excerpt,
// badge = label (or { label, icon }) of the claim it supports (badge-atom black S, info colour, system-access-point),
// loading (Figma Loading=True skeleton).
function SourceCard({ type = 'file', title, icon = 'system-file', onOpen, user, content = 'quote', children, badge, loading, className, ...rest }) {
  if (loading) {
    return (
      <div className={cx('ifs-source-card', 'ifs-source-card--loading', className)} aria-busy="true" {...rest}>
        <span className="ifs-skeleton-bar" style={{ width: 160, height: 24 }} />
        <span className="ifs-skeleton-bar" style={{ width: '100%', height: 16 }} />
        <span className="ifs-skeleton-bar" style={{ width: '62%', height: 16 }} />
      </div>
    );
  }
  const b = badge == null ? null : typeof badge === 'string' ? { label: badge } : badge;
  return (
    <div className={cx('ifs-source-card', `ifs-source-card--${type}`, className)} {...rest}>
      <div className="ifs-source-card__head">
        {type === 'user' && user ? <>
          <IFS.Avatar size="s" type="auto" {...user} />
          <span className="ifs-source-card__name">{user.name}</span>
        </> : <IFS.Button type="tertiary" size="s" iconLeft={icon || undefined} onClick={onOpen} title={typeof title === 'string' ? title : undefined}>{title}</IFS.Button>}
      </div>
      {children != null && <p className={cx('ifs-source-card__text', content === 'quote' && 'ifs-source-card__text--quote')}>{children}</p>}
      {b && <IFS.Badge className="ifs-source-card__badge" color="info" size="s" iconLeft={b.icon === undefined ? 'system-access-point' : b.icon || undefined}>{b.label}</IFS.Badge>}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: the "Slot" blocks of the Evidence chain drawer (Patterns 31:76667 / 31:76673 / 31:76678): a 1px top rule, a
// Caption/regular-UPPER title and a list of source cards (8px apart). Titles in Figma: "Why it's flagged", "Decisions",
// "Considered but not included". Props: title, items = [SourceCard props + key] or children.
function EvidenceSection({ title, items, children, className, ...rest }) {
  const id = React.useId ? React.useId() : undefined;
  return (
    <section className={cx('ifs-evidence-section', className)} aria-labelledby={id} {...rest}>
      <h3 id={id} className="ifs-evidence-section__title">{title}</h3>
      <ul className="ifs-evidence-section__list">
        {items ? items.map((it, i) => { const { key, ...p } = it; return <li key={key || i}><SourceCard {...p} /></li>; })
          : React.Children.map(children, (c, i) => c && <li key={i}>{c}</li>)}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: Peer benchmark tab of the Evidence chain drawer (Patterns 31:77627; empty 297:76637).
// Props: description (Body/M, secondary), summary = [{ label, value }] (key/value rows under "Summary"),
// scope = { label, value, legend: [{ label, color }], columns: [{ label, segments: [{ value, color }] }] (top → bottom),
//   max (y-axis top, default 100), ticks (default 100…0 by 20), yTitle ('Number of utilities'), xTitle ('Years') },
// empty (true → "Peer benchmark isn't available" empty state; no action — nothing the user does fills it),
// emptyHeading / emptyBody to override the copy.
function PeerBenchmark({ description, summary = [], scope, empty, emptyHeading = 'Peer benchmark isn’t available',
  emptyBody = 'There are too few comparable ideas to compare fairly. Cooper won’t show a benchmark it can’t stand behind.', className, ...rest }) {
  if (empty) {
    return (
      <div className={cx('ifs-peer-benchmark', 'ifs-peer-benchmark--empty', className)} {...rest}>
        <IFS.EmptyState cause="empty-container" size="section" icon="node" heading={emptyHeading} body={emptyBody} />
      </div>
    );
  }
  const max = (scope && scope.max) || 100;
  const ticks = (scope && scope.ticks) || [100, 80, 60, 40, 20, 0];
  return (
    <div className={cx('ifs-peer-benchmark', className)} {...rest}>
      {description && <p className="ifs-peer-benchmark__desc">{description}</p>}
      {summary.length > 0 && <>
        <div className="ifs-peer-benchmark__label">Summary</div>
        <dl className="ifs-peer-benchmark__rows">
          {summary.map(r => <div key={r.label} className="ifs-peer-benchmark__row"><dt className="ifs-peer-benchmark__key">{r.label}</dt><dd className="ifs-peer-benchmark__value">{r.value}</dd></div>)}
          {scope && <div className="ifs-peer-benchmark__scope">
            <div className="ifs-peer-benchmark__row"><dt className="ifs-peer-benchmark__key">{scope.label}</dt><dd className="ifs-peer-benchmark__value">{scope.value}</dd></div>
            {scope.legend && <div className="ifs-peer-benchmark__legend">{scope.legend.map(l => <IFS.LegendSwatch key={l.label} color={l.color} label={l.label} />)}</div>}
            {scope.columns && <figure className="ifs-peer-benchmark__chart" style={{ margin: 0 }} aria-label={`${scope.label} by ${scope.xTitle || 'Years'}`}>
              <div className="ifs-peer-benchmark__ytitle"><span>{scope.yTitle || 'Number of utilities'}</span></div>
              <div className="ifs-peer-benchmark__ticks" aria-hidden="true">{ticks.map(t => <span key={t}>{t}</span>)}</div>
              <div className="ifs-peer-benchmark__plot">
                <div className="ifs-peer-benchmark__bars">
                  <div className="ifs-peer-benchmark__grid" aria-hidden="true">{ticks.map(t => <span key={t} />)}</div>
                  {scope.columns.map(c => {
                    const total = c.segments.reduce((s, x) => s + x.value, 0);
                    const label = `${c.label}: ${c.segments.map((s, i) => `${(scope.legend && scope.legend[scope.legend.length - 1 - i] || {}).label || ''} ${s.value}`).join(', ')}`;
                    return <IFS.VerticalBarChartItem key={c.label} label={label} width="auto" height={148} value={total} max={max}
                      segments={c.segments.map(s => ({ value: total ? s.value / total : 0, fill: s.color }))} role="img" />;
                  })}
                </div>
                <div className="ifs-peer-benchmark__x" aria-hidden="true">{scope.columns.map(c => <span key={c.label}>{c.label}</span>)}</div>
                <div className="ifs-peer-benchmark__xtitle" aria-hidden="true">{scope.xTitle || 'Years'}</div>
              </div>
            </figure>}
          </div>}
        </dl>
      </>}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Confidence zones (Figma dev note 31:79279): <70 % Reject, 70–90 % Review, >90 % Approve. Boundaries follow EvidenceStrength
// (value < 70 reject, < 90 review, else approve) so the bar and the behaviour never disagree. Returns { zone, label, autoApply, behaviour } for a value. Thresholds are the EvidenceStrength defaults.
function evidenceZone(value, thresholds = [70, 90]) {
  const [t1, t2] = thresholds;
  if (value < t1) return { zone: 'reject', label: 'Reject', autoApply: false, fills: false,
    behaviour: 'Cooper doesn’t apply the value — a reviewer decides manually.' };
  if (value < t2) return { zone: 'review', label: 'Review', autoApply: false, fills: true,
    behaviour: 'Cooper proposes the value and fills it in, then waits for a human to check it.' };
  return { zone: 'approve', label: 'Approve', autoApply: true, fills: true,
    behaviour: 'Cooper applies the value automatically; the Evidence chain stays open to inspection.' };
}

// Figma: the circle Tertiary S icon-button with the Cooper evidence icon (content-card-organism show-icon-button,
// panel-organism show-evidence-chain). The trigger sits next to every field, block or card Cooper filled in.
// Props: onClick, active (the chain for this value is open → aria-expanded), label (accessible name).
function EvidenceButton({ onClick, active, label = 'Evidence chain', className, ...rest }) {
  return <IFS.IconButton icon="cooper-evidence-icon" label={label} type="tertiary" size="s" shape="circle" aria-expanded={active == null ? undefined : !!active}
    data-state={active ? 'pressed' : undefined} className={className} onClick={onClick} {...rest} />;
}

/* ------------------------------------------------------------------------------------------ */
// Figma: drawer-organism "Evidence chain" (Patterns 31:76682; same content in modal-organism 297:76633 on the empty-state frames).
// The floating drawer that shows the sources and reasoning steps behind one Cooper value (glass box).
// Header "Evidence chain" + ✕; content: EvidenceStrength (no title; captions <70% Reject · {value}% Review · >90% Approve),
// SegmentedControl S Rationale | Peer benchmark, then the tab:
//   Rationale = EvidenceSection list (`rationale` = [{ title, items: [SourceCard props] }]) — never empty;
//   Peer benchmark = PeerBenchmark props (`benchmark`; null/{ empty: true} → empty state, tab stays selectable).
// Props: open / defaultOpen / onOpenChange (✕ and Esc close), value (confidence %), thresholds,
// tab / defaultTab ('rationale') / onTabChange, title, floating (slide-in animation), className, style.
// Placement is the screen's job: it floats over the content, top-right, 12px in (see the pattern screens).
function EvidenceChainDrawer({ open, defaultOpen = true, onOpenChange, value = 87, thresholds = [70, 90], tab, defaultTab = 'rationale', onTabChange,
  rationale = [], benchmark, title = 'Evidence chain', floating = true, className, style }) {
  const [isOpen, setOpen] = useCtl(open, defaultOpen, onOpenChange);
  const [cur, setCur] = useCtl(tab, defaultTab, onTabChange);
  const ref = React.useRef();
  React.useEffect(() => {
    if (!isOpen) return;
    const el = ref.current;
    if (el && el.querySelector) { const d = el.querySelector('.ifs-drawer'); d && d.focus({ preventScroll: true }); }
  }, [isOpen]);
  if (!isOpen) return null;
  const [t1, t2] = thresholds;
  const z = evidenceZone(value, thresholds);
  const labels = [`<${t1}% Reject`, z.zone === 'review' ? `${value}% Review` : `${t1}–${t2}% Review`, `>${t2}% Approve`];
  const ids = { r: 'ifs-ec-rationale', b: 'ifs-ec-benchmark' };
  return (
    <div ref={ref} className={cx('ifs-evidence-chain-wrap', floating && 'ifs-evidence-chain--floating')} style={{ display: 'flex', ...style }}
      onKeyDown={e => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false); } }}>
      <IFS.Drawer inline title={title} collapsible={false} onOpenChange={v => { if (!v) setOpen(false); }} className={cx('ifs-evidence-chain', className)}>
        <IFS.EvidenceStrength value={value} thresholds={thresholds} min={Math.max(0, t1 - (t2 - t1))} labels={labels} title={`Confidence — ${z.label}`} />
        <IFS.SegmentedControl size="s" fullWidth value={cur} onChange={setCur} aria-label="Evidence view"
          options={[{ value: 'rationale', label: 'Rationale' }, { value: 'benchmark', label: 'Peer benchmark' }]} />
        <div className="ifs-evidence-chain__panel" id={ids.r} hidden={cur !== 'rationale'}>
          {rationale.map(s => <EvidenceSection key={s.title} title={s.title} items={s.items} />)}
        </div>
        <div className="ifs-evidence-chain__panel" id={ids.b} hidden={cur !== 'benchmark'}>
          <PeerBenchmark {...(benchmark || { empty: true })} />
        </div>
      </IFS.Drawer>
    </div>
  );
}

Object.assign(IFS, { SourceCard, EvidenceSection, PeerBenchmark, EvidenceButton, EvidenceChainDrawer, evidenceZone });
export { SourceCard, EvidenceSection, PeerBenchmark, EvidenceButton, EvidenceChainDrawer, evidenceZone };
