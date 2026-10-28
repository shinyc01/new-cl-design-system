import React from 'react';
import { IFS } from './registry.js';
// Canvas family: the map / node-graph views (Value Framework, Explore map).
// Figma pages: Action (1399:9453), Data Display (3501:10172), Surfaces (1399:13914),
// Data Visualisation (3487:19894), Patterns › Map (1399:13911).

// Uncontrolled-or-controlled value helper (same contract as the other families).
function useCanvasValue(value, defaultValue, onChange) {
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const v = controlled ? value : inner;
  const set = React.useCallback((next, ...rest) => {
    if (!controlled) setInner(next);
    if (onChange) onChange(next, ...rest);
  }, [controlled, onChange]);
  return [v, set];
}

/* ------------------------------------------------------------------------------------------ */
// Figma: value-map-button (2590:20612)
// Floating vertical overlay on the Value Framework canvas. Fit = view action (zoom to show all);
// Expand all / Collapse all = structure actions on the whole tree.
// Props: type shape|input (Figma Type=Shape: Collapse + Expand + Fit; Type=Input: Fit only),
// selected fit|expand|collapse (Figma Selected; the last applied action shows pressed), defaultSelected,
// onSelect(action), onFit, onExpand, onCollapse.
function ValueMapButton({ type = 'shape', selected, defaultSelected, onSelect, onFit, onExpand, onCollapse, className, ...rest }) {
  const [sel, setSel] = useCanvasValue(selected, defaultSelected, onSelect);
  const run = (a, fn) => () => { setSel(a); if (fn) fn(); };
  return (
    <div role="toolbar" aria-orientation="vertical" aria-label="Map view" className={IFS.cx('ifs-map-cluster', className)} {...rest}>
      {type === 'shape' && <>
        <IFS.IconButton icon="node" label="Collapse all" state={sel === 'collapse' ? 'pressed' : undefined} aria-pressed={sel === 'collapse'} onClick={run('collapse', onCollapse)} />
        <IFS.IconButton icon="ecosystem" label="Expand all" state={sel === 'expand' ? 'pressed' : undefined} aria-pressed={sel === 'expand'} onClick={run('expand', onExpand)} />
      </>}
      <IFS.Button type="ghost" size="s" className={IFS.cx('ifs-map-cluster__fit', type === 'shape' && sel !== 'fit' && 'ifs-map-cluster__fit--idle')}
        state={sel === 'fit' ? 'pressed' : undefined} aria-pressed={type === 'shape' ? sel === 'fit' : undefined} onClick={run('fit', onFit)}>Fit</IFS.Button>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: explore-map-button (7404:34866) = map-tool-bar-organism, a stack of
// explore-map-button-base (7404:34867) clusters. Canvas note: "Floating vertical overlay on the map canvas.
// A stack of clusters (rounded surfaces with border + shadow); hairline dividers separate action families
// inside a cluster, gaps separate clusters."
// MapToolbar: children = MapToolCluster elements; with no children it renders the Figma default
// (zoom in/out · lasso, select area | layers, map settings) and calls onAction(id).
// MapToolCluster: children = MapToolButton / MapToolDivider. MapToolDivider: hairline between action families.
// MapToolButton: icon, label (accessible name + tooltip), active (pressed state, aria-pressed), onClick.
function MapToolButton({ icon, label, active, className, ...rest }) {
  return <IFS.IconButton icon={icon} label={label} state={active ? 'pressed' : undefined} aria-pressed={active == null ? undefined : !!active}
    className={IFS.cx('ifs-map-tool', className)} {...rest} />;
}
function MapToolDivider() { return <span className="ifs-map-cluster__divider" role="separator" />; }
function MapToolCluster({ children, label, className, ...rest }) {
  return <div role="group" aria-label={label} className={IFS.cx('ifs-map-cluster', className)} {...rest}>{children}</div>;
}
function MapToolbar({ children, tool, defaultTool = null, onToolChange, onAction, className, ...rest }) {
  const [t, setT] = useCanvasValue(tool, defaultTool, onToolChange);
  const act = id => () => onAction && onAction(id);
  const pick = id => () => setT(t === id ? null : id);
  return (
    <div role="toolbar" aria-orientation="vertical" aria-label="Map tools" className={IFS.cx('ifs-map-toolbar', className)} {...rest}>
      {children || <>
        <MapToolCluster label="Zoom">
          <MapToolButton icon="system-plus" label="Zoom in" onClick={act('zoom-in')} />
          <MapToolDivider />
          <MapToolButton icon="system-minus" label="Zoom out" onClick={act('zoom-out')} />
        </MapToolCluster>
        <MapToolCluster label="Selection and layers">
          <MapToolButton icon="map-tool-bar-lasso" label="Lasso select" active={t === 'lasso'} onClick={pick('lasso')} />
          <MapToolButton icon="map-tool-bar-select-area" label="Select area" active={t === 'area'} onClick={pick('area')} />
          <MapToolDivider />
          <MapToolButton icon="map-layers" label="Layers" onClick={act('layers')} />
          <MapToolButton icon="map-settings-tool" label="Map settings" onClick={act('settings')} />
        </MapToolCluster>
      </>}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: node-button (1851:191153)
// Contextual menu shown on hover over a framework node; the action depends on the node
// (collapsed → Expand, expanded → Collapse). Acts on that node only — not for global toolbar actions.
// Props: type expand|collapse|isolate-path|submodel (Figma Type; Submodel = Isolate path + Open formula),
// actions = [{ id, icon, label }] to override the preset, onAction(id).
const NODE_ACTIONS = {
  expand: [{ id: 'expand', icon: 'ecosystem', label: 'Expand' }],
  collapse: [{ id: 'collapse', icon: 'node', label: 'Collapse' }],
  'isolate-path': [{ id: 'isolate-path', icon: 'isolate-path', label: 'Isolate path' }],
  submodel: [{ id: 'isolate-path', icon: 'isolate-path', label: 'Isolate path' }, { id: 'open-formula', icon: 'formula', label: 'Open formula' }],
};
function NodeHoverActions({ type = 'expand', actions, onAction, className, ...rest }) {
  const list = actions || NODE_ACTIONS[type] || [];
  return (
    <div role="menu" className={IFS.cx('ifs-node-actions', className)} {...rest}>
      {list.map((a, i) => <React.Fragment key={a.id || i}>
        {i > 0 && <span className="ifs-node-actions__line" role="separator" />}
        <button type="button" role="menuitem" className="ifs-node-actions__item" onClick={e => { if (a.onClick) a.onClick(e); if (onAction) onAction(a.id, e); }}>
          <span className="ifs-node-actions__icon"><IFS.Icon name={a.icon} size={16} /></span>
          <span className="ifs-node-actions__label">{a.label}</span>
        </button>
      </React.Fragment>)}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: add-node-button (2879:7311)
// Creates a new (grey, provisional) subnode on the framework canvas; confirmed via its check icon.
// Click → typing state (Figma Pressed/Typing): Enter or ✓ confirms, Esc or ✕ cancels.
// Props: onAdd(name), onCancel, placeholder ("Type..."), disabled, editing / defaultEditing / onEditingChange,
// state hover|pressed|typing (forced, gallery), label (accessible name, default "Add node").
function AddNodeButton({ onAdd, onCancel, placeholder = 'Type...', disabled, editing, defaultEditing = false, onEditingChange,
  state, label = 'Add node', defaultValue = '', className, ...rest }) {
  const forcedTyping = state === 'pressed' || state === 'typing';
  const [open, setOpen] = useCanvasValue(editing, defaultEditing || forcedTyping, onEditingChange);
  const [text, setText] = React.useState(state === 'typing' && !defaultValue ? 'node name' : defaultValue);
  const input = React.useRef(null);
  React.useEffect(() => { if (open && !state && input.current) input.current.focus(); }, [open, state]);
  const close = () => { setOpen(false); setText(''); if (onCancel) onCancel(); };
  const confirm = () => { const v = text.trim(); if (!v) return; if (onAdd) onAdd(v); setOpen(false); setText(''); };
  if (open && !disabled) return (
    <div className={IFS.cx('ifs-add-node', 'ifs-add-node--typing', className)} {...rest}>
      <input ref={input} className="ifs-add-node__input" value={text} placeholder={placeholder} aria-label={label}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') confirm(); if (e.key === 'Escape') close(); }} />
      <span className="ifs-add-node__stack">
        <button type="button" className="ifs-add-node__icon" aria-label="Cancel" onClick={close}><IFS.Icon name="system-close" size={16} /></button>
        <button type="button" className="ifs-add-node__icon" aria-label="Confirm" disabled={!text.trim()} onClick={confirm}><IFS.Icon name="system-check" size={16} /></button>
      </span>
    </div>
  );
  return (
    <button type="button" aria-label={label} disabled={disabled} data-state={state}
      className={IFS.cx('ifs-add-node', className)} onClick={() => setOpen(true)} {...rest}>
      <IFS.Icon name="system-plus" size={16} />
    </button>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: node-card (1440:4401) — the node on the framework/map canvas.
// Props:
//   type strategic-objective|value-model|enterprise-goal|value-framework|measure (solid colour nodes),
//        subnode|document|user (neutral), skeleton (loading)  — Figma Type.
//   title, caption (show-caption-bottom), badge = label text (show-badge-top), counter (show-counter),
//   stackIcons (show-stack-icons: the hover icons — drag handle, and open/delete on Document/User; default true),
//   user = { name, role, initials } for type=user (badge defaults to "Manager"-style role label).
//   Interactive (real): selected/defaultSelected/onSelectedChange (click), draggable (HTML5 drag, onDragStart),
//   checkbox + checked/defaultChecked/onCheckedChange (Figma Checkbox), editing + onRename(title)/onCancelEdit (Figma Edit),
//   cooper (Cooper ring), outOfFocus (dimmed), disabled, loading (= Skeleton).
//   state hover|drag|select|cooper|focus|cooper-drag|out-of-focus|disabled|checkbox|edit|loading forces a Figma State (gallery).
const NODE_SOLID = ['strategic-objective', 'value-model', 'enterprise-goal', 'value-framework', 'measure'];
function NodeCard({ type = 'strategic-objective', state, title = '{card-title}', caption, badge, counter, stackIcons = true, user,
  selected, defaultSelected = false, onSelectedChange, checkbox, checked, defaultChecked = true, onCheckedChange,
  editing, onRename, onCancelEdit, cooper, outOfFocus, disabled, loading, draggable, onDragStart, onDragEnd,
  onOpen, onDelete, onClick, className, style, ...rest }) {
  const [sel, setSel] = useCanvasValue(selected, defaultSelected, onSelectedChange);
  const [dragging, setDragging] = React.useState(false);
  const [draft, setDraft] = React.useState(title);
  React.useEffect(() => { setDraft(title); }, [title, editing]);
  if (type === 'skeleton' || loading || state === 'loading') return <div aria-busy="true" aria-label="Loading node" className={IFS.cx('ifs-node-card', 'ifs-node-card--skeleton', className)} style={style} />;

  const st = state;
  const isEdit = editing || st === 'edit';
  const isCheck = checkbox || st === 'checkbox';
  const isDis = disabled || st === 'disabled';
  const isOut = outOfFocus || st === 'out-of-focus';
  const isDrag = dragging || st === 'drag' || st === 'cooper-drag';
  const isCooper = cooper || st === 'cooper' || st === 'cooper-drag';
  const isSel = (sel && !isCooper) || st === 'select';
  const solid = NODE_SOLID.includes(type);
  const ring = isCooper ? 'cooper' : isSel ? 'select' : st === 'focus' ? 'focus' : null;
  const forcedHover = st === 'hover' || st === 'drag' || st === 'cooper-drag';
  const actions = stackIcons && !isEdit && !isDis;

  const body = type === 'user' ? (
    <div className="ifs-node-card__text">
      <div className="ifs-node-card__top">{badge !== null && <IFS.Badge color="white" size="s">{badge || 'Manager'}</IFS.Badge>}
        {counter != null && <span className="ifs-node-card__counter">{counter}</span>}</div>
      <div className="ifs-node-card__person">
        <IFS.Avatar size="s" type="blue" initials={user && user.initials} name={user && user.name} />
        <div className="ifs-node-card__lines">
          {isEdit ? <NodeTitleInput focus={!!editing} value={draft} onChange={setDraft} onCommit={() => onRename && onRename(draft)} onCancel={onCancelEdit} />
            : <span className="ifs-node-card__title">{(user && user.name) || title}</span>}
          <span className="ifs-node-card__role">{(user && user.role) || caption}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="ifs-node-card__text">
      {type !== 'document' && badge != null && <IFS.Badge color="white" size="s">{badge}</IFS.Badge>}
      <div className="ifs-node-card__lines">
        {isEdit ? <NodeTitleInput focus={!!editing} value={draft} onChange={setDraft} onCommit={() => onRename && onRename(draft)} onCancel={onCancelEdit} />
          : <span className="ifs-node-card__title">{title}</span>}
        {caption != null && <span className="ifs-node-card__caption">{caption}</span>}
      </div>
    </div>
  );

  return (
    <div role="button" tabIndex={isDis ? -1 : 0} aria-pressed={!!isSel} aria-disabled={isDis || undefined}
      data-state={forcedHover ? 'hover' : st === 'focus' ? 'focus' : undefined}
      draggable={draggable && !isDis && !isEdit ? true : undefined}
      onDragStart={e => { setDragging(true); if (onDragStart) onDragStart(e); }}
      onDragEnd={e => { setDragging(false); if (onDragEnd) onDragEnd(e); }}
      onClick={e => { if (isDis || isEdit) return; if (onClick) onClick(e); setSel(!sel, e); }}
      onKeyDown={e => { if (isDis || isEdit) return; if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(!sel, e); } }}
      className={IFS.cx('ifs-node-card', `ifs-node-card--${type}`, solid && 'ifs-node-card--solid',
        ring && `ifs-node-card--ring-${ring}`, isDrag && 'ifs-node-card--drag', isDis && 'ifs-node-card--disabled',
        isOut && 'ifs-node-card--out', isCheck && 'ifs-node-card--checkbox', isEdit && 'ifs-node-card--edit', className)}
      style={style} {...rest}>
      {isCheck && <span onClick={e => e.stopPropagation()} className="ifs-node-card__check">
        <IFS.Checkbox checked={checked} defaultChecked={defaultChecked} onChange={onCheckedChange} aria-label={`Select ${title}`} /></span>}
      {type === 'document' && <span className="ifs-node-card__doc"><IFS.Icon name="system-file" size={16} /></span>}
      {body}
      {type !== 'user' && counter != null && <span className="ifs-node-card__side"><span className="ifs-node-card__counter">{counter}</span></span>}
      {isEdit && <span className="ifs-node-card__side ifs-node-card__icons ifs-node-card__icons--edit">
        <button type="button" aria-label="Cancel" onClick={e => { e.stopPropagation(); if (onCancelEdit) onCancelEdit(); }}><IFS.Icon name="system-close" size={12} /></button>
        <button type="button" aria-label="Save" onClick={e => { e.stopPropagation(); if (onRename) onRename(draft); }}><IFS.Icon name="system-check" size={12} /></button>
      </span>}
      {actions && (type === 'document' || type === 'user') && <span className="ifs-node-card__side ifs-node-card__icons ifs-node-card__hover">
        <button type="button" aria-label="Open" onClick={e => { e.stopPropagation(); if (onOpen) onOpen(e); }}><IFS.Icon name="chat-external-link" size={12} /></button>
        {type === 'document' && <button type="button" aria-label="Delete" onClick={e => { e.stopPropagation(); if (onDelete) onDelete(e); }}><IFS.Icon name="system-trash-delete" size={12} /></button>}
      </span>}
      {actions && <span className="ifs-node-card__side ifs-node-card__hover ifs-node-card__grip" aria-hidden="true"><IFS.Icon name="system-drag-and-drop" size={12} /></span>}
    </div>
  );
}
function NodeTitleInput({ value, onChange, onCommit, onCancel, focus }) {
  return <input className="ifs-node-card__input" value={value} autoFocus={focus} aria-label="Node name"
    onClick={e => e.stopPropagation()} onChange={e => onChange(e.target.value)}
    onKeyDown={e => { e.stopPropagation(); if (e.key === 'Enter') onCommit(); if (e.key === 'Escape' && onCancel) onCancel(); }} />;
}

/* ------------------------------------------------------------------------------------------ */
// Figma: sidebar-node-card (2667:6608) — a node in a side list, dragged onto the canvas.
// Figma marks it legacy ("can be content-card-organism"); kept because the canvas drag flow uses it.
// Props: title, description, cooper (Cooper ring), dragData (string put on dataTransfer as text/plain),
// onDragStart/onDragEnd, state hover|drag|focus|cooper-hover|cooper-drag (forced, gallery).
function SidebarNodeCard({ title = '{card-title}', description, cooper, dragData, state, onDragStart, onDragEnd, className, ...rest }) {
  const [dragging, setDragging] = React.useState(false);
  const isDrag = dragging || state === 'drag' || state === 'cooper-drag';
  const isCooper = cooper || state === 'cooper-hover' || state === 'cooper-drag';
  return (
    <div role="button" tabIndex={0} draggable aria-roledescription="draggable node"
      data-state={state === 'hover' || state === 'cooper-hover' ? 'hover' : state === 'focus' ? 'focus' : undefined}
      onDragStart={e => { setDragging(true); if (e.dataTransfer) e.dataTransfer.setData('text/plain', dragData || title); if (onDragStart) onDragStart(e); }}
      onDragEnd={e => { setDragging(false); if (onDragEnd) onDragEnd(e); }}
      className={IFS.cx('ifs-sidebar-node', isDrag && 'ifs-sidebar-node--drag', isCooper && 'ifs-sidebar-node--cooper', className)} {...rest}>
      <div className="ifs-sidebar-node__head">
        <span className="ifs-sidebar-node__title">{title}</span>
        <IFS.Icon name="system-drag-and-drop" size={12} className="ifs-sidebar-node__grip" />
      </div>
      {description != null && <div className="ifs-sidebar-node__desc">{description}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: map-pin-teardrop (43:2020), Patterns › Map. Default location marker for one asset on an exact spot.
// (Other pin sets on the page — map-pin-dot/-square/-pole/-defect/-flow — are not built here.)
// Props: status neutral|error|warning, icon = asset icon name (Figma Asset icon=Yes; absent = white dot),
// selected / defaultSelected / onSelectedChange (Figma Selected), dimmed (Figma Out of hover), opened (Figma Opened),
// label (accessible name), state selected|opened|out-of-hover (forced, gallery).
function MapPin({ status = 'neutral', icon, selected, defaultSelected = false, onSelectedChange, dimmed, opened, label = 'Asset', state, className, ...rest }) {
  const [sel, setSel] = useCanvasValue(selected, defaultSelected, onSelectedChange);
  const isSel = sel || state === 'selected';
  return (
    <button type="button" aria-label={label} aria-pressed={!!isSel} onClick={e => setSel(!sel, e)}
      className={IFS.cx('ifs-map-pin', `ifs-map-pin--${status}`, isSel && 'ifs-map-pin--selected', (dimmed || state === 'out-of-hover') && 'ifs-map-pin--dimmed',
        (opened || state === 'opened') && 'ifs-map-pin--opened', className)} {...rest}>
      <span className="ifs-map-pin__shape" />
      <span className={IFS.cx('ifs-map-pin__circle', !icon && 'ifs-map-pin__circle--dot')}>{icon && <IFS.Icon name={icon} size={16} />}</span>
    </button>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: canvas-background (1395:196712), Surfaces.
// "The infinite, pannable, zoomable ground plane for map-first and node-graph views" — not for document-flow pages.
// Props: image (url; Figma State=Image — a map), view {x, y, zoom} / defaultView / onViewChange (drag to pan,
// ctrl/⌘ + wheel or pinch to zoom, plain wheel pans), minZoom, maxZoom, children = world content (absolute-positioned
// in world px), overlay = fixed UI on top (toolbars, mini-map), apiRef receives { setView, fit(bounds) }.
function CanvasBackground({ image, view, defaultView = { x: 0, y: 0, zoom: 1 }, onViewChange, minZoom = 0.25, maxZoom = 2,
  children, overlay, apiRef, className, style, ...rest }) {
  const [v, setV] = useCanvasValue(view, defaultView, onViewChange);
  const vRef = React.useRef(v); vRef.current = v;
  const el = React.useRef(null);
  const drag = React.useRef(null);
  const [panning, setPanning] = React.useState(false);
  const clampZ = z => Math.min(maxZoom, Math.max(minZoom, z));
  const zoomAt = React.useCallback((z, cx, cy) => {
    const cur = vRef.current; const nz = clampZ(z);
    if (cx == null) { const r = el.current.getBoundingClientRect(); cx = r.width / 2; cy = r.height / 2; }
    setV({ zoom: nz, x: cx - (cx - cur.x) * nz / cur.zoom, y: cy - (cy - cur.y) * nz / cur.zoom });
  }, [setV, minZoom, maxZoom]);
  React.useImperativeHandle(apiRef, () => ({
    setView: setV,
    zoomBy: f => zoomAt(vRef.current.zoom * f),
    fit: ({ x, y, width, height }, pad = 40) => {
      const r = el.current.getBoundingClientRect();
      const z = clampZ(Math.min((r.width - pad * 2) / width, (r.height - pad * 2) / height));
      setV({ zoom: z, x: (r.width - width * z) / 2 - x * z, y: (r.height - height * z) / 2 - y * z });
    },
  }), [setV, zoomAt]);
  React.useEffect(() => {
    const node = el.current; if (!node) return;
    const onWheel = e => {
      e.preventDefault();
      const cur = vRef.current; const r = node.getBoundingClientRect();
      if (e.ctrlKey || e.metaKey) zoomAt(cur.zoom * Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
      else setV({ ...cur, x: cur.x - e.deltaX, y: cur.y - e.deltaY });
    };
    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [setV, zoomAt]);
  const onPointerDown = e => {
    if (e.button !== 0 || e.target.closest('button,input,a,[role=button],[draggable=true],.ifs-canvas__overlay')) return;
    drag.current = { px: e.clientX, py: e.clientY, x: v.x, y: v.y };
    e.currentTarget.setPointerCapture(e.pointerId); setPanning(true);
  };
  const onPointerMove = e => { const d = drag.current; if (d) setV({ ...vRef.current, x: d.x + e.clientX - d.px, y: d.y + e.clientY - d.py }); };
  const end = () => { drag.current = null; setPanning(false); };
  const onKeyDown = e => {
    const step = 40, cur = vRef.current;
    const m = { ArrowLeft: [step, 0], ArrowRight: [-step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] }[e.key];
    if (m && e.target === e.currentTarget) { e.preventDefault(); setV({ ...cur, x: cur.x + m[0], y: cur.y + m[1] }); }
    if ((e.key === '+' || e.key === '=') && e.target === e.currentTarget) zoomAt(cur.zoom * 1.2);
    if (e.key === '-' && e.target === e.currentTarget) zoomAt(cur.zoom / 1.2);
  };
  const tile = 20 * v.zoom;
  return (
    <div ref={el} tabIndex={0} role="application" aria-roledescription="canvas" aria-label={rest['aria-label'] || 'Canvas'}
      className={IFS.cx('ifs-canvas', image && 'ifs-canvas--image', panning && 'ifs-canvas--panning', className)}
      style={{ ...(image ? { backgroundImage: `url(${image})` } : { '--dot-size': `${tile}px`, '--dot-x': `${v.x}px`, '--dot-y': `${v.y}px` }), ...style }}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={end} onPointerCancel={end} onKeyDown={onKeyDown} {...rest}>
      <div className="ifs-canvas__world" style={{ transform: `translate(${v.x}px, ${v.y}px) scale(${v.zoom})` }}>{children}</div>
      {overlay && <div className="ifs-canvas__overlay">{overlay}</div>}
    </div>
  );
}

// Connector between two canvas nodes (world coordinates). Not a Figma component of its own: the framework
// screens draw node links as plain hairlines (border/medium) — a horizontal-tangent curve between two points.
// Props: from {x,y}, to {x,y}, highlighted (border/strong).
function CanvasConnector({ from, to, highlighted }) {
  const minX = Math.min(from.x, to.x), minY = Math.min(from.y, to.y);
  const w = Math.abs(to.x - from.x) || 1, h = Math.abs(to.y - from.y) || 1;
  const a = { x: from.x - minX, y: from.y - minY + 1 }, b = { x: to.x - minX, y: to.y - minY + 1 };
  const mx = (a.x + b.x) / 2;
  return (
    <svg className={IFS.cx('ifs-canvas-connector', highlighted && 'ifs-canvas-connector--on')} aria-hidden="true"
      style={{ left: minX, top: minY - 1, width: w, height: h + 2 }} viewBox={`0 0 ${w} ${h + 2}`} preserveAspectRatio="none">
      <path d={`M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`} />
    </svg>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: move-and-drop-background (4509:30446), Surfaces.
// Dashboard edit mode: the dashed drop zone marking where a dragged widget will land.
// Props: text (Figma bool `text`: shows "+ Drop here to place"), children = custom label, onDrop(data, event),
// active (forced highlight). It accepts HTML5 drops and exposes data-over while something is dragged over it.
function DropZone({ text = false, children, onDrop, active, className, ...rest }) {
  const [over, setOver] = React.useState(false);
  return (
    <div data-over={over || active || undefined} className={IFS.cx('ifs-drop-zone', className)}
      onDragOver={e => { e.preventDefault(); if (!over) setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); if (onDrop) onDrop(e.dataTransfer ? e.dataTransfer.getData('text/plain') : null, e); }}
      {...rest}>
      {children || (text && <><IFS.Icon name="system-plus" size={16} /><span>Drop here to place</span></>)}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: sankey-atom (1853:12325) — one Sankey node: connector stub + card.
// Props: type default|measure, label, from, to (values, e.g. "$1.24B" → "$1.27B"; leave `to` out for a single value),
// change (e.g. "4.5%"; Figma compare-data, shown on hover), changeDirection down|up, disabled, state hover (gallery),
// accent = colour of the left accent bar used by the organism (css colour / var).
function SankeyNode({ type = 'default', label, from, to, change, changeDirection = 'down', disabled, state, accent, className, style, ...rest }) {
  return (
    <div data-state={state} aria-disabled={disabled || undefined} tabIndex={disabled ? undefined : 0}
      className={IFS.cx('ifs-sankey-node', `ifs-sankey-node--${type}`, disabled && 'ifs-sankey-node--disabled', className)}
      style={{ ...(accent ? { '--sankey-accent': accent } : null), ...style }} {...rest}>
      <span className="ifs-sankey-node__stub"><i /><i /></span>
      <span className="ifs-sankey-node__card">
        <span className="ifs-sankey-node__label">{label}</span>
        <span className="ifs-sankey-node__nums">
          {from != null && <span className="ifs-sankey-node__from">{from}</span>}
          {to != null && <><IFS.Icon name="arrow-right" size={12} /><span className="ifs-sankey-node__to">{to}</span></>}
        </span>
        {change != null && <span className="ifs-sankey-node__change">
          <IFS.Icon name={changeDirection === 'up' ? 'arrow-caret-up-filled' : 'arrow-caret-down-filled'} size={12} />{change}</span>}
      </span>
    </div>
  );
}

// Figma: sankey-header (2698:64494) — column summary box ("MEAS. Q1 2025 29 → Q4 2026 24").
// Props: abbr ("MEAS."), fromLabel, toLabel, from, to.
function SankeyHeader({ abbr, fromLabel, toLabel, from, to, className, ...rest }) {
  return (
    <div className={IFS.cx('ifs-sankey-header', className)} {...rest}>
      <span className="ifs-sankey-header__abbr">{abbr}</span>
      <span className="ifs-sankey-header__grid">
        <span className="ifs-sankey-header__th">{fromLabel}</span><span /><span className="ifs-sankey-header__th">{toLabel}</span>
        <span className="ifs-sankey-header__td">{from}</span><IFS.Icon name="arrow-right" size={12} /><span className="ifs-sankey-header__td ifs-sankey-header__td--to">{to}</span>
      </span>
    </div>
  );
}

// Figma: sankey-organism (4457:53304) = column strip + sankey-chart (1853:12398) built from sankey-atom/-header.
// "Flow: how a total splits through stages (budget allocation, value decomposition, goal → objective → model lineage);
// band width = value."
// Props:
//   columns = [{ id, label, header?: SankeyHeader props }]   (left → right)
//   nodes   = [{ id, column, label, from, to, change, type: default|measure|source, count?, color?: violet|green }]
//             type=source draws the tall coloured source block (first column, e.g. "6 Goals").
//   links   = [{ source, target, value }]  — band colour follows the source block it descends from.
//   height (chart body px, default 575), onNodeClick(node), showFit + onFit (value-map-button Input in the corner).
const SANKEY_COLOR = { violet: 'var(--data-viz-violet-data-3)', green: 'var(--background-system-success)' };
function Sankey({ columns = [], nodes = [], links = [], height = 575, onNodeClick, showFit = true, onFit, className, ...rest }) {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(1200);
  const [hover, setHover] = React.useState(null);
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(([e]) => setW(e.contentRect.width)) : null;
    setW(ref.current.clientWidth); if (ro) ro.observe(ref.current);
    return () => ro && ro.disconnect();
  }, []);
  const layout = React.useMemo(() => sankeyLayout(columns, nodes, links, w, height), [columns, nodes, links, w, height]);
  const related = React.useMemo(() => {
    if (!hover) return null; const s = new Set([hover]);
    const walk = (id, dir) => links.forEach(l => { const [a, b] = dir ? [l.source, l.target] : [l.target, l.source]; if (a === id && !s.has(b)) { s.add(b); walk(b, dir); } });
    walk(hover, true); walk(hover, false); return s;
  }, [hover, links]);
  return (
    <div className={IFS.cx('ifs-sankey', className)} {...rest}>
      <div className="ifs-sankey__columns" style={{ gridTemplateColumns: layout.colTemplate }}>
        {columns.map(c => <span key={c.id} className="ifs-sankey__column">{c.label}</span>)}
      </div>
      <div ref={ref} className="ifs-sankey__body" style={{ height }}>
        <svg className="ifs-sankey__bands" width={w} height={height} aria-hidden="true">
          {layout.bands.map((b, i) => <path key={i} d={b.d} fill={b.color}
            className={IFS.cx('ifs-sankey__band', related && (related.has(b.source) && related.has(b.target) ? 'ifs-sankey__band--on' : 'ifs-sankey__band--off'))} />)}
        </svg>
        {columns.map(c => c.header && layout.headers[c.id] &&
          <SankeyHeader key={c.id} {...c.header} className="ifs-sankey__summary" style={{ left: layout.headers[c.id].x, top: layout.headers[c.id].y }} />)}
        {layout.placed.map(p => p.node.type === 'source' ? (
          <div key={p.node.id} className="ifs-sankey__source" style={{ left: p.x, top: p.y, height: p.h, '--sankey-accent': SANKEY_COLOR[p.node.color] || SANKEY_COLOR.violet }}
            onMouseEnter={() => setHover(p.node.id)} onMouseLeave={() => setHover(null)}>
            <span className="ifs-sankey__source-bar"><b>{p.node.count}</b>{p.node.countLabel || 'Goals'}</span>
            <span className="ifs-sankey__source-band" />
            <span className="ifs-sankey__source-label">{p.node.label}</span>
          </div>
        ) : (
          <SankeyNode key={p.node.id} type={p.node.type} label={p.node.label} from={p.node.from} to={p.node.to} change={p.node.change}
            accent={p.accent} className={IFS.cx('ifs-sankey__node', related && !related.has(p.node.id) && 'ifs-sankey__node--off')}
            style={{ left: p.x, top: p.y }} onMouseEnter={() => setHover(p.node.id)} onMouseLeave={() => setHover(null)}
            onClick={() => onNodeClick && onNodeClick(p.node)} />
        ))}
        {showFit && <ValueMapButton type="input" className="ifs-sankey__fit" onFit={onFit} />}
      </div>
    </div>
  );
}
function sankeyLayout(columns, nodes, links, W, H) {
  const n = Math.max(columns.length, 1);
  const pad = 16, colW = (W - pad * 2) / n;
  const colTemplate = columns.map((c, i) => i === 0 && nodes.some(x => x.column === c.id && x.type === 'source') ? '0.3fr' : '1fr').join(' ');
  const fr = columns.map((c, i) => colTemplate.split(' ')[i] === '0.3fr' ? 0.3 : 1);
  const frSum = fr.reduce((a, b) => a + b, 0) || 1;
  let acc = pad; const colX = {};
  columns.forEach((c, i) => { colX[c.id] = acc; acc += (W - pad * 2) * fr[i] / frSum; });
  const byId = Object.fromEntries(nodes.map(x => [x.id, x]));
  const inflow = {}, outflow = {};
  links.forEach(l => { outflow[l.source] = (outflow[l.source] || 0) + l.value; inflow[l.target] = (inflow[l.target] || 0) + l.value; });
  // Root colour per node: follow incoming links back to a source block (majority value).
  const rootColor = {};
  const colorOf = id => {
    if (rootColor[id]) return rootColor[id];
    const nd = byId[id]; if (!nd) return SANKEY_COLOR.violet;
    if (nd.type === 'source') return (rootColor[id] = SANKEY_COLOR[nd.color] || SANKEY_COLOR.violet);
    const ins = links.filter(l => l.target === id).sort((a, b) => b.value - a.value);
    return (rootColor[id] = ins.length ? colorOf(ins[0].source) : SANKEY_COLOR.violet);
  };
  const placed = [], pos = {}, headers = {};
  columns.forEach((c, ci) => {
    const list = nodes.filter(x => x.column === c.id);
    const isSource = list.some(x => x.type === 'source');
    const sizes = list.map(x => x.type === 'source' ? Math.max(60, (outflow[x.id] || 1)) : x.type === 'measure' ? 16 : 32);
    const gap = isSource ? 12 : list[0] && list[0].type === 'measure' ? 4 : 12;
    let total = sizes.reduce((a, b) => a + b, 0) + gap * Math.max(list.length - 1, 0);
    let scale = 1;
    if (isSource) { const avail = H - 120; const raw = sizes.reduce((a, b) => a + b, 0); scale = Math.min(1, (avail - gap * (list.length - 1)) / raw) * (avail / Math.max(raw, 1) > 1 ? Math.min(avail / raw, 2.5) : 1); total = sizes.reduce((a, b) => a + b * scale, 0) + gap * (list.length - 1); }
    const top = c.header ? Math.max(56, (H - total) / 2) : (H - total) / 2;
    let y = top;
    list.forEach((x, i) => {
      const h = isSource ? sizes[i] * scale : sizes[i];
      const p = { node: x, x: colX[c.id] + (isSource ? 0 : 0), y, h, w: isSource ? 40 : 25, accent: colorOf(x.id) };
      placed.push(p); pos[x.id] = p; y += h + gap;
    });
    if (c.header) headers[c.id] = { x: colX[c.id], y: Math.max(0, top - 56) };
  });
  // Bands: stack each node's outgoing / incoming links along its stub edge.
  const outY = {}, inY = {};
  placed.forEach(p => { outY[p.node.id] = p.y; inY[p.node.id] = p.y; });
  const bands = [];
  const sorted = [...links].sort((a, b) => (pos[a.target] ? pos[a.target].y : 0) - (pos[b.target] ? pos[b.target].y : 0));
  sorted.forEach(l => {
    const s = pos[l.source], t = pos[l.target]; if (!s || !t) return;
    const sh = s.h * l.value / (outflow[l.source] || 1);
    const th = t.h * l.value / (inflow[l.target] || 1);
    const x0 = s.x + s.w, x1 = t.x, y0 = outY[l.source], y1 = inY[l.target];
    outY[l.source] += sh; inY[l.target] += th;
    const mx = (x0 + x1) / 2;
    bands.push({ source: l.source, target: l.target, color: colorOf(l.source),
      d: `M${x0} ${y0} C${mx} ${y0} ${mx} ${y1} ${x1} ${y1} L${x1} ${y1 + th} C${mx} ${y1 + th} ${mx} ${y0 + sh} ${x0} ${y0 + sh} Z` });
  });
  return { placed, bands, headers, colTemplate };
}

/* ------------------------------------------------------------------------------------------ */
// Figma: timiline-phase-molecule (3967:1765) — one phase row of the Gantt (+ its task list when expanded).
// Props: title (Figma Title), subtitle ("Internal"), badge = red badge text (Figma Badge=True, e.g. "6 weeks behind"),
// color teal|muted-purple|steel-blue|rose|… (data-viz family, data-4), start / end (fractional slot indexes on the axis),
// tasks = [{ title, label ("Q1 2027"), start, end }], expanded / defaultExpanded / onExpandedChange,
// onAdd, onMore (hover actions), slots (number of axis slots, set by the chart), state hover (gallery).
function TimelinePhase({ title, subtitle, badge, color = 'teal', start = 0, end = 1, tasks = [], expanded, defaultExpanded = false,
  onExpandedChange, onAdd, onMore, slots = 20, groups = 5, state, className, ...rest }) {
  const [open, setOpen] = useCanvasValue(expanded, defaultExpanded, onExpandedChange);
  const bar = `var(--data-viz-${color}-data-4)`;
  const pct = x => `${(x / slots) * 100}%`;
  const grid = <span className="ifs-timeline__grid" style={{ '--groups': groups }}>{Array.from({ length: groups }, (_, i) => <i key={i} />)}</span>;
  return (
    <div data-state={state} className={IFS.cx('ifs-timeline-phase', open && 'ifs-timeline-phase--open', className)} style={{ '--bar': bar }} {...rest}>
      <div className="ifs-timeline-phase__row">
        <div className="ifs-timeline-phase__cell">
          <div className="ifs-timeline-phase__text">
            <button type="button" className="ifs-timeline-phase__toggle" aria-expanded={!!open} onClick={() => setOpen(!open)}>
              <IFS.Icon name={open ? 'arrow-caret-down-filled' : 'arrow-caret-right-filled'} size={12} />
              <span className="ifs-timeline-phase__title">{title}</span>
            </button>
            {badge ? <IFS.Badge color="red" size="s">{badge}</IFS.Badge> : subtitle != null && <span className="ifs-timeline-phase__sub">{subtitle}</span>}
          </div>
          <span className="ifs-timeline-phase__actions">
            <IFS.IconButton size="s" icon="system-plus" label="Add task" onClick={onAdd} />
            <IFS.IconButton size="s" icon="system-dots-vertical" label="More actions" onClick={onMore} />
          </span>
        </div>
        <div className="ifs-timeline-phase__track">{grid}<span className="ifs-timeline-phase__bar" style={{ left: pct(start), width: pct(end - start) }} /></div>
      </div>
      {open && tasks.map((t, i) => (
        <div key={i} className="ifs-timeline-phase__task">
          <div className="ifs-timeline-phase__cell ifs-timeline-phase__cell--task">
            <span className="ifs-timeline-phase__task-name">
              <IFS.Icon name="corner-down-right-arrow" size={12} className="ifs-timeline-phase__arrow" /><i className="ifs-timeline-phase__dot" />
              {t.title}</span>
            <span className="ifs-timeline-phase__when">{t.label}</span>
          </div>
          <div className="ifs-timeline-phase__track ifs-timeline-phase__track--task">
            <span className="ifs-timeline-phase__bar ifs-timeline-phase__bar--task" style={{ left: pct(t.start), width: pct(t.end - t.start) }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// Figma: timeline-chart-organism (3967:38286) — "use this". Gantt: phases on a time axis (e.g. investment phases
// across a 5-year plan); shows sequential vs parallel work.
// Props: groups = [{ label: '2027', slots: ['Q1','Q2','Q3','Q4'] }] (the axis), phases = TimelinePhase props[] (+ id),
// title ("Phase"), onAddPhase (shows the header + on hover, Figma State=Hover), slot positions are global indexes
// across all groups (Q1 2027 = 0, Q2 2027 = 1, … ).
function TimelineChart({ groups = [], phases = [], title = 'Phase', onAddPhase, state, className, ...rest }) {
  const slots = groups.reduce((a, g) => a + g.slots.length, 0) || 1;
  return (
    <div data-state={state} className={IFS.cx('ifs-timeline', className)} role="table" aria-label={rest['aria-label'] || 'Timeline'} {...rest}>
      <div className="ifs-timeline__head" role="row">
        <div className="ifs-timeline__phase-head" role="columnheader"><span>{title}</span>
          {onAddPhase && <IFS.IconButton size="s" icon="system-plus" label="Add phase" className="ifs-timeline__add" onClick={onAddPhase} />}</div>
        <div className="ifs-timeline__axis">
          <div className="ifs-timeline__years">{groups.map(g => <span key={g.label} style={{ flex: g.slots.length }}>{g.label}</span>)}</div>
          <div className="ifs-timeline__slots">{groups.map(g => g.slots.map(s => <span key={g.label + s}>{s}</span>))}</div>
        </div>
      </div>
      {phases.map((p, i) => <TimelinePhase key={p.id || i} slots={slots} groups={groups.length} {...p} />)}
    </div>
  );
}

Object.assign(IFS, { ValueMapButton, MapToolbar, MapToolCluster, MapToolButton, MapToolDivider, NodeHoverActions, AddNodeButton,
  NodeCard, SidebarNodeCard, MapPin, CanvasBackground, CanvasConnector, DropZone, SankeyNode, SankeyHeader, Sankey, TimelinePhase, TimelineChart });
export { ValueMapButton, MapToolbar, MapToolCluster, MapToolButton, MapToolDivider, NodeHoverActions, AddNodeButton,
  NodeCard, SidebarNodeCard, MapPin, CanvasBackground, CanvasConnector, DropZone, SankeyNode, SankeyHeader, Sankey, TimelinePhase, TimelineChart };
