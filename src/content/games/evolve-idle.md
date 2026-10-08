---
title: "Evolve Idle"
slug: "evolve-idle"
description: "An incremental game about evolving a civilization from primordial ooze into a spacefaring empire, with micromanagement throughout."
category: "strategy"
tags: ["incremental", "civilization", "idle", "sci-fi", "management", "spire"]
---

# Evolve Idle

**Evolve** is an incremental game about evolving a civilization from primordial
ooze into a spacefaring empire. The upstream README describes the mix exactly:
it "combines elements of a clicker with an idler and has lots of micromanagement",
and poses the question the whole game is built around — *What will you evolve
into?*

The shape is a **city tier ladder** with eight rungs, then a set of late-game
systems that open on top of it:

**Camp → Hamlet → Village → Town → City → Metropolis → Megalopolis →
Ecumenopolis**

Each tier unlocks more of the interface, and the late systems — **Space**,
**Industry**, **Civics**, **Market**, **Storage**, **Government**, **Military**,
**Mech Lab**, **Ship Yard**, **Power Grid**, **Spire Supply** and **Outer Solar
System** — are where the actual difficulty lives.

## How to Play

1. **Gather resources.** At the start that is manual clicks, and it is the only
   manual part; everything downstream runs on production rates.
2. **Advance your civilization tier.** Higher tiers unlock new tabs and new
   production chains rather than just bigger numbers.
3. **Build production.** Balance resources against each other — the game punishes
   running a single resource dry more than it rewards a full inventory.
4. **Research** technologies to open the next tier and new mechanics.
5. **Expand outward.** Industry, Power Grid and Mech Lab feed the **Ship Yard**,
   which is how you reach **Space** and the **Outer Solar System**.
6. **Set your government** once Civics unlocks — it is a long-term modifier, not a
   combat system.
7. **Prestige** when you have a run worth restarting. The wiki has a dedicated
   Prestige section under its calculators.

## Controls

The whole game is mouse clicks — there are no keyboard shortcuts:

- **Click a resource** to gather it manually (early game only)
- **Click a tab** across the top to switch panels
- **Click a building or upgrade** to buy or queue it
- **Click the Market** to trade resources
- **Wiki button** — opens the in-game wiki, which is extensive and includes
  mechanics guides, FAQ and a set of **calculators** (mass ejector, prestige and
  others)
- **Reset button** — permanently wipes all progress

⚠️ The game is explicit about the reset button: *"This completely resets all your
progress and cannot be undone. This is NOT a prestige mechanic; you are wiping out
your game data. Keep this button disabled."* Prestige is the intended reset path,
and reset is not undoable.

## Offline Progress

Evolve keeps accumulating while the tab is closed. The **Mass Ejector**
(interstellar mass ejector) and the outer-space systems push this further, so
there is a real incentive to check back periodically rather than never.

## Tips

- **Check the wiki's calculators before you prestige.** The Mass Ejector and
  prestige math both reward planning against projected values.
- **Storage is worth buying early** — carrying caps bite harder than production
  shortfalls once you have several chains running.
- **Do not touch the reset button.** It is labeled a non-prestige mechanic and it
  wipes everything.

## About

Evolve was created by **Peter Motschmann** and is licensed under the **Mozilla
Public License 2.0**.

- Original game source: <https://github.com/pmotschmann/Evolve>
- Original live build: <https://pmotschmann.github.io/Evolve/>

The package identifies itself as version **1.3.16**, so this is a mid-development
snapshot. It ships an in-game **wiki** with 10,000+ translated string keys, which
is the best reference for any mechanic the surface UI does not explain.

See `public/games/evolve-idle/ATTRIBUTION.md` for the full provenance record,
including the bundled open-source libraries.