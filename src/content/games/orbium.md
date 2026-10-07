---
title: "Orbium"
slug: "orbium"
description: "A one-touch marble puzzle for the browser, built with vanilla JavaScript and canvas. Nudge a marble through rotators, teleporters and one-way lanes to reach the dock."
category: "puzzle"
tags: ["orbium", "marble", "puzzle", "one-touch", "canvas", "vanilla-js", "open source"]
thumbnail: "/games/orbium/thumbnail.svg"
---

# Orbium

**Orbium** is a one-touch marble puzzle by Björn Nilsson, originally released
for iOS and now playable in any browser. You are a marble on an isometric
tiled field. Tapping nudges you forward — and everything else on the board is
a machine that reacts to you: rotators that swing you sideways, teleporters
that jump you across the map, one-way lanes that only let you pass a certain
direction, counters, clocks and stops.

It is written in plain JavaScript against an HTML5 canvas — no engine, no
framework, no build step.

## How to Play

1. Pick a level from the **LEVELS** menu (or press **MENU**).
2. Tap the marble to nudge it. Momentum carries it until something stops it.
3. Read the field: blue rotators turn you, teal rings teleport you, striped
   lanes are one-way.
4. Reach the **exit dock** on each level.
5. Press **EDIT** to build your own field from the same parts.

## Controls

- **Tap / click the marble** — nudge it in the direction it is facing
- **Arrow keys** — nudge in a specific direction
- **PREV / NEXT** — step through the level set
- **PLAY** — start the current level
- **MENU** — back to the level list
- **EDIT** — level editor
- Touch controls appear automatically on touch devices

## Tips

- Rotators move you regardless of your facing — plan the whole cell chain,
  not just the next tap.
- The clock mechanism advances on its own schedule, so some cells are only open
  for a beat. Waiting is often faster than tapping.
- Progress is stored per-level, so grinding one difficult level does not reset
  the others.

## Save Data

Orbium stores your per-level progress in your browser's **localStorage**.
Clearing site data will reset it.

## Open Source & License

Orbium was created by **Björn Nilsson** and is licensed under the
**GNU General Public License v2.0 (GPL-2.0)**.

- Original game source: <https://github.com/bni/orbium>
- Original live build: <https://bjornri.github.io/Orbium/>

This integration self-hosts the GPL-2.0 build so it runs entirely in your
browser. The upstream license text ships unmodified alongside the game, and the
build is otherwise byte-for-byte identical to upstream.