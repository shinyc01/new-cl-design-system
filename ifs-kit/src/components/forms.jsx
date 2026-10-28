import React from 'react';
import { IFS } from './registry.js';
// Form controls. All value callbacks get the new value first: onChange(value, event).
// Every component works uncontrolled (defaultValue / defaultChecked) or controlled (value / checked + onChange).

// Controlled-or-uncontrolled state helper (forms family only).
function useFormsValue(value, defaultValue, onChange) {
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : inner;
  const set = (v, e) => { if (!controlled) setInner(v); onChange && onChange(v, e); };
  return [current, set];
}

// Shared shell for TextField and TextArea: title row (label + hint icon), control, description.
function FormsFieldShell({ kind, size, label, hint, description, error, disabled, cooper, state, id, className, style, children }) {
  const msg = typeof error === 'string' ? error : description;
  return (
    <div data-state={state} style={style}
      className={IFS.cx('ifs-field', `ifs-field--${kind}`, `ifs-field--${size}`, error && 'ifs-field--error', disabled && 'ifs-field--disabled', cooper && 'ifs-field--cooper', className)}>
      {(label != null || hint) && (
        <div className="ifs-field__title">
          <label className="ifs-field__label" htmlFor={id}>{label}</label>
          {hint && <span className="ifs-field__hint" title={hint} aria-label={hint} role="img"><IFS.Icon name="system-question-hint" size={16} /></span>}
        </div>
      )}
      {children}
      {msg != null && <p className="ifs-field__desc" id={`${id}-desc`}>{msg}</p>}
    </div>
  );
}

// Figma: text-field-organism (210:77559)
// Props: size l|m, label (Figma Title), hint (tooltip text → question-hint icon), placeholder, description (Hint text),
// error (true, or a string that replaces the description), disabled, iconLeft / iconRight (icon names),
// suffix (Figma textRight), cooper (Figma State=Cooper ring), generating (Cooper Generating: loader),
// value / defaultValue / onChange(value, event), state hover|focus|typing (gallery only), plus any <input> attribute.
function TextField({ size = 'l', label, hint, description, error, disabled, iconLeft, iconRight, suffix, cooper, generating,
  value, defaultValue = '', onChange, state, className, style, id, type = 'text', ...rest }) {
  const autoId = React.useId();
  const fid = id || autoId;
  const [val, setVal] = useFormsValue(value, defaultValue, onChange);
  const iconSize = size === 'm' ? 16 : 20;
  const ref = React.useRef(null);
  return (
    <FormsFieldShell kind="text" size={size} label={label} hint={hint} description={description} error={error} disabled={disabled}
      cooper={cooper || generating} state={state} id={fid} className={className} style={style}>
      <div className="ifs-field__control" onMouseDown={e => { if (e.target !== ref.current) { e.preventDefault(); ref.current && ref.current.focus(); } }}>
        {iconLeft && <IFS.Icon name={iconLeft} size={iconSize} />}
        <input ref={ref} id={fid} type={type} className="ifs-field__input" value={val} disabled={disabled}
          aria-invalid={error ? true : undefined} aria-describedby={(typeof error === 'string' || description != null) ? `${fid}-desc` : undefined}
          onChange={e => setVal(e.target.value, e)} {...rest} />
        {suffix != null && <span className="ifs-field__suffix">{suffix}</span>}
        {iconRight && <IFS.Icon name={iconRight} size={iconSize} />}
        {generating && <IFS.Icon name="system-loader" size={12} className="ifs-field__loader" title="Generating" />}
      </div>
    </FormsFieldShell>
  );
}

// Figma: text-area-organism (3024:9383)
// Props: size l (140px tall) | m (100px), label, hint, placeholder, description, error, disabled, iconLeft,
// cooper, generating, value / defaultValue / onChange(value, event), state hover|focus|typing (gallery only).
function TextArea({ size = 'l', label, hint, description, error, disabled, iconLeft, cooper, generating,
  value, defaultValue = '', onChange, state, className, style, id, ...rest }) {
  const autoId = React.useId();
  const fid = id || autoId;
  const [val, setVal] = useFormsValue(value, defaultValue, onChange);
  const ref = React.useRef(null);
  return (
    <FormsFieldShell kind="area" size={size} label={label} hint={hint} description={description} error={error} disabled={disabled}
      cooper={cooper || generating} state={state} id={fid} className={className} style={style}>
      <div className="ifs-field__control" onMouseDown={e => { if (e.target !== ref.current) { e.preventDefault(); ref.current && ref.current.focus(); } }}>
        {iconLeft && <IFS.Icon name={iconLeft} size={size === 'm' ? 16 : 20} />}
        <textarea ref={ref} id={fid} className="ifs-field__input" value={val} disabled={disabled}
          aria-invalid={error ? true : undefined} aria-describedby={(typeof error === 'string' || description != null) ? `${fid}-desc` : undefined}
          onChange={e => setVal(e.target.value, e)} {...rest} />
        {generating && <IFS.Icon name="system-loader" size={12} className="ifs-field__loader" title="Generating" />}
      </div>
    </FormsFieldShell>
  );
}

// Figma: search-regular-organism (153:63462)
// Props: placeholder (default "Search for..."), value / defaultValue / onChange(value, event), onSearch(value) on Enter,
// filter (Figma Filter boolean → filter icon button; onFilter called on click), disabled, state hover|focus (gallery only).
// A clear (×) button appears once there is text; Escape also clears.
function Search({ placeholder = 'Search for...', value, defaultValue = '', onChange, onSearch, filter, onFilter, disabled, state, className, style, ...rest }) {
  const [val, setVal] = useFormsValue(value, defaultValue, onChange);
  const ref = React.useRef(null);
  const filled = val !== '' && val != null;
  return (
    <div data-state={state} style={style}
      className={IFS.cx('ifs-search', filled && 'ifs-search--filled', (filled || filter) && 'ifs-search--has-action', disabled && 'ifs-search--disabled', className)}
      onMouseDown={e => { if (e.target === e.currentTarget) { e.preventDefault(); ref.current && ref.current.focus(); } }}>
      <IFS.Icon name="system-search" size={12} />
      <input ref={ref} type="search" role="searchbox" className="ifs-search__input" placeholder={placeholder} value={val} disabled={disabled}
        aria-label={rest['aria-label'] || placeholder}
        onChange={e => setVal(e.target.value, e)}
        onKeyDown={e => { if (e.key === 'Escape' && filled) { e.preventDefault(); setVal('', e); } if (e.key === 'Enter' && onSearch) onSearch(val); }}
        {...rest} />
      {filled && !disabled && <IFS.IconButton icon="system-close" label="Clear search" type="ghost" size="s" className="ifs-search__clear"
        onClick={e => { setVal('', e); ref.current && ref.current.focus(); }} />}
      {filter && <IFS.IconButton icon="system-filter" label="Filter" type="ghost" size="s" disabled={disabled} onClick={onFilter} />}
    </div>
  );
}

// Figma: checkbox-molecule (153:61241), using checkbox-atom (153:60798)
// Props: children = label (omit for the bare 16px atom), checked / defaultChecked / onChange(checked, event),
// indeterminate (Figma Type=Indeterminate), disabled, state hover|pressed|focus (gallery only), plus <input> attributes (name, value…).
function Checkbox({ checked, defaultChecked = false, onChange, indeterminate, disabled, children, state, className, style, ...rest }) {
  const [on, setOn] = useFormsValue(checked, defaultChecked, onChange);
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = !!indeterminate; }, [indeterminate]);
  const bare = children == null;
  const filled = on || indeterminate;
  return (
    <label data-state={state} style={style}
      className={IFS.cx('ifs-check', 'ifs-checkbox', filled && 'ifs-checkbox--on', bare && 'ifs-check--bare', disabled && 'ifs-check--disabled', className)}>
      <input ref={ref} type="checkbox" className="ifs-check__input" checked={!!on} disabled={disabled}
        aria-checked={indeterminate ? 'mixed' : undefined} onChange={e => setOn(e.target.checked, e)} {...rest} />
      <span className="ifs-check__box" aria-hidden="true">
        {indeterminate ? <IFS.Icon name="system-minus" size={12} /> : on ? <IFS.Icon name="system-check" size={12} /> : null}
      </span>
      {!bare && <span className="ifs-check__label">{children}</span>}
    </label>
  );
}

// Figma: radio-button-molecule (1387:222956), using radio-button-atom (210:113374)
// Props: children = label (omit for the bare atom), value, checked, name, disabled, onChange(value, event),
// state hover|pressed|focus (gallery only). Usually rendered by RadioGroup.
function Radio({ value, checked, defaultChecked, name, onChange, disabled, children, state, className, style, ...rest }) {
  const group = React.useContext(FormsRadioCtx);
  const isOn = group ? group.value === value : checked !== undefined ? checked : undefined;
  const bare = children == null;
  const [selfOn, setSelfOn] = React.useState(!!defaultChecked);
  const on = isOn !== undefined ? isOn : selfOn;
  const dis = disabled || (group && group.disabled);
  return (
    <label data-state={state} style={style}
      className={IFS.cx('ifs-check', 'ifs-radio', on && 'ifs-radio--on', bare && 'ifs-check--bare', dis && 'ifs-check--disabled', className)}>
      <input type="radio" className="ifs-check__input" name={group ? group.name : name} value={value} checked={on} disabled={dis}
        onChange={e => { if (group) group.set(value, e); else { setSelfOn(true); onChange && onChange(value, e); } }} {...rest} />
      <span className="ifs-check__box" aria-hidden="true"><span className="ifs-check__dot" /></span>
      {!bare && <span className="ifs-check__label">{children}</span>}
    </label>
  );
}
const FormsRadioCtx = React.createContext(null);

// Radio group (no separate Figma component; stacks radio-button-molecule rows).
// Props: options = [{ value, label, disabled }] or <Radio> children, value / defaultValue / onChange(value, event),
// name, disabled, direction vertical|horizontal, label (accessible group name).
function RadioGroup({ options, children, value, defaultValue, onChange, name, disabled, direction = 'vertical', label, className, style }) {
  const autoName = React.useId();
  const [val, setVal] = useFormsValue(value, defaultValue, onChange);
  return (
    <FormsRadioCtx.Provider value={{ value: val, set: setVal, name: name || autoName, disabled }}>
      <div role="radiogroup" aria-label={label} style={style}
        className={IFS.cx('ifs-radio-group', direction === 'horizontal' && 'ifs-radio-group--horizontal', className)}>
        {options ? options.map(o => <Radio key={o.value} value={o.value} disabled={o.disabled}>{o.label}</Radio>) : children}
      </div>
    </FormsRadioCtx.Provider>
  );
}

// Figma: switch-molecule (88:22668), using switch-atom (88:23960)
// Props: children = label (omit for the bare atom), description (Figma "Show text"), size m (24px) | s (12px)
// ("l" accepted: the atom calls 24px "L"), checked / defaultChecked / onChange(checked, event), disabled,
// state hover|pressed|focus (gallery only). Renders a <button role="switch">.
function Switch({ size = 'm', checked, defaultChecked = false, onChange, disabled, children, description, state, className, style, id, ...rest }) {
  const [on, setOn] = useFormsValue(checked, defaultChecked, onChange);
  const autoId = React.useId();
  const sid = id || autoId;
  const s = size === 's' ? 's' : 'l';
  const btn = (
    <button type="button" role="switch" id={sid} aria-checked={!!on} disabled={disabled} data-state={state}
      aria-labelledby={children != null ? `${sid}-label` : undefined}
      className={IFS.cx('ifs-switch', `ifs-switch--${s}`, children == null && className)} style={children == null ? style : undefined}
      onClick={e => setOn(!on, e)} {...rest}>
      <span className="ifs-switch__knob" />
    </button>
  );
  if (children == null) return btn;
  return (
    <label htmlFor={sid} style={style} className={IFS.cx('ifs-switch-row', `ifs-switch-row--${s}`, disabled && 'ifs-switch-row--disabled', className)}>
      <span className="ifs-switch-row__text">
        <span className="ifs-switch-row__label" id={`${sid}-label`}>{children}</span>
        {description != null && <span className="ifs-switch-row__desc">{description}</span>}
      </span>
      {btn}
    </label>
  );
}

Object.assign(IFS, { TextField, TextArea, Search, Checkbox, Radio, RadioGroup, Switch });
export { TextField, TextArea, Search, Checkbox, Radio, RadioGroup, Switch };
