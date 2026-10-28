import React from 'react';
import { createPortal } from 'react-dom';
import { IFS } from './registry.js';

// Patterns › Documents (Patterns file KmmVU2D0kqWr0dC1xXNzWw, page 12:101272, section 12:111195).
// 1. IFS DS components the kit lacked: map pins (dot, pole, defect, flow) and the bar-chart items.
// 2. Pattern composites for "Cooper's context" documents: useDocuments (state + rules), DocumentRow, DocumentsPopover,
//    DocumentsContext (bottom-sheet left side + popover + upload), DocumentsDropArea (drag & drop), DocumentsFeedback (alerts/snackbars).

const cx = (...a) => a.filter(Boolean).join(' ');
function useCtl(value, defaultValue, onChange) {
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const set = React.useCallback((v, ...r) => { if (!controlled) setInner(v); onChange && onChange(v, ...r); }, [controlled, onChange]);
  return [controlled ? value : inner, set];
}

/* ------------------------------------------------------------------------------------------ */
// Figma: map-pin-dot (key d2686af3…; Patterns copy 12:107153, Figma set name "dot-pin").
// A round status marker: counts on clusters (text) or a status glyph (icon) at map points.
// Props: size l (32) | m (24) | s (16) | xs (8), status error|warning|success (Figma Success is drawn grey: map-pin/fill/default),
// type text|icon, counter (Figma "counter"; shown on L/M only), icon (type=icon glyph, default system-close),
// highlight (Figma higlight=yes: glow ring), selected / defaultSelected / onSelectedChange (click toggles),
// dimmed (Figma state=out of hover), label (accessible name), state default|selected|out-of-hover (forced, gallery).
function MapPinDot({ size = 'm', status = 'error', type = 'text', counter = '999', icon = 'system-close', highlight, selected, defaultSelected = false,
  onSelectedChange, dimmed, label, state, className, onClick, ...rest }) {
  const [sel, setSel] = useCtl(selected, defaultSelected, onSelectedChange);
  const isSel = state ? state === 'selected' : sel;
  const isDim = dimmed || state === 'out-of-hover';
  return (
    <button type="button" aria-label={label || `${counter} ${status}`} aria-pressed={!!isSel}
      onClick={e => { setSel(!sel, e); onClick && onClick(e); }}
      className={cx('ifs-pin-dot', `ifs-pin-dot--${size}`, `ifs-pin-dot--${status}`, isSel && 'ifs-pin-dot--selected', isDim && 'ifs-pin-dot--dimmed',
        highlight && status !== 'success' && 'ifs-pin-dot--highlight', className)} {...rest}>
      <span className="ifs-pin-dot__fill">
        {type === 'icon' && (size === 'm' || size === 'l') ? <IFS.Icon name={icon} size={16} /> : <span className="ifs-pin-dot__text">{counter}</span>}
      </span>
    </button>
  );
}

// Figma: map-pin-defect (key 91cf9e42…; Patterns copy 12:106855, set name "Defect").
// A weather/hazard defect at a point. Props: type cyclone|flood|heat|storm (icon map-risk-<type>),
// state confirmed (red) | unconfirmed (amber) | monitoring (green), label, onClick (renders a button).
function MapPinDefect({ type = 'cyclone', state = 'confirmed', label, onClick, className, ...rest }) {
  const Tag = onClick ? 'button' : 'span';
  return (
    <Tag type={onClick ? 'button' : undefined} onClick={onClick} aria-label={label || `${type} defect, ${state}`} role={onClick ? undefined : 'img'}
      className={cx('ifs-pin-defect', `ifs-pin-defect--${state}`, className)} {...rest}>
      <span className="ifs-pin-defect__fill"><IFS.Icon name={`map-risk-${type}`} size={16} /></span>
    </Tag>
  );
}

// Figma: Electric Flow Direction Indicator (key a6c2010c…; Patterns copy 12:107306) — "map-pin-flow".
// The small arrowhead drawn along a circuit to show the direction power flows. Props: type default|error,
// rotate (degrees; the arrow points right at 0), label.
function MapPinFlow({ type = 'default', rotate = 0, label = 'Flow direction', className, style, ...rest }) {
  return <span role="img" aria-label={label} className={cx('ifs-pin-flow', type === 'error' && 'ifs-pin-flow--error', className)}
    style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }} {...rest} />;
}

// Figma: map-pin-pole (key b548a660…; Patterns copy 12:107120, set name "Pole").
// A labelled asset on a circuit: a symbol above a number / name label.
// Props: symbol pin|defect|dot|hierarchy-pin, number (Figma Number, the label), showNumber (default true),
// pin (Figma bool "Pin": false hides the symbol — numbered poles along a route), selected / defaultSelected / onSelectedChange,
// pinIcon (symbol=pin: the white asset icon; Figma Pin types Dum/Village/Station/… are drawn art, pass the nearest asset icon),
// pinStatus neutral|error|warning|evaluated, hierarchy group|segment|structure (symbol=hierarchy-pin: asset-<type> icon),
// defect = MapPinDefect props (symbol=defect), state default|selected (forced, gallery), label (accessible name).
function MapPinPole({ symbol = 'pin', number = '235', showNumber = true, pin = true, selected, defaultSelected = false, onSelectedChange,
  pinIcon = 'asset type-substation', pinStatus = 'neutral', hierarchy = 'group', defect, state, label, className, onClick, ...rest }) {
  const [sel, setSel] = useCtl(selected, defaultSelected, onSelectedChange);
  const isSel = state ? state === 'selected' : sel;
  let sym = null;
  if (pin) {
    if (symbol === 'pin' || symbol === 'hierarchy-pin') {
      const h = symbol === 'hierarchy-pin';
      sym = (
        <span className={cx('ifs-pin-pole__pin', h && 'ifs-pin-pole__pin--hierarchy', `ifs-pin-pole__pin--${pinStatus}`)}>
          <span className="ifs-pin-pole__shape" />
          <span className="ifs-pin-pole__circle"><IFS.Icon name={h ? `asset-${hierarchy}` : pinIcon} size={16} /></span>
        </span>
      );
    } else if (symbol === 'defect') sym = <MapPinDefect {...defect} />;
    else sym = <span className="ifs-pin-pole__dot" />;
  }
  return (
    <button type="button" aria-pressed={!!isSel} aria-label={label || String(number)} onClick={e => { setSel(!sel, e); onClick && onClick(e); }}
      className={cx('ifs-pin-pole', symbol === 'dot' && 'ifs-pin-pole--dot', isSel && 'ifs-pin-pole--selected', className)} {...rest}>
      {sym}
      {showNumber && <span className="ifs-pin-pole__label">{number}</span>}
    </button>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Figma: bar-chart-item (key 44fcce06…; Patterns copy 12:107849). One filled segment of a bar chart.
// Props: color 1–9 (Figma colour index → data-viz/data-N), fill (any CSS colour/var — overrides color; the pattern
// screens bind data-viz/muted purple/data-4), number (Figma bool, show the label, default true), children = label (default "40%").
function BarChartItem({ color = 1, fill, number = true, children = '40%', className, style, ...rest }) {
  return (
    <div className={cx('ifs-bar-item', `ifs-bar-item--c${color}`, className)} style={{ ...(fill ? { '--bar-fill': fill } : null), ...style }} {...rest}>
      {number && children}
    </div>
  );
}

// Figma: vertical-bar-chart-item (key c06b1d19…; Patterns copy 12:107877). A stacked column of bar-chart-items
// (2px gap and padding). Figma default-1 / default-2 are sample stacks; active adds the focus-outer ring.
// Props: segments = [{ value, color, fill, label }] top → bottom (heights ∝ value; label shown when given),
// value = column total as a share of `max` (height of the filled part; default: full), max, height (default 200), width (104),
// active / defaultActive / onActiveChange (click toggles, renders a button when onActiveChange or onClick is set), state active (forced).
function VerticalBarChartItem({ segments = [{ value: 1, color: 4 }], value, max, height = 200, width = 104, active, defaultActive = false, onActiveChange,
  onClick, state, label, className, style, ...rest }) {
  const [act, setAct] = useCtl(active, defaultActive, onActiveChange);
  const interactive = !!(onActiveChange || onClick);
  const Tag = interactive ? 'button' : 'div';
  const isAct = state === 'active' || act;
  const share = value != null && max ? Math.max(0, Math.min(1, value / max)) : 1;
  return (
    <Tag type={interactive ? 'button' : undefined} aria-pressed={interactive ? !!isAct : undefined} aria-label={label}
      onClick={interactive ? e => { setAct(!act, e); onClick && onClick(e); } : undefined}
      className={cx('ifs-vbar', isAct && 'ifs-vbar--active', className)} style={{ width, height, ...style }} {...rest}>
      <span style={{ flex: `${1 - share} 1 0` }} aria-hidden="true" />
      {segments.map((s, i) => (
        <BarChartItem key={i} color={s.color || 4} fill={s.fill} number={s.label != null} style={{ '--seg': s.value * share }}>{s.label}</BarChartItem>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------------------------------ */
// Documents pattern (Patterns › Documents). Rules from the canvas notes live in guide/patterns/documents.md.
const DOC_FORMATS = ['pdf', 'docx', 'xlsx', 'pptx', 'txt', 'csv'];
const ext = name => { const m = /\.([^.]+)$/.exec(name || ''); return m ? m[1].toLowerCase() : ''; };
const fmtSize = b => (b >= 1048576 ? `${Math.round(b / 104857.6) / 10} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);
const fmtDate = d => {
  if (d == null) return '';
  if (typeof d === 'string') return d;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
const time = d => (d instanceof Date ? d.getTime() : Date.parse(d) || 0);
const docLabel = n => `${n} ${n === 1 ? 'Document' : 'Documents'}`;
let docSeq = 0;
const newId = () => `doc-${Date.now().toString(36)}-${++docSeq}`;
const listFormats = f => { const u = f.map(x => x.toUpperCase()); return u.length > 1 ? `${u.slice(0, -1).join(', ')} and ${u[u.length - 1]}` : u[0]; };

// useDocuments — the state and rules behind the pattern. Pass the returned controller to the components below.
// Options: documents / defaultDocuments / onDocumentsChange (rows: { id, name, date (Date or "Jan 15, 2026"), size, status done|uploading|error, file }),
// editable (default true; false = read-only: no upload, no drop, no more menu — Download only), formats (default PDF DOCX XLSX PPTX TXT CSV),
// maxSize (bytes, default 25 MB — inferred), uploadMs (simulated upload time, default 1200), shouldFail(file) → true simulates a network failure,
// required (Cooper context required: progress bar until coverage 100), coverage (0–100; default 25 per usable document — inferred),
// onOpen(doc) (default: opens the file in a new window), onDownload(doc), onRemove(doc), searchThreshold (default 10).
// Returns: { docs, count, uploading, editable, required, coverage, open, setOpen, addFiles, remove, retry, openDoc, download,
//   feedback, dismiss, dragItems, dragSource(file), failNext / setFailNext, searchThreshold, formats, maxSize }.
function useDocuments({ documents, defaultDocuments = [], onDocumentsChange, editable = true, formats = DOC_FORMATS, maxSize = 25 * 1048576,
  uploadMs = 1200, shouldFail, required = false, coverage, onOpen, onDownload, onRemove, searchThreshold = 10 } = {}) {
  const [docs, setDocsRaw] = useCtl(documents, () => defaultDocuments.map(d => ({ status: 'done', id: d.id || newId(), ...d })), onDocumentsChange);
  const docsRef = React.useRef(docs); docsRef.current = docs;
  const setDocs = React.useCallback(fn => { const next = typeof fn === 'function' ? fn(docsRef.current) : fn; docsRef.current = next; setDocsRaw(next); }, [setDocsRaw]);
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState([]);
  const [dragItems, setDragItems] = React.useState(null);
  const [failNext, setFailNext] = React.useState(false);
  const failRef = React.useRef(false); failRef.current = failNext;
  const timers = React.useRef(new Set());
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => { const h = setTimeout(() => { timers.current.delete(h); fn(); }, ms); timers.current.add(h); };

  const sorted = React.useMemo(() => [...docs].sort((a, b) => time(b.date) - time(a.date)), [docs]);
  const count = docs.filter(d => d.status === 'done').length;
  const uploading = docs.some(d => d.status === 'uploading');
  const cov = coverage != null ? coverage : Math.min(100, count * 25);

  const push = item => setFeedback(f => [...f, { id: newId(), ...item }]);
  const dismiss = id => setFeedback(f => f.filter(x => x.id !== id));

  const send = (ids, fail) => {
    later(() => {
      const failing = new Set(fail);
      setDocs(ds => ds.map(d => (ids.includes(d.id) ? { ...d, status: failing.has(d.id) ? 'error' : 'done' } : d)));
      if (fail.length < ids.length) setOpen(true); // Figma "Uploaded": the list opens with the new file on top
    }, uploadMs);
  };

  const addFiles = React.useCallback(list => {
    if (!editable) return;
    const files = Array.from(list || []);
    if (!files.length) return;
    const ok = [], bad = [];
    files.forEach(f => {
      if (!formats.includes(ext(f.name))) bad.push({ name: f.name, why: `Unsupported format — supported formats are ${listFormats(formats)}.` , kind: 'format' });
      else if (f.size > maxSize) bad.push({ name: f.name, why: `The file is ${fmtSize(f.size)}, the limit is ${fmtSize(maxSize)}.`, kind: 'size' });
      else ok.push(f);
    });
    if (bad.length) {
      if (files.length === 1) {
        const b = bad[0];
        push({ kind: 'alert', title: `Can't add "${b.name}"`, body: b.kind === 'format' ? `Supported formats are ${listFormats(formats)}.` : b.why });
      } else {
        push({ kind: 'alert', title: `${ok.length} of ${files.length} files added`,
          body: `${bad.length} ${bad.length === 1 ? 'file was' : 'files were'} skipped — unsupported format or too large.`, details: bad });
      }
    }
    if (!ok.length) return;
    const now = Date.now();
    const rows = ok.map((f, i) => ({ id: newId(), name: f.name, size: f.size, date: new Date(now + i), status: 'uploading', file: f instanceof File ? f : undefined }));
    let fail = [];
    if (failRef.current) { fail = rows.map(r => r.id); setFailNext(false); }
    else if (shouldFail) fail = rows.filter((r, i) => shouldFail(ok[i])).map(r => r.id);
    setDocs(ds => [...rows, ...ds]);
    send(rows.map(r => r.id), fail);
  }, [editable, formats, maxSize, shouldFail, uploadMs]);

  const remove = React.useCallback(doc => {
    const idx = docsRef.current.findIndex(d => d.id === doc.id);
    if (idx < 0) return;
    setDocs(ds => ds.filter(d => d.id !== doc.id));
    onRemove && onRemove(doc);
    push({ kind: 'snackbar', title: 'The document has been removed', undo: () => setDocs(ds => { const n = [...ds]; n.splice(Math.min(idx, n.length), 0, doc); return n; }) });
  }, [onRemove]);

  const retry = React.useCallback(doc => {
    setDocs(ds => ds.map(d => (d.id === doc.id ? { ...d, status: 'uploading' } : d)));
    send([doc.id], failRef.current ? (setFailNext(false), [doc.id]) : []);
  }, [uploadMs]);

  const openDoc = React.useCallback(doc => {
    if (onOpen) return onOpen(doc);
    if (doc.file) { window.open(URL.createObjectURL(doc.file), '_blank', 'noopener'); return; }
    const w = window.open('', '_blank');
    if (w) { w.document.title = doc.name; w.document.body.style.cssText = 'font:14px system-ui;padding:24px;background:#111;color:#eee'; w.document.body.textContent = `Preview of ${doc.name}`; }
  }, [onOpen]);

  const download = React.useCallback(doc => {
    if (onDownload) return onDownload(doc);
    if (!doc.file) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(doc.file); a.download = doc.name; a.click();
  }, [onDownload]);

  const dragSource = file => ({
    draggable: true,
    onDragStart: e => {
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('application/x-ifs-documents', file.name);
      const img = new Image(); img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACw='; e.dataTransfer.setDragImage(img, 0, 0);
      setDragItems(Array.isArray(file) ? file : [file]);
    },
    onDragEnd: () => setDragItems(null),
  });

  return { docs: sorted, count, uploading, editable, required, coverage: cov, open, setOpen, addFiles, remove, retry, openDoc, download,
    feedback, dismiss, dragItems, setDragItems, dragSource, failNext, setFailNext, searchThreshold, formats, maxSize };
}

// Pattern: DocumentRow — one document in the list: FileCard (middle-truncated name with tooltip) + a ⋮ Menu or a Download button.
// Props: doc { name, date, status done|uploading|error }, editable (more menu with Download / Remove; false = Download icon only),
// onOpen (click / Enter: preview in a separate window), onDownload, onRemove, onRetry (error row: "Try again"),
// state hover|menu (forced, gallery).
function DocumentRow({ doc, editable = true, onOpen, onDownload, onRemove, onRetry, state, className, ...rest }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  if (doc.status === 'uploading') return <IFS.FileCard loading aria-label={`Uploading ${doc.name}`} />;
  const call = fn => () => fn && fn(doc);
  if (doc.status === 'error') {
    return (
      <IFS.FileCard name={doc.name} date={fmtDate(doc.date)} error className={cx('ifs-doc-row', className)} {...rest}
        actions={<>
          {editable && <IFS.Tooltip content="Remove"><IFS.IconButton type="ghost" size="s" icon="system-trash-delete" label="Remove" onClick={call(onRemove)} /></IFS.Tooltip>}
          <IFS.Tooltip content="Try again"><IFS.IconButton type="ghost" size="s" icon="arrow-refresh" label="Try again" onClick={call(onRetry)} /></IFS.Tooltip>
        </>} />
    );
  }
  const active = menuOpen || state === 'menu';
  return (
    <IFS.FileCard name={doc.name} date={fmtDate(doc.date)} onClick={() => onOpen && onOpen(doc)} active={active}
      state={state === 'hover' ? 'hover' : undefined} aria-label={`${doc.name}, ${fmtDate(doc.date)}`} className={cx('ifs-doc-row', className)} {...rest}
      actions={editable
        ? <IFS.Menu open={menuOpen} onOpenChange={setMenuOpen} width={160} label="More actions"
            items={[{ label: 'Download', icon: 'system-download', onClick: call(onDownload) }, { divider: true }, { label: 'Remove', icon: 'system-trash-delete', onClick: call(onRemove) }]}
            trigger={<IFS.IconButton type="ghost" size="s" icon="system-dots-vertical" label="More actions" data-state={state === 'menu' ? 'pressed' : undefined} />} />
        : <IFS.Tooltip content="Download"><IFS.IconButton type="ghost" size="s" icon="system-download" label="Download" onClick={call(onDownload)} /></IFS.Tooltip>} />
  );
}

// Pattern: DocumentsPopover — popover-organism titled "Documents" with the counter, the rows (newest first),
// search from `searchThreshold` (10) documents, "No results found", max height 360 then scroll.
// Props: documents (rows), count (usable documents; default = done rows), editable, onClose, onOpen, onDownload, onRemove, onRetry,
// searchThreshold, defaultQuery, width (300), className, style.
function DocumentsPopover({ documents = [], count, editable = true, onClose, onOpen, onDownload, onRemove, onRetry, searchThreshold = 10, defaultQuery = '',
  width = 300, className, style }) {
  const [q, setQ] = React.useState(defaultQuery);
  const searchable = documents.length >= searchThreshold;
  const query = searchable ? q.trim().toLowerCase() : '';
  const shown = query ? documents.filter(d => d.name.toLowerCase().includes(query)) : documents;
  const n = count != null ? count : documents.filter(d => d.status !== 'error' && d.status !== 'uploading').length;
  return (
    <IFS.Popover inline open onOpenChange={o => { if (!o && onClose) onClose(); }} title="Documents" count={shown.length ? n : undefined}
      search={searchable ? 'Search for...' : undefined} onSearch={setQ} width={width} className={cx('ifs-docs-popover', className)} style={style}>
      {shown.length === 0
        ? <div className="ifs-docs-popover__empty" role="status">{query ? 'No results found' : 'No documents'}</div>
        : shown.map(d => <DocumentRow key={d.id || d.name} doc={d} editable={editable} onOpen={onOpen} onDownload={onDownload} onRemove={onRemove} onRetry={onRetry} />)}
    </IFS.Popover>
  );
}

// Pattern: DocumentsContext — the left side of the value bottom sheet: "Cooper's Context", the progress bar (required context,
// until 100 %), the documents button ("1 Document" / "N Documents"; hidden at 0; spinner while uploading), the Upload icon-button
// (editable only) and the popover 4px above the bar (portalled, fixed). Pass it as BottomSheet `left`.
// Props: controller (useDocuments()), popoverOffset (px from the bar's left edge, default 12), title (default "Cooper's Context").
function DocumentsContext({ controller: c, popoverOffset = 12, title = "Cooper's Context", className }) {
  const input = React.useRef(null);
  const root = React.useRef(null);
  const pop = React.useRef(null);
  const [pos, setPos] = React.useState(null);
  // The popover is portalled (fixed) so the bar's backdrop blur doesn't clip its own blur; it sits 4px above the bar.
  React.useLayoutEffect(() => {
    if (!c.open) { setPos(null); return; }
    const place = () => {
      const bar = root.current && (root.current.closest('.ifs-bottom-sheet') || root.current);
      if (!bar) return;
      const r = bar.getBoundingClientRect();
      setPos({ left: r.left + popoverOffset, bottom: window.innerHeight - r.top + 4 });
    };
    place();
    window.addEventListener('resize', place); window.addEventListener('scroll', place, true);
    return () => { window.removeEventListener('resize', place); window.removeEventListener('scroll', place, true); };
  }, [c.open, popoverOffset]);
  React.useEffect(() => {
    if (!c.open) return;
    const down = e => {
      const t = e.target;
      if ((root.current && root.current.contains(t)) || (pop.current && pop.current.contains(t))) return;
      if (t.closest && t.closest('.ifs-floating, .ifs-docs-feedback, .ifs-modal, .ifs-tooltip')) return;
      c.setOpen(false);
    };
    const key = e => { if (e.key === 'Escape' && !e.defaultPrevented) c.setOpen(false); };
    document.addEventListener('mousedown', down); document.addEventListener('keydown', key);
    return () => { document.removeEventListener('mousedown', down); document.removeEventListener('keydown', key); };
  }, [c.open]);
  const showBar = c.required && c.coverage < 100;
  const hasRows = c.docs.length > 0;
  return (
    <div ref={root} className={cx('ifs-bottom-sheet__left', 'ifs-docs-context', className)}>
      <div className="ifs-bottom-sheet__context">
        <span className="ifs-bottom-sheet__context-title">{title}</span>
        {showBar && (
          <div className="ifs-coverage">
            <IFS.ProgressBar value={c.coverage} label="Cooper's context coverage" />
            <span className="ifs-coverage__value">{Math.round(c.coverage)}%</span>
          </div>
        )}
      </div>
      <div className="ifs-bottom-sheet__buttons">
        {hasRows && (
          <IFS.Button type="tertiary" iconLeft={c.uploading ? 'system-loader' : 'system-file'} className={c.uploading ? 'ifs-docs-context__loading' : undefined}
            aria-expanded={c.open} aria-haspopup="dialog" onClick={() => c.setOpen(!c.open)}>{docLabel(c.count)}</IFS.Button>
        )}
        {c.editable && <>
          <IFS.Tooltip content="Upload documents"><IFS.IconButton type="tertiary" icon="system-upload" label="Upload documents" onClick={() => input.current && input.current.click()} /></IFS.Tooltip>
          <input ref={input} className="ifs-docs-context__file" type="file" multiple tabIndex={-1} aria-hidden="true"
            accept={c.formats.map(f => `.${f}`).join(',')} onChange={e => { c.addFiles(e.target.files); e.target.value = ''; }} />
        </>}
      </div>
      {c.open && hasRows && pos && createPortal(
        <div ref={pop} className="ifs-docs-context__pop" style={pos}>
          <DocumentsPopover documents={c.docs} count={c.count} editable={c.editable} searchThreshold={c.searchThreshold} onClose={() => c.setOpen(false)}
            onOpen={c.openDoc} onDownload={c.download} onRemove={c.remove} onRetry={c.retry} />
        </div>, document.body)}
    </div>
  );
}

// Pattern: DocumentsDropArea — wraps the content region. While files are dragged over it (editable only) it shows the purple dashed
// overlay (kit DropZone = move-and-drop-background / change-position-overlay) and, for in-app drags started with controller.dragSource(file),
// node-card Type=Document ghosts at the cursor. Drop = upload. Read-only records ignore drops.
// Props: controller, children, className, style.
function DocumentsDropArea({ controller: c, children, className, style, ...rest }) {
  const [over, setOver] = React.useState(false);
  const [pt, setPt] = React.useState(null);
  const depth = React.useRef(0);
  const ref = React.useRef(null);
  const isFiles = e => { const t = e.dataTransfer && e.dataTransfer.types; return !!t && ([...t].includes('Files') || [...t].includes('application/x-ifs-documents')); };
  const handlers = {
    onDragEnter: e => { if (!isFiles(e)) return; e.preventDefault(); depth.current++; if (c.editable) setOver(true); },
    onDragOver: e => {
      if (!isFiles(e)) return; e.preventDefault();
      e.dataTransfer.dropEffect = c.editable ? 'copy' : 'none';
      if (c.editable && ref.current) { const r = ref.current.getBoundingClientRect(); setPt({ x: e.clientX - r.left, y: e.clientY - r.top }); }
    },
    onDragLeave: e => { if (!isFiles(e)) return; depth.current = Math.max(0, depth.current - 1); if (!depth.current) setOver(false); },
    onDrop: e => {
      if (!isFiles(e)) return; e.preventDefault(); depth.current = 0; setOver(false);
      if (!c.editable) return;
      if (c.dragItems) { c.addFiles(c.dragItems); c.setDragItems(null); } else c.addFiles(e.dataTransfer.files);
    },
  };
  return (
    <div ref={ref} className={cx('ifs-docs-drop', className)} style={style} {...handlers} {...rest}>
      {children}
      {over && <IFS.DropZone className="ifs-docs-drop__overlay" aria-hidden="true" />}
      {over && pt && c.dragItems && (
        <div className="ifs-docs-drop__ghosts" style={{ left: pt.x - 72, top: pt.y - 48 }} aria-hidden="true">
          {c.dragItems.slice(0, 6).map(f => <IFS.NodeCard key={f.name} type="document" title={f.name.replace(/\.[^.]+$/, '')} caption={ext(f.name).toUpperCase()} stackIcons={false} />)}
        </div>
      )}
    </div>
  );
}

// Pattern: DocumentsFeedback — top-right stack under the page header (place it inside the screen, which must be position:relative).
// Errors = alert-organism Type=Error with the error icon; they don't auto-dismiss and close on ✕ or on the user's next action.
// "Several files, some rejected" adds "See details" (a modal listing each rejected file and why).
// Removal = snackbar-organism "The document has been removed" + Undo: 4 s, paused on hover/focus, ✕ dismisses.
// Props: controller, top (px, default 88 = under nav bar + page header).
function DocumentsFeedback({ controller: c, top }) {
  const ref = React.useRef(null);
  const [details, setDetails] = React.useState(null);
  const alerts = c.feedback.filter(f => f.kind === 'alert');
  React.useEffect(() => {
    if (!alerts.length) return;
    let armed = false;
    const t = setTimeout(() => { armed = true; }, 0);
    const next = e => {
      if (!armed || (ref.current && ref.current.contains(e.target)) || (e.target.closest && e.target.closest('.ifs-modal'))) return;
      alerts.forEach(a => c.dismiss(a.id));
    };
    document.addEventListener('pointerdown', next, true); document.addEventListener('keydown', next, true);
    return () => { clearTimeout(t); document.removeEventListener('pointerdown', next, true); document.removeEventListener('keydown', next, true); };
  }, [alerts.map(a => a.id).join()]);
  return <>
    <div ref={ref} className="ifs-docs-feedback" style={top != null ? { '--docs-feedback-top': `${top}px` } : undefined} aria-live="polite">
      {c.feedback.map(f => f.kind === 'alert'
        ? <IFS.Alert key={f.id} type="error" showIcon title={f.title} onClose={() => c.dismiss(f.id)}
            action={f.details ? 'See details' : undefined} onAction={() => { setDetails(f.details); c.dismiss(f.id); }}>{f.body}</IFS.Alert>
        : <DocSnackbar key={f.id} item={f} onDone={() => c.dismiss(f.id)} />)}
    </div>
    {details && (
      <IFS.Modal open onOpenChange={o => !o && setDetails(null)} title="Skipped files" width={420}
        primaryAction={{ label: 'Close', onClick: () => setDetails(null) }}>
        <ul className="ifs-docs-details">{details.map(d => <li key={d.name}><span className="ifs-docs-details__name">{d.name}</span><span className="ifs-docs-details__why">{d.why}</span></li>)}</ul>
      </IFS.Modal>
    )}
  </>;
}
function DocSnackbar({ item, onDone, duration = 4000 }) {
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => { if (paused) return; const h = setTimeout(onDone, duration); return () => clearTimeout(h); }, [paused]);
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <IFS.Snackbar title={item.title} onClose={onDone}
        secondaryAction={item.undo ? { label: 'Undo', iconLeft: 'arrow-back-up', onClick: () => { item.undo(); onDone(); } } : undefined} />
    </div>
  );
}

Object.assign(IFS, { MapPinDot, MapPinDefect, MapPinFlow, MapPinPole, BarChartItem, VerticalBarChartItem,
  useDocuments, DocumentRow, DocumentsPopover, DocumentsContext, DocumentsDropArea, DocumentsFeedback });
export { MapPinDot, MapPinDefect, MapPinFlow, MapPinPole, BarChartItem, VerticalBarChartItem,
  useDocuments, DocumentRow, DocumentsPopover, DocumentsContext, DocumentsDropArea, DocumentsFeedback };
