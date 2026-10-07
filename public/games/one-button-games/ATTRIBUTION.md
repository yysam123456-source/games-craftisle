# One Button Games — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** 111 One Button Games in 2021 (selected entries)
- **Author:** ABA Games (abagames)
- **License:** MIT License
- **Source repository:** https://github.com/abagames/crisp-game-lib-games
- **Original live build:** https://abagames.github.io/crisp-game-lib-games/

> Note: the `111-one-button-games-in-2021` repository is only a catalogue — it
> holds a CSV index and a README generator. The playable games themselves live in
> the `crisp-game-lib-games` repository linked above, which is the source used
> here.

## About

**One Button Games** is a collection built with
[crisp-game-lib](https://github.com/abagames/crisp-game-lib), a tiny
JavaScript game library where you play with a single input: press, hold, or
double-tap. Every game fits in a fixed virtual screen and scales to any display.

This build ships two curated entries from the collection:

| Slug | Title | In this build |
| --- | --- | --- |
| `rebirth` | **REBIRTH** | Default entry — the game loads automatically |
| `colorroll` | **COLOR ROLL** | Load with `index.html#colorroll` |

Both are original works by ABA Games, distributed under the same MIT license.

## License compliance (MIT)

The upstream `LICENSE.txt` is redistributed verbatim in
[`LICENSE.txt`](./LICENSE.txt), preserving the copyright notice and permission
notice as the MIT license requires.

## Modifications made for this self-hosted build

Both `rebirth/main.js` and `colorroll/main.js` are byte-for-byte upstream.

Only `index.html` was written for this build, and it is the upstream page with
one behavioural change:

1. **Game selection no longer depends on a URL query string.** Upstream calls
   `addGameScript()`, which reads `window.location.search` and loads
   `?<gameName>/main.js`. This build resolves the game name from the URL hash
   first, then the query string, and finally falls back to `rebirth` — so the
   game runs correctly when embedded at `/games/one-button-games/` with no
   query parameters at all.

Everything else is upstream: the same CDN script tags (`sounds-some-sounds`,
`gif-capture-canvas`, `pixi.js`, `pixi-filters`, `lodash.clonedeep`,
`crisp-game-lib@1.0.2`), and the same `onLoad()` bootstrap. The library's own
`showMinifiedScript()` developer helper is left untouched (it is only reachable
from the library's debug console).