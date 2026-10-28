import React from 'react';
import { IFS } from '../components/index.js';

const IFS_GALLERY = [];
export default IFS_GALLERY;

{
  const { CommentPin, CommentDrawerCard, CommentMentionMenu, CommentCallout, CommentsPanel } = IFS;
  const Row = ({ label, children, style }) => <div className="g-row" style={style}><span className="g-label t-body-m-regular">{label}</span>{children}</div>;
  const canvasBg = { padding: 24, borderRadius: 8, background: 'var(--background-canvas-primary)', display: 'flex', flexDirection: 'column', gap: 16 };
  const LONG = 'There are people within organizations that have a say in the results of scenarios but are not Copperleaf users. The report from the previous quarter shows it.';

  /* ---------------- data ---------------- */
  const ME = { name: 'Jeff P.', avatar: { initials: 'JP', type: 'black' } };
  const PEOPLE = [
    { name: 'Maria Chen', role: 'Reliability Lead', avatar: { initials: 'MC', type: 'dark-pink' } },
    { name: 'Lara Green', role: 'Field Team Lead', avatar: { initials: 'LG', type: 'green' } },
    { name: 'James Reyes', role: 'Planning Engineer', avatar: { initials: 'JR', type: 'yellow' } },
    { name: 'Katarina Olsson', role: 'Asset Manager', avatar: { initials: 'KO', type: 'blue' } },
  ];
  const P = Object.fromEntries(PEOPLE.map(p => [p.name, p]));
  const c = (id, who, time, text, extra) => ({ id, name: who, time, text, avatar: (P[who] || ME).avatar, ...(who === ME.name ? { you: true } : {}), ...extra });
  const WDRM = 'We need to ensure that the WDRM v4 model is more closely aligned with our portfolio insights, incorporating the latest data and investment priorities to improve decision-making, optimize resource allocation, and enhance the overall accuracy of risk and value assessments.';
  const THREADS = [
    { id: 't56', number: '#56', place: 'Value models', node: 'vm', dx: 150, dy: -6, type: 'action', unread: true, comments: [c('a', 'Maria Chen', '30 min ago', WDRM)] },
    { id: 't55', number: '#55', place: 'Strategic objectives', node: 'so', dx: 40, dy: -8, type: 'question', unread: true, comments: [c('a', 'Lara Green', '1d ago', 'Should we include additional environmental objectives?')] },
    { id: 't53', number: '#53', place: 'Strategic objectives', node: 'soc', dx: 150, dy: -6, type: 'info', comments: [c('a', 'James Reyes', '1d ago', 'The hierarchy could be visually clearer.')] },
    { id: 't50', number: '#50', place: 'Strategic objectives', node: 'fin', dx: 150, dy: -6, type: 'info', comments: [c('a', 'Katarina Olsson', '1d ago', 'Impact of each objective on investments is clearly quantified.')] },
    { id: 't49', number: '#49', place: 'Strategic objectives', node: 'env', dx: 150, dy: -6, type: 'question', comments: [c('a', 'Katarina Olsson', '1d ago', 'Is the effect of every goal on investments precisely measured?'), c('b', 'Lara Green', '1d ago', 'Not yet for habitat impact.')] },
    { id: 't48', number: '#48', place: 'Enterprise goals', node: 'eg', dx: 40, dy: -8, type: 'action', comments: [c('a', 'Maria Chen', '2d ago', 'Enterprise goals should reference the 2027 regulatory targets.')] },
    { id: 't47', number: '#47', place: 'Enterprise goals', node: 'eg', dx: 110, dy: -8, type: 'question', unread: true, comments: [c('a', 'James Reyes', '2d ago', 'Can we add the customer-minutes target here?')] },
    { id: 't46', number: '#46', place: 'Value models', node: 'vm', dx: 40, dy: -8, type: 'action', comments: [c('a', 'Lara Green', '3d ago', 'Carbon footprint v4 needs the latest emissions factors.')] },
    { id: 't45', number: '#45', place: 'Value models', node: 'vm', dx: 95, dy: 96, type: 'info', comments: [c('a', 'Katarina Olsson', '3d ago', 'WDRM v4 weights look different from last quarter.')] },
    { id: 't54', number: '#54', place: 'Enterprise goals', node: 'eg', dx: 170, dy: -8, type: 'question', resolved: true, comments: [c('a', 'Maria Chen', '30 min ago', 'Do these goals reflect the updated business strategy for the upcoming year?')] },
    { id: 't52', number: '#52', place: 'Strategic objectives', node: 'so', dx: 110, dy: -8, type: 'question', resolved: true, comments: [c('a', 'James Reyes', '1d ago', 'Some goals seem overlapping — can we merge or differentiate them?')] },
    { id: 't51', number: '#51', place: 'Strategic objectives', node: 'env', dx: 40, dy: 96, type: 'question', resolved: true, comments: [c('a', 'Lara Green', '1d ago', 'Are all risk factors considered in these goals?'), c('b', ME.name, '1d ago', 'Yes — the risk register was merged last week.')] },
    { id: 't44', number: '#44', place: 'Value models', node: 'vm', dx: 170, dy: 96, type: 'info', resolved: true, comments: [c('a', 'Katarina Olsson', '1d ago', 'The impact of each objective on investments is now documented.'), c('b', 'Maria Chen', '1d ago', 'Thanks!')] },
  ];

  /* ---------------- components ---------------- */
  const preview = { name: '{Name}', time: '{time ago}', text: LONG, replies: '{qty replies}' };
  const UN = { initials: 'UN', type: 'black' }, UN2 = { initials: 'UN', type: 'yellow' };
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

  IFS_GALLERY.push({ name: 'CommentMentionMenu', figma: 'popover-organism + content-card-organism, Mention active [patterns] (12:45774)', render: () => {
    const [i, setI] = React.useState(1);
    return <CommentMentionMenu people={PEOPLE} activeIndex={i} onActiveChange={setI} onPick={p => IFS.toast({ title: `Mention ${p.name}` })} />;
  } });

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

  /* ---------------- pattern screens ---------------- */
  const STAGES = [['home', 'Command'], ['value', 'Value'], ['explore', 'Explore'], ['build', 'Build'], ['plan', 'Plan'], ['results', 'Results']].map(([value, label]) => ({ value, label }));
  const COLS = ['Enterprise Goals', 'Value Framework', 'Strategic Objectives', 'Value Models', 'Measure Output'];
  const TOP = [
    { id: 'eg', type: 'enterprise-goal', title: 'Enterprise Goals', counter: 5 },
    { id: 'vf', type: 'value-framework', title: 'Value Framework v12' },
    { id: 'so', type: 'strategic-objective', title: 'Strategic Objectives', counter: 5, children: [
      { id: 'fin', title: 'Financial', subs: ['Capital expenditure efficiency', 'Operating cost efficiency', 'Rate-case approvability', 'Avoided liability cost', 'Asset lifecycle value'] },
      { id: 'env', title: 'Environmental', subs: ['Direct emissions (Scope 1)', 'Indirect emissions (Scope 2)', 'Habitat impact', 'Renewable integration', 'Resource efficiency'] },
      { id: 'soc', title: 'Social', subs: ['DAC customer reach', 'Affordability burden', 'Worker safety', 'Public safety', 'Community trust'] }] },
    { id: 'vm', type: 'value-model', title: 'Value Models', counter: 7 },
    { id: 'mo', type: 'measure', title: 'Measures', counter: 29 },
  ];
  const NW = 200, NH = 78, STEP = 400, Z = 0.6;
  // World layout for the map: top nodes in a row; the expanded node's children (and their subnodes) open to its right.
  function layout(expanded) {
    const nodes = []; const links = []; let shift = 0;
    TOP.forEach((t, i) => {
      const n = { ...t, x: i * STEP + shift, y: 0, top: t.id }; nodes.push(n);
      if (i > 0) { const p = nodes.find(m => m.id === TOP[i - 1].id); links.push({ from: { x: p.x + NW, y: NH / 2 }, to: { x: n.x, y: NH / 2 } }); }
      if (t.id === expanded && t.children) {
        t.children.forEach((ch, k) => {
          const cn = { id: ch.id, type: 'strategic-objective', title: ch.title, x: n.x + 340, y: (k - 1) * 620, top: t.id }; nodes.push(cn);
          links.push({ from: { x: n.x + NW, y: NH / 2 }, to: { x: cn.x, y: cn.y + NH / 2 } });
          ch.subs.forEach((s, m) => {
            const sn = { id: `${ch.id}-${m}`, type: 'subnode', title: s, x: cn.x + 260, y: cn.y + 100 + m * 92, top: t.id, sub: true }; nodes.push(sn);
            links.push({ from: { x: cn.x + 40, y: cn.y + NH }, to: { x: sn.x, y: sn.y + NH / 2 } });
          });
        });
        shift = 700;
      }
    });
    return { nodes, links };
  }
  const topOf = id => (TOP.find(t => t.id === id || (t.children || []).some(ch => ch.id === id)) || {}).id;
  const placeOf = id => ({ eg: 'Enterprise goals', vf: 'Value framework', so: 'Strategic objectives', vm: 'Value models', mo: 'Measure output' })[topOf(id)] || 'Canvas';

  function CommentsScreen({ initial = THREADS, startPanel = false, startExpanded = null, label }) {
    const st = IFS.useCommentThreads({ defaultThreads: initial });
    const { threads } = st;
    const [panel, setPanel] = React.useState(startPanel);         // panel open = Comments mode (Figma 12:36215)
    const [tab, setTab] = React.useState('unresolved');
    const [expanded, setExpanded] = React.useState(startExpanded);
    const [openId, setOpenId] = React.useState(null);              // the one open callout
    const [draft, setDraft] = React.useState(null);                // { x, y, node, dx, dy } new comment being placed
    const [hoverNode, setHoverNode] = React.useState(null);
    const [mouse, setMouse] = React.useState(null);
    const [view, setView] = React.useState({ x: 120, y: 330, zoom: Z });
    const canvasRef = React.useRef(null);
    const { nodes, links } = layout(expanded);
    const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
    const S = (wx, wy) => ({ x: view.x + wx * view.zoom, y: view.y + wy * view.zoom });
    const inTab = threads.filter(t => (tab === 'resolved') === !!t.resolved);
    const anchor = t => { const n = byId[t.node]; return n ? { x: n.x + (t.dx || 0), y: n.y + (t.dy || 0) } : null; };
    const individual = t => topOf(t.node) === expanded && byId[t.node];
    const focusOn = (t, open = true) => {
      const top = topOf(t.node);
      const lay = layout(top); const n = lay.nodes.find(m => m.id === t.node);
      setExpanded(top);
      if (n) { const ax = n.x + (t.dx || 0), ay = n.y + (t.dy || 0); setView({ zoom: Z, x: 420 - ax * Z, y: 560 - ay * Z }); }
      if (open) { setOpenId(t.id); st.open(t.id); }
      setDraft(null);
    };
    const resolve = t => {
      const nextId = st.resolve(t.id);
      if (openId === t.id) { const next = threads.find(x => x.id === nextId); if (next) focusOn(next); else setOpenId(null); }
    };
    const unresolve = t => st.unresolve(t.id);
    const copyLink = t => { try { navigator.clipboard && navigator.clipboard.writeText(`${location.href.split('#')[0]}#comment-${t.number.slice(1)}`); } catch (e) { /* demo */ } };
    // Keyboard: C toggles Comments mode; Esc cancels a draft, then closes the callout.
    React.useEffect(() => {
      const k = e => {
        if (e.target.closest && e.target.closest('input,textarea,[contenteditable=true]')) return;
        if ((e.key === 'c' || e.key === 'C') && !e.metaKey && !e.ctrlKey) { setPanel(p => !p); setDraft(null); }
        if (e.key === 'Escape') { if (draft) setDraft(null); else setOpenId(null); }
      };
      window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
    }, [draft]);
    // Comments mode: a click on the canvas places a new comment (on a node when one is under the cursor).
    const place = e => {
      const r = canvasRef.current.getBoundingClientRect(); const sx = e.clientX - r.left, sy = e.clientY - r.top;
      const hit = document.elementsFromPoint(e.clientX, e.clientY).map(el => el.closest && el.closest('[data-node-id]')).find(Boolean);
      const wx = (sx - view.x) / view.zoom, wy = (sy - view.y) / view.zoom;
      const nid = hit ? hit.getAttribute('data-node-id') : null; const n = nid && byId[nid];
      const target = n || nodes.reduce((best, m) => (!best || Math.hypot(m.x - wx, m.y - wy) < Math.hypot(best.x - wx, best.y - wy) ? m : best), null);
      setOpenId(null);
      setDraft({ sx, sy, node: target.id, dx: wx - target.x, dy: wy - target.y });
    };
    const send = text => {
      const t = st.add({ place: placeOf(draft.node), node: draft.node, dx: draft.dx, dy: draft.dy, type: 'info',
        comments: [{ id: 'a', name: ME.name, time: 'Just now', text, avatar: ME.avatar, you: true }] });
      if (topOf(draft.node) !== expanded) setExpanded(topOf(draft.node));
      setTab('unresolved'); setDraft(null);
      return t;
    };
    const openThread = threads.find(t => t.id === openId);
    const openAnchor = openThread && individual(openThread) && anchor(openThread);
    const counts = {};
    inTab.forEach(t => { const top = topOf(t.node); if (top !== expanded) (counts[top] = counts[top] || []).push(t); });
    const unreadAny = threads.some(t => t.unread && !t.resolved);

    return (
      <div aria-label={label} style={{ position: 'relative', width: 1440, height: 900, display: 'grid', gridTemplateRows: '48px 1fr', overflow: 'hidden',
        background: 'var(--background-canvas-primary)', border: '1px solid var(--border-base)', boxSizing: 'content-box' }}>
        <IFS.NavBar stages={STAGES} defaultValue="value" hasNotifications user={{ initials: 'JP', name: 'Jeff P.' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', minHeight: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 16, boxShadow: 'inset -1px 0 0 var(--border-base)' }}><IFS.ArrowButton label="Open navigation" /></div>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr 40px', minHeight: 0, minWidth: 0 }}>
            <div style={{ position: 'relative' }}>
              <IFS.PageHeader title="Q1 2027 Strategy Framework" onBack={() => {}} onTitleMenu={() => {}}
                status={<IFS.Indicator type="gray" size="xs">Draft</IFS.Indicator>}
                views={<IFS.SegmentedControl size="s" defaultValue="map" options={[{ value: 'grid', iconLeft: 'node-map' }, { value: 'map', iconLeft: 'map-view-2d' }, { value: 'flow', iconLeft: 'map-views' }]} />}
                actions={<span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ display: 'flex', gap: 4 }}><IFS.Button type="tertiary" size="s" iconLeft="users-group">5/5</IFS.Button>
                    <IFS.CommentButton hasNew={unreadAny} aria-pressed={panel} data-state={panel ? 'pressed' : undefined}
                      onClick={() => { setPanel(!panel); setDraft(null); }} /></span>
                  <IFS.Button type="primary" size="s">Review</IFS.Button></span>} />
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 344 }}>
                <IFS.Stepper steps={[{ label: 'Input' }, { label: 'Shape' }, { label: 'Review' }, { label: 'Approve' }]} current={1} /></div>
            </div>
            <IFS.CanvasHeader columns={COLS} />
            <div ref={canvasRef} style={{ position: 'relative', minHeight: 0, overflow: 'hidden' }}
              onMouseMove={e => { if (!panel) return; const r = canvasRef.current.getBoundingClientRect(); setMouse({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
              onMouseLeave={() => setMouse(null)}>
              <IFS.CanvasBackground style={{ position: 'absolute', inset: 0 }} view={view} onViewChange={setView} minZoom={0.3} maxZoom={1.2}
                overlay={<>
                  {/* node hover action: Expand / Collapse (node-button) */}
                  {hoverNode && !panel && byId[hoverNode] && !byId[hoverNode].sub && (() => { const n = byId[hoverNode]; const p = S(n.x, n.y + NH);
                    return <div style={{ position: 'absolute', left: p.x, top: p.y + 4 }} onMouseEnter={() => setHoverNode(hoverNode)} onMouseLeave={() => setHoverNode(null)}>
                      <IFS.NodeHoverActions type={expanded === n.top ? 'collapse' : 'expand'} onAction={id => {
                        if (id === 'collapse' || expanded === n.top) { setExpanded(null); setView({ x: 120, y: 330, zoom: Z }); }
                        else { setExpanded(n.top); setView({ zoom: Z, x: 380 - n.x * Z, y: 380 - n.y * Z }); }
                        setOpenId(null); setHoverNode(null); }} /></div>; })()}
                  <div style={{ position: 'absolute', left: 14, bottom: 14 }}><IFS.ValueMapButton type="shape"
                    onCollapse={() => { setExpanded(null); setView({ x: 120, y: 330, zoom: Z }); }} onExpand={() => setExpanded('so')} onFit={() => setView({ x: 120, y: 330, zoom: Z })} /></div>
                </>}>
                {links.map((l, i) => <IFS.CanvasConnector key={i} from={l.from} to={l.to} />)}
                {nodes.map(n => <div key={n.id} data-node-id={n.id} style={{ left: n.x, top: n.y }}
                  onMouseEnter={() => setHoverNode(n.id)} onMouseLeave={() => setHoverNode(h => (h === n.id ? null : h))}>
                  <IFS.NodeCard type={n.type} title={n.title} counter={n.counter} selected={openThread && openThread.node === n.id} />
                </div>)}
              </IFS.CanvasBackground>

              {/* Comments mode: the canvas takes the comment cursor; a click places a new comment. */}
              {panel && <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 404, cursor: 'none', zIndex: 1 }}
                onClick={e => { if (e.target === e.currentTarget) place(e); }} aria-label="Click to place a comment" />}
              {panel && mouse && mouse.x < 1392 - 404 && !draft && <span style={{ position: 'absolute', left: mouse.x, top: mouse.y - 32, pointerEvents: 'none', zIndex: 3 }}>
                <IFS.Icon name="cursor-comment" size={32} /></span>}
              <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }} className="g-cm-pins">
              {inTab.filter(individual).map(t => { if (t.id === openId) return null; const a = anchor(t); const p = S(a.x, a.y); const f = t.comments[0];
                return <CommentPin key={`m-${t.id}`} type={t.unread ? 'unread' : 'read'} avatars={[{ name: f.name, ...f.avatar, ...(t.unread ? {} : { type: 'inactive' }) }]}
                  preview={{ name: f.name, time: f.time, text: f.text, replies: t.comments.length > 1 ? `${t.comments.length - 1} ${t.comments.length > 2 ? 'replies' : 'reply'}` : undefined }}
                  style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translateY(-100%)' }} onClick={() => { setDraft(null); setOpenId(t.id); st.open(t.id); }} />; })}
              {Object.entries(counts).map(([top, list]) => { const n = byId[top]; const p = S(n.x + 40, n.y - 8);
                return <CommentPin key={`mc-${top}`} count={list.length} type={tab === 'resolved' || !list.some(t => t.unread) ? 'read' : 'unread'}
                  label={`${list.length} ${tab} comments on ${n.title} — expand`}
                  style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translateY(-100%)' }} onClick={() => focusOn(list[0], false)} />; })}

              </div>
              {draft && <div style={{ position: 'absolute', left: draft.sx, top: draft.sy, transform: 'translateY(-50%)', display: 'flex', gap: 8, alignItems: 'center', width: 420, zIndex: 3 }}>
                <IFS.Icon name="cursor-comment" size={32} />
                <IFS.CommentComposer autoFocus avatar={{ name: ME.name, ...ME.avatar }} onSubmit={send} style={{ flex: 1 }} />
              </div>}

              {openThread && openAnchor && (() => { const p = S(openAnchor.x, openAnchor.y);
                return <CommentCallout thread={openThread} currentUser={ME} people={PEOPLE}
                  style={{ position: 'absolute', left: Math.max(12, Math.min(p.x - 40, 1392 - 404 - 405)), top: p.y + 24, transform: 'translateY(-100%)', maxHeight: Math.max(240, p.y + 12), zIndex: 4 }}
                  onCommentsChange={cm => st.setComments(openThread.id, cm)} onResolve={() => resolve(openThread)} onUnresolve={() => unresolve(openThread)}
                  onCopyLink={() => copyLink(openThread)} onClose={() => setOpenId(null)}
                  cooperSuggestion={openThread.type === 'action' ? { label: 'Shape with Cooper', onClick: () => IFS.toast({ title: 'Shape with Cooper', description: 'Opens Cooper’s recommendations (Cooper pattern).' }) } : undefined} />; })()}

              {panel && <div style={{ position: 'absolute', top: 12, right: 12, bottom: 12, zIndex: 5 }}>
                <CommentsPanel threads={threads} filter={tab} onFilterChange={v => { setTab(v); setOpenId(null); }} selectedId={openId} currentUser={ME}
                  onOpen={t => focusOn(t)} onResolve={resolve} onUnresolve={unresolve} onCopyLink={copyLink} onClose={() => { setPanel(false); setDraft(null); }} />
              </div>}
            </div>
            <IFS.BottomSheet type="value" style={{ position: 'relative' }} documents={{ label: '3 Documents', icon: 'system-file' }} onUpload={() => {}}
              prompts={['Walk me through this framework', 'What hasn’t been updated in a while?']} />
          </div>
        </div>
      </div>
    );
  }

  IFS_GALLERY.push({ name: 'Pattern: Commenting on the canvas', figma: 'Map - Overview - Comments panel unresolved / Comment open / Sent [patterns] (12:34047)', render: () =>
    <CommentsScreen startPanel label="Framework map with the Comments panel open" /> });
  IFS_GALLERY.push({ name: 'Pattern: Comments — expanded node', figma: 'Map - Overview - Expanded [patterns] (12:34527)', render: () =>
    <CommentsScreen startPanel startExpanded="so" label="Strategic objectives expanded with author pins" /> });
  IFS_GALLERY.push({ name: 'Pattern: Comments — panel closed', figma: 'Map - Overview - Hover [patterns] (12:33982)', render: () =>
    <CommentsScreen label="Framework map, Comments panel closed (press C or the comment button)" /> });
  IFS_GALLERY.push({ name: 'Pattern: Comments — all resolved', figma: 'Map - Overview - All resolved [patterns] (12:34368)', render: () =>
    <CommentsScreen startPanel initial={THREADS.map(t => ({ ...t, resolved: true, unread: false }))} label="Every comment resolved" /> });
  IFS_GALLERY.push({ name: 'Pattern: Comments panel — search and empty states', figma: 'Map - Overview - Comment search result / no results [patterns] (12:34132, 12:34205)', render: () => {
    const [ts, setTs] = React.useState(THREADS);
    const [sel, setSel] = React.useState(null);
    return <div style={{ display: 'flex', gap: 24, alignItems: 'stretch', height: 720, background: 'var(--background-canvas-primary)', padding: 12, borderRadius: 8 }}>
      <CommentsPanel threads={ts} selectedId={sel} currentUser={ME} onOpen={t => { setSel(t.id); setTs(ts.map(x => x.id === t.id ? { ...x, unread: false } : x)); }}
        onResolve={t => setTs(ts.map(x => x.id === t.id ? { ...x, resolved: true, unread: false } : x))} onUnresolve={t => setTs(ts.map(x => x.id === t.id ? { ...x, resolved: false } : x))} />
      <div className="t-body-m-regular" style={{ color: 'var(--text-tertiary)', maxWidth: 280 }}>
        Try “Find comments about WDRM v4”, “Show me everything about WDRM v65” (no result → suggestion chip), “action required”, or “Lara”.
        Resolve every row to reach the all-resolved state.</div>
      <CommentsPanel threads={[]} currentUser={ME} />
    </div>;
  } });
}
