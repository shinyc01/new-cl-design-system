import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { CircularButton, CircularMenu, NotificationButton, CommentButton, FilterButton, ArrowButton, Counter, Hotkey, ScrollArea, ScrollBar,
    PhoneField, Slider, FormCard, IconPicker, Weekday, Weekdays, Logo } = IFS;
  const Row = ({ label, children }) => <div className="g-row"><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const dirs = ['left', 'right', 'top', 'bottom'];
  const acts = n => [
    { direction: 'left', label: '{label}', hotkey: '⌘/' }, { direction: 'right', label: '{label}', hotkey: '⌘/' },
    { direction: 'top', label: '{label}', hotkey: '⌘/' }, { direction: 'bottom', label: '{label}', hotkey: '⌘/' },
  ].slice(0, n);

  IFS_GALLERY.push({ name: 'CircularButton', figma: 'circular-button-molecule (72:9983)', render: () => <>
    {[undefined, 'hover', 'pressed', 'disabled', 'focus'].map(s => (
      <Row key={s || 'default'} label={s || 'default'}>
        {dirs.map(d => <CircularButton key={d} direction={d} hotkey="⌘/" state={s === 'disabled' ? undefined : s} disabled={s === 'disabled'}>{'{label}'}</CircularButton>)}
      </Row>
    ))}
  </> });

  IFS_GALLERY.push({ name: 'CircularMenu', figma: 'circular-button-organism (72:10235)', render: () => <>
    <Row label="4 / 3 / 2 buttons">{[4, 3, 2].map(n => <CircularMenu key={n} actions={acts(n)} />)}</Row>
    <Row label="hover">{dirs.map(d => <CircularMenu key={d} actions={acts(4)} hover={d} />)}</Row>
    <Row label="live (Mod+1…4)"><CircularMenu actions={[
      { direction: 'top', label: 'Expand', hotkey: '⌘1', shortcut: 'Mod+1' }, { direction: 'right', label: 'Connect', hotkey: '⌘2', shortcut: 'Mod+2' },
      { direction: 'bottom', label: 'Collapse', hotkey: '⌘3', shortcut: 'Mod+3' }, { direction: 'left', label: 'Back', hotkey: '⌘4', shortcut: 'Mod+4', disabled: true },
    ]} onSelect={a => console.log('CircularMenu', a.label)} /></Row>
  </> });

  IFS_GALLERY.push({ name: 'Icon-button presets', figma: 'icon-button-notification (357:53417), -comment (2563:8153), -filter (6955:768), -arrow (6349:61950)', render: () => <>
    {[['notification', NotificationButton], ['comment', CommentButton], ['filter', FilterButton], ['arrow', ArrowButton]].map(([k, C]) => (
      <Row key={k} label={k}><C hasNew /><C /><C hasNew state="focus" /><C state="focus" /></Row>
    ))}
    <Row label="arrow ←| (direction left; ghost on a panel rail)"><ArrowButton direction="left" hasNew /><ArrowButton direction="left" dot="warning" />
      <ArrowButton direction="left" type="ghost" hasNew /><ArrowButton direction="left" type="ghost" dot="warning" /><ArrowButton direction="left" type="ghost" /></Row>
    <Row label="filter round (28)"><FilterButton shape="round" /><FilterButton shape="round" hasNew /><FilterButton shape="round" state="focus" /></Row>
  </> });

  IFS_GALLERY.push({ name: 'Counter', figma: 'counter-atom (88:24147)', render: () => <>
    <Row label="S (18)"><Counter>3</Counter><Counter>128</Counter><Counter indicator>3</Counter></Row>
    <Row label="M (24)"><Counter size="m">3</Counter><Counter size="m">128</Counter><Counter size="m" indicator>3</Counter></Row>
  </> });

  IFS_GALLERY.push({ name: 'Hotkey', figma: 'hotkey-atom (67:6150)', render: () => <Row label="default"><Hotkey /><Hotkey>⌘K</Hotkey><Hotkey>⇧⌘P</Hotkey></Row> });

  IFS_GALLERY.push({ name: 'ScrollArea', figma: 'scroll-bar-atom (83:57650)', render: () => <>
    <Row label="atom top / center / bottom">{['top', 'center', 'bottom'].map(l => <ScrollBar key={l} location={l} height={200} />)}</Row>
    <Row label="ScrollArea"><ScrollArea height={160} label="Example list" style={{ width: 240 }}>
      {Array.from({ length: 20 }, (_, i) => <div key={i} className="t-body-m-regular" style={{ padding: '6px 8px' }}>Row {i + 1}</div>)}
    </ScrollArea></Row>
  </> });

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

  IFS_GALLERY.push({ name: 'IconPicker', figma: 'icon-picker-atom (210:77686), icon-picker-organism (5434:16926)', render: () => <>
    <Row label="atom states"><IconPicker bare icons={['system-book']} /><IconPicker bare icons={['system-book']} itemState={{ 'system-book': 'hover' }} />
      <IconPicker bare icons={['system-book']} defaultValue="system-book" /><IconPicker bare icons={['system-book']} itemState={{ 'system-book': 'focus' }} /></Row>
    <Row label="organism"><IconPicker defaultValue="chat-folder" /></Row>
    <Row label="in Popover"><IFS.Popover title="Choose folder icon" trigger={<IFS.Button iconLeft="chat-folder">Folder icon</IFS.Button>}><IconPicker bare defaultValue="chat-folder" /></IFS.Popover></Row>
  </> });

  IFS_GALLERY.push({ name: 'Weekday', figma: 'weekday-atom (2704:74414)', render: () => <>
    <Row label="atom"><Weekday>Wed</Weekday></Row>
    <Row label="row (Mon start)"><Weekdays /></Row>
    <Row label="row (Sun start)"><Weekdays weekStartsOn={0} /></Row>
  </> });

  IFS_GALLERY.push({ name: 'Logo', figma: 'logo (788:52389) in global-header (69:3736)', render: () => <>
    <Row label="default 156×30"><Logo /></Row>
    <Row label="height 24"><Logo height={24} /></Row>
  </> });
}
