#!/bin/bash
# Prints, for each kit component named, its full api.md entry (props, data shapes, usage line) and its working
# example from examples.md (how the gallery uses its variants). Read both before planning with or using a component.
# Usage: bash entry.sh Button Table ContentCard   (reads api.md / examples.md next to this script, or $IFS_API / $IFS_EX)
DIR="$(dirname "$0")"
API="${IFS_API:-$DIR/api.md}"; EX="${IFS_EX:-$DIR/examples.md}"
[ -f "$API" ] || { echo "api.md not found at $API" >&2; exit 1; }
block() { awk -v n="### $1" '$0==n{f=1;print;next} /^##/{if(f)exit} f' "$2"; }
for name in "$@"; do
  out=$(block "$name" "$API")
  if [ -z "$out" ]; then echo "### $name — not in api.md (check the index for the right name)"; echo; continue; fi
  printf '%s\n' "$out"
  [ -f "$EX" ] && ex=$(block "$name" "$EX" | tail -n +2) && [ -n "$ex" ] && printf 'Example:\n%s\n' "$ex"
  echo
done
