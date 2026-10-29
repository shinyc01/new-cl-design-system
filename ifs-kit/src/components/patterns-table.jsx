import React from 'react';
import { IFS } from './registry.js';
// Table pattern family — Figma file IFS Design System Patterns (KmmVU2D0kqWr0dC1xXNzWw), page Table (92:16787), section Table (95:106476).
// IFS DS components the kit lacked (smart-search-organism, search-modal, search-card, icon-button-following)
// plus pattern composites that add the table behaviour the page specifies around the kit Table (data.jsx is not edited):
// column filters, pin + manual rank with drag, inline rename, more-actions menu, collaboration badge, name truncation modes,
// column settings, fixed-height card with Show more, progressive loading, search / searching / no-results states.

const ptCx = (...a) => a.filter(Boolean).join(' ');

function usePtValue(value, defaultValue, onChange) {
  const [inner, setInner] = React.useState(defaultValue);
  const ctl = value !== undefined;
  const cur = ctl ? value : inner;
  const set = React.useCallback((v, ...a) => { if (!ctl) setInner(v); onChange && onChange(v, ...a); }, [ctl, onChange]);
  return [cur, set];
}

// Close on outside pointer-down and Escape while `open`.
function usePtDismiss(ref, open, close, ignore) {
  React.useEffect(() => {
    if (!open) return undefined;
    const down = e => { if (ref.current && !ref.current.contains(e.target) && !(ignore && e.target.closest && e.target.closest(ignore))) close(); };
    const key = e => { if (e.key === 'Escape') close(); };
    document.addEventListener('pointerdown', down, true);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', down, true); document.removeEventListener('keydown', key); };
  }, [open, close]);
}

// Keyboard-vs-pointer modality: the smart search shows the focus ring only for keyboard focus (Figma State=Focus),
// and the typing border for a click (Figma State=Pressed).
let ptKeyboard = false;
if (typeof document !== 'undefined') {
  document.addEventListener('keydown', e => { if (e.key === 'Tab') ptKeyboard = true; }, true);
  document.addEventListener('pointerdown', () => { ptKeyboard = false; }, true);
}


// ───────────────────────────── search-card ─────────────────────────────
// Figma: search-card (205664d0d5dfd2acdd85ee23fe6e02618941b691) — one row of the smart-search suggestion list.
// Props: type suggest|user-query (user-query = the typed text in primary + the suggested completion in tertiary),
// children = suggestion text, query (user-query: the typed part), active (keyboard highlight = Figma hover), state hover (gallery), onClick.
function SearchCard({ type = 'suggest', query, children, active, state, className, ...rest }) {
  let lead = null; let tail = children;
  if (type === 'user-query') {
    const s = String(children || ''); const q = String(query || '');
    if (q && s.toLowerCase().startsWith(q.toLowerCase())) { lead = s.slice(0, q.length); tail = s.slice(q.length); } else { lead = q; }
  }
  return (
    <button type="button" role="option" aria-selected={!!active} data-state={state || (active ? 'hover' : undefined)}
      className={ptCx('ifs-search-card', className)} {...rest}>
      <span className="ifs-search-card__text">
        {lead != null && <span className="ifs-search-card__query">{lead}</span>}
        <span className={type === 'user-query' ? 'ifs-search-card__suggest' : undefined}>{tail}</span>
      </span>
    </button>
  );
}

// ───────────────────────────── search-modal ─────────────────────────────
// Figma: search-modal (d983e4df9bce16881c039833e232fa5916931330) — the suggestion list under the smart search.
// Props: title (default "Suggested questions"), items = strings or { label, type, query }, activeIndex, onSelect(label, index),
// maxHeight (Figma scroll bar 248), inline (static position — gallery), id (listbox id for aria-controls).
function SearchModal({ title = 'Suggested questions', items = [], activeIndex = -1, onSelect, maxHeight = 248, inline, id, className, style }) {
  return (
    <div className={ptCx('ifs-search-modal', inline && 'ifs-search-modal--inline', className)} style={style}>
      <div className="ifs-search-modal__body">
        {title && <div className="ifs-search-modal__title">{title}</div>}
        <div className="ifs-search-modal__list" role="listbox" id={id} aria-label={title || 'Suggestions'} style={{ maxHeight }}>
          {items.map((it, i) => {
            const o = typeof it === 'string' ? { label: it } : it;
            return <SearchCard key={i} type={o.type} query={o.query} active={i === activeIndex}
              onMouseDown={e => e.preventDefault()} onClick={() => onSelect && onSelect(o.label, i)}>{o.label}</SearchCard>;
          })}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────── smart-search-organism ─────────────────────────────
// Figma: smart-search-organism (2145:3758) — the Cooper "Ask anything…" bar (shown in older screens as "ai smart search").
// Props: type text|voice / defaultType / onTypeChange (Text shows the mic button, Voice shows the keyboard button and listens),
// placeholder, value / defaultValue / onChange(value), onSubmit(value) on Enter or suggestion pick, onClear,
// suggestions (strings or {label,type,query}; shown in a search-modal while focused), suggestionsTitle, listening (voice: "…" state),
// disabled, width (default 360, Figma), size l (40, default) | s (28 tall, padding 8/0/8/8, 28px mic: the explore-header instance),
// state hover|focus|pressed (gallery only), aria-label.
// Ask a natural-language question here; for keyword search over a list use IFS.Search (search-regular-organism).
function SmartSearch({ type, defaultType = 'text', onTypeChange, placeholder = 'Ask anything…', value, defaultValue = '', onChange, onSubmit, onClear,
  suggestions, suggestionsTitle = 'Suggested questions', listening, disabled, width = 360, size = 'l', state, className, style, 'aria-label': ariaLabel, ...rest }) {
  const [val, setVal] = usePtValue(value, defaultValue, onChange);
  const [mode, setMode] = usePtValue(type, defaultType, onTypeChange);
  const [open, setOpen] = React.useState(false);
  const [kbd, setKbd] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const ref = React.useRef(null); const input = React.useRef(null);
  const listId = React.useId ? React.useId() : 'ifs-smart-search-list';
  const filled = val !== '' && val != null;
  const [heard, setHeard] = React.useState(false); // voice turned on from the mic button → listening ("…") until text arrives
  const isListening = mode === 'voice' && !filled && (listening !== undefined ? !!listening : heard);
  const items = (suggestions || []);
  const showList = open && !disabled && items.length > 0;
  usePtDismiss(ref, open, React.useCallback(() => setOpen(false), []));
  const submit = v => { setOpen(false); setActive(-1); onSubmit && onSubmit(v); };
  const onKeyDown = e => {
    if (e.key === 'ArrowDown' && items.length) { e.preventDefault(); setOpen(true); setActive(a => (a + 1) % items.length); }
    else if (e.key === 'ArrowUp' && items.length) { e.preventDefault(); setActive(a => (a <= 0 ? items.length - 1 : a - 1)); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (showList && active >= 0) { const o = items[active]; const l = typeof o === 'string' ? o : o.label; setVal(l); submit(l); }
      else submit(val);
    } else if (e.key === 'Escape') { if (open) setOpen(false); else if (filled) { setVal(''); onClear && onClear(); } }
  };
  const clear = () => { setVal(''); onClear && onClear(); input.current && input.current.focus(); };
  return (
    <div ref={ref} className={ptCx('ifs-smart-search', `ifs-smart-search--${mode}`, size === 's' && 'ifs-smart-search--s', filled && 'ifs-smart-search--filled',
      isListening && 'ifs-smart-search--listening', disabled && 'ifs-smart-search--disabled', kbd && 'ifs-smart-search--kbd', className)}
      data-state={state} style={{ width, ...style }}>
      <div className="ifs-smart-search__field" onMouseDown={e => { if (e.target === e.currentTarget) { e.preventDefault(); input.current && input.current.focus(); } }}>
        <span className="ifs-smart-search__lead">
          <IFS.Icon name="cooper-system-icon" variant="Smart search" size={16} />
          <input ref={input} type="text" className="ifs-smart-search__input" disabled={disabled} value={val}
            placeholder={isListening ? '...' : placeholder} aria-label={ariaLabel || placeholder}
            role="combobox" aria-expanded={showList} aria-controls={showList ? listId : undefined} aria-autocomplete="list"
            onFocus={() => { setKbd(ptKeyboard); setOpen(true); }} onBlur={() => setKbd(false)}
            onChange={e => { setVal(e.target.value); setOpen(true); setActive(-1); }} onKeyDown={onKeyDown} {...rest} />
        </span>
        {filled && !disabled
          ? <IFS.IconButton icon="system-close" label="Clear" type="ghost" size="s" className="ifs-smart-search__clear" onClick={clear} />
          : <IFS.IconButton icon={mode === 'voice' ? 'chat-keyboard-text' : 'chat-microphone-voice'} shape="circle" type="ghost" size="m" disabled={disabled}
              label={mode === 'voice' ? 'Type instead' : 'Ask by voice'} onClick={() => { setHeard(mode !== 'voice'); setMode(mode === 'voice' ? 'text' : 'voice'); input.current && input.current.focus(); }} />}
      </div>
      {showList && <SearchModal id={listId} title={suggestionsTitle} items={items} activeIndex={active}
        onSelect={l => { setVal(l); submit(l); }} />}
    </div>
  );
}

// drop-indicator-atom (f78ffb96…) is built by the widget-builder pattern family (IFS.DropIndicator); reused here.

// ───────────────────────────── icon-button-following ─────────────────────────────
// Figma: icon-button-following (c0ebbac2a918ba61c650647fc685736391388744) — follow / unfollow a record (ghost S icon button).
// Props: following / defaultFollowing / onChange(following), disabled.
function FollowButton({ following, defaultFollowing = false, onChange, label, className, ...rest }) {
  const [on, setOn] = usePtValue(following, defaultFollowing, onChange);
  return <IFS.IconButton icon={on ? 'bookmark-filled' : 'bookmark'} type="ghost" size="s" aria-pressed={on}
    label={label || (on ? 'Unfollow' : 'Follow')} className={className} onClick={e => { e.stopPropagation(); setOn(!on); }} {...rest} />;
}

// ───────────────────────────── Column filter ─────────────────────────────
// Range input of the column filter: typed or stepped with the ⌃⌄ arrows (Figma "Filter by range").
function RangeField({ value, onChange, placeholder, step = 1, min, max, startAt, label }) {
  const clamp = v => { let x = v; if (min != null && x < min) x = min; if (max != null && x > max) x = max; return Math.round(x / step) * step; };
  const stepBy = d => { const base = value == null || value === '' ? startAt : Number(value) + d * step; if (base != null && !isNaN(base)) onChange(clamp(Number(base.toFixed(6)))); };
  const hold = React.useRef();
  const press = d => { stepBy(d); clearInterval(hold.current); const t = setTimeout(() => { hold.current = setInterval(() => stepBy(d), 80); }, 400); hold.current = t; };
  const release = () => { clearTimeout(hold.current); clearInterval(hold.current); };
  return (
    <span className="ifs-range-field">
      <input className="ifs-range-field__input" inputMode="decimal" placeholder={placeholder} aria-label={label || placeholder}
        value={value == null ? '' : value}
        onChange={e => { const t = e.target.value.trim(); onChange(t === '' ? null : (isNaN(Number(t)) ? value : Number(t))); }}
        onKeyDown={e => { if (e.key === 'ArrowUp') { e.preventDefault(); stepBy(1); } if (e.key === 'ArrowDown') { e.preventDefault(); stepBy(-1); } }} />
      <span className="ifs-range-field__stepper">
        <button type="button" tabIndex={-1} aria-label={`Increase ${placeholder}`} onPointerDown={() => press(1)} onPointerUp={release} onPointerLeave={release} />
        <button type="button" tabIndex={-1} aria-label={`Decrease ${placeholder}`} onPointerDown={() => press(-1)} onPointerUp={release} onPointerLeave={release} />
        <IFS.Icon name="caret-updown" size={16} />
      </span>
    </span>
  );
}

// Column filter panel — single-select-list-molecule (153:62054) holding chips (832:235895) and, per column kind,
// a custom period (DatePicker range), a search field (search-regular-organism) or a From/To range.
// Props: title ("Filter"), options [{ value, label }] (chips; "All" is added first and is on when nothing is selected),
// value [] / defaultValue / onChange(values), multiple (default true; false = presets, one at a time),
// period { value, onChange, placeholder } (custom period; combines with chips by AND), search { placeholder } (filters the chips),
// range { value: { from, to }, onChange, step, min, max, unit } (numeric columns: never combined with chips),
// onClearAll, inline (gallery), width (default 240).
function ColumnFilter({ title = 'Filter', options = [], value, defaultValue = [], onChange, multiple = true, period, search, range,
  onClearAll, width = 240, inline = true, className, style }) {
  const [sel, setSel] = usePtValue(value, defaultValue, onChange);
  const [q, setQ] = React.useState('');
  const cur = sel || [];
  const shown = search && q ? options.filter(o => o.label.toLowerCase().includes(q.toLowerCase())) : options;
  const rangeOn = range && range.value && (range.value.from != null || range.value.to != null);
  const periodOn = period && period.value;
  const count = cur.length + (rangeOn ? 1 : 0) + (periodOn ? 1 : 0);
  const toggle = v => {
    if (v === '__all') return setSel([]);
    if (!multiple) return setSel(cur[0] === v ? [] : [v]);
    setSel(cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v]);
  };
  const clearAll = () => { setSel([]); setQ(''); range && range.onChange && range.onChange({ from: null, to: null }); period && period.onChange && period.onChange(null); onClearAll && onClearAll(); };
  return (
    <div role="dialog" aria-label={`${title} column`} className={ptCx('ifs-column-filter', inline && 'ifs-column-filter--inline', className)} style={{ width, ...style }}>
      <div className="ifs-column-filter__header">
        <span className="ifs-column-filter__title">{title}</span>
        {count > 0 && <IFS.Counter>{count}</IFS.Counter>}
        {count > 0 && <IFS.Button type="ghost" size="s" className="ifs-column-filter__clear" onClick={clearAll}>Clear all</IFS.Button>}
      </div>
      <div className="ifs-column-filter__body">
        {search && <IFS.Search placeholder={search.placeholder || 'Search…'} value={q} onChange={v => setQ(v)} filter={!!search.onFilter} onFilter={search.onFilter} style={{ width: '100%' }} />}
        {options.length > 0 && (
          <div className="ifs-column-filter__chips" role="group" aria-label={`${title} options`}>
            {!q && <IFS.Chip selected={cur.length === 0} onChange={() => toggle('__all')}>All</IFS.Chip>}
            {shown.map(o => <IFS.Chip key={String(o.value)} selected={cur.includes(o.value)} onChange={() => toggle(o.value)}>{o.label}</IFS.Chip>)}
          </div>
        )}
        {period && <IFS.DatePicker range size="m" placeholder={period.placeholder || 'Select custom period'} value={period.value || null}
          onChange={v => period.onChange && period.onChange(v && v.start && v.end ? v : (v && v.start ? v : null))} format={period.format}
          aria-label="Custom period" style={{ width: '100%' }} />}
        {range && (
          <div className="ifs-column-filter__range">
            <span className="ifs-column-filter__label">Range</span>
            <div className="ifs-column-filter__range-fields">
              <RangeField placeholder="From" step={range.step} min={range.min} max={range.value && range.value.to != null ? range.value.to : range.max}
                startAt={range.min} value={range.value ? range.value.from : null} onChange={v => range.onChange({ ...(range.value || {}), from: v })} />
              <RangeField placeholder="To" step={range.step} min={range.value && range.value.from != null ? range.value.from : range.min} max={range.max}
                startAt={range.max} value={range.value ? range.value.to : null} onChange={v => range.onChange({ ...(range.value || {}), to: v })} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ───────────────────────────── Collaboration badge ─────────────────────────────
// Collaboration column cell: badge-atom (Color=White, M, show-avatar) that opens the request; a read-only tooltip-organism shows
// who asked what and when. Props: label (names the expected action, e.g. "View reply"), avatar = Avatar props,
// request = { name, role, time, text, meta } (tooltip content; newest request), count (>1 requests → counter), onOpen.
function CollaborationBadge({ label, avatar, request, count, onOpen, className }) {
  const badge = (
    <button type="button" className={ptCx('ifs-collab-badge', className)} onClick={e => { e.stopPropagation(); onOpen && onOpen(e); }}
      aria-label={count > 1 ? `${label} (${count} requests)` : label}>
      <IFS.Badge color="white" size="m" avatar={avatar}>{label}</IFS.Badge>
      {count > 1 && <IFS.Counter>{count}</IFS.Counter>}
    </button>
  );
  if (!request) return badge;
  return (
    <IFS.Tooltip type="top" arrow="left" delay={200} content={
      <span className="ifs-collab-tip">
        <span className="ifs-collab-tip__head">
          <IFS.Avatar size="m" {...(request.avatar || avatar)} />
          <span className="ifs-collab-tip__who"><span className="ifs-collab-tip__name">{request.name}</span><span className="ifs-collab-tip__role">{request.role}</span></span>
          <span className="ifs-collab-tip__time">{request.time}</span>
        </span>
        <span className="ifs-collab-tip__quote">{request.text}</span>
        {request.meta && <span className="ifs-collab-tip__meta">{request.meta}</span>}
      </span>}>{badge}</IFS.Tooltip>
  );
}

// ───────────────────────────── Name truncation ─────────────────────────────
let ptCanvas;
const ptMeasure = (text, font) => { ptCanvas = ptCanvas || document.createElement('canvas'); const c = ptCanvas.getContext('2d'); c.font = font; return c.measureText(text).width; };

// Investment-name display (Figma "Name display"). Truncation is display-only; the full name shows in a tooltip whenever it is cut.
// Props: children = full text (string), mode end|middle|start|wrap|segment (a table-level, per-tenant setting), className.
function TruncatedText({ children, mode = 'end', className, tooltip = true }) {
  const full = String(children == null ? '' : children);
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(full);
  const [cut, setCut] = React.useState(false);
  React.useLayoutEffect(() => {
    const el = ref.current; if (!el) return undefined;
    const fit = () => {
      const w = el.clientWidth; if (!w) return;
      if (mode === 'end' || mode === 'wrap') { setShown(full); setCut(mode === 'end' ? el.scrollWidth > el.clientWidth + 0.5 : el.scrollHeight > el.clientHeight + 0.5); return; }
      const cs = getComputedStyle(el); const font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const fits = t => ptMeasure(t, font) <= w;
      if (fits(full)) { setShown(full); setCut(false); return; }
      let out = '…';
      if (mode === 'start') {
        let lo = 0, hi = full.length; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (fits('…' + full.slice(full.length - m))) lo = m; else hi = m - 1; }
        out = '…' + full.slice(full.length - lo);
      } else if (mode === 'middle') {
        let lo = 0, hi = full.length; while (lo < hi) { const m = (lo + hi + 1) >> 1; const h = Math.ceil(m / 2); if (fits(full.slice(0, h) + '…' + full.slice(full.length - (m - h)))) lo = m; else hi = m - 1; }
        const h = Math.ceil(lo / 2); out = full.slice(0, h) + '…' + full.slice(full.length - (lo - h));
      } else if (mode === 'segment') {
        const words = full.split(/\s+/); let l = Math.ceil(words.length / 2), r = l; // drop words around the midpoint until it fits
        let t = full;
        while (l > 0 || r < words.length) {
          if ((r - l) % 2 === 0 ? l > 0 : r >= words.length) l--; else r++;
          t = [...words.slice(0, l), '…', ...words.slice(r)].join(' ');
          if (fits(t)) break;
        }
        out = t;
      }
      setShown(out); setCut(true);
    };
    fit();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null; ro && ro.observe(el);
    return () => ro && ro.disconnect();
  }, [full, mode]);
  const text = <span ref={ref} className={ptCx('ifs-truncate', `ifs-truncate--${mode}`, className)} tabIndex={cut ? 0 : undefined}>{shown}</span>;
  return cut && tooltip ? <IFS.Tooltip content={full} delay={300}>{text}</IFS.Tooltip> : text;
}

// ───────────────────────────── More-actions menu ─────────────────────────────
// Pattern helper: More-actions (⋮) menu — built from IconButton + Menu (single-select-list-molecule with single-select-list-atoms).
// Props: items [{ label, icon, onClick(event), disabled, reason (tooltip shown on a disabled action), destructive, danger (red), divider,
// shortcut, submenu (array of items) }], label (default "More actions"), open / defaultOpen / onOpenChange, align end|start,
// inline (just the list), width (default 180).
// Rules (Figma): an action that never applies is not listed; one that applies but is unavailable is disabled with a reason;
// destructive actions (Archive, Delete) go last after a divider — the menu sorts them there.
const ptMenuItem = it => it.divider ? it : { ...it, items: Array.isArray(it.submenu) ? it.submenu.map(ptMenuItem) : undefined,
  onClick: it.onClick ? (_, e) => it.onClick(e) : undefined };
function ActionMenu({ items = [], label = 'More actions', open, defaultOpen = false, onOpenChange, align = 'end', inline, width = 180, className }) {
  const safe = items.filter(i => !i.destructive); const danger = items.filter(i => i.destructive);
  const list = [...safe, ...(danger.length && safe.length ? [{ divider: true }] : []), ...danger].map(ptMenuItem);
  return (
    <IFS.Menu items={list} label={label} open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} align={align} inline={inline} width={width}
      className={ptCx('ifs-action-menu', className)}
      trigger={inline ? undefined : <IFS.IconButton icon="system-dots-vertical" label={label} type="ghost" size="s" />} />
  );
}

// ───────────────────────────── Table toolbar ─────────────────────────────
// The bar above the table (Figma table-card "Frame" row, 40px): filter (SegmentedControl S with counts inside a table card,
// or Tabs with counts on library pages), search (SmartSearch), onConfigure → divider + Tertiary S icon-button system-filter-settings
// (opens the column settings). Props: filter, search, onConfigure, configureLabel, actions (extra nodes before the divider).
function TableToolbar({ filter, search, onConfigure, configureLabel = 'Table configuration', actions, className }) {
  return (
    <div className={ptCx('ifs-table-toolbar', className)}>
      <div className="ifs-table-toolbar__filter">{filter || search}</div>
      <div className="ifs-table-toolbar__stack">
        {filter && search}{actions}
        {onConfigure && <><span className="ifs-table-toolbar__divider" role="separator" aria-orientation="vertical" />
          <IFS.Tooltip content={configureLabel}><IFS.IconButton icon="system-filter-settings" type="tertiary" size="s" label={configureLabel} onClick={onConfigure} /></IFS.Tooltip></>}
      </div>
    </div>
  );
}

// ───────────────────────────── Column settings ─────────────────────────────
// Content of the "Columns" drawer (Figma Table configuration): Cooper search for a column by description, "Shown in table"
// (drag to reorder, eye to hide — the column hides at once but stays listed), "Suggested by Cooper" (+ adds the column).
// Props: columns [{ key, title, hidden }] in table order, onChange(columns), suggestions [{ key, title }], onAdd(suggestion),
// searchSuggestions (strings for the Cooper search list), findColumn(query) → Promise|array of suggestions (default: title match).
function ColumnSettings({ columns = [], onChange, suggestions = [], onAdd, findColumn, className }) {
  const [q, setQ] = React.useState('');
  const [searching, setSearching] = React.useState(false);
  const [found, setFound] = React.useState(null);
  const [drag, setDrag] = React.useState(null); // { from, over }
  const listRef = React.useRef(null);
  const run = query => {
    if (!query) { setFound(null); return; }
    setSearching(true);
    Promise.resolve(findColumn ? findColumn(query) : suggestions.filter(s => query.toLowerCase().split(/\s+/).some(w => w.length > 2 && s.title.toLowerCase().includes(w))))
      .then(r => setTimeout(() => { setSearching(false); setFound(r || []); }, 700));
  };
  const toggle = k => onChange && onChange(columns.map(c => (c.key === k ? { ...c, hidden: !c.hidden } : c)));
  const startDrag = (e, i) => {
    e.preventDefault();
    const rows = [...listRef.current.querySelectorAll('[data-col-row]')];
    const move = ev => { let over = rows.length; for (let k = 0; k < rows.length; k++) { const r = rows[k].getBoundingClientRect(); if (ev.clientY < r.top + r.height / 2) { over = k; break; } } setDrag({ from: i, over }); };
    const up = () => {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up);
      setDrag(d => { if (d && d.over !== d.from && d.over !== d.from + 1) { const next = [...columns]; const [m] = next.splice(d.from, 1); next.splice(d.over > d.from ? d.over - 1 : d.over, 0, m); onChange && onChange(next); } return null; });
    };
    setDrag({ from: i, over: i }); document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  };
  const shownSuggestions = found || suggestions;
  return (
    <div className={ptCx('ifs-column-settings', className)}>
      <SmartSearch width="100%" placeholder="Find a suitable column by description" value={q} onChange={v => { setQ(v); if (!v) setFound(null); }} onSubmit={run} onClear={() => setFound(null)} />
      {searching ? <div className="ifs-data-table__searching">Searching...</div> : <>
        {!found && <>
          <div className="ifs-column-settings__label">Shown in table</div>
          <div className="ifs-column-settings__list" ref={listRef}>
            {columns.map((c, i) => (
              <div key={c.key} data-col-row className={ptCx('ifs-column-settings__row', drag && drag.from === i && 'is-dragging')} style={{ position: 'relative' }}>
                {drag && drag.over === i && drag.from !== i && drag.from !== i - 1 && <IFS.DropIndicator style={{ position: 'absolute', left: 0, right: 0, top: -4 }} />}
                <IFS.ContentCard size="s" state={drag && drag.from === i ? 'drag' : undefined}
                  title={<span className="ifs-column-settings__name"><span className="ifs-column-settings__handle" onPointerDown={e => startDrag(e, i)} aria-label={`Drag ${c.title}`} role="button" tabIndex={0}
                    onKeyDown={e => { const d = { ArrowUp: -1, ArrowDown: 1 }[e.key]; if (!d) return; e.preventDefault(); const j = i + d; if (j < 0 || j >= columns.length) return; const n = [...columns]; [n[i], n[j]] = [n[j], n[i]]; onChange && onChange(n); }}>
                    <IFS.Icon name="system-drag-and-drop" size={16} /></span><span className={c.hidden ? 'ifs-column-settings__hidden' : undefined}>{c.title}</span></span>}
                  iconButton={{ icon: c.hidden ? 'eye-closed' : 'eye-opened', label: c.hidden ? `Show ${c.title}` : `Hide ${c.title}`, onClick: () => toggle(c.key) }} />
                {drag && drag.over === columns.length && i === columns.length - 1 && <IFS.DropIndicator style={{ position: 'absolute', left: 0, right: 0, bottom: -4 }} />}
              </div>
            ))}
          </div>
          <div className="ifs-column-settings__sep" />
        </>}
        <div className="ifs-column-settings__label ifs-column-settings__label--cooper"><IFS.Icon name="cooper-system-icon" variant="Insight" size={12} />Suggested by Cooper</div>
        <div className="ifs-column-settings__list">
          {shownSuggestions.length === 0 && <div className="ifs-column-settings__none">No matching column. Try describing the value you need.</div>}
          {shownSuggestions.map(s => (
            <IFS.ContentCard key={s.key} size="s" title={<span className="ifs-column-settings__name"><IFS.Icon name="system-drag-and-drop" size={16} className="ifs-column-settings__handle" />{s.title}</span>}
              iconButton={{ icon: 'system-plus', label: `Add ${s.title}`, onClick: () => { onAdd && onAdd(s); setFound(null); setQ(''); } }} />
          ))}
        </div>
      </>}
    </div>
  );
}

// ───────────────────────────── Record preview ─────────────────────────────
// Preview sidebar for "table with preview" (Figma uses panel-organism): record ID, Details (navigates), ✕ closes.
// The table stays fully interactive while it is open; a new preview replaces the current one.
// Props: id (record code), onDetails, onClose, children (preview content), width (default 380).
function RecordPreview({ id, onDetails, onClose, children, width = 380, className }) {
  return (
    <aside className={ptCx('ifs-record-preview', className)} style={{ width }} aria-label={`Preview ${id || ''}`}>
      <div className="ifs-record-preview__header">
        <span className="ifs-record-preview__id">{id}</span>
        {onDetails && <IFS.Button type="primary" size="s" onClick={onDetails}>Details</IFS.Button>}
        <IFS.IconButton icon="system-close" label="Close preview" type="ghost" size="s" onClick={onClose} />
      </div>
      <div className="ifs-record-preview__content ifs-scroll">{children}</div>
    </aside>
  );
}

// ───────────────────────────── DataTable (pattern) ─────────────────────────────
const ptText = v => (v == null ? '' : typeof v === 'object' ? (v.text ?? v.label ?? v.name ?? v.children ?? '') : v);
const ptDayMs = 864e5;

// Every table behaviour on the Table pattern page, composed around IFS.Table (the kit table is not modified).
// Props:
//   columns: IFS.Table columns plus
//     kind text|date|number — sorting only on date/number columns (Figma rule); text columns get chips, numbers a range.
//     filter: 'chips' | 'presets' (date presets + custom period) | 'chips+period' | 'range' | 'search-chips' | false (default: chips for text, range for number, presets for date)
//     filterValue(row) → value or array of values for chips; value(row) → number/Date for range/date/sort (default row[key]).
//     filterOptions [{ value, label }] (default: values present in the rows — only values that exist are shown), maxChips (default 8).
//     name: true marks the name column (pin, drag, folder icon, truncation, rename, preview). truncate end|middle|start|wrap|segment.
//   rows / defaultRows / onRowsChange (pins, rank and renames write back), rowKey ('id').
//   variant standard|ranked — standard: default order = defaultSort, sort cycles ↓/↑ with no "off"; ranked: manual order + pins,
//     sort is a temporary override ↓ → ↑ → off, rows drag to re-rank, pinned rows stay on top.
//   defaultSort { key, dir }, filterTabs { variant: 'segmented'|'tabs', items: [{ value, label, match(row) }], defaultValue },
//   search { placeholder, suggestions, noResults (suggestion labels), match(row, query), delay } — Cooper search over the rows,
//   onOpen(row) (row click), onPreview(row) + previewId (eye button on hover), rowActions(row) → ActionMenu items,
//   follow (show icon-button-following in the actions column), onRename(row, name) (double-click the name; must be unique),
//   collaboration: handled by columns with render → CollaborationBadge.
//   configurable { suggestions: [{ key, title, ...column, value(row) }] } → toolbar settings button + Columns drawer,
//   title / collapsible / defaultCollapsed / headerAction (section header of a table card on a page with several tables),
//   maxHeight (fixed-height card, default 600 when `fixedHeight`) + Show more / Show less, progressive { pageSize } (single-table pages),
//   loading (skeleton rows), toolbarOutside (library pages: tabs + search sit above the card),
//   pageTop { title, description, eyebrow, actions } (library pages: render IFS.PageTop above the card with the table's tab filter and search in it).
function DataTable({ columns: colsProp = [], rows, defaultRows = [], onRowsChange, rowKey = 'id', variant = 'standard', defaultSort,
  filterTabs, search, onOpen, onPreview, previewId, rowActions, follow, onRename, configurable, title, collapsible, defaultCollapsed = false,
  headerAction, fixedHeight, maxHeight = 600, progressive, loading, toolbarOutside, pageTop, emptyText, className, style }) {
  const [data, setData] = usePtValue(rows, defaultRows, onRowsChange);
  const ranked = variant === 'ranked';
  const [cols, setCols] = React.useState(() => colsProp.map(c => ({ ...c })));
  const [added, setAdded] = React.useState({}); // key → loading flag for Cooper-added columns
  const [sort, setSort] = React.useState(defaultSort || null);
  const [tab, setTab] = React.useState(filterTabs ? (filterTabs.defaultValue ?? filterTabs.items[0].value) : null);
  const [filters, setFilters] = React.useState({}); // key → { values: [], range: {from,to}, period }
  const [openFilter, setOpenFilter] = React.useState(null); // { key, left, top }
  const [query, setQuery] = React.useState('');
  const [applied, setApplied] = React.useState('');
  const [searching, setSearching] = React.useState(false);
  const [editing, setEditing] = React.useState(null); // { id, value, error }
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [visible, setVisible] = React.useState(progressive ? progressive.pageSize : Infinity);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [drag, setDrag] = React.useState(null); // { id, overIndex, y }
  const wrapRef = React.useRef(null); const tableRef = React.useRef(null); const clickTimer = React.useRef();
  const filterRef = React.useRef(null);
  usePtDismiss(filterRef, !!openFilter, React.useCallback(() => setOpenFilter(null), []), '.ifs-table-filter, .ifs-floating'); // the funnel toggles its own panel; portalled date picker belongs to it

  const colOf = k => cols.find(c => c.key === k) || {};
  const valOf = (c, r) => (c.value ? c.value(r) : r[c.key]);
  const kindOf = c => c.kind || 'text';
  const filterKind = c => (c.filter === false ? null : c.filter || (kindOf(c) === 'number' ? 'range' : kindOf(c) === 'date' ? 'presets' : 'chips'));
  const shownCols = cols.filter(c => !c.hidden);

  // ── search ──
  const runSearch = q => {
    setQuery(q);
    if (!q) { setApplied(''); return; }
    setSearching(true);
    setTimeout(() => { setSearching(false); setApplied(q); }, search && search.delay != null ? search.delay : 900);
  };
  const searchMatch = (r, q) => {
    if (search && search.match) return search.match(r, q);
    const hay = cols.map(c => String(ptText(r[c.key]))).join(' ').toLowerCase();
    return q.toLowerCase().split(/\s+/).filter(Boolean).every(w => hay.includes(w));
  };

  // ── column filters ──
  const chipVals = (c, r) => { const v = c.filterValue ? c.filterValue(r) : ptText(r[c.key]); return Array.isArray(v) ? v : [v]; };
  const presetOk = (p, d) => {
    if (!d) return false; const t = d instanceof Date ? d : new Date(d); const now = new Date(); const day = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (p === 'this-year') return t >= new Date(now.getFullYear(), 0, 1) && t <= now;
    if (/^\d{4}$/.test(p)) return t.getFullYear() === Number(p);
    const n = { '7d': 7, '30d': 30, '90d': 90 }[p]; return t >= new Date(day.getTime() - (n - 1) * ptDayMs) && t <= new Date(day.getTime() + ptDayMs);
  };
  const passes = (r, except) => Object.entries(filters).every(([k, f]) => {
    if (k === except) return true; const c = colOf(k); if (!c.key || c.hidden) return true;
    if (f.values && f.values.length) {
      if (filterKind(c) === 'presets') { if (!f.values.some(p => presetOk(p, valOf(c, r)))) return false; }
      else if (c.matchChip) { if (!f.values.some(v => c.matchChip(r, v))) return false; }
      else { const vs = chipVals(c, r).map(String); if (!f.values.some(v => vs.includes(String(v)))) return false; }
    }
    if (f.range && (f.range.from != null || f.range.to != null)) { const v = Number(valOf(c, r)); if (isNaN(v)) return false; if (f.range.from != null && v < f.range.from) return false; if (f.range.to != null && v > f.range.to) return false; }
    if (f.period && f.period.start) {
      const end = f.period.end || f.period.start;
      if (c.overlaps) { if (!c.overlaps(r, f.period.start, end)) return false; } // horizon: overlap, not containment
      else { const d = valOf(c, r); const t = d instanceof Date ? d : new Date(d); if (!(t >= f.period.start && t <= new Date(end.getTime() + ptDayMs - 1))) return false; }
    }
    return true;
  });
  const activeFilterCount = k => { const f = filters[k]; if (!f) return 0; return (f.values ? f.values.length : 0) + (f.range && (f.range.from != null || f.range.to != null) ? 1 : 0) + (f.period ? 1 : 0); };
  const anyFilter = Object.keys(filters).some(k => activeFilterCount(k) > 0);
  const setFilter = (k, patch) => setFilters(fs => ({ ...fs, [k]: { ...(fs[k] || {}), ...patch } }));

  // ── order: pins + manual rank (ranked) or default sort (standard), then the temporary sort ──
  const searched = applied ? data.filter(r => searchMatch(r, applied)) : data;
  const filtered = searched.filter(r => passes(r));
  const tabMatch = (r, t) => { const it = filterTabs && filterTabs.items.find(i => i.value === t); return !it || !it.match || it.match(r); };
  const inTab = filtered.filter(r => tabMatch(r, tab));
  const ordered = React.useMemo(() => {
    const cmp = (a, b) => {
      if (!sort) return 0; const c = colOf(sort.key); const x = c.sortValue ? c.sortValue(a) : valOf(c, a); const y = c.sortValue ? c.sortValue(b) : valOf(c, b);
      const ex = x == null || x === ''; const ey = y == null || y === '';
      if (ex || ey) return ex && ey ? 0 : ex ? 1 : -1; // empty values always last, whatever the direction
      const nx = x instanceof Date ? x.getTime() : x; const ny = y instanceof Date ? y.getTime() : y;
      const d = typeof nx === 'number' && typeof ny === 'number' ? nx - ny : String(nx).localeCompare(String(ny), undefined, { numeric: true });
      return sort.dir === 'desc' ? -d : d;
    };
    const base = inTab.map((r, i) => [r, i]);
    const stable = (g) => g.sort((a, b) => cmp(a[0], b[0]) || a[1] - b[1]).map(p => p[0]);
    if (!ranked) return stable(base);
    return [...stable(base.filter(p => p[0].pinned)), ...stable(base.filter(p => !p[0].pinned))];
  }, [inTab, sort, ranked, cols]);
  const idx = new Map(ordered.map((r, i) => [r[rowKey], i]));

  // Tab counts follow the search; a filter combination that matches nothing shows 0 everywhere (Figma "Filter combination with no matches").
  const noFilterMatch = anyFilter && filtered.length === 0 && searched.length > 0;
  const noSearchMatch = !!applied && searched.length === 0;
  const tabItems = filterTabs ? filterTabs.items.map(it => {
    const n = noFilterMatch || noSearchMatch ? 0 : searched.filter(r => !it.match || it.match(r)).length;
    return { ...it, count: n, disabled: noFilterMatch || noSearchMatch };
  }).filter((it, i) => i === 0 || !applied || it.count > 0 || noSearchMatch) : null;
  React.useEffect(() => { if (tabItems && !tabItems.some(t => t.value === tab)) setTab(tabItems[0].value); });

  // ── sort cycle mapped onto the kit Table's asc → desc → off cycle ──
  const onSortChange = proposal => {
    let next;
    if (proposal && (!sort || proposal.key !== sort.key)) next = { key: proposal.key, dir: 'desc' }; // first click: newest / highest first
    else if (proposal && proposal.dir === 'desc') next = ranked ? null : { key: sort.key, dir: 'desc' }; // was asc
    else next = { key: sort.key, dir: 'asc' }; // was desc
    setSort(next);
  };

  // ── rows: pin, rank, rename ──
  const update = fn => setData(fn(data));
  const togglePin = r => update(d => {
    const rest = d.filter(x => x[rowKey] !== r[rowKey]);
    if (r.pinned) { const firstUnpinned = rest.findIndex(x => !x.pinned); const at = firstUnpinned < 0 ? rest.length : firstUnpinned; rest.splice(at, 0, { ...r, pinned: false }); return rest; }
    const lastPinned = rest.reduce((a, x, i) => (x.pinned ? i : a), -1); rest.splice(lastPinned + 1, 0, { ...r, pinned: true }); return rest; // new pins join the bottom of the pinned group
  });
  const commitRename = () => {
    if (!editing) return; const name = editing.value.trim(); const row = data.find(r => r[rowKey] === editing.id); const nameCol = cols.find(c => c.name);
    if (!row || !nameCol) return setEditing(null);
    if (!name || name === ptText(row[nameCol.key])) return setEditing(null);
    if (data.some(r => r[rowKey] !== editing.id && String(ptText(r[nameCol.key])).toLowerCase() === name.toLowerCase())) {
      setEditing(e => ({ ...e, error: 'This name is already in use. Choose a different name.' })); return;
    }
    const prev = row[nameCol.key];
    update(d => d.map(r => (r[rowKey] === editing.id ? { ...r, [nameCol.key]: name } : r)));
    setEditing(null);
    onRename && onRename(row, name);
    IFS.toast && IFS.toast({ title: `Renamed to “${name}”`, duration: 5000,
      secondaryAction: { label: 'Undo', iconLeft: 'arrow-back-up', onClick: () => setData(dd => dd.map(r => (r[rowKey] === row[rowKey] ? { ...r, [nameCol.key]: prev } : r))) } });
  };

  // ── drag to re-rank (ranked tables, no temporary sort) ──
  const canDrag = ranked && !sort && !applied && !anyFilter;
  const startRowDrag = (e, r) => {
    if (!canDrag) return; e.preventDefault(); e.stopPropagation();
    const contentRows = () => [...tableRef.current.querySelectorAll('.ifs-table__row--content')];
    const move = ev => {
      const els = contentRows(); let over = els.length;
      for (let k = 0; k < els.length; k++) { const b = els[k].getBoundingClientRect(); if (ev.clientY < b.top + b.height / 2) { over = k; break; } }
      const wrapTop = wrapRef.current.getBoundingClientRect().top;
      const ref = els[Math.min(over, els.length - 1)]; const b = ref ? ref.getBoundingClientRect() : { top: wrapTop, bottom: wrapTop };
      setDrag({ id: r[rowKey], over, y: (over < els.length ? b.top - 2 : b.bottom + 2) - wrapTop });
    };
    const up = () => {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up);
      setDrag(d => {
        if (!d) return null;
        const from = ordered.findIndex(x => x[rowKey] === d.id);
        if (d.over !== from && d.over !== from + 1) {
          const list = [...ordered]; const [m] = list.splice(from, 1); const at = d.over > from ? d.over - 1 : d.over;
          const pinnedLeft = list.filter(x => x.pinned).length;
          const moved = { ...m, pinned: m.pinned ? at <= pinnedLeft : at < pinnedLeft }; // crossing the boundary pins / unpins
          list.splice(at, 0, moved);
          const others = data.filter(x => !idx.has(x[rowKey])); update(() => [...list, ...others]);
        }
        return null;
      });
    };
    setDrag({ id: r[rowKey], over: idx.get(r[rowKey]), y: null });
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  };

  // ── cells ──
  const nameCell = (c, r) => {
    const id = r[rowKey]; const label = ptText(r[c.key]);
    const isEdit = editing && editing.id === id;
    return (
      <span className="ifs-data-table__name">
        {ranked && <span className="ifs-data-table__lead">
          {canDrag && <span className="ifs-data-table__handle ifs-data-table__hover" role="button" tabIndex={-1} aria-label={`Drag ${label}`} onPointerDown={e => startRowDrag(e, r)} onClick={e => e.stopPropagation()}>
            <IFS.Icon name="system-drag-and-drop" size={16} /></span>}
          <IFS.Tooltip content={r.pinned ? 'Unpin' : 'Pin to top'} type="bottom">
            <IFS.IconButton icon={r.pinned ? 'chat-pin' : 'chat-pin'} type="ghost" size="s" label={r.pinned ? 'Unpin' : 'Pin'} aria-pressed={!!r.pinned}
              className={ptCx('ifs-data-table__pin', r.pinned ? 'is-pinned' : 'ifs-data-table__hover')} onClick={e => { e.stopPropagation(); togglePin(r); }} />
          </IFS.Tooltip>
        </span>}
        {r.icon && <IFS.Icon name={r.icon} size={16} className="ifs-data-table__icon" />}
        {isEdit ? (
          <span className="ifs-data-table__edit" onClick={e => e.stopPropagation()}>
            <IFS.TextField size="m" autoFocus value={editing.value} error={editing.error} aria-label="Name"
              onChange={v => setEditing(ed => ({ ...ed, value: typeof v === 'string' ? v : v.target.value, error: null }))}
              onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setEditing(null); }} onBlur={commitRename} />
          </span>
        ) : (
          <span className="ifs-data-table__stack" onDoubleClick={onRename ? e => { e.stopPropagation(); clearTimeout(clickTimer.current); setEditing({ id, value: String(label), error: null }); } : undefined}>
            <TruncatedText mode={c.truncate || 'end'}>{label}</TruncatedText>
            {c.code && <span className="ifs-data-table__code">{c.code(r)}</span>}
          </span>
        )}
      </span>
    );
  };
  const tableCols = shownCols.map(c => {
    const fk = filterKind(c);
    const sortable = c.sortable !== false && (kindOf(c) === 'date' || kindOf(c) === 'number');
    const out = { ...c, sortable, sortValue: r => (sort && sort.dir === 'desc' ? -1 : 1) * idx.get(r[rowKey]) };
    if (c.name) { out.render = r => nameCell(c, r); out.type = 'custom'; }
    else if (added[c.key]) out.render = () => <IFS.Skeleton width="60%" height={12} />;
    if (fk) out.filter = { applied: activeFilterCount(c.key) > 0, onClick: e => {
      e.stopPropagation(); const b = e.currentTarget.getBoundingClientRect(); const w = wrapRef.current.getBoundingClientRect();
      setOpenFilter(o => (o && o.key === c.key ? null : { key: c.key, left: Math.min(b.left - w.left - 12, w.width - 244), top: b.bottom - w.top + 8 }));
    } };
    if (c.name && ranked) out.title = <span className="ifs-data-table__name-th">{c.title}</span>;
    return out;
  });
  const hasActions = !!(onPreview || rowActions || follow);
  if (hasActions) tableCols.push({ key: '__actions', title: '', width: follow && !onPreview && !rowActions ? 48 : 76, align: 'right', type: 'custom', render: r => (
    <span className="ifs-data-table__actions" onClick={e => e.stopPropagation()}>
      {onPreview && <IFS.Tooltip content="Open preview"><IFS.IconButton icon={'eye-opened'} type="ghost" size="s" label="Open preview"
        className={previewId === r[rowKey] ? undefined : 'ifs-data-table__hover'} data-state={previewId === r[rowKey] ? 'hover' : undefined} onClick={() => onPreview(r)} /></IFS.Tooltip>}
      {rowActions && <span className="ifs-data-table__hover"><ActionMenu items={rowActions(r, { rename: () => setEditing({ id: r[rowKey], value: String(ptText(r[(cols.find(x => x.name) || {}).key])), error: null }) })} /></span>}
      {follow && <FollowButton defaultFollowing={!!r.following} />}
    </span>) });

  // ── progressive loading (single-table pages) ──
  const sentinel = React.useRef(null);
  React.useEffect(() => {
    if (!progressive || !sentinel.current || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting && visible < ordered.length && !loadingMore) { setLoadingMore(true); setTimeout(() => { setVisible(v => v + progressive.pageSize); setLoadingMore(false); }, 700); } });
    io.observe(sentinel.current); return () => io.disconnect();
  });
  const rowsShown = progressive ? ordered.slice(0, visible) : ordered;

  const filterCol = openFilter && colOf(openFilter.key);
  const filterPanel = filterCol && (() => {
    const k = filterCol.key; const fk = filterKind(filterCol); const f = filters[k] || {};
    const allPresent = new Map(); data.forEach(r => chipVals(filterCol, r).forEach(v => { if (v != null && v !== '') allPresent.set(String(v), v); }));
    let options = filterCol.filterOptions || [...allPresent.values()].map(v => ({ value: v, label: String(v) }));
    // default options are the values present in the table's rows (Figma: statuses / creators with zero items are not shown)
    options = options.slice(0, filterCol.maxChips || 8); // a small categorical set; smart search covers the rest
    const nums = data.map(r => Number(valOf(filterCol, r))).filter(n => !isNaN(n));
    const presets = [{ value: '7d', label: 'Last 7 days' }, { value: '30d', label: 'Last 30 days' }, { value: '90d', label: 'Last 90 days' }, { value: 'this-year', label: 'This Year' }];
    return (
      <div ref={filterRef} className="ifs-data-table__filter-pop" style={{ left: Math.max(0, openFilter.left), top: openFilter.top }}>
        <ColumnFilter title="Filter"
          options={fk === 'range' ? [] : fk === 'presets' ? (filterCol.filterOptions || presets) : options}
          multiple={fk !== 'presets'} value={f.values || []} onChange={v => setFilter(k, { values: v })}
          search={fk === 'search-chips' ? { placeholder: filterCol.searchPlaceholder || 'Search by name, role...' } : undefined}
          period={fk === 'presets' || fk === 'chips+period' ? { value: f.period || null, onChange: p => setFilter(k, { period: p }) } : undefined}
          range={fk === 'range' ? { value: f.range || { from: null, to: null }, onChange: v => setFilter(k, { range: v }), step: filterCol.step || 1,
            min: nums.length ? Math.min(...nums) : undefined, max: nums.length ? Math.max(...nums) : undefined } : undefined}
          onClearAll={() => setFilters(fs => ({ ...fs, [k]: {} }))} />
      </div>
    );
  })();

  const clearFilters = () => { setFilters({}); setOpenFilter(null); };
  const tabsNode = filterTabs && (filterTabs.variant === 'tabs'
    ? <IFS.Tabs items={tabItems.map(t => ({ value: t.value, label: t.label, count: t.count, disabled: t.disabled }))} value={tab} onChange={setTab} aria-label="Filter rows" />
    : <IFS.SegmentedControl size="s" options={tabItems.map(t => ({ value: t.value, label: t.label, counter: t.count, disabled: t.disabled }))} value={tab} onChange={setTab} aria-label="Filter rows" />);
  const searchNode = search && <SmartSearch placeholder={search.placeholder} suggestions={search.suggestions} value={query}
    onChange={v => { setQuery(v); if (!v) setApplied(''); }} onSubmit={runSearch} onClear={() => runSearch('')} />;
  const toolbar = (tabsNode || searchNode || configurable) && <TableToolbar filter={tabsNode} search={searchNode} onConfigure={configurable && !toolbarOutside ? () => setSettingsOpen(true) : undefined} />;

  let body;
  if (loading) body = <IFS.Table columns={tableCols.map(c => ({ ...c, render: () => <IFS.Skeleton width={c.name ? '50%' : '60%'} height={12} />, filter: undefined }))} rows={[1, 2, 3, 4, 5].map(i => ({ [rowKey]: `sk${i}` }))} rowKey={rowKey} />;
  else if (searching) body = <div className="ifs-data-table__searching" role="status">Searching...</div>;
  else if (noSearchMatch) body = <IFS.EmptyState cause="no-results-similar" heading="No results found" body="You might be looking for" suggestions={search.noResults || []}
    onSuggestion={l => runSearch(l)} />;
  else body = (
    <div className="ifs-data-table__table" ref={tableRef}>
      <IFS.Table columns={tableCols} rows={rowsShown} rowKey={rowKey} sort={sort} onSortChange={onSortChange} selectedId={previewId}
        rowHeight={ranked ? 60 : undefined} rowProps={drag ? r => (r[rowKey] === drag.id ? { className: 'ifs-data-table__row--dragged' } : null) : undefined}
        onRowClick={onOpen ? r => { if (editing) return; clearTimeout(clickTimer.current); clickTimer.current = setTimeout(() => onOpen(r), 220); } : undefined} />
      {noFilterMatch && <div className="ifs-data-table__empty"><IFS.EmptyState cause="no-results" heading="No results found" body="Try a different term, or clear filters to see everything."
        primaryAction={{ label: 'Clear filters', type: 'secondary', onClick: clearFilters }} /></div>}
      {!noFilterMatch && ordered.length === 0 && <div className="ifs-data-table__empty"><IFS.EmptyState cause="empty-container" heading={emptyText || 'Nothing here yet'} /></div>}
      {progressive && visible < ordered.length && <div ref={sentinel}>{loadingMore && <IFS.LoadingMore />}</div>}
    </div>
  );

  const capped = fixedHeight && !expanded;
  const card = (
    <section className={ptCx('ifs-data-table', ranked && 'ifs-data-table--ranked', drag && 'ifs-data-table--dragging', capped && 'ifs-data-table--capped', className)}
      style={{ ...(capped ? { maxHeight } : null), ...style }} ref={wrapRef} aria-label={typeof title === 'string' ? title : undefined}>
      {title && <div className="ifs-data-table__header">
        <button type="button" className="ifs-data-table__title" aria-expanded={!collapsed} onClick={collapsible ? () => setCollapsed(!collapsed) : undefined} disabled={!collapsible}>
          {collapsible && <IFS.Icon name={collapsed ? 'arrow-caret-down-filled' : 'arrow-caret-up-filled'} size={12} />}{title}</button>
        {headerAction}
      </div>}
      {!collapsed && <>
        {!toolbarOutside && !pageTop && toolbar}
        <div className="ifs-data-table__scroll">{body}</div>
        {drag && drag.y != null && <IFS.DropIndicator style={{ position: 'absolute', left: 16, right: 16, top: drag.y }} />}        {fixedHeight && ordered.length > 0 && !searching && <div className="ifs-data-table__more">
          <IFS.Button type="ghost" size="s" iconRight={expanded ? 'arrow-caret-up-filled' : 'arrow-caret-down-filled'} onClick={() => setExpanded(!expanded)}>{expanded ? 'Show less' : 'Show more'}</IFS.Button>
        </div>}
        {filterPanel}
      </>}
    </section>
  );
  const settings = configurable && (
    <IFS.Drawer open={settingsOpen} onOpenChange={setSettingsOpen} title="Columns" collapsible={false} overlay="base" className="ifs-data-table__drawer"
      subtitle="You can add, drag, or toggle column visibility in your table.">
      <ColumnSettings columns={cols.filter(c => c.key)} onChange={setCols} suggestions={(configurable.suggestions || []).filter(s => !cols.some(c => c.key === s.key))}
        onAdd={s => { setCols(cs => [...cs, { ...s }]); setAdded(a => ({ ...a, [s.key]: true })); setTimeout(() => setAdded(a => ({ ...a, [s.key]: false })), 1400); }} />
    </IFS.Drawer>
  );
  if (pageTop) {
    const configureNode = configurable && <IFS.IconButton icon="system-filter-settings" type="tertiary" size="s" label="Table configuration" onClick={() => setSettingsOpen(true)} />;
    return <div className="ifs-data-table-page"><IFS.PageTop {...pageTop} tabs={tabsNode || undefined}
      search={configureNode ? <div className="ifs-table-toolbar__stack">{searchNode}<span className="ifs-table-toolbar__divider" role="separator" aria-orientation="vertical" />{configureNode}</div> : searchNode || undefined} />{card}{settings}</div>;
  }
  if (toolbarOutside) return <div className="ifs-data-table-page">{toolbar && React.cloneElement(toolbar, { onConfigure: configurable ? () => setSettingsOpen(true) : undefined })}{card}{settings}</div>;
  return <>{card}{settings}</>;
}

Object.assign(IFS, { SmartSearch, SearchModal, SearchCard, FollowButton, ColumnFilter, CollaborationBadge, TruncatedText, ActionMenu, TableToolbar, ColumnSettings, RecordPreview, DataTable });
export { SmartSearch, SearchModal, SearchCard, FollowButton, ColumnFilter, CollaborationBadge, TruncatedText, ActionMenu, TableToolbar, ColumnSettings, RecordPreview, DataTable };
