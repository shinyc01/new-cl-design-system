import React from 'react';
import { IFS } from './registry.js';

// Cooper pattern family (Patterns file page "Cooper" 12:263487): the Cooper chat in three sizes, its messages,
// chat history with folders and search, and the Cooper recommendations window.

const useCtl = (value, defaultValue, onChange) => {
  const [inner, setInner] = React.useState(defaultValue);
  const ctl = value !== undefined;
  const v = ctl ? value : inner;
  const set = React.useCallback((next, ...a) => { if (!ctl) setInner(next); onChange && onChange(next, ...a); }, [ctl, onChange]);
  return [v, set];
};
const Tip = ({ content, hotkey, type, children }) => content ? <IFS.Tooltip content={content} hotkey={hotkey} type={type}>{children}</IFS.Tooltip> : children;
const Btn = ({ icon, label, onClick, type = 'ghost', size = 'm', shape, tip = true, active, ...rest }) => (
  <Tip content={tip ? label : null}><IFS.IconButton icon={icon} label={label} type={type} size={size} shape={shape} onClick={onClick}
    className={active ? 'ifs-icon-button--active' : undefined} aria-pressed={active == null ? undefined : !!active} {...rest} /></Tip>
);
const CooperMark = ({ variant = 'Insight', size = 16 }) => <IFS.Icon name="cooper-system-icon" variant={variant} size={size} />;

// ============================================================ chat atoms / molecules

// Figma: chat-header-molecule (e559f9be1d186aeb756bdca63f2f9d0628d0b3e0) — "chat header" in the Patterns file (12:263805).
// Props: title (chat name; "New chat" until Cooper finishes a first answer), size full|compact (Figma Type=Full panel / float-window:
// the window button shows minimize vs maximize), newChat (Figma New chat=True hides the ⋯ more button),
// onNewChat, onHistory, historyOpen (history button pressed), onResize, onMore, onClose (system-minus: collapses Cooper),
// onDragStart (pointerdown on the title area — compact window is draggable).
function ChatHeader({ title = 'New chat', size = 'full', newChat, onNewChat, onHistory, historyOpen, onResize, onMore, onClose, onDragStart, className, ...rest }) {
  return (
    <div className={IFS.cx('ifs-chat-header', className)} {...rest}>
      <div className="ifs-chat-header__name" onPointerDown={onDragStart} style={onDragStart ? { cursor: 'grab' } : undefined}>
        <CooperMark />
        <span className="ifs-chat-header__title" title={title}>{title}</span>
      </div>
      <div className="ifs-chat-header__actions">
        <Btn icon="chat-add" label="New chat" size="s" onClick={onNewChat} />
        <Btn icon="chat-history" label="Chat history" size="s" onClick={onHistory} active={historyOpen || undefined} />
        <Btn icon={size === 'full' ? 'arrow-window-minimize' : 'arrow-window-maximize'} label={size === 'full' ? 'Collapse to floating window' : 'Expand to side panel'} size="s" onClick={onResize} />
        {!newChat && <Btn icon="system-dots-horizont" label="More" size="s" onClick={onMore} />}
        <Btn icon="system-minus" label="Minimize" size="s" onClick={onClose} />
      </div>
    </div>
  );
}

// Figma: user-message-molecule (24d3417689866a2cd7c3af335c0d617a276587e1) — "user-message-bubble" (12:263541).
// Props: children = message text, size inline|multi (default: inline for short one-line text — Figma Size=Inline is a pill,
// >1 line is radius 12), onEdit(text) (shows edit on hover; Figma State=editing has Cancel / Save), onCopy (copy on hover),
// editing / defaultEditing / onEditingChange, state hover (gallery).
function UserMessage({ children, size, onEdit, onCopy, editing, defaultEditing = false, onEditingChange, state, className, ...rest }) {
  const text = typeof children === 'string' ? children : '';
  const [isEditing, setEditing] = useCtl(editing, defaultEditing, onEditingChange);
  const [draft, setDraft] = React.useState(text);
  const [copied, setCopied] = React.useState(false);
  const inline = size ? size === 'inline' : text.length <= 36 && !text.includes('\n');
  const copy = () => {
    try { navigator.clipboard && navigator.clipboard.writeText(text); } catch (e) { /* clipboard blocked */ }
    setCopied(true); setTimeout(() => setCopied(false), 1200); onCopy && onCopy(text);
  };
  if (isEditing) return (
    <div className={IFS.cx('ifs-user-msg', className)} {...rest}>
      <div className="ifs-user-msg__edit">
        <textarea autoFocus value={draft} rows={Math.max(1, Math.ceil(draft.length / 42))} aria-label="Edit message"
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Escape') setEditing(false); if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (draft.trim()) { onEdit && onEdit(draft.trim()); setEditing(false); } } }} />
        <div className="ifs-user-msg__edit-actions">
          <IFS.Button size="s" type="secondary" onClick={() => { setDraft(text); setEditing(false); }}>Cancel</IFS.Button>
          <IFS.Button size="s" type="primary" disabled={!draft.trim()} onClick={() => { onEdit && onEdit(draft.trim()); setEditing(false); }}>Save</IFS.Button>
        </div>
      </div>
    </div>
  );
  return (
    <div className={IFS.cx('ifs-user-msg', className)} data-state={state} {...rest}>
      <div className="ifs-user-msg__actions">
        <Btn icon={copied ? 'system-check' : 'copy'} label={copied ? 'Copied' : 'Copy'} size="s" onClick={copy} />
        {onEdit && <Btn icon="system-edit-rename" label="Edit" size="s" onClick={() => { setDraft(text); setEditing(true); }} />}
      </div>
      <div className={IFS.cx('ifs-user-msg__bubble', inline && 'ifs-user-msg__bubble--inline')}>{children}</div>
    </div>
  );
}

// Figma: attachments (02356d2dc7c5…) with "Attachments Mini" chips — one uploaded file in the message input.
// Props: name, meta (e.g. "PDF · 2 MB"), icon (default system-file), onRemove (✕ on the chip).
function Attachment({ name, meta, icon = 'system-file', onRemove, className, ...rest }) {
  return (
    <span className={IFS.cx('ifs-attachment', className)} {...rest}>
      <span className="ifs-attachment__icon"><IFS.Icon name={icon} size={16} /></span>
      <span className="ifs-attachment__text"><span className="ifs-attachment__name" title={name}>{name}</span>{meta && <span className="ifs-attachment__meta">{meta}</span>}</span>
      {onRemove && <Btn icon="system-close" label={`Remove ${name}`} size="s" tip={false} onClick={onRemove} />}
    </span>
  );
}

// Figma: text-message-input-molecule (2f407b5b2a20…) — the chat composer in compact/full panels (Patterns 67:120307).
// States follow the content: Default (placeholder, mic only) → Typing (send arrow appears) → Typing multi-line (radius 12, buttons
// below) → Analyzing (send becomes Stop while Cooper works). Enter sends, Shift+Enter adds a line.
// Props: value / defaultValue / onChange, onSend(text, attachments), analyzing + onStop, placeholder, onAttach (+), onVoice (mic → voice mode),
// attachments [{ id, name, meta }] + onRemoveAttachment(id) (a file switches the input to multi-line; max height 400px then scroll),
// state typing|multi|analyzing|pressed (gallery), autoFocus.
function TextMessageInput({ value, defaultValue = '', onChange, onSend, analyzing, onStop, placeholder = 'Ask a follow-up', onAttach, onVoice,
  attachments = [], onRemoveAttachment, state, autoFocus, className, ...rest }) {
  const [text, setText] = useCtl(value, defaultValue, onChange);
  const ref = React.useRef();
  const multi = state === 'multi' || attachments.length > 0 || text.includes('\n') || text.length > 52;
  const busy = analyzing || state === 'analyzing';
  const canSend = (text.trim() || attachments.length) && !busy;
  React.useEffect(() => { const t = ref.current; if (!t) return; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 336) + 'px'; }, [text, multi]);
  const send = () => { if (!canSend) return; onSend && onSend(text.trim(), attachments); setText(''); };
  const field = (
    <textarea ref={ref} rows={1} className="ifs-msg-input__field" value={text} placeholder={placeholder} aria-label="Message Cooper" autoFocus={autoFocus}
      onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} />
  );
  const plus = <Btn icon="system-plus" label="Add attachment" onClick={onAttach} />;
  const end = (
    <span className="ifs-msg-input__end">
      <Btn icon="chat-microphone-voice" label="Switch to voice" onClick={onVoice} />
      {busy ? <Btn icon="player-stop-filled" label="Stop" type="primary" shape="circle" onClick={onStop} />
        : (text.trim() || attachments.length || state === 'typing' || state === 'multi') ? <Btn icon="arrow-up" label="Send" type="primary" shape="circle" tip={false} disabled={!canSend && !state} onClick={send} /> : null}
    </span>
  );
  return (
    <div className={IFS.cx('ifs-msg-input', multi && 'ifs-msg-input--multi', className)} data-state={state} {...rest}>
      {attachments.length > 0 && <div className="ifs-msg-input__attachments">
        {attachments.map(a => <Attachment key={a.id || a.name} name={a.name} meta={a.meta} onRemove={onRemoveAttachment ? () => onRemoveAttachment(a.id || a.name) : undefined} />)}
      </div>}
      {multi ? <>{field}<div className="ifs-msg-input__row">{plus}{end}</div></> : <div className="ifs-msg-input__row">{plus}{field}{end}</div>}
    </div>
  );
}

// Figma: voice-message-input-molecule (b66c51b2fbcf…) (Patterns 67:107207). Voice mode composer: + · dot-wave · keyboard.
// Props: state default|speaking|analyzing (Speaking animates the wave — Icon voice-input-animation variant True; Analyzing adds Stop),
// onAttach, onKeyboard (switch to text), onStop.
function VoiceMessageInput({ state = 'default', onAttach, onKeyboard, onStop, className, ...rest }) {
  return (
    <div className={IFS.cx('ifs-voice-input', className)} {...rest}>
      <span className="ifs-voice-input__side"><Btn icon="system-plus" label="Add attachment" onClick={onAttach} /></span>
      <span className="ifs-voice-input__wave" aria-label={state === 'speaking' ? 'Listening' : 'Voice input'} role="img">
        <IFS.Icon name="voice-input-animation" variant={state === 'speaking' ? 'True' : 'False'} size={24} />
      </span>
      <span className="ifs-voice-input__side ifs-voice-input__side--end">
        <Btn icon="chat-keyboard-text" label="Switch to text" onClick={onKeyboard} />
        {state === 'analyzing' && <Btn icon="player-stop-filled" label="Stop" type="primary" shape="circle" onClick={onStop} />}
      </span>
    </div>
  );
}

// Figma: speaking-control-molecule (agent-window header) — Cooper reads its message aloud; pause/resume.
// Props: speaking / defaultSpeaking / onSpeakingChange.
function SpeakingControl({ speaking, defaultSpeaking = true, onSpeakingChange, className, ...rest }) {
  const [on, setOn] = useCtl(speaking, defaultSpeaking, onSpeakingChange);
  return (
    <span className={IFS.cx('ifs-speaking', className)} {...rest}>
      <span className="ifs-speaking__wave"><IFS.Icon name={on ? 'system-sound-waves-ai-speaking' : 'system-sound-waves-ai-paused'} size={16} /></span>
      <span style={{ width: 53 }}>{on ? 'Speaking' : 'Paused'}</span>
      <Btn icon={on ? 'player-pause-fiiled' : 'system-volume-on'} label={on ? 'Pause' : 'Resume speaking'} size="s" onClick={() => setOn(!on)} />
    </span>
  );
}

// Figma: chat-card-molecule (4153e3d4b49c…) (Patterns 67:120468). Cards inside a Cooper answer.
// Props: type scenario|metric. Scenario: title, receipt (show-receipt), badges (labels → Badge White M with the star icon),
// meta (strings joined by dots, e.g. ["$3.2M","2yr","saved 3:44 AM"]). Metric: category, value. onClick makes the card a button.
function ChatCard({ type = 'scenario', title, receipt, badges = [], meta = [], category, value, onClick, className, ...rest }) {
  const Tag = onClick ? 'button' : 'div';
  if (type === 'metric') return (
    <Tag type={onClick ? 'button' : undefined} onClick={onClick} className={IFS.cx('ifs-chat-card', 'ifs-chat-card--metric', className)} {...rest}>
      <span className="ifs-chat-card__category">{category}</span>
      <span className="ifs-chat-card__value">{value}</span>
    </Tag>
  );
  return (
    <Tag type={onClick ? 'button' : undefined} onClick={onClick} className={IFS.cx('ifs-chat-card', className)} {...rest}>
      <span className="ifs-chat-card__top"><span className="ifs-chat-card__title">{title}</span>{receipt && <span className="ifs-chat-card__receipt">{receipt}</span>}</span>
      <span className="ifs-chat-card__bottom">
        <span className="ifs-chat-card__badges">{badges.map(b => <IFS.Badge key={b} color="white" size="m" iconLeft="system-star-favourite">{b}</IFS.Badge>)}</span>
        <span className="ifs-chat-card__meta">{meta.map((m, i) => <React.Fragment key={i}>{i > 0 && <span className="ifs-chat-card__dot" />}{m}</React.Fragment>)}</span>
      </span>
    </Tag>
  );
}

// Figma: chat-link-molecule (d581a966d6ef…) "chat-link-item" (Patterns 12:265109) + chat-link-item/Default/source (16:18275).
// Props: children = label, type follow-up|source (follow-up: ↳ arrow; clicking sends it as a new message. source: "[n]" number),
// number (source), onClick, state hover (gallery).
function ChatLink({ children, type = 'follow-up', number, onClick, state, className, ...rest }) {
  return (
    <button type="button" data-state={state} onClick={onClick} className={IFS.cx('ifs-chat-link', className)} {...rest}>
      {type === 'source' ? <span className="ifs-chat-link__num">[{number}]</span> : <IFS.Icon name="corner-down-right-arrow" size={12} />}
      <span className="ifs-chat-link__label">{children}</span>
    </button>
  );
}

// Cooper progress line (Patterns "Cooper Message content" 67:134213): "Cooper is working on it (Step n/total): <step name>".
// The total is per run (2 for a simple question, 3–4 for widgets/alternatives); only the text changes between steps.
// Props: step, total, label, live (shimmer while running; frozen when stopped).
function CooperProgress({ step = 1, total = 3, label = 'Reviewing framework structure', live = true, className, ...rest }) {
  return (
    <div className={IFS.cx('ifs-cooper-progress', live && 'ifs-cooper-progress--live', className)} role="status" {...rest}>
      <CooperMark size={12} />
      <span className="ifs-cooper-progress__text">Cooper is working on it (Step {step}/{total}): {label}…</span>
    </div>
  );
}

// Cooper message (answer bubble). Anatomy (Figma dev note, 67:134213), top to bottom — a block with no content is hidden with its header:
// 1 "Analyzed your request" (collapsible reasoning; collapsed by default once the answer is complete),
// 2 content (text, cards, metrics, actions, supporting evidence), 3 follow-ups (hidden while clarifying options show),
// 4 clarifying options (selecting one sends it as the user's reply).
// Props: status analyzing|streaming|answered|stopped|error|offline, step {n,total,label} (analyzing / stopped while analysing),
// reasoning (strings), reasoningOpen / defaultReasoningOpen, text (answer text), streamed (chars shown while streaming),
// scenarios { title, aside, cards:[ChatCard props], actions:[{label,onClick}] }, metrics [{category,value}], insight { title, text },
// sources [{label}] (Supporting evidence), followUps (strings) + onFollowUp(text), options { title, intro, items } + onOption(text),
// onRetry (error/offline/stopped-before-answer: "Try again"), onRegenerate (stopped mid-stream), children (extra content).
function CooperMessage({ status = 'answered', step, reasoning = [], reasoningOpen, defaultReasoningOpen = false, onReasoningOpenChange,
  text, streamed, scenarios, metrics, insight, sources, followUps = [], onFollowUp, options, onOption, onRetry, onRegenerate,
  children, className, ...rest }) {
  const [open, setOpen] = useCtl(reasoningOpen, defaultReasoningOpen, onReasoningOpenChange);
  const [srcOpen, setSrcOpen] = React.useState(true);
  if (status === 'analyzing') return <CooperProgress step={step && step.n} total={step && step.total} label={step && step.label} />;
  const partial = status === 'streaming' || (status === 'stopped' && streamed != null) ? (text || '').slice(0, streamed ?? 0) : text;
  const stoppedEarly = status === 'stopped' && !partial;
  const full = status === 'answered';
  const statusLine = (msg, action, actionLabel = 'Try again') => (
    <div className="ifs-cooper-status">{msg}{action && <Btn icon="arrow-refresh" label={actionLabel} size="s" onClick={action} />}</div>
  );
  return (
    <div className={IFS.cx('ifs-cooper-msg', className)} {...rest}>
      {stoppedEarly && step && <CooperProgress step={step.n} total={step.total} label={step.label} live={false} />}
      {full && reasoning.length > 0 && (
        <div className="ifs-cooper-msg__reasoning">
          <button type="button" className="ifs-cooper-msg__toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
            Analyzed your request <IFS.Icon name={open ? 'arrow-caret-up-filled' : 'arrow-caret-down-filled'} size={12} />
          </button>
          {open && <ul>{reasoning.map((r, i) => <li key={i}>{r}</li>)}</ul>}
        </div>
      )}
      {partial && <div className="ifs-cooper-msg__body">
        <p className="ifs-cooper-msg__text">{partial}{status === 'streaming' && <span className="ifs-cooper-msg__cursor" aria-hidden />}</p>
      </div>}
      {full && <div className="ifs-cooper-msg__body">
        {scenarios && <div className="ifs-cooper-msg__block">
          <div className="ifs-cooper-msg__h">{scenarios.title}{scenarios.aside && <span className="ifs-cooper-msg__h-aside">{scenarios.aside}</span>}</div>
          <div className="ifs-cooper-msg__cards">{scenarios.cards.map((c, i) => <ChatCard key={i} {...c} />)}</div>
          {scenarios.actions && <div className="ifs-cooper-msg__buttons">{scenarios.actions.map(a => <IFS.Button key={a.label} type="secondary" onClick={a.onClick}>{a.label}</IFS.Button>)}</div>}
        </div>}
        {metrics && metrics.length > 0 && <div className="ifs-cooper-msg__block">
          <div className="ifs-cooper-msg__h">Key metrics</div>
          <div className="ifs-cooper-msg__grid">{metrics.map((m, i) => <ChatCard key={i} type="metric" {...m} />)}</div>
        </div>}
        {insight && <div className="ifs-cooper-msg__block">
          <div className="ifs-cooper-msg__h">{insight.title || 'Key insights'}</div>
          <p className="ifs-cooper-msg__text">{insight.text}</p>
        </div>}
        {children}
        {sources && sources.length > 0 && <div className="ifs-cooper-msg__block">
          <button type="button" className="ifs-cooper-msg__toggle" aria-expanded={srcOpen} onClick={() => setSrcOpen(!srcOpen)}>
            Supporting evidence <IFS.Icon name={srcOpen ? 'arrow-caret-up-filled' : 'arrow-caret-down-filled'} size={12} />
          </button>
          {srcOpen && <div className="ifs-cooper-msg__list">{sources.map((s, i) => <ChatLink key={i} type="source" number={i + 1} onClick={s.onClick}>{s.label}</ChatLink>)}</div>}
        </div>}
        {options ? <div className="ifs-cooper-msg__block">
          {options.title && <div className="ifs-cooper-msg__h">{options.title}</div>}
          {options.intro && <p className="ifs-cooper-msg__text" style={{ color: 'var(--text-tertiary)', font: '400 14px/20px var(--font-family-text)' }}>{options.intro}</p>}
          <div className="ifs-cooper-options">
            <div className="ifs-cooper-options__head"><span>Options</span><IFS.Counter>{options.items.length}</IFS.Counter></div>
            {options.items.map(o => <button key={o} type="button" className="ifs-cooper-option" onClick={() => onOption && onOption(o)}>{o}</button>)}
          </div>
        </div> : followUps.length > 0 && <div className="ifs-cooper-msg__block">
          <div className="ifs-cooper-msg__h">Follow-ups</div>
          <div className="ifs-cooper-msg__list">{followUps.map(f => <ChatLink key={f} onClick={() => onFollowUp && onFollowUp(f)}>{f}</ChatLink>)}</div>
        </div>}
      </div>}
      {status === 'stopped' && statusLine('Request was interrupted by the user.', stoppedEarly ? onRetry : onRegenerate, stoppedEarly ? 'Try again' : 'Regenerate')}
      {status === 'error' && statusLine('Something went wrong on our side', onRetry)}
      {status === 'offline' && statusLine('Connection lost', onRetry)}
    </div>
  );
}

// ============================================================ the three chat sizes

// Figma: chat-collapsed-bar-organism (cf1fb8a41862…) — "chat-inline-quick-mode" (Patterns 12:263488). 320px pill above the bottom sheet.
// Props: type voice|text|fab (Figma Type: Voice opens by default; FAB button = Cooper avatar only),
// value / defaultValue / onChange (text), onSend(text), onTypeChange(type) (mic ↔ keyboard), onAttach, onExpand (hover control:
// "Expand to floating window"), speech (voice transcript; replaces the placeholder while the user talks), onFab (type=fab),
// state hover (gallery). Text over one line switches to the multi-line layout (radius 12).
function ChatCollapsedBar({ type = 'voice', value, defaultValue = '', onChange, onSend, onTypeChange, onAttach, onExpand, speech, onFab, state, autoFocus, className, style, ...rest }) {
  const [text, setText] = useCtl(value, defaultValue, onChange);
  if (type === 'fab') return <IFS.FtaButton indicator={false} onClick={onFab} className={className} style={style} />;
  const content = type === 'text' ? text : (speech || '');
  const multi = content.length > 32 || content.includes('\n');
  const send = () => { if (!text.trim()) return; onSend && onSend(text.trim()); setText(''); };
  const field = type === 'text'
    ? <textarea rows={multi ? 2 : 1} className="ifs-chat-bar__field" value={text} placeholder="Write anything, I’m reading" aria-label="Message Cooper" autoFocus={autoFocus}
        onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} />
    : <span className={IFS.cx('ifs-chat-bar__listen', speech && 'ifs-chat-bar__listen--speech')} aria-live="polite">{speech || 'Say anything, I’m listening'}</span>;
  const end = (
    <span className="ifs-chat-bar__end">
      {onExpand && <span className="ifs-chat-bar__expand"><Btn icon="arrow-diagonal-expand" label="Expand to floating window" size="s" onClick={onExpand} /></span>}
      {type === 'text' ? <Btn icon="chat-microphone-voice" label="Switch to voice" onClick={() => onTypeChange && onTypeChange('voice')} />
        : <Btn icon="chat-keyboard-text" label="Switch to text" onClick={() => onTypeChange && onTypeChange('text')} />}
      {((type === 'text' && text.trim()) || (type === 'voice' && speech)) && <Btn icon="arrow-up" label="Send" type="primary" shape="circle" tip={false} onClick={type === 'text' ? send : () => onSend && onSend(speech)} />}
    </span>
  );
  const plus = <Btn icon="system-plus" label="Add attachment" onClick={onAttach} />;
  return (
    <div className={IFS.cx('ifs-chat-bar', 'ifs-cooper-surface', multi && 'ifs-chat-bar--multi', className)} data-state={state} style={style} {...rest}>
      {multi ? <>{field}<div className="ifs-chat-bar__row">{plus}{end}</div></> : <div className="ifs-chat-bar__row">{plus}{field}{end}</div>}
    </div>
  );
}

// Shared shell of chat-compact-panel-organism and chat-full-panel-organism.
function ChatPanel({ size, type = 'text', title = 'New chat', newChat, children, empty, prompts = [], onPrompt, speech,
  inputValue, onInputChange, onSend, analyzing, onStop, attachments, onRemoveAttachment, onAttach, onTypeChange, onFiles, dropping,
  onNewChat, onHistory, historyOpen, onResize, onMore, onClose, onDragStart, onResizeStart, placeholder, scrollRef, className, style, ...rest }) {
  const [drag, setDrag] = React.useState(false);
  const isDrop = dropping || drag;
  const showEmpty = empty ?? !children;
  return (
    <section aria-label="Cooper chat" className={IFS.cx('ifs-chat-panel', `ifs-chat-panel--${size}`, 'ifs-cooper-surface', isDrop && 'ifs-cooper-surface--drop', className)} style={style}
      onDragOver={onFiles ? e => { e.preventDefault(); setDrag(true); } : undefined}
      onDragLeave={onFiles ? e => { if (!e.currentTarget.contains(e.relatedTarget)) setDrag(false); } : undefined}
      onDrop={onFiles ? e => { e.preventDefault(); setDrag(false); onFiles([...e.dataTransfer.files]); } : undefined} {...rest}>
      {onResizeStart && <span className="ifs-chat-panel__resize" onPointerDown={onResizeStart} aria-hidden />}
      <ChatHeader title={title} size={size} newChat={newChat} onNewChat={onNewChat} onHistory={onHistory} historyOpen={historyOpen}
        onResize={onResize} onMore={onMore} onClose={onClose} onDragStart={onDragStart} />
      <div className="ifs-chat-panel__body">
        {speech ? <div className="ifs-chat-panel__speech">{speech}</div>
          : showEmpty ? <div className="ifs-chat-panel__empty">
            <span className="ifs-chat-panel__empty-title">What’s on the agenda today?</span>
            {size === 'full' && prompts.length > 0 && <div className="ifs-chat-panel__chips">{prompts.map(p => <IFS.PromptButton key={p} size="l" onClick={() => onPrompt && onPrompt(p)}>{p}</IFS.PromptButton>)}</div>}
          </div>
          : <div className="ifs-chat-panel__scroll" ref={scrollRef}>{children}</div>}
        {isDrop && <div className="ifs-chat-panel__drop"><IFS.Icon name="system-upload" size={24} />Drop files to add them to the chat</div>}
        <div className="ifs-chat-panel__bottom">
          {type === 'voice'
            ? <VoiceMessageInput state={analyzing ? 'analyzing' : speech ? 'speaking' : 'default'} onAttach={onAttach} onKeyboard={() => onTypeChange && onTypeChange('text')} onStop={onStop} />
            : <TextMessageInput value={inputValue} onChange={onInputChange} onSend={onSend} analyzing={analyzing} onStop={onStop} onAttach={onAttach}
                onVoice={() => onTypeChange && onTypeChange('voice')} attachments={attachments} onRemoveAttachment={onRemoveAttachment}
                placeholder={placeholder || (newChat && showEmpty ? 'Write anything, I’m reading' : 'Ask a follow-up')} />}
        </div>
      </div>
    </section>
  );
}

// Figma: chat-compact-panel-organism (e56a350db527…) — "floating-window" (Patterns 12:263560). 320×360 floating window.
// Props: type voice|text, title, newChat, children (conversation: UserMessage / CooperMessage; omit for the empty state),
// speech (voice transcript shown large while the user talks), input: inputValue/onInputChange/onSend/analyzing/onStop/attachments/
// onRemoveAttachment/onAttach/onTypeChange, onFiles(files) (drag & drop → Figma State=Drop file), dropping (forced),
// header: onNewChat/onHistory/onResize (→ full panel)/onMore/onClose, onDragStart (drag the window by its title).
function ChatCompactPanel(props) { return <ChatPanel size="compact" {...props} />; }

// Figma: chat-full-panel-organism (1b6802cb1c70…) — "right-side-panel-chat" (Patterns 67:119975 / 67:120161). 450px docked side panel.
// Same props as ChatCompactPanel plus prompts (Figma show-chips: PromptButton L in the empty state) + onPrompt,
// historyOpen, onResizeStart (pointerdown on the left edge: drag to make the panel wider/narrower).
function ChatFullPanel(props) { return <ChatPanel size="full" {...props} />; }

// ============================================================ history

// Figma: folder-item (3f47ea5f2935…) (Patterns 12:264108). One row in history: smart folder, user folder, Search, Start new chat.
// Props: icon (default chat-folder), children = name, count (Show counter), active, onClick, onMore (⋯ on hover),
// selectable + selected + onSelectedChange (multi-select mode: checkbox replaces the icon), renaming + onRename(name) + onCancelRename,
// state hover (gallery).
function FolderItem({ icon = 'chat-folder', iconVariant, children, count, active, onClick, onMore, selectable, selected, onSelectedChange, renaming, onRename, onCancelRename, state, className, ...rest }) {
  const [draft, setDraft] = React.useState(typeof children === 'string' ? children : '');
  React.useEffect(() => { if (renaming) setDraft(typeof children === 'string' ? children : ''); }, [renaming]);
  if (renaming) return (
    <div className={IFS.cx('ifs-hrow', 'ifs-hrow--rename', className)} {...rest}>
      <IFS.Icon name={icon} size={16} variant={iconVariant} />
      <input className="ifs-hrow__input" autoFocus value={draft} aria-label="Folder name" onChange={e => setDraft(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && draft.trim()) onRename && onRename(draft.trim()); if (e.key === 'Escape') onCancelRename && onCancelRename(); }} />
      <span className="ifs-hrow__actions">
        <Btn icon="system-check" label="Save" size="s" tip={false} onClick={() => draft.trim() && onRename && onRename(draft.trim())} />
        <Btn icon="system-close" label="Cancel" size="s" tip={false} onClick={onCancelRename} />
      </span>
    </div>
  );
  const click = selectable ? () => onSelectedChange && onSelectedChange(!selected) : onClick;
  return (
    <div role="button" tabIndex={0} aria-pressed={selectable ? !!selected : undefined} aria-current={active ? 'true' : undefined} data-state={state}
      onClick={click} onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) { e.preventDefault(); click && click(); } }}
      className={IFS.cx('ifs-hrow', (active || selected) && 'ifs-hrow--active', className)} {...rest}>
      {selectable ? <span className={IFS.cx('ifs-hrow__check', selected && 'ifs-hrow__check--on')}>{selected && <IFS.Icon name="system-check" size={12} />}</span>
        : <IFS.Icon name={icon} size={16} variant={iconVariant} />}
      <span className="ifs-hrow__label">{children}</span>
      {count != null && <span className="ifs-hrow__rest"><IFS.Counter>{count}</IFS.Counter></span>}
      {onMore && !selectable && <span className="ifs-hrow__hover" onClick={e => e.stopPropagation()}><Btn icon="system-dots-horizont" label="More" size="s" tip={false} onClick={e => onMore(e)} /></span>}
    </div>
  );
}

// Figma: section-header (a638f470f66c…) (Patterns 12:264342). "Folders 5" / "Chats 35" heading in history.
// Props: heading, count (Show counter), icon (Figma shows chat-history; omit to hide), actions [{ icon, label, onClick }] (Show actions, on hover).
function SectionHeader({ heading, count, icon, actions = [], state, className, ...rest }) {
  return (
    <div className={IFS.cx('ifs-section-header', className)} data-state={state} {...rest}>
      <span className="ifs-section-header__heading">{icon && <IFS.Icon name={icon} size={16} />}{heading}{count != null && <IFS.Counter>{count}</IFS.Counter>}</span>
      {actions.length > 0 && <span className="ifs-section-header__actions">{actions.map(a => <Btn key={a.label} icon={a.icon} label={a.label} size="s" onClick={a.onClick} />)}</span>}
    </div>
  );
}

// Figma: chat-history-card (a81629cbaf9e…) (Patterns 12:264367). One chat in history.
// Props: title, time ("3h ago", "Mar 26"), pinned (Type=pinned: pin icon), active (open chat), onClick, onMore (⋯ on hover — replaces the time),
// selectable/selected/onSelectedChange (Select mode), renaming/onRename/onCancelRename, state hover (gallery).
function ChatHistoryCard({ title, time, pinned, active, onClick, onMore, selectable, selected, onSelectedChange, renaming, onRename, onCancelRename, state, className, ...rest }) {
  const [draft, setDraft] = React.useState(title);
  React.useEffect(() => { if (renaming) setDraft(title); }, [renaming]);
  if (renaming) return (
    <div className={IFS.cx('ifs-hrow', 'ifs-hrow--rename', className)} {...rest}>
      <input className="ifs-hrow__input" autoFocus value={draft} aria-label="Chat title" onChange={e => setDraft(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && draft.trim()) onRename && onRename(draft.trim()); if (e.key === 'Escape') onCancelRename && onCancelRename(); }} />
      <span className="ifs-hrow__actions">
        <Btn icon="system-check" label="Save" size="s" tip={false} onClick={() => draft.trim() && onRename && onRename(draft.trim())} />
        <Btn icon="system-close" label="Cancel" size="s" tip={false} onClick={onCancelRename} />
      </span>
    </div>
  );
  const click = selectable ? () => onSelectedChange && onSelectedChange(!selected) : onClick;
  return (
    <div role="button" tabIndex={0} data-state={state} aria-current={active ? 'true' : undefined} aria-pressed={selectable ? !!selected : undefined}
      onClick={click} onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) { e.preventDefault(); click && click(); } }}
      className={IFS.cx('ifs-hrow', (active || selected) && 'ifs-hrow--active', className)} {...rest}>
      {selectable && <span className={IFS.cx('ifs-hrow__check', selected && 'ifs-hrow__check--on')}>{selected && <IFS.Icon name="system-check" size={12} />}</span>}
      {pinned && <IFS.Icon name="chat-pin" size={12} />}
      <span className="ifs-hrow__label">{title}</span>
      {time && <span className={IFS.cx('ifs-hrow__time', onMore && !selectable && 'ifs-hrow__rest')}>{time}</span>}
      {onMore && !selectable && <span className="ifs-hrow__hover" onClick={e => e.stopPropagation()}><Btn icon="system-dots-horizont" label="More" size="s" tip={false} onClick={e => onMore(e)} /></span>}
    </div>
  );
}

// Figma: search-chat-history-card (94783d9b1419…) (Patterns 67:120339). A search hit: title with the query highlighted, time,
// currentChat (badge "Current" — Figma current chat?), onClick.
function SearchChatHistoryCard({ title, query = '', time, currentChat, onClick, state, className, ...rest }) {
  const i = query ? title.toLowerCase().indexOf(query.toLowerCase()) : -1;
  const label = i < 0 ? title : <>{title.slice(0, i)}<mark>{title.slice(i, i + query.length)}</mark>{title.slice(i + query.length)}</>;
  return (
    <div role="button" tabIndex={0} data-state={state} onClick={onClick} onKeyDown={e => { if (e.key === 'Enter') onClick && onClick(); }}
      className={IFS.cx('ifs-hrow', className)} {...rest}>
      <span className="ifs-hrow__label">{label}</span>
      {currentChat && <IFS.Badge color="white" size="m">Current</IFS.Badge>}
      {time && <span className="ifs-hrow__time">{time}</span>}
    </div>
  );
}

// Figma: chat-reminder-card (0dd1e3f87389…) (Patterns 12:265339). A chat with a reminder in the Reminders smart folder.
// Props: title, badge ("In 4 days" — Badge Black M), due ("May 2"), active, onClick, onMore (hover).
function ChatReminderCard({ title, badge, due, active, onClick, onMore, state, className, ...rest }) {
  return (
    <div role="button" tabIndex={0} data-state={state} onClick={onClick} onKeyDown={e => { if (e.key === 'Enter') onClick && onClick(); }}
      className={IFS.cx('ifs-hrow', 'ifs-hrow--reminder', active && 'ifs-hrow--active', className)} {...rest}>
      <span className="ifs-hrow__line"><span className="ifs-hrow__label">{title}</span>
        {onMore && <span className="ifs-hrow__hover" onClick={e => e.stopPropagation()}><Btn icon="system-dots-horizont" label="More" size="s" tip={false} onClick={onMore} /></span>}</span>
      <span className="ifs-hrow__line">{badge && <IFS.Badge color="black" size="m">{badge}</IFS.Badge>}<span className="ifs-hrow__due">Due {due}</span></span>
    </div>
  );
}

// Figma: history-panel-molecule (a0999afa6b27…) — "chat history" (Patterns 12:264137). 240px column docked left of the full panel.
// Props: chats [{ id, title, time, group today|week|earlier, pinned }], folders [{ id, name, count, icon }], smart { reminders, recommendations, trash } counts,
// activeChatId, onOpenChat(id), onNewChat, onSearch, onOpenFolder(id) ('reminders'|'recommendations'|'trash'|folder id), onCollapse,
// folderLimit (default 3: "See all" expands), onFolderMore(folder, event), onChatMore(chat, event), onFoldersMore(event), onChatsMore(event),
// selecting ('chats'|'folders'|null) + selected (ids) + onSelectedChange(ids), renamingId + onRename(id, name) + onCancelRename,
// footer (node — e.g. the Move / Delete bar in Select mode). Empty chats → Figma Property 1=empty.
function HistoryPanel({ chats = [], folders = [], smart = {}, activeChatId, onOpenChat, onNewChat, onSearch, onOpenFolder, onCollapse, folderLimit = 3,
  onFolderMore, onChatMore, onFoldersMore, onChatsMore, selecting, selected = [], onSelectedChange, renamingId, onRename, onCancelRename, footer, className, ...rest }) {
  const [allFolders, setAllFolders] = React.useState(false);
  const toggle = id => onSelectedChange && onSelectedChange(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);
  const groups = [['today', 'Today'], ['week', 'This week'], ['earlier', 'Earlier']];
  const pinned = chats.filter(c => c.pinned);
  const shownFolders = allFolders ? folders : folders.slice(0, folderLimit);
  const card = c => <ChatHistoryCard key={c.id} title={c.title} time={c.time} pinned={c.pinned} active={c.id === activeChatId} onClick={() => onOpenChat && onOpenChat(c.id)}
    onMore={onChatMore ? e => onChatMore(c, e) : undefined} selectable={selecting === 'chats'} selected={selected.includes(c.id)} onSelectedChange={() => toggle(c.id)}
    renaming={renamingId === c.id} onRename={name => onRename && onRename(c.id, name)} onCancelRename={onCancelRename} />;
  return (
    <aside aria-label="Chat history" className={IFS.cx('ifs-history', className)} {...rest}>
      <div className="ifs-history__head"><span className="ifs-history__title"><span>Chat history</span></span>{onCollapse && <Btn icon="arrow-bar-right" label="Hide history" size="s" onClick={onCollapse} />}</div>
      <div className="ifs-history__scroll">
        <div className="ifs-history__section"><div className="ifs-history__list">
          <FolderItem icon="system-search" onClick={onSearch}>Search</FolderItem>
          <FolderItem icon="system-plus" onClick={onNewChat}>Start a new chat</FolderItem>
        </div></div>
        {chats.length > 0 && <>
          <div className="ifs-history__section"><div className="ifs-history__list">
            <FolderItem icon="system-clock-time" count={smart.reminders} onClick={() => onOpenFolder && onOpenFolder('reminders')}>Reminders</FolderItem>
            <FolderItem icon="cooper-system-icon" iconVariant="Default" count={smart.recommendations} onClick={() => onOpenFolder && onOpenFolder('recommendations')}>Recommendations</FolderItem>
            <FolderItem icon="system-trash-delete" count={smart.trash} onClick={() => onOpenFolder && onOpenFolder('trash')}>Trash</FolderItem>
          </div></div>
          <div className="ifs-history__section">
            <SectionHeader heading="Folders" count={folders.length} actions={onFoldersMore ? [{ icon: 'system-dots-horizont', label: 'Folder actions', onClick: onFoldersMore }] : []} />
            {folders.length ? <div className="ifs-history__list">{shownFolders.map(f => (
              <FolderItem key={f.id} icon={f.icon || 'chat-folder'} count={f.count} onClick={() => onOpenFolder && onOpenFolder(f.id)}
                onMore={onFolderMore ? e => onFolderMore(f, e) : undefined} selectable={selecting === 'folders'} selected={selected.includes(f.id)} onSelectedChange={() => toggle(f.id)}
                renaming={renamingId === f.id} onRename={name => onRename && onRename(f.id, name)} onCancelRename={onCancelRename}>{f.name}</FolderItem>))}
            </div> : <div className="ifs-history__empty">No folders yet</div>}
            {folders.length > folderLimit && <button type="button" className="ifs-history__see-all" aria-expanded={allFolders} onClick={() => setAllFolders(!allFolders)}>
              {allFolders ? 'Show less' : 'See all'} <IFS.Icon name={allFolders ? 'arrow-caret-up-filled' : 'arrow-caret-down-filled'} size={12} /></button>}
          </div>
          <div className="ifs-history__section">
            <SectionHeader heading="Chats" count={chats.length} actions={onChatsMore ? [{ icon: 'system-dots-horizont', label: 'Chat actions', onClick: onChatsMore }] : []} />
            {pinned.length > 0 && <><div className="ifs-history__date">Pinned</div><div className="ifs-history__list">{pinned.map(card)}</div></>}
            {groups.map(([g, label]) => {
              const list = chats.filter(c => (c.group || 'earlier') === g && !c.pinned);
              return list.length ? <React.Fragment key={g}><div className="ifs-history__date">{label}</div><div className="ifs-history__list">{list.map(card)}</div></React.Fragment> : null;
            })}
          </div>
        </>}
        {chats.length === 0 && <div className="ifs-history__empty">No chats yet. Start a new chat and it will appear here.</div>}
      </div>
      {footer}
    </aside>
  );
}

// Figma: folder content (3194c4515e7f…) (Patterns 12:264418). Second 240px column listing one folder's chats.
// Props: type general|reminders|insight|trash (Smart folders reminders/insight(Recommendations)/trash are system-managed),
// title, children (rows: ChatHistoryCard / ChatReminderCard), count, onBack (general folders), onMore, onCollapse, empty (text).
function FolderContent({ type = 'general', title, count, children, onBack, onMore, onCollapse, empty = 'This folder is empty', className, ...rest }) {
  const icon = { reminders: 'system-clock-time', insight: 'cooper-system-icon', trash: 'system-trash-delete' }[type];
  const kids = React.Children.toArray(children);
  return (
    <aside aria-label={title} className={IFS.cx('ifs-history', className)} {...rest}>
      <div className={IFS.cx('ifs-history__head', 'ifs-history__head--back')}>
        <span className="ifs-history__title">
          {onBack ? <Btn icon="arrow-left" label="Back" size="s" onClick={onBack} /> : icon && <span style={{ display: 'inline-flex', padding: 4 }}><IFS.Icon name={icon} variant={type === 'insight' ? 'Default' : undefined} size={16} /></span>}
          <span>{title}</span>
        </span>
        <span style={{ display: 'flex' }}>
          {onMore && <Btn icon="system-dots-horizont" label="More" size="s" onClick={onMore} />}
          {onCollapse && <Btn icon="arrow-bar-right" label="Hide folder" size="s" onClick={onCollapse} />}
        </span>
      </div>
      <div className="ifs-history__scroll"><div className="ifs-history__section">
        <SectionHeader heading="All" count={count ?? kids.length} />
        {type === 'trash' && <div className="ifs-history__date" style={{ textTransform: 'none' }}>Deleted chats are kept for 30 days</div>}
        {kids.length ? <div className="ifs-history__list">{kids}</div> : <div className="ifs-history__empty">{empty}</div>}
      </div></div>
    </aside>
  );
}

// Figma: confirm-delete-card-molecule — one selected item listed in a Delete / Move modal; ✕ deselects it (the item is not deleted).
// Props: children = name, icon (optional), onRemove.
function ConfirmDeleteCard({ children, icon, onRemove, className, ...rest }) {
  return (
    <div className={IFS.cx('ifs-confirm-card', className)} {...rest}>
      {icon && <IFS.Icon name={icon} size={16} />}
      <span className="ifs-confirm-card__label">{children}</span>
      {onRemove && <Btn icon="system-close" label={`Remove ${typeof children === 'string' ? children : ''} from selection`} size="s" tip={false} onClick={onRemove} />}
    </div>
  );
}

// History search overlay (Patterns "History- search" 67:125364): search field + results grouped by time, matches highlighted.
// Props: chats (as HistoryPanel), query / defaultQuery / onQueryChange, onOpenChat(id), onClose, activeChatId.
function HistorySearch({ chats = [], query, defaultQuery = '', onQueryChange, onOpenChat, onClose, activeChatId, className, ...rest }) {
  const [q, setQ] = useCtl(query, defaultQuery, onQueryChange);
  const hits = chats.filter(c => !q || c.title.toLowerCase().includes(q.toLowerCase()));
  const groups = [['today', 'Today'], ['week', 'This week'], ['earlier', 'Earlier']];
  return (
    <div role="dialog" aria-label="Search chats" className={IFS.cx('ifs-history-search', 'ifs-cooper-surface', className)} {...rest}
      onKeyDown={e => { if (e.key === 'Escape') onClose && onClose(); }}>
      <div className="ifs-history-search__field">
        <IFS.Icon name="system-search" size={16} />
        <input autoFocus value={q} placeholder="Search chats" aria-label="Search chats" onChange={e => setQ(e.target.value)} />
        <Btn icon="system-close" label="Close search" size="s" tip={false} onClick={onClose} />
      </div>
      <div className="ifs-history-search__list">
        {hits.length === 0 && <IFS.EmptyState cause="no-results" heading="No results found" body="Try a different word or check the spelling." />}
        {groups.map(([g, label]) => {
          const list = hits.filter(c => (c.group || 'earlier') === g);
          return list.length ? <React.Fragment key={g}><div className="ifs-history__date">{label}</div>
            {list.map(c => <SearchChatHistoryCard key={c.id} title={c.title} query={q} time={c.time} currentChat={c.id === activeChatId} onClick={() => onOpenChat && onOpenChat(c.id)} />)}
          </React.Fragment> : null;
        })}
      </div>
    </div>
  );
}

// Pattern helper: action menu for history rows — built from Menu, anchored at the clicked ⋯ (a DOMRect) so the scroll area can't clip it.
// Props: anchor (DOMRect), items [{ icon, label, onClick, hidden, danger }], onClose.
function CooperMenu({ anchor, items = [], onClose }) {
  if (!anchor) return null;
  return <IFS.Menu anchor={anchor} open onOpenChange={o => { if (!o && onClose) onClose(); }} items={items} width={180} align="end" label="Chat actions" />;
}

// ============================================================ recommendations (agent window)

// Figma: agent-window-organism (31ba15a9885c…) (Patterns 12:264637 / "agent-window" 12:32092). Cooper's proactive window for recommendations.
// Props: view expanded|collapsed (Figma View), speaking / defaultSpeaking / onSpeakingChange (speaking-control), text (insight text),
// children (Content slot), secondaryAction / tertiaryAction = { label, onClick } (footer buttons; Figma Show all buttons), onAsk ("Ask" →
// opens the Cooper chat; recommendations and chat are never open together), onViewChange(view), onClose.
function AgentWindow({ view, defaultView = 'expanded', onViewChange, speaking, defaultSpeaking = true, onSpeakingChange, text, children,
  secondaryAction, tertiaryAction, onAsk, onClose, className, style, ...rest }) {
  const [v, setV] = useCtl(view, defaultView, onViewChange);
  const collapsed = v === 'collapsed';
  return (
    <section aria-label="Cooper recommendations" className={IFS.cx('ifs-agent', 'ifs-cooper-surface', collapsed && 'ifs-agent--collapsed', className)} style={style} {...rest}>
      <div className="ifs-agent__head">
        <span className="ifs-agent__brand"><CooperMark />Cooper</span>
        <span className="ifs-agent__mid"><SpeakingControl speaking={speaking} defaultSpeaking={defaultSpeaking} onSpeakingChange={onSpeakingChange} /></span>
        <span className="ifs-agent__tools">
          {onAsk && <IFS.Button type="secondary" onClick={onAsk}>Ask</IFS.Button>}
          <Btn icon={collapsed ? 'arrow-diagonal-expand' : 'arrow-diagonal-minimize-collapse'} label={collapsed ? 'Expand' : 'Collapse'} size="s" onClick={() => setV(collapsed ? 'expanded' : 'collapsed')} />
          {onClose && <Btn icon="system-close" label="Close" size="s" onClick={onClose} />}
        </span>
      </div>
      {!collapsed && <>
        <div className="ifs-agent__body">
          {text && <p className="ifs-agent__text">{text}</p>}
          {children}
        </div>
        {(secondaryAction || tertiaryAction) && <div className="ifs-agent__buttons">
          {tertiaryAction && <IFS.Button type="tertiary" onClick={tertiaryAction.onClick}>{tertiaryAction.label}</IFS.Button>}
          {secondaryAction && <IFS.Button type="secondary" onClick={secondaryAction.onClick}>{secondaryAction.label}</IFS.Button>}
        </div>}
      </>}
    </section>
  );
}

// Impact table of a recommendation: the two metrics the backend marks as most affected (Figma note: the UI renders whichever two are passed).
// Props: rows [{ label, value, delta }].
function RecommendationImpact({ rows = [] }) {
  return (
    <div className="ifs-rec-impact">
      <div className="ifs-rec-impact__title">Impact</div>
      {rows.map(r => <div key={r.label} className="ifs-rec-impact__row">
        <span className="ifs-rec-impact__label" title={r.label}>{r.label}</span>
        <span className="ifs-rec-impact__value">{r.value}</span>
        <span className="ifs-rec-impact__delta">{r.delta != null && <><IFS.Icon name="arrow-caret-up-filled" size={12} />{r.delta}</>}</span>
      </div>)}
    </div>
  );
}

// Recommendation group (Figma: Slot with Caption title + counter inside agent-window). Props: title, count, children (RecommendationItems).
function RecommendationGroup({ title, count, children }) {
  return (
    <div className="ifs-rec-group">
      <div className="ifs-rec-group__title"><span>{title}</span><IFS.Counter>{count ?? React.Children.count(children)}</IFS.Counter></div>
      <div className="ifs-rec-group__items">{children}</div>
    </div>
  );
}

// Recommendation item — Figma "list-item" (68fd47d4cc84…, = capex-card in IFS DS) inside agent-window: caret + title; expanded shows
// description, impact table and an action (Explore). Props: title, description, impact rows, expanded / defaultExpanded / onExpandedChange,
// action = { label, onClick } (default Explore).
function RecommendationItem({ title, description, impact = [], expanded, defaultExpanded = false, onExpandedChange, action, className, ...rest }) {
  const [open, setOpen] = useCtl(expanded, defaultExpanded, onExpandedChange);
  return (
    <div className={IFS.cx('ifs-rec-item', className)} {...rest}>
      <button type="button" className="ifs-rec-item__toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        <IFS.Icon name={open ? 'arrow-caret-down-filled' : 'arrow-caret-right-filled'} size={16} />{title}
      </button>
      {open && <>
        {description && <p className="ifs-rec-item__desc">{description}</p>}
        {impact.length > 0 && <RecommendationImpact rows={impact} />}
        {action && <IFS.Button type="tertiary" onClick={action.onClick}>{action.label}</IFS.Button>}
      </>}
    </div>
  );
}

// One recommendation in Shape mode (Figma "Shape mode expanded" 67:108940): Back, title, description, impact, Decline / Do it.
// Props: title, description, impact, onBack, onDecline, onApply.
function RecommendationDetail({ title, description, impact = [], onBack, onDecline, onApply }) {
  return (
    <div className="ifs-rec-detail">
      {onBack && <span><IFS.Button type="ghost" size="s" iconLeft="arrow-left" onClick={onBack}>Back</IFS.Button></span>}
      <h3 className="ifs-rec-detail__title">{title}</h3>
      {description && <p className="ifs-rec-detail__desc">{description}</p>}
      <RecommendationImpact rows={impact} />
      <div className="ifs-cooper-msg__buttons" style={{ paddingTop: 4 }}>
        <IFS.Button type="tertiary" onClick={onDecline}>Decline</IFS.Button>
        <IFS.Button type="secondary" onClick={onApply}>Do it</IFS.Button>
      </div>
    </div>
  );
}

// ============================================================ pattern components (behaviour)

const STRATEGY_ANSWER = {
  title: 'Current strategy overview',
  steps: ['Reviewing framework structure', 'Checking value model freshness', 'Summarising health'],
  reasoning: [
    'Cross-referenced your current network state with 31 external benchmarks from utilities operating in similar geographic and load conditions',
    'Executed 4 simulation scenarios (Balanced, Cost-Sensitive, Aggressive Maintenance, and Full Load Redistribution) and performed multi-objective optimization',
  ],
  text: 'Your Strategy Framework is in good shape overall. Coverage across all three Enterprise Goals is strong, and 18 of 21 value models are up to date. Two areas need attention: the Carbon footprint model hasn’t been updated in 7 months, and two measures still have no owner.',
  scenarios: {
    title: 'Saved scenarios', aside: 'Capture · Recent Activity',
    cards: [
      { title: 'West District Feeder - Balanced', badges: ['T-902', 'T-887'], meta: ['$3.2M', '2yr', 'saved 3:44 AM'] },
      { title: 'West District - Cost-Sensitive', badges: ['T-902'], meta: ['$1.4M', '1yr', 'saved 4:15 AM'] },
      { title: 'Harbor Substation upgrade', badges: ['Sub-H'], meta: ['$4.8M', '3yr', 'saved 1:40 AM'] },
    ],
    actions: [{ label: 'Open recommended' }, { label: 'View all scenarios' }],
  },
  metrics: [{ category: 'Risk reduction', value: '28–35%' }, { category: 'Payback period', value: '2.1 years' }, { category: 'Estimated savings', value: '$3.2M' }, { category: 'Efficiency gain', value: '+21%' }],
  sources: [{ label: 'Q1 2026 Strategy Framework — coverage report' }, { label: 'Asset health telemetry, last 12 months' }],
  followUps: ['What decisions are waiting?', 'Show agent conflict', 'Auto-confirmed?', 'Defer impact?'],
};
const genericAnswer = q => ({
  title: q.length > 34 ? q.slice(0, 32).trim() + '…' : q,
  steps: ['Reading your question', 'Gathering framework data'],
  reasoning: ['Matched your question against the active Q1 2026 Strategy Framework and its 16 context documents'],
  text: `Here’s what I found for “${q}”. Three value models touch this area; the strongest signal comes from the Risk Exposure Control goal, where coverage dropped 4% this quarter. I’d start by reviewing the two measures without an owner.`,
  sources: [{ label: 'Q1 2026 Strategy Framework' }],
  followUps: ['Which measures have no owner?', 'Show the coverage trend'],
});

// CooperChat — the whole Cooper chat behaviour (pattern component; Patterns "Chat" section 67:121910).
// Sizes: closed (avatar + prompt chips in the bottom sheet) → bar (chat-collapsed-bar, voice by default) → compact (floating window)
// → full (docked side panel). Sending a message adds a UserMessage, then a CooperMessage that runs Analysing (Step n/total) →
// Streaming → Answered; Stop interrupts (keeps the user message; partial answer stays + Regenerate; before any text: Try again).
// Props: size / defaultSize / onSizeChange ('closed'|'bar'|'compact'|'full'), mode / defaultMode ('voice'|'text'),
// messages / defaultMessages / onMessagesChange ([{ id, role:'user'|'cooper', text, status, ... }]), answer(q) → answer data
// (default canned answers), prompts (empty-state chips in the full panel), renderPanel (wrap the full panel, e.g. with HistoryPanel),
// onHistory, historyOpen, speed (ms per streamed word, default 40; 0 = instant), position {right,bottom} for bar/compact,
// fullInset (px around the docked panel), title / defaultTitle / onTitleChange, onNewChat,
// apiRef receives { send(question), setSize(size) } — e.g. bottom-sheet prompt chips send straight into the chat.
function CooperChat({ size, defaultSize = 'closed', onSizeChange, mode, defaultMode = 'voice', onModeChange, messages, defaultMessages = [], onMessagesChange,
  answer, prompts = ['Highlight all my transformers for me in this area', 'I want to explore flood risks along the coast', 'What happens if I don\'t act?'],
  onHistory, historyOpen, renderPanel, speed = 40, position = { right: 60, bottom: 131 }, fullInset = 8, title, defaultTitle = 'New chat', onTitleChange, onNewChat, apiRef, className }) {
  const [sz, setSz] = useCtl(size, defaultSize, onSizeChange);
  const [md, setMd] = useCtl(mode, defaultMode, onModeChange);
  const [msgs, setMsgs] = useCtl(messages, defaultMessages, onMessagesChange);
  const [ttl, setTtl] = useCtl(title, defaultTitle, onTitleChange);
  const [input, setInput] = React.useState('');
  const [files, setFiles] = React.useState([]);
  const [pos, setPos] = React.useState(null);
  const [width, setWidth] = React.useState(450);
  const msgsRef = React.useRef(msgs); msgsRef.current = msgs;
  const timers = React.useRef([]);
  const scrollRef = React.useRef();
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const mounted = React.useRef(false);
  React.useEffect(() => { const el = scrollRef.current; if (el && mounted.current) el.scrollTop = el.scrollHeight; mounted.current = true; }, [msgs]);
  React.useEffect(() => {
    const onKey = e => { if (e.key === '/' && sz === 'closed' && !/input|textarea/i.test(document.activeElement && document.activeElement.tagName)) { e.preventDefault(); setSz('bar'); } };
    document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey);
  }, [sz]);
  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.current.push(t); };
  const patch = (id, p) => setMsgs(msgsRef.current.map(m => m.id === id ? { ...m, ...p } : m));
  const busy = msgs.some(m => m.role === 'cooper' && (m.status === 'analyzing' || m.status === 'streaming'));

  const run = (id, q) => {
    const a = (answer && answer(q)) || (/overview|healthy|strategy/i.test(q) ? STRATEGY_ANSWER : genericAnswer(q));
    const steps = a.steps || ['Working on it'];
    const stepMs = speed ? 900 : 0;
    steps.forEach((label, i) => later(() => { const m = msgsRef.current.find(x => x.id === id); if (m && m.status === 'analyzing') patch(id, { step: { n: i + 1, total: steps.length, label } }); }, i * stepMs));
    const words = a.text.split(' ');
    later(() => {
      const m = msgsRef.current.find(x => x.id === id); if (!m || m.status !== 'analyzing') return;
      patch(id, { ...a, status: speed ? 'streaming' : 'answered', streamed: 0 });
      let shown = 0;
      const tick = () => {
        const cur = msgsRef.current.find(x => x.id === id); if (!cur || cur.status !== 'streaming') return;
        shown += 1;
        const chars = words.slice(0, shown).join(' ').length;
        if (shown >= words.length) { patch(id, { status: 'answered', streamed: undefined }); if (ttl === 'New chat') setTtl(a.title || 'New chat'); }
        else { patch(id, { streamed: chars }); later(tick, speed); }
      };
      if (speed) later(tick, speed); else if (ttl === 'New chat') setTtl(a.title || 'New chat');
    }, steps.length * stepMs);
  };
  const send = (q, att = files) => {
    if (!q && !att.length) return;
    const uid = 'u' + Date.now(), cid = 'c' + Date.now();
    const userText = q || att.map(f => f.name).join(', ');
    setMsgs([...msgsRef.current, { id: uid, role: 'user', text: userText }, { id: cid, role: 'cooper', status: 'analyzing', q: userText, step: { n: 1, total: 3, label: 'Reading your question' } }]);
    setFiles([]); setInput('');
    if (sz === 'bar' || sz === 'closed') setSz('compact');
    later(() => run(cid, userText), 0);
  };
  const stop = () => {
    const m = msgsRef.current.find(x => x.role === 'cooper' && (x.status === 'analyzing' || x.status === 'streaming'));
    if (m) patch(m.id, { status: 'stopped' });
  };
  const retry = id => { const m = msgsRef.current.find(x => x.id === id); if (!m) return; patch(id, { status: 'analyzing', streamed: undefined, step: { n: 1, total: 3, label: 'Reading your question' } }); later(() => run(id, m.q), 0); };
  const edit = (uid, text) => {
    const i = msgsRef.current.findIndex(m => m.id === uid);
    const cid = 'c' + Date.now();
    setMsgs([...msgsRef.current.slice(0, i), { id: uid, role: 'user', text }, { id: cid, role: 'cooper', status: 'analyzing', q: text, step: { n: 1, total: 3, label: 'Reading your question' } }]);
    later(() => run(cid, text), 0);
  };
  if (apiRef) apiRef.current = { send: q => send(q, []), setSize: setSz };
  const newChat = () => { timers.current.forEach(clearTimeout); setMsgs([]); setTtl('New chat'); setFiles([]); onNewChat && onNewChat(); };
  const addFiles = list => setFiles([...files, ...list.map((f, i) => ({ id: f.name + Date.now() + i, name: f.name, meta: f.size ? `${Math.max(1, Math.round(f.size / 1024))} KB` : 'File' }))]);
  const attach = () => addFiles([{ name: `Board directive ${files.length + 1}.pdf`, size: 248000 }]);

  const conversation = msgs.length ? msgs.map(m => m.role === 'user'
    ? <UserMessage key={m.id} onEdit={busy ? undefined : t => edit(m.id, t)}>{m.text}</UserMessage>
    : <CooperMessage key={m.id} {...m} onFollowUp={q => send(q, [])} onOption={q => send(q, [])} onRetry={() => retry(m.id)} onRegenerate={() => retry(m.id)} />) : null;

  const drag = e => {
    if (e.target.closest('button, textarea, input')) return;
    const box = e.currentTarget.closest('.ifs-cooper-float'); const stage = box && box.offsetParent; if (!box || !stage) return;
    const sr = stage.getBoundingClientRect(), br = box.getBoundingClientRect(); const dx = e.clientX - br.left, dy = e.clientY - br.top;
    const move = ev => setPos({ left: Math.min(Math.max(0, ev.clientX - sr.left - dx), sr.width - br.width), top: Math.min(Math.max(0, ev.clientY - sr.top - dy), sr.height - br.height) });
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  };
  const resizeFull = e => {
    const start = e.clientX, w0 = width;
    const move = ev => setWidth(Math.min(720, Math.max(380, w0 + (start - ev.clientX))));
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  };
  const floatStyle = pos ? { left: pos.left, top: pos.top } : { right: position.right, bottom: position.bottom };
  const common = {
    type: md, title: ttl, newChat: msgs.length === 0, children: conversation, inputValue: input, onInputChange: setInput, onSend: q => send(q),
    analyzing: busy, onStop: stop, attachments: files, onRemoveAttachment: id => setFiles(files.filter(f => f.id !== id)), onAttach: attach,
    onTypeChange: setMd, onFiles: addFiles, onNewChat: newChat, onClose: () => setSz('closed'), scrollRef,
  };
  if (sz === 'closed') return null;
  if (sz === 'bar') return (
    <div className={IFS.cx('ifs-cooper-float', 'ifs-cooper-fade', className)} style={floatStyle}>
      <ChatCollapsedBar type={md} onTypeChange={setMd} value={input} onChange={setInput} onSend={q => send(q)} onAttach={() => { attach(); setSz('compact'); }}
        onExpand={() => setSz('compact')} autoFocus={md === 'text'} onPointerDown={drag} />
    </div>
  );
  if (sz === 'compact') return (
    <div className={IFS.cx('ifs-cooper-float', 'ifs-cooper-fade', className)} style={floatStyle}>
      <ChatCompactPanel {...common} onResize={() => setSz('full')} onHistory={() => { setSz('full'); onHistory && onHistory(true); }} onDragStart={drag} />
    </div>
  );
  const panel = <ChatFullPanel {...common} prompts={prompts} onPrompt={q => send(q, [])} onResize={() => { setSz('compact'); onHistory && historyOpen && onHistory(false); }}
    onHistory={onHistory ? () => onHistory(!historyOpen) : undefined} historyOpen={historyOpen} onResizeStart={resizeFull} style={{ width, height: '100%' }} />;
  return (
    <div className={IFS.cx('ifs-cooper-float', 'ifs-cooper-fade', className)} style={{ top: fullInset, right: fullInset, bottom: fullInset }}>
      {renderPanel ? renderPanel(panel) : panel}
    </div>
  );
}

// CooperHistory — chat history behaviour (pattern component; Patterns "history - …" sections 67:125364…67:129441).
// Renders HistoryPanel (+ FolderContent when a folder is open) with the row menus, Select mode, rename, pin, move-to-folder,
// delete (→ Trash, kept 30 days), folders (create with icon, rename, delete — chats inside are kept) and the search overlay.
// Smart folders (Reminders / Recommendations / Trash) are system-managed: no rename/delete.
// Props: chats / defaultChats / onChatsChange ([{ id, title, time, group, pinned, folder, smart:'reminders'|'recommendations', trashed, badge, due }]),
// folders / defaultFolders / onFoldersChange ([{ id, name, icon }]), activeChatId, onOpenChat(id), onNewChat, onCollapse,
// openFolder / defaultOpenFolder / onOpenFolderChange.
function CooperHistory({ chats, defaultChats = [], onChatsChange, folders, defaultFolders = [], onFoldersChange, activeChatId, onOpenChat, onNewChat, onCollapse,
  openFolder, defaultOpenFolder = null, onOpenFolderChange }) {
  const [list, setList] = useCtl(chats, defaultChats, onChatsChange);
  const [fols, setFols] = useCtl(folders, defaultFolders, onFoldersChange);
  const [open, setOpen] = useCtl(openFolder, defaultOpenFolder, onOpenFolderChange);
  const [selecting, setSelecting] = React.useState(null);
  const [selected, setSelected] = React.useState([]);
  const [renaming, setRenaming] = React.useState(null);
  const [menu, setMenu] = React.useState(null);
  const [modal, setModal] = React.useState(null);
  const [search, setSearch] = React.useState(false);
  const [newFolder, setNewFolder] = React.useState({ name: '', icon: 'chat-folder' });
  const [moveTo, setMoveTo] = React.useState(null);
  const live = list.filter(c => !c.trashed);
  const upd = (ids, p) => setList(list.map(c => ids.includes(c.id) ? { ...c, ...(typeof p === 'function' ? p(c) : p) } : c));
  const endSelect = () => { setSelecting(null); setSelected([]); };
  const at = e => e.currentTarget.getBoundingClientRect();
  const chatMenu = (c, e) => setMenu({ anchor: at(e), items: [
    { icon: 'chat-pin', label: c.pinned ? 'Unpin' : 'Pin', onClick: () => upd([c.id], { pinned: !c.pinned }) },
    { icon: 'system-edit-rename', label: 'Rename', onClick: () => setRenaming(c.id) },
    { icon: 'chat-folder-move', label: 'Move to folder', onClick: () => { setMoveTo(null); setModal({ kind: 'move', ids: [c.id] }); } },
    { icon: 'system-square-check', label: 'Select', onClick: () => { setSelecting('chats'); setSelected([c.id]); } },
    { icon: 'system-trash-delete', label: 'Delete', onClick: () => setModal({ kind: 'delete', ids: [c.id] }) },
  ] });
  const folderMenu = (f, e) => setMenu({ anchor: at(e), items: [
    { icon: 'system-edit-rename', label: 'Rename', onClick: () => setRenaming(f.id) },
    { icon: 'system-square-check', label: 'Select', onClick: () => { setSelecting('folders'); setSelected([f.id]); } },
    { icon: 'system-trash-delete', label: 'Delete', onClick: () => setModal({ kind: 'deleteFolders', ids: [f.id] }) },
  ] });
  const foldersMenu = e => setMenu({ anchor: at(e), items: [
    { icon: 'chat-folder-add', label: 'Create folder', onClick: () => { setNewFolder({ name: '', icon: 'chat-folder' }); setModal({ kind: 'createFolder' }); } },
    { icon: 'system-square-check', label: 'Select', onClick: () => setSelecting('folders'), hidden: !fols.length },
    { icon: 'system-trash-delete', label: 'Delete all', onClick: () => setModal({ kind: 'deleteFolders', ids: fols.map(f => f.id) }), hidden: !fols.length },
  ] });
  const chatsMenu = e => setMenu({ anchor: at(e), items: [
    { icon: 'system-square-check', label: 'Select', onClick: () => setSelecting('chats') },
    { icon: 'system-trash-delete', label: 'Delete all', onClick: () => setModal({ kind: 'delete', ids: live.map(c => c.id) }) },
  ] });
  const rename = (id, name) => { if (fols.some(f => f.id === id)) setFols(fols.map(f => f.id === id ? { ...f, name } : f)); else upd([id], { title: name }); setRenaming(null); };
  const modalIds = modal && modal.ids ? modal.ids : [];
  const nameOf = id => (list.find(c => c.id === id) || fols.find(f => f.id === id) || {}).title || (fols.find(f => f.id === id) || {}).name;
  const dropId = id => { const ids = modalIds.filter(x => x !== id); if (!ids.length) setModal(null); else setModal({ ...modal, ids }); setSelected(selected.filter(x => x !== id)); };
  const counts = { reminders: live.filter(c => c.smart === 'reminders').length, recommendations: live.filter(c => c.smart === 'recommendations').length, trash: list.filter(c => c.trashed).length };
  const footer = selecting && (
    <div className="ifs-history__bar">
      <div className="ifs-history__bar-buttons">
        {selecting === 'chats' && <IFS.Button type="secondary" iconLeft="chat-folder-move" disabled={!selected.length} onClick={() => { setMoveTo(null); setModal({ kind: 'move', ids: selected }); }}>Move</IFS.Button>}
        <IFS.Button type="secondary" iconLeft="system-trash-delete" disabled={!selected.length} onClick={() => setModal({ kind: selecting === 'chats' ? 'delete' : 'deleteFolders', ids: selected })}>Delete</IFS.Button>
      </div>
      <div className="ifs-history__bar-count">Selected <IFS.Counter>{selected.length}</IFS.Counter><Btn icon="system-close" label="Cancel selection" size="s" tip={false} onClick={endSelect} /></div>
    </div>
  );
  const folderTitle = { reminders: 'Reminders', recommendations: 'Recommendations', trash: 'Trash' }[open] || (fols.find(f => f.id === open) || {}).name;
  const inFolder = open === 'trash' ? list.filter(c => c.trashed) : open === 'reminders' || open === 'recommendations' ? live.filter(c => c.smart === open) : live.filter(c => c.folder === open);
  const confirm = (title, body, primary, onPrimary) => (
    <IFS.Modal open title={title} width={438} onOpenChange={o => !o && setModal(null)}
      secondaryAction={{ label: 'Cancel', onClick: () => setModal(null) }} primaryAction={{ label: primary, onClick: onPrimary }}>{body}</IFS.Modal>
  );
  return (
    <>
      <HistoryPanel chats={live} folders={fols} smart={counts} activeChatId={activeChatId}
        onOpenChat={id => { setOpen(null); onOpenChat && onOpenChat(id); }} onNewChat={onNewChat} onSearch={() => setSearch(true)} onOpenFolder={id => setOpen(open === id ? null : id)}
        onCollapse={onCollapse} onChatMore={chatMenu} onFolderMore={folderMenu} onFoldersMore={foldersMenu} onChatsMore={chatsMenu}
        selecting={selecting} selected={selected} onSelectedChange={setSelected} renamingId={renaming} onRename={rename} onCancelRename={() => setRenaming(null)} footer={footer} />
      {open && <FolderContent type={{ reminders: 'reminders', recommendations: 'insight', trash: 'trash' }[open] || 'general'} title={folderTitle}
        onBack={['reminders', 'recommendations', 'trash'].includes(open) ? undefined : () => setOpen(null)} onCollapse={() => setOpen(null)}
        onMore={['reminders', 'recommendations', 'trash'].includes(open) ? undefined : e => folderMenu(fols.find(f => f.id === open), e)}
        empty={open === 'trash' ? 'Trash is empty' : 'No chats in this folder yet'}>
        {inFolder.map(c => open === 'reminders'
          ? <ChatReminderCard key={c.id} title={c.title} badge={c.badge} due={c.due} active={c.id === activeChatId} onClick={() => onOpenChat && onOpenChat(c.id)} />
          : <ChatHistoryCard key={c.id} title={c.title} time={c.time} active={c.id === activeChatId}
              onClick={open === 'trash' ? undefined : () => onOpenChat && onOpenChat(c.id)}
              onMore={open === 'trash' ? e => setMenu({ anchor: at(e), items: [{ icon: 'arrow-back-up', label: 'Restore', onClick: () => upd([c.id], { trashed: false }) }] }) : e => chatMenu(c, e)} />)}
      </FolderContent>}
      {menu && <CooperMenu anchor={menu.anchor} items={menu.items} onClose={() => setMenu(null)} />}
      {search && <div style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '22vh' }}>
        <IFS.Overlay type="base" onClick={() => setSearch(false)} />
        <HistorySearch chats={live} activeChatId={activeChatId} onClose={() => setSearch(false)} onOpenChat={id => { setSearch(false); onOpenChat && onOpenChat(id); }} style={{ position: 'relative' }} />
      </div>}
      {modal && modal.kind === 'delete' && confirm(modalIds.length === 1 ? 'Delete this chat?' : 'Delete these chats?', <>
        <div className="ifs-confirm-list">{modalIds.map(id => <ConfirmDeleteCard key={id} onRemove={modalIds.length > 1 ? () => dropId(id) : undefined}>{nameOf(id)}</ConfirmDeleteCard>)}</div>
        <p className="ifs-confirm-note">Selected chats will be moved to <b>Trash</b> and permanently deleted after <b>30 days</b></p>
      </>, 'Delete', () => { upd(modalIds, { trashed: true, pinned: false }); setModal(null); endSelect(); })}
      {modal && modal.kind === 'deleteFolders' && confirm(modalIds.length === 1 ? 'Delete this folder?' : 'Delete these folders?', <>
        <div className="ifs-confirm-list">{modalIds.map(id => <ConfirmDeleteCard key={id} icon={(fols.find(f => f.id === id) || {}).icon || 'chat-folder'} onRemove={modalIds.length > 1 ? () => dropId(id) : undefined}>{nameOf(id)}</ConfirmDeleteCard>)}</div>
        <p className="ifs-confirm-note">Chats are not deleted. They are removed from the folder and stay in your history.</p>
      </>, 'Delete', () => { setFols(fols.filter(f => !modalIds.includes(f.id))); setList(list.map(c => modalIds.includes(c.folder) ? { ...c, folder: undefined } : c)); if (modalIds.includes(open)) setOpen(null); setModal(null); endSelect(); })}
      {modal && modal.kind === 'move' && confirm('Move to folder', <>
        {modalIds.length > 1 && <div className="ifs-confirm-list" style={{ marginBottom: 12 }}>{modalIds.map(id => <ConfirmDeleteCard key={id} onRemove={() => dropId(id)}>{nameOf(id)}</ConfirmDeleteCard>)}</div>}
        <div className="ifs-history__list">{fols.length ? fols.map(f => <FolderItem key={f.id} icon={f.icon} active={moveTo === f.id} onClick={() => setMoveTo(f.id)}>{f.name}</FolderItem>)
          : <div className="ifs-history__empty">No folders yet. Create one from the Folders menu.</div>}</div>
      </>, 'Move', () => { if (moveTo) { upd(modalIds, { folder: moveTo }); setModal(null); endSelect(); } })}
      {modal && modal.kind === 'createFolder' && confirm('Create folder', <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <IFS.TextField label="Folder name" placeholder="e.g. Strategy" value={newFolder.name} onChange={v => setNewFolder({ ...newFolder, name: v })} autoFocus />
        <IFS.IconPicker value={newFolder.icon} onChange={v => setNewFolder({ ...newFolder, icon: v })} columns={7} label="Folder icon" bare />
      </div>, 'Create', () => { if (!newFolder.name.trim()) return; setFols([...fols, { id: 'f' + Date.now(), name: newFolder.name.trim(), icon: newFolder.icon }]); setModal(null); })}
    </>
  );
}

// CooperRecommendations — the recommendation flow (pattern component; Patterns "Recommendation" 67:108295).
// List grouped by framework column → Shape walks through them one by one (detail: Decline / Do it) → Do it shows
// "Working on it…" then confirms and moves to the next → all applied closes the window. Decline removes one from the queue;
// Decline all dismisses the queue. Every recommendation is also saved as a chat in the Recommendations smart folder.
// Props: recommendations / defaultRecommendations / onRecommendationsChange ([{ id, group, title, description, impact }]),
// onApply(rec), onDecline(rec), onAsk (opens Cooper chat — the two are never open together), onClose, onDone, speed (ms of the applying step).
function CooperRecommendations({ recommendations, defaultRecommendations = [], onRecommendationsChange, onApply, onDecline, onAsk, onClose, onDone, speed = 1200, style, className }) {
  const [recs, setRecs] = useCtl(recommendations, defaultRecommendations, onRecommendationsChange);
  const [mode, setMode] = React.useState('list');
  const [cur, setCur] = React.useState(null);
  const [note, setNote] = React.useState(null);
  const timer = React.useRef();
  React.useEffect(() => () => clearTimeout(timer.current), []);
  const groups = [...new Set(recs.map(r => r.group))];
  const intro = note || `I’ve found ${recs.length} recommendation${recs.length === 1 ? '' : 's'} that could meaningfully improve how investments are evaluated, prioritized, and aligned with organizational goals.`;
  const remove = r => { const next = recs.filter(x => x.id !== r.id); setRecs(next); return next; };
  const finish = () => { setMode('done'); setNote('All selected recommendations have been applied successfully, enhancing modeling accuracy, risk visibility, and alignment with strategic goals.'); timer.current = setTimeout(() => onDone && onDone(), speed * 2.5); };
  const apply = r => {
    setMode('applying'); onApply && onApply(r);
    timer.current = setTimeout(() => {
      const next = remove(r);
      if (!next.length) return finish();
      setNote(`I’ve added ${r.title.replace(/^Add /, '').toLowerCase()}. Let’s go to the next recommendations.`); setMode('list'); setCur(next[0].id);
    }, speed);
  };
  const decline = r => { onDecline && onDecline(r); const next = remove(r); if (!next.length) { onClose && onClose(); return; } setCur(next[0].id); };
  const current = recs.find(r => r.id === cur);
  let body = null;
  if (mode === 'applying') body = null;
  else if (mode === 'detail' && current) body = <RecommendationDetail {...current} onBack={() => setMode('list')} onDecline={() => decline(current)} onApply={() => apply(current)} />;
  else if (mode === 'list') body = groups.map(g => (
    <RecommendationGroup key={g} title={g}>
      {recs.filter(r => r.group === g).map(r => <RecommendationItem key={r.id} {...r} expanded={cur === r.id} onExpandedChange={o => setCur(o ? r.id : null)}
        action={{ label: 'Explore', onClick: () => { setCur(r.id); setMode('detail'); } }} />)}
    </RecommendationGroup>));
  return (
    <AgentWindow className={className} style={style} onAsk={onAsk} onClose={onClose}
      text={mode === 'applying' ? 'Working on it: Applying to framework structure…' : mode === 'detail' ? null : intro}
      tertiaryAction={mode === 'list' && recs.length > 1 ? { label: 'Decline all', onClick: () => { recs.forEach(r => onDecline && onDecline(r)); setRecs([]); onClose && onClose(); } } : undefined}
      secondaryAction={mode === 'list' && recs.length ? { label: 'Shape', onClick: () => { setCur((current || recs[0]).id); setMode('detail'); } } : undefined}>
      {body}
    </AgentWindow>
  );
}

Object.assign(IFS, {
  CooperRecommendations,
  CooperHistory,
  ChatHeader, UserMessage, Attachment, TextMessageInput, VoiceMessageInput, SpeakingControl, ChatCard, ChatLink, CooperProgress, CooperMessage,
  ChatCollapsedBar, ChatCompactPanel, ChatFullPanel, FolderItem, SectionHeader, ChatHistoryCard, SearchChatHistoryCard, ChatReminderCard,
  HistoryPanel, FolderContent, ConfirmDeleteCard, HistorySearch, CooperMenu, AgentWindow, RecommendationImpact, RecommendationGroup,
  RecommendationItem, RecommendationDetail, CooperChat,
});
export {
  CooperRecommendations,
  CooperHistory,
  ChatHeader, UserMessage, Attachment, TextMessageInput, VoiceMessageInput, SpeakingControl, ChatCard, ChatLink, CooperProgress, CooperMessage,
  ChatCollapsedBar, ChatCompactPanel, ChatFullPanel, FolderItem, SectionHeader, ChatHistoryCard, SearchChatHistoryCard, ChatReminderCard,
  HistoryPanel, FolderContent, ConfirmDeleteCard, HistorySearch, CooperMenu, AgentWindow, RecommendationImpact, RecommendationGroup,
  RecommendationItem, RecommendationDetail, CooperChat,
};
