/* @ds-bundle: {"format":3,"namespace":"IFSDesignSystem_6f71e3","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"QuickStatCard","sourcePath":"components/core/QuickStatCard.jsx"},{"name":"Search","sourcePath":"components/forms/Search.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"SmartSearch","sourcePath":"components/forms/SmartSearch.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"SegmentedControl","sourcePath":"components/navigation/SegmentedControl.jsx"},{"name":"Stepper","sourcePath":"components/navigation/Stepper.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"d8a41d7a453c","components/core/Badge.jsx":"9aa6b7605894","components/core/Button.jsx":"d1d95a4d5515","components/core/Card.jsx":"eaccf9cdd3f4","components/forms/Checkbox.jsx":"ace0ab5489a9","components/forms/Input.jsx":"f08ad3c4f945","components/core/QuickStatCard.jsx":"a3c9f2e81b44","components/forms/Search.jsx":"89712c37e7c9","components/forms/Select.jsx":"1dabab96ef47","components/forms/SmartSearch.jsx":"4d93dbc5eedb","components/forms/Switch.jsx":"b1f64e5293a2","components/navigation/SegmentedControl.jsx":"80eb5ce25c09","components/navigation/Stepper.jsx":"ce0987e35973","components/navigation/Tabs.jsx":"af89de9190a2"}} */

(() => {

const __ds_ns = (window.IFSDesignSystem_6f71e3 = window.IFSDesignSystem_6f71e3 || {});

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
const CSS = `
.ifs-avatar{
  display:inline-flex; align-items:center; justify-content:center; flex:none;
  box-sizing:border-box; border-radius:50%; overflow:hidden; position:relative;
  font-family:var(--font-sans); font-weight:var(--weight-semibold); color:#fff;
  background:var(--surface-3); user-select:none;
}
.ifs-avatar--square{ border-radius:var(--radius-sm); }
.ifs-avatar img{ width:100%; height:100%; object-fit:cover; display:block; }
.ifs-avatar__ring{ box-shadow:0 0 0 2px var(--surface-0), 0 0 0 3px var(--white-200); }

.ifs-avatar--xs{ width:20px; height:20px; font-size:9px; }
.ifs-avatar--sm{ width:24px; height:24px; font-size:10px; }
.ifs-avatar--md{ width:32px; height:32px; font-size:12px; }
.ifs-avatar--lg{ width:40px; height:40px; font-size:15px; }

.ifs-avatar-group{ display:inline-flex; align-items:center; }
.ifs-avatar-group > *{ margin-left:-8px; box-shadow:0 0 0 2px var(--surface-0); border-radius:50%; }
.ifs-avatar-group > *:first-child{ margin-left:0; }
.ifs-avatar-group__more{
  display:inline-flex; align-items:center; justify-content:center;
  background:var(--white-100); color:var(--text-secondary);
  font-family:var(--font-sans); font-weight:var(--weight-semibold);
}
`;
let _i = false;
function ensureCSS() {
  if (_i || typeof document === "undefined") return;
  _i = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "avatar");
  s.textContent = CSS;
  document.head.appendChild(s);
}
const PALETTE = ["var(--purple-600)", "var(--copper-600)", "var(--blue-700)", "var(--green-700)", "var(--solid-dark-pink)"];
function hashColor(str = "") {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = h * 31 + str.charCodeAt(i) >>> 0;
  return PALETTE[h % PALETTE.length];
}
function initials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
}
const SIZE_PX = { xs: 20, sm: 24, md: 32, lg: 40 };
function Avatar({ name = "", src, size = "md", square = false, className = "", style, ...rest }) {
  ensureCSS();
  const cls = ["ifs-avatar", `ifs-avatar--${size}`, square ? "ifs-avatar--square" : "", className].filter(Boolean).join(" ");
  const bg = src ? void 0 : hashColor(name);
  return /* @__PURE__ */ React.createElement("span", { className: cls, style: { background: bg, ...style }, title: name || void 0, ...rest }, src ? /* @__PURE__ */ React.createElement("img", { src, alt: name }) : initials(name));
}
function AvatarGroup({ people = [], max = 4, size = "md", className = "", ...rest }) {
  ensureCSS();
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  const px = SIZE_PX[size] || 32;
  return /* @__PURE__ */ React.createElement("span", { className: ["ifs-avatar-group", className].filter(Boolean).join(" "), ...rest }, shown.map((p, i) => /* @__PURE__ */ React.createElement(Avatar, { key: i, size, name: p.name, src: p.src })), extra > 0 ? /* @__PURE__ */ React.createElement(
    "span",
    {
      className: "ifs-avatar-group__more",
      style: { width: px, height: px, fontSize: Math.round(px * 0.36), borderRadius: "50%", marginLeft: -8 }
    },
    "+",
    extra
  ) : null);
}
__ds_ns.Avatar = Avatar;
__ds_ns.AvatarGroup = AvatarGroup;
})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: "components/core/Avatar.jsx", error: String(e) }); }

// components/core/Badge.jsx
try { (() => {
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
function ensureCSS() {
  if (_i || typeof document === "undefined") return;
  _i = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "badge");
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Badge({
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
    "ifs-badge",
    `ifs-badge--${variant}`,
    `t-${tone}`,
    size !== "md" ? `ifs-badge--${size}` : "",
    square ? "ifs-badge--square" : "",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ React.createElement("span", { className: cls, ...rest }, dot ? /* @__PURE__ */ React.createElement("span", { className: "ifs-badge__dot" }) : null, icon ? /* @__PURE__ */ React.createElement("span", { className: "ifs-badge__icon" }, icon) : null, children);
}
__ds_ns.Badge = Badge;
})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: "components/core/Badge.jsx", error: String(e) }); }

// components/core/Button.jsx
try { (() => {
const CSS = `
.ifs-btn{
  --_h:32px; --_r:var(--button-m-radius,4px); --_px:10px; --_fs:12px; --_lh:16px; --_ls:-0.1px;
  --_fo:2px; --_fi:1px; /* focus outer/inner widths (size-scaled) */
  display:inline-flex; align-items:center; justify-content:center; gap:var(--button-icon-gap,4px);
  height:var(--_h); padding:0 var(--_px); border-radius:var(--_r);
  font-family:var(--font-sans); font-size:var(--_fs); font-weight:var(--weight-medium);
  letter-spacing:var(--_ls); line-height:var(--_lh); white-space:nowrap; cursor:pointer;
  border:1px solid transparent; background:transparent; color:var(--text-primary);
  backdrop-filter:blur(var(--blur-medium));
  transition:background var(--motion-duration-fast) var(--motion-ease-standard),
             border-color var(--motion-duration-fast) var(--motion-ease-standard),
             color var(--motion-duration-fast) var(--motion-ease-standard),
             transform var(--motion-duration-fast) var(--motion-ease-standard);
  -webkit-tap-highlight-color:transparent; box-sizing:border-box;
}
/* Two-layer focus ring: inner contrast + outer accent, thickness scales with size */
.ifs-btn:focus-visible{ outline:none;
  box-shadow:0 0 0 var(--_fi) var(--focus-inner), 0 0 0 calc(var(--_fi) + var(--_fo)) var(--focus-outer); }
.ifs-btn[disabled]{ cursor:not-allowed; }
.ifs-btn__icon{ display:inline-flex; width:16px; height:16px; flex:none; }
.ifs-btn__icon svg{ width:100%; height:100%; display:block; }

/* Sizes \u2014 S(24) 6/4 r4 LabelM \xB7 M(32) 10/8 r4 LabelM \xB7 L(40) 12/10 r8 LabelL */
.ifs-btn--sm{ --_h:var(--button-s-height,24px); --_r:var(--button-s-radius,4px); --_px:var(--button-s-padding-x,6px);  --_fs:12px; --_lh:16px; --_ls:-0.1px;  --_fo:2px; --_fi:1px; }
.ifs-btn--sm .ifs-btn__icon{ width:12px; height:12px; }
.ifs-btn--md{ --_h:var(--button-m-height,32px); --_r:var(--button-m-radius,4px); --_px:var(--button-m-padding-x,10px); --_fs:12px; --_lh:16px; --_ls:-0.1px;  --_fo:3px; --_fi:1.5px; }
.ifs-btn--lg{ --_h:var(--button-l-height,40px); --_r:var(--button-l-radius,8px); --_px:var(--button-l-padding-x,12px); --_fs:14px; --_lh:20px; --_ls:-0.15px; --_fo:4px; --_fi:2px; }
.ifs-btn--icon{ padding:0; width:var(--_h); }
/* Icon buttons keep 16px icons at every size (incl. S24) */
.ifs-btn--icon .ifs-btn__icon{ width:16px; height:16px; }
/* Figma quirk, faithful: ghost square L icon button uses 6px radius (r1,5) */
.ifs-btn--icon.ifs-btn--lg.ifs-btn--ghost:not(.ifs-btn--circle){ --_r:var(--radius-150,6px); }
.ifs-btn--circle{ --_r:var(--radius-full); }
.ifs-btn--pill{ --_r:var(--radius-full); }
.ifs-btn--block{ width:100%; }

/* Primary \u2014 white on dark */
.ifs-btn--primary{ background:var(--button-primary-fill-default); color:var(--text-primary-inverse); border-color:var(--button-primary-border-default); }
.ifs-btn--primary:hover:not([disabled]){ background:var(--button-primary-fill-hover); }
.ifs-btn--primary:active:not([disabled]){ background:var(--button-primary-fill-pressed); }
.ifs-btn--primary[disabled]{ background:var(--button-primary-fill-disabled); color:var(--text-disabled); border-color:transparent; }

/* Secondary \u2014 subtle filled */
.ifs-btn--secondary{ background:var(--button-secondary-fill-default); color:var(--text-primary); border-color:var(--button-secondary-border-default); }
.ifs-btn--secondary:hover:not([disabled]){ background:var(--button-secondary-fill-hover); border-color:var(--button-secondary-border-hover); }
.ifs-btn--secondary:active:not([disabled]){ background:var(--button-secondary-fill-pressed); border-color:var(--button-secondary-border-pressed); }
.ifs-btn--secondary[disabled]{ background:var(--button-secondary-fill-disabled); color:var(--text-disabled); border-color:var(--button-secondary-border-disabled); }

/* Tertiary \u2014 outlined over black/10 fill */
.ifs-btn--tertiary{ background:var(--button-tertiary-fill-default); color:var(--text-primary); border-color:var(--button-tertiary-border-default); }
.ifs-btn--tertiary:hover:not([disabled]){ border-color:var(--button-tertiary-border-hover); }
.ifs-btn--tertiary:active:not([disabled]){ border-color:var(--button-tertiary-border-pressed); }
.ifs-btn--tertiary[disabled]{ color:var(--text-disabled); border-color:var(--button-tertiary-border-disabled); }

/* Ghost \u2014 no chrome; hover/press fill white/15; pressed label dims to secondary */
.ifs-btn--ghost{ background:transparent; color:var(--text-primary); backdrop-filter:none; }
.ifs-btn--ghost:hover:not([disabled]){ background:var(--button-ghost-fill-hover); }
.ifs-btn--ghost:active:not([disabled]){ background:var(--button-ghost-fill-pressed); color:var(--text-secondary); }
.ifs-btn--ghost[disabled]{ color:var(--text-disabled); }

/* Accent-cooper \u2014 the Cooper AI button: black/60 base + cooper glow (bottom
   right) + 25% lavender sheen, exact Figma gradient layers */
.ifs-btn--accent-cooper, .ifs-btn--accent{
  background:var(--gradient-cooper-button-default); background-size:100% 100%;
  background-origin:border-box; background-repeat:no-repeat;
  color:var(--text-primary); border-color:var(--button-accent-cooper-border-default); }
.ifs-btn--accent-cooper:hover:not([disabled]), .ifs-btn--accent:hover:not([disabled]){
  background:var(--gradient-cooper-button-hover); background-size:100% 100%;
  background-origin:border-box; background-repeat:no-repeat; }
.ifs-btn--accent-cooper:active:not([disabled]), .ifs-btn--accent:active:not([disabled]){
  background:var(--gradient-cooper-button-pressed); background-size:100% 100%;
  background-origin:border-box; background-repeat:no-repeat; }
.ifs-btn--accent-cooper[disabled], .ifs-btn--accent[disabled]{
  background:var(--button-accent-cooper-fill-disabled); color:var(--text-disabled); }
/* ("accent" is a legacy alias \u2014 solid copper buttons don't exist in Figma.
   There is intentionally NO negative/destructive button variant: it is not
   a component in this design system.) */
`;
let _injected = false;
function ensureCSS() {
  if (_injected || typeof document === "undefined") return;
  _injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "button");
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Button({
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  block = false,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  ensureCSS();
  const cls = [
    "ifs-btn",
    `ifs-btn--${variant}`,
    `ifs-btn--${size}`,
    iconOnly ? "ifs-btn--icon" : "",
    block ? "ifs-btn--block" : "",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ React.createElement("button", { type, className: cls, ...rest }, leadingIcon ? /* @__PURE__ */ React.createElement("span", { className: "ifs-btn__icon" }, leadingIcon) : null, iconOnly ? /* @__PURE__ */ React.createElement("span", { className: "ifs-btn__icon" }, children) : children, trailingIcon ? /* @__PURE__ */ React.createElement("span", { className: "ifs-btn__icon" }, trailingIcon) : null);
}
__ds_ns.Button = Button;
})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: "components/core/Button.jsx", error: String(e) }); }

// components/core/Card.jsx
try { (() => {
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
let _i = false;
function ensureCSS() {
  if (_i || typeof document === "undefined") return;
  _i = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "card");
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Card({
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
    className
  ].filter(Boolean).join(" ");
  const hasHeader = title || subtitle || action;
  return /* @__PURE__ */ React.createElement("div", { className: cls, ...rest }, hasHeader ? /* @__PURE__ */ React.createElement("div", { className: "ifs-card__header" }, /* @__PURE__ */ React.createElement("div", { className: "ifs-card__titles" }, title ? /* @__PURE__ */ React.createElement("div", { className: "ifs-card__title" }, title) : null, subtitle ? /* @__PURE__ */ React.createElement("div", { className: "ifs-card__subtitle" }, subtitle) : null), action ? /* @__PURE__ */ React.createElement("div", { className: "ifs-card__action" }, action) : null) : null, children);
}
__ds_ns.Card = Card;
})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: "components/core/Card.jsx", error: String(e) }); }

// components/forms/Checkbox.jsx
try { (() => {
const CSS = `
.ifs-check{ display:inline-flex; align-items:center; gap:8px; font-family:var(--font-sans);
  font-size:13px; color:var(--text-primary); cursor:pointer; user-select:none; }
.ifs-check--disabled{ opacity:.5; cursor:not-allowed; }
.ifs-check__box{ width:16px; height:16px; border-radius:var(--radius-xs); flex:none;
  border:1.5px solid var(--white-400); background:var(--white-50);
  display:inline-flex; align-items:center; justify-content:center; color:#fff;
  transition:background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard); }
.ifs-check__box svg{ width:12px; height:12px; opacity:0; transform:scale(.6);
  transition:opacity var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard); }
.ifs-check input{ position:absolute; opacity:0; width:0; height:0; }
.ifs-check input:checked + .ifs-check__box,
.ifs-check input:indeterminate + .ifs-check__box{ background:var(--accent-brand); border-color:var(--accent-brand); }
.ifs-check input:checked + .ifs-check__box svg,
.ifs-check input:indeterminate + .ifs-check__box svg{ opacity:1; transform:scale(1); }
.ifs-check input:focus-visible + .ifs-check__box{ box-shadow:0 0 0 2px var(--focus-ring); }
.ifs-check:hover input:not(:checked):not(:indeterminate) + .ifs-check__box{ border-color:var(--white-400); background:var(--white-100); }
`;
let _i = false;
function ensureCSS() {
  if (_i || typeof document === "undefined") return;
  _i = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "check");
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Checkbox({ label, checked, defaultChecked, indeterminate = false, disabled = false, className = "", onChange, ...rest }) {
  ensureCSS();
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  const cls = ["ifs-check", disabled ? "ifs-check--disabled" : "", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ React.createElement("label", { className: cls, style: { position: "relative" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      ref,
      type: "checkbox",
      checked,
      defaultChecked,
      disabled,
      onChange,
      ...rest
    }
  ), /* @__PURE__ */ React.createElement("span", { className: "ifs-check__box" }, indeterminate ? /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14" })) : /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" }))), label != null ? /* @__PURE__ */ React.createElement("span", null, label) : null);
}
__ds_ns.Checkbox = Checkbox;
})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: "components/forms/Checkbox.jsx", error: String(e) }); }

// components/forms/Input.jsx
try { (() => {
const CSS = `
.ifs-field{ display:flex; flex-direction:column; gap:6px; font-family:var(--font-sans); min-width:0; }
.ifs-field__label{ font-size:12px; font-weight:var(--weight-medium); color:var(--text-secondary); }
.ifs-field__label .req{ color:var(--text-danger); margin-left:2px; }
.ifs-field__hint{ font-size:11px; line-height:1.4; color:var(--text-tertiary); }
.ifs-field__hint--error{ color:var(--text-danger); }

.ifs-input{
  display:flex; align-items:center; gap:8px; box-sizing:border-box;
  height:32px; padding:0 10px; border-radius:var(--radius-sm);
  background:var(--white-50); border:1px solid var(--white-150);
  transition:border-color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard);
}
.ifs-input--sm{ height:24px; padding:0 8px; }
.ifs-input--lg{ height:40px; padding:0 12px; border-radius:var(--radius-md); }
.ifs-input:hover{ border-color:var(--white-400); }
.ifs-input:focus-within{ border-color:var(--white-400); background:var(--white-100);
  box-shadow:0 0 0 3px var(--white-50); }
.ifs-input--error{ border-color:var(--red-500); }
.ifs-input--error:focus-within{ box-shadow:0 0 0 3px var(--bg-danger); }
.ifs-input--disabled{ opacity:.5; pointer-events:none; }
.ifs-input__el{
  flex:1; min-width:0; border:none; outline:none; background:transparent;
  font-family:var(--font-sans); font-size:13px; color:var(--text-primary); line-height:1;
}
.ifs-input__el::placeholder{ color:var(--text-tertiary); }
.ifs-input__affix{ display:inline-flex; align-items:center; color:var(--icon-tertiary); flex:none; font-size:12px; }
.ifs-input__affix svg{ width:15px; height:15px; display:block; }
`;
let _i = false;
function ensureCSS() {
  if (_i || typeof document === "undefined") return;
  _i = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "input");
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Input({
  label,
  hint,
  error,
  required = false,
  size = "md",
  leading,
  trailing,
  disabled = false,
  id,
  className = "",
  style,
  ...rest
}) {
  ensureCSS();
  const inputId = id || (label ? `ifs-${Math.random().toString(36).slice(2, 8)}` : void 0);
  const boxCls = [
    "ifs-input",
    size !== "md" ? `ifs-input--${size}` : "",
    error ? "ifs-input--error" : "",
    disabled ? "ifs-input--disabled" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ React.createElement("div", { className: ["ifs-field", className].filter(Boolean).join(" "), style }, label ? /* @__PURE__ */ React.createElement("label", { className: "ifs-field__label", htmlFor: inputId }, label, required ? /* @__PURE__ */ React.createElement("span", { className: "req" }, "*") : null) : null, /* @__PURE__ */ React.createElement("div", { className: boxCls }, leading ? /* @__PURE__ */ React.createElement("span", { className: "ifs-input__affix" }, leading) : null, /* @__PURE__ */ React.createElement("input", { id: inputId, className: "ifs-input__el", disabled, ...rest }), trailing ? /* @__PURE__ */ React.createElement("span", { className: "ifs-input__affix" }, trailing) : null), error ? /* @__PURE__ */ React.createElement("span", { className: "ifs-field__hint ifs-field__hint--error" }, error) : hint ? /* @__PURE__ */ React.createElement("span", { className: "ifs-field__hint" }, hint) : null);
}
__ds_ns.Input = Input;
})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: "components/forms/Input.jsx", error: String(e) }); }

// components/forms/Search.jsx
try { (() => {
const { useState, useRef, useEffect, useId } = React;
const SearchIcon = () => /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.25 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM0 5.25a5.25 5.25 0 1 1 9.37 3.25l2.44 2.44a.75.75 0 1 1-1.06 1.06L8.31 9.56A5.25 5.25 0 0 1 0 5.25Z",
    fill: "currentColor"
  }
));
const CloseCircleIcon = () => /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm2.53 5.47a.75.75 0 0 1 0 1.06L9.06 8l1.47 1.47a.75.75 0 1 1-1.06 1.06L8 9.06l-1.47 1.47a.75.75 0 0 1-1.06-1.06L6.94 8 5.47 6.53a.75.75 0 0 1 1.06-1.06L8 6.94l1.47-1.47a.75.75 0 0 1 1.06 0Z",
    fill: "currentColor"
  }
));
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
function Search({
  placeholder = "Search for\u2026",
  suggestions = [],
  value: controlledValue,
  defaultValue = "",
  onChange,
  onSearch,
  onClear,
  disabled = false,
  id,
  className = "",
  style
}) {
  ensureCSS();
  const autoId = useId();
  const inputId = id || autoId;
  const isControlled = controlledValue !== void 0;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const filtered = value.trim() ? suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase())) : suggestions;
  const showDropdown = open && filtered.length > 0;
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
    onChange == null ? void 0 : onChange(v);
    setOpen(true);
    setActiveIndex(-1);
  }
  function handleClear() {
    var _a;
    if (!isControlled) setInternalValue("");
    onChange == null ? void 0 : onChange("");
    onClear == null ? void 0 : onClear();
    setOpen(false);
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  }
  function handleSelect(suggestion) {
    if (!isControlled) setInternalValue(suggestion);
    onChange == null ? void 0 : onChange(suggestion);
    onSearch == null ? void 0 : onSearch(suggestion);
    setOpen(false);
    setActiveIndex(-1);
  }
  function handleKeyDown(e) {
    if (!showDropdown) {
      if (e.key === "Enter") onSearch == null ? void 0 : onSearch(value);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        handleSelect(filtered[activeIndex]);
      } else {
        onSearch == null ? void 0 : onSearch(value);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }
  const firstMatch = value && filtered[0];
  const inlineGhost = firstMatch && firstMatch.toLowerCase().startsWith(value.toLowerCase()) ? firstMatch.slice(value.length) : null;
  const isTyping = value.length > 0;
  const fieldCls = [
    "ifs-search",
    isTyping ? "ifs-search--typing" : "",
    focused ? "ifs-search--focus" : "",
    disabled ? "ifs-search--disabled" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: wrapRef,
      className: ["ifs-search-wrap", className].filter(Boolean).join(" "),
      style
    },
    /* @__PURE__ */ React.createElement("div", { className: fieldCls }, /* @__PURE__ */ React.createElement("span", { className: "ifs-search__icon" }, /* @__PURE__ */ React.createElement(SearchIcon, null)), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", flex: 1, minWidth: 0, display: "flex", alignItems: "center" } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        ref: inputRef,
        id: inputId,
        type: "text",
        role: "combobox",
        "aria-autocomplete": "list",
        "aria-expanded": showDropdown,
        "aria-activedescendant": activeIndex >= 0 ? `ifs-search-opt-${inputId}-${activeIndex}` : void 0,
        className: "ifs-search__el",
        value,
        placeholder,
        disabled,
        autoComplete: "off",
        spellCheck: false,
        onChange: handleChange,
        onKeyDown: handleKeyDown,
        onFocus: () => {
          setFocused(true);
          setOpen(true);
        },
        onBlur: () => setFocused(false),
        style: { position: "relative", zIndex: 1, background: "transparent", width: "100%" }
      }
    ), inlineGhost && !showDropdown && /* @__PURE__ */ React.createElement(
      "span",
      {
        "aria-hidden": "true",
        style: {
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
          zIndex: 0
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: { color: "transparent" } }, value),
      /* @__PURE__ */ React.createElement("span", { style: { color: "var(--text-tertiary, rgba(255,255,255,0.55))" } }, inlineGhost)
    )), isTyping && /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "ifs-search__clear",
        onClick: handleClear,
        tabIndex: -1,
        "aria-label": "Clear search"
      },
      /* @__PURE__ */ React.createElement(CloseCircleIcon, null)
    )),
    showDropdown && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "ifs-search-dropdown",
        role: "listbox",
        "aria-label": "Suggestions"
      },
      /* @__PURE__ */ React.createElement("div", { className: "ifs-search-dropdown__section" }, /* @__PURE__ */ React.createElement("p", { className: "ifs-search-dropdown__heading" }, "Suggested questions"), filtered.map((s, i) => {
        const lc = s.toLowerCase();
        const query = value.toLowerCase();
        const matchIdx = lc.indexOf(query);
        const isActive = i === activeIndex;
        let label;
        if (matchIdx !== -1 && value) {
          const before = s.slice(0, matchIdx);
          const match = s.slice(matchIdx, matchIdx + value.length);
          const after = s.slice(matchIdx + value.length);
          label = /* @__PURE__ */ React.createElement(React.Fragment, null, before && /* @__PURE__ */ React.createElement("span", { className: "ifs-search-item__completion" }, before), /* @__PURE__ */ React.createElement("span", { className: "ifs-search-item__match" }, match), after && /* @__PURE__ */ React.createElement("span", { className: "ifs-search-item__completion" }, after));
        } else {
          label = /* @__PURE__ */ React.createElement("span", { className: "ifs-search-item__completion" }, s);
        }
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            key: s,
            id: `ifs-search-opt-${inputId}-${i}`,
            role: "option",
            "aria-selected": isActive,
            className: ["ifs-search-item", isActive ? "ifs-search-item--active" : ""].filter(Boolean).join(" "),
            onMouseDown: (e) => {
              e.preventDefault();
              handleSelect(s);
            },
            onMouseEnter: () => setActiveIndex(i)
          },
          /* @__PURE__ */ React.createElement("span", { className: "ifs-search-item__text" }, label)
        );
      }))
    )
  );
}
__ds_ns.Search = Search;
})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: "components/forms/Search.jsx", error: String(e) }); }

// components/forms/Select.jsx
try { (() => {
const CSS = `
.ifs-select{ position:relative; display:flex; align-items:center; box-sizing:border-box;
  height:32px; border-radius:var(--radius-sm); background:var(--white-50);
  border:1px solid var(--white-150); font-family:var(--font-sans);
  transition:border-color var(--duration-fast) var(--ease-standard); }
.ifs-select--sm{ height:24px; }
.ifs-select--lg{ height:40px; border-radius:var(--radius-md); }
.ifs-select:hover{ border-color:var(--white-400); }
.ifs-select:focus-within{ border-color:var(--white-400); box-shadow:0 0 0 3px var(--white-50); }
.ifs-select--disabled{ opacity:.5; pointer-events:none; }
.ifs-select__el{ appearance:none; -webkit-appearance:none; border:none; outline:none; background:transparent;
  font-family:var(--font-sans); font-size:13px; color:var(--text-primary);
  height:100%; width:100%; padding:0 28px 0 10px; cursor:pointer; }
.ifs-select--lg .ifs-select__el{ padding-left:12px; }
.ifs-select__el option{ background:var(--surface-2); color:var(--text-primary); }
.ifs-select__chev{ position:absolute; right:9px; pointer-events:none; color:var(--icon-tertiary);
  display:inline-flex; }
`;
let _i = false;
function ensureCSS() {
  if (_i || typeof document === "undefined") return;
  _i = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "select");
  s.textContent = CSS;
  document.head.appendChild(s);
}
const Chevron = () => /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "m6 9 6 6 6-6" }));
function Select({
  label,
  hint,
  size = "md",
  disabled = false,
  options,
  placeholder,
  id,
  className = "",
  style,
  children,
  ...rest
}) {
  ensureCSS();
  const selId = id || (label ? `ifs-sel-${Math.random().toString(36).slice(2, 8)}` : void 0);
  const boxCls = ["ifs-select", size !== "md" ? `ifs-select--${size}` : "", disabled ? "ifs-select--disabled" : ""].filter(Boolean).join(" ");
  return /* @__PURE__ */ React.createElement("div", { className: ["ifs-field", className].filter(Boolean).join(" "), style }, label ? /* @__PURE__ */ React.createElement("label", { className: "ifs-field__label", htmlFor: selId }, label) : null, /* @__PURE__ */ React.createElement("div", { className: boxCls }, /* @__PURE__ */ React.createElement("select", { id: selId, className: "ifs-select__el", disabled, ...rest }, placeholder ? /* @__PURE__ */ React.createElement("option", { value: "", disabled: true }, placeholder) : null, options ? options.map((o, i) => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    return /* @__PURE__ */ React.createElement("option", { key: i, value: v }, l);
  }) : children), /* @__PURE__ */ React.createElement("span", { className: "ifs-select__chev" }, /* @__PURE__ */ React.createElement(Chevron, null))), hint ? /* @__PURE__ */ React.createElement("span", { className: "ifs-field__hint" }, hint) : null);
}
__ds_ns.Select = Select;
})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: "components/forms/Select.jsx", error: String(e) }); }

// components/forms/SmartSearch.jsx
try { (() => {
const { useState, useRef, useEffect, useId } = React;
const AiSearchIcon = () => /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.5 2a4.5 4.5 0 1 0 2.768 8.036l2.848 2.848a.75.75 0 1 0 1.06-1.06L10.33 8.976A4.5 4.5 0 0 0 6.5 2ZM3.5 6.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z",
    fill: "currentColor"
  }
), /* @__PURE__ */ React.createElement(
  "path",
  {
    d: "M10.5 2.5c0-.28.22-.5.5-.5.83 0 1.5.67 1.5 1.5 0 .28-.22.5-.5.5a.5.5 0 0 1-.5-.5A.5.5 0 0 0 11 3a.5.5 0 0 1-.5-.5Z",
    fill: "currentColor",
    opacity: ".7"
  }
), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "2", r: ".75", fill: "currentColor" }));
const MicIcon = () => /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8 1.5A2.5 2.5 0 0 0 5.5 4v4a2.5 2.5 0 0 0 5 0V4A2.5 2.5 0 0 0 8 1.5ZM4 4a4 4 0 0 1 8 0v4a4 4 0 0 1-8 0V4Zm-1.5 4a.75.75 0 0 1 .75.75A4.75 4.75 0 0 0 12.75 8.75a.75.75 0 0 1 1.5 0 6.25 6.25 0 0 1-5.5 6.21V16a.75.75 0 0 1-1.5 0v-1.04A6.25 6.25 0 0 1 1.75 8.75.75.75 0 0 1 2.5 8Z",
    fill: "currentColor"
  }
));
const KeyboardIcon = () => /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.5 4A1.5 1.5 0 0 0 0 5.5v5A1.5 1.5 0 0 0 1.5 12h13a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 14.5 4h-13ZM1.5 5.5h13v5h-13v-5ZM3 7a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 7Zm2.75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Zm2 0h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Zm2 0h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Zm2 0h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 9.25a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.25Z",
    fill: "currentColor"
  }
));
const CloseCircleIcon = () => /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm2.53 5.47a.75.75 0 0 1 0 1.06L9.06 8l1.47 1.47a.75.75 0 1 1-1.06 1.06L8 9.06l-1.47 1.47a.75.75 0 0 1-1.06-1.06L6.94 8 5.47 6.53a.75.75 0 0 1 1.06-1.06L8 6.94l1.47-1.47a.75.75 0 0 1 1.06 0Z",
    fill: "currentColor"
  }
));
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
/* mic/keyboard toggle \u2014 stays circular */
.ifs-smart-search__action--toggle {
  border-radius: 1000px;
}
/* clear button \u2014 square with rounded corners */
.ifs-smart-search__action--clear {
  border-radius: var(--radius-sm, 4px);
}
.ifs-smart-search__action:hover {
  color: var(--text-primary);
  background: var(--button-ghost-fill-hover, rgba(255,255,255,0.15));
}

/* dropdown \u2014 same glass panel as the regular Search */
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
function SmartSearch({
  placeholder = "Ask anything\u2026",
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
  style
}) {
  ensureCSS();
  const autoId = useId();
  const inputId = id || autoId;
  const isControlledValue = controlledValue !== void 0;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlledValue ? controlledValue : internalValue;
  const isControlledMode = controlledMode !== void 0;
  const [internalMode, setInternalMode] = useState(defaultMode);
  const mode = isControlledMode ? controlledMode : internalMode;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const isTyping = value.length > 0;
  const filtered = value.trim() ? suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase())) : suggestions;
  const showDropdown = open && filtered.length > 0;
  const firstMatch = value && filtered[0];
  const inlineGhost = firstMatch && firstMatch.toLowerCase().startsWith(value.toLowerCase()) ? firstMatch.slice(value.length) : null;
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
    onChange == null ? void 0 : onChange(v);
    setOpen(true);
    setActiveIndex(-1);
  }
  function handleClear() {
    var _a;
    if (!isControlledValue) setInternalValue("");
    onChange == null ? void 0 : onChange("");
    onClear == null ? void 0 : onClear();
    setOpen(false);
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  }
  function handleSelect(suggestion) {
    if (!isControlledValue) setInternalValue(suggestion);
    onChange == null ? void 0 : onChange(suggestion);
    onSearch == null ? void 0 : onSearch(suggestion);
    setOpen(false);
    setActiveIndex(-1);
  }
  function handleToggleMode() {
    const next = mode === "text" ? "voice" : "text";
    if (!isControlledMode) setInternalMode(next);
    onModeChange == null ? void 0 : onModeChange(next);
  }
  function handleKeyDown(e) {
    if (!showDropdown) {
      if (e.key === "Enter") {
        onSearch == null ? void 0 : onSearch(value);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) handleSelect(filtered[activeIndex]);
      else {
        onSearch == null ? void 0 : onSearch(value);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }
  const fieldCls = [
    "ifs-smart-search",
    isTyping ? "ifs-smart-search--typing" : "",
    focused ? "ifs-smart-search--focus" : "",
    disabled ? "ifs-smart-search--disabled" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: wrapRef,
      className: ["ifs-smart-search-wrap", className].filter(Boolean).join(" "),
      style
    },
    /* @__PURE__ */ React.createElement("div", { className: fieldCls }, /* @__PURE__ */ React.createElement("div", { className: "ifs-smart-search__left" }, /* @__PURE__ */ React.createElement("span", { className: "ifs-smart-search__ai-icon" }, /* @__PURE__ */ React.createElement(AiSearchIcon, null)), /* @__PURE__ */ React.createElement("div", { className: "ifs-smart-search__input-wrap" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        ref: inputRef,
        id: inputId,
        type: "text",
        role: "combobox",
        "aria-autocomplete": "list",
        "aria-expanded": showDropdown,
        "aria-activedescendant": activeIndex >= 0 ? `ifs-ss-opt-${inputId}-${activeIndex}` : void 0,
        className: "ifs-smart-search__el",
        value,
        placeholder,
        disabled,
        autoComplete: "off",
        spellCheck: false,
        onChange: handleChange,
        onKeyDown: handleKeyDown,
        onFocus: () => {
          setFocused(true);
          setOpen(true);
        },
        onBlur: () => setFocused(false),
        style: { position: "relative", zIndex: 1 }
      }
    ), inlineGhost && !showDropdown && /* @__PURE__ */ React.createElement("span", { className: "ifs-smart-search__ghost", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", { style: { color: "transparent" } }, value), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--text-tertiary, rgba(255,255,255,0.55))" } }, inlineGhost)))), isTyping ? /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "ifs-smart-search__action ifs-smart-search__action--clear",
        onClick: handleClear,
        tabIndex: -1,
        "aria-label": "Clear"
      },
      /* @__PURE__ */ React.createElement(CloseCircleIcon, null)
    ) : /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "ifs-smart-search__action ifs-smart-search__action--toggle",
        onClick: handleToggleMode,
        tabIndex: -1,
        "aria-label": mode === "text" ? "Switch to voice input" : "Switch to text input",
        title: mode === "text" ? "Switch to voice input" : "Switch to text input"
      },
      mode === "text" ? /* @__PURE__ */ React.createElement(MicIcon, null) : /* @__PURE__ */ React.createElement(KeyboardIcon, null)
    )),
    showDropdown && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "ifs-smart-search-dropdown",
        role: "listbox",
        "aria-label": "Suggestions"
      },
      /* @__PURE__ */ React.createElement("div", { className: "ifs-smart-search-dropdown__section" }, /* @__PURE__ */ React.createElement("p", { className: "ifs-smart-search-dropdown__heading" }, "Suggested questions"), filtered.map((s, i) => {
        const lc = s.toLowerCase();
        const query = value.toLowerCase();
        const matchIdx = lc.indexOf(query);
        const isActive = i === activeIndex;
        let label;
        if (matchIdx !== -1 && value) {
          const before = s.slice(0, matchIdx);
          const match = s.slice(matchIdx, matchIdx + value.length);
          const after = s.slice(matchIdx + value.length);
          label = /* @__PURE__ */ React.createElement(React.Fragment, null, before && /* @__PURE__ */ React.createElement("span", { className: "ifs-smart-search-item__completion" }, before), /* @__PURE__ */ React.createElement("span", { className: "ifs-smart-search-item__match" }, match), after && /* @__PURE__ */ React.createElement("span", { className: "ifs-smart-search-item__completion" }, after));
        } else {
          label = /* @__PURE__ */ React.createElement("span", { className: "ifs-smart-search-item__completion" }, s);
        }
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            key: s,
            id: `ifs-ss-opt-${inputId}-${i}`,
            role: "option",
            "aria-selected": isActive,
            className: ["ifs-smart-search-item", isActive ? "ifs-smart-search-item--active" : ""].filter(Boolean).join(" "),
            onMouseDown: (e) => {
              e.preventDefault();
              handleSelect(s);
            },
            onMouseEnter: () => setActiveIndex(i)
          },
          /* @__PURE__ */ React.createElement("span", { className: "ifs-smart-search-item__text" }, label)
        );
      }))
    )
  );
}
__ds_ns.SmartSearch = SmartSearch;
})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: "components/forms/SmartSearch.jsx", error: String(e) }); }

// components/forms/Switch.jsx
try { (() => {
const CSS = `
.ifs-switch{ display:inline-flex; align-items:center; gap:9px; font-family:var(--font-sans);
  font-size:13px; color:var(--text-primary); cursor:pointer; user-select:none; }
.ifs-switch--disabled{ opacity:.5; cursor:not-allowed; }
.ifs-switch input{ position:absolute; opacity:0; width:0; height:0; }
.ifs-switch__track{ position:relative; width:34px; height:20px; flex:none; border-radius:999px;
  background:var(--white-200); transition:background var(--duration-base) var(--ease-standard); }
.ifs-switch--sm .ifs-switch__track{ width:28px; height:16px; }
.ifs-switch__thumb{ position:absolute; top:2px; left:2px; width:16px; height:16px; border-radius:50%;
  background:#fff; box-shadow:0 1px 2px rgba(0,0,0,.4);
  transition:transform var(--duration-base) var(--ease-emphasis); }
.ifs-switch--sm .ifs-switch__thumb{ width:12px; height:12px; }
.ifs-switch input:checked + .ifs-switch__track{ background:var(--accent-brand); }
.ifs-switch input:checked + .ifs-switch__track .ifs-switch__thumb{ transform:translateX(14px); }
.ifs-switch--sm input:checked + .ifs-switch__track .ifs-switch__thumb{ transform:translateX(12px); }
.ifs-switch input:focus-visible + .ifs-switch__track{ box-shadow:0 0 0 2px var(--focus-ring); }
`;
let _i = false;
function ensureCSS() {
  if (_i || typeof document === "undefined") return;
  _i = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "switch");
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Switch({ label, checked, defaultChecked, disabled = false, size = "md", className = "", onChange, ...rest }) {
  ensureCSS();
  const cls = ["ifs-switch", size === "sm" ? "ifs-switch--sm" : "", disabled ? "ifs-switch--disabled" : "", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ React.createElement("label", { className: cls }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked, defaultChecked, disabled, onChange, ...rest }), /* @__PURE__ */ React.createElement("span", { className: "ifs-switch__track" }, /* @__PURE__ */ React.createElement("span", { className: "ifs-switch__thumb" })), label != null ? /* @__PURE__ */ React.createElement("span", null, label) : null);
}
__ds_ns.Switch = Switch;
})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: "components/forms/Switch.jsx", error: String(e) }); }

// components/navigation/SegmentedControl.jsx
try { (() => {
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
let _i = false;
function ensureCSS() {
  if (_i || typeof document === "undefined") return;
  _i = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "seg");
  s.textContent = CSS;
  document.head.appendChild(s);
}
function SegmentedControl({ options = [], value, onChange, size = "md", className = "", ...rest }) {
  ensureCSS();
  return /* @__PURE__ */ React.createElement("div", { role: "group", className: ["ifs-seg", size === "sm" ? "ifs-seg--sm" : "", className].filter(Boolean).join(" "), ...rest }, options.map((o) => {
    const val = typeof o === "string" ? o : o.value;
    const label = typeof o === "string" ? o : o.label;
    const active = val === value;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: val,
        type: "button",
        "aria-pressed": active,
        className: ["ifs-seg__opt", active ? "ifs-seg__opt--active" : ""].filter(Boolean).join(" "),
        onClick: () => onChange && onChange(val)
      },
      o.icon ? /* @__PURE__ */ React.createElement("span", { className: "ifs-seg__icon" }, o.icon) : null,
      label
    );
  }));
}
__ds_ns.SegmentedControl = SegmentedControl;
})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: "components/navigation/SegmentedControl.jsx", error: String(e) }); }

// components/navigation/Stepper.jsx
try { (() => {
const CSS = `
.ifs-stepper{ display:inline-flex; align-items:center; font-family:var(--font-sans); }
.ifs-step{ display:inline-flex; align-items:center; gap:8px; }
.ifs-step__node{ width:18px; height:18px; border-radius:50%; flex:none; box-sizing:border-box;
  display:inline-flex; align-items:center; justify-content:center;
  border:1.5px solid var(--white-300); color:var(--text-tertiary);
  font-size:10px; font-weight:var(--weight-semibold); }
.ifs-step__label{ font-size:13px; font-weight:var(--weight-medium); color:var(--text-tertiary); white-space:nowrap; }
.ifs-step__node svg{ width:11px; height:11px; }
.ifs-step--active .ifs-step__node{ border-color:var(--accent-brand); color:var(--copper-400);
  box-shadow:0 0 0 3px var(--accent-brand-bg); }
.ifs-step--active .ifs-step__label{ color:var(--text-primary); }
.ifs-step--done .ifs-step__node{ background:var(--accent-brand); border-color:var(--accent-brand); color:#fff; }
.ifs-step--done .ifs-step__label{ color:var(--text-secondary); }
.ifs-stepper__bar{ width:34px; height:1.5px; margin:0 12px; background:var(--white-200); border-radius:2px; }
.ifs-stepper__bar--done{ background:var(--accent-brand); }
.ifs-step--clickable{ cursor:pointer; }
`;
let _i = false;
function ensureCSS() {
  if (_i || typeof document === "undefined") return;
  _i = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "stepper");
  s.textContent = CSS;
  document.head.appendChild(s);
}
const Check = () => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3.4", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" }));
function Stepper({ steps = [], current = 0, onStepClick, className = "", ...rest }) {
  ensureCSS();
  return /* @__PURE__ */ React.createElement("div", { className: ["ifs-stepper", className].filter(Boolean).join(" "), ...rest }, steps.map((s, i) => {
    const label = typeof s === "string" ? s : s.label;
    const state = i < current ? "done" : i === current ? "active" : "todo";
    return /* @__PURE__ */ React.createElement(React.Fragment, { key: i }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: ["ifs-step", `ifs-step--${state}`, onStepClick ? "ifs-step--clickable" : ""].filter(Boolean).join(" "),
        onClick: () => onStepClick && onStepClick(i)
      },
      /* @__PURE__ */ React.createElement("span", { className: "ifs-step__node" }, state === "done" ? /* @__PURE__ */ React.createElement(Check, null) : i + 1),
      /* @__PURE__ */ React.createElement("span", { className: "ifs-step__label" }, label)
    ), i < steps.length - 1 ? /* @__PURE__ */ React.createElement("span", { className: ["ifs-stepper__bar", i < current ? "ifs-stepper__bar--done" : ""].filter(Boolean).join(" ") }) : null);
  }));
}
__ds_ns.Stepper = Stepper;
})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: "components/navigation/Stepper.jsx", error: String(e) }); }

// components/navigation/Tabs.jsx
try { (() => {
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
let _i = false;
function ensureCSS() {
  if (_i || typeof document === "undefined") return;
  _i = true;
  const s = document.createElement("style");
  s.setAttribute("data-ifs", "tabs");
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Tabs({ items = [], value, onChange, plain = false, className = "", ...rest }) {
  ensureCSS();
  return /* @__PURE__ */ React.createElement("div", { role: "tablist", className: ["ifs-tabs", plain ? "ifs-tabs--plain" : "", className].filter(Boolean).join(" "), ...rest }, items.map((it) => {
    const id = typeof it === "string" ? it : it.id;
    const label = typeof it === "string" ? it : it.label;
    const active = id === value;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: id,
        role: "tab",
        "aria-selected": active,
        className: ["ifs-tab", active ? "ifs-tab--active" : ""].filter(Boolean).join(" "),
        onClick: () => onChange && onChange(id)
      },
      it.icon ? /* @__PURE__ */ React.createElement("span", { className: "ifs-tab__icon" }, it.icon) : null,
      label,
      it.count != null ? /* @__PURE__ */ React.createElement("span", { className: "ifs-tab__count" }, it.count) : null
    );
  }));
}
__ds_ns.Tabs = Tabs;
})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: "components/navigation/Tabs.jsx", error: String(e) }); }

// components/core/QuickStatCard.jsx
try { (() => {
const CSS = `
.ifs-quick-stat-card{display:flex;flex-direction:column;gap:var(--gap-200);padding:var(--padding-300);border-radius:var(--radius-100);background:var(--surface-secondary-alpha);border:var(--border-100) solid var(--border-base);box-sizing:border-box}
.ifs-quick-stat-card__title{font-family:var(--font-sans);font-size:var(--h4-size);line-height:var(--h4-line);font-weight:var(--h4-weight);letter-spacing:var(--h4-tracking);color:var(--text-secondary)}
.ifs-quick-stat-card__value-row{display:flex;align-items:baseline;gap:var(--gap-150)}
.ifs-quick-stat-card__value{font-family:var(--font-sans);font-size:var(--fs-20);line-height:var(--lh-24);font-weight:var(--weight-medium);letter-spacing:-0.5px;color:var(--text-primary)}
.ifs-quick-stat-card__desc{font-family:var(--font-sans);font-size:var(--label-m-size);line-height:var(--label-m-line);font-weight:var(--label-m-weight);letter-spacing:var(--label-m-tracking);color:var(--text-tertiary)}
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
function QuickStatCard({ title, value, desc, className = "", ...rest }) {
  ensureCSS();
  const cls = ["ifs-quick-stat-card", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ React.createElement("div", { className: cls, ...rest },
    /* @__PURE__ */ React.createElement("div", { className: "ifs-quick-stat-card__title" }, title),
    /* @__PURE__ */ React.createElement("div", { className: "ifs-quick-stat-card__value-row" },
      /* @__PURE__ */ React.createElement("span", { className: "ifs-quick-stat-card__value" }, value)
    ),
    desc ? /* @__PURE__ */ React.createElement("div", { className: "ifs-quick-stat-card__desc" }, desc) : null
  );
}
__ds_ns.QuickStatCard = QuickStatCard;
// Eagerly inject CSS so plain-HTML prototypes pick up the classes on bundle load (no React render needed)
ensureCSS();
})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: "components/core/QuickStatCard.jsx", error: String(e) }); }

})();
