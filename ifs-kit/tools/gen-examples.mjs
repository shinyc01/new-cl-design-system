// Generates dist/examples.md: each component's own example section from src/gallery (working usage of its variants
// and the data shapes its props take). entry.sh prints it after the component's api.md entry, so the prototype
// skill reads props + example for just the components it uses instead of whole api.md families and gallery files.
// A component without its own section gets the first component section that renders it. Capped per component.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const api = readFileSync(join(root, 'dist/api.md'), 'utf8');
const sections = [];
for (const f of readdirSync(join(root, 'src/gallery')).filter(f => f.endsWith('.jsx')).sort()) {
  const src = readFileSync(join(root, 'src/gallery', f), 'utf8');
  for (const part of src.split(/(?=  IFS_GALLERY\.push\(\{)/).slice(1)) {
    const m = part.match(/name: '([^']+)'/);
    if (!m || m[1].startsWith('Pattern')) continue;
    // Stop at the end of this push({...}); whatever follows is a helper for the next section.
    const end = part.search(/\n  \}\);|\n  <\/> \}\);|\n  \} \}\);/);
    const code = end > 0 ? part.slice(0, part.indexOf('\n', end + 1) + 1 || undefined) : part;
    sections.push({ name: m[1], file: f, code: code.replace(/\n\s*$/, '') });
  }
}
const CAP = 5000;
let ex = '# Component examples\n\nWorking usage of each component, from the kit gallery (src/gallery). Printed by entry.sh after the API entry.\n\n';
for (const name of [...api.matchAll(/^### (\S+)$/gm)].map(m => m[1])) {
  const sec = sections.find(x => x.name === name) || sections.find(x => new RegExp(`<${name}[\\s/>]`).test(x.code));
  if (!sec) continue;
  const code = sec.code.length > CAP ? sec.code.slice(0, CAP).replace(/\n[^\n]*$/, '') + `\n  // … cut; full example in src/gallery/${sec.file}` : sec.code;
  ex += `### ${name}\n${sec.name === name ? '' : `(from the ${sec.name} example)\n`}\`\`\`jsx\n${code}\n\`\`\`\n\n`;
}
writeFileSync(join(root, 'dist/examples.md'), ex);
console.log(`examples.md: ${ex.length} chars`);
