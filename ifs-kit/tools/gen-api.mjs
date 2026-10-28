// Generates dist/api.md: every exported component with the comment block above it (Figma name + props),
// grouped by family, plus a link to that family's variant examples. Published so the prototype skill can
// read component APIs from GitHub Pages instead of a local checkout.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const comp = join(root, 'src/components');
const families = readdirSync(comp).filter(f => f.endsWith('.jsx') && !f.startsWith('_')).sort();
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const PAGES = 'https://shinyc01.github.io/new-cl-design-system/ifs-kit';

let out = `# IFS DS kit — component API

Kit version ${pkg.version}, generated ${new Date().toISOString().slice(0, 10)}. Every component is available as \`IFS.<Name>\` in a prototype.
Each entry is the comment above the component in source (Figma name/node and props). For real usage of every variant,
read the family's examples file (linked per family). \`IFS.Icon({ name, size: 12|16|24, variant })\` takes Figma icon names — see icons.txt.

`;

function entries(file) {
  const lines = readFileSync(join(comp, file), 'utf8').split('\n');
  const m = readFileSync(join(comp, file), 'utf8').match(/^export \{([^}]*)\};?\s*$/m);
  const exported = m ? m[1].split(',').map(s => s.trim().split(/\s+as\s+/)) : [];
  return exported.map(([local, name = local]) => {
    const i = lines.findIndex(l => new RegExp(`^(export\\s+)?(function\\s+${local}\\b|const\\s+${local}\\s*=)`).test(l));
    const isComment = l => /^\s*(\/\/|\*|\/\*)/.test(l);
    const clean = l => l.replace(/^\s*(\/\/ ?|\/\*\*? ?|\* ?)/, '').replace(/\*\/\s*$/, '');
    let doc = [];
    for (let j = i - 1; j >= 0 && isComment(lines[j]); j--) doc.unshift(clean(lines[j]));
    // Some families put a helper or constant between the component and its "Figma:" comment: look up to 30 lines
    // for the nearest comment block that names a Figma source.
    if (!doc.length) {
      for (let j = i - 1; j >= Math.max(0, i - 30); j--) {
        if (!isComment(lines[j])) continue;
        let k = j; const block = [];
        while (k >= 0 && isComment(lines[k])) block.unshift(clean(lines[k--]));
        if (block.some(l => /Figma/.test(l))) { doc = block; break; }
        j = k;
      }
    }
    // Full signature, even when the props list wraps over several lines, so every prop name is listed.
    let sig = '';
    if (i >= 0) {
      for (let j = i; j < Math.min(i + 12, lines.length); j++) {
        sig += (j > i ? ' ' : '') + lines[j].trim();
        if (/\)\s*(=>\s*)?\{?\s*$/.test(lines[j]) || /\)\s*\{/.test(lines[j])) break;
      }
      sig = sig.replace(/\s*\{\s*$/, '').replace(/^export\s+/, '');
    }
    return { name, doc: doc.join('\n').trim(), sig };
  });
}

for (const f of ['_core.jsx', ...families]) {
  const fam = f.replace(/^_|\.jsx$/g, '');
  out += `## ${fam}\n\nExamples (read before using any component below — shows the data shapes props expect): ${PAGES}/src/gallery/${fam === 'core' ? 'button' : fam}.jsx\n\n`;
  for (const e of entries(f)) {
    if (e.name === 'cx') continue;
    out += `### ${e.name}\n${e.doc ? e.doc + '\n' : ''}\`${e.sig.slice(0, 900)}\`\n\n`;
  }
}

mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/api.md'), out);
// Icon names, one per line, so prompts can check a name exists without loading the 700 KB icon file.
globalThis.window = {};
await import(join(root, 'src/icons.js'));
writeFileSync(join(root, 'dist/icons.txt'), Object.keys(window.IFS_ICONS).sort().join('\n') + '\n');
// Every CSS token with its value, plus the text-style and effect classes, so prototypes use real names
// (e.g. --gaps-gap-600 = 24px) instead of guessing from Figma's variable names.
const css = readFileSync(join(root, 'src/tokens.css'), 'utf8');
const tokens = [...css.matchAll(/(--[a-z0-9-]+):\s*([^;]+);/g)].map(m => `${m[1]}: ${m[2].trim()}`);
const classes = [...css.matchAll(/^\.((?:t|fx)-[a-z0-9-]+)\{/gm)].map(m => `.${m[1]}`);
writeFileSync(join(root, 'dist/tokens.txt'), [
  '# CSS custom properties (dark mode). Spacing scale: gaps/paddings 100 = 4px, 200 = 8px, 400 = 16px, 600 = 24px.',
  ...tokens, '', '# Text-style classes (Figma text styles) and effect classes', ...classes, ''].join('\n'));
console.log(`api.md: ${out.length} chars · icons.txt: ${Object.keys(window.IFS_ICONS).length} names · tokens.txt: ${tokens.length} tokens`);
