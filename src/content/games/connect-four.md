---
title: "Connect Four"
slug: "connect-four"
description: "The classic drop-and-connect strategy game against an AI opponent, rendered on canvas. The AI plays minimax with alpha-beta pruning and a tuned evaluation function."
category: "casual"
tags: ["connect four", "connect 4", "strategy", "minimax", "ai", "canvas", "open source"]
thumbnail: "/games/connect-four/thumbnail.svg"
---

# Connect Four

**Connect Four** is the classic two-column drop-and-connect strategy game,
played against an AI opponent on an HTML5 canvas. Drop a disc into one of
seven columns; it falls to the lowest free row; the first player to line up
four of their discs — horizontally, vertically or diagonally — wins.

The opponent is **minimax with alpha-beta pruning** over the 7×6 board. Its
evaluation function is hard-coded and weighs centre-column control, immediate
threats and blocking moves, so it plays a strong game without opening
deliberately. It will not always pick the theoretically best move.

## How to Play

1. Click a column (or use the number keys) to drop your disc.
2. Watch the AI think — it replies in under a second at normal depth.
3. Connect four to win. Fill the board with no winner and it is a draw.
4. Use **Undo** to take back a move, or **New game** to restart.

## Controls

- **Click a column** — drop a disc there
- **1 – 7** — drop into the matching column from the keyboard
- **Undo** — take back the last move
- **New game** — restart
- **Reset** — clear the board and the win indicator

## Tips

- The centre column is worth more than any other because every line that runs
  through it also runs through more winning combinations. If the AI gives you
  a free turn there, take it.
- Play threats, not potential. A disc that completes four wins; a disc that
  completes three and has an open end on both sides forces the AI to answer
  and loses you nothing.
- Set up two simultaneous threats and the AI cannot block both. Double threats
  beat search depth.
- Undo is unlimited. If you are analysing rather than playing, use it freely.

## Save Data

Nothing is persisted. A page reload starts a new game.

## Open Source & License

Connect Four (`c4`) was created by **Kenrick** and is licensed under the
**MIT License**.

- Original game source: <https://github.com/kenrick95/c4>
- Original live build: <https://kenrick95.github.io/c4/>

This integration self-hosts that build so it runs entirely in your browser. It
was compiled from the upstream monorepo with the upstream toolchain; the only
build flag changed was making Vite emit a relative asset base so the game works
from its embedded path. The optional online-play server component is not
included, since this build is single-player against the AI.