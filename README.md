# Wheel of Fortune Prototype

A simple React prototype inspired by the TV game show format. The app includes a puzzle board, category display, animated money wheel, consonant guesses, vowel purchases, special wheel spaces, solving, and basic score tracking.

## Overview

This project is meant to be a buildable starting point rather than a complete production game. The code is intentionally kept small, readable, and heavily commented so future engineers can add features without having to untangle a large architecture first.

## Features

- TV-style puzzle board with hidden and revealed letters
- Puzzle categories and sample answers
- Animated wheel with dollar values, `BANKRUPT`, and `LOSE A TURN`
- Wheel result alignment with the fixed pointer
- Consonant guessing after a money spin
- Vowel buying when the round total is at least `$250`
- Separate round totals and banked winnings for three players
- Three rounds followed by a winner based on banked winnings, with ties shown
- Turn rotation after missed guesses, incorrect solves, `BANKRUPT`, and `LOSE A TURN`
- Full-puzzle solve input
- Next round, reset round, and play again controls
- Responsive layout for desktop and smaller screens
- `steps.md` build log for project history and command notes

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Oxlint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
wheel-of-fortune/
  public/                  Static public assets
  src/
    App.jsx                Menu and game navigation
    Game.jsx               Game logic and React UI
    Game.css               Game layout, wheel, board, and responsive styling
    index.css              Global CSS defaults
    main.jsx               React app entry point
  README.md
  steps.md
  package.json
  vite.config.js
```

## Gameplay Notes

The prototype uses a small in-code puzzle list inside `src/Game.jsx`. Three players share the puzzle board and take turns. Correct consonants add the landed wheel value for each matching letter to the current player's round total. Vowels cost `$250`. A missed guess, incorrect solve, `BANKRUPT`, or `LOSE A TURN` passes play to the next player. Bankrupt clears only that player's round total. Solving the puzzle banks the solver's round total. After each of the first two solves, Next Round clears round totals and keeps each player's bank. After the third solve, the highest bank wins; equal top scores produce a tie. Play Again starts a new three-round game.

## Future Improvements

- More complete round flow
- Larger puzzle bank
- Puzzle editor or import flow
- Bonus round
- Better animations and sound hooks
- Local score persistence and leaderboard
- Unit tests for core game logic

## Notes

Vite may warn if the local Node.js version is below its preferred version. During development, the app built successfully with Node `20.18.0`, but Vite recommends Node `20.19+` or `22.12+`.
