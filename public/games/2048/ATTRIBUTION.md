# 2048 — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** 2048
- **Author:** Gabriele Cirulli (maintainers: Anna Harren, sigod)
- **License:** MIT License
- **Source repository:** https://github.com/gabrielecirulli/2048
- **Original live build:** http://gabrielecirulli.github.io/2048/

## About

2048 is a sliding-tile puzzle played on a 4x4 grid. Every move shifts all tiles
one square, and two tiles with the same number merge into one with double the
value. The goal is to reach the **2048** tile — and then to keep going.

The upstream `README.md` describes it as "a small clone of 1024, based on
Saming's 2048 (also a clone)", indirectly inspired by *Threes*. It was written
"just for fun", and the README notes the author never actually reached 2048
himself.

## License compliance (MIT)

2048 is MIT licensed. The upstream `LICENSE.txt` is redistributed verbatim in
[`LICENSE.txt`](./LICENSE.txt), preserving the copyright notice and the
permission notice as the MIT license requires.

## Files included in this build

This is the **pure game** described in the upstream `CONTRIBUTING.md` as the
`master` branch — not the `gh-pages` branch, which additionally carries sharing
features and analytics.

- `index.html` — the entry page (scripts are inlined at the bottom of the file)
- `js/` — game logic: `game_manager.js`, `grid.js`, `tile.js`, `application.js`,
  `keyboard_input_manager.js`, `html_actuator.js`, `local_storage_manager.js`
- `js/*_polyfill.js` — three small feature polyfills
- `style/` — Sass sources and the compiled `main.css`
- `assets/` — tile and background images
- `meta/` — social sharing meta tags
- `Rakefile`, `.jshintrc`, `README.md`, `CONTRIBUTING.md`, `LICENSE.txt`

The game uses document-relative paths (`js/`, `style/`, `assets/`), so it runs
unchanged from `/games/2048/`.