# NetHack (nethackweb) — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** NetHack (nethackweb — browser/mobile WebAssembly port)
- **Original game authors:** The **NetHack DevTeam**. NetHack was created by the NetHack Development Team; the NGPL copyright (1989) is held by **M. Stephenson**. This build is based on **NetHack 5.0** (built from upstream commit `400c458feef0c095451c8e7e7222eb4385bafced`), including its official support for cross-compilation to WebAssembly (NetHack PR #385, ground work by apowers313).
- **Web port author:** **Guillaume Brunerie** (`guillaumebrunerie`) — React UI + Emscripten packaging.
- **License:** NetHack is distributed under the **NetHack General Public License (NGPL)** — full text retained in this directory as `LICENSE.NGPL`. The nethackweb React/TypeScript UI layer is **MIT** licensed (Copyright (c) 2025 Guillaume Brunerie and contributors).
- **Source repository:** https://github.com/guillaumebrunerie/nethackweb (branch `main`)
- **Upstream build instructions:** https://github.com/guillaumebrunerie/nethackweb#readme
- **Playable upstream demo:** https://guillaumebrunerie.github.io/nethack

## About

NetHack is a classic single-player roguelike: you descend a dungeon, fight monsters, collect gold and items, and try to retrieve the Amulet of Yendor. This build uses NetHack 5.0's WebAssembly cross-compilation with a React-based windowing system on top. It renders **IBMGraphics ASCII only** (no tiles) — this is expected behavior of the port, not a defect.

## Files in this directory

| File | Origin |
| --- | --- |
| `index.html` | Upstream Vite build (`base: ""`, relative paths), PWA registration lines removed for this integration |
| `favicon.webp` | Upstream build artifact (`public/favicon.webp`) |
| `assets/index-BLENTcTX.js` | Upstream Vite build artifact; localStorage key patched (see Modifications) |
| `assets/index-CsgnRPVE.css` | Upstream Vite build artifact |
| `assets/nethack-DPsPUQL1.wasm` | Upstream Emscripten artifact — NetHack 5.0 compiled to WebAssembly |
| `assets/dejavu-mono-latin-400-normal-*.woff2` / `*.woff` | Upstream build artifact — DejaVu Mono (public domain / Bitstream Vera license), bundled locally by the upstream build |
| `LICENSE.NGPL` | Copied verbatim from `build/LICENSE.NGPL` in the upstream repository |
| `ATTRIBUTION.md`, `thumbnail.svg` | Written for this site; not part of upstream |

All artifacts were taken **verbatim from the upstream GitHub Pages deployment**
(`https://guillaumebrunerie.github.io/nethack`, the project's published build).

## Modifications

1. **Removed PWA registration from `index.html`:** the upstream page links a
   `manifest.webmanifest` and registers a service worker via `registerSW.js`.
   The game is embedded in an iframe on this portal, so install prompts and a
   scoped service worker are unnecessary and would only add failure modes
   (the service worker file itself is not shipped here). All other references
   were already relative paths.
2. **localStorage key namespaced:** the upstream settings module stores its
   settings object under the bare key `"nethackweb"`. It was renamed to
   `"nethack:settings"` so it cannot collide with other games hosted on the
   same origin. The in-app "Reset" button (`localStorage.removeItem`) was
   updated to match.

## Persistence notes

- Game saves, high scores, bones levels, and the `.nethackrc` config persist
  through Emscripten **IDBFS** (IndexedDB database mounted at `/save`).
- Saves are written when the tab/page is hidden (`visibilitychange` /
  `pagehide`), matching upstream behavior.
- UI settings persist in `localStorage` under the `nethack:settings` key.
