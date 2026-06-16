Surface container for dashboard widgets and list items, with an optional title/subtitle/action header row.

```jsx
<Card title="Capex burn" subtitle="By quarter" action={<Button size="sm" variant="ghost">⋯</Button>}>
  <div style={{fontSize:24,fontWeight:500}}>$478M</div>
</Card>
```

Variants: default · elevated · flush. Props: `padding` (sm/md/lg), `interactive`.