# ATLAS — Final Brand Asset System

This folder is the production source of truth for the locked ATLAS logo and color system.

## Locked logo direction

- Structural geometric **A** in Graphite.
- Integrated central **T / Axis** in Atlas Blue, reading subtly as upward movement and SalesFlow progress.
- A restrained curved lower span suggests platform / world / system without becoming a literal globe.
- ATLAS wordmark uses **Inter** with wide tracking for digital consistency.

Do not redraw, stretch, rotate, recolor, add shadows/glows, or modify the proportions of the master mark.

## Approved palette

| Token | Hex | Usage |
|---|---|---|
| Graphite | `#111827` | Structure, primary typography, trusted information |
| Deep Navy | `#0B2F6B` | Product surfaces, navigation, premium digital depth |
| Atlas Blue | `#2563EB` | Primary actions, T/Axis, key data, links |
| Sky | `#38BDF8` | Motion, highlights, secondary accents |
| Mist | `#F1F5F9` | Light surfaces and dividers |
| Slate | `#64748B` | Secondary text |
| Off White | `#F8FAFC` | Primary light background |

## Source SVGs

- `svg/atlas-icon-color.svg` — primary icon.
- `svg/atlas-icon-monochrome.svg` — one-color Graphite.
- `svg/atlas-icon-white.svg` — reversed icon for dark backgrounds.
- `svg/atlas-wordmark.svg` — wordmark only.
- `svg/atlas-lockup-horizontal.svg` — icon + wordmark.
- `svg/atlas-lockup-stacked.svg` — icon over wordmark.
- `svg/atlas-app-tile.svg` — square app/PWA source.

SVG is the canonical master. PNG, WebP, favicons, Android/iOS sizes and social avatars must be generated from these source files; never rasterize a screenshot of the logo.

## Generate production exports

```bash
cd brand-assets/atlas
npm install
npm run export
```

The exporter writes transparent and background-backed outputs into `dist/` at standard web/app sizes.

## Production naming

Examples:

- `atlas-icon-color-512.png`
- `atlas-icon-white-256.png`
- `atlas-lockup-horizontal-color-2048.png`
- `atlas-app-icon-1024.png`
- `favicon-16.png`, `favicon-32.png`, `apple-touch-icon-180.png`

## Usage hierarchy

1. **Master horizontal lockup** — website header, product navigation, proposals.
2. **Icon only** — sidebar collapsed state, app icon, favicon, avatar.
3. **Stacked lockup** — splash screens, covers, centered brand moments.
4. **Monochrome** — engraving, emboss, legal/print fallback.
5. **White reverse** — Deep Navy / Graphite surfaces.

## Clear space

Maintain clear space around the icon equal to at least 20% of the icon width. For lockups, keep the same minimum space around the full bounding box.

## Minimum size

- Icon: 24 px minimum on screen.
- Horizontal lockup: 120 px minimum width on screen.
- Print icon: 12 mm minimum height.

## Typography

Primary product/brand typeface: **Inter**. Do not commit font files to this repository. Use system/package delivery appropriate to the product.

## Status

**LOCKED FOR PRODUCTION.** Future changes require an explicit brand revision, not ad-hoc UI edits.
