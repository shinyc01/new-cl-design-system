import React, { useState, useRef, useEffect, useId } from "react";

/* ─── Icons ──────────────────────────────────────────────────────────────── */

/** Cooper AI search — magnifier with a small AI sparkle */
const AiSearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M6.5 2a4.5 4.5 0 1 0 2.768 8.036l2.848 2.848a.75.75 0 1 0 1.06-1.06L10.33 8.976A4.5 4.5 0 0 0 6.5 2ZM3.5 6.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
      fill="currentColor"/>
    <path d="M10.5 2.5c0-.28.22-.5.5-.5.83 0 1.5.67 1.5 1.5 0 .28-.22.5-.5.5a.5.5 0 0 1-.5-.5A.5.5 0 0 0 11 3a.5.5 0 0 1-.5-.5Z"
      fill="currentColor" opacity=".7"/>
    <circle cx="12" cy="2" r=".75" fill="currentColor"/>
  </svg>
);

/** Microphone — shown in text-input mode (click to switch to voice) */
const MicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M8 1.5A2.5 2.5 0 0 0 5.5 4v4a2.5 2.5 0 0 0 5 0V4A2.5 2.5 0 0 0 8 1.5ZM4 4a4 4 0 0 1 8 0v4a4 4 0 0 1-8 0V4Zm-1.5 4a.75.75 0 0 1 .75.75A4.75 4.75 0 0 0 12.75 8.75a.75.75 0 0 1 1.5 0 6.25 6.25 0 0 1-5.5 6.21V16a.75.75 0 0 1-1.5 0v-1.04A6.25 6.25 0 0 1 1.75 8.75.75.75 0 0 1 2.5 8Z"
      fill="currentColor"/>
  </svg>
);

/** Keyboard — shown in voice-input mode (click to switch to text) */
const KeyboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M1.5 4A1.5 1.5 0 0 0 0 5.5v5A1.5 1.5 0 0 0 1.5 12h13a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 14.5 4h-13ZM1.5 5.5h13v5h-13v-5ZM3 7a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 7Zm2.75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Zm2 0h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Zm2 0h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Zm2 0h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 9.25a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.25Z"
      fill="currentColor"/>
  </svg>
);

/** Filled circle × — shown when text is present */
const CloseCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm2.53 5.47a.75.75 0 0 1 0 1.06L9.06 8l1.47 1.47a.75.75 0 1 1-1.06 1.06L8 9.06l-1.47 1.47a.75.75 0 0 1-1.06-1.06L6.94 8 5.47 6.53a.75.75 0 0 1 1.06-1.06L8 6.94l1.47-1.47a.75.75 0 0 1 1.06 0Z"
      fill="currentColor"/>
  </svg>
);

/* ─── Styles ─────────────────────────────────────────────────────────────── */

const CSS = `
.ifs-smart-search-wrap {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  font-family: var(--font-sans);
}

/* pill field */
.ifs-smart-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 40px;
  padding: 8px 4px 8px 12px;
  border-radius: 1000px;
  border: 1px solid var(--search-border-default);
  background: transparent;
  transition:
    border-color var(--duration-fast, 120ms) var(--ease-standard, ease),
    box-shadow   var(--duration-fast, 120ms) var(--ease-standard, ease);
}
.ifs-smart-search:hover    { border-color: var(--search-border-hover); }
.ifs-smart-search--typing  { border-color: var(--search-border-typing); }
.ifs-smart-search--focus   { box-shadow: 0 0 0 2px var(--focus-ring); }
.ifs-smart-search--disabled { opacity: .5; pointer-events: none; }

/* left group */
.ifs-smart-search__left {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}
.ifs-smart-search__ai-icon {
  display: inline-flex;
  flex: none;
  color: var(--icon-tertiary);
}
/* input + ghost wrapper */
.ifs-smart-search__input-wrap {
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
}
.ifs-smart-search__el {
  flex: 1;
  min-width: 0;
  width: 100%;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ifs-smart-search__el::placeholder { color: var(--text-tertiary); }

/* ghost completion text */
.ifs-smart-search__ghost {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  font: 500 12px/1 var(--font-sans);
  letter-spacing: -0.15px;
  z-index: 0;
}

/* right icon button */
.ifs-smart-search__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 32px;
  height: 32px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  color: var(--icon-tertiary);
  transition:
    color var(--duration-fast) var(--ease-standard),
    background var(--duration-fast) var(--ease-standard),
    border-radius var(--duration-fast) var(--ease-standard);
}
/* mic/keyboard toggle — stays circular */
.ifs-smart-search__action--toggle {
  border-radius: 1000px;
}
/* clear button — square with rounded corners */
.ifs-smart-search__action--clear {
  border-radius: var(--radius-sm, 4px);
}
.ifs-smart-search__action:hover {
  color: var(--text-primary);
  background: var(--button-ghost-fill-hover, rgba(255,255,255,0.15));
}

/* dropdown — same glass panel as the regular Search */
.ifs-smart-search-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: var(--z-dropdown, 200);
  border-radius: var(--radius-md, 8px);
  border: 1px solid var(--border-base, rgba(255,255,255,0.1));
  background: var(--background-overlay, rgba(0,0,0,0.88));
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  box-shadow: 0 12px 16px -2px rgba(0,0,0,0.35);
  overflow: hidden;
  max-height: 280px;
  overflow-y: auto;
}
.ifs-smart-search-dropdown::-webkit-scrollbar { width: 4px; }
.ifs-smart-search-dropdown::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.15);
  border-radius: 8px;
}
.ifs-smart-search-dropdown__section { padding: 12px 8px 8px; }
.ifs-smart-search-dropdown__heading {
  padding: 4px 8px;
  margin: 0 0 4px;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  color: var(--text-secondary, rgba(255,255,255,0.75));
}

/* suggestion items */
.ifs-smart-search-item {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 4px 8px;
  gap: 4px;
  border-radius: var(--radius-xs, 4px);
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-standard);
}
.ifs-smart-search-item:hover,
.ifs-smart-search-item--active { background: rgba(255,255,255,0.05); }
.ifs-smart-search-item__text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.1px;
}
.ifs-smart-search-item__match      { color: var(--text-primary, white); }
.ifs-smart-search-item__completion { color: var(--text-tertiary, rgba(255,255,255,0.55)); }
`;

let _injected = false;
function ensureCSS() {
  if (_injected || typeof document === "undefined") return;
  _injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "smart-search");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* ─── Component ─────────────────────────────────────────────────────────── */

/**
 * Pill-shaped AI smart search field.
 *
 * Props
 * ─────
 * placeholder   string          Default: "Ask anything…"
 * suggestions   string[]        Strings to autocomplete against.
 * value         string          Controlled value.
 * defaultValue  string          Uncontrolled default.
 * mode          "text"|"voice"  Controlled input mode.
 * defaultMode   "text"|"voice"  Uncontrolled default mode. Default: "text".
 * onModeChange  fn("text"|"voice")
 * onChange      fn(value)
 * onSearch      fn(value)
 * onClear       fn()
 * disabled      boolean
 * id / className / style
 */
export function SmartSearch({
  placeholder = "Ask anything…",
  suggestions = [],
  value: controlledValue,
  defaultValue = "",
  mode: controlledMode,
  defaultMode = "text",
  onModeChange,
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

  const isControlledValue = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlledValue ? controlledValue : internalValue;

  const isControlledMode = controlledMode !== undefined;
  const [internalMode, setInternalMode] = useState(defaultMode);
  const mode = isControlledMode ? controlledMode : internalMode;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [focused, setFocused] = useState(false);

  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const isTyping = value.length > 0;

  /* filtered suggestions */
  const filtered = value.trim()
    ? suggestions.filter(s => s.toLowerCase().includes(value.toLowerCase()))
    : suggestions;

  const showDropdown = open && filtered.length > 0;

  /* first match for inline ghost */
  const firstMatch = value && filtered[0];
  const inlineGhost =
    firstMatch && firstMatch.toLowerCase().startsWith(value.toLowerCase())
      ? firstMatch.slice(value.length)
      : null;

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
    if (!isControlledValue) setInternalValue(v);
    onChange?.(v);
    setOpen(true);
    setActiveIndex(-1);
  }

  function handleClear() {
    if (!isControlledValue) setInternalValue("");
    onChange?.("");
    onClear?.();
    setOpen(false);
    inputRef.current?.focus();
  }

  function handleSelect(suggestion) {
    if (!isControlledValue) setInternalValue(suggestion);
    onChange?.(suggestion);
    onSearch?.(suggestion);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleToggleMode() {
    const next = mode === "text" ? "voice" : "text";
    if (!isControlledMode) setInternalMode(next);
    onModeChange?.(next);
  }

  function handleKeyDown(e) {
    if (!showDropdown) {
      if (e.key === "Enter") { onSearch?.(value); }
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
      if (activeIndex >= 0) handleSelect(filtered[activeIndex]);
      else { onSearch?.(value); setOpen(false); }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  const fieldCls = [
    "ifs-smart-search",
    isTyping   ? "ifs-smart-search--typing"   : "",
    focused    ? "ifs-smart-search--focus"    : "",
    disabled   ? "ifs-smart-search--disabled" : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      ref={wrapRef}
      className={["ifs-smart-search-wrap", className].filter(Boolean).join(" ")}
      style={style}
    >
      <div className={fieldCls}>

        {/* left: icon + input */}
        <div className="ifs-smart-search__left">
          <span className="ifs-smart-search__ai-icon">
            <AiSearchIcon />
          </span>

          <div className="ifs-smart-search__input-wrap">
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={showDropdown}
              aria-activedescendant={activeIndex >= 0 ? `ifs-ss-opt-${inputId}-${activeIndex}` : undefined}
              className="ifs-smart-search__el"
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete="off"
              spellCheck={false}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => { setFocused(true); setOpen(true); }}
              onBlur={() => setFocused(false)}
              style={{ position: "relative", zIndex: 1 }}
            />
            {/* ghost inline completion */}
            {inlineGhost && !showDropdown && (
              <span className="ifs-smart-search__ghost" aria-hidden="true">
                <span style={{ color: "transparent" }}>{value}</span>
                <span style={{ color: "var(--text-tertiary, rgba(255,255,255,0.55))" }}>{inlineGhost}</span>
              </span>
            )}
          </div>
        </div>

        {/* right: clear (when typing) or mode toggle */}
        {isTyping ? (
          <button
            type="button"
            className="ifs-smart-search__action ifs-smart-search__action--clear"
            onClick={handleClear}
            tabIndex={-1}
            aria-label="Clear"
          >
            <CloseCircleIcon />
          </button>
        ) : (
          <button
            type="button"
            className="ifs-smart-search__action ifs-smart-search__action--toggle"
            onClick={handleToggleMode}
            tabIndex={-1}
            aria-label={mode === "text" ? "Switch to voice input" : "Switch to text input"}
            title={mode === "text" ? "Switch to voice input" : "Switch to text input"}
          >
            {mode === "text" ? <MicIcon /> : <KeyboardIcon />}
          </button>
        )}
      </div>

      {/* suggestions dropdown */}
      {showDropdown && (
        <div
          className="ifs-smart-search-dropdown"
          role="listbox"
          aria-label="Suggestions"
        >
          <div className="ifs-smart-search-dropdown__section">
            <p className="ifs-smart-search-dropdown__heading">Suggested questions</p>
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
                    {before && <span className="ifs-smart-search-item__completion">{before}</span>}
                    <span className="ifs-smart-search-item__match">{match}</span>
                    {after && <span className="ifs-smart-search-item__completion">{after}</span>}
                  </>
                );
              } else {
                label = <span className="ifs-smart-search-item__completion">{s}</span>;
              }

              return (
                <div
                  key={s}
                  id={`ifs-ss-opt-${inputId}-${i}`}
                  role="option"
                  aria-selected={isActive}
                  className={["ifs-smart-search-item", isActive ? "ifs-smart-search-item--active" : ""].filter(Boolean).join(" ")}
                  onMouseDown={e => { e.preventDefault(); handleSelect(s); }}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <span className="ifs-smart-search-item__text">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SmartSearch;
