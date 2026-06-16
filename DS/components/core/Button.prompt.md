Primary interactive control — white-on-dark primary, quieter `secondary`/`tertiary`/`ghost` steps, and `accent-cooper`: the Cooper AI button (dark glass + cooper gradient glow, gradient approximated).

```jsx
<Button variant="primary" size="lg">Run optimization</Button>
<Button variant="accent-cooper" leadingIcon={<CooperIcon/>}>Ask Cooper</Button>
<Button variant="tertiary" iconOnly aria-label="Add"><PlusIcon/></Button>
```

Variants: primary · secondary · tertiary · ghost · accent-cooper (`accent` is a deprecated alias of accent-cooper — solid copper buttons don't exist, and there is NO destructive/negative button component in this design system).

Sizes (per Figma): sm 24 (pad 6/4, radius 4, Label M 12/16) · md 32 (pad 10/8, radius 4, Label M) · lg 40 (pad 12/10, radius 8, Label L 14/20). Icon↔label gap 4px; icons 16px in text buttons (12px on sm). **Icon-only buttons** (`iconOnly`): square or `circle`, pads 12/8/4 for lg/md/sm, icons stay 16px at every size, square radius 8 (lg) / 4 (md, sm) — except ghost square lg which is 6px per Figma. Two-layer focus ring scales with size (outer 2/3/4, inner 1/1.5/2). Add `pill` via className for prompt chips.

Props: `leadingIcon`, `trailingIcon`, `iconOnly`, `block`, plus native button attrs.
