# Parity — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Parity
- **Author:** Abe Fehr
- **License:** MIT License
- **Source repository:** https://github.com/abejfehr/parity
- **Original live build:** http://abefehr.com/parity/

## About

Parity is a 3×3 numbers puzzle built in plain jQuery. Every number on the board
is a power of two. You select a cell and push it **up** or **down** one step —
halving it or doubling it. All the numbers in a row and column must add up to
the same total, and the corners must match. Parity tracks a long campaign of
hand-designed puzzles in `story.json`.

## License compliance (MIT)

Parity is MIT licensed. The upstream `LICENSE.txt` is redistributed verbatim in
[`LICENSE.txt`](./LICENSE.txt), preserving the copyright notice and permission
notice as the MIT license requires.

## Modifications made for this self-hosted build

The upstream `grunt` build is not needed: the repository already ships the
concatenated, minified bundle `scripts/production.min.js` (jQuery 2.1.1,
jQuery TouchSwipe, and all eleven game modules), and that file is what
`index.html` loads. It was used **byte-for-byte unmodified**, and it contains no
advertising or analytics code.

Only `index.html` was edited, to remove third-party tracking and advertising:

1. **Removed the Clay analytics SDK** (`cdn.wtf/sdk/v1/clay_sdk.js`) and its
   `Clay('init', {gameId: '8304'})` call.
2. **Removed the Facebook JavaScript SDK loader** (`connect.facebook.net`) and
   the `fb:app_id` Open Graph tag.
3. **Removed the Google AdSense unit** (`pagead2.googlesyndication.com`) that
   sat below the board.
4. **Removed the Facebook Like button** markup.
5. **Fixed the favicon path.** `href="/favicon.ico"` was absolute and resolved
   to the site root; it is now `href="favicon.ico"`.
6. **Upgraded the Google Fonts link to HTTPS** (`http://fonts.googleapis.com` →
   `https://fonts.googleapis.com`) so the embed never triggers mixed content.

The Open Graph `og:` meta tags pointing at the author's own site were left in
place; they are inert on the game page and are part of the original document.

Everything the game runs on is included and unchanged: `index.html`,
`scripts/production.min.js`, `story.json` (the full puzzle campaign),
`styles/style.css`, `styles/mobile.css`, `images/`, and `favicon.ico`.