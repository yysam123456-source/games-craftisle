---
title: "Zop"
slug: "zop"
description: "A reflex puzzle built with Clay.js. Tap to flip at exactly the right moment — the same one-input framework behind the original Flappy Bird clone."
category: "puzzle"
tags: ["zop", "clay.js", "reflex", "one-button", "timing", "open source"]
thumbnail: "/games/zop/thumbnail.svg"
---

# Zop

**Zop** is a reflex puzzle built with **Clay.js** — the tiny JavaScript
framework originally created behind Google's *Flappy Bird* clone. You have one
input, and the whole game is about when you press it.

The project's own subtitle is a kaomoji: `(╯°□°）╯︵ ┻━┻` — a nod to the
classic table-flip emote, because in Zop you are very much in the mood for
flipping things over.

## How to Play

1. Press to start.
2. One input does one thing: flip.
3. Timing is everything. Press too early and you undershoot; too late and you
   overshoot.
4. Survive as long as you can. The run ends the first time you misjudge it.

## Controls

- **Click / tap / space** — the single flip action
- There are no other controls, by design

## Tips

- Find the rhythm before you try to be clever. Most players lose their first
  few runs purely to inconsistent timing, not to a lack of reaction speed.
- Press on the beat of your own breathing, not on the beat of the animation.
  The animation has a tell; your heartbeat does not.
- Because there is exactly one input, every failure is legible. If you keep
  losing at the same point, you are consistently early or consistently late —
  and only one of those is fixable by slowing down.

## Save Data

Nothing is saved. Each load starts a fresh run.

## Open Source & License

Zop was created by **Zolmeister** and is licensed under the
**MIT License**.

- Original game source: <https://github.com/Zolmeister/zop>
- Original live build: <http://zop.zolmeister.com>

This integration self-hosts that build so it runs entirely in your browser.
The upstream project ships a single fully self-contained `release/index.html`
— Clay.js, the Bower dependencies and the `fetch` polyfill are all inlined — so
no Gulp run, no Bower install, and no source build were needed. No game code
was changed; the only edits were removing the original page's Google Analytics
and Clay analytics blocks. The upstream MIT license text ships alongside it.