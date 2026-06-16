import React, { useState, useRef, useEffect, useId } from "react";

/* ─── Icons ──────────────────────────────────────────────────────────────── */

const SearchIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M5.25 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM0 5.25a5.25 5.25 0 1 1 9.37 3.25l2.44 2.44a.75.75 0 1 1-1.06 1.06L8.31 9.56A5.25 5.25 0 0 1 0 5.25Z"
      fill="currentColor"/>
  </svg>
);

const CloseCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm2.53 5.47a.75.75 0 0 1 0 1.06L9.06 8l1.47 1.47a.75.75 0 1 1-1.06 1.06L8 9.06l-1.47 1.47a.75.75 0 0 1-1.06-1.06L6.94 8 5.47 6.53a.75.75 0 0 1 1.06-1.06L8 6.94l1.47-1.47a.75.75 0 0 1 1.06 0Z"
      fill="currentColor"/>
  </svg>
);

/* ─── Styles ─────────────────────────────────────────────────────────────── */

const CSS = `
/* wrapper */
.ifs-search-wrap {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  font-family: var(--font-sans);
}

/* field */
.ifs-search {
  display: flex;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  height: 32px;
  padding: 0 4px 0 8px;
  border-radius: var(--radius-sm, 4px);
  background: var(--search-fill-default);
  border: 1px solid var(--search-border-default);
  transition:
    border-color var(--duration-fast, 120ms) var(--ease-standard, ease),
    background   var(--duration-fast, 120ms) var(--ease-standard, ease);
}
.ifs-search:hover   { border-color: var(--search-border-hover); background: var(--search-fill-hover); }
.ifs-search--typing { border-color: var(--search-border-typing); background: var(--search-fill-typing); }
.ifs-search--focus  {
  outline: 3px solid var(--focus-outer, #5599ff);
  outline-offset: 0;
  box-shadow: inset 0 0 0 1.5px var(--focus-inner, #000);
}
.ifs-search--disabled { opacity: .5; pointer-events: none; }

/* search icon */
.ifs-search__icon {
  display: inline-flex;
  flex: none;
  color: var(--icon-tertiary);
}

/* native input */
.ifs-search__el {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.15px;
  color: var(--text-primary);
  caret-color: var(--text-accent-cooper, #c87941);
  line-height: 1;
}
.ifs-search__el::placeholder { color: var(--text-tertiary); }

/* clear button */
.ifs-search__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 24px;
  height: 24px;
  padding: 4px;
  border: none;
  background: transparent;
  border-radius: var(--radius-sm, 4px);
  color: var(--icon-tertiary);
  cursor: pointer;
  transition: color var(--duration-fast, 120ms) var(--ease-standard, ease),
              background var(--duration-fast, 120ms) var(--ease-standard, ease);
}
.ifs-search__clear:hover {
  color: var(--text-primary);
  background: var(--button-ghost-fill-hover, rgba(255,255,255,0.15));
}

/* dropdown */
.ifs-search-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: var(--z-dropdown, 200);
  border-radius: var(--radius-md, 8px);
  border: 1px solid var(--border-base, rgba(255,255,255,0.1));
  background: var(--background-overlay, rgba(0,0,0,0.85));
  backdrop-filter: blur(var(--blur-strong, 40px));
  -webkit-backdrop-filter: blur(var(--blur-strong, 40px));
  box-shadow: 0 12px 16px -2px rgba(0,0,0,0.35);
  overflow: hidden;
  max-height: 280px;
  overflow-y: auto;
}
.ifs-search-dropdown::-webkit-scrollbar { width: 4px; }
.ifs-search-dropdown::-webkit-scrollbar-track { background: transparent; }
.ifs-search-dropdown::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.15);
  border-radius: 8px;
}

/* dropdown section */
.ifs-search-dropdown__section {
  padding: 12px 8px 8px;
}
.ifs-search-dropdown__heading {
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  color: var(--text-secondary, rgba(255,255,255,0.75));
  margin-bottom: 4px;
}

/* suggestion item */
.ifs-search-item {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 4px 8px;
  gap: 4px;
  border-radius: var(--radius-xs, 4px);
  cursor: pointer;
  transition: background var(--duration-fast, 120ms) var(--ease-standard, ease);
}
.ifs-search-item:hover,
.ifs-search-item--active {
  background: var(--surface-secondary-alpha, rgba(255,255,255,0.05));
}
.ifs-search-item__text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: var(--text-primary, white);
}
.ifs-search-item__match { color: var(--text-primary, white); }
.ifs-search-item__completion { color: var(--text-tertiary, rgba(255,255,255,0.55)); }
`;

let _injected = false;
function ensureCSS() {
  if (_injected || typeof document === "undefined") return;
  _injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "search");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* ─── Component ─────────────────────────────────────────────────────────── */

/**
 * Search field with autofill-as-you-type suggestions and clear button.
 *
 * Props
 * ─────
 * placeholder  string          Input placeholder. Default: "Search for…"
 * suggestions  string[]        All suggestion strings to filter against.
 * value        string          Controlled value.
 * defaultValue string          Uncontrolled default.
 * onChange     fn(value)       Fires on every keystroke.
 * onSearch     fn(value)       Fires on Enter or suggestion pick.
 * onClear      fn()            Fires when user clicks the × button.
 * disabled     boolean
 * id           string
 * className    string
 * style        object
 */
export function Search({
  placeholder = "Search for…",
  suggestions = [],
  value: controlledValue,
  defaultValue = "",
  onChange,
  onSearch,
  onClear,
  disabled = false,
  id,
  className = "",
  style,
}) {
  ensureCSS();
  const autoId = useId();
  const inputId = id || autoId;

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [focused, setFocused] = useState(false);

  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  /* filtered suggestions */
  const filtered = value.trim()
    ? suggestions.filter(s => s.toLowerCase().includes(value.toLowerCase()))
    : suggestions;

  const showDropdown = open && filtered.length > 0;

  /* close on outside click */
  useEffect(() => {
    function onDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  function handleChange(e) {
    const v = e.target.value;
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
    setOpen(true);
    setActiveIndex(-1);
  }

  function handleClear() {
    if (!isControlled) setInternalValue("");
    onChange?.("");
    onClear?.();
    setOpen(false);
    inputRef.current?.focus();
  }

  function handleSelect(suggestion) {
    if (!isControlled) setInternalValue(suggestion);
    onChange?.(suggestion);
    onSearch?.(suggestion);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(e) {
    if (!showDropdown) {
      if (e.key === "Enter") onSearch?.(value);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        handleSelect(filtered[activeIndex]);
      } else {
        onSearch?.(value);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  /* inline completion ghost text — first filtered match after cursor text */
  const firstMatch = value && filtered[0];
  const inlineGhost =
    firstMatch && firstMatch.toLowerCase().startsWith(value.toLowerCase())
      ? firstMatch.slice(value.length)
      : null;

  const isTyping = value.length > 0;
  const fieldCls = [
    "ifs-search",
    isTyping ? "ifs-search--typing" : "",
    focused ? "ifs-search--focus" : "",
    disabled ? "ifs-search--disabled" : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      ref={wrapRef}
      className={["ifs-search-wrap", className].filter(Boolean).join(" ")}
      style={style}
    >
      <div className={fieldCls}>
        <span className="ifs-search__icon">
          <SearchIcon />
        </span>

        {/* input + inline ghost in a relative container */}
        <div style={{ position: "relative", flex: 1, minWidth: 0, display: "flex", alignItems: "center" }}>
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={showDropdown}
            aria-activedescendant={activeIndex >= 0 ? `ifs-search-opt-${inputId}-${activeIndex}` : undefined}
            className="ifs-search__el"
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            spellCheck={false}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => { setFocused(true); setOpen(true); }}
            onBlur={() => setFocused(false)}
            style={{ position: "relative", zIndex: 1, background: "transparent", width: "100%" }}
          />
          {/* ghost completion overlay */}
          {inlineGhost && !showDropdown && (
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                whiteSpace: "nowrap",
                overflow: "hidden",
                font: "500 12px/1 var(--font-sans)",
                letterSpacing: "-0.15px",
                color: "transparent",
                zIndex: 0,
              }}
            >
              <span style={{ color: "transparent" }}>{value}</span>
              <span style={{ color: "var(--text-tertiary, rgba(255,255,255,0.55))" }}>{inlineGhost}</span>
            </span>
          )}
        </div>

        {/* clear button — only when there's text */}
        {isTyping && (
          <button
            type="button"
            className="ifs-search__clear"
            onClick={handleClear}
            tabIndex={-1}
            aria-label="Clear search"
          >
            <CloseCircleIcon />
          </button>
        )}
      </div>

      {/* dropdown */}
      {showDropdown && (
        <div
          className="ifs-search-dropdown"
          role="listbox"
          aria-label="Suggestions"
        >
          <div className="ifs-search-dropdown__section">
            <p className="ifs-search-dropdown__heading">Suggested questions</p>
            {filtered.map((s, i) => {
              const lc = s.toLowerCase();
              const query = value.toLowerCase();
              const matchIdx = lc.indexOf(query);
              const isActive = i === activeIndex;

              let label;
              if (matchIdx !== -1 && value) {
                const before = s.slice(0, matchIdx);
                const match  = s.slice(matchIdx, matchIdx + value.length);
                const after  = s.slice(matchIdx + value.length);
                label = (
                  <>
                    {before && <span className="ifs-search-item__completion">{before}</span>}
                    <span className="ifs-search-item__match">{match}</span>
                    {after && <span className="ifs-search-item__completion">{after}</span>}
                  </>
                );
              } else {
                label = <span className="ifs-search-item__completion">{s}</span>;
              }

              return (
                <div
                  key={s}
                  id={`ifs-search-opt-${inputId}-${i}`}
                  role="option"
                  aria-selected={isActive}
                  className={["ifs-search-item", isActive ? "ifs-search-item--active" : ""].filter(Boolean).join(" ")}
                  onMouseDown={e => { e.preventDefault(); handleSelect(s); }}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <span className="ifs-search-item__text">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
