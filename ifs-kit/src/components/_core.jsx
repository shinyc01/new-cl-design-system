import React from 'react';
import { IFS } from './registry.js';
// Shared helpers used by every family.

// Join class names, skipping falsy values.
const cx = (...a) => a.filter(Boolean).join(' ');

// Figma: Icons page (1399:9134). `name` is the Figma icon set name, `size` one of 12 | 16 | 24.
// Figma draws every size from its own artwork, so pick the nearest exported size rather than scaling.
// A few sets (cooper-*-icon, voice-input-animation) vary by state instead of size: pass `variant`.
function Icon({ name, size = 16, variant, className, style, title }) {
  const set = (window.IFS_ICONS || {})[name];
  if (!set) {
    console.warn(`[IFS] Unknown icon "${name}"`);
    return <span className={cx('ifs-icon', 'ifs-icon--missing', className)} style={{ width: size, height: size, ...style }} />;
  }
  const key = variant && set[variant] ? variant : set[size] ? size : [24, 16, 12, 25].find(s => set[s]) || Object.keys(set)[0];
  const entry = set[key];
  const svg = typeof entry === 'string' ? entry : entry.svg;
  const vb = typeof entry === 'string' ? `0 0 ${key} ${key}` : entry.vb;
  return (
    <svg className={cx('ifs-icon', className)} width={size} height={size} viewBox={vb} fill="none"
      aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} style={style}
      dangerouslySetInnerHTML={{ __html: (title ? `<title>${title}</title>` : '') + svg }} />
  );
}

Object.assign(IFS, { Icon, cx });
export { Icon, cx };
