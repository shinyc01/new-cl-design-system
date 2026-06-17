Collapsible side nav panel. Supports flat parent items and labelled sections
with indented child items. Controlled via `value`/`onChange`. Toggle via
`defaultCollapsed` (uncontrolled) or `collapsed`/`onToggle` (controlled).

```jsx
const [active, setActive] = useState("active-framework");

<Sidebar
  title="Value"
  value={active}
  onChange={setActive}
  items={[
    { id: "active-framework", label: "Active Framework" },
    {
      sectionLabel: "Library",
      children: [
        { id: "strategy", label: "Strategy Frameworks" },
        { id: "value-fw", label: "Value Frameworks" },
        { id: "value-models", label: "Value Models" },
      ],
    },
    { id: "human-performance", label: "Human Performance" },
  ]}
/>
```

Entries are either `{ id, label }` (parent item) or
`{ sectionLabel, children: [{ id, label, onEdit? }] }` (grouped section).
Child items show a `corner-down-right` indent icon and a pencil-plus edit
button on hover. The collapse button in the title row hides nav items and
shrinks the panel to icon-only width.
