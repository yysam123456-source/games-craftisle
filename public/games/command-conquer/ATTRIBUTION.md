# Command & Conquer HTML5 — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Command & Conquer HTML5
- **Author:** Aditya Ravi Shankar
- **License:** No license file in upstream repository
- **Source repository:** https://github.com/adityaravishankar/command-and-conquer

## About

Command & Conquer HTML5 is redistributed here verbatim, as a self-hosted build that runs entirely in
your browser from `/games/command-conquer/`.

## Modifications made for this self-hosted build

1. The upstream `index.html` is ad-supported and Google-Analytics-tagged. This build uses the author's own `debug.html` as the entry point instead: same game, same `js/cnc.js`, but local jQuery and no ad script tags.
2. Removed the Google AdSense blocks and the `_gaq` analytics snippet.
3. `js/cnc.js` loads `audio/sounds/crumble.ogg`, which upstream never committed and which 404s on every run. Repointed at `construction.ogg`, the same demolition cue.

## License note

The upstream repository ships no license file, so no license is granted or asserted by this redistribution. It is mirrored here for archival and demonstration purposes only.
