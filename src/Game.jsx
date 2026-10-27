import { useMemo, useState } from 'react'
import MockAd from './MockAd';
import './Game.css'

// These are the sample puzzles the game can cycle through.
const puzzles = [
  { category: 'Athlete', answer: 'LEBRON RAYMONE JAMES' },
  { category: 'Building', answer: 'THE GREAT WALL OF CHINA' },
  { category: 'Quote', answer: 'ICE IN THE VEINS' },
  { category: 'Phrase', answer: 'A PIECE OF CAKE' },
  { category: 'Phrase', answer: 'A WALK IN THE PARK' },
  { category: 'Before & After', answer: 'COFFEE TABLE TENNIS' },
  { category: 'Place', answer: 'THE GRAND CANYON' },
  { category: 'Thing', answer: 'A BRIGHT IDEA' },
]
const totalRounds = 3

function drawPuzzles() {
  const order = puzzles.map((_, index) => index)
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const chosen = order[swapIndex]
    order[swapIndex] = order[index]
    order[index] = chosen
  }
  return order.slice(0, totalRounds)
}

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
const boardWidths = [12, 14, 14, 12]
const initialPlayers = [1, 2, 3].map((number) => ({
  name: `Player ${number}`,
  bank: 0,
  roundTotal: 0,
}))

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

// Keep the board shape fixed while centering whole words in its rows.
function buildPuzzleRows(answer) {
  const words = answer.split(' ')

  function fitWords(widths) {
    const lines = widths.map(() => '')
    let row = 0

    for (const word of words) {
      while (row < widths.length) {
        const next = lines[row] ? `${lines[row]} ${word}` : word
        if (next.length <= widths[row]) {
          lines[row] = next
          break
        }
        row += 1
      }
      if (row === widths.length) return null
    }
    return lines
  }

  const lines = fitWords([14, 14])
  const rowText = lines ? ['', ...lines, ''] : fitWords(boardWidths)
  if (!rowText) throw new Error(`Puzzle is too long for the board: ${answer}`)

  return boardWidths.map((width, row) => {
    const cells = Array(width).fill('')
    const start = Math.floor((width - rowText[row].length) / 2)
    for (const [index, char] of [...rowText[row]].entries()) {
      cells[start + index] = char
    }
    return cells
  })
}


function Game() {
  const [roundIndex, setRoundIndex] = useState(0)
  const [puzzleOrder, setPuzzleOrder] = useState(drawPuzzles)

  // guessedLetters controls which letters are visible on the board.
  const [guessedLetters, setGuessedLetters] = useState([])

  // spinValue is the latest wheel result; consonants can only be picked after money is spun.
  const [spinValue, setSpinValue] = useState(null)

  // rotation is the CSS angle used to animate the wheel.
  const [rotation, setRotation] = useState(0)

  const [players, setPlayers] = useState(initialPlayers)
  const [activePlayer, setActivePlayer] = useState(0)
  const [isSolved, setIsSolved] = useState(false)

  // message is the short instruction/result text shown under the board.
  const [message, setMessage] = useState('Spin the wheel to start.')

  // isSpinning prevents clicking things while the wheel animation is running.
  const [isSpinning, setIsSpinning] = useState(false)
  const [isBuyingVowel, setIsBuyingVowel] = useState(false)

  // solveGuess stores what the player types in the solve input.
  const [solveGuess, setSolveGuess] = useState('')

  // Pull the current puzzle object from the puzzle list.
  const puzzle = puzzles[puzzleOrder[roundIndex]]
  const boardRows = buildPuzzleRows(puzzle.answer)

  // Track only real answer letters; spaces and punctuation do not need guesses.
  const answerLetters = useMemo(
    () => new Set(puzzle.answer.replace(/[^A-Z]/g, '').split('')),
    [puzzle.answer],
  )
  const gameOver = isSolved && roundIndex === totalRounds - 1
  const highestBank = Math.max(...players.map((player) => player.bank))
  const winners = gameOver
    ? players.filter((player) => player.bank === highestBank)
    : []
  const winnerMessage = winners.length === 1
    ? `${winners[0].name} wins with $${highestBank}!`
    : `Tie: ${winners.map((player) => player.name).join(', ')} each banked $${highestBank}!`
  const roundTotal = players[activePlayer].roundTotal
  const canBuyVowel = !isSpinning && !isSolved && spinValue === null &&
    roundTotal >= 250 && vowels.some((vowel) => !guessedLetters.includes(vowel))

  function updateActivePlayer(changes) {
    setPlayers((current) => current.map((player, index) =>
      index === activePlayer ? { ...player, ...changes(player) } : player,
    ))
  }

  function passTurn(message) {
    const nextPlayer = (activePlayer + 1) % players.length
    setSpinValue(null)
    setIsBuyingVowel(false)
    setSolveGuess('')
    setActivePlayer(nextPlayer)
    setMessage(`${message} ${players[nextPlayer].name}'s turn.`)
  }

  function finishPuzzle(total) {
    setGuessedLetters([...answerLetters])
    updateActivePlayer((player) => ({ bank: player.bank + total, roundTotal: total }))
    setSpinValue(null)
    setIsBuyingVowel(false)
    setIsSolved(true)
    setMessage(`${players[activePlayer].name} solved it and banked $${total}!`)
  }

  // Clears the current round and optionally jumps to a different puzzle.
  function resetRound(nextIndex = roundIndex) {
    setRoundIndex(nextIndex)
    setGuessedLetters([])
    setSpinValue(null)
    setIsBuyingVowel(false)
    setPlayers((current) => current.map((player) => ({ ...player, roundTotal: 0 })))
    setIsSolved(false)
    setSolveGuess('')
    setMessage('Spin the wheel to start.')
  }

  // Spins the wheel, waits for the animation, then applies the landed value.
  function spinWheel() {
    if (isSpinning || isSolved || spinValue !== null || isBuyingVowel) return

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
        updateActivePlayer(() => ({ roundTotal: 0 }))
        passTurn(`${players[activePlayer].name} went bankrupt.`)
        return
      }

      if (value === 'LOSE A TURN') {
        passTurn(`${players[activePlayer].name} lost a turn.`)
        return
      }

      setMessage(`You landed on $${value}. Pick a consonant.`)
    }, 3900)
  }

  // Handles both consonant guesses and vowel purchases.
  function guessLetter(letter) {
    if (guessedLetters.includes(letter) || isSolved || isSpinning) return
    const isVowel = vowels.includes(letter)
    if (isVowel ? !canBuyVowel || !isBuyingVowel : typeof spinValue !== 'number') return
    if (isVowel) setIsBuyingVowel(false)

    // Count how many times the guessed letter appears in the answer.
    const nextLetters = [...guessedLetters, letter]
    const count = puzzle.answer.split('').filter((char) => char === letter).length
    setGuessedLetters(nextLetters)

    // Wrong guesses end the current spin value and ask for another spin.
    if (count === 0) {
      if (isVowel) updateActivePlayer((player) => ({ roundTotal: player.roundTotal - 250 }))
      passTurn(`No ${letter}.`)
      return
    }

    // Vowels cost a flat amount and do not use the spun wheel value.
    if (isVowel) {
      const nextTotal = roundTotal - 250
      if ([...answerLetters].every((answerLetter) => nextLetters.includes(answerLetter))) finishPuzzle(nextTotal)
      else {
        updateActivePlayer(() => ({ roundTotal: nextTotal }))
        setMessage(`${count} ${letter}${count > 1 ? "'s" : ''}. ${players[activePlayer].name} keeps the turn.`)
      }
      return
    }

    // Consonants earn the wheel value for every matching letter.
    if (typeof spinValue === 'number') {
      const nextTotal = roundTotal + count * spinValue
      if ([...answerLetters].every((answerLetter) => nextLetters.includes(answerLetter))) finishPuzzle(nextTotal)
      else {
        updateActivePlayer(() => ({ roundTotal: nextTotal }))
        setSpinValue(null)
        setMessage(`${count} ${letter}${count > 1 ? "'s" : ''}. ${players[activePlayer].name} keeps the turn.`)
      }
    }
  }

  // Checks the typed solve attempt against the full puzzle answer.
  function solvePuzzle(event) {
    event.preventDefault()
    const guess = normalizeAnswer(solveGuess)

    if (!guess || isSolved || isSpinning) return

    if (guess === puzzle.answer) {
      finishPuzzle(roundTotal)
      return
    }

    passTurn('Incorrect solve.')
  }

  // A solved puzzle advances the game until the third round is complete.
  function nextRound() {
    if (!isSolved || gameOver) return
    setActivePlayer((current) => (current + 1) % players.length)
    resetRound(roundIndex + 1)
  }

  function newGame() {
    setPuzzleOrder(drawPuzzles())
    setPlayers(initialPlayers.map((player) => ({ ...player })))
    setActivePlayer(0)
    resetRound(0)
  }

  return (
    //header for ads
    <>
    <header className ="ad-slot">
      <MockAd size = {[728, 90]} />
    </header>
    {/* Main page wrapper: board on the left, wheel/actions on the right.*/}
    <main className="game-shell">
      {/* Main gameplay area with category, puzzle board, solve form, and letters. */}
      <section className="board-section">
        {/* Header shows the puzzle category and the current money totals. */}
        <div className="game-header">
          <div>
            <p className="eyebrow">Wheel of Fortune · Round {roundIndex + 1} of {totalRounds}</p>
            <h1>{puzzle.category}</h1>
          </div>
        </div>

        <div className="scoreboard" aria-label="Player scores">
          {players.map((player, index) => (
            <div
              className={`player-score${index === activePlayer && !isSolved ? ' active' : ''}${gameOver && winners.some((winner) => winner.name === player.name) ? ' winner' : ''}`}
              key={player.name}
              aria-current={index === activePlayer && !isSolved ? 'true' : undefined}
            >
              <strong>{player.name}{index === activePlayer && !isSolved ? ' · Playing' : ''}</strong>
              <span>Round ${player.roundTotal}</span>
              <span>Bank ${player.bank}</span>
            </div>
          ))}
        </div>

        <div className="puzzle-marquee">
          {/* The puzzle board creates one tile per character in the answer. */}
          <div className="puzzle-board" aria-label="Puzzle board">
            {boardRows.map((row, rowIndex) => (
              <div className={`puzzle-row${row.length === 12 ? ' short' : ''}`} key={rowIndex}>
                {row.map((char, index) => (
                  <span className={/[A-Z]/.test(char) ? 'tile letter' : 'tile'} key={index}>
                    {(guessedLetters.includes(char) || isSolved) && /[A-Z]/.test(char) ? char : ''}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* aria-live lets screen readers announce game messages as they change. */}
        <p className="status" aria-live="polite">
          {message}
        </p>

        {gameOver && <p className="game-result" role="status">Final result after {totalRounds} rounds: {winnerMessage}</p>}

        {/* Players can type the full answer here when they think they know it. */}
        <form className="solve-form" onSubmit={solvePuzzle}>
          <input
            value={solveGuess}
            onChange={(event) => setSolveGuess(event.target.value)}
            placeholder="Solve the puzzle"
            aria-label="Solve the puzzle"
            disabled={isSolved || isSpinning}
          />
          <button type="submit" disabled={isSolved || isSpinning}>Solve</button>
        </form>

        {/* Letter buttons are disabled until the game rules allow that letter. */}
        <div className="letter-grid" aria-label="Letter guesses">
          {alphabet.map((letter) => {
            const isVowel = vowels.includes(letter)
            const canPickConsonant = typeof spinValue === 'number' && !isVowel
            const canPickVowel = isVowel && canBuyVowel && isBuyingVowel

            // Consonants require a money spin; vowels require enough round cash.
            const disabled =
              guessedLetters.includes(letter) ||
              isSolved ||
              isSpinning ||
              (!canPickConsonant && !canPickVowel)

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
            className="vowel-button"
            type="button"
            onClick={() => {
              setIsBuyingVowel((current) => !current)
              setMessage(isBuyingVowel ? 'Spin the wheel or solve the puzzle.' : 'Choose a vowel. It costs $250.')
            }}
            disabled={!canBuyVowel}
          >
            {isBuyingVowel ? 'Cancel Vowel' : 'Buy a Vowel · $250'}
          </button>
          <button
            className="spin-button"
            type="button"
            onClick={spinWheel}
            disabled={isSpinning || isSolved || spinValue !== null || isBuyingVowel}
          >
            {isSpinning ? 'Spinning...' : 'Spin Wheel'}
          </button>
          {gameOver ? (
            <button type="button" onClick={newGame}>Play Again</button>
          ) : (
            <>
              <button type="button" onClick={nextRound} disabled={!isSolved || isSpinning}>
                Next Round
              </button>
              <button type="button" onClick={() => resetRound()} disabled={isSpinning || isSolved}>
                Reset Round
              </button>
            </>
          )}
        </div>
      </aside>
    </main>
    </>
  )
  

  
}

export default Game;
