import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { Tooltip, Alert, Snackbar, Modal, Drawer, Panel, Popover, FloatingBar, Overlay, Button, IconButton } = IFS;
  const Row = ({ label, children, top }) => <div className="g-row" style={top ? { alignItems: 'flex-start' } : undefined}><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const Live = ({ children }) => <Row label="live">{children}</Row>;
  const Filler = ({ h = 120, children }) => <div className="t-body-m-regular" style={{ color: 'var(--text-tertiary)', minHeight: h }}>{children}</div>;
  const Black = ({ children }) => <div style={{ background: '#000', padding: 16, display: 'flex', gap: 24, alignItems: 'center' }}>{children}</div>;

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

  IFS_GALLERY.push({ name: 'Snackbar', figma: 'snackbar-organism (3795:29459)', render: () => <>
    <Row label="default"><Snackbar title="{title}" secondaryAction={{ label: '{label}' }} primaryAction={{ label: '{label}' }}>placeholder</Snackbar></Row>
    <Row label="minimal"><Snackbar title="Investment saved">Changes are live for your team.</Snackbar></Row>
    <Row label="action iconLeft"><Snackbar title="Widget removed" secondaryAction={{ label: 'Undo', iconLeft: 'arrow-back-up' }} /></Row>
    <Live><Button type="primary" onClick={() => IFS.toast({ title: 'Investment archived', description: 'Moved to Archive.', primaryAction: { label: 'Undo' } })}>Show toast</Button></Live>
  </> });

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

  function SurfPopoverSearch() {
    const [q, setQ] = React.useState('north');
    const rows = ['Northgate substation', 'North river crossing', 'Southfield depot'].filter(r => r.toLowerCase().includes(q.toLowerCase()));
    return <Popover inline title="Documents" count={rows.length} search searchValue={q} onSearchChange={setQ} showClose={false}>
      {rows.map(r => <div key={r} className="t-body-m-regular">{r}</div>)}
    </Popover>;
  }
  IFS_GALLERY.push({ name: 'Popover', figma: 'popover-organism (4394:56471)', render: () => <>
    <Row label="default" top><Popover inline title="{title}" count={3} search onFilter={() => {}} style={{ height: 360 }} /></Row>
    <Row label="controlled search (clearable)" top><SurfPopoverSearch /></Row>
    <Live>
      <Popover trigger={<Button iconRight="system-chevron-down">16 Documents</Button>} title="Documents" count={16} search onFilter={() => {}}>
        <Filler h={80}>Esc, outside click or ✕ closes.</Filler>
      </Popover>
    </Live>
  </> });

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
