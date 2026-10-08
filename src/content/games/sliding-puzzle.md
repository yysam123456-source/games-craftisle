---
title: "Sliding Puzzle"
slug: "sliding-puzzle"
description: "The 15-puzzle, scored against the clock. Shuffle, solve, and race the stopwatch."
category: "puzzle"
tags: ["sliding", "timed", "classic", "phaser", "casual", "open source"]
thumbnail: "/games/sliding-puzzle/thumbnail.svg"
---

# Sliding Puzzle

Sliding Puzzle is a browser implementation of the classic 15-puzzle by **GameDolphin**, where fifteen numbered tiles share a space with one blank and the only legal move is sliding a tile into it.

Scored against a running stopwatch, it turns a solitary puzzle into a race against yourself - the optimal solution is well known but requires real planning to find while a clock is running. The game is built on the same Phaser + generated-asset stack as the author's other entries, and the same set of puzzles will make a familiar pattern quickly become muscle memory.

## How to Play

1. Slide a tile into the empty space to move it.
2. Arrange all fifteen tiles in ascending order.
3. Beat your best time.
4. Use a hint if you get truly stuck.

## Controls

- **Click / tap** - slide an adjacent tile
- **Arrow keys** - move the blank
- **N** - new puzzle

## Tips

Solve the bottom row and the right column first and treat them as a frame you do not touch. Everything else is then a smaller and far more tractable puzzle than the full 15.

## Open Source & License

No license file in upstream repository It is integrated here as a self-hosted build, running entirely in your browser
from `/games/sliding-puzzle/` with no external services.

- Original source: <https://github.com/gamedolphin/sliding_puzzle>
