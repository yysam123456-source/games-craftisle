---
title: "Zoko"
slug: "game-off-2012-puzzle"
description: "Sokoban in three dimensions. Push every crate onto its platform, in as few steps as you can manage."
category: "puzzle"
tags: ["sokoban", "3d", "webgl", "puzzle", "open source"]
thumbnail: "/games/game-off-2012-puzzle/thumbnail.svg"
---

# Zoko

Zoko is a 3D reinterpretation of **Sokoban** by **Samuel Nilsson and Sebastian Viklund**, entered in GitHub Game Off 2012. The rule is the familiar one: every crate has to be pushed onto a marked platform, and boxes can only be pushed, never pulled.

What makes it a genuine rethink rather than a port is the third dimension - you can walk around a cluster of boxes, approach from any side, and push a row of them in one sweep. The camera orbits freely so a puzzle that looks walled off from one angle is often trivially solvable from another. Twelve levels, a step counter and a highscore table track your best run.

## How to Play

1. Walk to the far side of a crate to push it toward a platform.
2. Push every crate onto a marked platform.
3. Use the camera to find an approach you cannot see from the default angle.
4. Beat your step count on the level select.

## Controls

- **Arrow keys** - move / rotate
- **Click a crate face** - push that direction
- **Mouse drag** - orbit the camera
- **R** - reset level

## Tips

Count steps before you commit to a push. A crate pushed into a corner is unrecoverable and costs you a full reset, so the last crate in a level is usually the one that deserves the longest think.

## Open Source & License

No license file in upstream repository It is integrated here as a self-hosted build, running entirely in your browser
from `/games/game-off-2012-puzzle/` with no external services.

- Original source: <https://github.com/lulea/game-off-2012>
