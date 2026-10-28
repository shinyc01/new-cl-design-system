import React from 'react';
import { IFS } from './registry.js';
// Figma: button (65:3211)
// Props: type primary|secondary|tertiary|ghost|cooper (Figma "Accent (Cooper)"), size l|m|s,
// iconLeft / iconRight = icon names (Figma show-icon-* + Icon swap), children = Button label.
// Leave out children for Figma show-label=false.
function Button({ type = 'secondary', size = 'm', iconLeft, iconRight, children, state, className, ...rest }) {
  const iconSize = size === 's' ? 12 : 16;
  return (
    <button type="button" data-state={state} className={IFS.cx('ifs-button', `ifs-button--${type}`, `ifs-button--${size}`, className)} {...rest}>
      {iconLeft && <IFS.Icon name={iconLeft} size={iconSize} />}
      {children != null && <span className="ifs-button__label">{children}</span>}
      {iconRight && <IFS.Icon name={iconRight} size={iconSize} />}
    </button>
  );
}

// Figma: icon-button (71:4250)
// Props: icon (required), type ghost|primary|secondary|tertiary, size l|m|s, shape square|circle.
// Always pass a `label` — it becomes the accessible name and tooltip.
function IconButton({ icon, label, type = 'ghost', size = 'm', shape = 'square', state, className, ...rest }) {
  return (
    <button type="button" aria-label={label} title={label} data-state={state}
      className={IFS.cx('ifs-icon-button', `ifs-icon-button--${type}`, `ifs-icon-button--${size}`, shape === 'circle' && 'ifs-icon-button--circle', className)} {...rest}>
      <IFS.Icon name={icon} size={16} />
    </button>
  );
}

Object.assign(IFS, { Button, IconButton });
export { Button, IconButton };
