# Swap — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Swap
- **Author:** Noah Moroze (nmoroze)
- **License:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- **Source repository:** https://github.com/nmoroze/swap
- **Original live build:** https://nmoroze.github.io/swap/

## About

Swap is a turn-based grid puzzler with a roguelike twist. You push and pull
your character around a tile grid, but every tile you step on swaps with an
adjacent one — so the floor itself rearranges under you. Enemies move on their
own schedule and the AI in `js/ai.js` plans several moves ahead. Levels are
defined in `js/levels.js` and can be jumped to directly with a URL hash
(`#3` loads level 3).

## License compliance (CC BY-SA 4.0)

Swap is licensed under **Creative Commons Attribution-ShareAlike 4.0
International**. The complete license text is redistributed verbatim in
[`LICENSE`](./LICENSE), including the human-readable deed summary that precedes
it. Under CC BY-SA you must share adaptations under the same license and give
credit — this build is unmodified apart from nothing at all, and this file, the
in-game credits, and the guide at `/games/swap` provide that attribution.

## Modifications made for this self-hosted build

The game code (`js/`, `music.mp3`) is byte-for-byte upstream. Only the
surrounding page was edited, to remove retired third-party services:

1. **Removed the AddThis Smart Layers block.** The widget script
   (`s7.addthis.com`) no longer serves, so the inline `addthis.layers({...})`
   call threw `ReferenceError: addthis is not defined` on every load.
2. **Removed the Google Fonts and Font Awesome CDN stylesheets.** Both are
   cosmetic; the page declares its own font stack inline.
3. **Fixed the favicon path**, which pointed at
   `http://nmoroze.github.io/swap/favicon.ico` (the author's own Pages site)
   instead of the local copy.
4. **Removed the GitHub "Fork me" ribbon** — a hot-linked image on
   `s3.amazonaws.com` that no longer resolves. The project is credited in this
   file and in the on-site guide instead.

The files below are unchanged:

- `index.html`
- `js/` — `ai.js`, `draw.js`, `input.js`, `keypress-1.0.8.min.js`, `levels.js`,
  `player.js`, `tile.js`, `world.js`
- `music.mp3` — the soundtrack
- `favicon.ico`, `thumbnail.png`

The game already used document-relative paths, so it runs unchanged from
`/games/swap/`. It embeds with `disableSandbox` enabled so the `<audio>`
element can play the soundtrack.