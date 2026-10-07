# Roguish — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Roguish
- **Author:** Cam Henlin
- **License:** BSD 3-Clause License
- **Source repository:** https://github.com/CamHenlin/Roguish
- **Original live build:** https://camhenlin.github.io/Roguish/

## About

Roguish is a turn-based roguelike dungeon crawler rendered with **EaselJS**
(CreateJS) on an HTML5 canvas. Explore a procedurally populated dungeon,
manage a party of one to four heroes, and recover the mythic treasure chest —
or die trying. It supports both single-player and hot-seat multiplayer.

## License compliance (BSD-3-Clause)

Roguish is BSD 3-Clause licensed. The upstream `LICENSE` file is redistributed
verbatim in [`LICENSE`](./LICENSE), preserving the copyright notice, the
condition clause, and the disclaimer, as the BSD license requires.

## Modifications made for this self-hosted build

Only build-tooling files were dropped. No game code was touched.

1. **Removed `build/compiler.jar`** (5.9 MB). This is Closure Compiler, used by
   the upstream `build/build.sh` / `build/build.ps1` to regenerate
   `build/game.min.js`. The already-compiled `build/game.min.js` — which is what
   `index.html` actually loads — is included and bundles PreloadJS, EaselJS,
   `astar.js` and jQuery 2.1.3 inline, so nothing is lost at runtime.

2. **Fixed two `createjs.Bitmap()` URLs in `build/game.min.js`.** The enemy
   health-bar images were referenced as `../graphics/health_bar.png` and
   `../graphics/health_bar_red.png`. CreateJS resolves those against the
   *document* base (`roguish/index.html`), so the `../` escaped the game folder
   to `/games/graphics/...` and 404'd — which broke the bundle with a
   `drawImage ... broken state` error. Changed to `graphics/health_bar.png` and
   `graphics/health_bar_red.png`, matching how every other asset in the same
   bundle is already referenced. Verified in Chromium: 404s and page errors
   both went from non-zero to zero.

Everything the game loads is included and unchanged:

- `index.html`, `main.css`
- `build/game.min.js` (the prebuilt bundle)
- `maps/` — `dungeon.json`, `dungeon_b1.json`, `dungeon_b2.json`, `outside.json`
- `graphics/` — tileset, sprites, health bars, fog-of-war overlay
- `MIRANDA.ttf`, `pixelated.ttf` — fonts referenced by `main.css`
- `libs/` — the same libraries already inlined into the bundle, kept for
  reference

The game already used document-relative paths (`maps/`, `graphics/`), so it
runs unchanged from `/games/roguish/`.