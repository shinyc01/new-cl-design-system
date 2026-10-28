import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { ValueMapButton, MapToolbar, NodeHoverActions, AddNodeButton, NodeCard, SidebarNodeCard, MapPin, CanvasBackground, CanvasConnector,
    DropZone, SankeyNode, SankeyHeader, Sankey, TimelinePhase, TimelineChart } = IFS;
  const Row = ({ label, children, top, nowrap }) => <div className="g-row" style={{ ...(top ? { alignItems: 'flex-start' } : null), ...(nowrap ? { flexWrap: 'nowrap' } : null) }}><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const Col = ({ children }) => <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>;

  IFS_GALLERY.push({ name: 'ValueMapButton', figma: 'value-map-button (2590:20612)', render: () => <>
    <Row label="Type / Selected">
      <ValueMapButton type="input" />
      <ValueMapButton type="shape" defaultSelected="fit" />
      <ValueMapButton type="shape" defaultSelected="expand" />
      <ValueMapButton type="shape" defaultSelected="collapse" />
    </Row>
  </> });

  IFS_GALLERY.push({ name: 'MapToolbar', figma: 'explore-map-button (7404:34866) + explore-map-button-base (7404:34867)', render: () => <>
    <Row label="default" top><MapToolbar /><MapToolbar defaultTool="area" /></Row>
  </> });

  IFS_GALLERY.push({ name: 'NodeHoverActions', figma: 'node-button (1851:191153)', render: () => <>
    <Row label="Type" top>{['expand', 'collapse', 'isolate-path', 'submodel'].map(t => <NodeHoverActions key={t} type={t} />)}</Row>
  </> });

  IFS_GALLERY.push({ name: 'AddNodeButton', figma: 'add-node-button (2879:7311)', render: () => <>
    <Row label="State" top><Col>
      <AddNodeButton />
      <AddNodeButton state="hover" />
      <AddNodeButton state="pressed" />
      <AddNodeButton state="typing" />
      <AddNodeButton disabled />
    </Col></Row>
  </> });

  const TYPES = ['strategic-objective', 'value-model', 'measure', 'enterprise-goal', 'value-framework', 'subnode', 'document', 'user'];
  const STATES = [undefined, 'hover', 'drag', 'select', 'cooper', 'focus', 'cooper-drag', 'out-of-focus', 'disabled', 'checkbox', 'edit'];
  const person = { name: 'Tom Nguyen', role: 'Neighbouring Asset Manager', initials: 'UN' };
  const card = (t, s) => {
    if (t === 'document' && ['disabled', 'checkbox', 'edit'].includes(s)) return <span key={t} style={{ width: 230 }} />;
    if (['subnode', 'value-model', 'user'].indexOf(t) < 0 && s === 'edit') return <span key={t} style={{ width: t === 'user' ? 280 : t === 'document' ? 230 : 200 }} />;
    return <NodeCard key={t} type={t} state={s} badge={t === 'document' ? undefined : t === 'user' ? 'Manager' : '{label}'} caption="{caption}" user={t === 'user' ? person : undefined} />;
  };
  IFS_GALLERY.push({ name: 'NodeCard', figma: 'node-card (1440:4401)', render: () => <div style={{ overflowX: 'auto', padding: 6 }}>
    {STATES.map(s => <Row key={s || 'default'} label={s || 'default'} top nowrap>{TYPES.map(t => card(t, s))}</Row>)}
    <Row label="loading"><NodeCard type="skeleton" /></Row>
    <Row label="counter / interactive"><NodeCard type="value-model" badge="Model" title="Click to select" caption="drag me" counter={7} draggable />
      <NodeCard type="subnode" title="Checkbox" caption="toggle" checkbox defaultChecked={false} /></Row>
  </div> });

  IFS_GALLERY.push({ name: 'SidebarNodeCard', figma: 'sidebar-node-card (2667:6608)', render: () => <>
    <Row label="State" top><Col>
      {[undefined, 'hover', 'drag', 'focus', 'cooper-hover', 'cooper-drag'].map(s => <SidebarNodeCard key={s || 'd'} state={s} description="{description}" />)}
    </Col></Row>
  </> });

  IFS_GALLERY.push({ name: 'MapPin', figma: 'map-pin-teardrop (43:2020)', render: () => <>
    {[undefined, 'out-of-hover', 'selected', 'opened'].map(s => <Row key={s || 'd'} label={s || 'default'}>
      {['neutral', 'error', 'warning'].map(st => <React.Fragment key={st}><MapPin status={st} state={s} /><MapPin status={st} state={s} icon="asset-structure" /></React.Fragment>)}
    </Row>)}
  </> });

  IFS_GALLERY.push({ name: 'DropZone', figma: 'move-and-drop-background (4509:30446)', render: () => <>
    <Row label="text off / on"><DropZone style={{ width: 320, height: 160 }} /><DropZone text style={{ width: 320, height: 160 }} onDrop={d => console.log('dropped', d)} /></Row>
    <Row label="drag into it"><SidebarNodeCard title="Drag me" description="onto the drop zone" /></Row>
  </> });

  IFS_GALLERY.push({ name: 'SankeyNode', figma: 'sankey-atom (1853:12325) + sankey-header (2698:64494)', render: () => <>
    {[undefined, 'hover'].map(s => <Row key={s || 'd'} label={s || 'default'}>
      <SankeyNode label="WDRM v4" from="$1.24B" to="$1.27B" change="4.5%" state={s} />
      <SankeyNode type="measure" label="Measure" from="$1.24B" to="$1.27B" change="4.5%" state={s} />
    </Row>)}
    <Row label="disabled"><SankeyNode label="WDRM v4" from="$1.24B" to="$1.27B" disabled /><SankeyNode type="measure" label="Measure" from="$1.24B" to="$1.27B" disabled /></Row>
    <Row label="header"><SankeyHeader abbr="MSR." fromLabel="Q1 2025" toLabel="Q4 2026" from="29" to="24" /></Row>
  </> });

  const sk = {
    columns: [
      { id: 'g', label: 'Goals' }, { id: 'vf', label: 'Value framework' },
      { id: 'o', label: 'Strategic objectives', header: { abbr: 'OBJ.', fromLabel: 'Q1 2025', toLabel: 'Q4 2026', from: '6', to: '5' } },
      { id: 'm', label: 'Models', header: { abbr: 'MOD.', fromLabel: 'Q1 2025', toLabel: 'Q4 2026', from: '7', to: '9' } },
      { id: 'me', label: 'Measure output', header: { abbr: 'MEAS.', fromLabel: 'Q1 2025', toLabel: 'Q4 2026', from: '29', to: '24' } },
    ],
    nodes: [
      { id: 'g1', column: 'g', type: 'source', color: 'violet', count: 6, label: 'Q1 2025 Value Framework' },
      { id: 'g2', column: 'g', type: 'source', color: 'green', count: 5, label: 'Q4 2026 Value Framework' },
      ...['Reliability', 'Finance', 'Environmental', 'Social', 'Safety'].map((l, i) => ({ id: 'o' + i, column: 'o', label: l, from: '$1.24B', to: i < 4 ? '$1.27B' : undefined })),
      ...['WDRM v4', 'WTRM v1', 'CapEx v3', 'Carbon footprint v4', 'Public Safety Risk'].map((l, i) => ({ id: 'm' + i, column: 'm', label: l, from: '$1.24B', to: '$1.27B', change: '4.5%' })),
      ...['SAIDI', 'SAIFI', 'Tx Wildfire Risk', 'Total CAPEX', 'tCO₂e avoided', 'SEC disclosure score', 'Regulatory penalty $'].map((l, i) => ({ id: 'e' + i, column: 'me', type: 'measure', label: l, from: '$1.24B', to: '$1.27B' })),
    ],
    links: [
      ['g1', 'o0', 3], ['g1', 'o1', 2], ['g1', 'o2', 2], ['g2', 'o0', 2], ['g2', 'o3', 2], ['g2', 'o4', 2],
      ['o0', 'm0', 2], ['o0', 'm1', 2], ['o1', 'm2', 2], ['o2', 'm3', 2], ['o3', 'm3', 1], ['o4', 'm4', 2], ['o0', 'm4', 1],
      ['m0', 'e0', 1], ['m0', 'e1', 1], ['m1', 'e2', 1], ['m2', 'e3', 1], ['m3', 'e4', 1], ['m4', 'e5', 1], ['m4', 'e6', 1], ['m1', 'e6', 1],
    ].map(([source, target, value]) => ({ source, target, value })),
  };
  IFS_GALLERY.push({ name: 'Sankey', figma: 'sankey-organism (4457:53304)', render: () => <div style={{ width: 1200 }}>
    <Sankey {...sk} height={480} />
  </div> });

  const groups = ['2027', '2028', '2029', '2030', '2031'].map(y => ({ label: y, slots: ['Q1', 'Q2', 'Q3', 'Q4'] }));
  const tasks = [{ title: 'sub task', label: 'Q1 2027', start: 0, end: 0.75 }, { title: 'sub task', label: 'Q1 2027', start: 0.75, end: 1.6 }, { title: 'sub task', label: 'Q1 2027', start: 0, end: 1.9 }];
  const phases = [
    { id: 1, title: '{phase-title}', subtitle: 'Internal', color: 'teal', start: 0, end: 1.9, tasks, defaultExpanded: true },
    { id: 2, title: '{phase-title}', subtitle: 'Internal', color: 'muted-purple', start: 4.2, end: 8.9 },
    { id: 3, title: '{phase-title}', badge: '6 weeks behind', color: 'steel-blue', start: 9.1, end: 13.2 },
    { id: 4, title: '{phase-title}', subtitle: 'Internal', color: 'rose', start: 14.2, end: 18.9 },
  ];
  IFS_GALLERY.push({ name: 'TimelineChart', figma: 'timeline-chart-organism (3967:38286) + timiline-phase-molecule (3967:1765)', render: () => <div style={{ width: 1368 }}>
    <Row label="default" top><div style={{ flex: 1 }}><TimelineChart groups={groups} phases={phases} /></div></Row>
    <Row label="hover" top><div style={{ flex: 1 }}><TimelineChart groups={groups} state="hover" onAddPhase={() => {}}
      phases={phases.map((p, i) => i === 0 ? { ...p, state: 'hover' } : p)} /></div></Row>
  </div> });

  // ---- Demo: a pannable framework canvas with nodes, connectors, the map tools and a mini-map ----
  const NODES = [
    { id: 'eg', type: 'enterprise-goal', badge: 'Goal', title: 'Enterprise Goals', caption: '3 goals', x: 40, y: 220 },
    { id: 'vf', type: 'value-framework', badge: 'Framework', title: 'Value Framework v12', caption: 'Active', x: 320, y: 220 },
    { id: 'so1', type: 'strategic-objective', badge: 'Objective', title: 'Reliability', caption: '$1.27B', x: 600, y: 120 },
    { id: 'so2', type: 'strategic-objective', badge: 'Objective', title: 'Safety', caption: '$1.24B', x: 600, y: 320 },
    { id: 'vm1', type: 'value-model', badge: 'Model', title: 'WDRM v4', caption: '$1.27B', x: 880, y: 60 },
    { id: 'vm2', type: 'value-model', badge: 'Model', title: 'SAIDI / SAIFI v1', caption: '$1.27B', x: 880, y: 200 },
    { id: 'vm3', type: 'value-model', badge: 'Model', title: 'Public Safety Risk', caption: '$1.24B', x: 880, y: 340 },
    { id: 'ms', type: 'measure', badge: 'Measure', title: 'Measures', caption: '24 outputs', x: 1160, y: 200 },
  ];
  const EDGES = [['eg', 'vf'], ['vf', 'so1'], ['vf', 'so2'], ['so1', 'vm1'], ['so1', 'vm2'], ['so2', 'vm3'], ['vm1', 'ms'], ['vm2', 'ms'], ['vm3', 'ms']];
  const W = 200, H = 78, WORLD = { x: 0, y: 0, width: 1400, height: 480 };

  // NOTE: MiniMap is NOT a Figma component. The Navigation page only has notes describing a canvas navigator
  // ("compact overview of the full canvas … current viewport indicated") illustrated by a flat image. This is a
  // gallery-local stand-in so the composition can be reviewed; it is not exported from the kit.
  function DemoMiniMap({ view, size, onJump }) {
    const mw = 180, scale = mw / WORLD.width, mh = WORLD.height * scale;
    const vp = { x: -view.x / view.zoom * scale, y: -view.y / view.zoom * scale, w: size.w / view.zoom * scale, h: size.h / view.zoom * scale };
    const jump = e => { const r = e.currentTarget.getBoundingClientRect(); onJump((e.clientX - r.left) / scale, (e.clientY - r.top) / scale); };
    return (
      <div onPointerDown={jump} title="Mini-map (not a Figma component)" style={{ position: 'relative', width: mw, height: mh, overflow: 'hidden', cursor: 'pointer',
        borderRadius: 'var(--radius-radius-200)', background: 'var(--element-button-tertiary-fill-default)', boxShadow: 'inset 0 0 0 1px var(--border-base), var(--elevation-elevation-1-primary)',
        backdropFilter: 'blur(var(--blur-strong))' }}>
        {NODES.map(n => <span key={n.id} style={{ position: 'absolute', left: n.x * scale, top: n.y * scale, width: W * scale, height: H * scale, borderRadius: 1,
          background: 'var(--border-strong)' }} />)}
        <span style={{ position: 'absolute', left: vp.x, top: vp.y, width: vp.w, height: vp.h, boxShadow: 'inset 0 0 0 1px var(--border-selected)', borderRadius: 2 }} />
      </div>
    );
  }

  function CanvasDemo() {
    const api = React.useRef(null);
    const box = React.useRef(null);
    const [view, setView] = React.useState({ x: 0, y: 30, zoom: 1 });
    const [size, setSize] = React.useState({ w: 1100, h: 560 });
    const [selected, setSelected] = React.useState('vf');
    const [hovered, setHovered] = React.useState(null);
    const [collapsed, setCollapsed] = React.useState(false);
    React.useEffect(() => { if (box.current) setSize({ w: box.current.clientWidth, h: box.current.clientHeight }); }, []);
    const hidden = id => collapsed && ['vm1', 'vm2', 'vm3', 'ms'].includes(id);
    const pos = Object.fromEntries(NODES.map(n => [n.id, n]));
    return (
      <div ref={box} style={{ width: 1100, height: 560, borderRadius: 8, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px var(--border-base)' }}>
        <CanvasBackground apiRef={api} view={view} onViewChange={setView} aria-label="Value framework canvas"
          overlay={<>
            <div style={{ position: 'absolute', left: 16, bottom: 16 }}>
              <ValueMapButton type="shape" onFit={() => api.current.fit(WORLD)} onExpand={() => setCollapsed(false)} onCollapse={() => setCollapsed(true)} />
            </div>
            <div style={{ position: 'absolute', right: 16, top: 16 }}>
              <MapToolbar onAction={a => { if (a === 'zoom-in') api.current.zoomBy(1.2); if (a === 'zoom-out') api.current.zoomBy(1 / 1.2); }} />
            </div>
            <div style={{ position: 'absolute', right: 16, bottom: 16 }}>
              <DemoMiniMap view={view} size={size} onJump={(wx, wy) => setView(v => ({ ...v, x: size.w / 2 - wx * v.zoom, y: size.h / 2 - wy * v.zoom }))} />
            </div>
          </>}>
          {EDGES.filter(([a, b]) => !hidden(a) && !hidden(b)).map(([a, b]) =>
            <CanvasConnector key={a + b} from={{ x: pos[a].x + W, y: pos[a].y + H / 2 }} to={{ x: pos[b].x, y: pos[b].y + H / 2 }}
              highlighted={selected === a || selected === b} />)}
          {NODES.filter(n => !hidden(n.id)).map(n => (
            <div key={n.id} style={{ left: n.x, top: n.y }} onMouseEnter={() => setHovered(n.id)} onMouseLeave={() => setHovered(null)}>
              <NodeCard type={n.type} badge={n.badge} title={n.title} caption={n.caption} selected={selected === n.id}
                onSelectedChange={on => setSelected(on ? n.id : null)} outOfFocus={selected && selected !== n.id && !EDGES.some(e => e.includes(selected) && e.includes(n.id))} />
              {hovered === n.id && n.id === 'vf' && <div style={{ position: 'absolute', left: W + 8, top: 0, zIndex: 3 }}>
                <NodeHoverActions type={collapsed ? 'expand' : 'collapse'} onAction={a => setCollapsed(a === 'collapse')} /></div>}
            </div>
          ))}
          <div style={{ left: 880, top: 440 }}><AddNodeButton /></div>
          <div style={{ left: 640, top: 40 }}><MapPin status="warning" icon="asset-structure" label="Asset at risk" /></div>
        </CanvasBackground>
      </div>
    );
  }
  IFS_GALLERY.push({ name: 'Canvas demo', figma: 'canvas-background (1395:196712) + node-card + value-map-button + explore-map-button', render: () => <>
    <p className="t-body-m-regular" style={{ color: 'var(--text-tertiary)', margin: '0 0 12px' }}>
      Drag the background to pan, ctrl/⌘ + wheel to zoom, click a node to select, hover Value Framework for node actions, Fit / Collapse / Expand bottom-left.
      The mini-map is a gallery-only stand-in (no Figma component exists).</p>
    <CanvasDemo />
  </> });

  IFS_GALLERY.push({ name: 'CanvasBackground', figma: 'canvas-background (1395:196712)', render: () => <>
    <Row label="Default" top><div style={{ width: 480, height: 240 }}><CanvasBackground /></div></Row>
  </> });
}
