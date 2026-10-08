---
title: "Space Shooter"
slug: "space-shooter-cf"
description: "A neon arcade shooter with linked volume controls, and an optional second screen for your phone."
category: "arcade"
tags: ["shooter", "neon", "arcade", "webgl", "open source"]
thumbnail: "/games/space-shooter-cf/thumbnail.svg"
---

# Space Shooter

Space Shooter is a neon-styled arcade shooter by **Couchfriends**, rendered with WebGL and shipped as a small JavaScript game with a bundled asset pipeline.

It has an unusual feature: it can pair with a phone or tablet on the same network as a second screen and controller, so you get an extra display for the game. The phone client is loaded from the vendor's own API, which is bundled here so the game runs with no external dependency. On-screen and keyboard volume controls are always available, with **M** to mute and **+** / **-** to adjust.

## How to Play

1. Move with the arrow keys or WASD.
2. Fire to destroy the incoming ships.
3. Survive as long as you can.
4. Optionally open the game URL on a phone to use it as a second screen.

## Controls

- **Arrow keys** or **WASD** - move
- **Space** - fire
- **M** - mute
- **+** / **-** - volume up / down

## Tips

Survival beats aggression. The enemy patterns are dense enough that shooting moves you stop covering ground, and the wave timer only ever punishes the player who stops moving.

## Open Source & License

MIT License It is integrated here as a self-hosted build, running entirely in your browser
from `/games/space-shooter-cf/` with no external services.

- Original source: <https://github.com/Couchfriends/Space-Shooter>
