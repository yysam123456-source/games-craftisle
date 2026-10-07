---
title: "BitBot"
slug: "bitbot"
description: "A Sokoban-style puzzle-platformer set inside a decaying mainframe. Collect batteries and reboot crashed processors while a corrupt AI hunts you through the dark."
category: "puzzle"
tags: ["bitbot", "sokoban", "platformer", "puzzle", "pixel art", "open source"]
thumbnail: "/games/bitbot/thumbnail.svg"
---

# BitBot

**BitBot** is a Sokoban-style puzzle-platformer set inside a decaying
mainframe. You play a small maintenance robot collecting **batteries** and
**rebooting crashed processors** while a corrupt AI hunts you through the dark.

Every level is a hand-authored grid, so each one is a small, solvable logic
problem rather than a reflex test. Push crates onto the right tiles, route power
to the processors, and do not let the hunter close the distance.

## How to Play

1. Pick a level from the level-select screen.
2. Walk with the arrow keys or **WASD**.
3. Push a crate by walking into it — that is the core Sokoban verb.
4. Collect every battery, then reach the exit. Some levels only reveal the
   exit once the power is restored.
5. Failing means restarting the level. They are short; that is fine.

## Controls

- **← → ↑ ↓** or **W A S D** — move and push
- **R** — restart the level
- **Esc** — back to the menu
- On-screen buttons mirror every action for touch devices

## Tips

- Corners are death. A crate pushed into a corner can almost never be pulled
  back out, so plan the whole push before you commit to it.
- The hunter moves on a fixed schedule, not reactively. Walk a lap of the level
  to learn its route before you start rearranging anything.
- Batteries are never in a push position — grab them on the way past and keep
  your hands free for the crates.

## Save Data

Level progress and your best times are stored in your browser's
**localStorage**. Clearing site data will reset them.

A level editor ships with the game at `editor.html` if you want to build your
own.

## Open Source & License

BitBot was created by **R. E. Cardona-Rivera** and is licensed under the
**MIT License**.

- Original game source: <https://github.com/recardona/BitBot>
- Original live build: <https://recardona.github.io/BitBot/>

This integration self-hosts the MIT build so it runs entirely in your browser.
No game code was modified. To fit the site's size budget the uncompressed WAV
copies of the soundtrack and effects were dropped (Howler falls back to the
identical OGG rips), along with the unused Google Closure Library subtrees and
a developer source map. The full credit list for the bundled libraries is in
`CREDITS.md` next to the game.