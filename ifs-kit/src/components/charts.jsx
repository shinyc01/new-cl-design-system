import React from 'react';
import { IFS } from './registry.js';
// Figma: Data Visualisation page (3487:19894) — data-viz Base atoms + the generic "core chart types".
// Rules (Figma): charts are built from the Base atoms; bars are zero-based; one series = one colour group
// (base step of each --data-viz-* group, used in order; hover = a lighter step of the same group);
// every chart backs its picture with exact values (hover/focus tooltip + "view as table" + a screen-reader table).

/* ------------------------------------------------------------------ helpers */

// Series colour groups, in the order charts use them (Figma core charts: muted purple → teal → rose → …).
const DV_GROUPS = ['muted-purple', 'teal', 'rose', 'steel-blue', 'deep-green', 'violet', 'cyan', 'alert'];
const DV_STEP = 3;       // Figma core charts draw every series with data-3
const DV_HOVER_STEP = 2; // and the hovered mark with data-2 (lighter step, same group)
const WHITE = '#ffffff'; // raw in Figma: peer-median / reference marks

const dvVar = (group, step = DV_STEP) => `var(--data-viz-${group}-data-${step})`;
// color = a group name ('teal'), any CSS colour, or undefined (= palette slot i)
function dvColor(color, i = 0, step = DV_STEP) {
  const g = color || DV_GROUPS[i % (DV_GROUPS.length - 1)];
  return DV_GROUPS.includes(g) ? dvVar(g, step) : g;
}
const dvHover = (color, i) => dvColor(color, i, DV_HOVER_STEP);

const fmtCompact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
const fmtFull = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
const defaultFormat = v => (v == null || Number.isNaN(v) ? '–' : Math.abs(v) >= 10000 ? fmtCompact.format(v) : fmtFull.format(v));
const signed = (v, f) => (v > 0 ? '+' : v < 0 ? '−' : '') + f(Math.abs(v));

function niceStep(range, count) {
  const raw = range / count;
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const m = raw / p;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
}
// Evenly spaced "nice" ticks covering [lo, hi].
function scaleTicks(lo, hi, count = 4) {
  if (!(hi > lo)) hi = lo + 1;
  const step = niceStep(hi - lo, count);
  const a = Math.floor(lo / step + 1e-9) * step, b = Math.ceil(hi / step - 1e-9) * step;
  const t = [];
  for (let v = a; v <= b + step / 1e6; v += step) t.push(+v.toFixed(10));
  return t;
}
const finite = a => a.filter(v => typeof v === 'number' && Number.isFinite(v));

function useControlled(value, defaultValue, onChange) {
  const [inner, setInner] = React.useState(defaultValue);
  const cur = value !== undefined ? value : inner;
  const set = v => { if (value === undefined) setInner(v); onChange && onChange(v); };
  return [cur, set];
}

// Width of the plot box (charts scale to their container).
function useWidth(initial = 530) {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(initial);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const read = () => { if (el.clientWidth) setW(el.clientWidth); };
    read();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

let dvUid = 0;
const useUid = p => { const r = React.useRef(null); if (r.current == null) r.current = `${p}-${++dvUid}`; return r.current; };

// Rect path with rounded top corners (column bars: Figma radius 3,3,0,0).
function barPath(x, y, w, h, r = 3) {
  if (h <= 0 || w <= 0) return '';
  r = Math.min(r, w / 2, h);
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
}
function arcPath(cx, cy, r0, r1, a0, a1) { // angles in radians, 0 = 12 o'clock, clockwise
  const pt = (r, a) => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
  const large = a1 - a0 > Math.PI ? 1 : 0;
  if (a1 - a0 >= Math.PI * 2 - 1e-6) a1 = a0 + Math.PI * 2 - 1e-4;
  const [x0, y0] = pt(r1, a0), [x1, y1] = pt(r1, a1);
  if (r0 <= 0) { return `M${cx},${cy}L${x0},${y0}A${r1},${r1} 0 ${large} 1 ${x1},${y1}Z`; }
  const [x2, y2] = pt(r0, a1), [x3, y3] = pt(r0, a0);
  return `M${x0},${y0}A${r1},${r1} 0 ${large} 1 ${x1},${y1}L${x2},${y2}A${r0},${r0} 0 ${large} 0 ${x3},${y3}Z`;
}

/* ------------------------------------------------------------------ atoms */

// Figma: bar-atom (4457:32996)
// Props: state default|hover|out-of-focus|background|loading, color = data-viz group (default rose), step (default 4;
// hover = step-1, out-of-focus = 9), children = the value label (show-value; absent = hidden). Fills its parent.
function DataVizBar({ state = 'default', color = 'rose', step = 4, children, className, style, ...rest }) {
  const vars = DV_GROUPS.includes(color)
    ? { '--dv-c': dvVar(color, step), '--dv-c-hover': dvVar(color, Math.max(1, step - 1)), '--dv-c-muted': dvVar(color, 9) }
    : { '--dv-c': color, '--dv-c-hover': color, '--dv-c-muted': color };
  return (
    <div data-state={state === 'hover' ? 'hover' : undefined} className={IFS.cx('ifs-dv-bar', `ifs-dv-bar--${state}`, className)} style={{ ...vars, ...style }} {...rest}>
      {children != null && state !== 'background' && state !== 'loading' && <ValueLabel>{children}</ValueLabel>}
    </div>
  );
}

// Figma: grouped-bar-molecule (4457:37362)
// Props: type horizontal (segments stacked top→bottom) | vertical (segments side by side), progress (meter: value against max on a
// neutral track), values = numbers (segment sizes; one group, steps 4,5,6,… of `color`), value + max (progress), showValues.
function DataVizGroupedBar({ type = 'horizontal', progress = false, values = [], value = 0, max = 100, color = 'rose', showValues, format = defaultFormat, className, style, ...rest }) {
  if (progress) {
    const pct = Math.max(0, Math.min(1, max ? value / max : 0)) * 100;
    return (
      <div role="meter" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} className={IFS.cx('ifs-dv-grouped', `ifs-dv-grouped--${type}`, 'ifs-dv-grouped--progress', className)} style={style} {...rest}>
        <DataVizBar state="background" className="ifs-dv-grouped__track" />
        <DataVizBar color={color} className="ifs-dv-grouped__fill" style={type === 'vertical' ? { height: `${pct}%` } : { width: `${pct}%` }}>{showValues ? format(value) : null}</DataVizBar>
      </div>
    );
  }
  return (
    <div className={IFS.cx('ifs-dv-grouped', `ifs-dv-grouped--${type}`, className)} style={style} {...rest}>
      {values.map((v, i) => <DataVizBar key={i} color={color} step={Math.min(10, 4 + i)} style={{ flexGrow: Math.max(0, v), flexBasis: 0 }}>{showValues ? format(v) : null}</DataVizBar>)}
    </div>
  );
}

// Figma: line-atom (4440:32650)
// Props: dashed (3/5 dash — planned, median, reference), orientation horizontal|vertical. Fills its parent's width (or height).
function DataVizLine({ dashed = false, orientation = 'horizontal', className, ...rest }) {
  return <span role="presentation" className={IFS.cx('ifs-dv-line', `ifs-dv-line--${orientation}`, dashed && 'ifs-dv-line--dashed', className)} {...rest} />;
}

// Figma: indicator-atom (4440:32643)
// Props: type default (8px data point) | selected (point + white ring) | intended-target (2×16 target tick), color = data-viz group or CSS colour.
function DataVizIndicator({ type = 'default', color = 'rose', className, style, ...rest }) {
  return <span aria-hidden="true" className={IFS.cx('ifs-dv-indicator', `ifs-dv-indicator--${type}`, className)} style={{ '--dv-c': dvColor(color, 0, 4), ...style }} {...rest} />;
}

// Figma: value-label-atom (4440:32611)
// Props: state primary|secondary|tertiary|empty|loading, children = the value text (Label/M/medium).
function ValueLabel({ state = 'primary', children, className, ...rest }) {
  return (
    <span className={IFS.cx('ifs-dv-value', `ifs-dv-value--${state}`, className)} {...rest}>
      {state === 'loading' ? <span className="ifs-dv-value__skeleton" /> : state === 'empty' ? null : children}
    </span>
  );
}

// Figma: legend-swatch-atom (4440:32628)
// Props: state default|hover|out-of-hover|intended-target, color = data-viz group or CSS colour, label, value (show-value),
// step (group step, default 4; charts use 3), swatchOpacity (for opacity-coded ramps). Hover only — legend entries are not clickable (Figma).
function LegendSwatch({ state = 'default', color = 'rose', step = 4, label, value, swatchOpacity, className, ...rest }) {
  return (
    <span data-state={state} className={IFS.cx('ifs-dv-legend', `ifs-dv-legend--${state}`, className)} {...rest}>
      {state === 'intended-target'
        ? <span className="ifs-dv-legend__target" aria-hidden="true" />
        : <span className="ifs-dv-legend__swatch" aria-hidden="true" style={{ background: dvColor(color, 0, step), opacity: swatchOpacity }} />}
      {label != null && <span className="ifs-dv-legend__name">{label}</span>}
      {value != null && <span className="ifs-dv-legend__value">{value}</span>}
    </span>
  );
}

// Figma: data-viz-header-molecule (2154:2068)
// Props: title, state default|hover (forced; real hover/focus of the header or its card also shows the hover row),
// Right element: segments = SegmentedControl options (size S) with segmentValue/defaultSegmentValue/onSegmentChange,
// or button = { label, onClick, iconRight } (Tertiary S). Hover row: drag handle (draggable), and ghost icon-buttons
// for onEdit / onDelete / onMore. hoverActions = custom hover-only node, slot = always-visible right node (Figma "Slot").
function DataVizHeader({ title, state, segments, segmentValue, defaultSegmentValue, onSegmentChange, button, onEdit, onDelete, onMore,
  draggable = true, hoverActions, slot, className, ...rest }) {
  const icons = (onEdit || onDelete || onMore) && <>
    {onEdit && <IFS.IconButton type="ghost" size="s" icon="system-edit-rename" label="Edit" onClick={onEdit} />}
    {onDelete && <IFS.IconButton type="ghost" size="s" icon="system-trash-delete" label="Delete" onClick={onDelete} />}
    {onMore && <IFS.IconButton type="ghost" size="s" icon="system-dots-horizont" label="More" onClick={onMore} />}
  </>;
  return (
    <div data-state={state} className={IFS.cx('ifs-dv-header', className)} {...rest}>
      <div className="ifs-dv-header__left">
        {draggable && <span className="ifs-dv-header__drag" aria-hidden="true"><IFS.Icon name="system-drag-and-drop" size={16} /></span>}
        <span className="ifs-dv-header__title">{title}</span>
      </div>
      {segments && <IFS.SegmentedControl size="s" options={segments} value={segmentValue} defaultValue={defaultSegmentValue ?? (segments[0] && (segments[0].value ?? segments[0]))} onChange={onSegmentChange} />}
      {button && <IFS.Button type="tertiary" size="s" iconRight={button.iconRight === undefined ? 'arrow-right' : button.iconRight} onClick={button.onClick}>{button.label}</IFS.Button>}
      {(icons || hoverActions) && <div className="ifs-dv-header__hover">{hoverActions}{icons}</div>}
      {slot}
    </div>
  );
}

// Circular Tertiary S icon-button carrying the Cooper evidence mark (top-right of every core chart).
function DvCooperButton({ onClick, label = 'Ask Cooper about this chart' }) {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick}
      className="ifs-icon-button ifs-icon-button--tertiary ifs-icon-button--s ifs-icon-button--circle">
      <IFS.Icon name="cooper-evidence-icon" variant="medium" size={14} />
    </button>
  );
}

// Figma: data-viz-card-organism (4457:33030)
// Props: state default|hover|drag|cooper, title, header = extra DataVizHeader props, children = Content slot, legend (node, below content).
// variant="chart" is the frame every core chart (chart-column … chart-funnel) is drawn in: 6px padding, header with the Cooper
// button (onCooper) and, on hover, drag handle + "Edit with Cooper" (onEditWithCooper; false hides it) + the view-as-table toggle.
function DataVizCard({ variant = 'organism', state, title, header, legend, children, onCooper, onEditWithCooper, tableView, onToggleTable, className, ...rest }) {
  if (variant === 'chart') {
    return (
      <section data-state={state} aria-label={typeof title === 'string' ? title : undefined}
        className={IFS.cx('ifs-dv-card', 'ifs-dv-card--chart', state && `ifs-dv-card--${state}`, className)} {...rest}>
        <DataVizHeader title={title} draggable {...header}
          hoverActions={<>
            {onEditWithCooper !== false && <IFS.Button type="tertiary" size="s" iconLeft="cooper-system-icon" onClick={onEditWithCooper || undefined}>Edit with Cooper</IFS.Button>}
            {onToggleTable && <IFS.IconButton type="ghost" size="s" icon="system-dots-vertical" label={tableView ? 'View as chart' : 'View as table'} aria-pressed={!!tableView} onClick={onToggleTable} />}
            <span className="ifs-dv-header__divider" aria-hidden="true" />
          </>}
          slot={<DvCooperButton onClick={onCooper} />} />
        <div className="ifs-dv-card__body">{children}</div>
        {legend && <div className="ifs-dv-card__legend">{legend}</div>}
      </section>
    );
  }
  return (
    <section data-state={state} aria-label={typeof title === 'string' ? title : undefined}
      className={IFS.cx('ifs-dv-card', state && `ifs-dv-card--${state}`, className)} {...rest}>
      <DataVizHeader title={title} {...header} />
      <div className="ifs-dv-card__content">{children}{legend && <div className="ifs-dv-card__legend">{legend}</div>}</div>
    </section>
  );
}

// Figma: data-viz-modal-organism (4440:32681) and the chart-info-modal tooltip used by every core chart.
// Props: title, subtitle (Category line above the title → organism layout, value right of the title),
// value (chart layout: second line), delta = { text, direction up|down, tone positive|negative }, items = [{ label, value, color }],
// showValue (Figma show-value), variant chart (320 wide) | modal (256). children are appended under the items.
function DataVizTooltip({ title, subtitle, value, delta, items = [], showValue = true, variant = 'modal', children, className, ...rest }) {
  const deltaEl = delta && (
    <span className={IFS.cx('ifs-dv-tooltip__delta', delta.tone === 'negative' && 'ifs-dv-tooltip__delta--negative')}>
      <IFS.Icon name={delta.direction === 'down' ? 'arrow-caret-down-filled' : 'arrow-caret-up-filled'} size={12} />{delta.text}
    </span>
  );
  return (
    <div role="tooltip" className={IFS.cx('ifs-dv-tooltip', `ifs-dv-tooltip--${variant}`, className)} {...rest}>
      <div className="ifs-dv-tooltip__head">
        {subtitle != null ? (
          <div className="ifs-dv-tooltip__titlerow">
            <div className="ifs-dv-tooltip__titles"><span className="ifs-dv-tooltip__sub">{subtitle}</span><span className="ifs-dv-tooltip__title">{title}</span></div>
            {showValue && value != null && <span className="ifs-dv-tooltip__title">{value}</span>}
          </div>
        ) : <>
          <span className="ifs-dv-tooltip__title">{title}</span>
          {((showValue && value != null) || deltaEl) && <div className="ifs-dv-tooltip__line"><span>{showValue ? value : null}</span>{deltaEl}</div>}
        </>}
      </div>
      {(items.length > 0 || children) && <span className="ifs-dv-tooltip__divider" />}
      {items.length > 0 && (
        <div className="ifs-dv-tooltip__items">
          {items.map((it, i) => (
            <div key={i} className="ifs-dv-tooltip__item">
              {it.color && <span className="ifs-dv-tooltip__dot" style={{ background: dvColor(it.color) }} />}
              <span className="ifs-dv-tooltip__name">{it.label}</span>
              <span className="ifs-dv-tooltip__val">{it.value}</span>
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ chart shell */

// Positions the tooltip next to its anchor, inside the plot box.
function ChartTip({ anchor, box, tip }) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState(null);
  React.useLayoutEffect(() => {
    if (!ref.current || !anchor) return;
    const w = ref.current.offsetWidth, h = ref.current.offsetHeight;
    let left = anchor.x - w / 2, top = anchor.y + 16;
    if (top + h > box.h + 40) top = anchor.y - h - 16;
    left = Math.max(-8, Math.min(left, box.w - w + 8));
    top = Math.max(-8, top);
    setPos({ left, top });
  }, [anchor && anchor.x, anchor && anchor.y, box.w, box.h, tip && tip.title]);
  if (!anchor || !tip) return null;
  return (
    <div ref={ref} className="ifs-chart__tip" style={pos || { left: anchor.x, top: anchor.y + 16, visibility: 'hidden' }}>
      <DataVizTooltip variant="chart" {...tip} />
    </div>
  );
}

// Grey skeleton drawn while loading (Figma State=Loading): gridlines, label pills and placeholder marks.
function ChartSkeleton({ kind = 'bars', height = 328 }) {
  const [ref, W] = useWidth();
  const x0 = 44, x1 = W - 8, yT = 14, yB = height - 30;
  const hs = [0.5, 0.7, 0.59, 0.91, 0.74, 1];
  const band = (x1 - x0) / hs.length;
  return (
    <div className="ifs-chart__skeleton" aria-busy="true" aria-label="Loading chart">
      <div ref={ref} className="ifs-chart__plot">
        <svg className="ifs-chart__svg" width={W} height={height} aria-hidden="true">
          {kind === 'ring' ? (
            <circle cx={W / 2} cy={height / 2} r={100} fill="none" className="ifs-chart__skel-stroke" strokeWidth={40} />
          ) : <>
            {[0, 1, 2, 3, 4].map(i => { const y = yB - (i * (yB - yT)) / 4; return <g key={i}>
              <line x1={x0} x2={x1} y1={y} y2={y} className={i ? 'ifs-chart__grid' : 'ifs-chart__skel-stroke'} />
              <rect x={4} y={y - 4} width={[16, 26, 32, 32, 34][i]} height={8} rx={2} className="ifs-chart__skel" />
            </g>; })}
            {hs.map((h, i) => <g key={i}>
              <rect x={x0 + band * i + band * 0.22} y={yB - h * (yB - yT) * 0.84} width={band * 0.56} height={h * (yB - yT) * 0.84} className="ifs-chart__skel" />
              <rect x={x0 + band * i + band * 0.2} y={yB + 12} width={band * 0.6} height={8} rx={2} className="ifs-chart__skel" />
            </g>)}
          </>}
        </svg>
      </div>
      <div className="ifs-chart__skel-legend"><span /><span /></div>
    </div>
  );
}

function ChartEmpty({ title, text }) {
  return <div className="ifs-chart__empty"><span className="ifs-chart__empty-title">{title}</span><span className="ifs-chart__empty-text">{text}</span></div>;
}

// Shared frame for every core chart: DataVizCard (variant chart) + states + view-as-table fallback + screen-reader table.
// Shell props (all charts): title, state default|hover|empty|loading|cooper (hover = forced card hover; real hover works too),
// view / defaultView chart|table / onViewChange, defaultActive (index — or [row, col] for heatmap — whose tooltip starts open), onCooper, onEditWithCooper, emptyTitle, emptyText, height (plot px, default 328), className, style.
function ChartShell({ title, state, legend, table, isEmpty, skeleton = 'bars', height = 328, view, defaultView = 'chart', onViewChange,
  onCooper, onEditWithCooper, emptyTitle = 'Insufficient data', emptyText = 'Not enough data to display this chart yet.', className, style, children }) {
  const [v, setV] = useControlled(view, defaultView, onViewChange);
  const mode = state === 'loading' ? 'loading' : state === 'empty' || isEmpty ? 'empty' : v === 'table' ? 'table' : 'chart';
  const cardState = state === 'hover' || state === 'cooper' ? state : undefined;
  const tbl = table && (
    <table className="ifs-chart__sr">
      {title && <caption>{title}</caption>}
      <thead><tr>{table.columns.map(c => <th key={c.key} scope="col">{c.title}</th>)}</tr></thead>
      <tbody>{table.rows.map(r => <tr key={r.id}>{table.columns.map((c, i) => i === 0 ? <th key={c.key} scope="row">{r[c.key]}</th> : <td key={c.key}>{r[c.key]}</td>)}</tr>)}</tbody>
    </table>
  );
  return (
    <DataVizCard variant="chart" title={title} state={cardState} className={IFS.cx('ifs-chart', `ifs-chart--${mode}`, className)} style={style}
      onCooper={onCooper} onEditWithCooper={onEditWithCooper}
      tableView={mode === 'table'} onToggleTable={table && (mode === 'chart' || mode === 'table') ? () => setV(mode === 'table' ? 'chart' : 'table') : undefined}
      legend={mode === 'chart' || mode === 'table' ? legend : null}>
      {mode === 'loading' ? <ChartSkeleton kind={skeleton} height={height} />
        : mode === 'empty' ? <ChartEmpty title={emptyTitle} text={emptyText} />
        : mode === 'table' ? <div className="ifs-chart__table" style={{ height }}><IFS.Table columns={table.columns.map((c, i) => ({ ...c, align: i ? 'right' : undefined }))} rows={table.rows} /></div>
        : <>{children}{tbl}</>}
    </DataVizCard>
  );
}

// Legend row from [{ label, color, opacity, target }]; hovering an entry highlights its series (others → out of hover).
function ChartLegend({ items, active, onActive }) {
  return items.filter(Boolean).map((it, i) => (
    <LegendSwatch key={it.key ?? i} label={it.label} color={it.color} step={DV_STEP} swatchOpacity={it.opacity}
      state={it.target ? 'intended-target' : active == null ? 'default' : active === (it.key ?? i) ? 'hover' : 'out-of-hover'}
      onMouseEnter={onActive && it.key != null ? () => onActive(it.key) : undefined} onMouseLeave={onActive ? () => onActive(null) : undefined} />
  ));
}

// Interactive mark wrapper: hover + keyboard focus open the tooltip.
function Hit({ i, label, setActive, children, className }) {
  return (
    <g tabIndex={0} role="img" aria-label={label} className={IFS.cx('ifs-chart__hit', className)}
      onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(i)} onBlur={() => setActive(null)}
      onKeyDown={e => { if (e.key === 'Escape') { setActive(null); e.currentTarget.blur(); } }}>
      {children}
    </g>
  );
}

// y-axis grid (dashed border/base), solid baseline (white/alpha-30) and tick labels — the line-atom + value-label grammar.
function YAxis({ L, ticks, format }) {
  const base = ticks[0] <= 0 && ticks[ticks.length - 1] >= 0 ? 0 : ticks[0];
  return (
    <g aria-hidden="true">
      {ticks.map(t => <g key={t}>
        {t !== base && <line x1={L.x0} x2={L.x1} y1={L.y(t)} y2={L.y(t)} className="ifs-chart__grid" />}
        <text x={4} y={L.y(t)} dy="0.35em" className="ifs-chart__axis">{format(t)}</text>
      </g>)}
      <line x1={L.x0} x2={L.x1} y1={L.y(base)} y2={L.y(base)} className="ifs-chart__baseline" />
    </g>
  );
}

function catLayout(W, H, n, ticks, padL) {
  const x0 = padL, x1 = W - 8, yT = 14, yB = H - 30;
  const lo = ticks[0], hi = ticks[ticks.length - 1];
  const band = (x1 - x0) / Math.max(1, n);
  return { x0, x1, yT, yB, band, cx: i => x0 + band * (i + 0.5), y: v => yB - ((v - lo) / (hi - lo)) * (yB - yT) };
}
const axisPad = (ticks, format) => Math.max(36, Math.max(...ticks.map(t => String(format(t)).length)) * 7 + 16);

// Hook shared by category charts: width, active index, tooltip anchor.
function usePlot(height, defaultActive = null) {
  const [ref, W] = useWidth();
  const [active, setActive] = React.useState(defaultActive);
  const [series, setSeries] = React.useState(null);
  return { ref, W, H: height, active, setActive, series, setSeries };
}

function Plot({ p, label, children, tip }) {
  return (
    <div ref={p.ref} className="ifs-chart__plot" style={{ height: p.H }}>
      <svg className="ifs-chart__svg" width={p.W} height={p.H} role="group" aria-label={label}>{children}</svg>
      {tip && <ChartTip anchor={tip.anchor} box={{ w: p.W, h: p.H }} tip={tip.content} />}
    </div>
  );
}

const shellProps = ({ title, state, view, defaultView, onViewChange, onCooper, onEditWithCooper, emptyTitle, emptyText, height = 328, className, style }) =>
  ({ title, state, view, defaultView, onViewChange, onCooper, onEditWithCooper, emptyTitle, emptyText, height, className, style });

const tipFrom = (d, base, tooltip, i) => (tooltip ? tooltip(d, i) : { ...base, ...(d.delta && { delta: d.delta }), ...(d.details && { items: d.details }) });

/* ------------------------------------------------------------------ column / bar family */

// Figma: chart-column (9862:12468) — one measure across few or time-ordered categories; zero-based, one hue.
// Props: data = [{ label, value, reference?, delta?, details? }], valueLabel (legend + table), referenceLabel (white peer-median tick),
// color (data-viz group, default muted-purple), format(v) for values/axis, tooltip(datum, i) → DataVizTooltip props.
// Shell props (every chart): title, state default|hover|cooper|empty|loading, view chart|table / defaultView / onViewChange,
// onCooper, onEditWithCooper, emptyTitle, emptyText, height (default 328), className, style.
function ColumnChart(props) {
  const { data = [], valueLabel = 'Value', referenceLabel = 'Peer median', color = 'muted-purple', format = defaultFormat, tooltip, contiguous } = props;
  const p = usePlot(props.height || 328, props.defaultActive);
  const hasRef = data.some(d => d.reference != null);
  const ticks = scaleTicks(Math.min(0, ...finite(data.map(d => d.value))), Math.max(0, ...finite(data.flatMap(d => [d.value, d.reference]))));
  const L = catLayout(p.W, p.H, data.length, ticks, axisPad(ticks, format));
  const bw = contiguous ? L.band - 2 : Math.min(L.band * 0.55, 64);
  const legend = <ChartLegend items={[{ label: valueLabel, color }, hasRef && { label: referenceLabel, color: WHITE }]} />;
  const table = { columns: [{ key: 'label', title: contiguous ? 'Bin' : 'Category' }, { key: 'v', title: valueLabel }, hasRef && { key: 'r', title: referenceLabel }].filter(Boolean),
    rows: data.map((d, i) => ({ id: i, label: d.label, v: format(d.value), r: d.reference != null ? format(d.reference) : '–' })) };
  const a = p.active != null ? data[p.active] : null;
  const tip = a && { anchor: { x: L.cx(p.active), y: L.y(Math.max(a.value, 0)) },
    content: tipFrom(a, { title: a.label, value: format(a.value), items: a.reference != null ? [{ label: referenceLabel, value: format(a.reference) }] : [] }, tooltip, p.active) };
  return (
    <ChartShell {...shellProps(props)} legend={legend} table={table} isEmpty={!data.length}>
      <Plot p={p} label={props.title} tip={tip}>
        <YAxis L={L} ticks={ticks} format={format} />
        {data.map((d, i) => {
          const y0 = L.y(0), y1 = L.y(d.value), on = p.active === i;
          return (
            <Hit key={i} i={i} setActive={p.setActive} label={`${d.label}: ${format(d.value)}`}>
              <rect x={L.cx(i) - bw / 2 - (contiguous ? 1 : 8)} y={L.yT} width={bw + (contiguous ? 2 : 16)} height={p.H - L.yT} rx={3} className={IFS.cx('ifs-chart__band', on && 'ifs-chart__band--on')} />
              <path d={d.value >= 0 ? barPath(L.cx(i) - bw / 2, y1, bw, y0 - y1, contiguous ? 0 : 3) : `M${L.cx(i) - bw / 2},${y0}h${bw}V${y1}h${-bw}Z`} fill={on ? dvHover(color) : dvColor(color)} />
              {d.reference != null && <rect x={L.cx(i) - bw / 2 - 6} y={L.y(d.reference) - 1} width={bw + 12} height={2} fill={WHITE} />}
              {(!contiguous || i % Math.max(1, Math.ceil(56 / L.band)) === 0) && <text x={L.cx(i)} y={L.yB + 20} textAnchor="middle" className="ifs-chart__axis">{d.label}</text>}
            </Hit>
          );
        })}
      </Plot>
    </ChartShell>
  );
}

// Figma: chart-histogram (9864:14012) — distribution of one measure across bins (contiguous zero-based columns).
// Props: values = raw numbers + bins (count, default 10) or binWidth — or data = pre-binned [{ label, value }];
// binFormat(lo, hi) for bin labels, valueLabel (default 'Count'), + ColumnChart props.
function HistogramChart({ values, bins = 10, binWidth, binFormat, data, valueLabel = 'Count', ...props }) {
  const binned = React.useMemo(() => {
    if (data || !values || !values.length) return data || [];
    const v = finite(values), lo = Math.min(...v), hi = Math.max(...v);
    const w = binWidth || niceStep(hi - lo || 1, bins);
    const start = Math.floor(lo / w) * w, n = Math.max(1, Math.ceil((hi - start) / w + 1e-9));
    const out = Array.from({ length: n }, (_, i) => ({ lo: start + i * w, hi: start + (i + 1) * w, value: 0 }));
    v.forEach(x => { out[Math.min(n - 1, Math.floor((x - start) / w))].value += 1; });
    const f = binFormat || ((a, b) => `${defaultFormat(a)}–${defaultFormat(b)}`);
    return out.map(b => ({ label: f(b.lo, b.hi), value: b.value }));
  }, [data, values, bins, binWidth, binFormat]);
  return <ColumnChart {...props} data={binned} valueLabel={valueLabel} contiguous />;
}

// Figma: chart-bar (9862:12961) — horizontal bars for many categories, long labels or rankings (sort biggest → smallest).
// Props: as ColumnChart + sort (true = biggest first), labelWidth (category column, default 96). Values are labelled at the bar end.
function BarChart(props) {
  const { valueLabel = 'Value', referenceLabel = 'Peer median', color = 'muted-purple', format = defaultFormat, tooltip, sort = false, labelWidth = 96 } = props;
  const data = sort ? [...(props.data || [])].sort((a, b) => b.value - a.value) : (props.data || []);
  const p = usePlot(props.height || 328, props.defaultActive);
  const hasRef = data.some(d => d.reference != null);
  const max = Math.max(0, ...finite(data.flatMap(d => [d.value, d.reference])));
  const x0 = labelWidth + 8, x1 = p.W - 52, yT = 14, yB = p.H - 26;
  const row = (yB - yT) / Math.max(1, data.length), bh = Math.min(26, row * 0.57);
  const X = v => x0 + (max ? (v / max) * (x1 - x0) : 0);
  const cy = i => yT + row * (i + 0.5);
  const legend = <ChartLegend items={[{ label: valueLabel, color }, hasRef && { label: referenceLabel, color: WHITE }]} />;
  const table = { columns: [{ key: 'label', title: 'Category' }, { key: 'v', title: valueLabel }, hasRef && { key: 'r', title: referenceLabel }].filter(Boolean),
    rows: data.map((d, i) => ({ id: i, label: d.label, v: format(d.value), r: d.reference != null ? format(d.reference) : '–' })) };
  const a = p.active != null ? data[p.active] : null;
  const tip = a && { anchor: { x: Math.min(X(a.value), x1 - 40), y: cy(p.active) + 4 },
    content: tipFrom(a, { title: a.label, value: format(a.value), items: a.reference != null ? [{ label: referenceLabel, value: format(a.reference) }] : [] }, tooltip, p.active) };
  return (
    <ChartShell {...shellProps(props)} legend={legend} table={table} isEmpty={!data.length}>
      <Plot p={p} label={props.title} tip={tip}>
        <line x1={x0} x2={x0} y1={yT - 8} y2={yB + 8} className="ifs-chart__baseline" />
        {data.map((d, i) => {
          const on = p.active === i;
          return (
            <Hit key={i} i={i} setActive={p.setActive} label={`${d.label}: ${format(d.value)}`}>
              <rect x={0} y={cy(i) - row / 2 + 2} width={p.W} height={row - 4} rx={3} className={IFS.cx('ifs-chart__band', on && 'ifs-chart__band--on')} />
              <text x={8} y={cy(i)} dy="0.35em" className="ifs-chart__axis">{d.label}</text>
              <rect x={x0} y={cy(i) - bh / 2} width={Math.max(0, X(d.value) - x0)} height={bh} fill={on ? dvHover(color) : dvColor(color)} />
              <text x={X(d.value) + 8} y={cy(i)} dy="0.35em" className="ifs-chart__value">{format(d.value)}</text>
              {d.reference != null && <rect x={X(d.reference) - 1} y={cy(i) - bh / 2 - 4} width={2} height={bh + 8} fill={WHITE} />}
            </Hit>
          );
        })}
      </Plot>
    </ChartShell>
  );
}

const seriesTable = (data, series, format, extra = []) => ({
  columns: [{ key: 'label', title: 'Category' }, ...series.map(s => ({ key: `s_${s.key}`, title: s.label })), ...extra.map(e => ({ key: `e_${e.key}`, title: e.label }))],
  rows: data.map((d, i) => {
    const r = { id: i, label: d.label };
    series.forEach(s => { r[`s_${s.key}`] = format(d[s.key]); });
    extra.forEach(e => { r[`e_${e.key}`] = e.value ? e.value(d) : format(d[e.key]); });
    return r;
  }),
});

// Figma: chart-grouped-column (9862:13445) — 2–3 series side by side per category; consistent series order + legend.
// Props: data = [{ label, [series.key]: number, reference?, delta?, details? }], series = [{ key, label, color? }],
// referenceKey (default 'reference') + referenceLabel, format, tooltip. + shell props.
function GroupedColumnChart(props) {
  const { data = [], series = [], referenceKey = 'reference', referenceLabel = 'Peer median', format = defaultFormat, tooltip } = props;
  const p = usePlot(props.height || 328, props.defaultActive);
  const hasRef = data.some(d => d[referenceKey] != null);
  const vals = finite(data.flatMap(d => [...series.map(s => d[s.key]), d[referenceKey]]));
  const ticks = scaleTicks(Math.min(0, ...vals), Math.max(0, ...vals));
  const L = catLayout(p.W, p.H, data.length, ticks, axisPad(ticks, format));
  const gap = 6, gw = Math.min(L.band * 0.69, series.length * 56), bw = (gw - gap * (series.length - 1)) / Math.max(1, series.length);
  const legend = <ChartLegend active={p.series} onActive={p.setSeries}
    items={[...series.map((s, i) => ({ key: s.key, label: s.label, color: s.color || DV_GROUPS[i] })), hasRef && { label: referenceLabel, color: WHITE }]} />;
  const table = seriesTable(data, series, format, hasRef ? [{ key: referenceKey, label: referenceLabel }] : []);
  const a = p.active != null ? data[p.active] : null;
  const top = a ? Math.max(...finite(series.map(s => a[s.key]))) : 0;
  const tip = a && { anchor: { x: L.cx(p.active), y: L.y(top) },
    content: tipFrom(a, { title: a.label, items: [...series.map((s, i) => ({ label: s.label, value: format(a[s.key]), color: s.color || DV_GROUPS[i] })), ...(a[referenceKey] != null ? [{ label: referenceLabel, value: format(a[referenceKey]), color: WHITE }] : [])] }, tooltip, p.active) };
  return (
    <ChartShell {...shellProps(props)} legend={legend} table={table} isEmpty={!data.length || !series.length}>
      <Plot p={p} label={props.title} tip={tip}>
        <YAxis L={L} ticks={ticks} format={format} />
        {data.map((d, i) => {
          const on = p.active === i, gx = L.cx(i) - gw / 2;
          return (
            <Hit key={i} i={i} setActive={p.setActive} label={`${d.label}: ${series.map(s => `${s.label} ${format(d[s.key])}`).join(', ')}`}>
              <rect x={gx - 8} y={L.yT} width={gw + 16} height={p.H - L.yT} rx={3} className={IFS.cx('ifs-chart__band', on && 'ifs-chart__band--on')} />
              {series.map((s, k) => {
                const v = d[s.key] ?? 0, y1 = L.y(Math.max(v, 0)), y0 = L.y(Math.min(v, 0));
                return <path key={s.key} d={barPath(gx + k * (bw + gap), y1, bw, y0 - y1, v >= 0 ? 3 : 0)} opacity={p.series != null && p.series !== s.key ? 0.2 : 1}
                  fill={on ? dvHover(s.color, k) : dvColor(s.color, k)} />;
              })}
              {d[referenceKey] != null && <rect x={gx - 6} y={L.y(d[referenceKey]) - 1} width={gw + 12} height={2} fill={WHITE} />}
              <text x={L.cx(i)} y={L.yB + 20} textAnchor="middle" className="ifs-chart__axis">{d.label}</text>
            </Hit>
          );
        })}
      </Plot>
    </ChartShell>
  );
}

// Figma: chart-stacked-column (9863:11139) — composition of a total per category (series stack bottom → top in series order).
// Props: data = [{ label, [series.key]: number, delta?, details? }], series = [{ key, label, color? }], format, tooltip. + shell props.
function StackedColumnChart(props) {
  const { data = [], series = [], format = defaultFormat, tooltip } = props;
  const p = usePlot(props.height || 328, props.defaultActive);
  const totals = data.map(d => series.reduce((t, s) => t + Math.max(0, d[s.key] || 0), 0));
  const ticks = scaleTicks(0, Math.max(0, ...totals), 3);
  const L = catLayout(p.W, p.H, data.length, ticks, axisPad(ticks, format));
  const bw = Math.min(L.band * 0.55, 64);
  const legend = <ChartLegend active={p.series} onActive={p.setSeries} items={series.map((s, i) => ({ key: s.key, label: s.label, color: s.color || DV_GROUPS[i] }))} />;
  const table = seriesTable(data, series, format, [{ key: 'total', label: 'Total', value: d => format(series.reduce((t, s) => t + (d[s.key] || 0), 0)) }]);
  const a = p.active != null ? data[p.active] : null;
  const tip = a && { anchor: { x: L.cx(p.active), y: L.y(totals[p.active]) },
    content: tipFrom(a, { title: a.label, value: format(totals[p.active]), items: series.map((s, i) => ({ label: s.label, value: format(a[s.key]), color: s.color || DV_GROUPS[i] })) }, tooltip, p.active) };
  return (
    <ChartShell {...shellProps(props)} legend={legend} table={table} isEmpty={!data.length || !series.length}>
      <Plot p={p} label={props.title} tip={tip}>
        <YAxis L={L} ticks={ticks} format={format} />
        {data.map((d, i) => {
          const on = p.active === i;
          let acc = 0;
          return (
            <Hit key={i} i={i} setActive={p.setActive} label={`${d.label}: total ${format(totals[i])}; ${series.map(s => `${s.label} ${format(d[s.key])}`).join(', ')}`}>
              <rect x={L.cx(i) - bw / 2 - 8} y={L.yT} width={bw + 16} height={p.H - L.yT} rx={3} className={IFS.cx('ifs-chart__band', on && 'ifs-chart__band--on')} />
              {series.map((s, k) => {
                const v = Math.max(0, d[s.key] || 0), yb = L.y(acc), yt = L.y(acc + v);
                acc += v;
                return <rect key={s.key} x={L.cx(i) - bw / 2} y={yt} width={bw} height={Math.max(0, yb - yt - (k ? 1 : 0))} opacity={p.series != null && p.series !== s.key ? 0.2 : 1}
                  fill={on ? dvHover(s.color, k) : dvColor(s.color, k)} />;
              })}
              <text x={L.cx(i)} y={L.yB + 20} textAnchor="middle" className="ifs-chart__axis">{d.label}</text>
            </Hit>
          );
        })}
      </Plot>
    </ChartShell>
  );
}

/* ------------------------------------------------------------------ line / area */

// Shared x-indexed plot for line + area: hover anywhere picks the nearest point; ← → move it with the keyboard.
function useIndexHover(n, p, L) {
  const step = n > 1 ? (L.x1 - L.x0) / (n - 1) : 0;
  const X = i => (n > 1 ? L.x0 + step * i : (L.x0 + L.x1) / 2);
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    const i = step ? Math.round((e.clientX - r.left - L.x0) / step) : 0;
    p.setActive(Math.max(0, Math.min(n - 1, i)));
  };
  const overlay = label => (
    <rect x={L.x0 - 8} y={0} width={L.x1 - L.x0 + 16} height={p.H} fill="transparent" tabIndex={0} role="img" aria-label={label}
      className="ifs-chart__overlay" onMouseMove={onMove} onMouseLeave={() => p.setActive(null)}
      onFocus={() => p.active == null && p.setActive(n - 1)} onBlur={() => p.setActive(null)}
      onKeyDown={e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); p.setActive(Math.max(0, Math.min(n - 1, (p.active ?? 0) + (e.key === 'ArrowRight' ? 1 : -1)))); }
        if (e.key === 'Escape') p.setActive(null);
      }} />
  );
  return { X, overlay, every: Math.max(1, Math.ceil((n * 44) / Math.max(1, L.x1 - L.x0))) };
}
const linePath = pts => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join('');

// Figma: chart-line (9863:11650) — change over time; actual solid vs planned dashed; optional peer band + dashed median.
// Props: data = [{ label, [series.key]: number, … }], series = [{ key, label, color?, dashed?, points? }] (first series shows its
// points), band = { low, high, mid?, label } (keys into data; drawn as a white 16% band + dashed mid line), referenceKey/referenceLabel
// (dashed white line), zeroBased (default false — lines need not start at 0), format, tooltip. Hover: point + tooltip at that point.
function LineChart(props) {
  const { data = [], series = [], band, referenceKey, referenceLabel = 'Peer median', zeroBased = false, format = defaultFormat, tooltip, area = false } = props;
  const p = usePlot(props.height || 328, props.defaultActive);
  const uid = useUid('ifs-area');
  const keys = [...series.map(s => s.key), band && band.low, band && band.high, referenceKey].filter(Boolean);
  const vals = finite(data.flatMap(d => keys.map(k => d[k])));
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const ticks = vals.length ? scaleTicks(zeroBased ? Math.min(0, lo) : lo - (hi - lo) * 0.1, hi, 4) : [0, 1];
  const L = catLayout(p.W, p.H, data.length, ticks, axisPad(ticks, format));
  const { X, overlay, every } = useIndexHover(data.length, p, L);
  const pts = k => data.map((d, i) => (d[k] == null ? null : [X(i), L.y(d[k])])).filter(Boolean);
  const legend = <ChartLegend active={p.series} onActive={p.setSeries} items={[
    ...series.map((s, i) => ({ key: s.key, label: s.label, color: s.color || DV_GROUPS[i] })),
    band && { label: band.label, color: 'rgba(255,255,255,0.24)' /* raw in Figma */ },
    referenceKey && { label: referenceLabel, color: WHITE }]} />;
  const extra = [band && band.mid && { key: band.mid, label: band.label }, referenceKey && { key: referenceKey, label: referenceLabel }].filter(Boolean);
  const table = seriesTable(data, series, format, extra);
  const a = p.active != null ? data[p.active] : null;
  const s0 = series[0];
  const tip = a && s0 && { anchor: { x: X(p.active), y: L.y(a[s0.key] ?? ticks[0]) },
    content: tipFrom(a, { title: a.label, value: format(a[s0.key]), items: [
      ...series.slice(1).map((s, i) => ({ label: s.label, value: format(a[s.key]), color: s.color || DV_GROUPS[i + 1] })),
      ...(band && band.mid && a[band.mid] != null ? [{ label: band.label, value: `${format(a[band.mid])} ± ${format((a[band.high] - a[band.low]) / 2)}`, color: 'rgba(255,255,255,0.24)' }] : []),
      ...(referenceKey && a[referenceKey] != null ? [{ label: referenceLabel, value: format(a[referenceKey]), color: WHITE }] : [])] }, tooltip, p.active) };
  const dim = k => (p.series != null && p.series !== k ? 0.2 : 1);
  return (
    <ChartShell {...shellProps(props)} legend={legend} table={table} isEmpty={!data.length || !series.length}>
      <Plot p={p} label={props.title} tip={tip}>
        <YAxis L={L} ticks={ticks} format={format} />
        {data.map((d, i) => (i % every === 0 ? <text key={i} x={X(i)} y={L.yB + 20} textAnchor="middle" className="ifs-chart__axis" aria-hidden="true">{d.label}</text> : null))}
        {band && (() => { const up = pts(band.high), dn = pts(band.low).reverse(); return up.length ? <path d={`${linePath(up)}L${dn.map(q => q.join(',')).join('L')}Z`} fill="rgba(255,255,255,0.16)" /* raw in Figma */ /> : null; })()}
        {band && band.mid && <path d={linePath(pts(band.mid))} fill="none" className="ifs-chart__refline" />}
        {area && series.map((s, k) => (
          <g key={s.key}>
            <defs><linearGradient id={`${uid}-${k}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={dvColor(s.color, k)} stopOpacity="0.45" /><stop offset="1" stopColor={dvColor(s.color, k)} stopOpacity="0" /></linearGradient></defs>
            <path d={`${linePath(pts(s.key))}L${X(data.length - 1)},${L.y(Math.max(0, ticks[0]))}L${X(0)},${L.y(Math.max(0, ticks[0]))}Z`} fill={`url(#${uid}-${k})`} opacity={dim(s.key)} />
          </g>
        ))}
        {referenceKey && <path d={linePath(pts(referenceKey))} fill="none" className="ifs-chart__refline" />}
        {series.map((s, k) => (
          <g key={s.key} opacity={dim(s.key)}>
            <path d={linePath(pts(s.key))} fill="none" stroke={dvColor(s.color, k)} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={s.dashed ? '6 4' : undefined} />
            {(s.points ?? (k === 0 && !area)) && pts(s.key).map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill={dvColor(s.color, k)} />)}
          </g>
        ))}
        {a && <g aria-hidden="true">
          <line x1={X(p.active)} x2={X(p.active)} y1={L.yT} y2={L.yB} className="ifs-chart__guide" />
          {series.map((s, k) => a[s.key] != null && <circle key={s.key} cx={X(p.active)} cy={L.y(a[s.key])} r={3} fill={dvHover(s.color, k)} />)}
          {s0 && a[s0.key] != null && <circle cx={X(p.active)} cy={L.y(a[s0.key])} r={10} fill="none" stroke={dvColor(s0.color, 0)} strokeWidth={1} />}
        </g>}
        {overlay(`${props.title || 'Line chart'}: use left and right arrow keys to read each point`)}
      </Plot>
    </ChartShell>
  );
}

// Figma: chart-area (9863:12167) — cumulative volume over time; zero-based; series fill fades from 45% to 0 of its colour.
// Props: as LineChart (zeroBased defaults to true; points hidden unless series.points).
function AreaChart(props) {
  return <LineChart zeroBased {...props} area />;
}

/* ------------------------------------------------------------------ pie / donut */

function RoundChart(props) {
  const { data: raw = [], donut, centerValue, centerLabel, sort = true, valueLabel = 'Value', format = defaultFormat, tooltip } = props;
  const data = sort ? [...raw].map((d, i) => ({ ...d, _i: i })).sort((a, b) => b.value - a.value) : raw.map((d, i) => ({ ...d, _i: i }));
  const p = usePlot(props.height || 328, props.defaultActive);
  const total = data.reduce((t, d) => t + Math.max(0, d.value || 0), 0);
  const R = Math.min(124, p.H / 2 - 14, p.W / 2 - 8), r0 = donut ? R * 0.66 : 0, cx = p.W / 2, cy = p.H / 2;
  const color = d => d.color || DV_GROUPS[d._i % 7];
  let acc = 0;
  const arcs = data.map(d => { const a0 = (acc / total) * Math.PI * 2; acc += Math.max(0, d.value || 0); return { d, a0, a1: (acc / total) * Math.PI * 2 }; });
  const pct = v => (total ? Math.round((v / total) * 100) : 0);
  const legend = <ChartLegend active={p.series} onActive={p.setSeries} items={data.map(d => ({ key: d.label, label: d.label, color: color(d), opacity: d.opacity }))} />;
  const table = { columns: [{ key: 'label', title: 'Category' }, { key: 'v', title: valueLabel }, { key: 'p', title: 'Share' }],
    rows: data.map((d, i) => ({ id: i, label: d.label, v: format(d.value), p: `${pct(d.value)}%` })) };
  const act = p.active != null ? arcs[p.active] : null;
  const mid = act && (act.a0 + act.a1) / 2;
  const tip = act && { anchor: { x: cx + (R * 0.8) * Math.sin(mid), y: cy - (R * 0.8) * Math.cos(mid) },
    content: tipFrom(act.d, { title: act.d.label, value: `${format(act.d.value)} of ${format(total)} (${pct(act.d.value)}%)` }, tooltip, p.active) };
  return (
    <ChartShell {...shellProps(props)} skeleton="ring" legend={legend} table={table} isEmpty={!total}>
      <Plot p={p} label={props.title} tip={tip}>
        {arcs.map(({ d, a0, a1 }, i) => {
          const on = p.active === i, m = (a0 + a1) / 2, lr = donut ? (R + r0) / 2 : R * 0.62;
          return (
            <Hit key={i} i={i} setActive={p.setActive} label={`${d.label}: ${format(d.value)}, ${pct(d.value)}%`}>
              <path d={arcPath(cx, cy, r0, R, a0, a1)} fill={on ? dvHover(color(d)) : dvColor(color(d))} fillOpacity={d.opacity}
                opacity={p.series != null && p.series !== d.label ? 0.2 : 1} className="ifs-chart__slice" />
              {a1 - a0 > 0.25 && <text x={cx + lr * Math.sin(m)} y={cy - lr * Math.cos(m)} dy="0.35em" textAnchor="middle" className="ifs-chart__slice-label">{pct(d.value)}%</text>}
            </Hit>
          );
        })}
        {donut && centerValue != null && <g aria-hidden="true">
          <text x={cx} y={cy - (centerLabel ? 6 : 0)} dy="0.35em" textAnchor="middle" className="ifs-chart__center">{centerValue}</text>
          {centerLabel && <text x={cx} y={cy + 20} dy="0.35em" textAnchor="middle" className="ifs-chart__axis">{centerLabel}</text>}
        </g>}
      </Plot>
    </ChartShell>
  );
}

// Figma: chart-pie (9866:12309) — parts of one whole with few slices (prefer DonutChart). Slices largest → smallest clockwise from 12.
// Props: data = [{ label, value, color?, opacity?, delta?, details? }], sort (default true), valueLabel, format, tooltip. + shell props.
function PieChart(props) { return <RoundChart {...props} donut={false} />; }

// Figma: chart-donut (9866:12774) — share of a whole; one legend; the hole carries the total.
// Props: as PieChart + centerValue (big number) + centerLabel (caption under it).
function DonutChart(props) { return <RoundChart {...props} donut />; }

/* ------------------------------------------------------------------ scatter / bubble */

// Figma: chart-scatter (9866:13245) — relationship between two measures; clusters and outliers.
// Props: data = [{ label, x, y, series?, size?, delta?, details? }], series = [{ key, label, color? }] (absent = one series),
// xFormat, yFormat (default format), xUnit (suffix on the last x tick, e.g. "days"), xLabel/yLabel (table + tooltip names),
// xReference / yReference (dashed white peer-median lines) + referenceLabel, bubble (size → radius), tooltip. + shell props.
function ScatterChart(props) {
  const { data = [], series = [], format = defaultFormat, xFormat = defaultFormat, yFormat = format, xUnit, xLabel = 'X', yLabel = 'Y',
    xReference, yReference, referenceLabel = 'Peer median', bubble = false, sizeLabel = 'Size', tooltip } = props;
  const p = usePlot(props.height || 328, props.defaultActive);
  const yt = scaleTicks(Math.min(0, ...finite(data.map(d => d.y))), Math.max(0, ...finite([...data.map(d => d.y), yReference])));
  const xt = scaleTicks(Math.min(0, ...finite(data.map(d => d.x))), Math.max(0, ...finite([...data.map(d => d.x), xReference])));
  const L = catLayout(p.W, p.H, 1, yt, axisPad(yt, yFormat));
  const X = v => L.x0 + ((v - xt[0]) / (xt[xt.length - 1] - xt[0])) * (L.x1 - L.x0 - 24);
  const smax = Math.max(1, ...finite(data.map(d => d.size)));
  const rad = d => (bubble ? 4 + Math.sqrt(Math.max(0, d.size || 0) / smax) * 18 : 5);
  const sIdx = d => Math.max(0, series.findIndex(s => s.key === d.series));
  const col = d => (series.length ? series[sIdx(d)].color || DV_GROUPS[sIdx(d)] : props.color || DV_GROUPS[0]);
  const legend = <ChartLegend active={p.series} onActive={p.setSeries} items={[
    ...(series.length ? series.map((s, i) => ({ key: s.key, label: s.label, color: s.color || DV_GROUPS[i] })) : [{ label: props.valueLabel || 'Items', color: col({}) }]),
    (xReference != null || yReference != null) && { label: referenceLabel, color: WHITE }]} />;
  const table = { columns: [{ key: 'label', title: 'Item' }, series.length && { key: 's', title: 'Series' }, { key: 'x', title: xLabel }, { key: 'y', title: yLabel }, bubble && { key: 'z', title: sizeLabel }].filter(Boolean),
    rows: data.map((d, i) => ({ id: i, label: d.label, s: series.length ? series[sIdx(d)].label : '', x: xFormat(d.x), y: yFormat(d.y), z: bubble ? format(d.size) : '' })) };
  const a = p.active != null ? data[p.active] : null;
  const tip = a && { anchor: { x: X(a.x), y: L.y(a.y) },
    content: tipFrom(a, { title: a.label, value: yFormat(a.y), items: [{ label: xLabel, value: xFormat(a.x) + (xUnit ? ` ${xUnit}` : '') }, ...(bubble ? [{ label: sizeLabel, value: format(a.size) }] : [])] }, tooltip, p.active) };
  const order = data.map((d, i) => i).sort((i, j) => (bubble ? (data[j].size || 0) - (data[i].size || 0) : 0));
  return (
    <ChartShell {...shellProps(props)} legend={legend} table={table} isEmpty={!data.length}>
      <Plot p={p} label={props.title} tip={tip}>
        <YAxis L={L} ticks={yt} format={yFormat} />
        {xt.map((t, i) => <text key={t} x={X(t)} y={L.yB + 20} textAnchor="middle" className="ifs-chart__axis" aria-hidden="true">{xFormat(t)}{i === xt.length - 1 && xUnit ? ` ${xUnit}` : ''}</text>)}
        {xReference != null && <line x1={X(xReference)} x2={X(xReference)} y1={L.yT} y2={L.yB} className="ifs-chart__refline ifs-chart__refline--thin" />}
        {yReference != null && <line x1={L.x0} x2={L.x1} y1={L.y(yReference)} y2={L.y(yReference)} className="ifs-chart__refline ifs-chart__refline--thin" />}
        {order.map(i => {
          const d = data[i], on = p.active === i, k = sIdx(d);
          return (
            <Hit key={i} i={i} setActive={p.setActive} label={`${d.label}: ${xLabel} ${xFormat(d.x)}, ${yLabel} ${yFormat(d.y)}`}>
              <circle cx={X(d.x)} cy={L.y(d.y)} r={rad(d)} fill={on ? dvHover(col(d), k) : dvColor(col(d), k)} fillOpacity={bubble ? 0.7 : 0.9}
                opacity={p.series != null && p.series !== d.series ? 0.2 : 1} />
              {on && <circle cx={X(d.x)} cy={L.y(d.y)} r={rad(d) + 5} fill="none" stroke={dvColor(col(d), k)} strokeWidth={1} />}
            </Hit>
          );
        })}
      </Plot>
    </ChartShell>
  );
}

// Figma: chart-bubble (9866:13788) — scatter with a third measure as bubble area. Props: as ScatterChart; data items carry `size`.
function BubbleChart(props) { return <ScatterChart {...props} bubble />; }

/* ------------------------------------------------------------------ gauge */

// Figma: chart-gauge (9867:618) — one KPI against one reference value on a 180° arc.
// Props: value, max (default 100), min (0), target (solid white tick reaching outside the arc), reference (dashed white tick across the arc), format (default v → v%),
// label (caption under the number), valueLabel / targetLabel / referenceLabel (legend), color, delta, details, tooltip. + shell props.
function GaugeChart(props) {
  const { value = 0, min = 0, max = 100, target, reference, format = v => `${fmtFull.format(v)}%`, label, valueLabel = 'Value', targetLabel = 'Target',
    referenceLabel = 'Peer median', color = 'muted-purple', tooltip } = props;
  const p = usePlot(props.height || 328, props.defaultActive);
  const [on, setOn] = React.useState(!!props.defaultActive);
  const R = Math.min(150, p.W / 2 - 24), cx = p.W / 2, cy = p.H / 2 + R / 2 + 4;
  const ang = v => Math.PI * Math.max(0, Math.min(1, (v - min) / (max - min || 1))); // 0 = left end, π = right end
  const pt = (v, r) => [cx - r * Math.cos(ang(v)), cy - r * Math.sin(ang(v))];
  const arc = (v0, v1) => { const [x0, y0] = pt(v0, R), [x1, y1] = pt(v1, R); return `M${x0},${y0}A${R},${R} 0 0 1 ${x1},${y1}`; };
  const tick = (v, r0, r1) => { const [x0, y0] = pt(v, r0), [x1, y1] = pt(v, r1); return { x1: x0, y1: y0, x2: x1, y2: y1 }; };
  const legend = <ChartLegend items={[{ label: valueLabel, color }, target != null && { label: targetLabel, color: 'rgba(255,255,255,0.9)' /* raw in Figma */ }, reference != null && { label: referenceLabel, color: WHITE }]} />;
  const table = { columns: [{ key: 'label', title: 'Measure' }, { key: 'v', title: 'Value' }],
    rows: [{ id: 0, label: valueLabel, v: format(value) }, target != null && { id: 1, label: targetLabel, v: format(target) }, reference != null && { id: 2, label: referenceLabel, v: format(reference) }].filter(Boolean) };
  const [ex, ey] = pt(value, R);
  const tip = on && { anchor: { x: ex, y: ey },
    content: tooltip ? tooltip(props) : { title: props.title || valueLabel, value: format(value), delta: props.delta,
      items: props.details || [target != null && { label: targetLabel, value: format(target) }, target != null && { label: 'Gap', value: format(Math.abs(target - value)) }, reference != null && { label: referenceLabel, value: format(reference) }].filter(Boolean) } };
  return (
    <ChartShell {...shellProps(props)} skeleton="ring" legend={legend} table={table}>
      <Plot p={p} label={props.title} tip={tip}>
        <path d={arc(min, max)} fill="none" stroke="var(--border-base)" strokeWidth={22} strokeLinecap="round" />
        <g tabIndex={0} role="img" aria-label={`${valueLabel}: ${format(value)}${target != null ? `, ${targetLabel} ${format(target)}` : ''}`} className="ifs-chart__hit"
          onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
          {value > min && <path d={arc(min, value)} fill="none" stroke={on ? dvHover(color) : dvColor(color)} strokeWidth={22} strokeLinecap="round" />}
        </g>
        {reference != null && <line {...tick(reference, R - 13.5, R + 13.5)} stroke={WHITE} strokeWidth={3} strokeDasharray="4 3" />}
        {target != null && <line {...tick(target, R - 11, R + 24)} stroke="var(--border-white)" strokeWidth={2} strokeLinecap="round" opacity={0.9} />}
        <text x={cx} y={cy - 40} textAnchor="middle" className="ifs-chart__gauge-value">{format(value)}</text>
        {label && <text x={cx} y={cy - 12} textAnchor="middle" className="ifs-chart__axis">{label}</text>}
        <text x={cx - R} y={cy + 30} textAnchor="middle" className="ifs-chart__axis">{format(min)}</text>
        <text x={cx + R} y={cy + 30} textAnchor="middle" className="ifs-chart__axis">{format(max)}</text>
      </Plot>
    </ChartShell>
  );
}

/* ------------------------------------------------------------------ waterfall */

// Figma: chart-waterfall (9866:16075) — bridge from a start value to an end value through increments.
// Props: data = [{ label, value, total? }]: total:true bars stand on 0 (value given = reset the running total; omitted = show it),
// other bars float as +/- steps. colors = { total, increase, decrease } (groups; default muted-purple / rose / teal),
// labels = { total, increase, decrease } (legend), format, tooltip. + shell props.
function WaterfallChart(props) {
  const { data = [], format = defaultFormat, tooltip } = props;
  const colors = { total: 'muted-purple', increase: 'rose', decrease: 'teal', ...props.colors };
  const names = { total: 'Total', increase: 'Increase', decrease: 'Decrease', ...props.labels };
  const p = usePlot(props.height || 328, props.defaultActive);
  let run = 0;
  const bars = data.map(d => {
    if (d.total) { if (d.value != null) run = d.value; return { d, kind: 'total', lo: Math.min(0, run), hi: Math.max(0, run), end: run, shown: run }; }
    const start = run; run += d.value || 0;
    return { d, kind: d.value >= 0 ? 'increase' : 'decrease', lo: Math.min(start, run), hi: Math.max(start, run), end: run, shown: d.value };
  });
  const ticks = scaleTicks(Math.min(0, ...bars.map(b => b.lo)), Math.max(0, ...bars.map(b => b.hi)));
  const L = catLayout(p.W, p.H, data.length, ticks, axisPad(ticks, format));
  const bw = Math.min(48, L.band * 0.6);
  const legend = <ChartLegend items={['total', 'increase', 'decrease'].map(k => ({ label: names[k], color: colors[k] }))} />;
  const table = { columns: [{ key: 'label', title: 'Step' }, { key: 'v', title: 'Change' }, { key: 'r', title: 'Running total' }],
    rows: bars.map((b, i) => ({ id: i, label: b.d.label, v: b.kind === 'total' ? format(b.shown) : signed(b.shown, format), r: format(b.end) })) };
  const act = p.active != null ? bars[p.active] : null;
  const tip = act && { anchor: { x: L.cx(p.active), y: L.y(act.hi) },
    content: tipFrom(act.d, { title: act.d.label, value: act.kind === 'total' ? format(act.shown) : signed(act.shown, format), items: [{ label: 'Running total', value: format(act.end) }] }, tooltip, p.active) };
  return (
    <ChartShell {...shellProps(props)} legend={legend} table={table} isEmpty={!data.length}>
      <Plot p={p} label={props.title} tip={tip}>
        <YAxis L={L} ticks={ticks} format={format} />
        {bars.map((b, i) => i < bars.length - 1 && (
          <line key={`c${i}`} x1={L.cx(i) + bw / 2} x2={L.cx(i + 1) - bw / 2} y1={L.y(b.end)} y2={L.y(b.end)} className="ifs-chart__connector" />
        ))}
        {bars.map((b, i) => {
          const on = p.active === i, c = colors[b.kind];
          return (
            <Hit key={i} i={i} setActive={p.setActive} label={`${b.d.label}: ${b.kind === 'total' ? format(b.shown) : signed(b.shown, format)}`}>
              <rect x={L.cx(i) - bw / 2 - 12} y={L.yT} width={bw + 24} height={p.H - L.yT} rx={3} className={IFS.cx('ifs-chart__band', on && 'ifs-chart__band--on')} />
              <rect x={L.cx(i) - bw / 2} y={L.y(b.hi)} width={bw} height={Math.max(1, L.y(b.lo) - L.y(b.hi))} rx={2} fill={on ? dvHover(c) : dvColor(c)} />
              <text x={L.cx(i)} y={L.y(b.hi) - 8} textAnchor="middle" className="ifs-chart__value">{b.kind === 'total' ? format(b.shown) : signed(b.shown, format)}</text>
              <text x={L.cx(i)} y={L.yB + 20} textAnchor="middle" className="ifs-chart__axis">{b.d.label}</text>
            </Hit>
          );
        })}
      </Plot>
    </ChartShell>
  );
}

/* ------------------------------------------------------------------ funnel */

// Figma: chart-funnel (9867:1065) — drop-off across ordered stages.
// Props: data = [{ label, value, reference? (peer value for that stage → white ticks), delta?, details? }], color (stages; default
// muted-purple, fading per stage), outcomeColor (last stage; default teal — set null to keep one colour), stageLabel/outcomeLabel/
// referenceLabel (legend), format (default full number), tooltip. + shell props.
function FunnelChart(props) {
  const { data = [], color = 'muted-purple', outcomeColor = 'teal', stageLabel = 'In pipeline', outcomeLabel = 'Completed', referenceLabel = 'Peer median',
    format = v => fmtFull.format(v), tooltip } = props;
  const p = usePlot(props.height || 328, props.defaultActive);
  const n = data.length, v0 = Math.max(1, ...finite(data.map(d => d.value)));
  const maxW = Math.min(480, p.W - 110), cx = Math.min(p.W / 2, (p.W - 40) / 2 + 10);
  const gap = 6, h = Math.min(52, (p.H - 8) / Math.max(1, n) - gap);
  const wOf = v => maxW * (0.25 + 0.75 * Math.max(0, v) / v0);
  const hasRef = data.some(d => d.reference != null);
  const last = outcomeColor && n > 1;
  const legend = <ChartLegend items={[{ label: stageLabel, color }, last && { label: outcomeLabel, color: outcomeColor }, hasRef && { label: referenceLabel, color: WHITE }]} />;
  const drop = i => (i && data[i - 1].value ? Math.round(((data[i].value - data[i - 1].value) / data[i - 1].value) * 100) : null);
  const table = { columns: [{ key: 'label', title: 'Stage' }, { key: 'v', title: 'Count' }, { key: 'd', title: 'Change' }, hasRef && { key: 'r', title: referenceLabel }].filter(Boolean),
    rows: data.map((d, i) => ({ id: i, label: d.label, v: format(d.value), d: drop(i) == null ? '–' : `${drop(i) > 0 ? '+' : '−'}${Math.abs(drop(i))}%`, r: d.reference != null ? format(d.reference) : '–' })) };
  const a = p.active != null ? data[p.active] : null;
  const y = i => 4 + i * (h + gap);
  const tip = a && { anchor: { x: cx, y: y(p.active) + h - 6 },
    content: tipFrom(a, { title: a.label, value: format(a.value), items: [p.active > 0 && { label: 'Entered stage', value: format(data[p.active - 1].value) }, p.active > 0 && { label: 'Dropped', value: format(data[p.active - 1].value - a.value) }, a.reference != null && { label: referenceLabel, value: format(a.reference) }].filter(Boolean) }, tooltip, p.active) };
  return (
    <ChartShell {...shellProps(props)} legend={legend} table={table} isEmpty={!n}>
      <Plot p={p} label={props.title} tip={tip}>
        {data.map((d, i) => {
          const wt = wOf(d.value), wb = i < n - 1 ? wOf(data[i + 1].value) : wt * 0.75, on = p.active === i, isLast = last && i === n - 1;
          const op = isLast ? 0.7 : Math.max(0.3, 0.85 - i * 0.17);
          const dp = drop(i);
          return (
            <Hit key={i} i={i} setActive={p.setActive} label={`${d.label}: ${format(d.value)}${dp != null ? `, ${dp}% vs previous stage` : ''}`}>
              <path d={`M${cx - wt / 2},${y(i)}H${cx + wt / 2}L${cx + wb / 2},${y(i) + h}H${cx - wb / 2}Z`} fill={dvColor(isLast ? outcomeColor : color)}
                fillOpacity={on ? Math.min(1, op + 0.15) : op} stroke={on ? 'var(--border-medium)' : 'none'} />
              <text x={cx} y={y(i) + h / 2} dy="0.35em" textAnchor="middle" className="ifs-chart__value">{d.label}{' '}{format(d.value)}</text>
              {d.reference != null && [-1, 1].map(s => <rect key={s} x={cx + s * wOf(d.reference) / 2 - 1} y={y(i) + h / 2 - 11} width={2} height={22} fill={WHITE} />)}
              {dp != null && <text x={cx + Math.max(wt, d.reference != null ? wOf(d.reference) : 0) / 2 + 20} y={y(i) + h / 2} dy="0.35em" className="ifs-chart__axis">{dp > 0 ? '+' : '−'}{Math.abs(dp)}%</text>}
            </Hit>
          );
        })}
      </Plot>
    </ChartShell>
  );
}

/* ------------------------------------------------------------------ heatmap */

// Figma: chart-heatmap (9866:14280) — ordered magnitude across a matrix, one hue group (Figma: teal-3 with opacity by value).
// Props: rows = [labels], columns = [labels], values = [[row][col] numbers], color (default teal), columnLabelEvery (auto),
// lowLabel / highLabel (legend), valueLabel, format, tooltip(cell = { row, column, value, r, c }). + shell props.
function HeatmapChart(props) {
  const { rows = [], columns = [], values = [], color = 'teal', lowLabel = 'Lower', highLabel = 'Higher', valueLabel = 'Value', format = defaultFormat, tooltip } = props;
  const p = usePlot(props.height || 328, props.defaultActive);
  const flat = finite(values.flat());
  const lo = Math.min(...flat), hi = Math.max(...flat);
  const op = v => 0.2 + 0.8 * (hi > lo ? (v - lo) / (hi - lo) : 1);
  const labelW = 48, pitch = Math.min((p.W - labelW - 8) / Math.max(1, columns.length), (p.H - 34) / Math.max(1, rows.length), 39), cell = pitch - 5;
  const every = props.columnLabelEvery || Math.max(1, Math.ceil(36 / pitch));
  const x = c => labelW + c * pitch, y = r => 8 + r * pitch;
  const legend = <ChartLegend items={[{ label: lowLabel, color, opacity: 0.2 }, { label: highLabel, color }]} />;
  const table = { columns: [{ key: 'label', title: '' }, ...columns.map((c, i) => ({ key: `c${i}`, title: c }))],
    rows: rows.map((r, i) => Object.assign({ id: i, label: r }, ...columns.map((c, j) => ({ [`c${j}`]: format(values[i] && values[i][j]) })))) };
  const [ar, ac] = p.active != null ? p.active : [];
  const cellObj = p.active != null ? { row: rows[ar], column: columns[ac], value: values[ar][ac], r: ar, c: ac } : null;
  const tip = cellObj && { anchor: { x: x(ac) + cell / 2, y: y(ar) + cell },
    content: tooltip ? tooltip(cellObj) : { title: `${cellObj.row} · ${cellObj.column}`, value: `${format(cellObj.value)} ${valueLabel}`.trim() } };
  return (
    <ChartShell {...shellProps(props)} legend={legend} table={table} isEmpty={!flat.length}>
      <Plot p={p} label={props.title} tip={tip}>
        {rows.map((r, i) => <text key={r} x={8} y={y(i) + cell / 2} dy="0.35em" className="ifs-chart__axis">{r}</text>)}
        {columns.map((c, j) => (j % every === 0 ? <text key={c} x={x(j) + cell / 2} y={y(rows.length) + 12} textAnchor="middle" className="ifs-chart__axis">{c}</text> : null))}
        {rows.map((r, i) => columns.map((c, j) => {
          const v = values[i] && values[i][j], on = ar === i && ac === j;
          return (
            <Hit key={`${i}-${j}`} i={[i, j]} setActive={p.setActive} label={`${r}, ${c}: ${format(v)}`}>
              <rect x={x(j)} y={y(i)} width={cell} height={cell} rx={3} fill={dvColor(color)} fillOpacity={v == null ? 0.05 : op(v)}
                stroke={on ? WHITE : 'none'} strokeWidth={1.5} />
            </Hit>
          );
        }))}
      </Plot>
    </ChartShell>
  );
}

/* ------------------------------------------------------------------ small molecules */

// Figma: progress-ring-molecule (4619:18187)
// Props: value 0–100 (Figma % variants 0/10/20/40/50/60/80/100 — any value works), size (default 24), label = accessible name.
function ProgressRing({ value = 0, size = 24, label = 'Progress', className, ...rest }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  const sw = size * 0.15, r = size / 2 - sw / 2, C = 2 * Math.PI * r; // Figma: ellipse arc, inner radius 70%
  return (
    <svg role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={v} width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      className={IFS.cx('ifs-progress-ring', className)} {...rest}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" className="ifs-progress-ring__track" strokeWidth={sw} />
      {v > 0 && <circle cx={size / 2} cy={size / 2} r={r} fill="none" className="ifs-progress-ring__bar" strokeWidth={sw}
        strokeDasharray={`${(C * v) / 100} ${C}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />}
    </svg>
  );
}

// Figma: evidence-strength-bar-molecule (67:6634)
// Props: value (%), thresholds = [review, approve] (default [70, 90]), min (left end of the Reject band, default 50), title,
// labels = [reject, review, approve] captions. Type (Reject|Review|Approve) follows the value: the active band is drawn solid.
function EvidenceStrength({ value = 0, thresholds = [70, 90], min = 50, title = 'Evidence strength', labels, className, ...rest }) {
  const [t1, t2] = thresholds;
  const type = value < t1 ? 'reject' : value < t2 ? 'review' : 'approve';
  const caps = labels || [`<${t1}% Reject`, `${t1}–${t2}% Review`, `>${t2}% Approve`];
  const seg = [[min, t1], [t1, t2], [t2, 100]];
  const k = type === 'reject' ? 0 : type === 'review' ? 1 : 2;
  const [a, b] = seg[k];
  const pos = ((k + Math.max(0, Math.min(1, (value - a) / (b - a || 1)))) / 3) * 100;
  return (
    <div role="meter" aria-label={title} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} aria-valuetext={`${value}% — ${caps[k]}`}
      className={IFS.cx('ifs-evidence', `ifs-evidence--${type}`, className)} {...rest}>
      <span className="ifs-evidence__title">{title}</span>
      <div className="ifs-evidence__bar">
        {['reject', 'review', 'approve'].map((s, i) => <span key={s} className={IFS.cx('ifs-evidence__seg', `ifs-evidence__seg--${s}`, i === k && 'ifs-evidence__seg--on')} />)}
        <span className="ifs-evidence__marker" style={{ left: `${pos}%` }}><span className="ifs-evidence__value">{value}%</span><span className="ifs-evidence__pointer" /></span>
      </div>
      <div className="ifs-evidence__caption">{caps.map(c => <span key={c}>{c}</span>)}</div>
    </div>
  );
}

Object.assign(IFS, {
  DataVizBar, DataVizGroupedBar, DataVizLine, DataVizIndicator, ValueLabel, LegendSwatch, DataVizHeader, DataVizCard, DataVizTooltip,
  ColumnChart, HistogramChart, BarChart, GroupedColumnChart, StackedColumnChart, LineChart, AreaChart, PieChart, DonutChart, ScatterChart, BubbleChart,
  GaugeChart, WaterfallChart, FunnelChart, HeatmapChart, ProgressRing, EvidenceStrength,
});
export {
  DataVizBar, DataVizGroupedBar, DataVizLine, DataVizIndicator, ValueLabel, LegendSwatch, DataVizHeader, DataVizCard, DataVizTooltip,
  ColumnChart, HistogramChart, BarChart, GroupedColumnChart, StackedColumnChart, LineChart, AreaChart, PieChart, DonutChart, ScatterChart, BubbleChart,
  GaugeChart, WaterfallChart, FunnelChart, HeatmapChart, ProgressRing, EvidenceStrength,
};
