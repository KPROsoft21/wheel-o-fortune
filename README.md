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
- Round total and banked winnings
- Full-puzzle solve input
- Next puzzle and reset controls
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
    App.jsx                Main game logic and React UI
    App.css                Game layout, wheel, board, and responsive styling
    index.css              Global CSS defaults
    main.jsx               React app entry point
  README.md
  steps.md
  package.json
  vite.config.js
```

## Gameplay Notes

The current prototype uses a small in-code puzzle list inside `src/App.jsx`. Each round lets the player spin the wheel, guess consonants, buy vowels, or solve the puzzle. Correct consonants add the landed wheel value for each matching letter. Vowels cost `$250`. Solving the puzzle adds the round total to the bank.

This is still a prototype, so `LOSE A TURN` currently displays a message rather than rotating between multiple players.

## Future Improvements

- Multiple players and real turn rotation
- More complete round flow
- Larger puzzle bank
- Puzzle editor or import flow
- Bonus round
- Better animations and sound hooks
- Local score persistence and leaderboard
- Unit tests for core game logic

## Notes

Vite may warn if the local Node.js version is below its preferred version. During development, the app built successfully with Node `20.18.0`, but Vite recommends Node `20.19+` or `22.12+`.
