# Evolve Idle — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Evolve
- **Author:** Peter Motschmann
- **License:** Mozilla Public License 2.0 (MPL-2.0)
- **Source repository:** https://github.com/pmotschmann/Evolve
- **Original live build:** https://pmotschmann.github.io/Evolve/

## About

Evolve is an incremental game about evolving a civilization from primordial ooze
into a spacefaring empire. The upstream `README.md` describes it as combining
"elements of a clicker with an idler and has lots of micromanagement", and poses
the question the whole game is built around: "What will you evolve into?"

The package identifies itself as **Evolve Idle**, version 1.3.16, so this build
is a mid-development snapshot rather than a tagged release.

## License compliance (MPL-2.0)

Evolve is MPL-2.0 licensed. Both `package.json` (`"license": "MPL-2.0"`) and the
`LICENSE` file in this directory agree. The upstream `LICENSE` is redistributed
verbatim in [`LICENSE`](./LICENSE), preserving the MPL 2.0 text and Exhibit A.

MPL 2.0 is file-level copyleft: modified MPL-covered files must stay under MPL,
but including the game alongside other content does not impose the license on
that other content.

## Files included in this build

This directory is a published gh-pages deployment rather than a source checkout:

- `index.html` — the game entry point
- `evolve/` — the compiled game (`main.js`, `evolve.css`, the light theme,
  favicons), the output of `npm run evolve`
- `wiki/` + `wiki.html` — the in-game wiki, the output of `npm run wiki`
- `src/`, `strings/`, `font/`, `lib/` — sources, translations, fonts and
  dependencies
- `buildEvolve.js`, `buildWiki.js`, `package.json`, `package-lock.json`,
  `yarn.lock` — the build pipeline
- `save.html`, `.gitattributes`
- `README.md`, `LICENSE`

Upstream's deploy script copies `*.html *.ico LICENSE evolve lib font strings wiki`
into `dist/`, so this is exactly the set of files it deploys, plus the sources.
`buildEvolve.js` and `buildWiki.js` are build tooling and are not loaded by the
game.

The upstream `README.md` documents how to contribute a language: copy
`strings/strings.json` to `strings/strings.<locale>.json`, keep the JSON keys and
the `%0`-style tokens untouched, then register the locale in the `locales`
constant at the bottom of `locale.js`.

## Third-party libraries bundled in this directory

`lib/` vendors the front-end stack, each keeping its own license header:

- **Vue.js** 2.7.14 (MIT) — `lib/vue.min.js`, © 2014-2022 Evan You
- **Buefy** 0.9.22 (MIT) — `lib/buefy.min.js` and `lib/buefy.min.css`, the
  Vue component library wrapping Bulma
- **Chart.js** 3.8.2 (MIT) — `lib/chart.min.js`
- **jQuery** 3.6.3 (MIT) — `lib/jquery.min.js`, © OpenJS Foundation and others
- **Sortable** 1.10.2 (MIT) — `lib/sortable.min.js`, by SortableJS
- **lz-string** — `lib/lz-string.min.js`, by Pieroxy, used to compress save data
- **CryptoJS** — `lib/cryptojs.min.js`
- **html5sortable** — `lib/html5sortable.min.js`, a jQuery drag-sort plugin
- **Popper.js** — `lib/popper.min.js`
- **less.js** 3.9 — `lib/less.3.9.min.js`, used to compile the stylesheets at
  build time
- **Weather Icons** — `lib/weather-icons.min.css`,
  `lib/weather-icons-wind.min.css`, by Erik Flowers (CC BY 3.0)

`font/` and the images in `lib/` (`noise.png`, `mine.png`, `copper-miner.png`,
`blocking-stack.png`, `blocking-resource.png`) ship with the build.

## Modifications made for this self-hosted build

None. The game already used document-relative paths (`lib/`, `evolve/`, `font/`),
so it runs unchanged from `/games/evolve-idle/index.html`.

One caveat worth stating: `src/` retains debug hooks that log item definitions to
the console, and `wiki/` contains a small amount of unofficial fan-translated
strings upstream ships as-is (including a Pig Latin variant of the intro). Those
are upstream's, not added here.