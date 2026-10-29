#!/bin/bash
# Prints the full api.md entry (props, data shapes, usage line) for each kit component named.
# Usage: bash entry.sh Button Table ContentCard   (reads api.md next to this script, or $IFS_API)
API="${IFS_API:-$(dirname "$0")/api.md}"
[ -f "$API" ] || { echo "api.md not found at $API" >&2; exit 1; }
for name in "$@"; do
  out=$(awk -v n="### $name" '$0==n{f=1;print;next} /^##/{if(f)exit} f' "$API")
  if [ -n "$out" ]; then printf '%s\n\n' "$out"; else echo "### $name — not in api.md (check the index for the right name)"; echo; fi
done
