---
title: "Beatrix"
slug: "beatrix"
description: "A rhythm puzzle game built with Phaser. Tap on the beat to rotate, flip and transform tiles until each musical phrase resolves into the target pattern."
category: "arcade"
tags: ["beatrix", "rhythm", "music", "phaser", "puzzle", "open source"]
thumbnail: "/games/beatrix/thumbnail.svg"
---

# Beatrix

**Beatrix** is a rhythm puzzle game by Christopher Xong, built with
**Phaser 2**. A metronome track plays and a target pattern appears on the grid.
Your job is to tap *on the beat* to rotate, flip and transform the tiles so
that the board resolves into the target by the end of each musical phrase.

Miss the beat and the transform does not register. Hit it consistently and the
grid falls into place.

All of the audio is **synthesised at runtime with the Web Audio API** — there
are no recorded music or sound-effect files. The `audio/` folder holds short
generated sample data used by the drum voices.

## How to Play

1. Press the play button to start level 1.
2. Watch the beat indicator — it pulses on the downbeat.
3. Tap **space** (or click) precisely on each beat to apply your queued
   transform.
4. Match the target pattern shown at the top of the screen before the phrase
   ends.
5. Clear the level to advance. Four levels ship with the game, each busier
   than the last.

## Controls

- **Space** — tap the beat / apply the transform
- **Mouse click** — same as space
- Touch devices: tap the screen on the beat

## Tips

- Listen for a couple of bars before you start transforming. Once you can
  predict where the downbeat falls, the transforms land without fail.
- Each level adds a new tile type. Level 3 and 4 are about juggling two
  different transforms in the same phrase — count the beats out loud for the
  first few passes.
- Browsers block audio until you interact with the page, so the first click
  that starts the level is also what unlocks the soundtrack.

## Save Data

Nothing is persisted between sessions — each level starts fresh.

## Open Source & License

Beatrix was created by **Christopher Xong** and is licensed under the
**MIT License**.

- Original game source: <https://github.com/cxong/Beatrix>
- Original live build: <https://cxong.github.io/Beatrix/>

This integration self-hosts the MIT build so it runs entirely in your browser.
The build is byte-for-byte identical to upstream; the upstream license text
ships alongside it.