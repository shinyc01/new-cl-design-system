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
    const doc = [];
    for (let j = i - 1; j >= 0 && /^\s*(\/\/|\*|\/\*)/.test(lines[j]); j--) doc.unshift(lines[j].replace(/^\s*(\/\/ ?|\/\*\*? ?|\* ?)/, '').replace(/\*\/\s*$/, ''));
    const sig = i >= 0 ? lines[i].replace(/\s*\{\s*$/, '').replace(/^export\s+/, '').trim() : '';
    return { name, doc: doc.join('\n').trim(), sig };
  });
}

for (const f of ['_core.jsx', ...families]) {
  const fam = f.replace(/^_|\.jsx$/g, '');
  out += `## ${fam}\n\nExamples: src/gallery/${fam === 'core' ? 'button' : fam}.jsx\n\n`;
  for (const e of entries(f)) {
    if (e.name === 'cx') continue;
    out += `### ${e.name}\n${e.doc ? e.doc + '\n' : ''}\`${e.sig.slice(0, 400)}\`\n\n`;
  }
}

mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/api.md'), out);
// Icon names, one per line, so prompts can check a name exists without loading the 700 KB icon file.
globalThis.window = {};
await import(join(root, 'src/icons.js'));
writeFileSync(join(root, 'dist/icons.txt'), Object.keys(window.IFS_ICONS).sort().join('\n') + '\n');
console.log(`api.md: ${out.length} chars · icons.txt: ${Object.keys(window.IFS_ICONS).length} names`);
