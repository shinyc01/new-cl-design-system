import React from "react";

const CSS = `
.ifs-quick-stat-card {
  display: flex;
  flex-direction: column;
  gap: var(--gap-200);          /* 8px */
  padding: var(--padding-300);  /* 12px */
  border-radius: var(--radius-100);  /* 4px */
  background: var(--surface-secondary-alpha);  /* white/5% */
  border: var(--border-100) solid var(--border-base);  /* 1px white/10% */
  box-sizing: border-box;
}

.ifs-quick-stat-card__title {
  font-family: var(--font-sans);
  font-size: var(--h4-size);          /* 12px */
  line-height: var(--h4-line);        /* 14px */
  font-weight: var(--h4-weight);      /* 500 */
  letter-spacing: var(--h4-tracking); /* -0.1px */
  color: var(--text-secondary);
}

.ifs-quick-stat-card__value-row {
  display: flex;
  align-items: baseline;
  gap: var(--gap-150);  /* 6px */
}

.ifs-quick-stat-card__value {
  font-family: var(--font-sans);
  font-size: var(--fs-20);          /* 20px */
  line-height: var(--lh-24);        /* 24px */
  font-weight: var(--weight-medium); /* 500 */
  letter-spacing: -0.5px; /* NOTE: no exact DS token for -0.5px tracking; closest is --h1-tracking (-0.6px). Flagged. */
  color: var(--text-primary);
}

.ifs-quick-stat-card__desc {
  font-family: var(--font-sans);
  font-size: var(--label-m-size);          /* 12px */
  line-height: var(--label-m-line);        /* 16px */
  font-weight: var(--label-m-weight);      /* 500 */
  letter-spacing: var(--label-m-tracking); /* -0.1px */
  color: var(--text-tertiary);
}
`;

let _i = false;
function ensureCSS() {
  if (_i || typeof document === "undefined") return;
  _i = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "quick-stat-card");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * QuickStatCard — compact KPI tile showing a metric label, large value, and optional description.
 * Use in 4-up grids on investment/asset detail overview screens.
 */
export function QuickStatCard({
  title,
  value,
  desc,
  className = "",
  ...rest
}) {
  ensureCSS();
  const cls = ["ifs-quick-stat-card", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <div className="ifs-quick-stat-card__title">{title}</div>
      <div className="ifs-quick-stat-card__value-row">
        <span className="ifs-quick-stat-card__value">{value}</span>
      </div>
      {desc ? <div className="ifs-quick-stat-card__desc">{desc}</div> : null}
    </div>
  );
}

export default QuickStatCard;
