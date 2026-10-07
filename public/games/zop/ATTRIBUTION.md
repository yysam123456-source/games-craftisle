# Zop — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Zop
- **Author:** Zolmeister
- **License:** MIT License
- **Source repository:** https://github.com/Zolmeister/zop

## About

Zop is a reflex/puzzle hybrid built with **Clay.js**, the tiny framework behind
Google's *Flappy Bird* clone. You tap to flip a shape at exactly the right
moment to land on the target — the game's subtitle is a kaomoji,
`(╯°□°）╯︵ ┻━┻`, a nod to the classic table-flip emote.

The upstream project is a monorepo-ish layout: CoffeeScript sources in `src/`,
a Gulp pipeline, and Bower-managed front-end dependencies.

## License compliance (MIT)

Zop is MIT licensed. The upstream `LICENSE` is redistributed verbatim in
[`LICENSE`](./LICENSE), preserving the copyright notice and permission notice
as the MIT license requires.

## Modifications made for this self-hosted build

Only `index.html` was edited, and only to remove third-party analytics. No game
code was touched:

1. **Removed the Google Analytics block** — the inline
   `www.google-analytics.com/analytics.js` loader plus
   `ga('create', 'UA-30570115-17', 'auto')` and `ga('send', 'pageview')`.
2. **Removed the Clay analytics SDK** (`cdn.wtf/sdk/v1/clay_sdk.js`) and its
   `Clay('init', {gameId: '8343'})` call.

3. **Removed the Google Fonts `<link>` and repointed the `zp-icon` icon
   font.** Two third-party font requests failed on every load: the
   `fonts.googleapis.com` stylesheet, and the `zp-icon` `@font-face`, whose
   `cdn.wtf` source no longer serves the community material-design set. The
   `@font-face` lives inside a JS string literal in the bundled Clay.js
   (single quotes escaped as `\'`) and is injected as a `<style>` at runtime,
   so it was repointed to a `local()` lookup. Every `zp-icon` *class* rule was
   left untouched, so layout and spacing are unchanged — the Roboto and icon
   faces simply fall back to the generic families already in the stack.

The Clay.js engine itself — the actual game framework — is untouched and still
present inlined in the file. The remaining `cdn.wtf` URLs in the file are CSS
font references from the original stylesheet, not scripts.

The upstream `release/index.html` (204 KB) already ships as a
**fully self-contained** single file: Clay.js, the Bower dependencies, and the
`fetch` polyfill are all inlined. No Gulp run, no Bower install, and no source
build were needed.

Verification performed on the shipped file:

- zero references to `bower_components/` (all dependencies are inlined)
- zero external `<script src=...>` or `<link href=...>` tags — the only remote
  URLs are the author's own site link in the metadata, a GitHub link for
  `pimterry/loglevel` in an attribution comment, and CSS font files under
  `cdn.wtf/d/zorium/`
- no analytics, advertising, or tracking code
- `npm start` in this repo runs a CoffeeScript Express server purely for local
  development; the static build does not need it