---
title: "Genetic Drift"
slug: "genetic-drift"
description: "A 2D physics platformer where you clone yourself. Every duplicate is another body, but only one of you moves at a time."
category: "action"
tags: ["platformer", "physics", "clone", "box2d", "coffeescript", "open source"]
thumbnail: "/games/genetic-drift/thumbnail.svg"
---

# Genetic Drift

Genetic Drift is a 2D platformer by **Dancing Banana Studios** built on **Box2D** and **RequireJS**, with its game logic written in **CoffeeScript**. The hook is the clone: you can duplicate yourself at will, and every clone is a real physical body, so a bridge you build with copies of yourself is also a body that can be pushed, crushed or left behind.

Levels are a mixture of platforming, pressure plates, doors and switches, and the clone count is a resource rather than a convenience - a room that looks impossible is usually solvable with the right body in the right place. It also has a level editor, so the campaign is not the end of it.

## How to Play

1. Move and jump with the arrow keys.
2. Press the clone key to spawn a copy of yourself in place.
3. Walk into pressure plates to open doors.
4. Regroup with the key that pulls your clones to your current position.

## Controls

- **Left / Right** - move
- **Up** - jump
- **J** or **C** - clone
- **K** or **X** - regroup clones
- **E** - clone editor

## Tips

A clone left standing in a doorway is a wall you can build for free. When a route looks blocked, try cloning a body into the gap rather than looking for a jump.

## Open Source & License

No license file in upstream repository (bundled Box2D and boxbox are MIT, from https://github.com/incompl/boxbox) It is integrated here as a self-hosted build, running entirely in your browser
from `/games/genetic-drift/` with no external services.

- Original source: <https://github.com/DancingBanana/genetic-drift>
