Compact KPI tile — use in 4-up grids on investment or asset detail overview screens to surface key metrics at a glance.

```jsx
<QuickStatCard title="Estimated cost" value="$4.2M" desc="FY2025–2026 · CapEx" />
<QuickStatCard title="Value score" value="87" desc="of 100 · +12 vs baseline" />
<QuickStatCard title="Risk score" value="4.2 / 5" desc="High · 78% failure probability" />
<QuickStatCard title="BCR" value="2.3" desc="25-year NPV basis" />
```

Props: `title` (required) · `value` (required) · `desc` (optional). Do not apply colour to the value — keep `text-primary`. For HTML-only use, apply `.ifs-quick-stat-card`, `.ifs-quick-stat-card__title`, `.ifs-quick-stat-card__value-row`, `.ifs-quick-stat-card__value`, `.ifs-quick-stat-card__desc` directly.
