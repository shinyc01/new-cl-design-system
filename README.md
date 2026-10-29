# IFS Copperleaf Design System

Hosted design system assets for IFS Copperleaf wireframes and prototypes.

## New: IFS DS kit (`ifs-kit/`)

The current code kit, rebuilt 1:1 from the Figma IFS Design System library, with Storybook and the `catalyst-prototype` skill. See [ifs-kit/README.md](ifs-kit/README.md).
Storybook: https://shinyc01.github.io/new-cl-design-system/ifs-kit/dist/storybook/

The `DS/` kit below is the older version, kept so existing links keep working.

## CDN URLs (via GitHub Pages)

```html
<link rel="stylesheet" href="https://shinyc01.github.io/copperleaf-design-system/DS/styles.css">
<script src="https://shinyc01.github.io/copperleaf-design-system/DS/_ds_bundle.js"></script>
```

## Usage in wireframes

Any HTML file — regardless of where it's saved — can use the DS by linking the above URLs.

## Folder structure

```
DS/                  ← design system bundle
  styles.css         ← all tokens + component styles
  _ds_bundle.js      ← React component library
  tokens/            ← raw token files
  components/        ← component reference implementations
website/             ← DS documentation site
```
