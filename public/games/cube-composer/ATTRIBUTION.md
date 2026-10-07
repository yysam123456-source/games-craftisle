# Cube Composer — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** cube composer
- **Author:** David Peter (sharkdp)
- **License:** MIT License
- **Source repository:** https://github.com/sharkdp/cube-composer
- **Author's live build:** https://david-peter.de/cube-composer/

## About

Cube Composer is a puzzle game about **functional programming**. You are given
an input grid of coloured cubes and a toolbox of pure functions — `map`,
`filter`, `rotate`, `fold`, and so on. Drag the functions into the program
pane, compose them in an order, and hit run: if your program turns the input
into the goal grid, you solve the level. Ninety levels across nine chapters
teach the idea one transformation at a time.

The entire game — engine, levels, renderer, UI, and persistence — is written in
**PureScript**, compiled to JavaScript.

## License compliance (MIT)

Cube Composer is MIT licensed. The upstream `LICENSE` is redistributed verbatim
in [`LICENSE`](./LICENSE), preserving the copyright notice and permission
notice as the MIT license requires. The upstream `README.md` is included too.

## About the build artifacts

Upstream does not commit its build output. The upstream toolchain requires
**PureScript 0.11.6** (2017) plus ~50 Bower-hosted PureScript libraries, and
those libraries have since published releases whose FFI files use a `"use
strict"` header that the 0.11.6 compiler cannot parse. Bower's `resolutions`
field does not force the transitive graph back far enough, so a from-source
rebuild is no longer reproducible without pinning every transitive dependency
by hand.

Instead, this build uses the **author's own published build** from
`https://david-peter.de/cube-composer/dist/` — the artifacts produced by the
upstream `gulp prod` pipeline from this exact source tree:

- `dist/main.js` (165 KB) — Sortable.js concatenated with the compiled
  PureScript bundle, minified
- `dist/main.css` (3.3 KB) — the compiled Less

Alongside them, `index.html` and `img/` are byte-for-byte from the repository.
No JavaScript game logic was rewritten.

## Modifications made for this self-hosted build

1. **Removed the Google Analytics bootstrap** from `index.html` — the inline
   `www.google-analytics.com/analytics.js` loader plus
   `ga('create', 'UA-39945208-2', 'david-peter.de')` and
   `ga('send', 'pageview')`.
2. **Removed the GitHub star-count iframe** (`ghbtns.com`) from the page footer.
3. **Added a no-op `ga` global in `dist/main.js`.** The PureScript module
   `PS.Analytics` emits `ga("send", "event", "level", ...)` whenever you pick a
   level, and the game runs in strict mode — with the real Analytics script
   gone, those calls would throw a `ReferenceError`. Declaring
   `var ga = function () {};` keeps the call sites intact and inert. This is a
   two-line addition ahead of the existing `var PS = {};`; nothing else in the
   bundle was touched.

The CDN stylesheet the page loads (`fonts.googleapis.com` for Roboto Condensed)
was left as-is.