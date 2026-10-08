---
title: "Squirts"
slug: "squirts"
description: "You are one blob among many. Dodge the others, absorb what you can, and be the last one moving."
category: "action"
tags: ["blobs", "survival", "particles", "webgl", "open source"]
thumbnail: "/games/squirts/thumbnail.svg"
---

# Squirts

Squirts is a survival game by **Klemen Slavič and Marko Novak** (as *KillerBee*), built on WebGL with a hand-rolled game loop and particle system.

The screen fills with blobs. You steer yours, absorb the ones you can catch, and avoid the ones that are bigger than you. The count in the corner tells you how many are left. There is no map, no power-ups and no timer - just a single arena and an accelerating population, which makes it a very clean test of spatial reading. The MIT-licensed source is a good reference for a small WebGL engine built by hand.

## How to Play

1. Steer your blob around the arena.
2. Absorb smaller blobs to grow.
3. Avoid anything larger than you.
4. Be the last blob still moving.

## Controls

- **Mouse / touch** - steer
- **Space** - burst / dash

## Tips

Growth is not always good. A big blob is a big target, and the arena shrinks relative to everyone as the field fills - stay mid-sized and keep moving rather than farming the small ones until you are the obvious prize.

## Open Source & License

MIT License (stated in the upstream README) It is integrated here as a self-hosted build, running entirely in your browser
from `/games/squirts/` with no external services.

- Original source: <https://github.com/KrofDrakula/squirts>
