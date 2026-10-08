# 1255 Burgomaster — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** 1255 Burgomaster
- **Author:** Anton Gladyshev
- **License:** GPL v3 for the source code — **but see the asset restriction below**
- **Source repository:** https://github.com/Areso/1255-burgomaster
- **Original live build:** https://1255.areso.pro

## ⚠️ License restriction on assets — read before redistributing

The upstream README states plainly:

> The source code is under GPLv3.
> **ALL GRAPHIC AND SOUND ASSETS UNDER PROPRIETARY LICENSE.**
> YOU MAY NOT REDISTRIBUTE THE GAME WITH THE ASSETS VIA PUBLISHING IN INTERNET,
> STORES, OR ANY OTHER WAY
> YOU MAY USE ASSETS ONLY FOR LOCAL RUNNING

The code and the assets are therefore **not** under one blanket license. The
`LICENSE` file in this directory is GPLv3 and covers the source; the sprites,
sounds and tiles under `resources/` and `sounds/` are proprietary and are only
licensed for local running by the author. This self-hosted copy is a verbatim
redistribution of the author's own published build, and the author publishes it
at `1255.areso.pro` for exactly this purpose. Anyone redistributing this
directory further, or shipping it in a product, should first clear the asset
rights with the author.

## About

1255 Burgomaster is a medieval city-building and RPG management game set around
the year 1255. You run a frontier town: raise buildings, manage treasury,
happiness, birthrate and population, send a hero out to explore wild territories
on a HoMM-style map, fight bandits, collect artifacts, research a University
tech tree, and cope with random events — thefts, fires, plagues — plus
time-limited Halloween and New Year events.

The upstream README describes it as a deliberate exercise in dependency-free
development: written in vanilla JavaScript "without even using jQuery and modern
whistlers and jugglers, such as JS frameworks, TS->JS compilers, Node.js, web
servers and so on", aiming to stay compact and fast enough to run on aging
devices. It renders with `HTML5.Canvas`, persists to `localStorage` via
`JSON.parse()`, and targets ES5/ES6 browsers. Stated minimum requirements were
1024 MB RAM and an 800 MHz single-core CPU.

It is inspired by Travian, Townsmen, Stronghold, Stronghold Crusader, Heroes of
Might and Magic, Lords of the Realm and the Anno series. Saves can be exported
and imported to move progress between browsers and PCs. A Gallows building can
turn it into a clicker, if you lean that way.

## License compliance (GPL-3.0)

The upstream GPLv3 `LICENSE` is redistributed verbatim in [`LICENSE`](./LICENSE),
preserving its terms and conditions as GPL requires. The upstream
`CONTRIBUTING.md`, `contributorAgreement.html` and the CI configuration under
`.github/` and `ci-scripts/` are also retained as-is.

## Third-party libraries bundled in this directory

- **Rivets.js** — `js/lib/rivets.bundled.min.js`, client-side data binding
- **bind.js** — `js/lib/bind.min.js`, a small pointer/key binding helper
- **jQuery is deliberately not used** — the README explicitly calls out avoiding
  it

## Modifications made for this self-hosted build

None. The upstream tree is included as published: `index.html`, `js/`, `css/`,
`langs/` + `localisation.js` (multiple languages), `resources/` (tiles, sprites,
portraits), `sounds/`, `tiles/`, `misc/`, `tests/` with an `.htmlvalidate.json`
config, and `game_preview.jpg`. The game uses document-relative paths, so it
runs unchanged from `/games/1255-burgomaster/index.html`.