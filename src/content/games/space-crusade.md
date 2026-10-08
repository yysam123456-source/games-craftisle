---
title: "Space Crusade"
slug: "space-crusade"
description: "A vertical Phaser shooter. Hold the line against descending formations and pick off the bonus targets."
category: "arcade"
tags: ["shooter", "phaser", "space", "vertical", "open source"]
thumbnail: "/games/space-crusade/thumbnail.svg"
---

# Space Crusade

Space Crusade is a vertical scrolling shooter by **Loopeex**, built on **Phaser**. Enemy formations descend in waves, and the tension is in deciding when to hold fire on the small ships to line up the larger, worth far more.

The build is structured the Phaser way, with one file per state and per prefab, which makes it a clean reference for how to organise a Phaser project: `Boot` and `Preloader` handle setup and asset loading, `Menu` and `Play` are separate states, and every entity - hero, bullet, laser, enemy, bonus and the game-over and pause panels - is a self-contained prefab. Ships an extra library for screen shake and similar juice.

## How to Play

1. Move your ship to dodge descending enemies.
2. Fire to destroy the formations.
3. Collect the bonus targets for extra points.
4. Clear the wave before the enemies reach you.

## Controls

- **Arrow keys** - move
- **Space** - fire
- **B** - back to menu
- **M** - toggle sound

## Tips

The small ships arrive in formations with a predictable gap. Hold your fire for one rotation and take the whole formation at once, then switch to the large ships - the payoff for patience is disproportionately large.

## Open Source & License

MIT License It is integrated here as a self-hosted build, running entirely in your browser
from `/games/space-crusade/` with no external services.

- Original source: <https://github.com/Loopeex/space-crusade>
