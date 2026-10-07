# Hextris — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Hextris
- **Authors:** Logan Engstrom, Garrett Finucane, Noah Moroze, Michael Yang
- **License:** GNU General Public License v3.0 (GPL-3.0)
- **Source repository:** https://github.com/Hextris/hextris
- **Original live build:** https://hextris.io

## About

Hextris is a puzzle game inspired by Tetris, played on a hexagonal grid. Pieces
fall, rotate and stack onto a honeycomb board; completing three lines of the
same colour clears them and raises the wave.

## License compliance (GPL-3.0)

Hextris is licensed under the **GNU General Public License v3.0**. As required
by the GPL, the complete, unmodified license text is redistributed with this
build in [`LICENSE.md`](./LICENSE.md). That file is the verbatim upstream
`LICENSE.md` from the Hextris repository.

The game is distributed here in source form: `index.html`, `js/`, `style/`,
`vendor/`, and `images/` are the upstream files, with the modifications
described below.

## Modifications made for this self-hosted build

Only the minimum changes needed to run the game as a static, offline-friendly
embed. No game logic was rewritten.

1. **Removed third-party advertising.** The Google AdSense loader
   (`pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`) was deleted from
   `index.html`. This is the only behavioural change.
2. **Removed Google Analytics.** The inline `analytics.js` bootstrap and its
   `ga('create'|'send', ...)` calls were deleted from `index.html`. The game
   keeps working exactly the same; it simply no longer phones home.

3. **Removed a third-party script injection from `js/main.js`.** The file
   ended with an IIFE that appended `<script src="http://hextris.io/a.js">` to
   the document head. That host's certificate has since expired, so the request
   failed on every load. It is not part of the game.
4. **Upgraded the Google Fonts link to HTTPS.** It was plain `http://`, which
   is blocked as mixed content on an HTTPS page.
5. **Removed the empty `a.js` stub** that shipped alongside the game and was
   referenced by nothing.

Everything else — the `js/` game modules, `style/style.css`, `vendor/`
(jQuery, Hammer.js, js.cookie, keypress, sweet-alert, rrssb), and the SVG
button art in `images/` — is byte-for-byte upstream.