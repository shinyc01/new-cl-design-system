import React from 'react';
import { IFS } from './registry.js';
// Figma "Feedback" + "Surfaces" pages: tooltip, alert, snackbar, overlay, modal, drawer, panel, popover, floating bar.

// Controlled/uncontrolled boolean state (open, expanded).
function useSurfaceState(value, defaultValue, onChange) {
  const [inner, setInner] = React.useState(!!defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : inner;
  const set = React.useCallback(v => { if (!controlled) setInner(v); onChange && onChange(v); }, [controlled, onChange]);
  return [current, set];
}

const SURF_FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

// While `active`: focus moves into `ref` (first focusable, else the surface), Escape calls onEscape,
// `trap` keeps Tab inside, and focus returns to the previously focused element afterwards.
function useSurfaceFocus(ref, active, { onEscape, trap = false } = {}) {
  const escRef = React.useRef(onEscape);
  escRef.current = onEscape;
  React.useEffect(() => {
    if (!active || !ref.current) return;
    const prev = document.activeElement;
    const el = ref.current;
    const first = el.querySelector(SURF_FOCUSABLE);
    (first || el).focus({ preventScroll: true });
    const onKey = e => {
      if (e.key === 'Escape' && escRef.current) { e.stopPropagation(); escRef.current(e); }
      if (trap && e.key === 'Tab') {
        const items = [...el.querySelectorAll(SURF_FOCUSABLE)];
        if (!items.length) { e.preventDefault(); return; }
        const a = items[0], z = items[items.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    el.addEventListener('keydown', onKey);
    return () => { el.removeEventListener('keydown', onKey); if (prev && prev.focus && document.contains(prev)) prev.focus({ preventScroll: true }); };
  }, [active, trap]);
}

let surfUid = 0;
function useSurfaceId(p) { return React.useMemo(() => `${p}-${++surfUid}`, []); }

// Figma: tooltip-organism (67:6151)
// Props: content (Figma Label / Content slot), hotkey (hotkey-atom text, e.g. "⌘/"; absent = show-hotkey off),
// color black|grey ("grey (for black bg)"), type bottom|top|left|right = side the ARROW is on
// (bottom → bubble sits above the trigger, the default), arrow left|center|right (top/bottom only).
// Wraps one trigger child; shows on hover (400ms delay) and focus, hides instantly, Esc dismisses.
// open/onOpenChange to control. `inline` renders the bubble alone (gallery).
function Tooltip({ content, hotkey, color = 'black', type = 'bottom', arrow = 'center', delay = 400, open, defaultOpen, onOpenChange, inline, children, className }) {
  const [shown, setShown] = useSurfaceState(open, defaultOpen, onOpenChange);
  const id = useSurfaceId('ifs-tooltip');
  const timer = React.useRef();
  const side = type === 'left' || type === 'right';
  const bubble = (
    <span role="tooltip" id={id} className={IFS.cx('ifs-tooltip', `ifs-tooltip--${type}`, !side && `ifs-tooltip--arrow-${arrow}`, color === 'grey' && 'ifs-tooltip--grey', className)}>
      <span className="ifs-tooltip__body">{content}{hotkey && <span className="ifs-tooltip__hotkey">{hotkey}</span>}</span>
      <span className="ifs-tooltip__arrow" />
    </span>
  );
  React.useEffect(() => () => clearTimeout(timer.current), []);
  if (inline) return bubble;
  const show = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setShown(true), delay); };
  const hide = () => { clearTimeout(timer.current); setShown(false); };
  const child = React.Children.only(children);
  return (
    <span className="ifs-tooltip-anchor" onMouseEnter={show} onMouseLeave={hide}
      onFocus={() => { clearTimeout(timer.current); setShown(true); }} onBlur={hide}
      onKeyDown={e => { if (e.key === 'Escape' && shown) hide(); }}>
      {React.cloneElement(child, { 'aria-describedby': shown ? id : undefined })}
      {shown && bubble}
    </span>
  );
}

const SURF_ALERT_ICON = { error: 'status-error-filled', warning: 'status-warning-filled', success: 'status-success-filled' };

// Figma: alert-organism (1440:5440)
// Props: type error|warning|success, title, children = Body text, showIcon (Figma show-icon, default off),
// action = button label (Primary S; absent = show-button off), onAction, onClose (shows the close
// icon-button; Figma show-close-icon), closable=false to hide it.
function Alert({ type = 'error', title, children, showIcon = false, action, onAction, onClose, closable = true, className, ...rest }) {
  return (
    <div role={type === 'error' ? 'alert' : 'status'} className={IFS.cx('ifs-alert', `ifs-alert--${type}`, className)} {...rest}>
      <div className="ifs-alert__text">
        <div className="ifs-alert__header">
          {showIcon && <IFS.Icon name={SURF_ALERT_ICON[type]} size={16} className="ifs-alert__icon" />}
          <span className="ifs-alert__title">{title}</span>
        </div>
        {children != null && <div className="ifs-alert__body">{children}</div>}
      </div>
      {action && <IFS.Button type="primary" size="s" onClick={onAction}>{action}</IFS.Button>}
      {closable && <IFS.IconButton className="ifs-alert__close" icon="system-close" label="Dismiss" type="ghost" size="s" onClick={onClose} />}
    </div>
  );
}

// Figma: snackbar-organism (3795:29459)
// Props: title, children = description (Content slot), secondaryAction / primaryAction = { label, onClick }
// (Secondary S + Primary S; add iconLeft, e.g. Undo → 'arrow-back-up'), onClose (close icon-button; showClose=false hides it).
// Use IFS.toast({...same props, duration}) to show one top-right that auto-dismisses.
function Snackbar({ title, children, secondaryAction, primaryAction, onClose, showClose = true, className, ...rest }) {
  const hasActions = secondaryAction || primaryAction || showClose;
  return (
    <div role="status" aria-live="polite" className={IFS.cx('ifs-snackbar', className)} {...rest}>
      <div className="ifs-snackbar__text">
        {title != null && <div className="ifs-snackbar__title">{title}</div>}
        {children != null && <div className="ifs-snackbar__desc">{children}</div>}
      </div>
      {hasActions && <div className="ifs-snackbar__actions">
        {secondaryAction && <IFS.Button type="secondary" size="s" iconLeft={secondaryAction.iconLeft} disabled={secondaryAction.disabled} onClick={secondaryAction.onClick}>{secondaryAction.label}</IFS.Button>}
        {primaryAction && <IFS.Button type="primary" size="s" iconLeft={primaryAction.iconLeft} disabled={primaryAction.disabled} onClick={primaryAction.onClick}>{primaryAction.label}</IFS.Button>}
        {showClose && <IFS.IconButton icon="system-close" label="Dismiss" type="ghost" size="s" onClick={onClose} />}
      </div>}
    </div>
  );
}

// Toast stack: newest on top, auto-dismiss after `duration` ms (default 4000, 0 = sticky), paused on hover/focus.
const surfToasts = { list: [], subs: new Set(), seq: 0 };
const surfToastEmit = () => surfToasts.subs.forEach(f => f(surfToasts.list));
function surfDismissToast(id) { surfToasts.list = surfToasts.list.filter(t => t.id !== id); surfToastEmit(); }
function SurfToastItem({ t }) {
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused || !t.duration) return;
    const h = setTimeout(() => surfDismissToast(t.id), t.duration);
    return () => clearTimeout(h);
  }, [paused]);
  const wrap = a => a && { ...a, onClick: e => { a.onClick && a.onClick(e); surfDismissToast(t.id); } };
  const { id, duration, description, ...props } = t;
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <Snackbar {...props} primaryAction={wrap(t.primaryAction)} secondaryAction={wrap(t.secondaryAction)} onClose={() => surfDismissToast(id)}>{description}</Snackbar>
    </div>
  );
}
function SurfToastStack() {
  const [list, setList] = React.useState(surfToasts.list);
  React.useEffect(() => { surfToasts.subs.add(setList); return () => surfToasts.subs.delete(setList); }, []);
  return <div className="ifs-snackbar-stack">{list.map(t => <SurfToastItem key={t.id} t={t} />)}</div>;
}
// toast({ title, description, primaryAction, secondaryAction, duration }) → id. toast.dismiss(id).
function surfToast(opts) {
  if (!surfToasts.root) {
    const host = document.createElement('div');
    document.body.appendChild(host);
    surfToasts.root = ReactDOM.createRoot(host);
    surfToasts.root.render(<SurfToastStack />);
  }
  const id = ++surfToasts.seq;
  surfToasts.list = [{ duration: 4000, ...opts, id }, ...surfToasts.list];
  surfToastEmit();
  return id;
}
surfToast.dismiss = surfDismissToast;
// Hook form: const show = useSnackbar(); show({ title: 'Saved' })
function useSnackbar() { return surfToast; }

// Figma: overlay-background (338:21403)
// Props: type strong (overlay/screen-strong + blur/medium) | base (no blur), onClick, inline (absolute, not fixed).
function Overlay({ type = 'strong', inline, className, ...rest }) {
  return <div aria-hidden="true" className={IFS.cx('ifs-overlay', `ifs-overlay--${type}`, inline && 'ifs-overlay--inline', className)} {...rest} />;
}

// Figma: modal-organism (4169:208596)
// Props: open / defaultOpen / onOpenChange, title (Header Slot), children (Content slot),
// secondaryAction / primaryAction = { label, onClick, disabled, iconLeft } (Tertiary L + Primary L, split footer),
// footer (custom footer node, replaces the two buttons), dismissible=false hides ✕ and blocks Esc/overlay close,
// overlay strong|base|none, width, inline (renders the card in place without overlay — gallery).
function Modal({ open, defaultOpen, onOpenChange, title, children, secondaryAction, primaryAction, footer, dismissible = true, overlay = 'strong', width, inline, className, style }) {
  const [isOpen, setOpen] = useSurfaceState(open, defaultOpen, onOpenChange);
  const ref = React.useRef();
  const titleId = useSurfaceId('ifs-modal-title');
  const close = () => dismissible && setOpen(false);
  useSurfaceFocus(ref, !inline && isOpen, { onEscape: close, trap: true });
  if (!inline && !isOpen) return null;
  const card = (
    <div ref={ref} role="dialog" aria-modal={inline ? undefined : 'true'} aria-labelledby={titleId} tabIndex={-1}
      className={IFS.cx('ifs-modal', className)} style={{ width, ...style }}>
      <div className="ifs-modal__header">
        <h2 id={titleId} className="ifs-surface__title">{title}</h2>
        {dismissible && <IFS.IconButton icon="system-close" label="Close" type="ghost" size="s" onClick={close} />}
      </div>
      <div className="ifs-modal__body ifs-scroll">{children}</div>
      {(footer || secondaryAction || primaryAction) && <div className="ifs-modal__footer">
        {footer || <>
          {secondaryAction && <IFS.Button type="tertiary" size="l" iconLeft={secondaryAction.iconLeft} disabled={secondaryAction.disabled} onClick={secondaryAction.onClick}>{secondaryAction.label}</IFS.Button>}
          {primaryAction && <IFS.Button type="primary" size="l" iconLeft={primaryAction.iconLeft} disabled={primaryAction.disabled} onClick={primaryAction.onClick}>{primaryAction.label}</IFS.Button>}
        </>}
      </div>}
    </div>
  );
  if (inline) return card;
  return <>
    {overlay !== 'none' && <Overlay type={overlay} onClick={close} />}
    <div className="ifs-modal-layer" onMouseDown={e => { if (e.target === e.currentTarget) close(); }}>{card}</div>
  </>;
}

// Figma: drawer-organism (4394:21241)
// Props: open / defaultOpen / onOpenChange, title (Header slot), expanded / defaultExpanded=true / onExpandedChange
// (Figma Expanded; False = header only), collapsible (show the diagonal collapse/expand button),
// showClose (show-button-close), tabs (node, show-tabs), subtitle + segmented (node, show-subtitle /
// show-segmented-control), children (Content slot), side right|left, overlay none|strong|base,
// height, inline (renders in place — gallery). Esc closes.
function Drawer({ open, defaultOpen, onOpenChange, title, expanded, defaultExpanded = true, onExpandedChange, collapsible = true, showClose = true,
  tabs, subtitle, segmented, children, side = 'right', overlay = 'none', height, inline, className, style }) {
  const [isOpen, setOpen] = useSurfaceState(open, defaultOpen, onOpenChange);
  const [isExp, setExp] = useSurfaceState(expanded, expanded === undefined ? defaultExpanded : undefined, onExpandedChange);
  const ref = React.useRef();
  const titleId = useSurfaceId('ifs-drawer-title');
  useSurfaceFocus(ref, !inline && isOpen, { onEscape: () => setOpen(false), trap: overlay !== 'none' });
  if (!inline && !isOpen) return null;
  const panel = (
    <aside ref={ref} role="dialog" aria-modal={!inline && overlay !== 'none' ? 'true' : undefined} aria-labelledby={titleId} tabIndex={-1}
      className={IFS.cx('ifs-drawer', `ifs-drawer--${side}`, !inline && 'ifs-drawer--floating', !isExp && 'ifs-drawer--collapsed', className)}
      style={{ height, ...style }}>
      <div className="ifs-drawer__header">
        <h2 id={titleId} className="ifs-surface__title">{title}</h2>
        <div className="ifs-surface__actions">
          {collapsible && <IFS.IconButton icon={isExp ? 'arrow-diagonal-collapse' : 'arrow-diagonal-expand'} label={isExp ? 'Collapse' : 'Expand'}
            aria-expanded={isExp} type="ghost" size="s" onClick={() => setExp(!isExp)} />}
          {showClose && <IFS.IconButton icon="system-close" label="Close" type="ghost" size="s" onClick={() => setOpen(false)} />}
        </div>
      </div>
      {tabs && <div className="ifs-drawer__tabs">{tabs}</div>}
      {(subtitle || segmented) && <div className="ifs-drawer__sub">
        {subtitle && <h3 className="ifs-drawer__subtitle">{subtitle}</h3>}
        {segmented}
      </div>}
      <div className="ifs-drawer__content ifs-scroll">{children}</div>
    </aside>
  );
  if (inline || overlay === 'none') return panel;
  return <><Overlay type={overlay} onClick={() => setOpen(false)} />{panel}</>;
}

// Figma: panel-organism (4305:365421); collapsed rail = sidebar-organism View=Collapsed as the pattern screens draw it.
// Props: title, actions (node, header right, before the buttons), expanded / defaultExpanded=true / onExpandedChange
// (Figma Expanded: 380px ↔ 48px rail holding only the ←| expand button), dot error|warning (status dot on the rail's button:
// red = errors / open questions, orange = warnings only), showEvidence (show-evidence-chain, circle Tertiary S icon-button),
// onEvidence, onClose (shows ✕ instead of the collapse toggle; the panel then never collapses), full (fills the content area),
// children (Content slot). Lives in the page layout: no scrim, no focus trap.
function Panel({ title, actions, expanded, defaultExpanded = true, onExpandedChange, dot, showEvidence = true, onEvidence, onClose, full, children, className, style }) {
  const [isExp, setExp] = useSurfaceState(expanded, expanded === undefined ? defaultExpanded : undefined, onExpandedChange);
  const label = typeof title === 'string' ? title : undefined;
  if (!isExp && !onClose) return (
    <aside className={IFS.cx('ifs-panel', 'ifs-panel--collapsed', className)} style={style} aria-label={label}>
      <IFS.ArrowButton direction="left" type="ghost" dot={dot} label={label ? `Expand ${label.toLowerCase()}` : 'Expand panel'}
        aria-expanded={false} onClick={() => setExp(true)} />
    </aside>
  );
  return (
    <aside className={IFS.cx('ifs-panel', full && 'ifs-panel--full', className)} style={style} aria-label={label}>
      <div className="ifs-panel__header">
        <h2 className="ifs-surface__title">{title}</h2>
        <div className="ifs-panel__buttons">
          {actions}
          {showEvidence && <IFS.IconButton icon="cooper-evidence-icon" label="Evidence chain" type="tertiary" size="s" shape="circle" onClick={onEvidence} />}
          {onClose
            ? <IFS.IconButton icon="system-close" label="Close" type="ghost" size="s" onClick={onClose} />
            : <IFS.IconButton className="ifs-panel__toggle" icon="arrow-bar-right" label="Collapse panel" aria-expanded
                type="ghost" size="s" onClick={() => setExp(false)} />}
        </div>
      </div>
      <div className="ifs-panel__content ifs-scroll">{children}</div>
    </aside>
  );
}

// Figma: popover-organism (4394:56471)
// Props: trigger (element; click toggles), open / defaultOpen / onOpenChange, align start|end,
// title (Title slot; absent = show-title off), count (counter-atom), showClose,
// search (show-search: true or placeholder string), searchValue / onSearchChange(value) to control it (onSearch = alias),
// the field shows ✕ to clear once it has text, onFilter (show-filter: Secondary M icon-button),
// children (Content slot), width, inline (renders the card alone — gallery). Esc / outside click / ✕ close.
function Popover({ trigger, open, defaultOpen, onOpenChange, align = 'start', title, count, showClose = true, search, searchValue, onSearchChange, onSearch, onFilter, children, width, inline, className, style }) {
  const [isOpen, setOpen] = useSurfaceState(open, defaultOpen, onOpenChange);
  const [innerQ, setInnerQ] = React.useState('');
  const q = searchValue !== undefined ? searchValue : innerQ;
  const setQ = v => { if (searchValue === undefined) setInnerQ(v); onSearchChange && onSearchChange(v); onSearch && onSearch(v); };
  const searchInput = React.useRef();
  const ref = React.useRef();
  const anchor = React.useRef();
  const id = useSurfaceId('ifs-popover');
  useSurfaceFocus(ref, !inline && isOpen, { onEscape: () => setOpen(false) });
  React.useEffect(() => {
    if (inline || !isOpen) return;
    const onDown = e => { if (anchor.current && !anchor.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [isOpen, inline]);
  const card = (inline || isOpen) && (
    <div ref={ref} id={id} role="dialog" aria-label={typeof title === 'string' ? title : undefined} tabIndex={-1}
      className={IFS.cx('ifs-popover', align === 'end' && 'ifs-popover--end', className)} style={{ width, ...style }}>
      {(title != null || showClose) && <div className="ifs-popover__header">
        <div className="ifs-popover__title">
          {title != null && <span className="ifs-surface__title">{title}</span>}
          {count != null && <span className="ifs-popover__counter">{count}</span>}
        </div>
        {showClose && <IFS.IconButton icon="system-close" label="Close" type="ghost" size="s" onClick={() => setOpen(false)} />}
      </div>}
      {(search || onFilter) && <div className="ifs-popover__tools">
        {search && <label className="ifs-popover__search">
          <IFS.Icon name="system-search" size={12} />
          <input ref={searchInput} type="search" value={q} placeholder={typeof search === 'string' ? search : 'Search for...'}
            aria-label={typeof search === 'string' ? search : 'Search'} onChange={e => setQ(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape' && q) { e.stopPropagation(); setQ(''); } }} />
          {q && <button type="button" className="ifs-popover__clear" aria-label="Clear search"
            onClick={() => { setQ(''); searchInput.current && searchInput.current.focus(); }}><IFS.Icon name="system-close" size={12} /></button>}
        </label>}
        {onFilter && <IFS.IconButton icon="system-filter" label="Filter" type="secondary" size="m" onClick={onFilter} />}
      </div>}
      <div className="ifs-popover__content ifs-scroll">{children}</div>
    </div>
  );
  if (inline) return card;
  return (
    <span ref={anchor} className="ifs-popover-anchor">
      {trigger && React.cloneElement(trigger, {
        'aria-haspopup': 'dialog', 'aria-expanded': isOpen, 'aria-controls': isOpen ? id : undefined,
        onClick: e => { trigger.props.onClick && trigger.props.onClick(e); setOpen(!isOpen); },
      })}
      {card}
    </span>
  );
}

// Figma: floating-bar-organism (7405:22521)
// Props: category (type label, e.g. "Folder"), categoryIcon (default "chat-folder"), item (name or "3 items selected"),
// badge (node next to the item, e.g. an indicator), secondaryAction / primaryAction = { label, onClick }
// (Tertiary M + Primary M) or actions (node), onClose (✕ and Escape — clears the selection),
// open (default true), inline (in place instead of fixed top-centre — gallery).
function FloatingBar({ category, categoryIcon = 'chat-folder', item, badge, secondaryAction, primaryAction, actions, onClose, open = true, inline, className, style }) {
  React.useEffect(() => {
    if (inline || !open || !onClose) return;
    const onKey = e => { if (e.key === 'Escape') onClose(e); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, inline, onClose]);
  if (!open) return null;
  return (
    <div role="toolbar" aria-label={typeof item === 'string' ? item : 'Selection'} className={IFS.cx('ifs-floating-bar', !inline && 'ifs-floating-bar--floating', className)} style={style}>
      <div className="ifs-floating-bar__context">
        {category != null && <div className="ifs-floating-bar__category">{categoryIcon && <IFS.Icon name={categoryIcon} size={12} />}{category}</div>}
        <div className="ifs-floating-bar__item">{item}{badge}</div>
      </div>
      <span className="ifs-floating-bar__divider" aria-hidden="true" />
      <div className="ifs-floating-bar__buttons">
        {actions || <>
          {secondaryAction && <IFS.Button type="tertiary" size="m" onClick={secondaryAction.onClick}>{secondaryAction.label}</IFS.Button>}
          {primaryAction && <IFS.Button type="primary" size="m" onClick={primaryAction.onClick}>{primaryAction.label}</IFS.Button>}
        </>}
      </div>
      {onClose && <div className="ifs-floating-bar__close">
        <span className="ifs-floating-bar__divider" aria-hidden="true" />
        <IFS.IconButton icon="system-close" label="Clear selection" type="ghost" size="s" onClick={onClose} />
      </div>}
    </div>
  );
}

Object.assign(IFS, { Tooltip, Alert, Snackbar, toast: surfToast, useSnackbar, Overlay, Modal, Drawer, Panel, Popover, FloatingBar });
export { Tooltip, Alert, Snackbar, surfToast as toast, useSnackbar, Overlay, Modal, Drawer, Panel, Popover, FloatingBar };
