# Quake (Qwasm — WebAssembly port) — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Quake (1996), played through **Qwasm**, an unofficial WebAssembly port of the Quake engine
- **Upstream project:** GMH-Code/Quake-WASM — https://github.com/GMH-Code/Quake-WASM
- **Original engine:** *Quake* by **id Software**. The engine source code was released under the **GNU General Public License v2** (GPL-2.0) in December 1999; this port is built from that GPL source (WinQuake software renderer and GLQuake via GL4ES).
- **Online demo (artifact source):** https://qwasm.m-h.org.uk (mirrors the upstream GitHub Pages demo build)
- **License of the engine:** GNU General Public License v2 — see `gnu.txt` in the upstream repository
- **License of the shareware data:** Quake shareware license — retained verbatim in this directory as `license.txt`

## About

*Quake* is id Software's landmark 1996 first-person shooter. Qwasm compiles the original
GPL engine to WebAssembly with Emscripten and offers two renderers: a WebGL hardware
renderer (GLQuake via GL4ES) and a pure software renderer (WinQuake). This integration
ships the **shareware episode** (the first episode, "Dimension of the Doomed"), which id
Software distributed freely as `quake106.zip`.

## Files in this directory

| File | Size | Origin |
| --- | --- | --- |
| `index.html` | 10.0 KB | **Written for this site** (see Modifications) — not part of upstream |
| `qwasm-gl.js`, `qwasm-gl.wasm`, `qwasm-gl.data` | 217.8 KB / 1.22 MB / 1.6 KB | Prebuilt WebGL (GLQuake/GL4ES) artifacts, taken verbatim from the upstream online demo |
| `qwasm-sw.js`, `qwasm-sw.wasm`, `qwasm-sw.data` | 210.9 KB / 1.03 MB / 1.6 KB | Prebuilt software-renderer artifacts, same source; used as fallback when WebGL is unavailable |
| `pak0.pak` | 18,689,235 B | Shareware data: `ID1/PAK0.PAK` extracted from `resource.1` (LHA archive) inside id Software's `quake106.zip` (Quake shareware v1.06). MD5 `5906e5998fc3d896ddaf5e6a62e03abb` — matches the checksum published in the upstream README |
| `license.txt` | 10.0 KB | Quake shareware license, verbatim from the upstream demo build |
| `thumbnail.svg` | — | Hand-written for this site; not part of upstream |

The `*.data` files are Emscripten file packages containing the engine's default
`autoexec.cfg` / `config.cfg` / `wasm.cfg` (modern WASD key bindings, mouse-look defaults);
they are loaded relative to the script location and are required for the default controls.

## Modifications

Upstream ships **prebuilt binaries only** (no release assets), so the artifacts above were
taken from the project's own online demo rather than built locally — no Emscripten toolchain
was needed and no upstream file was patched or rebuilt.

The upstream demo page is an interactive launcher (file pickers for PAK files, mission-pack
selection, an age checkbox, and an automatic download of `quake106.zip` from the demo host
via `getgame.js` + `libarchive.js`). For this site it was replaced with a new, minimal
`index.html` that:

1. **Self-hosts the game data.** `pak0.pak` is fetched from the same directory with a
   relative-path `XMLHttpRequest` and written into the engine's in-memory filesystem at
   `/id1/pak0.pak` (the upstream page instead downloaded `quake106.zip` from an external
   host and unpacked it with a WASM archive library). Result: zero external requests.
2. **Uses only relative paths.** All engine assets (`qwasm-gl.js`, `qwasm-gl.wasm`,
   `qwasm-gl.data`, `pak0.pak`) resolve relative to `index.html`, so the game works under
   the `/games/quake/` sub-path deployment.
3. **Auto-starts** the shareware episode on page load (the site's game frame already
   provides the start gate) and passes fixed engine arguments
   (`-winsize 1024x576 +fov 106.26 +scr_conspeed 576 +gl_texturemode GL_LINEAR_MIPMAP_LINEAR`,
   or `-winsize 800x600 +fov 90` for the software renderer).
4. **Adds a renderer fallback:** if WebGL is unavailable, the software-renderer build
   (`qwasm-sw.js`) is loaded instead.
5. **Swallows the engine's startup pointer-lock promise rejection** (the engine requests
   pointer lock before any user gesture; the engine retries on first key/click, at which
   point the lock succeeds). Without this, the rejection surfaces as an unhandled page
   error.
6. Keeps every `localStorage`-style setting namespaced — in fact the page itself stores
   nothing; the engine persists saves and settings in IndexedDB under its own `/qwasm`
   database name, which cannot collide with other games on the same origin.

Site-side note: `src/components/games/GameIframe.tsx` (outside this directory) gained the
`allow-pointer-lock` sandbox token so that pointer lock — required for mouse-look in any
first-person game — works inside the site's sandboxed game iframe. This benefits all
pointer-lock games on the site (Quake, DOOM, Duke Nukem 3D, Wolfenstein 3D, etc.).

## Note on licensing

The Quake engine is GPL-2.0; this WebAssembly port and its artifacts are used here under
that license. The shareware `pak0.pak` is the freely redistributable first-episode data
from id Software's `quake106.zip` and is used under the Quake shareware license included
above. Quake and all related trademarks are the property of their respective owners
(id Software / ZeniMax Media / Bethesda Softworks); this project is not affiliated with,
endorsed by, or connected to them.
