import React from "react";

const CSS = `
.ifs-badge{
  display:inline-flex; align-items:center; gap:5px; box-sizing:border-box;
  font-family:var(--font-sans); font-weight:var(--weight-semibold);
  font-size:11px; line-height:1; letter-spacing:.1px; white-space:nowrap;
  height:20px; padding:0 8px; border-radius:var(--radius-pill);
  border:1px solid transparent;
}
.ifs-badge--sm{ height:16px; font-size:10px; padding:0 6px; gap:4px; }
.ifs-badge--lg{ height:24px; font-size:12px; padding:0 10px; }
.ifs-badge--square{ border-radius:var(--radius-sm); }
.ifs-badge__dot{ width:6px; height:6px; border-radius:50%; background:currentColor; flex:none; }
.ifs-badge__icon{ display:inline-flex; width:1.1em; height:1.1em; }
.ifs-badge__icon svg{ width:100%; height:100%; display:block; }

/* soft (default) */
.ifs-badge--soft.t-neutral{ background:var(--white-100); color:var(--text-secondary); border-color:var(--white-100); }
.ifs-badge--soft.t-purple{ background:var(--bg-accent-purple); color:var(--text-accent-purple); border-color:var(--border-accent-purple); }
.ifs-badge--soft.t-copper{ background:var(--bg-accent-copper); color:var(--text-accent-copper); border-color:var(--border-accent-copper); }
.ifs-badge--soft.t-success{ background:var(--bg-success); color:var(--text-success); border-color:var(--border-success); }
.ifs-badge--soft.t-danger{ background:var(--bg-danger); color:var(--text-danger); border-color:var(--border-danger); }
.ifs-badge--soft.t-warning{ background:var(--bg-warning); color:var(--text-warning); border-color:var(--border-warning); }
.ifs-badge--soft.t-info{ background:var(--bg-info); color:var(--text-info); border-color:var(--border-info); }

/* solid */
.ifs-badge--solid{ color:#fff; }
.ifs-badge--solid.t-neutral{ background:var(--surface-3); color:var(--text-primary); }
.ifs-badge--solid.t-purple{ background:var(--purple-500); }
.ifs-badge--solid.t-copper{ background:var(--copper-500); }
.ifs-badge--solid.t-success{ background:var(--green-600); }
.ifs-badge--solid.t-danger{ background:var(--red-500); }
.ifs-badge--solid.t-warning{ background:var(--amber-500); color:#3a2705; }
.ifs-badge--solid.t-info{ background:var(--blue-500); }

/* outline */
.ifs-badge--outline{ background:transparent; }
.ifs-badge--outline.t-neutral{ color:var(--text-secondary); border-color:var(--border-medium); }
.ifs-badge--outline.t-purple{ color:var(--text-accent-purple); border-color:var(--border-accent-purple); }
.ifs-badge--outline.t-copper{ color:var(--text-accent-copper); border-color:var(--border-accent-copper); }
.ifs-badge--outline.t-success{ color:var(--text-success); border-color:var(--border-success); }
.ifs-badge--outline.t-danger{ color:var(--text-danger); border-color:var(--border-danger); }
.ifs-badge--outline.t-warning{ color:var(--text-warning); border-color:var(--border-warning); }
.ifs-badge--outline.t-info{ color:var(--text-info); border-color:var(--border-info); }
`;

let _i = false;
function ensureCSS(){ if(_i||typeof document==="undefined")return; _i=true;
  const s=document.createElement("style"); s.setAttribute("data-ifs","badge"); s.textContent=CSS; document.head.appendChild(s); }

/** Status / category badge. */
export function Badge({
  tone = "neutral",
  variant = "soft",
  size = "md",
  dot = false,
  square = false,
  icon,
  className = "",
  children,
  ...rest
}) {
  ensureCSS();
  const cls = [
    "ifs-badge", `ifs-badge--${variant}`, `t-${tone}`,
    size !== "md" ? `ifs-badge--${size}` : "",
    square ? "ifs-badge--square" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {dot ? <span className="ifs-badge__dot" /> : null}
      {icon ? <span className="ifs-badge__icon">{icon}</span> : null}
      {children}
    </span>
  );
}

export default Badge;
