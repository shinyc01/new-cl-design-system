import React from "react";

/* ============================================================
   IFS Copperleaf — BoardCard
   Kanban-style board card with three types (queue / in-progress /
   completed) and interactive hover state.
   Figma: IFS Iteration 2 › node 2468-20724
   ============================================================ */

const CSS = `
/* ---- Container ---- */
.ifs-board-card {
  box-sizing: border-box;
  width: 351px;
  padding: 12px;
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  font-family: var(--font-sans);
  overflow: hidden;
  position: relative;
  transition:
    background var(--motion-duration-fast) var(--motion-ease-standard),
    border-color var(--motion-duration-fast) var(--motion-ease-standard),
    box-shadow var(--motion-duration-fast) var(--motion-ease-standard);
}

.ifs-board-card--queue {
  background: var(--white-50);
  min-height: 132px;
  justify-content: space-between;
}

.ifs-board-card--in-progress {
  background: var(--white-50);
  gap: 16px;
  box-shadow: 0 0 4px 1px var(--black-400);
}

.ifs-board-card--completed {
  border: 0.5px solid var(--border-base);
  gap: 24px;
}

/* Hover — applied via :hover or the --hover modifier for controlled usage */
.ifs-board-card--queue:hover,
.ifs-board-card--queue.ifs-board-card--hover {
  background: var(--white-80);
  border: 1px solid var(--border-base);
}

.ifs-board-card--in-progress:hover,
.ifs-board-card--in-progress.ifs-board-card--hover {
  background: var(--white-80);
  box-shadow: 0 0 6px 2px var(--black-400);
}

.ifs-board-card--completed:hover,
.ifs-board-card--completed.ifs-board-card--hover {
  background: var(--white-50);
}

/* ---- Header row ---- */
.ifs-board-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-shrink: 0;
}

/* ---- Status chips — solid fills, all WCAG AA with white text ---- */
/*
    --green-700   #1C7138  6.2:1  resolved
    --red-600     #BF302F  5.7:1  critical, cause
    --amber-700   #99691C  4.8:1  moderate
    --copper-600  #A06134  5.0:1  elevated
    --purple-600  #6952C6  5.9:1  sent to decide
*/
.ifs-board-card__chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px 4px 4px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--white-100);
  box-shadow: var(--shadow-chip);
  font-size: 12px;
  font-weight: var(--weight-semibold);
  line-height: 16px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-primary);
  white-space: nowrap;
  flex-shrink: 0;
}

.ifs-board-card__chip--resolved         { background: var(--black-200); }
.ifs-board-card__chip--resolved-compact { background: var(--black-200); padding: 4px; }
.ifs-board-card__chip--critical         { background: color-mix(in srgb, var(--red-600) 20%, transparent); }
.ifs-board-card__chip--moderate         { background: var(--white-50); }
.ifs-board-card__chip--cause            { background: color-mix(in srgb, var(--red-600) 20%, transparent); padding: 4px 8px; }
.ifs-board-card__chip--elevated         { background: color-mix(in srgb, var(--copper-400) 20%, transparent); padding: 4px 6px; }
.ifs-board-card__chip--sent             { background: color-mix(in srgb, var(--purple-500) 20%, transparent); }

/* Icon colours — semantic accent per variant */
.ifs-board-card__chip--resolved .ifs-board-card__chip-icon,
.ifs-board-card__chip--resolved-compact .ifs-board-card__chip-icon { color: var(--text-success); }
.ifs-board-card__chip--critical .ifs-board-card__chip-icon         { color: var(--text-danger); }
.ifs-board-card__chip--moderate .ifs-board-card__chip-icon         { color: var(--text-warning); }
.ifs-board-card__chip--elevated .ifs-board-card__chip-icon         { color: var(--text-accent-cooper); }

.ifs-board-card__chip-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.ifs-board-card__chip-icon svg {
  width: 16px;
  height: 16px;
  display: block;
}

.ifs-board-card__chip-icon i {
  font-size: 16px;
  line-height: 1;
  display: block;
}

/* "Sent to decide" icon inside a filled purple rounded-square */
.ifs-board-card__chip--sent .ifs-board-card__chip-icon {
  background: var(--purple-500);
  border-radius: var(--radius-sm);
  padding: 3px;
  box-sizing: border-box;
}

/* ---- Timestamp ---- */
.ifs-board-card__time {
  font-size: 9px;
  font-weight: var(--weight-regular);
  color: var(--white-500);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ---- Content body ---- */
.ifs-board-card__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  flex-shrink: 0;
}

.ifs-board-card__title {
  font-size: 14px;
  font-weight: var(--weight-medium);
  line-height: 16px;
  color: var(--text-primary);
}

.ifs-board-card__subtitle {
  font-size: 14px;
  font-weight: var(--weight-medium);
  line-height: 18px;
  color: var(--white-500);
  margin-top: 4px;
}

/* ---- Location meta row ---- */
.ifs-board-card__meta {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  font-weight: var(--weight-regular);
  line-height: 14px;
  color: var(--white-500);
}

.ifs-board-card__meta-icon {
  display: inline-flex;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-right: 2px;
}

.ifs-board-card__meta-icon svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* ---- Progress bar (in-progress only) ---- */
.ifs-board-card__progress {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  flex-shrink: 0;
}

.ifs-board-card__progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  font-weight: var(--weight-medium);
  color: var(--white-500);
}

.ifs-board-card__progress-track {
  display: flex;
  gap: 2px;
  width: 100%;
}

.ifs-board-card__progress-segment {
  flex: 1;
  height: 4px;
  border-radius: var(--radius-pill);
  background: var(--white-50);
}

.ifs-board-card__progress-segment--filled {
  background: var(--white-500);
}

/* ---- Action buttons (completed only) ---- */
.ifs-board-card__actions {
  display: flex;
  gap: 8px;
  width: 100%;
  flex-shrink: 0;
}

.ifs-board-card__btn {
  flex: 1;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: var(--weight-medium);
  color: var(--text-primary);
  text-transform: capitalize;
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  padding: 0 12px;
  box-sizing: border-box;
  line-height: 11px;
  transition: background var(--motion-duration-fast) var(--motion-ease-standard);
}

.ifs-board-card__btn--outline {
  border-color: var(--border-base);
}

.ifs-board-card__btn--outline:hover {
  background: var(--white-50);
}

.ifs-board-card__btn--filled {
  background: var(--white-100);
  border-color: var(--border-medium);
}

.ifs-board-card__btn--filled:hover {
  background: var(--white-150);
}
`;

/* SVG icon constants — Tabler filled icons, 24×24 viewport (scaled to 16px via CSS) */
const IconCircleCheck = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34zm-1.293 5.953-4.953 4.953-2.953-2.953a1 1 0 0 0-1.414 1.414l3.659 3.66.006.006a1 1 0 0 0 1.408-.006l5.66-5.66a1 1 0 0 0-1.413-1.414z" />
  </svg>
);

const IconExclamationCircle = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-9a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1z" />
  </svg>
);

const IconAccessPoint = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    {/* Center dot */}
    <circle cx="12" cy="12" r="2" />
    {/* Inner filled arc ring — right side */}
    <path d="M14.828 9.172a4 4 0 0 1 0 5.656 1 1 0 0 0 1.414 1.415 6 6 0 0 0 0-8.486 1 1 0 1 0-1.414 1.415z" />
    {/* Inner filled arc ring — left side */}
    <path d="M9.172 14.828a4 4 0 0 1 0-5.656A1 1 0 0 0 7.758 7.757a6 6 0 0 0 0 8.486 1 1 0 0 0 1.414-1.415z" />
    {/* Outer filled arc ring — right side */}
    <path d="M17.657 6.343a8 8 0 0 1 0 11.314 1 1 0 0 0 1.414 1.414 10 10 0 0 0 0-14.142 1 1 0 0 0-1.414 1.414z" />
    {/* Outer filled arc ring — left side */}
    <path d="M6.343 17.657a8 8 0 0 1 0-11.314A1 1 0 0 0 4.929 4.929a10 10 0 0 0 0 14.142 1 1 0 0 0 1.414-1.414z" />
  </svg>
);

/* Lightning bolt — intentionally filled; sits inside purple rounded-square bg */
const IconLightning = (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M13 3v7h6l-8 11v-7H5L13 3z" />
  </svg>
);

/* Home icon for meta row — 24×24 Tabler outline, scaled to 14px via CSS */
const IconHome = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-4h-6v4H4a1 1 0 0 1-1-1V10.5z" />
  </svg>
);

let _i = false;
function ensureCSS() {
  if (_i || typeof document === "undefined") return;
  _i = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "board-card");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * BoardCard — Kanban-style card for the board / queue view.
 *
 * @param {"queue"|"in-progress"|"completed"} type    Card state in workflow
 * @param {"default"|"hover"}                 state   Force hover appearance (e.g. in Storybook)
 * @param {string}  title                             Asset / item title
 * @param {string}  subtitle                          Short descriptor (queue only; e.g. "Overload")
 * @param {string}  location                          Location label
 * @param {string}  cluster                           Cluster label
 * @param {string}  time                              Relative timestamp (e.g. "2 h ago")
 * @param {boolean} showDecision                      Show "Elevated risk" chip alongside critical (queue only)
 * @param {{label:string, current:number, total:number}} progress  Progress data (in-progress only)
 * @param {Function} onDetails                        "Details" button click handler (completed only)
 * @param {Function} onReport                         "Report" button click handler (completed only)
 */
export function BoardCard({
  type = "queue",
  state = "default",
  title = "South Hudson Substation",
  subtitle = "Overload",
  location = "South District",
  cluster = "Hydro Feed Line 3 cluster",
  time = "2 h ago",
  showDecision = false,
  progress,
  onDetails,
  onReport,
  className = "",
  ...rest
}) {
  ensureCSS();

  const isQueue = type === "queue";
  const isInProgress = type === "in-progress";
  const isCompleted = type === "completed";
  const isHover = state === "hover";

  const progressData = progress ?? (isInProgress ? { label: "Strategy", current: 1, total: 5 } : null);

  const cls = [
    "ifs-board-card",
    `ifs-board-card--${type}`,
    isHover ? "ifs-board-card--hover" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={cls} {...rest}>

      {/* ── Header ── */}
      <div className="ifs-board-card__header">
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {/* Queue: optional elevated-risk chip + critical chip */}
          {isQueue && showDecision && (
            <span className="ifs-board-card__chip ifs-board-card__chip--elevated">
              <span className="ifs-board-card__chip-icon">{IconAccessPoint}</span>
              Elevated risk
            </span>
          )}
          {isQueue && (
            <span className="ifs-board-card__chip ifs-board-card__chip--critical">
              <span className="ifs-board-card__chip-icon">{IconExclamationCircle}</span>
              Critical risk
            </span>
          )}
          {/* In-progress: "sent to decide" chip */}
          {isInProgress && (
            <span className="ifs-board-card__chip ifs-board-card__chip--sent">
              <span className="ifs-board-card__chip-icon">{IconLightning}</span>
              Sent to decide
            </span>
          )}
          {/* Completed: resolved icon chip (no label) */}
          {isCompleted && (
            <span className="ifs-board-card__chip ifs-board-card__chip--resolved">
              <span className="ifs-board-card__chip-icon">{IconCircleCheck}</span>
            </span>
          )}
        </div>
        <span className="ifs-board-card__time">{time}</span>
      </div>

      {/* ── Body ── */}
      <div className="ifs-board-card__body">
        {/* Title + subtitle */}
        <div>
          <div className="ifs-board-card__title">{title}</div>
          {isQueue && subtitle && (
            <div className="ifs-board-card__subtitle">{subtitle}</div>
          )}
        </div>

        {/* Location · Cluster meta */}
        <div className="ifs-board-card__meta">
          <span className="ifs-board-card__meta-icon">{IconHome}</span>
          <span>{location}</span>
          <span style={{ margin: "0 2px" }}>·</span>
          <span>{cluster}</span>
        </div>

        {/* Action buttons (completed only) */}
        {isCompleted && (
          <div className="ifs-board-card__actions">
            <button className="ifs-board-card__btn ifs-board-card__btn--outline" onClick={onDetails}>
              Details
            </button>
            <button className="ifs-board-card__btn ifs-board-card__btn--filled" onClick={onReport}>
              Report
            </button>
          </div>
        )}
      </div>

      {/* ── Progress bar (in-progress only) ── */}
      {isInProgress && progressData && (
        <div className="ifs-board-card__progress">
          <div className="ifs-board-card__progress-labels">
            <span>{progressData.label}</span>
            <span>{progressData.current}/{progressData.total}</span>
          </div>
          <div className="ifs-board-card__progress-track">
            {Array.from({ length: progressData.total }).map((_, i) => (
              <div
                key={i}
                className={[
                  "ifs-board-card__progress-segment",
                  i < progressData.current ? "ifs-board-card__progress-segment--filled" : "",
                ].filter(Boolean).join(" ")}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default BoardCard;
