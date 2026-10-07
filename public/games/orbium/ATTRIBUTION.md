# Orbium — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Orbium
- **Author:** Björn Nilsson
- **License:** GNU General Public License v2.0 (GPL-2.0)
- **Source repository:** https://github.com/bni/orbium
- **Original live build:** https://bjornri.github.io/Orbium/

## About

Orbium is a one-touch marble puzzle for iOS and the browser, built with
vanilla JavaScript and HTML5 canvas — no engine, no framework, no build step.
You nudge a marble through a field of rotators, teleporters, one-way lanes and
counters, and try to reach the level's exit dock. Levels ship with the game;
there is also a level editor.

## License compliance (GPL-2.0)

Orbium is licensed under the **GNU General Public License v2.0**. The complete
license text is redistributed verbatim in [`LICENSE`](./LICENSE), as the GPL
requires.

## Modifications made for this self-hosted build

None. This build is a byte-for-byte copy of the upstream repository's playable
assets:

- `index.html`
- `js/` (the vanilla-JS game modules)
- `gfx/1152x784/` (sprite sheets)
- `snd/` (sound effects)
- `css/`, `ico/`

The game already used document-relative paths, so it runs unchanged from
`/games/orbium/`.

## Trademarks

"Orbium" is a registered trademark of its respective owner. This copy is
redistributed under the upstream GPL-2.0 license for unmodified personal use.