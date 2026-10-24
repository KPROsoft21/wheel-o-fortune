import { useState } from 'react';
import Menu from './menu.jsx';
import Game from './Game.jsx';

function App() {
  // The initial state of the screen is menu
  const [screen, setScreen] = useState('menu');

  function startGame() {
    setScreen('game');
  }

  return (
    <>
    {/* Changes the component to Game.jsx when startGame is called */}
      {screen === 'menu' ? (
        <Menu onStart={startGame} />

      ) : (
        <Game />
      )}
    </>
  )
}

export default App;

