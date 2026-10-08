---
title: "Coil"
slug: "coil"
description: "A one-button maze game that plays itself while you watch. Draw a circuit to trap the moving dot before it traps you."
category: "puzzle"
tags: ["maze", "one-button", "puzzle", "canvas", "open source"]
thumbnail: "/games/coil/thumbnail.svg"
---

# Coil

Coil is a minimalist one-button puzzle by **Hakim El Hattab**, the creator of *Loop*. On each level a dot patrols a grid; the whole board advances one step whenever you place or remove a wall.

The rule is elegantly counterintuitive: draw a loop to trap the dot and you win, but if the dot escapes into open space you lose. There is no character to move and no timer to beat - the board is entirely deterministic, so a level is always solvable and every move you make is a commitment. Rendered with a subtle particle trail on canvas.

## How to Play

1. Click a cell to add a wall, click it again to remove it.
2. Enclose the patrolling dot in a closed circuit.
3. The board advances one step after every edit, so plan two moves at a time.
4. Clear the level to unlock the next.

## Controls

- **Mouse / touch** - click a cell to toggle a wall

## Tips

The dot moves the instant you finish a wall segment. Work backwards from the dot's next position and place the closing wall one step before it arrives, not on the step it arrives.

## Open Source & License

MIT License It is integrated here as a self-hosted build, running entirely in your browser
from `/games/coil/` with no external services.

- Original source: <https://github.com/leereilly/Coil>
