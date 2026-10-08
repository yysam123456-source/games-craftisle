# Samsy Ninja — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** SMSY-Gen02 (a local replica of samsy.ninja)
- **Author:** Samuel Honigstein / "SMSY" — see the credits below
- **License:** **Not stated in the source repository** — the game itself carries
  no license grant
- **Original site:** https://samsy.ninja

## ⚠️ No license grant — read before redistributing

Two independent facts have to be reported together here:

1. **There is no `LICENSE` file** anywhere in this directory or in the upstream
   project, and no license text in `index.html` or the bundle. The game itself
   carries **no license grant**. Author: **Unknown as far as a license file is
   concerned.**

2. The `README.md` shipped in this directory — itself a Chinese-language
   reverse-engineering document, not an upstream author statement — ends with an
   explicit attribution notice: *"所有资源版权归原作者所有，仅供学习研究使用"*,
   meaning **all resource copyrights belong to the original author, for study
   and research use only**.

This is the honest position: the original work is **all rights reserved**, and the
only usage grant visible anywhere is "for study and research". Redistributing it
as part of a public site is not something the original author has licensed, and
anyone doing so further should clear it with them first.

## Who made it

The bundle identifies the creator in several places, and these are the only
attributions the files themselves carry:

- `index.html` sets `<meta name="author" content="SMSY">` and titles the page
  "SMSY-Gen02 | Award Winning Creative Graphics Engineer"
- The in-app about page links to `mailto:samuel.honigstein@gmail.com`,
  `https://x.com/Samsyyyy` and
  `https://www.linkedin.com/in/samuel-honigstein-12412851/`
- The same about text describes the author as a Paris-based freelance creative
  technologist working in digital since 2013, with a background in interaction
  design and a focus on interactive 3D experiences
- `README.md` identifies the original site as https://samsy.ninja and names the
  author as "SMSY (@samsyyyy)"

## About

It is a multiplayer 3D cyberpunk portfolio. Visitors roam a 3D city as a VRM
avatar, browsing the creator's project work. Per `README.md`, the stack is
**Three.js r182dev** (WebGPU first, WebGL2 fallback), **Vue 3 + Vuex** for the 2D
HUD, **GSAP** for tweening, **PartyKit** over WebSocket for multiplayer position
and action sync, **@pixiv/three-vrm** for VRM loading and SpringBone physics,
**Draco** for GLB compression, **BMFont** for in-space bitmap text, and **Vite**
for the build.

The startup is a strict serial async chain — preloader animation, then six
parallel preload blocks (renderer 15%, audio 20%, character controller 20%, UI
interaction 20%, 3D scene 15%, textures 10%), then scene state VOID → IDLE, then
the render loop, and the Vue UI mounts **last**. The stated design goal: "3D scene
first, Vue UI last" — while you see the 3D image, there are almost no Vue nodes
in the DOM.

First load is 10–30 seconds for roughly 40 MB of models, textures and audio. The
in-app quest system tracks five achievements (`smsy_quests` in localStorage):
tutorial completed, visit all sections, visit all works, all colours collected,
all tracks requested, all NPCs talked to.

## Files included in this build

- `index.html`, `assets/js/main-ITpbzWAg.js` (the whole bundle),
  `assets/baker.worker-5z1EDtsg.js`
- `assets/` — `models/` (`cyberfix.glb`), `vrm/` (`owo3.vrm`, `owo7.vrm`),
  `textures/`, `sound/` (10 MP3s), `bmfont/`, `interaction/`, `css/`, `front/`
- `lib/draco_decoder.wasm` + `draco_wasm_wrapper.js`
- `videos/` — 27 project videos plus `loading.mp4`
- `preloader/`, `favicons/`, `vercel.json`, `.gitignore`
- `README.md` — the Chinese reverse-engineering write-up described above

`vercel.json` sets the cross-origin isolation headers this bundle needs:
`Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Embedder-Policy:
credentialless` and `Cross-Origin-Resource-Policy: same-origin`, plus correct
MIME types for `.glb`, `.vrm` and `.wasm`.

## Third-party libraries bundled in the bundle

License headers survive inside `assets/js/main-ITpbzWAg.js`:

- **Three.js** r182dev (MIT) — "SPDX-License-Identifier: MIT", © 2010-2025
  Three.js Authors
- **@pixiv/three-vrm** and **@pixiv/three-vrm-core** v3.4.2 (MIT) — © 2019-2025
  pixiv Inc.
- **GSAP** 3.13.0 — **not open source.** "Copyright 2008-2025, GreenSock. All
  rights reserved. Subject to the terms at https://gsap.com/standard-license",
  © Jack Doyle. GSAP ships free for most uses but its standard license is **not**
  an open-source grant and does cover commercial use; the terms at that URL are
  the authoritative ones.
- **Draco** — the decoder is bundled as `lib/draco_decoder.wasm` +
  `draco_wasm_wrapper.js`; its header is inside the wrapper

## External requests

`index.html` loads **Google Analytics** (`googletagmanager.com/gtag/js`,
property `G-T6R7J0D4NK`) four times over. This was not added by this
integration — it is upstream's own analytics tag, reproduced verbatim. Note that
it does send visitor data to a third party; removing it would change the page's
behaviour, so it has been left as-is.

## Modifications made for this self-hosted build

None. `index.html` loads `./assets/js/main-ITpbzWAg.js` by relative path, and the
bundle references its assets relatively, so it runs unchanged from
`/games/samsy-ninja/index.html`.

## Accuracy note

`README.md` in this directory is written in Chinese, and it documents a *local
replica* rather than being an upstream publication. Its file paths reference a
different machine (`/home/zhangshuai/Desktop/hi`) and it is written as reverse
engineering notes. It is retained verbatim as shipped; this file is the
authoritative English attribution record.