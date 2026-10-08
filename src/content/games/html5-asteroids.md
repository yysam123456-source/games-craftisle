---
title: "HTML5 Asteroids"
slug: "html5-asteroids"
description: "The arcade original rebuilt in a browser. Vector wireframe, thrust, inertia and wrapping screen edges."
category: "arcade"
tags: ["asteroids", "vector", "arcade", "canvas", "open source"]
thumbnail: "/games/html5-asteroids/thumbnail.svg"
---

# HTML5 Asteroids

HTML5 Asteroids is a faithful browser recreation of the Atari arcade vector game by **dmcinnes**. The whole scene is drawn as glowing vector wireframes on a black canvas, with the authentic feel of momentum: your ship keeps drifting after you release the thrust key, rotation is independent of movement, and everything wraps around the screen edge.

Large asteroids break into smaller ones when destroyed, and UFO saucos appear as the waves progress. The codebase is plain ES5 with jQuery 1.4 for the page plumbing, and the sound effects use classic arcade samples. It is a clean, readable reference for anyone building vector-graphics arcade games on canvas.

## How to Play

1. Thrust with the up arrow to move against inertia.
2. Rotate left and right to aim.
3. Fire with space to shoot.
4. Blow up large asteroids to spawn smaller ones.
5. Stay alive as long as you can.

## Controls

- **Left / Right** - rotate
- **Up** - thrust
- **Space** - fire
- **P** - pause
- **M** - mute

## Tips

Drift is your enemy. Tap the thrust key for short corrections rather than holding it, and rotate to face your target early - there is no drag to stop you once you are moving fast.

## Open Source & License

MIT License It is integrated here as a self-hosted build, running entirely in your browser
from `/games/html5-asteroids/` with no external services.

- Original source: <https://github.com/dmcinnes/HTML5-Asteroids>
