Underline tab bar for switching views (Overview / Map / Capital Flow). Controlled.

```jsx
<Tabs value={tab} onChange={setTab} items={[
  {id:"overview",label:"Overview"},
  {id:"assets",label:"Assets",count:42},
]} />
```

Items may be strings or {id,label,icon,count}.