#!/bin/bash
# Screenshot an HTML file with headless Chrome: tools/shot.sh <file.html> <out.png> [width] [height] [#hash]
# e.g. tools/shot.sh dist/gallery.html /tmp/button.png 1100 500 '#Button'  (gallery shows only that section)
# Copies the page to its own temp folder (the app's helpers can't always read ~/Documents; safe to run in parallel)
# and kills Chrome once the PNG appears because headless Chrome sometimes never exits.
IN="$1"; OUT="$2"; W="${3:-1280}"; H="${4:-900}"; HASH="${5:-}"
TMP="$(mktemp -d "${TMPDIR:-/tmp}/ifs-shot.XXXXXX")"
cp "$IN" "$TMP/page.html"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-first-run \
  --user-data-dir="$TMP/profile" --hide-scrollbars --virtual-time-budget=6000 \
  --window-size="$W,$H" --screenshot="$TMP/out.png" "file://$TMP/page.html$HASH" >/dev/null 2>&1 &
PID=$!; disown $PID 2>/dev/null  # no "Terminated" job notice when it is killed below
for i in $(seq 1 60); do [ -s "$TMP/out.png" ] && break; sleep 0.5; done
sleep 0.5; kill $PID 2>/dev/null; pkill -f "$TMP/profile" 2>/dev/null
[ -s "$TMP/out.png" ] || { echo "No screenshot produced"; exit 1; }
cp "$TMP/out.png" "$OUT"; rm -rf "$TMP"; echo "Saved $OUT"
