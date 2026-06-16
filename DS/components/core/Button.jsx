import React from "react";

/* IFS Copperleaf — Button. UI-kit view code lives inline in the kit's
   index.html (never as bundled .jsx) so it is not pulled into _ds_bundle.js. */
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

/* Sizes — S(24) 6/4 r4 LabelM · M(32) 10/8 r4 LabelM · L(40) 12/10 r8 LabelL */
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

/* Primary — white on dark */
.ifs-btn--primary{ background:var(--button-primary-fill-default); color:var(--text-primary-inverse); border-color:var(--button-primary-border-default); }
.ifs-btn--primary:hover:not([disabled]){ background:var(--button-primary-fill-hover); }
.ifs-btn--primary:active:not([disabled]){ background:var(--button-primary-fill-pressed); }
.ifs-btn--primary[disabled]{ background:var(--button-primary-fill-disabled); color:var(--text-disabled); border-color:transparent; }

/* Secondary — subtle filled */
.ifs-btn--secondary{ background:var(--button-secondary-fill-default); color:var(--text-primary); border-color:var(--button-secondary-border-default); }
.ifs-btn--secondary:hover:not([disabled]){ background:var(--button-secondary-fill-hover); border-color:var(--button-secondary-border-hover); }
.ifs-btn--secondary:active:not([disabled]){ background:var(--button-secondary-fill-pressed); border-color:var(--button-secondary-border-pressed); }
.ifs-btn--secondary[disabled]{ background:var(--button-secondary-fill-disabled); color:var(--text-disabled); border-color:var(--button-secondary-border-disabled); }

/* Tertiary — outlined over black/10 fill */
.ifs-btn--tertiary{ background:var(--button-tertiary-fill-default); color:var(--text-primary); border-color:var(--button-tertiary-border-default); }
.ifs-btn--tertiary:hover:not([disabled]){ border-color:var(--button-tertiary-border-hover); }
.ifs-btn--tertiary:active:not([disabled]){ border-color:var(--button-tertiary-border-pressed); }
.ifs-btn--tertiary[disabled]{ color:var(--text-disabled); border-color:var(--button-tertiary-border-disabled); }

/* Ghost — no chrome; hover/press fill white/15; pressed label dims to secondary */
.ifs-btn--ghost{ background:transparent; color:var(--text-primary); backdrop-filter:none; }
.ifs-btn--ghost:hover:not([disabled]){ background:var(--button-ghost-fill-hover); }
.ifs-btn--ghost:active:not([disabled]){ background:var(--button-ghost-fill-pressed); color:var(--text-secondary); }
.ifs-btn--ghost[disabled]{ color:var(--text-disabled); }

/* Accent-cooper — the Cooper AI button: black/60 base + cooper glow (bottom
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
/* ("accent" is a legacy alias — solid copper buttons don't exist in Figma.
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

/**
 * IFS Copperleaf Button.
 */
export function Button({
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
    className,
  ].filter(Boolean).join(" ");
  return (
    <button type={type} className={cls} {...rest}>
      {leadingIcon ? <span className="ifs-btn__icon">{leadingIcon}</span> : null}
      {iconOnly ? <span className="ifs-btn__icon">{children}</span> : children}
      {trailingIcon ? <span className="ifs-btn__icon">{trailingIcon}</span> : null}
    </button>
  );
}

export default Button;
