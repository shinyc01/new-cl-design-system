import React from "react";

const CSS = `
.ifs-tabs{ display:flex; align-items:center; gap:2px; font-family:var(--font-sans);
  border-bottom:1px solid var(--border-subtle); }
.ifs-tabs--plain{ border-bottom:none; }
.ifs-tab{ position:relative; display:inline-flex; align-items:center; gap:6px;
  height:34px; padding:0 10px; background:none; border:none; cursor:pointer;
  font-family:var(--font-sans); font-size:13px; font-weight:var(--weight-medium);
  color:var(--text-tertiary); letter-spacing:-.1px;
  transition:color var(--duration-fast) var(--ease-standard); }
.ifs-tab:hover{ color:var(--text-secondary); }
.ifs-tab--active{ color:var(--text-primary); }
.ifs-tab::after{ content:""; position:absolute; left:8px; right:8px; bottom:-1px; height:2px;
  border-radius:2px 2px 0 0; background:var(--accent-brand); transform:scaleX(0);
  transition:transform var(--duration-base) var(--ease-emphasis); }
.ifs-tab--active::after{ transform:scaleX(1); }
.ifs-tab:focus-visible{ outline:none; color:var(--text-primary); }
.ifs-tab:focus-visible::after{ transform:scaleX(1); background:var(--focus-ring); }
.ifs-tab__icon{ display:inline-flex; width:15px; height:15px; }
.ifs-tab__icon svg{ width:100%; height:100%; display:block; }
.ifs-tab__count{ font-size:11px; font-weight:var(--weight-semibold); color:var(--text-tertiary);
  background:var(--white-100); border-radius:999px; padding:1px 6px; }
.ifs-tab--active .ifs-tab__count{ color:var(--text-secondary); }
`;

let _i=false;
function ensureCSS(){ if(_i||typeof document==="undefined")return; _i=true;
  const s=document.createElement("style"); s.setAttribute("data-ifs","tabs"); s.textContent=CSS; document.head.appendChild(s); }

/** Underline tab bar. Controlled via `value`/`onChange`. */
export function Tabs({ items = [], value, onChange, plain = false, className = "", ...rest }) {
  ensureCSS();
  return (
    <div role="tablist" className={["ifs-tabs", plain?"ifs-tabs--plain":"", className].filter(Boolean).join(" ")} {...rest}>
      {items.map((it) => {
        const id = typeof it === "string" ? it : it.id;
        const label = typeof it === "string" ? it : it.label;
        const active = id === value;
        return (
          <button key={id} role="tab" aria-selected={active}
            className={["ifs-tab", active?"ifs-tab--active":""].filter(Boolean).join(" ")}
            onClick={() => onChange && onChange(id)}>
            {it.icon ? <span className="ifs-tab__icon">{it.icon}</span> : null}
            {label}
            {it.count != null ? <span className="ifs-tab__count">{it.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
