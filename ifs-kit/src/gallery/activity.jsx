import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { TimelineMarker, TimelineConnector, TimelineItem, Timeline, ApprovalChain, ApprovalCard, VersionEntry, VersionHistory,
    Comment, CommentComposer, CommentThread, UserCard, Collaborator, FileCard, VersionCard } = IFS;
  const Row = ({ label, children, style }) => <div className="g-row" style={{ alignItems: 'flex-start', ...style }}><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const Col = ({ w = 354, children, style }) => <div style={{ width: w, display: 'flex', flexDirection: 'column', gap: 12, ...style }}>{children}</div>;
  const LOREM = 'There are people within organizations that have a say in the results of scenarios but are not Copperleaf users.';

  const ACTIVITY = [
    { avatar: { initials: 'JC', type: 'dark-orange' }, title: 'J. Carter', badge: 'Comment', subtitle: 'Administrator', time: '3:42 PM · May 12', children: 'Published this version and set it as the active framework.' },
    { avatar: { type: 'cooper', name: 'Cooper' }, title: 'Cooper', badge: 'Auto-action', time: '3:42 PM · May 12', children: 'Previous active framework "2024 Strategy v2" moved to archived.' },
    { avatar: { type: 'cooper', name: 'Cooper' }, title: 'Cooper', badge: 'Auto-action', time: '5:10 PM · May 9', children: 'Status changed to Ready to Publish. All 5 approvals collected.' },
    { avatar: { initials: 'LF', type: 'blue' }, title: 'Loid Forger', badge: 'Action', subtitle: 'Field Team Lead', time: '5:10 PM · May 9', children: 'Approved.' },
    { avatar: { initials: 'SC', type: 'dark-pink' }, title: 'Shiny C.', badge: 'Comment', subtitle: 'Planning Engineer', time: '7:10 PM · May 9', children: 'Approved.' },
  ];

  IFS_GALLERY.push({ name: 'Timeline', figma: 'activity-organism (3713:13396) + marker-atom (3713:12836) + connector-atom (3713:12835)', render: () => <>
    <Row label="marker s / m">
      <TimelineMarker size="m" /><TimelineMarker size="s" />
      <TimelineMarker size="m"><IFS.Avatar size="m" initials="JC" type="dark-orange" /></TimelineMarker>
      <TimelineMarker size="s"><IFS.Avatar size="s" type="cooper" name="Cooper" /></TimelineMarker>
    </Row>
    <Row label="connector"><div style={{ display: 'flex', height: 120, gap: 24 }}><div style={{ width: 24, display: 'flex', flexDirection: 'column' }}><TimelineConnector /></div><div style={{ width: 24, display: 'flex', flexDirection: 'column' }}><TimelineConnector type="dash" /></div></div></Row>
    <Row label="organism">
      <Col><TimelineItem avatar={{ type: 'cooper', name: 'Cooper' }} title="Cooper" badge="Auto-action" subtitle="Agent" time="3:42 AM · Feb 5">
        Surfaced T-902 as top contributor to Hydro Feed Line 3 cluster risk. Scaled Inference — 87% evidence strength. Computational Receipt #441-WD generated.
      </TimelineItem></Col>
    </Row>
    <Row label="in use (list)"><Col><Timeline items={ACTIVITY} /></Col><Col><Timeline connector="dash" items={ACTIVITY.slice(0, 3)} /></Col></Row>
  </> });

  IFS_GALLERY.push({ name: 'ApprovalChain', figma: 'approval-chain-timeline (1440:6174) (legacy) — built on activity-organism', render: () => <>
    <Row label="interactive">
      <Col w={432}>
        <ApprovalChain defaultSteps={[
          { state: 'success', name: 'Aubrey Larkin', position: 'Investment Owner', avatar: { initials: 'AL', type: 'purple' }, date: 'May 9', comment: 'Looks good to me.' },
          { state: 'awaiting', name: 'Zoe Kim', position: 'Finance Lead', avatar: { initials: 'ZK', type: 'light-purple' } },
          { state: 'empty', name: 'Ivan Grant', position: 'Portfolio Manager', avatar: { initials: 'IG', type: 'blue' } },
        ]} />
      </Col>
    </Row>
    <Row label="all states">
      <Col w={432}>
        <ApprovalChain steps={[
          { state: 'awaiting', name: 'Name', position: 'Position', avatar: { initials: 'ZK', type: 'light-purple' }, actions: { secondary: 'Secondary', primary: 'Primary' } },
          { state: 'success', name: 'Name', position: 'Position', avatar: { initials: 'ZK', type: 'dark-pink' }, date: 'Date', comment: 'Comment', actions: { secondary: 'Secondary', primary: 'Primary' } },
          { state: 'disabled', name: 'Name', position: 'Position', avatar: { initials: 'ZK', type: 'dark-pink' }, date: 'Date', comment: 'Comment', actions: { secondary: 'Secondary', primary: 'Primary' } },
          { state: 'rejected', name: 'Name', position: 'Position', avatar: { initials: 'ZK', type: 'dark-blue' }, date: 'Date', comment: 'Comment', actions: { secondary: 'Secondary', primary: 'Primary' } },
          { state: 'empty', name: 'Name', position: 'Position', avatar: { initials: 'ZK', type: 'dark-blue' } },
          { state: 'setting', name: 'Name', position: 'Position', avatar: { initials: 'IG', type: 'green' }, roles: ['label', 'Approver', 'Reviewer'], role: 'label',
            brief: 'Q1 Strategy Framework needs regulatory sign-off on 3 points…' },
        ]} onChange={() => {}} />
      </Col>
    </Row>
  </> });

  const VER = { description: 'Adjusted reliability KPI thresholds.', author: { name: 'J. Carter', avatar: { initials: 'UN', type: 'black' } } };
  IFS_GALLERY.push({ name: 'VersionHistory', figma: 'version-history-timeline (2277:5299) (legacy) — built on activity-organism', render: () => <>
    <Row label="collapsed: default / hover / rename">
      <Col w={348}><VersionHistory versions={[{ ...VER, title: 'Version 2', time: '11:15 AM · May 6' }]} /></Col>
      <Col w={348}><VersionHistory versions={[{ ...VER, title: 'Version 3', time: '2:40 PM · May 10', state: 'hover' }]} /></Col>
      <Col w={348}><VersionHistory versions={[{ ...VER, title: 'Version 3', time: '2:40 PM · May 10', state: 'rename' }]} /></Col>
    </Row>
    <Row label="expanded (click marker)">
      <Col w={348}><VersionHistory versions={[
        { ...VER, title: 'Version 3', time: '2:40 PM · May 10', badge: 'Active', defaultExpanded: true, activity: ACTIVITY },
        { ...VER, title: 'Version 2', time: '11:15 AM · May 6', activity: ACTIVITY.slice(3) },
      ]} /></Col>
    </Row>
  </> });

  IFS_GALLERY.push({ name: 'Comment', figma: 'comment-content-card (260:86722)', render: () => <>
    <Row label="default / hover">
      <Col w={363}><Comment name="{Name}" time="{time ago}" avatar={{ initials: 'UN', type: 'yellow' }}>{LOREM}</Comment></Col>
      <Col w={363}><Comment name="{Name}" time="{time ago}" avatar={{ initials: 'UN', type: 'yellow' }} onMenu={() => {}} state="hover">{LOREM}</Comment></Col>
    </Row>
    <Row label="tagged user">
      <Col w={363}><Comment name="{Name}" time="{time ago}" avatar={{ initials: 'UN', type: 'yellow' }} mentions={['Tagged user']}>{'@Tagged user ' + LOREM}</Comment></Col>
      <Col w={363}><Comment name="Aubrey Larkin" time="Just now" you avatar={{ initials: 'AL', type: 'black' }} onMenu={() => {}} state="hover">{'Thanks @Everett, updating the scenario now.'}</Comment></Col>
    </Row>
  </> });

  IFS_GALLERY.push({ name: 'CommentComposer', figma: 'comment-input-atom (2290:15642) + comment-input-molecule (1660:10933)', render: () => <>
    {['text', 'voice', 'cooper'].map(m => (
      <Row key={m} label={m}>
        <Col w={450}><CommentComposer mode={m} onModeChange={() => {}} generating={m === 'cooper'} /></Col>
        <Col w={450}><CommentComposer mode={m} onModeChange={() => {}} defaultValue="Show me transformer" /></Col>
      </Row>
    ))}
    <Row label="multi line">
      <Col w={450}><CommentComposer defaultValue="Show me transformer T-902 on the map, the one near the Riverside substation that had the oil leak last quarter" /></Col>
      <Col w={450}><CommentComposer defaultMode="cooper" defaultValue="Show me transformer T-902 on the map, the one near the Riverside substation that had the oil leak last quarter" /></Col>
    </Row>
    <Row label="molecule / disabled">
      <Col w={361}><CommentComposer avatar={{ initials: 'AL', type: 'black' }} /></Col>
      <Col w={361}><CommentComposer disabled /></Col>
    </Row>
  </> });

  const THREAD = [
    { id: 1, name: 'Kaelin Tristian', time: '7 days ago', avatar: { initials: 'KT', type: 'dark-pink' }, text: LOREM },
    { id: 2, name: 'Everett Botsford', time: '30 min ago', avatar: { initials: 'EB', type: 'yellow' }, text: '@Aubrey Larkin ' + LOREM, mentions: ['Aubrey Larkin'] },
    { id: 3, name: 'Aubrey Larkin', time: 'Just now', avatar: { initials: 'AL', type: 'black' }, text: LOREM, you: true },
  ];
  const ME = { name: 'Aubrey Larkin', avatar: { initials: 'AL', type: 'black' } };
  IFS_GALLERY.push({ name: 'CommentThread', figma: 'comment-popover-organism (260:88500)', render: () => <>
    <Row label="default / cooper / edit">
      <CommentThread defaultComments={THREAD} currentUser={ME} />
      <CommentThread defaultComments={THREAD.slice(0, 2)} currentUser={ME} cooperSuggestion={{ label: 'Let’s do it with Cooper' }} />
      <CommentThread number="#55" defaultComments={THREAD} currentUser={ME} editingId={3} />
    </Row>
    <Row label="resolved"><CommentThread number="#52" defaultComments={THREAD.slice(0, 2)} currentUser={ME} defaultResolved /></Row>
  </> });

  IFS_GALLERY.push({ name: 'UserCard', figma: 'user-card (1440:5059) (legacy)', render: () => <>
    {[undefined, 'hover', 'drag', 'focus'].map(s => (
      <Row key={s || 'default'} label={s || 'default'}>
        <Col w={448}><UserCard name="Barbara Dickinson" position="Planning Engineer" avatar={{ initials: 'BD' }} state={s} onEdit={() => {}} /></Col>
        {s !== 'drag' && <Col w={448}><UserCard type="owner" name="You" position="Planning Engineer" avatar={{ initials: 'BD' }} date="Feb 10, 2026 09:14" state={s} /></Col>}
      </Row>
    ))}
    <Row label="loading / check">
      <Col w={448}><UserCard loading /></Col>
      <Col w={448}><UserCard type="owner" loading date="x" /></Col>
      <Col w={448}><UserCard name="Barbara Dickinson" position="Planning Engineer" avatar={{ initials: 'BD' }} checked badge={null} /></Col>
    </Row>
  </> });

  const ROLES = ['label', 'Editor', 'Viewer'];
  IFS_GALLERY.push({ name: 'Collaborator', figma: 'collaborator (1440:6097) (legacy)', render: () => <>
    {[undefined, 'hover', 'focus'].map(s => (
      <Row key={s || 'default'} label={s || 'default'}>
        <Col w={300}><Collaborator type="joined" name="Name" position="Position" avatar={{ initials: 'IG' }} roles={ROLES} defaultRole="label" state={s} /></Col>
        <Col w={300}><Collaborator type="awaiting" name="Name" position="Position" avatar={{ initials: 'IG' }} roles={ROLES} defaultRole="label" state={s} /></Col>
        <Col w={300}><Collaborator type="recommended" name="Name" position="Position" avatar={{ initials: 'IG' }} onAdd={() => {}} state={s} /></Col>
      </Row>
    ))}
    <Row label="loading / icon-button">
      <Col w={300}><Collaborator loading roles={ROLES} defaultRole="label" /></Col>
      <Col w={300}><Collaborator name="Name" position="Position" avatar={{ initials: 'IG' }} roles={ROLES} defaultRole="label" iconButton={{ icon: 'system-trash-delete', label: 'Remove' }} /></Col>
    </Row>
  </> });

  IFS_GALLERY.push({ name: 'FileCard', figma: 'file-card (1440:5465) (legacy)', render: () => <>
    <Row label="states">
      <Col w={300}>
        <FileCard name="2025 Board Planning Present.pdf" date="Jan 15, 2025" onDownload={() => {}} />
        <FileCard name="2025 Board Planning Present.pdf" date="Jan 15, 2025" onDownload={() => {}} state="hover" />
        <FileCard loading />
        <FileCard name="2025 Board Planning Present.pdf" date="Jan 15, 2025" error onDelete={() => {}} onRetry={() => {}} />
      </Col>
    </Row>
  </> });

  const ITEMS = [{ name: '2025 Strategy v2', meta: 'A. Singh · No date set' }];
  IFS_GALLERY.push({ name: 'VersionCard', figma: 'version-card (2104:4022) (legacy)', render: () => <>
    <Row label="default / hover / loading">
      <Col w={376}><VersionCard items={ITEMS} /></Col>
      <Col w={376}><VersionCard items={ITEMS} state="hover" /></Col>
      <Col w={376}><VersionCard items={ITEMS} loading /></Col>
    </Row>
  </> });
}
