---
title: "Samsy Ninja"
slug: "samsy-ninja"
description: "A cinematic WebGPU 3D portfolio experience — roam a cyberpunk city as a VRM avatar and browse the creator's projects."
category: "casual"
tags: ["3d", "webgpu", "vrm", "three.js", "portfolio", "cinematic"]
thumbnail: "/games/samsy-ninja/thumbnail.svg"
---

# Samsy Ninja

**Samsy Ninja** (SMSY-Gen02) is a multiplayer 3D cyberpunk portfolio by Samuel
Honigstein — an award-winning creative graphics engineer. Instead of a level or a
score, it is a **city you walk through**: you appear as a VRM avatar in a neon
3D district and browse the creator's project work as you go.

It is a technical showcase as much as an experience. Rendering is **WebGPU first
with WebGL2 fallback**, and the whole thing is built on Three.js r182dev with
custom shaders, a beach shader its creator reportedly spent a very long time on,
Draco-compressed models and KTX2 textures.

## How to Play

There is no game here and nothing to win — it is an exploration piece. What
there *is* to do is a short quest list, which is the closest thing to objectives:

1. A **tutorial** runs on your first visit. Press **SKIP** to dismiss it and go
   straight to the city.
2. Walk around the city and **talk to the NPCs**. Each has a line of dialogue, and
   some carry hints for the quests below.
3. Visit the different **sections** of the portfolio.
4. **Scroll through the projects** in the works section.
5. Find the **skins** and try each one on.
6. Turn **sound on** and request every track from the DJ.

Progress is kept in `localStorage` under `smsy_quests`, so it survives a reload.

## Controls

- **Move with WASD** (or the arrow keys) — walk the city
- **Mouse** — look around; the camera follows your avatar
- **Scroll** — advance through projects and 3D text in the works section
- **Click** — interact: talk to NPCs, request tracks from the DJ, trigger
  hotspots, pick up items
- **SKIP button** — skip the tutorial on the opening screen
- **Touch** — supported on mobile, including pinch-zoom

There is **no gamepad support** — gamepad APIs are not used anywhere in the build.

## The Six Quests

These are the achievement names and their exact in-game descriptions:

| Quest | Requirement |
|-------|-------------|
| Tutorial completed! | Complete the tutorial at the start |
| Visit all sections! | Visit all sections |
| All colors collected! | Try on all skins |
| All tracks requested! | Sound ON and request all tracks to the DJ |
| Visit all works! | Scroll through all projects |
| All NPCs talked to! | Talk to every NPC |

An NPC near the start area reads *"Check out our quests here"*, and the quest
board lists the rest — so if you are stuck, that is where to look.

The soundtracks are credited in-game, including tracks by **Dibiase** (*Ninja
Starz*, *Metroid Elaquent Remix*), **Elaquent** (*Mastered System*) and a hidden
one by **Squarepusher** (*Secret Track*).

## First Load

Expect **10–30 seconds** on first visit: roughly 40 MB of models, textures, audio
and video. The page redirects itself to `?forceWebGL=true&cdn=false` so that all
assets load locally and rendering falls back to WebGL2 where WebGPU is
unavailable.

Chrome requires a user gesture before audio can start, so click once anywhere to
activate sound.

## Debug Parameters

Useful if something renders oddly:

| Parameter | Effect |
|-----------|--------|
| `?forceWebGL=true` | Skip WebGPU, use the WebGL2 backend |
| `?cdn=false` | Load video and audio locally instead of from the CDN |
| `?debug=true` | Enable Three.js shader error checking |
| `?editor=true` | Load the scene editor |
| `?fps=60` | Cap the frame rate |

## Technology

Per the shipped documentation:

| Layer | Technology |
|-------|------------|
| 3D engine | Three.js r182dev (WebGPU, WebGL2 fallback) |
| Framework | Vue 3 + Vuex for the 2D HUD |
| Animation | GSAP |
| Multiplayer | PartyKit over WebSocket |
| Avatar | Three-VRM with SpringBone physics |
| Compression | Draco (GLB, decoded in a Web Worker) |
| Text | BMFont bitmap fonts in 3D space |
| Build | Vite, code-splitting |

The startup sequence is a strict serial async chain: preloader animation, then six
parallel preload blocks (renderer, audio, character controller, UI interaction, 3D
scene, textures), then the scene switches from VOID to IDLE, then the render loop
starts, and **the Vue UI mounts last**. The design goal is that the 3D scene is
live before the interface appears.

## About the Credits

The in-app credits name three contributions: an **avatar model modified** from a
[Booth](https://duss.booth.pm/items/6110446) asset, interface help from
**Acolad**, and the cybercity itself built together with **Julien Suard**.

See `public/games/samsy-ninja/ATTRIBUTION.md` for the full provenance record,
including the rights position — this build has **no license grant**, and the
shipped documentation notes the original author's assets are for study and
research use.