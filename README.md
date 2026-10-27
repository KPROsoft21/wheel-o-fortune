# Wheel of Fortune

A polished browser-based Wheel of Fortune-style game built with React and Vite. The project recreates the classic gameplay loop with a spinning wheel, player turns, puzzle solving, round progression, and final scoring in a clean, readable codebase.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://wheel-o-fortune.vercel.app/)  
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)  
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vite.dev/)  
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

Live demo: https://wheel-o-fortune.vercel.app/

## Overview

Wheel of Fortune is a front-end game prototype inspired by the classic TV show. It includes a menu screen, a rotating prize wheel, clue categories, three-player turn-taking, letter guessing, vowel purchases, puzzle solving, and end-of-game winner detection.

This repository is intentionally structured as a clear and extensible prototype for learning, iteration, and future enhancement.

## Highlights

- Interactive spinning wheel with special spaces such as BANKRUPT and LOSE A TURN
- Three-player turn system with separate round totals and banked totals
- Puzzle board with hidden/revealed letters and category-based rounds
- Vowel-buying mechanic and solve input for full puzzle attempts
- Randomized round order across multiple puzzles
- Responsive layout for desktop and smaller screens
- Clean frontend architecture built with React and Vite

## Tech Stack

This project is primarily built with the following technologies:

- React 19
- Vite 8
- JavaScript (ES modules)
- HTML5
- CSS3
- Oxlint for code quality checks

### Language Composition

- JavaScript: 60.8%
- CSS: 38.2%
- HTML: 1.0%

## Project Structure

```text
wheel-o-fortune/
├── public/                     Static assets and public files
├── src/
│   ├── App.jsx                 App-level screen flow and route state
│   ├── Game.jsx                Core game logic and gameplay UI
│   ├── Game.css                Styling for board, wheel, scoreboard, and layout
│   ├── Menu.css                Landing screen styling
│   ├── menu.jsx                Start menu component
│   ├── MockAd.jsx              Placeholder ad component
│   ├── index.css               Global app styling
│   ├── main.jsx                React application entry point
│   └── assets/
│       └── menu-wheel.svg      SVG art for the intro screen
├── .gitignore                  Ignore rules for generated and local files
├── index.html                  HTML entry point
├── package.json                Project metadata and scripts
├── package-lock.json           Dependency lockfile
├── vite.config.js             Vite configuration
├── README.md                  Project documentation
└── public/                    Additional public assets
```

## Features

- TV-style puzzle board with masked letters and category display
- Randomized puzzle selection across three rounds
- Animated wheel with dollar values, bankrupt, and lose-a-turn outcomes
- Fixed pointer alignment for the wheel spin mechanic
- Consonant guessing after a valid spin
- Vowel buying once the active player has at least $250 in round money
- Separate round totals and bank totals for all players
- Winner calculation based on bank totals, including tie handling
- Reset and replay actions for testing and gameplay iteration

## Architecture

The app is intentionally simple and organized around a small set of core files:

- `src/App.jsx` manages the screen state and transitions between the menu and the game
- `src/menu.jsx` renders the landing/start screen
- `src/Game.jsx` contains the gameplay engine, wheel logic, scoring, win conditions, and puzzle flow
- `src/Game.css` contains the game-specific styling and responsive UI layout
- `src/Menu.css` handles the start menu visual treatment

This separation keeps the project readable and easy to expand as new game rules or UX improvements are added.

## Getting Started

### Prerequisites

Before running the app locally, make sure you have the following installed:

- Node.js 20.19+ or newer LTS recommended
- npm 10+

### Installation

```bash
git clone https://github.com/KPROsoft21/wheel-o-fortune.git
cd wheel-o-fortune
npm install
```

### Run the development server

```bash
npm run dev
```

This starts the Vite development server and launches the app locally in the browser.

### Production build

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### Local preview

```bash
npm run preview
```

## Available Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| Development | `npm run dev` | Starts the local Vite app |
| Production Build | `npm run build` | Builds the app for deployment |
| Lint | `npm run lint` | Runs code quality checks with Oxlint |
| Preview | `npm run preview` | Serves the production build locally |

## Contributors

This project was developed with contributions from the following people:

- [KPROsoft21](https://github.com/KPROsoft21)
- [Gabriel-Robinson](https://github.com/Gabriel-Robinson)
- [Munozd4](https://github.com/Munozd4)

## Contributing

Contributions are welcome. If you’d like to improve the app, please follow this workflow:

1. Fork the repository
2. Create a feature branch
3. Make your changes and keep the code readable and maintainable
4. Run lint and build checks
5. Open a pull request with a clear description of the update

## License

This repository does not currently include a license file. If you plan to reuse, modify, or distribute the project in a public or commercial setting, please confirm the appropriate licensing terms with the project owner before doing so.

## Notes

- The project is intentionally built as a prototype and is not a full production game platform
- The gameplay rules and UI are designed to be easy to understand and extend
- Vite may show a Node version warning depending on local environment setup; using a newer LTS version is recommended

---

Built with React, Vite, and a classic game loop inspired by Wheel of Fortune.
