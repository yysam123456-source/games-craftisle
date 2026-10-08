# Squirts — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Squirts
- **Author:** Klemen Slavič and Marko Novak
- **License:** MIT License (stated in the upstream README)
- **Source repository:** https://github.com/KrofDrakula/squirts

## About

Squirts is redistributed here verbatim, as a self-hosted build that runs entirely in
your browser from `/games/squirts/`.

## Modifications made for this self-hosted build

1. The page loads `build/game.js`, a grunt-concat bundle that is not committed. The individual sources are loaded instead, in the exact order the project's own Gruntfile concatenates them: `lib/common.js`, `lib/math/*.js`, `lib/game/*.js`, `squirts.js`.

## License note

Upstream states: **MIT License (stated in the upstream README)**. That notice is reproduced in `ATTRIBUTION.md` and the corresponding license file is redistributed alongside the game where one exists.
