# Infinite Craft — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Infinite Craft
- **Author:** Craftisle Games (this site's own implementation)
- **License:** Not stated in the source repository
- **Source repository:** None — original to this project

## About

An element-combination sandbox. You start with four base elements — Water, Fire,
Wind and Earth — and drag them onto each other to combine them into new
elements. Water plus Fire gives Steam; Steam plus Fire gives Cloud; the tree
branches from there. Discovered elements are collected in a sidebar with
discovery and combination counters, and a **View Recipes** button opens the list
of everything you have worked out so far.

The page's own instructions say "**50+ to find!**" and the starting set is
**4 elements**, so treat those as the real figures. No larger count is stated
anywhere in the code.

## License and authorship

**There is no license file and no copyright, author or credit statement anywhere
in this directory.** The only files are `index.html` and
`assets/background.svg`. The code was written for this project and is not
published under any license, so it is **all rights reserved** by default.
"Author" is recorded above as the project itself because that is who wrote it; no
individual author is named.

This is an independent implementation of the element-combining mechanic popularised
by Neal Agarwal's *Infinite Craft* on neal.fun. No code, data or element list was
taken from that game — the recipes and elements here are this project's own.

## Files included

- `index.html` — the entire game: markup, CSS and JavaScript in one 629-line
  file. No framework, no build step, no bundled dependencies.
- `assets/background.svg` — an 800x450 decorative SVG backdrop

There are **no external requests** — no CDN, no web font, no network dependency of
any kind.

## Modifications made for this self-hosted build

None. The game already used a document-relative path (`assets/background.svg`),
so it runs unchanged from `/games/infinite-craft/index.html`.