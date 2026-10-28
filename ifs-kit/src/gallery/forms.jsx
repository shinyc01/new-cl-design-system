import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { TextField, TextArea, Search, Checkbox, Radio, RadioGroup, Switch } = IFS;
  const Row = ({ label, children }) => <div className="g-row" style={{ alignItems: 'flex-start' }}><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const W = { width: 384 };
  const long = 'hat’s how our current pricing model impacts different companies';
  const fieldStates = (C, size) => [
    ['default', {}],
    ['hover', { state: 'hover' }],
    ['focus / typing', { state: 'typing', defaultValue: 'place' }],
    ['filled', { defaultValue: 'placeholder' }],
    ['overflow', { defaultValue: long }],
    ['error', { error: true, defaultValue: 'placeholder' }],
    ['disabled', { disabled: true, defaultValue: 'placeholder' }],
    ['focus (keyboard)', { state: 'focus' }],
    ['cooper', { cooper: true }],
    ['cooper generating', { generating: true, defaultValue: 'place' }],
  ].map(([n, p]) => (
    <Row key={n} label={n}>
      {['l', 'm'].map(z => <C key={z} size={z} style={W} label="{heading-input}" hint="More info" placeholder="{placeholder}" description="{text}" {...p} />)}
    </Row>
  ));

  IFS_GALLERY.push({ name: 'TextField', figma: 'text-field-organism (210:77559)', render: () => <>
    {fieldStates(TextField)}
    <Row label="icons + suffix">
      <TextField style={W} label="Amount" iconLeft="system-star-favourite" iconRight="system-heart" suffix="USD" placeholder="0.00" />
      <TextField size="m" style={W} label="Amount" iconLeft="system-star-favourite" iconRight="system-heart" suffix="USD" placeholder="0.00" />
    </Row>
    <Row label="error message"><TextField style={W} label="Email" defaultValue="not-an-email" error="Enter a valid email address" /></Row>
  </> });

  IFS_GALLERY.push({ name: 'TextArea', figma: 'text-area-organism (3024:9383)', render: () => <>
    {fieldStates(TextArea)}
  </> });

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

  const cbStates = [undefined, 'hover', 'pressed', 'focus'];
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
}
