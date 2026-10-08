---
title: "Cube Engine"
slug: "cube-engine"
description: "A first-person voxel sandbox. Generate an infinite blocky world, mine it, build in it, and walk around with pointer lock."
category: "building"
tags: ["voxel", "sandbox", "first-person", "building", "canvas", "open source"]
thumbnail: "/games/cube-engine/thumbnail.svg"
---

# Cube Engine

Cube Engine is a from-scratch first-person voxel engine by **Nurgak**. It generates a blocky world, renders it with distance fog and a visible chunk grid, and lets you move, jump, and edit the terrain in real time.

Everything is hand-written against the 2D canvas context - no WebGL, no library, no build step. The side panel exposes the engine's own options: gravity, collision detection, HUD, field of view, render distance, texture type and a joystick for touch devices, plus save/load to a local file. Type the coordinates under **D** to teleport.

## How to Play

1. Walk with WASD and jump with Space.
2. Look around with the mouse after locking the pointer.
3. Break and place blocks with the left and right mouse buttons.
4. Type coordinates under **D** to teleport, and use **Load** to replay a saved world.

## Controls

- **WASD** - move
- **Space** - jump
- **Mouse** - look (click **Lock pointer** first)
- **Left click** - break block
- **Right click** - place block
- **Page Up / Page Down** - change elevation
- **Arrows** - rotate
- **D** - teleport panel

## Tips

Raise **Render distance** to see further, but the renderer is a 2D context so each step up costs real frame time. The **Map** overlay is the fastest way to orient yourself in an unfamiliar world.

## Open Source & License

No license file in upstream repository It is integrated here as a self-hosted build, running entirely in your browser
from `/games/cube-engine/` with no external services.

- Original source: <https://github.com/Nurgak/Cube-engine>
