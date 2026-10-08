---
title: "Progress Knight"
slug: "progress-knight"
description: "An idle life-simulation RPG where you climb a career ladder from beggar to legendary knight, then rebirth for permanent multipliers."
category: "strategy"
tags: ["idle", "rpg", "medieval", "progression", "career", "rebirth"]
---

# Progress Knight

**Progress Knight** is a text-based incremental life simulation set in a fantasy
medieval world. You begin as a beggar at **age 14** with nothing, and work your
way up a career ladder while paying your expenses every single day. Eventually
you die of old age — and then you start again, stronger.

The core tension is simple and it never really goes away: **income versus
expenses**. A better job earns more, but so does a better house, so the net gain
can be zero. Most of the game is finding combinations that push net positive.

## How to Play

1. **Pick a task** from the Tasks table to start accumulating XP. Concentration
   trains the skill XP, Productivity the job XP.
2. **Promote** when a task has enough XP to advance a rank. Auto Promote does this
   for you once unlocked.
3. **Watch net income.** Every day you accrue income from your job, pay expenses
   from your property, and adjust happiness. If net goes negative you are slowly
   losing ground.
4. **Buy property and skills** as coins allow. The Shop unlocks once you can afford
   50x a tent's expenses.
5. **Avoid evil** — or embrace it deliberately. Blood meditation and dark magic
   raise your evil stat, which raises your net income but shortens your lifespan.
   **Evil control** mitigates that cost.
6. **Die, then Rebirth.** At 25 you unlock the Rebirth tab. Rebirth resets your
   levels, job, property and coins, but keeps **max levels** as permanent
   multipliers and unlocks more of the interface.

## Controls

- **Click a task row** — select it as your active training task
- **Promote button** — rank up the selected task when it is eligible
- **Auto Promote / Auto Learn** — toggle automatic ranking and automatic skill
  purchases once unlocked
- **Scheduling slider** — divide your day between tasks
- **Shop tab** — buy property and permanent unlocks with coins
- **Pause button** — stop the clock
- **Rebirth tab** — perform Rebirth One or Rebirth Two
- **Settings** — export or import your save

## Jobs

Three separate ladders, each a different route to the top:

| Commoner | Military | Academic |
|----------|----------|----------|
| Beggar | Squire | Student |
| Farmer | Footman | Apprentice mage |
| Fisherman | Veteran footman | Mage |
| Miner | Knight | Wizard |
| Blacksmith | Veteran knight | Master wizard |
| Merchant | Elite knight | Chairman |
| | Holy knight | |
| | Legendary knight | |

## Skills

All 16 skills cap at **level 100**, each with a small per-level percentage effect:

| Skill | Effect per level |
|-------|------------------|
| Concentration | +1% skill XP |
| Productivity | +1% job XP |
| Bargaining | **−1% expenses** |
| Meditation | +1% happiness |
| Strength | +1% military pay |
| Battle tactics | +1% military XP |
| Muscle memory | +1% strength XP |
| Mana control | +1% T.A.A. XP |
| Immortality | +1% lifespan |
| Time warping | +1% game speed |
| Super immortality | +1% lifespan |
| Dark influence | +1% all XP |
| Evil control | +1% evil gain |
| Intimidation | **−1% expenses** |
| Demon training | +1% all XP |
| Blood meditation | +1% evil gain |

Note that **Bargaining** and **Intimidation** have *negative* expense effects —
those are reductions, and they are your two pure income multipliers on the cost
side.

## Property

Property determines your **expenses** — the cost of living, which scales with what
you own. This is the main brake on progress: a grand palace earns nothing but costs
a fortune every day.

Starting from **Homeless**, the ladder runs through Tent, Wooden hut, Cottage,
House, Large house, Small palace, Grand palace, plus Study desk, Library,
Dumbbells, Steel longsword, Sapphire charm, Butler and Personal squire.

## Dark Arts and Evil

The game has a deliberate moral choice built into its economy. **Blood
meditation** and **Dark magic** raise your evil stat; evil raises your net income
— and evil shortens your lifespan. **Evil control** raises your evil *gain*, which
is how you push the income as high as possible before the lifespan cost catches
up. The **Arcane Association** and dark magic unlock late and gate the academic
and demonic branches respectively.

## Time Warping

**Time warping** is the late-game progression mechanic: the Time warping skill
raises **game speed**, so days pass and XP accrues faster as you level it. It
pairs with Immortality, because running the clock faster burns through your
remaining lifespan proportionally.

## Lifespan and Death

Base lifespan is **70 years**; you start at 14. Lifespan is extended by
**Immortality** and **Super immortality** — both are skills that raise it, and
both cap at level 100. Death triggers the rebirth prompt.

## Rebirth

Two levels of rebirth, both of which reset job, property, coins and all current
task levels while preserving max levels as multipliers:

- **Rebirth One** — a clean reset. Raises your rebirth count, which improves the
  multipliers you get back.
- **Rebirth Two** — resets harder, **clearing max levels on every task**, but
  awards **evil** based on your performance. The trade is permanent power in
  exchange for a much harder climb.

## Offline Progress

`js/HackTimer.js` reconciles elapsed real time when you return, so the game keeps
running while it is closed. It uses a Blob-based Web Worker and deliberately
skips Internet Explorer 10.

## Save Data

Progress is kept in `localStorage`. The Settings panel exports and imports a save,
which is also how you move progress between browsers and machines.

## About

Progress Knight was created by **Ihtasham42** and is released into the **public
domain** under The Unlicense — the most permissive license there is. There are no
restrictions on use, modification or redistribution, and no attribution
obligation.

- Original game source: <https://github.com/Ihtasham42/progress-knight>
- Original live build: <https://ihtasham42.github.io/progress-knight/>

It is also distributed through Armor Games and Crazy Games. See
`public/games/progress-knight/ATTRIBUTION.md` for the full provenance record.