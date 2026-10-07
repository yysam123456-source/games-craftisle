---
title: "Swap"
slug: "swap"
description: "A turn-based grid puzzler with a roguelike twist — every tile you step on swaps with an adjacent one, so the floor rearranges under you as you plan."
category: "puzzle"
tags: ["swap", "grid", "turn-based", "roguelike", "ai", "canvas", "open source"]
thumbnail: "/games/swap/thumbnail.svg"
---

# Swap

**Swap** is a turn-based grid puzzler with a roguelike twist. You push and pull
your character around a tile grid, but **every tile you step on swaps with an
adjacent one** — so the floor itself rearranges under you as you plan your
route.

Enemies move on their own schedule, and the AI in the game's source plans
several moves ahead rather than reacting to you. That combination — a board
that will not hold still and an opponent that will not improvise — is what
makes each level a small deduction rather than a fight.

Levels ship with the game, and any of them can be loaded directly by putting
its number in the URL hash: `#3` opens level 3.

## How to Play

1. Move onto a tile and it swaps with a neighbour — so think two steps ahead
   for every step you take.
2. Use that to reposition the enemies, to open a path, or to line yourself up
   with a target.
3. Enemies act after each of your turns. Bait them into bad positions by
   rearranging the board beneath them.
4. Clear the level without touching an enemy.

## Controls

- **Arrow keys** or **WASD** — move (and trigger the swap)
- **Reset** — restart the current level
- **Skip** — force-complete the level (useful for inspecting later ones)
- **Speaker icon** — mute or unmute the soundtrack
- Touch devices get an on-screen d-pad

## Tips

- Every swap is reversible. If a move made things worse, the move back undoes
  it exactly — so there is no such thing as a lost position, only a slower one.
- Enemies path through the rearranged board, not the one you remember. After
  two or three swaps, their route is no longer where it was.
- Some levels are unsolvable by direct approach and require using swaps to move
  a hazard rather than yourself. Look for what you can rearrange, not what you
  can reach.

## Save Data

The current level is stored in your browser's **localStorage**. Clearing site
data will reset it.

## Open Source & License

Swap was created by **Noah Moroze** and is licensed under the
**Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**.

- Original game source: <https://github.com/nmoroze/swap>
- Original live build: <https://nmoroze.github.io/swap/>

This integration self-hosts that build so it runs entirely in your browser. The
build is byte-for-byte identical to upstream — no file was modified — and the
complete CC BY-SA 4.0 license text ships alongside it.