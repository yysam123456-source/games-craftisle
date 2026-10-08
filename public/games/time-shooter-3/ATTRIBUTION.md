# Time Shooter 3 — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Time Shooter 3: SWAT
- **Author:** GoGoMan — see "How the author was determined" below
- **License:** Not stated in the source repository
- **Source repository:** None found

## About

A first-person tactical shooter built on one idea: **time moves only when you
move.** Stand still and the room nearly freezes — enemies, bullets and your own
aim all slow to a crawl. Step, and the world catches up at full speed. Every
position you take is a decision to let the timeline advance, so encounters play
out as small puzzles rather than reflex tests.

This third entry in the series adds SWAT-geared enemies with riot shields, helmets
and body armor, plus **hostages** — shooting one ends the run immediately, so
clearing a room means sequencing threats around civilian bodies rather than just
sweeping corners. You pick up and throw weapons, carry a shield for portable
cover, and breach doors.

The core mechanic is inspired by SUPERHOT; the difference here is the SWAT
hostage-rescue framing.

## License

**There is no license.** This directory contains a single file —
`index.html`, ~11.8 MB — with no `LICENSE`, no `README`, no `package.json`, no
copyright notice and no author credit anywhere in it. Grepping the whole file for
`copyright`, `©`, `author` and `credit` returns nothing but coincidental
substring matches inside the compressed Unity payload.

**Not stated in the source repository**, and no public source repository for this
build was found. The game is therefore **all rights reserved** by default, and
the embedded Unity player cannot be redistributed on any published grant.

## How the author was determined

GoGoMan is credited as the developer of the Time Shooter series across multiple
public sources (GoGameGate, which publishes the series, is named as the developer,
as are the port pages that credit "BY: GoGoMan"). The first game released in March
2021 and Time Shooter 2 and 3: SWAT followed in March 2022.

This attribution comes from **external sources, not from this build** — nothing
inside the file names GoGoMan. It is recorded here because it is the consistent
and well-attested answer, not because the artifact itself states it.

## What this build actually is

Not a hand-written web game: `index.html` is a **single-file Unity WebGL export**
with the engine and all game data inlined as base64 data URIs.

- `buildUrl` is the empty string, so every asset URL is a
  `data:application/octet-stream;base64,…` URI rather than a separate file
- `loaderUrl` inlines Unity's `createUnityInstance` loader, itself base64-encoded
- `dataUrl` inlines the compressed Unity WebAssembly payload
- The page calls `createUnityInstance(canvas, config, onProgress)`, shows a
  progress bar and spinner, wires up `unityInstance.SetFullscreen(1)`, and
  suppresses the default fullscreen button via `hideFullScreenButton = "1"`
- The loading UI includes an inline base64 SVG spinner

Unity is a trademark of Unity Technologies. The engine binary is embedded here
under Unity's own terms, not under any open source license.

## About the title

"Time Shooter 3" and the "Time Shooter" series name belong to GoGoMan.
"SUPERHOT" and "Superhot" are trademarks of SUPERHOT Ltd, referenced here only
because the game's own published description credits it as the mechanic's
inspiration. Neither trademark holder licenses or endorses this build.

## Modifications made for this self-hosted build

None. The file is self-contained and uses only data URIs, so it has no external
path dependencies and runs unchanged from
`/games/time-shooter-3/index.html`.