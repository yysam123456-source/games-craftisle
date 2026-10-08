---
title: "Simon Clone"
slug: "simon-clone"
description: "The memory game everyone knows, tightened into a speed drill. Repeat the pattern before you run out of time."
category: "puzzle"
tags: ["memory", "simon", "timed", "phaser", "open source"]
thumbnail: "/games/simon-clone/thumbnail.svg"
---

# Simon Clone

Simon Clone is a browser remake of the classic electronic memory game by **GameDolphin**. Four coloured quadrants light up in sequence and you repeat it back; the sequence grows by one step every round until you slip.

What it changes from the toy is the pressure. There is a running clock, so hesitation is itself a failure mode - recognising a four-step pattern and then failing to input it in time costs exactly as much as mis-remembering it. Built with Phaser, with a generated sprite sheet and sound set, and it is a genuinely good test of working memory under mild time pressure.

## How to Play

1. Watch the quadrant sequence play out.
2. Click the quadrants in the same order.
3. The sequence adds one more step every round.
4. Beat your best time.

## Controls

- **Mouse / touch** - click the quadrants in order

## Tips

Say the colours aloud as they light up. Verbalising costs a fraction of a second and converts a visual sequence into a motor one, which is far easier to reproduce under time pressure.

## Open Source & License

No license file in upstream repository It is integrated here as a self-hosted build, running entirely in your browser
from `/games/simon-clone/` with no external services.

- Original source: <https://github.com/gamedolphin/follow_me_JavaScript_simon_clone>
