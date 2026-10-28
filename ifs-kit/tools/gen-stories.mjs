// Generates src/stories/<Family>/<Component>.stories.jsx from the variant grids in src/gallery/*.jsx.
// Each story shows every Figma variant and state, embeds the matching Figma node (Designs tab),
// and its Docs page carries the usage notes from guide/components.md. Re-run after editing a gallery file.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = 'https://www.figma.com/design/atgUmwcA1AE5sjFoWBT7ar/IFS-Design-System?node-id=';
// Sections whose figma string contains "[patterns]" point at the IFS Design System Patterns file instead.
const PATTERNS_FILE = 'https://www.figma.com/design/KmmVU2D0kqWr0dC1xXNzWw/IFS-Design-System-Patterns?node-id=';
const FAMILY = {
  button: 'Action', extras: 'Action & Input Extras', forms: 'Inputs & Forms', selection: 'Selection', navigation: 'Navigation',
  surfaces: 'Surfaces & Feedback', states: 'Content States & Cooper', data: 'Data Display', activity: 'Activity & Collaboration',
  charts: 'Data Visualisation', canvas: 'Map & Canvas',
};
// Pattern families (patterns-<slug>.jsx) split by tier (guide/tiers.json): "Pattern …" sections → Examples/<page>,
// Figma-backed components → More components/<page>, everything else → Pattern helpers/<page>.
const tiers = JSON.parse(readFileSync(join(root, 'guide/tiers.json'), 'utf8'));
const familyTitle = fam => FAMILY[fam] || fam;
const sectionGroup = (fam, name) => {
  if (!fam.startsWith('patterns-')) return familyTitle(fam);
  const page = tiers.pages[fam.slice(9)] || fam.slice(9);
  if (name.startsWith('Pattern')) return `Examples/${page}`;
  return tiers.components.includes(name) ? `More components/${page}` : `Pattern helpers/${page}`;
};
const storyName = name => name.replace(/^Pattern:\s*/, '');
const guide = readFileSync(join(root, 'guide/components.md'), 'utf8');

// Usage notes for a Figma component name: the guide's "### name" entry, minus its key/node line.
function usage(figmaName) {
  const m = guide.match(new RegExp(`^### \`?${figmaName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\`?[^\\n]*\\n([\\s\\S]*?)(?=^#{2,3} )`, 'm'));
  return m ? m[1].split('\n').filter(l => !/^key: /.test(l.trim())).join('\n').trim() : '';
}

// Review queue: guide/review.md "### <section name>" → bullets. Flagged stories get a warning on their Docs page
// and the `needs-review` tag; src/docs/ReviewQueue.mdx lists them all.
const review = {};
{
  let cur = null;
  for (const line of readFileSync(join(root, 'guide/review.md'), 'utf8').split('\n')) {
    const h = line.match(/^### (.+)$/); if (h) { cur = h[1].trim(); continue; }
    if (/^## /.test(line)) { cur = null; continue; }
    if (cur && /^- /.test(line)) (review[cur] ||= []).push(line.slice(2).trim());
  }
}
const sanitize = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const queue = [];

const outDir = join(root, 'src/stories');
rmSync(outDir, { recursive: true, force: true });
let count = 0;
for (const f of readdirSync(join(root, 'src/gallery')).filter(f => f.endsWith('.jsx'))) {
  const fam = f.replace('.jsx', '');
  const src = readFileSync(join(root, 'src/gallery', f), 'utf8');
  const sections = [...src.matchAll(/IFS_GALLERY\.push\(\{\s*name:\s*'([^']+)',\s*figma:\s*'([^']*)'/g)].map(m => ({ name: m[1], figma: m[2] }));
  for (const { name, figma } of sections) {
    const ids = [...figma.matchAll(/\((\d+):(\d+)\)/g)].map(m => `${m[1]}-${m[2]}`);
    const figmaNames = [...figma.matchAll(/([a-z][\w.-]*)\s*\(\d+:\d+\)/gi)].map(m => m[1]);
    // Guide entries put Use for / Don't use for / Notes on single lines; give each its own paragraph.
    const docs = [`**Figma:** ${figma}`, ...figmaNames.map(n => usage(n)).filter(Boolean)].join('\n\n').replace(/\n(?!\n)/g, '\n\n');
    // A family's "Pattern …" sections also carry that pattern's write-up from guide/patterns/<slug>.md.
    const patternDoc = fam.startsWith('patterns-') && name.startsWith('Pattern') && existsSync(join(root, 'guide/patterns', fam.slice(9) + '.md'))
      ? readFileSync(join(root, 'guide/patterns', fam.slice(9) + '.md'), 'utf8') : '';
    const base = figma.includes('[patterns]') ? PATTERNS_FILE : FILE;
    const design = ids.length > 1
      ? ids.map((id, i) => ({ name: figmaNames[i] || id, type: 'figma', url: base + id }))
      : ids.length ? { type: 'figma', url: base + ids[0] } : undefined;
    const items = review[name] || [];
    const warn = items.length ? `> ⚠️ **Needs review** — check these against Figma:\n>\n${items.map(i => '> - ' + i).join('\n')}\n\n` : '';
    const group = sectionGroup(fam, name), title = `${group}/${storyName(name)}`, up = '../'.repeat(group.split('/').length + 1);
    mkdirSync(join(outDir, group), { recursive: true });
    if (items.length) queue.push({ title, items });
    const id = name.replace(/[^A-Za-z0-9]/g, '');
    writeFileSync(join(outDir, group, `${id}.stories.jsx`), `// Generated by tools/gen-stories.mjs from src/gallery/${f} — do not edit.
import sections from '${up}gallery/${f}';
import { IFS } from '${up}components/index.js';

const section = sections.find(s => s.name === ${JSON.stringify(name)});

export default {
  title: ${JSON.stringify(title)},
  component: IFS[${JSON.stringify(name)}],
  tags: ${JSON.stringify(items.length ? ['autodocs', 'needs-review'] : ['autodocs'])},
  parameters: {
    docs: { description: { component: ${JSON.stringify(warn + (patternDoc ? docs + '\n\n' + patternDoc : docs))} } },
    ${design ? `design: ${JSON.stringify(design)},` : ''}
  },
};

export const AllVariants = { name: 'All variants & states', render: () => section.render() };
`);
    count++;
  }
}
const unmatched = Object.keys(review).filter(k => !queue.some(q => q.title.endsWith('/' + storyName(k))));
writeFileSync(join(root, 'src/docs/ReviewQueue.mdx'), `{/* Generated by tools/gen-stories.mjs from guide/review.md — do not edit. */}
import { Meta } from '@storybook/blocks';

<Meta title="Review queue" />

# Review queue

${queue.reduce((n, q) => n + q.items.length, 0)} items to check, on ${queue.length} stories. Each one is a place where Figma disagrees with itself, something was invented or approximated, or a legacy part was kept. When frames and notes disagreed, the notes won. Open the story, compare it with the Design tab, then remove the item from \`guide/review.md\`.

${queue.map(q => `## <a href="./index.html?path=/docs/${sanitize(q.title)}--docs" target="_top">${q.title}</a>\n\n${q.items.map(i => '- ' + i.replace(/[{}<>]/g, c => ({ '{': '&#123;', '}': '&#125;', '<': '&lt;', '>': '&gt;' })[c])).join('\n')}`).join('\n\n')}
${unmatched.length ? `\n## Not matched to a story\n\n${unmatched.map(k => '- ' + k).join('\n')}` : ''}
`);
console.log(`Generated ${count} story files in src/stories · review queue: ${queue.length} stories${unmatched.length ? ' · unmatched: ' + unmatched.join(', ') : ''}`);
