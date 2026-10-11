---
title: "Clay Safari"
slug: "clay-safari"
description: "A clay-style 3D bilingual animal world for kids. Walk around a small island, tap ten animals to hear their English names, their calls and their Chinese names, and collect them all in the explorer handbook."
category: "casual"
tags: ["3d", "animals", "kids", "educational", "bilingual", "three.js", "voxel", "exploration", "open source"]
thumbnail: "/games/clay-safari/thumbnail.svg"
---

# Clay Safari

**Clay Safari** is a claymation-style 3D world built for young children.
Ten clay animals — lion, giraffe, zebra, elephant, monkey, hippo, crocodile,
snake, bird and fish — live on a little island with an S-shaped river, a
bridge and a sandy path. Walk around, tap the animals, and learn what they
are called.

Everything you see and hear is generated in code. The animals were sculpted by
a Blender Python script, the textures are drawn with a noise algorithm, the
animal calls are synthesised through the Web Audio API, and the names are read
aloud by the browser's own speech synthesis. There are no image, model or audio
files anywhere in the project.

## How to Play

1. Click **开始探险 ▶** (Start) on the loading screen once the clay has finished
   being sculpted.
2. Walk to an animal and click it. It plays its own reaction — the elephant
   flaps its ears, the crocodile opens its jaw, the bird flies a lap, the fish
   leaps out of the water.
3. A word card appears: the English name is spoken first, then the animal's
   call, then the Chinese name.
4. The animal is added to the **探险手册** (Explorer Handbook) in the top right.
   Collect all ten to trigger a confetti celebration.
5. Press the 🤖 button for an automatic guided tour around the island.

## Controls

- **W / A / S / D** or arrow keys — walk
- **Click the ground** — walk toward that spot
- **Click an animal** — hear its name, call and Chinese name
- **Drag** — rotate the camera
- **Scroll** — zoom
- **M** — toggle the top-down overview poster
- **T** — start or stop the robot guided tour
- **L** — toggle the creature labels
- **H** — show or hide the help panel
- **Esc** — close an open word card and stop the tour
- On touch devices a virtual joystick appears for movement

## Notes

- This is the one game on the site with a bilingual Chinese/English interface —
  that is intentional, it is built for Chinese-speaking children.
- Names and calls use the browser's speech synthesis, so a Chinese or English
  voice pack installed on your OS gives the best result.
- Runs best on a desktop or a tablet; a phone works but the world is wide.

## Open Source & License

Clay Safari is created by **cclank** and distributed under the **MIT License**.

- Source repository: <https://github.com/cclank/clay-safari>
- Original live build: <https://clay-safari.lanshuagent.com/>

This integration self-hosts the built game so it runs entirely in your browser.
The only change made was setting Vite's `base` to `./` so the bundle loads from
the sub-path it is served from.