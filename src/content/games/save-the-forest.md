---
title: "Save The Forest"
slug: "save-the-forest"
description: "A 13 KB js13kGames entry. Race a wildfire through a forest, extinguish burning trees, and keep the burn count low before the fire front closes in."
category: "arcade"
tags: ["fire", "forest", "js13kgames", "canvas", "arcade", "open source"]
thumbnail: "/games/save-the-forest/thumbnail.svg"
---

# Save The Forest

**Save The Forest** is a 2013 entry in the **js13kGames** competition — a
yearly challenge to make a complete game in 13 KB of JavaScript. The entire
game, sound effects included, fits in about 30 KB minified.

You play a fire warden racing a wildfire across a forest. Dodge the flames,
extinguish burning trees before the fire spreads, and keep the burn count as
low as you can while the fire front closes in from behind.

All the audio is generated at runtime with **jsfxr** (the JSynth "audio chip"),
so there are literally no audio files.

## How to Play

1. Pick a starting point from the menu.
2. Move through the forest and put out burning trees by walking into them.
3. Avoid the flames — they spread and closing one off costs you a life.
4. The fire front advances from behind. Do not get trapped.
5. Survive as long as you can. The burn counter is your score.

## Controls

- **Arrow keys** or **WASD** — move
- Movement is tile-based and turns are instant, so you commit to each step
- Touch controls appear on mobile

## Tips

- Fire spreads fastest along connected trees. Cut gaps by burning nothing in
  a line — walk a corridor first, then work the flames.
- Extinguishing a tree early, far from the front, is far safer than waiting
  until it is surrounded.
- The weather changes as you go. Rain helps you; wind relocates the entire
  front, so re-plan your escape route when it shifts.

## Save Data

Nothing is persisted. Each session starts a fresh run.

## Open Source & License

Save The Forest was created by **Varun Malhotra** and is licensed under the
**MIT License**.

- Original game source: <https://github.com/softvar/save-the-forest>

This integration self-hosts the MIT build so it runs entirely in your browser.
The upstream repository ships a ready-to-serve build in `dist/`, which was
used unmodified — no build step was run and no file was changed. The
unminified `src/` is included alongside it for reference.