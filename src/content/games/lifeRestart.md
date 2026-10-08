---
title: "Life Restart"
slug: "lifeRestart"
description: "A Chinese life-simulation text game: get a random birth, live through event after event, then restart and try to do better."
category: "simulation"
tags: ["life", "simulation", "text", "choices", "replayable", "random"]
---

# Life Restart

**Life Restart** is a Chinese life-simulation text game by **VickScarlet** — its
name translates as "Life Restart Simulator". The premise is the title: you are
born, you live a whole life, you die — and then you start over, rolling a new
character and hoping you do better this time.

The project's tagline, in Japanese, reads roughly: *"Start over. And do it
properly next time."*

Its appeal is variance. A run is decided in the first seconds — you are rolled a
name, a background and a small set of **talents** — and then events fire for the
rest of your life, weighted by your age and by your attributes. The same seed
never repeats, so a bad start is genuinely a different experience rather than a
failed one.

## How to Play

1. **A character is generated** — you are given a random name, a family background,
   and your starting attributes.
2. **Talents are rolled.** These are the run-defining modifiers, and they come in
   four rarities: **White**, **Blue**, **Purple** and **Orange**.
3. **Live.** Events fire according to your age and your current attributes. Each
   event may present a **choice**, and the choice changes your stats.
4. **Stats compound.** Because talents and events both feed the same attributes,
   small early gains compound into very different lives.
5. **You die eventually.** The game scores the life and shows a summary.
6. **Restart.** Roll a new character and run it again.

## Attributes

The game tracks **four** core properties:

| Stat | Meaning |
|------|---------|
| **CHR** | Appearance |
| **INT** | Intelligence |
| **STR** | Constitution |
| **MNY** | Family background |

Alongside them, talents can grant **SPR** (happiness) and **RND** (a randomised
attribute bonus). Each event can also contribute its own partial delta to any of
these, which is how a single choice permanently shifts the rest of the run.

## Age Stages

Events are organised into an **age-indexed event pool** — each age has its own
weighted list, so the game that gives you childhood events is not the game that
gives you midlife events. Some events are **level-gated**, meaning they only
become eligible once a property is high enough; others are entered into a pool
with a weight, so common outcomes appear often and rare ones occasionally.

## Achievements

There is a full **achievement** system, separate from simply living to the end.

## Tech Notes

The game is a TypeScript **monorepo**:

- `apps/web` — the browser build
- `apps/console` — a console version
- `packages/core` — the engine: `event.ts` implements the weighted event picker,
  `talent.ts` handles talent rolls and blind-box selection
- `packages/condition` — the condition expression evaluator
- `packages/data` — all game data, stored as **Excel spreadsheets** that compile to
  TypeScript: `talent.xlsx`, `event.xlsx`, `character.xlsx`, `age.xlsx`,
  `achievement.xlsx`

The talent system supports both **weighted selection** and **blind boxes** — both
"roll only from this specific list" and "roll at this rarity tier". Package
manager is `pnpm`; runtime is `bun`.

## About

Life Restart was created by **VickScarlet** and is licensed under the **MIT
License**.

- Original game source: <https://github.com/VickScarlet/lifeRestart>
- Original live build: <http://liferestart.syaro.io/>

⚠️ **Two notes.** First, the upstream repository has been renamed to
[`VickScarlet/remake`](https://github.com/VickScarlet/remake) — the `lifeRestart`
URL redirects there — and the project is a much larger TypeScript monorepo now
rather than the single-page build the older guides describe. Second, the game is
**in Chinese**, with no English localization; the interface language is upstream's
own. This guide describes the mechanics of the project as it now stands.

This game also has **no directory in this site's `public/games/` and no entry in
`src/data/games.ts`** — the guide is retained for reference but the game is not
currently integrated or playable here.