import React from 'react';
import { createPortal } from 'react-dom';
import { IFS } from './registry.js';

// Collaboration pattern (IFS Design System Patterns › "Collaboration" 12:8435).
// Owner invites people to a framework, sets Editor/Viewer access, removes them, and nudges people who haven't accepted.
// New IFS DS component here: cursor-atom (CollaboratorCursor). Everything else composes kit components.

const ccx = (...a) => a.filter(Boolean).join(' ');
const useCtl = (value, def, onChange) => {
  const [inner, setInner] = React.useState(def);
  const ctl = value !== undefined;
  return [ctl ? value : inner, React.useCallback((v, ...r) => { if (!ctl) setInner(v); onChange && onChange(v, ...r); }, [ctl, onChange])];
};

// Avatar colour type → collaboration/user-N (same mapping as the Avatar CSS), so a person's cursor matches their avatar.
const USER_OF_AVATAR = { 'dark-orange': 1, 'dark-blue': 2, green: 3, 'light-blue': 4, 'dark-pink': 5, lime: 6, orange: 7, 'dark-purple': 8,
  brown: 9, blue: 10, 'light-purple': 11, red: 12, yellow: 13, purple: 14, 'light-pink': 15, black: 16 };
const collaborationUser = avatarType => USER_OF_AVATAR[avatarType] || 16;

// ───────────────────────────── cursor-atom ─────────────────────────────
// Figma: cursor-atom (55:1645; set key 80c816a4…) — live multiplayer cursor: cursor-pointer + name pill.
// Props: user 1…16 | "cooper" (Figma User; pill = collaboration/user-N, Cooper = user-9 + Cooper visual), name (Figma "user name"),
//   x / y (px; when given the cursor is absolutely positioned and glides between positions), label (accessible name).
// Users 4, 6, 11, 13, 15 use dark text (text/primary-inverse), as in Figma.
const DARK_TEXT = [4, 6, 11, 13, 15];
function CollaboratorCursor({ user = 1, name, x, y, className, style, ...rest }) {
  const cooper = user === 'cooper';
  const n = cooper ? 9 : Math.min(16, Math.max(1, +user || 1));
  const placed = x != null || y != null;
  return (
    <span role="img" aria-label={`${cooper ? 'Cooper' : name}'s cursor`} {...rest}
      className={ccx('ifs-cursor', `ifs-cursor--u${n}`, cooper && 'ifs-cursor--cooper', DARK_TEXT.includes(n) && !cooper && 'ifs-cursor--dark', placed && 'ifs-cursor--placed', className)}
      style={placed ? { transform: `translate(${x || 0}px, ${y || 0}px)`, ...style } : style}>
      <IFS.Icon name="cursor-pointer" size={16} className="ifs-cursor__pointer" />
      <span className="ifs-cursor__pill">
        {cooper && <IFS.Icon name="cooper-visual-icon" variant="rectangle" size={18} className="ifs-cursor__visual" />}
        {cooper && <IFS.Icon name="cooper-system-icon" variant="Default" size={10} className="ifs-cursor__cooper" />}
        <span className="ifs-cursor__name">{cooper ? (name || 'Cooper') : name}</span>
      </span>
    </span>
  );
}

// ───────────────────────────── LiveCursors ─────────────────────────────
// Pattern component: layer over a canvas that shows the cursors of the other people who are online.
// Props: users [{ id, name, avatar: { type } | user }], simulate (default true: each cursor wanders between random points,
//   like a remote user moving; pass positions instead to drive them from real presence data), positions { [id]: { x, y } }, interval (ms).
// The current user never sees their own cursor (inferred).
function LiveCursors({ users = [], simulate = true, positions, interval = 1400, className, style }) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({});
  const key = users.map(u => u.id).join('|');
  React.useEffect(() => {
    if (!simulate || positions) return undefined;
    const el = ref.current; if (!el) return undefined;
    const rnd = () => { const w = el.clientWidth || 800, h = el.clientHeight || 500;
      return { x: Math.round(40 + Math.random() * Math.max(0, w - 160)), y: Math.round(30 + Math.random() * Math.max(0, h - 90)) }; };
    const all = () => Object.fromEntries(users.map(u => [u.id, rnd()]));
    setPos(all());
    const t = setInterval(() => setPos(p => {
      const next = { ...p };
      users.forEach(u => { if (Math.random() < 0.7 || !next[u.id]) { const r = rnd(), o = next[u.id] || r;
        next[u.id] = { x: Math.round(o.x + (r.x - o.x) * 0.45), y: Math.round(o.y + (r.y - o.y) * 0.45) }; } });
      return next;
    }), interval);
    return () => clearInterval(t);
  }, [key, simulate, positions, interval]);
  const at = positions || pos;
  return (
    <div ref={ref} className={ccx('ifs-live-cursors', className)} style={style} aria-label="People on this framework now">
      {users.map(u => at[u.id] && <CollaboratorCursor key={u.id} name={u.name}
        user={u.user || (u.cooper ? 'cooper' : collaborationUser(u.avatar && u.avatar.type))} x={at[u.id].x} y={at[u.id].y}
        style={{ transitionDuration: `${interval}ms` }} />)}
    </div>
  );
}

// ───────────────────────────── CollaboratorsButton ─────────────────────────────
// Pattern component: the "who's in" indicator in the page header — button Tertiary S, users-group icon, "accepted/invited".
// Props: accepted, invited (both include the owner: owner only = 1/1), plus Button props (onClick…).
function CollaboratorsButton({ accepted = 1, invited = 1, className, ...rest }) {
  return (
    <IFS.Button type="tertiary" size="s" iconLeft="users-group" className={ccx('ifs-collab-button', className)}
      aria-label={`Collaborators: ${accepted} of ${invited} joined`} {...rest}>{`${accepted}/${invited}`}</IFS.Button>
  );
}

// ───────────────────────────── RoleSelect ─────────────────────────────
// Pattern component: access control on a collaborator row = single-select-atom (M, drawn 24 tall in Figma) +
// single-select-list-molecule: Editor / Viewer, divider, Remove.
// Props: value / defaultValue / onChange(role) ('editor' | 'viewer'), onRemove (adds the Remove item), disabled, label.
const ROLE_LABEL = { editor: 'Editor', viewer: 'Viewer', owner: 'Owner' };
function RoleSelect({ value, defaultValue = 'editor', onChange, onRemove, disabled, label = 'Access', className }) {
  const [val, setVal] = useCtl(value, defaultValue, onChange);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const ref = React.useRef(null);
  const items = [{ value: 'editor', label: 'Editor' }, { value: 'viewer', label: 'Viewer' }, ...(onRemove ? [{ value: '__remove', label: 'Remove' }] : [])];
  React.useEffect(() => {
    if (!open) return undefined;
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  const pick = it => { setOpen(false); if (it.value === '__remove') onRemove && onRemove(); else if (it.value !== val) setVal(it.value); };
  const onKey = e => {
    if (disabled) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!open) { setOpen(true); setActive(Math.max(0, items.findIndex(i => i.value === val))); }
      else setActive(a => (a + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (open && active >= 0) pick(items[active]); else { setOpen(!open); setActive(items.findIndex(i => i.value === val)); } }
    else if (e.key === 'Escape' && open) { e.preventDefault(); e.stopPropagation(); setOpen(false); }
    else if (e.key === 'Tab') setOpen(false);
  };
  return (
    <div ref={ref} className={ccx('ifs-role-select', className)} onClick={e => e.stopPropagation()}>
      <div role="combobox" tabIndex={disabled ? -1 : 0} aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-disabled={disabled || undefined}
        className={ccx('ifs-role-select__trigger', open && 'is-open', disabled && 'is-disabled')}
        onClick={() => { if (!disabled) { setOpen(!open); setActive(-1); } }} onKeyDown={onKey}>
        <span className="ifs-role-select__value">{ROLE_LABEL[val] || val}</span>
        <IFS.Icon name={open ? 'arrow-caret-up-filled' : 'arrow-caret-down-filled'} size={12} />
      </div>
      {open && <div role="listbox" className="ifs-role-select__list" onMouseDown={e => e.preventDefault()}>
        {items.map((it, i) => <React.Fragment key={it.value}>
          {it.value === '__remove' && <div role="separator" className="ifs-role-select__divider" />}
          <div role="option" aria-selected={it.value === val} className={ccx('ifs-role-select__option', it.value === val && 'is-selected', i === active && 'is-active')}
            onClick={() => pick(it)} onMouseEnter={() => setActive(i)}>
            <span>{it.label}</span>{it.value === val && <IFS.Icon name="system-check" size={12} />}
          </div>
        </React.Fragment>)}
      </div>}
    </div>
  );
}

// ───────────────────────────── CollaboratorRow ─────────────────────────────
// Pattern component: one person in the panel = content-card-organism (Size=M, 40 tall) with its top slot:
// avatar M (dashed "Awaiting" avatar while the invite is open; online dot = risk-atom Online), name (+ " (you)"), job role,
// then one control on the right.
// Props: person { id, name, initials, title (job role), avatar: Avatar props, access, status owner|joined|awaiting|suggested|directory, online, you },
//   control owner | role | add | none (default from status), onOpen (row click: open the brief), onAdd, onRoleChange(role), onRemove,
//   push available | notified (awaiting rows: bell icon-button / disabled "Notified"), onPush, state hover (forced, gallery).
function CollaboratorRow({ person, control, onOpen, onAdd, onRoleChange, onRemove, push, onPush, state, className }) {
  const p = person;
  const ctl = control || (p.status === 'owner' ? 'owner' : (p.status === 'joined' || p.status === 'awaiting') ? 'role' : 'add');
  const avatar = p.status === 'awaiting' ? { ...p.avatar, type: 'awaiting' } : p.avatar;
  const click = ctl === 'add' ? onAdd : onOpen;
  return (
    <div className={ccx('ifs-collab-row', ctl === 'add' && 'ifs-collab-row--add', className)} data-state={state}
      role={click ? 'button' : undefined} tabIndex={click ? 0 : undefined}
      onClick={click ? () => click(p) : undefined}
      onKeyDown={click ? e => { if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) { e.preventDefault(); click(p); } } : undefined}>
      <div className="ifs-collab-row__who">
        <IFS.Avatar size="m" name={p.name} initials={p.initials} status={p.online && p.status !== 'awaiting' ? 'online' : undefined} {...avatar} />
        <div className="ifs-collab-row__text">
          <span className="ifs-collab-row__name">{p.name}{p.you ? ' (you)' : ''}</span>
          <span className="ifs-collab-row__title">{p.title}</span>
        </div>
      </div>
      {push === 'available' && <IFS.IconButton type="tertiary" size="s" icon="system-notification" label="Send a reminder"
        onClick={e => { e.stopPropagation(); onPush && onPush(p); }} />}
      {push === 'notified' && <IFS.Button type="tertiary" size="s" iconLeft="system-notification" disabled onClick={e => e.stopPropagation()}>Notified</IFS.Button>}
      {ctl === 'owner' && <IFS.Badge color="white" size="m">Owner</IFS.Badge>}
      {ctl === 'role' && <RoleSelect value={p.access || 'editor'} onChange={r => onRoleChange && onRoleChange(p, r)} onRemove={onRemove ? () => onRemove(p) : undefined}
        label={`${p.name} access`} />}
      {ctl === 'add' && <IFS.IconButton type="ghost" size="s" icon="system-plus" label={`Invite ${p.name}`} className="ifs-collab-row__add"
        onClick={e => { e.stopPropagation(); onAdd && onAdd(p); }} />}
    </div>
  );
}

// Section of the panel: H4 UPPER heading (text/secondary, or the Cooper gradient + cooper dots for Cooper suggestions) + rows.
function CollaboratorSection({ title, cooper, children }) {
  return (
    <section className="ifs-collab-section">
      <h3 className={ccx('ifs-collab-section__title', cooper && 'ifs-collab-section__title--cooper')}>
        {cooper && <IFS.Icon name="cooper-system-icon" variant="Insight" size={14} />}<span>{title}</span>
      </h3>
      <div className="ifs-collab-section__list">{children}</div>
    </section>
  );
}

// ───────────────────────────── useCollaboration ─────────────────────────────
// Pattern hook: the collaboration state of one record (framework). Returns lists, counts and actions.
// Options: people [{ ...person, status owner|joined|awaiting, access, brief, notifiedAt (ms) }] — exactly one owner, who is the current user;
//   suggested (Cooper's suggestions), directory (everyone who can be invited), recent (recently invited elsewhere),
//   roles (job roles for the filter), brief(person) → default Cooper brief text, now() (clock, for the 24 h push lock).
// Rules enforced: the owner is always present (no empty panel) and cannot be removed or re-roled; an invite reuses one person once;
//   a push is possible 24 h after the last notification (sending the invite counts); push never changes the counts.
const DAY = 24 * 3600 * 1000;
function useCollaboration({ people: init = [], suggested: sugInit = [], directory = [], recent = [], roles, brief = () => '', now = () => Date.now() } = {}) {
  const [people, setPeople] = React.useState(init);
  const [suggested, setSuggested] = React.useState(sugInit);
  const owner = people.find(p => p.status === 'owner');
  const joined = people.filter(p => p.status === 'joined');
  const awaiting = people.filter(p => p.status === 'awaiting');
  const inIds = new Set(people.map(p => p.id));
  const invitable = list => list.filter(p => !inIds.has(p.id));
  const upd = (id, f) => setPeople(ps => ps.map(p => (p.id === id ? { ...p, ...f(p) } : p)));
  return {
    people, owner, joined, awaiting,
    members: [owner, ...joined].filter(Boolean),
    suggested: invitable(suggested), directory: invitable(directory), recent: invitable(recent),
    roles: roles || [...new Set(directory.map(p => p.title))],
    accepted: 1 + joined.length, invited: 1 + joined.length + awaiting.length,
    defaultBrief: brief,
    invite(person, access = 'editor', text) {
      if (inIds.has(person.id)) return;
      setPeople(ps => [...ps, { ...person, status: 'awaiting', access, brief: text != null ? text : brief(person), notifiedAt: now(), online: false }]);
      setSuggested(s => s.filter(p => p.id !== person.id));
    },
    setAccess(id, access) { upd(id, p => (p.status === 'owner' ? {} : { access })); },
    setBrief(id, text, access) { upd(id, p => ({ brief: text, ...(access && p.status !== 'owner' ? { access } : {}) })); },
    remove(id) { setPeople(ps => ps.filter(p => p.id !== id || p.status === 'owner')); },
    canPush: p => p.status === 'awaiting' && now() - (p.notifiedAt || 0) >= DAY,
    pushState: p => (p.status !== 'awaiting' ? undefined : now() - (p.notifiedAt || 0) >= DAY ? 'available' : p.pushedAt ? 'notified' : undefined),
    push(id) { const t = now(); upd(id, p => (p.status === 'awaiting' && t - (p.notifiedAt || 0) >= DAY ? { notifiedAt: t, pushedAt: t } : {})); },
    accept(id, online = true) { upd(id, p => (p.status === 'awaiting' ? { status: 'joined', online } : {})); },
    setOnline(id, online) { upd(id, () => ({ online })); },
    reset(next, sug) { setPeople(next); if (sug) setSuggested(sug); },
  };
}

// ───────────────────────────── InviteCollaboratorModal ─────────────────────────────
// Pattern component: modal-organism "Add Collaborator": person (content card, avatar L 40) + access select,
// "Brief by Cooper" (cooper dots + gradient H4) + text-area-organism M with Cooper's brief for this person, editable.
// Props: open, person, mode invite (Send invitation) | edit (Save; disabled until something changes), defaultAccess, defaultBrief,
//   onCancel, onSubmit({ access, brief }), inline (card only — gallery).
function InviteCollaboratorModal({ open, person, mode = 'invite', defaultAccess = 'editor', defaultBrief = '', onCancel, onSubmit, inline }) {
  const [access, setAccess] = React.useState(defaultAccess);
  const [text, setText] = React.useState(defaultBrief);
  React.useEffect(() => { if (open) { setAccess(defaultAccess); setText(defaultBrief); } }, [open, person && person.id]);
  if (!person) return null;
  const changed = access !== defaultAccess || text !== defaultBrief;
  const canSubmit = mode === 'invite' || changed;
  return (
    <IFS.Modal open={open} onOpenChange={v => { if (!v) onCancel && onCancel(); }} title="Add Collaborator" width={440} inline={inline}
      footer={<>
        <IFS.Button type="tertiary" size="l" onClick={onCancel}>Cancel</IFS.Button>
        <IFS.Button type="primary" size="l" disabled={!canSubmit} onClick={() => canSubmit && onSubmit && onSubmit({ access, brief: text })}>
          {mode === 'invite' ? 'Send invitation' : 'Save'}</IFS.Button>
      </>}>
      <div className="ifs-collab-invite">
        <div className="ifs-collab-invite__person">
          <IFS.Avatar size="l" name={person.name} initials={person.initials} {...person.avatar} />
          <div className="ifs-collab-invite__text">
            <span className="ifs-collab-invite__name">{person.name}</span>
            <span className="ifs-collab-invite__title">{person.title}</span>
          </div>
          <RoleSelect value={access} onChange={setAccess} label={`${person.name} access`} />
        </div>
        <div className="ifs-collab-invite__brief">
          <h3 className="ifs-collab-section__title ifs-collab-section__title--cooper"><IFS.Icon name="cooper-system-icon" variant="Insight" size={14} /><span>Brief by Cooper</span></h3>
          <IFS.TextArea size="m" value={text} onChange={v => setText(v)} aria-label="Brief by Cooper" className="ifs-collab-invite__area" />
        </div>
      </div>
    </IFS.Modal>
  );
}

// ───────────────────────────── RemoveCollaboratorModal ─────────────────────────────
// Pattern component: modal-organism "Remove this collaborator?": person card (avatar L) + "This action will revoke the collaborator's
// invite to the framework" + Cancel / Remove. Props: open, person, onCancel, onConfirm, inline.
function RemoveCollaboratorModal({ open, person, onCancel, onConfirm, inline }) {
  if (!person) return null;
  return (
    <IFS.Modal open={open} onOpenChange={v => { if (!v) onCancel && onCancel(); }} title="Remove this collaborator?" width={440} inline={inline}
      secondaryAction={{ label: 'Cancel', onClick: onCancel }} primaryAction={{ label: 'Remove', onClick: onConfirm }}>
      <div className="ifs-collab-remove">
        <div className="ifs-collab-remove__card">
          <IFS.Avatar size="l" name={person.name} initials={person.initials} {...person.avatar} type={person.status === 'awaiting' ? 'awaiting' : (person.avatar || {}).type} />
          <div className="ifs-collab-invite__text">
            <span className="ifs-collab-invite__name">{person.name}</span>
            <span className="ifs-collab-invite__title">{person.title}</span>
          </div>
        </div>
        <p className="ifs-collab-remove__text">This action will revoke the collaborator's invite to the framework</p>
      </div>
    </IFS.Modal>
  );
}

// ───────────────────────────── RoleFilter ─────────────────────────────
// Pattern component: the filter button (icon-button Secondary M, system-filter) + multiple-select-list-molecule of job roles
// ("All" first). Picking a role while All is on narrows to that role; clearing every role returns to All (inferred).
// Props: roles, value (array; empty = All) / onChange.
function RoleFilter({ roles = [], value = [], onChange, className }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return undefined;
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  const all = value.length === 0;
  const toggle = r => {
    if (r === null) return onChange([]);
    const next = all ? [r] : value.includes(r) ? value.filter(x => x !== r) : [...value, r];
    onChange(next.length === roles.length ? [] : next);
  };
  const Opt = ({ label, on, onPick }) => (
    <div role="option" aria-selected={on} className={ccx('ifs-role-filter__option', on && 'is-selected')} onClick={onPick}
      tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(); } }}>
      <IFS.Checkbox checked={on} onChange={() => {}} tabIndex={-1} aria-hidden="true" /><span>{label}</span>
    </div>
  );
  return (
    <div ref={ref} className={ccx('ifs-role-filter', className)}>
      <IFS.IconButton type="secondary" size="m" icon="system-filter" label="Filter by role" aria-expanded={open} aria-pressed={!all}
        className={ccx(!all && 'is-filtering')} onClick={() => setOpen(!open)} />
      {open && <div role="listbox" aria-multiselectable="true" aria-label="Roles" className="ifs-role-filter__list">
        <Opt label="All" on={all} onPick={() => toggle(null)} />
        <div role="separator" className="ifs-role-select__divider" />
        {roles.map(r => <Opt key={r} label={r} on={all || value.includes(r)} onPick={() => toggle(r)} />)}
      </div>}
    </div>
  );
}

// ───────────────────────────── CollaboratorsPanel ─────────────────────────────
// Pattern component: popover-organism "Collaborators" (360 wide) opened from CollaboratorsButton.
// Default: IN PROJECT (owner first, then joined) · AWAITING · SUGGESTED PEOPLE BY COOPER. Search "Invite by name or role…" + role filter:
//   focused and empty → Suggested + Recently; typing → RESULTS (name or job role, filtered by role); nothing → empty-state-organism with
//   suggestion chips that fill the query. Hovering a person who can be invited shows "+"; clicking opens InviteCollaboratorModal.
// Props: controller (useCollaboration), open / onOpenChange, trigger (default CollaboratorsButton), onInvite(person), onOpen(person),
//   onRemove(person), onPush(person), inline (render the card alone), defaultQuery, className, style.
function CollaboratorsPanel({ controller: c, open, defaultOpen, onOpenChange, trigger, onInvite, onOpen, onRemove, onPush, inline, defaultQuery = '', className, style }) {
  const [isOpen, setOpen] = useCtl(open, defaultOpen || false, onOpenChange);
  const [q, setQ] = React.useState(defaultQuery);
  const [focus, setFocus] = React.useState(false);
  const [roles, setRoles] = React.useState([]);
  const blurT = React.useRef();
  const anchor = React.useRef(null);
  const [pos, setPos] = React.useState(null);
  React.useLayoutEffect(() => {
    if (inline || !isOpen) return undefined;
    const calc = () => { const a = anchor.current; if (!a) return; const r = a.getBoundingClientRect();
      setPos({ top: r.bottom + 12, right: Math.max(8, window.innerWidth - r.right) }); }; // 12 = gap-300 (Figma: panel 12px under the header button)
    calc();
    window.addEventListener('scroll', calc, true); window.addEventListener('resize', calc);
    return () => { window.removeEventListener('scroll', calc, true); window.removeEventListener('resize', calc); };
  }, [isOpen, inline]);
  const query = q.trim().toLowerCase();
  const byRole = p => roles.length === 0 || roles.includes(p.title);
  const pool = [...c.suggested, ...c.directory.filter(p => !c.suggested.some(s => s.id === p.id))];
  const results = query ? pool.filter(p => byRole(p) && (p.name.toLowerCase().includes(query) || (p.title || '').toLowerCase().includes(query))) : [];
  const row = (p, extra) => <CollaboratorRow key={p.id} person={p} onAdd={onInvite} onOpen={onOpen}
    onRoleChange={(x, r) => c.setAccess(x.id, r)} onRemove={onRemove} push={c.pushState(p)} onPush={onPush} {...extra} />;
  let body;
  if (query && results.length) body = <CollaboratorSection title={results.length === 1 ? 'Result' : 'Results'}>{results.map(p => row(p))}</CollaboratorSection>;
  else if (query) body = <IFS.EmptyState cause="no-results-similar" size="section" icon={null} heading="No results found" body="You might be looking for"
    suggestions={pool.filter(byRole).slice(0, 3).map(p => p.name)} onSuggestion={s => setQ(s)} />;
  else if (focus) body = <>
    {c.suggested.filter(byRole).length > 0 && <CollaboratorSection cooper title="Suggested people by Cooper">{c.suggested.filter(byRole).map(p => row(p))}</CollaboratorSection>}
    {c.recent.filter(byRole).length > 0 && <CollaboratorSection title="Recently">{c.recent.filter(byRole).map(p => row(p))}</CollaboratorSection>}
  </>;
  else body = <>
    <CollaboratorSection title="In project">{c.members.map(p => row({ ...p, you: p.status === 'owner' }))}</CollaboratorSection>
    {c.awaiting.length > 0 && <CollaboratorSection title="Awaiting">{c.awaiting.map(p => row(p))}</CollaboratorSection>}
    {c.suggested.length > 0 && <CollaboratorSection cooper title="Suggested people by Cooper">{c.suggested.map(p => row(p))}</CollaboratorSection>}
  </>;
  const card = (
    <IFS.Popover inline title="Collaborators" showClose={!inline} width={360} className={ccx('ifs-collab-panel', className)} style={style}>
      <div className="ifs-collab-panel__tools">
        <IFS.Search placeholder="Invite by name or role..." value={q} onChange={v => setQ(v)} aria-label="Invite by name or role"
          onFocus={() => { clearTimeout(blurT.current); setFocus(true); }} onBlur={() => { blurT.current = setTimeout(() => setFocus(false), 200); }} />
        <RoleFilter roles={c.roles} value={roles} onChange={setRoles} />
      </div>
      <div className="ifs-collab-panel__body">{body}</div>
    </IFS.Popover>
  );
  if (inline) return card;
  // The card is portalled (fixed, under the trigger, right-aligned) so no overflow:hidden ancestor of the header clips it.
  // Popover renders its own ✕; it, Esc and an outside click close it.
  return (
    <span ref={anchor} className="ifs-collab-anchor" onKeyDown={e => { if (e.key === 'Escape' && isOpen) setOpen(false); }}>
      {React.cloneElement(trigger || <CollaboratorsButton accepted={c.accepted} invited={c.invited} />, {
        'aria-haspopup': 'dialog', 'aria-expanded': isOpen, onClick: () => setOpen(!isOpen) })}
      {isOpen && pos && createPortal(<OutsideClose onClose={() => setOpen(false)}>
        <div className="ifs-collab-anchor__pop" style={pos}
          onClick={e => { if (e.target.closest && e.target.closest('.ifs-popover__header .ifs-icon-button')) setOpen(false); }}>{card}</div>
      </OutsideClose>, document.body)}
    </span>
  );
}
// Closes on a mousedown outside its child, unless the click lands in a modal, a toast or a portalled list (they belong to the flow).
function OutsideClose({ onClose, children }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => {
      const t = e.target;
      if (!ref.current || ref.current.contains(t) || (t.closest && t.closest('.ifs-modal-layer, .ifs-modal, .ifs-overlay, .ifs-snackbar-stack, .ifs-floating, .ifs-collab-anchor'))) return;
      onClose();
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);
  return <div ref={ref}>{children}</div>;
}

// ───────────────────────────── CollaboratorsMenu ─────────────────────────────
// Pattern component: the drop-in for PageHeader actions. CollaboratorsButton + CollaboratorsPanel + invite / edit-brief / remove
// modals + the push toast, all wired to one useCollaboration controller.
// Props: controller, defaultOpen, open / onOpenChange.
function CollaboratorsMenu({ controller: c, open, defaultOpen = false, onOpenChange }) {
  const [isOpen, setOpen] = useCtl(open, defaultOpen, onOpenChange);
  const [modal, setModal] = React.useState(null); // { kind: invite|edit|remove, person }
  const close = () => setModal(null);
  return <>
    <CollaboratorsPanel controller={c} open={isOpen} onOpenChange={v => { if (!modal) setOpen(v); }}
      onInvite={p => setModal({ kind: 'invite', person: p })}
      onOpen={p => p.status !== 'owner' && setModal({ kind: 'edit', person: p })}
      onRemove={p => setModal({ kind: 'remove', person: p })}
      onPush={p => { c.push(p.id); IFS.toast && IFS.toast({ title: <>Reminder sent.<br />You can push again in 24h.</>, duration: 4000 }); }} />
    <InviteCollaboratorModal open={modal && (modal.kind === 'invite' || modal.kind === 'edit')} person={modal && modal.person}
      mode={modal && modal.kind === 'edit' ? 'edit' : 'invite'}
      defaultAccess={(modal && modal.person.access) || 'editor'}
      defaultBrief={modal ? (modal.person.brief != null ? modal.person.brief : c.defaultBrief(modal.person)) : ''}
      onCancel={close}
      onSubmit={({ access, brief }) => { if (modal.kind === 'invite') c.invite(modal.person, access, brief); else c.setBrief(modal.person.id, brief, access); close(); }} />
    <RemoveCollaboratorModal open={modal && modal.kind === 'remove'} person={modal && modal.person} onCancel={close}
      onConfirm={() => { c.remove(modal.person.id); close(); }} />
  </>;
}

Object.assign(IFS, { CollaboratorCursor, LiveCursors, CollaboratorsButton, RoleSelect, CollaboratorRow, CollaboratorSection, RoleFilter,
  CollaboratorsPanel, CollaboratorsMenu, InviteCollaboratorModal, RemoveCollaboratorModal, useCollaboration, collaborationUser });
export { CollaboratorCursor, LiveCursors, CollaboratorsButton, RoleSelect, CollaboratorRow, CollaboratorSection, RoleFilter,
  CollaboratorsPanel, CollaboratorsMenu, InviteCollaboratorModal, RemoveCollaboratorModal, useCollaboration, collaborationUser };
