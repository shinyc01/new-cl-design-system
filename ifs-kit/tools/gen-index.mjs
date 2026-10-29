// Generates the two small files the prototype skill reads up front, so it doesn't load the full API (~50k tokens)
// and the per-component Figma details (~19k) before it knows which components it needs:
//   dist/index.md  — one line per kit component: name, what it's for, how often designers use it, usual props.
//   guide/rules.md — guide/components.md without section 4 (per-component Figma details) and section 6 (gaps).
// The skill then reads full api.md entries only for the components in its plan (skill/scripts/entry.sh).
// Run after gen-api.mjs (npm run release does).
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const api = readFileSync(join(root, 'dist/api.md'), 'utf8');
const guide = readFileSync(join(root, 'guide/components.md'), 'utf8');
let usage = { components: {}, unused: [] };
try { usage = JSON.parse(readFileSync(join(root, 'guide/usage.json'), 'utf8')); } catch {}

// "Use for" per Figma set name, from section 4 of the guide.
const useFor = {};
for (const b of guide.split(/\n### /).slice(1)) {
  const name = b.split('\n')[0].trim().toLowerCase();
  const m = b.match(/\*\*Use for\*\* (?:\([^)]*\) )?([^\n]+)/);
  if (m) useFor[name] = m[1];
}
const sentence = s => {
  const t = s.replace(/`/g, '').replace(/\s+/g, ' ').trim();
  const cut = t.search(/(?<=[a-z0-9)])(?<!e\.g)(?<!i\.e)\. |; /);
  const one = cut > 0 ? t.slice(0, cut) : t.replace(/\.$/, '');
  return one.length > 85 ? one.slice(0, 82).replace(/\s+\S*$/, '') + '…' : one;
};

let out = `# IFS DS kit — component index

One line per \`IFS.<Name>\`. Pick from this list; then, **before using a component, read its full entry** (props and data shapes) with \`bash .ifs/entry.sh Name1 Name2 …\`.
Format: **Name** — what it's for · how often designers place it in the product handovers · usual props. *helper* = pattern helper (a working composition, not a Figma component); *part* = only used inside other components, don't place it alone.

`;
for (const fam of api.split(/\n## /).slice(1)) {
  const famName = fam.split('\n')[0].trim();
  out += `## ${famName}\n`;
  for (const b of fam.split(/\n### /).slice(1)) {
    const name = b.split('\n')[0].trim();
    // Hooks and plain functions (useX, filterVersions…) are listed in their helper's entry, not here.
    if (!name || /^[a-z]/.test(name)) continue;
    const tier = (b.match(/\*\*Tier:\*\* (.+)/) || [])[1];
    const figLine = (b.split('\n').find(l => /^Figma\b/.test(l)) || '');
    const fig = (figLine.match(/^Figma(?: \([^)]*\))?: ([A-Za-z][\w\-\/+. ]*?)(?: \(|,| —| key|$)/) || [])[1];
    // Purpose: the guide's "Use for" line, else the first descriptive sentence of the source comment.
    const doc = b.split('\n').slice(1).filter(l => !/^(\*\*|`function|Figma|Props:)/.test(l) && l.trim())
      .map(l => l.replace(/[─━-]{3,}/g, '').trim()).filter(l => l.length > 3);   // drop ──── section dividers
    const after = figLine.split(/ — /)[1];
    const desc = (after && after.length > 15 ? after : '') || doc.find(l => l.length > 25) || doc[0] || '';
    const purpose = name === 'Icon' ? 'Any icon, by its Figma name (check dist/icons.txt); size 12 | 16 | 24' : sentence((fig && useFor[fig.toLowerCase()]) || desc || '');
    const u = name === 'Icon' ? null : usage.components[name];
    const use = u ? (u.placed ? `${u.placed.toLocaleString('en-US')}×` : 'part') : (name !== 'Icon' && usage.unused.includes(name) ? 'unused' : '');
    const usual = u && u.placed && u.usual.length ? ` · usual ${u.usual.slice(0, 3).join(', ')}` : '';
    const tag = tier === 'Pattern helper' ? ' *helper*' : '';
    out += `- **${name}**${tag} — ${purpose || '—'}${use ? ` · ${use}` : ''}${usual}\n`;
  }
  out += '\n';
}
writeFileSync(join(root, 'dist/index.md'), out);

// Rules = the guide minus the per-component Figma details and the gaps list.
const rules = guide
  .replace(/\n## 4\.[\s\S]*?(?=\n## 5\.)/, '\n## 4. Components by page\n\nPer-component Figma details (keys, nodes, variant axes, canvas notes) live in components.md section 4. The skill doesn\'t need them; read a component\'s api.md entry instead.\n')
  .replace(/\n## 6\.[\s\S]*$/, '\n');
writeFileSync(join(root, 'guide/rules.md'), rules);
console.log(`index.md: ${out.length} chars · rules.md: ${rules.length} chars`);
