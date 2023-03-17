import React, { useState } from 'react';
import GameBoard from '../components/GameBoard';
import DifficultySettings from '../components/DifficultySettings';

function App() {
  const [boardSize, setBoardSize] = useState(8);

  return (
    <div className='App h-screen flex flex-col justify-between py-4'>
      <GameBoard boardSize={boardSize} />
      <DifficultySettings onDifficultyChange={setBoardSize} />
    </div>
  );
}

export default App;
