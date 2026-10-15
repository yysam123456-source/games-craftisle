# Anarch — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Anarch
- **Author:** **Miloslav Číž** (`drummyfish`), www.tastyfish.cz
- **License:** CC0 1.0 Universal (public domain dedication) + an explicit waiver of all other intellectual property rights. Everything in the upstream repository — code, graphics, sprites, palettes, fonts, sounds, music, levels and texts — is original work released this way by the author. No attribution is legally required; it is provided here voluntarily.
- **Source repository:** https://gitlab.com/drummyfish/anarch (default branch: `master`)
- **Project website:** https://drummyfish.gitlab.io/anarch
- **Prebuilt web (Emscripten) artifacts:** https://drummyfish.gitlab.io/anarch/bin/web/anarch.html

## About

Anarch is an extremely small (the whole game fits in under 1 MB), completely public domain, no-dependency, no-file, portable "suckless" from-scratch 90s-style Doom clone that runs everywhere, made by drummyfish "for the benefit of all living beings". It uses a custom software raycasting engine (raycastlib, an evolution of the Wolf3D technique with multi-level floor/ceiling heights), integer-only math (no FPU needed), a custom 256-color palette, 10 levels, 6 weapons and 7 enemy types. Enemies are robots only — no violence against living beings, by design. This build is the SDL2 frontend compiled to WebAssembly via Emscripten (512x320, target 35 FPS).

## Files in this directory

| File | Origin |
| --- | --- |
| `anarch.html`, `anarch.js`, `anarch.wasm` | Prebuilt Emscripten output, taken verbatim from the `bin/web/` directory of the drummyfish.gitlab.io/anarch GitLab Pages site (upstream source template: `HTMLshell.html` + `main_sdl.c` in the repository) |
| `ATTRIBUTION.md` | This file |
| `thumbnail.svg` | Hand-written for this site; not part of upstream |

## Modifications

The prebuilt release is used **as-is**. No source files were patched:

- All resource references inside `anarch.html` / `anarch.js` are already relative paths (`anarch.js` is loaded as `async src=anarch.js`, and the wasm binary is resolved as `anarch.wasm` relative to the script directory), which works correctly under the `/games/anarch/` subpath deployment.
- No external network requests are made: the only `https://` string in `anarch.js` is the text of a `dlopen` error message (a link to the Emscripten wiki) that is never fetched. The game has no external data files — all assets are embedded in the wasm binary.
- The game stores no save data and makes no use of `localStorage`, so no key namespacing was necessary.
