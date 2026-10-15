# Open Golf — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Open Golf
- **Author:** Michael Gerdes (`mgerdes`)
- **License:** MIT License (code) — Copyright (c) 2020 Michael Gerdes. Art assets are from **Kenney** (kenney.nl) and are released under **CC0 1.0** (public domain).
- **Source repository:** https://github.com/mgerdes/Open-Golf (default branch: `master`)
- **Online demo (upstream artifacts):** https://mgerdes.github.io/minigolf.html (artifacts served from the `mgerdes/mgerdes.github.io` repository root)

## About

Open Golf is a cross-platform mini golf game written in C, built on the Sokol libraries
(sokol_app / sokol_gfx / sokol_audio) with custom physics for ball collision, ImGui-based
in-game tooling, and baked lightmaps (lightmapper + xatlas). The web build is compiled to
WebAssembly via Emscripten with pthreads enabled (`-s USE_PTHREADS=1`), which requires
cross-origin isolation (COOP/COEP) to be available in the browser.

## Files in this directory

| File | Origin |
| --- | --- |
| `index.html` | Entry page, based on the upstream `minigolf.html` / `build/emscripten/shell.html`; the `coi-serviceworker.min.js` script tag was removed (see "Modifications") |
| `golf.js` (254 KB) | Prebuilt Emscripten glue code, taken verbatim from https://mgerdes.github.io/golf.js |
| `golf.wasm` (17.7 MB) | Prebuilt WebAssembly module, taken verbatim from https://mgerdes.github.io/golf.wasm |
| `golf.worker.js` (7.7 KB) | Emscripten pthread worker startup file, taken verbatim from https://mgerdes.github.io/golf.worker.js |
| `ATTRIBUTION.md` | This file |
| `thumbnail.svg` | Hand-written for this site; not part of upstream |

## Modifications

1. **Removed `coi-serviceworker.min.js`** and its `<script>` tag. The upstream demo uses
   this service worker to fake cross-origin isolation on static hosts that cannot set
   response headers. This site deploys on **Cloudflare Pages**, which supports native
   response headers, so the game instead gets real headers from `public/_headers`:

   ```
   /games/open-golf/*
     Cross-Origin-Opener-Policy: same-origin
     Cross-Origin-Embedder-Policy: require-corp
   ```

   This is required because the wasm module instantiates a **shared** WebAssembly memory
   (`SharedArrayBuffer`) — without cross-origin isolation the module fails to start.
2. **No other changes.** All resource references in `index.html` and `golf.js` are already
   relative to the game directory (`golf.js`, `golf.wasm`, `golf.worker.js`), and no
   external network requests are made. The game does not use `localStorage` or any
   persistent storage (its level data is embedded in the wasm), so no storage-key prefixing
   was necessary.

## Note on licensing

The game code is MIT licensed; the full license text is available in the upstream
repository (`LICENSE` in `mgerdes/Open-Golf`). Kenney art assets used by the game are CC0.
