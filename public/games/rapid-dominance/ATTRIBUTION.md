# Rapid Dominance — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Rapid Dominance
- **Author:** Wenta
- **License:** Apache License 2.0
- **Source repository:** https://github.com/wenta/rapid-dominance
- **Original live build:** https://wenta.github.io/rapid-dominance/

## About

Rapid Dominance is redistributed here verbatim, as a self-hosted build that runs entirely in
your browser from `/games/rapid-dominance/`.

## Modifications made for this self-hosted build

1. Built from source: the repo ships TypeScript and the entry HTML loads the webpack bundle `dist/app.js`. Built with the project's own webpack 4 config (needs `NODE_OPTIONS=--openssl-legacy-provider` on modern Node).
2. Fixed an upstream crash: `WelcomeScene.gameMaps` was a class-field initializer that read `this.cameras.main`, but field initializers run before Phaser boots the camera plugin, so every launch died with "Cannot read properties of undefined (reading 'main')". It is now a lazy getter. The same initializer also used a comma expression `(a, b)` where `Math.floor(a)` was meant, silently discarding the width term.

## License note

Upstream states: **Apache License 2.0**. That notice is reproduced in `ATTRIBUTION.md` and the corresponding license file is redistributed alongside the game where one exists.
