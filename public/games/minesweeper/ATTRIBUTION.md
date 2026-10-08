# Minesweeper — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Minesweeper
- **Author:** Craftisle Games (this site's own implementation)
- **License:** Not stated in the source repository
- **Source repository:** None — original to this project

## About

The classic logic puzzle: clear a minefield without detonating a mine. Revealed
cells show how many mines sit in the eight surrounding cells (0–8), and you mark
suspected mines with flags. Difficulty is adjustable and the game tracks the mine
counter, a timer and the best time per difficulty.

## License and authorship

**There is no license file and no copyright, author or credit statement anywhere
in this directory.** The only files are `index.html`, `style.css`, `game.js` and
`assets/background.svg`. The code was written for this project and is not
published under any license, so it is **all rights reserved** by default. "Author"
is recorded above as the project itself because that is who wrote it; no
individual author is named.

Minesweeper originated at Microsoft, which bundled it with Windows 3.1 in 1992.
Nothing here is derived from Microsoft's implementation — this is an independent
one built for this site. Microsoft's Windows Minesweeper remains
copyright- and trademark-protected; this file records the provenance of *this*
code, which is original.

## Files included

- `index.html` — page markup
- `style.css` — styles
- `game.js` — game logic
- `assets/background.svg` — an 800x450 decorative SVG backdrop

There are **no external requests** — no CDN, no web font, no network dependency of
any kind.

## Modifications made for this self-hosted build

None. The game already used document-relative paths (`style.css`, `game.js`,
`assets/background.svg`), so it runs unchanged from
`/games/minesweeper/index.html`.