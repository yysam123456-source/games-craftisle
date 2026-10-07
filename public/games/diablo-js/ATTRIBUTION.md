# Diablo JS — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Diablo JS
- **Author:** mitallast
- **License:** MIT License
- **Source repository:** https://github.com/mitallast/diablo-js

## About

Diablo JS is a minimal-code isometric action-RPG in the Diablo style, written
against a single HTML5 `<canvas>` with no engine and no dependencies. The
`diablo.js` file contains the entire engine and game — map data, the combat
loop, the loot tables, and the sprite animation driver — in about 900 lines.
Every monster, floor tile, wall, barrel, potion and coin is an isometric sprite
sheet on disk.

## License compliance (MIT)

Diablo JS is MIT licensed. The upstream `LICENSE` file is redistributed
verbatim in [`LICENSE`](./LICENSE), preserving the copyright notice and
permission notice as the MIT license requires.

## Modifications made for this self-hosted build

No source file was modified. `diablo.js` and `index.html` are byte-for-byte
upstream. The build ships only the assets the game actually loads at runtime:

- `index.html`, `diablo.js`
- `sprite/` — barrels, coins, potions, the player figure
- `monsters/` — the 16 monster sprite-sheet folders the AI table references
  (`BA`, `FS`, `SI`, `SK` × `A1`, `NU`, `WL`, `DD`)
- `dttool/output/0`, `1`, `2` — the generated floor, wall and prop tilesets the
  level map data points at

The following upstream directories were **omitted** because nothing in
`diablo.js` references them at runtime — they are authoring tools and source
assets, not game content:

- `shadowmaker/` and `shadowmaker.jar` — the sprite-drop shadow authoring tool
- `dttool/palette/`, `dttool/tiles/`, `dttool/src/`, `dttool/chartable.txt` —
  the tile-generation Java project
- `dirt/`, `old_dirt/`, `texture/` — superseded WIP texture directories

This keeps the deployed build under the site's 10 MB per-game budget while
leaving the game 100% intact.

## Trademark

"Diablo" is a trademark of Blizzard Entertainment. This project is an
independent, non-commercial homage built from scratch; it is not affiliated
with, endorsed by, or sponsored by Blizzard Entertainment, and it contains no
Blizzard assets or game data.