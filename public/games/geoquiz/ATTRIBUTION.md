# Geo Quiz — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** GeoQuiz
- **Author:** Evan Oman (`EvanOman`)
- **License:** MIT, per the `README.md` — but see the note below
- **Source repository:** https://github.com/EvanOman/geoquiz
- **Original live build:** https://evanoman.github.io/geoquiz/

## Note on the license file

The upstream `README.md` ends with a `## License` section whose entire contents
are the single word `MIT`. However:

- **No `LICENSE` file exists** in this directory or in the upstream repository
  root.
- GitHub's license detection reports **no license** for the repository, precisely
  because no license file is present.

The MIT grant is therefore asserted in prose but never accompanied by the license
text or a copyright line. The MIT license requires the copyright notice and
permission notice to be included in copies, and neither exists to include here.
Treat the terms as **unverified**, and contact the author before redistributing
this build further or deriving from it.

## About

GeoQuiz is a free, ad-free geography quiz — the upstream `README.md` calls it "a
free, ad-free Sporcle alternative", and says it is "Inspired by Sporcle". Rather
than multiple choice, you **type** an answer and it matches as you type, with no
Enter key needed. Two presentation modes:

- **Map quizzes** — type a country or state name and it lights up on an SVG map,
  with labels placed at pre-computed centroids.
- **Tabular quizzes** — for subjects with no map (presidents, member states), a
  numbered grid reveals entries as you guess them.

It ships **19 quizzes across 6 categories**:

| Category | Quizzes |
|----------|---------|
| Continents | Europe, Africa, Asia, North America, South America, Oceania |
| Capitals | Europe, Africa, Asia, North America, South America |
| United States | US States, US State Capitals |
| Regional | EU Members, NATO Members, Middle East, Southeast Asia |
| History | US Presidents |
| Trivia | World's Largest Countries |

Scoring is speed-weighted: an answer is worth 100 points multiplied by 2 if it
comes within the first quarter of the time limit, 1.5 within half, 1.25 within
three quarters, and 1 after that. Answer matching is exact against a
pre-computed lookup rather than fuzzy — input is lowercased, diacritics stripped
via NFD, a leading article (`the`, `a`, `an`) removed and punctuation stripped,
then checked against a `Map` on every keystroke for O(1) matching. Each entry
carries a list of `accepted_answers`, so "Algeria" also matches `alger`, and
Algeria's capital entry accepts `algiers`, `alger`, `el djazair` and `al jazair`.

## Third-party runtime dependency

The page loads **Tailwind CSS** from `https://cdn.tailwindcss.com` — the
upstream README describes the architecture as "vanilla JavaScript + Tailwind CSS
(CDN), no backend, no build step", and that CDN dependency is still there. It is
the only thing the game fetches from the network at runtime.

## Files included in this build

The upstream tree is included as published, which is both the static app and the
FastAPI tooling around it:

- Static app: `index.html`, `js/app.js`, `js/quiz.js`, `templates/`
  (`base.html`, `index.html`, `quiz.html`, `maps/`), `maps/`, `data/quizzes/`
  (19 JSON files), `assets/`, `static/`
- Server side: `src/` (FastAPI), `tests/`, `geoquiz.service`, `pyproject.toml`,
  `uv.lock`, `.python-version`, `justfile`
- Tooling and docs: `scripts/compute_centroids.py` (recomputes SVG label
  centroids after map edits), `docs/screenshots/`, `README.md`, `CLAUDE.md`,
  `.github/`, `.gitignore`, `.nojekyll`

The game already used document-relative paths, so it runs unchanged from
`/games/geoquiz/index.html`.

## Modifications made for this self-hosted build

None.