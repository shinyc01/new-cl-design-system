import React from "react";

const CSS = `
.ifs-check{ display:inline-flex; align-items:center; gap:8px; font-family:var(--font-sans);
  font-size:13px; color:var(--text-primary); cursor:pointer; user-select:none; }
.ifs-check--disabled{ opacity:.5; cursor:not-allowed; }
.ifs-check__box{ width:16px; height:16px; border-radius:var(--radius-xs); flex:none;
  border:1.5px solid var(--white-400); background:var(--white-50);
  display:inline-flex; align-items:center; justify-content:center; color:#fff;
  transition:background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard); }
.ifs-check__box svg{ width:12px; height:12px; opacity:0; transform:scale(.6);
  transition:opacity var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard); }
.ifs-check input{ position:absolute; opacity:0; width:0; height:0; }
.ifs-check input:checked + .ifs-check__box,
.ifs-check input:indeterminate + .ifs-check__box{ background:var(--accent-brand); border-color:var(--accent-brand); }
.ifs-check input:checked + .ifs-check__box svg,
.ifs-check input:indeterminate + .ifs-check__box svg{ opacity:1; transform:scale(1); }
.ifs-check input:focus-visible + .ifs-check__box{ box-shadow:0 0 0 2px var(--focus-ring); }
.ifs-check:hover input:not(:checked):not(:indeterminate) + .ifs-check__box{ border-color:var(--white-400); background:var(--white-100); }
`;

let _i=false;
function ensureCSS(){ if(_i||typeof document==="undefined")return; _i=true;
  const s=document.createElement("style"); s.setAttribute("data-ifs","check"); s.textContent=CSS; document.head.appendChild(s); }

/** Checkbox with label. Supports `indeterminate`. */
export function Checkbox({ label, checked, defaultChecked, indeterminate = false, disabled = false, className = "", onChange, ...rest }) {
  ensureCSS();
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  const cls = ["ifs-check", disabled ? "ifs-check--disabled" : "", className].filter(Boolean).join(" ");
  return (
    <label className={cls} style={{ position:"relative" }}>
      <input ref={ref} type="checkbox" checked={checked} defaultChecked={defaultChecked}
             disabled={disabled} onChange={onChange} {...rest} />
      <span className="ifs-check__box">
        {indeterminate
          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><path d="M5 12h14"/></svg>
          : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
      </span>
      {label != null ? <span>{label}</span> : null}
    </label>
  );
}

export default Checkbox;
