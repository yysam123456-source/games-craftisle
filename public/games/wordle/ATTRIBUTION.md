# Wordle — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Wordle
- **Author:** Craftisle Games (this site's own implementation)
- **License:** Not stated in the source repository
- **Source repository:** None — original to this project

## About

A five-letter word guessing game. You get six attempts; after each guess the
letters are coloured green for correct position, yellow for present-but-misplaced,
and grey for not in the word at all.

This is **not** Josh Wardle's original Wordle, and it shares no code with it. The
original was created at Josh Wardle for The New York Games and later bought by
The New York Times; nothing here is derived from that codebase, and the word list
is not Wardle's. This is an independent implementation of the same genre
mechanic, written for this site. See "Relationship to the original Wordle" below.

## License and authorship

**There is no license file and no copyright or author statement in this
directory** — the only files are `index.html` and `thumbnail.svg`. The code was
written for this project and has not been published under any license, so it is
**all rights reserved** by default. "Author" is recorded above as the project
itself because that is who wrote it; no individual author is named anywhere.

`assets/` does not exist here; the one asset referenced by the page is the
self-hosted `thumbnail.svg`.

## Files included

- `index.html` — the entire game: markup, CSS and JavaScript in one 529-line
  file. No framework, no build step, no bundled dependencies.
- `thumbnail.svg`

The only external request the page makes is a Google Fonts stylesheet for
**Space Mono** and **Syne**. Everything else is inline.

## Relationship to the original Wordle

Wordle's exact answer list is a design decision of Josh Wardle's original and is
not reproduced here. If you are redistributing this build, note that "Wordle" is
a trademark of The New York Times Company LLC, and this file is describing a
look-alike mechanic rather than claiming any rights in the name or the original
work. That is a naming/trademark matter rather than a copyright one — there is no
upstream code or data to attribute.

## Modifications made for this self-hosted build

None. The game is a single self-contained page that runs unchanged from
`/games/wordle/index.html`.