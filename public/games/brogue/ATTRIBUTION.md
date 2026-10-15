# Brogue CE (BrogueJS) — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Brogue CE v1.15.1 (BrogueJS — Brogue in the browser)
- **Authors:**
  - Original *Brogue* by **Brian Walker** (aka Pender).
  - *Brogue CE* (Community Edition) is a continuation led by **Tom Mewett** (`tmewett`), with support from **Tom Ford** (`flend`) and **Brandon Groom** (`zenzombie`).
  - The Emscripten/browser port **BrogueJS** was originally created by **Richard Klafter** (`freethenation`) and **Eric Swanson** (`lachesis`); this v1.15.1 web build is maintained by **Bryan Turner** (`brturn`).
  - Graphical tiles are from the iOS port **iBrogueCE** (`btaylor84`), credit to **Seth Howard** and **Robert Taylor**.
- **License:** GNU Affero General Public License v3 (GPL-compatible; BrogueJS is AGPL-3.0, the underlying BrogueCE is GPL-3.0)
- **Source repository:** https://github.com/brturn/BrogueCE (Emscripten branch; upstream BrogueCE: https://github.com/tmewett/BrogueCE)
- **Prebuilt web artifacts:** https://brturn.github.io/BrogueCE/ (live demo page and all files in this directory were fetched from there)

## About

Brogue is a single-player strategy game set in the halls of a mysterious, randomly generated dungeon. The objective is to retrieve the fabled Amulet of Yendor from the 26th level and escape alive. It is a classic "coffee-break" roguelike rendered in ASCII/tile graphics, played entirely locally in the browser — no server communication. Save games and recordings are stored in the browser via IndexedDB (mounted through Emscripten's IDBFS), and can be exported/imported through the in-game file manager for cross-platform play with desktop BrogueCE.

## Files in this directory

| File | Origin |
| --- | --- |
| `brogue.html` | Entry page, fetched verbatim from https://brturn.github.io/BrogueCE/brogue.html |
| `brogue.js`, `brogue.wasm` | Prebuilt Emscripten output, fetched verbatim from the same demo site |
| `BrogueCE.ttf` | Tile font (same font as the iOS port), fetched verbatim from the same demo site |
| `manifest.json`, `sw.js` | PWA manifest and offline service worker from the same demo site |
| `favicon.ico`, `brogue-icon-192.png`, `brogue-icon-256.png`, `brogue-icon-512.png` | Icons from the same demo site |
| `brogue-title-screen.jpg`, `brogue-screen-1.jpg`, `brogue-screen-2.jpg`, `brogue-screen-3.jpg` | Screenshots referenced by the manifest |
| `esc-button.png`, `direction-pad.svg`, `dir-pad.svg`, `fullscreen.svg`, `files.svg`, `keyboard.svg`, `info.svg`, `bugs.svg`, `close.svg`, `upload.svg`, `delete.svg`, `download.svg` | UI icons referenced by the page and by the file-manager code, fetched verbatim from the same demo site |
| `thumbnail.svg` | Hand-written for this site; not part of upstream |

## Modifications

The upstream build is used **as-is**, with only these minimal changes:

1. `brogue.html`: all external hyperlinks in the "About" dialog and the toolbar (links to github.com, sites.google.com, brogue.roguelikelike.com) were converted to plain text spans. Attribution text is preserved; only outbound navigation was removed to guarantee zero external requests.
2. `manifest.json`: `start_url` and the shortcut/`file_handlers` action were changed from `index.html` to `brogue.html` (the entry file on this site), and the `related_applications` entry pointing to the Apple App Store was removed.

No functional code was changed. All resource references were already relative paths; the game does not use `localStorage` (saves go to IndexedDB under the `brogue`-scoped database `/brogue`, so there is no cross-game key collision).

## Note on licensing

BrogueJS is distributed under the GNU Affero General Public License v3; Brogue CE under the GNU General Public License v3. The original game and its trademarks remain the property of their respective owners; this build is used here under those licenses. Full license texts are available in the upstream repositories linked above.
