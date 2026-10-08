# A Dark Room — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** A Dark Room
- **Author:** Michael Townsend (doublespeak games)
- **License:** Mozilla Public License 2.0 (MPL-2.0)
- **Source repository:** https://github.com/doublespeakgames/adarkroom
- **Original live build:** http://adarkroom.doublespeakgames.com

## About

A Dark Room is a minimalist text adventure that opens on a single line: *"awake.
head throbbing. vision blurry. come light the fire."* You start in a pitch-black
room with nothing but the means to make fire, and the game expands from there
into resource gathering, a village, and finally a journey into a ruined world
outside — and into whatever is left of the people in it.

The upstream `README.md` calls it "a minimalist text adventure game for your
browser" and links the releases on the App Store, Google Play and Steam, so the
open-source web build is the same game those ports derive from. It ships
translated into more than twenty languages.

## License compliance (MPL-2.0)

A Dark Room is MPL-2.0 licensed — both `package.json` (`"license": "MPL-2.0"`)
and `LICENSE.md` say so. The upstream `LICENSE.md` is redistributed verbatim in
[`LICENSE.md`](./LICENSE.md), preserving the MPL 2.0 text and Exhibit A.

MPL 2.0 is file-level copyleft: modifications to MPL-covered files must be
released under MPL, but merely *including* the game alongside other content does
not impose the license on that other content.

## Files included in this build

The upstream tree is included as published:

- `index.html`, plus `browserWarning.html` and `mobileWarning.html`
- `script/` — the game code (`game.js`, `Button.js`, `audioLibrary.js`, …)
- `css/`, `img/`, `audio/`
- `lang/` — `langs.js` plus per-language `strings.js` files
- `lib/` — bundled libraries, listed below
- `doc/` — author notes: `Events.xlsx`, `Zones.txt`, `translation.txt`
- `tools/`, `dev-server.js`, `package.json`, `yarn.lock`, `.jshintrc`,
  `contributing.md`, `.gitattributes`
- `favicon.ico`

`dev-server.js` and `tools/` are development-only and are not loaded by the game.

## Third-party libraries bundled in this directory

Loaded by `index.html`, each retaining its own header:

- **jQuery** 1.10.1 (MIT) — `lib/jquery.min.js`, © 2005, 2013 jQuery Foundation
- **jQuery Color** 2.1.2 (MIT) — `lib/jquery.color-2.1.2.min.js`, from
  github.com/jquery/jquery-color
- **jQuery Event Move** 1.3.1 (MIT) — `lib/jquery.event.move.js`, by Stephen Band
- **jQuery Event Swipe** 0.5 (MIT) — `lib/jquery.event.swipe.js`, by Stephen Band
- **base64.js** — `lib/base64.js`, a base64 encode/decode helper credited to
  webtoolkit.info, used by the save export/import feature
- **ICU data** — `lib/icu.js`, a bundled copy of CLDR locale data (Unicode-DFS
  2011 license), supplying month and day names for date formatting
- **translate.js** — `lib/translate.js`, the project's own i18n lookup helper

## Modifications made for this self-hosted build

None. The game already used document-relative paths (`script/`, `css/`, `lang/`,
`img/`, `audio/`), so it runs unchanged from `/games/adarkroom/index.html`.

Note that the game reads the `lang` query parameter to pick a language. It
defaults to English when the parameter is absent, which is the behaviour on the
site's embed.