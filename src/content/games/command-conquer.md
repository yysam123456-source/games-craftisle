---
title: "Command & Conquer HTML5"
slug: "command-conquer"
description: "A real-time strategy game in the browser: build a base, harvest ore, train tanks and fight off waves of enemy forces."
category: "strategy"
tags: ["rts", "strategy", "base-building", "canvas", "open source"]
thumbnail: "/games/command-conquer/thumbnail.svg"
---

# Command & Conquer HTML5

Command & Conquer HTML5 is a technical proof of concept by **Aditya Ravi Shankar** that recreates the basic working elements of a *C&C*-style real-time strategy game entirely in HTML5 canvas and JavaScript. The graphics and audio are lifted from *C&C: Tiberian Dawn* and remain the property of the original rights holders; the code is what is open here.

You establish a base, use an ore refinery to convert ore into money, spend that money on power plants, barracks and tanks, then defend against incoming enemy forces. It is deliberately small - a handful of units and a single enemy wave type - but the underlying loop (build, gather, tech, attack) is implemented properly rather than faked.

## How to Play

1. Build a power plant first, then an ore refinery.
2. Train units from the barracks as your base develops.
3. Position your tanks at the likely approach vector before the wave lands.
4. Keep gathering ore - income is the real constraint.

## Controls

- **Left click** - select a unit or structure
- **Right click** - move, attack or harvest
- **Ctrl + 1-9** - assign a group to a control slot
- **Hotkeys** - shown on each buildable item in the sidebar

## Tips

Economy wins, not firepower. An early refinery plus a pair of tanks beats an expensive base with nothing to field, because the enemy wave arrives on a timer whether you are ready or not.

## Open Source & License

No license file in upstream repository (the C&C assets remain the property of their original rights holders) It is integrated here as a self-hosted build, running entirely in your browser
from `/games/command-conquer/` with no external services.

- Original source: <https://github.com/adityaravishankar/command-and-conquer>
