#!/bin/bash
git branch -m master main 2>/dev/null || true
git remote add origin https://github.com/shinyc01/new-cl-design-system.git
git push -u origin main

echo ""
echo "Next: go to https://github.com/shinyc01/new-cl-design-system/settings/pages"
echo "Set Source to: GitHub Actions"
echo ""
echo "Live URLs once deployed:"
echo "  https://shinyc01.github.io/new-cl-design-system/DS/styles.css"
echo "  https://shinyc01.github.io/new-cl-design-system/DS/_ds_bundle.js"
