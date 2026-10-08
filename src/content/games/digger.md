---
title: "Digger"
slug: "digger"
description: "Classic boulder-collecting cave crawl. Dig down, scoop up every diamond, and beat the clock and the falling rock."
category: "arcade"
tags: ["digging", "boulders", "diamonds", "retro", "open source"]
thumbnail: "/games/digger/thumbnail.svg"
---

# Digger

Digger is a direct remake of the 1983 Commodore 64 classic, by **Lutz Roeder**, built entirely in JavaScript on a 2D canvas. The entire game - engine, sprites, sound and level data - is inlined into `index.html`, and its images and sounds are loaded from a hidden `.resources/` folder.

The rules are exactly the original: you are a digger at the surface of a field of dirt, and every pass through it loosens loose boulders that fall and destroy you on impact. Thread the field, collect all the diamonds, and return to the surface before the time runs out. Twelve levels ship with increasing dirt density and boulder traps.

## How to Play

1. Dig left, right and down to carve a path through the dirt.
2. Collect every diamond in the level before anything else.
3. Avoid loose boulders - one landing ends the run.
4. Climb back to the surface to finish the level.

## Controls

- **Arrow keys** - move and dig
- **P** - pause

## Tips

Work the level in a single sweep rather than doubling back. A boulder you pass will not follow you, but one you tunnel underneath directly will drop on your head.

## Open Source & License

No license file in upstream repository It is integrated here as a self-hosted build, running entirely in your browser
from `/games/digger/` with no external services.

- Original source: <https://github.com/lutzroeder/digger>
