# BitBot — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** BitBot
- **Author:** R. E. Cardona-Rivera
- **License:** MIT License
- **Source repository:** https://github.com/recardona/BitBot
- **Original live build:** https://recardona.github.io/BitBot/

## About

BitBot is a Sokoban-style puzzle-platformer set inside a decaying mainframe.
You play a maintenance robot collecting batteries and rebooting crashed
processors while a corrupt AI hunts you through the dark. Every level is a
hand-authored grid in `assets/levels/`.

## License compliance (MIT)

BitBot is MIT licensed. The upstream `LICENSE.md` is redistributed verbatim in
[`LICENSE.md`](./LICENSE.md), preserving the copyright notice and permission
notice as the MIT license requires. The upstream `CREDITS.md` is also included,
as it credits the third-party libraries the game bundles.

## Modifications made for this self-hosted build

No game code was modified. `main.js` and everything under `src/` are
byte-for-byte upstream. Only unused assets, duplicate asset encodings, and the
page's analytics block were touched, to fit the site's per-game size budget:

1. **Removed the 28 MB of uncompressed WAV audio.** Every sound in the game is
   declared to Howler.js as a three-format source list (`mp3`, `ogg`, `wav`).
   Howler picks the first format the browser can decode, so keeping just the
   OGG rips is functionally identical on every browser that supports Ogg Vorbis
   — which is every browser that supports Web Audio. All 15 sounds (6 music
   tracks, 9 effects) are still present and still play.
2. **Removed the redundant MP3 rips** for the same reason, leaving one copy of
   each sound.
3. **Pruned the unused Google Closure Library subtrees.** `index.html` loads
   exactly two Closure files: `lib/closure/goog/base.js` and
   `lib/closure/goog/structs/queue.js`. Both are still present. The other ~850 KB
   of vendored Closure sources (`goog/array`, `goog/asserts`, `goog/debug`,
   `goog/string`, `deps.js`, and the other `goog/structs/*.js` files) were never
   loaded by this page and were removed.
4. **Removed `jquery-2.0.3.min.map`**, a 124 KB developer source map that the
   production page never fetches.
5. **Removed the Google Analytics block** from `index.html` — the inline
   `www.google-analytics.com/analytics.js` loader plus
   `ga('create', 'UA-46120819-1', ...)` and `ga('send', 'pageview')`.

6. **Restored the Closure modules the page actually needs.** An earlier pass
   had pruned the vendored Google Closure Library down to `base.js` and
   `structs/`, but `goog/structs/queue.js` calls `goog.require('goog.array')`
   for `contains`/`indexOf`/`removeAt`, and in this Closure vintage
   `goog.require` *throws* when a namespace is missing — so `queue.js` aborted
   mid-load. Restored the upstream originals of `goog/array/array.js`,
   `goog/asserts/asserts.js`, `goog/string/string.js`,
   `goog/string/stringbuffer.js`, `goog/debug/error.js` and `goog/deps.js`
   (846 `goog.addDependency` entries), and added script tags for them to
   `index.html` in topological order.
7. **Pointed the level loader at the local levels.** `load_level()` in
   `src/states/PlayState.js` requested
   `http://127.0.0.1:8020/game-off-2013/assets/levels/levelXX.json` — the
   author's local dev server, which cannot resolve in production. Changed to
   the document-relative `./assets/levels/levelXX.json`. The comment above the
   function already documented exactly that path.
8. **Collapsed each Howler `urls` array to the shipped `.ogg` only.** Howler
   walks the whole array and requests every entry, so the pruned `.mp3`/`.wav`
   rips still produced a failed request each — 34 stale URLs across six source
   files plus 30 preloader lines in `main.js`. All audio still plays from the
   identical OGG rips.
9. **Removed the remote Orbitron webfont link.** The page requests Roboto from
   `fonts.googleapis.com`; `css/game.css` already declares a monospace
   fallback, and the failure added a request to every load. The embed now makes
   no third-party requests at all.

Verified in Chromium: 404s went 30+ → 0, page errors 10 → 0.

Everything the game actually runs on is included and unchanged:

- `src/` — all game objects, stages and states
- `assets/levels/` — every level definition
- `assets/art/` — tile and sprite sheets
- `assets/sounds/` — all music and effects, in OGG
- `lib/` — jQuery 2.0.3, jQuery UI 1.10.3 (used by `editor.html`), Howler.js,
  the JAWS tile-map engine, jQuery Cookie, and the two Closure files
- `css/game.css`, `editor.html`, `main.js`

The `editor.html` level editor is included as well, so new levels can still be
authored in place.

## Audio note

Browsers block `AudioContext` until the user has interacted with the page. Click
anywhere on the game once and the soundtrack starts.