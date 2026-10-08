# Progress Knight — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Progress Knight
- **Author:** Ihtasham42
- **License:** The Unlicense (public domain dedication)
- **Source repository:** https://github.com/Ihtasham42/progress-knight
- **Original live build:** https://ihtasham42.github.io/progress-knight/

## About

Progress Knight is a text-based incremental life-simulation game set in a
fantasy/medieval world. Per the upstream `README.md`, you start as a beggar
"barely being able to feed yourself as the days go by", then learn skills and
pick up work experience to move up into better-paying work — all while managing
living expenses.

Your career path is open-ended. You can take the easy route through commoner
work, train hard to climb the ranks in the military, or study to enter a magic
academy and learn life-impacting spells.

Eventually your age catches up with you. You get the option to **rebirth** for XP
multipliers based on how well that life went — at the cost of losing all levels
and assets. As the README puts it: "Fear not though, as you will re-gain your
levels much, much more quickly than in your previous life."

The `README.md` also lists third-party distribution: Armor Games, Crazy Games and
GitHub Pages.

## License compliance (Unlicense / public domain)

Progress Knight is released into the **public domain** under The Unlicense. The
`LICENSE` file in this directory is The Unlicense and is redistributed verbatim in
[`LICENSE`](./LICENSE), preserving its dedication and warranty disclaimer as the
Unlicense requires.

This is the most permissive license available: the author has dedicated all
copyright interest to the public domain, so the game may be used, modified and
redistributed with no conditions, and there is no attribution obligation.

## Files included in this build

- `index.html` — the single-page game
- `js/main.js` — game state, career ladder, skills, items and the action loop
- `js/classes.js` — the data model classes
- `js/HackTimer.js` — offline-progression timer
- `css/styles.css` and `css/dark.css`
- `README.md`, `LICENSE`

The game uses document-relative paths (`js/`, `css/`), so it runs unchanged from
`/games/progress-knight/index.html`.

## About the offline timer

`js/HackTimer.js` implements idle/offline progression by generating a worker
from a `Blob` and reconciling elapsed real time when you return. It deliberately
skips Internet Explorer 10 (`if (!/MSIE 10/i.test(navigator.userAgent))`), since
that browser cannot run the worker. This is upstream's code, unchanged.

## Modifications made for this self-hosted build

None. The upstream files are included as published.

## External references in the upstream page

`index.html` links out to three things upstream, none of them required for the
game to run:

- `https://www.w3schools.com/w3css/4/w3.css` — a W3.CSS stylesheet link
- `https://cdn.icon-icons.com/icons2/2108/PNG/512/discord_icon_130958.png` — a
  Discord icon
- `https://discord.gg/fTRS4pHGka` — the community Discord invite

The game's own layout comes from the self-hosted `css/styles.css` and
`css/dark.css`; the W3.CSS link is vestigial.