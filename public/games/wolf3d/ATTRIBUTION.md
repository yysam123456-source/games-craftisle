# Wolfenstein 3D (ECWolf / ecwolf-js) — Open Source Attribution

This game is integrated into the site as a self-hosted WebAssembly build.

- **Title:** Wolfenstein 3D (shareware, "Episode 1: Escape from Wolfenstein"), running on **ECWolf** via **ecwolf-js**
- **Original game:** *Wolfenstein 3D* (1992) by **id Software** (distributed as shareware by Apogee Software). The bundled data is the freely distributable **WL1 shareware** release, not the commercial WL6 data.
- **Engine — ECWolf:** an advanced source port of the Wolfenstein 3D engine, based on Wolf4SDL and the original id Software source release. Main author: Braden "Blzut3" Obrzut, with contributions from the ECWolf/Wolf4SDL communities.
- **WebAssembly port — ecwolf-js:** a WebAssembly port of ECWolf for browsers by **54ac** (`https://github.com/54ac/ecwolf-js`), using the Emscripten JavaScript runtime and IndexedDB filesystem emulation for savegames/settings.
- **License:** GPL-2+ (ECWolf engine code; full text in `LICENSE`). The original id Software source release is additionally covered by the id Software license (see `LICENSE-ID-SOFTWARE.txt`). Some bundled third-party code (e.g. MAME-derived) is under its own license — see the ECWolf `docs/` directory upstream.
- **Upstream repository:** https://github.com/54ac/ecwolf-js
- **ECWolf home:** https://maniacsvault.net/ecwolf/
- **Prebuilt artifacts:** the `1.5pre-js` GitHub release (`ECWolf-JS.1.5pre.-.default.frontend.zip`), which bundles `ecwolf.js`, `ecwolf.wasm`, `ecwolf.data` (the Emscripten preload package containing `ecwolf.pk3` **and the shareware WL1 data files**).

## About

*Wolfenstein 3D* is the classic 1992 first-person shooter that popularized the FPS genre. You play B.J. Blazkowicz, an Allied spy escaping Castle Wolfenstein, fighting guards and bosses across ten maps. This build is ECWolf — a modern source port faithful to the original 8-bit software renderer — compiled to WebAssembly.

## Files in this directory

| File | Origin |
| --- | --- |
| `ecwolf.js`, `ecwolf.wasm` | Verbatim from the `ECWolf-JS.1.5pre.-.default.frontend.zip` release asset of `54ac/ecwolf-js` |
| `ecwolf.data` | Same release asset — the Emscripten preload package. Contains `ecwolf.pk3` (engine resources) plus the eight shareware `*.WL1` data files (`AUDIOHED.WL1`, `AUDIOT.WL1`, `GAMEMAPS.WL1`, `MAPHEAD.WL1`, `VGADICT.WL1`, `VGAGRAPH.WL1`, `VGAHEAD.WL1`, `VSWAP.WL1`) mounted at the virtual-FS root |
| `ecwolf.html` | Emscripten shell page from the same release, **modified by us** (see below) |
| `LICENSE` | ECWolf's GPL-2+ license text, copied from `docs/license-gpl.txt` in the upstream repository |
| `LICENSE-ID-SOFTWARE.txt` | id Software source-release license text, copied from `docs/license-id.txt` in the upstream repository |
| `thumbnail.svg` | Hand-written for this site; not part of upstream |

## Modifications

The prebuilt release is used essentially as-is. All resource references were
already relative paths (the game is served from `/games/wolf3d/`), so no
path rewrites were needed. Changes to `ecwolf.html` are cosmetic only:

- Removed the `<a href="http://emscripten.org">` anchor around the Emscripten
  logo (an outbound link; the logo image itself was a `data:` URI and has been
  dropped entirely — it was hidden by CSS anyway).
- Changed the page title from "Emscripten-Generated Code" to
  "Wolfenstein 3D (ECWolf)".
- Added a black page background and console colors so the loading screen does
  not flash white inside the site's iframe.

No JavaScript, WebAssembly, or data files were patched.

## Note on licensing

ECWolf is free software under the GNU General Public License, version 2 or
later; the full text is retained in `LICENSE`. The original *Wolfenstein 3D*
engine source was released by id Software under the license reproduced in
`LICENSE-ID-SOFTWARE.txt`. The WL1 shareware data files are the freely
redistributable shareware episode originally distributed by Apogee Software;
*Wolfenstein 3D* and its trademarks remain the property of their respective
owners.
