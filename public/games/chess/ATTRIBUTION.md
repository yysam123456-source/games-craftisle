# Chess — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Chess
- **Author:** Craftisle Games (this site's own implementation)
- **License:** Not stated in the source repository
- **Source repository:** None — original to this project

## About

A playable chess game on an HTML5 canvas. You play against a simple built-in AI
or set up a position to practise tactics. White moves first, and the goal is
checkmate. Move history, captured pieces, check state and an undo are included.

## License and authorship

**There is no license file and no copyright, author or credit statement anywhere
in this directory.** The only files are `index.html` and `assets/background.svg`.
The code was written for this project and is not published under any license, so
it is **all rights reserved** by default. "Author" is recorded above as the
project itself because that is who wrote it; no individual author is named.

Chess itself — the rules of the game — are not copyrightable, and the standard
algebraic notation used here is not protected. What is protected is this
particular implementation.

## Files included

- `index.html` — the entire game: markup, CSS and JavaScript in one 458-line
  file. No framework, no build step, no chess library, no bundled dependencies.
- `assets/background.svg` — an 800x450 decorative SVG board used as the page
  backdrop (it draws a stylised board with Unicode chess glyphs)

There are **no external requests** — no CDN, no web font, no network dependency
of any kind. The game runs entirely from this one file plus its background.

## Modifications made for this self-hosted build

None. The game already used a document-relative path (`assets/background.svg`),
so it runs unchanged from `/games/chess/index.html`.