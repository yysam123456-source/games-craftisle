---
title: "Astray"
slug: "astray"
description: "A 3D maze game built with Three.js and Box2D physics. Guide a steel ball through a procedurally generated maze — each level adds two cells in both directions."
category: "puzzle"
tags: ["astray", "maze", "3d", "three.js", "webgl", "physics", "open source"]
thumbnail: "/games/astray/thumbnail.svg"
---

# Astray

**Astray** is a 3D maze game by Tyler Whittle. You are a steel ball in a
procedurally generated maze, and the only way out is through it. Every time you
reach the exit, the maze regenerates **two cells larger in each direction** and
a new level begins — so it starts trivially and does not stop getting harder.

The renderer is **Three.js** (an older bundled build) and the physics is
**Box2DWeb**, the JavaScript port of Box2D. The ball has real momentum: it
rolls, it keeps rolling, and friction is the only thing that stops it.

## How to Play

1. Hold **I** to read the on-screen instructions.
2. Steer the ball with the **arrow keys**.
3. Vim users: **H J K L** work too.
4. Reach the glowing exit tile at the far corner of the maze.
5. The level counter increments and the maze grows. Keep going.

## Controls

- **← → ↑ ↓** — apply force toward that direction
- **H J K L** — Vim-style movement (same as the arrow keys)
- **I** — hold to show the instructions overlay
- **Mouse** — unused; the game is keyboard-driven

## Tips

- Because momentum carries, tap-and-release steering works far better than
  holding a direction. Over-committing sends you into a wall and you have to
  roll back out.
- The camera follows the ball with a slight lag and eases its zoom, so a wide
  swing across the maze is more efficient than careful edge-hugging.

## Save Data

Nothing is saved. Every load generates a fresh maze.

## Open Source & License

Astray was created by **Tyler Whittle (wwwtyro)** and is released under
**The Unlicense** — it is in the public domain.

- Original game source: <https://github.com/wwwtyro/Astray>
- Original live build: <http://wwwtyro.github.io/Astray/>

This integration self-hosts that build so it runs entirely in your browser. The
only change was rewriting three texture paths from root-absolute to
document-relative so the art loads when the game is embedded at a sub-path.