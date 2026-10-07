---
title: "Tower Defense"
slug: "tower-defense"
description: "An isometric 3D tower defence built with Three.js and a physically-based material pipeline. Place turrets, upgrade them, and stop the wave before it reaches your base."
category: "strategy"
tags: ["tower defense", "3d", "three.js", "webgl", "strategy", "open source"]
thumbnail: "/games/tower-defense/thumbnail.svg"
---

# Tower Defense

**Tower Defense** is an isometric 3D tower defence built with **Three.js** and a
physically-based material pipeline. Enemies walk a fixed path across a terrain
map while you spend in-game currency placing and upgrading turrets — a basic
twin-barrel gun, an advanced rapid-fire turret, and a high-damage cannon, each
with its own OBJ model, texture set and projectile type.

The terrain uses three 1024×1024 maps — albedo, normal, and specular — so the
ground actually catches light as your turrets rotate into frame.

## How to Play

1. Press **Play level 1**.
2. Select a turret from the build menu at the bottom of the screen.
3. Place it on any valid tile beside the enemy path. Green tiles accept the
   current turret; red tiles do not.
4. Press **start wave** when you are ready. Waves can be called early for a
   bonus.
5. Survive every wave. Turrets can be upgraded in place for more damage or
   range.

## Controls

- **Click a turret type** — arm the build cursor
- **Click a tile** — place the armed turret
- **Click an existing turret** — select it for upgrade or sale
- **start wave** — begin the next wave (earlier calls score more)
- Mouse wheel — zoom the camera

## Tips

- Coverage beats damage early. Two turrets with overlapping range will hold a
  bend better than one big gun covering a straight line.
- Place turrets *after* the turns in the path, not before them. A turret that
  covers three tiles of a straight run fires three times; one covering a
  corner fires as often.
- Selling refunds most of a turret's cost. Over-committing to the wrong
  stretch early is recoverable — do not panic-build at the start gate.

## Save Data

Nothing is persisted. Each session starts a fresh level 1.

## Open Source & License

Tower Defense was created by **Casmo** and is licensed under the
**MIT License**.

- Original game source: <https://github.com/Casmo/tower-defense>
- Original live build: <https://casmo.github.io/tower-defense/>

This integration self-hosts the MIT build so it runs entirely in your browser.
It bundles its own copy of Three.js, so it needs no network access to run. The
only change was removing a flat preview render of the level map that the game
never loads.