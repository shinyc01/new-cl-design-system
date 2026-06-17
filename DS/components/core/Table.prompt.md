# Table — DS Pattern

Flex-row data table. Figma source: Strategy Framework Handover (node 2356:84052).

## Class reference

| Class | Element | Notes |
|---|---|---|
| `.ifs-table` | Container | `surface-secondary-alpha` bg, `radius-200`, `gap-100`, `padding-300` |
| `.ifs-table__header` | Header row | Flex row, 32px tall |
| `.ifs-table__th` | Header cell | H4/UPPER type, `text-tertiary`, `flex: 1 0 0` by default |
| `.ifs-table__sort` | Sort icon | Chevron-up + chevron-down stack, `icon-tertiary` |
| `.ifs-table__sort--asc` / `--desc` | Active sort | Text-primary highlight |
| `.ifs-table__filter` | Filter icon | Single icon, `icon-tertiary` |
| `.ifs-table__filter--active` | Active filter | Text-primary highlight |
| `.ifs-table__row` | Data row | 48px, `surface-secondary-alpha` bg, `radius-100` |
| `.ifs-table__row:hover` | Hover state | `background-color-alpha-white-base` (10%) |
| `.ifs-table__row--selected` | Selected row | `background-color-alpha-white-strong` (20%) |
| `.ifs-table__td` | Data cell | `body-m/medium`, `text-primary`, `flex: 1 0 0` |
| `.ifs-table__td--stack` | Stacked cell | Flex column, `gap-100` |
| `.ifs-table__td-primary` | Primary text | `body-m/medium`, `text-primary` |
| `.ifs-table__td-secondary` | Secondary text | `body-m/regular`, `text-secondary` |
| `.ifs-table__status` | Status pill | Dot + uppercase label, `gap-150` |
| `.ifs-table__status-dot` | Status dot | 8×8px circle |
| `.ifs-table__status-label` | Status label | `label-m/UPPER`, `text-primary` |
| `.ifs-table__status--active` | Active variant | Dot: `text-success` |
| `.ifs-table__status--pending` | Pending variant | Dot: `text-warning` |
| `.ifs-table__status--draft` | Draft variant | Dot: `text-tertiary` |
| `.ifs-table__status--archived` | Archived variant | Dot + label: `text-disabled` |
| `.ifs-table__status--info` | Info variant | Dot: `text-info` |
| `.ifs-table__status--danger` | Danger variant | Dot: `text-danger` |
| `.ifs-table__count` | Count badge | `background-color-alpha-white-base`, `radius-full`, `4px 8px` |

## Column widths

Cells default to `flex: 1 0 0` (equal width). Override per-column with inline `style` or a dedicated CSS class:

```css
.col-name   { flex: 1.5 0 0; min-width: 0; }
.col-actions{ flex: none; width: 48px; justify-content: center; }
```

## HTML usage

```html
<div class="ifs-table">
  <div class="ifs-table__header">
    <div class="ifs-table__th col-name">
      Strategy Framework
      <span class="ifs-table__filter"><i class="ti ti-adjustments-horizontal"></i></span>
    </div>
    <div class="ifs-table__th col-status">
      Status
      <span class="ifs-table__filter"><i class="ti ti-adjustments-horizontal"></i></span>
    </div>
    <div class="ifs-table__th col-date">
      Last Modified
      <span class="ifs-table__sort"><i class="ti ti-chevron-up"></i><i class="ti ti-chevron-down"></i></span>
      <span class="ifs-table__filter"><i class="ti ti-adjustments-horizontal"></i></span>
    </div>
    <div class="ifs-table__th col-author">Created by</div>
    <div class="ifs-table__th col-actions"></div>
  </div>

  <div class="ifs-table__row" onclick="...">
    <div class="ifs-table__td col-name">Q1 2026 Strategy Framework</div>
    <div class="ifs-table__td col-status">
      <span class="ifs-table__status ifs-table__status--active">
        <span class="ifs-table__status-dot"></span>
        <span class="ifs-table__status-label">Active</span>
      </span>
    </div>
    <div class="ifs-table__td col-date">Jan 15, 2026</div>
    <div class="ifs-table__td col-author">J. Carter</div>
    <div class="ifs-table__td col-actions"></div>
  </div>
</div>
```

## React usage

```jsx
import { Table, TableTh, TableRow, TableTd, TableStatus, TableCount } from "./Table";

<Table>
  <div className="ifs-table__header">
    <TableTh filter>Strategy Framework</TableTh>
    <TableTh filter>Status</TableTh>
    <TableTh sort filter sortDir="desc">Last Modified</TableTh>
    <TableTh>Created by</TableTh>
    <TableTh style={{ flex: "none", width: 48 }} />
  </div>
  <TableRow onClick={() => navigate(item.id)}>
    <TableTd>{item.name}</TableTd>
    <TableTd>
      <TableStatus variant="active">Active</TableStatus>
    </TableTd>
    <TableTd>Jan 15, 2026</TableTd>
    <TableTd>J. Carter</TableTd>
    <TableTd style={{ flex: "none", width: 48 }} />
  </TableRow>
  {/* pending approval with count badge */}
  <TableRow>
    <TableTd>Q2 2026 Strategy Framework</TableTd>
    <TableTd style={{ gap: "var(--gap-100)" }}>
      <TableStatus variant="pending">Pending Approval</TableStatus>
      <TableCount>5/8</TableCount>
    </TableTd>
    ...
  </TableRow>
</Table>
```

## Token audit

All values in `Table.jsx` use DS vars. Raw values are exempt:
- `1px` gap between sort chevrons — layout geometry, no token.
- `8px` dot size — component geometry (no 8px size token in DS).
