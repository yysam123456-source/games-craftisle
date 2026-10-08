---
title: "Alien Invasion"
slug: "alien-invasion"
description: "A wave-based space shooter on a 320x480 canvas. March the descending aliens, dodge the bombs, and clear every wave."
category: "arcade"
tags: ["alien", "space", "shooter", "waves", "canvas", "open source"]
thumbnail: "/games/alien-invasion/thumbnail.svg"
---

# Alien Invasion

Alien Invasion is a compact, no-frills space shooter by **cykod**. A column of alien invaders descends from the top of the screen while they drop bombs; you pilot a small ship along the bottom and shoot them one at a time.

The game is built on a tiny hand-rolled engine (`engine.js`) plus `game.js`, both plain ES5 with no framework and no build step. It is a classic score-attack loop: kill aliens for points, the wave speeds up, and the game ends when the bombs or the invaders reach you.

## How to Play

1. Move your ship along the bottom with the arrow keys or A/D.
2. Fire with the space bar.
3. Dive bombs to score extra points.
4. Clear a wave to advance; the aliens move faster each time.

## Controls

- **Left / Right** or **A / D** - move
- **Space** - fire
- **Down** - dive toward the aliens for bonus points

## Tips

The invaders accelerate as the wave count climbs, so the safe play is to keep moving and only shoot when a bomb is about to land. Clearing an entire wave restores a little breathing room.

## Open Source & License

MIT License (the repository also ships a GPL-2 license file for the bundled engine) It is integrated here as a self-hosted build, running entirely in your browser
from `/games/alien-invasion/` with no external services.

- Original source: <https://github.com/cykod/AlienInvasion>
