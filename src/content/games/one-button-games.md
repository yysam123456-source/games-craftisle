---
title: "One Button Games"
slug: "one-button-games"
description: "Two curated one-button games built with crisp-game-lib. REBIRTH and COLOR ROLL — press, hold, or double-tap. That's the entire control scheme."
category: "arcade"
tags: ["one button", "crisp-game-lib", "arcade", "minimal", "pixi.js", "open source"]
thumbnail: "/games/one-button-games/thumbnail.svg"
---

# One Button Games

**One Button Games** is a collection built with
[crisp-game-lib](https://github.com/abagames/crisp-game-lib), a tiny
JavaScript game library where you play with a single input: **press**, **hold**,
or **double-tap**. Every game renders to a fixed virtual screen and scales to
any display.

This build ships two curated entries from the collection:

- **REBIRTH** — loads automatically
- **COLOR ROLL** — load it with `index.html#colorroll`

To switch games inside the embed, load the page with the other game's name as
the hash. The engine, the PixiJS renderer, and the sound synthesis all come from
the same pinned library version the upstream site uses.

## How to Play

1. Press anywhere to start the selected game.
2. Learn the single verb: a quick press, a held press, or a double-tap.
3. Most of these games are about timing one action against a pattern that is
   already running. Watch for a beat before you act.

### REBIRTH

A shape pulses at the centre of the screen. Press to fire, and time your shots
so they land exactly as the shape re-forms. Holding extends your shot. Clear
the pattern, and it speeds up.

### COLOR ROLL

Coloured blocks roll across the field. Press to roll yourself into the colour
that matches the one ahead — mismatches cost you. It is a colour-matching
reflex test disguised as one button.

## Controls

- **Click / tap / Space / Z** — the single action (varies per game)
- **Double-tap** — an alternate action some games use
- Everything is also playable on touch

## Tips

- In a one-button game the pattern is always on screen and always visible.
  Stop watching your own avatar and start reading the world — the answer is
  almost never "press now".
- Both games reward committing slightly early over reacting late. Late input
  is always wrong; early input is sometimes recoverable.
- The library's `Space` and `Z` bindings both work, so you can play with
  whichever hand is on the mouse.

## Save Data

Nothing is persisted. Each load starts fresh.

## Open Source & License

One Button Games was created by **ABA Games** and is licensed under the
**MIT License**.

- Game collection source: <https://github.com/abagames/crisp-game-lib-games>
- Original live build: <https://abagames.github.io/crisp-game-lib-games/>
- The engine: <https://github.com/abagames/crisp-game-lib>

This integration self-hosts that build so it runs in your browser. Both game
sources are byte-for-byte unmodified; only the entry page was rewritten so the
default game loads without a query string. The upstream MIT license text ships
alongside the game.