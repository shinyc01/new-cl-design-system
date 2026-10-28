import React from 'react';
import { IFS } from './registry.js';

const { useState, useEffect, useRef } = React;

function useStatesControlled(value, defaultValue, onChange) {
  const [inner, setInner] = useState(defaultValue);
  const controlled = value !== undefined;
  const v = controlled ? value : inner;
  const set = next => { if (!controlled) setInner(next); onChange && onChange(next); };
  return [v, set];
}

// Media disc used by the empty state and the spinner (Figma layer "avatarBase", 40px).
function StateMedia({ icon, tone = 'neutral', spin, className }) {
  return (
    <span aria-hidden="true" className={IFS.cx('ifs-state-media', tone !== 'neutral' && `ifs-state-media--${tone}`, className)}>
      <IFS.Icon name={icon} size={16} className={spin ? 'ifs-spin' : undefined} />
    </span>
  );
}

// Figma: empty-state-organism (3782:18464)
// Figma has no cause/size variants (one placeholder axis "Size=Frame 2147228119" + six booleans); the canvas notes define
// the causes and two sizes, so they are props here. Each cause sets the defaults Figma draws for it; any part can be overridden.
// Props: cause first-run|empty-container|all-done|error|no-access|no-results-similar|no-results (notes' "When" column),
// size section|full (Section = inside a card/panel, hugs; Full = page/main region, fills and centres),
// heading (required), body, icon (media icon name; null hides media = show-media-icon), tone neutral|success|warning,
// suggestions (array of labels → chips = show-suggestion-chips), onSuggestion(label),
// primaryAction / secondaryAction = { label, icon, onClick, type } (show-primary-button / show-tertiary-button; secondary is Tertiary).
const EMPTY_CAUSES = {
  'first-run':          { icon: 'system-plus', tone: 'neutral', action: { icon: 'system-plus' } },
  'empty-container':    { icon: 'node', tone: 'neutral', action: { icon: 'system-pencil-plus' } },
  'all-done':           { icon: 'status-success-filled', tone: 'success' },
  'error':              { icon: 'status-warning-filled', tone: 'warning', action: { icon: 'arrow-refresh', label: 'Retry' } },
  'no-access':          { icon: 'lock', tone: 'neutral', action: { label: 'Request access' } },
  'no-results-similar': { icon: null },
  'no-results':         { icon: null, action: { type: 'secondary', label: 'Clear filters' } },
};

function EmptyState({ cause = 'first-run', size = 'section', heading, body, icon, tone, suggestions, onSuggestion,
  primaryAction, secondaryAction, className, ...rest }) {
  const preset = EMPTY_CAUSES[cause] || EMPTY_CAUSES['first-run'];
  const mediaIcon = icon !== undefined ? icon : preset.icon;
  const mediaTone = tone || preset.tone || 'neutral';
  const primary = primaryAction && { ...(preset.action || {}), ...primaryAction };
  const hasButtons = primary || secondaryAction;
  return (
    <div role={cause === 'error' ? 'alert' : 'status'} className={IFS.cx('ifs-empty', `ifs-empty--${size}`, className)} {...rest}>
      {mediaIcon && <StateMedia icon={mediaIcon} tone={mediaTone} />}
      <h3 className="ifs-empty__heading">{heading}</h3>
      {(body || (suggestions && suggestions.length > 0)) && (
        <div className="ifs-empty__text">
          {body && <p className="ifs-empty__body">{body}</p>}
          {suggestions && suggestions.length > 0 && (
            <div className="ifs-empty__chips">
              {suggestions.map(s => <IFS.Chip key={s} selected={false} onClick={e => { e.preventDefault(); onSuggestion && onSuggestion(s); }}>{s}</IFS.Chip>)}
            </div>
          )}
        </div>
      )}
      {hasButtons && (
        <div className="ifs-empty__actions">
          {secondaryAction && <IFS.Button type={secondaryAction.type || 'tertiary'} iconLeft={secondaryAction.icon} onClick={secondaryAction.onClick}>{secondaryAction.label}</IFS.Button>}
          {primary && <IFS.Button type={primary.type || 'primary'} iconLeft={primary.icon} onClick={primary.onClick}>{primary.label}</IFS.Button>}
        </div>
      )}
    </div>
  );
}

// Figma: empty-state-spinner-molecule (3782:24081)
// Indeterminate or shapeless wait where no layout can be previewed. Props: text (Figma "Loading..."), showText (show-text).
function Spinner({ text = 'Loading...', showText = true, className, ...rest }) {
  return (
    <div role="status" aria-live="polite" className={IFS.cx('ifs-spinner', className)} {...rest}>
      <StateMedia icon="system-loader" spin />
      {showText ? <span className="ifs-spinner__text">{text}</span> : <span className="ifs-sr-only">{text}</span>}
    </div>
  );
}

// Figma: empty-state-loading-more-molecule (3782:24082) — appending items to a list that is already visible.
function LoadingMore({ children = 'Loading more…', className, ...rest }) {
  return (
    <div role="status" aria-live="polite" className={IFS.cx('ifs-loading-more', className)} {...rest}>
      <IFS.Icon name="system-loader" size={16} className="ifs-spin" />
      <span>{children}</span>
    </div>
  );
}

// Figma: progress-bar-loading (5530:11867) = progress-bar-molecule + percentage. Measurable work (uploads, steps).
// Props: value 0–100, label (accessible name).
function ProgressLoading({ value = 0, label = 'Loading', className, ...rest }) {
  const v = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
  return (
    <div className={IFS.cx('ifs-progress-loading', className)} {...rest}>
      <IFS.ProgressBar value={v} label={label} />
      <span className="ifs-progress-loading__value" aria-hidden="true">{v}%</span>
    </div>
  );
}

// Skeleton block — not a Figma component. Content States › Skeleton defines skeletons as blank shapes built inside the
// component that owns the async data (stat card, content card, table cells already have Figma Loading variants: use those).
// Use this only to compose a skeleton for an owning component that has no Loading variant.
// Props: width, height, shape bar|circle|block. Always aria-hidden, never focusable, never contains text.
function Skeleton({ width = '100%', height = 16, shape = 'bar', className, style }) {
  return <span aria-hidden="true" className={IFS.cx('ifs-sk', shape !== 'bar' && `ifs-sk--${shape}`, className)} style={{ width, height, ...style }} />;
}

// Loading wrapper for the component that owns async data (Skeleton notes, rules 7–9).
// Props: loading, skeleton (node shown while loading — a Loading variant or Skeleton blocks; omit for an unknown shape → Spinner),
// delay (ms before the skeleton shows; fast loads never flash, default 300), minDuration (ms it stays once shown, default 300),
// label (announced "Loading <label>" / "Loaded"), children = loaded content (or the empty state — decided by the caller after loading).
function LoadingRegion({ loading, skeleton, delay = 300, minDuration = 300, label = '', children, className, ...rest }) {
  const [visible, setVisible] = useState(false);
  const [announce, setAnnounce] = useState('');
  const shownAt = useRef(0), was = useRef(false);
  useEffect(() => {
    let t;
    if (loading) {
      t = setTimeout(() => { shownAt.current = Date.now(); setVisible(true); setAnnounce(`Loading${label ? ' ' + label : ''}`); }, delay);
      was.current = true;
    } else if (visible) {
      t = setTimeout(() => { setVisible(false); setAnnounce('Loaded'); }, Math.max(0, minDuration - (Date.now() - shownAt.current)));
    } else if (was.current) setAnnounce('Loaded');
    return () => clearTimeout(t);
  }, [loading]);
  const busy = loading || visible;
  return (
    <div aria-busy={busy || undefined} className={IFS.cx('ifs-loading-region', className)} {...rest}>
      <span className="ifs-sr-only" aria-live="polite">{announce}</span>
      {visible ? (skeleton || <Spinner />) : (busy ? null : children)}
    </div>
  );
}

// Figma: FTA button (67:4758) — the Cooper FAB.
// Props: stroke (Figma Stroke: true = 48px glass ring for non-black surfaces; false = bare 32px sphere for black footers/bottom sheets),
// indicator (Show indicator), label (tooltip + accessible name, Figma tooltip "{label}" with hotkey "/"), hotkey, state hover|pressed|focus (gallery),
// disabled, onClick. The FAB hides while Cooper chat is open (one entry point).
function FtaButton({ stroke = true, indicator = true, label = 'Cooper', hotkey = '/', tooltip = true, state, className, ...rest }) {
  const btn = (
    <button type="button" aria-label={label} data-state={state}
      className={IFS.cx('ifs-fta', stroke && 'ifs-fta--stroke', className)} {...rest}>
      <span className="ifs-fta__orb">
        <IFS.Icon name="cooper-visual-icon" variant="sphere" size={32} className="ifs-fta__sphere" />
        <IFS.Icon name="cooper-system-icon" variant="Default" size={16} className="ifs-fta__mark" />
        {indicator && <IFS.StatusIndicator state="cooper" stroke className="ifs-fta__dot" />}
      </span>
    </button>
  );
  return tooltip && !rest.disabled ? <IFS.Tooltip content={label} hotkey={hotkey} type="bottom" arrow="right">{btn}</IFS.Tooltip> : btn;
}

// Figma: prompt-button (67:2937) — quick Cooper prompt next to the FAB.
// Props: size l|m, children = Prompt label, state hover|pressed|focus (gallery), disabled, onClick.
function PromptButton({ size = 'm', state, children, className, ...rest }) {
  return (
    <button type="button" data-state={state} className={IFS.cx('ifs-prompt', `ifs-prompt--${size}`, className)} {...rest}>{children}</button>
  );
}

// Figma: cooper-chip-atom (3501:23480) — in-context marker where Cooper has a recommendation; click opens it.
// Props: children (default "1 Recommendation"), selected/defaultSelected/onChange (Figma State=Selected while its recommendation is open),
// disabled, state hover|focus (gallery), onClick.
function CooperChip({ children = '1 Recommendation', selected, defaultSelected = false, onChange, state, className, onClick, ...rest }) {
  const [sel, setSel] = useStatesControlled(selected, defaultSelected, onChange);
  return (
    <button type="button" aria-pressed={sel} data-state={state}
      className={IFS.cx('ifs-cooper-chip', sel && 'is-selected', className)}
      onClick={e => { onClick && onClick(e); if (!e.defaultPrevented) setSel(!sel); }} {...rest}>
      <IFS.Icon name="cooper-system-icon" variant="Insight" size={12} />
      <span className="ifs-cooper-chip__label">{children}</span>
    </button>
  );
}

// zoom-slider-atom (3275:483), used in the Explore bottom sheet. value 0–100 (Figma "%"), keyboard ←/→.
function ZoomSlider({ value, defaultValue = 20, onChange, label = 'Zoom', className }) {
  const [v, setV] = useStatesControlled(value, defaultValue, onChange);
  const ticks = 20, cur = Math.round((v / 100) * (ticks - 1));
  const ref = useRef(null);
  const fromX = x => { const r = ref.current.getBoundingClientRect(); setV(Math.round(Math.max(0, Math.min(1, (x - r.left - 2) / (r.width - 4))) * 100)); };
  return (
    <span ref={ref} role="slider" tabIndex={0} aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={v}
      className={IFS.cx('ifs-zoom', className)} onClick={e => fromX(e.clientX)}
      onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setV(Math.min(100, v + 5)); } if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setV(Math.max(0, v - 5)); } }}>
      {Array.from({ length: ticks }, (_, i) => <span key={i} className={IFS.cx('ifs-zoom__tick', i === cur && 'is-current', i > cur && 'is-after')} />)}
      <span className="ifs-zoom__marker" style={{ left: 2 + cur * 4 }} />
    </span>
  );
}

const DEFAULT_MAP_FIELDS = [
  { key: 'region', label: 'Region', options: ['North', 'South', 'East', 'West'] },
  { key: 'center', label: 'Center', options: ['Depot A', 'Depot B'] },
  { key: 'scale', label: 'Scale', options: ['1:5k', '1:25k', '1:100k'], zoom: true },
  { key: 'domain', label: 'Domain', options: ['Water', 'Power', 'Gas'] },
];
const DEFAULT_MAP_TOOLS = [
  { icon: 'map-compass', label: 'Reset bearing' },
  { icon: 'map-location', label: 'My location' },
  { icon: 'system-world-web', label: 'Globe view' },
];

// Figma: base-bottom-sheet-organism (4406:25590), value-bottom-sheet-organism (789:37502), explore-bottom-sheet (72:4676)
// The Cooper entry point at the bottom of the content area, 40px tall, full width. Place it in AppShell's `bottom` slot.
// Props (all types): type base|value|explore (base = any tab; value = Value tab; explore = Explore tab),
// prompts (labels → PromptButton M; Figma shows two), onPrompt(label), showPrompts (default true), showCooper (show-cooper, default true),
// onCooper (FAB click), cooperIndicator (FAB Show indicator; Figma sheets turn it off).
// type="value": inProgress (Figma In progress: shows the coverage bar), coverage 0–100, cooperContext (cooper-context, default true),
//   documents = { label, icon, onClick } (show-documents-button, tertiary M), onUpload (show-upload-button; omit on an Active framework = read-only).
// type="explore": fields [{ key, label, options, value, zoom }], values/onFieldChange(key, value), zoom/onZoomChange, lastSync,
//   tools [{ icon, label, onClick }] (ghost S icon buttons). `left` replaces the whole left side for any type.
// Narrow widths (e.g. 600px): the left side shrinks first (coverage bar, then the map fields scroll sideways), then the
// prompts scroll sideways; the FAB, buttons and map tools never get cut.
function BottomSheet({ type = 'base', prompts = [], onPrompt, showPrompts = true, showCooper = true, onCooper, cooperIndicator = false,
  inProgress = false, coverage = 0, cooperContext = true, documents, onUpload,
  fields = DEFAULT_MAP_FIELDS, values, onFieldChange, zoom, defaultZoom = 20, onZoomChange, lastSync = '{label}', tools = DEFAULT_MAP_TOOLS,
  left, className, ...rest }) {
  let leftSide = left;
  if (leftSide === undefined && type === 'value' && cooperContext) {
    leftSide = (
      <div className="ifs-bottom-sheet__left">
        <div className="ifs-bottom-sheet__context">
          <span className="ifs-bottom-sheet__context-title">Cooper's Context</span>
          {inProgress && (
            <div className="ifs-coverage">
              <IFS.ProgressBar value={coverage} label="Cooper's context coverage" />
              <span className="ifs-coverage__value">{Math.round(coverage)}%</span>
            </div>
          )}
        </div>
        <div className="ifs-bottom-sheet__buttons">
          {documents && <IFS.Button type="tertiary" iconLeft={documents.icon === undefined ? 'system-file' : documents.icon} onClick={documents.onClick}>{documents.label}</IFS.Button>}
          {onUpload && <IFS.Tooltip content="Upload documents"><IFS.IconButton type="tertiary" icon="system-upload" label="Upload documents" onClick={onUpload} /></IFS.Tooltip>}
        </div>
      </div>
    );
  }
  if (leftSide === undefined && type === 'explore') {
    leftSide = (
      <div className="ifs-bottom-sheet__map">
        <div className="ifs-bottom-sheet__fields ifs-bottom-sheet__scroller">
        {fields.map(f => (
          <div key={f.key} className="ifs-map-field">
            <span className="ifs-map-field__label">{f.label}</span>
            <div className="ifs-map-field__row">
              <IFS.Select size="s" listPosition="up" aria-label={f.label} options={f.options || []} placeholder="{label}"
                value={values ? (values[f.key] ?? null) : undefined} defaultValue={f.value ?? null}
                onChange={v => onFieldChange && onFieldChange(f.key, v)} />
              {f.zoom && <ZoomSlider value={zoom} defaultValue={defaultZoom} onChange={onZoomChange} />}
            </div>
          </div>
        ))}
        <div className="ifs-map-field">
          <span className="ifs-map-field__label">Last sync</span>
          <div className="ifs-map-field__row"><span className="ifs-map-field__value">{lastSync}</span></div>
        </div>
        </div>
        <span className="ifs-bottom-sheet__divider" aria-hidden="true" />
        <div className="ifs-bottom-sheet__tools">
          {tools.map(t => <IFS.Tooltip key={t.icon} content={t.label}><IFS.IconButton size="s" icon={t.icon} label={t.label} onClick={t.onClick} /></IFS.Tooltip>)}
        </div>
      </div>
    );
  }
  return (
    <div role="region" aria-label="Cooper" className={IFS.cx('ifs-bottom-sheet', `ifs-bottom-sheet--${type}`, className)} {...rest}>
      {leftSide}
      {showCooper && (
        <div className="ifs-bottom-sheet__agent">
          {showPrompts && prompts.length > 0 && (
            <div className="ifs-bottom-sheet__prompts ifs-bottom-sheet__scroller">
              {prompts.map(p => <PromptButton key={p} size="m" onClick={() => onPrompt && onPrompt(p)}>{p}</PromptButton>)}
            </div>
          )}
          <FtaButton stroke={false} indicator={cooperIndicator} onClick={onCooper} />
        </div>
      )}
    </div>
  );
}

Object.assign(IFS, { EmptyState, Spinner, LoadingMore, ProgressLoading, Skeleton, LoadingRegion, FtaButton, PromptButton, CooperChip, ZoomSlider, BottomSheet });
export { EmptyState, Spinner, LoadingMore, ProgressLoading, Skeleton, LoadingRegion, FtaButton, PromptButton, CooperChip, ZoomSlider, BottomSheet };
