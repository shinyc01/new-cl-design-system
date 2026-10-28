import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { Badge, StatusIndicator, Avatar, RiskStatus, ReadinessStatus, Indicator, StatCard, ContentCard, Table, NotificationCard, ProgressBar } = IFS;
  const Row = ({ label, children, style }) => <div className="g-row" style={style}><span className="g-label t-body-m-regular">{label}</span>{children}</div>;

  IFS_GALLERY.push({ name: 'Badge', figma: 'badge-atom (83:52162)', render: () => <>
    {['white', 'black', 'red', 'green', 'orange'].map(c => (
      <Row key={c} label={c}>{['l', 'm', 's'].map(z => <Badge key={z} color={c} size={z} iconLeft="system-star-favourite">{'{label}'}</Badge>)}</Row>
    ))}
    <Row label="false"><Badge color="false" iconLeft="system-star-favourite">{'{label}'}</Badge></Row>
    <Row label="loading">{['l', 'm', 's'].map(z => <Badge key={z} color="loading" size={z} />)}</Row>
    <Row label="extras">
      <Badge indicator="blue">Indicator</Badge>
      <Badge avatar={{ initials: 'TN', type: 'blue' }}>Avatar</Badge>
      <Badge iconRight="system-heart">Icon right</Badge>
    </Row>
  </> });

  IFS_GALLERY.push({ name: 'StatusIndicator', figma: 'status-indicator-atom (789:39211)', render: () => <>
    {[false, true].map(s => (
      <Row key={String(s)} label={s ? 'stroke' : 'no stroke'}>
        {['default', 'error', 'success', 'warning', 'cooper', 'blue'].map(st => <StatusIndicator key={st} state={st} stroke={s} />)}
      </Row>
    ))}
  </> });

  const types = ['awaiting', 'black', 'red', 'dark-orange', 'orange', 'yellow', 'brown', 'dark-blue', 'blue', 'light-blue', 'green', 'lime', 'dark-purple', 'purple', 'light-purple', 'dark-pink', 'light-pink', 'cooper', 'inactive'];
  IFS_GALLERY.push({ name: 'Avatar', figma: 'avatar-atom (260:17144), avatar-organism (260:19923)', render: () => <>
    {[undefined, 'hover', 'pressed', 'focus'].map(s => (
      <Row key={s || 'default'} label={s || 'default'} style={{ gap: 22 }}>
        {types.map(t => <Avatar key={t} type={t} initials="UN" state={s} onClick={() => {}} label={t} />)}
      </Row>
    ))}
    <Row label="loading"><Avatar type="loading" /></Row>
    <Row label="sizes + status">{['xs', 's', 'm', 'l', 'xl'].map(z => <Avatar key={z} size={z} initials="UN" status="check" />)}</Row>
    <Row label="status types">{['check', 'online', 'offline', 'warning', 'error'].map(st => <Avatar key={st} size="l" type="auto" name={`Tom ${st}`} status={st} />)}</Row>
  </> });

  IFS_GALLERY.push({ name: 'RiskStatus', figma: 'status-risk-molecule (69:1729)', render: () => <>
    {['success', 'warning', 'error', 'evaluated'].map(t => (
      <Row key={t} label={t} style={{ gap: 40 }}>
        <RiskStatus type={t} onClick={() => {}} />
        <RiskStatus type={t} state="hover" onClick={() => {}} />
        <RiskStatus type={t} disabled onClick={() => {}} />
        <RiskStatus type={t} state="focus" onClick={() => {}} />
        {t === 'success' && <RiskStatus loading />}
      </Row>
    ))}
  </> });

  IFS_GALLERY.push({ name: 'ReadinessStatus', figma: 'status-readiness-molecule (1440:5273)', render: () => <>
    {['done', 'warning', 'in-progress', 'active', 'loading'].map(t => (
      <Row key={t} label={t} style={{ gap: 20 }}>
        <div style={{ width: 164 }}><ReadinessStatus type={t} right="Text">Text</ReadinessStatus></div>
        {t !== 'done' && <div style={{ width: 164 }}><ReadinessStatus type={t} indicators={[{ type: 'red', label: 'text' }, { type: 'orange', label: 'text' }]}>Text</ReadinessStatus></div>}
      </Row>
    ))}
  </> });

  IFS_GALLERY.push({ name: 'Indicator', figma: 'indicator-molecule (1074:180251)', render: () => <>
    {['s', 'xs'].map(z => (
      <Row key={z} label={z} style={{ gap: 24 }}>
        {['orange', 'green', 'red', 'blue', 'purple', 'gray', 'cooper', 'archive', 'loading'].map(t => <Indicator key={t} size={z} type={t}>text</Indicator>)}
      </Row>
    ))}
    <Row label="button right"><Indicator type="blue" buttonRight="system-close" buttonLabel="Remove">text</Indicator></Row>
  </> });

  IFS_GALLERY.push({ name: 'StatCard', figma: 'stat-card-organism (3643:35055)', render: () => <>
    <Row label="m / s">
      <StatCard style={{ width: 286 }} title="Title" value="Value" description="Description" trend="3 %" />
      <StatCard style={{ width: 286 }} size="s" title="Title" value="Value" description="Description" trend="3 %" />
    </Row>
    <Row label="loading">
      <StatCard style={{ width: 286 }} loading trend="3 %" />
      <StatCard style={{ width: 286 }} size="s" loading trend="3 %" />
    </Row>
    <Row label="badge / down">
      <StatCard style={{ width: 286 }} title="Budget" value="$4.2M" description="of $5M" trend="12 %" trendDirection="down" badge={{ children: 'Over' }} />
    </Row>
  </> });

  const cardProps = size => ({ size, title: '{card-title}', description: '{description}',
    tertiaryAction: { children: '{label}', iconLeft: 'system-star-favourite', iconRight: 'system-heart' },
    primaryAction: { children: '{label}', iconLeft: 'system-star-favourite', iconRight: 'system-heart' } });
  function CardDemo() {
    const [sel, setSel] = React.useState(1);
    return <Row label="clickable">{[0, 1, 2].map(i => <ContentCard key={i} style={{ width: 240 }} size="s" title={`Card ${i + 1}`} description="Click to select"
      selected={sel === i} onClick={() => setSel(i)} />)}</Row>;
  }
  IFS_GALLERY.push({ name: 'ContentCard', figma: 'content-card-organism (3643:32067)', render: () => <>
    {[undefined, 'hover', 'drag', 'selected', 'focus', 'cooper'].map(s => (
      <Row key={s || 'default'} label={s || 'default'} style={{ gap: 24, alignItems: 'flex-start' }}>
        <ContentCard style={{ width: 332 }} state={s} {...cardProps('m')} />
        <ContentCard style={{ width: 332 }} state={s} {...cardProps('s')} />
      </Row>
    ))}
    <Row label="loading" style={{ gap: 24, alignItems: 'flex-start' }}>
      <ContentCard style={{ width: 332 }} loading {...cardProps('m')} />
      <ContentCard style={{ width: 332 }} loading {...cardProps('s')} />
    </Row>
    <Row label="avatar + icon" style={{ alignItems: 'flex-start' }}>
      <ContentCard style={{ width: 332 }} avatar={{ name: 'Tom Nguyen', type: 'blue' }} iconRight="arrow-right" title="Tom Nguyen" description="Neighbouring Asset Manager" />
    </Row>
    <CardDemo />
  </> });

  const columns = [
    { key: 'name', title: 'Investment', sortable: true, type: 'description', sortValue: r => r.name.text, width: '1.4fr' },
    { key: 'owner', title: 'Owner', sortable: true, type: 'user', sortValue: r => r.owner.name },
    { key: 'status', title: 'Status', type: 'status', filter: { applied: true } },
    { key: 'risk', title: 'Risk', type: 'badge', sortable: true, sortValue: r => r.riskRank },
    { key: 'cost', title: 'Cost', sortable: true, type: 'counter', sortValue: r => r.costNum, filter: {} },
  ];
  const rows = [
    { id: 1, region: 'North', name: { text: 'Substation upgrade', description: 'INV-2041' }, owner: { name: 'Tom Nguyen', type: 'blue' }, status: { type: 'green', label: 'Approved' }, risk: { color: 'red', children: 'High' }, riskRank: 3, cost: { text: '$4.2M', value: '3 %' }, costNum: 4.2 },
    { id: 2, region: 'North', name: { text: 'Pole replacement', description: 'INV-2042' }, owner: { name: 'Ada Park', type: 'green' }, status: { type: 'orange', label: 'In review' }, risk: { color: 'orange', children: 'Medium' }, riskRank: 2, cost: { text: '$1.1M', value: '1 %', direction: 'down' }, costNum: 1.1 },
    { id: 3, region: 'South', name: { text: 'Feeder automation', description: 'INV-2043' }, owner: { name: 'Lee Chan', type: 'purple' }, status: { type: 'blue', label: 'Draft' }, risk: { color: 'green', children: 'Low' }, riskRank: 1, cost: { text: '$2.7M', value: '5 %' }, costNum: 2.7 },
    { id: 4, region: 'South', name: { text: 'Transformer refurb', description: 'INV-2044' }, owner: { name: 'Mia Ross', type: 'orange' }, status: { type: 'red', label: 'Rejected' }, risk: { color: 'red', children: 'High' }, riskRank: 3, cost: { text: '$0.8M', value: '2 %' }, costNum: 0.8 },
    { id: 5, region: 'East', name: { text: 'Meter rollout', description: 'INV-2045' }, owner: { name: 'Sam Ito', type: 'dark-pink' }, status: { type: 'green', label: 'Approved' }, risk: { color: 'white', children: 'None' }, riskRank: 0, cost: { text: '$3.3M', value: '4 %' }, costNum: 3.3 },
  ];
  function TableDemo({ grouped }) {
    const [sel, setSel] = React.useState(2);
    const tabs = IFS.SegmentedControl ? <IFS.SegmentedControl options={['All', 'Approved', 'In review']} /> : null;
    const search = IFS.Search ? <IFS.Search placeholder="Ask anything about investments" /> : null;
    return <Table title={grouped ? '{name}' : undefined} tabs={grouped ? tabs : undefined} search={grouped ? search : undefined}
      columns={columns} rows={rows} groupBy={grouped ? 'region' : undefined} defaultCollapsed={grouped ? ['East'] : []}
      selectedId={sel} onRowClick={r => setSel(r.id)} defaultSort={grouped ? null : { key: 'cost', dir: 'desc' }} />;
  }
  IFS_GALLERY.push({ name: 'Table', figma: 'table-card-organism (4835:4031), table-header (1440:5904), table-cell (1440:5941), group-row (4833:19072), content-row (4835:3501)', render: () => <>
    <TableDemo />
    <div style={{ height: 24 }} />
    <TableDemo grouped />
    <div style={{ height: 24 }} />
    <Table columns={[
      { key: 'a', title: 'Check', type: 'check' }, { key: 'b', title: 'User description', type: 'user-description', width: '1.5fr' },
      { key: 'c', title: 'Counter', render: r => <IFS.Icon name="system-more" size={16} /> }]}
      rows={[{ id: 1, a: 'Text', b: { name: 'Tom Nguyen', description: 'Neighbouring Asset Manager', type: 'blue' } }]} />
  </> });

  IFS_GALLERY.push({ name: 'NotificationCard', figma: 'notification-card (9943:5373)', render: () => <>
    {['all', 'specific', 'grouped'].map(t => (
      <Row key={t} label={t} style={{ gap: 32, alignItems: 'flex-start' }}>
        {[false, true].map(r => <NotificationCard key={String(r)} style={{ width: 380 }} type={t} read={r} title="{title}" details="{details}" meta="{item} · {area}" time="{time}" actionLabel="Type" count={3} />)}
      </Row>
    ))}
    <Row label="critical + status + actions" style={{ alignItems: 'flex-start' }}>
      <NotificationCard style={{ width: 380 }} critical title="Approval needed" details="Substation upgrade is waiting for you" meta="INV-2041 · North"
        time="2m" status={{ children: 'Pending' }} actions={[{ label: 'Review' }, { label: 'Dismiss' }]} onClick={() => {}} />
    </Row>
  </> });

  IFS_GALLERY.push({ name: 'ProgressBar', figma: 'progress-bar-molecule (1674:1902)', render: () => <>
    {[100, 80, 60, 50, 40, 20, 10, 0].map(v => <Row key={v} label={`${v}%`}><div style={{ width: 251 }}><ProgressBar value={v} /></div></Row>)}
  </> });
}
