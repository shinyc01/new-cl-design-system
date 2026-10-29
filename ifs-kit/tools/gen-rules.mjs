// Generates guide/rules.md: guide/components.md without section 4 (per-component Figma details: keys, nodes,
// variant axes, canvas notes) and section 6 (gaps). The prototype skill reads this up front; section 4 stays in
// components.md for the rare lookup. Run after editing components.md (npm run release does).
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const guide = readFileSync(join(root, 'guide/components.md'), 'utf8');
const rules = guide
  .replace(/\n## 4\.[\s\S]*?(?=\n## 5\.)/, '\n## 4. Components by page\n\nPer-component Figma details (keys, nodes, variant axes, canvas notes) are in components.md section 4. Look a component up there only if its api.md entry and these rules leave a question open.\n')
  .replace(/\n## 6\.[\s\S]*$/, '\n');
writeFileSync(join(root, 'guide/rules.md'), rules);
console.log(`rules.md: ${rules.length} chars (components.md ${guide.length})`);
