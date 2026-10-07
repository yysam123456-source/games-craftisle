---
title: "Cube Composer"
slug: "cube-composer"
description: "A puzzle game about functional programming, written in PureScript. Drag pure functions into a program pane and compose them until they turn the input grid into the goal."
category: "puzzle"
tags: ["cube composer", "functional programming", "purescript", "puzzle", "logic", "open source"]
thumbnail: "/games/cube-composer/thumbnail.svg"
---

# Cube Composer

**Cube Composer** is a puzzle game about **functional programming**. You are
given an input grid of coloured cubes and a toolbox of pure functions —
`map`, `filter`, `rotate`, `fold`, and friends. Drag them into the program
pane, compose them in an order, and press run. If your program turns the input
into the goal grid, you solve the level.

Ninety levels across nine chapters teach the idea one transformation at a time,
starting with a single `map` and ending with folds that reshape whole rows and
columns at once.

The entire game — engine, levels, renderer, UI and persistence — is written in
**PureScript** and compiled to JavaScript.

## How to Play

1. Pick a level from the **Choose level** dropdown.
2. Read the **Goal** panel — it shows the grid your program must produce.
3. Drag a transformation from **Available** into the **Program** pane.
4. Reorder the steps by dragging them. Order changes the result: a `filter`
   before a `map` sees a different grid than the reverse.
5. The program runs live. Match the goal to clear the level.
6. Press **Reset** to empty the program, **N** to advance when solved.

## Controls

- **Drag and drop** — add and reorder transformations
- **Click a program step** — remove or adjust it
- **R** — reset the program
- **N** — next level (enabled once solved)
- Mouse and touch are both supported

## Tips

- Read the goal as a diff, not a picture. "Every blue becomes yellow" is a
  `map`. "Blues disappear" is a `filter`. Most levels are one or two of these.
- `map` and `filter` do not commute. If a level has both, the order is the
  puzzle — try the other one before assuming your function is wrong.
- Rotations operate on rows or columns as units, which is why some later levels
  seem unsolvable until you spot that the whole board needs turning first.
- If a program looks right but the result is not, add a step at the *end* to
  clean up whatever your chain left behind. Chains compose.

## Save Data

Your progress and current program are stored in your browser's
**localStorage**. Clearing site data will reset it.

## Open Source & License

Cube Composer was created by **David Peter** and is licensed under the
**MIT License**.

- Original game source: <https://github.com/sharkdp/cube-composer>
- Author's live build: <https://david-peter.de/cube-composer/>

This integration self-hosts that build so it runs entirely in your browser. The
upstream project pins a 2017-era PureScript compiler whose library dependencies
no longer resolve to compatible versions, so a from-source rebuild is no longer
reproducible; this build therefore uses the author's own published build
artifacts. Those, together with `index.html` and the images, are unmodified
apart from removing the original page's Google Analytics and GitHub star
button.