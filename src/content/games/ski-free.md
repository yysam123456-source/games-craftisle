---
title: "Ski Free"
slug: "ski-free"
description: "A JavaScript port of the 1984 Apple II classic. Ski down an endless procedural slope — and when you go far enough, the yeti starts chasing you."
category: "arcade"
tags: ["ski free", "endless runner", "canvas", "retro", "classic", "open source"]
thumbnail: "/games/ski-free/thumbnail.svg"
---

# Ski Free

**Ski Free** is a JavaScript port of Chris Pirih's 1984 Apple II classic, by
Daniel Hough. You ski down an endless procedurally generated slope, jumping
rocks and trees, building speed — and if you make it far enough down the
mountain, a **yeti** appears and starts chasing you.

It is a faithful reimplementation in modern JavaScript: same slope, same
sprites, same jingle, same one-hit fatal jump. The original was Apple II
shareware from 1984 and is now in the public domain.

## How to Play

1. The slope descends automatically. You only control direction and jumps.
2. Press **space** (or tap) to jump.
3. Hold **down** to tuck — you go faster, but you cannot steer while tucked.
4. Rocks and trees are obstacles. Hit one at speed and you crash.
5. The further you get, the faster it goes. The yeti shows up after a set
   distance and will not stop.

## Controls

- **← →** or **A / D** — steer left and right
- **↓** or **S** — tuck for speed
- **Space** — jump
- **Touch** — tap to jump, drag left/right side to steer

## Tips

- Tuck on the straights, stand up before the trees. Speed is only useful if
  you are still pointed at empty snow.
- The slope scrolls faster the further you descend, so late in a run your
  reaction window is genuinely short. Short hops beat long ones.
- The yeti does not despawn. Once it is out, the only question is how far you
  get before you clip something.

## Save Data

Nothing is saved. The run ends when you crash and you start again.

## Open Source & License

Ski Free.js was created by **Daniel Hough** and is licensed under the
**MIT License**.

- Original game source: <https://github.com/basicallydan/skifree.js>
- Original live build: <https://basicallydan.github.io/skifree.js/>

This integration self-hosts the MIT build so it runs entirely in your browser.
The prebuilt bundle `dist/skifree.js` is byte-for-byte unmodified — no rebuild
was needed. Only the page's Google Analytics block was removed.

The original *SkiFree* was created by Chris Pirih and published as Apple II
shareware by Micro Fun in 1984; it is in the public domain. This port is an
independent reimplementation and is not affiliated with the original publisher.