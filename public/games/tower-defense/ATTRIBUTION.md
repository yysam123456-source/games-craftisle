# Tower Defense — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Tower Defense
- **Author:** Casmo
- **License:** MIT License
- **Source repository:** https://github.com/Casmo/tower-defense
- **Original live build:** https://casmo.github.io/tower-defense/

## About

Tower Defense is an isometric 3D tower defence built with Three.js and a
physically-based material pipeline. Enemies walk a fixed path across a terrain
map while you spend in-game currency to place and upgrade turrets — a basic
twin-barrel gun, an advanced rapid-fire turret, and a high-damage "badass"
cannon — each with its own OBJ model, texture set, and projectile type.

## License compliance (MIT)

Tower Defense is MIT licensed. The upstream `LICENSE` is redistributed verbatim
in [`LICENSE`](./LICENSE), preserving the copyright notice and permission
notice as the MIT license requires.

## Modifications made for this self-hosted build

No game code was modified. `index.html`, everything under `js/`, and every asset
the game loads are byte-for-byte upstream.

Only one file was removed:

1. **`assets/levels/level-01.jpg` (744 KB).** This is a flat preview render of
   the level. The level configuration in `js/TowerDefense/Levels/TowerDefense.Level1.js`
   loads only `level-01_COLOR.png` (albedo), `level-01_NRM.png` (normal map) and
   `level-01_SPEC.png` (specular map) — the `.jpg` is never requested at runtime.

Everything else is included, including `assets/ui/` (Bootstrap 3, the UI
stylesheet, the Distgrog webfont in four formats, cursors, and panel art),
`assets/towers/`, `assets/enemies/`, and the three level maps.

## Embedding note

This build is embedded with `disableSandbox` enabled. It creates a `WebGLRenderer`
and loads OBJ geometry at startup, both of which are unreliable inside a
sandboxed iframe across browsers. It also bundles its own copy of Three.js in
`js/lib/three.min.js`, so it needs no network access to run.