---
title: "Roguish"
slug: "roguish"
description: "A turn-based roguelike dungeon crawler rendered with EaselJS on canvas. Explore a procedural dungeon, manage up to four heroes, and recover the mythic treasure chest — or die trying."
category: "action"
tags: ["roguish", "roguelike", "dungeon", "turn-based", "easeljs", "canvas", "open source"]
thumbnail: "/games/roguish/thumbnail.svg"
---

# Roguish

**Roguish** is a turn-based roguelike dungeon crawler by Cam Henlin. You and up
to three friends (hot-seat, or solo) descend into a procedurally populated
dungeon rendered with **EaselJS** on an HTML5 canvas. Fog of war hides most of
the map; enemies move on their own schedule; and the only goal is stated in a
single line of flavour text:

> Recover the mythic treasure chest or die trying!

There are four dungeon levels — the surface, and three descending floors —
plus a set of ancient maps you can replay instead of the random ones.

## How to Play

1. Enter how many players you want (1–4) and give each one a name.
2. Read your mission, then press **ok**.
3. Move on the grid, bump into things to attack them, and open chests.
4. Descend the stairs when you are ready for the next floor.
5. Get to the treasure on the deepest level before your health runs out.

## Controls

- **Arrow keys / WASD** — move or attack in that direction
- **Click** a tile — move toward it (pathfinding)
- **Enter** — confirm an action or descend
- **Tab** — cycle through your party members
- **Esc** — open the in-game menu
- The hamburger button in the top-left returns to the main menu

## Tips

- Health does not regenerate between floors by default — treat potions as
  currency, not spare change.
- Enemies announce themselves before they strike. Stepping adjacent to one
  locks you into an exchange, so bump only when you are ready.
- The treasure chest is a single tile on the final map. Clear the level first
  if your party is healthy; grab it early if it is not.

## Save Data

Nothing is persisted. Each session rolls a fresh dungeon.

## Open Source & License

Roguish was created by **Cam Henlin** and is licensed under the
**BSD 3-Clause License**.

- Original game source: <https://github.com/CamHenlin/Roguish>
- Original live build: <https://camhenlin.github.io/Roguish/>

This integration self-hosts that build so it runs entirely in your browser. The
only change was removing the 5.9 MB Closure Compiler jar used to regenerate the
bundle; the prebuilt game itself, its maps, sprites and fonts are unchanged.