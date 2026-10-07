---
title: "Diablo JS"
slug: "diablo-js"
description: "A minimal-code isometric action-RPG on a single HTML5 canvas. Fight monsters, grab loot, and survive — written from scratch with no engine and no dependencies."
category: "action"
tags: ["diablo", "isometric", "action-rpg", "canvas", "vanilla-js", "open source"]
thumbnail: "/games/diablo/thumbnail.svg"
---

# Diablo JS

**Diablo JS** is an isometric action-RPG in the Diablo style, written against a
single HTML5 `<canvas>` with **no engine and no dependencies**. The entire game
— map data, the combat loop, the AI, the loot tables, the sprite animation
driver — lives in about 900 lines of `diablo.js`.

Every monster, floor tile, wall, barrel, potion and coin is an isometric sprite
sheet on disk. Sixteen monster types are referenced by the AI table; the rest
of the art budget went into the dungeon itself.

## How to Play

1. Move with the **arrow keys** or **WASD**.
2. Walk into a monster to attack it. Positioning is the whole combat system —
   there is no dodge button.
3. Pick up potions, coins and barrels as you go; coins are your score.
4. Survive. Monsters get tougher the deeper you go.

## Controls

- **← → ↑ ↓** or **W A S D** — move and attack
- Movement is grid-relative and interpolated, so the sprite always turns to
  face the way you are going

## Tips

- Attacking is contact-based: bumping an enemy is how you hit it, and bumping
  it is also how it hits you. Retreat to a corridor and make them come to you.
- Barrels break into pickups but also absorb hits — a cheap way to stall a
  monster while you heal.
- Potions drop rarely. Do not spend them on a lucky encounter; bank them for
  the third monster you cannot outrun.

## Save Data

Nothing is saved. Each load starts a fresh run.

## Open Source & License

Diablo JS was created by **mitallast** and is licensed under the
**MIT License**.

- Original game source: <https://github.com/mitallast/diablo-js>

This integration self-hosts that build so it runs entirely in your browser.
`diablo.js` and `index.html` are byte-for-byte unmodified; only the game's
runtime art was shipped, not the upstream sprite-authoring tools and unused
texture working directories.

"Diablo" is a trademark of Blizzard Entertainment. This project is an
independent, non-commercial homage built entirely from scratch — it is not
affiliated with or endorsed by Blizzard and contains no Blizzard assets.