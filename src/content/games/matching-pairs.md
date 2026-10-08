---
title: "Matching Pairs"
slug: "matching-pairs"
description: "A memory game scored on time, not mistakes. Clear all pairs as fast as you can before the clock does."
category: "puzzle"
tags: ["memory", "timed", "pairs", "phaser", "casual", "open source"]
thumbnail: "/games/matching-pairs/thumbnail.svg"
---

# Matching Pairs

Matching Pairs is a speed-memory game by **GameDolphin**. A grid of face-down shapes is dealt out and you must pair them - but the score is the timer, not the move count, so the pressure is entirely on speed.

The board grows every level, from 4x2 up to 6x2, and the timer never resets. What makes it interesting rather than merely stressful is that a failed pair does not reset anything - it just costs you time - so the optimal strategy is to commit to a guess the instant you have a partial match rather than hunting for a certainty. Built with Phaser, with generated music and original shape art.

## How to Play

1. Click two tiles to flip them and reveal the shape underneath.
2. Match identical pairs to clear them from the board.
3. Clear the whole board before the timer runs out.
4. Each completed level deals a larger grid.

## Controls

- **Mouse / touch** - click a tile to flip it
- **M** - toggle music
- **Back button** - return to the menu

## Tips

Do not hunt for certainty. With a running clock the expected value of guessing a known shape immediately is far higher than the cost of a mistake, which costs you only a second.

## Open Source & License

MIT License It is integrated here as a self-hosted build, running entirely in your browser
from `/games/matching-pairs/` with no external services.

- Original source: <https://github.com/gamedolphin/matching-pairs>
