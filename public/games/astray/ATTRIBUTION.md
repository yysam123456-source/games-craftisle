# Astray — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Astray
- **Author:** Tyler Whittle (wwwtyro)
- **License:** The Unlicense (public domain dedication)
- **Source repository:** https://github.com/wwwtyro/Astray
- **Original live build:** http://wwwtyro.github.io/Astray/

## About

Astray is a 3D maze game built with Three.js (rendering) and Box2DWeb
(physics). You guide a steel ball through a procedurally generated maze; each
time you reach the exit the maze grows by two cells in both dimensions and a
new level begins.

## License compliance (Unlicense)

Astray is released under **The Unlicense**, which places the work in the public
domain and disclaims copyright. The upstream `License.md` is redistributed
verbatim in [`License.md`](./License.md).

## Modifications made for this self-hosted build

Only one change was needed, and it was a path fix rather than a logic change:

1. **Rewrote three absolute texture paths as document-relative.**
   In `index.html`, `THREE.ImageUtils.loadTexture('/ball.png')`,
   `loadTexture('/concrete.png')` and `loadTexture('/brick.png')` were changed
   to `loadTexture('ball.png')`, `loadTexture('concrete.png')` and
   `loadTexture('brick.png')`. The upstream code assumed the game was served
   from the domain root; as an embed it lives at `/games/astray/`, so the
   leading slash resolved to the wrong location and the textures 404'd.

No game logic, physics parameters, or rendering code was modified. `Three.js`,
`Box2dWeb.min.js`, `jquery.js`, `keyboard.js`, `maze.js` and the three PNG
textures are byte-for-byte upstream.