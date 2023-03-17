import React from 'react';

const DifficultySettings = ({ onDifficultyChange }) => {
  return (
    <div className='flex justify-center mt-4'>
      <button
        onClick={() => onDifficultyChange(8)}
        className='bg-green-500 text-white font-bold py-2 px-4 mx-2 rounded-md focus:outline-none'>
        Easy
      </button>
      <button
        onClick={() => onDifficultyChange(12)}
        className='bg-yellow-500 text-white font-bold py-2 px-4 mx-2 rounded-md focus:outline-none'>
        Medium
      </button>
      <button
        onClick={() => onDifficultyChange(16)}
        className='bg-red-500 text-white font-bold py-2 px-4 mx-2 rounded-md focus:outline-none'>
        Hard
      </button>
      <button
        onClick={() => onDifficultyChange(20)}
        className='bg-purple-500 text-white font-bold py-2 px-4 mx-2 rounded-md focus:outline-none'>
        Extreme
      </button>
    </div>
  );
};

export default DifficultySettings;
