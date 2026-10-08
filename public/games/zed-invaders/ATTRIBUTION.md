# Zed Invaders — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Zed Invaders
- **Author:** salvatorecapolupo
- **License:** No license file in upstream repository
- **Source repository:** https://github.com/salvatorecapolupo/zedinvaders

## About

Zed Invaders is redistributed here verbatim, as a self-hosted build that runs entirely in
your browser from `/games/zed-invaders/`.

## Modifications made for this self-hosted build

1. Entry is the author's `game.html` (the game); `index.html` is a splash/landing page. The unused `explodetest`, `test`, `test123`, `multicanvas` and `log_modifications` pages were dropped.
2. Removed the SoundCloud SDK and its `SC.initialize` / `SC.stream` calls (the track is gone and the SDK host is a third-party embed), re-binding the in-game MUTE button so the game stays playable without music.
3. Removed the Facebook Like box, Twitter share button and a dead googleusercontent.com hotlink.
4. jQuery UI's stylesheet references five theme images upstream never committed. Equivalent gradient strips were generated and a 1x1 transparent placeholder was added for `animated-overlay.gif`.

## License note

The upstream repository ships no license file, so no license is granted or asserted by this redistribution. It is mirrored here for archival and demonstration purposes only.
