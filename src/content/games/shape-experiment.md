---
title: "Shape Experiment"
slug: "shape-experiment"
description: "A minimalist reaction game. A canvas is filled with a solid shape and revealed one pixel at a time — name the shape before the timer runs out."
category: "arcade"
tags: ["shape experiment", "reaction", "reflex", "canvas", "minimal", "open source"]
thumbnail: "/games/shape-experiment/thumbnail.svg"
---

# Shape Experiment

**Shape Experiment** is a minimalist reaction game by Max Irwin. A canvas is
filled with a solid shape — star, circle, triangle, square, pentagon, donut,
bars or diamond — and then revealed **one pixel at a time**. Name the shape
before the timer runs out.

It started life as a crowdsourced perception study, and it still keeps a full
statistical tally: accuracy percentage, best time, average time, and a
per-shape breakdown, all stored in your browser.

## How to Play

1. Press **Begin** on the opening screen.
2. A shape is chosen at random and its canvas is progressively uncovered.
3. Answer as soon as you can recognise it — by clicking the button beneath the
   canvas, or by pressing the number key **1–8**.
4. The result is logged, a new shape starts immediately, and your tally
   updates.

## Controls

- **1 – 8** — answer with the matching shape button (the order is shown under
  the canvas)
- **Click the shape buttons** — the same thing, for mouse and touch
- **Click the result row** — expands a thumbnail of what you guessed
- **Cookies** — opens the privacy note

## Tips

- Partial reveals are genuinely ambiguous: a quarter-circle reads as a bar
  long before it reads as a circle. Commit early on the shapes you know
  rather than waiting for certainty.
- The stars and bars are the hardest at low reveal percentages, because their
  outlines only resolve late. Circle and square are nearly instant.
- Track your per-shape breakdown — most players are far better at polygons
  than they think, and the table will tell you which one is costing you.

## Save Data

Your per-shape results and totals are stored in your browser's
**localStorage**, and every result stays on the page for the session. Clearing
site data will reset the tally.

The original build uploaded every completed drawing and every result to the
research endpoint at `shapex.org`. This self-hosted build keeps the scoring
entirely local and sends nothing — your results are yours.

## Open Source & License

Shape Experiment was created by **Max Irwin** and is licensed under the
**MIT License**.

- Original game source: <https://github.com/binarymax/shape>
- Original live build: <http://shapex.org>

This integration self-hosts the MIT build so it runs entirely in your browser.
The upstream license text ships alongside it. The only changes were removing
the original page's Google Analytics, its Facebook and Twitter widgets, and
the pixel that uploaded your finished drawings to the research server.