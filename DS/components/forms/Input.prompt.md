Single-line text field with label, hint/error and leading/trailing affixes.

```jsx
<Input label="Budget cap" defaultValue="500" leading={<span>$</span>} trailing={<span>M</span>} />
<Input label="Owner" error="This field is required" />
```

Sizes: sm/md/lg. Focus uses a neutral border (white/400); `error` switches to danger.