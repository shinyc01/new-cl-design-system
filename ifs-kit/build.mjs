#!/usr/bin/env node
// Bundles the kit for prototypes and makes standalone prototype files.
//   node build.mjs                             → dist/ifs-ds.js (window.IFS, IIFE) + dist/ifs-ds.css
//   node build.mjs inline <in.html> <out.html> → replaces the <!-- IFS-KIT --> marker in a prototype
//        with the bundled kit, so the output is one file that opens anywhere
//        (React + Babel still load from unpkg; React must load before the kit).
// Components are reviewed in Storybook (npm run storybook), not here.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const read = p => readFileSync(p, 'utf8');

// Resolve `import React from 'react'` to the page's UMD React instead of bundling a second copy.
const reactGlobal = {
  name: 'react-global',
  setup(b) {
    b.onResolve({ filter: /^react(-dom)?$/ }, a => ({ path: a.path, namespace: 'react-global' }));
    b.onLoad({ filter: /.*/, namespace: 'react-global' }, a => ({
      contents: `module.exports = window.${a.path === 'react' ? 'React' : 'ReactDOM'};`, loader: 'js',
    }));
  },
};

async function build() {
  const r = await esbuild.build({
    entryPoints: [join(root, 'src/iife.js')],
    outfile: join(dist, 'ifs-ds.js'),
    bundle: true, format: 'iife', target: 'es2020', minify: true,
    loader: { '.jsx': 'jsx', '.js': 'jsx' }, jsx: 'transform',
    plugins: [reactGlobal], logLevel: 'error', metafile: true,
  });
  return Object.fromEntries(Object.entries(r.metafile.outputs).map(([k, v]) => [k.split('/').pop(), v.bytes]));
}

function inline(html) {
  if (!html.includes('<!-- IFS-KIT -->')) throw new Error('Missing <!-- IFS-KIT --> marker');
  const block = `<style>\n${read(join(dist, 'ifs-ds.css'))}\n</style>\n<script>\n${read(join(dist, 'ifs-ds.js'))}\n</script>`;
  return html.replace('<!-- IFS-KIT -->', () => block);
}

const [cmd, a, b] = process.argv.slice(2);
const sizes = await build();
if (cmd === 'inline') {
  writeFileSync(b, inline(read(a)));
  console.log(`Wrote ${b}`);
} else {
  console.log('Built', sizes);
}
