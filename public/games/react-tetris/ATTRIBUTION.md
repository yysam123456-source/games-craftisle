# React Tetris — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** React Tetris
- **Author:** Chvin
- **License:** Apache License 2.0, per `package.json` — but see the note below
- **Source repository:** https://github.com/chvin/react-tetris
- **Original live build:** https://chvin.github.io/react-tetris/

## Note on the license

Upstream `package.json` declares:

```json
"author": "Chvin",
"license": "Apache-2.0"
```

However, **no `LICENSE` file exists** in the upstream repository root, and
GitHub's license detection reports no license for the repository because of that.
The Apache-2.0 grant is therefore asserted in metadata only. Unlike MIT, Apache
2.0 **requires** redistribution of the license text and its NOTICE file where
applicable — neither of which is present here. Treat the terms as **unverified**
and contact the author before redistributing this build further.

This build itself does not bundle the upstream repository's `README.md`,
`package.json` or sources — it ships the compiled distribution bundle only, as
published to gh-pages.

## About

A Tetris implementation built with React, Redux and Immutable.js, by Chvin. The
upstream description reads: *"Use React, Redux, Immutable to code Tetris."*

Per the project's own README, the notable features are responsiveness (keyboard on
PC, touch on mobile), and **data persistence** — the game subscribes to the Redux
store and saves state to `localStorage`, recording every piece of state
precisely so that closing the tab, refreshing, a crash or a dead phone battery
all resume the game where you left it.

Immutability is central to the architecture: Immutable.js objects are used as the
Redux state, and because an Immutable object cannot be modified in place, every
change returns a new object.

## About this build

This is the **compiled gh-pages build**, not the source tree:

- `index.html` — the entry page. It is authored in Chinese, and its
  `<meta name="description">` reads *"使用React、Redux、Immutable制作的俄罗斯方块"*
  (a Tetris game made with React, Redux and Immutable)
- `app-1.0.1.js` — the entire game as a single webpack bundle, plus its source map
- `css-1.0.1.css` — the extracted stylesheet, plus its source map
- `loader.css` — the loading spinner stylesheet
- `music.mp3` — background music

The bundle version suffix is `1.0.1`, matching upstream's `"version": "1.0.1"`.
The React runtime bundled inside reports **v16.13.1**, and the upstream
`package.json` declares React `^15.3.0` / `react-dom` `^15.3.0` — so this
published bundle was built against a newer React 16 than the manifest's floor
suggests. Immutable.js, Redux and React-Redux are bundled in.

## Third-party libraries bundled in this build

These ship inside `app-1.0.1.js` rather than as separate files, each retaining
its license banner in the bundle:

- **React** and **React DOM** (MIT) — v16.13.1, © Meta Platforms, Inc. and
  affiliates
- **Redux** and **React-Redux** (MIT)
- **Immutable.js** (MIT)
- **qrcode** — upstream declares `qrcode: ^1.2.0` as a dependency, used by the
  share/high-score QR feature
- **classnames** — declared as a dependency

## Modifications made for this self-hosted build

None. The page loads its assets by relative filename (`app-1.0.1.js`,
`css-1.0.1.css`, `loader.css`, `music.mp3`), so it runs unchanged from
`/games/react-tetris/index.html`.

Note that the game's UI text is Chinese, as shipped by upstream. The interface
language is upstream's, not something this integration changed.