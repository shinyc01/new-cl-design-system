import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { DataVizBar, DataVizGroupedBar, DataVizLine, DataVizIndicator, ValueLabel, LegendSwatch, DataVizHeader, DataVizCard, DataVizTooltip,
    ColumnChart, BarChart, GroupedColumnChart, StackedColumnChart, LineChart, AreaChart, PieChart, DonutChart, ScatterChart, BubbleChart,
    GaugeChart, WaterfallChart, FunnelChart, HeatmapChart, HistogramChart, ProgressRing, EvidenceStrength } = IFS;
  const Row = ({ label, children, style }) => <div className="g-row" style={style}><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const Grid = ({ children, w = 558 }) => <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, ${w}px)`, gap: 24, alignItems: 'start' }}>{children}</div>;
  const STATES = ['default', 'hover', 'cooper', 'empty', 'loading'];
  const usd = v => `$${Math.abs(v) >= 1e6 ? `${+(v / 1e6).toFixed(1)}M` : Math.abs(v) >= 1e3 ? `${+(v / 1e3).toFixed(1)}K` : v}`;
  const usdAxis = v => (v ? `$${+(v / 1e6).toFixed(1)}M` : '$0');
  // One gallery block per chart: every Figma State (Default / Hover / Cooper / Empty / Loading).
  const states = (Chart, props, hot = 0) => () => <Grid>{STATES.map(s => <Chart key={s} {...props} state={s === 'default' ? undefined : s} defaultActive={s === 'hover' ? hot : undefined} />)}</Grid>;

  /* ---------------- atoms ---------------- */
  IFS_GALLERY.push({ name: 'DataVizBar', figma: 'bar-atom (4457:32996)', render: () => <>
    {['default', 'hover', 'out-of-focus', 'background', 'loading'].map(s => <Row key={s} label={s}><DataVizBar state={s} style={{ width: 238 }}>{'{info}'}</DataVizBar></Row>)}
    <Row label="colours">{['muted-purple', 'teal', 'steel-blue', 'deep-green'].map(c => <DataVizBar key={c} color={c} style={{ width: 120 }}>$4.2M</DataVizBar>)}</Row>
  </> });

  IFS_GALLERY.push({ name: 'DataVizGroupedBar', figma: 'grouped-bar-molecule (4457:37362)', render: () => <>
    <Row label="horizontal"><DataVizGroupedBar type="horizontal" values={[1, 1, 1, 2.7]} style={{ width: 238, height: 192 }} /></Row>
    <Row label="vertical"><DataVizGroupedBar type="vertical" values={[1, 1, 1, 1]} style={{ width: 238, height: 192 }} /></Row>
    <Row label="horizontal · progress"><DataVizGroupedBar type="horizontal" progress value={64} max={100} style={{ width: 238, height: 36 }} /></Row>
    <Row label="vertical · progress"><DataVizGroupedBar type="vertical" progress value={64} max={100} style={{ width: 36, height: 238 }} /></Row>
    <Row label="with values"><DataVizGroupedBar type="vertical" showValues values={[42, 28, 18, 12]} style={{ width: 360, height: 40 }} /></Row>
  </> });

  IFS_GALLERY.push({ name: 'DataVizLine', figma: 'line-atom (4440:32650)', render: () => <>
    <Row label="solid"><div style={{ width: 212 }}><DataVizLine /></div></Row>
    <Row label="dashed"><div style={{ width: 212 }}><DataVizLine dashed /></div></Row>
    <Row label="vertical"><div style={{ height: 60, display: 'flex', gap: 24 }}><DataVizLine orientation="vertical" /><DataVizLine orientation="vertical" dashed /></div></Row>
  </> });

  IFS_GALLERY.push({ name: 'DataVizIndicator', figma: 'indicator-atom (4440:32643)', render: () => <>
    <Row label="types">{['default', 'selected', 'intended-target'].map(t => <DataVizIndicator key={t} type={t} />)}</Row>
    <Row label="colours">{['muted-purple', 'teal', 'rose', 'steel-blue'].map(c => <DataVizIndicator key={c} color={c} />)}</Row>
  </> });

  IFS_GALLERY.push({ name: 'ValueLabel', figma: 'value-label-atom (4440:32611)', render: () => <>
    <Row label="states">{['primary', 'secondary', 'tertiary', 'empty', 'loading'].map(s => <ValueLabel key={s} state={s}>{'{info}'}</ValueLabel>)}</Row>
  </> });

  IFS_GALLERY.push({ name: 'LegendSwatch', figma: 'legend-swatch-atom (4440:32628)', render: () => <>
    <Row label="states">{['default', 'hover', 'out-of-hover'].map(s => <LegendSwatch key={s} state={s} label="Title" value="Value" />)}
      <LegendSwatch state="intended-target" label="Intended target" /></Row>
    <Row label="no value">{['muted-purple', 'teal', 'rose'].map(c => <LegendSwatch key={c} color={c} label={c} />)}</Row>
  </> });

  IFS_GALLERY.push({ name: 'DataVizHeader', figma: 'data-viz-header-molecule (2154:2068)', render: () => {
    const h = { onEdit: () => {}, onDelete: () => {}, onMore: () => {} };
    return <>{[undefined, 'hover'].map(s => <React.Fragment key={s || 'd'}>
      <Row label={`${s || 'default'} · none`}><div style={{ width: 532 }}><DataVizHeader state={s} title="Create a chart or diagram" {...h} /></div></Row>
      <Row label={`${s || 'default'} · segmented`}><div style={{ width: 532 }}><DataVizHeader state={s} title="Create a chart or diagram" segments={['label', 'label 2']} {...h} /></div></Row>
      <Row label={`${s || 'default'} · button`}><div style={{ width: 532 }}><DataVizHeader state={s} title="Create a chart or diagram" button={{ label: 'Show all' }} {...h} /></div></Row>
    </React.Fragment>)}</>;
  } });

  IFS_GALLERY.push({ name: 'DataVizCard', figma: 'data-viz-card-organism (4457:33030)', render: () => <Grid w={582}>
    {[undefined, 'hover', 'drag', 'cooper'].map(s => (
      <DataVizCard key={s || 'd'} state={s} title="Create a chart or diagram" style={{ width: 582, margin: 6 }}>
        <DataVizGroupedBar type="vertical" showValues values={[42, 28, 18, 12]} style={{ height: 40 }} />
        <div style={{ height: 180 }} />
      </DataVizCard>
    ))}
  </Grid> });

  IFS_GALLERY.push({ name: 'DataVizTooltip', figma: 'data-viz-modal-organism (4440:32681)', render: () => <Row label="modal · chart">
    <DataVizTooltip subtitle="{Category}" title="{Title}" value="$X" items={[{ label: 'Title', value: 'Value', color: 'rose' }, { label: 'Title', value: 'Value', color: 'teal' }]} />
    <DataVizTooltip variant="chart" title="Q4 FY25" value="$14.8M" delta={{ text: '+9% vs plan', direction: 'down' }}
      items={[{ label: 'Plan', value: '$13.6M' }, { label: 'Variance', value: '$1.2M' }, { label: 'Peer median', value: '$13.2M' }]} />
  </Row> });

  /* ---------------- core charts (every State) ---------------- */
  const spend = [
    { label: 'Q1 FY25', value: 8.2e6, reference: 9.3e6 }, { label: 'Q2 FY25', value: 11.4e6, reference: 10.4e6 },
    { label: 'Q3 FY25', value: 9.6e6, reference: 10.2e6 },
    { label: 'Q4 FY25', value: 14.8e6, reference: 13.4e6, delta: { text: '+9% vs plan', direction: 'down' }, details: [{ label: 'Plan', value: '$13.6M' }, { label: 'Variance', value: '$1.2M' }, { label: 'Peer median', value: '$13.2M' }] },
    { label: 'Q1 FY26', value: 12.1e6, reference: 13.4e6 }, { label: 'Q2 FY26', value: 16.3e6, reference: 15.6e6 }];
  IFS_GALLERY.push({ name: 'ColumnChart', figma: 'chart-column (9862:12468)', render: states(ColumnChart, { title: 'Spend by quarter', data: spend, valueLabel: 'Actual spend', format: usdAxis }, 3) });

  const outage = [{ label: 'North', value: 142, reference: 140 }, { label: 'Coastal', value: 118, reference: 124, delta: { text: '−6% vs last year', direction: 'down' }, details: [{ label: 'Last year', value: '126 min' }, { label: 'Feeders affected', value: '14' }, { label: 'Peer median', value: '124 min' }] },
    { label: 'Central', value: 96, reference: 93 }, { label: 'Mountain', value: 88, reference: 92 }, { label: 'Urban', value: 71, reference: 68 }, { label: 'Delta', value: 54, reference: 57 }];
  IFS_GALLERY.push({ name: 'BarChart', figma: 'chart-bar (9862:12961)', render: states(BarChart, { title: 'Outage minutes by region', data: outage, valueLabel: 'Outage minutes', sort: true }, 1) });

  const bva = [{ label: 'FY23', budget: 11e6, actual: 10.2e6, reference: 11.8e6 }, { label: 'FY24', budget: 12.5e6, actual: 13.4e6, reference: 11.8e6 },
    { label: 'FY25', budget: 14e6, actual: 15.2e6, reference: 15e6 }, { label: 'FY26', budget: 15.4e6, actual: 14.1e6, reference: 14.7e6 }];
  IFS_GALLERY.push({ name: 'GroupedColumnChart', figma: 'chart-grouped-column (9862:13445)', render: states(GroupedColumnChart, { title: 'Budget vs actual by year', data: bva, format: usdAxis,
    series: [{ key: 'budget', label: 'Budget' }, { key: 'actual', label: 'Actual' }] }, 2) });

  const cat = [{ label: 'Q1', capital: 8e6, maintenance: 5e6, emergency: 2e6 }, { label: 'Q2', capital: 9e6, maintenance: 5.5e6, emergency: 2.4e6 },
    { label: 'Q3', capital: 10e6, maintenance: 6e6, emergency: 2e6 }, { label: 'Q4', capital: 11.2e6, maintenance: 7.1e6, emergency: 3.1e6, delta: { text: '+7% vs Q3', direction: 'down' } },
    { label: 'Q1 next', capital: 10.4e6, maintenance: 6.6e6, emergency: 2.2e6 }];
  IFS_GALLERY.push({ name: 'StackedColumnChart', figma: 'chart-stacked-column (9863:11139)', render: states(StackedColumnChart, { title: 'Spend by category', data: cat, format: usdAxis,
    series: [{ key: 'capital', label: 'Capital' }, { key: 'maintenance', label: 'Maintenance' }, { key: 'emergency', label: 'Emergency' }] }, 3) });

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const ty = [128, 121, 134, 118, 112, 125, 108, 104, 117, 99, 96, 102], ly = [135, 130, 127, 131, 126, 129, 122, 125, 119, 121, 114, 118], pa = [124, 122, 123, 119, 116, 118, 114, 112, 113, 108, 106, 107];
  const trend = months.map((m, i) => ({ label: m, ty: ty[i], ly: ly[i], avg: pa[i], lo: pa[i] - 6, hi: pa[i] + 6 }));
  IFS_GALLERY.push({ name: 'LineChart', figma: 'chart-line (9863:11650)', render: states(LineChart, { title: 'Outage minutes trend', data: trend,
    series: [{ key: 'ty', label: 'This year' }, { key: 'ly', label: 'Last year' }], band: { low: 'lo', high: 'hi', mid: 'avg', label: 'Peer avg ±1σ' } }, 7) });

  const risk = months.map((m, i) => ({ label: m, risk: [5.8, 6.2, 6.9, 6.4, 7.3, 7.9, 7.5, 8.2, 8.8, 8.4, 9.1, 8.4][i] * 1e6, peer: (5.2 + i * 0.17) * 1e6 }));
  IFS_GALLERY.push({ name: 'AreaChart', figma: 'chart-area (9863:12167)', render: states(AreaChart, { title: 'Retained risk over time', data: risk, format: usdAxis,
    series: [{ key: 'risk', label: 'Retained risk' }], referenceKey: 'peer' }, 9) });

  IFS_GALLERY.push({ name: 'PieChart', figma: 'chart-pie (9866:12309)', render: states(PieChart, { title: 'Spend share by asset type', format: usd, valueLabel: 'Spend',
    data: [{ label: 'Transformers', value: 48.6e6 }, { label: 'Lines', value: 34.6e6, delta: { text: '+2 pts vs FY25', direction: 'down' } }, { label: 'Substations', value: 26.9e6 }, { label: 'Other', value: 17.9e6, color: 'muted-purple', opacity: 0.5 }] }, 1) });

  IFS_GALLERY.push({ name: 'DonutChart', figma: 'chart-donut (9866:12774)', render: states(DonutChart, { title: 'Work orders by status', centerValue: '412', centerLabel: 'work orders', valueLabel: 'Work orders',
    data: [{ label: 'Done', value: 223, color: 'teal' }, { label: 'In progress', value: 103, color: 'muted-purple' }, { label: 'Open', value: 62, color: 'rose' }, { label: 'Cancelled', value: 24, color: 'muted-purple', opacity: 0.5 }] }, 1) });

  const pts = [[20, 12], [23, 13.5], [26, 12.2], [43, 16], [53, 16.5], [75, 12.3], [75, 15.8], [92, 18.3], [95, 21.2], [120, 23.4], [121, 24.8], [150, 24.4], [160, 25], [190, 29.4]]
    .map(([x, y], i) => ({ label: `Completed project ${i + 1}`, x, y: y * 1e6, series: 'done' }))
    .concat([[57, 25.5], [70, 26.2], [71, 23.3], [78, 22.2], [90, 23.6], [100, 26.7], [102, 32.1], [143, 33], [165, 37], [188, 42.4]]
      .map(([x, y], i) => ({ label: i === 6 ? 'Feeder 14 undergrounding' : `Project ${i + 1}`, x, y: y * 1e6, series: 'wip', size: 4 + (i % 4) * 3 })));
  IFS_GALLERY.push({ name: 'ScatterChart', figma: 'chart-scatter (9866:13245)', render: states(ScatterChart, { title: 'Cost vs duration by project', data: pts, format: usdAxis, xUnit: 'days', xLabel: 'Duration', yLabel: 'Cost',
    series: [{ key: 'done', label: 'Completed', color: 'teal' }, { key: 'wip', label: 'In progress', color: 'muted-purple' }], xReference: 87, yReference: 21e6 }, 20) });

  IFS_GALLERY.push({ name: 'GaugeChart', figma: 'chart-gauge (9867:618)', render: states(GaugeChart, { title: 'Plan delivery', value: 72, target: 85, reference: 64,
    label: 'of planned work delivered', valueLabel: 'Delivered', delta: { text: '−13 pts vs target', direction: 'down' } }, true) });

  IFS_GALLERY.push({ name: 'WaterfallChart', figma: 'chart-waterfall (9866:16075)', render: states(WaterfallChart, { title: 'Budget bridge', format: v => `$${Math.round(v / 1e6)}M`,
    data: [{ label: 'Plan', value: 120e6, total: true }, { label: 'Scope', value: 30e6 }, { label: 'Savings', value: -18e6 }, { label: 'Delay', value: 22e6 }, { label: 'Re-sequencing', value: -12e6 }, { label: 'Forecast', total: true }] }, 3) });

  IFS_GALLERY.push({ name: 'FunnelChart', figma: 'chart-funnel (9867:1065)', render: states(FunnelChart, { title: 'Project pipeline by stage',
    data: [{ label: 'Identified', value: 1240 }, { label: 'Scoped', value: 880, reference: 900 }, { label: 'Approved', value: 540, reference: 585 }, { label: 'In delivery', value: 310, reference: 360 }, { label: 'Completed', value: 190, reference: 230 }] }, 2) });

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 12 }, (_, i) => `${i * 2}h`);
  const heat = days.map((d, r) => hours.map((h, c) => Math.round(2 + 7 * Math.exp(-((c - 8.5) ** 2) / 6) + ((r * 7 + c * 3) % 3) - (r > 4 ? 1 : 0))));
  IFS_GALLERY.push({ name: 'HeatmapChart', figma: 'chart-heatmap (9866:14280)', render: states(HeatmapChart, { title: 'Outages by weekday and hour', rows: days, columns: hours, values: heat,
    lowLabel: 'Fewer outages', highLabel: 'More outages', valueLabel: 'outages', columnLabelEvery: 2 }, [3, 8]) });

  const durations = Array.from({ length: 160 }, (_, i) => Math.round(30 + 90 * Math.abs(Math.sin(i * 12.9898) * 0.5 + Math.sin(i * 4.1) * 0.5)));
  IFS_GALLERY.push({ name: 'HistogramChart', figma: 'chart-histogram (9864:14012)', render: states(HistogramChart, { title: 'Project duration distribution', values: durations, binWidth: 10,
    binFormat: a => `${a}`, valueLabel: 'Projects' }, 5) });

  IFS_GALLERY.push({ name: 'BubbleChart', figma: 'chart-bubble (9866:13788)', render: () => <Grid>
    <BubbleChart title="Cost vs duration, sized by customers" data={pts.filter(d => d.series === 'wip')} format={usdAxis} xUnit="days" xLabel="Duration" yLabel="Cost" sizeLabel="Customers (k)" />
  </Grid> });

  /* ---------------- small molecules ---------------- */
  IFS_GALLERY.push({ name: 'ProgressRing', figma: 'progress-ring-molecule (4619:18187)', render: () => <>
    <Row label="%">{[100, 80, 60, 50, 40, 20, 10, 0].map(v => <ProgressRing key={v} value={v} />)}</Row>
    <Row label="size 48"><ProgressRing value={72} size={48} /></Row>
  </> });

  IFS_GALLERY.push({ name: 'EvidenceStrength', figma: 'evidence-strength-bar-molecule (67:6634)', render: () => <>
    {[60, 87, 96].map(v => <Row key={v} label={v < 70 ? 'reject' : v < 90 ? 'review' : 'approve'}><div style={{ width: 364 }}><EvidenceStrength value={v} /></div></Row>)}
  </> });
}
