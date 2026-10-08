---
title: "Mario HTML5"
slug: "mario-html5"
description: "A from-scratch Super Mario Bros. in the browser, built on a custom Enjine engine with no game library."
category: "action"
tags: ["mario", "platformer", "retro", "enjs", "canvas", "open source"]
thumbnail: "/games/mario-html5/thumbnail.svg"
---

# Mario HTML5

Mario HTML5 is a recreation of Super Mario Bros. by **robertkleffner**, notable for what it is *not* using: there is no game engine and no framework. The whole thing runs on **Enjine**, a small custom engine split into tidy modules - `core`, `gameCanvas`, `keyboardInput`, `resources`, `drawableManager`, `sprite`, `animatedSprite`, `camera` and more.

It is released into the public domain, which makes it the most permissively licensed Mario homage in this collection and a genuinely useful reference for building a platformer from first principles. Graphics and audio are recreated by hand; the physics, sprite state machines, camera scrolling and level scripting are all visible in the source.

## How to Play

1. Run and jump through the level with the arrow keys.
2. Collect coins and stomp Goombas for points.
3. Reach the flagpole at the end of each level.
4. Hit question blocks from below for power-ups.

## Controls

- **Arrow keys** or **A / D** - move
- **Space** or **Up** - jump
- **Down** - crouch
- **Shift** - run

## Tips

Hold down while moving to build momentum before a jump - this engine has real inertia, and Mario's jump distance is almost entirely a function of speed at take-off.

## Open Source & License

Public domain (Unlicense) It is integrated here as a self-hosted build, running entirely in your browser
from `/games/mario-html5/` with no external services.

- Original source: <https://github.com/robertkleffner/marioHTML5>
