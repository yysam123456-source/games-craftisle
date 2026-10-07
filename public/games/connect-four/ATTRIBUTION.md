# Connect Four (c4) — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Connect Four (`c4`)
- **Author:** Kenrick (kenrick95)
- **License:** MIT License
- **Source repository:** <https://github.com/kenrick95/c4>
- **Original live build:** <https://kenrick95.github.io/c4/>

> Note: this is **not** the `David20321/FTJ` Unity project that was on the
> original integration list. That repository turned out to be Wolfire's
> *Desperate Gods* source dump — its `README.md` states "not licensed for
> redistribution in whole or in part" and its `LICENSE.txt` reads "All rights
> reserved by Wolfire Games LLC". It is not MIT, has no web build, and cannot
> be redistributed. It was dropped from the list and replaced with this game.

## About

**Connect Four** is the classic drop-and-connect strategy game, played against
an AI opponent on an HTML5 canvas. The AI uses **minimax with alpha-beta
pruning** over the 7×6 board, with a hard-coded evaluation function that
weighs centre-column control, immediate threats, and blocking moves.

The project is a Yarn 4 monorepo: the game rules and AI live in the
framework-agnostic `core/` package, the browser client is in `browser/`, and
`server/` is an optional Node backend for online play — which this build does
not use.

## License compliance (MIT)

c4 is MIT licensed. The upstream `LICENSE` is redistributed verbatim in
[`LICENSE`](./LICENSE), preserving the copyright notice and permission notice
as the MIT license requires. The upstream `README.md` is included too.

## Build performed for this build

The upstream toolchain:

```sh
yarn install
cd browser && vite build --base="./"
```

The `--base="./"` flag is the one deviation from upstream's
`build-gh-pages` script, which hardcodes `--base="https://kenrick95.github.io/c4/"`.
Using a relative base makes the emitted `index.html` reference its hashed
assets as `./assets/...` instead of absolute GitHub Pages URLs, so the build
works from any path — here, `/games/connect-four/`. Nothing inside the bundle
depends on the base URL.

## Modifications made for this self-hosted build

None. The deployed files are the unmodified production output:

- `index.html` — the built entry page
- `assets/index-*.js` — the client bundle (game rules from `@kenrick95/c4`,
  canvas renderer, AI worker glue)
- `assets/index-*.css`
- `logo.svg`
- `demo/index.html` — the upstream demo page, kept for reference

The game engine logic in `core/` is bundled into the JS chunk; the optional
`server/` component is not included because it is not needed for single-player
against the AI.