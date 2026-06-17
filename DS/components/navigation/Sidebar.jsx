import React, { useState } from "react";

const CSS = `
/* ── Sidebar shell ─────────────────────────────────────────────────────── */
.ifs-sidebar {
  display: flex;
  flex-direction: column;
  width: 240px;
  background: var(--surface-primary);
  border-right: 1px solid var(--border-base);
  padding: var(--gap-300);
  box-sizing: border-box;
  overflow: hidden;
  transition: width var(--motion-duration-slow) var(--motion-ease-standard);
}
.ifs-sidebar--collapsed {
  width: 48px;
}

/* ── Menu wrapper ──────────────────────────────────────────────────────── */
.ifs-sidebar__menu {
  display: flex;
  flex-direction: column;
  gap: var(--gap-100);
  flex: 1 0 0;
  min-height: 0;
}

/* ── Title row ─────────────────────────────────────────────────────────── */
.ifs-sidebar__title {
  display: flex;
  align-items: center;
  gap: var(--gap-100);
  padding: var(--gap-100) var(--gap-200) 0;
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
}
.ifs-sidebar--collapsed .ifs-sidebar__title {
  padding: var(--gap-100) 0 0;
}
.ifs-sidebar__title-text {
  flex: 1 0 0;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  opacity: 1;
  transition: opacity var(--motion-duration-fast) var(--motion-ease-standard);
}
.ifs-sidebar--collapsed .ifs-sidebar__title-text {
  opacity: 0;
  pointer-events: none;
}

/* ── Icon button (collapse toggle) ────────────────────────────────────── */
.ifs-sidebar__icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  padding: var(--gap-100);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-100);
  cursor: pointer;
  color: var(--text-secondary);
  transition:
    background var(--motion-duration-fast) var(--motion-ease-standard),
    border-color var(--motion-duration-fast) var(--motion-ease-standard),
    color var(--motion-duration-fast) var(--motion-ease-standard);
  box-sizing: border-box;
}
.ifs-sidebar__icon-btn:hover {
  background: var(--background-elevation-1-secondary);
  color: var(--text-primary);
}
.ifs-sidebar__icon-btn:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 1px;
}
.ifs-sidebar__icon-btn svg {
  display: block;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* ── Nav items area ────────────────────────────────────────────────────── */
.ifs-sidebar__items {
  display: flex;
  flex-direction: column;
  gap: var(--gap-200);
  padding: 12px 0;
  flex-shrink: 0;
  width: 100%;
  opacity: 1;
  transition: opacity var(--motion-duration-fast) var(--motion-ease-standard);
}
.ifs-sidebar--collapsed .ifs-sidebar__items {
  opacity: 0;
  pointer-events: none;
}

/* ── Section ───────────────────────────────────────────────────────────── */
.ifs-sidebar__section {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.ifs-sidebar__section-heading {
  display: flex;
  align-items: flex-end;
  padding: 12px var(--gap-200) var(--gap-100) var(--gap-200);
  border-radius: var(--radius-150);
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
}
.ifs-sidebar__section-label {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  color: var(--text-disabled);
  white-space: nowrap;
  overflow: hidden;
}
.ifs-sidebar__children {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* ── Nav item (parent + child) ─────────────────────────────────────────── */
.ifs-sidebar__item {
  display: flex;
  flex-direction: column;
  height: 40px;
  justify-content: center;
  border-radius: var(--radius-100);
  cursor: pointer;
  background: transparent;
  border: none;
  width: 100%;
  padding: 0;
  text-align: left;
  flex-shrink: 0;
  transition: background var(--motion-duration-fast) var(--motion-ease-standard);
  position: relative;
}
.ifs-sidebar__item:hover,
.ifs-sidebar__item--hovered {
  background: var(--background-elevation-1-secondary);
}
.ifs-sidebar__item--selected {
  background: var(--background-elevation-1-secondary);
}
.ifs-sidebar__item:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: -2px;
}

/* ── Item inner row ────────────────────────────────────────────────────── */
.ifs-sidebar__item-inner {
  display: flex;
  align-items: center;
  gap: var(--gap-100);
  padding: var(--gap-200);
  border-radius: var(--radius-150);
  width: 100%;
  box-sizing: border-box;
}
.ifs-sidebar__item--child .ifs-sidebar__item-inner {
  gap: var(--gap-50);
}

/* ── Item label ────────────────────────────────────────────────────────── */
.ifs-sidebar__item-label {
  flex: 1 0 0;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.2px;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}
.ifs-sidebar__item--child .ifs-sidebar__item-label {
  color: var(--text-secondary);
}
.ifs-sidebar__item--child.ifs-sidebar__item--selected .ifs-sidebar__item-label,
.ifs-sidebar__item--child:hover .ifs-sidebar__item-label {
  color: var(--text-primary);
}

/* ── Child indent arrow icon ───────────────────────────────────────────── */
.ifs-sidebar__child-icon {
  display: flex;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  overflow: hidden;
  color: var(--text-secondary);
}
.ifs-sidebar__item--selected .ifs-sidebar__child-icon,
.ifs-sidebar__item:hover .ifs-sidebar__child-icon {
  color: var(--text-primary);
}
.ifs-sidebar__child-icon svg {
  display: block;
  width: 100%;
  height: 100%;
}

/* ── Hover edit button (child items only) ──────────────────────────────── */
.ifs-sidebar__edit-btn {
  display: none;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  padding: var(--gap-100);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-100);
  cursor: pointer;
  color: var(--text-secondary);
  box-sizing: border-box;
  transition:
    background var(--motion-duration-fast) var(--motion-ease-standard),
    color var(--motion-duration-fast) var(--motion-ease-standard);
}
.ifs-sidebar__item:hover .ifs-sidebar__edit-btn {
  display: flex;
}
.ifs-sidebar__edit-btn:hover {
  background: var(--background-elevation-1-tertiary);
  color: var(--text-primary);
}
.ifs-sidebar__edit-btn svg {
  display: block;
  width: 16px;
  height: 16px;
}
`;

let _injected = false;
function ensureCSS() {
  if (_injected || typeof document === "undefined") return;
  _injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "sidebar");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* ── Inline SVG icons ──────────────────────────────────────────────────── */

function IconArrowBarLeft() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="13" y1="2" x2="13" y2="14" />
      <polyline points="7 4 3 8 7 12" />
      <line x1="3" y1="8" x2="11" y2="8" />
    </svg>
  );
}

function IconArrowBarRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="2" x2="3" y2="14" />
      <polyline points="9 4 13 8 9 12" />
      <line x1="13" y1="8" x2="5" y2="8" />
    </svg>
  );
}

function IconCornerDownRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="10 11 13 14 10 17" transform="scale(1) translate(0,-3)" />
      <path d="M3 3v5a3 3 0 0 0 3 3h7" />
    </svg>
  );
}

function IconPencilPlus() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.5 2.5l3 3L5 14H2v-3L10.5 2.5z" />
      <line x1="8" y1="5" x2="11" y2="8" />
      <line x1="13" y1="1" x2="13" y2="5" />
      <line x1="11" y1="3" x2="15" y2="3" />
    </svg>
  );
}

/* ── SidebarItem ───────────────────────────────────────────────────────── */
function SidebarItem({ item, isSelected, onSelect, isChild = false }) {
  return (
    <button
      className={[
        "ifs-sidebar__item",
        isChild ? "ifs-sidebar__item--child" : "ifs-sidebar__item--parent",
        isSelected ? "ifs-sidebar__item--selected" : "",
      ].filter(Boolean).join(" ")}
      onClick={() => onSelect && onSelect(item.id)}
      aria-current={isSelected ? "page" : undefined}
    >
      <span className="ifs-sidebar__item-inner">
        {isChild && (
          <span className="ifs-sidebar__child-icon">
            <IconCornerDownRight />
          </span>
        )}
        <span className="ifs-sidebar__item-label">{item.label}</span>
        {isChild && (
          <span
            className="ifs-sidebar__edit-btn"
            role="button"
            tabIndex={-1}
            aria-label={`Edit ${item.label}`}
            onClick={(e) => { e.stopPropagation(); item.onEdit && item.onEdit(item.id); }}
          >
            <IconPencilPlus />
          </span>
        )}
      </span>
    </button>
  );
}

/* ── Sidebar ───────────────────────────────────────────────────────────── */
/**
 * Collapsible side navigation with parent items, grouped sections, and
 * child items. Controlled — pass `value` and `onChange`.
 */
export function Sidebar({
  title = "Value",
  items = [],
  value,
  onChange,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onToggle,
  className = "",
  style,
  ...rest
}) {
  ensureCSS();

  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isControlled = collapsedProp !== undefined;
  const collapsed = isControlled ? collapsedProp : internalCollapsed;

  function handleToggle() {
    if (!isControlled) setInternalCollapsed((c) => !c);
    onToggle && onToggle(!collapsed);
  }

  function handleSelect(id) {
    onChange && onChange(id);
  }

  return (
    <nav
      className={[
        "ifs-sidebar",
        collapsed ? "ifs-sidebar--collapsed" : "",
        className,
      ].filter(Boolean).join(" ")}
      style={style}
      aria-label={title}
      {...rest}
    >
      <div className="ifs-sidebar__menu">
        {/* Title row */}
        <div className="ifs-sidebar__title">
          {!collapsed && (
            <span className="ifs-sidebar__title-text">{title}</span>
          )}
          <button
            className="ifs-sidebar__icon-btn"
            onClick={handleToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <IconArrowBarRight /> : <IconArrowBarLeft />}
          </button>
        </div>

        {/* Nav items — hidden when collapsed */}
        {!collapsed && (
          <div className="ifs-sidebar__items">
            {items.map((entry, i) => {
              // Section group
              if (entry.sectionLabel !== undefined) {
                return (
                  <div key={entry.sectionLabel ?? i} className="ifs-sidebar__section">
                    <div className="ifs-sidebar__section-heading">
                      <span className="ifs-sidebar__section-label">{entry.sectionLabel}</span>
                    </div>
                    <div className="ifs-sidebar__children">
                      {(entry.children ?? []).map((child) => (
                        <SidebarItem
                          key={child.id}
                          item={child}
                          isSelected={child.id === value}
                          onSelect={handleSelect}
                          isChild
                        />
                      ))}
                    </div>
                  </div>
                );
              }
              // Standalone parent item
              return (
                <SidebarItem
                  key={entry.id}
                  item={entry}
                  isSelected={entry.id === value}
                  onSelect={handleSelect}
                />
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Sidebar;
