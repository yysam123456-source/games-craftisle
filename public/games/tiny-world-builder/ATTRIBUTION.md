# Tiny World Builder — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Tiny World Builder
- **Author:** Jason Kneen (GitHub: `jasonkneen`)
- **License:** GNU Affero General Public License v3.0 (AGPL-3.0)
- **Source repository:** https://github.com/jasonkneen/tiny-world-builder
- **Original live build:** https://tinyworld.build

## About

Tiny World Builder is a self-contained 3D voxel world editor that runs entirely in
the browser. Per the upstream `README.md`, it lets you "build, sculpt, fly
through, and share tiny worlds" — placing terrain, props, homes, paths, crops and
animals on a click-based grid, switching between isometric, soft and perspective
camera modes, and saving, remixing and exporting worlds to share with other
players.

There is a deterministic vehicle-AI runtime with configurable delivery-bot routes
and traffic simulation, drivable along road cells. The app deploys as a static
site with no runtime CDN dependency: Three.js and its loaders/decoders are
self-hosted under `vendor/three/`. Account support is optional — Netlify Identity
for email/OAuth, and Phantom wallet login (after the wallet signs a server
challenge) behind a Netlify function keyed on `TINYWORLD_WALLET_SESSION_SECRET`.
None of that is active in this copy, which is the plain local build.

## License compliance (AGPL-3.0)

Tiny World Builder is licensed under the **GNU Affero General Public License
v3.0**. The upstream `LICENSE` is redistributed verbatim in [`LICENSE`](./LICENSE).

AGPL-3.0 is the strongest copyleft in common use and, unlike GPL, its section 13
adds an explicit **network-use clause**: if you modify this program and let users
interact with it remotely over a network, you must offer those users the source
code of your modified version. The full text is in the `LICENSE` file next to this
one — in particular sections 13 (Remote Network Interaction; Use with the GNU
General Public License) and 4 (Conveying Verbatim Copies).

## Third-party libraries bundled in this directory

Self-hosted under `vendor/` so the game has no runtime CDN dependency:

- **Three.js** r128 (MIT) — `vendor/three/three.r128.min.js`, © 2010-2021
  Three.js Authors
- **GLTFLoader** r128 (MIT) — `vendor/three/GLTFLoader.r128.js`
- **three-crowd-layer** — `vendor/tiny-crowd-layer.js`, a small instanced-crowd
  helper

`models/`, `textures/`, `sounds/` and `crowd/` ship with the build.

## Files included in this build

The upstream tree is included as published, including the multi-page static
entry points: `index.html`, `copy.html` (the "open directly" path),
`voxel-builder.html`, `voxel-robot.html`, and `material-lookbook.html`.
`LandscapeEngine.js` is the engine, `world.schema.json` the save schema. Several
`tinyworld-*.png` and `voxel-*.png` files at the root are development screenshots
and design references from upstream, retained as-is.

`README.md` documents the controls, which are worth repeating because they are not
discoverable from the page itself: click to place; `E` then click (or the eraser
tool) to erase; drag to orbit; scroll wheel to zoom; `R` / `F` over the hovered
cell to raise or lower terrain; `1`–`9` then the letter shortcuts shown in the
toolbar to switch tool; `P` or `I` to toggle camera mode (isometric ⇄ soft ⇄
perspective); `C` to clear back to grass; the reset button to return to the
preset.

## Modifications made for this self-hosted build

None. The game already used document-relative paths (`vendor/`, `models/`,
`textures/`, `sounds/`), so it runs unchanged from
`/games/tiny-world-builder/index.html`.