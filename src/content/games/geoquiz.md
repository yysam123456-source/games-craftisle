---
title: "Geo Quiz"
slug: "geoquiz"
description: "A free ad-free geography quiz where you type answers and they match as you type — no Enter key needed."
category: "puzzle"
tags: ["geography", "quiz", "education", "countries", "capitals", "maps"]
thumbnail: "/games/geoquiz/thumbnail.svg"
---

# Geo Quiz

**Geo Quiz** is a free, ad-free geography quiz built by Evan Oman. Rather than
multiple choice, you **type** an answer and it registers the instant it matches —
there is no Enter key to press and no wrong-answer penalty. As the upstream README
puts it, it is "Inspired by Sporcle".

Nineteen quizzes across six categories:

| Category | Quizzes |
|----------|---------|
| Continents | Europe, Africa, Asia, North America, South America, Oceania |
| Capitals | Europe, Africa, Asia, North America, South America |
| United States | US States, US State Capitals |
| Regional | EU Members, NATO Members, Middle East, Southeast Asia |
| History | US Presidents |
| Trivia | World's Largest Countries |

## How to Play

1. Pick a quiz from the landing page — categories are collapsible, so you can
   open just the one you want.
2. Type into the answer box. Each correct answer **lights up immediately** on the
   SVG map, or gets revealed in a numbered grid for quizzes that have no map.
3. Keep typing — the field clears itself after every accepted answer, so you never
   have to delete anything.
4. Score is **speed-weighted**. Each answer is worth 100 points multiplied by 2 if
   it lands within the first quarter of the time limit, 1.5 within the first half,
   1.25 within three quarters, and 1 after that.
5. Naming every entry ends the run with a **Perfect Score!** and your total time.
   Missed entries are listed at the end so you can see exactly what to brush up.

## Controls

- **Type in the answer field** — the only control the game needs. There is no
  Enter key; answers match on every keystroke
- **Tab is deliberately disabled** — pressing it does nothing, so you cannot
  accidentally tab out of the field mid-answer
- **Click a category header** — collapse or expand that category on the landing page
- **Click a quiz card** — start that quiz
- **Give Up button** — ends the run early. It asks for confirmation, but only if
  you are still on zero correct; once you have scored, it ends without prompting
- **Play Again / All Quizzes buttons** — on the results screen

## How Answer Matching Works

Matching is exact, not fuzzy — but the normalization is generous. Your input is
lowercased, trimmed, decomposed with Unicode NFD so **diacritics are stripped**
(`München` matches `Munchen`), stripped of a leading article (`the`, `a`, `an`),
and stripped of all non-alphanumeric characters. It is then checked against a
pre-built lookup on every keystroke, which is why matching is instant.

Each entry carries its own list of accepted answers, so common alternates work
without you having to guess the exact expected spelling. Algeria's capital, for
instance, accepts `algiers`, `alger`, `el djazair` and `al jazair`.

## Tips

- **Type the specific name, not the obvious one.** Paris would be accepted, but
  several countries have more than one accepted answer — use the canonical one.
- **Speed scoring rewards early answers, not fast typing.** The multiplier tiers
  are based on elapsed time against a per-quiz limit, so the fastest gains come
  from knowing the list rather than typing quickly.
- **Africa has 54 countries and Oceania fewer**, so the continent quizzes are very
  different in difficulty. Check the entry count before you start.
- Your best score per quiz is stored in `localStorage` under
  `geoquiz_best_<quiz-id>` and only updates if you beat the previous score.

## About

Geo Quiz is a static single-page app — vanilla JavaScript with Tailwind CSS from a
CDN, no backend and no build step. Routing is hash-based (`#/` for the landing
page, `#/quiz/{id}` for a quiz), quiz definitions load from static JSON, and SVG
maps are fetched and injected on demand with ISO-coded element IDs for
highlighting.

The upstream repository also ships the FastAPI service the project grew out of,
under `src/`, along with tests and a `scripts/compute_centroids.py` helper for
recomputing SVG label placement after editing a map.

The README states the license as `MIT`, but be aware that **no `LICENSE` file is
present** — the grant is asserted in prose only. See
[`ATTRIBUTION.md`](https://github.com/EvanOman/geoquiz) notes in this game's
`public/games/geoquiz/ATTRIBUTION.md` for the full provenance record.