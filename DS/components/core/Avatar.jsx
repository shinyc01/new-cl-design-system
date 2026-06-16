import React from "react";

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

let _i=false;
function ensureCSS(){ if(_i||typeof document==="undefined")return; _i=true;
  const s=document.createElement("style"); s.setAttribute("data-ifs","avatar"); s.textContent=CSS; document.head.appendChild(s); }

const PALETTE = ["var(--purple-600)","var(--copper-600)","var(--blue-700)","var(--green-700)","var(--solid-dark-pink)"];
function hashColor(str=""){ let h=0; for(let i=0;i<str.length;i++) h=(h*31+str.charCodeAt(i))>>>0; return PALETTE[h%PALETTE.length]; }
function initials(name=""){ return name.trim().split(/\s+/).slice(0,2).map(w=>w[0]||"").join("").toUpperCase(); }

const SIZE_PX = { xs:20, sm:24, md:32, lg:40 };

/** User avatar — photo, or auto-colored initials fallback. */
export function Avatar({ name = "", src, size = "md", square = false, className = "", style, ...rest }) {
  ensureCSS();
  const cls = ["ifs-avatar", `ifs-avatar--${size}`, square ? "ifs-avatar--square" : "", className].filter(Boolean).join(" ");
  const bg = src ? undefined : hashColor(name);
  return (
    <span className={cls} style={{ background: bg, ...style }} title={name || undefined} {...rest}>
      {src ? <img src={src} alt={name} /> : initials(name)}
    </span>
  );
}

/** Overlapping stack of avatars with a +N overflow chip. */
export function AvatarGroup({ people = [], max = 4, size = "md", className = "", ...rest }) {
  ensureCSS();
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  const px = SIZE_PX[size] || 32;
  return (
    <span className={["ifs-avatar-group", className].filter(Boolean).join(" ")} {...rest}>
      {shown.map((p, i) => <Avatar key={i} size={size} name={p.name} src={p.src} />)}
      {extra > 0 ? (
        <span className="ifs-avatar-group__more"
          style={{ width: px, height: px, fontSize: Math.round(px*0.36), borderRadius: "50%", marginLeft: -8 }}>
          +{extra}
        </span>
      ) : null}
    </span>
  );
}

export default Avatar;
