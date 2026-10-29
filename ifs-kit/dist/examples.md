# Component examples

Working usage of each component, from the kit gallery (src/gallery). Printed by entry.sh after the API entry.

### TimelineMarker
(from the Timeline example)
```jsx
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
```

### TimelineConnector
(from the Timeline example)
```jsx
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
```

### TimelineItem
(from the Timeline example)
```jsx
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
```

### Timeline
```jsx
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
```

### ApprovalChain
```jsx
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
```

### VersionEntry
(from the VersionHistory example)
```jsx
  IFS_GALLERY.push({ name: 'VersionHistory', figma: 'version-history-timeline (2277:5299) (legacy) — built on activity-organism', render: () => <>
    <Row label="collapsed: default / hover / rename">
      <Col w={348}><VersionHistory versions={[{ ...VER, title: 'Version 2', time: '11:15 AM · May 6' }]} /></Col>
      <Col w={348}><VersionHistory versions={[{ ...VER, title: 'Version 3', time: '2:40 PM · May 10', state: 'hover' }]} /></Col>
      <Col w={348}><VersionHistory versions={[{ ...VER, title: 'Version 3', time: '2:40 PM · May 10', state: 'rename' }]} /></Col>
    </Row>
    <Row label="⋮ menu slot / open / rename error (duplicate name)">
      <Col w={348}><div role="list" className="ifs-timeline"><VersionEntry {...VER} title="Version 3" badge="Current" time="2:40 PM · May 10" last state="hover"
        onOpen={() => {}} menu={<IFS.ActionMenu label="Version 3 actions" items={[{ label: 'Compare', icon: 'compare' }, { label: 'Rename', icon: 'system-edit-rename' }]} />} /></div></Col>
      <Col w={348}><div role="list" className="ifs-timeline"><VersionEntry {...VER} title="Version 3" time="2:40 PM · May 10" last
        renaming renameValue="Version 2" renameError="A version with this name already exists" onRenameChange={() => {}} /></div></Col>
    </Row>
    <Row label="expanded (click marker)">
      <Col w={348}><VersionHistory versions={[
        { ...VER, title: 'Version 3', time: '2:40 PM · May 10', badge: 'Active', defaultExpanded: true, activity: ACTIVITY },
        { ...VER, title: 'Version 2', time: '11:15 AM · May 6', activity: ACTIVITY.slice(3) },
      ]} /></Col>
    </Row>
  </> });
```

### VersionHistory
```jsx
  IFS_GALLERY.push({ name: 'VersionHistory', figma: 'version-history-timeline (2277:5299) (legacy) — built on activity-organism', render: () => <>
    <Row label="collapsed: default / hover / rename">
      <Col w={348}><VersionHistory versions={[{ ...VER, title: 'Version 2', time: '11:15 AM · May 6' }]} /></Col>
      <Col w={348}><VersionHistory versions={[{ ...VER, title: 'Version 3', time: '2:40 PM · May 10', state: 'hover' }]} /></Col>
      <Col w={348}><VersionHistory versions={[{ ...VER, title: 'Version 3', time: '2:40 PM · May 10', state: 'rename' }]} /></Col>
    </Row>
    <Row label="⋮ menu slot / open / rename error (duplicate name)">
      <Col w={348}><div role="list" className="ifs-timeline"><VersionEntry {...VER} title="Version 3" badge="Current" time="2:40 PM · May 10" last state="hover"
        onOpen={() => {}} menu={<IFS.ActionMenu label="Version 3 actions" items={[{ label: 'Compare', icon: 'compare' }, { label: 'Rename', icon: 'system-edit-rename' }]} />} /></div></Col>
      <Col w={348}><div role="list" className="ifs-timeline"><VersionEntry {...VER} title="Version 3" time="2:40 PM · May 10" last
        renaming renameValue="Version 2" renameError="A version with this name already exists" onRenameChange={() => {}} /></div></Col>
    </Row>
    <Row label="expanded (click marker)">
      <Col w={348}><VersionHistory versions={[
        { ...VER, title: 'Version 3', time: '2:40 PM · May 10', badge: 'Active', defaultExpanded: true, activity: ACTIVITY },
        { ...VER, title: 'Version 2', time: '11:15 AM · May 6', activity: ACTIVITY.slice(3) },
      ]} /></Col>
    </Row>
  </> });
```

### Comment
```jsx
  IFS_GALLERY.push({ name: 'Comment', figma: 'comment-content-card (260:86722)', render: () => <>
    <Row label="default / hover">
      <Col w={363}><Comment name="{Name}" time="{time ago}" avatar={{ initials: 'UN', type: 'yellow' }}>{LOREM}</Comment></Col>
      <Col w={363}><Comment name="{Name}" time="{time ago}" avatar={{ initials: 'UN', type: 'yellow' }} onMenu={() => {}} state="hover">{LOREM}</Comment></Col>
    </Row>
    <Row label="tagged user">
      <Col w={363}><Comment name="{Name}" time="{time ago}" avatar={{ initials: 'UN', type: 'yellow' }} mentions={['Tagged user']}>{'@Tagged user ' + LOREM}</Comment></Col>
      <Col w={363}><Comment name="Aubrey Larkin" time="Just now" you avatar={{ initials: 'AL', type: 'black' }} state="hover"
        menuItems={[{ label: 'Edit', icon: 'system-edit-rename' }, { label: 'Delete', icon: 'system-trash-delete' }]}>{'Thanks @Everett, updating the scenario now.'}</Comment></Col>
    </Row>
  </> });
```

### CommentComposer
```jsx
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
    <Row label="@ mention picker (type @)">
      <Col w={361}><CommentComposer avatar={{ initials: 'AL', type: 'black' }} defaultValue="Thanks @"
        mentionables={[{ name: 'Lara Green', role: 'Planning Engineer', avatar: { type: 'green' } }, { name: 'Maria Chen', role: 'Finance Lead', avatar: { type: 'purple' } }]} /></Col>
    </Row>
  </> });
```

### CommentThread
```jsx
  IFS_GALLERY.push({ name: 'CommentThread', figma: 'comment-popover-organism (260:88500)', render: () => <>
    <Row label="default / cooper / edit">
      <CommentThread defaultComments={THREAD} currentUser={ME} />
      <CommentThread defaultComments={THREAD.slice(0, 2)} currentUser={ME} cooperSuggestion={{ label: 'Let’s do it with Cooper' }} />
      <CommentThread number="#55" defaultComments={THREAD} currentUser={ME} editingId={3} />
    </Row>
    <Row label="resolved (⋯ = Unresolve / Copy link)"><CommentThread number="#52" defaultComments={THREAD} currentUser={ME} defaultResolved /></Row>
  </> });
```

### UserCard
```jsx
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
```

### Collaborator
```jsx
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
```

### FileCard
```jsx
  IFS_GALLERY.push({ name: 'FileCard', figma: 'file-card (1440:5465) (legacy)', render: () => <>
    <Row label="states / long name (middle truncation) + actions slot">
      <Col w={300}>
        <FileCard name="2025 Board Planning Present.pdf" date="Jan 15, 2025" onDownload={() => {}} />
        <FileCard name="2025 Board Planning Present.pdf" date="Jan 15, 2025" onDownload={() => {}} state="hover" />
        <FileCard loading />
        <FileCard name="2025 Board Planning Present.pdf" date="Jan 15, 2025" error onDelete={() => {}} onRetry={() => {}} />
      </Col>
      <Col w={300}>
        <FileCard name="2025 Board Planning Presentation — Strategic Business Case.pdf" date="Jan 15, 2025" onDownload={() => {}} />
        <FileCard name="2025 Board Planning Presentation — Strategic Business Case.pdf" date="Jan 15, 2025" active
          actions={<IFS.ActionMenu label="More actions" items={[{ label: 'Download', icon: 'system-download' }, { label: 'Remove', icon: 'system-trash-delete', destructive: true }]} />} />
      </Col>
    </Row>
  </> });
```

### VersionCard
```jsx
  IFS_GALLERY.push({ name: 'VersionCard', figma: 'version-card (2104:4022) (legacy)', render: () => <>
    <Row label="default / hover / loading">
      <Col w={376}><VersionCard items={ITEMS} /></Col>
      <Col w={376}><VersionCard items={ITEMS} state="hover" /></Col>
      <Col w={376}><VersionCard items={ITEMS} loading /></Col>
    </Row>
  </> });
```

### Button
```jsx
  IFS_GALLERY.push({ name: 'Button', figma: 'button (65:3211)', render: () => <>
    {['primary', 'secondary', 'tertiary', 'ghost', 'cooper'].map(t => (
      <Row key={t} label={t}>
        {states.map(s => <Button key={s || 'default'} type={t} state={s} iconLeft="system-star-favourite" iconRight="system-heart">{s || 'Default'}</Button>)}
        <Button type={t} disabled iconLeft="system-star-favourite">Disabled</Button>
      </Row>
    ))}
    <Row label="sizes l / m / s">{['l', 'm', 's'].map(z => <Button key={z} type="primary" size={z} iconLeft="system-star-favourite" iconRight="system-heart">Label</Button>)}</Row>
  </> });
```

### IconButton
```jsx
  IFS_GALLERY.push({ name: 'IconButton', figma: 'icon-button (71:4250)', render: () => <>
    {['ghost', 'primary', 'secondary', 'tertiary'].map(t => (
      <Row key={t} label={t}>
        {states.map(s => <IconButton key={s || 'default'} type={t} state={s} icon="system-settings" label="Settings" />)}
        <IconButton type={t} disabled icon="system-settings" label="Settings" />
        <IconButton type={t} shape="circle" icon="system-plus" label="Add" />
      </Row>
    ))}
    <Row label="sizes l / m / s">{['l', 'm', 's'].map(z => <IconButton key={z} type="secondary" size={z} icon="system-settings" label="Settings" />)}</Row>
  </> });
```

### ValueMapButton
```jsx
  IFS_GALLERY.push({ name: 'ValueMapButton', figma: 'value-map-button (2590:20612)', render: () => <>
    <Row label="Type / Selected">
      <ValueMapButton type="input" />
      <ValueMapButton type="shape" defaultSelected="fit" />
      <ValueMapButton type="shape" defaultSelected="expand" />
      <ValueMapButton type="shape" defaultSelected="collapse" />
    </Row>
  </> });
```

### MapToolbar
```jsx
  IFS_GALLERY.push({ name: 'MapToolbar', figma: 'explore-map-button (7404:34866) + explore-map-button-base (7404:34867)', render: () => <>
    <Row label="default" top><MapToolbar /><MapToolbar defaultTool="area" /></Row>
  </> });
```

### NodeHoverActions
```jsx
  IFS_GALLERY.push({ name: 'NodeHoverActions', figma: 'node-button (1851:191153)', render: () => <>
    <Row label="Type" top>{['expand', 'collapse', 'isolate-path', 'submodel'].map(t => <NodeHoverActions key={t} type={t} />)}</Row>
  </> });
```

### AddNodeButton
```jsx
  IFS_GALLERY.push({ name: 'AddNodeButton', figma: 'add-node-button (2879:7311)', render: () => <>
    <Row label="State" top><Col>
      <AddNodeButton />
      <AddNodeButton state="hover" />
      <AddNodeButton state="pressed" />
      <AddNodeButton state="typing" />
      <AddNodeButton disabled />
    </Col></Row>
  </> });
```

### NodeCard
```jsx
  IFS_GALLERY.push({ name: 'NodeCard', figma: 'node-card (1440:4401)', render: () => <div style={{ overflowX: 'auto', padding: 6 }}>
    {STATES.map(s => <Row key={s || 'default'} label={s || 'default'} top nowrap>{TYPES.map(t => card(t, s))}</Row>)}
    <Row label="loading"><NodeCard type="skeleton" /></Row>
    <Row label="counter / interactive"><NodeCard type="value-model" badge="Model" title="Click to select" caption="drag me" counter={7} draggable />
      <NodeCard type="subnode" title="Checkbox" caption="toggle" checkbox defaultChecked={false} /></Row>
  </div> });
```

### SidebarNodeCard
```jsx
  IFS_GALLERY.push({ name: 'SidebarNodeCard', figma: 'sidebar-node-card (2667:6608)', render: () => <>
    <Row label="State" top><Col>
      {[undefined, 'hover', 'drag', 'focus', 'cooper-hover', 'cooper-drag'].map(s => <SidebarNodeCard key={s || 'd'} state={s} description="{description}" />)}
    </Col></Row>
  </> });
```

### MapPin
```jsx
  IFS_GALLERY.push({ name: 'MapPin', figma: 'map-pin-teardrop (43:2020)', render: () => <>
    {[undefined, 'out-of-hover', 'selected', 'opened'].map(s => <Row key={s || 'd'} label={s || 'default'}>
      {['neutral', 'error', 'warning'].map(st => <React.Fragment key={st}><MapPin status={st} state={s} /><MapPin status={st} state={s} icon="asset-structure" /></React.Fragment>)}
    </Row>)}
  </> });
```

### CanvasBackground
```jsx
  IFS_GALLERY.push({ name: 'CanvasBackground', figma: 'canvas-background (1395:196712)', render: () => <>
    <Row label="Default" top><div style={{ width: 480, height: 240 }}><CanvasBackground /></div></Row>
  </> });
```

### CanvasConnector
(from the TimelineChart example)
```jsx
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
  // … cut; full example in src/gallery/canvas.jsx
```

### DropZone
```jsx
  IFS_GALLERY.push({ name: 'DropZone', figma: 'move-and-drop-background (4509:30446)', render: () => <>
    <Row label="text off / on"><DropZone style={{ width: 320, height: 160 }} /><DropZone text style={{ width: 320, height: 160 }} onDrop={d => console.log('dropped', d)} /></Row>
    <Row label="drag into it"><SidebarNodeCard title="Drag me" description="onto the drop zone" /></Row>
  </> });
```

### SankeyNode
```jsx
  IFS_GALLERY.push({ name: 'SankeyNode', figma: 'sankey-atom (1853:12325) + sankey-header (2698:64494)', render: () => <>
    {[undefined, 'hover'].map(s => <Row key={s || 'd'} label={s || 'default'}>
      <SankeyNode label="WDRM v4" from="$1.24B" to="$1.27B" change="4.5%" state={s} />
      <SankeyNode type="measure" label="Measure" from="$1.24B" to="$1.27B" change="4.5%" state={s} />
    </Row>)}
    <Row label="disabled"><SankeyNode label="WDRM v4" from="$1.24B" to="$1.27B" disabled /><SankeyNode type="measure" label="Measure" from="$1.24B" to="$1.27B" disabled /></Row>
    <Row label="header"><SankeyHeader abbr="MSR." fromLabel="Q1 2025" toLabel="Q4 2026" from="29" to="24" /></Row>
  </> });
```

### SankeyHeader
(from the SankeyNode example)
```jsx
  IFS_GALLERY.push({ name: 'SankeyNode', figma: 'sankey-atom (1853:12325) + sankey-header (2698:64494)', render: () => <>
    {[undefined, 'hover'].map(s => <Row key={s || 'd'} label={s || 'default'}>
      <SankeyNode label="WDRM v4" from="$1.24B" to="$1.27B" change="4.5%" state={s} />
      <SankeyNode type="measure" label="Measure" from="$1.24B" to="$1.27B" change="4.5%" state={s} />
    </Row>)}
    <Row label="disabled"><SankeyNode label="WDRM v4" from="$1.24B" to="$1.27B" disabled /><SankeyNode type="measure" label="Measure" from="$1.24B" to="$1.27B" disabled /></Row>
    <Row label="header"><SankeyHeader abbr="MSR." fromLabel="Q1 2025" toLabel="Q4 2026" from="29" to="24" /></Row>
  </> });
```

### Sankey
```jsx
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
```

### TimelineChart
```jsx
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
  // … cut; full example in src/gallery/canvas.jsx
```

### DataVizBar
```jsx
  IFS_GALLERY.push({ name: 'DataVizBar', figma: 'bar-atom (4457:32996)', render: () => <>
    {['default', 'hover', 'out-of-focus', 'background', 'loading'].map(s => <Row key={s} label={s}><DataVizBar state={s} style={{ width: 238 }}>{'{info}'}</DataVizBar></Row>)}
    <Row label="colours">{['muted-purple', 'teal', 'steel-blue', 'deep-green'].map(c => <DataVizBar key={c} color={c} style={{ width: 120 }}>$4.2M</DataVizBar>)}</Row>
  </> });
```

### DataVizGroupedBar
```jsx
  IFS_GALLERY.push({ name: 'DataVizGroupedBar', figma: 'grouped-bar-molecule (4457:37362)', render: () => <>
    <Row label="horizontal"><DataVizGroupedBar type="horizontal" values={[1, 1, 1, 2.7]} style={{ width: 238, height: 192 }} /></Row>
    <Row label="vertical"><DataVizGroupedBar type="vertical" values={[1, 1, 1, 1]} style={{ width: 238, height: 192 }} /></Row>
    <Row label="horizontal · progress"><DataVizGroupedBar type="horizontal" progress value={64} max={100} style={{ width: 238, height: 36 }} /></Row>
    <Row label="vertical · progress"><DataVizGroupedBar type="vertical" progress value={64} max={100} style={{ width: 36, height: 238 }} /></Row>
    <Row label="with values"><DataVizGroupedBar type="vertical" showValues values={[42, 28, 18, 12]} style={{ width: 360, height: 40 }} /></Row>
  </> });
```

### DataVizLine
```jsx
  IFS_GALLERY.push({ name: 'DataVizLine', figma: 'line-atom (4440:32650)', render: () => <>
    <Row label="solid"><div style={{ width: 212 }}><DataVizLine /></div></Row>
    <Row label="dashed"><div style={{ width: 212 }}><DataVizLine dashed /></div></Row>
    <Row label="vertical"><div style={{ height: 60, display: 'flex', gap: 24 }}><DataVizLine orientation="vertical" /><DataVizLine orientation="vertical" dashed /></div></Row>
  </> });
```

### DataVizIndicator
```jsx
  IFS_GALLERY.push({ name: 'DataVizIndicator', figma: 'indicator-atom (4440:32643)', render: () => <>
    <Row label="types">{['default', 'selected', 'intended-target'].map(t => <DataVizIndicator key={t} type={t} />)}</Row>
    <Row label="colours">{['muted-purple', 'teal', 'rose', 'steel-blue'].map(c => <DataVizIndicator key={c} color={c} />)}</Row>
  </> });
```

### ValueLabel
```jsx
  IFS_GALLERY.push({ name: 'ValueLabel', figma: 'value-label-atom (4440:32611)', render: () => <>
    <Row label="states">{['primary', 'secondary', 'tertiary', 'empty', 'loading'].map(s => <ValueLabel key={s} state={s}>{'{info}'}</ValueLabel>)}</Row>
  </> });
```

### LegendSwatch
```jsx
  IFS_GALLERY.push({ name: 'LegendSwatch', figma: 'legend-swatch-atom (4440:32628)', render: () => <>
    <Row label="states">{['default', 'hover', 'out-of-hover'].map(s => <LegendSwatch key={s} state={s} label="Title" value="Value" />)}
      <LegendSwatch state="intended-target" label="Intended target" /></Row>
    <Row label="no value">{['muted-purple', 'teal', 'rose'].map(c => <LegendSwatch key={c} color={c} label={c} />)}</Row>
  </> });
```

### DataVizHeader
```jsx
  IFS_GALLERY.push({ name: 'DataVizHeader', figma: 'data-viz-header-molecule (2154:2068)', render: () => {
    const h = { onEdit: () => {}, onDelete: () => {}, onMore: () => {} };
    return <>{[undefined, 'hover'].map(s => <React.Fragment key={s || 'd'}>
      <Row label={`${s || 'default'} · none`}><div style={{ width: 532 }}><DataVizHeader state={s} title="Create a chart or diagram" {...h} /></div></Row>
      <Row label={`${s || 'default'} · segmented`}><div style={{ width: 532 }}><DataVizHeader state={s} title="Create a chart or diagram" segments={['label', 'label 2']} {...h} /></div></Row>
      <Row label={`${s || 'default'} · button`}><div style={{ width: 532 }}><DataVizHeader state={s} title="Create a chart or diagram" button={{ label: 'Show all' }} {...h} /></div></Row>
    </React.Fragment>)}</>;
  } });
```

### DataVizCard
```jsx
  IFS_GALLERY.push({ name: 'DataVizCard', figma: 'data-viz-card-organism (4457:33030)', render: () => <Grid w={582}>
    {[undefined, 'hover', 'drag', 'cooper'].map(s => (
      <DataVizCard key={s || 'd'} state={s} title="Create a chart or diagram" style={{ width: 582, margin: 6 }}>
        <DataVizGroupedBar type="vertical" showValues values={[42, 28, 18, 12]} style={{ height: 40 }} />
        <div style={{ height: 180 }} />
      </DataVizCard>
    ))}
  </Grid> });
```

### DataVizTooltip
```jsx
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
```

### ColumnChart
```jsx
  IFS_GALLERY.push({ name: 'ColumnChart', figma: 'chart-column (9862:12468)', render: states(ColumnChart, { title: 'Spend by quarter', data: spend, valueLabel: 'Actual spend', format: usdAxis }, 3) });

  const outage = [{ label: 'North', value: 142, reference: 140 }, { label: 'Coastal', value: 118, reference: 124, delta: { text: '−6% vs last year', direction: 'down' }, details: [{ label: 'Last year', value: '126 min' }, { label: 'Feeders affected', value: '14' }, { label: 'Peer median', value: '124 min' }] },
    { label: 'Central', value: 96, reference: 93 }, { label: 'Mountain', value: 88, reference: 92 }, { label: 'Urban', value: 71, reference: 68 }, { label: 'Delta', value: 54, reference: 57 }];
```

### HistogramChart
```jsx
  IFS_GALLERY.push({ name: 'HistogramChart', figma: 'chart-histogram (9864:14012)', render: states(HistogramChart, { title: 'Project duration distribution', values: durations, binWidth: 10,
    binFormat: a => `${a}`, valueLabel: 'Projects' }, 5) });
```

### BarChart
```jsx
  IFS_GALLERY.push({ name: 'BarChart', figma: 'chart-bar (9862:12961)', render: states(BarChart, { title: 'Outage minutes by region', data: outage, valueLabel: 'Outage minutes', sort: true }, 1) });

  const bva = [{ label: 'FY23', budget: 11e6, actual: 10.2e6, reference: 11.8e6 }, { label: 'FY24', budget: 12.5e6, actual: 13.4e6, reference: 11.8e6 },
    { label: 'FY25', budget: 14e6, actual: 15.2e6, reference: 15e6 }, { label: 'FY26', budget: 15.4e6, actual: 14.1e6, reference: 14.7e6 }];
```

### GroupedColumnChart
```jsx
  IFS_GALLERY.push({ name: 'GroupedColumnChart', figma: 'chart-grouped-column (9862:13445)', render: states(GroupedColumnChart, { title: 'Budget vs actual by year', data: bva, format: usdAxis,
    series: [{ key: 'budget', label: 'Budget' }, { key: 'actual', label: 'Actual' }] }, 2) });

  const cat = [{ label: 'Q1', capital: 8e6, maintenance: 5e6, emergency: 2e6 }, { label: 'Q2', capital: 9e6, maintenance: 5.5e6, emergency: 2.4e6 },
    { label: 'Q3', capital: 10e6, maintenance: 6e6, emergency: 2e6 }, { label: 'Q4', capital: 11.2e6, maintenance: 7.1e6, emergency: 3.1e6, delta: { text: '+7% vs Q3', direction: 'down' } },
    { label: 'Q1 next', capital: 10.4e6, maintenance: 6.6e6, emergency: 2.2e6 }];
```

### StackedColumnChart
```jsx
  IFS_GALLERY.push({ name: 'StackedColumnChart', figma: 'chart-stacked-column (9863:11139)', render: states(StackedColumnChart, { title: 'Spend by category', data: cat, format: usdAxis,
    series: [{ key: 'capital', label: 'Capital' }, { key: 'maintenance', label: 'Maintenance' }, { key: 'emergency', label: 'Emergency' }] }, 3) });

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const ty = [128, 121, 134, 118, 112, 125, 108, 104, 117, 99, 96, 102], ly = [135, 130, 127, 131, 126, 129, 122, 125, 119, 121, 114, 118], pa = [124, 122, 123, 119, 116, 118, 114, 112, 113, 108, 106, 107];
  const trend = months.map((m, i) => ({ label: m, ty: ty[i], ly: ly[i], avg: pa[i], lo: pa[i] - 6, hi: pa[i] + 6 }));
```

### LineChart
```jsx
  IFS_GALLERY.push({ name: 'LineChart', figma: 'chart-line (9863:11650)', render: states(LineChart, { title: 'Outage minutes trend', data: trend,
    series: [{ key: 'ty', label: 'This year' }, { key: 'ly', label: 'Last year' }], band: { low: 'lo', high: 'hi', mid: 'avg', label: 'Peer avg ±1σ' } }, 7) });

  const risk = months.map((m, i) => ({ label: m, risk: [5.8, 6.2, 6.9, 6.4, 7.3, 7.9, 7.5, 8.2, 8.8, 8.4, 9.1, 8.4][i] * 1e6, peer: (5.2 + i * 0.17) * 1e6 }));
```

### AreaChart
```jsx
  IFS_GALLERY.push({ name: 'AreaChart', figma: 'chart-area (9863:12167)', render: states(AreaChart, { title: 'Retained risk over time', data: risk, format: usdAxis,
    series: [{ key: 'risk', label: 'Retained risk' }], referenceKey: 'peer' }, 9) });
```

### PieChart
```jsx
  IFS_GALLERY.push({ name: 'PieChart', figma: 'chart-pie (9866:12309)', render: states(PieChart, { title: 'Spend share by asset type', format: usd, valueLabel: 'Spend',
    data: [{ label: 'Transformers', value: 48.6e6 }, { label: 'Lines', value: 34.6e6, delta: { text: '+2 pts vs FY25', direction: 'down' } }, { label: 'Substations', value: 26.9e6 }, { label: 'Other', value: 17.9e6, color: 'muted-purple', opacity: 0.5 }] }, 1) });
```

### DonutChart
```jsx
  IFS_GALLERY.push({ name: 'DonutChart', figma: 'chart-donut (9866:12774)', render: states(DonutChart, { title: 'Work orders by status', centerValue: '412', centerLabel: 'work orders', valueLabel: 'Work orders',
    data: [{ label: 'Done', value: 223, color: 'teal' }, { label: 'In progress', value: 103, color: 'muted-purple' }, { label: 'Open', value: 62, color: 'rose' }, { label: 'Cancelled', value: 24, color: 'muted-purple', opacity: 0.5 }] }, 1) });

  const pts = [[20, 12], [23, 13.5], [26, 12.2], [43, 16], [53, 16.5], [75, 12.3], [75, 15.8], [92, 18.3], [95, 21.2], [120, 23.4], [121, 24.8], [150, 24.4], [160, 25], [190, 29.4]]
    .map(([x, y], i) => ({ label: `Completed project ${i + 1}`, x, y: y * 1e6, series: 'done' }))
    .concat([[57, 25.5], [70, 26.2], [71, 23.3], [78, 22.2], [90, 23.6], [100, 26.7], [102, 32.1], [143, 33], [165, 37], [188, 42.4]]
      .map(([x, y], i) => ({ label: i === 6 ? 'Feeder 14 undergrounding' : `Project ${i + 1}`, x, y: y * 1e6, series: 'wip', size: 4 + (i % 4) * 3 })));
```

### ScatterChart
```jsx
  IFS_GALLERY.push({ name: 'ScatterChart', figma: 'chart-scatter (9866:13245)', render: states(ScatterChart, { title: 'Cost vs duration by project', data: pts, format: usdAxis, xUnit: 'days', xLabel: 'Duration', yLabel: 'Cost',
    series: [{ key: 'done', label: 'Completed', color: 'teal' }, { key: 'wip', label: 'In progress', color: 'muted-purple' }], xReference: 87, yReference: 21e6 }, 20) });
```

### BubbleChart
```jsx
  IFS_GALLERY.push({ name: 'BubbleChart', figma: 'chart-bubble (9866:13788)', render: () => <Grid>
    <BubbleChart title="Cost vs duration, sized by customers" data={pts.filter(d => d.series === 'wip')} format={usdAxis} xUnit="days" xLabel="Duration" yLabel="Cost" sizeLabel="Customers (k)" />
  </Grid> });

  /* ---------------- small molecules ---------------- */
```

### GaugeChart
```jsx
  IFS_GALLERY.push({ name: 'GaugeChart', figma: 'chart-gauge (9867:618)', render: states(GaugeChart, { title: 'Plan delivery', value: 72, target: 85, reference: 64,
    label: 'of planned work delivered', valueLabel: 'Delivered', delta: { text: '−13 pts vs target', direction: 'down' } }, true) });
```

### WaterfallChart
```jsx
  IFS_GALLERY.push({ name: 'WaterfallChart', figma: 'chart-waterfall (9866:16075)', render: states(WaterfallChart, { title: 'Budget bridge', format: v => `$${Math.round(v / 1e6)}M`,
    data: [{ label: 'Plan', value: 120e6, total: true }, { label: 'Scope', value: 30e6 }, { label: 'Savings', value: -18e6 }, { label: 'Delay', value: 22e6 }, { label: 'Re-sequencing', value: -12e6 }, { label: 'Forecast', total: true }] }, 3) });
```

### FunnelChart
```jsx
  IFS_GALLERY.push({ name: 'FunnelChart', figma: 'chart-funnel (9867:1065)', render: states(FunnelChart, { title: 'Project pipeline by stage',
    data: [{ label: 'Identified', value: 1240 }, { label: 'Scoped', value: 880, reference: 900 }, { label: 'Approved', value: 540, reference: 585 }, { label: 'In delivery', value: 310, reference: 360 }, { label: 'Completed', value: 190, reference: 230 }] }, 2) });

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 12 }, (_, i) => `${i * 2}h`);
  const heat = days.map((d, r) => hours.map((h, c) => Math.round(2 + 7 * Math.exp(-((c - 8.5) ** 2) / 6) + ((r * 7 + c * 3) % 3) - (r > 4 ? 1 : 0))));
```

### HeatmapChart
```jsx
  IFS_GALLERY.push({ name: 'HeatmapChart', figma: 'chart-heatmap (9866:14280)', render: states(HeatmapChart, { title: 'Outages by weekday and hour', rows: days, columns: hours, values: heat,
    lowLabel: 'Fewer outages', highLabel: 'More outages', valueLabel: 'outages', columnLabelEvery: 2 }, [3, 8]) });

  const durations = Array.from({ length: 160 }, (_, i) => Math.round(30 + 90 * Math.abs(Math.sin(i * 12.9898) * 0.5 + Math.sin(i * 4.1) * 0.5)));
```

### ProgressRing
```jsx
  IFS_GALLERY.push({ name: 'ProgressRing', figma: 'progress-ring-molecule (4619:18187)', render: () => <>
    <Row label="%">{[100, 80, 60, 50, 40, 20, 10, 0].map(v => <ProgressRing key={v} value={v} />)}</Row>
    <Row label="size 48"><ProgressRing value={72} size={48} /></Row>
  </> });
```

### EvidenceStrength
```jsx
  IFS_GALLERY.push({ name: 'EvidenceStrength', figma: 'evidence-strength-bar-molecule (67:6634)', render: () => <>
    {[60, 87, 96].map(v => <Row key={v} label={v < 70 ? 'reject' : v < 90 ? 'review' : 'approve'}><div style={{ width: 364 }}><EvidenceStrength value={v} /></div></Row>)}
  </> });
```

### Badge
```jsx
  IFS_GALLERY.push({ name: 'Badge', figma: 'badge-atom (83:52162)', render: () => <>
    {['white', 'black', 'red', 'green', 'orange'].map(c => (
      <Row key={c} label={c}>{['l', 'm', 's'].map(z => <Badge key={z} color={c} size={z} iconLeft="system-star-favourite">{'{label}'}</Badge>)}</Row>
    ))}
    <Row label="info">{['l', 'm', 's'].map(z => <Badge key={z} color="info" size={z} iconLeft="system-access-point">{'{label}'}</Badge>)}</Row>
    <Row label="black borderless">{['l', 'm', 's'].map(z => <Badge key={z} color="black" borderless size={z} iconLeft="system-star-favourite">{'{label}'}</Badge>)}</Row>
    <Row label="false"><Badge color="false" iconLeft="system-star-favourite">{'{label}'}</Badge></Row>
    <Row label="loading">{['l', 'm', 's'].map(z => <Badge key={z} color="loading" size={z} />)}</Row>
    <Row label="extras">
      <Badge indicator="blue">Indicator</Badge>
      <Badge avatar={{ initials: 'TN', type: 'blue' }}>Avatar</Badge>
      <Badge iconRight="system-heart">Icon right</Badge>
    </Row>
  </> });
```

### StatusIndicator
```jsx
  IFS_GALLERY.push({ name: 'StatusIndicator', figma: 'status-indicator-atom (789:39211)', render: () => <>
    {[false, true].map(s => (
      <Row key={String(s)} label={s ? 'stroke' : 'no stroke'}>
        {['default', 'error', 'success', 'warning', 'cooper', 'blue'].map(st => <StatusIndicator key={st} state={st} stroke={s} />)}
      </Row>
    ))}
  </> });
```

### Avatar
```jsx
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
```

### RiskStatus
```jsx
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
```

### ReadinessStatus
```jsx
  IFS_GALLERY.push({ name: 'ReadinessStatus', figma: 'status-readiness-molecule (1440:5273)', render: () => <>
    {['done', 'warning', 'error', 'in-progress', 'active', 'loading'].map(t => (
      <Row key={t} label={t} style={{ gap: 20 }}>
        <div style={{ width: 164 }}><ReadinessStatus type={t} right="Text">Text</ReadinessStatus></div>
        {t !== 'done' && <div style={{ width: 164 }}><ReadinessStatus type={t} indicators={[{ type: 'red', label: 'text' }, { type: 'orange', label: 'text' }]}>Text</ReadinessStatus></div>}
      </Row>
    ))}
  </> });
```

### Indicator
```jsx
  IFS_GALLERY.push({ name: 'Indicator', figma: 'indicator-molecule (1074:180251)', render: () => <>
    {['s', 'xs'].map(z => (
      <Row key={z} label={z} style={{ gap: 24 }}>
        {['orange', 'green', 'red', 'blue', 'purple', 'gray', 'cooper', 'archive', 'loading'].map(t => <Indicator key={t} size={z} type={t}>text</Indicator>)}
      </Row>
    ))}
    <Row label="button right"><Indicator type="blue" buttonRight="system-close" buttonLabel="Remove">text</Indicator></Row>
  </> });
```

### StatCard
```jsx
  IFS_GALLERY.push({ name: 'StatCard', figma: 'stat-card-organism (3643:35055)', render: () => <>
    <Row label="m / s">
      <StatCard style={{ width: 286 }} title="Title" value="Value" description="Description" trend="3 %" />
      <StatCard style={{ width: 286 }} size="s" title="Title" value="Value" description="Description" trend="3 %" />
    </Row>
    <Row label="loading">
      <StatCard style={{ width: 286 }} loading trend="3 %" />
      <StatCard style={{ width: 286 }} size="s" loading trend="3 %" />
    </Row>
    <Row label="description inline">
      <StatCard style={{ width: 286 }} descriptionPosition="inline" title="Title" value="Value" description="Description" trend="3 %" />
      <StatCard style={{ width: 286 }} descriptionPosition="inline" size="s" title="Title" value="Value" description="Description" trend="3 %" />
    </Row>
    <Row label="badge / down">
      <StatCard style={{ width: 286 }} title="Budget" value="$4.2M" description="of $5M" trend="12 %" trendDirection="down" badge={{ children: 'Over' }} />
    </Row>
  </> });
```

### ContentCard
```jsx
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
    <Row label="icon left / slots only" style={{ alignItems: 'flex-start' }}>
      <ContentCard style={{ width: 332 }} iconLeft="arrow-caret-right-filled" title="{card-title}" description="{description}" />
      <ContentCard style={{ width: 332 }} size="s" iconLeft="arrow-caret-right-filled" title="{card-title}" description="{description}" />
      <ContentCard style={{ width: 332 }} top={<span className="t-body-m-regular" style={{ color: 'var(--text-secondary)' }}>Top slot only</span>}
        bottom={<IFS.ProgressBar value={60} label="Progress" />} />
    </Row>
    <CardDemo />
  </> });
```

### Table
```jsx
  IFS_GALLERY.push({ name: 'Table', figma: 'table-card-organism (4835:4031), table-header (1440:5904), table-cell (1440:5941), group-row (4833:19072), content-row (4835:3501)', render: () => <>
    <TableDemo />
    <div style={{ height: 24 }} />
    <TableDemo grouped />
    <div style={{ height: 24 }} />
    <Table columns={[
      { key: 'a', title: 'Check', type: 'check' }, { key: 'b', title: 'User description', type: 'user-description', width: '1.5fr' },
      { key: 'c', title: 'Counter', render: r => <IFS.Icon name="system-more" size={16} /> }]}
      rows={[{ id: 1, a: 'Text', b: { name: 'Tom Nguyen', description: 'Neighbouring Asset Manager', type: 'blue' } }]} />
    <div style={{ height: 24 }} />
    <Table columns={columns.slice(0, 3)} rows={rows.slice(0, 3)} rowHeight={60}
      rowProps={r => (r.id === 2 ? { className: 'g-dim', style: { opacity: 0.4 }, 'data-row-id': r.id } : { 'data-row-id': r.id })} />
  </> });
```

### NotificationCard
```jsx
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
```

### ProgressBar
```jsx
  IFS_GALLERY.push({ name: 'ProgressBar', figma: 'progress-bar-molecule (1674:1902)', render: () => <>
    {[100, 80, 60, 50, 40, 20, 10, 0].map(v => <Row key={v} label={`${v}%`}><div style={{ width: 251 }}><ProgressBar value={v} /></div></Row>)}
  </> });
```

### Hotkey
```jsx
  IFS_GALLERY.push({ name: 'Hotkey', figma: 'hotkey-atom (67:6150)', render: () => <Row label="default"><Hotkey /><Hotkey>⌘K</Hotkey><Hotkey>⇧⌘P</Hotkey></Row> });
```

### Counter
```jsx
  IFS_GALLERY.push({ name: 'Counter', figma: 'counter-atom (88:24147)', render: () => <>
    <Row label="S (18)"><Counter>3</Counter><Counter>128</Counter><Counter indicator>3</Counter></Row>
    <Row label="M (24)"><Counter size="m">3</Counter><Counter size="m">128</Counter><Counter size="m" indicator>3</Counter></Row>
  </> });
```

### ScrollArea
```jsx
  IFS_GALLERY.push({ name: 'ScrollArea', figma: 'scroll-bar-atom (83:57650)', render: () => <>
    <Row label="atom top / center / bottom">{['top', 'center', 'bottom'].map(l => <ScrollBar key={l} location={l} height={200} />)}</Row>
    <Row label="ScrollArea"><ScrollArea height={160} label="Example list" style={{ width: 240 }}>
      {Array.from({ length: 20 }, (_, i) => <div key={i} className="t-body-m-regular" style={{ padding: '6px 8px' }}>Row {i + 1}</div>)}
    </ScrollArea></Row>
  </> });
```

### ScrollBar
(from the ScrollArea example)
```jsx
  IFS_GALLERY.push({ name: 'ScrollArea', figma: 'scroll-bar-atom (83:57650)', render: () => <>
    <Row label="atom top / center / bottom">{['top', 'center', 'bottom'].map(l => <ScrollBar key={l} location={l} height={200} />)}</Row>
    <Row label="ScrollArea"><ScrollArea height={160} label="Example list" style={{ width: 240 }}>
      {Array.from({ length: 20 }, (_, i) => <div key={i} className="t-body-m-regular" style={{ padding: '6px 8px' }}>Row {i + 1}</div>)}
    </ScrollArea></Row>
  </> });
```

### CircularButton
```jsx
  IFS_GALLERY.push({ name: 'CircularButton', figma: 'circular-button-molecule (72:9983)', render: () => <>
    {[undefined, 'hover', 'pressed', 'disabled', 'focus'].map(s => (
      <Row key={s || 'default'} label={s || 'default'}>
        {dirs.map(d => <CircularButton key={d} direction={d} hotkey="⌘/" state={s === 'disabled' ? undefined : s} disabled={s === 'disabled'}>{'{label}'}</CircularButton>)}
      </Row>
    ))}
  </> });
```

### CircularMenu
```jsx
  IFS_GALLERY.push({ name: 'CircularMenu', figma: 'circular-button-organism (72:10235)', render: () => <>
    <Row label="4 / 3 / 2 buttons">{[4, 3, 2].map(n => <CircularMenu key={n} actions={acts(n)} />)}</Row>
    <Row label="hover">{dirs.map(d => <CircularMenu key={d} actions={acts(4)} hover={d} />)}</Row>
    <Row label="live (Mod+1…4)"><CircularMenu actions={[
      { direction: 'top', label: 'Expand', hotkey: '⌘1', shortcut: 'Mod+1' }, { direction: 'right', label: 'Connect', hotkey: '⌘2', shortcut: 'Mod+2' },
      { direction: 'bottom', label: 'Collapse', hotkey: '⌘3', shortcut: 'Mod+3' }, { direction: 'left', label: 'Back', hotkey: '⌘4', shortcut: 'Mod+4', disabled: true },
    ]} onSelect={a => console.log('CircularMenu', a.label)} /></Row>
  </> });
```

### FilterButton
(from the Icon-button presets example)
```jsx
  IFS_GALLERY.push({ name: 'Icon-button presets', figma: 'icon-button-notification (357:53417), -comment (2563:8153), -filter (6955:768), -arrow (6349:61950)', render: () => <>
    {[['notification', NotificationButton], ['comment', CommentButton], ['filter', FilterButton], ['arrow', ArrowButton]].map(([k, C]) => (
      <Row key={k} label={k}><C hasNew /><C /><C hasNew state="focus" /><C state="focus" /></Row>
    ))}
    <Row label="arrow ←| (direction left; ghost on a panel rail)"><ArrowButton direction="left" hasNew /><ArrowButton direction="left" dot="warning" />
      <ArrowButton direction="left" type="ghost" hasNew /><ArrowButton direction="left" type="ghost" dot="warning" /><ArrowButton direction="left" type="ghost" /></Row>
    <Row label="filter round (28)"><FilterButton shape="round" /><FilterButton shape="round" hasNew /><FilterButton shape="round" state="focus" /></Row>
  </> });
```

### ArrowButton
(from the Icon-button presets example)
```jsx
  IFS_GALLERY.push({ name: 'Icon-button presets', figma: 'icon-button-notification (357:53417), -comment (2563:8153), -filter (6955:768), -arrow (6349:61950)', render: () => <>
    {[['notification', NotificationButton], ['comment', CommentButton], ['filter', FilterButton], ['arrow', ArrowButton]].map(([k, C]) => (
      <Row key={k} label={k}><C hasNew /><C /><C hasNew state="focus" /><C state="focus" /></Row>
    ))}
    <Row label="arrow ←| (direction left; ghost on a panel rail)"><ArrowButton direction="left" hasNew /><ArrowButton direction="left" dot="warning" />
      <ArrowButton direction="left" type="ghost" hasNew /><ArrowButton direction="left" type="ghost" dot="warning" /><ArrowButton direction="left" type="ghost" /></Row>
    <Row label="filter round (28)"><FilterButton shape="round" /><FilterButton shape="round" hasNew /><FilterButton shape="round" state="focus" /></Row>
  </> });
```

### PhoneField
```jsx
  IFS_GALLERY.push({ name: 'PhoneField', figma: 'mobile-number-field-organism (8947:11306)', render: () => <>
    {['l', 'm'].map(z => (
      <div key={z} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 300px)', gap: 24, marginBottom: 24 }}>
        <PhoneField size={z} label="{heading-input}" hint="Hint" description="{text}" />
        <PhoneField size={z} label="Hover" hint="Hint" description="{text}" state="hover" />
        <PhoneField size={z} label="Typing" hint="Hint" description="{text}" state="typing" defaultValue="(123)" />
        <PhoneField size={z} label="Filled" hint="Hint" description="{text}" defaultValue="(123)456-7890" />
        <PhoneField size={z} label="Error" hint="Hint" error="{text}" defaultValue="(123)456-7890" />
        <PhoneField size={z} label="Disabled" hint="Hint" description="{text}" disabled />
        <PhoneField size={z} label="Focus" hint="Hint" description="{text}" state="focus" />
        <PhoneField size={z} label="Cooper" hint="Hint" description="{text}" cooper />
        <PhoneField size={z} label="Cooper Generating" hint="Hint" description="{text}" generating defaultValue="(123)" />
      </div>
    ))}
  </> });
```

### Slider
```jsx
  IFS_GALLERY.push({ name: 'Slider', figma: 'sliter-atom (3029:21077), slider-molecule (3029:20933), slider-organism (3029:20689)', render: () => <>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 352px)', gap: 24, marginBottom: 24 }}>
      <Slider defaultValue={0} />
      <Slider type="centered" defaultValue={0} />
      <Slider type="range" defaultValue={[40, 60]} />
      <Slider defaultValue={12} />
      <Slider type="centered" defaultValue={25} />
      <Slider type="centered" defaultValue={-25} />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 384px)', gap: 24 }}>
      {[undefined, 'hover', 'drag', 'focus'].map(s => <Slider key={s || 'd'} label="{heading-slider}" hint="Hint" description="{text}" icon="system-star-favourite"
        defaultValue={15} thumbState={s} />)}
      <Slider label="{heading-slider}" hint="Hint" description="{text}" icon="system-star-favourite" defaultValue={15} disabled />
      <Slider label="Budget range" description="Drag either end" type="range" defaultValue={[20, 70]} formatValue={v => `$${v}k`} />
    </div>
  </> });
```

### FormCard
```jsx
  IFS_GALLERY.push({ name: 'FormCard', figma: 'form-card-organism (5826:24755)', render: () => <>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      <FormCard title="Welcome to IFS Copperleaf" description="Sign in with your work email." style={{ width: 464 }}
        fields={[{ name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' }, { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' }]}
        primaryAction={{ label: 'Sign in' }} onSubmit={v => console.log('FormCard submit', v)}>
        <IFS.Checkbox>Remember me</IFS.Checkbox>
      </FormCard>
      <FormCard title="New contact" divider style={{ width: 464 }} secondaryAction={{ label: 'Cancel' }} primaryAction={{ label: 'Save' }}
        fields={[{ name: 'first', label: 'First name' }, { name: 'last', label: 'Last name' }, { name: 'email', label: 'Email', type: 'email' },
          { name: 'phone', label: 'Phone', type: 'phone' }]} onSubmit={v => console.log(v)} />
      <FormCard title="Loading" style={{ width: 464 }} loading fields={[{ name: 'a', label: 'A' }, { name: 'b', label: 'B' }]} secondaryAction={{ label: 'Cancel' }} primaryAction={{ label: 'Save' }} />
      <FormCard title="Submitting" style={{ width: 464 }} submitting defaultValues={{ a: 'Value' }} fields={[{ name: 'a', label: 'Name' }]} secondaryAction={{ label: 'Cancel' }} primaryAction={{ label: 'Save' }} />
      <FormCard title="Form-level error" style={{ width: 464 }} error="Email or password is incorrect." defaultValues={{ email: 'pat@company.com' }}
        fields={[{ name: 'email', label: 'Email', type: 'email' }]} primaryAction={{ label: 'Sign in' }} />
    </div>
  </> });
```

### IconPicker
```jsx
  IFS_GALLERY.push({ name: 'IconPicker', figma: 'icon-picker-atom (210:77686), icon-picker-organism (5434:16926)', render: () => <>
    <Row label="atom states"><IconPicker bare icons={['system-book']} /><IconPicker bare icons={['system-book']} itemState={{ 'system-book': 'hover' }} />
      <IconPicker bare icons={['system-book']} defaultValue="system-book" /><IconPicker bare icons={['system-book']} itemState={{ 'system-book': 'focus' }} /></Row>
    <Row label="organism"><IconPicker defaultValue="chat-folder" /></Row>
    <Row label="in Popover"><IFS.Popover title="Choose folder icon" trigger={<IFS.Button iconLeft="chat-folder">Folder icon</IFS.Button>}><IconPicker bare defaultValue="chat-folder" /></IFS.Popover></Row>
  </> });
```

### Weekday
```jsx
  IFS_GALLERY.push({ name: 'Weekday', figma: 'weekday-atom (2704:74414)', render: () => <>
    <Row label="atom"><Weekday>Wed</Weekday></Row>
    <Row label="row (Mon start)"><Weekdays /></Row>
    <Row label="row (Sun start)"><Weekdays weekStartsOn={0} /></Row>
  </> });
```

### Weekdays
(from the Weekday example)
```jsx
  IFS_GALLERY.push({ name: 'Weekday', figma: 'weekday-atom (2704:74414)', render: () => <>
    <Row label="atom"><Weekday>Wed</Weekday></Row>
    <Row label="row (Mon start)"><Weekdays /></Row>
    <Row label="row (Sun start)"><Weekdays weekStartsOn={0} /></Row>
  </> });
```

### Logo
```jsx
  IFS_GALLERY.push({ name: 'Logo', figma: 'logo (788:52389) in global-header (69:3736)', render: () => <>
    <Row label="default 156×30"><Logo /></Row>
    <Row label="height 24"><Logo height={24} /></Row>
  </> });
```

### TextField
```jsx
  IFS_GALLERY.push({ name: 'TextField', figma: 'text-field-organism (210:77559)', render: () => <>
    {fieldStates(TextField)}
    <Row label="icons + suffix">
      <TextField style={W} label="Amount" iconLeft="system-star-favourite" iconRight="system-heart" suffix="USD" placeholder="0.00" />
      <TextField size="m" style={W} label="Amount" iconLeft="system-star-favourite" iconRight="system-heart" suffix="USD" placeholder="0.00" />
    </Row>
    <Row label="error message"><TextField style={W} label="Email" defaultValue="not-an-email" error="Enter a valid email address" /></Row>
  </> });
```

### TextArea
```jsx
  IFS_GALLERY.push({ name: 'TextArea', figma: 'text-area-organism (3024:9383)', render: () => <>
    {fieldStates(TextArea)}
  </> });
```

### Search
```jsx
  IFS_GALLERY.push({ name: 'Search', figma: 'search-regular-organism (153:63462)', render: () => <>
    <Row label="default"><Search /></Row>
    <Row label="hover"><Search state="hover" /></Row>
    <Row label="focus"><Search state="focus" /></Row>
    <Row label="typing"><Search state="focus" defaultValue="Strategy 2025" /></Row>
    <Row label="filled"><Search defaultValue="Strategy" /></Row>
    <Row label="overflow"><Search defaultValue="pricing model impacts different companies" /></Row>
    <Row label="disabled"><Search disabled /></Row>
    <Row label="filter"><Search filter /></Row>
  </> });
```

### Checkbox
```jsx
  IFS_GALLERY.push({ name: 'Checkbox', figma: 'checkbox-molecule (153:61241), checkbox-atom (153:60798)', render: () => <>
    {[['unselected', {}], ['selected', { defaultChecked: true }], ['indeterminate', { indeterminate: true }]].map(([n, p]) => (
      <Row key={n} label={n}>
        {cbStates.map(s => <Checkbox key={s || 'd'} state={s} style={{ width: 150 }} {...p}>{s || 'default'}</Checkbox>)}
        <Checkbox disabled style={{ width: 150 }} {...p}>disabled</Checkbox>
      </Row>
    ))}
    {[['atom off', {}], ['atom on', { defaultChecked: true }], ['atom indeterminate', { indeterminate: true }]].map(([n, p]) => (
      <Row key={n} label={n}>
        {cbStates.map(s => <Checkbox key={s || 'd'} state={s} aria-label="Select" {...p} />)}
        <Checkbox disabled aria-label="Select" {...p} />
      </Row>
    ))}
  </> });
```

### Radio
```jsx
  IFS_GALLERY.push({ name: 'Radio', figma: 'radio-button-molecule (1387:222956), radio-button-atom (210:113374)', render: () => <>
    {[['unselected', false], ['selected', true]].map(([n, on]) => (
      <Row key={n} label={n}>
        {cbStates.map(s => <Radio key={s || 'd'} state={s} checked={on} readOnly style={{ width: 150 }}>{s || 'default'}</Radio>)}
        <Radio disabled checked={on} readOnly style={{ width: 150 }}>disabled</Radio>
      </Row>
    ))}
    {[['atom off', false], ['atom on', true]].map(([n, on]) => (
      <Row key={n} label={n}>
        {cbStates.map(s => <Radio key={s || 'd'} state={s} checked={on} readOnly aria-label="Option" />)}
        <Radio disabled checked={on} readOnly aria-label="Option" />
      </Row>
    ))}
    <Row label="RadioGroup">
      <RadioGroup label="Plan" defaultValue="b" options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }, { value: 'c', label: 'Option C (disabled)', disabled: true }]} />
      <RadioGroup label="Plan" direction="horizontal" defaultValue="a" options={[{ value: 'a', label: 'Left' }, { value: 'b', label: 'Right' }]} />
    </Row>
  </> });
```

### RadioGroup
(from the Radio example)
```jsx
  IFS_GALLERY.push({ name: 'Radio', figma: 'radio-button-molecule (1387:222956), radio-button-atom (210:113374)', render: () => <>
    {[['unselected', false], ['selected', true]].map(([n, on]) => (
      <Row key={n} label={n}>
        {cbStates.map(s => <Radio key={s || 'd'} state={s} checked={on} readOnly style={{ width: 150 }}>{s || 'default'}</Radio>)}
        <Radio disabled checked={on} readOnly style={{ width: 150 }}>disabled</Radio>
      </Row>
    ))}
    {[['atom off', false], ['atom on', true]].map(([n, on]) => (
      <Row key={n} label={n}>
        {cbStates.map(s => <Radio key={s || 'd'} state={s} checked={on} readOnly aria-label="Option" />)}
        <Radio disabled checked={on} readOnly aria-label="Option" />
      </Row>
    ))}
    <Row label="RadioGroup">
      <RadioGroup label="Plan" defaultValue="b" options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }, { value: 'c', label: 'Option C (disabled)', disabled: true }]} />
      <RadioGroup label="Plan" direction="horizontal" defaultValue="a" options={[{ value: 'a', label: 'Left' }, { value: 'b', label: 'Right' }]} />
    </Row>
  </> });
```

### Switch
```jsx
  IFS_GALLERY.push({ name: 'Switch', figma: 'switch-molecule (88:22668), switch-atom (88:23960)', render: () => <>
    {['m', 's'].map(z => [true, false].map(on => (
      <Row key={z + on} label={`${z} ${on ? 'on' : 'off'}`}>
        {cbStates.map(s => <Switch key={s || 'd'} size={z} defaultChecked={on} state={s} aria-label="Toggle" />)}
        <Switch size={z} defaultChecked={on} disabled aria-label="Toggle" />
      </Row>
    )))}
    {['m', 's'].map(z => (
      <Row key={z} label={`molecule ${z}`}>
        <Switch size={z} defaultChecked style={{ width: 235 }}>label</Switch>
        <Switch size={z} style={{ width: 235 }}>label</Switch>
        <Switch size={z} disabled style={{ width: 235 }}>label</Switch>
        <Switch size={z} description="Supporting text" style={{ width: 235 }}>label</Switch>
      </Row>
    ))}
  </> });
```

### NavItem
```jsx
  IFS_GALLERY.push({ name: 'NavItem', figma: 'navigation-panel-atom (1544:2681)', render: () => <>
    {['parent', 'child'].map(t => (
      <Row key={t} label={t}>
        <Box><NavItem type={t}>Default</NavItem></Box>
        <Box><NavItem type={t} state="hover" action={t === 'child' ? { label: 'Edit' } : undefined}>Hover</NavItem></Box>
        <Box><NavItem type={t} active>Active</NavItem></Box>
        <Box><NavItem type={t} state="focus" active>Focus</NavItem></Box>
        <Box><NavItem type={t} disabled>Disabled</NavItem></Box>
      </Row>
    ))}
    <Row label="submenu">
      <Box><NavItem type="submenu">Submenu</NavItem></Box>
      <Box><NavItem type="submenu" state="hover">Submenu</NavItem></Box>
      <Box><NavItem type="submenu" expanded>Submenu</NavItem></Box>
    </Row>
    <Row label="subtitle"><Box w={216}><NavSubtitle action={{ label: 'Add alternative' }}>Alternatives</NavSubtitle></Box></Row>
  </> });
```

### NavSubtitle
(from the NavItem example)
```jsx
  IFS_GALLERY.push({ name: 'NavItem', figma: 'navigation-panel-atom (1544:2681)', render: () => <>
    {['parent', 'child'].map(t => (
      <Row key={t} label={t}>
        <Box><NavItem type={t}>Default</NavItem></Box>
        <Box><NavItem type={t} state="hover" action={t === 'child' ? { label: 'Edit' } : undefined}>Hover</NavItem></Box>
        <Box><NavItem type={t} active>Active</NavItem></Box>
        <Box><NavItem type={t} state="focus" active>Focus</NavItem></Box>
        <Box><NavItem type={t} disabled>Disabled</NavItem></Box>
      </Row>
    ))}
    <Row label="submenu">
      <Box><NavItem type="submenu">Submenu</NavItem></Box>
      <Box><NavItem type="submenu" state="hover">Submenu</NavItem></Box>
      <Box><NavItem type="submenu" expanded>Submenu</NavItem></Box>
    </Row>
    <Row label="subtitle"><Box w={216}><NavSubtitle action={{ label: 'Add alternative' }}>Alternatives</NavSubtitle></Box></Row>
  </> });
```

### SideNav
```jsx
  IFS_GALLERY.push({ name: 'SideNav', figma: 'navigation-panel-organism (1545:2808)', render: () => {
    const [sel, setSel] = React.useState('active');
    return <div className="g-row" style={{ alignItems: 'flex-start' }}>
      <div style={{ height: 420 }}><SideNav title="Value" items={valueNav} value={sel} onSelect={setSel} /></div>
      <div style={{ height: 420 }}><SideNav title="Bar name" defaultValue="a" items={[
        { id: 'a', label: 'Value' },
        { type: 'submenu', id: 'sub', label: 'Submenu', defaultOpen: true, items: [{ id: 'b', label: 'Value', action: { label: 'Edit' } }, { id: 'c', label: 'Value' }] },
        { type: 'section', label: 'Value', action: { label: 'Add' }, items: [{ id: 'd', label: 'Value' }, { id: 'e', label: 'Value', disabled: true }] },
        { id: 'f', label: 'Value', cooper: true },
      ]} /></div>
      <div style={{ height: 420 }}><SideNav title="Value" items={valueNav} defaultCollapsed /></div>
      <div style={{ height: 420 }}><SideNav title="Plan"><span className="t-body-m-regular" style={{ color: 'var(--text-tertiary)' }}>children = Content slot (e.g. a tree)</span></SideNav></div>
      <span className="g-label t-body-m-regular">selected: {sel}</span>
    </div>;
  } });
```

### Tab
(from the Tabs example)
```jsx
  IFS_GALLERY.push({ name: 'Tabs', figma: 'tab (1440:5039), tab-organism (3412:32038)', render: () => {
    const [v, setV] = React.useState('all');
    return <>
      {['m', 'l'].map(z => (
        <Row key={z} label={`tab ${z}`}>
          <Tab size={z} count={7}>Text</Tab>
          <Tab size={z} count={7} state="hover">Text</Tab>
          <Tab size={z} count={7} selected>Text</Tab>
          <Tab size={z} count={7} state="focus">Text</Tab>
          <Tab size={z} count={0} disabled>Text</Tab>
        </Row>
      ))}
      <Row label="organism m">
        <Tabs aria-label="Filter" value={v} onChange={setV} items={[
          { value: 'all', label: 'All', count: 8 }, { value: 'active', label: 'Active', count: 1 },
          { value: 'draft', label: 'Draft', count: 5 }, { value: 'archived', label: 'Archived', count: 2, disabled: true }]} />
        <span className="g-label t-body-m-regular">value: {v}</span>
      </Row>
      <Row label="organism l">
        <Tabs size="l" aria-label="Views" items={[{ value: 'o', label: 'Overview' }, { value: 'd', label: 'Details' }, { value: 'h', label: 'History' }]} />
      </Row>
    </>;
  } });
```

### Tabs
```jsx
  IFS_GALLERY.push({ name: 'Tabs', figma: 'tab (1440:5039), tab-organism (3412:32038)', render: () => {
    const [v, setV] = React.useState('all');
    return <>
      {['m', 'l'].map(z => (
        <Row key={z} label={`tab ${z}`}>
          <Tab size={z} count={7}>Text</Tab>
          <Tab size={z} count={7} state="hover">Text</Tab>
          <Tab size={z} count={7} selected>Text</Tab>
          <Tab size={z} count={7} state="focus">Text</Tab>
          <Tab size={z} count={0} disabled>Text</Tab>
        </Row>
      ))}
      <Row label="organism m">
        <Tabs aria-label="Filter" value={v} onChange={setV} items={[
          { value: 'all', label: 'All', count: 8 }, { value: 'active', label: 'Active', count: 1 },
          { value: 'draft', label: 'Draft', count: 5 }, { value: 'archived', label: 'Archived', count: 2, disabled: true }]} />
        <span className="g-label t-body-m-regular">value: {v}</span>
      </Row>
      <Row label="organism l">
        <Tabs size="l" aria-label="Views" items={[{ value: 'o', label: 'Overview' }, { value: 'd', label: 'Details' }, { value: 'h', label: 'History' }]} />
      </Row>
    </>;
  } });
```

### Crumb
(from the Breadcrumb example)
```jsx
  IFS_GALLERY.push({ name: 'Breadcrumb', figma: 'breadcrumb-atom (3492:9413), breadcrumb-organism (67:4698)', render: () => <>
    {['previous', 'current', 'next'].map(t => (
      <Row key={t} label={t}>
        {[undefined, 'hover', 'focus'].map(s => <Crumb key={s || 'd'} type={t} icon={t === 'previous'} state={s}>{`{${t}}`}</Crumb>)}
        <Crumb type={t} icon={t === 'previous'} disabled>{`{${t}}`}</Crumb>
      </Row>
    ))}
    <Row label="organism"><Breadcrumb items={[{ label: '{previous}' }, { label: '{current}' }]} /></Row>
    <Row label="3 levels"><Breadcrumb items={[{ label: 'Portfolio' }, { label: 'Frameworks' }, { label: 'Q1 2026 Strategy' }]} /></Row>
  </> });
```

### Breadcrumb
```jsx
  IFS_GALLERY.push({ name: 'Breadcrumb', figma: 'breadcrumb-atom (3492:9413), breadcrumb-organism (67:4698)', render: () => <>
    {['previous', 'current', 'next'].map(t => (
      <Row key={t} label={t}>
        {[undefined, 'hover', 'focus'].map(s => <Crumb key={s || 'd'} type={t} icon={t === 'previous'} state={s}>{`{${t}}`}</Crumb>)}
        <Crumb type={t} icon={t === 'previous'} disabled>{`{${t}}`}</Crumb>
      </Row>
    ))}
    <Row label="organism"><Breadcrumb items={[{ label: '{previous}' }, { label: '{current}' }]} /></Row>
    <Row label="3 levels"><Breadcrumb items={[{ label: 'Portfolio' }, { label: 'Frameworks' }, { label: 'Q1 2026 Strategy' }]} /></Row>
  </> });
```

### Step
(from the Stepper example)
```jsx
  IFS_GALLERY.push({ name: 'Stepper', figma: 'stepper-molecule (1219:169725), stepper-organism (3029:22750)', render: () => {
    const [cur, setCur] = React.useState(0);
    return <>
      {['completed', 'in-progress', 'not-started'].map(s => (
        <Row key={s} label={s}>
          <Box w={128}><Step status={s}>Text</Step></Box>
          <Box w={128}><Step status={s} state="hover" tooltip="text">Text</Step></Box>
          <Box w={128}><Step status={s} active>Text</Step></Box>
        </Row>
      ))}
      <Row label="organism"><Box w={264}><Stepper current={0} steps={[{ label: 'Text' }, { label: 'Text' }, { label: 'Text' }]} /></Box></Row>
      <Row label="with button">
        <Box w={360}><Stepper current={cur} steps={['Input', 'Shape', 'Review', 'Approve'].map(l => ({ label: l, tooltip: `${l} step` }))} /></Box>
        <IFS.Button size="s" type="secondary" onClick={() => setCur(c => (c + 1) % 5)}>Next step</IFS.Button>
      </Row>
    </>;
  } });
```

### Stepper
```jsx
  IFS_GALLERY.push({ name: 'Stepper', figma: 'stepper-molecule (1219:169725), stepper-organism (3029:22750)', render: () => {
    const [cur, setCur] = React.useState(0);
    return <>
      {['completed', 'in-progress', 'not-started'].map(s => (
        <Row key={s} label={s}>
          <Box w={128}><Step status={s}>Text</Step></Box>
          <Box w={128}><Step status={s} state="hover" tooltip="text">Text</Step></Box>
          <Box w={128}><Step status={s} active>Text</Step></Box>
        </Row>
      ))}
      <Row label="organism"><Box w={264}><Stepper current={0} steps={[{ label: 'Text' }, { label: 'Text' }, { label: 'Text' }]} /></Box></Row>
      <Row label="with button">
        <Box w={360}><Stepper current={cur} steps={['Input', 'Shape', 'Review', 'Approve'].map(l => ({ label: l, tooltip: `${l} step` }))} /></Box>
        <IFS.Button size="s" type="secondary" onClick={() => setCur(c => (c + 1) % 5)}>Next step</IFS.Button>
      </Row>
    </>;
  } });
```

### Pager
```jsx
  IFS_GALLERY.push({ name: 'Pager', figma: 'pagination-organism (3497:9660)', render: () => {
    const [p, setP] = React.useState(1);
    return <>
      <Row label="default"><Box w={356}><Pager page={p} onChange={setP} total={3} percent={Math.round((p - 1) / 3 * 100)} onShowAll={() => {}} /></Box></Row>
      <Row label="complete"><Box w={356}><Pager defaultPage={3} total={3} percent={100} complete /></Box></Row>
      <Row label="progress word"><Box w={356}><Pager total={4} percent={0} progress="resolved" onShowAll={() => {}} /></Box></Row>
    </>;
  } });
```

### CanvasColumn
(from the CanvasHeader example)
```jsx
  IFS_GALLERY.push({ name: 'CanvasHeader', figma: 'canvas-header (1440:5321), canvas-container-atom (1440:5305)', render: () => <>
    <Row label="column"><Box w={240}><CanvasColumn>Enterprise Goals</CanvasColumn></Box></Row>
    <div style={{ width: 1200 }}><CanvasHeader columns={['Enterprise Goals', 'Value Framework', 'Strategic Objectives', 'Value Models', 'Measure Output']} /></div>
  </> });
```

### CanvasHeader
```jsx
  IFS_GALLERY.push({ name: 'CanvasHeader', figma: 'canvas-header (1440:5321), canvas-container-atom (1440:5305)', render: () => <>
    <Row label="column"><Box w={240}><CanvasColumn>Enterprise Goals</CanvasColumn></Box></Row>
    <div style={{ width: 1200 }}><CanvasHeader columns={['Enterprise Goals', 'Value Framework', 'Strategic Objectives', 'Value Models', 'Measure Output']} /></div>
  </> });
```

### NavBarItem
(from the NavBar example)
```jsx
  IFS_GALLERY.push({ name: 'NavBar', figma: 'global-header (69:3736), nav-bar-page-atom (69:4012)', render: () => <>
    <Row label="page atom">
      <NavBarItem>Default</NavBarItem><NavBarItem state="hover">Hover</NavBarItem><NavBarItem state="pressed">Pressed</NavBarItem>
      <NavBarItem active>Active</NavBarItem><NavBarItem state="focus">Focus</NavBarItem><NavBarItem disabled>Disabled</NavBarItem>
    </Row>
    <div style={{ width: 1200 }}><NavBar defaultValue="value" hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} /></div>
  </> });
```

### NavBar
```jsx
  IFS_GALLERY.push({ name: 'NavBar', figma: 'global-header (69:3736), nav-bar-page-atom (69:4012)', render: () => <>
    <Row label="page atom">
      <NavBarItem>Default</NavBarItem><NavBarItem state="hover">Hover</NavBarItem><NavBarItem state="pressed">Pressed</NavBarItem>
      <NavBarItem active>Active</NavBarItem><NavBarItem state="focus">Focus</NavBarItem><NavBarItem disabled>Disabled</NavBarItem>
    </Row>
    <div style={{ width: 1200 }}><NavBar defaultValue="value" hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} /></div>
  </> });
```

### PageHeader
```jsx
  IFS_GALLERY.push({ name: 'PageHeader', figma: 'page-header (1588:1971)', render: () => <>
    <div style={{ width: 1200 }}>
      <PageHeader title="Q1 2026 Strategy Framework" onTitleMenu={() => {}} status={<Status />}
        views={<span className="t-body-m-regular" style={{ color: 'var(--text-tertiary)' }}>[views slot]</span>}
        actions={<IFS.Button type="ghost" size="s">1 Recommendation</IFS.Button>} />
    </div>
    <div style={{ width: 1200, marginTop: 12 }}>
      <PageHeader title="Copy of Q1 2026 Enterprise Strategy" id="1/2" onBack={() => {}} status={<Status>Draft</Status>}
        actions={<IFS.Button type="primary" size="s">Review</IFS.Button>} />
    </div>
    <div style={{ width: 1200, marginTop: 12 }}>
      <PageHeader title="Q1 2026 Strategy Framework" status={<Status>Draft</Status>}
        center={<Stepper current={1} steps={[{ label: 'Input' }, { label: 'Shape' }, { label: 'Review' }]} />}
        actions={<IFS.Button type="primary" size="s">Publish</IFS.Button>} />
    </div>
  </> });
```

### PageTop
```jsx
  IFS_GALLERY.push({ name: 'PageTop', figma: 'page-top (244:117279, key c5e4c474…)', render: () => <>
    <Frame label="Default — description, New, tabs with counts, smart search (library page)">
      <PageTop title="Strategy Framework" description="Published, archived, and draft strategy frameworks" actions={<NewBtn />}
        tabs={{ items: FW_TABS, defaultValue: 'all' }} search={SEARCH} />
    </Frame>
    <Frame label="cooper = true, Show button = false (Command home; the instance overrides the gap to 12)">
      <PageTop eyebrow title="Welcome back, Jeff." description="2.8M simulations completed while you were away. Here are the items that require your input and attention right now."
        style={{ gap: 12 }} tabs={{ items: [{ value: 'w', label: 'My works', count: 3 }, { value: 'd', label: 'Decisions', count: 6 }, { value: 'c', label: 'Conversations', count: 3 }, { value: 'f', label: 'Following', count: 3 }], defaultValue: 'd' }}
        search={{ placeholder: 'Ask anything about your work' }} />
    </Frame>
    <Frame label="show search = false">
      <PageTop title="Strategy Framework" description="Published, archived, and draft strategy frameworks" actions={<NewBtn />} tabs={{ items: FW_TABS, defaultValue: 'all' }} />
    </Frame>
    <Frame label="No description — title only, Tabs size L (Build / Idea Pad)">
      <PageTop title="Build" actions={<NewBtn />} tabs={{ size: 'l', items: [{ value: 'ideas', label: 'Idea Pad' }, { value: 'inv', label: 'Investments' }], defaultValue: 'ideas' }} />
    </Frame>
    <Frame label="Title + description only (no tabs, no search, no button)">
      <PageTop title="Value Models" description="Value models used across frameworks" />
    </Frame>
  </> });
```

### AppShell
```jsx
  IFS_GALLERY.push({ name: 'AppShell', figma: 'not a Figma component — layout of "Map - Overview - Default" (4484:116532)', render: () => {
    const [stage, setStage] = React.useState('value');
    const [sel, setSel] = React.useState('active');
    return (
      <div style={{ width: 1440, maxWidth: '100%', border: '1px solid var(--border-base)' }}>
        <AppShell height={810}
          navBar={<NavBar value={stage} onChange={setStage} hasNotifications user={{ initials: 'JP', name: 'J. Parker' }} />}
          sideNav={<SideNav title="Value" items={valueNav} value={sel} onSelect={setSel} />}
          header={<>
            <PageHeader title="Q1 2026 Strategy Framework" onTitleMenu={() => {}} status={<Status />}
              actions={<IFS.Button type="ghost" size="s">1 Recommendation</IFS.Button>} />
            <CanvasHeader columns={['Enterprise Goals', 'Value Framework', 'Strategic Objectives', 'Value Models', 'Measure Output']} />
          </>}>
          <div style={{ height: 1600, padding: 24, background: 'var(--background-canvas-primary)' }} className="t-body-m-regular">
            Content scrolls here — stage: {stage}, section: {sel}
          </div>
        </AppShell>
      </div>
    );
  } });
```

### CompareDropdownList
```jsx
  IFS_GALLERY.push({ name: 'CompareDropdownList', figma: 'drop-down list [patterns] (52:82683)', render: () => (
    <div style={grid}>
      <Cell title="default" w={320}><CompareDropdownList inline groups={COMPARE_GROUPS} /></Cell>
      <Cell title="hover row + selected" w={320}><CompareDropdownList inline groups={COMPARE_GROUPS} value="v3" activeValue="f4" /></Cell>
    </div>
  ) });
```

### CompareDropdown
```jsx
  IFS_GALLERY.push({ name: 'CompareDropdown', figma: 'compare-dropdown [patterns] (52:82756)', render: () => {
    const [v, setV] = React.useState('best');
    return <>
      <div style={grid}>
        <Cell title="Property 1=Variant2 (filled)" w={320}><CompareDropdown groups={COMPARE_GROUPS} defaultValue="v3" /></Cell>
        <Cell title="Property 1=Variant3 (empty)" w={320}><CompareDropdown groups={COMPARE_GROUPS} /></Cell>
        <Cell title="Property 1=Default (open)" w={320} h={420}><CompareDropdown groups={COMPARE_GROUPS} defaultValue="best" state="open" /></Cell>
        <Cell title="disabled (inferred)" w={320}><CompareDropdown groups={COMPARE_GROUPS} defaultValue="v3" disabled /></Cell>
      </div>
      <Row label="live (click, ↑ ↓ Enter, ✕ clears)"><div style={{ height: 420, alignSelf: 'flex-start' }}><CompareDropdown groups={COMPARE_GROUPS} value={v} onChange={setV} /></div>
        <span className="t-body-m-regular" style={{ color: 'var(--text-secondary)' }}>value: {String(v)}</span></Row>
    </>;
  } });
```

### CompareHeader
```jsx
  IFS_GALLERY.push({ name: 'CompareHeader', figma: 'compare-header [patterns] (52:82780)', render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 1200 }}>
      <Row label="filled"><div style={{ width: 1200 }}><CompareHeader groups={COMPARE_GROUPS} defaultValue="best" /></div></Row>
      <Row label="empty"><div style={{ width: 1200 }}><CompareHeader groups={COMPARE_GROUPS} /></div></Row>
    </div>
  ) });
```

### CompareStatValue
```jsx
  IFS_GALLERY.push({ name: 'CompareStatValue', figma: 'compare-quick-stat-card [patterns] (52:82588) → StatCard', render: () => (
    <div style={{ ...grid, width: 1200, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
      {statsFor('best').map(s => <IFS.StatCard key={s.key} className="ifs-compare-stat" title={s.title} trend={s.trend} trendDirection={s.trendDirection} description={s.description}
        value={<CompareStatValue fromLabel={s.fromLabel} from={s.from} toLabel={s.toLabel} to={s.to} />} />)}
      {statsFor(null).slice(0, 2).map(s => <IFS.StatCard key={s.key} className="ifs-compare-stat" title={s.title} description={s.description}
        value={<CompareStatValue toLabel={s.toLabel} to={s.to} />} />)}
    </div>
  ) });
```

### ActivityPanel
```jsx
  IFS_GALLERY.push({ name: 'ActivityPanel', figma: 'panel-organism — Activity [patterns] (52:83780)', render: () => {
    const P900 = ({ title, children }) => <Cell title={title} h={760}>{children}</Cell>;
    return <div style={grid}>
      <P900 title="Version history (default)"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={APPROVED} /></P900>
      <P900 title="Expanded: activity log of Version 4"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={APPROVED} defaultExpanded={['v4']} /></P900>
      <P900 title="Filtered by person: “What did A. Singh do?”"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={APPROVED} defaultQuery="What did A. Singh do?" /></P900>
      <P900 title="Filtered by type: “Show comments only”"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={APPROVED} defaultQuery="Show comments only" /></P900>
      <P900 title="Rename"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={APPROVED} defaultRename={{ id: 'v3', value: 'Version 3' }} /></P900>
      <P900 title="Rename error (name exists)"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={APPROVED} defaultRename={{ id: 'v3', value: 'Version 4', error: 'A version with this name already exists' }} /></P900>
      <P900 title="Search: no results"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={APPROVED} defaultQuery="Pricing tariffs" /></P900>
      <P900 title="Approval chain"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={PENDING} defaultView="approvals" /></P900>
      <P900 title="Approval chain: filtered “Show me everyone who approved”"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} approvals={PENDING} defaultView="approvals" defaultQuery="Show me everyone who approved" /></P900>
      <P900 title="Approval chain: empty"><ActivityPanel layout="static" defaultVersions={genVersions(P.singh, 1)} approvals={[]} defaultView="approvals" /></P900>
      <P900 title="Only version history (no approval chain)"><ActivityPanel layout="static" defaultVersions={Q1_VERSIONS} /></P900>
    </div>;
  } });
```

### ApprovalStatus
```jsx
  IFS_GALLERY.push({ name: 'ApprovalStatus', figma: 'status (12:210060)', render: () => (
    <Row label="type">{['success', 'rejected', 'awaiting', 'empty'].map(t => <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><ApprovalStatus type={t} /><span className="t-body-m-regular">{t}</span></span>)}</Row>
  ) });
```

### QuickStatCard
(from the Stat example)
```jsx
  IFS_GALLERY.push({ name: 'Stat', figma: 'stat (12:121119)', render: () => <>
    <Row label="row (Figma: 1 compare + 3)"><Box w={988}><Stat items={STATS} /></Box></Row>
    <Row label="QuickStatCard">
      <Box w={238}><QuickStatCard title="Portfolio value" trend="4.8%" compare={{ from: '$2.14B', to: '$2.24B' }} /></Box>
      <Box w={238}><QuickStatCard title="Net value" trend="3.1%" trendDirection="down" value="$2.08B" description="vs. current" /></Box>
      <Box w={238}><QuickStatCard title="Governance flags" value="1" description="Executing investment affected" /></Box>
    </Row>
  </> });
```

### Stat
```jsx
  IFS_GALLERY.push({ name: 'Stat', figma: 'stat (12:121119)', render: () => <>
    <Row label="row (Figma: 1 compare + 3)"><Box w={988}><Stat items={STATS} /></Box></Row>
    <Row label="QuickStatCard">
      <Box w={238}><QuickStatCard title="Portfolio value" trend="4.8%" compare={{ from: '$2.14B', to: '$2.24B' }} /></Box>
      <Box w={238}><QuickStatCard title="Net value" trend="3.1%" trendDirection="down" value="$2.08B" description="vs. current" /></Box>
      <Box w={238}><QuickStatCard title="Governance flags" value="1" description="Executing investment affected" /></Box>
    </Row>
  </> });
```

### InfoHintItem
```jsx
  IFS_GALLERY.push({ name: 'InfoHintItem', figma: 'info-hint-item (12:121968)', render: () => <>
    <Row label="legend">{[{ label: 'Loss', color: 'var(--data-viz-alert-data-5)' }, { label: 'Unchanged', neutral: true }, { label: 'Gain', color: 'var(--data-viz-deep-green-data-5)' }].map(l => <InfoHintItem key={l.label} {...l} />)}</Row>
    <Row label="with value / icon"><Box w={232}><InfoHintItem label="Title" color="var(--data-viz-deep-green-data-4)" icon="system-info-hint" value="Value" /></Box></Row>
  </> });
```

### InvestmentValueImpact
```jsx
  IFS_GALLERY.push({ name: 'InvestmentValueImpact', figma: 'Investment-value-impact (12:121973)', render: () => (
    <Row label="default (hover a bar)"><Box w={988}><InvestmentValueImpact /></Box></Row>
  ) });
```

### TableReview
```jsx
  IFS_GALLERY.push({ name: 'TableReview', figma: 'table-review (12:122378)', render: () => <>
    <Row label="Default (Unchanged collapsed)" top><Box w={988}><TableReview rows={INVESTMENTS} defaultCollapsed={['Unchanged']} /></Box></Row>
    <Row label="Variant2 (expanded)" top><Box w={988}><TableReview rows={INVESTMENTS} /></Box></Row>
  </> });
```

### SplitButton
```jsx
  IFS_GALLERY.push({ name: 'SplitButton', figma: 'header-pattern main action [patterns] (138:291660)', render: () => (
    <Row label="states">
      <SplitButton onClick={() => IFS.toast({ title: 'Approve clicked' })} items={[{ label: 'Request more information', description: 'Ask for more detail about idea.', onClick: () => IFS.toast({ title: 'Request more information' }) }]}>Approve</SplitButton>
      <SplitButton disabled iconLeft="system-check" items={[{ label: 'Request more information' }]}>Approved</SplitButton>
      <SplitButton disabled iconLeft="system-check">Info requested</SplitButton>
      <SplitButton type="secondary" onClick={() => {}}>Publish</SplitButton>
    </Row>
  ) });
```

### ReadinessEvaluation
```jsx
  IFS_GALLERY.push({ name: 'ReadinessEvaluation', figma: 'Readiness Evaluation sidebar [patterns] (138:293545)', render: () => (
    <Row label="100% / 40% (Budget envelope open)" top>
      <div style={{ height: 760, display: 'flex' }}><IFS.Panel title="Readiness Evaluation"><ReadinessEvaluation summary={SUMMARY_READY} readiness={100} checks={CHECKS_READY} sections={sectionsFor(false, [])} /></IFS.Panel></div>
      <div style={{ height: 760, display: 'flex' }}><IFS.Panel title="Readiness Evaluation"><ReadinessEvaluation summary={SUMMARY_BLOCKED} readiness={40} checks={CHECKS_BLOCKED} sections={sectionsFor(true, [])} defaultOpenSections={['budget']} /></IFS.Panel></div>
    </Row>
  ) });
```

### ApprovalChainPanel
(from the ApprovalChainTable example)
```jsx
  IFS_GALLERY.push({ name: 'ApprovalChainTable', figma: 'Approval chain table [patterns] (157:114778)', render: () => {
    const [chain, setChain] = useState(OWNER_CHAIN);
    return <>
      <Row label="sidebar, compact (owner; filter > 3 approvers)" top>
        <div style={{ height: 520, display: 'flex' }}><ApprovalChainPanel mode="sidebar" onExpandedChange={() => {}} onCollapsedChange={() => {}}>
          <ApprovalChainTable approvers={chain} onChange={setChain} currentUserId="jp" ownerId="jp" />
        </ApprovalChainPanel></div>
        <div style={{ position: 'relative', width: 440, height: 360 }}><ApprovalChainPanel mode="popover" onExpandedChange={() => {}} onClose={() => {}}>
          <ApprovalChainTable defaultApprovers={REVIEWER_CHAIN} currentUserId="ig" ownerId="jp" />
        </ApprovalChainPanel></div>
      </Row>
      <Row label="full (Push, Notified, replaced reviewer)" top>
        <Box w={1392}><ApprovalChainPanel mode="full" onExpandedChange={() => {}}>
          <ApprovalChainTable approvers={chain} onChange={setChain} currentUserId="jp" ownerId="jp" view="full" />
        </ApprovalChainPanel></Box>
      </Row>
    </>;
  } });
```

### ApprovalChainTable
```jsx
  IFS_GALLERY.push({ name: 'ApprovalChainTable', figma: 'Approval chain table [patterns] (157:114778)', render: () => {
    const [chain, setChain] = useState(OWNER_CHAIN);
    return <>
      <Row label="sidebar, compact (owner; filter > 3 approvers)" top>
        <div style={{ height: 520, display: 'flex' }}><ApprovalChainPanel mode="sidebar" onExpandedChange={() => {}} onCollapsedChange={() => {}}>
          <ApprovalChainTable approvers={chain} onChange={setChain} currentUserId="jp" ownerId="jp" />
        </ApprovalChainPanel></div>
        <div style={{ position: 'relative', width: 440, height: 360 }}><ApprovalChainPanel mode="popover" onExpandedChange={() => {}} onClose={() => {}}>
          <ApprovalChainTable defaultApprovers={REVIEWER_CHAIN} currentUserId="ig" ownerId="jp" />
        </ApprovalChainPanel></div>
      </Row>
      <Row label="full (Push, Notified, replaced reviewer)" top>
        <Box w={1392}><ApprovalChainPanel mode="full" onExpandedChange={() => {}}>
          <ApprovalChainTable approvers={chain} onChange={setChain} currentUserId="jp" ownerId="jp" view="full" />
        </ApprovalChainPanel></Box>
      </Row>
    </>;
  } });
```

### CollaboratorCursor
```jsx
  IFS_GALLERY.push({ name: 'CollaboratorCursor', figma: 'cursor-atom (55:1645)', render: () => <div style={{ ...canvasBg, display: 'grid', gridTemplateColumns: 'repeat(6, max-content)', gap: '20px 28px' }}>
    {Array.from({ length: 16 }, (_, i) => <IFS.CollaboratorCursor key={i} user={i + 1} name={`User ${i + 1}`} />)}
    <IFS.CollaboratorCursor user="cooper" />
  </div> });
```

### LiveCursors
```jsx
  IFS_GALLERY.push({ name: 'LiveCursors', figma: 'cursor-atom (55:1645) over canvas-background [patterns] (12:9653)', render: () =>
    <div style={{ ...canvasBg, height: 260, padding: 0, overflow: 'hidden' }}>
      <IFS.LiveCursors users={[{ id: 'mc', ...MARIA }, { id: 'lg', ...LARA }, { id: 'ko', ...KATARINA }, { id: 'co', name: 'Cooper', cooper: true }]} />
    </div> });
```

### CollaboratorsButton
```jsx
  IFS_GALLERY.push({ name: 'CollaboratorsButton', figma: 'header-pattern / collaboration [patterns] (I12:8475;4485:119305)', render: () => <>
    {[[1, 1, 'Owner only'], [1, 5, 'Owner + awaiting'], [3, 5, 'Some accepted'], [5, 5, 'All accepted']].map(([a, i, l]) =>
      <Row key={l} label={l}><IFS.CollaboratorsButton accepted={a} invited={i} /></Row>)}
  </> });
```

### RoleSelect
```jsx
  IFS_GALLERY.push({ name: 'RoleSelect', figma: 'single-select-atom + single-select-list-molecule [patterns] (12:8637)', render: () => <>
    <Row label="editor (click to open)"><IFS.RoleSelect defaultValue="editor" onRemove={() => {}} /></Row>
    <Row label="viewer"><IFS.RoleSelect defaultValue="viewer" onRemove={() => {}} /></Row>
    <Row label="no Remove (modal)"><IFS.RoleSelect defaultValue="editor" /></Row>
    <Row label="disabled"><IFS.RoleSelect defaultValue="editor" disabled /></Row>
  </> });
```

### CollaboratorRow
```jsx
  IFS_GALLERY.push({ name: 'CollaboratorRow', figma: 'content-card-organism top slot [patterns] (12:8519)', render: () =>
    <div style={{ width: 352, display: 'flex', flexDirection: 'column', gap: 8, padding: 4, background: 'var(--background-elevation-1-primary-base)', borderRadius: 8 }}>
      <IFS.CollaboratorRow person={{ ...ME, you: true }} />
      <IFS.CollaboratorRow person={joined(MARIA, true)} onOpen={() => {}} onRemove={() => {}} />
      <IFS.CollaboratorRow person={joined(LARA, false)} onOpen={() => {}} onRemove={() => {}} />
      <IFS.CollaboratorRow person={waiting(KATARINA, 2)} onOpen={() => {}} onRemove={() => {}} />
      <IFS.CollaboratorRow person={waiting(JAMES, 50)} push="available" onOpen={() => {}} onRemove={() => {}} />
      <IFS.CollaboratorRow person={waiting(JAMES, 0)} push="notified" onOpen={() => {}} onRemove={() => {}} />
      <IFS.CollaboratorRow person={JAN} onAdd={() => {}} />
      <IFS.CollaboratorRow person={ISABELLA} onAdd={() => {}} state="hover" />
    </div> });
```

### RoleFilter
```jsx
  IFS_GALLERY.push({ name: 'RoleFilter', figma: 'icon-button + multiple-select-list-molecule [patterns] (12:11259)', render: () => {
    const [v, setV] = React.useState([]);
    return <Row label={v.length ? v.join(', ') : 'All roles'} style={{ minHeight: 230, alignItems: 'flex-start' }}>
      <div style={{ marginLeft: 180 }}><IFS.RoleFilter roles={ROLES} value={v} onChange={setV} /></div></Row>;
  } });
```

### CollaboratorsPanel
```jsx
  IFS_GALLERY.push({ name: 'CollaboratorsPanel', figma: 'popover-organism Collaborators [patterns] (12:10231 / 12:10037 / 12:9653 / 12:9847)', render: () => {
    const Panel = ({ preset, q }) => { const c = useCollab(preset); return <div><div className="g-label t-body-m-regular" style={{ marginBottom: 8 }}>{q ? `Search "${q}"` : PRESETS[preset].label}</div>
      <IFS.CollaboratorsPanel inline controller={c} defaultQuery={q} onInvite={() => {}} onOpen={() => {}} onRemove={() => {}} onPush={p => c.push(p.id)} /></div>; };
    return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      <Panel preset="owner" /><Panel preset="pending" /><Panel preset="partial" /><Panel preset="complete" />
      <Panel preset="partial" q="Ja" /><Panel preset="partial" q="Hafs" />
    </div>;
  } });
```

### InviteCollaboratorModal
```jsx
  IFS_GALLERY.push({ name: 'InviteCollaboratorModal', figma: 'modal-organism Add Collaborator [patterns] (12:11386 / 12:9330)', render: () =>
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <IFS.InviteCollaboratorModal inline open person={DIRECTORY[0]} defaultBrief={BRIEF()} onCancel={() => {}} onSubmit={() => {}} />
      <IFS.InviteCollaboratorModal inline open mode="edit" person={JAMES} defaultBrief={BRIEF()} onCancel={() => {}} onSubmit={() => {}} />
    </div> });
```

### RemoveCollaboratorModal
```jsx
  IFS_GALLERY.push({ name: 'RemoveCollaboratorModal', figma: 'modal-organism Remove this collaborator? [patterns] (12:12281)', render: () =>
    <IFS.RemoveCollaboratorModal inline open person={waiting(JAMES, 2)} onCancel={() => {}} onConfirm={() => {}} /> });

  /* ---------------- pattern screens ---------------- */
  const shell = { position: 'relative', width: 1440, height: 900, display: 'grid', gridTemplateRows: '48px 1fr', overflow: 'hidden',
    background: 'var(--background-canvas-primary)', border: '1px solid var(--border-base)', boxSizing: 'content-box' };
  const NODES = [['enterprise-goal', 'Enterprise Goals', 5], ['value-framework', 'Value Framework v12'], ['strategic-objective', 'Strategic Objectives', 5], ['value-model', 'Value Models', 7], ['measure', 'Measures', 29]];
  const COLS = ['Enterprise Goals', 'Value Framework', 'Strategic Objectives', 'Value Models', 'Measure Output'];

  function FrameworkScreen({ c, panelOpen, onPanelOpen, cursors }) {
    const online = c.members.filter(p => p.online && p.status !== 'owner');
    return (
      <div style={shell} aria-label="Draft framework with collaborators">
        <IFS.NavBar defaultValue="value" hasNotifications user={{ initials: 'JP', name: 'Jeff P.' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', minHeight: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 16, boxShadow: 'inset -1px 0 0 var(--border-base)' }}><IFS.ArrowButton label="Open navigation" /></div>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr 40px', minHeight: 0, minWidth: 0 }}>
            <div style={{ position: 'relative', zIndex: 20 }}>
              <IFS.PageHeader title="Q1 2027 Strategy Framework" onBack={() => {}} onTitleMenu={() => {}}
                status={<IFS.Indicator type="gray" size="xs">Draft</IFS.Indicator>}
                views={<IFS.SegmentedControl size="s" defaultValue="map" options={[{ value: 'grid', iconLeft: 'overview' }, { value: 'map', iconLeft: 'node-map' }, { value: 'flow', iconLeft: 'capital-flow' }]} />}
                actions={<span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <IFS.CollaboratorsMenu controller={c} open={panelOpen} onOpenChange={onPanelOpen} />
                  <IFS.CommentButton />
                  <span style={{ width: 1, height: 24, margin: '0 8px', background: 'var(--border-base)' }} aria-hidden="true" />
                  <IFS.Button type="primary" size="s">Review</IFS.Button>
                </span>} />
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 344 }}>
                <IFS.Stepper steps={[{ label: 'Input' }, { label: 'Shape' }, { label: 'Review' }, { label: 'Approve' }]} current={1} /></div>
            </div>
            <div style={{ isolation: 'isolate' }}><IFS.CanvasHeader columns={COLS} /></div>
            <div style={{ position: 'relative', minHeight: 0, isolation: 'isolate' }}>
              <IFS.CanvasBackground style={{ position: 'absolute', inset: 0 }}
                overlay={<>
                  <div style={{ position: 'absolute', left: 14, bottom: 14, zIndex: 3 }}><IFS.ValueMapButton type="shape" /></div>
                  {cursors && <IFS.LiveCursors users={online} />}
                </>}>
                {NODES.map(([t, title, n], i) => <div key={t} style={{ position: 'absolute', left: 140 + i * 240, top: 360 }}><IFS.NodeCard type={t} title={title} counter={n} /></div>)}
              </IFS.CanvasBackground>
            </div>
            <IFS.BottomSheet type="value" style={{ position: 'relative' }} documents={{ label: '3 Documents', icon: 'system-file' }} onUpload={() => {}}
              prompts={['Walk me through this framework', 'What hasn’t been updated in a while?']} />
          </div>
        </div>
      </div>
    );
  }
```

### CommentPin
```jsx
  IFS_GALLERY.push({ name: 'CommentPin', figma: 'comment-pin-organism (260:47160)', render: () => <div style={canvasBg}>
    {['unread', 'read', 'cooper'].map(t => (
      <Row key={t} label={`Type=${t}`} style={{ alignItems: 'flex-end', gap: 32, minHeight: 200 }}>
        <CommentPin type={t} avatars={t === 'cooper' ? [{ type: 'cooper' }, UN] : [UN]} />
        <CommentPin type={t} avatars={t === 'cooper' ? [{ type: 'cooper' }, { type: 'inactive', initials: '' }, UN] : [UN, { type: 'inactive', initials: '' }, UN2]} />
        <CommentPin type={t} count={5} />
        <CommentPin type={t} state="hover" avatars={t === 'cooper' ? [{ type: 'cooper' }, UN] : [UN, UN2]} preview={preview} />
      </Row>
    ))}
    <Row label="interactive (hover = preview)"><CommentPin avatars={[P['Lara Green'].avatar]} preview={{ name: 'Lara Green', time: '1d ago', text: 'Should we include additional environmental objectives?' }} onClick={() => IFS.toast({ title: 'Pin clicked — opens the thread' })} /></Row>
  </div> });
```

### CommentDrawerCard
```jsx
  IFS_GALLERY.push({ name: 'CommentDrawerCard', figma: 'comment-drawer-card (1231:170874)', render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 380px)', gap: 16, background: 'var(--background-canvas-primary)', padding: 16, borderRadius: 8 }}>
      {['default', 'hover', 'selected', 'focus'].map(s => ['read', 'new', 'cooper', 'resolved'].map(t => (
        <div key={`${s}${t}`}>
          <div className="t-body-m-regular" style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Type={t}, State={s}</div>
          <CommentDrawerCard type={t} state={s === 'default' ? undefined : s} number="{number}" place="{screen}" name="{Name}" time="{time ago}"
            avatar={{ initials: 'UN', type: 'yellow' }} avatars={t === 'cooper' ? [{ type: 'cooper' }] : []} actionRequired={t !== 'resolved'}
            onResolve={() => {}} menu={[...(t === 'resolved' ? [{ label: 'Unresolve', icon: 'arrow-back-up' }] : []), { copy: true }]}>
            There are people within organizations that have a say in the results of scenarios but are not Copperleaf users.
          </CommentDrawerCard>
        </div>
      )))}
    </div>
  ) });
```

### CommentMentionMenu
```jsx
  IFS_GALLERY.push({ name: 'CommentMentionMenu', figma: 'popover-organism + content-card-organism, Mention active [patterns] (12:45774)', render: () => {
    const [i, setI] = React.useState(1);
    return <CommentMentionMenu people={PEOPLE} activeIndex={i} onActiveChange={setI} onPick={p => IFS.toast({ title: `Mention ${p.name}` })} />;
  } });
```

### CommentCallout
```jsx
  IFS_GALLERY.push({ name: 'CommentCallout', figma: 'commentModal in Comment open / Resolved thread actions [patterns] (12:34876, 12:44840)', render: () => {
    const [a, setA] = React.useState(THREADS[1]);
    const [b, setB] = React.useState({ ...THREADS[11] });
    return <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', minHeight: 420 }}>
      <CommentCallout thread={a} currentUser={ME} people={PEOPLE} onCommentsChange={cm => setA({ ...a, comments: cm })}
        onResolve={() => setA({ ...a, resolved: true })} onUnresolve={() => setA({ ...a, resolved: false })} onClose={() => {}} />
      <CommentCallout thread={b} currentUser={ME} people={PEOPLE} onCommentsChange={cm => setB({ ...b, comments: cm })}
        onResolve={() => setB({ ...b, resolved: true })} onUnresolve={() => setB({ ...b, resolved: false })} onClose={() => {}} />
      <CommentCallout thread={THREADS[0]} currentUser={ME} people={PEOPLE} cooperSuggestion={{ label: 'Shape with Cooper' }} onClose={() => {}} />
    </div>;
  } });
```

### ChatHeader
```jsx
  IFS_GALLERY.push({ name: 'ChatHeader', figma: 'chat-header-molecule "chat header" [patterns] (12:263805)', render: () => <div style={stage}>
    <Cap title="Full panel · New chat" w={450}><div className="ifs-cooper-surface"><ChatHeader size="full" newChat /></div></Cap>
    <Cap title="Full panel · existing chat (more ⋯)" w={450}><div className="ifs-cooper-surface"><ChatHeader size="full" title="Current strategy overview" historyOpen /></div></Cap>
    <Cap title="Compact · New chat" w={320}><div className="ifs-cooper-surface"><ChatHeader size="compact" newChat /></div></Cap>
    <Cap title="Compact · long name" w={320}><div className="ifs-cooper-surface"><ChatHeader size="compact" title="Current strategy overview for the board" /></div></Cap>
  </div> });
```

### UserMessage
```jsx
  IFS_GALLERY.push({ name: 'UserMessage', figma: 'user-message-molecule "user-message-bubble" [patterns] (12:263541)', render: () => <div style={stage}>
    <Cap title="Size=Inline" w={426}><UserMessage>Strategic priorities</UserMessage></Cap>
    <Cap title="Size=>1" w={426}><UserMessage>{Q}</UserMessage></Cap>
    <Cap title="Hover (copy · edit)" w={426}><UserMessage state="hover" onEdit={() => {}}>{Q}</UserMessage></Cap>
    <Cap title="Editing" w={426}><UserMessage defaultEditing onEdit={() => {}}>{Q}</UserMessage></Cap>
  </div> });
```

### Attachment
```jsx
  IFS_GALLERY.push({ name: 'Attachment', figma: 'attachments [patterns] (16:18042)', render: () => <div style={stage}>
    <Attachment name="Board directive.pdf" meta="PDF · 240 KB" onRemove={() => {}} /><Attachment name="Q1 capex plan with a very long file name.xlsx" meta="XLSX · 1 MB" onRemove={() => {}} />
  </div> });
```

### TextMessageInput
```jsx
  IFS_GALLERY.push({ name: 'TextMessageInput', figma: 'text-message-input-molecule [patterns] (67:120307)', render: () => <div style={stage}>
    <Cap title="State=Default" w={426}><TextMessageInput /></Cap>
    <Cap title="State=Typing (interactive)" w={426}><TextMessageInput defaultValue="Show me transformer" /></Cap>
    <Cap title="State=Typing multi-line" w={426}><TextMessageInput defaultValue="Show me transformer T-902 on the map, the one that had the oil leak last quarter" /></Cap>
    <Cap title="State=Analyzing (Stop)" w={426}><TextMessageInput analyzing /></Cap>
    <Cap title="With attachments" w={426}><TextMessageInput defaultValue="Summarise these" attachments={[{ id: 'a', name: 'Board directive.pdf', meta: 'PDF · 240 KB' }, { id: 'b', name: 'Q1 capex plan.xlsx', meta: 'XLSX · 1 MB' }]} onRemoveAttachment={() => {}} /></Cap>
  </div> });
```

### VoiceMessageInput
```jsx
  IFS_GALLERY.push({ name: 'VoiceMessageInput', figma: 'voice-message-input-molecule [patterns] (67:107207)', render: () => <div style={stage}>
    <Cap title="State=Default" w={320}><VoiceMessageInput /></Cap>
    <Cap title="State=Speaking" w={320}><VoiceMessageInput state="speaking" /></Cap>
    <Cap title="State=Analyzing" w={320}><VoiceMessageInput state="analyzing" /></Cap>
  </div> });
```

### SpeakingControl
```jsx
  IFS_GALLERY.push({ name: 'SpeakingControl', figma: 'speaking-control-molecule [patterns] (67:108505)', render: () => <div style={stage}>
    <Cap title="Speaking"><SpeakingControl /></Cap><Cap title="Paused"><SpeakingControl defaultSpeaking={false} /></Cap>
  </div> });
```

### ChatCard
```jsx
  IFS_GALLERY.push({ name: 'ChatCard', figma: 'chat-card-molecule [patterns] (67:120468)', render: () => <div style={stage}>
    <Cap title="Type=Scenario" w={426}><ChatCard title="West District Feeder - Balanced" badges={['T-902', 'T-887']} meta={['$3.2M', '2yr', 'saved 3:44 AM']} /></Cap>
    <Cap title="Scenario · show-receipt · clickable" w={426}><ChatCard title="Harbor Substation upgrade" receipt="Receipt #438" badges={['Sub-H']} meta={['$4.8M', '3yr', 'saved 1:40 AM']} onClick={() => {}} /></Cap>
    <Cap title="Type=Metric" w={211}><ChatCard type="metric" category="Risk reduction" value="28–35%" /></Cap>
  </div> });
```

### ChatLink
```jsx
  IFS_GALLERY.push({ name: 'ChatLink', figma: 'chat-link-molecule "chat-link-item" [patterns] (12:265109)', render: () => <div style={stage}>
    <Cap title="follow-up · Default / Hover" w={426}><div><ChatLink>What decisions are waiting?</ChatLink><ChatLink state="hover">Show agent conflict</ChatLink></div></Cap>
    <Cap title="source" w={426}><div><ChatLink type="source" number={1}>Q1 2026 Strategy Framework — coverage report</ChatLink><ChatLink type="source" number={2}>Asset health telemetry, last 12 months</ChatLink></div></Cap>
  </div> });
```

### CooperProgress
(from the CooperMessage example)
```jsx
  IFS_GALLERY.push({ name: 'CooperMessage', figma: 'Cooper Message content — anatomy & states [patterns] (67:134213)', render: () => <div style={stage}>
    <Cap title="Analysing (Step n/total)" w={426}><CooperProgress {...step} /></Cap>
    <Cap title="Streaming" w={426}><CooperMessage status="streaming" text={answerText} streamed={120} /></Cap>
    <Cap title="Stopped while analysing → Try again" w={426}><CooperMessage status="stopped" step={step} onRetry={() => {}} /></Cap>
    <Cap title="Stopped while streaming → Regenerate" w={426}><CooperMessage status="stopped" text={answerText} streamed={120} onRegenerate={() => {}} /></Cap>
    <Cap title="Didn’t reply (error)" w={426}><CooperMessage status="error" onRetry={() => {}} /></Cap>
    <Cap title="Network error" w={426}><CooperMessage status="offline" onRetry={() => {}} /></Cap>
    <Cap title="Answered — full anatomy" w={426}><CooperMessage {...answer} sources={[{ label: 'Q1 2026 Strategy Framework — coverage report' }]} /></Cap>
    <Cap title="Answer with clarifying options (follow-ups hidden)" w={426}><CooperMessage status="answered" text="I need a little more context. Which would you like to start with?" followUps={followUps}
      options={{ title: 'Let’s build your priorities together', intro: 'I’ll suggest a few options that are common for enterprises like yours — select one or type another in your message:', items: ['Grow recurring revenue', 'Improve operating margin', 'Deepen customer retention'] }} /></Cap>
  </div> });
```

### CooperMessage
```jsx
  IFS_GALLERY.push({ name: 'CooperMessage', figma: 'Cooper Message content — anatomy & states [patterns] (67:134213)', render: () => <div style={stage}>
    <Cap title="Analysing (Step n/total)" w={426}><CooperProgress {...step} /></Cap>
    <Cap title="Streaming" w={426}><CooperMessage status="streaming" text={answerText} streamed={120} /></Cap>
    <Cap title="Stopped while analysing → Try again" w={426}><CooperMessage status="stopped" step={step} onRetry={() => {}} /></Cap>
    <Cap title="Stopped while streaming → Regenerate" w={426}><CooperMessage status="stopped" text={answerText} streamed={120} onRegenerate={() => {}} /></Cap>
    <Cap title="Didn’t reply (error)" w={426}><CooperMessage status="error" onRetry={() => {}} /></Cap>
    <Cap title="Network error" w={426}><CooperMessage status="offline" onRetry={() => {}} /></Cap>
    <Cap title="Answered — full anatomy" w={426}><CooperMessage {...answer} sources={[{ label: 'Q1 2026 Strategy Framework — coverage report' }]} /></Cap>
    <Cap title="Answer with clarifying options (follow-ups hidden)" w={426}><CooperMessage status="answered" text="I need a little more context. Which would you like to start with?" followUps={followUps}
      options={{ title: 'Let’s build your priorities together', intro: 'I’ll suggest a few options that are common for enterprises like yours — select one or type another in your message:', items: ['Grow recurring revenue', 'Improve operating margin', 'Deepen customer retention'] }} /></Cap>
  </div> });
```

### ChatCollapsedBar
```jsx
  IFS_GALLERY.push({ name: 'ChatCollapsedBar', figma: 'chat-collapsed-bar-organism "chat-inline-quick-mode" [patterns] (12:263488)', render: () => <div style={stage}>
    <Cap title="Type=Voice · Default (opens by default)" w={320}><ChatCollapsedBar type="voice" /></Cap>
    <Cap title="Voice · Hover (expand control)" w={320}><ChatCollapsedBar type="voice" state="hover" onExpand={() => {}} /></Cap>
    <Cap title="Voice · Speaking" w={320}><ChatCollapsedBar type="voice" speech="Show me" /></Cap>
    <Cap title="Voice · Speaking multi-line" w={320}><ChatCollapsedBar type="voice" speech="Show me transformer T-902 on the map, the one that had the oil leak" /></Cap>
    <Cap title="Type=Text · Default" w={320}><ChatCollapsedBar type="text" /></Cap>
    <Cap title="Text · Typing (interactive)" w={320}><ChatCollapsedBar type="text" defaultValue="Show me" onExpand={() => {}} /></Cap>
    <Cap title="Text · Typing multi-line" w={320}><ChatCollapsedBar type="text" defaultValue="Can you give me a quick overview of our current Strategy Framework? How" /></Cap>
    <Cap title="Type=FAB button" w={320}><ChatCollapsedBar type="fab" /></Cap>
  </div> });
```

### ChatCompactPanel
```jsx
  IFS_GALLERY.push({ name: 'ChatCompactPanel', figma: 'chat-compact-panel-organism "floating-window" [patterns] (12:263560)', render: () => <div style={stage}>
    <Cap title="Text · Default"><ChatCompactPanel type="text" newChat /></Cap>
    <Cap title="Voice · Speaking"><ChatCompactPanel type="voice" newChat speech="Can you give me" /></Cap>
    <Cap title="Text · Analyzing"><ChatCompactPanel type="text" newChat analyzing><UserMessage>{Q}</UserMessage><CooperProgress {...step} /></ChatCompactPanel></Cap>
    <Cap title="Voice · Interrupted"><ChatCompactPanel type="voice" newChat><UserMessage>{Q}</UserMessage><CooperMessage status="stopped" onRetry={() => {}} /></ChatCompactPanel></Cap>
    <Cap title="Text · Answered"><ChatCompactPanel type="text" title="Current strategy overview"><UserMessage>{Q}</UserMessage><CooperMessage {...answer} /></ChatCompactPanel></Cap>
    <Cap title="Text · Drop file"><ChatCompactPanel type="text" newChat dropping /></Cap>
  </div> });
```

### ChatFullPanel
```jsx
  IFS_GALLERY.push({ name: 'ChatFullPanel', figma: 'chat-full-panel-organism [patterns] (67:120161)', render: () => <div style={stage}>
    <Cap title="Text · Default (show-chips)"><ChatFullPanel type="text" newChat prompts={prompts} /></Cap>
    <Cap title="Text · Analyzing"><ChatFullPanel type="text" newChat analyzing><UserMessage>{Q}</UserMessage><CooperProgress {...step} /></ChatFullPanel></Cap>
    <Cap title="Text · Answered"><ChatFullPanel type="text" title="Current strategy overview"><UserMessage>{Q}</UserMessage><CooperMessage {...answer} /></ChatFullPanel></Cap>
    <Cap title="Voice · Answered"><ChatFullPanel type="voice" title="Current strategy overview"><UserMessage>{Q}</UserMessage><CooperMessage {...answer} /></ChatFullPanel></Cap>
  </div> });
```

### FolderItem
```jsx
  IFS_GALLERY.push({ name: 'FolderItem', figma: 'folder-item [patterns] (12:264108)', render: () => <div style={stage}>
    <Cap title="Default · Hover · Active" w={231}><div className="ifs-history__list"><FolderItem count={3}>Strategy</FolderItem><FolderItem state="hover" onMore={() => {}} count={3}>Harbor Substation</FolderItem><FolderItem active count={2}>Risk Analysis</FolderItem></div></Cap>
    <Cap title="Select active · Selected" w={231}><div className="ifs-history__list"><FolderItem selectable>Strategy</FolderItem><FolderItem selectable selected>Risk Analysis</FolderItem></div></Cap>
    <Cap title="Rename" w={231}><FolderItem renaming>Strategy</FolderItem></Cap>
    <Cap title="Smart folders" w={231}><div className="ifs-history__list"><FolderItem icon="system-clock-time" count={3}>Reminders</FolderItem><FolderItem icon="cooper-system-icon" iconVariant="Default" count={2}>Recommendations</FolderItem><FolderItem icon="system-trash-delete" count={2}>Trash</FolderItem></div></Cap>
  </div> });
```

### SectionHeader
```jsx
  IFS_GALLERY.push({ name: 'SectionHeader', figma: 'section-header [patterns] (12:264342)', render: () => <div style={stage}>
    <Cap title="default" w={239}><SectionHeader heading="Chats" count={35} /></Cap>
    <Cap title="hover (actions)" w={239}><SectionHeader heading="Folders" count={5} icon="chat-folder" state="hover" actions={[{ icon: 'chat-folder-add', label: 'Create folder' }, { icon: 'system-dots-horizont', label: 'More' }]} /></Cap>
  </div> });
```

### ChatHistoryCard
```jsx
  IFS_GALLERY.push({ name: 'ChatHistoryCard', figma: 'chat-history-card [patterns] (12:264367)', render: () => <div style={stage}>
    <Cap title="default · hover · active" w={234}><div className="ifs-history__list"><ChatHistoryCard title="Network Capacity Review" time="3d ago" /><ChatHistoryCard title="Power Line Risk Assessment" time="6h ago" state="hover" onMore={() => {}} /><ChatHistoryCard title="Current Strategy Overview" time="Now" active /></div></Cap>
    <Cap title="pinned · select · selected" w={234}><div className="ifs-history__list"><ChatHistoryCard title="Board prep notes" time="Mar 2" pinned /><ChatHistoryCard title="Outage History Analysis" time="Mar 26" selectable /><ChatHistoryCard title="System Performance Review" time="Mar 20" selectable selected /></div></Cap>
    <Cap title="rename" w={234}><ChatHistoryCard title="Network Capacity Review" renaming /></Cap>
  </div> });
```

### SearchChatHistoryCard
```jsx
  IFS_GALLERY.push({ name: 'SearchChatHistoryCard', figma: 'search-chat-history-card [patterns] (67:120339)', render: () => <div style={stage}>
    <Cap title="default · current chat · hover" w={360}><div><SearchChatHistoryCard title="Power Line Risk Assessment" query="Risk" time="6h ago" /><SearchChatHistoryCard title="Risk Analysis" query="Risk" time="Now" currentChat /><SearchChatHistoryCard title="Power Line Risk Evaluation" query="Risk" time="1d ago" state="hover" /></div></Cap>
  </div> });
```

### ChatReminderCard
```jsx
  IFS_GALLERY.push({ name: 'ChatReminderCard', figma: 'chat-reminder-card [patterns] (12:265339)', render: () => <div style={stage}>
    <Cap title="Default · active · hover" w={234}><div className="ifs-history__list">
      <ChatReminderCard title="Inspect corrosion on TL-107 joint" badge="In 12 days" due="May 14" />
      <ChatReminderCard title="Check thermal status of T-902" badge="In 4 days" due="May 2" active />
      <ChatReminderCard title="Check for leaks on T-491 valve" badge="In 3 days" due="Apr 29" state="hover" onMore={() => {}} />
    </div></Cap>
  </div> });
```

### HistoryPanel
```jsx
  IFS_GALLERY.push({ name: 'HistoryPanel', figma: 'history-panel-molecule "chat history" [patterns] (12:264137)', render: () => <div style={stage}>
    <Cap title="Default"><div className="ifs-cooper-surface" style={{ height: 725, borderRadius: 12 }}><HistoryPanel chats={liveChats.filter(c => !c.smart)} folders={folders} smart={{ reminders: 3, recommendations: 2, trash: 2 }} activeChatId="c1" onCollapse={() => {}} onChatMore={() => {}} onFolderMore={() => {}} onFoldersMore={() => {}} onChatsMore={() => {}} /></div></Cap>
    <Cap title="Select (chats)"><div className="ifs-cooper-surface" style={{ height: 725, borderRadius: 12 }}><HistoryPanel chats={liveChats.filter(c => !c.smart)} folders={folders.slice(0, 2)} smart={{ reminders: 3, recommendations: 2, trash: 2 }} selecting="chats" selected={['c4', 'c6']}
      footer={<div className="ifs-history__bar"><div className="ifs-history__bar-buttons"><IFS.Button iconLeft="chat-folder-move">Move</IFS.Button><IFS.Button iconLeft="system-trash-delete">Delete</IFS.Button></div><div className="ifs-history__bar-count">Selected <IFS.Counter>2</IFS.Counter></div></div>} /></div></Cap>
    <Cap title="empty"><div className="ifs-cooper-surface" style={{ height: 725, borderRadius: 12 }}><HistoryPanel /></div></Cap>
  </div> });
```

### FolderContent
```jsx
  IFS_GALLERY.push({ name: 'FolderContent', figma: 'folder content [patterns] (12:264418)', render: () => <div style={stage}>
    <Cap title="type=reminders"><div className="ifs-cooper-surface" style={{ height: 480, borderRadius: 12 }}><FolderContent type="reminders" title="Reminders" onCollapse={() => {}}>
      {chats.filter(c => c.smart === 'reminders').map((c, i) => <ChatReminderCard key={c.id} title={c.title} badge={c.badge} due={c.due} active={i === 0} />)}</FolderContent></div></Cap>
    <Cap title="type=insight (Recommendations)"><div className="ifs-cooper-surface" style={{ height: 480, borderRadius: 12 }}><FolderContent type="insight" title="Recommendations">
      {chats.filter(c => c.smart === 'recommendations').map(c => <ChatHistoryCard key={c.id} title={c.title} time={c.time} />)}</FolderContent></div></Cap>
    <Cap title="type=trash"><div className="ifs-cooper-surface" style={{ height: 480, borderRadius: 12 }}><FolderContent type="trash" title="Trash">
      {chats.filter(c => c.trashed).map(c => <ChatHistoryCard key={c.id} title={c.title} time={c.time} />)}</FolderContent></div></Cap>
    <Cap title="type=general (empty)"><div className="ifs-cooper-surface" style={{ height: 480, borderRadius: 12 }}><FolderContent title="Board prep" onBack={() => {}} onMore={() => {}} empty="No chats in this folder yet" /></div></Cap>
  </div> });
```

### ConfirmDeleteCard
```jsx
  IFS_GALLERY.push({ name: 'ConfirmDeleteCard', figma: 'confirm-delete-card-molecule [patterns] (67:129201)', render: () => <div style={stage}>
    <Cap title="in Delete modal" w={414}><div className="ifs-confirm-list"><ConfirmDeleteCard onRemove={() => {}}>Saved Scenarios Review</ConfirmDeleteCard><ConfirmDeleteCard icon="chat-folder" onRemove={() => {}}>Risk Analysis</ConfirmDeleteCard></div></Cap>
  </div> });
```

### HistorySearch
```jsx
  IFS_GALLERY.push({ name: 'HistorySearch', figma: 'History- search [patterns] (67:125529)', render: () => <div style={stage}>
    <HistorySearch chats={liveChats} defaultQuery="Risk" activeChatId="c1" onClose={() => {}} />
  </div> });
```

### AgentWindow
```jsx
  IFS_GALLERY.push({ name: 'AgentWindow', figma: 'agent-window-organism [patterns] (12:264637)', render: () => <div style={stage}>
    <Cap title="View=Expanded · list"><AgentWindow text="I’ve found 4 recommendations that could meaningfully improve how investments are evaluated, prioritized, and aligned with organizational goals."
      onAsk={() => {}} onClose={() => {}} tertiaryAction={{ label: 'Decline all' }} secondaryAction={{ label: 'Shape' }}>
      {['Strategic objectives', 'Measures', 'Value models'].map(g => <RecommendationGroup key={g} title={g}>{recs.filter(r => r.group === g).map((r, i) => <RecommendationItem key={r.id} {...r} defaultExpanded={g === 'Strategic objectives'} action={{ label: 'Explore' }} />)}</RecommendationGroup>)}
    </AgentWindow></Cap>
    <Cap title="Shape mode · one recommendation"><AgentWindow onAsk={() => {}} onClose={() => {}}><RecommendationDetail {...recs[0]} onBack={() => {}} /></AgentWindow></Cap>
    <Cap title="Applying"><AgentWindow onAsk={() => {}} onClose={() => {}} text="Working on it: Applying to framework structure…" /></Cap>
    <Cap title="View=Collapsed · Speaking=False"><AgentWindow defaultView="collapsed" defaultSpeaking={false} onAsk={() => {}} onClose={() => {}} text="x" /></Cap>
  </div> });

  /* ================================================================ pattern screens */
```

### RecommendationGroup
(from the AgentWindow example)
```jsx
  IFS_GALLERY.push({ name: 'AgentWindow', figma: 'agent-window-organism [patterns] (12:264637)', render: () => <div style={stage}>
    <Cap title="View=Expanded · list"><AgentWindow text="I’ve found 4 recommendations that could meaningfully improve how investments are evaluated, prioritized, and aligned with organizational goals."
      onAsk={() => {}} onClose={() => {}} tertiaryAction={{ label: 'Decline all' }} secondaryAction={{ label: 'Shape' }}>
      {['Strategic objectives', 'Measures', 'Value models'].map(g => <RecommendationGroup key={g} title={g}>{recs.filter(r => r.group === g).map((r, i) => <RecommendationItem key={r.id} {...r} defaultExpanded={g === 'Strategic objectives'} action={{ label: 'Explore' }} />)}</RecommendationGroup>)}
    </AgentWindow></Cap>
    <Cap title="Shape mode · one recommendation"><AgentWindow onAsk={() => {}} onClose={() => {}}><RecommendationDetail {...recs[0]} onBack={() => {}} /></AgentWindow></Cap>
    <Cap title="Applying"><AgentWindow onAsk={() => {}} onClose={() => {}} text="Working on it: Applying to framework structure…" /></Cap>
    <Cap title="View=Collapsed · Speaking=False"><AgentWindow defaultView="collapsed" defaultSpeaking={false} onAsk={() => {}} onClose={() => {}} text="x" /></Cap>
  </div> });

  /* ================================================================ pattern screens */
```

### RecommendationItem
(from the AgentWindow example)
```jsx
  IFS_GALLERY.push({ name: 'AgentWindow', figma: 'agent-window-organism [patterns] (12:264637)', render: () => <div style={stage}>
    <Cap title="View=Expanded · list"><AgentWindow text="I’ve found 4 recommendations that could meaningfully improve how investments are evaluated, prioritized, and aligned with organizational goals."
      onAsk={() => {}} onClose={() => {}} tertiaryAction={{ label: 'Decline all' }} secondaryAction={{ label: 'Shape' }}>
      {['Strategic objectives', 'Measures', 'Value models'].map(g => <RecommendationGroup key={g} title={g}>{recs.filter(r => r.group === g).map((r, i) => <RecommendationItem key={r.id} {...r} defaultExpanded={g === 'Strategic objectives'} action={{ label: 'Explore' }} />)}</RecommendationGroup>)}
    </AgentWindow></Cap>
    <Cap title="Shape mode · one recommendation"><AgentWindow onAsk={() => {}} onClose={() => {}}><RecommendationDetail {...recs[0]} onBack={() => {}} /></AgentWindow></Cap>
    <Cap title="Applying"><AgentWindow onAsk={() => {}} onClose={() => {}} text="Working on it: Applying to framework structure…" /></Cap>
    <Cap title="View=Collapsed · Speaking=False"><AgentWindow defaultView="collapsed" defaultSpeaking={false} onAsk={() => {}} onClose={() => {}} text="x" /></Cap>
  </div> });

  /* ================================================================ pattern screens */
```

### RecommendationDetail
(from the AgentWindow example)
```jsx
  IFS_GALLERY.push({ name: 'AgentWindow', figma: 'agent-window-organism [patterns] (12:264637)', render: () => <div style={stage}>
    <Cap title="View=Expanded · list"><AgentWindow text="I’ve found 4 recommendations that could meaningfully improve how investments are evaluated, prioritized, and aligned with organizational goals."
      onAsk={() => {}} onClose={() => {}} tertiaryAction={{ label: 'Decline all' }} secondaryAction={{ label: 'Shape' }}>
      {['Strategic objectives', 'Measures', 'Value models'].map(g => <RecommendationGroup key={g} title={g}>{recs.filter(r => r.group === g).map((r, i) => <RecommendationItem key={r.id} {...r} defaultExpanded={g === 'Strategic objectives'} action={{ label: 'Explore' }} />)}</RecommendationGroup>)}
    </AgentWindow></Cap>
    <Cap title="Shape mode · one recommendation"><AgentWindow onAsk={() => {}} onClose={() => {}}><RecommendationDetail {...recs[0]} onBack={() => {}} /></AgentWindow></Cap>
    <Cap title="Applying"><AgentWindow onAsk={() => {}} onClose={() => {}} text="Working on it: Applying to framework structure…" /></Cap>
    <Cap title="View=Collapsed · Speaking=False"><AgentWindow defaultView="collapsed" defaultSpeaking={false} onAsk={() => {}} onClose={() => {}} text="x" /></Cap>
  </div> });

  /* ================================================================ pattern screens */
```

### MapPinDot
```jsx
  IFS_GALLERY.push({ name: 'MapPinDot', figma: 'map-pin-dot (d2686af3) [patterns] (12:107153)', render: () => <div style={mapBg}>
    {['error', 'warning', 'success'].map(st => <React.Fragment key={st}>
      {[['out-of-hover', 'out of hover'], [undefined, 'default'], ['highlight', 'higlight=yes'], ['selected', 'selected']].map(([s, l]) => (
        (s === 'highlight' && st === 'success') ? null :
        <Row key={l} label={`${st} · ${l}`} style={{ gap: 28, minHeight: 56 }}>
          {['l', 'm'].map(z => <MapPinDot key={z} size={z} status={st} highlight={s === 'highlight'} state={s === 'highlight' ? undefined : s} />)}
          <MapPinDot size="m" type="icon" status={st} highlight={s === 'highlight'} state={s === 'highlight' ? undefined : s} />
          {['s', 'xs'].map(z => <MapPinDot key={z} size={z} status={st} highlight={s === 'highlight' && z === 's'} state={s === 'highlight' ? undefined : s} />)}
        </Row>
      ))}
    </React.Fragment>)}
    <Row label="interactive"><MapPinDot counter="12" label="12 faults — click to select" /><MapPinDot size="s" status="warning" label="Warning" /></Row>
  </div> });
```

### MapPinDefect
```jsx
  IFS_GALLERY.push({ name: 'MapPinDefect', figma: 'map-pin-defect (91cf9e42) [patterns] (12:106855)', render: () => <div style={mapBg}>
    {['confirmed', 'unconfirmed', 'monitoring'].map(s => (
      <Row key={s} label={s} style={{ gap: 24 }}>{['cyclone', 'flood', 'heat', 'storm'].map(t => <MapPinDefect key={t} type={t} state={s} />)}</Row>
    ))}
  </div> });
```

### MapPinFlow
```jsx
  IFS_GALLERY.push({ name: 'MapPinFlow', figma: 'Electric Flow Direction Indicator (a6c2010c) [patterns] (12:107306)', render: () => <div style={mapBg}>
    <Row label="type" style={{ gap: 24 }}><MapPinFlow /><MapPinFlow type="error" /></Row>
    <Row label="rotate" style={{ gap: 24 }}>{[0, 90, 169, 180, -63].map(r => <MapPinFlow key={r} type="error" rotate={r} />)}</Row>
  </div> });
```

### MapPinPole
```jsx
  IFS_GALLERY.push({ name: 'MapPinPole', figma: 'map-pin-pole "Pole" (b548a660) [patterns] (12:107120)', render: () => <div style={mapBg}>
    {['default', 'selected'].map(s => (
      <Row key={s} label={`state=${s}`} style={{ gap: 40, alignItems: 'flex-end' }}>
        <MapPinPole state={s} symbol="pin" pinIcon="asset type-substation" />
        <MapPinPole state={s} symbol="defect" defect={{ type: 'cyclone', state: 'confirmed' }} />
        <MapPinPole state={s} symbol="dot" />
        <MapPinPole state={s} symbol="hierarchy-pin" hierarchy="group" />
      </Row>
    ))}
    <Row label="pin status" style={{ gap: 40, alignItems: 'flex-end' }}>
      {['neutral', 'error', 'warning', 'evaluated'].map(p => <MapPinPole key={p} pinStatus={p} number={p} />)}
    </Row>
    <Row label="hierarchy" style={{ gap: 40, alignItems: 'flex-end' }}>
      {['group', 'segment', 'structure'].map(h => <MapPinPole key={h} symbol="hierarchy-pin" hierarchy={h} number={h} />)}
    </Row>
    <Row label="pin=false (route numbers)" style={{ gap: 24 }}>{[1, 2, 3, 4, 5, 6].map(n => <MapPinPole key={n} pin={false} number={n} defaultSelected={n === 4} />)}</Row>
  </div> });
```

### BarChartItem
```jsx
  IFS_GALLERY.push({ name: 'BarChartItem', figma: 'bar-chart-item (44fcce06) [patterns] (12:107849)', render: () => <>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(c => <Row key={c} label={`color=${c}`}><BarChartItem color={c} style={{ width: 238 }} /></Row>)}
    <Row label="number=false"><BarChartItem color={4} number={false} style={{ width: 238 }} /></Row>
    <Row label="fill override"><BarChartItem fill="var(--data-viz-muted-purple-data-4)" style={{ width: 238 }}>$1.2M</BarChartItem></Row>
  </> });
```

### VerticalBarChartItem
```jsx
  IFS_GALLERY.push({ name: 'VerticalBarChartItem', figma: 'vertical-bar-chart-item (c06b1d19) [patterns] (12:107877)', render: () => {
    const [act, setAct] = React.useState(false);
    return <Row label="default-1 · default-2 · active · click" style={{ gap: 32, alignItems: 'flex-end' }}>
      <VerticalBarChartItem segments={[{ value: 147, color: 7 }, { value: 20, color: 8 }, { value: 25, color: 8 }]} />
      <VerticalBarChartItem segments={[{ value: 20, color: 8 }, { value: 117, color: 8 }, { value: 28, color: 7 }, { value: 25, color: 8 }]} />
      <VerticalBarChartItem state="active" segments={[{ value: 32, color: 3 }, { value: 21, color: 2 }, { value: 20, color: 5 }, { value: 117, color: 4 }]} />
      <VerticalBarChartItem active={act} onActiveChange={setAct} label="FY27" value={1.6} max={2.5}
        segments={[{ value: 1, fill: 'var(--data-viz-muted-purple-data-4)' }]} />
    </Row>;
  } });
```

### DocumentRow
```jsx
  IFS_GALLERY.push({ name: 'DocumentRow', figma: 'file-card rows in the documents popover [patterns] (168:433527)', render: () => <div style={{ width: 284, display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Row label="default"><div style={{ width: 284 }}><DocumentRow doc={SAMPLE[0]} onOpen={noop} /></div></Row>
    <Row label="hover (editable: more)"><div style={{ width: 284 }}><DocumentRow doc={SAMPLE[3]} state="hover" onOpen={noop} /></div></Row>
    <Row label="menu open"><div style={{ width: 284 }}><DocumentRow doc={SAMPLE[3]} state="menu" onOpen={noop} /></div></Row>
    <Row label="hover (read-only)"><div style={{ width: 284 }}><DocumentRow doc={LONG[0]} editable={false} state="hover" onOpen={noop} /></div></Row>
    <Row label="long name"><div style={{ width: 284 }}><DocumentRow doc={LONG[1]} onOpen={noop} /></div></Row>
    <Row label="upload failed"><div style={{ width: 284 }}><DocumentRow doc={{ ...SAMPLE[1], name: 'Investment ideas.pdf', date: 'Sep 23, 2026', status: 'error' }} /></div></Row>
    <Row label="uploading"><div style={{ width: 284 }}><DocumentRow doc={{ ...SAMPLE[1], status: 'uploading' }} /></div></Row>
  </div> });
```

### DocumentsPopover
```jsx
  IFS_GALLERY.push({ name: 'DocumentsPopover', figma: 'popover-organism with file-card rows [patterns] (168:426540)', render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      {[[1, '1 document'], [7, '7 — height adapts'], [8, '8 — max 360 + scroll'], [10, '10 — search appears']].map(([n, l]) => (
        <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="g-label t-body-m-regular" style={{ width: 'auto' }}>{l}</span>
          <DocumentsPopover documents={SAMPLE.slice(0, n)} onOpen={noop} onClose={noop} /></div>
      ))}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="g-label t-body-m-regular" style={{ width: 'auto' }}>no results</span>
        <DocumentsPopover documents={SAMPLE} defaultQuery="Strategy" onClose={noop} /></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="g-label t-body-m-regular" style={{ width: 'auto' }}>long names (middle truncation)</span>
        <DocumentsPopover documents={LONG} onOpen={noop} onClose={noop} /></div>
    </div>
  ) });

  /* ---------------- pattern screens ---------------- */
  const shell = { position: 'relative', width: 1440, height: 900, display: 'grid', gridTemplateRows: '48px auto 1fr 40px', overflow: 'hidden',
    background: 'var(--background-canvas-primary)', border: '1px solid var(--border-base)', boxSizing: 'content-box' };
  const evidenceBtn = <IFS.IconButton shape="circle" type="tertiary" size="s" icon="cooper-evidence-icon" label="Evidence" />;

  // Investment overview content (the record the documents belong to). Map card uses the new pins.
  function AffectedAssets() {
    const S = 0.47; // the Figma map draws its pins at ~47 %
    const at = (x, y, node, k) => <div key={k} style={{ position: 'absolute', left: x, top: y, transform: `scale(${S})`, transformOrigin: '0 0' }}>{node}</div>;
    const route = '88,128 136,159 187,173 232,190 252,191 308,190 360,189 319,118';
    return (
      <div style={{ position: 'relative', width: '100%', height: 236, overflow: 'hidden', borderRadius: 4, background: 'var(--surface-secondary-alpha)' }}>
        <svg width="646" height="236" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
          <path d="M20 -16 L84 78 L87 145" fill="none" stroke="var(--border-strong)" strokeWidth=".5" strokeDasharray="2.6 1.7" />
          <polyline points={route} fill="none" stroke="var(--element-map-pin-fill-error)" strokeOpacity=".35" strokeWidth="3.7" />
          <polyline points={route} fill="none" stroke="var(--element-map-pin-fill-error)" strokeWidth=".5" strokeDasharray="2.6 1.7" />
        </svg>
        {[[-3, -22], [80, -21], [230, -13], [83, 74]].map(([x, y], i) => at(x, y, <MapPinDot size="xs" state="out-of-hover" label="Fault" />, `o${i}`))}
        {[[135, 157], [186, 171], [252, 189], [306, 188], [358, 187]].map(([x, y], i) => at(x, y, <MapPinDot size="xs" label="Fault" />, `d${i}`))}
        {at(230, 188, <MapPinDot size="xs" state="selected" label="Fault" />, 'sel')}
        {at(314, 116, <MapPinDot size="s" label="Fault" />, 's1')}{at(84, 142, <MapPinDot size="s" label="Fault" />, 's2')}
        {[[155, 159, 169], [275, 187, 180], [336, 143, -63]].map(([x, y, r], i) => at(x, y, <MapPinFlow type="error" rotate={r} />, `f${i}`))}
        {[[129, 145, 6], [354, 175, 1], [299, 179, 2], [246, 178, 3], [180, 161, 5]].map(([x, y, n]) => at(x, y, <MapPinPole pin={false} number={n} />, `p${n}`))}
        {at(224, 174, <MapPinPole pin={false} number={4} defaultSelected />, 'p4')}
        {at(306, 85, <MapPinPole number="Demeter SS" pinIcon="asset type-substation" />, 'dem')}
        {at(74, 110, <MapPinPole number="Recloser R-1" pinIcon="asset type-switcher" />, 'rec')}
        {at(62, 8, <MapPinPole symbol="defect" number="Ridgeview Village" defect={{ type: 'cyclone', state: 'confirmed' }} />, 'rv')}
        <div style={{ position: 'absolute', left: 326, top: 184, transform: `scale(${S})`, transformOrigin: '0 0' }}><IFS.Badge color="red" size="s">88%</IFS.Badge></div>
        <div style={{ position: 'absolute', right: 8, top: 8 }}><IFS.IconButton type="tertiary" size="s" icon="map" label="Open map" /></div>
      </div>
    );
  }
  function YearlyForecast() {
    const data = [['FY25', 0.42], ['FY26', 1.7], ['FY27', 1.45], ['FY28', 2.25], ['FY29', 1.5]];
    const [sel, setSel] = React.useState(null);
    return (
      <div style={{ width: '100%', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '48px 1fr', gridTemplateRows: '200px 20px', gap: '4px 0', padding: '8px 10px 0' }}>
        <div className="t-body-m-regular" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          {['$2.5M', '$2M', '$1.5M', '$1M', '$0.5M', '$0'].map(t => <span key={t}>{t}</span>)}</div>
  // … cut; full example in src/gallery/patterns-documents.jsx
```

### SourceCard
```jsx
  IFS_GALLERY.push({ name: 'SourceCard', figma: 'source-card (1440:5362)', render: () => <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Row label="file · quote · badge (Default)"><div style={{ width: 354 }}><SourceCard {...FLAGGED_DOCS[0]} onOpen={noop} /></div></Row>
    <Row label="file · text · badge (Variant2)"><div style={{ width: 354 }}><SourceCard {...DECISIONS[0]} onOpen={noop} /></div></Row>
    <Row label="user · quote (Variant3)"><div style={{ width: 354 }}><SourceCard {...CONSIDERED[0]} /></div></Row>
    <Row label="label only · quote (State=Default)"><div style={{ width: 354 }}><SourceCard {...FLAGGED_SYSTEMS[0]} /></div></Row>
    <Row label="loading"><div style={{ width: 354 }}><SourceCard loading /></div></Row>
  </div> });
```

### EvidenceSection
```jsx
  IFS_GALLERY.push({ name: 'EvidenceSection', figma: 'Evidence chain "Slot" blocks [patterns] (31:76667)', render: () => <div style={{ width: 354, display: 'flex', flexDirection: 'column', gap: 12 }}>
    <EvidenceSection title="Why it’s flagged" items={FLAGGED_DOCS.slice(0, 2)} />
    <EvidenceSection title="Considered but not included" items={CONSIDERED} />
  </div> });
```

### PeerBenchmark
```jsx
  IFS_GALLERY.push({ name: 'PeerBenchmark', figma: 'Evidence chain › Peer benchmark [patterns] (31:77627)', render: () => <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
    <div style={{ width: 354 }}><PeerBenchmark {...BENCHMARK} /></div>
    <div style={{ width: 354 }}><PeerBenchmark empty /></div>
  </div> });
```

### EvidenceButton
```jsx
  IFS_GALLERY.push({ name: 'EvidenceButton', figma: 'icon-button Shape=Circle Type=Tertiary S, cooper evidence icon [patterns] (31:74957)', render: () => {
    const [on, setOn] = React.useState(false);
    return <Row label="default · open (aria-expanded) · click"><EvidenceButton /><EvidenceButton active /><EvidenceButton active={on} onClick={() => setOn(!on)} /></Row>;
  } });
```

### EvidenceChainDrawer
```jsx
  IFS_GALLERY.push({ name: 'EvidenceChainDrawer', figma: 'drawer-organism "Evidence chain" [patterns] (31:76682)', render: () => {
    const [open, setOpen] = React.useState(true);
    return <>
      {!open && <IFS.Button size="s" type="secondary" onClick={() => setOpen(true)}>Reopen</IFS.Button>}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {[60, 87, 96].map((v, i) => <div key={v} style={{ height: 760, display: 'flex' }}>
          <EvidenceChainDrawer floating={false} value={v} rationale={rationale(FLAGGED_DOCS)} benchmark={BENCHMARK} defaultTab={i === 2 ? 'benchmark' : 'rationale'}
            {...(i === 0 ? { open, onOpenChange: setOpen } : {})} />
        </div>)}
      </div>
    </>;
  } });
```

### NavBarCollapsed
```jsx
  IFS_GALLERY.push({ name: 'NavBarCollapsed', figma: 'nav-bar-organism Type=Collapsed / Collapsed opened (3412:29453)', render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Row label="Collapsed"><div style={{ width: 600 }}><NavBarCollapsed stages={STAGES} defaultValue="value" hasNotifications user={USER} /></div></Row>
      <Row label="Collapsed opened" top><div style={{ width: 600, height: 300 }}><NavBarCollapsed stages={STAGES} defaultValue="value" defaultOpen hasNotifications user={USER} /></div></Row>
    </div>
  ) });
```

### ResponsiveNavBar
```jsx
  IFS_GALLERY.push({ name: 'ResponsiveNavBar', figma: 'nav-bar-organism Type=Default ↔ Collapsed (3412:29453)', render: () => {
    const [w, setW] = useState(1200);
    const [stage, setStage] = useState('plan');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Row label="Width"><IFS.SegmentedControl size="s" value={String(w)} onChange={v => setW(+v)} options={['1200', '900', '760', '600'].map(v => ({ value: v, label: `${v}px` }))} /></Row>
        <div style={{ width: w, height: 300, transition: 'width .2s' }}>
          <ResponsiveNavBar stages={STAGES} value={stage} onChange={setStage} hasNotifications user={USER} />
        </div>
      </div>
    );
  } });
```

### ExploreHeader
```jsx
  IFS_GALLERY.push({ name: 'ExploreHeader', figma: 'explore-header [patterns] (12:175111)', render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 1100 }}>
      <Row label="Default"><div style={{ flex: 1 }}><ExploreHeader search={{ suggestions: ['Where are the oldest feeders?', 'Show substations over capacity'] }} onCollaborators={() => toast('Collaborators')} onComments={() => toast('Comments')} /></div></Row>
      <Row label="Filters applied, new comments"><div style={{ flex: 1 }}><ExploreHeader filtersApplied hasNewComments collaborators="5/5" /></div></Row>
    </div>
  ) });

  const MiniMap = () => (
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, var(--background-elevation-1-tertiary), var(--surface-secondary-alpha) 70%)' }}>
      <div style={{ position: 'absolute', left: '30%', top: 30 }}><IFS.MapPinPole symbol="pin" number="Recloser R-1" pinIcon="asset type-substation" /></div>
      <div style={{ position: 'absolute', left: '66%', top: 18 }}><IFS.MapPinPole symbol="pin" number="Demeter SS" /></div>
      <div style={{ position: 'absolute', left: '62%', top: 84 }}><IFS.MapPinDot size="s" status="error" type="text" counter="88%" /></div>
    </div>
  );
  const DECISIONS = [
    { id: 1, title: 'Northgate Cluster · 7 aging feeders replacement', badge: 'Explore', description: '7 aging feeders serving Ridgeview Village and ~9,400 customers — reliability risk rising, flagged before failure, with an investment idea already drafted.', cpv: '$18.1M', vc: '1,345 V/$K', priority: 'critical' },
    { id: 2, title: 'EastZone C · Transformer Overload Risk', badge: 'Explore', description: '3 zones over safe capacity ahead of peak', cpv: '$12.4M', vc: '1,986 V/$K', priority: 'critical' },
    { id: 3, title: 'Ridgeline Substation · Protection Relay Fault', badge: 'Build', description: 'Relay protection upgrade serving West Corridor', cpv: '8.6M', vc: '2,092 V/$K', priority: 'critical' },
    { id: 4, title: 'Hera SS · Capacitor bank reactive support', badge: 'Plan', description: 'Voltage sagging across the South Loop at evening peak', cpv: '$7.3M', vc: '1,123 V/$K', priority: 'critical' },
    { id: 5, title: 'Apollo SS · Tx Bank 1 end-of-life replacement', badge: 'Explore', description: 'Lead transformer past expected life with a rising DGA trend', cpv: '$22.6M', vc: '4,876 V/$K', priority: 'critical' },
    { id: 6, title: 'Harbor feeders · Underground cable refurbishment', badge: 'Explore', description: '4 salt-exposed cable sections flagged ahead of storm season', cpv: '$9.8M', vc: '1,583 V/$K', priority: 'critical' },
  ];
  const metricsOf = d => [{ value: d.cpv, label: 'CPV' }, { value: d.vc, label: 'V/C' }];
```

### HomeRowCard
```jsx
  IFS_GALLERY.push({ name: 'HomeRowCard', figma: 'home-row-card-organism [patterns] (244:117301)', render: () => {
    const d = DECISIONS[0], e = DECISIONS[1];
    const box = { width: 1036 };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Row label="Primary" top><div style={box}><HomeRowCard type="primary" rank={1} {...d} metrics={metricsOf(d)} media={<MiniMap />} onOpen={() => toast(`Opening ${d.title}`)} /></div></Row>
        <Row label="Primary hover" top><div style={box}><HomeRowCard type="primary" rank={1} {...d} metrics={metricsOf(d)} media={<MiniMap />} state="hover" /></div></Row>
        <Row label="Primary focus" top><div style={box}><HomeRowCard type="primary" rank={1} {...d} metrics={metricsOf(d)} media={<MiniMap />} state="focus" /></div></Row>
        <Row label="Primary loading" top><div style={box}><HomeRowCard type="primary" rank={1} metrics={metricsOf(d)} loading /></div></Row>
        <Row label="Secondary"><div style={box}><HomeRowCard rank={2} {...e} metrics={metricsOf(e)} onOpen={() => toast(`Opening ${e.title}`)} /></div></Row>
        <Row label="Secondary hover"><div style={box}><HomeRowCard rank={2} {...e} metrics={metricsOf(e)} state="hover" /></div></Row>
        <Row label="Secondary focus"><div style={box}><HomeRowCard rank={2} {...e} metrics={metricsOf(e)} state="focus" /></div></Row>
        <Row label="Secondary loading"><div style={box}><HomeRowCard rank={2} metrics={metricsOf(e)} loading /></div></Row>
        <Row label="Live alert"><div style={box}><HomeRowCard rank={3} {...e} liveAlert={{ type: 'storm', state: 'confirmed', label: 'Storm warning' }} metrics={metricsOf(e)} onOpen={() => {}} /></div></Row>
        <Row label="Collaboration"><div style={box}><HomeRowCard rank={4} {...e} collaboration={{ initials: 'AS', type: 'blue', size: 's' }} metrics={metricsOf(e)} onOpen={() => {}} /></div></Row>
        <Row label="No metrics"><div style={box}><HomeRowCard rank={5} {...e} onOpen={() => {}} /></div></Row>
      </div>
    );
  } });
```

### SideNavTree
```jsx
  IFS_GALLERY.push({ name: 'SideNavTree', figma: 'sidebar-organism + Plan tree [patterns] (244:120655)', render: () => (
    <div style={{ display: 'flex', gap: 24, height: 640 }}>
      <SideNavTree title="Plan" tree={PLAN_TREE} sections={PLAN_SECTIONS} defaultValue="el" defaultExpanded={['wa', 'el']} />
      <SideNavTree title="Plan" tree={PLAN_TREE} sections={PLAN_SECTIONS} defaultValue="el-d" defaultExpanded={['wa', 'el']} />
      <SideNavTree title="Plan" tree={PLAN_TREE} defaultCollapsed />
    </div>
  ) });

  /* ───────────────────────── pattern screens ───────────────────────── */

  const Upper = ({ children, style }) => <span className="t-heading-h3-uppercase" style={{ color: 'var(--text-secondary)', ...style }}>{children}</span>;
  const Panel = ({ children, style }) => <div style={{ background: 'var(--surface-secondary-alpha)', borderRadius: 8, padding: 12, boxSizing: 'border-box', ...style }}>{children}</div>;
  const RightRail = ({ dot }) => (
    <div style={{ flex: 'none', width: 48, boxSizing: 'border-box', padding: 12, background: 'var(--surface-primary)', boxShadow: 'inset 1px 0 0 var(--border-base)', position: 'relative' }}>
      <IFS.IconButton icon="arrow-bar-left" label="Open panel" size="s" onClick={() => toast('Open side panel')} />
      {dot && <span aria-hidden="true" style={{ position: 'absolute', left: 27, top: 13, width: 6, height: 6, borderRadius: '50%', background: 'var(--background-system-danger)', boxShadow: '0 0 0 1.5px var(--surface-primary)' }} />}
    </div>
  );

  // ── Command (home) ──
  const CommandContent = ({ setStage }) => {
    const [tab, setTab] = useState('decisions');
    const [prio, setPrio] = useState('critical');
    const shown = DECISIONS.filter(d => d.priority === prio);
    const open = d => { toast(`Opening ${d.title} in ${d.badge}`); setStage(d.badge.toLowerCase()); };
    const tabs = [{ value: 'works', label: 'My works', count: 3 }, { value: 'decisions', label: 'Decisions', count: 6 }, { value: 'conversations', label: 'Conversations', count: 3 }, { value: 'following', label: 'Following', count: 3 }];
    const stat = (v, l, style) => <div style={{ position: 'absolute', textAlign: 'center', ...style }}><div className="t-body-l-medium">{v}</div><div className="t-body-m-regular" style={{ color: 'var(--text-tertiary)' }}>{l}</div></div>;
    return (
      <div style={{ display: 'flex', minHeight: '100%' }}>
        <div style={{ flex: 1, minWidth: 0, padding: '12px 12px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* page-top instance 244:119970: cooper on, Show button off; the instance overrides the row gap to 12 */}
          <IFS.PageTop eyebrow title="Welcome back, Jeff." description="2.8M simulations completed while you were away. Here are the items that require your input and attention right now."
            style={{ gap: 12 }} tabs={{ items: tabs, value: tab, onChange: setTab }}
            search={{ placeholder: 'Ask anything about your work', suggestions: ['Why is Northgate #1?', 'What changed since Friday?'] }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, height: 28 }}>
              <Upper>{tab === 'decisions' ? 'Decisions to review' : tabs.find(t => t.value === tab).label}</Upper>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <IFS.SegmentedControl size="s" value={prio} onChange={setPrio} options={[{ value: 'normal', label: 'Normal' }, { value: 'high', label: 'High' }, { value: 'critical', label: 'Critical' }]} />
                <span style={{ width: 1, height: 20, background: 'var(--border-base)' }} />
                <IFS.IconButton icon="system-filter-settings" type="tertiary" size="s" label="Display settings" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tab === 'decisions' && shown.length === 0 && <IFS.EmptyState cause="all-done" heading={`No ${prio}-priority decisions`} body="Nothing at this priority needs your input right now." />}
              {(tab === 'decisions' ? shown : DECISIONS.slice(3, 6)).map((d, i) => (
                <HomeRowCard key={d.id} type={i === 0 && tab === 'decisions' ? 'primary' : 'secondary'} rank={i + 1} title={d.title} badge={d.badge}
                  description={d.description} metrics={metricsOf(d)} media={i === 0 ? <MiniMap /> : undefined} onOpen={() => open(d)} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: 'none', width: 380, padding: 12, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Panel style={{ position: 'relative', height: 268, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px var(--border-base)' }}>
            <Upper>Cooper’s work results</Upper>
  // … cut; full example in src/gallery/patterns-nav-bar.jsx
```

### SmartSearch
```jsx
  IFS_GALLERY.push({ name: 'SmartSearch', figma: 'smart-search-organism (2145:3758)', render: () => {
    const ph = 'Ask anything about strategy frameworks';
    return <>
      <div style={grid}>
        {['text', 'voice'].map(t => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="t-label-m-medium" style={{ color: 'var(--text-tertiary)' }}>Type={t}</span>
            <SmartSearch type={t} placeholder={ph} />
            <SmartSearch type={t} placeholder={ph} state="hover" />
            <SmartSearch type={t} placeholder={ph} state="pressed" listening={t === 'voice'} />
            <SmartSearch type={t} placeholder={ph} state="pressed" defaultValue={t === 'voice' ? 'Strategy...' : 'Strategy'} />
            <SmartSearch type={t} placeholder={ph} defaultValue="Strategy plan" />
            <SmartSearch type={t} placeholder={ph} state="pressed" defaultValue="Explain how our current pricing model impacts different customer segments" />
            <SmartSearch type={t} placeholder={ph} disabled />
            <SmartSearch type={t} placeholder={ph} state="focus" />
          </div>
        ))}
      </div>
      <Row label="size s (28, explore-header)"><SmartSearch size="s" width={248} placeholder="Search for..." /><SmartSearch size="s" width={248} defaultValue="Northgate" /></Row>
      <Row label="live, with suggestions"><div style={{ height: 300 }}><SmartSearch placeholder="Ask anything about idea pad" suggestions={QUESTIONS} onSubmit={v => IFS.toast({ title: `Asked: ${v}` })} /></div></Row>
    </>;
  } });
```

### SearchModal
```jsx
  IFS_GALLERY.push({ name: 'SearchModal', figma: 'search-modal [patterns] (95:21781)', render: () => (
    <div style={grid}>
      <Cell title="suggestions" w={462}><SearchModal inline items={QUESTIONS} /></Cell>
      <Cell title="active (keyboard)" w={462}><SearchModal inline items={QUESTIONS.slice(0, 3)} activeIndex={1} /></Cell>
    </div>
  ) });
```

### SearchCard
```jsx
  IFS_GALLERY.push({ name: 'SearchCard', figma: 'search-card [patterns] (95:21751)', render: () => (
    <div style={{ width: 450, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SearchCard>Where is wildfire risk used?</SearchCard>
      <SearchCard state="hover">Where is wildfire risk used?</SearchCard>
      <SearchCard type="user-query" query="Where is wild">Where is wildfire risk used?</SearchCard>
      <SearchCard type="user-query" query="Where is wild" state="hover">Where is wildfire risk used?</SearchCard>
    </div>
  ) });
```

### FollowButton
```jsx
  IFS_GALLERY.push({ name: 'FollowButton', figma: 'icon-button-following [patterns] (95:16985)', render: () => (
    <Row label="following? no / yes"><FollowButton /><FollowButton defaultFollowing /></Row>
  ) });

  // ── ColumnFilter ──
```

### ColumnFilter
```jsx
  IFS_GALLERY.push({ name: 'ColumnFilter', figma: 'single-select-list-molecule + chips — Filter [patterns] (95:107049)', render: () => {
    const [name, setName] = React.useState([]);
    const [hz, setHz] = React.useState(['Long']); const [per, setPer] = React.useState(null);
    const [mod, setMod] = React.useState(['7d']);
    const [col, setCol] = React.useState(['Replied', 'Input required']);
    const [rng, setRng] = React.useState({ from: null, to: null });
    return (
      <div style={grid}>
        <Cell title="chips (Ideas: AI keywords)" w={240}><ColumnFilter options={['Replacement', 'Refurbishment', 'Upgrade', 'Feeder', 'Substation'].map(v => ({ value: v, label: v }))} value={name} onChange={setName} /></Cell>
        <Cell title="chips + custom period (Horizon)" w={240}><ColumnFilter options={['Long', 'Mid', 'Short'].map(v => ({ value: v, label: v }))} value={hz} onChange={setHz} period={{ value: per, onChange: setPer }} /></Cell>
        <Cell title="presets + custom period (Modified)" w={240}><ColumnFilter multiple={false} options={[{ value: '7d', label: 'Last 7 days' }, { value: '30d', label: 'Last 30 days' }, { value: '90d', label: 'Last 90 days' }, { value: 'this-year', label: 'This Year' }, { value: '2026', label: '2026' }]} value={mod} onChange={setMod} period={{ value: null, onChange: () => {} }} /></Cell>
        <Cell title="search + chips (Collaboration)" w={240}><ColumnFilter search={{ placeholder: 'Search by name, role...', onFilter: () => {} }} options={['Replied', 'Input required', 'Review required', 'A. Singh', 'P. Nair'].map(v => ({ value: v, label: v }))} value={col} onChange={setCol} /></Cell>
        <Cell title="range (Progress)" w={240}><ColumnFilter range={{ value: rng, onChange: setRng, min: 11, max: 89, step: 1 }} /></Cell>
      </div>
    );
  } });
```

### CollaborationBadge
```jsx
  IFS_GALLERY.push({ name: 'CollaborationBadge', figma: 'badge-atom in Collaboration column [patterns] (95:132266)', render: () => (
    <Row label="types">
      <CollaborationBadge label="View reply" avatar={{ initials: 'IO', type: 'purple' }} request={{ name: 'Ivy Okafor', role: 'Asset Planning', time: '2h ago', text: '“Added the outage history you asked for — see the 2024 tab.”', meta: 'INV-2026-0812 · replied' }} />
      <CollaborationBadge label="Provide asset health" avatar={{ initials: 'MR', type: 'red' }} request={{ name: 'Matthew Ridderikhoff', role: 'Engineering Review', time: '1h ago', text: '“Cost model is locked. Focus on the risk-deferral trade-off in Alternative B.”', meta: 'INV-2026-0840 · sent for review' }} />
      <CollaborationBadge label="Review alternative B" avatar={{ initials: 'MR', type: 'red' }} count={3} request={{ name: 'Matthew Ridderikhoff', role: 'Engineering Review', time: '1h ago', text: '“Newest of three requests.”' }} />
    </Row>
  ) });
```

### TruncatedText
```jsx
  IFS_GALLERY.push({ name: 'TruncatedText', figma: 'Name display [patterns] (190:230621)', render: () => {
    const n = 'Northgate Substation Transformer Replacement and Feeder 5 Backup Tie — Phase 2';
    return <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {['end', 'middle', 'start', 'wrap', 'segment'].map(m => <Row key={m} label={`mode=${m}`}><div className="t-body-m-medium" style={{ width: 260, color: 'var(--text-primary)' }}><TruncatedText mode={m}>{n}</TruncatedText></div></Row>)}
    </div>;
  } });
```

### ActionMenu
```jsx
  IFS_GALLERY.push({ name: 'ActionMenu', figma: 'more actions — single-select-list-molecule [patterns] (95:127626)', render: () => (
    <div style={grid}>
      <Cell title="inline list" w={200}><ActionMenu inline items={VF_ACTIONS} /></Cell>
      <Cell title="disabled with reason + destructive last" w={200}><ActionMenu inline items={[{ label: 'Compare', icon: 'compare', disabled: true, reason: 'Compare is not available for a Draft in the Input stage' }, { label: 'Archive', icon: 'chat-archive', destructive: true }, ...VF_ACTIONS.slice(1)]} /></Cell>
      <Cell title="trigger (⋮)" w={200}><div style={{ height: 180, display: 'flex', justifyContent: 'flex-end' }}><ActionMenu items={VF_ACTIONS} /></div></Cell>
    </div>
  ) });
```

### TableToolbar
```jsx
  IFS_GALLERY.push({ name: 'TableToolbar', figma: 'table card bar [patterns] (95:106479)', render: () => (
    <div style={{ width: 1000, padding: 16, borderRadius: 8, background: 'var(--surface-secondary-alpha)' }}>
      <TableToolbar filter={<IFS.SegmentedControl size="s" options={[{ value: 'all', label: 'All ideas', counter: 11 }, { value: 'p', label: 'Project ideas', counter: 8 }, { value: 'g', label: 'Program ideas', counter: 3 }]} />}
        search={<SmartSearch placeholder="Ask anything about idea pad" />} onConfigure={() => {}} />
    </div>
  ) });
```

### ColumnSettings
```jsx
  IFS_GALLERY.push({ name: 'ColumnSettings', figma: 'Table configuration — Columns [patterns] (95:119449)', render: () => {
    const [cols, setCols] = React.useState([{ key: 'name', title: 'Name' }, { key: 'status', title: 'Status' }, { key: 'horizon', title: 'Horizon', hidden: true }, { key: 'modified', title: 'Modified' }, { key: 'collab', title: 'Collaboration' }]);
    return <div style={{ width: 380 }}><IFS.Drawer inline title="Columns" collapsible={false} subtitle="You can add, drag, or toggle column visibility in your table." className="ifs-data-table__drawer" height={560}>
      <ColumnSettings columns={cols} onChange={setCols} suggestions={[{ key: 'conf', title: 'Data confidence' }, { key: 'chg', title: 'Changed since approval' }, { key: 'down', title: 'Downstream exposure' }]} onAdd={s => setCols(c => [...c, s])} />
    </IFS.Drawer></div>;
  } });
```

### RecordPreview
```jsx
  IFS_GALLERY.push({ name: 'RecordPreview', figma: 'panel-organism preview [patterns] (95:128070)', render: () => (
    <div style={{ height: 320, display: 'flex' }}>
      <RecordPreview id="INV-2026-0912" onDetails={() => {}} onClose={() => {}}>
        <h3 className="t-heading-h2-medium" style={{ margin: '0 0 6px', color: 'var(--text-primary)' }}>Southern Feeder Replacement — Circuit 17C</h3>
        <IFS.Indicator type="purple">Shaping</IFS.Indicator>
        <p className="t-body-l-regular" style={{ color: 'var(--text-secondary)' }}>7 aging feeders serving Ridgeview Village and ~9,400 customers — reliability risk rising.</p>
      </RecordPreview>
    </div>
  ) });

  // ───────────────────────── Pattern screens ─────────────────────────
  const d = s => new Date(`${s}T00:00`); // local dates
  const today = new Date();
  const ago = n => new Date(today.getFullYear(), today.getMonth(), today.getDate() - n);
  const IDEAS = [
    { id: 'i1', name: 'Northgate Substation Transformer Replacement', program: true, pinned: true, status: { type: 'orange', label: 'Under review', count: '0/4' }, horizon: 'FY29–FY43', hz: [29, 43], term: 'Long', modified: ago(3), collab: { label: 'View reply', avatar: { initials: 'IO', type: 'purple' }, kind: 'Replied', who: 'I. Okafor', request: { name: 'Ivy Okafor', role: 'Asset Planning', time: '2h ago', text: '“Added the outage history you asked for — see the 2024 tab.”', meta: 'INV-2026-0812 · replied' } }, keywords: ['Replacement', 'Substation'] },
    { id: 'i2', name: 'Ridgeview Village Backup Tie to Feeder 5', program: true, status: { type: 'blue', label: 'New' }, horizon: 'FY30–FY50', hz: [30, 50], term: 'Long', modified: ago(20), keywords: ['Feeder'] },
    { id: 'i3', name: 'Cedar Park Feeder Hardening Program', program: true, status: { type: 'gray', label: 'Deferred' }, horizon: 'FY29–FY39', hz: [29, 39], term: 'Long', modified: d('2026-04-29'), collab: { label: 'Provide asset health', avatar: { initials: 'MR', type: 'red' }, kind: 'Input required', who: 'M. Ridderikhoff', count: 2, request: { name: 'Matthew Ridderikhoff', role: 'Engineering Review', time: '1h ago', text: '“Cost model is locked. Focus on the risk-deferral trade-off in Alternative B.”', meta: 'INV-2026-0840 · sent for review' } }, keywords: ['Feeder', 'Refurbishment'] },
    { id: 'i4', name: 'Southern Feeder Replacement — Circuit 17C', status: { type: 'purple', label: 'Shaping' }, horizon: 'FY34–FY41', hz: [34, 41], term: 'Mid', modified: d('2026-03-11'), keywords: ['Replacement', 'Feeder'] },
    { id: 'i5', name: 'Elmwood Feeder 2 Underground Cable Renewal', status: { type: 'purple', label: 'Shaping' }, horizon: 'FY34–FY36', hz: [34, 36], term: 'Short', modified: d('2026-02-09'), keywords: ['Feeder', 'Refurbishment'] },
    { id: 'i6', name: 'West Corridor Protection Relay Upgrade', status: { type: 'purple', label: 'Shaping' }, horizon: 'FY30–FY32', hz: [30, 32], term: 'Short', modified: d('2026-05-18'), collab: { label: 'View reply', avatar: { initials: 'TN', type: 'blue' }, kind: 'Replied', who: 'T. Nguyen', request: { name: 'Tam Nguyen', role: 'Protection', time: '1d ago', text: '“Relay settings attached.”', meta: 'INV-2026-0790 · replied' } }, keywords: ['Upgrade'] },
    { id: 'i7', name: 'Battery Storage at Northgate to Defer Feeder Upgrade', status: { type: 'purple', label: 'Shaping' }, horizon: 'FY30–FY32', hz: [30, 32], term: 'Short', modified: ago(5), collab: { label: 'Provide asset condition', avatar: { initials: 'SC', type: 'green' }, kind: 'Input required', who: 'S. Chen', request: { name: 'Sam Chen', role: 'Asset Health', time: '3h ago', text: '“Need the latest condition score for T2.”', meta: 'INV-2026-0811 · input required' } }, keywords: ['Upgrade', 'Feeder'] },
    { id: 'i8', name: 'Reccloser Swap-outs on Northgate Leftovers (F2, F7)', status: { type: 'purple', label: 'Shaping' }, horizon: 'FY30–FY32', hz: [30, 32], term: 'Short', modified: d('2026-06-15'), keywords: ['Replacement'] },
    { id: 'i9', name: 'Flood Erosion Protection at River Crossing Structure', status: { type: 'archive', label: 'Rejected' }, horizon: 'FY30–FY32', hz: [30, 32], term: 'Short', modified: d('2026-01-28'), keywords: [] },
    { id: 'i10', name: 'Birchwood Lateral Undergrounding Study', status: { type: 'purple', label: 'Shaping' }, horizon: 'FY31–FY35', hz: [31, 35], term: 'Mid', modified: null, keywords: ['Feeder'] },
    { id: 'i11', name: 'Harbor Road Pole Line Rebuild', status: { type: 'blue', label: 'New' }, horizon: 'FY33–FY38', hz: [33, 38], term: 'Mid', modified: ago(40), keywords: ['Replacement'] },
  ].map(r => ({ ...r, icon: r.program ? 'chat-folder' : undefined }));
  const fmt = v => (v ? v.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—');
  const ideaCols = (onOpenCollab) => [
    { key: 'name', title: 'Ideas', name: true, width: '1fr', truncate: 'end', filterValue: r => r.keywords, filter: 'chips' },
  // … cut; full example in src/gallery/patterns-table.jsx
```

### IssueSolution
```jsx
  IFS_GALLERY.push({ name: 'IssueSolution', figma: 'content-card-organism (solution) [patterns] (30:73116)', render: () => <>
    <Row label="recommended (Cooper)"><W><IssueSolution {...WILDFIRE[0]} onSelect={noop} /></W></Row>
    <Row label="default"><W><IssueSolution {...WILDFIRE[1]} onSelect={noop} /></W></Row>
    <Row label="hover"><W><IssueSolution {...WILDFIRE[1]} onSelect={noop} state="hover" /></W></Row>
    <Row label="no description"><W><IssueSolution title="Accept the cap" onSelect={noop} /></W></Row>
    <Row label="applied (undo on hover)"><W><IssueSolution {...WILDFIRE[1]} onUndo={noop} /></W></Row>
    <Row label="uploading"><W><IssueSolution loading /></W></Row>
  </> });
```

### IssueListItem
```jsx
  IFS_GALLERY.push({ name: 'IssueListItem', figma: 'content-card-organism (list row) [patterns] (30:75771)', render: () => <>
    <Row label="open"><W><IssueListItem number={1} title="Wildfire risk over-weighted" onClick={noop} /></W></Row>
    <Row label="resolved"><W><IssueListItem number={2} title="WDRM v4 concentration above cap" resolved onClick={noop} /></W></Row>
  </> });
```

### IssueAnswerField
```jsx
  IFS_GALLERY.push({ name: 'IssueAnswerField', figma: 'text-field-organism State=Typing [patterns] (30:77533)', render: () => <>
    <Row label="empty"><W><IssueAnswerField autoFocus={false} onSubmit={noop} onCancel={noop} /></W></Row>
    <Row label="typing"><W><IssueAnswerField autoFocus={false} defaultValue="Cap at 30%, apply only to new investments" onSubmit={noop} onCancel={noop} /></W></Row>
  </> });
```

### ConfidenceGates
```jsx
  IFS_GALLERY.push({ name: 'ConfidenceGates', figma: 'Approval readiness [patterns] (30:73048)', render: () => {
    const c = useIssueReport({ issues: CONF_ISSUES, gates: GATES });
    return <Row label="50 %"><W><ConfidenceGates controller={c} /></W></Row>;
  } });
```

### PanelRail
```jsx
  IFS_GALLERY.push({ name: 'PanelRail', figma: 'sidebar-organism View=Collapsed [patterns] (30:75021)', render: () => <>
    <Row label="open questions"><div style={{ height: 120 }}><PanelRail dot="error" onExpand={noop} /></div></Row>
    <Row label="warnings only"><div style={{ height: 120 }}><PanelRail dot="warning" onExpand={noop} /></div></Row>
    <Row label="all OK"><div style={{ height: 120 }}><PanelRail onExpand={noop} /></div></Row>
  </> });
```

### SystemConfidence
```jsx
  IFS_GALLERY.push({ name: 'SystemConfidence', figma: 'System confidence [patterns] (30:72985)', render: () => {
    const c = useIssueReport({ issues: CONF_ISSUES, gates: GATES });
    const one = useIssueReport({ issues: CONF_ISSUES.filter(i => i.kind === 'question'), gates: GATES });
    return <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ height: 820 }}><SystemConfidence controller={c} /></div>
      <div style={{ height: 820 }}><SystemConfidence controller={one} /></div>
    </div>;
  } });
```

### TraceReport
```jsx
  IFS_GALLERY.push({ name: 'TraceReport', figma: 'Trace report drawer / sidebar [patterns] (12:176606 / 12:176205)', render: () => {
    const a = useIssueReport({ issues: TRACE_ISSUES, kinds: TRACE_KINDS });
    const b = useIssueReport({ issues: TRACE_ISSUES.filter(i => i.kind === 'warning'), kinds: TRACE_KINDS });
    return <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <TraceReport controller={a} onUndo={noop} />
      <TraceReport controller={b} onUndo={noop} defaultExpanded={false} />
      <div style={{ height: 700 }}><TraceReport controller={b} type="sidebar" /></div>
    </div>;
  } });
```

### StatCardsRow
```jsx
  IFS_GALLERY.push({ name: 'StatCardsRow', figma: 'stat-cards-row [patterns] (12:104002)', render: () => <>
    <Row label="rows 1" top><div style={{ width: 988 }}><StatCardsRow cards={STATS_ROW} /></div></Row>
    <Row label="rows 2" top><div style={{ width: 796 }}><StatCardsRow rows={2} cards={STATS_ROW} /></div></Row>
  </> });
```

### PreviewWidgetCard
```jsx
  IFS_GALLERY.push({ name: 'PreviewWidgetCard', figma: 'preview-widget-card-organism [patterns] (331:492728)', render: () => <>
    <Row label="type" top>{['strategic-objectives', 'framework-coverage', 'portfolio', 'investment-value'].map(t => <div key={t} style={{ width: 344 }}><PreviewWidgetCard type={t} /></div>)}</Row>
  </> });
```

### WidgetCard
```jsx
  IFS_GALLERY.push({ name: 'WidgetCard', figma: 'widget-card-organism [patterns] (331:492745)', render: () => <>
    {CARDS.map((c, i) => (
      <Row key={i} label={`Number=${i + 1}`} top>
        <div style={{ width: 368 }}><WidgetCard {...c} onAdd={() => IFS.toast({ title: `"${c.title}" widget added` })} /></div>
        <div style={{ width: 368, padding: 4 }}><WidgetCard {...c} state="drag" /></div>
      </Row>
    ))}
  </> });
```

### ResizeHandle
```jsx
  IFS_GALLERY.push({ name: 'ResizeHandle', figma: 'resize-handle [patterns] (413:44028)', render: () => <>
    <Row label="arrows">
      {['both', 'right', 'left'].map(a => <div key={a} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}><ResizeHandle arrows={a} /><span className="t-body-m-regular" style={{ color: 'var(--text-tertiary)' }}>{a}</span></div>)}
    </Row>
  </> });
```

### DropIndicator
```jsx
  IFS_GALLERY.push({ name: 'DropIndicator', figma: 'drop-indicator-atom [patterns] (413:43575)', render: () => <>
    <Row label="horizontal"><DropIndicator style={{ width: 560 }} /></Row>
    <Row label="vertical"><DropIndicator orientation="vertical" style={{ height: 140 }} /></Row>
  </> });
```

### WidgetViewChangePosition
```jsx
  IFS_GALLERY.push({ name: 'WidgetViewChangePosition', figma: 'widget-view-change-position [patterns] (331:509936)', render: () => <>
    <Row label="default"><WidgetViewChangePosition title="Yearly forecast" /></Row>
  </> });
```

### WidgetFrame
```jsx
  IFS_GALLERY.push({ name: 'WidgetFrame', figma: 'content-card-organism widget [patterns] (413:45297)', render: () => <>
    <Row label="state" top>
      {[undefined, 'hover', 'drag', 'ghost'].map(s => (
        <div key={s || 'default'} style={{ width: 360 }}>
          <WidgetFrame title="Reliability" state={s} menu={[{ label: 'Remove', icon: 'system-trash-delete', onClick: () => {} }]}>
            <Text>Reliability gained 5 points of value share since edition 10, led by Ridgeview Tie ($12.7M) and Feeder 12 hardening ($3.1M).</Text>
          </WidgetFrame>
        </div>
      ))}
    </Row>
    <Row label="chart (bare)" top><div style={{ width: 544 }}>
      <WidgetFrame title="Yearly forecast" bare menu={[{ label: 'Remove', icon: 'system-trash-delete', onClick: () => {} }]}>
        <IFS.ColumnChart data={forecast} valueLabel="Forecast" format={usdAxis} height={200} />
      </WidgetFrame>
    </div></Row>
  </> });
```

### WidgetBoard
```jsx
  IFS_GALLERY.push({ name: 'WidgetBoard', figma: 'report section · Performance [patterns] (413:45297)', render: () => (
    <div style={{ width: 1128 }}>
      <WidgetBoard defaultValue={{ sections: [REPORT_LAYOUT.sections[1]] }} widgets={REPORT_WIDGETS} />
    </div>
  ) });
```

### WidgetsDrawer
```jsx
  IFS_GALLERY.push({ name: 'WidgetsDrawer', figma: 'drawer [patterns] (331:493265)', render: () => {
    const [open, setOpen] = useState(true);
    return <div style={{ position: 'relative', height: 860 }}>
      {!open && <IFS.Button size="s" iconLeft="chart" onClick={() => setOpen(true)}>Widgets</IFS.Button>}
      <WidgetsDrawer open={open} onOpenChange={setOpen} items={CARDS.map((c, i) => ({ id: `w${i}`, ...c }))}
        onAdd={it => IFS.toast({ title: `"${it.title}" widget added` })} style={{ height: 860 }} />
    </div>;
  } });
```

### Menu
```jsx
  IFS_GALLERY.push({ name: 'Menu', figma: 'single-select-list-molecule (153:62054) · single-select-list-atom (153:61939)', render: () => <>
    <Row label="list" style={{ alignItems: 'flex-start' }}>
      <Menu inline items={MENU} />
      <Menu inline width={160} items={[{ label: 'Default' }, { label: 'Hover', state: 'hover' }, { label: 'Selected', selected: true }, { label: 'Disabled', disabled: true }, { label: 'Danger', danger: true }]} />
      <Menu inline width={240} items={[{ label: 'Approve', description: 'Moves the item to the next stage' }, { label: 'Approve with note', description: 'Adds a note for the next approver' }]} />
    </Row>
    <Row label="trigger (end / start)" style={{ alignItems: 'flex-start', height: 280 }}>
      <div style={{ width: 240, display: 'flex', justifyContent: 'flex-end' }}><Menu defaultOpen items={MENU} label="More actions" trigger={<IFS.IconButton icon="system-dots-vertical" type="ghost" size="s" label="More actions" />} /></div>
      <div style={{ width: 240, marginLeft: 40 }}><Menu align="start" items={[{ label: 'Resize', icon: 'arrow-diagonal-expand', items: [{ label: 'Small' }, { label: 'Medium', selected: true }, { label: 'Large' }] }, { label: 'Remove', icon: 'system-trash-delete', danger: true }]}
        label="Widget actions" trigger={<IFS.Button type="secondary" size="s" iconRight="arrow-caret-down-filled">Open menu</IFS.Button>} /></div>
    </Row>
  </> });
```

### Select
```jsx
  IFS_GALLERY.push({ name: 'Select', figma: 'single-select-organism (3273:26820) · single-select-atom (789:18085) · single-select-list-atom (153:61939)', render: () => <>
    <Row label="size" style={{ alignItems: 'flex-start' }}>{sizes.map(z => <span key={z} className="g-label t-body-m-regular" style={W}>{z}</span>)}</Row>
    {triggerStates.map(([n, p]) => (
      <Row key={n} label={n}>
        {sizes.map(z => <div key={z} style={W}><Select size={z} label="Label" placeholder="{label}" options={OPTS} {...p} /></div>)}
      </Row>
    ))}
    <Row label="open: down / up" style={{ alignItems: 'flex-start', height: 520 }}>
      <div style={{ width: 384 }}><Select size="l" defaultOpen placeholder="{label}" listTitle="Suggested" options={OPTS} defaultValue={3} /></div>
      <div style={{ width: 384, marginTop: 460 }}><Select size="l" defaultOpen listPosition="up" placeholder="{label}" listTitle="Suggested" options={OPTS} /></div>
      <div style={{ width: 240 }}><Select size="m" defaultOpen placeholder="{label}" listSize="l" options={[...OPTS.slice(0, 3), { value: 'x', label: 'Disabled option', disabled: true }]} defaultValue={2} /></div>
    </Row>
    <Row label="divider + action" style={{ alignItems: 'flex-start', height: 240 }}>
      <div style={{ width: 240 }}><Select size="m" defaultOpen placeholder="Owner" defaultValue={1}
        options={[...OPTS.slice(0, 3), { divider: true }, { action: true, danger: true, icon: 'system-trash-delete', label: 'Remove' }]} /></div>
    </Row>
  </> });
```

### MultiSelect
```jsx
  IFS_GALLERY.push({ name: 'MultiSelect', figma: 'multiple-select-organism (3273:33904) · multiple-select-atom (3200:7897) · multiple-select-list-atom (3273:32692)', render: () => <>
    {[['default', {}], ['hover', { state: 'hover' }], ['focus', { state: 'focus' }], ['open', { state: 'open' }],
      ['loading', { loading: true, defaultValue: [1, 2, 3] }], ['filled', { defaultValue: [1, 2, 3] }], ['overflow', { defaultValue: [1, 2, 3, 4, 5, 6, 7, 8] }],
      ['error', { error: true }], ['disabled', { disabled: true }]].map(([n, p]) => (
      <Row key={n} label={n}>
        {sizes.map(z => <div key={z} style={{ width: z === 's' ? 120 : 340 }}><MultiSelect size={z} label="Label" placeholder="{label}" options={OPTS} {...p} /></div>)}
      </Row>
    ))}
    <Row label="open" style={{ alignItems: 'flex-start', height: 250 }}>
      <div style={{ width: 384 }}><MultiSelect size="l" defaultOpen placeholder="{label}" listTitle="Suggested" options={OPTS} defaultValue={[2, 4]} /></div>
    </Row>
  </> });
```

### Combobox
```jsx
  IFS_GALLERY.push({ name: 'Combobox', figma: 'signle-combobox-organism (3375:5415)', render: () => <>
    {[['default', {}], ['hover', { state: 'hover' }], ['filled', { defaultValue: 2 }], ['error', { error: true }], ['loading', { loading: true }], ['disabled', { disabled: true }]].map(([n, p]) => (
      <Row key={n} label={n}>{['m', 'l', 'xl'].map(z => <div key={z} style={{ width: 300 }}><Combobox size={z} label="Label" options={OPTS} {...p} /></div>)}</Row>
    ))}
    <Row label="open: results / no results / searching" style={{ alignItems: 'flex-start', height: 230 }}>
      <div style={{ width: 300 }}><Combobox size="m" defaultOpen defaultQuery="a" options={OPTS} /></div>
      <div style={{ width: 300 }}><Combobox size="l" defaultOpen defaultQuery="place" options={OPTS} suggestions={['WDRM-1', 'WDRM-5', 'WDRM-6']} /></div>
      <div style={{ width: 300 }}><Combobox size="xl" label="Label" defaultOpen defaultQuery="place" loading options={OPTS} /></div>
    </Row>
  </> });
```

### SegmentedControl
```jsx
  IFS_GALLERY.push({ name: 'SegmentedControl', figma: 'segmented-control-organism (1387:244501) · segmented-control-atom (1387:244511)', render: () => <>
    {[2, 3, 4, 5].map(n => <Row key={n} label={`number ${n}`}><SegmentedControl size="m" options={seg(n)} /><SegmentedControl size="s" options={seg(n)} /></Row>)}
    {['m', 's'].map(z => <Row key={z} label={`states ${z}`}>
      {[undefined, 'hover', 'pressed', 'focus'].map(s => <SegmentedControl key={s || 'd'} size={z} defaultValue={0} options={[{ value: 0, label: 'label', iconLeft: 'system-star-favourite', iconRight: 'system-heart', counter: 3, state: s }, { value: 1, label: 'label', iconLeft: 'system-star-favourite', iconRight: 'system-heart', counter: 3, state: s }]} />)}
      <SegmentedControl size={z} defaultValue={0} options={[{ value: 0, label: 'label', counter: 3, disabled: true }, { value: 1, label: 'label', counter: 3, disabled: true }]} />
    </Row>)}
    <Row label="fullWidth (355)"><div style={{ width: 355 }}><SegmentedControl size="s" fullWidth options={[{ value: 0, label: 'Versions' }, { value: 1, label: 'Approvals', counter: 2 }]} /></div></Row>
  </> });
```

### Chip
```jsx
  IFS_GALLERY.push({ name: 'Chip', figma: 'chips (832:235895)', render: () => <>
    {[false, true].map(sel => <Row key={String(sel)} label={sel ? 'selected' : 'unselected'}>
      {[undefined, 'hover', 'pressed'].map(s => <Chip key={s || 'd'} defaultSelected={sel} state={s} iconLeft="system-star-favourite" iconRight="system-heart">{'{label}'}</Chip>)}
      <Chip defaultSelected={sel} disabled iconLeft="system-star-favourite" iconRight="system-heart">{'{label}'}</Chip>
      <Chip defaultSelected={sel} state="focus" iconLeft="system-star-favourite" iconRight="system-heart">{'{label}'}</Chip>
    </Row>)}
    <Row label="options">
      <Chip indicator="warning">Indicator</Chip>
      <Chip counter={3}>Counter</Chip>
      <Chip onRemove={() => {}}>Removable</Chip>
    </Row>
  </> });
```

### Calendar
(from the DatePicker example)
```jsx
  IFS_GALLERY.push({ name: 'DatePicker', figma: 'date-picker-molecule (3406:9510) · date-atom (1440:5201)', render: () => <>
    <Row label="calendar" style={{ alignItems: 'flex-start' }}>
      <Calendar defaultMonth={feb} today={new Date(2026, 1, 12)} defaultValue={new Date(2026, 1, 18)} events={{ '2026-02-24': ['danger', 'warning', 'info'] }} />
      <Calendar range defaultMonth={feb} today={new Date(2026, 1, 12)} defaultValue={{ start: new Date(2026, 1, 9), end: new Date(2026, 1, 13) }} />
    </Row>
    <Row label="picker" style={{ alignItems: 'flex-start', height: 340 }}>
      <div style={{ width: 240 }}><DatePicker defaultValue={new Date(2026, 1, 18)} defaultOpen state="open" /></div>
      <div style={{ width: 240 }}><DatePicker size="l" /></div>
      <div style={{ width: 240 }}><DatePicker size="xl" label="Date" range /></div>
    </Row>
    <Row label="showApply" style={{ alignItems: 'flex-start', height: 380 }}>
      <div style={{ width: 240 }}><DatePicker defaultValue={new Date(2026, 1, 18)} defaultOpen state="open" showApply /></div>
    </Row>
  </> });
```

### DatePicker
```jsx
  IFS_GALLERY.push({ name: 'DatePicker', figma: 'date-picker-molecule (3406:9510) · date-atom (1440:5201)', render: () => <>
    <Row label="calendar" style={{ alignItems: 'flex-start' }}>
      <Calendar defaultMonth={feb} today={new Date(2026, 1, 12)} defaultValue={new Date(2026, 1, 18)} events={{ '2026-02-24': ['danger', 'warning', 'info'] }} />
      <Calendar range defaultMonth={feb} today={new Date(2026, 1, 12)} defaultValue={{ start: new Date(2026, 1, 9), end: new Date(2026, 1, 13) }} />
    </Row>
    <Row label="picker" style={{ alignItems: 'flex-start', height: 340 }}>
      <div style={{ width: 240 }}><DatePicker defaultValue={new Date(2026, 1, 18)} defaultOpen state="open" /></div>
      <div style={{ width: 240 }}><DatePicker size="l" /></div>
      <div style={{ width: 240 }}><DatePicker size="xl" label="Date" range /></div>
    </Row>
    <Row label="showApply" style={{ alignItems: 'flex-start', height: 380 }}>
      <div style={{ width: 240 }}><DatePicker defaultValue={new Date(2026, 1, 18)} defaultOpen state="open" showApply /></div>
    </Row>
  </> });
```

### EmptyState
```jsx
  IFS_GALLERY.push({ name: 'EmptyState', figma: 'empty-state-organism (3782:18464)', render: () => <>
    <div style={grid}>
      <Cell title="cause=first-run" h={180}><EmptyState cause="first-run" heading="No value frameworks yet" body="Create your first framework to start planning." primaryAction={{ label: 'New framework' }} /></Cell>
      <Cell title="cause=empty-container" h={180}><EmptyState cause="empty-container" heading="No models added" body="Add models to this framework to begin scoring." primaryAction={{ label: 'New model' }} /></Cell>
      <Cell title="cause=all-done" h={180}><EmptyState cause="all-done" heading="All caught up" body="No frameworks are pending approval right now." /></Cell>
      <Cell title="cause=error" h={180}><EmptyState cause="error" heading="Couldn’t load frameworks" body="Something went wrong on our end. Please try again." primaryAction={{}} /></Cell>
      <Cell title="cause=no-access" h={180}><EmptyState cause="no-access" heading="You don’t have access" body="Ask the framework owner to share it with you." primaryAction={{}} /></Cell>
      <Cell title="cause=no-results-similar" h={180}><EmptyState cause="no-results-similar" heading="No results found" body="You might be looking for" suggestions={['WDRM-1', 'WDRM-5', 'WDRM-6']} /></Cell>
      <Cell title="cause=no-results" h={180}><EmptyState cause="no-results" heading="No results found" body="Try a different term, or clear filters to see everything." primaryAction={{}} /></Cell>
      <Cell title="all parts (anatomy)" h={180}><EmptyState heading="Heading" body="One or two sentences — why it's empty, what to do." suggestions={['{label}', '{label} ', '{label}  ']} secondaryAction={{ label: '{label}', icon: 'system-star-favourite' }} primaryAction={{ label: '{label}', icon: 'system-star-favourite' }} /></Cell>
    </div>
    <Row label="size=full">
      <div style={{ width: 640, height: 300, display: 'flex', background: 'var(--background-elevation-1-secondary, #111)', borderRadius: 8 }}>
        <EmptyState size="full" cause="empty-container" heading="No models added" body="Add models to this framework to begin scoring." primaryAction={{ label: 'New model' }} />
      </div>
    </Row>
  </> });
```

### Spinner
```jsx
  IFS_GALLERY.push({ name: 'Spinner', figma: 'empty-state-spinner-molecule (3782:24081)', render: () => <>
    <Row label="show-text"><Spinner /><Spinner showText={false} /></Row>
  </> });
```

### LoadingMore
```jsx
  IFS_GALLERY.push({ name: 'LoadingMore', figma: 'empty-state-loading-more-molecule (3782:24082)', render: () => <Row label="default"><LoadingMore /></Row> });
```

### ProgressLoading
```jsx
  IFS_GALLERY.push({ name: 'ProgressLoading', figma: 'progress-bar-loading (5530:11867)', render: () => <Row label="value">{[0, 60, 100].map(v => <ProgressLoading key={v} value={v} />)}</Row> });
```

### Skeleton
```jsx
  IFS_GALLERY.push({ name: 'Skeleton', figma: 'Content States › Skeleton (4759:9600)', render: () => {
    function Demo() {
      const [loading, setLoading] = React.useState(true);
      return <>
        <Row label="LoadingRegion"><Button size="s" onClick={() => setLoading(l => !l)}>{loading ? 'Finish loading' : 'Reload'}</Button></Row>
        <Row label="owning component">
          <div style={{ width: 286 }}><LoadingRegion loading={loading} label="stat" skeleton={<StatCard size="s" loading />}><StatCard size="s" title="Total capex" value="$4.2M" trend="+4%" /></LoadingRegion></div>
          <div style={{ width: 286 }}><LoadingRegion loading={loading} label="results" /></div>
        </Row>
      </>;
    }
    return <>
      <Row label="shapes"><Skeleton width={180} height={14} /><Skeleton shape="circle" width={32} height={32} /><Skeleton shape="block" width={180} height={56} /></Row>
      <Demo />
    </>;
  } });
```

### LoadingRegion
(from the Skeleton example)
```jsx
  IFS_GALLERY.push({ name: 'Skeleton', figma: 'Content States › Skeleton (4759:9600)', render: () => {
    function Demo() {
      const [loading, setLoading] = React.useState(true);
      return <>
        <Row label="LoadingRegion"><Button size="s" onClick={() => setLoading(l => !l)}>{loading ? 'Finish loading' : 'Reload'}</Button></Row>
        <Row label="owning component">
          <div style={{ width: 286 }}><LoadingRegion loading={loading} label="stat" skeleton={<StatCard size="s" loading />}><StatCard size="s" title="Total capex" value="$4.2M" trend="+4%" /></LoadingRegion></div>
          <div style={{ width: 286 }}><LoadingRegion loading={loading} label="results" /></div>
        </Row>
      </>;
    }
    return <>
      <Row label="shapes"><Skeleton width={180} height={14} /><Skeleton shape="circle" width={32} height={32} /><Skeleton shape="block" width={180} height={56} /></Row>
      <Demo />
    </>;
  } });
```

### FtaButton
```jsx
  IFS_GALLERY.push({ name: 'FtaButton', figma: 'FTA button (67:4758)', render: () => <>
    {[true, false].map(st => (
      <Row key={String(st)} label={`stroke=${st}`}>
        {states.map(s => <FtaButton key={s || 'default'} stroke={st} state={s} tooltip={false} />)}
        <FtaButton stroke={st} disabled />
        <FtaButton stroke={st} indicator={false} />
      </Row>
    ))}
    <Row label="hover tooltip"><div style={{ paddingTop: 36 }}><FtaButton /></div></Row>
  </> });
```

### PromptButton
```jsx
  IFS_GALLERY.push({ name: 'PromptButton', figma: 'prompt-button (67:2937)', render: () => <>
    {['l', 'm'].map(z => (
      <Row key={z} label={`size=${z}`}>
        {states.map(s => <PromptButton key={s || 'default'} size={z} state={s}>{'{prompt-label}'}</PromptButton>)}
        <PromptButton size={z} disabled>{'{prompt-label}'}</PromptButton>
      </Row>
    ))}
  </> });
```

### CooperChip
```jsx
  IFS_GALLERY.push({ name: 'CooperChip', figma: 'cooper-chip-atom (3501:23480)', render: () => <Row label="states">
    <CooperChip />
    <CooperChip state="hover" />
    <CooperChip state="focus" />
    <CooperChip defaultSelected />
    <CooperChip disabled />
  </Row> });

  const prompts = ['Compare to peer', 'Compare to best practice'];
  const Labeled = ({ label, children }) => <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="g-label t-body-m-regular" style={{ width: 'auto' }}>{label}</span>{children}</div>;
```

### BottomSheet
```jsx
  IFS_GALLERY.push({ name: 'BottomSheet', figma: 'base-bottom-sheet-organism (4406:25590), value-bottom-sheet-organism (789:37502), explore-bottom-sheet (72:4676)', render: () => <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 1141 }}>
    <Labeled label="type=base"><BottomSheet prompts={prompts} /></Labeled>
    <Labeled label="value, in progress"><BottomSheet type="value" inProgress coverage={10} prompts={prompts} documents={{ label: '3 Documents' }} onUpload={() => {}} /></Labeled>
    <Labeled label="value, not in progress"><BottomSheet type="value" prompts={prompts} documents={{ label: '3 Documents' }} onUpload={() => {}} /></Labeled>
    <Labeled label="value, Active (read-only)"><BottomSheet type="value" prompts={prompts} documents={{ label: '16 Documents' }} /></Labeled>
    <Labeled label="type=explore"><BottomSheet type="explore" prompts={['What’s this signal?', 'Open overnight log']} /></Labeled>
    <Labeled label="600px wide: left side and prompts scroll sideways, nothing overflows"><div style={{ width: 600, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <BottomSheet type="value" inProgress coverage={10} prompts={prompts} documents={{ label: '3 Documents' }} onUpload={() => {}} />
      <BottomSheet type="explore" prompts={['What’s this signal?', 'Open overnight log']} />
    </div></Labeled>
  </div> });
}
```

### Tooltip
```jsx
  IFS_GALLERY.push({ name: 'Tooltip', figma: 'tooltip-organism (67:6151)', render: () => <>
    {['black', 'grey'].map(c => <React.Fragment key={c}>
      <Row label={`${c} · bottom / top`}><Black>
        {['bottom', 'top'].map(t => ['left', 'center', 'right'].map(a => <Tooltip key={t + a} inline color={c} type={t} arrow={a} content="{label}" hotkey="⌘/" />))}
      </Black></Row>
      <Row label={`${c} · left / right`}><Black>
        <Tooltip inline color={c} type="left" content="{label}" hotkey="⌘/" />
        <Tooltip inline color={c} type="right" content="{label}" hotkey="⌘/" />
      </Black></Row>
    </React.Fragment>)}
    <Live>
      {['bottom', 'top', 'left', 'right'].map(t => <Tooltip key={t} color="grey" type={t} content={`type=${t}`} hotkey="⌘/"><Button>Hover {t}</Button></Tooltip>)}
      <Tooltip content="Settings"><IconButton icon="system-settings" label="Settings" type="secondary" /></Tooltip>
    </Live>
  </> });
```

### Alert
```jsx
  IFS_GALLERY.push({ name: 'Alert', figma: 'alert-organism (1440:5440)', render: () => <SurfDemoAlert /> });
  function SurfDemoAlert() {
    const [shown, setShown] = React.useState(true);
    return <>
      <Row label="types" top>
        {['error', 'warning', 'success'].map(t => <Alert key={t} type={t} title="title" action="{label}">text</Alert>)}
      </Row>
      <Row label="show-icon" top>
        {['error', 'warning', 'success'].map(t => <Alert key={t} type={t} showIcon title="Item can't be added here">Drop it on a framework node instead.</Alert>)}
      </Row>
      <Live>{shown ? <Alert type="warning" title="Unsaved changes" onClose={() => setShown(false)}>Close me.</Alert> : <Button onClick={() => setShown(true)}>Show alert again</Button>}</Live>
    </>;
  }
```

### Snackbar
```jsx
  IFS_GALLERY.push({ name: 'Snackbar', figma: 'snackbar-organism (3795:29459)', render: () => <>
    <Row label="default"><Snackbar title="{title}" secondaryAction={{ label: '{label}' }} primaryAction={{ label: '{label}' }}>placeholder</Snackbar></Row>
    <Row label="minimal"><Snackbar title="Investment saved">Changes are live for your team.</Snackbar></Row>
    <Row label="action iconLeft"><Snackbar title="Widget removed" secondaryAction={{ label: 'Undo', iconLeft: 'arrow-back-up' }} /></Row>
    <Live><Button type="primary" onClick={() => IFS.toast({ title: 'Investment archived', description: 'Moved to Archive.', primaryAction: { label: 'Undo' } })}>Show toast</Button></Live>
  </> });
```

### Overlay
(from the Modal example)
```jsx
  IFS_GALLERY.push({ name: 'Modal', figma: 'modal-organism (4169:208596) + overlay-background (338:21403)', render: () => <SurfDemoModal /> });
  function SurfDemoModal() {
    const [open, setOpen] = React.useState(false);
    return <>
      <Row label="inline" top>
        <Modal inline title="{title}" secondaryAction={{ label: '{label}' }} primaryAction={{ label: '{label}' }}><div style={{ height: 286 }} /></Modal>
        <Modal inline title="Primary disabled" secondaryAction={{ label: 'Cancel' }} primaryAction={{ label: 'Save', disabled: true }}><div style={{ height: 60 }} /></Modal>
        <div style={{ position: 'relative', width: 240, height: 160, overflow: 'hidden', background: 'linear-gradient(135deg,#335,#a63)' }}>
          <Overlay inline type="strong" style={{ inset: '0 50% 0 0' }} /><Overlay inline type="base" style={{ inset: '0 0 0 50%' }} />
        </div>
      </Row>
      <Live>
        <Button type="primary" onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onOpenChange={setOpen} title="Archive investment"
          secondaryAction={{ label: 'Cancel', onClick: () => setOpen(false) }} primaryAction={{ label: 'Archive', onClick: () => setOpen(false) }}>
          <Filler h={80}>Esc, the ✕ or a click on the overlay closes it. Tab stays inside.</Filler>
        </Modal>
      </Live>
    </>;
  }

  const Seg = () => <div className="t-body-m-regular" style={{ height: 28, borderRadius: 6, background: 'var(--surface-secondary-alpha)', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', padding: '0 8px' }}>segmented-control slot</div>;
  const Tabs = () => <div className="t-body-m-regular" style={{ height: 40, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', boxShadow: 'inset 0 -1px 0 var(--border-base)' }}>tab-organism slot</div>;
```

### Modal
```jsx
  IFS_GALLERY.push({ name: 'Modal', figma: 'modal-organism (4169:208596) + overlay-background (338:21403)', render: () => <SurfDemoModal /> });
  function SurfDemoModal() {
    const [open, setOpen] = React.useState(false);
    return <>
      <Row label="inline" top>
        <Modal inline title="{title}" secondaryAction={{ label: '{label}' }} primaryAction={{ label: '{label}' }}><div style={{ height: 286 }} /></Modal>
        <Modal inline title="Primary disabled" secondaryAction={{ label: 'Cancel' }} primaryAction={{ label: 'Save', disabled: true }}><div style={{ height: 60 }} /></Modal>
        <div style={{ position: 'relative', width: 240, height: 160, overflow: 'hidden', background: 'linear-gradient(135deg,#335,#a63)' }}>
          <Overlay inline type="strong" style={{ inset: '0 50% 0 0' }} /><Overlay inline type="base" style={{ inset: '0 0 0 50%' }} />
        </div>
      </Row>
      <Live>
        <Button type="primary" onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onOpenChange={setOpen} title="Archive investment"
          secondaryAction={{ label: 'Cancel', onClick: () => setOpen(false) }} primaryAction={{ label: 'Archive', onClick: () => setOpen(false) }}>
          <Filler h={80}>Esc, the ✕ or a click on the overlay closes it. Tab stays inside.</Filler>
        </Modal>
      </Live>
    </>;
  }

  const Seg = () => <div className="t-body-m-regular" style={{ height: 28, borderRadius: 6, background: 'var(--surface-secondary-alpha)', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', padding: '0 8px' }}>segmented-control slot</div>;
  const Tabs = () => <div className="t-body-m-regular" style={{ height: 40, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', boxShadow: 'inset 0 -1px 0 var(--border-base)' }}>tab-organism slot</div>;
```

### Drawer
```jsx
  IFS_GALLERY.push({ name: 'Drawer', figma: 'drawer-organism (4394:21241)', render: () => <SurfDemoDrawer /> });
  function SurfDemoDrawer() {
    const [open, setOpen] = React.useState(false);
    return <>
      <Row label="Expanded true / false" top>
        <Drawer inline height={709} title="{title}" tabs={<Tabs />} subtitle="{Subtitle}" segmented={<Seg />} />
        <Drawer inline title="{title}" defaultExpanded={false} />
      </Row>
      <Live>
        <Button type="primary" onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer open={open} onOpenChange={setOpen} title="Node details" subtitle="Pump station 4"><Filler>Esc or ✕ closes. Diagonal button collapses to the header.</Filler></Drawer>
      </Live>
    </>;
  }
```

### Panel
```jsx
  IFS_GALLERY.push({ name: 'Panel', figma: 'panel-organism (4305:365421)', render: () => <>
    <Row label="Expanded true / false" top>
      <div style={{ display: 'flex', height: 420, gap: 24 }}>
        <Panel title="{title}" />
        <Panel title="{title}" defaultExpanded={false} />
        <Panel title="{title}" defaultExpanded={false} dot="error" />
        <Panel title="{title}" defaultExpanded={false} dot="warning" />
      </div>
    </Row>
    <Row label="actions + onClose (✕ instead of collapse)" top>
      <div style={{ display: 'flex', height: 240, gap: 24 }}>
        <Panel title="Details" showEvidence={false} onClose={() => {}} actions={<Button type="tertiary" size="s" iconLeft="system-plus">Add</Button>} />
      </div>
    </Row>
    <Row label="live"><span className="t-body-m-regular" style={{ color: 'var(--text-tertiary)' }}>The panels above collapse with |→ and expand from the 48px rail's ←|.</span></Row>
  </> });
```

### Popover
```jsx
  IFS_GALLERY.push({ name: 'Popover', figma: 'popover-organism (4394:56471)', render: () => <>
    <Row label="default" top><Popover inline title="{title}" count={3} search onFilter={() => {}} style={{ height: 360 }} /></Row>
    <Row label="controlled search (clearable)" top><SurfPopoverSearch /></Row>
    <Live>
      <Popover trigger={<Button iconRight="system-chevron-down">16 Documents</Button>} title="Documents" count={16} search onFilter={() => {}}>
        <Filler h={80}>Esc, outside click or ✕ closes.</Filler>
      </Popover>
    </Live>
  </> });
```

### FloatingBar
```jsx
  IFS_GALLERY.push({ name: 'FloatingBar', figma: 'floating-bar-organism (7405:22521)', render: () => <SurfDemoFloatingBar /> });
  function SurfDemoFloatingBar() {
    const [open, setOpen] = React.useState(false);
    const badge = <span className="t-body-m-medium" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 16, padding: '0 6px', borderRadius: 100, background: 'var(--background-color-alpha-red-base)', boxShadow: 'inset 0 0 0 1px var(--border-base)', color: 'var(--text-danger)' }}>● 3</span>;
    return <>
      <Row label="default"><FloatingBar inline category="Folder" item="Item" badge={badge} secondaryAction={{ label: 'View details' }} primaryAction={{ label: 'Study area' }} onClose={() => {}} /></Row>
      <Live>
        <Button type="primary" onClick={() => setOpen(true)}>Select 675 assets</Button>
        <FloatingBar open={open} category="Selected" item="675 assets" secondaryAction={{ label: 'View details' }} primaryAction={{ label: 'Study area' }} onClose={() => setOpen(false)} />
      </Live>
    </>;
  }
}
```

