# Keeping the kit in sync with Figma

Kit source: GitHub repo `shinyc01/new-cl-design-system`, folder `ifs-kit/` (local checkout on the maintainer's Mac: `/Users/schu/Documents/CLAUDE_NEW/CODE/new-cl-design-system/ifs-kit`). Read its `CONVENTIONS.md` before changing anything.
Figma: IFS Design System, file key `atgUmwcA1AE5sjFoWBT7ar`. The Figma MCP reads whichever file is the **active tab in Figma desktop**, so ask the user to bring it to the front first.

## Tokens changed
Re-export with read-only `use_figma` scripts, the same approach as the original export on 2026-10-28:
- Resolve each variable in collection "2. Colors semantic" for mode "Dark mode", in chunks of about 200 (returns over ~20 KB fail).
- Also export "5. Measurements", "3/4. Typography", "6. Effects", the text styles and the effect styles.
- Name rule: `a/b c/d` → `--a-b-c-d` (lowercase; `/`, `,` and spaces become `-`; parentheses dropped).

Replace the matching blocks in `src/tokens.css` and update the date in its header comment. Then run `npm run build-storybook` and review in Storybook.

## A component changed or is new
1. Find it. Component pages: Action 1399:9453, Inputs & Forms 1399:17879, Selection 1399:25312, Navigation 1399:26124, Feedback 3786:15406, Surfaces 1399:13914, Data Display 3501:10172, Data Visualisation 3487:19894.
2. Run `tools/extract-spec.js` (set SET_ID and the variant names) for exact specs, and `get_screenshot` for the visual target.
3. Edit or add `src/components/<family>.css/.jsx`, following CONVENTIONS.md. A new family must also be added to `src/components/index.js`.
4. Add its variant grid to `src/gallery/<family>.jsx` with `IFS_GALLERY.push({ name, figma: '<figma-name> (<node id>)', render })`. Then run `npm run stories` to regenerate its Storybook story, which includes the Figma embed and the usage docs.
5. Check it with `npm run storybook`: open the Design tab and compare with Figma until it matches.
6. Add or update the component's entry in `guide/components.md`. Mark usage lines as (Figma) or (inferred).
7. Run `node build.mjs` so prototypes pick up the change.

## Icons changed
Re-export the Icons page (1399:9134) to `src/icons.js` in batches of about 20 sets per call. Store the inner SVG markup per size, with single colours replaced by `currentColor`.

## Handover usage changed (new audit)
1. Re-scan the handover files with `tools/usage-scan.js`. Each file must be the active Figma tab, and the scan is read-only.
2. Merge the scans into `_resolved.json`. Remap variant keys to their component sets.
3. Run `node tools/gen-usage.mjs <_resolved.json>`, then `npm run release`.

This refreshes `guide/usage.md` / `usage.json` and the **In handovers** lines in api.md. Section 3b of `guide/components.md` is hand-written, so update its numbers when they shift.

## Changing how the skill behaves
Edit `ifs-kit/skill/INSTRUCTIONS.md`, not the loader. Everyone gets the change on their next run once it's pushed. Only change `skill/loader/catalyst-prototype/SKILL.md` if the loader itself must change; that means people reinstall it (from the link below or the zip).

People install the loader from https://shinyc01.github.io/new-cl-design-system/ifs-kit/skill/loader/catalyst-prototype/SKILL.md into `~/.claude/skills/catalyst-prototype/SKILL.md`.

## Publishing a change
Run `npm run release` in `ifs-kit/` (it also copies `tools/inline.sh` and `tools/shot.sh` into `skill/scripts/` and rebuilds the loader zip), then commit everything, including `dist/`, and push to `master`. GitHub Pages serves straight from the branch. Within a minute or two every user of the skill gets the change in their next prototype, and Storybook updates at `https://shinyc01.github.io/new-cl-design-system/ifs-kit/dist/storybook/`. Ask the user before pushing.
