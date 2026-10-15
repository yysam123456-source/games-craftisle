# Chocolate Keen — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Chocolate Keen — *Commander Keen in Invasion of the Vorticons, Episode One: Marooned on Mars*
- **Authors:** Chocolate Keen is a reverse-engineering project originally authored by **NY00123**, **QuantumG** and **Lemm**. The GitHub repository and the WebAssembly port are maintained by **James MacKenzie** (`jamesfmackenzie`).
- **Original game:** *Commander Keen in Invasion of the Vorticons — Episode One: Marooned on Mars* (1990) by **id Software**, distributed as shareware by **Apogee Software**.
- **License:** GNU General Public License v2 — full text retained in this directory as `LICENSE`, copied verbatim from `gpl-2.0.txt` in the upstream repository.
- **Source repository:** https://github.com/jamesfmackenzie/chocolatekeen (default branch: `master`)
- **Prebuilt WebAssembly artifacts:** GitHub Releases, tag `v0.0.1-test3`, asset `chocolate-keen-WebAssembly.zip`
- **Build reference:** https://www.jamesfmackenzie.com/2019/10/28/commander-keen-ported-to-webassembly/

## About

Commander Keen is the classic DOS side-scrolling platformer: Billy Blaze builds a starship, becomes Commander Keen, and crash-lands on Mars. Chocolate Keen is a from-scratch C/SDL reimplementation of the original game engine, aiming for bug-for-bug authenticity to the 1990 original. This build is that engine compiled to WebAssembly via Emscripten (single-threaded Asyncify build), running the shareware Episode 1 game data bundled inside `chocolate-keen.data`.

## Files in this directory

| File | Origin |
| --- | --- |
| `chocolate-keen.html`, `chocolate-keen.js`, `chocolate-keen.wasm`, `chocolate-keen.data` | Prebuilt Emscripten output, taken verbatim from `chocolate-keen-WebAssembly.zip` (release `v0.0.1-test3`). The `.data` package embeds the shareware Episode 1 game files (`KEEN1.EXE`, `LEVEL01–16.CK1`, sprites, sounds, texts). |
| `LICENSE` | Copied verbatim from `gpl-2.0.txt` in `jamesfmackenzie/chocolatekeen` |
| `thumbnail.svg` | Hand-written for this site; not part of upstream |

## Modifications

The prebuilt release is used essentially **as-is**. One change was made to the
Emscripten-generated shell page: the upstream `chocolate-keen.html` contained a
logo anchor linking to `http://emscripten.org`. That external link (and the
inline base64 logo image it wrapped, plus the matching CSS rule) was removed so
the page makes zero external requests, per site policy. All resource references
inside the shell (`chocolate-keen.js`, `chocolate-keen.wasm`, `chocolate-keen.data`)
are already plain relative paths, which work correctly under the
`/games/chocolate-keen/` sub-path deployment.

No COOP/COEP cross-origin isolation headers are required: this is a
single-threaded Asyncify build with no pthreads / SharedArrayBuffer usage
(`SharedArrayBuffer` does not appear anywhere in `chocolate-keen.js`).

## Note on licensing

Chocolate Keen is distributed under the GNU General Public License, version 2;
the full license text is retained in this directory. Commander Keen and related
trademarks remain the property of their respective owners. The bundled Episode 1
game data is the original shareware release, which is freely redistributable.
