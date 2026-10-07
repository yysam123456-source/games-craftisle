# Hexa Battle — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Hexa Battle
- **Author:** Giacomo Tagliabue (itajaja)
- **License:** MIT License
- **Source repository:** https://github.com/itajaja/hb
- **Original live build:** https://hexa-battle.firebaseapp.com/

## About

Hexa Battle is a turn-based tactics game on a hex grid, written in TypeScript
with React 15 for the UI. You command a squad against an AI opponent
(`src/ai/`) using unit actions, with campaign levels defined in
`src/content/levels.ts`. The whole client — engine, AI, levels, and interface —
ships as a single webpack bundle.

## License compliance (MIT)

Hexa Battle is MIT licensed. The upstream `LICENSE` is redistributed verbatim in
[`LICENSE`](./LICENSE), preserving the copyright notice and permission notice
as the MIT license requires.

## Build performed for this build

The repository has no committed build output, so it was compiled with the
upstream toolchain:

```sh
npm install
NODE_ENV=production NODE_OPTIONS=--openssl-legacy-provider npx webpack -p
```

`NODE_OPTIONS=--openssl-legacy-provider` is required because webpack 2 uses the
legacy OpenSSL hashing API that modern Node.js disables by default. It changes
nothing about the output. The build succeeded and emitted `bundle.js`,
`index.html`, and `favicon.png` — exactly what upstream produces.

## Modifications made for this self-hosted build

1. **Rewrote the webpack `publicPath` output paths as relative.** Upstream sets
   `output.publicPath: '/static/'`, so `html-webpack-plugin` injected
   `href="/static/favicon.png"` and `src="/static/bundle.js"` into `index.html`.
   Those absolute paths only resolve when the app is served from a domain root.
   Embedded at `/games/hexa-battle/`, they were changed to `favicon.png` and
   `bundle.js`. No JavaScript was touched.
2. **Removed the trailing `//# sourceMappingURL=bundle.js.map` comment** and did
   not ship the 2.7 MB source map it pointed at. The bundle itself is the
   unmodified production output.

The upstream `README.md` and `LICENSE` are included alongside.

## Runtime dependencies

`index.html` loads two stylesheets from CDNs, exactly as upstream does:

- `cdnjs.cloudflare.com` — normalize.css 4.2.0
- `fonts.googleapis.com` — the VT323 pixel font

Everything else (React, ReactDOM, Aphrodite, Anime.js, Lodash, the `store` state
container, the game engine, the AI, and all level content) is bundled inside
`bundle.js`.