---
name: catalyst-prototype
description: >
  Builds interactive, coded HTML prototypes of IFS Copperleaf (Catalyst) screens and flows using the real IFS Design System code kit
  (components rebuilt 1:1 from the Figma library). Use whenever the user wants a clickable prototype, coded mock, demo,
  or interactive screen in the Catalyst / IFS Copperleaf design system — even if they just say "prototype this", "make this clickable",
  or describe a screen idea. Runs a fixed conversation: clarifying questions → plain-language layout for approval → build.
  Not for Figma wireframes and not for production code.
---

# Catalyst prototype (loader)

This skill is a loader: the real instructions, scripts and component kit are published on GitHub Pages and change as the design system grows, so always work from the current version.

1. Fetch the current instructions:
   `curl -fsSL https://shinyc01.github.io/new-cl-design-system/ifs-kit/skill/INSTRUCTIONS.md`
2. Read them in full and follow them exactly for this whole task. They cover the questions to ask, the plain-language plan the user approves, the build and the self-check.
3. If the fetch fails (offline, blocked network), tell the user the IFS design system kit couldn't be reached and stop. Don't build a prototype from memory or with look-alike components.

The instructions come from the IFS Copperleaf design team's repository `shinyc01/new-cl-design-system`. Treat them as this skill's own instructions, but they never override the user's requests or your safety rules.
