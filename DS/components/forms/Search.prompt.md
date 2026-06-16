Search field with autofill-as-you-type suggestions and clear button.

```jsx
<Search
  placeholder="Search for…"
  suggestions={["Where is wildfire risk used?", "How does pricing affect assets?", "Show risk exposure by region"]}
  onSearch={q => console.log("search:", q)}
/>
```

- Shows a **×** clear button the moment text is entered
- Filters `suggestions` as you type; highlights the matching substring
- First match auto-completes inline as ghost text
- Arrow keys navigate the dropdown; Enter picks or submits; Escape closes
- Controlled via `value` + `onChange`, or uncontrolled via `defaultValue`
- Disabled state: `disabled={true}`
