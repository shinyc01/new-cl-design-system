import React from 'react';
import { IFS } from './registry.js';
// Activity family: the timeline base (Data Display › Activity chart), its approval / version-history configurations,
// the Comments pattern (Patterns › Comments 1399:9455) and the legacy people / file cards (Data Display).

const actCx = (...a) => IFS.cx(...a);
// Controlled/uncontrolled value helper.
function useActValue(value, defaultValue, onChange) {
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const v = controlled ? value : inner;
  const set = (next, ...extra) => { if (!controlled) setInner(next); onChange && onChange(next, ...extra); };
  return [v, set];
}

/* ===================================================== Timeline base ===================================================== */

// Figma: marker-atom (3713:12836)
// Props: size s (24) | m (32), children = slot content (an icon, an Avatar, a status icon). Default slot = the caret (Figma: arrow-caret-down-filled, drawn rotated to point right).
function TimelineMarker({ size = 's', children, className, ...rest }) {
  return (
    <span className={actCx('ifs-tl-marker', `ifs-tl-marker--${size}`, className)} {...rest}>
      {children != null ? children : <IFS.Icon name="arrow-caret-right-filled" size={size === 'm' ? 16 : 12} />}
    </span>
  );
}

// Figma: connector-atom (3713:12835)
// Props: type solid|dash. Fills the height of its parent column.
function TimelineConnector({ type = 'solid', className, ...rest }) {
  return <span aria-hidden="true" className={actCx('ifs-tl-connector', `ifs-tl-connector--${type}`, className)} {...rest} />;
}

// Figma: activity-organism (3713:13396) — "The timeline base". One entry = marker + connector + Content slot.
// Props: marker = node for the marker slot (overrides avatar/icon), avatar = Avatar props (S 24 in the marker),
// icon = icon name in the marker, markerSize s|m, connector solid|dash|none (none = last entry),
// title (name, Heading/H3), badge = label text or Badge props (badge-atom White M), subtitle (role line),
// time (right column), children = body text (Body/M regular, secondary), content = node that replaces the whole default
// content (the Figma "Content slot"), aside = node replacing the right column.
function TimelineItem({ marker, avatar, icon, markerSize = 's', connector = 'solid', title, badge, subtitle, time, children, content, aside,
  className, ...rest }) {
  const iconSize = markerSize === 'm' ? 16 : 12;
  const slot = marker != null ? marker
    : avatar ? <IFS.Avatar size={markerSize} {...avatar} />
      : icon ? <IFS.Icon name={icon} size={iconSize} /> : undefined;
  const badgeProps = badge == null ? null : (typeof badge === 'object' && !React.isValidElement(badge) ? badge : { children: badge });
  return (
    <div className={actCx('ifs-tl-item', className)} role="listitem" {...rest}>
      <div className="ifs-tl-item__rail">
        <TimelineMarker size={markerSize}>{slot}</TimelineMarker>
        {connector !== 'none' && <TimelineConnector type={connector} />}
      </div>
      <div className="ifs-tl-item__content">
        {content != null ? content : (
          <div className="ifs-tl-item__slot">
            <div className="ifs-tl-item__top">
              <div className="ifs-tl-item__head">
                {(title != null || badgeProps) && (
                  <div className="ifs-tl-item__row">
                    {title != null && <span className="ifs-tl-item__title">{title}</span>}
                    {badgeProps && <IFS.Badge color="white" size="m" {...badgeProps} />}
                  </div>
                )}
                {subtitle != null && <span className="ifs-tl-item__subtitle">{subtitle}</span>}
              </div>
              {aside != null ? aside : time != null && <span className="ifs-tl-item__time">{time}</span>}
            </div>
            {children != null && <div className="ifs-tl-item__body">{children}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

// Timeline = a list of activity-organism entries (Figma "in use example"). The last entry drops its connector.
// Props: items = TimelineItem props[] (each may carry `key`), or children = <TimelineItem>s; connector solid|dash for all entries.
function Timeline({ items, connector = 'solid', children, className, ...rest }) {
  const list = items ? items.map((it, i) => <TimelineItem key={it.key != null ? it.key : i} {...it} />) : React.Children.toArray(children);
  return (
    <div role="list" className={actCx('ifs-timeline', className)} {...rest}>
      {list.map((el, i) => React.isValidElement(el)
        ? React.cloneElement(el, { connector: i === list.length - 1 ? 'none' : (el.props.connector && el.props.connector !== 'solid' ? el.props.connector : connector) })
        : el)}
    </div>
  );
}

/* ===================================================== ApprovalChain ===================================================== */
// Legacy reference: approval-chain-timeline (1440:6174). Built on the timeline base: each step is a TimelineItem
// (marker M holds the status-readiness-atom icon 1440:6243) whose Content slot holds the approver card.

const APPROVAL_ICON = { success: 'status-success-filled', rejected: 'Frame', awaiting: 'clock-filled' };
function ApprovalStatusIcon({ state }) {
  if (state === 'empty') return <span className="ifs-approval__empty" aria-label="Not started" role="img" />;
  const s = state === 'disabled' || state === 'setting' ? 'success' : state;
  return <span className={actCx('ifs-approval__status', `ifs-approval__status--${s}`)}>
    <IFS.Icon name={APPROVAL_ICON[s] || APPROVAL_ICON.awaiting} size={20} title={s === 'success' ? 'Approved' : s === 'rejected' ? 'Rejected' : 'Awaiting'} />
  </span>;
}

// One approver card (the Content slot). Props: state awaiting|success|rejected|empty|disabled|setting, name, position,
// avatar = Avatar props, date (show-date), comment (show-comment), actions = { secondary, primary } labels or false (show-buttons),
// onPrimary / onSecondary, setting-only: role / roles / onRoleChange (dropdown-item), brief (show-brief; Cooper brief text),
// onExpand. Disabled = outlined card (no fill); Figma keeps its buttons in their default look.
function ApprovalCard({ state = 'awaiting', name, position, avatar, date, comment, actions, onPrimary, onSecondary,
  role, roles, onRoleChange, brief, onExpand, className, ...rest }) {
  const disabled = state === 'disabled';
  if (state === 'setting') {
    return (
      <div className={actCx('ifs-approval__card', 'ifs-approval__card--setting', className)} {...rest}>
        <div className="ifs-approval__user">
          <IFS.Icon name="system-drag-and-drop" size={16} className="ifs-approval__drag" />
          <IFS.Avatar size="m" name={name} {...avatar} />
          <div className="ifs-approval__text">
            <span className="ifs-approval__name ifs-approval__name--h4">{name}</span>
            {position != null && <span className="ifs-approval__position">{position}</span>}
          </div>
          <div className="ifs-approval__tools">
            {roles && <IFS.Select size="s" options={roles} value={role} onChange={onRoleChange} clearable={false} aria-label="Role" />}
            <IFS.IconButton type="ghost" size="s" icon="arrow-chevron-down" label="Expand" onClick={onExpand} />
          </div>
        </div>
        {brief != null && (
          <div className="ifs-approval__brief">
            <div className="ifs-approval__brief-title">
              <IFS.Icon name="cooper-system-icon" variant="Insight" size={14} />
              <span>Brief by Cooper</span>
            </div>
            <IFS.TextField size="m" defaultValue={brief} aria-label="Brief by Cooper" />
          </div>
        )}
      </div>
    );
  }
  const showActions = actions !== false && actions != null && state !== 'empty';
  const labels = typeof actions === 'object' ? actions : {};
  return (
    <div className={actCx('ifs-approval__card', disabled && 'ifs-approval__card--disabled', className)} aria-disabled={disabled || undefined} {...rest}>
      <div className="ifs-approval__user">
        <IFS.Avatar size="m" name={name} {...avatar} />
        <div className="ifs-approval__text">
          <div className="ifs-approval__title">
            <span className="ifs-approval__name">{name}</span>
            {date != null && <span className="ifs-approval__date">{date}</span>}
          </div>
          {position != null && <span className="ifs-approval__position">{position}</span>}
        </div>
      </div>
      {comment != null && state !== 'empty' && <div className="ifs-approval__comment">{comment}</div>}
      {showActions && (
        <div className="ifs-approval__buttons">
          <IFS.Button type="tertiary" size="m" onClick={onSecondary}>{labels.secondary || 'Reject'}</IFS.Button>
          <IFS.Button type="primary" size="m" onClick={onPrimary}>{labels.primary || 'Approve'}</IFS.Button>
        </div>
      )}
    </div>
  );
}

// Figma: approval-chain-timeline (1440:6174) — legacy; rebuilt as a configuration of the timeline base (activity-organism 3713:13396).
// Props: steps = [{ key, state, name, position, avatar, date, comment, actions, role, roles, brief }], defaultSteps,
// onChange(steps) — clicking Approve / Reject on an awaiting step really moves it to success / rejected.
// onApprove(step, index) / onReject(step, index) also fire.
function ApprovalChain({ steps, defaultSteps = [], onChange, onApprove, onReject, className, ...rest }) {
  const [list, setList] = useActValue(steps, defaultSteps, onChange);
  const update = (i, patch) => setList(list.map((s, j) => j === i ? { ...s, ...patch } : s));
  return (
    <Timeline className={actCx('ifs-approval', className)} aria-label="Approval chain" {...rest}>
      {list.map((s, i) => {
        const { key, state = 'awaiting', ...card } = s;
        const actions = s.actions !== undefined ? s.actions : state === 'awaiting';
        return (
          <TimelineItem key={key != null ? key : i} markerSize="m" marker={<ApprovalStatusIcon state={state} />}
            content={<ApprovalCard {...card} state={state} actions={actions}
              onPrimary={() => { update(i, { state: 'success', actions: false, date: s.date || 'Just now' }); onApprove && onApprove(s, i); }}
              onSecondary={() => { update(i, { state: 'rejected', actions: false, date: s.date || 'Just now' }); onReject && onReject(s, i); }}
              onRoleChange={v => update(i, { role: v })} />} />
        );
      })}
    </Timeline>
  );
}

/* ===================================================== VersionHistory ===================================================== */
// Legacy reference: version-history-timeline (2277:5299). Built on the timeline base: the marker (M) is the
// expand toggle; the Content slot holds the version card and, when expanded, a nested Timeline of activity.

// One version entry. Props: title (e.g. "Version 3"), badge (show-badge; label or Badge props), description, author = { name, avatar },
// time, activity = TimelineItem props[] (shown when expanded), expanded / defaultExpanded / onExpandedChange,
// onRename(newTitle) — the ⋯ button (or double-click on the title) enters Rename; Enter/✓ saves, Esc/✕ cancels.
// onMenu replaces the ⋯ behaviour. state hover|rename (gallery).
function VersionEntry({ title, badge, description, author, time, activity, expanded, defaultExpanded = false, onExpandedChange,
  onRename, onMenu, state, last, className, ...rest }) {
  const [open, setOpen] = useActValue(expanded, defaultExpanded, onExpandedChange);
  const [renaming, setRenaming] = React.useState(state === 'rename');
  const [draft, setDraft] = React.useState(title || '');
  const startRename = () => { setDraft(typeof title === 'string' ? title : ''); setRenaming(true); };
  const save = () => { setRenaming(false); onRename && onRename(draft); };
  const badgeProps = badge == null ? null : (typeof badge === 'object' ? badge : { children: badge });
  const card = (
    <div className={actCx('ifs-version__card', renaming && 'ifs-version__card--rename')} data-state={state === 'hover' ? 'hover' : undefined}>
      {renaming ? (
        <IFS.TextField size="m" autoFocus value={draft} onChange={v => setDraft(v)} aria-label="Version name" className="ifs-version__rename"
          onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setRenaming(false); }}
          suffix={<span className="ifs-version__rename-tools">
            <IFS.IconButton type="ghost" size="s" icon="system-close" label="Cancel rename" onClick={() => setRenaming(false)} />
            <IFS.IconButton type="ghost" size="s" icon="system-check" label="Save name" onClick={save} />
          </span>} />
      ) : (
        <div className="ifs-version__head">
          <span className="ifs-version__title" onDoubleClick={startRename}>{title}</span>
          {badgeProps && <IFS.Badge color="white" size="m" {...badgeProps} />}
        </div>
      )}
      {description != null && <div className="ifs-version__desc">{description}</div>}
      {!open && (author || time) && (
        <div className="ifs-version__meta">
          {author ? <span className="ifs-version__author"><IFS.Avatar size="xs" name={author.name} {...author.avatar} />{author.name}</span> : <span />}
          {time != null && <span className="ifs-version__time">{time}</span>}
        </div>
      )}
      {!renaming && (
        <IFS.IconButton type="ghost" size="s" icon="system-dots-horizont" label="Version actions" className="ifs-version__menu"
          state={state === 'hover' ? 'hover' : undefined} onClick={onMenu || startRename} />
      )}
    </div>
  );
  return (
    <TimelineItem className={actCx('ifs-version', open && 'ifs-version--open', className)} markerSize="m" connector={last ? 'none' : 'solid'}
      marker={<button type="button" className="ifs-version__toggle" aria-expanded={!!open} aria-label={open ? 'Collapse version' : 'Expand version'}
        onClick={() => setOpen(!open)}><IFS.Icon name={open ? 'arrow-caret-down-filled' : 'arrow-caret-right-filled'} size={12} /></button>}
      content={<div className="ifs-version__content">
        {card}
        {open && activity && activity.length > 0 && <Timeline className="ifs-version__activity" items={activity} />}
      </div>} {...rest} />
  );
}

// Figma: version-history-timeline (2277:5299) — legacy; rebuilt as a configuration of the timeline base.
// Props: versions = VersionEntry props[] (each may carry `key`); onRename(index, title). Uncontrolled titles update on rename.
function VersionHistory({ versions = [], onRename, className, ...rest }) {
  const [titles, setTitles] = React.useState({});
  return (
    <div role="list" className={actCx('ifs-timeline', 'ifs-version-history', className)} aria-label="Version history" {...rest}>
      {versions.map((v, i) => {
        const { key, ...p } = v;
        return <VersionEntry key={key != null ? key : i} {...p} title={titles[i] != null ? titles[i] : p.title} last={i === versions.length - 1}
          onRename={t => { setTitles({ ...titles, [i]: t }); onRename && onRename(i, t); p.onRename && p.onRename(t); }} />;
      })}
    </div>
  );
}

/* ===================================================== Comments ===================================================== */

// Splits comment text into plain runs and @mention tokens. `mentions` (names) makes matching exact; otherwise @Word.
function renderMentions(text, mentions) {
  if (typeof text !== 'string') return text;
  const names = (mentions || []).slice().sort((a, b) => b.length - a.length).map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = names.length ? new RegExp(`@(?:${names.join('|')})`, 'g') : /@[\w.-]+/g;
  const out = []; let last = 0; let m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<span key={m.index} className="ifs-comment__mention">{m[0]}</span>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// Figma: comment-content-card (260:86722) — one reply. Variants State=Default|Hover, Tagged user=False|True.
// Props: name, time (time ago), avatar = Avatar props, you (adds "(you)"), children = text (string: @mentions render as
// accent tokens — Figma Tagged user), mentions = names to match exactly, onMenu (⋯ shown on hover/focus; Figma Hover),
// state hover (gallery).
function Comment({ name, time, avatar, you, children, mentions, onMenu, state, className, ...rest }) {
  return (
    <div className={actCx('ifs-comment', className)} data-state={state} {...rest}>
      <IFS.Avatar size="m" name={name} type="auto" {...avatar} />
      <div className="ifs-comment__main">
        <div className="ifs-comment__title">
          <span className="ifs-comment__name">{name}{you && ' (you)'}</span>
          {time != null && <span className="ifs-comment__time">{time}</span>}
        </div>
        <div className="ifs-comment__text">{renderMentions(children, mentions)}</div>
      </div>
      {onMenu && <IFS.IconButton type="ghost" size="s" icon="system-dots-horizont" label="Comment actions" className="ifs-comment__menu" onClick={onMenu} />}
    </div>
  );
}

// Figma: comment-input-atom (2290:15642) + comment-input-molecule (1660:10933, when `avatar` is passed).
// Props: mode text|voice|cooper (value/defaultMode/onModeChange — switching never clears the draft), value / defaultValue /
// onChange(text), onSubmit(text) (Enter or send; clears the draft), placeholder (defaults per mode: "Add a comment" /
// "Say a comment" / "Working on your comment…" while generating), generating (Cooper drafting → send becomes stop),
// onStop, avatar = Avatar props of the current user (molecule), disabled, autoFocus, state (gallery: multi).
// Single line = pill; grows to Multi line (12px radius, buttons below) when the text wraps.
function CommentComposer({ mode, defaultMode = 'text', onModeChange, value, defaultValue = '', onChange, onSubmit, placeholder,
  generating, onStop, avatar, disabled, autoFocus, state, className, style, ...rest }) {
  const [m, setM] = useActValue(mode, defaultMode, onModeChange);
  const [text, setText] = useActValue(value, defaultValue, onChange);
  const ref = React.useRef(null);
  const [multi, setMulti] = React.useState(state === 'multi');
  React.useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
    if (state !== 'multi') setMulti(el.scrollHeight > 24 || /\n/.test(text || ''));
  }, [text, multi, state]);
  const cooper = m === 'cooper';
  const has = (text || '').trim().length > 0;
  const ph = placeholder || (cooper && generating ? 'Working on your comment…' : m === 'voice' ? 'Say a comment' : 'Add a comment');
  const submit = () => { if (!has || disabled || generating) return; onSubmit && onSubmit(text.trim()); setText(''); ref.current && ref.current.focus(); };
  const switchMode = next => { setM(next); ref.current && ref.current.focus(); };
  const sendBtn = cooper && generating
    ? <IFS.IconButton type="primary" shape="circle" size="m" icon="player-stop-filled" label="Stop generating" onClick={onStop} />
    : <IFS.IconButton type="primary" shape="circle" size="m" icon="arrow-up" label="Send comment" disabled={!has || disabled} onClick={submit} />;
  const buttons = (
    <div className="ifs-composer__buttons">
      {!cooper && <IFS.IconButton type="ghost" size="m" icon="cooper-system-icon" label="Draft with Cooper" disabled={disabled} onClick={() => switchMode('cooper')} />}
      {(!cooper || multi) && (m === 'voice'
        ? <IFS.IconButton type="ghost" size="m" icon="chat-keyboard-text" label="Type instead" disabled={disabled} onClick={() => switchMode('text')} />
        : <IFS.IconButton type="ghost" size="m" icon="chat-microphone-voice" label="Dictate" disabled={disabled} onClick={() => switchMode('voice')} />)}
      {sendBtn}
    </div>
  );
  const field = (
    <div className={actCx('ifs-composer', `ifs-composer--${m}`, multi && 'ifs-composer--multi', disabled && 'ifs-composer--disabled', !avatar && className)}
      style={avatar ? undefined : style} onMouseDown={e => { if (e.target === e.currentTarget) { e.preventDefault(); ref.current && ref.current.focus(); } }}>
      <div className="ifs-composer__inner">
        <div className="ifs-composer__row">
          {cooper && <button type="button" className="ifs-composer__cooper" aria-label="Leave Cooper mode" title="Leave Cooper mode" onClick={() => switchMode('text')}>
            <IFS.Icon name="cooper-system-icon" variant="Insight" size={12} />
          </button>}
          <textarea ref={ref} rows={1} className="ifs-composer__input" value={text} placeholder={ph} disabled={disabled} autoFocus={autoFocus}
            aria-label={rest['aria-label'] || 'Comment'} onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); submit(); } }} />
          {!multi && buttons}
        </div>
        {multi && buttons}
      </div>
    </div>
  );
  if (!avatar) return field;
  return (
    <div className={actCx('ifs-composer-molecule', className)} style={style}>
      <span className="ifs-composer-molecule__avatar"><IFS.Avatar size="m" type="auto" {...avatar} /></span>
      {field}
    </div>
  );
}

// Inline editor for one's own reply (comment-popover-organism Type=Edit: input/keyboard state=Edit).
function CommentEditor({ defaultValue, onSave, onCancel }) {
  const [v, setV] = React.useState(defaultValue || '');
  const ref = React.useRef(null);
  React.useEffect(() => { const el = ref.current; if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }, []);
  React.useLayoutEffect(() => { const el = ref.current; if (el) { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; } }, [v]);
  const mention = () => { setV(x => (x && !/\s$/.test(x) ? x + ' @' : x + '@')); ref.current && ref.current.focus(); };
  return (
    <div className="ifs-comment-edit">
      <div className="ifs-comment-edit__field">
        <textarea ref={ref} rows={1} className="ifs-comment-edit__input" value={v} aria-label="Edit comment" onChange={e => setV(e.target.value)}
          onKeyDown={e => { if (e.key === 'Escape') { e.stopPropagation(); onCancel(); } if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) onSave(v.trim()); }} />
      </div>
      <div className="ifs-comment-edit__actions">
        <IFS.IconButton type="ghost" shape="circle" size="m" icon="system-mail-user" label="Mention someone" onClick={mention} />
        <div className="ifs-comment-edit__buttons">
          <IFS.Button type="secondary" size="s" onClick={onCancel}>Cancel</IFS.Button>
          <IFS.Button type="primary" size="s" disabled={!v.trim()} onClick={() => onSave(v.trim())}>Save</IFS.Button>
        </div>
      </div>
    </div>
  );
}

// Figma: comment-popover-organism (260:88500) — the full thread. Variants Type=Default | Cooper suggestion | Edit.
// Props: number (thread ID shown after "Comment", e.g. "#55"), comments / defaultComments / onCommentsChange
// ([{ id, name, time, text, avatar, you, mentions }]), currentUser = { name, avatar } (composer avatar + author of new replies),
// resolved / defaultResolved / onResolvedChange (✓ in the header; resolved threads hide the composer until reopened),
// onClose (✕), onMenu (⋯), cooperSuggestion = { label, onClick } (Type=Cooper suggestion: Accent (Cooper) L button),
// composerProps (passed to CommentComposer), editingId (gallery: opens Type=Edit on that reply).
// Posting really appends a reply ("Just now", marked (you)); ⋯ on your own reply opens the inline editor.
function CommentThread({ number = '#00', comments, defaultComments = [], onCommentsChange, currentUser = { name: 'You' },
  resolved, defaultResolved = false, onResolvedChange, onClose, onMenu, cooperSuggestion, composerProps, editingId,
  className, style, ...rest }) {
  const [list, setList] = useActValue(comments, defaultComments, onCommentsChange);
  const [isResolved, setResolved] = useActValue(resolved, defaultResolved, onResolvedChange);
  const [editing, setEditing] = React.useState(editingId);
  const bodyRef = React.useRef(null);
  const post = text => {
    const c = { id: `c${Date.now()}`, name: currentUser.name, avatar: currentUser.avatar, time: 'Just now', text, you: true };
    setList([...list, c]);
    requestAnimationFrame(() => { const b = bodyRef.current; if (b) b.scrollTop = b.scrollHeight; });
  };
  return (
    <section className={actCx('ifs-thread', isResolved && 'ifs-thread--resolved', className)} style={style} aria-label={`Comment ${number}`} {...rest}>
      <header className="ifs-thread__header">
        <div className="ifs-thread__title"><span>Comment</span><span className="ifs-thread__number">{number}</span></div>
        <div className="ifs-thread__buttons">
          <IFS.IconButton type="ghost" size="s" icon="system-dots-horizont" label="More actions" onClick={onMenu} />
          <IFS.IconButton type="ghost" size="s" icon={isResolved ? 'status-success-filled' : 'system-circle-check'}
            label={isResolved ? 'Reopen thread' : 'Resolve thread'} aria-pressed={!!isResolved} className="ifs-thread__resolve"
            onClick={() => setResolved(!isResolved)} />
          <IFS.IconButton type="ghost" size="s" icon="system-close" label="Close" onClick={onClose} />
        </div>
      </header>
      <div className="ifs-thread__body" ref={bodyRef}>
        <div className="ifs-thread__comments" role="list">
          {list.map((c, i) => {
            const id = c.id != null ? c.id : i;
            if (editing === id) return <CommentEditor key={id} defaultValue={c.text}
              onCancel={() => setEditing(undefined)}
              onSave={t => { setList(list.map((x, j) => j === i ? { ...x, text: t } : x)); setEditing(undefined); }} />;
            return <Comment key={id} role="listitem" name={c.name} time={c.time} avatar={c.avatar} you={c.you} mentions={c.mentions}
              onMenu={c.you && !isResolved ? () => setEditing(id) : undefined}>{c.text}</Comment>;
          })}
          {cooperSuggestion && !isResolved && (
            <IFS.Button type="cooper" size="l" iconRight="arrow-right" className="ifs-thread__cooper" onClick={cooperSuggestion.onClick}>
              {cooperSuggestion.label || 'Let’s do it with Cooper'}
            </IFS.Button>
          )}
        </div>
        {isResolved
          ? <div className="ifs-thread__resolved"><IFS.Icon name="status-success-filled" size={16} />Resolved</div>
          : <CommentComposer avatar={{ name: currentUser.name, ...currentUser.avatar }} onSubmit={post} {...composerProps} />}
      </div>
    </section>
  );
}

/* ===================================================== People & files (legacy cards) ===================================================== */

const actKeyClick = onClick => onClick ? {
  role: 'button', tabIndex: 0, onClick,
  onKeyDown: e => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick(e); } },
} : {};

// Figma: user-card (1440:5059) — legacy (guide: "can be content-card-organism").
// Props: type assigned|owner, name, position, avatar = Avatar props (default Black M), badge (label, default "Owner"),
// date (owner: under the badge), checked (show-checkmark-icon), onEdit (assigned: edit icon-button), draggable (assigned drag handle),
// loading, state hover|drag|focus (gallery), onClick.
function UserCard({ type = 'assigned', name, position, avatar, badge = 'Owner', date, checked, onEdit, loading, state, onClick, className, ...rest }) {
  const owner = type === 'owner';
  return (
    <div className={actCx('ifs-user-card', `ifs-user-card--${type}`, loading && 'ifs-user-card--loading', className)} data-state={state}
      aria-busy={loading || undefined} {...actKeyClick(onClick)} {...rest}>
      <div className="ifs-user-card__main">
        {!owner && <IFS.Icon name="system-drag-and-drop" size={16} className="ifs-user-card__drag" />}
        {loading ? <span className="ifs-user-card__sk-avatar ifs-skeleton" /> : <IFS.Avatar size="m" name={name} {...avatar} />}
        <div className="ifs-user-card__text">
          {loading ? <><span className="ifs-skeleton-bar" style={{ width: 137, height: 14 }} /><span className="ifs-skeleton-bar" style={{ width: 80, height: 14 }} /></> : <>
            <span className="ifs-user-card__name">{name}</span>
            {position != null && <span className="ifs-user-card__position">{position}</span>}
          </>}
        </div>
      </div>
      <div className={actCx('ifs-user-card__side', owner && 'ifs-user-card__side--owner')}>
        {loading ? <span className="ifs-skeleton-bar" style={{ width: 32, height: 20, borderRadius: 1000 }} /> : <>
          {checked && <IFS.Icon name="system-check" size={16} className="ifs-user-card__check" />}
          {badge && <IFS.Badge color="white" size="m">{badge}</IFS.Badge>}
        </>}
        {!owner && <IFS.IconButton type="ghost" size="s" icon="system-edit-rename" label="Edit" onClick={e => { e.stopPropagation(); onEdit && onEdit(e); }} />}
        {owner && date != null && (loading ? <span className="ifs-skeleton-bar" style={{ width: 130, height: 14 }} /> : <span className="ifs-user-card__date">{date}</span>)}
      </div>
    </div>
  );
}

// Figma: collaborator (1440:6097) — legacy (guide: "can be content-card-organism").
// Props: type joined|awaiting|recommended, name, position, avatar = Avatar props (default: Green joined, Awaiting, Black recommended),
// role / defaultRole / roles / onRoleChange (dropdown-item; joined + awaiting), iconButton = { icon, label, onClick } (show-icon-button),
// onAdd (recommended: "+" shown on hover/focus), loading, state hover|focus (gallery).
function Collaborator({ type = 'joined', name, position, avatar, role, defaultRole, roles, onRoleChange, iconButton, onAdd, loading, state, className, ...rest }) {
  const avType = type === 'joined' ? 'green' : type === 'awaiting' ? 'awaiting' : 'black';
  return (
    <div className={actCx('ifs-collab', `ifs-collab--${type}`, className)} data-state={state} aria-busy={loading || undefined} tabIndex={0} {...rest}>
      <div className="ifs-collab__inner">
        {loading ? <span className="ifs-collab__sk-avatar ifs-skeleton" /> : <IFS.Avatar size="m" name={name} type={avType} state={state === 'hover' ? 'hover' : undefined} {...avatar} />}
        <div className="ifs-collab__text">
          {loading ? <><span className="ifs-skeleton-bar" style={{ width: 157, height: 14 }} /><span className="ifs-skeleton-bar" style={{ width: 80, height: 14 }} /></> : <>
            <span className="ifs-collab__name">{name}</span>
            {position != null && <span className="ifs-collab__position">{position}</span>}
          </>}
        </div>
        {type !== 'recommended' && (roles || iconButton) && (
          <div className="ifs-collab__buttons">
            {roles && <IFS.Select size="s" options={roles} {...(role !== undefined ? { value: role } : { defaultValue: defaultRole })} onChange={onRoleChange} clearable={false} aria-label={`Role for ${name}`} />}
            {iconButton && <IFS.IconButton type="ghost" size="s" {...iconButton} />}
          </div>
        )}
        {type === 'recommended' && onAdd && (
          <div className="ifs-collab__add"><IFS.IconButton type="ghost" size="s" icon="system-plus" label={`Add ${name}`} onClick={onAdd} /></div>
        )}
      </div>
    </div>
  );
}

// Figma: file-card (1440:5465) — legacy ("Documents"; guide: "can be content-card-organism").
// Props: name, date, error (State=error: red tile + delete / retry), loading, onDownload (shown on hover/focus), onDelete, onRetry,
// onClick (open), state hover (gallery).
function FileCard({ name, date, error, loading, onDownload, onDelete, onRetry, onClick, state, className, ...rest }) {
  if (loading) return <div className={actCx('ifs-file-card', 'ifs-file-card--loading', 'ifs-skeleton', className)} aria-busy="true" {...rest} />;
  return (
    <div className={actCx('ifs-file-card', error && 'ifs-file-card--error', className)} data-state={state} tabIndex={onClick ? undefined : 0}
      {...actKeyClick(onClick)} {...rest}>
      <div className="ifs-file-card__main">
        <span className="ifs-file-card__tile"><IFS.Icon name={error ? 'status-error-filled' : 'system-file'} size={16} /></span>
        <div className="ifs-file-card__text">
          <span className="ifs-file-card__name">{name}</span>
          {date != null && <span className="ifs-file-card__date">{date}</span>}
        </div>
      </div>
      {error ? (
        <div className="ifs-file-card__actions ifs-file-card__actions--error">
          <IFS.IconButton type="ghost" size="s" icon="system-trash-delete" label="Delete file" onClick={e => { e.stopPropagation(); onDelete && onDelete(e); }} />
          <IFS.IconButton type="ghost" size="s" icon="arrow-refresh" label="Retry upload" onClick={e => { e.stopPropagation(); onRetry && onRetry(e); }} />
        </div>
      ) : onDownload && (
        <div className="ifs-file-card__actions">
          <IFS.IconButton type="ghost" size="s" icon="system-download" label="Download file" onClick={e => { e.stopPropagation(); onDownload(e); }} />
        </div>
      )}
    </div>
  );
}

// Figma: version-card (2104:4022) — legacy (guide: "can be content-card-organism").
// Props: label (caption, default "Ready to publish"), items = [{ name, type (indicator colour, default orange), meta }] (the List slot),
// secondaryAction / primaryAction = Button props incl. children (default "Schedule" / "Publish"), loading, state hover (gallery).
function VersionCard({ label = 'Ready to publish', items = [], secondaryAction = { children: 'Schedule' }, primaryAction = { children: 'Publish' },
  loading, state, className, ...rest }) {
  return (
    <div className={actCx('ifs-version-card', loading && 'ifs-version-card--loading', className)} data-state={state} aria-busy={loading || undefined} {...rest}>
      <div className="ifs-version-card__body">
        {loading ? <span className="ifs-skeleton-bar" style={{ width: 96, height: 12 }} /> : <span className="ifs-version-card__label">{label}</span>}
        <div className="ifs-version-card__list">
          {items.map((it, i) => (
            <div key={i} className="ifs-version-card__item">
              {loading ? <>
                <IFS.Indicator size="xs" type="loading" className="ifs-version-card__ind" />
                <span className="ifs-skeleton-bar" style={{ width: 130, height: 14 }} />
              </> : <>
                <IFS.Indicator size="xs" type={it.type || 'orange'} className="ifs-version-card__ind">{it.name}</IFS.Indicator>
                {it.meta != null && <span className="ifs-version-card__meta">{it.meta}</span>}
              </>}
            </div>
          ))}
        </div>
      </div>
      <div className="ifs-version-card__buttons">
        {secondaryAction && <IFS.Button type="secondary" size="m" {...secondaryAction} />}
        {primaryAction && <IFS.Button type="primary" size="m" {...primaryAction} />}
      </div>
    </div>
  );
}

Object.assign(IFS, {
  TimelineMarker, TimelineConnector, TimelineItem, Timeline, ApprovalCard, ApprovalChain, VersionEntry, VersionHistory,
  Comment, CommentComposer, CommentThread, UserCard, Collaborator, FileCard, VersionCard,
});
export {
  TimelineMarker, TimelineConnector, TimelineItem, Timeline, ApprovalCard, ApprovalChain, VersionEntry, VersionHistory,
  Comment, CommentComposer, CommentThread, UserCard, Collaborator, FileCard, VersionCard,
};
