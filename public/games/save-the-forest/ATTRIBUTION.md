# Save The Forest — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Save The Forest (a.k.a. "Forest Fire")
- **Author:** Varun Malhotra (softvar)
- **License:** MIT License
- **Source repository:** https://github.com/softvar/save-the-forest

## About

Save The Forest is a 2013 entry in the js13kGames competition — every entry had to
fit in **13 KB of JavaScript**. You play a fire warden racing a wildfire across
a forest: dodge flames, extinguish burning trees before the fire spreads, and
keep the burn count as low as you can while the fire front closes in.

The game's sound effects are generated at runtime with
[jsfxr](https://github.com/jsfxr/jsfxr) (the JSynth "audio chip"), so there are
no audio files at all.

## License compliance (MIT)

Save The Forest is MIT licensed. The upstream `LICENSE` is redistributed
verbatim in [`LICENSE`](./LICENSE), preserving the copyright notice and
permission notice as the MIT license requires.

## Modifications made for this self-hosted build

None. The upstream repository ships a ready-to-serve build in `dist/` produced by
its gulp pipeline, and that build is what was copied:

- `dist/index.html` — the minified entry page
- `dist/game.min.js` — the whole game (30 KB)
- `dist/game.min.css` — the stylesheet
- `src/` — the unminified sources, included for reference

No build step was run and no file was modified. The game already used
document-relative paths (`game.min.css`, `game.min.js`), so it runs unchanged
from `/games/save-the-forest/dist/`.