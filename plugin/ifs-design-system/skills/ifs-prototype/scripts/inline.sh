#!/bin/bash
# Make a single-file prototype with no Node: tools/inline.sh <in.src.html> <out.html> [kit-base-url-or-dir]
# Replaces the <!-- IFS-KIT --> … <!-- /IFS-KIT --> block (the template's live-kit links) — or a bare
# <!-- IFS-KIT --> marker — with the kit's CSS + JS: a snapshot, so the file never changes later.
# Kit source defaults to the published kit on GitHub Pages; pass a local dist folder to use a local build.
set -e
IN="$1"; OUT="$2"; BASE="${3:-https://shinyc01.github.io/new-cl-design-system/ifs-kit/dist}"
grep -q '<!-- IFS-KIT -->' "$IN" || { echo "Missing <!-- IFS-KIT --> marker in $IN"; exit 1; }
END='<!-- IFS-KIT -->'; grep -q '<!-- /IFS-KIT -->' "$IN" && END='<!-- \/IFS-KIT -->'
TMP="$(mktemp -d)"
if [ -d "$BASE" ]; then cp "$BASE/ifs-ds.css" "$BASE/ifs-ds.js" "$TMP/"; else
  curl -fsSL "$BASE/ifs-ds.css" -o "$TMP/ifs-ds.css"; curl -fsSL "$BASE/ifs-ds.js" -o "$TMP/ifs-ds.js"; fi
{
  sed '/<!-- IFS-KIT -->/,$d' "$IN"
  printf '<style>\n'; cat "$TMP/ifs-ds.css"; printf '\n</style>\n<script>\n'; cat "$TMP/ifs-ds.js"; printf '\n</script>\n'
  sed "1,/$END/d" "$IN"
} > "$OUT"
rm -rf "$TMP"; echo "Wrote $OUT"
