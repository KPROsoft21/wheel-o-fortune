<div align="center">
  <h1><b>Wheel of Fortune</b></h1>
  <p>
    <a href="https://wheel-o-fortune.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/demo-live-brightgreen" alt="Live Demo" />
    </a>
    <a href="https://react.dev/" target="_blank">
      <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
    </a>
    <a href="https://vite.dev/" target="_blank">
      <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite" alt="Vite 8" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript" alt="JavaScript" />
    </a>
  </p>
</div>

A polished browser-based Wheel of Fortune-style game built with React and Vite. This project recreates the core loop of the classic game show with a spinning wheel, player turns, puzzle solving, scoring, and a playable round-based experience.

---

## Table of contents

- [About](#about)
- [Tech stack](#tech-stack)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
  - [Clone](#clone)
  - [Install dependencies](#install-dependencies)
- [Run the app](#run-the-app)
- [Project structure](#project-structure)
- [Controls](#controls)
- [Contributors](#contributors)
- [Contributing](#contributing)
- [License](#license)

---

## About

Wheel of Fortune is a front-end game prototype inspired by the classic television game show. It includes a menu screen, rotating prize wheel, clue categories, three-player turn-taking, letter guessing, vowel buying, puzzle solving, and final winner logic.

The project is intentionally compact, readable, and easy to extend, making it a strong starting point for learning game-state logic and front-end UI patterns in React.

## Tech stack

- Language: JavaScript
- Frontend library: React 19
- Build tooling: Vite 8
- Styling: CSS3
- Linting: Oxlint
- Platform: Web browser

### Language composition

- JavaScript: 60.8%
- CSS: 38.2%
- HTML: 1.0%

## Features

- Interactive spinning wheel with dollar values, BANKRUPT, and LOSE A TURN
- Three-player gameplay with separate round totals and bank totals
- Puzzle board that reveals correctly guessed letters
- Vowel-buying system when a player has enough round money
- Randomized puzzle rotation across multiple rounds
- Full solve input for guessing the final answer
- Responsive layout for desktop and smaller screens
- Clean game-state flow and replay logic

## Requirements

- Node.js 20.19+ or newer LTS recommended
- npm 10+

## Installation

### Clone

```bash
git clone https://github.com/KPROsoft21/wheel-o-fortune.git
cd wheel-o-fortune
```

### Install dependencies

```bash
npm install
```

## Run the app

Start the local development server:

```bash
npm run dev
```

To produce a production build:

```bash
npm run build
```

To preview the built app locally:

```bash
npm run preview
```

To run lint checks:

```bash
npm run lint
```

## Project structure

```text
wheel-o-fortune/
├── public/                     Static assets and public files
├── src/
│   ├── App.jsx                 App-level screen flow
│   ├── Game.jsx                Core gameplay logic and UI
│   ├── Game.css                Game styling and responsive layout
│   ├── Menu.css                Intro menu styling
│   ├── menu.jsx                Start menu component
│   ├── MockAd.jsx              Placeholder ad component
│   ├── index.css               Global styles
│   ├── main.jsx                React entry point
│   └── assets/
│       └── menu-wheel.svg      SVG asset for the menu
├── .gitignore                  Ignore rules
├── index.html                  HTML entry point
├── package.json                Project metadata and scripts
├── package-lock.json           Lock file
├── vite.config.js              Vite configuration
├── README.md                   Project documentation
└── public/                     Additional public assets
```

## Controls

The game is built to be easy to test and interact with in the browser. The main gameplay flow is:

- Spin the wheel to reveal a money value or special event
- Pick a consonant or buy a vowel when eligible
- Solve the puzzle when you believe you know the answer
- Advance through rounds until the final winner is determined

## Contributors

This project was developed with contributions from:

- [KPROsoft21](https://github.com/KPROsoft21)
- [Gabriel-Robinson](https://github.com/Gabriel-Robinson)
- [Munozd4](https://github.com/Munozd4)

## Contributing

Contributions are welcome. If you want to improve the game, please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` and `npm run build`
5. Open a pull request with a clear description of your update

## License

This repository does not currently include a license file. If you plan to reuse, distribute, or publish this project publicly, confirm the licensing status with the project owner before doing so.

---

<div align="center">
  <p><em>Built with React, Vite, and a classic Wheel of Fortune-inspired game loop.</em></p>
</div>
