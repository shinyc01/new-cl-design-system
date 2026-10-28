# Brief for agents adding a component family

You are adding components to a React code kit that must match the Figma **IFS Design System** EXACTLY (file key `atgUmwcA1AE5sjFoWBT7ar`). Kit folder: `/Users/schu/Documents/CLAUDE_NEW/CODE/ifs-ds-kit`.

## Read first
- `CONVENTIONS.md`: the rules.
- `src/components/button.css` + `button.jsx` + `src/gallery/button.jsx`: the reference implementation.
- `src/tokens.css`: all tokens.
- `tools/extract-spec.js`: the spec reader.
- `guide/components.md`: usage rules. Search it for each of your components.
- Skim `src/components/index.js` to see what already exists. Reuse kit components via `IFS.X` (Button, IconButton, Icon, Badge, Avatar, Tooltip, Popover, TextField, Select, Chip, Tabs, …) instead of redrawing them.

## Ownership (important: the designer is editing existing files while you work)
- Write ONLY your own new files: `src/components/<family>.css`, `src/components/<family>.jsx`, `src/gallery/<family>.jsx`.
- To try your family in Storybook, add its two import lines to `src/components/index.js` (`import './<family>.css';` and `export * from './<family>.jsx';`). That's the only shared file you may touch, and only to append your own lines.
- Never edit other families, `tokens.css`, `_core.*`, `registry.js`, `build.mjs`, `.storybook/*`, `tools/*`, `CONVENTIONS.md`, `icons.js` or `guide/*`. If you need a shared change (a missing token, an icon, a fix in another component), describe it in your reply.
- Never modify the Figma file. All Figma calls are read-only.

## Method per component
1. Load the tools with ToolSearch: `select:mcp__54cd42aa-78ef-4b68-8fb5-36c819ac886b__use_figma,mcp__54cd42aa-78ef-4b68-8fb5-36c819ac886b__get_screenshot,mcp__54cd42aa-78ef-4b68-8fb5-36c819ac886b__get_figma_skill`.
2. Read `skill://figma/figma-use/SKILL.md` once via get_figma_skill.
3. Pass skillNames `resource:figma-use` and sessionId `e83bf98b-dc66-43d2-bb57-0a2896b3c420` on every call.
4. Switch page at most once per `use_figma` call: `await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(PAGE_ID))`.
5. List the set's componentPropertyDefinitions and variant names. Then paste `tools/extract-spec.js` with SET_ID/WANT filled in for representative variants. Keep each call to 10 variants or fewer: returns over ~20 KB fail with "Failed to parse SSE message". Lower DEPTH for big organisms.
6. Read the canvas notes next to the component (TEXT nodes outside components). They describe behaviour.
7. Take a `get_screenshot` of the set (enableBase64Response true, maxDimension ~1400) as the visual target.
8. Implement with tokens only: variable `a/b/c` → `var(--a-b-c)`.
   - A missing variable becomes `var(--name, #hex)`; list it in your reply.
   - A raw unbound Figma value is fine with a `/* raw in Figma */` comment.
   - Icons: `<IFS.Icon name="…" size={16}/>` using Figma icon names (spec `inst` "system-plus / size=24" → "system-plus"). Check the name exists in `src/icons.js`.
9. Make interactive parts really work: controlled + uncontrolled, keyboard, `:focus-visible` ring, disabled.
10. Add the gallery grid: `IFS_GALLERY.push({ name: '<ComponentName>', figma: '<figma-name> (<node id>)', render })`, showing every variant and state. The gallery file starts like the others: `import React from 'react'; import { IFS } from '../components/index.js'; const IFS_GALLERY = []; export default IFS_GALLERY;`.
11. Verify:
    - Run `node build.mjs`. It must succeed.
    - Run `node tools/gen-stories.mjs`.
    - Make a quick check page: copy `template.html` to `$TMPDIR/<family>-check.src.html`, render your gallery sections in its App (import nothing; use `IFS.X`), then run `node build.mjs inline <src> <out>` and `tools/shot.sh <out> <png> 1280 900`, and Read the PNG.
    - Compare with the Figma screenshot and fix until it matches.
12. The Figma MCP reads the active Figma desktop tab. If node ids suddenly "can't be found", stop and report it.

## Reply (under 250 words)
- Components with their prop APIs, one line each.
- Mismatches vs Figma and why.
- Missing tokens or icons.
- Shared changes needed.
- Figma oddities worth telling the designer.
