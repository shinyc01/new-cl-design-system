# IFS DS kit

React code twin of the Figma **IFS Design System** library (`atgUmwcA1AE5sjFoWBT7ar`): tokens exported from Figma variables, icons exported from Figma, and components rebuilt to match Figma exactly. It powers the `ifs-prototype` skill.

This folder has its own rules in [CONVENTIONS.md](CONVENTIONS.md). The repo-root CLAUDE.md rules apply to `DS/` (the older kit), not here.

## Published (GitHub Pages)
Base: `https://shinyc01.github.io/new-cl-design-system/ifs-kit/`
| What | Path |
|---|---|
| Storybook (every component next to its Figma frame) | `dist/storybook/` |
| Prototype bundle (exposes `window.IFS`) | `dist/ifs-ds.js`, `dist/ifs-ds.css` |
| Component API | `dist/api.md` |
| Icon names | `dist/icons.txt` |
| Usage guide | `guide/components.md` |
| Variant examples | `src/gallery/<family>.jsx` |
| Prototype starter | `template.html` |

## Working on it
```bash
npm install
npm run storybook   # review at http://localhost:6006
npm run release     # rebuild everything in dist/ before committing
```
Commit `dist/` with your change: Pages serves the files straight from `master`.
