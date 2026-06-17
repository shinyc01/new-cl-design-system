import React from "react";

const CSS = `
/* ── IFS Copperleaf Table ───────────────────────────────────────────────────
   Figma source: Strategy Framework Handover — node 2356:84052
   Pattern: flex-row table with header + data rows.
   Tokens: all values reference DS vars; no raw hex/rgba except known exempt.
   ─────────────────────────────────────────────────────────────────────────── */

/* Container */
.ifs-table {
  display: flex; flex-direction: column;
  gap: var(--gap-100);                        /* 4px between header and rows */
  padding: var(--gap-300);                    /* 12px outer padding */
  background: var(--surface-secondary-alpha); /* rgba(255,255,255,0.05) */
  border-radius: var(--radius-200);           /* 8px */
  overflow: hidden; box-sizing: border-box; width: 100%;
}

/* Header row */
.ifs-table__header {
  display: flex; align-items: center; width: 100%;
}

/* Header cell */
.ifs-table__th {
  display: flex; align-items: center; gap: var(--gap-200);
  height: 32px; padding: var(--gap-200) var(--gap-300);
  font-family: var(--font-sans);
  font-size: var(--h4-size);              /* 12px */
  font-weight: var(--h4-upper-weight);    /* 500 medium */
  line-height: var(--h4-line);            /* 14px */
  letter-spacing: var(--h4-upper-tracking); /* 0.1px */
  text-transform: uppercase;
  color: var(--text-tertiary);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  flex: 1 0 0; min-width: 0;
}

/* Sort icon wrapper */
.ifs-table__sort {
  display: inline-flex; flex-direction: column; gap: 1px;
  width: 16px; height: 16px; align-items: center; justify-content: center;
  color: var(--icon-tertiary); flex: none; cursor: pointer;
  transition: color var(--motion-duration-fast) var(--motion-ease-standard);
}
.ifs-table__sort:hover { color: var(--icon-secondary); }
.ifs-table__sort--asc  { color: var(--text-primary); }
.ifs-table__sort--desc { color: var(--text-primary); }
.ifs-table__sort svg { display: block; }

/* Filter icon wrapper */
.ifs-table__filter {
  display: inline-flex; align-items: center; justify-content: center;
  width: 16px; height: 16px; flex: none; cursor: pointer;
  color: var(--icon-tertiary);
  transition: color var(--motion-duration-fast) var(--motion-ease-standard);
}
.ifs-table__filter:hover  { color: var(--icon-secondary); }
.ifs-table__filter--active { color: var(--text-primary); }
.ifs-table__filter svg { display: block; }

/* Data row */
.ifs-table__row {
  display: flex; align-items: center;
  height: 48px; width: 100%; flex: none; box-sizing: border-box;
  background: var(--surface-secondary-alpha);  /* rgba(255,255,255,0.05) */
  border-radius: var(--radius-100);             /* 4px */
  cursor: pointer;
  transition: background var(--motion-duration-fast) var(--motion-ease-standard);
}
.ifs-table__row:hover {
  background: var(--background-color-alpha-white-base); /* rgba(255,255,255,0.10) */
}
.ifs-table__row--selected {
  background: var(--background-color-alpha-white-strong); /* rgba(255,255,255,0.20) */
}

/* Data cell — default: single-line, centered vertically */
.ifs-table__td {
  display: flex; align-items: center;
  height: 100%; padding: 0 var(--gap-300);    /* 0 12px */
  overflow: hidden; flex: 1 0 0; min-width: 0;
  font-family: var(--font-sans);
  font-size: var(--body-m-size);                /* 12px */
  font-weight: var(--body-m-medium-weight);     /* 500 */
  line-height: var(--body-m-line);              /* 16px */
  letter-spacing: var(--body-m-medium-tracking);/* -0.1px */
  color: var(--text-primary);
  white-space: nowrap; text-overflow: ellipsis;
}

/* Stacked cell: primary label + secondary description */
.ifs-table__td--stack {
  flex-direction: column; gap: var(--gap-100); /* 4px */
  align-items: flex-start; justify-content: center;
}
.ifs-table__td-primary {
  font-family: var(--font-sans);
  font-size: var(--body-m-size);
  font-weight: var(--body-m-medium-weight);
  line-height: var(--body-m-line);
  letter-spacing: var(--body-m-medium-tracking);
  color: var(--text-primary);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%;
}
.ifs-table__td-secondary {
  font-family: var(--font-sans);
  font-size: var(--body-m-size);
  font-weight: var(--body-m-weight);            /* 400 regular */
  line-height: var(--body-m-line);
  letter-spacing: var(--body-m-tracking);        /* 0 */
  color: var(--text-secondary);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%;
}

/* ── Status pill: dot + uppercase label ───────────────────────────────────── */
.ifs-table__status {
  display: inline-flex; align-items: center;
  gap: var(--gap-150);                          /* 6px */
  white-space: nowrap; flex: none;
}
.ifs-table__status-dot {
  width: 8px; height: 8px; border-radius: var(--radius-full);
  flex: none; background: var(--icon-tertiary);
}
.ifs-table__status-label {
  font-family: var(--font-sans);
  font-size: var(--label-m-size);               /* 12px */
  font-weight: var(--label-m-upper-weight);     /* 600 semibold */
  line-height: var(--label-m-line);             /* 16px */
  letter-spacing: var(--label-m-upper-tracking);/* 0.2px */
  text-transform: uppercase;
  color: var(--text-primary);
}

/* Status variants — dot color + optional text color override */
.ifs-table__status--active   .ifs-table__status-dot { background: var(--text-success); }
.ifs-table__status--pending  .ifs-table__status-dot { background: var(--text-warning); }
.ifs-table__status--draft    .ifs-table__status-dot { background: var(--text-tertiary); }
.ifs-table__status--archived .ifs-table__status-dot { background: var(--text-disabled); }
.ifs-table__status--archived .ifs-table__status-label { color: var(--text-disabled); }
.ifs-table__status--info     .ifs-table__status-dot { background: var(--text-info); }
.ifs-table__status--danger   .ifs-table__status-dot { background: var(--text-danger); }

/* ── Inline count badge (e.g. 5/8 approval progress) ─────────────────────── */
.ifs-table__count {
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--background-color-alpha-white-base); /* rgba(255,255,255,0.10) */
  border-radius: var(--radius-full);
  padding: var(--gap-100) var(--gap-200);       /* 4px 8px */
  font-family: var(--font-sans);
  font-size: var(--label-m-size);               /* 12px */
  font-weight: var(--label-m-weight);           /* 500 */
  line-height: var(--label-m-line);             /* 16px */
  letter-spacing: var(--label-l-tracking);      /* -0.15px */
  color: var(--text-primary);
  white-space: nowrap; flex: none;
}
`;

let _i = false;
function ensureCSS() {
  if (_i || typeof document === "undefined") return;
  _i = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "table");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

/**
 * Header cell. Renders an uppercase label with optional sort/filter icons.
 * flex: defaults to `flex: 1 0 0` (equal-width). Pass className to override
 * (e.g. a fixed-width actions column: `className="ifs-table__th" style={{flex:"none",width:48}}`)
 */
export function TableTh({
  children,
  sort = false,
  sortDir,       // "asc" | "desc" | undefined
  filter = false,
  filterActive = false,
  onSort,
  onFilter,
  className = "",
  style,
  ...rest
}) {
  ensureCSS();
  return (
    <div
      className={["ifs-table__th", className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", flex: "1 0 0", minWidth: 0 }}>
        {children}
      </span>
      {sort && (
        <span
          className={[
            "ifs-table__sort",
            sortDir === "asc"  ? "ifs-table__sort--asc"  : "",
            sortDir === "desc" ? "ifs-table__sort--desc" : "",
          ].filter(Boolean).join(" ")}
          onClick={onSort}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M5 6.5L8 3L11 6.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 9.5L8 13L11 9.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
      {filter && (
        <span
          className={[
            "ifs-table__filter",
            filterActive ? "ifs-table__filter--active" : "",
          ].filter(Boolean).join(" ")}
          onClick={onFilter}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 4H14M4.5 8H11.5M7 12H9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
          </svg>
        </span>
      )}
    </div>
  );
}

/**
 * Data cell. Wrap in a `<TableRow>`.
 * Use `stack` prop for primary + secondary stacked text.
 * `flex` and `width` can be overridden via style / className.
 */
export function TableTd({
  children,
  stack = false,
  primary,
  secondary,
  className = "",
  style,
  ...rest
}) {
  ensureCSS();
  const cls = [
    "ifs-table__td",
    stack ? "ifs-table__td--stack" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div className={cls} style={style} {...rest}>
      {stack ? (
        <>
          <span className="ifs-table__td-primary">{primary}</span>
          {secondary && <span className="ifs-table__td-secondary">{secondary}</span>}
        </>
      ) : (
        children
      )}
    </div>
  );
}

/**
 * Status pill: coloured dot + uppercase label.
 * variant: "active" | "pending" | "draft" | "archived" | "info" | "danger"
 */
export function TableStatus({ variant = "draft", children, className = "", ...rest }) {
  ensureCSS();
  return (
    <span
      className={[
        "ifs-table__status",
        variant ? `ifs-table__status--${variant}` : "",
        className,
      ].filter(Boolean).join(" ")}
      {...rest}
    >
      <span className="ifs-table__status-dot" />
      <span className="ifs-table__status-label">{children}</span>
    </span>
  );
}

/**
 * Inline count badge (e.g. "5/8").
 */
export function TableCount({ children, className = "", ...rest }) {
  ensureCSS();
  return (
    <span className={["ifs-table__count", className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </span>
  );
}

/**
 * A single data row. onClick handler passed through.
 */
export function TableRow({ children, selected = false, className = "", style, ...rest }) {
  ensureCSS();
  return (
    <div
      className={[
        "ifs-table__row",
        selected ? "ifs-table__row--selected" : "",
        className,
      ].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * Root table container.
 *
 * Usage:
 *   <Table>
 *     <div className="ifs-table__header">
 *       <TableTh sort>Investment</TableTh>
 *       <TableTh sort filter>Status</TableTh>
 *       <TableTh sort filter>Last modified</TableTh>
 *     </div>
 *     <TableRow onClick={...}>
 *       <TableTd stack primary="Q1 2026 Strategy Framework" />
 *       <TableTd><TableStatus variant="active">Active</TableStatus></TableTd>
 *       <TableTd>Jan 15, 2026</TableTd>
 *     </TableRow>
 *   </Table>
 */
export function Table({ children, className = "", style, ...rest }) {
  ensureCSS();
  return (
    <div className={["ifs-table", className].filter(Boolean).join(" ")} style={style} {...rest}>
      {children}
    </div>
  );
}

export default Table;
