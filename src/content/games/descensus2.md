---
title: "Descensus II"
slug: "descensus2"
description: "A one-touch physics puzzler. Drag bars into place to roll a ball past spinning saws and onto the ground."
category: "puzzle"
tags: ["physics", "puzzle", "box2d", "pixi", "touch", "open source"]
thumbnail: "/games/descensus2/thumbnail.svg"
---

# Descensus II

Descensus II is a 2D physics puzzle by **Tom W Hall** built on **Box2D** for the simulation and **PixiJS** for the rendering. A single ball must reach the ground, but between it and the floor are spinning saws, moving bars and destructible terrain.

The only control is the ability to draw and drag new bars into the world. Anything you draw is a real rigid body, so it will hold weight, tip under load, and stay where you leave it - the game is really about building reliable structures rather than aiming. Scores are tracked per level for both attempts and time.

## How to Play

1. Drag on the screen to draw a solid bar.
2. Position the bar so the ball rolls past the saws.
3. Let the ball come to rest on the ground to finish the level.
4. Fewer strokes and less time scores better.

## Controls

- **Drag with mouse or finger** - draw a new bar
- **Space** - next level
- **R** - retry

## Tips

A bar drawn near the ball's landing point does more work than one drawn far upstream. Build short and high rather than long and low - long bars deflect unpredictably once they tip.

## Open Source & License

MIT License It is integrated here as a self-hosted build, running entirely in your browser
from `/games/descensus2/` with no external services.

- Original source: <https://github.com/TomWHall/Descensus2>
