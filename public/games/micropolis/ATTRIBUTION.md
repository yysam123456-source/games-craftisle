# micropolisJS — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** micropolisJS
- **Author:** **Graeme McCutcheon** (plus contributors)
- **License:** GNU General Public License v3, with **additional terms per GPL Section 7** (no trademark or publicity rights granted)
- **Source repository:** https://github.com/graememcc/micropolisJS

## About

micropolisJS is a hand-written HTML5/JavaScript port of **Micropolis**, the open-source 1989 release of *SimCity*, released by the Micropolis Corporation under a courtesy license. It is a full city-building simulator: zone residential/commercial/industrial land, build roads, rail and power lines, set budgets and taxes, and try to survive disasters.

## Build provenance

This is a **fresh local production build**, not a vendored prebuilt copy:

```bash
git clone --depth 1 https://github.com/graememcc/micropolisJS.git
cd micropolisJS && npm ci
npx webpack --mode production
```

Cloning with `git` (rather than downloading a tarball) is required: `webpack.config.js` derives the build ID via `git-revision-webpack-plugin`, which shells out to `git rev-parse HEAD` and fails without repository metadata. The resulting `dist/` was copied verbatim into this directory.

## Files in this directory

| File / directory | Origin |
| --- | --- |
| `index.html`, `src/micropolis.js` | Webpack production output |
| `css/`, `images/`, `sprites/` | Copied from the build output |
| `LICENSE`, `COPYING` | GPL-3.0 and additional terms, as published upstream |
| `about.html`, `name_license.html` | Upstream attribution and Micropolis Public Name License pages |
| `thumbnail.svg` | Hand-written for this site; not part of upstream |

## Modifications

- **Removed the Twitter share widget.** The `<div id="tw">` block in `index.html` — containing the `twitter-share-button` anchor and an inline script that injected `https://platform.twitter.com/widgets.js` — was deleted, so the page makes no third-party network requests. The compiled `micropolis.js` contains no reference to that element, so this is safe.
- **Removed the Google Fonts `@import` from `css/style.css`.** Upstream pulls Open Sans from `fonts.googleapis.com`, which fires three requests to Google and leaks visitor IPs to a third party. Every `font-family` declaration in the stylesheet already falls back to `sans-serif`, so the game renders correctly using system fonts only.
- **Preserved attribution.** The footer credits the author (`graememcc.co.uk`, `@graememcc`, GitHub contributors), the charity link, and the Micropolis Public Name License notice in `name_license.html` were all left untouched. These are attribution, not tracking.
- No game logic was modified.

## Note on licensing

Micropolis is a registered trademark of the **Micropolis Corporation (Micropolis GmbH)** and is licensed here as a courtesy of the owner under the Micropolis Public Name License; that notice is reproduced in `name_license.html` and is also linked from the game footer. The micropolisJS port is GPL-3.0. `SimCity` is a trademark of Electronic Arts; no rights in it are granted by this license.