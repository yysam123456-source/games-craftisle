# Island Builder — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Mykonos Island Builder
- **Author:** boona13
- **License:** MIT License
- **Source repository:** https://github.com/boona13/mykonos-island-voxels

## About

Mykonos Island Builder is a browser-based isometric sandbox for building
Mediterranean island designs. You place terrain and props on an isometric grid,
dress the scene, and save or share the result. Everything runs client-side in the
browser — no account, no server.

The directory is a **derivative work**: the page footer states "Based on the
open-source project by boona13. MIT License." and links both the upstream project
and the author's GitHub profile. The site's own terms of service repeat it:
"The underlying game engine and original asset definitions are © boona13,
licensed under the MIT License", with the summary "The original code is
MIT-licensed by boona13; this website is a derivative work."

## License compliance (MIT)

The upstream MIT license text, `Copyright (c) 2026 boona13`, is reproduced in the
linked `LICENSE` file at
<https://github.com/boona13/mykonos-island-voxels/blob/main/LICENSE>.

Note that **no `LICENSE` file is present in this directory** — this build ships
the game's files, not the upstream repository root. The license was verified
against the upstream repository, and the MIT permission notice and copyright line
are preserved in the page markup above.

## About the pages in this directory

This is the full published site rather than just the game, and most of the extra
files are static content pages:

- `play.html` — the game itself, the page the site embeds. Loads `js/main.js`
  and `js/save-share.js`
- `index.html` — the landing page
- Supporting content pages: `best-island-designs.html`,
  `mediterranean-town-design.html`, `mykonos-island-walkthrough.html`,
  `how-to-build-island.html`, `island-builder-tips.html`,
  `free-island-builder-game.html`, `voxel-sandbox-game-online.html`,
  `relaxing-games-2026.html`
- Legal pages: `terms-of-service.html`, `privacy-policy.html`,
  `cookie-policy.html`
- `blog/`, `menu_select_lightbulb.ogg` and the other `.ogg` files (UI sounds),
  `css/`, `js/` (`config.js`, `main.js`, `save-share.js`, and the `core/`,
  `grid/`, `building/`, `ui/`, `storage/`, `assets/` modules), `robots.txt`,
  `sitemap.xml`, `vercel.json`

## Terms of service and user content

The included terms of service grant users ownership of what they build: "You
retain all rights to the island designs you create using this Service", including
commercial use and redistribution of their own designs, with the site explicitly
claiming no ownership over them. The service is offered with no warranties.

## Modifications made for this self-hosted build

None. The game already used document-relative paths (`js/`, `css/`), so it runs
unchanged from `/games/island-builder/play.html`.