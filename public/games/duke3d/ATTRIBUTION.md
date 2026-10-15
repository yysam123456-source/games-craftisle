# Duke Nukem 3D (uDuke) — Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Duke Nukem 3D — *uDuke* browser port
- **Port author:** **Dirk Brenken** (`dibdot`), written with **Claude** (Anthropic)
- **Source repository:** https://github.com/dibdot/uDuke (branch `main`, v1.0.x)
- **Game data:** shareware `DUKE3D.GRP` v1.3 (11,035,779 bytes), from the official 3D Realms shareware release (`3dduke13.zip`, 1996)

## About

uDuke is a dependency-free **JavaScript** port of the Build engine and of Duke Nukem 3D's game code (not an Emscripten build). It reads the original game data — the player's own `DUKE3D.GRP` — and runs it entirely client-side: the portal renderer, the CON script interpreter (`GAME.CON` / `USER.CON`), the actors, the sound model, and the MIDI music through Apogee's sequencer on an emulated OPL3 chip running in a Web Worker. No game content ships with the port itself; the engine only *interprets* the GRP archive.

The shareware GRP contains **Episode 1 "L.A. Meltdown"** only, without the registered weapons — the registered weapons appear as blank tiles. This is expected behaviour, noted by the upstream README.

## Licensing

uDuke is a port, not a clean-room reimplementation; its behaviour is transcribed rule by rule from released source code. The layered licensing (per the upstream `LICENSE.txt` / README):

- **Game logic** (CON interpreter, actors, sectors, player, sound model) — derived from the Duke Nukem 3D source code released by **3D Realms / Apogee** in 2003 under **GNU GPL v2 or later**. uDuke is distributed under the same license.
- **Engine parts** (collision/zrange, hitscan, sector geometry, parts of the renderer, palette/shade tables) — follow Ken Silverman's **Build engine** source (`engine.c`), which is **not** GPL: Ken Silverman's own license (BUILDLIC.TXT) allows free non-commercial use with credit to Ken Silverman. "Build Engine & Tools" Copyright (c) 1993-1997 Ken Silverman (www.advsys.net/ken). In effect uDuke as a whole may be used and passed on **non-commercially**.
- **Music** (`js/music.js`, Apogee's EMIDI sequencer + AdLib driver) — port of Apogee's audiolib by **James R. Dose**, **GPL v2 or later**; `js/opl3.js` — port of **Nuked OPL3 1.8** by **Nuke.YKT**, **LGPL v2.1 or later**. Instruments are Duke's own `D3DTIMBR.TMB` from the GRP.
- **Game data** (`DUKE3D.GRP`, shareware v1.3) — Duke Nukem 3D and its data files are the property of their respective rights holders (3D Realms / Apogee / Gearbox). The shareware episode was freely distributable by Apogee Software.

Upstream `LICENSE.txt` (GPL-3.0 text) is kept in this directory.

## Files in this directory

| File | Origin |
| --- | --- |
| `index.html`, `js/*.js` (31 modules) | uDuke upstream repository, taken verbatim except the localStorage key changes noted below |
| `DUKE3D.GRP` | Official 3D Realms shareware v1.3 data file (11,035,779 bytes, `KenSilverman` GRP format, 215 entries) |
| `LICENSE.txt`, `README.upstream.md` | Upstream repository (renamed the README to avoid confusion with this file) |
| `ATTRIBUTION.md` | This file |
| `thumbnail.svg` | Hand-written for this site; not part of upstream |

The shareware archive `3dduke13.zip` was originally hosted at `legacy.3drealms.com/duke3d/` (now defunct — the host no longer resolves) and is mirrored on the Internet Archive (`archive.org/details/3dduke13`) and by the Duke4.net/EDuke32 maintainers (`hendricks266.duke4.net/files/3dduke13_data.7z`). `DUKE3D.GRP` was extracted from the Internet Archive copy of the original zip.

## Modifications

The upstream build is used **as-is**, with two minimal, necessary changes:

1. **localStorage key namespacing.** The site serves many games same-origin, so all storage keys are prefixed `duke3d:` to avoid cross-game collisions: `uduke-save-1..3` → `duke3d:uduke-save-1..3` (`js/save.js`) and `uduke.mobileControls` → `duke3d:mobileControls` (`index.html`). The save-format marker string inside the save payload (`format: 'uduke-save-1'`) is untouched — it is data, not a storage key.
2. **Nothing else.** All resource references were already relative paths and remain unchanged: modules are imported as `./js/….js`, the music Web Worker is resolved with `new URL('./musicworker.js', import.meta.url)`, the favicon is an inline `data:` URI, and the GRP is fetched by the relative name `DUKE3D.GRP` next to the page (`index.html?grp=<name>` may override). This works correctly under the `/games/duke3d/` subpath deployment, and the game makes **zero external network requests** over plain HTTP — no COOP/COEP headers required (music uses a Web Worker, not an AudioWorklet).
