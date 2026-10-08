# Descensus II — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Descensus II
- **Author:** Tom W Hall
- **License:** MIT License (see LICENSE)
- **Source repository:** https://github.com/TomWHall/Descensus2

## About

Descensus II is redistributed here verbatim, as a self-hosted build that runs entirely in
your browser from `/games/descensus2/`.

## Modifications made for this self-hosted build

1. Built from source: the repo ships only TypeScript, and the entry HTML expects the compiled `js/descensus2.js`. Built with the project's own webpack config (webpack 2 + ts-loader 2), driven through the Node API because the webpack 2 CLI crashes on Node 22.
2. The dev build emits `descensus2.js` while the checked-in HTML referenced `descensus2.min.js`; the filename was aligned.

## License note

Upstream states: **MIT License (see LICENSE)**. That notice is reproduced in `ATTRIBUTION.md` and the corresponding license file is redistributed alongside the game where one exists.
