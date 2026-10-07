---
title: "Hextris"
slug: "hextris"
description: "An addictive puzzle game inspired by Tetris, played on a hexagonal grid. Rotate, stack, and clear three matching hexes at a time as the waves get faster."
category: "puzzle"
tags: ["hextris", "tetris", "puzzle", "hexagon", "canvas", "open source", "reflex"]
thumbnail: "/games/hextris/thumbnail.svg"
---

# Hextris

**Hextris** is a fast puzzle game by four high-school friends that takes the
familiar Tetris loop and puts it on a **hexagonal grid**. Pieces fall onto a
honeycomb board, rotate around their centre, and stack against the outer ring.
When three adjacent hexes of the same colour line up, they vanish and the
wave advances — and every wave drops faster than the last.

It is written in plain JavaScript and CSS with no framework, no build step,
and no art assets beyond a handful of SVG buttons.

## How to Play

1. Press the **play** button to drop the first piece.
2. Rotate with **←** and **→**; the piece pivots around the nearest hex
   column rather than spinning in place.
3. Press **↓** to slam the piece down one step, or hold it to soft-drop
   faster.
4. Line up three same-coloured hexes — horizontal, or slanted along either
   hex axis — to clear them and score.
5. The game ends when the stack reaches the outer ring. Chase a high score.

## Controls

- **←** — rotate counter-clockwise
- **→** — rotate clockwise
- **↓** — soft drop (hold to accelerate)
- **Space** — drop the piece immediately
- **Mouse / touch** — tap the left or right half of the board to rotate,
  the bottom to soft-drop (Hammer.js is bundled for this)
- **P** or the pause button — pause
- **R** or the restart button — restart

## Tips

- The game speeds up on every wave clear. Bank a high score by playing
  steadily rather than greedily stacking.
- Leaving a flat, even floor matters more than clearing immediately — a lumpy
  stack is what kills you three waves later.
- Hextris saves its high scores in your browser, so your best score survives a
  refresh.

## Save Data

Your high scores are stored in your browser's **localStorage** by the embedded
game. Clearing site data for the site will reset them.

## Open Source & License

Hextris was created by **Logan Engstrom**, **Garrett Finucane**, **Noah Moroze**
and **Michael Yang**, and is licensed under the
**GNU General Public License v3.0 (GPL-3.0)**.

- Original game source: <https://github.com/Hextris/hextris>
- Original live build: <https://hextris.io>

This integration self-hosts the GPL-3.0 build so it runs entirely in your
browser. The upstream license text ships unmodified alongside the game, and the
only changes made were removing the original page's advertising and analytics
code.