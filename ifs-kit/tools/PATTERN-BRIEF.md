# Brief for agents adding a pattern from the Patterns file

You are adding one pattern page from the Figma file **IFS Design System Patterns** (key `KmmVU2D0kqWr0dC1xXNzWw`) to the IFS DS code kit at `/Users/schu/Documents/CLAUDE_NEW/CODE/new-cl-design-system/ifs-kit`.

Patterns are full screens and flows assembled from IFS Design System components, plus written rules on the canvas: sticky notes and description text. The kit must end up able to rebuild the pattern exactly, and the guide must teach an AI when and how to use it.

## Read first
- `CONVENTIONS.md`, and `tools/AGENT-BRIEF.md` for the component method: spec reading, tokens, Icon, gallery and verification. Everything there applies, with the exceptions below.
- `dist/api.md`: every component the kit already has.
- `guide/components.md`: the existing component guide. Each entry has `key: <component-set key>`.

## Figma access (Patterns file)
- Load the tools: ToolSearch `select:mcp__54cd42aa-78ef-4b68-8fb5-36c819ac886b__use_figma,mcp__54cd42aa-78ef-4b68-8fb5-36c819ac886b__get_screenshot,mcp__54cd42aa-78ef-4b68-8fb5-36c819ac886b__get_figma_skill`. Read `skill://figma/figma-use/SKILL.md` once.
- On every call pass fileKey `KmmVU2D0kqWr0dC1xXNzWw`, sessionId `345444ae-1c17-42f3-96c0-0eae7d4ba308` and skillNames `resource:figma-use`.
- The Figma MCP reads whichever file is the active Figma tab. The Patterns file is active. If page or node ids "can't be found", stop and report it.
- Every call is READ-ONLY. Never modify the file. Switch page at most once per call. Keep each return under ~20 KB (chunk text dumps).
- **IFS DS components used here can be read from this file.** For an instance, `await inst.getMainComponentAsync()` returns the library component. Its parent COMPONENT_SET has `key`, `name` and `componentPropertyDefinitions`, and you can run the `tools/extract-spec.js` `spec()` function on the main component or any variant (`mainComponent.parent.children`) for exact specs. `get_screenshot` works on instances in this file.

## Step 1 — Understand the page
1. List the page's sections and top-level frames.
2. Read all canvas notes: sticky notes (instances of `StickyNote` or `Description`) and long TEXT nodes. These hold the pattern's rules: purpose, flows, states, behaviour, do/don't. Group them by the section or frame they sit in.
3. Take `get_screenshot` of the key frames (the main screen states).

## Step 2 — Classify every component the page uses
For each distinct main component used (collect component-set keys):
- **In the kit:** the key matches a `key:` in guide/components.md, and that component appears in api.md. Reuse it.
- **IFS DS component missing from the kit:** published in IFS Design System (check with `search_design_system` and fileKey `KmmVU2D0kqWr0dC1xXNzWw`; the result shows `libraryName`) but not in the kit. Build it, unless another pattern agent owns it (see "Ownership" in your task).
- **Duplicate or legacy:** not found as a current IFS DS component, or an older/alternate version of something the kit has. Examples: `tableCell`/`tableHeader` sets with keys other than table-cell-atom/table-header-molecule, a second `badge`, a second floating bar, `approval-chain-item`/`version-history` (legacy timelines). Do NOT build these.
  - If it clearly serves the same purpose and looks the same or near-identical, map it to the current kit component and record it as **consolidated: X → Y (why)**.
  - If you're unsure (it looks or behaves meaningfully differently), record it as **UNSURE: X vs Y**, with what differs and the node ids for both, and don't build it. The designer decides.
- **Annotation-only** (StickyNote, Description, cursor art, redlines): not product UI. Skip.

## Three tiers: keep them apart
- **Component**: has a published IFS DS Figma component. Its header comment must start `// Figma: <component name> (<node id or key>)`.
- **Pattern helper**: a working composition that implements the page's rules (state hooks, panels, flows). It is not a Figma component. Header comment: `// Pattern helper: <what it does> — built from <kit components>`. Don't make a helper for a one-off layout; that belongs in the example screen.
- **Example**: the page's demo screens. They live only in the gallery file, as `Pattern …` sections, and are never exported.

Don't edit guide/tiers.json. List your Components by export name in your reply, and the maintainer adds them.
When frames and notes disagree, the notes win. Record each such conflict under a "Review" heading in your guide write-up, with node ids.

## Step 3 — Build
Write ONLY these files; `<slug>` is given in your task:
- `src/components/patterns-<slug>.css` and `src/components/patterns-<slug>.jsx`: the missing IFS DS components you own, following CONVENTIONS.md, with header comments `// Figma: <name> (<node id in IFS DS if known, else key>)`. Then add pattern components where Figma shows a reusable composite (e.g. `CooperChatPanel`): compositions of kit components with real behaviour, and no new visuals beyond what Figma draws.
- `src/gallery/patterns-<slug>.jsx`:
  - One section per new component, with every variant and state. Its `figma` string is `'<name> (<node id>)'` for IFS DS node ids, or `'<name> [patterns] (<node id>)'` for nodes in the Patterns file.
  - One or more **"Pattern …"** sections (name must start with `Pattern`, e.g. `'Pattern: Cooper chat'`) that rebuild the main Figma frames as working screens. Use AppShell/NavBar/SideNav/PageHeader etc. exactly as the frames do, with realistic data, and every flow the frames show clickable. Their figma string uses `[patterns]` with the frame's node id.
- `guide/patterns/<slug>.md`: the pattern write-up, concise and with each rule stated once:
  - **What it is / when to use it**
  - **Anatomy**: which kit components make it up, by kit name
  - **Flows and states**
  - **Rules**: from the canvas notes, each marked (Figma) or (inferred)
  - **Don'ts**
  - **Consolidated / unsure**: the list from step 2
- Append your two lines to `src/components/index.js` (`import './patterns-<slug>.css';` and `export * from './patterns-<slug>.jsx';`). That is the only shared file you may touch.

Never edit other families, tokens, tools, the guide's components.md, or other agents' files. If a kit component needs a change (a missing variant, a bug), describe it in your reply instead.

## Step 4 — Verify
- `node build.mjs`, then `node tools/gen-stories.mjs`.
- Build a check page from `template.html` that renders your gallery sections, run `node build.mjs inline …`, then `tools/shot.sh` it, and Read the PNGs.
- Compare against the Figma screenshots and fix until they match. Pattern screens must look like the Figma frames.

## Reply (under 300 words)
- New components, with prop APIs (one line each).
- Pattern components and pattern screens built.
- The consolidated list and the **UNSURE** list (most important: these become questions for the designer).
- Kit changes needed.
- Figma oddities.
