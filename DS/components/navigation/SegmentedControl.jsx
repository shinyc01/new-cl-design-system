import React from "react";

const CSS = `
.ifs-seg{ display:inline-flex; align-items:center; gap:2px; box-sizing:border-box;
  padding:3px; border-radius:var(--radius-md); background:var(--surface-3);
  border:1px solid var(--border-subtle); font-family:var(--font-sans); }
.ifs-seg--sm{ padding:2px; border-radius:var(--radius-sm); }
.ifs-seg__opt{ display:inline-flex; align-items:center; gap:6px; cursor:pointer;
  height:26px; padding:0 12px; border:none; background:transparent; border-radius:var(--radius-sm);
  font-family:var(--font-sans); font-size:12px; font-weight:var(--weight-medium);
  color:var(--text-tertiary); white-space:nowrap;
  transition:background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard); }
.ifs-seg--sm .ifs-seg__opt{ height:22px; padding:0 9px; }
.ifs-seg__opt:hover{ color:var(--text-secondary); }
.ifs-seg__opt--active{ background:var(--white-100); color:var(--text-primary); box-shadow:var(--shadow-xs); }
.ifs-seg__opt:focus-visible{ outline:none; box-shadow:0 0 0 2px var(--focus-ring); }
.ifs-seg__icon{ display:inline-flex; width:14px; height:14px; }
.ifs-seg__icon svg{ width:100%; height:100%; display:block; }
`;

let _i=false;
function ensureCSS(){ if(_i||typeof document==="undefined")return; _i=true;
  const s=document.createElement("style"); s.setAttribute("data-ifs","seg"); s.textContent=CSS; document.head.appendChild(s); }

/** Segmented toggle (e.g. 3D / 2D, time ranges). Controlled. */
export function SegmentedControl({ options = [], value, onChange, size = "md", className = "", ...rest }) {
  ensureCSS();
  return (
    <div role="group" className={["ifs-seg", size==="sm"?"ifs-seg--sm":"", className].filter(Boolean).join(" ")} {...rest}>
      {options.map((o) => {
        const val = typeof o === "string" ? o : o.value;
        const label = typeof o === "string" ? o : o.label;
        const active = val === value;
        return (
          <button key={val} type="button" aria-pressed={active}
            className={["ifs-seg__opt", active?"ifs-seg__opt--active":""].filter(Boolean).join(" ")}
            onClick={() => onChange && onChange(val)}>
            {o.icon ? <span className="ifs-seg__icon">{o.icon}</span> : null}
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
