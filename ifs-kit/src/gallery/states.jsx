import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { EmptyState, Spinner, LoadingMore, ProgressLoading, Skeleton, LoadingRegion, FtaButton, PromptButton, CooperChip, BottomSheet, Button, StatCard } = IFS;
  const states = [undefined, 'hover', 'pressed', 'focus'];
  const Row = ({ label, children }) => <div className="g-row"><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const Cell = ({ title, children, h }) => (
    <div style={{ width: 376, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span className="t-label-m-medium" style={{ color: 'var(--text-tertiary)' }}>{title}</span>
      <div style={{ minHeight: h, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
    </div>
  );
  const grid = { display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 24 };

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

  IFS_GALLERY.push({ name: 'Spinner', figma: 'empty-state-spinner-molecule (3782:24081)', render: () => <>
    <Row label="show-text"><Spinner /><Spinner showText={false} /></Row>
  </> });

  IFS_GALLERY.push({ name: 'LoadingMore', figma: 'empty-state-loading-more-molecule (3782:24082)', render: () => <Row label="default"><LoadingMore /></Row> });

  IFS_GALLERY.push({ name: 'ProgressLoading', figma: 'progress-bar-loading (5530:11867)', render: () => <Row label="value">{[0, 60, 100].map(v => <ProgressLoading key={v} value={v} />)}</Row> });

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

  IFS_GALLERY.push({ name: 'PromptButton', figma: 'prompt-button (67:2937)', render: () => <>
    {['l', 'm'].map(z => (
      <Row key={z} label={`size=${z}`}>
        {states.map(s => <PromptButton key={s || 'default'} size={z} state={s}>{'{prompt-label}'}</PromptButton>)}
        <PromptButton size={z} disabled>{'{prompt-label}'}</PromptButton>
      </Row>
    ))}
  </> });

  IFS_GALLERY.push({ name: 'CooperChip', figma: 'cooper-chip-atom (3501:23480)', render: () => <Row label="states">
    <CooperChip />
    <CooperChip state="hover" />
    <CooperChip state="focus" />
    <CooperChip defaultSelected />
    <CooperChip disabled />
  </Row> });

  const prompts = ['Compare to peer', 'Compare to best practice'];
  const Labeled = ({ label, children }) => <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span className="g-label t-body-m-regular" style={{ width: 'auto' }}>{label}</span>{children}</div>;
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
