# Messenger — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Messenger
- **Author:** Vicente Lucendo and Michael Sungaila — published by **Abeto**
  (`https://abeto.co`)
- **License:** ⚠️ **Not stated in the source repository** — no open source grant
- **Original live build:** https://messenger.abeto.co/

## ⚠️ No license grant — read before redistributing

**There is no `LICENSE` file** in this directory or in the published bundle, and
no license text anywhere in the source. The only rights statement present is the
line at the very top of the main bundle:

```
/* by abeto - https://abeto.co */
```

That is an **attribution notice, not a license grant**. No public source
repository for this game was found, and no permission to redistribute, host or
mirror it has been granted by the authors. It is therefore **all rights
reserved** by default.

This matters here specifically because Abeto publishes Messenger as a free
browser game at `messenger.abeto.co` — free *to play*, which is not the same as
licensed for redistribution. Anyone redistributing this build further, or
shipping it in a product, should first clear rights with Abeto. Note also that
when Messenger launched in September 2025, the developer publicly declined to
open-source it; it was released as a showcase of Abeto's own real-time
interactive tech, alongside work like a flower that tracks your cursor and an
Igloo community site whose ice bricks assemble with your pointer.

## About

Messenger is a browser-based delivery game set on a tiny spherical planet. You
play a young courier delivering parcels and letters around a small cel-shaded
world — a residential area, a factory, a beach, a forest, a power plant, an ocean
and mountains — with a title spelled out in 3D buildings.

The planet is a closed sphere, so there are no invisible walls: falling off a
cliff simply lands you in another district, and a full lap on foot takes minutes.
Five delivery jobs make up the main story; a reviewer completing all of them spent
about half an hour, which is the intended length. There are hidden surprises
scattered around, including an alien sunbathing on the beach, a UFO, and an
easter egg.

It is multiplayer: up to **ten players per world** share the same planet and can
see each other, but can only communicate by emoji. Abeto capped the world at ten
deliberately — the technology could support thousands, but more players destroyed
the sense of calm they wanted. You can customise your courier's hairstyle, jacket,
pants and sneakers.

Published **25 September 2025**, free with no ads, desktop and mobile.

## Technology

Per the developers' own public account and technical write-ups:

- **Three.js** (r180) at the core, with **three-mesh-bvh** for optimization —
  they built their own stack rather than using Unity or Godot
- Models made in **Houdini** and **Blender**; textures from **Substance**
- **WebSocket** multiplayer on **Node.js**
- Custom shaders, controls, camera, networking and back end — nearly everything
  outside Three.js was written from scratch
- **KTX2** compressed textures and a layered spatial-audio score
- First load 5.7 MB, 17.5 MB total

The character moves at a slow jog by default, can reach a light run, and can hop
the ankle-high obstacles. Navigation is deliberately gentle: the camera
auto-centers, so it is playable by people who do not normally play games.

## Files included in this build

This is the published production deployment, not a source checkout:

- `index.html` — the SvelteKit entry page. It sets
  `__sveltekit_1kaqct8 = { base: "/games/messenger", assets: "/games/messenger" }`,
  so the app is pre-configured to be served under `/games/messenger/`
- `_app/` — the compiled SvelteKit app: `immutable/entry/`, `immutable/chunks/`,
  `immutable/nodes/`, `immutable/assets/`
- `messenger/` — the 3D payload: `App3D-BLRWK1h9.js`, `runtime-C2kxzoFi.js`,
  `style-BgpnrCnL.css`, `webgl-v2-fixdomain.js`, dedicated workers
  (`bitmapworker`, `charactergeoworker`, `collisionworker`, `dracoworker`,
  `exrworker`, `geometryworker`, `glyphworker`, `msdfworker`),
  `basis_transcoder.wasm`, plus `audio/`, `fonts/`, `geometries/`, `images/`,
  `libs/basis/` and favicons
- `draco/` — the Draco decoder
- `_headers` — Cloudflare Pages cache and CORS headers
- `robots.txt`

`_app/` and `messenger/` bundle **Three.js** and other third-party libraries
inside minified application code, where individual license banners are mostly
stripped by the production build; those libraries are MIT/BSD-licensed by their
own authors but their license texts are not separately shipped here.

## Modifications made for this self-hosted build

`_headers` was added for the Cloudflare Pages deployment: it sets
`Cache-Control: public, max-age=0, must-revalidate` on the app shell and
`.wasm` / `.js` / `.drc` / `.ktx2` assets (so stale bundles cannot be cached), and
adds `Cross-Origin-Embedder-Policy: require-corp` with
`Cross-Origin-Opener-Policy: same-origin` plus `Access-Control-Allow-Origin: *`
on the binary assets. Its own leading comment is in Chinese and notes the intent:
cache-busting plus CORS, for Safari compatibility.

No game code was modified.