---
title: "A Dark Room"
slug: "adarkroom"
description: "A minimalist text adventure that opens in a pitch-black room with nothing but fire, and slowly expands into a ruined world."
category: "casual"
tags: ["text", "incremental", "resource-management", "mystery", "classic"]
---

# A Dark Room

**A Dark Room** is a minimalist text adventure by Michael Townsend. It opens
with one line — *"awake. head throbbing. vision blurry. come light the fire."* —
and for its first act that is literally all you have: a dark room, and the means
to make fire.

Then a stranger appears, and stoking the fire starts to cost you wood. Everything
after that expands outward in stages — a hut, a village, a trading post, then
outside, into a burned world of landmarks and mines, and finally a spacecraft.
It is remarkable how much story it tells with almost no interface: no map, no
inventory grid, mostly a row of buttons and a great deal of silence.

## How to Play

1. **Light the fire.** Click to add wood. The fire is the entire first act — it
   must not go out, and you must not let the wood run out.
2. **Keep it fed.** A stranger shows up and asks for help with the fire; in
   exchange, wanderers start leaving supplies. Wood arrives at intervals.
3. **Build up.** The **builder** appears and unlocks construction. Build a
   **cart** to carry more wood, then **huts** so more wanderers will work, then a
   **trading post**, **tannery**, **smokehouse**, **workshop**, **steelworks** and
   **armoury**. Costs scale with each building already standing.
4. **Go outside.** Once you have enough, you leave. Out there are landmarks, and
   each one unlocks a further step — **iron mine**, **coal mine**, **sulphur
   mine**, **water tank**, and eventually a **ship**.
5. **Prestige.** There is a Prestige option in the menu. It resets your world for
   permanent bonuses.

## Controls

The entire game is mouse clicks — **there is no keyboard input anywhere in the
source.**

- **Click the fire room** — add wood
- **Click craftable buttons** — build when the cost is met (they appear once
  unlocked)
- **Click the trade buttons** — buy from the trading post
- **Click "outside" / "leave"** — travel out of the room and back
- **Click landmarks and encounters** — travel, gather, and interact
- **Click the compass icon** — the equipment/scouting panel
- **Menu → Settings** — save, export, import and language

## Getting Resources

The production chains are worth knowing before you set out, because the mid game
is about unlocking them in the right order:

| Building | Produces |
|----------|----------|
| cart | increases wood carried per trip |
| huts | more workers, which means more supply income |
| hunting lodge | fur and meat |
| trading post | trades for diamond, cured meat, and scales |
| tannery | turns hides into cured meat and leather |
| smokehouse | turns meat into dried rations that travel better |
| workshop | bolts, rope and fabric |
| steelworks | unlocks steel and armour |
| armoury | weapons and armour |

Outside, the **iron mine**, **coal mine** and **sulphur mine** feed the **workshop**
and **steelworks**; **alien alloy** and **energy cells** come from the spacecraft
sequence.

## The Endgame

Once you have spacecraft, the **Fabricator** opens and starts consuming alien
alloy to build:

- **weapons** — energy blade, disruptor, plasma rifle ("the peak of wanderer
  weapons technology, sleek and deadly")
- **armour** — kinetic armour ("wanderer soldiers succeed by subverting the
  enemy's rage")
- **tools** — hypos and stims
- **upgrades** — fluid recycler ("water out, water in. waste not, want not") and
  cargo drone

Several of these **require a blueprint** found in the world, and several land on
specific encounters — the **Executioner** in particular is the fight the whole
game is building toward.

## Multiplayer Mode

**Yes** — there is an optional co-op mode, driven by Dropbox (`script/dropbox.js`).
It is not the default path and requires a Dropbox account.

## Language

The game reads a `lang` query parameter and supports more than twenty languages:
Chinese (Simplified and Traditional), English, French, German, Greek,
Esperanto, Indonesian, Italian, Japanese, Korean, Lithuanian, Latvian,
Norwegian, Polish, Portuguese, Portuguese (Brazil), Russian, Spanish, Swedish,
Thai, Turkish, Ukrainian and Vietnamese. It falls back to English when the
parameter is absent, which is what happens on this site.

## Save Data

Progress saves to `localStorage` automatically. Settings offers **export** and
**import** for moving a save between browsers and machines.

## About

A Dark Room was created by **Michael Townsend** of doublespeak games and first
published in 2013. It is licensed under the **Mozilla Public License 2.0**.

- Original live build: <http://adarkroom.doublespeakgames.com>
- Original game source: <https://github.com/doublespeakgames/adarkroom>

It has since been ported to the App Store, Google Play and Steam. See
`public/games/adarkroom/ATTRIBUTION.md` for the full provenance record, including
the individual credits of the bundled audio libraries.