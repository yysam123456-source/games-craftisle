---
title: "Arashi"
slug: "arashi"
description: "Chain lightning across a scrolling starfield. Every hit you land feeds the next, and the chain is the whole game."
category: "arcade"
tags: ["lightning", "chain", "reflex", "canvas", "open source"]
thumbnail: "/games/arashi/thumbnail.svg"
---

# Arashi

Arashi is an arcade reflex game by **Stephan K**. You control a node that can be pulled along two axes at once - freely, or locked to one axis for precision - and you must chain discharges from one target to the next before the timer runs out.

The tension comes from the movement model: a released shot follows the direction you were last steering, and switching between free and axis-locked aiming mid-chain is what separates a 40-hit run from a 5-hit one. Written in ES5 against a 2D canvas with a custom vector helper library (`vakit`).

## How to Play

1. Pick a target and discharge into it.
2. Chain consecutive hits without letting the timer lapse.
3. Steer while the shot is live to curve the next link.
4. Use axis lock for the last segment to thread tight gaps.

## Controls

- **Mouse** - aim and click to discharge
- **WASD** - steer the shot's direction mid-chain
- **Shift** - toggle axis lock while aiming

## Tips

Hold your movement key through the moment of discharge so the outgoing segment inherits that direction. Free steering curves the chain, but axis lock lands straighter and is worth the extra keystroke on the finishing hit.

## Open Source & License

GNU General Public License v2 It is integrated here as a self-hosted build, running entirely in your browser
from `/games/arashi/` with no external services.

- Original source: <https://github.com/stephank/arashi-js>
