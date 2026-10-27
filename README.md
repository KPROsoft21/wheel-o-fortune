# Wheel of Fortune Prototype

A polished React-based game prototype inspired by the classic television game show. This project recreates the core Wheel of Fortune experience in a lightweight, readable codebase built with Vite and React.

Live demo: https://wheel-o-fortune.vercel.app/

## Overview

This repository is designed as a buildable starting point for a game prototype rather than a complete production application. The codebase emphasizes clarity, maintainability, and educational structure so future contributors can extend the gameplay, UI, and rules with minimal friction.

The app includes:

- A menu screen and game screen flow
- A spinning money wheel with special spaces
- Puzzle board rendering and letter masking
- Turn-based gameplay for three players
- Vowel purchasing and solve mechanics
- Round progression and final winner logic

## Features

- TV-style puzzle board with hidden and revealed letters
- Puzzle categories and sample answer bank
- Animated wheel with dollar values, BANKRUPT, and LOSE A TURN
- Fixed pointer alignment with wheel results
- Consonant guessing after a valid spin
- Vowel buying when the active player has at least $250 in round money
- Separate round totals and banked winnings for three players
- Three randomly selected rounds without repeated puzzles
- Winner determination based on banked totals, including ties
- Turn rotation after misses, bankruptcies, and lost turns
- Full-puzzle solve input
- Reset, replay, and next-round controls
- Responsive layout for desktop and smaller screens

## Tech Stack

- React 19
- Vite 8
- JavaScript
- CSS Modules / component-level styling
- Oxlint for linting

## Prerequisites

Before running the app locally, make sure you have the following installed:

- Node.js 20.19+ or 22.12+ recommended
- npm 10+

> Note: Vite may warn if your local Node.js version is below the recommended minimum. The app was successfully built using Node 20.18.0 in development, but newer Node versions are recommended.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/KPROsoft21/wheel-o-fortune.git
cd wheel-o-fortune
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the local development server

```bash
npm run dev
```

This starts the Vite development server and typically opens the app in the browser using the local Vite preview URL.

### 4. Build for production

```bash
npm run build
```

### 5. Run lint checks

```bash
npm run lint
```

### 6. Preview the production build locally

```bash
npm run preview
```

## Available Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| Development | `npm run dev` | Starts the Vite app for local development |
| Production Build | `npm run build` | Compiles the project for deployment |
| Lint | `npm run lint` | Runs Oxlint against the source code |
| Preview | `npm run preview` | Serves the built app locally for testing |

## Project Structure

```text
wheel-o-fortune/
├── public/                     Static public assets
├── src/
│   ├── App.jsx                 Main app shell and screen switching logic
│   ├── Game.jsx                Core Wheel of Fortune game logic and UI
│   ├── Game.css                Gameplay layout, wheel styling, puzzle board, responsiveness
│   ├── Menu.css                Menu screen styling and animated wheel visuals
│   ├── MockAd.jsx              Placeholder advertising component shown above the game board
│   ├── assets/
│   │   └── menu-wheel.svg      SVG asset used by the landing screen
│   ├── index.css               Global styles and base resets
│   ├── main.jsx                React app entry point
│   └── menu.jsx                Start menu component
├── .gitignore                 Git ignore rules
├── index.html                 HTML shell for Vite
├── package.json                Project metadata and scripts
├── package-lock.json           Lockfile for dependency integrity
├── README.md                  Project documentation
├── vite.config.js             Vite configuration
└── public/                    Additional static assets if added later
```

## File-by-File Overview

### Root files

- `package.json`  
  Configures the project scripts, dependencies, and tooling.

- `vite.config.js`  
  Defines the Vite configuration and enables React support.

- `index.html`  
  Provides the root DOM container for the React application.

- `.gitignore`  
  Excludes generated files and local tooling artifacts from source control.

### `src/` directory

- `main.jsx`  
  Boots the React app and mounts it to the root HTML element.

- `App.jsx`  
  Manages the app screen state. It renders the start menu and switches into the play screen when the user begins.

- `menu.jsx`  
  Displays the landing menu screen with the animated wheel and start button.

- `Menu.css`  
  Styles the title screen, wheel illustration, and menu layout.

- `Game.jsx`  
  Contains the entire game engine: wheel values, letter handling, round logic, scoring, solve flow, player state, and rendering for the puzzle board.

- `Game.css`  
  Defines the visual treatment for the gameplay area, letter grid, scoreboard, wheel panel, and responsive layout.

- `index.css`  
  Establishes the base global styling, resets, and common application defaults.

- `MockAd.jsx`  
  A lightweight placeholder component that simulates a top-of-page ad slot in the UI.

- `assets/menu-wheel.svg`  
  The SVG artwork used in the startup menu's rotating wheel graphic.

## Gameplay Notes

The prototype uses a compact in-code puzzle list located in `src/Game.jsx`. At runtime, the game selects three random puzzles without repetition and cycles through them across the session. Each player shares the same board, and the active player can spin the wheel, buy vowels, guess consonants, or attempt a full solve.

The game logic includes:

- Randomized puzzle order
- Wheel spin behavior with special tile handling
- Per-player round totals and bank totals
- Correct-letter scoring based on wheel value
- Full-round reset and replay flow

## Design and Architecture

The application is intentionally simple and intentionally organized around a single core game component:

- `App.jsx` handles navigation between menu and session screens
- `Game.jsx` owns the stateful gameplay rules
- `Game.css` contains the full visual system for the game board and wheel
- `Menu.css` handles the intro screen look and feel

This separation keeps the experience straightforward to follow and easy to extend as the game grows.

## Future Improvements

The project is a strong baseline for future enhancements, including:

- More complete round flow and bonus rounds
- Larger puzzle bank and better puzzle sourcing
- Puzzle editor or import functionality
- Sound effects and richer animations
- Persistent local score tracking or leaderboard support
- Automated tests around game logic and rule validation
- Improved accessibility and keyboard-first interactions

## Contributing

Contributions are welcome. If you want to expand the game, consider the following workflow:

1. Fork the repository
2. Create a feature branch
3. Make your changes and keep the code readable
4. Run lint and build checks
5. Open a pull request with a clear summary of the update

## Notes

- The app is intentionally built as a prototype and not as a full production game system
- The codebase is documented inline to make extension easier for future engineers
- Vite may output a Node version warning depending on the local environment; using a newer LTS version is recommended

## License

This project does not currently include a repository license file. If you plan to reuse or distribute this project publicly, confirm the licensing status with the project owner before doing so.

---

Built as a readable, extensible React game prototype for the Wheel of Fortune gameplay experience.
