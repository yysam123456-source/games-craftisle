# SkiFree.js — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** SkiFree.js
- **Author:** Daniel Hough (basicallydan)
- **License:** MIT License
- **Source repository:** https://github.com/basicallydan/skifree.js
- **Original live build:** https://basicallydan.github.io/skifree.js/

> Historical note: SkiFree.js is a JavaScript port of Chris Pirih's original
> 1984 Apple II game *SkiFree*, which was distributed as shareware by Micro Fun
> and is now in the public domain. The port itself is MIT licensed and entirely
> independent of the original publisher.

## About

SkiFree.js is an endless-runner down an infinite procedurally generated ski
slope. You ski, jump obstacles, and — if you make it far enough down the
mountain — a **yeti** starts chasing you. Survive as long as you can; your
distance and top speed are both scored.

## License compliance (MIT)

SkiFree.js is MIT licensed. The upstream `license.md` is redistributed verbatim
in [`license.md`](./license.md), preserving the copyright notice and permission
notice as the MIT license requires.

## Modifications made for this self-hosted build

The upstream repository ships a pre-built bundle at `dist/skifree.js` (produced
by `esbuild` from `js/main.js`). That bundle is used **byte-for-byte
unmodified** — no rebuild was needed and no game code was touched. Because it is
an ES-module-style bundle with `hammerjs` and `br-mousetrap` inlined, no npm
install is required at deploy time.

Only `index.html` was edited:

1. **Removed the Google Analytics block** — the inline
   `www.google-analytics.com/analytics.js` loader plus
   `ga('create', 'UA-47378781-1', 'auto')` and `ga('send', 'pageview')`. The
   `<script src="dist/skifree.js">` tag that preceded it was kept intact.

Everything the game runs on is included and unchanged: `index.html`,
`dist/skifree.js`, `css/normalize.css`, `css/main.css`, `css/skifree.css`,
`js/` (the unminified ES module sources, kept for reference), and the icon and
banner images the page references.