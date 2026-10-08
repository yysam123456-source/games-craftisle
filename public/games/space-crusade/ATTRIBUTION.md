# Space Crusade — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Space Crusade
- **Author:** Loopeex
- **License:** MIT License
- **Source repository:** https://github.com/Loopeex/space-crusade

## About

Space Crusade is redistributed here verbatim, as a self-hosted build that runs entirely in
your browser from `/games/space-crusade/`.

## Modifications made for this self-hosted build

1. Repointed the two script tags: `phaser.min.js` lives in `js/lib/`, and `game.min.js` does not exist upstream. The unminified `js/game.js` is loaded instead, preceded by the state and prefab modules that build the `Game.States` / `Game.Prefabs` namespaces it expects.
2. Removed the HTML5shiv script, which pointed at the long-dead googlecode.com host.

## License note

Upstream states: **MIT License**. That notice is reproduced in `ATTRIBUTION.md` and the corresponding license file is redistributed alongside the game where one exists.
