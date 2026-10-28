import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { Menu, Select, MultiSelect, Combobox, SegmentedControl, Chip, Calendar, DatePicker } = IFS;
  const Row = ({ label, children, style }) => <div className="g-row" style={style}><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const LONG = 'Scenario Pricing Model Affected by Various Customer segments';
  const OPTS = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', LONG].map((l, i) => ({ value: i + 1, label: l }));
  const W = { width: 220 };
  const sizes = ['s', 'm', 'l', 'xl'];
  const triggerStates = [
    ['default', {}], ['hover', { state: 'hover' }], ['focus', { state: 'focus' }], ['open', { state: 'open' }],
    ['loading', { loading: true, defaultValue: 1 }], ['filled', { defaultValue: 1 }], ['overflow', { defaultValue: 9 }],
    ['error', { error: true }], ['disabled', { disabled: true }],
  ];

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

  const seg = (n, extra = {}) => ['Overview', 'Details', 'History', 'Files', 'Notes'].slice(0, n).map((l, i) => ({ value: i, label: l, iconLeft: 'system-star-favourite', iconRight: 'system-heart', counter: 3, ...extra }));
  IFS_GALLERY.push({ name: 'SegmentedControl', figma: 'segmented-control-organism (1387:244501) · segmented-control-atom (1387:244511)', render: () => <>
    {[2, 3, 4, 5].map(n => <Row key={n} label={`number ${n}`}><SegmentedControl size="m" options={seg(n)} /><SegmentedControl size="s" options={seg(n)} /></Row>)}
    {['m', 's'].map(z => <Row key={z} label={`states ${z}`}>
      {[undefined, 'hover', 'pressed', 'focus'].map(s => <SegmentedControl key={s || 'd'} size={z} defaultValue={0} options={[{ value: 0, label: 'label', iconLeft: 'system-star-favourite', iconRight: 'system-heart', counter: 3, state: s }, { value: 1, label: 'label', iconLeft: 'system-star-favourite', iconRight: 'system-heart', counter: 3, state: s }]} />)}
      <SegmentedControl size={z} defaultValue={0} options={[{ value: 0, label: 'label', counter: 3, disabled: true }, { value: 1, label: 'label', counter: 3, disabled: true }]} />
    </Row>)}
    <Row label="fullWidth (355)"><div style={{ width: 355 }}><SegmentedControl size="s" fullWidth options={[{ value: 0, label: 'Versions' }, { value: 1, label: 'Approvals', counter: 2 }]} /></div></Row>
  </> });

  const MENU = [
    { title: 'Actions' },
    { label: 'Rename', icon: 'system-edit-rename', shortcut: '⌘R' },
    { label: 'Duplicate', icon: 'duplicate', shortcut: '⌘D' },
    { label: 'Compare', icon: 'compare', disabled: true, reason: 'Compare needs two versions' },
    { label: 'Pinned', icon: 'chat-pin', selected: true },
    { divider: true },
    { label: 'Delete', icon: 'system-trash-delete', danger: true },
  ];
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

  const feb = new Date(2026, 1, 1);
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
}
