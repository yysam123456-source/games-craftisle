# Shape Experiment — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Shape Experiment
- **Author:** Max Irwin (binarymax)
- **License:** MIT License
- **Source repository:** https://github.com/binarymax/shape
- **Original live build:** http://shapex.org

## About

Shape Experiment is a minimalist reaction game. A canvas is filled with a solid
shape (star, circle, triangle, square, pentagon, donut, bars, diamond) and then
revealed one pixel at a time. Name the shape before the timer runs out. The
game keeps a per-shape tally of your accuracy and speed in `localStorage`, and
can report your results back to the research project.

## License compliance (MIT)

Shape Experiment is MIT licensed. The upstream `LICENSE` file is redistributed
verbatim in [`LICENSE`](./LICENSE), preserving the copyright notice and
permission notice as the MIT license requires. The upstream `index.html`
carries the same notice in its header comment.

## Modifications made for this self-hosted build

The game ships as a single self-contained `index.html` with all its JavaScript
inlined and minified. Because it was originally wired to the shapex.org
research endpoint, the following **third-party tracking and upload code was
removed** — no game logic, drawing routine, or scoring code was changed:

1. **Google Analytics bootstrap removed.** The inline
   `www.google-analytics.com/analytics.js` loader inside the `model` module
   was replaced with a comment, and `model.init()` became a no-op so nothing
   references the now-undefined `ga` object.
2. **GA event/pageview beacons removed** from `model.result()`.
3. **Remote result upload removed.** `record()` used to build a URL like
   `/{shape}/{guess}/{total}/{done}/{time}/{base64-drawing}.shape` and load it
   as a tracking pixel on `shapex.org`, uploading a picture of every completed
   puzzle. It now creates a local placeholder `<img>` and sends nothing.
4. **Facebook Like and Twitter share widgets removed**, along with their click
   handlers and the `social()` calls into them. The "about" link still works.
5. **The cookie/analytics disclosure paragraph was removed** from the page
   footer, since no analytics or cookies are used any more.

The self-contained `index.html` is used directly. The separate `shape.js`
(non-minified source) and the `star.png` / `star200.png` icons are also
included for reference.

## All scoring still works

Because the game keeps its own `localStorage` tally, every result — accuracy
percentage, best time, average time, per-shape breakdown — is still tracked and
displayed on the page. Only the upload to the original researchers was
disabled.