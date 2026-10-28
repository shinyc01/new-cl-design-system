import React from 'react';
import ReactDOM from 'react-dom';
import { IFS } from './registry.js';

// Widget Builder pattern (IFS Design System Patterns › Widget Builder, page 331:492638).
// IFS DS components owned here: StatCardsRow, PreviewWidgetCard, WidgetCard, ResizeHandle, DropIndicator, WidgetViewChangePosition.
// Pattern components: WidgetFrame, WidgetBoard (the grid engine: rows, Auto/Fill widths, resize, drag & drop, undo), WidgetsDrawer.

const { useState, useRef, useEffect, useLayoutEffect, useCallback } = React;
const cx = (...a) => a.filter(Boolean).join(' ');

/* ------------------------------------------------------------------------------------------ */
// Figma: stat-cards-row (key 88ffaeba129d4876c6ded6e6f3bbe9e983a8b46c; Patterns copy 12:104002)
// A row of stat-card-organism (StatCard). Props: rows 1 | 2 (Figma Type "1 row" = all cards in one line, equal width;
// "2 rows" = two per line), cards = [StatCard props] (Figma draws 4), children = extra cards/nodes.
function StatCardsRow({ rows = 1, cards = [], children, className, ...rest }) {
  return (
    <div className={cx('ifs-stat-cards-row', `ifs-stat-cards-row--${rows === 2 ? 2 : 1}`, className)} {...rest}>
      {cards.map((c, i) => <IFS.StatCard key={c.key ?? i} {...c} />)}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: preview-widget-card-organism (key c30262b5a98acb4175dc9c5a891d9198ce782de6; Patterns copy 331:492728)
// The thumbnail inside a widget card: a 7px uppercase heading over a skeleton of the chart the widget adds.
// Figma draws the skeleton as a raster image; here it is drawn with blank blocks (no data, never focusable).
// Props: type strategic-objectives | framework-coverage | portfolio | investment-value, title (heading; defaults per type).
const PREVIEW_TITLES = {
  'strategic-objectives': 'Strategic objectives breakdown',
  'framework-coverage': 'Framework coverage by measure type',
  portfolio: 'Portfolio under this framework',
  'investment-value': 'Investment value',
};
function PreviewWidgetCard({ type = 'strategic-objectives', title, className, ...rest }) {
  const sk = (k, s) => <i key={k} className="ifs-preview-widget__sk" style={s} />;
  let body;
  if (type === 'framework-coverage') {
    body = <div className="ifs-preview-widget__donut-row">
      <span className="ifs-preview-widget__donut" />
      <span className="ifs-preview-widget__legend">{[56, 80, 42, 94, 32, 62].map((w, i) => <span key={i}><i className="ifs-preview-widget__sk ifs-preview-widget__dot" />{sk('l', { width: w })}</span>)}</span>
    </div>;
  } else if (type === 'portfolio') {
    body = <div className="ifs-preview-widget__table">
      {['[Your company]', 'Peer avg', 'Best in class'].map(l => <div key={l} className="ifs-preview-widget__trow"><span className="ifs-preview-widget__tlabel">{l}</span>{[0, 1, 2, 3, 4].map(i => sk(i, { height: 24 }))}</div>)}
      <div className="ifs-preview-widget__axis ifs-preview-widget__axis--center">{[0, 1, 2, 3, 4].map(i => sk(i, { width: 56 }))}</div>
    </div>;
  } else if (type === 'investment-value') {
    const bars = [[-60, 172], [-17, 72], [8, 100], [18, 80], [60, 86], [36, 100]];
    body = <div className="ifs-preview-widget__diverging">
      <div className="ifs-preview-widget__dlabels">{bars.map(([, w], i) => sk(i, { width: w }))}</div>
      <div className="ifs-preview-widget__dplot">
        {bars.map(([v], i) => <span key={i} className="ifs-preview-widget__drow">
          <i className={cx('ifs-preview-widget__sk', i === bars.length - 1 && 'ifs-preview-widget__sk--outline')} style={v < 0 ? { right: '50%', width: `${-v}%` } : { left: '50%', width: `${v / 2}%` }} />
        </span>)}
      </div>
    </div>;
  } else {
    body = <div className="ifs-preview-widget__grid">
      <div className="ifs-preview-widget__yaxis">{['100%', '80%', '60%', '40%', '20%', '0'].map(t => <span key={t}>{t}</span>)}</div>
      <div className="ifs-preview-widget__cols">{[0, 1, 2, 3, 4].map(c => <span key={c} className="ifs-preview-widget__col">{[0, 1, 2, 3].map(r => sk(r))}</span>)}</div>
      <div className="ifs-preview-widget__axis">{[0, 1, 2, 3, 4].map(i => sk(i))}</div>
    </div>;
  }
  return (
    <div aria-hidden="true" className={cx('ifs-preview-widget', `ifs-preview-widget--${type}`, className)} {...rest}>
      <span className="ifs-preview-widget__title">{title ?? PREVIEW_TITLES[type]}</span>
      {body}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: widget-card-organism (key 7e67813d92e4e29cec4c7b5b790211a2cdcf1531; Patterns copy 331:492745)
// One entry in the Widgets drawer: title, description, "+ Add" (Secondary S) and a preview.
// Figma Number=1…4 picks the preview (PreviewWidgetCard type); State=Drag is the card lifted under the cursor.
// Props: title, description, preview (PreviewWidgetCard type or a node), previewTitle, addLabel (default "Add"), onAdd,
// state default | drag, badge (Badge props; Figma badge-atom, hidden by default), onGrab(event) = pointer-down on the card
// (start a drag; the card body is the grab area — Figma shows the grab cursor over the preview).
function WidgetCard({ title, description, preview = 'strategic-objectives', previewTitle, addLabel = 'Add', onAdd, state, badge, onGrab, className, style, ...rest }) {
  const drag = state === 'drag';
  return (
    <div data-state={state} className={cx('ifs-widget-card', drag && 'ifs-widget-card--drag', onGrab && 'ifs-widget-card--grabbable', className)} style={style}
      onPointerDown={onGrab ? e => { if (e.button === 0 && !e.target.closest('button')) onGrab(e); } : undefined} {...rest}>
      <div className="ifs-widget-card__head">
        <div className="ifs-widget-card__text">
          <div className="ifs-widget-card__title">
            {drag && <IFS.Icon name="system-drag-and-drop" size={12} className="ifs-widget-card__drag" />}
            <span>{title}</span>
            {badge && <IFS.Badge size="m" {...badge} />}
          </div>
          {description != null && <div className="ifs-widget-card__desc">{description}</div>}
        </div>
        <IFS.Button type="secondary" size="s" iconLeft="system-plus" onClick={onAdd}>{addLabel}</IFS.Button>
      </div>
      {typeof preview === 'string' ? <PreviewWidgetCard type={preview} title={previewTitle} /> : preview}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: resize-handle (key 190c6106f062702dcf8eefb3cab150c14bc6d4ed; Patterns copy 413:44028)
// "Arrows show only the directions that are still possible" (Figma description).
// Props: arrows both | right | left (Figma Both / Right only / Left only), none (no arrows: dragging, or nothing possible).
// 22×64: a 3px white/500 bar with the arrows centred on it.
function ResizeHandle({ arrows = 'both', className, style, ...rest }) {
  return (
    <span aria-hidden="true" className={cx('ifs-resize-handle', className)} style={style} {...rest}>
      <span className="ifs-resize-handle__bar" />
      {(arrows === 'both' || arrows === 'left') && <IFS.Icon name="arrow-left" size={12} className="ifs-resize-handle__arrow ifs-resize-handle__arrow--left" />}
      {(arrows === 'both' || arrows === 'right') && <IFS.Icon name="arrow-right" size={12} className="ifs-resize-handle__arrow ifs-resize-handle__arrow--right" />}
    </span>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: drop-indicator-atom (key f78ffb9697f561fefbb73cd30090fb5e9adc8501; Patterns copy 413:43575)
// The thin purple line that marks where a dragged widget would land: a 4px ring + 1px line (border/accent-purple).
// Props: orientation horizontal (between rows → new row; Figma's only variant) | vertical (inside a row → insert; the
// pattern notes ask for it — drawn as the same atom turned 90°).
function DropIndicator({ orientation = 'horizontal', className, style, ...rest }) {
  return (
    <span aria-hidden="true" className={cx('ifs-drop-indicator', `ifs-drop-indicator--${orientation}`, className)} style={style} {...rest}>
      <i className="ifs-drop-indicator__dot" /><i className="ifs-drop-indicator__line" />
    </span>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: widget-view-change-position (Patterns local component 331:509936)
// The compact chip a widget collapses into while its position is being changed (follows the cursor).
// Props: title (Label/L/UPPER, text/tertiary). The ghost icon-button carries the drag mark.
function WidgetViewChangePosition({ title, className, ...rest }) {
  return (
    <div className={cx('ifs-widget-chip', className)} {...rest}>
      <span className="ifs-icon-button ifs-icon-button--ghost ifs-icon-button--s ifs-icon-button--square" aria-hidden="true"><IFS.Icon name="system-drag-and-drop" size={16} /></span>
      <span className="ifs-widget-chip__title">{title}</span>
    </div>
  );
}

/* ========================================================================================== */
/* Pattern components                                                                          */
/* ========================================================================================== */

// Widget ⋮ menu items → Menu items. A size submenu row draws its column span as bars before the label.
const wbMenuItems = items => items.map(it => ({ label: it.label, icon: it.icon, disabled: it.disabled, danger: it.danger,
  onClick: it.onClick ? () => it.onClick() : undefined,
  items: it.items && it.items.map(sz => ({ label: sz.label, disabled: sz.disabled, selected: !!sz.selected, onClick: sz.onClick ? () => sz.onClick() : undefined,
    prefix: <span className={cx('wb-size-option__bars', sz.selected && 'is-selected')} aria-hidden="true">{[0, 1, 2].map(i => <i key={i} className={cx(i < sz.span && 'is-on')} />)}</span> })) }));

// Pattern: WidgetFrame — the frame every widget on a dashboard / report is drawn in. It is the kit's chart frame
// (DataVizCard variant chart: 6px padding, uppercase header, Cooper button; on hover ⋮⋮ + "Edit with Cooper") plus the
// widget ⋮ menu. Figma draws widgets as content-card-organism (Size M, 6px padding) with this header in its top slot.
// Props: title, children (body), state hover | drag | ghost (forced), menu = [{ label, icon, onClick, disabled, items }],
// onEditWithCooper, onCooper, grabProps (spread on the ⋮⋮ handle), bare (body has no padding — kit charts bring their own; a single
// component child gets `bare` too, so a kit chart drops its own frame and header: DataVizCard bare).
function WidgetFrame({ title, children, state, menu, onEditWithCooper, onCooper, grabProps, bare, className, style, ...rest }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const forcedHover = state === 'hover' || menuOpen;
  return (
    <section aria-label={typeof title === 'string' ? title : undefined} data-state={forcedHover ? 'hover' : state}
      className={cx('ifs-dv-card', 'ifs-dv-card--chart', 'wb-frame', forcedHover && 'ifs-dv-card--hover', state === 'drag' && 'wb-frame--drag',
        state === 'ghost' && 'wb-frame--ghost', bare && 'wb-frame--bare', className)} style={style} {...rest}>
      <div data-state={forcedHover ? 'hover' : undefined} className="ifs-dv-header wb-frame__header">
        <div className="ifs-dv-header__left">
          <span className="ifs-dv-header__drag wb-frame__grab" {...grabProps}><IFS.Icon name="system-drag-and-drop" size={16} /></span>
          <span className="ifs-dv-header__title">{title}</span>
        </div>
        <div className="ifs-dv-header__hover">
          {onEditWithCooper !== false && <IFS.Button type="tertiary" size="s" iconLeft="cooper-system-icon" onClick={onEditWithCooper || undefined}>Edit with Cooper</IFS.Button>}
          {menu && <IFS.Menu items={wbMenuItems(menu)} open={menuOpen} onOpenChange={setMenuOpen} width={152} align="end" label="Widget actions"
            trigger={<IFS.IconButton type="ghost" size="s" icon="system-dots-vertical" label="Widget actions" />} />}
          <span className="ifs-dv-header__divider" aria-hidden="true" />
        </div>
        <button type="button" aria-label="Ask Cooper about this widget" title="Ask Cooper about this widget" onClick={onCooper}
          className="ifs-icon-button ifs-icon-button--tertiary ifs-icon-button--s ifs-icon-button--circle">
          <IFS.Icon name="cooper-evidence-icon" variant="medium" size={14} />
        </button>
      </div>
      <div className="ifs-dv-card__body wb-frame__body">{bare && React.isValidElement(children) && typeof children.type !== 'string' ? React.cloneElement(children, { bare: true }) : children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Layout engine. Widths are in sixths of a row: 2 = 1/3, 3 = 1/2, 4 = 2/3, 6 = 3/3 (the only allowed widths).
const STEPS = [2, 3, 4, 6];
const LIMITS = { text: [2, 6], chart: [3, 6], metrics: [6, 6], wide: [6, 6] };
let rowSeq = 0;
const newRowId = () => `r${Date.now().toString(36)}${++rowSeq}`;
const clone = l => ({ ...l, sections: l.sections.map(s => ({ ...s, rows: s.rows.map(r => ({ ...r, items: [...r.items], widths: r.widths ? [...r.widths] : null })) })) });
const shape = l => JSON.stringify(l.sections.map(s => s.rows.map(r => [r.items, r.widths])));

function makeEngine(widgets) {
  const kind = id => (id === '__zone__' ? widgets.__zoneKind : (widgets[id] && widgets[id].kind)) || 'text';
  const isWhole = k => k === 'metrics' || k === 'wide';
  const auto = items => {
    const n = items.length, ks = items.map(kind);
    if (n === 1) return [6];
    if (n === 2) {
      if (ks[0] === 'chart' && ks[1] !== 'chart') return [4, 2];
      if (ks[1] === 'chart' && ks[0] !== 'chart') return [2, 4];
      return [3, 3];
    }
    return items.map(() => 2);
  };
  const widths = r => (r.widths && r.widths.length === r.items.length ? r.widths : auto(r.items));
  const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
  // Empty rows disappear; a row whose widget count changed (or whose manual widths equal Auto) is Auto again.
  const normalize = l => {
    l.sections.forEach(s => {
      s.rows = s.rows.filter(r => r.items.length);
      s.rows.forEach(r => { if (r.widths && (r.widths.length !== r.items.length || same(r.widths, auto(r.items)))) r.widths = null; });
    });
    return l;
  };
  // Can `id` join `row` (ignoring `exclude`)? → { ok, reason } (reason = tooltip text, or null for a silent "no").
  const canJoin = (row, id, exclude) => {
    const items = row.items.filter(x => x !== exclude);
    const n = items.length, k = kind(id), ks = items.map(kind);
    if (!n) return { ok: true };
    if (ks.includes('metrics')) return { ok: false, reason: 'Metrics take the whole row' };
    if (ks.some(isWhole) || isWhole(k)) return { ok: false, reason: null };
    if (n >= 3) return { ok: false, reason: 'Row is full — max 3 widgets' };
    if (ks.includes('chart') && n >= 2) return { ok: false, reason: 'Row is full — max 2 widgets with a chart' };
    if (ks.includes('chart')) return { ok: true };
    if (k === 'chart' && n >= 2) return { ok: false, reason: null };
    return { ok: true };
  };
  const find = (l, id) => {
    for (const s of l.sections) for (let ri = 0; ri < s.rows.length; ri++) { const i = s.rows[ri].items.indexOf(id); if (i >= 0) return { s, ri, row: s.rows[ri], i }; }
    return null;
  };
  // Drop target: { type: 'row', sec, rowId, at } (at = index among the row's items without the source) | { type: 'new', sec, before: rowId|null }
  const move = (layout, id, t) => {
    const l = clone(layout);
    const src = find(l, id);
    if (src) { src.row.items.splice(src.i, 1); src.row.widths = null; }
    const s = l.sections.find(x => x.id === t.sec);
    if (t.type === 'row') {
      const row = s.rows.find(r => r.id === t.rowId);
      row.items.splice(Math.min(t.at, row.items.length), 0, id); row.widths = null;
    } else {
      const at = t.before ? s.rows.findIndex(r => r.id === t.before) : -1;
      s.rows.splice(at < 0 ? s.rows.length : at, 0, { id: newRowId(), items: [id], widths: null });
    }
    return normalize(l);
  };
  const remove = (layout, id) => { const l = clone(layout); const f = find(l, id); if (f) { f.row.items.splice(f.i, 1); f.row.widths = null; } return normalize(l); };
  const resetRow = (layout, secId, rowId) => { const l = clone(layout); const r = l.sections.find(s => s.id === secId).rows.find(x => x.id === rowId); r.widths = null; return l; };

  // Resize the widget at (sec, ri, li) to w sixths (its right edge). Returns the new layout or null when not allowed.
  const resize = (layout, secId, ri, li, w) => {
    const l = clone(layout);
    const s = l.sections.find(x => x.id === secId);
    const row = s.rows[ri];
    const ws = widths(row), items = row.items, ks = items.map(kind);
    const L = items[li], [min, max] = LIMITS[kind(L)];
    if (w < min || w > max || !STEPS.includes(w)) return null;
    if (ks.some(isWhole)) return null;
    if (ks.includes('chart')) {
      // Chart rows: only chart + text, only the divider between them; nothing moves between rows.
      if (items.length !== 2 || li !== 0 || ks[0] === ks[1]) return null;
      const r = 6 - w, [rmin, rmax] = LIMITS[ks[1]];
      if (r < rmin || r > Math.min(rmax, ks[1] === 'text' ? 3 : 4)) return null;
      if (w > (ks[0] === 'text' ? 3 : 4)) return null;
      row.widths = [w, r];
      return normalize(l);
    }
    const before = ws.slice(0, li), sumB = before.reduce((a, b) => a + b, 0);
    if (w > 6 - sumB) return null;
    const rest = 6 - sumB - w;
    const followers = items.slice(li + 1);
    const kept = [], pushed = [];
    let used = 0;
    for (const f of followers) {
      if (!pushed.length && used + LIMITS[kind(f)][0] <= rest && li + 1 + kept.length < 3 && kind(f) === 'text') { kept.push(f); used += 2; } else pushed.push(f);
    }
    let pulled = [];
    if (!kept.length && rest > 0) {
      const next = s.rows[ri + 1];
      if (!next) return null; // last in the section: nothing can fill the freed space
      for (const f of next.items) {
        if (kind(f) !== 'text' || used + 2 > rest || li + 1 + pulled.length >= 3) break;
        pulled.push(f); used += 2;
      }
      if (!pulled.length) return null;
      next.items = next.items.slice(pulled.length); next.widths = null;
    }
    const tail = kept.length ? kept : pulled;
    const tailW = tail.map((_, i) => (i === tail.length - 1 ? rest - 2 * (tail.length - 1) : 2));
    if (tailW.some(x => x < 2)) return null;
    row.items = [...items.slice(0, li + 1), ...tail];
    row.widths = [...before, w, ...tailW];
    if (pushed.length) {
      const next = s.rows[ri + 1];
      const merged = next && [...pushed, ...next.items];
      const fits = merged && merged.length <= 3 && !merged.some(x => isWhole(kind(x))) && (!merged.some(x => kind(x) === 'chart') || merged.length <= 2);
      if (fits) { next.items = merged; next.widths = null; } else s.rows.splice(ri + 1, 0, { id: newRowId(), items: pushed, widths: null });
    }
    return normalize(l);
  };
  // Allowed widths for the widget left of an edge, and which arrows its handle shows.
  const edgeInfo = (layout, secId, ri, li, sectionEdge) => {
    const s = layout.sections.find(x => x.id === secId), row = s.rows[ri];
    const cur = widths(row)[li];
    const opts = STEPS.filter(w => w === cur || resize(layout, secId, ri, li, w));
    const grow = !sectionEdge && opts.some(w => w > cur), shrink = opts.some(w => w < cur);
    return { cur, opts, arrows: grow && shrink ? 'both' : grow ? 'right' : shrink ? 'left' : null };
  };
  return { kind, auto, widths, canJoin, move, remove, resize, resetRow, edgeInfo, find, normalize };
}

const WIDTH_CSS = {
  2: 'calc((100% - 2 * var(--wb-gap)) / 3)',
  3: 'calc((100% - var(--wb-gap)) / 2)',
  4: 'calc((100% - 2 * var(--wb-gap)) / 3 * 2 + var(--wb-gap))',
  6: '100%',
};

/* ------------------------------------------------------------------------------------------ */
// Pattern: WidgetBoard — widgets on a 3-column grid in rows of 1–3, with the Widget Builder rules:
// Auto / Fill widths (1/3 · 1/2 · 2/3 · 3/3), same height in a row, resize by edge handles (snap, limits, reflow),
// drag & drop by ⋮⋮ (indicator line → drop zone after 300 ms, blocked rows with tooltips, Esc cancels), ⋮ menu
// (Resize S/M/L, Remove), toast with Undo. A dashboard is one untitled section; a report has many titled sections.
// Props:
//   value / defaultValue / onChange(layout) — layout = { sections: [{ id, title, rows: [{ id, items: [widgetId], widths: null | [sixths] }] }] }
//   widgets = { [id]: { kind: 'text'|'chart'|'metrics'|'wide', title, render(ctx) → node, bare } }
//     render gets { state } and returns the widget body; `bare` = body brings its own padding (kit charts).
//     kind 'metrics' renders render() without a frame (a stat-cards block: 3/3, no handle, not draggable).
//   editable (Draft; default true: handles, ⋮⋮ and menus). During every drag both show at once: the raised ghost card follows
//   the pointer (source faded to 30%) and the "Drop here to place" zone marks the current drop target.
//   moveMessage(widget) / removeMessage(widget) → toast title, onRemove(id), external = { id, kind, title, pointer } to drop
//   a widget that comes from outside (Widgets drawer), onExternalDrop(id, placed:boolean).
// Imperative-free: everything is state; undo restores the previous layout.
function WidgetBoard({ value, defaultValue, onChange, widgets, editable = true, moveMessage, removeMessage,
  onRemove, external, onExternalDrop, className, style }) {
  const [inner, setInner] = useState(defaultValue);
  const layout = value !== undefined ? value : inner;
  const set = useCallback(l => { if (value === undefined) setInner(l); onChange && onChange(l); }, [value, onChange]);
  const E = makeEngine(widgets);
  const boardRef = useRef();
  const [hover, setHover] = useState(null);          // widget id under the pointer
  const [edge, setEdge] = useState(null);            // { sec, ri, li, sectionEdge, x, top, h, arrows, from }
  const [rz, setRz] = useState(null);                // active resize { ...edge, base, preview, tip, px }
  const [drag, setDrag] = useState(null);            // active drag { id, w, h, x, y, ox, oy, target, preview, tip }
  const [flyBack, setFlyBack] = useState(null);
  const animate = useRef(false);
  const rects = useRef(new Map());

  // ≈200 ms move animation when the layout is committed (FLIP).
  useLayoutEffect(() => {
    const board = boardRef.current; if (!board) return;
    const cells = board.querySelectorAll('[data-wb-cell]');
    const next = new Map();
    cells.forEach(c => next.set(c.getAttribute('data-wb-cell'), c.getBoundingClientRect()));
    if (animate.current) {
      cells.forEach(c => {
        const id = c.getAttribute('data-wb-cell'), a = rects.current.get(id), b = next.get(id);
        if (!a || !b) return;
        const dx = a.left - b.left, dy = a.top - b.top, sx = a.width / b.width;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(sx - 1) < 0.01) return;
        c.style.transition = 'none'; c.style.transformOrigin = '0 0';
        c.style.transform = `translate(${dx}px, ${dy}px) scaleX(${sx})`;
        requestAnimationFrame(() => { c.style.transition = 'transform 200ms ease'; c.style.transform = ''; });
      });
      animate.current = false;
    }
    rects.current = next;
  });

  const commit = (l, toast) => {
    const prev = layout;
    animate.current = true;
    set(l);
    if (toast) IFS.toast({ title: toast, secondaryAction: { label: 'Undo', iconLeft: 'arrow-back-up', onClick: () => { animate.current = true; set(prev); } } });
  };

  /* ---------- geometry snapshot (taken when a drag starts; the layout doesn't move during phase 1) ---------- */
  const snapshot = () => {
    const board = boardRef.current, b = board.getBoundingClientRect();
    return [...board.querySelectorAll('[data-wb-section]')].map(sEl => {
      const sid = sEl.getAttribute('data-wb-section'), body = sEl.querySelector('[data-wb-rows]');
      const sr = sEl.getBoundingClientRect(), br = body.getBoundingClientRect();
      return { id: sid, rect: sr, body: br, b,
        rows: [...body.querySelectorAll(':scope > [data-wb-row]')].map(rEl => ({ id: rEl.getAttribute('data-wb-row'), rect: rEl.getBoundingClientRect(),
          cells: [...rEl.querySelectorAll(':scope > [data-wb-cell]')].map(c => ({ id: c.getAttribute('data-wb-cell'), rect: c.getBoundingClientRect() })) })) };
    });
  };

  const findTarget = (snap, x, y, id, kind) => {
    const gapPad = 6;
    for (const s of snap) {
      const inX = x >= s.rect.left && x <= s.rect.right;
      if (!inX || y < s.rect.top - gapPad || y > s.rect.bottom + gapPad) continue;
      const sec = layout.sections.find(q => q.id === s.id);
      const lineY = (i) => i === 0 ? (s.rows[0] ? s.rows[0].rect.top - 6 : s.body.top) : i >= s.rows.length ? s.rows[s.rows.length - 1].rect.bottom + 6 : (s.rows[i - 1].rect.bottom + s.rows[i].rect.top) / 2;
      const newAt = i => ({ type: 'new', sec: s.id, before: s.rows[i] ? s.rows[i].id : null, line: { o: 'h', x: s.body.left, y: lineY(i), w: s.body.width } });
      if (!s.rows.length) return { t: newAt(0) };
      for (let i = 0; i < s.rows.length; i++) {
        const r = s.rows[i], rr = r.rect;
        if (y < rr.top) return { t: newAt(i) };
        if (y <= rr.bottom) {
          const band = Math.min(24, rr.height * 0.2);
          if (y < rr.top + band) return { t: newAt(i) };
          if (y > rr.bottom - band) return { t: newAt(i + 1) };
          const row = sec.rows.find(q => q.id === r.id);
          const j = E.canJoin(row, id, id);
          if (!j.ok) return { t: newAt(y < rr.top + rr.height / 2 ? i : i + 1), tip: j.reason };
          const cells = r.cells.filter(c => c.id !== id);
          let at = cells.findIndex(c => x < c.rect.left + c.rect.width / 2);
          if (at < 0) at = cells.length;
          const lx = at === 0 ? cells[0].rect.left - 6 : at >= cells.length ? cells[cells.length - 1].rect.right + 6 : (cells[at - 1].rect.right + cells[at].rect.left) / 2;
          return { t: { type: 'row', sec: s.id, rowId: r.id, at, line: { o: 'v', x: lx, y: rr.top, h: rr.height } } };
        }
      }
      return { t: newAt(s.rows.length) };
    }
    return { t: null };
  };
  const sameTarget = (a, b) => a && b && a.type === b.type && a.sec === b.sec && a.rowId === b.rowId && a.at === b.at && a.before === b.before;

  /* ---------- drag & drop ---------- */
  const startDrag = (id, e, meta) => {
    const cell = boardRef.current.querySelector(`[data-wb-cell="${id}"]`);
    const r = cell ? cell.getBoundingClientRect() : { left: e.clientX - 20, top: e.clientY - 20, width: meta.w || 360, height: meta.h || 140 };
    const snap = snapshot();
    // The ghost is a copy at the widget's current width (notes 413:57113; frames draw ≈330px — notes win).
    const gw = r.width;
    const d = { id, kind: meta.kind, title: meta.title, external: !!meta.external, w: gw, h: r.height, src: r,
      ox: Math.min(e.clientX - r.left, gw - 16), oy: e.clientY - r.top, x: e.clientX, y: e.clientY, snap, target: null, preview: false, tip: null };
    setHover(null); setEdge(null);
    setDrag(d);
    return d;
  };
  const dragRef = useRef(null); dragRef.current = drag;
  const timer = useRef(null);
  const onDragMove = useCallback((x, y) => {
    const d = dragRef.current; if (!d) return;
    // While the zone is open, stay on it as long as the pointer is inside the zone (rows below have moved).
    if (d.preview) {
      const z = boardRef.current.querySelector('[data-wb-zone]');
      const zr = z && z.getBoundingClientRect();
      if (zr && x >= zr.left - 8 && x <= zr.right + 8 && y >= zr.top - 8 && y <= zr.bottom + 8) { setDrag({ ...d, x, y }); return; }
    }
    const { t, tip } = findTarget(d.snap, x, y, d.id, d.kind);
    if (sameTarget(t, d.target)) { setDrag({ ...d, x, y, tip }); return; }
    clearTimeout(timer.current);
    const nd = { ...d, x, y, target: t, tip, preview: false };
    setDrag(nd);
    if (t) {
      const onLine = t.line.o === 'h' ? Math.abs(y - t.line.y) < 6 : Math.abs(x - t.line.x) < 6;
      timer.current = setTimeout(() => setDrag(cur => cur && sameTarget(cur.target, t) ? { ...cur, preview: true } : cur), onLine ? 0 : 300);
    }
  }, [layout]); // eslint-disable-line react-hooks/exhaustive-deps

  const endDrag = useCallback((cancel) => {
    clearTimeout(timer.current);
    const d = dragRef.current; if (!d) return;
    const w = widgets[d.id] || { title: d.title };
    const next = !cancel && d.target ? E.move(layout, d.id, d.target) : null;
    if (next && shape(next) !== shape(layout)) {
      setDrag(null);
      const msg = d.external ? null : (moveMessage ? moveMessage(w) : 'Block moved');
      commit(next, msg);
      if (d.external && onExternalDrop) onExternalDrop(d.id, true);
    } else {
      // Cancel: the ghost flies back (≈200 ms), nothing changes, no toast.
      setDrag(null);
      if (!d.external) { setFlyBack({ ...d }); setTimeout(() => setFlyBack(null), 220); }
      if (d.external && onExternalDrop) onExternalDrop(d.id, false);
    }
  }, [layout, widgets]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!drag) return undefined;
    const mv = e => onDragMove(e.clientX, e.clientY);
    const up = () => endDrag(false);
    const key = e => { if (e.key === 'Escape') { e.preventDefault(); endDrag(true); } };
    window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up); window.addEventListener('keydown', key);
    return () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('keydown', key); };
  }, [!!drag, onDragMove, endDrag]); // eslint-disable-line react-hooks/exhaustive-deps

  // A widget dragged in from outside (Widgets drawer): starts as soon as `external` is set.
  const extKey = external && `${external.id}:${external.seq || 0}`;
  useEffect(() => {
    if (!external) return;
    startDrag(external.id, { clientX: external.pointer.x, clientY: external.pointer.y }, { kind: external.kind, title: external.title, external: true, w: external.w || 360, h: external.h || 160 });
  }, [extKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const grab = (id) => editable && ({
    onPointerDown: e => {
      if (e.button !== 0) return;
      e.preventDefault();
      const sx = e.clientX, sy = e.clientY, w = widgets[id];
      const mv = ev => {
        if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 4) return; // a click on ⋮⋮ doesn't start a drag
        cleanup(); startDrag(id, { clientX: sx, clientY: sy }, { kind: w.kind, title: w.title });
        requestAnimationFrame(() => onDragMove(ev.clientX, ev.clientY));
      };
      const cleanup = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', cleanup); };
      window.addEventListener('pointermove', mv); window.addEventListener('pointerup', cleanup);
    },
  });

  /* ---------- resize ---------- */
  const rowEl = (sec, rowId) => boardRef.current.querySelector(`[data-wb-section="${sec}"] [data-wb-row="${rowId}"]`);
  const startResize = (ed, e) => {
    e.preventDefault();
    const sec = layout.sections.find(s => s.id === ed.sec), row = sec.rows[ed.ri];
    const info = E.edgeInfo(layout, ed.sec, ed.ri, ed.li, ed.sectionEdge);
    const rr = rowEl(ed.sec, row.id).getBoundingClientRect();
    const gap = 12, unit = (rr.width + gap) / 6;
    const ws = E.widths(row), sumB = ws.slice(0, ed.li).reduce((a, b) => a + b, 0);
    const shrinkOnly = ed.sectionEdge;
    const opts = shrinkOnly ? info.opts.filter(w => w <= info.cur) : info.opts;
    const st = { ...ed, base: layout, opts, cur: info.cur, preview: layout, w: info.cur, tip: null, rowLeft: rr.left, unit, sumB, x: e.clientX };
    setRz(st);
    const mv = ev => {
      const raw = (ev.clientX - rr.left + gap / 2) / unit - sumB;
      const lo = Math.min(...opts), hi = Math.max(...opts);
      const w = opts.reduce((a, b) => (Math.abs(b - raw) < Math.abs(a - raw) ? b : a), info.cur);
      const tip = raw > hi + 0.35 ? 'Maximum width reached' : raw < lo - 0.35 ? 'Minimum width reached' : null;
      const preview = w === info.cur ? layout : E.resize(layout, ed.sec, ed.ri, ed.li, w);
      setRz(cur => cur && { ...cur, w, tip, preview: preview || layout, x: ev.clientX });
    };
    const done = (cancel) => {
      window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('keydown', key);
      setRz(cur => {
        if (cur && !cancel && cur.w !== info.cur) { animate.current = true; setTimeout(() => set(cur.preview), 0); }
        return null;
      });
      setEdge(null);
    };
    const up = () => done(false);
    const key = ev => { if (ev.key === 'Escape') done(true); };
    window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up); window.addEventListener('keydown', key);
  };

  // Edge hover: hit zone 8px each side of an edge, below the ~40px header.
  const onRowMove = (sec, ri, e) => {
    if (!editable || drag || rz) return;
    const row = layout.sections.find(s => s.id === sec).rows[ri];
    const el = e.currentTarget, rr = el.getBoundingClientRect();
    const y = e.clientY - rr.top;
    if (y < 40) { if (edge) setEdge(null); return; }
    const cells = [...el.querySelectorAll(':scope > [data-wb-cell]')].map(c => c.getBoundingClientRect());
    let found = null;
    cells.forEach((c, li) => {
      const ex = li < cells.length - 1 ? (c.right + cells[li + 1].left) / 2 : c.right;
      if (Math.abs(e.clientX - ex) <= 8) found = { li, ex, sectionEdge: li === cells.length - 1 };
    });
    if (!found) { if (edge) setEdge(null); return; }
    const info = E.edgeInfo(layout, sec, ri, found.li, found.sectionEdge);
    if (!info.arrows) { if (edge) setEdge(null); return; }
    const from = e.clientX < found.ex ? row.items[found.li] : (row.items[found.li + 1] || row.items[found.li]);
    const next = { sec, ri, li: found.li, sectionEdge: found.sectionEdge, x: found.ex - rr.left, arrows: info.arrows, from: edge && edge.ri === ri && edge.sec === sec && edge.li === found.li ? edge.from : from };
    if (!edge || edge.sec !== sec || edge.ri !== ri || edge.li !== found.li || edge.arrows !== info.arrows) setEdge(next);
  };

  /* ---------- menu actions ---------- */
  const menuFor = (id) => {
    const w = widgets[id];
    const f = E.find(layout, id);
    if (!f) return undefined;
    const sec = f.s.id, ri = f.ri, li = f.i, row = f.row;
    const cur = E.widths(row)[li];
    // S / M / L = 1/3 · 2/3 · 3/3. The last widget of a row is sized through the divider on its left.
    const sizeTo = w6 => {
      if (li === row.items.length - 1 && li > 0) {
        const ws = E.widths(row), lw = 6 - ws.slice(0, li - 1).reduce((a, b) => a + b, 0) - w6;
        const l = E.resize(layout, sec, ri, li - 1, lw);
        const f = l && E.find(l, id);
        return f && E.widths(f.row)[f.i] === w6 ? l : null;
      }
      return E.resize(layout, sec, ri, li, w6);
    };
    const sizes = [['S', 2, 1], ['M', 4, 2], ['L', 6, 3]].map(([label, w6, span]) => {
      const next = w6 === cur ? null : sizeTo(w6);
      return { label, span, selected: w6 === cur, disabled: w6 !== cur && !next, onClick: () => { if (next) commit(next); } };
    });
    return [
      { label: 'Resize', icon: 'arrow-horizontal-expand', items: sizes },
      { label: 'Share', icon: 'chat-share', onClick: () => IFS.toast({ title: `Link to "${w.title}" copied` }) },
      { label: 'Remove', icon: 'system-trash-delete', onClick: () => {
        commit(E.remove(layout, id), removeMessage ? removeMessage(w) : `"${w.title}" widget removed`);
        onRemove && onRemove(id);
      } },
    ];
  };

  /* ---------- render ---------- */
  const shown = rz ? rz.preview : drag && drag.preview && drag.target ? (() => {
    const z = { ...widgets, __zoneKind: drag.kind };
    const Ez = makeEngine(z);
    let l = clone(layout);
    // The source leaves the preview only when the zone is in its own row (reorder); otherwise it stays faded in place.
    if (drag.target.type === 'row') {
      const tr = l.sections.find(s => s.id === drag.target.sec).rows.find(r => r.id === drag.target.rowId);
      if (tr.items.includes(drag.id)) { tr.items = tr.items.filter(x => x !== drag.id); }
      tr.items.splice(Math.min(drag.target.at, tr.items.length), 0, '__zone__'); tr.widths = null;
      tr.__auto = Ez.auto(tr.items);
    } else {
      const s = l.sections.find(x => x.id === drag.target.sec);
      const at = drag.target.before ? s.rows.findIndex(r => r.id === drag.target.before) : -1;
      s.rows.splice(at < 0 ? s.rows.length : at, 0, { id: '__zonerow__', items: ['__zone__'], widths: null, __auto: [6] });
    }
    return l;
  })() : layout;

  const cellState = id => {
    if (rz && rz.from === id) return 'drag';
    if (rz) return undefined;
    if (drag) return undefined;
    if (edge && edge.from === id) return 'hover';
    if (hover === id && !edge) return 'hover';
    return undefined;
  };

  const renderCell = (sec, ri, row, id, li, ws) => {
    const last = li === row.items.length - 1;
    const st = { flex: last ? '1 1 0' : `0 0 ${WIDTH_CSS[ws[li]] || WIDTH_CSS[2]}` };
    if (id === '__zone__') {
      return <div key="__zone__" data-wb-zone="" className="wb-cell wb-cell--zone" style={{ ...st, minHeight: drag ? drag.h : 120 }}><IFS.DropZone active text style={{ height: "100%", minHeight: "inherit" }} /></div>;
    }
    const w = widgets[id]; if (!w) return null;
    const isSrc = drag && !drag.external && drag.id === id;
    if (w.kind === 'metrics') {
      return <div key={id} data-wb-cell={id} className={cx('wb-cell', isSrc && 'wb-cell--source')} style={st}>{w.render({})}</div>;
    }
    const state = cellState(id);
    return (
      <div key={id} data-wb-cell={id} className={cx('wb-cell', isSrc && 'wb-cell--source')} style={st}
        onPointerEnter={() => !drag && !rz && setHover(id)} onPointerLeave={() => setHover(h => (h === id ? null : h))}>
        {<WidgetFrame title={w.title} state={state} bare={w.bare} menu={editable && !drag && !rz ? menuFor(id) : undefined}
            grabProps={editable ? grab(id) : undefined} onEditWithCooper={w.onEditWithCooper}>{w.render({ state })}</WidgetFrame>}
      </div>
    );
  };

  const ghost = drag || flyBack;
  const boardRect = boardRef.current && boardRef.current.getBoundingClientRect();
  return (
    <div ref={boardRef} className={cx('wb-board', drag && 'wb-board--dragging', rz && 'wb-board--resizing', className)} style={style}>
      {shown.sections.map(s => (
        <section key={s.id} data-wb-section={s.id} className={cx('wb-section', s.title && 'wb-section--titled')} aria-label={s.title || undefined}>
          {s.title && <h3 className="wb-section__title">{s.title}</h3>}
          <div data-wb-rows="" className="wb-rows">
            {s.rows.map((row, ri) => {
              const ws = row.__auto || E.widths(row);
              const hasEdge = edge && !rz && edge.sec === s.id && edge.ri === ri;
              return (
                <div key={row.id} data-wb-row={row.id} className="wb-row"
                  onPointerMove={e => onRowMove(s.id, ri, e)} onPointerLeave={() => !rz && setEdge(null)}
                  onDoubleClick={() => { if (edge && !edge.sectionEdge && edge.sec === s.id && edge.ri === ri && layout.sections.find(q => q.id === s.id).rows[ri].widths) commit(E.resetRow(layout, s.id, row.id)); }}>
                  {row.items.map((id, li) => renderCell(s.id, ri, row, id, li, ws))}
                  {(hasEdge || (rz && rz.sec === s.id && rz.ri === ri)) && (() => {
                    const ed = rz || edge;
                    const rr = rowEl(s.id, row.id).getBoundingClientRect();
                    const left = rz ? Math.max(0, Math.min(rr.width, rz.x - rr.left)) : ed.x;
                    return (
                      <div className="wb-edge" style={{ left }} onPointerDown={e => startResize(ed, e)}>
                        <ResizeHandle arrows={rz ? (rz.opts.some(w => w > rz.w) && !rz.sectionEdge ? (rz.opts.some(w => w < rz.w) ? 'both' : 'right') : 'left') : ed.arrows} />
                        {rz && rz.tip && <span className="wb-tip wb-tip--above"><IFS.Tooltip inline content={rz.tip} /></span>}
                      </div>
                    );
                  })()}
                </div>
              );
            })}
            {!s.rows.length && !drag && <IFS.DropZone text className="wb-empty-zone" />}
          </div>
        </section>
      ))}
      {drag && drag.target && !drag.preview && boardRect && (
        <DropIndicator orientation={drag.target.line.o === 'h' ? 'horizontal' : 'vertical'} className="wb-indicator"
          style={drag.target.line.o === 'h'
            ? { left: drag.target.line.x - boardRect.left, top: drag.target.line.y - boardRect.top - 2, width: drag.target.line.w }
            : { left: drag.target.line.x - boardRect.left - 2, top: drag.target.line.y - boardRect.top, height: drag.target.line.h }} />
      )}
      {ghost && ReactDOM.createPortal(
        <div className={cx('wb-ghost', flyBack && 'wb-ghost--back')} aria-hidden="true"
          style={flyBack ? { left: flyBack.src.left, top: flyBack.src.top, width: flyBack.w }
            : { left: ghost.x - ghost.ox, top: ghost.y - ghost.oy, width: ghost.w }}>
          {ghost.external
              ? <WidgetCard title={ghost.title} description={(widgets[ghost.id] || {}).description} preview={(widgets[ghost.id] || {}).preview || 'strategic-objectives'} state="drag" />
              : <WidgetFrame title={widgets[ghost.id].title} state="ghost" bare={widgets[ghost.id].bare} onEditWithCooper={false}>{widgets[ghost.id].render({ state: 'ghost' })}</WidgetFrame>}
        </div>, document.body)}
      {drag && drag.tip && ReactDOM.createPortal(<span className="wb-tip wb-tip--cursor" style={{ left: drag.x + 12, top: drag.y - 44 }}><IFS.Tooltip inline content={drag.tip} /></span>, document.body)}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Pattern: WidgetsDrawer — "Widgets" side drawer: smart search (filters by title/description) + WidgetCard list.
// Each card can be added (+ Add) or dragged onto the board (the drawer steps aside while dragging).
// Props: open / onOpenChange, items = [{ id, title, description, preview, kind }], onAdd(item), onGrab(item, event),
// title (default "Widgets"), description, searching (forced "searching" state, gallery).
function WidgetsDrawer({ open, onOpenChange, items = [], onAdd, onGrab, title = 'Widgets',
  description = 'You can add or drag widgets below to your dashboards.', className, style }) {
  const [q, setQ] = useState('');
  const term = q.trim().toLowerCase();
  const list = term ? items.filter(i => `${i.title} ${i.description}`.toLowerCase().includes(term)) : items;
  if (!open) return null;
  return (
    <IFS.Drawer inline open title={title} onOpenChange={onOpenChange} collapsible={false} className={cx('wb-drawer', className)} style={style}>
      <p className="wb-drawer__desc">{description}</p>
      <IFS.Search placeholder="Find a suitable widget by description" value={q} onChange={setQ} className="wb-drawer__search" />
      <div className="wb-drawer__list">
        {list.map(it => (
          <WidgetCard key={it.id} title={it.title} description={it.description} preview={it.preview}
            onAdd={() => onAdd && onAdd(it)} onGrab={onGrab ? e => onGrab(it, e) : undefined} />
        ))}
        {!list.length && <IFS.EmptyState cause="no-results" heading="No widgets found" body="Try describing the data you want to see." />}
      </div>
    </IFS.Drawer>
  );
}

Object.assign(IFS, { StatCardsRow, PreviewWidgetCard, WidgetCard, ResizeHandle, DropIndicator, WidgetViewChangePosition, WidgetFrame, WidgetBoard, WidgetsDrawer, widgetLayoutEngine: makeEngine });
export { StatCardsRow, PreviewWidgetCard, WidgetCard, ResizeHandle, DropIndicator, WidgetViewChangePosition, WidgetFrame, WidgetBoard, WidgetsDrawer, makeEngine as widgetLayoutEngine };
