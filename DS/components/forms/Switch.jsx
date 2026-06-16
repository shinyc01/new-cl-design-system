import React from "react";

const CSS = `
.ifs-switch{ display:inline-flex; align-items:center; gap:9px; font-family:var(--font-sans);
  font-size:13px; color:var(--text-primary); cursor:pointer; user-select:none; }
.ifs-switch--disabled{ opacity:.5; cursor:not-allowed; }
.ifs-switch input{ position:absolute; opacity:0; width:0; height:0; }
.ifs-switch__track{ position:relative; width:34px; height:20px; flex:none; border-radius:999px;
  background:var(--white-200); transition:background var(--duration-base) var(--ease-standard); }
.ifs-switch--sm .ifs-switch__track{ width:28px; height:16px; }
.ifs-switch__thumb{ position:absolute; top:2px; left:2px; width:16px; height:16px; border-radius:50%;
  background:#fff; box-shadow:0 1px 2px rgba(0,0,0,.4);
  transition:transform var(--duration-base) var(--ease-emphasis); }
.ifs-switch--sm .ifs-switch__thumb{ width:12px; height:12px; }
.ifs-switch input:checked + .ifs-switch__track{ background:var(--accent-brand); }
.ifs-switch input:checked + .ifs-switch__track .ifs-switch__thumb{ transform:translateX(14px); }
.ifs-switch--sm input:checked + .ifs-switch__track .ifs-switch__thumb{ transform:translateX(12px); }
.ifs-switch input:focus-visible + .ifs-switch__track{ box-shadow:0 0 0 2px var(--focus-ring); }
`;

let _i=false;
function ensureCSS(){ if(_i||typeof document==="undefined")return; _i=true;
  const s=document.createElement("style"); s.setAttribute("data-ifs","switch"); s.textContent=CSS; document.head.appendChild(s); }

/** Toggle switch with optional label. */
export function Switch({ label, checked, defaultChecked, disabled = false, size = "md", className = "", onChange, ...rest }) {
  ensureCSS();
  const cls = ["ifs-switch", size==="sm"?"ifs-switch--sm":"", disabled?"ifs-switch--disabled":"", className].filter(Boolean).join(" ");
  return (
    <label className={cls}>
      <input type="checkbox" checked={checked} defaultChecked={defaultChecked} disabled={disabled} onChange={onChange} {...rest} />
      <span className="ifs-switch__track"><span className="ifs-switch__thumb" /></span>
      {label != null ? <span>{label}</span> : null}
    </label>
  );
}

export default Switch;
