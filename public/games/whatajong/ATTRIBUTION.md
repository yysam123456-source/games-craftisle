# Whatajong — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Whatajong — A Mahjong Solitaire roguelite
- **Author:** Ramon "masylum" Tosa (Ramensoft SL)
- **License:** MIT License — full text retained in this directory as `LICENSE`, copied verbatim from the upstream repository
- **Source repository:** https://github.com/masylum/whatajong (default branch: `main`, commit `45fe3da`)
- **Official site:** https://whatajong.com

## About

Whatajong is a roguelite twist on classic Mahjong Solitaire: you clear boards of
stacked mahjong tiles by matching free pairs, earning coins and power-ups between
runs, with dragons, phoenixes, gems, jokers and other special tiles adding
roguelite depth. The game is built with Vite + SolidJS; this integration is the
official web front-end (`src/renderer`) compiled to static files.

## Files in this directory

| File | Origin |
| --- | --- |
| `index.html` | Built output of the upstream Vite build (entry point of the game) |
| `assets/` | Built output of the upstream Vite build: JS/CSS bundles, tile/background/texture sprites, sound effects, music sprite and fonts. All self-hosted, no external requests. |
| `LICENSE` | Copied verbatim from `LICENSE` in `masylum/whatajong` |
| `ATTRIBUTION.md` | Written for this site; not part of upstream |
| `thumbnail.svg` | Hand-written for this site; not part of upstream |

## Build

Built from upstream `main` (commit `45fe3da`) with the repository's own itch.io
static-hosting build script, which is designed for sub-path deployment:

```
pnpm build:itch
# = tsc --noEmit --project tsconfig.web.json && VITE_ITCH_IO=true vite build
```

`VITE_ITCH_IO=true` switches the router to hash-based routing and sets the Vite
`base` to a relative path, so every asset reference in the output is relative
(`./assets/...`) and the game works from the `/games/whatajong/` sub-path.

## Modifications

The upstream source was patched before building, for site policy compliance:

1. **Analytics removed.** `src/renderer/lib/observability.ts` imported `posthog-js`
   and initialised it with a hardcoded PostHog project key pointed at
   `https://eu.i.posthog.com`. This site makes zero external requests, so the
   `posthog-js` import and all PostHog calls were removed. The module's exported
   functions (`initObservability`, `captureRun`, `captureEvent`) were kept as
   no-op stubs so the 11 call sites across the codebase compile unchanged.
2. **localStorage namespacing.** The game persists progress under the keys
   `deck-state-v4`, `global-state-v4`, `tile-state-v4`, `game-state-v4` and
   `run-state-v4`. Because every game on this site shares one origin, each key was
   prefixed with `whatajong:` (e.g. `whatajong:run-state-v4`) to avoid
   cross-game localStorage collisions.
3. **Missing favicon links removed.** The upstream `index.html` linked
   `/favicon.ico`, `/favicon.svg` and `/apple-touch-icon-180x180.png`, none of
   which exist in the repository (they would 404). The three `<link>` tags were
   removed.
4. **Latent `url(undefined)` fixed.** Upstream `background.css.ts` defined a
   texture variant `num: 0` referencing `textures/0.webp`, which does not exist in
   the repository (textures start at `1.webp`), compiling to a dead
   `background-image: url(undefined)` CSS rule. The variant (never used at
   runtime) now references texture `1`.

No gameplay logic was altered. Hidden sourcemaps (`*.js.map`) emitted by the
build were not deployed.

## Note on licensing

Whatajong is distributed under the MIT License; the full license text is retained
in this directory. Whatajong and related trademarks remain the property of their
respective owners.
