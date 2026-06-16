#!/usr/bin/env node
/**
 * IFS Copperleaf Design System — Bundle Builder
 *
 * Compiles every component JSX file in DS/components/ into a single
 * _ds_bundle.js that any HTML page can load via <script src="...">.
 * Also regenerates _ds_manifest.json with the full component list.
 *
 * Usage:
 *   npm run build
 *
 * After running, commit and push to GitHub — Pages serves the updated bundle.
 */

import { transform } from "esbuild";
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative, dirname } from "path";
import { createHash } from "crypto";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DS_DIR = join(__dirname, "DS");
const COMPONENTS_DIR = join(DS_DIR, "components");
const BUNDLE_OUT = join(DS_DIR, "_ds_bundle.js");
const MANIFEST_OUT = join(DS_DIR, "_ds_manifest.json");
const NAMESPACE = "IFSDesignSystem_6f71e3";

// ── Helpers ──────────────────────────────────────────────────────────────────

function findJSX(dir) {
  const results = [];
  for (const entry of readdirSync(dir).sort()) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...findJSX(full));
    } else if (entry.endsWith(".jsx")) {
      results.push(full);
    }
  }
  return results;
}

/** Extract named exports: export function X / export const X / export class X */
function namedExports(source) {
  const names = [];
  for (const m of source.matchAll(/^export\s+(?:function|class|const|let|var)\s+(\w+)/gm)) {
    names.push(m[1]);
  }
  return [...new Set(names)];
}

/**
 * Rewrite ES module syntax so the code runs as plain JS in a browser IIFE:
 *  - `import React, { useState, useRef } from "react"` → `const { useState, useRef } = React;`
 *  - `import React from "react"` → (removed, React is global)
 *  - Any other import → removed (components are self-contained)
 *  - `export function X` / `export const X` → `function X` / `const X`
 *  - `export default X;` → (removed; we expose via namespace assignment instead)
 */
function stripModuleSyntax(source) {
  return source
    // React named imports → destructure from global React
    .replace(
      /^import\s+React\s*,\s*\{([^}]+)\}\s+from\s+['"]react['"]\s*;?\r?\n?/gm,
      (_, named) => {
        const names = named.split(",").map((n) => n.trim()).filter(Boolean);
        return `const { ${names.join(", ")} } = React;\n`;
      }
    )
    // Plain `import React from "react"` → nothing
    .replace(/^import\s+React\s+from\s+['"]react['"]\s*;?\r?\n?/gm, "")
    // Any remaining import → nothing
    .replace(/^import\s+.*?from\s+['"][^'"]+['"]\s*;?\r?\n?/gm, "")
    // `export function/class/const X` → `function/class/const X`
    .replace(/^export\s+(function|class|const|let|var)\s+/gm, "$1 ")
    // `export default X;` → nothing
    .replace(/^export\s+default\s+\w+\s*;?\r?\n?/gm, "");
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function build() {
  const files = findJSX(COMPONENTS_DIR);
  const components = [];
  const sourceHashes = {};
  const chunks = [];

  for (const file of files) {
    const relPath = relative(DS_DIR, file).replace(/\\/g, "/");
    const source = readFileSync(file, "utf8");
    const hash = createHash("md5").update(source).digest("hex").slice(0, 12);
    sourceHashes[relPath] = hash;

    const exports = namedExports(source);
    const cleaned = stripModuleSyntax(source);

    // Compile JSX → plain JS
    let compiled;
    try {
      const result = await transform(cleaned, {
        loader: "jsx",
        target: "es2018",
        jsx: "transform",
        jsxFactory: "React.createElement",
        jsxFragment: "React.Fragment",
        sourcefile: relPath,
      });
      compiled = result.code.trim();
    } catch (err) {
      console.error(`✗ Failed to compile ${relPath}:\n${err.text || err.message}`);
      process.exit(1);
    }

    // Namespace assignments for each named export
    const assignments = exports.map((n) => `__ds_ns.${n} = ${n};`).join("\n");

    chunks.push(
      `// ${relPath}\ntry { (() => {\n${compiled}\n${assignments || ""}\n})(); } catch(e) { (__ds_ns.__errors = __ds_ns.__errors || []).push({ file: ${JSON.stringify(relPath)}, error: String(e) }); }`
    );

    for (const name of exports) {
      components.push({ name, sourcePath: relPath });
    }
  }

  // ── Write bundle ────────────────────────────────────────────────────────────
  const meta = { format: 3, namespace: NAMESPACE, components, sourceHashes };
  const bundle = [
    `/* @ds-bundle: ${JSON.stringify(meta)} */`,
    ``,
    `(() => {`,
    ``,
    `const __ds_ns = (window.${NAMESPACE} = window.${NAMESPACE} || {});`,
    ``,
    `(__ds_ns.__errors = __ds_ns.__errors || []);`,
    ``,
    chunks.join("\n\n"),
    ``,
    `})();`,
    ``,
  ].join("\n");

  writeFileSync(BUNDLE_OUT, bundle, "utf8");

  // ── Update manifest ─────────────────────────────────────────────────────────
  const manifest = JSON.parse(readFileSync(MANIFEST_OUT, "utf8"));
  manifest.namespace = NAMESPACE;
  manifest.components = components;
  writeFileSync(MANIFEST_OUT, JSON.stringify(manifest), "utf8");

  // ── Report ──────────────────────────────────────────────────────────────────
  const kb = (bundle.length / 1024).toFixed(1);
  console.log(`\n✓ Bundle written  →  DS/_ds_bundle.js  (${kb} KB)`);
  console.log(`✓ Manifest updated →  DS/_ds_manifest.json`);
  console.log(`\nComponents (${components.length}):`);
  for (const c of components) {
    console.log(`  · ${c.name.padEnd(20)} ${c.sourcePath}`);
  }
  console.log(`\nNext step: git add -A && git commit -m "Rebuild DS bundle" && git push\n`);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
