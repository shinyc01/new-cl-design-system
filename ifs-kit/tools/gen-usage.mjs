// Generates guide/usage.json + guide/usage.md: how designers actually use each kit component in the five product
// handover files (Build, Explore, Command, Plan, Value), from the DS audit (Oct 2026, tools/usage-scan.js).
// gen-api.mjs adds a one-line summary from usage.json to every api.md entry, so the prototype skill prefers
// what real screens use and picks the usual variant.
// Usage: node tools/gen-usage.mjs <path to audit usage/_resolved.json>   (re-run gen-api.mjs afterwards)
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = process.argv[2];
if (!src) { console.error('usage: node tools/gen-usage.mjs <usage/_resolved.json>'); process.exit(1); }
const usage = JSON.parse(readFileSync(src, 'utf8'));
const api = readFileSync(join(root, 'dist/api.md'), 'utf8');

const FILES = { build: 'Build', explore: 'Explore', command: 'Command', plan: 'Plan', value: 'Value' };
// Layer names that say nothing about context.
// Frame names that read like screen titles ("Dashboard / Sidebar expanded", "Map - Overview") are screen names, not
// containers, and stay out of the public files.
const screenish = s => / [\/–—-] /.test(s) || /^[A-Z]\S* \S/.test(s);
const noise = s => !s || screenish(s) || /^(frame|group|rectangle|container|content|wrapper|auto layout|component \d|instance)\b/i.test(s) || /^\d|^Frame \d/i.test(s);
const pct = (c, n) => Math.round((100 * c) / n);
const top = (obj, k) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, k);

// Kit components and the Figma names their source comment points at ("Figma: name (node), other (node)").
const kit = api.split(/\n### /).slice(1).map(b => {
  const name = b.split('\n')[0].trim();
  const figLine = (b.split('\n').find(l => /^Figma\b/.test(l)) || '');
  // "name (node", "name node" — the names the component is built from, in order of importance.
  const figma = [...figLine.matchAll(/([A-Za-z][\w\-\/+. ]*?) \(?(?:\d+:\d+|key |[0-9a-f]{8})/g)].map(m => m[1].trim().toLowerCase());
  return { name, tier: (b.match(/\*\*Tier:\*\* (.+)/) || [])[1], figma };
}).filter(k => k.figma.length && k.tier === 'Component');

// Each Figma component counts toward the kit components built primarily from it (first name in the Figma line);
// only when no kit component is primarily built from it does it count toward every component that mentions it.
const namesOf = u => [...u.names, u.lib?.name].filter(Boolean).map(n => n.toLowerCase());
const owners = new Map(usage.map(u => {
  const primary = kit.filter(k => namesOf(u).includes(k.figma[0]));
  return [u, primary.length ? primary : kit.filter(k => namesOf(u).some(n => k.figma.includes(n)))];
}));
const out = {};
for (const k of kit) {
  const hits = usage.filter(u => owners.get(u).includes(k));
  if (!hits.length) continue;
  const agg = { n: 0, nested: 0, files: {}, variants: {}, parents: {}, screens: [], texts: [] };
  for (const u of hits) {
    agg.n += u.n; agg.nested += u.nested;
    for (const [f, c] of Object.entries(u.files)) agg.files[f] = (agg.files[f] || 0) + c;
    for (const [v, c] of Object.entries(u.variants)) agg.variants[v] = (agg.variants[v] || 0) + c;
    for (const [p, c] of Object.entries(u.parents)) if (!noise(p)) agg.parents[p] = (agg.parents[p] || 0) + c;
    for (const s of u.screens) if (agg.screens.length < 4) agg.screens.push(s);
    for (const t of u.texts) if (agg.texts.length < 2 && t.length > 3) agg.texts.push(t);
  }
  const vTotal = Object.values(agg.variants).reduce((a, b) => a + b, 0) || 1;
  // Per property: the value designers pick most (variant names differ in case between library versions).
  // Interaction states (state, focus, hover) are skipped: screens show them only to illustrate.
  const axes = {};
  for (const [v, c] of Object.entries(agg.variants)) for (const pair of v.split(/,\s*/)) {
    const [a, val] = pair.split('=').map(x => x && x.trim());
    if (!val || /^(state|focus|hover|hover on|property 1)$/i.test(a)) continue;
    const ax = axes[a.toLowerCase()] ||= { name: a, vals: {} };
    ax.vals[val.toLowerCase()] = (ax.vals[val.toLowerCase()] || 0) + c;
  }
  const usual = Object.values(axes).map(({ name, vals }) => {
    const tot = Object.values(vals).reduce((a, b) => a + b, 0);
    const [[v1, c1], second] = top(vals, 2);
    return `${name} ${v1} ${pct(c1, tot)}%` + (pct(c1, tot) < 60 && second ? ` / ${second[0]} ${pct(second[1], tot)}%` : '');
  });
  out[k.name] = {
    usual,
    figma: [...new Set(hits.flatMap(u => u.names))].slice(0, 3),
    placed: agg.n, nested: agg.nested,
    files: top(agg.files, 5).map(([f]) => FILES[f] || f),
    variants: top(agg.variants, 3).map(([v, c]) => `${v} (${pct(c, vTotal)}%)`),
    inside: top(agg.parents, 4).map(([p]) => p),
    // Screen names and sample text stay out: the repo is public and they come from internal product files.
  };
}

// Kit components that exist but no handover file uses (directly or inside another component).
const unused = kit.filter(k => k.tier === 'Component' && !out[k.name]).map(k => k.name);

writeFileSync(join(root, 'guide/usage.json'), JSON.stringify({ source: 'DS audit of the 5 handover files, Oct 2026', components: out, unused }, null, 1) + '\n');

const fmt = n => n.toLocaleString('en-US');
const rank = Object.entries(out).sort((a, b) => b[1].placed - a[1].placed);
let md = `# How the handover files use each component

Generated by \`tools/gen-usage.mjs\` from the DS audit of the five product handover files (Build, Explore, Command, Plan, Value; Oct 2026).
"Placed" = put on a screen by a designer; "nested" = used inside another component. Use this to pick the component real screens use for a job, its usual values, and what it sits inside.

## Components by how often designers place them

| Component | Placed | Files | Usual values |
|---|---|---|---|
${rank.filter(([, u]) => u.placed).map(([k, u]) => `| ${k} | ${fmt(u.placed)} | ${u.files.join(', ')} | ${(u.usual.join(' · ') || u.variants[0] || '').replace(/\|/g, '/')} |`).join('\n')}

Only used inside other components (don't place on their own): ${rank.filter(([, u]) => !u.placed).map(([k]) => k).join(', ')}.

No handover screen uses these yet (some, like the core charts, are newer than the handovers; the guide still applies): ${unused.join(', ')}.

## Context per component

${rank.map(([k, u]) => `### ${k}
Figma: ${u.figma.join(' / ')} · placed ${fmt(u.placed)}, nested ${fmt(u.nested)} · ${u.files.join(', ')}
Usual: ${u.usual.join(' · ') || '—'}\nTop variants: ${u.variants.join(' · ') || '—'}
Sits in: ${u.inside.join(' · ') || '—'}
`).join('\n')}`;
writeFileSync(join(root, 'guide/usage.md'), md);
console.log(`usage: ${Object.keys(out).length} kit components with handover usage, ${unused.length} unused`);
