import React from "react";

const CSS = `
.ifs-field{ display:flex; flex-direction:column; gap:6px; font-family:var(--font-sans); min-width:0; }
.ifs-field__label{ font-size:12px; font-weight:var(--weight-medium); color:var(--text-secondary); }
.ifs-field__label .req{ color:var(--text-danger); margin-left:2px; }
.ifs-field__hint{ font-size:11px; line-height:1.4; color:var(--text-tertiary); }
.ifs-field__hint--error{ color:var(--text-danger); }

.ifs-input{
  display:flex; align-items:center; gap:8px; box-sizing:border-box;
  height:32px; padding:0 10px; border-radius:var(--radius-sm);
  background:var(--white-50); border:1px solid var(--white-150);
  transition:border-color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard);
}
.ifs-input--sm{ height:24px; padding:0 8px; }
.ifs-input--lg{ height:40px; padding:0 12px; border-radius:var(--radius-md); }
.ifs-input:hover{ border-color:var(--white-400); }
.ifs-input:focus-within{ border-color:var(--white-400); background:var(--white-100);
  box-shadow:0 0 0 3px var(--white-50); }
.ifs-input--error{ border-color:var(--red-500); }
.ifs-input--error:focus-within{ box-shadow:0 0 0 3px var(--bg-danger); }
.ifs-input--disabled{ opacity:.5; pointer-events:none; }
.ifs-input__el{
  flex:1; min-width:0; border:none; outline:none; background:transparent;
  font-family:var(--font-sans); font-size:13px; color:var(--text-primary); line-height:1;
}
.ifs-input__el::placeholder{ color:var(--text-tertiary); }
.ifs-input__affix{ display:inline-flex; align-items:center; color:var(--icon-tertiary); flex:none; font-size:12px; }
.ifs-input__affix svg{ width:15px; height:15px; display:block; }
`;

let _i=false;
function ensureCSS(){ if(_i||typeof document==="undefined")return; _i=true;
  const s=document.createElement("style"); s.setAttribute("data-ifs","input"); s.textContent=CSS; document.head.appendChild(s); }

/** Text input with optional label, affixes, hint and error state. */
export function Input({
  label, hint, error, required = false,
  size = "md", leading, trailing, disabled = false,
  id, className = "", style, ...rest
}) {
  ensureCSS();
  const inputId = id || (label ? `ifs-${Math.random().toString(36).slice(2,8)}` : undefined);
  const boxCls = [
    "ifs-input",
    size !== "md" ? `ifs-input--${size}` : "",
    error ? "ifs-input--error" : "",
    disabled ? "ifs-input--disabled" : "",
  ].filter(Boolean).join(" ");
  return (
    <div className={["ifs-field", className].filter(Boolean).join(" ")} style={style}>
      {label ? <label className="ifs-field__label" htmlFor={inputId}>{label}{required ? <span className="req">*</span> : null}</label> : null}
      <div className={boxCls}>
        {leading ? <span className="ifs-input__affix">{leading}</span> : null}
        <input id={inputId} className="ifs-input__el" disabled={disabled} {...rest} />
        {trailing ? <span className="ifs-input__affix">{trailing}</span> : null}
      </div>
      {error ? <span className="ifs-field__hint ifs-field__hint--error">{error}</span>
             : hint ? <span className="ifs-field__hint">{hint}</span> : null}
    </div>
  );
}

export default Input;
