# Iso Middle Earth — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Iso Middle Earth
- **Author:** Hasan Harman (`hasanharman`)
- **License:** ⚠️ **Not stated in the source repository** — no license file exists
- **Source repository:** https://github.com/hasanharman/isomiddleearth
- **Original live build:** https://isomiddleearth.com/

## ⚠️ No license grant — read before redistributing

The upstream repository has **no `LICENSE` file**, and GitHub reports **no
license** for it. There is no license text in the source, in the built site, or in
any page of the deployed app. No permission to redistribute, host or mirror this
game has been granted.

The practical effect is that the code is **all rights reserved** by default, and
GitHub's own terms of service do not grant others the right to fork and
redistribute it. Anyone redistributing this build further, or shipping it in a
product, should first ask the author to add a license.

Note that the repository's own `README.md` solicits contributions ("Issues and
pull requests are welcome"), which shows the author wants involvement — it is not
a license grant.

## About

Iso Middle Earth is a browser-based isometric world-builder where you craft maps
across Tolkien's realms, tile by tile. Per the upstream README it is "an
isometric world-builder set in Tolkien's Middle-earth, where you create and shape
your own landscapes inspired by its iconic lands and lore" — and it is explicit
that this is an *inspired-by* project, not an authorized adaptation.

Features, from the upstream README:

- Isometric canvas with hover preview
- **7 realms** — shire, gondor, mordor, lothlorien, rohan, moria, rivendell —
  plus a **mixed** mode for cross-realm builds
- Adjustable grid size from 3x3 to 20x20
- 6 grouped tile categories: Terrain, Water & Bridges, Trees & Vegetation,
  Dwellings, Buildings, Decorations
- Asset picker tabs for Buildings and Characters
- Character overlays, currently 8 Hobbit sprites
- Paint with click or drag; right-click to clear
- Undo (Cmd/Ctrl + Z)
- **PNG export** and **JSON export/import** from the toolbar
- Community collections browser at `/collections`, with pagination and deep-link
  loading via `/?collection=`
- Local persistence via Zustand and `localStorage`

## Technology

Built with **Next.js 16**, **React 19**, **TypeScript**, **Zustand** for state,
**Tailwind CSS**, and **Radix UI / shadcn** components. It also pulls in
`@next/third-parties`, Vercel Analytics and Vercel Speed Insights,
`html-to-image` (for the PNG export), `lucide-react`, `next-themes` and `sonner`.

## About this build

This is the **published static deployment**, not the source tree — a Next.js
static export:

- `index.html`, `404.html`, `_not-found.html`
- `_next/static/chunks/` — the compiled client bundles
- `__next.__PAGE__.txt`, `__next._full.txt`, `__next._head.txt`,
  `__next._index.txt`, `__next._tree.txt` — the server-component payload
- `_not-found/`, `favicon.ico`, `logo.png`, `og.png`, `demo.png`
- `tiles/` — the isometric tile sprites

All asset paths are absolute and prefixed `/games/isomiddleearth/`, so it runs
unchanged from that path.

## Trademark note

**Middle-earth, Tolkien, and all associated names and imagery are trademarks of
Tolkien Enterprises Limited.** This project is an unofficial, independent,
non-commercial fan project. It is not affiliated with, endorsed by, sponsored by,
or approved by Tolkien Enterprises, the Tolkien Estate, or any other rights holder.
The project makes no claim to any rights in them, and the "Hobbit" character
overlays in particular are the author's own artwork rather than licensed designs.

## Modifications made for this self-hosted build

None.