# Sopwith (SDL Sopwith) — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Sopwith (SDL Sopwith 2.9.0)
- **Author:** The original game *Sopwith* is by **BMB Compuscience Canada**, original author **David L. Clark**. The SDL port is maintained by **Simon Howard** (`fraggle`) with contributions from Christoph Reichenbach and Jesse Smith. The Emscripten/web build is produced by the upstream CI pipeline of the same repository.
- **License:** GNU General Public License v2
- **Source repository:** https://github.com/fragglet/sdl-sopwith (default branch: `trunk`)
- **Prebuilt Emscripten artifacts:** https://github.com/fragglet/sdl-sopwith-builds (`gh-pages` branch, path `tags/sdl-sopwith-2.9.0/`)

## About

Sopwith is the classic side-scrolling biplane shoot-'em-up by BMB Compuscience Canada (original author David L. Clark). You fly a Sopwith Camel over a scrolling landscape, shooting down enemy biplanes and bombing ground targets. This build is the SDL2 port compiled to WebAssembly via Emscripten.

## Files in this directory

| File | Origin |
| --- | --- |
| `sopwith.html`, `sopwith.js`, `sopwith.wasm` | Prebuilt Emscripten output, taken verbatim from the `gh-pages` branch of `fragglet/sdl-sopwith-builds` at tag `sdl-sopwith-2.9.0` |
| `manifest.json`, `favicon.png`, `icon-192.png`, `icon-512.png`, `loading.gif`, `error.png` | Same prebuilt release (`pkg/emscripten/` in the source repo) |
| `doc/sopwith-emscripten.html` | Same prebuilt release — the in-game manual, opened by the title-screen **M** ("open manual") option via `emscripten_run_script("openManual()")` in `src/swtitle.c` |
| `LICENSE` | Copied verbatim from `COPYING.md` in `fragglet/sdl-sopwith` |
| `thumbnail.svg` | Hand-written for this site; not part of upstream |

## Modifications

The prebuilt release is used **as-is**. No source files were patched — all resource
references inside `sopwith.html` are already relative paths.

`doc/sopwith-emscripten.html` was originally left out of this integration, but the build
loads it at runtime: the title screen has an **"M – open manual"** entry that calls
`window.open("doc/sopwith-emscripten.html")`, so omitting it made that menu item open a
404 error page. The file is only 12.6 KB and has no external sub-resources, so it is
included here. It contains the upstream CONTROLS / SCORING / DASHBOARD / TIPS reference.

## Note on licensing

Sopwith is distributed under the GNU General Public License, version 2. The full license text is retained in this directory as `LICENSE`. The original game and its trademarks remain the property of their respective owners; this build is used here under the GPL.