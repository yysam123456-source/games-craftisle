# Slope — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** SLOPE — SEASON 1
- **Author:** TheGeneric (GitHub: `MiniDiamondDEV`, published at TheGeneric10)
- **License:** ⚠️ **TheGeneric Non-Distribution License (NDL)** — *not* an open
  source license
- **Source repository:** https://github.com/MiniDiamondDEV/SLOPE
- **Original live build:** https://thegeneric10.github.io/SLOPE/

## ⚠️ This license does not permit redistribution — read before reusing this build

This game is **not** open source, and its license explicitly forbids the thing
this integration does. Upstream's `LICENSE.md` is the **TheGeneric Non-Distribution
License (NDL), version pre-1.0.0, © 2026 TheGeneric, all rights reserved**, and
its terms include:

> **2. No Distribution** — You may not distribute, publish, sublicense, transfer,
> share, mirror, host, or otherwise make the Work available to any third party in
> whole or in part, in source or compiled form, without prior written permission
> from TheGeneric.
>
> **3. No Commercial Use** — Commercial use of the Work is strictly prohibited
> unless explicitly authorized in writing by TheGeneric.
>
> **4. Modifications** — You may make local modifications for private testing
> only. Modified versions remain subject to this license and may not be
> distributed.
>
> **6. Termination** — Any violation of this license immediately terminates your
> rights under it.

The permission the NDL *does* grant is narrow: **"solely for personal review,
internal testing, and private evaluation by authorized recipients."** Serving this
build publicly on a website falls outside that grant.

This file records provenance honestly rather than asserting an open source
license that does not exist. **Anyone deploying this game should remove it, or
obtain written permission from TheGeneric first.** The `LICENSE.md` is not
bundled in this directory; the full text was read from the upstream repository.

Note also that the "Slope" name refers to a separately marketed commercial game.
This repository is an unaffiliated clone; see the attribution caveat below.

## About

A fast-paced neon arcade runner on a single-page HTML5 canvas stack. You guide a
ball down a steep, procedurally generated track, steering left and right to stay on
the surface as the speed climbs and the track twists. Falls are fatal; there are
multiple lives, and the run ends when they run out.

The build carries three lives by default with a maximum of five, tracks a trail
behind the ball, and ships a Firebase integration (Firebase App, Auth and Database
from `gstatic.com`) for its leaderboard and session handling.

## Modifications made for this self-hosted build

Exactly one change, made so the game renders without network access: the Google
Fonts stylesheet for **Orbitron** and **Share Tech Mono** was removed and
replaced with an equivalent `@font-face` block that resolves those families from
locally installed fonts, falling back through `Courier New` to `monospace`.

Verified: the local file is byte-for-byte identical to the upstream `index.html`
apart from that one `<style>` block. No game code, logic or asset was touched.

## Files included

- `index.html` — the entire game in one file (~429 KB of inline HTML, CSS,
  JavaScript and configuration)
- `favicon.ico` (referenced by the page, empty upstream)

`README.md`, `LICENSE.md`, `package.json` and the `.idx` / `.vscode` directories
from the upstream repository are **not** included in this copy.

## Attribution caveat

Upstream is unaffiliated with the commercial game whose name it uses. Nothing here
is the original Slope game's code or assets — it is a third-party clone of
independent origin, and its own license is proprietary.