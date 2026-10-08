# Spashal — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** Spashal
- **Author:** MrRar
- **License:** No license file in upstream repository
- **Source repository:** https://github.com/MrRar/spashal

## About

Spashal is redistributed here verbatim, as a self-hosted build that runs entirely in
your browser from `/games/spashal/`.

## Modifications made for this self-hosted build

1. Note: this repository is a fork of KrofDrakula/squirts with the same `index.html` byte-for-byte; only this copy is integrated.
2. Removed the `autoplay` attribute and routed every `play()` call through a guarded helper, because autoplay before a user gesture logs an uncaught DOMException.

## License note

The upstream repository ships no license file, so no license is granted or asserted by this redistribution. It is mirrored here for archival and demonstration purposes only.
