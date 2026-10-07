---
title: "Parity"
slug: "parity"
description: "A 3×3 numbers puzzle in plain jQuery. Select a cell and push it up or down one power of two until every row, column and corner adds up to the same total."
category: "puzzle"
tags: ["parity", "numbers", "puzzle", "jquery", "logic", "open source"]
thumbnail: "/games/parity/thumbnail.svg"
---

# Parity

**Parity** is a 3×3 numbers puzzle built in plain jQuery. Every number on the
board is a **power of two**. You select a cell and push it **up** or **down** one
step — halving it or doubling it.

Your goal is to make **every row, every column and the four corners** add up to
the same total. Because doubling and halving are inverses, the whole board
carries a conserved quantity — and finding that invariant is the game.

Parity ships with a long campaign of hand-designed puzzles in its level data.

## How to Play

1. Click a cell to select it.
2. Use the up and down controls (or the arrow keys) to shift the number one
   power of two up or down.
3. Watch the row and column totals update as you go.
4. When every row, column and the corners match, the level clears.
5. Press **Next level** to continue, or **Reset** to start the current puzzle
   over.

## Controls

- **Click a cell** — select it
- **↑ / ↓** or the on-screen arrows — double or halve the selected number
- **R** or the reset icon — restart the level
- **N** — next level, once solved
- Swipe support is included for touch devices

## Tips

- Start at the corners. They are in two lines at once, so a change there fixes
  two constraints for the cost of one.
- The sum of all nine cells never changes under doubling/halving (a halved cell
  hands its excess to nothing — the total drifts, but the *product* of the
  cells is invariant). If you are stuck, that invariant will tell you which
  moves are even possible.
- Work backwards from the goal. If the target totals require a 16 somewhere,
  that 16 has to survive every move you make.
- Halving a 1 is not allowed — 1 is the floor, not a step.

## Save Data

The current level and your progress are stored in your browser's
**localStorage**. Clearing site data will reset it.

## Open Source & License

Parity was created by **Abe Fehr** and is licensed under the
**MIT License**.

- Original game source: <https://github.com/abejfehr/parity>
- Original live build: <http://abefehr.com/parity/>

This integration self-hosts the MIT build so it runs entirely in your browser.
The game bundle is byte-for-byte unmodified. Only the surrounding page was
edited, to remove the original page's Clay analytics, Facebook SDK, Like
button and AdSense unit, and to fix a root-absolute favicon path.