import React from "react";

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

let _i=false;
function ensureCSS(){ if(_i||typeof document==="undefined")return; _i=true;
  const s=document.createElement("style"); s.setAttribute("data-ifs","stepper"); s.textContent=CSS; document.head.appendChild(s); }

const Check = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>);

/** Horizontal workflow stepper (e.g. Input → Shape → Review → Publish). */
export function Stepper({ steps = [], current = 0, onStepClick, className = "", ...rest }) {
  ensureCSS();
  return (
    <div className={["ifs-stepper", className].filter(Boolean).join(" ")} {...rest}>
      {steps.map((s, i) => {
        const label = typeof s === "string" ? s : s.label;
        const state = i < current ? "done" : i === current ? "active" : "todo";
        return (
          <React.Fragment key={i}>
            <div className={["ifs-step", `ifs-step--${state}`, onStepClick?"ifs-step--clickable":""].filter(Boolean).join(" ")}
                 onClick={() => onStepClick && onStepClick(i)}>
              <span className="ifs-step__node">{state === "done" ? <Check/> : i + 1}</span>
              <span className="ifs-step__label">{label}</span>
            </div>
            {i < steps.length - 1 ? <span className={["ifs-stepper__bar", i < current ? "ifs-stepper__bar--done" : ""].filter(Boolean).join(" ")} /> : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Stepper;
