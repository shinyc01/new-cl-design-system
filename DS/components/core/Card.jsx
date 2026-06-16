import React from "react";

const CSS = `
.ifs-card{
  box-sizing:border-box; background:var(--surface-card);
  border:1px solid var(--border-subtle); border-radius:var(--radius-md);
  box-shadow:var(--edge-top); color:var(--text-primary);
  font-family:var(--font-sans); display:flex; flex-direction:column; min-width:0;
}
.ifs-card--elevated{ background:var(--surface-3); box-shadow:var(--shadow-md), var(--edge-top); }
.ifs-card--flush{ background:transparent; box-shadow:none; }
.ifs-card--pad-sm{ padding:12px; }
.ifs-card--pad-md{ padding:16px; }
.ifs-card--pad-lg{ padding:20px; }
.ifs-card--interactive{ cursor:pointer; transition:border-color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard); }
.ifs-card--interactive:hover{ border-color:var(--border-strong); background:var(--surface-3); }

.ifs-card__header{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:14px; }
.ifs-card__titles{ display:flex; flex-direction:column; gap:2px; min-width:0; }
.ifs-card__title{ font-size:var(--h3-size); line-height:var(--h3-line); font-weight:var(--weight-semibold); letter-spacing:-.2px; color:var(--text-primary); }
.ifs-card__subtitle{ font-size:var(--body-m-size); line-height:var(--body-m-line); color:var(--text-tertiary); }
.ifs-card__action{ flex:none; display:flex; gap:6px; align-items:center; }
`;

let _i=false;
function ensureCSS(){ if(_i||typeof document==="undefined")return; _i=true;
  const s=document.createElement("style"); s.setAttribute("data-ifs","card"); s.textContent=CSS; document.head.appendChild(s); }

/** Surface container with optional header (title / subtitle / action). */
export function Card({
  variant = "default",
  padding = "md",
  interactive = false,
  title,
  subtitle,
  action,
  className = "",
  children,
  ...rest
}) {
  ensureCSS();
  const cls = [
    "ifs-card",
    variant !== "default" ? `ifs-card--${variant}` : "",
    `ifs-card--pad-${padding}`,
    interactive ? "ifs-card--interactive" : "",
    className,
  ].filter(Boolean).join(" ");
  const hasHeader = title || subtitle || action;
  return (
    <div className={cls} {...rest}>
      {hasHeader ? (
        <div className="ifs-card__header">
          <div className="ifs-card__titles">
            {title ? <div className="ifs-card__title">{title}</div> : null}
            {subtitle ? <div className="ifs-card__subtitle">{subtitle}</div> : null}
          </div>
          {action ? <div className="ifs-card__action">{action}</div> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export default Card;
