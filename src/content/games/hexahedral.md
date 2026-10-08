---
title: "Hexahedral"
slug: "hexahedral"
description: "An isometric block-pushing puzzle. Shove every block onto its target in the fewest moves, across three difficulty tiers."
category: "puzzle"
tags: ["isometric", "blocks", "puzzle", "redux", "open source"]
thumbnail: "/games/hexahedral/thumbnail.svg"
---

# Hexahedral

Hexahedral is an isometric block-pushing puzzle by **Matthew Miner**, made for the 2016 Global Game Jam. A grid of cubes sits on an isometric board, and you must push blocks onto matching targets using the fewest moves possible.

The isometric projection makes the depth genuinely tricky to read - a block that looks two rows behind may be one row in front - so the real skill is rotating your mental model of the board. Three difficulty settings change the puzzle size, and the level counter at the bottom tracks your progress through the ten levels. Built with ES6, Redux and virtual-dom.

## How to Play

1. Click an adjacent pink or blue cube to push it.
2. Move all blocks onto matching target tiles.
3. Use the arrow keys to rotate your cube for finer control.
4. Clear a level in as few moves as possible.

## Controls

- **Arrow keys** - rotate / move
- **Click an adjacent cube** - push it
- **Difficulty buttons** - Easy, Medium, Hard

## Tips

Count moves before each push rather than after. Because a block can usually be shoved back the way it came, an apparently wasteful setup is often cheaper than the alternative that looks tighter.

## Open Source & License

MIT License It is integrated here as a self-hosted build, running entirely in your browser
from `/games/hexahedral/` with no external services.

- Original source: <https://github.com/mminer/hexahedral>
