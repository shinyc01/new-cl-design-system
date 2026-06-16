Pill-shaped AI smart search (40px, border-radius: 9999px) with Cooper AI icon, mode toggle, autocomplete dropdown, and × clear button.

```jsx
<SmartSearch
  placeholder="Ask anything about strategy frameworks?"
  suggestions={["Where is wildfire risk used?", "How does pricing affect assets?", "Show risk exposure by region"]}
  onSearch={q => console.log("search:", q)}
  onModeChange={mode => console.log("mode:", mode)}
/>
```

- Right button toggles between **mic** (text mode) and **keyboard** (voice mode) when empty
- Switches to a filled **×** clear button as soon as text is entered
- Cooper AI icon on the left glows amber (`--text-accent-cooper`) while typing
- Same autocomplete behaviour as `Search`: ghost inline completion, filtered dropdown, arrow/Enter/Escape navigation
- Controlled: `value` + `onChange`; `mode` + `onModeChange`. Uncontrolled: `defaultValue`, `defaultMode`
