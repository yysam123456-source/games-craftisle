# HexGL — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** HexGL
- **Author:** Thibaut Despoulain (BKcore)
- **License:** MIT License
- **Source repository:** https://github.com/BKcore/HexGL
- **Original live build:** http://hexgl.bkcore.com

## About

HexGL is a futuristic HTML5 racing game built with **Three.js**. You pilot a
futuristic ship through a hex-tiled obstacle course at speed, banking and
diving to line up the perfect line through each gate.

The engine layer in `bkcore/` is BKcore's own framework (`BKcore.js`,
`AudioManager.js`, `Config.js`, `ControlsManager.js`, `ui/`, `utils/`), and the
`bkcore.coffee` file is the CoffeeScript source for it.

## License compliance (MIT)

HexGL is MIT licensed. The upstream `LICENSE` is redistributed verbatim in
[`LICENSE`](./LICENSE), preserving the copyright notice and permission notice as
the MIT license requires.

Note the exact wording of the upstream `README.md`: *"Unless specified in the
file, HexGL's code and resources are now licensed under the MIT License."* The
"unless specified in the file" carve-out matters here — see below.

## Third-party libraries bundled in this directory

These are the scripts `index.html` actually loads. Each retains its own
copyright header and license inside the file:

- **Three.js** (MIT) — `libs/Three.dev.js`, plus `libs/ShaderExtras.js`
  (the TextureBump / TextureWater / TextureSky / TextureHeadsUpDisplay shaders)
  and `libs/Three.r53.js` as a retained older copy
- **Three.js postprocessing** (MIT) — `libs/postprocessing/EffectComposer.js`,
  `RenderPass.js`, `BloomPass.js`, `ShaderPass.js`, `MaskPass.js`
- **Leap Motion** — `libs/leap-0.4.1.min.js`; bundled but **not** referenced by
  `index.html`, left over from the optional motion-control path
- **WebGL Detector** — `libs/Detector.js`
- **Stats.js** — `libs/Stats.js` (the FPS/ms graph)
- **DAT.GUI** (Apache 2.0) — `libs/DAT.GUI.min.js`, © 2011 Data Arts Team,
  Google Creative Lab
- **ACE Editor** (BSD) — `libs/Editor_files/ace.js` and `libs/Editor.html`, used
  by the in-game track editor; a build-time authoring tool, not loaded by
  `index.html`

`audio/LICENSE` documents the audio assets, which are **not** all covered by the
project's own grant:

- `boost.ogg` — IFartInUrGeneralDirection, CC BY 3.0
- `wind.ogg` — kangaroovindaloo, CC BY 3.0, further cut and adjusted by Licson
- `destroyed.ogg` — beman87, CC BY 3.0, further adjusted by Licson
- `crash.ogg` — qubodup, public domain
- `bg.ogg` — mu6k, public domain, further adjusted by Licson
- All files converted to Ogg Vorbis by baleboy

`textures/` and `geometries/` ship with the build under the project's own terms.

## Modifications made for this self-hosted build

None. The directory is the upstream `master` (stable public release) as-is:

- `index.html`, `launch.js`, `launch.coffee` — the entry point and its
  CoffeeScript source, unchanged from upstream
- `bkcore/` — `Audio.js`, `threejs/` (`RenderManager.js`, `Shaders.js`,
  `Particles.js`, `Loader.js`, `Preloader.js`) and `hexgl/` (`HexGL.js`,
  `ShipControls.js`, `Gameplay.js`, `HUD.js`, `RaceData.js`, `CameraChase.js`,
  `ShipEffects.js`, `Ladder.js`, `tracks/`)
- `bkcore.coffee/` — the CoffeeScript sources of the engine and its controllers,
  including `TouchController`, `OrientationController` and `GamepadController`
- `libs/` — third-party dependencies
- `audio/`, `textures/`, `textures.full/`, `geometries/`, `css/`, `favicon.png`,
  `icon_32/64/128/256.png`, `manifest.webapp`, `package.webapp`, `package.zip`,
  `cache.appcache`
- `replays/`, `.htaccess`

`textures/` holds the low-resolution texture set and `textures.full/` the
full-size one; the upstream `README.md` documents swapping them for full-size
visuals. `package.zip` and `package.webapp` are upstream's packaged Firefox OS
build, retained for reference. `replays/` holds recorded ghost runs.

The game's own credits screen (`index.html`, `#credits`) attributes HexGL to
Thibaut Despoulain (BKcore). The game uses document-relative paths, so it runs
unchanged from `/games/hexgl/index.html`.