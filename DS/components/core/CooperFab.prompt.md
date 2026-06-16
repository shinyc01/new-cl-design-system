Cooper FAB — the floating Cooper AI button. Fully self-contained inline SVG; no external assets required.

Use `CooperFab.html` as the reference implementation (copy the CSS + markup).

**Visual:** 48px circle, glass stroke ring, lavender/amber gradient orb, white star-dots. Resting state has a soft `drop-shadow` glow (purple + amber). On hover: `scale(1.04)` + `cooper-fab-aurora` keyframe animation that cycles the glow through purple → pink → amber → indigo over 3.6s. On press: `scale(0.97)`, animation off. Disabled: `opacity: 0.4`, no filter. Focus-visible: outline replaced by `drop-shadow` ring.

**Tooltip:** "Ask Cooper /" — appears on hover, positioned above the button with a downward arrow. Uses DS tokens (`--surface-primary`, `--label-m-*`, etc.) with fallbacks for contexts without the full token set.

**Reduced motion:** `animation: none`, `transition: none`, `transform: none`.

**Do not** swap the inline SVG gradients/filters for CSS-only equivalents — the layered blend modes won't replicate correctly.
