# Genetic Drift — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Genetic Drift
- **Author:** Dancing Banana Studios
- **License:** No license file in upstream repository
- **Source repository:** https://github.com/DancingBanana/genetic-drift

## About

Genetic Drift is redistributed here verbatim, as a self-hosted build that runs entirely in
your browser from `/games/genetic-drift/`.

## Modifications made for this self-hosted build

1. `js/lib/boxbox` is a git submodule and was empty after checkout; fetched Box2dWeb and boxbox from https://github.com/incompl/boxbox (both MIT).
2. The page is authored to be served from a site root: `require.config` used `baseUrl: '/coffee'` with root-absolute `paths`, the module ids were `image!/img/...` and `json!/data/...`, and the stylesheet used `url('/img/...')`. Under `/games/genetic-drift/` all of those escape the game folder, so the paths were remapped to be folder-relative and `<base href="./">` was added.
3. Removed the "Fork me on GitHub" ribbon.

## License note

The upstream repository ships no license file, so no license is granted or asserted by this redistribution. It is mirrored here for archival and demonstration purposes only.
