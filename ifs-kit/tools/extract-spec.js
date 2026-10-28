// Paste into a read-only use_figma call (file atgUmwcA1AE5sjFoWBT7ar) to get exact specs for component variants.
// Set SET_ID to the component set and WANT to the variant names to read (keep to <= ~10 per call: returns over ~20 KB fail).
// Output per node: size, auto-layout (direction gap padding align), radius, fills/strokes as Figma VARIABLE NAMES
// (map "a/b/c" to CSS var(--a-b-c)), stroke weight + align, effect style, text style, nested instance names.
const SET_ID = 'REPLACE';
const WANT = ['REPLACE'];
const DEPTH = 3;

const varName = async (b) => { if (!b) return null; const v = await figma.variables.getVariableByIdAsync(b.id); return v ? v.name : null; };
const raw = f => `#${[f.color.r, f.color.g, f.color.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('')}@${+(f.opacity ?? 1).toFixed(2)}`;
async function spec(n, depth = 0) {
  const s = { n: n.name, t: n.type };
  if ('width' in n) { s.w = Math.round(n.width * 10) / 10; s.h = Math.round(n.height * 10) / 10; }
  if (n.layoutMode && n.layoutMode !== 'NONE') s.al = `${n.layoutMode[0]} gap${n.itemSpacing} p${n.paddingTop},${n.paddingRight},${n.paddingBottom},${n.paddingLeft} ${n.primaryAxisAlignItems}/${n.counterAxisAlignItems}`;
  if (n.layoutSizingHorizontal) s.sz = `${n.layoutSizingHorizontal[0]}${n.layoutSizingVertical[0]}`;
  if ('cornerRadius' in n && n.cornerRadius) s.r = n.cornerRadius === figma.mixed ? [n.topLeftRadius, n.topRightRadius, n.bottomRightRadius, n.bottomLeftRadius].join(',') : n.cornerRadius;
  if ('fills' in n && Array.isArray(n.fills) && n.fills.length) s.fill = await Promise.all(n.fills.filter(f => f.visible !== false).map(async f => (await varName(f.boundVariables && f.boundVariables.color)) || (f.type === 'SOLID' ? raw(f) : f.type)));
  if ('strokes' in n && n.strokes.some(f => f.visible !== false)) { s.stroke = await Promise.all(n.strokes.filter(f => f.visible !== false).map(async f => (await varName(f.boundVariables && f.boundVariables.color)) || (f.type === 'SOLID' ? raw(f) : f.type))); s.sw = n.strokeWeight === figma.mixed ? [n.strokeTopWeight, n.strokeRightWeight, n.strokeBottomWeight, n.strokeLeftWeight].join(',') : n.strokeWeight; s.sa = n.strokeAlign; }
  if (n.effects && n.effects.length) s.fx = n.effectStyleId ? (await figma.getStyleByIdAsync(n.effectStyleId)).name : n.effects.map(e => e.type).join(',');
  if (n.opacity !== undefined && n.opacity < 1) s.op = +n.opacity.toFixed(2);
  if (n.type === 'TEXT') { s.txt = n.characters.slice(0, 40); s.ts = n.textStyleId && n.textStyleId !== figma.mixed ? (await figma.getStyleByIdAsync(n.textStyleId)).name : `${n.fontSize}/${JSON.stringify(n.fontName)}`; }
  if (n.type === 'INSTANCE') { const mc = await n.getMainComponentAsync(); s.inst = mc ? (mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent.name + ' / ' + mc.name : mc.name) : null; }
  if (!n.visible) s.hidden = true;
  if ('children' in n && depth < DEPTH && n.type !== 'INSTANCE') s.c = await Promise.all(n.children.map(c => spec(c, depth + 1)));
  return s;
}
const set = await figma.getNodeByIdAsync(SET_ID);
const props = set.type === 'COMPONENT_SET' ? Object.fromEntries(Object.entries(set.componentPropertyDefinitions).map(([k, v]) => [k, v.type === 'VARIANT' ? v.variantOptions : v.type])) : null;
// Plugin API nodes throw on unknown properties, so test for the placeholder with `in`, not `v.missing`.
const nodes = set.type === 'COMPONENT_SET' ? WANT.map(w => set.children.find(c => c.name === w) || { missing: w }) : [set];
return { props, variants: await Promise.all(nodes.map(v => 'missing' in v ? v : spec(v))) };
