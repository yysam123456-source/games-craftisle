# Snake — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Snake
- **Author:** Craftisle Games (this site's own implementation)
- **License:** Not stated in the source repository
- **Source repository:** None — original to this project

## About

The classic arcade snake game on an HTML5 canvas. Steer the snake with the arrow
keys, eat the food to grow, and avoid hitting the walls or yourself. The score is
tracked on a canvas-rendered HUD with a game-over state.

## License and authorship

**There is no license file and no copyright, author or credit statement anywhere
in this directory.** The only files are `index.html` and
`assets/background.svg`. The code was written for this project and is not
published under any license, so it is **all rights reserved** by default.
"Author" is recorded above as the project itself because that is who wrote it; no
individual author is named.

Snake originated at Gremlin Industries in 1976 and was popularized on the Nokia
handset. Nothing here is derived from any commercial implementation — this is an
independent one built for this site.

## Files included

- `index.html` — the entire game: markup, CSS and JavaScript in one 259-line
  file. No framework, no build step, no bundled dependencies.
- `assets/background.svg` — an 800x450 decorative SVG backdrop

There are **no external requests** — no CDN, no web font, no network dependency of
any kind.

## Modifications made for this self-hosted build

None. The game already used a document-relative path (`assets/background.svg`),
so it runs unchanged from `/games/snake/index.html`.