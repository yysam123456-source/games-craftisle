---
title: "Backbone Game Engine"
slug: "backbone-game"
description: "A Super Mario physics demo built on Backbone.js. Watch state machines drive velocity, acceleration and friction."
category: "action"
tags: ["mario", "physics", "backbone", "demo", "javascript", "open source"]
thumbnail: "/games/backbone-game/thumbnail.svg"
---

# Backbone Game Engine

The Backbone Game Engine is a small 2D engine by **Martin Drapeau** that demonstrates modelling a platformer with **Backbone.js** plus jQuery and Underscore. Rather than a game, it is a working reference: a Super Mario sprite sheet, a debug panel, and a state machine that switches between `idle`, `walk` and `jump` based on input and vertical velocity.

Because the debug panel prints position, velocity and acceleration every frame, you can watch exactly how each state transition changes the physics. That makes it a genuinely useful reference for anyone structuring a platformer around game-state objects.

## How to Play

1. Read the debug panel in the top-left to see live physics values.
2. Watch the state machine move Mario between idle, walk and jump.
3. Use the arrow keys to drive the state transitions yourself.

## Controls

- **Arrow keys** - run and jump
- **Debug panel** - live state, velocity, acceleration readout

## Tips

The state machine is the point of this build. Pause on a jump and compare the `velocity` and `acceleration` numbers between the `walk` and `jump` states - the model applies a different force in each.

## Open Source & License

MIT License It is integrated here as a self-hosted build, running entirely in your browser
from `/games/backbone-game/` with no external services.

- Original source: <https://github.com/martindrapeau/backbone-game-engine>
