---
id: retro-player
slug: retro-player
title: Retro ROM Player
description: A bring-your-own-ROM retro game emulator for the browser, powered by the open-source EmulatorJS engine.
category: emulator
tags: ["retro", "emulator", "nes", "snes", "gba", "genesis", "psx", "n64", "gameboy", "atari"]
difficulty: Easy
estimatedTime: As long as you like
featured: true
createdAt: 2026-08-02
---

# Retro ROM Player

A browser-based retro game emulator. Drop in a ROM from your own legally-owned
cartridge backups and play it right here — no install, no console, no server.

> ⚠️ **Legal & fair-use notice:** This player ships **no games**. You must provide
> your own ROM files (usually backups of cartridges you own). We do not host,
> link to, or distribute copyrighted ROMs. All emulation runs locally in your
> browser; your file never leaves your device.

## Supported Systems

| System | Core | Example extensions |
|--------|------|-------------------|
| NES / Famicom | fceumm | `.nes` `.fds` `.unf` |
| SNES / Super Famicom | snes9x | `.smc` `.sfc` `.fig` |
| Game Boy / Game Boy Color | gambatte | `.gb` `.gbc` |
| Game Boy Advance | mgba | `.gba` |
| Sega Genesis / Mega Drive | genesis_plus_gx | `.md` `.gen` `.smd` |
| Sega Game Gear | genesis_plus_gx | `.gg` |
| Sega Master System | genesis_plus_gx | `.sms` |
| Atari 2600 | stella2014 | `.a26` `.bin` |
| PlayStation (PSX) | pcsx_rearmed | `.iso` `.bin` `.cue` `.pbp` |
| Nintendo 64 | mupen64plus_next | `.n64` `.z64` `.v64` |

## How to Play

1. **Pick a system** from the dropdown — choose the console that matches your ROM.
2. **Choose a ROM** — click the drop zone or drag & drop your file onto it.
3. **Load & Play** — the emulator boots instantly and renders inside the page.
4. **Play** using your keyboard and mouse. The on-screen menu (gear icon) gives
   you save states, fullscreen, and reset.
5. **Switch games** anytime with **"Load another ROM"** in the top-left corner.

## Controls

Defaults follow the familiar RetroArch layout. Most cores map as follows:

- **D-pad / Movement** — Arrow keys
- **Action 1** — `Z` (or `A`)
- **Action 2** — `X` (or `B`)
- **Start** — `Enter`
- **Select** — `Shift` (or `Right Shift`)
- **Fast-forward** — `F`
- **Fullscreen** — `F11` (or the menu icon)
- **Gamepad** — connect a controller; it is auto-detected.

> Tip: open the in-emulator menu (gear icon, top-right of the canvas) to rebind
> buttons, manage save states, and tweak video settings.

## Tips & Notes

- **Single-file ROMs work best.** Multi-disc PSX games (`.cue` + `.bin`) need the
  full set present; for a quick test, a single `.bin`/`.iso` usually boots fine.
- **Save states vs. in-game saves:** use the emulator menu to create save states
  that persist in your browser. In-game saves (SRAM) are also kept locally.
- **Performance:** newer systems (N64, PSX) are heavier — a modern desktop or
  laptop browser gives the smoothest result.
- **Privacy:** nothing is uploaded. Your ROM is read from your device with a local
  object URL and emulated entirely on-device.
- **Engine:** built on [EmulatorJS](https://emulatorjs.org), the open-source
  RetroArch-in-the-browser project. Cores are self-hosted alongside this page.
