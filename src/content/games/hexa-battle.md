---
title: "Hexa Battle"
slug: "hexa-battle"
description: "A turn-based tactics game on a hex grid, written in TypeScript with React. Command your squad with unit actions against an AI that plans several moves ahead."
category: "strategy"
tags: ["hexa battle", "tactics", "hex grid", "typescript", "react", "ai", "open source"]
thumbnail: "/games/hexa-battle/thumbnail.svg"
---

# Hexa Battle

**Hexa Battle** is a turn-based tactics game on a hex grid, written in
TypeScript with React 15. You command a squad against an AI opponent, moving
units and using their abilities to hold territory. Both sides act in turn, so
every position you create has an answer — the whole game is about creating
positions where the answer is bad for you.

The whole client — engine, AI, level content and interface — ships as a single
bundle. Hex movement uses the six neighbouring directions rather than four,
which changes blocking and chokepoints completely.

## How to Play

1. Pick a level from the campaign list.
2. Click one of your units to select it. Its possible destinations highlight.
3. Click a highlighted hex to move, or pick an action from the unit's ability
   list.
4. End your turn and let the AI respond.
5. Clear the enemy units to advance.

## Controls

- **Click a unit** — select it
- **Click a highlighted hex** — move there
- **Click an ability** — use the selected unit's ability
- **End turn** — pass to the AI
- Mouse and touch are both supported

## Tips

- On a hex grid, a unit with six neighbours is harder to contain than one with
  four. An enemy that thinks it is boxed in usually is not.
- Elevation and faction ownership both matter — contesting a hex the enemy
  already holds is often stronger than taking an empty one.
- The AI looks several moves ahead. Chasing it with a single unit is a losing
  trade; trade into favourable ground instead.

## Save Data

Nothing is persisted. Each session starts at the first level.

## Open Source & License

Hexa Battle was created by **Giacomo Tagliabue** and is licensed under the
**MIT License**.

- Original game source: <https://github.com/itajaja/hb>

This integration self-hosts that build so it runs entirely in your browser. It
was compiled from the upstream monorepo with the upstream toolchain (webpack 2
plus ts-loader). The only change was making the webpack `publicPath` relative
so the hashed assets resolve from the game's embedded path, and dropping the
production source map. The game bundle itself is the unmodified production
output.