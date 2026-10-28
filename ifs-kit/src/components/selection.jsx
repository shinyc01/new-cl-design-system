import React from 'react';
import { createPortal } from 'react-dom';
import { IFS } from './registry.js';
// Selection family.
const { useState, useRef, useEffect, useLayoutEffect, useMemo } = React;
const cx = (...a) => IFS.cx(...a);
let uid = 0;
const useUid = (p) => { const r = useRef(null); if (r.current == null) r.current = `${p}-${++uid}`; return r.current; };

// Controlled + uncontrolled value in one hook.
function useControlled(prop, def, onChange) {
  const [inner, setInner] = useState(def);
  const controlled = prop !== undefined;
  const set = (v, ...more) => { if (!controlled) setInner(v); if (onChange) onChange(v, ...more); };
  return [controlled ? prop : inner, set];
}
// Open lists and the date popover render at the end of <body>, fixed to their field, so a scrolling parent
// (a modal body, a drawer, a table card) can't clip them. `floatRef` must be passed to useOutside with the root.
// z-index: the toast layer, because a list opened inside a modal (z-modal 600) must sit above it.
function Floating({ anchorRef, floatRef, position = 'down', matchWidth = true, children }) {
  const [pos, setPos] = useState(null);
  useLayoutEffect(() => {
    const calc = () => {
      const a = anchorRef.current; if (!a) return;
      const r = a.getBoundingClientRect(), gap = 4; // --gaps-gap-100
      setPos({ left: r.left, ...(matchWidth ? { width: r.width } : {}),
        ...(position === 'up' ? { bottom: window.innerHeight - r.top + gap } : { top: r.bottom + gap }) });
    };
    calc();
    window.addEventListener('scroll', calc, true); window.addEventListener('resize', calc);
    return () => { window.removeEventListener('scroll', calc, true); window.removeEventListener('resize', calc); };
  }, [position, matchWidth]);
  return createPortal(
    <div ref={floatRef} className="ifs-floating" style={{ position: 'fixed', zIndex: 'var(--z-index-z-toast)', ...(pos || { visibility: 'hidden' }) }}>
      {children}
    </div>, document.body);
}

// Close when clicking outside any of `refs`.
function useOutside(active, refs, onOutside) {
  useEffect(() => {
    if (!active) return;
    const h = e => { if (!refs.some(r => r.current && r.current.contains(e.target))) onOutside(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [active]);
}
const norm = o => (o && typeof o === 'object') ? o : { value: o, label: String(o) };

// Trigger shared by Select, MultiSelect, Combobox and DatePicker.
// Figma: single-select-atom (789:18085) / multiple-select-atom (3200:7897). Sizes s (28–24, text-only) | m (32) | l (40) | xl (44, with label prefix).
function Trigger({ size, label, placeholder, filled, children, iconLeft, isOpen, loading, error, disabled, clearable, onClear, state, triggerRef, valueTitle, input, ...rest }) {
  const forcedOpen = state === 'open';
  return (
    <div ref={triggerRef} tabIndex={input || disabled ? -1 : 0} aria-disabled={disabled || undefined} data-state={state}
      className={cx('ifs-select__trigger', (isOpen || forcedOpen) && 'is-open', filled && 'is-filled', error && 'is-error', loading && 'is-loading', disabled && 'is-disabled')} {...rest}>
      {size === 'xl' && label && <span className="ifs-select__label">{label}</span>}
      <span className="ifs-select__field">
        {iconLeft && <IFS.Icon name={iconLeft} size={12} className="ifs-select__icon" />}
        {input || (filled
          ? (typeof children === 'string' ? <span className="ifs-select__value" title={valueTitle || children}>{children}</span> : children)
          : <span className="ifs-select__value is-placeholder">{size === 's' ? (label || placeholder) : placeholder}</span>)}
        {loading
          ? <IFS.Icon name="system-loader" size={12} className="ifs-select__loader" />
          : <>
            {clearable && filled && !disabled && (
              <button type="button" tabIndex={-1} aria-label="Clear" className="ifs-select__clear"
                onMouseDown={e => e.preventDefault()} onClick={e => { e.stopPropagation(); onClear(); }}>
                <IFS.Icon name="system-close" size={16} />
              </button>)}
            <IFS.Icon name={isOpen || forcedOpen ? 'arrow-caret-up-filled' : 'arrow-caret-down-filled'} size={12} className="ifs-select__caret" />
          </>}
      </span>
    </div>
  );
}

// Figma: single-select-list-atom (153:61939) / multiple-select-list-atom (3273:32692) inside the list molecules.
function OptionList({ id, opts, isSelected, active, onPick, multi, listPosition, listSize, listTitle, listRef, empty }) {
  return (
    <div ref={listRef} id={id} role="listbox" aria-multiselectable={multi || undefined}
      className={cx('ifs-select__list', `ifs-select__list--${listPosition}`, `ifs-select__list--${listSize}`)}
      onMouseDown={e => e.preventDefault()}>
      {listTitle && <div className="ifs-select__list-title" role="presentation">{listTitle}</div>}
      {opts.length === 0 && empty}
      {opts.map((o, i) => {
        const sel = isSelected(o);
        return (
          <div key={String(o.value)} id={`${id}-${i}`} data-index={i} role="option" aria-selected={sel} aria-disabled={o.disabled || undefined}
            className={cx('ifs-select__option', sel && 'is-selected', i === active && 'is-active', o.disabled && 'is-disabled')}
            onClick={() => !o.disabled && onPick(o)}>
            {multi && <span className="ifs-select__check" aria-hidden="true">{sel && <IFS.Icon name="system-check" size={12} />}</span>}
            {o.icon && <IFS.Icon name={o.icon} size={listSize === 'l' ? 16 : 12} />}
            <span className="ifs-select__option-label" title={o.label}>{o.label}</span>
            {!multi && sel && <IFS.Icon name="system-check" size={12} className="ifs-select__option-check" />}
          </div>
        );
      })}
    </div>
  );
}

// Tags in the multiple-select trigger (badge-atom Color=White, Size=M (24)): as many as fit (max `max`), then "+N".
function Tags({ items, max }) {
  const boxRef = useRef(null), measRef = useRef(null);
  const [fit, setFit] = useState(Math.min(max, items.length));
  const key = items.map(o => o.label).join('\u0000');
  useLayoutEffect(() => {
    const box = boxRef.current, meas = measRef.current;
    if (!box || !meas) return;
    const calc = () => {
      const kids = [...meas.children], gap = 4, avail = box.clientWidth;
      const plus = kids[kids.length - 1].offsetWidth, widths = kids.slice(0, -1).map(k => k.offsetWidth);
      let k = Math.min(max, widths.length);
      const need = n => widths.slice(0, n).reduce((a, w) => a + w + gap, 0) + (n < items.length ? plus : -gap);
      while (k > 1 && need(k) > avail) k--;
      setFit(k);
    };
    calc();
    const ro = window.ResizeObserver ? new ResizeObserver(calc) : null;
    ro && ro.observe(box);
    return () => ro && ro.disconnect();
  }, [key, max]);
  const shown = items.slice(0, fit), rest = items.slice(fit);
  return (
    <span className="ifs-select__tags" ref={boxRef}>
      {shown.map(o => <span key={String(o.value)} className="ifs-select__tag" title={o.label}>{o.label}</span>)}
      {rest.length > 0 && <span className="ifs-select__tag" title={rest.map(o => o.label).join('\n')}>+{rest.length}</span>}
      <span className="ifs-select__tags-measure" ref={measRef} aria-hidden="true">
        {items.slice(0, max).map(o => <span key={String(o.value)} className="ifs-select__tag">{o.label}</span>)}
        <span className="ifs-select__tag">+{items.length}</span>
      </span>
    </span>
  );
}

// Keyboard + open state shared by the dropdowns.
function useDropdown({ open, defaultOpen, onOpenChange, disabled, opts, firstIndex }) {
  const [isOpen, setOpenRaw] = useControlled(open, defaultOpen, onOpenChange);
  const [active, setActive] = useState(-1);
  const setOpen = v => { if (disabled && v) return; if (v !== isOpen) setOpenRaw(v); if (!v) setActive(-1); };
  const move = (from, dir) => {
    const n = opts.length; if (!n) return -1;
    for (let k = 1; k <= n; k++) { const i = ((from < 0 ? (dir > 0 ? -1 : n) : from) + dir * k + n * k) % n; if (!opts[i].disabled) return i; }
    return -1;
  };
  return { isOpen, setOpen, active, setActive, move, open: () => { setOpen(true); setActive(firstIndex()); } };
}
function scrollActive(listRef, active) {
  useEffect(() => {
    const el = listRef.current && listRef.current.querySelector(`[data-index="${active}"]`);
    if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
  }, [active]);
}

// Base for Select and MultiSelect.
function SelectBase({ multi, options = [], value, defaultValue, onChange, open, defaultOpen = false, onOpenChange,
  size = 'm', label, placeholder, iconLeft, clearable = true, loading, error, disabled, maxTags = 5,
  listPosition = 'down', listTitle, listSize = 's', state, className, style, id, 'aria-label': ariaLabel, ...rest }) {
  const opts = useMemo(() => options.map(norm), [options]);
  const [val, setVal] = useControlled(value, defaultValue !== undefined ? defaultValue : (multi ? [] : null), onChange);
  const values = multi ? (val || []) : (val == null ? [] : [val]);
  const isSelected = o => values.includes(o.value);
  const listId = useUid('ifs-select-list');
  const rootRef = useRef(null), trigRef = useRef(null), listRef = useRef(null), floatRef = useRef(null);
  const dd = useDropdown({ open, defaultOpen, onOpenChange, disabled, opts,
    firstIndex: () => { const i = opts.findIndex(o => isSelected(o) && !o.disabled); return i >= 0 ? i : opts.findIndex(o => !o.disabled); } });
  useOutside(dd.isOpen, [rootRef, floatRef], () => dd.setOpen(false));
  scrollActive(listRef, dd.active);

  const pick = o => {
    if (multi) setVal(isSelected(o) ? values.filter(v => v !== o.value) : [...values, o.value], o);
    else { setVal(o.value, o); dd.setOpen(false); }
  };
  const clear = () => setVal(multi ? [] : null);
  const onKeyDown = e => {
    if (disabled) return;
    const k = e.key;
    if (k === 'ArrowDown' || k === 'ArrowUp') { e.preventDefault(); if (!dd.isOpen) dd.open(); else dd.setActive(dd.move(dd.active, k === 'ArrowDown' ? 1 : -1)); }
    else if ((k === 'Home' || k === 'End') && dd.isOpen) { e.preventDefault(); dd.setActive(dd.move(-1, k === 'Home' ? 1 : -1)); }
    else if (k === 'Enter' || k === ' ') { e.preventDefault(); if (dd.isOpen && dd.active >= 0) pick(opts[dd.active]); else if (dd.isOpen) dd.setOpen(false); else dd.open(); }
    else if (k === 'Escape' && dd.isOpen) { e.preventDefault(); e.stopPropagation(); dd.setOpen(false); }
    else if (k === 'Tab' && dd.isOpen) dd.setOpen(false);
    else if ((k === 'Backspace' || k === 'Delete') && clearable && values.length) { e.preventDefault(); clear(); }
  };

  const selOpts = opts.filter(isSelected);
  const filled = selOpts.length > 0;
  let content = null;
  if (filled && multi && size === 's') content = <span className="ifs-select__value is-count">{selOpts.length} selected</span>;
  else if (filled && multi)
    content = <Tags items={selOpts} max={maxTags} />;
  else if (filled) content = selOpts[0].label;

  return (
    <div ref={rootRef} id={id} className={cx('ifs-select', `ifs-select--${size}`, className)} style={style}>
      <Trigger size={size} label={label} placeholder={placeholder != null ? placeholder : (size === 's' ? 'Select' : 'Select…')}
        filled={filled} iconLeft={iconLeft} isOpen={dd.isOpen} loading={loading} error={error} disabled={disabled}
        clearable={clearable} onClear={clear} state={state} triggerRef={trigRef}
        role="combobox" aria-haspopup="listbox" aria-expanded={dd.isOpen} aria-controls={listId} aria-invalid={error || undefined}
        aria-label={ariaLabel || label} aria-activedescendant={dd.isOpen && dd.active >= 0 ? `${listId}-${dd.active}` : undefined}
        onClick={() => { if (!disabled) dd.isOpen ? dd.setOpen(false) : dd.open(); }} onKeyDown={onKeyDown} {...rest}>
        {content}
      </Trigger>
      {dd.isOpen && <Floating anchorRef={rootRef} floatRef={floatRef} position={listPosition}>
        <OptionList id={listId} opts={opts} isSelected={isSelected} active={dd.active} onPick={pick} multi={multi}
          listPosition={listPosition} listSize={listSize} listTitle={listTitle} listRef={listRef} />
      </Floating>}
    </div>
  );
}

// Figma: single-select-organism (3273:26820) = single-select-atom (789:18085) + single-select-list-molecule (153:62054)
// Props: options (strings or {value,label,icon,disabled}), value/defaultValue/onChange(value, option), open/defaultOpen/onOpenChange,
// size s|m|l|xl, label (xl prefix / s text), placeholder, iconLeft, clearable (Figma show-remove-select, default true), loading, error,
// disabled, listPosition down|up (Figma "List position"), listTitle (e.g. "Suggested"), listSize s|l, state hover|focus|open (gallery).
function Select(props) { return <SelectBase {...props} multi={false} />; }

// Figma: multiple-select-organism (3273:33904) = multiple-select-atom (3200:7897) + multiple-select-list-molecule (3273:33695)
// Same props as Select; value is an array. maxTags (default 5) tags then "+N". Size s shows "N selected". List stays open while picking.
function MultiSelect(props) { return <SelectBase {...props} multi={true} />; }

// Figma: signle-combobox-organism (3375:5415). Type to filter.
// Props: options, value/defaultValue/onChange(value, option), defaultOpen, defaultQuery, size m|l|xl, label, placeholder, iconLeft, clearable, loading, error,
// disabled, listPosition, listTitle ("Suggested", shown before typing), resultsTitle ("Results", while typing),
// emptyTitle / emptyText / suggestions (Figma "No results" state: heading, hint and suggestion chips that fill the query),
// filter(option, query), state. While loading and open, the list shows Figma's "Searching..." panel.
function Combobox({ options = [], value, defaultValue = null, onChange, defaultOpen = false, defaultQuery = null, size = 'm', label, placeholder = 'Search item', iconLeft, clearable = true,
  loading, error, disabled, listPosition = 'down', listTitle = 'Suggested', resultsTitle = 'Results', listSize = 's',
  emptyTitle = 'No results found', emptyText = 'You might be looking for', suggestions = [], state, className, style, id,
  filter = (o, q) => o.label.toLowerCase().includes(q.toLowerCase()), 'aria-label': ariaLabel, ...rest }) {
  const all = useMemo(() => options.map(norm), [options]);
  const [val, setVal] = useControlled(value, defaultValue, onChange);
  const selected = all.find(o => o.value === val);
  const [query, setQuery] = useState(defaultQuery); // null = not typing, show the selected label
  const opts = query ? all.filter(o => filter(o, query)) : all;
  const listId = useUid('ifs-combo-list');
  const rootRef = useRef(null), listRef = useRef(null), inputRef = useRef(null), floatRef = useRef(null);
  const dd = useDropdown({ disabled, opts, defaultOpen,
    firstIndex: () => { const i = opts.findIndex(o => o.value === val && !o.disabled); return i >= 0 ? i : opts.findIndex(o => !o.disabled); } });
  const close = () => { dd.setOpen(false); setQuery(null); };
  useOutside(dd.isOpen, [rootRef, floatRef], close);
  scrollActive(listRef, dd.active);
  const pick = o => { setVal(o.value, o); close(); };
  const onKeyDown = e => {
    const k = e.key;
    if (k === 'ArrowDown' || k === 'ArrowUp') { e.preventDefault(); if (!dd.isOpen) dd.open(); else dd.setActive(dd.move(dd.active, k === 'ArrowDown' ? 1 : -1)); }
    else if (k === 'Enter' && dd.isOpen && dd.active >= 0 && opts[dd.active]) { e.preventDefault(); pick(opts[dd.active]); }
    else if (k === 'Escape' && dd.isOpen) { e.preventDefault(); e.stopPropagation(); close(); }
    else if (k === 'Tab' && dd.isOpen) close();
  };
  const text = query != null ? query : (selected ? selected.label : '');
  return (
    <div ref={rootRef} id={id} className={cx('ifs-select', `ifs-select--${size}`, 'ifs-combobox', className)} style={style}>
      <Trigger size={size} label={label} filled={!!selected} iconLeft={iconLeft} isOpen={dd.isOpen} loading={loading} error={error}
        disabled={disabled} clearable={clearable} state={state} onClear={() => { setVal(null); setQuery(null); }}
        onClick={() => { if (!disabled) { inputRef.current && inputRef.current.focus(); if (!dd.isOpen) dd.open(); } }}
        input={<input ref={inputRef} className="ifs-select__input" value={text} placeholder={placeholder} disabled={disabled}
          role="combobox" aria-autocomplete="list" aria-expanded={dd.isOpen} aria-controls={listId} aria-label={ariaLabel || label}
          aria-invalid={error || undefined} aria-activedescendant={dd.isOpen && dd.active >= 0 ? `${listId}-${dd.active}` : undefined}
          onChange={e => { setQuery(e.target.value); dd.setOpen(true); dd.setActive(-1); }}
          onKeyDown={onKeyDown} {...rest} />} />
      {dd.isOpen && <Floating anchorRef={rootRef} floatRef={floatRef} position={listPosition}>{loading
        ? <div className={cx('ifs-select__list', `ifs-select__list--${listPosition}`)} role="status"><div className="ifs-select__searching">Searching...</div></div>
        : <OptionList id={listId} opts={opts} isSelected={o => o.value === val} active={dd.active} onPick={pick}
          listPosition={listPosition} listSize={listSize} listTitle={opts.length ? (query ? resultsTitle : listTitle) : null} listRef={listRef}
          empty={<div className="ifs-select__empty-state" role="status">
            <div className="ifs-select__empty-title">{emptyTitle}</div>
            {suggestions.length > 0 && <div className="ifs-select__empty-body">
              <div className="ifs-select__empty-text">{emptyText}</div>
              <div className="ifs-select__empty-chips">{suggestions.map(t => <Chip key={t} tabIndex={-1} onClick={e => { e.preventDefault(); setQuery(t); dd.setActive(-1); }}>{t}</Chip>)}</div>
            </div>}
          </div>} />}</Floating>}
    </div>
  );
}

// Figma: segmented-control-organism (1387:244501) built from segmented-control-atom (1387:244511)
// Props: options = [{ value, label, iconLeft, iconRight, counter, disabled, state }] (strings allowed), value/defaultValue/onChange,
// size m (34) | s (24). Arrow keys move the selection (radio group).
function SegmentedControl({ options = [], value, defaultValue, onChange, size = 'm', className, ...rest }) {
  const opts = options.map(norm);
  const [val, setVal] = useControlled(value, defaultValue !== undefined ? defaultValue : (opts[0] && opts[0].value), onChange);
  const refs = useRef([]);
  const onKeyDown = (e, i) => {
    const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    for (let k = 1; k <= opts.length; k++) {
      const j = (i + dir * k + opts.length * k) % opts.length;
      if (!opts[j].disabled) { setVal(opts[j].value, opts[j]); refs.current[j] && refs.current[j].focus(); break; }
    }
  };
  return (
    <div role="radiogroup" className={cx('ifs-segmented', `ifs-segmented--${size}`, className)} {...rest}>
      {opts.map((o, i) => {
        const sel = o.value === val;
        return (
          <button key={String(o.value)} ref={el => (refs.current[i] = el)} type="button" role="radio" aria-checked={sel}
            tabIndex={sel ? 0 : -1} disabled={o.disabled} data-state={o.state} aria-label={o.label == null ? o.ariaLabel : undefined}
            className={cx('ifs-segmented__item', sel && 'is-selected')}
            onClick={() => setVal(o.value, o)} onKeyDown={e => onKeyDown(e, i)}>
            {o.iconLeft && <IFS.Icon name={o.iconLeft} size={12} />}
            {o.label != null && <span>{o.label}</span>}
            {o.iconRight && <IFS.Icon name={o.iconRight} size={12} />}
            {o.counter != null && <span className="ifs-selection-counter">{o.counter}</span>}
          </button>
        );
      })}
    </div>
  );
}

// Figma: chips (832:235895)
// Props: children = label, selected/defaultSelected/onChange(selected) (Figma Select=True|False), iconLeft, iconRight (icon names),
// indicator warning|danger|success|info (Figma "Show indicator"), counter (Figma show-counter), onRemove (makes the right icon a
// remove control, default system-close; Delete/Backspace also removes), disabled, state hover|pressed|focus.
function Chip({ children, selected, defaultSelected = false, onChange, iconLeft, iconRight, indicator, counter, onRemove, disabled, state, className, onClick, onKeyDown, ...rest }) {
  const [sel, setSel] = useControlled(selected, defaultSelected, onChange);
  const rightIcon = iconRight || (onRemove ? 'system-close' : null);
  return (
    <button type="button" aria-pressed={sel} disabled={disabled} data-state={state} className={cx('ifs-chip', sel && 'is-selected', className)}
      onClick={e => { onClick && onClick(e); if (!e.defaultPrevented) setSel(!sel); }}
      onKeyDown={e => { onKeyDown && onKeyDown(e); if (onRemove && (e.key === 'Delete' || e.key === 'Backspace')) { e.preventDefault(); onRemove(); } }} {...rest}>
      {indicator && <span className={cx('ifs-chip__indicator', `ifs-chip__indicator--${indicator}`)} />}
      {iconLeft && <IFS.Icon name={iconLeft} size={12} />}
      {children != null && <span>{children}</span>}
      {counter != null && <span className="ifs-selection-counter">{counter}</span>}
      {rightIcon && (onRemove
        ? <span className="ifs-chip__remove" role="button" aria-label="Remove" onClick={e => { e.stopPropagation(); e.preventDefault(); if (!disabled) onRemove(); }}><IFS.Icon name={rightIcon} size={12} /></span>
        : <IFS.Icon name={rightIcon} size={12} />)}
    </button>
  );
}

// ---------- Calendar ----------
const sameDay = (a, b) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Figma: date-picker-molecule (3406:9510) with date-atom (1440:5201) cells
// Props: value/defaultValue/onChange (Date; with range=true {start, end}), month/defaultMonth/onMonthChange (any Date in that month),
// today (Date), events ({ 'YYYY-MM-DD': ['danger','warning','info'] }), weekStartsOn (default 1 = Monday), min/max (Dates).
// Keyboard: arrows move a day/week, PageUp/PageDown change month, Home/End week start/end, Enter/Space select.
function Calendar({ value, defaultValue = null, onChange, range = false, month, defaultMonth, onMonthChange, today = new Date(),
  events = {}, weekStartsOn = 1, min, max, autoFocus, className, ...rest }) {
  const [val, setVal] = useControlled(value, defaultValue, onChange);
  const anchor = (range ? val && val.start : val) || today;
  const [view, setView] = useControlled(month, defaultMonth || new Date(anchor.getFullYear(), anchor.getMonth(), 1), onMonthChange);
  const vy = view.getFullYear(), vm = view.getMonth();
  const [focusDate, setFocusDate] = useState(startOfDay(anchor));
  const kbd = useRef(!!autoFocus);
  const gridRef = useRef(null);
  useEffect(() => {
    if (!kbd.current || !gridRef.current) return;
    const el = gridRef.current.querySelector('[tabindex="0"]');
    if (el) el.focus();
  });
  const first = new Date(vy, vm, 1);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const dim = new Date(vy, vm + 1, 0).getDate();
  const rows = Math.ceil((offset + dim) / 7);
  const start = addDays(first, -offset);
  const focusInView = focusDate.getFullYear() === vy && focusDate.getMonth() === vm ? focusDate : first;
  const out = d => (min && d < startOfDay(min)) || (max && d > startOfDay(max));
  const goMonth = n => setView(new Date(vy, vm + n, 1));
  const select = d => {
    if (out(d)) return;
    if (!range) setVal(d);
    else if (!val || !val.start || val.end) setVal({ start: d, end: null });
    else setVal(d < val.start ? { start: d, end: val.start } : { start: val.start, end: d });
    setFocusDate(d);
    if (d.getMonth() !== vm) setView(new Date(d.getFullYear(), d.getMonth(), 1));
  };
  const onKeyDown = e => {
    const d = focusInView;
    const map = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    let next = null;
    if (map[e.key] != null) next = addDays(d, map[e.key]);
    else if (e.key === 'PageUp' || e.key === 'PageDown') { const n = e.key === 'PageUp' ? -1 : 1; next = new Date(d.getFullYear(), d.getMonth() + n, Math.min(d.getDate(), new Date(d.getFullYear(), d.getMonth() + n + 1, 0).getDate())); }
    else if (e.key === 'Home') next = addDays(d, -((d.getDay() - weekStartsOn + 7) % 7));
    else if (e.key === 'End') next = addDays(d, 6 - ((d.getDay() - weekStartsOn + 7) % 7));
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(d); return; }
    if (!next) return;
    e.preventDefault(); kbd.current = true;
    setFocusDate(next);
    if (next.getMonth() !== vm || next.getFullYear() !== vy) setView(new Date(next.getFullYear(), next.getMonth(), 1));
  };
  const s = range ? val && val.start : val, en = range ? val && val.end : null;
  const key = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const title = first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  return (
    <div className={cx('ifs-calendar', className)} {...rest}>
      <div className="ifs-calendar__head">
        <span className="ifs-calendar__title" aria-live="polite">{title}<IFS.Icon name="arrow-caret-down-filled" size={12} /></span>
        <span className="ifs-calendar__nav">
          <IFS.IconButton type="secondary" size="s" icon="arrow-chevron-left" label="Previous month" onClick={() => goMonth(-1)} />
          <IFS.IconButton type="secondary" size="s" icon="arrow-chevron-right" label="Next month" onClick={() => goMonth(1)} />
        </span>
      </div>
      <div className="ifs-calendar__body" role="grid" aria-label={title} ref={gridRef} onKeyDown={onKeyDown} onBlur={() => (kbd.current = false)}>
        <div className="ifs-calendar__row" role="row">
          {Array.from({ length: 7 }, (_, i) => <span key={i} role="columnheader" className="ifs-calendar__weekday">{WEEKDAYS[(i + weekStartsOn) % 7]}</span>)}
        </div>
        {Array.from({ length: rows }, (_, r) => (
          <div className="ifs-calendar__row" role="row" key={r}>
            {Array.from({ length: 7 }, (_, c) => {
              const d = addDays(start, r * 7 + c);
              const isEnd = sameDay(d, s) || sameDay(d, en);
              const inRange = range && s && en && d > s && d < en;
              const ev = events[key(d)];
              return (
                <button key={c} type="button" role="gridcell" tabIndex={sameDay(d, focusInView) ? 0 : -1} disabled={out(d)}
                  aria-selected={isEnd || inRange || undefined} aria-current={sameDay(d, today) ? 'date' : undefined}
                  aria-label={d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  className={cx('ifs-calendar__date', d.getMonth() !== vm && (d < first ? 'is-last' : 'is-next'),
                    sameDay(d, today) && 'is-today', inRange && 'is-selected', isEnd && 'is-endpoint')}
                  onClick={() => select(d)}>
                  {d.getDate()}
                  {ev && ev.length > 0 && <span className="ifs-calendar__events">{ev.slice(0, 3).map((t, i) => <i key={i} className={`is-${t}`} />)}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// DatePicker = select trigger (single-select-atom look) + Calendar popup (date-picker-molecule 3406:9510).
// Props: value/defaultValue/onChange (Date or {start,end} with range), open/defaultOpen/onOpenChange, size s|m|l|xl, label, placeholder,
// format(date) → string, range, clearable, error, disabled, listPosition down|up, state, plus Calendar props (today, events, min, max).
function DatePicker({ value, defaultValue = null, onChange, open, defaultOpen = false, onOpenChange, size = 'm', label, placeholder = 'Select date',
  format = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), range = false, clearable = true,
  error, disabled, listPosition = 'down', state, today, events, min, max, className, style, id, 'aria-label': ariaLabel, ...rest }) {
  const [val, setVal] = useControlled(value, defaultValue, onChange);
  const [isOpen, setOpenRaw] = useControlled(open, defaultOpen, onOpenChange);
  const setOpen = v => { if (disabled && v) return; if (v !== isOpen) setOpenRaw(v); };
  const rootRef = useRef(null), trigRef = useRef(null), floatRef = useRef(null);
  const popId = useUid('ifs-datepicker');
  useOutside(isOpen, [rootRef, floatRef], () => setOpen(false));
  const filled = range ? !!(val && val.start) : !!val;
  const text = !filled ? null : range ? `${format(val.start)} – ${val.end ? format(val.end) : '…'}` : format(val);
  const onPick = v => { setVal(v); if (!range || (v && v.end)) { setOpen(false); trigRef.current && trigRef.current.focus(); } };
  return (
    <div ref={rootRef} id={id} className={cx('ifs-select', `ifs-select--${size}`, 'ifs-datepicker', className)} style={style}>
      <Trigger size={size} label={label} placeholder={placeholder} filled={filled} isOpen={isOpen} error={error} disabled={disabled}
        clearable={clearable} onClear={() => setVal(null)} state={state} triggerRef={trigRef}
        role="combobox" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={popId} aria-label={ariaLabel || label}
        onClick={() => setOpen(!isOpen)}
        onKeyDown={e => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); }
          else if ((e.key === 'Backspace' || e.key === 'Delete') && clearable && filled) { e.preventDefault(); setVal(null); }
        }} {...rest}>{text}</Trigger>
      {isOpen && (
        <Floating anchorRef={rootRef} floatRef={floatRef} position={listPosition} matchWidth={false}>
        <div id={popId} role="dialog" aria-label={ariaLabel || label || 'Choose date'} className={cx('ifs-datepicker__popover', `ifs-datepicker__popover--${listPosition}`)}
          onKeyDown={e => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false); trigRef.current && trigRef.current.focus(); } }}>
          <Calendar value={val} onChange={onPick} range={range} today={today} events={events} min={min} max={max} autoFocus={!state} />
        </div>
        </Floating>
      )}
    </div>
  );
}

Object.assign(IFS, { Select, MultiSelect, Combobox, SegmentedControl, Chip, Calendar, DatePicker });
export { Select, MultiSelect, Combobox, SegmentedControl, Chip, Calendar, DatePicker };
