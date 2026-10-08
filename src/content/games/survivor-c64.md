---
title: "Survivor"
slug: "survivor-c64"
description: "A Commodore 64 BASIC remake of Defender, rendered as an authentic green-screen terminal session."
category: "arcade"
tags: ["defender", "c64", "retro", "basic", "terminal", "open source"]
thumbnail: "/games/survivor-c64/thumbnail.svg"
---

# Survivor

Survivor is a remake of the 1982 Commodore 64 classic *Defender* by **Scott Schiller**, presented as an authentic C64 session: it boots into a green-screen BASIC prompt, reports its free bytes, and types a `LOAD"SURVIVOR-2012",8,1` before searching for the program.

That framing is the whole joke and it is done properly - the loading sequence, the memory report and the blinking cursor are all reproduced. Underneath, the game is a real, working Defender: you fly a low-fighter over a scrolling landscape, rescue stranded humans, and shoot the descending waves before they reach your base. Written as a C64-style BASIC listing, which is a remarkable thing to see run in a modern browser.

## How to Play

1. Fly your ship with the arrow keys.
2. Shoot the descending aliens with space.
3. Rescue the humans before they are taken.
4. Protect your base for as long as you can.

## Controls

- **Left / Right** - move
- **Space** - fire
- **Arrows** - land and take off

## Tips

Rescuing humans is worth more than shooting aliens. A single rescue repopulates the surface, and a surface with humans on it gives you the points that let you outlast a bad wave - shooting everything usually means never landing.

## Open Source & License

Custom in-file notice (see license.txt) It is integrated here as a self-hosted build, running entirely in your browser
from `/games/survivor-c64/` with no external services.

- Original source: <https://github.com/scottschiller/SURVIVOR>
