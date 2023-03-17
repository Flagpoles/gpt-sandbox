import React, { useState, useEffect } from 'react';

const GameBoard = ({ boardSize }) => {
  const [board, setBoard] = useState([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [mineCount, setMineCount] = useState(
    Math.floor(boardSize * boardSize * 0.15)
  );

  const generateBoard = () => {
    const board = [];
    for (let i = 0; i < boardSize; i++) {
      const row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push({
          row: i,
          col: j,
          hasMine: false,
          isRevealed: false,
          isFlagged: false,
        });
      }
      board.push(row);
    }
    return board;
  };

  const placeMines = (board, mineCount) => {
    let minesPlaced = 0;

    while (minesPlaced < mineCount) {
      const row = Math.floor(Math.random() * boardSize);
      const col = Math.floor(Math.random() * boardSize);

      if (!board[row][col].hasMine) {
        board[row][col].hasMine = true;
        minesPlaced++;
      }
    }

    return board;
  };

  const calculateSurroundingMines = (board, row, col) => {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    let count = 0;

    directions.forEach(([rowDelta, colDelta]) => {
      const newRow = row + rowDelta;
      const newCol = col + colDelta;

      if (
        newRow >= 0 &&
        newRow < boardSize &&
        newCol >= 0 &&
        newCol < boardSize &&
        board[newRow][newCol].hasMine
      ) {
        count++;
      }
    });

    return count;
  };

  const revealCell = (row, col) => {
    if (board[row][col].isRevealed || board[row][col].isFlagged) return;

    const newBoard = [...board];
    newBoard[row][col].isRevealed = true;
    setBoard(newBoard);

    if (newBoard[row][col].hasMine) {
      alert('Game Over!');
      // Reset the game
      const resetBoard = generateBoard();
      const boardWithMines = placeMines(resetBoard, mineCount);
      setBoard(boardWithMines);
      setRevealedCount(0);
      return;
    }

    const surroundingMines = calculateSurroundingMines(newBoard, row, col);

    if (surroundingMines === 0) {
      // Reveal surrounding cells
      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      directions.forEach(([rowDelta, colDelta]) => {
        const newRow = row + rowDelta;
        const newCol = col + colDelta;

        if (
          newRow >= 0 &&
          newRow < boardSize &&
          newCol >= 0 &&
          newCol < boardSize
        ) {
          revealCell(newRow, newCol);
        }
      });
    } else {
      newBoard[row][col].surroundingMines = surroundingMines;
    }

    const nonMineCount = boardSize * boardSize - mineCount;
    if (revealedCount === nonMineCount) {
      alert('Congratulations! You won the game!');
      // Reset the game
      const resetBoard = generateBoard();
      const boardWithMines = placeMines(resetBoard, mineCount);
      setBoard(boardWithMines);
      setRevealedCount(0);
    }
  };

  const toggleFlag = (row, col, e) => {
    e.preventDefault();

    if (board[row][col].isRevealed) return;

    const newBoard = [...board];
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
  };

  useEffect(() => {
    const newBoard = generateBoard();
    const newMineCount = Math.floor(boardSize * boardSize * 0.15);
    setMineCount(newMineCount);
    const boardWithMines = placeMines(newBoard, newMineCount);
    setBoard(boardWithMines);
  }, [boardSize]);

  return (
    <div className='flex justify-center items-center'>
      <div className='bg-gray-100 rounded-md p-4'>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className='flex'>
            {row.map((cell, colIndex) => (
              <button
                key={colIndex}
                onClick={() => revealCell(rowIndex, colIndex)}
                onContextMenu={(e) => toggleFlag(rowIndex, colIndex, e)}
                className={`w-10 h-10 ${
                  cell.isRevealed
                    ? 'bg-gray-200'
                    : cell.isFlagged
                    ? 'bg-red-500'
                    : 'bg-blue-500'
                } text-black font-bold rounded-md border border-blue-700 focus:outline-none`}>
                {cell.isRevealed
                  ? cell.surroundingMines > 0
                    ? cell.surroundingMines
                    : ''
                  : '?'}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
