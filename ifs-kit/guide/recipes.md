# Recipes: wiring for the standard screens

Working code for the parts every prototype repeats: the shell, the hash router, the Cooper bar + chat, a library page and an object page. Copy what you need into the template's script block and adapt names, data and columns. The components' own rules still apply: read their entries (`entry.sh`) before you change props.

## 1. Shell, router and Cooper (every prototype)

One `App` owns the route and the Cooper state. Each screen gets its own header, so pass `header` from App; keep any state the header needs (e.g. a panel toggle) in App too.

```jsx
const { AppShell, NavBar, BottomSheet, CooperChat, toast } = IFS;

const STAGES = [
  { value: 'command', label: 'Command' }, { value: 'value', label: 'Value' }, { value: 'explore', label: 'Explore' },
  { value: 'build', label: 'Build' }, { value: 'plan', label: 'Plan' }, { value: 'results', label: 'Results' },
];
const ME = { name: 'Jordan Parker', initials: 'JP' };

// '#list' → { screen: 'list' }, '#detail-i1' → { screen: 'detail', id: 'i1' }. Give every state worth a screenshot a hash.
const parseHash = () => {
  const [screen, id, sub] = (location.hash.slice(1) || 'list').split('-');
  return { screen, id, sub };
};
const go = h => { location.hash = h; };

function App() {
  const [route, setRoute] = React.useState(parseHash);
  React.useEffect(() => {
    const on = () => setRoute(parseHash());
    addEventListener('hashchange', on);
    return () => removeEventListener('hashchange', on);
  }, []);

  // Cooper: the bottom-sheet FAB opens the chat bar (voice); a prompt chip sends straight into the chat (text).
  const [cooperSize, setCooperSize] = React.useState('closed');
  const [cooperMode, setCooperMode] = React.useState('voice');
  const cooperApi = React.useRef();
  const cooperOpen = cooperSize !== 'closed';
  const prompts = route.screen === 'detail'
    ? ['Compare these alternatives for me', 'Summarise the open comments']   // prompts are specific to the screen
    : ['Which investments need my input?', 'What changed this week?'];

  const item = route.screen === 'detail' ? ITEMS.find(i => i.id === route.id) : null;

  return (
    <AppShell
      navBar={<NavBar stages={STAGES} value="build" user={ME}
        onChange={v => v !== 'build' && toast({ title: 'Not part of this prototype' })} />}
      header={item ? <ItemHeader item={item} /> : null}
      bottom={<BottomSheet prompts={prompts} showPrompts={!cooperOpen} showCooper={!cooperOpen}
        onCooper={() => { setCooperMode('voice'); setCooperSize('bar'); }}
        onPrompt={p => { setCooperMode('text'); cooperApi.current?.send(p); }} />}>
      {item ? <ItemPage item={item} /> : <Library />}
      <CooperChat size={cooperSize} onSizeChange={setCooperSize} mode={cooperMode} onModeChange={setCooperMode}
        apiRef={cooperApi} answer={q => ({ text: `Here's what I found about "${q}"…` })} />
    </AppShell>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

- Add `sideNav={<SideNav … defaultCollapsed />}` only for stages that have sections (see `patterns/nav-bar.md`).
- `type="value"` / `type="explore"` on BottomSheet for the Value / Explore stages (read its entry).

## 2. Library / list page

PageTop + one DataTable (pattern helper: filter, search, sort, empty state, no paging). Status = Indicator (dot + label, rule 8).

```jsx
const { DataTable, Indicator, Button } = IFS;
const STATUS = { draft: { type: 'purple', label: 'Draft' }, review: { type: 'orange', label: 'In review' },
                 approved: { type: 'green', label: 'Approved' } };
const day = s => new Date(`${s}T12:00:00`);   // not new Date('YYYY-MM-DD'): that's UTC and shows the day before
const ITEMS = [
  { id: 'i1', code: 'INV-2026-0812', name: 'Northgate Substation Transformer Replacement', status: 'review',
    owner: { name: 'Ivy Okafor', initials: 'IO' }, cost: 12.4, modified: day('2026-10-27') },
  // …8–15 rows of realistic Copperleaf data
];

function Library() {
  return (
    <div style={{ padding: 'var(--paddings-padding-300)', display: 'flex', flexDirection: 'column', gap: 'var(--gaps-gap-500)' }}>
    <DataTable variant="standard" defaultRows={ITEMS} defaultSort={{ key: 'modified', dir: 'desc' }}
      pageTop={{ title: 'Investments', description: 'Every investment being shaped for the 2027 capital plan',
        actions: <Button type="secondary" size="m" iconLeft="system-pencil-plus">New</Button> }}
      // Page with no other tabs: status filter as page Tabs with counts. If the page already has tabs,
      // use variant: 'segmented' (SegmentedControl S inside the card) — see patterns/table.md rule 2.
      filterTabs={{ variant: 'tabs', items: [{ value: 'all', label: 'All' },
        ...Object.entries(STATUS).map(([k, s]) => ({ value: k, label: s.label, match: r => r.status === k }))] }}
      search={{ placeholder: 'Ask anything about investments' }}
      onOpen={r => go(`detail-${r.id}`)}
      columns={[
        { key: 'name', title: 'Investment', name: true, width: '1fr', code: r => r.code },
        { key: 'status', title: 'Status', width: 150, type: 'custom', filterValue: r => STATUS[r.status].label,
          render: r => <Indicator type={STATUS[r.status].type}>{STATUS[r.status].label}</Indicator> },
        { key: 'owner', title: 'Owner', width: 200, type: 'user', filterValue: r => r.owner.name },
        { key: 'cost', title: 'Cost', width: 110, kind: 'number', type: 'custom', render: r => `$${r.cost.toFixed(1)}M` },
        { key: 'modified', title: 'Last modified', width: 150, kind: 'date', type: 'custom',
          render: r => r.modified.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
      ]} />
    </div>
  );
}
```

`variant="ranked"` adds pin + drag for priority lists (the Build library); read DataTable's entry for `rowActions`, `progressive` and chip filters.

## 3. Object page (one investment, alternative, framework…)

PageHeader in AppShell's `header` slot, content in sections with plain `.t-*` headings. Key metrics → StatCardsRow; text facts → ContentCard.

```jsx
const { PageHeader, StatCardsRow, ContentCard, CommentButton } = IFS;

function ItemHeader({ item }) {
  const s = STATUS[item.status];
  return <PageHeader title={item.name} id={item.code} onBack={() => go('list')}
    status={<Indicator type={s.type}>{s.label}</Indicator>}
    actions={<CommentButton onClick={() => toast({ title: 'Comments' })} />} />;
}

function ItemPage({ item }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gaps-gap-600)', padding: 'var(--paddings-padding-400)' }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gaps-gap-400)' }}>
        <span className="t-heading-h3-medium">Key facts</span>
        <StatCardsRow cards={[
          { title: 'Total cost', value: `$${item.cost.toFixed(1)}M`, description: 'Capital, FY27–FY31' },
          // …up to 4 cards
        ]} />
        <ContentCard size="m" avatar={{ initials: item.owner.initials }} title={`Owned by ${item.owner.name}`}
          description="Substation renewal · Horizon FY27–FY31" />
      </section>
    </div>
  );
}
```

- Comparing 2–4 alternatives side by side (rules 3b), as on Build › Compare Alternatives:

```jsx
const { InfoHintItem, BarChartItem } = IFS;
const METRICS = [   // color = data-viz colour 1–10, the same in the legend and the bars
  { key: 'cost', label: 'Capital cost', color: 5, fmt: v => `$${v.toFixed(1)}M` },
  { key: 'value', label: 'Value score', color: 3, fmt: v => String(v) },
  { key: 'risk', label: 'Risk reduced', color: 4, fmt: v => `${v}%` },
];
function Alternatives({ alts }) {   // alts = [{ id, name, description, cost, value, risk }]
  const [preferred, setPreferred] = React.useState(alts[0].id);
  const max = Object.fromEntries(METRICS.map(m => [m.key, Math.max(...alts.map(a => a[m.key])) || 1]));
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gaps-gap-400)' }}>
      <span className="t-heading-h3-medium">Alternatives</span>
      <div style={{ display: 'flex', gap: 'var(--gaps-gap-600)' }}>
        {METRICS.map(m => <InfoHintItem key={m.key} label={m.label} color={`var(--data-viz-data-${m.color})`} />)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${alts.length}, minmax(0, 1fr))`, gap: 'var(--gaps-gap-400)' }}>
        {alts.map(a => (
          <ContentCard key={a.id} size="m" title={a.name} description={a.description} selected={a.id === preferred}
            onClick={() => { setPreferred(a.id); toast({ title: `${a.name} set as preferred` }); }}
            bottom={
              // width: 100% matters: the slot shrink-wraps, so without it the bars ignore their % widths.
              <div style={{ width: '100%', alignSelf: 'stretch', display: 'grid', gridTemplateColumns: '96px 1fr',
                alignItems: 'center', gap: 'var(--gaps-gap-200) var(--gaps-gap-300)' }}>
                {METRICS.map(m => <React.Fragment key={m.key}>
                  <span className="t-body-m-regular">{m.label}</span>
                  <div><BarChartItem color={m.color} style={{ width: `${(a[m.key] / max[m.key]) * 100}%`, minWidth: 56 }}>
                    {m.fmt(a[m.key])}</BarChartItem></div>
                </React.Fragment>)}
              </div>} />
        ))}
      </div>
    </section>
  );
}
```
- A right-hand side column that stays open: `Panel` (in the layout, not over it). Put it next to the content in a flex row.
- Stage progress in the header: pass a `Stepper` to PageHeader only with steps the user or a pattern gave you.
