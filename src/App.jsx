import { useMemo, useState } from 'react'
import {useEffect} from "react";
import MockAd from './MockAd';
import './App.css'

// These are the sample puzzles the game can cycle through.
const puzzles = [
  { category: 'Phrase', answer: 'A WALK IN THE PARK' },
  { category: 'Before & After', answer: 'COFFEE TABLE TENNIS' },
  { category: 'Place', answer: 'THE GRAND CANYON' },
  { category: 'Thing', answer: 'A BRIGHT IDEA' },
]

// Each item here becomes one slice on the wheel.
const wheelValues = [
  500,
  650,
  700,
  800,
  'BANKRUPT',
  900,
  550,
  600,
  'LOSE A TURN',
  750,
  1000,
  500,
]

// These helper lists make it easy to tell vowels and consonants apart.
const vowels = ['A', 'E', 'I', 'O', 'U']
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// Wheel slice colors match the order of wheelValues above.
const wheelColors = [
  '#2563eb',
  '#db2777',
  '#ea580c',
  '#16a34a',
  '#111827',
  '#7c3aed',
  '#0891b2',
  '#ca8a04',
  '#475569',
  '#dc2626',
  '#0d9488',
  '#9333ea',
]

// Every wheel slice gets the same number of degrees.
const wheelSliceAngle = 360 / wheelValues.length

// The conic gradient starts at the top, so labels use the same -90 degree origin.
const wheelStartAngle = -90

// Creates the colored wheel background from the wheelValues array.
function buildWheelGradient() {
  const slice = 100 / wheelValues.length

  return `conic-gradient(from -90deg, ${wheelValues
    .map((_, index) => {
      const start = index * slice
      const end = (index + 1) * slice
      return `${wheelColors[index]} ${start}% ${end}%`
    })
    .join(', ')})`
}

// Makes solve guesses easier to compare by ignoring case and extra spaces.
function normalizeAnswer(value) {
  return value.trim().replace(/\s+/g, ' ').toUpperCase()
}


function App() {
  // puzzleIndex chooses which puzzle from the puzzles list is currently active.
  const [puzzleIndex, setPuzzleIndex] = useState(0)

  // guessedLetters controls which letters are visible on the board.
  const [guessedLetters, setGuessedLetters] = useState([])

  // spinValue is the latest wheel result; consonants can only be picked after money is spun.
  const [spinValue, setSpinValue] = useState(null)

  // rotation is the CSS angle used to animate the wheel.
  const [rotation, setRotation] = useState(0)

  // bank is the player's saved money, while roundTotal is only for the current puzzle.
  const [bank, setBank] = useState(0)
  const [roundTotal, setRoundTotal] = useState(0)

  // message is the short instruction/result text shown under the board.
  const [message, setMessage] = useState('Spin the wheel to start.')

  // isSpinning prevents clicking things while the wheel animation is running.
  const [isSpinning, setIsSpinning] = useState(false)

  // solveGuess stores what the player types in the solve input.
  const [solveGuess, setSolveGuess] = useState('')

  // Pull the current puzzle object from the puzzle list.
  const puzzle = puzzles[puzzleIndex]

  // Track only real answer letters; spaces and punctuation do not need guesses.
  const answerLetters = useMemo(
    () => new Set(puzzle.answer.replace(/[^A-Z]/g, '').split('')),
    [puzzle.answer],
  )
  const isSolved = [...answerLetters].every((letter) =>
    guessedLetters.includes(letter),
  )

  // Clears the current round and optionally jumps to a different puzzle.
  function resetRound(nextIndex = puzzleIndex) {
    setPuzzleIndex(nextIndex)
    setGuessedLetters([])
    setSpinValue(null)
    setRoundTotal(0)
    setSolveGuess('')
    setMessage('Spin the wheel to start.')
  }

  // Spins the wheel, waits for the animation, then applies the landed value.
  function spinWheel() {
    if (isSpinning || isSolved) return

    // Pick the result first, then animate the wheel to visually land there.
    const landedIndex = Math.floor(Math.random() * wheelValues.length)

    // Rotate the chosen slice center under the fixed pointer at the top.
    const landedCenter = landedIndex * wheelSliceAngle + wheelSliceAngle / 2
    const targetAngle = (360 - landedCenter) % 360
    const nextRotation = (Math.floor(rotation / 360) + 5) * 360 + targetAngle

    setIsSpinning(true)
    setSpinValue(null)
    setMessage('Round and round...')
    setRotation(nextRotation)

    // The timeout matches the CSS transition so the result appears after the spin.
    window.setTimeout(() => {
      const value = wheelValues[landedIndex]
      setSpinValue(value)
      setIsSpinning(false)

      // Bankrupt wipes out only the current puzzle's money.
      if (value === 'BANKRUPT') {
        setRoundTotal(0)
        setMessage('Bankrupt. Your round total is back to $0.')
        return
      }

      // This prototype does not have multiple players yet, so it just tells the user.
      if (value === 'LOSE A TURN') {
        setMessage('Lose a turn. Spin again when you are ready.')
        return
      }

      setMessage(`You landed on $${value}. Pick a consonant.`)
    }, 3900)
  }

  // Handles both consonant guesses and vowel purchases.
  function guessLetter(letter) {
    if (guessedLetters.includes(letter) || isSolved) return

    // Count how many times the guessed letter appears in the answer.
    const nextLetters = [...guessedLetters, letter]
    const count = puzzle.answer.split('').filter((char) => char === letter).length
    const isVowel = vowels.includes(letter)

    setGuessedLetters(nextLetters)

    // Wrong guesses end the current spin value and ask for another spin.
    if (count === 0) {
      setSpinValue(null)
      setMessage(`No ${letter}. Spin again.`)
      return
    }

    // Vowels cost a flat amount and do not use the spun wheel value.
    if (isVowel) {
      setRoundTotal((total) => Math.max(0, total - 250))
      setMessage(`${count} ${letter}${count > 1 ? "'s" : ''}.`)
      return
    }

    // Consonants earn the wheel value for every matching letter.
    if (typeof spinValue === 'number') {
      setRoundTotal((total) => total + count * spinValue)
      setSpinValue(null)
      setMessage(`${count} ${letter}${count > 1 ? "'s" : ''}. Spin again.`)
    }
  }

  // Checks the typed solve attempt against the full puzzle answer.
  function solvePuzzle(event) {
    event.preventDefault()
    const guess = normalizeAnswer(solveGuess)

    if (!guess) return

    if (guess === puzzle.answer) {
      // Revealing every unique letter makes the board show the solved answer.
      const allLetters = [...answerLetters]
      setGuessedLetters(allLetters)
      setBank((total) => total + roundTotal)
      setMessage(`Solved! You banked $${roundTotal}.`)
      return
    }

    setMessage('Not quite. Keep playing.')
  }

  // Moves to the next puzzle and wraps back to the first one at the end.
  function nextPuzzle() {
    resetRound((puzzleIndex + 1) % puzzles.length)
  }

  return (
    //header for ads
    <>
    <header className ="ad-slot">
      <MockAd size = {[728, 90]} />
    </header>
    // Main page wrapper: board on the left, wheel/actions on the right.
    <main className="game-shell">
      {/* Main gameplay area with category, puzzle board, solve form, and letters. */}
      <section className="board-section">
        {/* Header shows the puzzle category and the current money totals. */}
        <div className="game-header">
          <div>
            <p className="eyebrow">Wheel of Fortune Demo</p>
            <h1>{puzzle.category}</h1>
          </div>
          <div className="scoreboard">
            <span>Round ${roundTotal}</span>
            <strong>Bank ${bank}</strong>
          </div>
        </div>

        {/* The puzzle board creates one tile per character in the answer. */}
        <div className="puzzle-board" aria-label="Puzzle board">
          {puzzle.answer.split('').map((char, index) => {
            const isLetter = /[A-Z]/.test(char)
            const isRevealed = guessedLetters.includes(char) || isSolved

            return (
              // Non-letter characters become blank spacer tiles.
              <span
                className={isLetter ? 'tile' : 'tile blank'}
                key={`${char}-${index}`}
              >
                {isLetter && isRevealed ? char : ''}
              </span>
            )
          })}
        </div>

        {/* aria-live lets screen readers announce game messages as they change. */}
        <p className="status" aria-live="polite">
          {isSolved ? 'Puzzle solved. Load the next one or keep tinkering.' : message}
        </p>

        {/* Players can type the full answer here when they think they know it. */}
        <form className="solve-form" onSubmit={solvePuzzle}>
          <input
            value={solveGuess}
            onChange={(event) => setSolveGuess(event.target.value)}
            placeholder="Solve the puzzle"
            aria-label="Solve the puzzle"
          />
          <button type="submit">Solve</button>
        </form>

        {/* Letter buttons are disabled until the game rules allow that letter. */}
        <div className="letter-grid" aria-label="Letter guesses">
          {alphabet.map((letter) => {
            const isVowel = vowels.includes(letter)
            const canPickConsonant = typeof spinValue === 'number' && !isVowel
            const canBuyVowel = isVowel && roundTotal >= 250

            // Consonants require a money spin; vowels require enough round cash.
            const disabled =
              guessedLetters.includes(letter) ||
              isSolved ||
              isSpinning ||
              (!canPickConsonant && !canBuyVowel)

            return (
              <button
                className={isVowel ? 'vowel' : ''}
                disabled={disabled}
                key={letter}
                type="button"
                onClick={() => guessLetter(letter)}
                title={isVowel ? 'Buy vowel for $250' : 'Guess consonant'}
              >
                {letter}
              </button>
            )
          })}
        </div>
      </section>

      {/* Side panel contains the spinning wheel and round control buttons. */}
      <aside className="wheel-panel">
        <div className="wheel-wrap">
          <div className="pointer" aria-hidden="true" />
          <div
            className="wheel"
            style={{
              background: buildWheelGradient(),
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {wheelValues.map((value, index) => {
              // Labels sit at the center angle of their matching wheel segment.
              const angle =
                wheelStartAngle + index * wheelSliceAngle + wheelSliceAngle / 2

              return (
                <span
                  className="slice-label"
                  key={`${value}-${index}`}
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  {/* Show dollar signs only for numeric wheel values. */}
                  <b>{typeof value === 'number' ? `$${value}` : value}</b>
                </span>
              )
            })}
            <div className="wheel-center">SPIN</div>
          </div>
        </div>

        {/* Buttons for the main testing/demo actions. */}
        <div className="actions">
          <button
            className="spin-button"
            type="button"
            onClick={spinWheel}
            disabled={isSpinning || isSolved}
          >
            {isSpinning ? 'Spinning...' : 'Spin Wheel'}
          </button>
          <button type="button" onClick={nextPuzzle}>
            Next Puzzle
          </button>
          <button type="button" onClick={() => resetRound()}>
            Reset Round
          </button>
        </div>
      </aside>
    </main>
    </>
  )
  

  
}

export default App
