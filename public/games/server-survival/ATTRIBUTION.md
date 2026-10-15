# Server Survival — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Server Survival
- **Author:** Kostyantyn Pshenychnyy (`pshenok`)
- **License:** MIT License — full text retained in this directory as `LICENSE`
- **Source repository:** https://github.com/pshenok/server-survival (default branch: `main`)
- **Playable upstream demo:** https://pshenok.github.io/server-survival/
- **Upstream version:** 3.0.0 (as tagged by the `v3.0` marker in the in-game HUD and `package.json`)

## About

Server Survival is an interactive 3D simulation game in which you play as a **Cloud
Architect**: build and scale a resilient cloud infrastructure to survive escalating
traffic, DDoS spikes and random events, while managing your budget, reputation and
service health. It teaches real cloud concepts by playing — load balancing, caching,
autoscaling, circuit breaking, multi-region failover and GPU inference economics —
across 25 campaign levels, a sandbox mode and the endless survival mode, with UI
translations in 11 languages.

The game is native ESM + three.js with **no build step**; upstream serves it raw from
the repository via GitHub Pages. This integration keeps it that way.

## Files in this directory

| File | Origin |
| --- | --- |
| `index.html`, `game.js`, `style.css`, `src/**` | Upstream repository, verbatim except for the modifications listed below |
| `assets/sounds/*.mp3` | Upstream repository, verbatim |
| `LICENSE` | Copied verbatim from `LICENSE` in `pshenok/server-survival` |
| `lib/three.min.js` | three.js r128, downloaded from `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js` (the exact CDN file upstream referenced). three.js is MIT licensed, © 2010-2021 Three.js Authors |
| `lib/tailwindcss.js` | Tailwind CSS Play CDN build, downloaded from `https://cdn.tailwindcss.com` (the exact CDN file upstream referenced). Tailwind CSS is MIT licensed, © Tailwind Labs |
| `ATTRIBUTION.md`, `thumbnail.svg` | Hand-written for this site; not part of upstream |

Not carried over from upstream: `.git/`, `.github/`, `tests/`, `docs/`, `README.md`,
`CONTRIBUTING.md`, `package.json`, `package-lock.json`, `eslint.config.mjs`,
`vitest.config.mjs`, `.gitignore`, `.nojekyll`, `assets/gameplay.gif` (referenced only
by the upstream README and link-preview meta tags, never by the game itself).

## Modifications

The upstream game makes two external CDN requests, which this site does not allow
(all assets must be self-hosted and no external network requests are permitted):

1. `index.html` loaded Tailwind CSS from `https://cdn.tailwindcss.com`. The exact
   same file is now vendored at `lib/tailwindcss.js` and referenced as
   `<script src="./lib/tailwindcss.js">`.
2. `index.html` loaded three.js r128 from
   `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`. The exact
   same file is now vendored at `lib/three.min.js` and referenced as
   `<script src="./lib/three.min.js">`.

No Tailwind version substitution was made: the vendored file is the identical
Play-CDN (browser JIT) build upstream used, so the rendered styles are unchanged.

Other modifications:

- All `localStorage` keys now carry a `server-survival:` prefix
  (`serverSurvivalSave`, `serverSurvivalCampaignProgress`,
  `serverSurvivalAchievements`, `serverSurvivalTutorialComplete`,
  `serverSurvivalToolbarCategory`, `serverSurvivalFailureBadges`,
  `serverSurvivalSoundPrefs`, and the generic `game_locale`). The site hosts many
  same-origin games behind one origin, so the unprefixed keys would collide across
  games. No other game logic was touched.
- The `og:url` / `og:image` / `twitter:image` meta tags that pointed at upstream
  URLs were dropped, together with the corresponding comment. They are inert in an
  iframe embed and would be the only remaining external references in the HTML.
- The THREE boot-guard fallback message was reworded: three.js is now a local file,
  not a CDN.
- Relative paths: all resource references (`style.css`, `src/main.js`,
  `assets/sounds/*.mp3`, `lib/*`) are already relative, so the game works under the
  `/games/server-survival/` subpath with no further changes.
