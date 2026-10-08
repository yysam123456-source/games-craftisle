---
title: "Pixel Platformer"
slug: "pixel-platformer"
description: "A compact platformer built on the Entity game engine, with entity-component state driving every actor."
category: "action"
tags: ["platformer", "entity", "component", "pixel", "open source"]
thumbnail: "/games/pixel-platformer/thumbnail.svg"
---

# Pixel Platformer

Pixel Platformer is a small platformer by **Ben D'Angelo** that demonstrates version 0.2.1 of the **Entity** game engine, its author's entity-component framework.

Every actor - the player, the platforms, the pickups - is an Entity composed of independent components, and the game logic that binds them together is a few readable lines. The visual result is deliberately plain, a mid-2010s browser platformer, which makes it a good reference for understanding the engine rather than for its art. A debug build of the engine is loaded alongside the minified one.

## How to Play

1. Run and jump across the platforms.
2. Collect the pickups to score.
3. Avoid the enemies.
4. Reach the end of the level.

## Controls

- **Arrow keys** or **A / D** - move
- **Space** or **Up** - jump
- **R** - restart

## Tips

The engine keeps entity state in plain JavaScript objects, so you can read the player's position and velocity straight out of the console while the game runs. That makes it easy to see exactly what a jump arc is doing frame by frame.

## Open Source & License

No license file in upstream repository It is integrated here as a self-hosted build, running entirely in your browser
from `/games/pixel-platformer/` with no external services.

- Original source: <https://github.com/bendangelo/PixelPlatformer>
