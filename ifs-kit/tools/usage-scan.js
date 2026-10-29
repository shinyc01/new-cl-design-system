// Read-only use_figma script: records how library components are used on ONE page of a product file.
// Set PAGE (page id) and optionally SKIP (number of direct instances to skip; for paging large pages).
// Returns JSON: { page, screens, direct: { <setKey>: { name, n, variants{}, screens[], sections[], parents{}, texts[] } },
//                 nested: { <setKey>: [name, count] }, more }
// "direct" = placed by the designer (not inside another instance); "nested" = used inside another component.
const PAGE = 'REPLACE';
const SKIP = 0, LIMIT = 4000;
const LS = String.fromCharCode(8232), PS = String.fromCharCode(8233);
const clean = s => String(s).split(LS).join(' ').split(PS).join(' ').replace(/\s+/g, ' ').trim().slice(0, 60);

const page = await figma.getNodeByIdAsync(PAGE); await figma.setCurrentPageAsync(page);
const direct = {}, nested = {};
let seen = 0, more = false;
const add = (obj, k, cap) => { if (obj[k] !== undefined) obj[k]++; else if (Object.keys(obj).length < cap) obj[k] = 1; };
const push = (arr, v, cap) => { if (v && !arr.includes(v) && arr.length < cap) arr.push(v); };

for (const i of page.findAllWithCriteria({ types: ['INSTANCE'] })) {
  let isNested = false, screen = null, section = null;
  for (let p = i.parent; p && p.type !== 'PAGE'; p = p.parent) {
    if (p.type === 'INSTANCE') isNested = true;
    if (p.type === 'SECTION' && !section) section = p.name;
    if (p.parent && p.parent.type === 'PAGE') screen = p.name;
    if (p.parent && p.parent.type === 'SECTION' && !screen && p.type === 'FRAME') screen = p.name;
  }
  const mc = await i.getMainComponentAsync(); if (!mc) continue;
  const set = mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent : null;
  const key = set ? set.key : mc.key, name = clean(set ? set.name : mc.name);
  if (isNested) { (nested[key] ||= [name, 0])[1]++; continue; }
  if (seen++ < SKIP) continue;
  if (seen > SKIP + LIMIT) { more = true; break; }
  const d = direct[key] ||= { name, n: 0, variants: {}, screens: [], sections: [], parents: {}, texts: [] };
  d.n++;
  add(d.variants, clean(mc.name), 12);
  push(d.screens, screen && clean(screen), 10);
  push(d.sections, section && clean(section), 6);
  add(d.parents, clean(i.parent ? i.parent.name : ''), 8);
  if (d.texts.length < 5) {
    const t = i.findAllWithCriteria({ types: ['TEXT'] }).slice(0, 3).map(x => clean(x.characters)).filter(Boolean).join(' · ');
    push(d.texts, t.slice(0, 90), 5);
  }
}
const screens = page.children.filter(c => c.type === 'FRAME' || c.type === 'SECTION').length;
return JSON.stringify({ page: clean(page.name), screens, direct, nested, more });
