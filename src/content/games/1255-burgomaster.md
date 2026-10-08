---
title: "1255 Burgomaster"
slug: "1255-burgomaster"
description: "A medieval city-building and RPG management game in vanilla JavaScript — build a frontier town, send a hero into the wilds, research, and survive the events."
category: "strategy"
tags: ["city-builder", "medieval", "rpg", "resource-management", "tactics"]
---

# 1255 Burgomaster

**1255 Burgomaster** is a medieval city-builder and RPG management game set around
the year 1255. You run a frontier settlement: raise buildings, balance treasury
and happiness, send a hero out into wild territory, fight bandits, collect
artefacts, research a technology tree, and cope with whatever the event system
throws at you.

It is a deliberate exercise in dependency-free development. Per the upstream
README, it is written in vanilla JavaScript "without even using jQuery and modern
whistlers and jugglers, such as JS frameworks, TS->JS compilers, Node.js, web
servers and so on". It renders with `HTML5.Canvas`, saves to `localStorage` via
`JSON.parse()`, and targets any ES5/ES6 browser. Stated minimum requirements were
1024 MB RAM and an 800 MHz single-core CPU.

The design goal was to stay small and fast enough to run on aging devices and
phones — the whole game plus assets was budgeted at around 5 MB.

## How to Play

1. **Build.** Take income-producing buildings, keep your population housed, and
   watch happiness.
2. **Set taxes and rates.** Taxes, birthrate and happiness respond to your policy
   levers, and your choices compound.
3. **Recruit and garrison.** Hire sergeants, knights and turkopols. Units can sit
   in the **garrison** or travel with your **hero**.
4. **Send the hero to the adventure map.** This is a HoMM-style overland map with
   bandit camps, goblins and treasure. Battles resolve as a **battle journal**
   log you can open and read afterwards.
5. **Research at the University.** Konigsberg University holds the **technology
   tree**; discoveries unlock further buildings.
6. **Handle events.** Random events include thefts from the treasury, fires and
   plagues. Time-limited **Halloween** and **New Year** events also fire.
7. **Automate what you can.** **Autocampaigns** send your hero out repeatedly
   without you, and a **blackmarket** trades in goods and artefacts.

## Controls

The entire game is mouse clicks — there is no keyboard input in the source.

- **Click a building** in the build list to construct it
- **Click tabs** to switch between the city, adventure map, university, troops,
  blackmarket, journal and settings panels
- **Click a unit** to move it between garrison and hero's squad
- **Click a tile on the adventure map** to travel there
- **Buy selected / Sell selected** — trade in the blackmarket
- **Send hero to autocampaign** — automate exploration
- **Save / Export / Import / Load game** — your progress lives in `localStorage`,
  and export/import is the supported way to move a save between browsers and PCs
- **Settings** — autosave toggle, event-log size, tutorial messages, colour mode,
  Mobile UI, sound settings

## Buildings

Buildings appear in the interface as their requirements are met. Named ones
include:

- **Fountain** — happiness
- **Inn** — housing and morale
- **Stables** — mounted units
- **Archery Range** — ranged units
- **Treasury** — gold income; several things require it
- **Fire brigade** — fire response, which has a recurring **sustain cost**
- **Gallows** — as the README puts it, with the Gallows built *"the game could
  become a clicker game if you build the Gallows, and like to execute your
  citizens"*
- **Konigsberg University** — the tech tree
- **Towngate** — travel via scroll

## Units

Three recruitable unit types, each assignable to garrison or hero's squad:
**Sergeants**, **Knights** and **Turkopols**. Mercenary **spearmen** and
**swordmen** are also available.

## Artefacts

Collectible items with real effects, including the **Crusader's Sword**, **Dark
Pact Sword**, **Ring of Protection**, **Ring of Strength**, **Vial of Lifeblood**,
**Glyph of Knight's Valor** and **Glyph of Monk's Virtue**. Artefacts can be sold
on the blackmarket or used, and several have class restrictions.

Hero units have **Attack** and **Defence** stats that can increase on level-up —
with a high chance for some items — and there is a separate **Magic power** stat
using **manapoints** and **spellpower**.

## Currency

**Amber** is the game's own currency and, per the interface text, *"Amber is the
most valued currency"*. Gold, population and happiness are the other tracked
resources, each with its own history tab so you can see when a trend started.

## Tips

- **Amber is the real currency, not gold.** Most meaningful progress is gated on
  amber rather than gold, so prioritise amber income once the early buildings are up.
- **The blackmarket is an artefact sink and income source.** Selling artefacts is
  a legitimate and fast route to amber.
- **Autocampaigns beat manual play once set up.** Manual exploring is for when you
  need a specific artefact; otherwise let it run.
- **Read the event log.** The tabs for gold history, population history and the
  battle journal tell you *why* something went wrong, which the summary numbers do
  not.

## About

1255 Burgomaster was created by **Anton Gladyshev** and is licensed under
**GPL v3** for the source code.

- Original game source: <https://github.com/Areso/1255-burgomaster>
- Original live build: <https://1255.areso.pro>

It is inspired by Travian, Townsmen, Stronghold, Stronghold Crusader, Heroes of
Might and Magic, Lords of the Realm and the Anno series. It ships with German,
English, Esperanto, Spanish, French and Russian localization.

⚠️ **Asset license restriction.** The upstream README states: *"ALL GRAPHIC AND
SOUND ASSETS UNDER PROPRIETARY LICENSE. YOU MAY NOT REDISTRIBUTE THE GAME WITH THE
ASSETS VIA PUBLISHING IN INTERNET, STORES, OR ANY OTHER WAY. YOU MAY USE ASSETS
ONLY FOR LOCAL RUNNING."* The code is GPL, but the sprites, sounds and tiles are
not. See `public/games/1255-burgomaster/ATTRIBUTION.md` before redistributing
this build further.