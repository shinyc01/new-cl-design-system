import React from 'react';
import { IFS } from './registry.js';
// Extras family: circular buttons, icon-button presets, counter, hotkey, scroll area, phone field, slider,
// form card, icon picker, weekday, logo. Value callbacks get the new value first: onChange(value, …).

// Controlled-or-uncontrolled state helper (extras family only).
function useExtrasValue(value, defaultValue, onChange) {
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : inner;
  const set = (v, ...more) => { if (!controlled) setInner(v); onChange && onChange(v, ...more); };
  return [current, set];
}

// Figma: hotkey-atom (67:6150)
// Props: children = hotkey text (Figma "hotkey", default "⌘/").
function Hotkey({ children = '⌘/', className, ...rest }) {
  return <kbd className={IFS.cx('ifs-hotkey', className)} {...rest}>{children}</kbd>;
}

// Figma: counter-atom (88:24147)
// Props: size s (18) | m (24), indicator (show-indicator: true = Blue, or a StatusIndicator state), children = number.
function Counter({ size = 's', indicator, children, className, ...rest }) {
  return (
    <span className={IFS.cx('ifs-counter', size === 'm' && 'ifs-counter--m', className)} {...rest}>
      {children}
      {indicator && <IFS.StatusIndicator state={indicator === true ? 'blue' : indicator} />}
    </span>
  );
}

// Figma: scroll-bar-atom (83:57650)
// A scroll container with the Figma bar (8px track, 4px bar) in place of the native scrollbar.
// Props: height / maxHeight (the scroll box), children, label (aria-label; makes the viewport keyboard-focusable),
// plus any <div> attribute on the outer element.
function ScrollArea({ height, maxHeight, children, label, className, style, ...rest }) {
  const vp = React.useRef(null);
  const [bar, setBar] = React.useState({ show: false, top: 0, size: 0 });
  const update = React.useCallback(() => {
    const el = vp.current; if (!el) return;
    const { scrollHeight: sh, clientHeight: ch, scrollTop: st } = el;
    if (sh <= ch + 1) { setBar(b => b.show ? { show: false, top: 0, size: 0 } : b); return; }
    const size = Math.max(24, ch * ch / sh);
    setBar({ show: true, size, top: (st / (sh - ch)) * (ch - size) });
  }, []);
  React.useEffect(() => {
    update();
    const el = vp.current; if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(update); ro.observe(el); if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, [update]);
  const drag = e => {
    e.preventDefault();
    const el = vp.current, startY = e.clientY, start = el.scrollTop;
    const ratio = (el.scrollHeight - el.clientHeight) / (el.clientHeight - bar.size);
    const move = ev => { el.scrollTop = start + (ev.clientY - startY) * ratio; };
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  };
  return (
    <div className={IFS.cx('ifs-scroll-area', className)} style={{ height, maxHeight, ...style }} {...rest}>
      <div ref={vp} className="ifs-scroll-area__viewport" style={{ maxHeight }} onScroll={update}
        tabIndex={label ? 0 : undefined} role={label ? 'region' : undefined} aria-label={label}>
        <div>{children}</div>
      </div>
      <div className="ifs-scroll-area__track" hidden={!bar.show} aria-hidden="true">
        <div className="ifs-scroll-area__bar" style={{ height: bar.size, transform: `translateY(${bar.top}px)` }} onPointerDown={drag} />
      </div>
    </div>
  );
}

// Figma: scroll-bar-atom (83:57650) drawn alone (gallery / static mocks).
// Props: location top|center|bottom, height (track length, Figma 1000).
function ScrollBar({ location = 'top', height = 300, className }) {
  const top = location === 'top' ? 0 : location === 'bottom' ? height - 140 : (height - 140) / 2;
  return <span className={IFS.cx('ifs-scroll-bar', className)} style={{ height }} aria-hidden="true">
    <span className="ifs-scroll-area__bar" style={{ top }} />
  </span>;
}

// Arrow icon per direction: each arrow points at the hub (Figma defaults).
const EXTRAS_ARROW = { left: 'arrow-right', right: 'arrow-left', top: 'arrow-down', bottom: 'arrow-up' };

// Figma: circular-button-molecule (72:9983)
// Props: direction left|right|top|bottom (Figma Type = which side of the hub it sits on), children = button label,
// hotkey (hotkey-atom text; absent = show-hotkey off), icon (arrow swap; defaults point at the hub), disabled,
// state hover|pressed|focus (gallery), plus any <button> attribute.
function CircularButton({ direction = 'left', children, hotkey, icon, state, className, ...rest }) {
  const label = <span className="ifs-circular-button__label">{children}{hotkey && <Hotkey>{hotkey}</Hotkey>}</span>;
  const arrow = <span className="ifs-circular-button__arrow"><IFS.Icon name={icon || EXTRAS_ARROW[direction]} size={16} /></span>;
  const arrowFirst = direction === 'right' || direction === 'bottom';
  return (
    <button type="button" data-state={state} className={IFS.cx('ifs-circular-button', `ifs-circular-button--${direction}`, className)} {...rest}>
      {arrowFirst ? <>{arrow}{label}</> : <>{label}{arrow}</>}
    </button>
  );
}

const EXTRAS_DIR_DEG = { top: 0, right: 90, bottom: 180, left: 270 };
const EXTRAS_KEY_DIR = { ArrowUp: 'top', ArrowRight: 'right', ArrowDown: 'bottom', ArrowLeft: 'left' };
const extrasIsMac = () => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
// "Mod+1", "Ctrl+Shift+ArrowUp", "Alt+k" → does the event match? Mod = ⌘ on Mac, Ctrl elsewhere.
function extrasMatchShortcut(e, s) {
  if (!s) return false;
  const parts = s.split('+'); const key = parts.pop();
  const want = { meta: false, ctrl: false, alt: false, shift: false };
  parts.forEach(p => { const m = p.toLowerCase(); if (m === 'mod') want[extrasIsMac() ? 'meta' : 'ctrl'] = true; else if (m in want) want[m] = true; else if (m === 'cmd') want.meta = true; });
  return e.key.toLowerCase() === key.toLowerCase() && e.metaKey === want.meta && e.ctrlKey === want.ctrl && e.altKey === want.alt && e.shiftKey === want.shift;
}

// Figma: circular-button-organism (72:10235)
// A radial menu of 2–4 directional actions around a point on a canvas node (more than 4 → use a menu).
// Props: actions = [{ direction top|right|bottom|left, label, hotkey (display text, e.g. "⌘1"),
//   shortcut (key combo, e.g. "Mod+1"; works while the menu is mounted), onSelect, disabled }],
// onSelect(action) (any action), onClose (Escape), hover (force the hover wedge: direction — gallery),
// autoFocus (focus the first action). Arrow keys move between actions by direction; Enter/Space activate.
function CircularMenu({ actions = [], onSelect, onClose, hover, autoFocus, className, style, ...rest }) {
  if (actions.length > 4 && typeof console !== 'undefined') console.warn('[IFS] CircularMenu supports 2–4 actions; use a menu for more.');
  const list = actions.slice(0, 4);
  const [hot, setHot] = React.useState(null);
  const refs = React.useRef({});
  const fire = a => { if (a.disabled) return; a.onSelect && a.onSelect(a); onSelect && onSelect(a); };
  React.useEffect(() => {
    if (autoFocus) { const first = list.find(a => !a.disabled); first && refs.current[first.direction] && refs.current[first.direction].focus(); }
  }, []);
  React.useEffect(() => {
    if (!list.some(a => a.shortcut)) return;
    const onKey = e => { const a = list.find(x => extrasMatchShortcut(e, x.shortcut)); if (a && !a.disabled) { e.preventDefault(); fire(a); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });
  const onKeyDown = e => {
    if (e.key === 'Escape' && onClose) { e.preventDefault(); onClose(); return; }
    const dir = EXTRAS_KEY_DIR[e.key];
    if (dir && refs.current[dir] && !e.metaKey && !e.ctrlKey) { e.preventDefault(); refs.current[dir].focus(); }
  };
  const lit = hover || hot;
  return (
    <div role="menu" aria-orientation="horizontal" className={IFS.cx('ifs-circular-menu', className)} style={style} onKeyDown={onKeyDown} {...rest}>
      <div className="ifs-circular-menu__hub" aria-hidden="true" style={{ '--dir': `${EXTRAS_DIR_DEG[lit] || 0}deg` }}>
        <span className={IFS.cx('ifs-circular-menu__glow', lit && 'is-on')} />
        <span className={IFS.cx('ifs-circular-menu__rim', lit && 'is-on')} />
        <span className="ifs-circular-menu__core" />
      </div>
      {list.map(a => (
        <CircularButton key={a.direction} direction={a.direction} hotkey={a.hotkey} icon={a.icon} disabled={a.disabled}
          role="menuitem" aria-keyshortcuts={a.shortcut ? a.shortcut.replace(/Mod/i, extrasIsMac() ? 'Meta' : 'Control') : undefined}
          state={hover === a.direction ? 'hover' : undefined}
          onMouseEnter={() => !a.disabled && setHot(a.direction)} onMouseLeave={() => setHot(null)}
          onFocus={() => setHot(a.direction)} onBlur={() => setHot(null)}
          onClick={() => fire(a)} data-dir={a.direction}>{a.label}</CircularButton>
      ))}
      <ExtrasRefCollector refs={refs} />
    </div>
  );
}
// Collects the rendered action buttons by direction (CircularButton is a plain function component).
function ExtrasRefCollector({ refs }) {
  const self = React.useRef(null);
  React.useLayoutEffect(() => {
    const root = self.current && self.current.parentElement; if (!root) return;
    refs.current = {};
    root.querySelectorAll('.ifs-circular-button[data-dir]').forEach(b => { refs.current[b.dataset.dir] = b; });
  });
  return <span ref={self} hidden />;
}

// Icon-button presets: Figma icon-button S (24) + a "new" dot. Composed from IFS.IconButton.
function ExtrasDotButton({ kind, icon, type, hasNew, label, className, ...rest }) {
  return (
    <span className={IFS.cx('ifs-dot-button', `ifs-dot-button--${kind}`, className)}>
      <IFS.IconButton icon={icon} type={type} size="s" label={hasNew ? `${label} (new)` : label} {...rest} />
      {hasNew && (kind === 'notification'
        ? <IFS.StatusIndicator state="error" stroke className="ifs-dot-button__dot" />
        : <span className="ifs-dot-button__dot" aria-hidden="true" />)}
    </span>
  );
}
// Figma: icon-button-notification (357:53417). Ghost S bell; hasNew (Figma "Has new notiication?") shows the Error dot.
// Props: hasNew, label (default "Notifications"), state (gallery), plus any <button> attribute.
function NotificationButton({ label = 'Notifications', ...p }) { return <ExtrasDotButton kind="notification" icon="system-notification" type="ghost" label={label} {...p} />; }
// Figma: icon-button-comment (2563:8153). Tertiary S; hasNew ("Has a new comment?") shows the danger dot.
function CommentButton({ label = 'Comments', ...p }) { return <ExtrasDotButton kind="comment" icon="system-comment" type="tertiary" label={label} {...p} />; }
// Figma: icon-button-filter (6955:768). Tertiary S; hasNew = filters applied.
function FilterButton({ label = 'Filters', ...p }) { return <ExtrasDotButton kind="filter" icon="system-filter" type="tertiary" label={label} {...p} />; }
// Figma: icon-button-arrow (6349:61950). Tertiary S arrow-bar-right with the same dot.
function ArrowButton({ label = 'Open', ...p }) { return <ExtrasDotButton kind="arrow" icon="arrow-bar-right" type="tertiary" label={label} {...p} />; }

// Flags exported from Figma country-flag (8012:4654) as SVG (32×24). Only a starter set; pass `countries`
// with your own { flag } markup for others.
const EXTRAS_FLAGS = {
  US: '<mask id="m0" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="24"><rect width="32" height="24" fill="white"/></mask><g mask="url(#m0)"><path d="M0 0H32V24H0V0Z" fill="#F7FCFF"/><path d="M0 14.6665V16.6665H32V14.6665H0Z" fill="#E31D1C"/><path d="M0 18.3335V20.3335H32V18.3335H0Z" fill="#E31D1C"/><path d="M0 7.3335V9.3335H32V7.3335H0Z" fill="#E31D1C"/><path d="M0 22V24H32V22H0Z" fill="#E31D1C"/><path d="M0 11V13H32V11H0Z" fill="#E31D1C"/><path d="M0 0V2H32V0H0Z" fill="#E31D1C"/><path d="M0 3.6665V5.6665H32V3.6665H0Z" fill="#E31D1C"/><rect width="20" height="13" fill="#2E42A5"/></g>',
  CA: '<path d="M8 0H24V24H8V0Z" fill="#F7FCFF"/><path d="M15.9764 7L16 19H15.4005L15.7683 16.0303C13.0782 16.5144 11.8443 16.6343 12.0667 16.3902C12.2891 16.146 12.4644 15.8 12.5925 15.3521L9 12.9553C9.37779 12.9506 9.72035 12.8568 10.0277 12.674C10.335 12.4912 10.1814 11.8578 9.56668 10.7737L11.3805 11.0376L12.0667 10.2918L13.4352 11.7241H14.0503L13.4352 8.44343L14.5378 9.05932L15.9764 7ZM15.9764 7L17.4622 9.05932L18.5648 8.44343L17.9497 11.7241H18.5648L19.9333 10.2918L20.6195 11.0376L22.4333 10.7737C21.8186 11.8578 21.665 12.4912 21.9723 12.674C22.2796 12.8568 22.6222 12.9506 23 12.9553L19.4075 15.3521C19.5356 15.8 19.7109 16.146 19.9333 16.3902C20.1557 16.6343 18.9218 16.5144 16.2317 16.0303L16.5995 19H16L15.9764 7Z" fill="#E31D1C"/><path d="M24 0H32V24H24V0Z" fill="#E31D1C"/><path d="M0 0H8V24H0V0Z" fill="#E31D1C"/>',
  DE: '<path d="M0 16H32V24H0V16Z" fill="#FFD018"/><path d="M0 8H32V16H0V8Z" fill="#E31D1C"/><path d="M0 0H32V8H0V0Z" fill="#272727"/>',
  FR: '<path d="M22 0H32V24H22V0Z" fill="#F50100"/><path d="M0 0H12V24H0V0Z" fill="#2E42A5"/><path d="M10 0H22V24H10V0Z" fill="#F7FCFF"/>',
  SE: '<path d="M0 0V24H32V0H0Z" fill="#3D58DB"/><path d="M10 0H14V10H32V14H14V24H10V14H0V10H10V0Z" fill="#FECA00"/>',
  IN: '<path d="M0 0V24H32V0H0Z" fill="#F7FCFF"/><path d="M0 0V8H32V0H0Z" fill="#FF8C1A"/><path d="M0 16V24H32V16H0Z" fill="#5EAA22"/><path d="M16 8C18.2091 8 20 9.79086 20 12C20 14.2091 18.2091 16 16 16C13.7909 16 12 14.2091 12 12C12 9.79086 13.7909 8 16 8ZM16 9C14.3431 9 13 10.3431 13 12C13 13.6569 14.3431 15 16 15C17.6569 15 19 13.6569 19 12C19 10.3431 17.6569 9 16 9Z" fill="#3D58DB"/>',
};
// The US stars are left out of the starter flag (the field is 20×14; stars read as noise at that size) — see reply.
const EXTRAS_COUNTRIES = [
  { code: 'US', name: 'United States', dial: '+1', mask: '(###)###-####' },
  { code: 'CA', name: 'Canada', dial: '+1', mask: '(###)###-####' },
  { code: 'DE', name: 'Germany', dial: '+49', mask: '#### ########' },
  { code: 'FR', name: 'France', dial: '+33', mask: '# ## ## ## ##' },
  { code: 'IN', name: 'India', dial: '+91', mask: '#####-#####' },
  { code: 'SE', name: 'Sweden', dial: '+46', mask: '##-### ## ##' },
];
const extrasFormat = (digits, mask) => {
  if (!mask) return digits;
  let out = '', i = 0;
  for (const ch of mask) { if (i >= digits.length) break; if (ch === '#') out += digits[i++]; else out += ch; }
  return out + digits.slice(i);
};

function ExtrasFlag({ code, flag }) {
  const uid = React.useId().replace(/:/g, '');
  const raw = flag || EXTRAS_FLAGS[code];
  if (!raw) return <span className="ifs-phone__flag ifs-phone__flag--none" aria-hidden="true" />;
  const svg = raw.replace(/id="([^"]+)"/g, `id="$1${uid}"`).replace(/url\(#([^)]+)\)/g, `url(#$1${uid})`);
  return <span className="ifs-phone__flag" aria-hidden="true"><svg viewBox="0 0 32 24" preserveAspectRatio="xMidYMid slice" dangerouslySetInnerHTML={{ __html: svg }} /></span>;
}

// Figma: mobile-number-field-organism (8947:11306) — text-field shell + country select (single-select-atom S) + divider.
// Props: size l|m, label (Title), hint (clue-icon tooltip), description (Hint text), error (true or message), disabled,
// placeholder (default from the country mask, Figma "(000)000-0000"), value / defaultValue / onChange(value, { country, digits, e164 }),
// country / defaultCountry ("US") / onCountryChange(code), countries ([{ code, name, dial, mask, flag }]),
// cooper / generating (Cooper states), state hover|focus|typing (gallery), id, name, plus <input> attributes.
function PhoneField({ size = 'l', label, hint, description, error, disabled, placeholder, value, defaultValue = '', onChange,
  country, defaultCountry = 'US', onCountryChange, countries = EXTRAS_COUNTRIES, cooper, generating, state, className, style, id, ...rest }) {
  const autoId = React.useId();
  const fid = id || autoId;
  const [code, setCode] = useExtrasValue(country, defaultCountry, onCountryChange);
  const c = countries.find(x => x.code === code) || countries[0];
  const [val, setVal] = useExtrasValue(value, defaultValue, onChange);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const wrap = React.useRef(null), input = React.useRef(null), btn = React.useRef(null), list = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDown = e => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);
  React.useEffect(() => { if (open && list.current) { const el = list.current.children[active]; el && el.scrollIntoView({ block: 'nearest' }); } }, [open, active]);
  const emit = (digits, cc, e) => setVal(extrasFormat(digits, cc.mask), { country: cc.code, digits, e164: digits ? cc.dial + digits : '' }, e);
  const pick = (x, e) => { setCode(x.code); setOpen(false); emit(String(val || '').replace(/\D/g, ''), x, e); btn.current && btn.current.focus(); };
  const openList = () => { setActive(Math.max(0, countries.indexOf(c))); setOpen(true); };
  const onBtnKey = e => {
    if (!open) { if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); openList(); } return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(countries.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(0, a - 1)); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(countries[active], e); }
    else if (e.key === 'Escape' || e.key === 'Tab') setOpen(false);
    else if (e.key.length === 1) { const i = countries.findIndex(x => x.name.toLowerCase().startsWith(e.key.toLowerCase())); if (i >= 0) setActive(i); }
  };
  const msg = typeof error === 'string' ? error : description;
  return (
    <div data-state={state} style={style}
      className={IFS.cx('ifs-field', 'ifs-field--text', `ifs-field--${size}`, 'ifs-phone', error && 'ifs-field--error', disabled && 'ifs-field--disabled', (cooper || generating) && 'ifs-field--cooper', className)}>
      {(label != null || hint) && (
        <div className="ifs-field__title">
          <label className="ifs-field__label" htmlFor={fid}>{label}</label>
          {hint && <span className="ifs-field__hint" title={hint} aria-label={hint} role="img"><IFS.Icon name="system-question-hint" size={16} /></span>}
        </div>
      )}
      <div ref={wrap} className="ifs-field__control" onMouseDown={e => { if (e.target === e.currentTarget) { e.preventDefault(); input.current && input.current.focus(); } }}>
        <button ref={btn} type="button" className="ifs-phone__country" disabled={disabled}
          aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? `${fid}-cc` : undefined}
          aria-label={`Country code: ${c.name} ${c.dial}`} onClick={() => open ? setOpen(false) : openList()} onKeyDown={onBtnKey}>
          <ExtrasFlag code={c.code} flag={c.flag} />
          <span>{c.code} {c.dial}</span>
          <IFS.Icon name="arrow-caret-down-filled" size={12} />
        </button>
        {open && (
          <div ref={list} id={`${fid}-cc`} role="listbox" aria-label="Country" className="ifs-phone__menu">
            {countries.map((x, i) => (
              <div key={x.code} role="option" aria-selected={x.code === c.code}
                className={IFS.cx('ifs-phone__option', i === active && 'is-active', x.code === c.code && 'is-selected')}
                onMouseEnter={() => setActive(i)} onMouseDown={e => e.preventDefault()} onClick={e => pick(x, e)}>
                <ExtrasFlag code={x.code} flag={x.flag} />
                <span className="ifs-phone__option-name">{x.name}</span>
                <span className="ifs-phone__option-dial">{x.dial}</span>
              </div>
            ))}
          </div>
        )}
        <div className="ifs-phone__body">
          <span className="ifs-phone__divider" aria-hidden="true" />
          <input ref={input} id={fid} type="tel" inputMode="tel" autoComplete="tel-national" className="ifs-field__input"
            value={val} disabled={disabled} placeholder={placeholder != null ? placeholder : (c.mask || '').replace(/#/g, '0')}
            aria-invalid={error ? true : undefined} aria-describedby={msg != null ? `${fid}-desc` : undefined}
            onChange={e => emit(e.target.value.replace(/\D/g, ''), c, e)} {...rest} />
        </div>
        {generating && <IFS.Icon name="system-loader" size={12} className="ifs-field__loader" title="Generating" />}
      </div>
      {msg != null && <p className="ifs-field__desc" id={`${fid}-desc`}>{msg}</p>}
    </div>
  );
}

const extrasClamp = (v, a, b) => Math.min(b, Math.max(a, v));
const extrasSnap = (v, min, step) => { const r = Math.round((v - min) / step) * step + min; return +r.toFixed(10); };

// Figma: slider-molecule (3029:20933) with sliter-atom (3029:21077) thumbs.
// Props: type default (zero is the floor) | centered (zero in the middle; fill from 0 toward the value) | range (two thumbs),
// min, max, step, value / defaultValue / onChange(value) — a number, or [from, to] for range, disabled,
// thumbState hover|drag|focus (gallery), label / labels (aria-label of the thumb(s)), formatValue (aria-valuetext).
function SliderTrack({ type = 'default', min, max, step = 1, value, defaultValue, onChange, disabled, thumbState, label = 'Value', labels,
  formatValue, className, style }) {
  const lo = min != null ? min : (type === 'centered' ? -100 : 0);
  const hi = max != null ? max : 100;
  const def = defaultValue !== undefined ? defaultValue : (type === 'range' ? [lo + (hi - lo) * 0.4, lo + (hi - lo) * 0.6] : (type === 'centered' ? 0 : lo));
  const [val, setVal] = useExtrasValue(value, def, onChange);
  const vals = type === 'range' ? val : [val];
  const track = React.useRef(null);
  const [drag, setDrag] = React.useState(-1);
  const pct = v => ((extrasClamp(v, lo, hi) - lo) / (hi - lo)) * 100;
  const commit = (i, v) => {
    v = extrasClamp(extrasSnap(v, lo, step), lo, hi);
    if (type !== 'range') { if (v !== val) setVal(v); return; }
    const next = [...val]; next[i] = i === 0 ? Math.min(v, val[1]) : Math.max(v, val[0]);
    if (next[0] !== val[0] || next[1] !== val[1]) setVal(next);
  };
  const fromX = x => { const r = track.current.getBoundingClientRect(); return lo + extrasClamp((x - r.left) / r.width, 0, 1) * (hi - lo); };
  const start = (e, i) => {
    if (disabled || e.button > 0) return;
    e.preventDefault();
    let idx = i;
    if (idx == null) { const v = fromX(e.clientX); idx = type === 'range' ? (Math.abs(v - val[0]) <= Math.abs(v - val[1]) ? 0 : 1) : 0; commit(idx, v); }
    setDrag(idx);
    const thumb = track.current.querySelectorAll('.ifs-slider-thumb')[idx]; thumb && thumb.focus();
    const move = ev => commit(idx, fromX(ev.clientX));
    const up = () => { setDrag(-1); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  };
  const onKey = (e, i) => {
    const big = Math.max(step, (hi - lo) / 10);
    const d = { ArrowRight: step, ArrowUp: step, ArrowLeft: -step, ArrowDown: -step, PageUp: big, PageDown: -big }[e.key];
    if (d != null) { e.preventDefault(); commit(i, vals[i] + d); }
    else if (e.key === 'Home') { e.preventDefault(); commit(i, lo); }
    else if (e.key === 'End') { e.preventDefault(); commit(i, hi); }
  };
  let a, b;
  if (type === 'range') { a = pct(vals[0]); b = pct(vals[1]); }
  else if (type === 'centered') { const z = pct(0); const p = pct(vals[0]); a = Math.min(z, p); b = Math.max(z, p); }
  else { a = 0; b = pct(vals[0]); }
  return (
    <div ref={track} className={IFS.cx('ifs-slider-track', disabled && 'ifs-slider-track--disabled', className)} style={style} onPointerDown={e => start(e)}>
      <span className="ifs-slider-track__fill" style={{ left: `${a}%`, width: `${b - a}%` }} />
      {vals.map((v, i) => (
        <span key={i} role="slider" tabIndex={disabled ? -1 : 0} aria-disabled={disabled || undefined}
          aria-label={labels ? labels[i] : (type === 'range' ? `${label} ${i ? 'to' : 'from'}` : label)}
          aria-valuemin={type === 'range' && i === 1 ? vals[0] : lo} aria-valuemax={type === 'range' && i === 0 ? vals[1] : hi} aria-valuenow={v}
          aria-valuetext={formatValue ? String(formatValue(v)) : undefined}
          data-state={thumbState} className={IFS.cx('ifs-slider-thumb', drag === i && 'is-dragging')} style={{ left: `${pct(v)}%` }}
          onPointerDown={e => { e.stopPropagation(); start(e, i); }} onKeyDown={e => onKey(e, i)} />
      ))}
    </div>
  );
}

// Figma: slider-organism (3029:20689) — title (+ clue icon) and Number on top, optional left icon-button + slider-molecule, hint text.
// Props: label (Title; absent = show-title off), hint (clue-icon tooltip), description (Hint text), showValue (Number, default true),
// formatValue(v) for the Number, icon (show-left-icon: a Ghost S circle icon-button, e.g. "system-star-favourite"), iconLabel, onIconClick,
// and every SliderTrack prop (type, min, max, step, value/defaultValue/onChange, disabled, thumbState).
// Use <Slider> without label for the bare molecule.
function Slider({ label, hint, description, showValue = true, formatValue, icon, iconLabel, onIconClick, value, defaultValue, onChange,
  className, style, ...track }) {
  const type = track.type || 'default';
  const lo = track.min != null ? track.min : (type === 'centered' ? -100 : 0), hi = track.max != null ? track.max : 100;
  const def = defaultValue !== undefined ? defaultValue : (type === 'range' ? [lo + (hi - lo) * 0.4, lo + (hi - lo) * 0.6] : (type === 'centered' ? 0 : lo));
  const [val, setVal] = useExtrasValue(value, def, onChange);
  const fmt = v => formatValue ? formatValue(v) : v;
  const shown = Array.isArray(val) ? `${fmt(val[0])}–${fmt(val[1])}` : fmt(val);
  const bare = label == null && description == null && !icon;
  const control = <SliderTrack {...track} value={val} onChange={setVal} formatValue={formatValue} label={typeof label === 'string' ? label : (track.label || 'Value')} />;
  if (bare) return React.cloneElement(control, { className, style });
  return (
    <div className={IFS.cx('ifs-slider', track.disabled && 'ifs-slider--disabled', className)} style={style}>
      {(label != null || showValue) && <div className="ifs-slider__title">
        <span className="ifs-slider__heading">
          {label != null && <span className="ifs-slider__label">{label}</span>}
          {hint && <span className="ifs-slider__hint" title={hint} aria-label={hint} role="img"><IFS.Icon name="system-question-hint" size={16} /></span>}
        </span>
        {showValue && <output className="ifs-slider__value">{shown}</output>}
      </div>}
      <div className="ifs-slider__row">
        {icon && <IFS.IconButton icon={icon} label={iconLabel || 'Reset'} type="ghost" size="s" shape="circle" disabled={track.disabled} onClick={onIconClick} />}
        {control}
      </div>
      {description != null && <p className="ifs-slider__desc">{description}</p>}
    </div>
  );
}

const EXTRAS_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Figma: form-card-organism (5826:24755)
// A surface that wraps a form: header (title, description, one action) → optional divider → body (fields) → optional footer.
// Form rules (Figma canvas notes): every visible field is required (no markers); the primary never disables to signal
// "incomplete"; submit validates every field at once, shows errors, focuses (and scrolls to) the first invalid field;
// more than three invalid fields adds a summary above the footer.
// Props: title, description, action (node, e.g. an IconButton), divider (bool),
// fields = [{ name, label, type text|email|password|phone|textarea|select, placeholder, hint, description, options (select),
//   defaultValue, validate(value, values) → message | undefined, requiredMessage }],
// children (extra body content after the fields), values / defaultValues / onValuesChange(values),
// primaryAction = { label } (submit), secondaryAction = { label, onClick }, footer (node replacing the actions),
// onSubmit(values, event) — only called when everything is valid, validate(values) → { name: message } (extra form checks),
// error (form-level message, e.g. rejected credentials), loading (field skeletons, actions disabled),
// submitting (primary spinner, form locked), size of fields (l|m, default l), className, style.
function FormCard({ title, description, action, divider, fields = [], children, values, defaultValues, onValuesChange,
  primaryAction = { label: 'Submit' }, secondaryAction, footer, onSubmit, validate, error, loading, submitting, fieldSize = 'l',
  className, style, ...rest }) {
  const uid = React.useId().replace(/:/g, '');
  const init = React.useMemo(() => Object.fromEntries(fields.map(f => [f.name, (defaultValues && defaultValues[f.name]) ?? f.defaultValue ?? (f.type === 'select' ? null : '')])), []);
  const [vals, setVals] = useExtrasValue(values, init, onValuesChange);
  const [errors, setErrors] = React.useState({});
  const body = React.useRef(null);
  const setField = (name, v) => {
    setVals({ ...vals, [name]: v });
    if (errors[name]) setErrors(e => { const n = { ...e }; delete n[name]; return n; });
  };
  const check = () => {
    const out = {};
    fields.forEach(f => {
      const v = vals[f.name];
      const empty = v == null || (typeof v === 'string' && !v.trim()) || (Array.isArray(v) && !v.length);
      if (empty) out[f.name] = f.requiredMessage || `${f.label || f.name} is required`;
      else if (f.type === 'email' && !EXTRAS_EMAIL.test(String(v).trim())) out[f.name] = 'Enter a valid email address';
      else if (f.validate) { const m = f.validate(v, vals); if (m) out[f.name] = m; }
    });
    if (validate) Object.entries(validate(vals) || {}).forEach(([k, m]) => { if (m && !out[k]) out[k] = m; });
    return out;
  };
  const submit = e => {
    e.preventDefault();
    if (loading || submitting) return;
    const errs = check();
    setErrors(errs);
    const first = fields.find(f => errs[f.name]) || (Object.keys(errs).length ? { name: Object.keys(errs)[0] } : null);
    if (first) {
      requestAnimationFrame(() => {
        const box = body.current && body.current.querySelector(`[data-field="${first.name}"]`);
        const el = box && box.querySelector('input:not([disabled]),textarea,[role=combobox],button,[tabindex="0"]');
        if (box) box.scrollIntoView({ block: 'nearest' });
        el && el.focus();
      });
      return;
    }
    onSubmit && onSubmit(vals, e);
  };
  const renderField = f => {
    const common = { label: f.label, hint: f.hint, placeholder: f.placeholder, size: fieldSize, error: errors[f.name] || undefined,
      description: errors[f.name] ? undefined : f.description, disabled: f.disabled, id: `${uid}-${f.name}`, name: f.name,
      readOnly: submitting || undefined };
    const v = vals[f.name];
    if (f.type === 'textarea') return <IFS.TextArea {...common} value={v} onChange={x => setField(f.name, x)} />;
    if (f.type === 'phone') return <PhoneField {...common} value={v} onChange={x => setField(f.name, x)} />;
    if (f.type === 'select') return <IFS.Select options={f.options || []} label={f.label} placeholder={f.placeholder} size={fieldSize === 'l' ? 'l' : 'm'}
      error={!!errors[f.name]} disabled={f.disabled || submitting} value={v} onChange={x => setField(f.name, x)} aria-label={f.label} />;
    return <IFS.TextField {...common} type={f.type === 'email' || f.type === 'password' ? f.type : 'text'} value={v} onChange={x => setField(f.name, x)} />;
  };
  const invalid = Object.keys(errors);
  const Skel = IFS.Skeleton;
  return (
    <form noValidate onSubmit={submit} aria-busy={loading || submitting || undefined}
      className={IFS.cx('ifs-form-card', className)} style={style} {...rest}>
      {(title != null || description != null || action) && (
        <div className="ifs-form-card__header">
          <div className="ifs-form-card__heading">
            {title != null && <h2 className="ifs-form-card__title">{title}</h2>}
            {description != null && <p className="ifs-form-card__desc">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {divider && <div className="ifs-form-card__divider" role="separator" />}
      <div ref={body} className={IFS.cx('ifs-form-card__body', submitting && 'is-submitting')}>
        {loading
          ? fields.map(f => <div key={f.name} className="ifs-form-card__skeleton" aria-hidden="true">
              {Skel ? <><Skel width="30%" height={16} /><Skel height={fieldSize === 'l' ? 40 : 32} shape="block" /></> : null}
            </div>)
          : fields.map(f => <div key={f.name} data-field={f.name}>{renderField(f)}</div>)}
        {!loading && children}
      </div>
      {invalid.length > 3 && (
        <div className="ifs-form-card__message">
          <IFS.Alert type="error" closable={false} title={`${invalid.length} fields need attention`}>
            <ul className="ifs-form-card__summary">{invalid.map(n => <li key={n}>{errors[n]}</li>)}</ul>
          </IFS.Alert>
        </div>
      )}
      {error && <div className="ifs-form-card__message"><IFS.Alert type="error" closable={false} title={error} /></div>}
      <button type="submit" hidden tabIndex={-1} aria-hidden="true" />
      {(footer || primaryAction || secondaryAction) && (
        <div className="ifs-form-card__footer">
          {footer || <>
            {secondaryAction && <IFS.Button type="tertiary" size="l" disabled={loading} onClick={secondaryAction.onClick}>{secondaryAction.label}</IFS.Button>}
            {primaryAction && <IFS.Button type="primary" size="l" disabled={loading}
              iconLeft={submitting ? 'system-loader' : undefined} className={submitting ? 'ifs-form-card__submitting' : undefined}
              aria-disabled={submitting || undefined} onClick={e => { if (!submitting) submit(e); }}>{primaryAction.label}</IFS.Button>}
          </>}
        </div>
      )}
    </form>
  );
}

// Curated set from Figma icon-picker-variants (210:77815). Figma also has "system-flame", which is not in icons.js yet.
const EXTRAS_PICKER_ICONS = ['chat-folder', 'system-book', 'system-heart', 'system-briefcase', 'map-pin', 'system-building',
  'system-calendar-date', 'system-star-favourite', 'system-mail-message', 'system-bulb', 'map-location', 'arrow-trend-up', 'system-user'];

// Figma: icon-picker-organism (5434:16926) = grid of icon-picker-atom (210:77686), single-select. Place it inside IFS.Popover.
// Props: icons (icon names; default the Figma curated set), value / defaultValue / onChange(name), columns (default 4),
// label (aria-label of the group, default "Choose icon"), bare (no 12px padding), itemState { [name]: hover|focus } (gallery).
// Keyboard: one tab stop; arrows move, Home/End, Enter/Space select.
function IconPicker({ icons = EXTRAS_PICKER_ICONS, value, defaultValue = null, onChange, columns = 4, label = 'Choose icon', bare, itemState,
  className, style, ...rest }) {
  const [val, setVal] = useExtrasValue(value, defaultValue, onChange);
  const [focusIdx, setFocusIdx] = React.useState(-1);
  const grid = React.useRef(null);
  const cur = Math.max(0, icons.indexOf(val));
  const tabIdx = focusIdx >= 0 ? focusIdx : cur;
  const go = i => { i = Math.max(0, Math.min(icons.length - 1, i)); setFocusIdx(i); const b = grid.current.children[i]; b && b.focus(); };
  const onKey = (e, i) => {
    const d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: columns, ArrowUp: -columns }[e.key];
    if (d) { e.preventDefault(); go(i + d); }
    else if (e.key === 'Home') { e.preventDefault(); go(0); }
    else if (e.key === 'End') { e.preventDefault(); go(icons.length - 1); }
  };
  return (
    <div className={IFS.cx('ifs-icon-picker', bare && 'ifs-icon-picker--bare', className)} style={style} {...rest}>
      <div ref={grid} role="radiogroup" aria-label={label} className="ifs-icon-picker__grid" style={{ '--cols': Math.min(columns, icons.length) }}>
        {icons.map((name, i) => (
          <button key={name} type="button" role="radio" aria-checked={val === name} aria-label={name.replace(/^(system|map|chat|arrow)-/, '').replace(/-/g, ' ')}
            title={name.replace(/^(system|map|chat|arrow)-/, '').replace(/-/g, ' ')} tabIndex={i === tabIdx ? 0 : -1}
            data-state={itemState && itemState[name]} className="ifs-icon-picker__item"
            onClick={() => { setFocusIdx(i); setVal(name); }} onKeyDown={e => onKey(e, i)} onFocus={() => setFocusIdx(i)}>
            <IFS.Icon name={name} size={20} />
          </button>
        ))}
      </div>
    </div>
  );
}

// Figma: weekday-atom (2704:74414) — the weekday header cell of the calendar (Caption/semibold-UPPER, text/tertiary, 32×16).
// Props: children = day text (Figma "day", e.g. "Wed"). Figma's show-badge / timeline props are not wired to any layer.
function Weekday({ children, className, ...rest }) {
  return <span role="columnheader" className={IFS.cx('ifs-weekday', className)} {...rest}>{children}</span>;
}
// A row of seven weekday-atoms as placed in date-picker-molecule. Props: weekStartsOn (0 = Sunday, 1 = Monday), locale.
function Weekdays({ weekStartsOn = 1, locale = 'en-US', className, ...rest }) {
  const days = Array.from({ length: 7 }, (_, i) => new Date(2023, 0, 1 + ((i + weekStartsOn) % 7)).toLocaleDateString(locale, { weekday: 'short' }));
  return <div role="row" className={IFS.cx('ifs-weekdays', className)} {...rest}>{days.map(d => <Weekday key={d}>{d}</Weekday>)}</div>;
}

// Figma: logo (788:52389) as placed in global-header (69:3736): 156×30, icon/primary fill through an alpha mask.
// Figma's logo is a raster image (2513×480 PNG) used as a mask, not vector art: exportAsync SVG_STRING returns a 201 KB SVG that
// only wraps that PNG. The kit keeps the same structure (SVG mask + currentColor fill) with a 2× PNG (312×60) of the mask.
const EXTRAS_LOGO_PNG = 'data:image/png;base64,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';
// Props: height (default 30; width keeps the 156:30 ratio), label (accessible name, default "IFS Copperleaf"),
// color (CSS colour; default var(--icon-primary)).
function Logo({ height = 30, label = 'IFS Copperleaf', color, className, style, ...rest }) {
  const id = 'ifs-logo-' + React.useId().replace(/:/g, '');
  return (
    <span role="img" aria-label={label} className={IFS.cx('ifs-logo', className)} style={{ width: height * 156 / 30, height, color, ...style }} {...rest}>
      <svg viewBox="0 0 156 30" aria-hidden="true">
        <defs><mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="156" height="30" style={{ maskType: 'alpha' }}>
          <image href={EXTRAS_LOGO_PNG} width="156" height="30" />
        </mask></defs>
        <rect width="156" height="30" fill="currentColor" mask={`url(#${id})`} />
      </svg>
    </span>
  );
}

Object.assign(IFS, { Hotkey, Counter, ScrollArea, ScrollBar, CircularButton, CircularMenu, NotificationButton, CommentButton, FilterButton,
  ArrowButton, PhoneField, SliderTrack, Slider, FormCard, IconPicker, Weekday, Weekdays, Logo });
export { Hotkey, Counter, ScrollArea, ScrollBar, CircularButton, CircularMenu, NotificationButton, CommentButton, FilterButton,
  ArrowButton, PhoneField, SliderTrack, Slider, FormCard, IconPicker, Weekday, Weekdays, Logo };
