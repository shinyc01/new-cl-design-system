import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { Button, IconButton } = IFS;
  const states = [undefined, 'hover', 'pressed', 'focus'];
  const Row = ({ label, children }) => <div className="g-row"><span className="g-label t-body-m-regular">{label}</span>{children}</div>;

  IFS_GALLERY.push({ name: 'Button', figma: 'button (65:3211)', render: () => <>
    {['primary', 'secondary', 'tertiary', 'ghost', 'cooper'].map(t => (
      <Row key={t} label={t}>
        {states.map(s => <Button key={s || 'default'} type={t} state={s} iconLeft="system-star-favourite" iconRight="system-heart">{s || 'Default'}</Button>)}
        <Button type={t} disabled iconLeft="system-star-favourite">Disabled</Button>
      </Row>
    ))}
    <Row label="sizes l / m / s">{['l', 'm', 's'].map(z => <Button key={z} type="primary" size={z} iconLeft="system-star-favourite" iconRight="system-heart">Label</Button>)}</Row>
  </> });

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
}
