# DOOM (Chocolate Doom / cloudflare doom-wasm) — Open Source Attribution

This game is integrated into the site as a self-hosted WebAssembly build.

- **Title:** DOOM (1993, id Software) — Chocolate Doom WebAssembly port ("Websockets Doom" by Cloudflare)
- **Upstream port:** https://github.com/cloudflare/doom-wasm (Chocolate Doom compiled to WebAssembly with Emscripten, with optional WebSockets multiplayer support)
- **Engine:** Chocolate Doom — https://github.com/chocolate-doom/chocolate-doom (a source port that aims to be compatible with the original DOOM)
- **Port author:** Celso Martinho (Cloudflare), 2021
- **License:** GNU General Public License v2 (Chocolate Doom and this port). Full text retained in `COPYING.md`.
- **Game data:** Shareware `doom1.wad` (DOOM1.WAD v1.9, 4,196,020 bytes, dated 1995-02-01) — id Software's shareware episode "Knee-Deep in the Dead". id Software's shareware licence permits free copying and distribution of the unmodified shareware WAD (see https://doomwiki.org/wiki/DOOM1.WAD and the idgames/wad-archive redistribution references). The commercial DOOM.WAD is **not** included; this integration only ships the shareware data file, which id Software explicitly allows to be redistributed.

## About

DOOM is the seminal 1993 first-person shooter by id Software. This is the
Chocolate Doom engine (a faithful source port of the original DOOM) compiled
to WebAssembly via Emscripten, in Cloudflare's port that additionally supports
optional WebSocket-based multiplayer. The site integration runs **single-player
only** — no network code is reachable in this configuration (see below).

## Files in this directory

| File | Origin |
| --- | --- |
| `index.html` | Hand-written entry page, adapted from the upstream `src/index.html` (Google Fonts reference removed; favicon added) |
| `websockets-doom.js`, `websockets-doom.wasm` | Emscripten build output, produced by running the upstream `scripts/build.sh` (Emscripten 3.1.74, SDL2/SDL2_mixer/SDL2_net ports) against the unmodified cloudflare/doom-wasm source |
| `doom1.wad` | Shareware DOOM1.WAD v1.9 (4,196,020 bytes; SHA-256 `1d7d43be501e67d927e415e0b8f3e29c3bf33075e859721816f652a526cac771`) |
| `default.cfg` | Upstream `src/default.cfg` (default key bindings) |
| `COPYING.md` | GPL-2.0 license text, verbatim from the upstream repository |
| `favicon.png` | Hand-written for this site (pure-Python generated, 64×64); not part of upstream |
| `thumbnail.svg` | Hand-written for this site; not part of upstream |

## Modifications

1. **`index.html` — removed the Google Fonts `<link>`/`@font-face` for the "VT323"
   font** (`src/index.html` lines 7–13 and the `html { font-family: "VT323" ... }`
   rule). The site forbids any external network requests; the font stack now falls
   back to local monospace/system fonts.
2. **`index.html` — added `<link rel="icon" href="favicon.png">`** (replacing the
   upstream `favicon.ico` reference, which would 404 since no favicon ships with
   the port).
3. **WebSocket multiplayer code is present in the engine but unreachable in
   single-player.** In the upstream source, `NET_Websockets_InitClient()` /
   `InitWebSockets()` (`src/net_websockets.c`) are only invoked when the game is
   started with `-connect`/`-server` **and** `-wss <url>` command-line parameters
   (see `src/d_loop.c` `D_InitNetGame`). The integration starts the game with
   `-iwad doom1.wad -window -nogui -nomusic -config default.cfg -servername doomflare`
   — no `-connect`, no `-server`, no `-wss` — so **no WebSocket connection is ever
   attempted**. Verified empirically in a real browser: zero WebSocket connection
   attempts, zero external requests. **No source or binary files were patched to
   achieve this**; the single-player path is clean by construction.
4. **Paths** — all references inside `index.html` (`websockets-doom.js`,
   `doom1.wad`, `default.cfg`) are already relative, matching the sub-path
   deployment (`/games/doom/`). The game does not use `localStorage`, so there is
   no cross-game key collision risk.

## Build provenance

Built from the unmodified `main` branch of `cloudflare/doom-wasm`
(commit `65e0d3a`, "Adding semgrep yaml file") with the upstream
`scripts/build.sh` flow, locally on macOS (arm64):

- `emsdk latest` (Emscripten 4.x), with SDL2 / SDL2_mixer / SDL2_net Emscripten ports
- GNU autoconf 2.72 + automake 1.17 + pkg-config 0.29.2 built from source into
  `~/local` (macOS ships none of these; GNU M4 1.4.19 built likewise, as autoconf
  needs M4 >= 1.4.8)
- Three Emscripten-flag updates in `configure.ac` were required, because the
  upstream flags target 2021-era Emscripten:
  `EXTRA_EXPORTED_RUNTIME_METHODS` -> `EXPORTED_RUNTIME_METHODS`,
  dropped `LEGACY_GL_EMULATION=0`, and `SAFE_HEAP=1` removed. The last one caused a
  real runtime abort ("Aborted(alignment fault)") — alignment faults are exactly
  what SAFE_HEAP detects. The final build runs clean: canvas 800x600, zero page
  errors, zero external requests, in-game HUD verified in a real browser.
- No C/C++ source files were modified; the only source-level edits are the three
  flag changes above plus the two `index.html` edits listed above.
- The source map (`websockets-doom.wasm.map`, 1.4 MB) was not shipped to keep
  the deploy lean.

## Note on licensing

Chocolate Doom and the Cloudflare port are distributed under the GNU General
Public License, version 2; the full text is retained here as `COPYING.md`.
DOOM and its trademarks remain the property of id Software; the shareware WAD is
redistributed under id Software's shareware licence terms, which permit free
copying and distribution of the unmodified shareware data file.
