# HTML5 Asteroids — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** HTML5 Asteroids
- **Author:** dmcinnes
- **License:** MIT License
- **Source repository:** https://github.com/dmcinnes/HTML5-Asteroids

## About

HTML5 Asteroids is redistributed here verbatim, as a self-hosted build that runs entirely in
your browser from `/games/html5-asteroids/`.

## Modifications made for this self-hosted build

1. Fixed an uncaught autoplay-policy DOMException: the preload loop called `audio.play()` before any user gesture. The priming calls are now wrapped in try/catch with a swallowed promise rejection; playback still resumes on the first keypress.

## License note

Upstream states: **MIT License**. That notice is reproduced in `ATTRIBUTION.md` and the corresponding license file is redistributed alongside the game where one exists.
