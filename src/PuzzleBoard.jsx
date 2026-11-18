
import './Game.css';

function PuzzleBoard({ boardRows, revealedLetters, isSolved }) {

  return (
    <div className="puzzle-marquee">
      <div className="puzzle-board" aria-label="Puzzle board">

        {boardRows.map((row, rowIndex) => (
          <div
            className={`puzzle-row${row.length === 12 ? ' short' : ''}`}
            key={rowIndex}
          >
            {row.map((char, index) => (
              <span
                className={/[A-Z]/.test(char) ? 'tile letter' : 'tile'}
                key={index}
              >
                {(revealedLetters.includes(char) || isSolved) &&
                  /[A-Z]/.test(char) ? char : ''}
              </span>
            ))}
          </div>
        ))}

      </div>
    </div>
  );
}

export default PuzzleBoard;
