---
title: "Password Game"
slug: "password-game"
description: "Build a password that satisfies an escalating list of rules — each one you satisfy adds a new, worse rule."
category: "puzzle"
tags: ["puzzle", "humor", "password", "challenge", "wordplay"]
thumbnail: "/games/password-game/thumbnail.svg"
---

# Password Game

**The Password Game** starts with one rule — *the password must be at least 8
characters long* — and gets meaner every time you succeed. Satisfy the rules you
currently have and, half a second later, a new one appears. There are twelve in
total, and the last one asks for **20 characters**.

It is a joke about how password requirements escalate, and the punchline is that
by the end you have to satisfy rules that were never individually unreasonable but
are collectively absurd.

## How to Play

1. Type into the password field. Rules are checked as you type — there is no
   submit button.
2. When a rule is satisfied its marker flips to a checkmark **and its hint is
   revealed**, so you never have to guess what it wanted.
3. Once every current rule is satisfied, the next rule is added shortly after.
   Keep going.
4. A strength bar tracks your progress: **red** below 33%, **amber** below 66%,
   **green** above. It fills as a fraction of all twelve rules, not of the ones
   currently shown.
5. Satisfy all twelve and you get a **Congratulations!** screen showing your final
   password. **Play Again** resets everything.

## Controls

- **Type in the password field** — the entire game. All checks happen on `input`
  events; there are no keyboard shortcuts, no Enter to confirm, and nothing to
  press
- **Play Again button** — only appears on the win screen, and it re-enables the
  field and starts from rule one

There is no submit, no timer and no fail state. You cannot lose — you can only
take as long as you want.

## The Twelve Rules

In the order the game applies them:

1. At least **8 characters** long
2. At least one **uppercase** letter
3. At least one **lowercase** letter
4. At least one **number**
5. At least one **special** character from `!@#$%^&*`
6. **No spaces**
7. At least one **emoji**
8. Contains a **palindrome** — reads the same forwards and backwards
9. Contains a **Roman numeral** (`I`, `V`, `X`, `L`, `C`, `D`, `M`)
10. Contains a **chemical element symbol** (`H`, `He`, `Li`, `Be`, `B`, `C`, `N`,
    `O`, `F`, `Ne`, `Na`, `Mg`, `Al`, `Si`, `P`, `S`, `Cl`, `Ar`, `K`, `Ca`)
11. Contains **leet speak** — at least one of `a/A e/E i/I o/O` **and** at least
    one of `4 3 1 0`
12. At least **20 characters** long

## Tips

- **The palindrome check is cleverer than it looks.** It strips everything that
  is not a letter or digit, then searches *any* substring of length three or more
  for a match against its own reverse. You do not need a whole word like `racecar`
  — any three identical characters in a row works, so `aaa` satisfies it. That is
  the intended trick and it saves a lot of trouble.
- **Rule 11 needs two halves.** Having a normal `a` and a `4` is not enough on its
  own — you need a letter from that set *and* a digit from `4310`. Combining them
  in one token such as `a4` satisfies both halves at once.
- **Rule 10 accepts single letters, and that is a real trap.** `C`, `N` and `O`
  are all valid element symbols, so it may already be satisfied by a word you
  were going to type anyway. Check the rule before contorting the password.
- **Rule 9 collides with rule 10.** `C`, `I` and `M` are both Roman numerals and
  element symbols, and `C` and `I` are also just letters you would use anyway.
- **Plan the last rule early.** Because rule 12 needs 20 characters and rules 5, 7
  and 11 want extra characters anyway, build length as you go rather than padding
  at the end.

## About

This is a self-contained page — markup, styles and logic in one file, with no
framework, no build step and no external requests of any kind.

It implements the same escalating-rules format popularised by Neal Agarwal's
*Password Game* on neal.fun, but the twelve rules here are this site's own
selection and wording.

See `public/games/password-game/ATTRIBUTION.md` for the full provenance record.