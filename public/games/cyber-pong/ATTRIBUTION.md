# Cyber Pong — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Cyber Pong
- **Author:** georgegognadze
- **License:** MIT License
- **Source repository:** https://github.com/georgegognadze/Cyber-Pong

## About

Cyber Pong is redistributed here verbatim, as a self-hosted build that runs entirely in
your browser from `/games/cyber-pong/`.

## Modifications made for this self-hosted build

1. The repository redirects from `dreamtocode/Cyber-Pong`; the author renamed it.
2. Localized jQuery 1.5.2 and Modernizr 2.8.2 into `js/`.
3. Fixed an upstream bug: the space bar called `Restart()`, which is never defined anywhere in `main.js`, throwing a ReferenceError. It now calls `Start()`, which already implements the play/restart toggle.

## License note

Upstream states: **MIT License**. That notice is reproduced in `ATTRIBUTION.md` and the corresponding license file is redistributed alongside the game where one exists.
