# The Password Game — Open Source Attribution

This game is integrated into the site as a self-hosted build.

- **Title:** The Password Game
- **Author:** Craftisle Games (this site's own implementation)
- **License:** Not stated in the source repository
- **Source repository:** None — original to this project

## About

Build a password that satisfies an escalating list of rules. You start with one
rule — "Password must be at least 8 characters long" — and each time you satisfy
the current set, the next rule is added half a second later. Twelve rules in
total, ending at "Password must be at least 20 characters long".

The full rule list, in the order the code applies it:

1. At least 8 characters long
2. Contains at least one uppercase letter
3. Contains at least one lowercase letter
4. Contains at least one number
5. Contains at least one special character from `!@#$%^&*`
6. Contains no spaces
7. Contains at least one emoji
8. Contains a palindrome
9. Contains a Roman numeral (`I`, `V`, `X`, `L`, `C`, `D`, `M`)
10. Contains a chemical element symbol (`H`, `He`, `Li`, `Be`, `B`, `C`, `N`, `O`, `F`, `Ne`, `Na`, `Mg`, `Al`, `Si`, `P`, `S`, `Cl`, `Ar`, `K`, `Ca`)
11. Contains leet speak — at least one of `a/A e/E i/I o/O` **and** at least one of `4 3 1 0`
12. At least 20 characters long

Satisfying a rule reveals its hint and flips its marker to a checkmark; a strength
bar tracks how many of the twelve you have met.

## License and authorship

**There is no license file and no copyright, author or credit statement anywhere
in this directory.** The only files are `index.html` and
`assets/background.svg`. The code was written for this project and is not
published under any license, so it is **all rights reserved** by default.
"Author" is recorded above as the project itself because that is who wrote it; no
individual author is named.

This implements the same escalating-rules format popularised by Neal Agarwal's
*Password Game* on neal.fun. The twelve rules here are this project's own
selection and wording, not copied from that game, and no code was taken from it.

## Files included

- `index.html` — the entire game: markup, CSS and JavaScript in one 432-line
  file. No framework, no build step, no bundled dependencies.
- `assets/background.svg` — an 800x450 decorative SVG backdrop

There are **no external requests** — no CDN, no web font, no network dependency of
any kind.

## Modifications made for this self-hosted build

None. The game already used a document-relative path (`assets/background.svg`),
so it runs unchanged from `/games/password-game/index.html`.