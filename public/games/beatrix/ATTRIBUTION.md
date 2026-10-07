# Beatrix — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Beatrix
- **Author:** Christopher Xong (cxong)
- **License:** MIT License
- **Source repository:** https://github.com/cxong/Beatrix
- **Original live build:** https://cxong.github.io/Beatrix/

## About

Beatrix is a rhythm puzzle game built with Phaser 2. A metronome track plays;
you tap on the beat to rotate, flip and transform tiles so that each musical
phrase resolves into a target pattern. It ships with four levels of increasing
complexity.

All audio in Beatrix is **synthesised at runtime with the Web Audio API** —
there are no recorded music or sound-effect files. The `audio/` directory
holds short generated sample data used by the drum/beat voices.

## License compliance (MIT)

Beatrix is MIT licensed. The upstream `LICENSE` file is redistributed verbatim
in [`LICENSE`](./LICENSE), preserving the copyright notice and permission
notice as the MIT license requires.

## Modifications made for this self-hosted build

None. This is a byte-for-byte copy of the upstream playable assets:

- `index.html`
- `scripts/` (Phaser 2, the game states and the four level definitions)
- `images/`, `audio/`, `logo.jpg`

The game already used document-relative paths, so it runs unchanged from
`/games/beatrix/`. It embeds with `disableSandbox` enabled because Phaser 2
instantiates its `AudioContext` on load and sandboxed frames block that
constructor in some browsers.