# Space Invaders — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** SpaceInvaders
- **Author:** Tóth Róbert
- **License:** MIT License
- **Source repository:** https://github.com/StrykerKKD/SpaceInvaders
- **Original live build:** https://strykerkkd.github.io/SpaceInvaders/

## About

A remake of the classic *Space Invaders* arcade game, built as an HTML5
Phaser example and refactored with **RequireJS** so the source is split into
modules. Game states are organised with `State` and `StateManager` classes
(`assets/javascript/state/`), and the code is chunked into RequireJS modules
under `assets/javascript/module/`.

The author used Phaser 2.0.1 (from the dev branch, no physics module) and notes
the reason for the branch: "The dev branch has a lot of bug fixes so it's
recommended to use it." A second, optimised entry point `indexOpt.html` loads a
pre-compiled bundle from `assets/javascript/built/`.

The upstream `README.md` also records one known issue: in every new play state
(after the end state) the game creates new DOM nodes, because the score text is
recreated each cycle and the author was not able to destroy the old nodes.

## License compliance (MIT)

SpaceInvaders is MIT licensed. The upstream `LICENSE` is redistributed verbatim
in [`LICENSE`](./LICENSE), preserving the copyright notice and the permission
notice as the MIT license requires.

## Third-party libraries bundled in this directory

The following libraries ship inside `assets/javascript/lib/`, each retaining its
own copyright notice and license header in the minified file:

- **Phaser** 2.0.1 (MIT) — `phaser-no-physics.min.js`
- **RequireJS** (MIT) — `require.js`

## Modifications made for this self-hosted build

None. Both upstream entry points are included as-is — `index.html` and
`indexOpt.html` — along with `assets/` and `robots.txt`. The game already used
document-relative paths (`assets/javascript/...`), so it runs unchanged from
`/games/spaceinvaders/`.