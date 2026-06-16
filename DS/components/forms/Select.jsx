import React from "react";

const CSS = `
.ifs-select{ position:relative; display:flex; align-items:center; box-sizing:border-box;
  height:32px; border-radius:var(--radius-sm); background:var(--white-50);
  border:1px solid var(--white-150); font-family:var(--font-sans);
  transition:border-color var(--duration-fast) var(--ease-standard); }
.ifs-select--sm{ height:24px; }
.ifs-select--lg{ height:40px; border-radius:var(--radius-md); }
.ifs-select:hover{ border-color:var(--white-400); }
.ifs-select:focus-within{ border-color:var(--white-400); box-shadow:0 0 0 3px var(--white-50); }
.ifs-select--disabled{ opacity:.5; pointer-events:none; }
.ifs-select__el{ appearance:none; -webkit-appearance:none; border:none; outline:none; background:transparent;
  font-family:var(--font-sans); font-size:13px; color:var(--text-primary);
  height:100%; width:100%; padding:0 28px 0 10px; cursor:pointer; }
.ifs-select--lg .ifs-select__el{ padding-left:12px; }
.ifs-select__el option{ background:var(--surface-2); color:var(--text-primary); }
.ifs-select__chev{ position:absolute; right:9px; pointer-events:none; color:var(--icon-tertiary);
  display:inline-flex; }
`;

let _i=false;
function ensureCSS(){ if(_i||typeof document==="undefined")return; _i=true;
  const s=document.createElement("style"); s.setAttribute("data-ifs","select"); s.textContent=CSS; document.head.appendChild(s); }

const Chevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

/** Native-backed select, styled to the system. Pass `options` or `children`. */
export function Select({
  label, hint, size = "md", disabled = false, options, placeholder,
  id, className = "", style, children, ...rest
}) {
  ensureCSS();
  const selId = id || (label ? `ifs-sel-${Math.random().toString(36).slice(2,8)}` : undefined);
  const boxCls = ["ifs-select", size!=="md"?`ifs-select--${size}`:"", disabled?"ifs-select--disabled":""].filter(Boolean).join(" ");
  return (
    <div className={["ifs-field", className].filter(Boolean).join(" ")} style={style}>
      {label ? <label className="ifs-field__label" htmlFor={selId}>{label}</label> : null}
      <div className={boxCls}>
        <select id={selId} className="ifs-select__el" disabled={disabled} {...rest}>
          {placeholder ? <option value="" disabled>{placeholder}</option> : null}
          {options ? options.map((o,i) => {
            const v = typeof o === "string" ? o : o.value;
            const l = typeof o === "string" ? o : o.label;
            return <option key={i} value={v}>{l}</option>;
          }) : children}
        </select>
        <span className="ifs-select__chev"><Chevron/></span>
      </div>
      {hint ? <span className="ifs-field__hint">{hint}</span> : null}
    </div>
  );
}

export default Select;
