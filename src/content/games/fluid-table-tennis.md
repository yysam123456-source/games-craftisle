---
title: "Fluid Table Tennis"
slug: "fluid-table-tennis"
description: "Two-player Pong played through a fluid simulation. Aim the flow and the ball curves with the water."
category: "casual"
tags: ["fluid", "simulation", "two-player", "pong", "arcade", "open source"]
thumbnail: "/games/fluid-table-tennis/thumbnail.svg"
---

# Fluid Table Tennis

Fluid Table Tennis is a two-player Pong variant by **Anirudh Joshi** where the paddles are moved indirectly, by pointing the flow of a simulated fluid rather than by direct control.

A simple particle-based fluid solver is run every frame, and the paddles ride the resulting current. Aim a current toward the ball and the ball curves; aim it away and the ball is pushed back. Because everything is mediated by the fluid, matches develop their own momentum and the rallies turn into something closer to a duel of currents than a game of reflexes. Runs full screen.

## How to Play

1. Point the fluid stream with the cursor to move your paddle.
2. Let the current carry the ball across.
3. First player to miss concedes the point.
4. Use **Begin** to start a match and **Restart** to reset.

## Controls

- **Mouse / touch** - aim the fluid flow to steer your paddle
- **W / S** or **Up / Down** - fine vertical adjustment
- **A / D** - fine horizontal adjustment
- **Space** - pause

## Tips

A hard sustained current beats short bursts. Hold the aim steady and let the fluid build - the paddle reaches terminal velocity far more smoothly than by flicking.

## Open Source & License

MIT License It is integrated here as a self-hosted build, running entirely in your browser
from `/games/fluid-table-tennis/` with no external services.

- Original source: <https://github.com/anirudhjoshi/fluid_table_tennis>
