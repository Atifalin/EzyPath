import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './Game2048.css';

const GRID_SIZE = 4;
const START_TILES = 2;
const TARGET_TILE = 2048;

const directions = {
  ArrowUp: { x: -1, y: 0 },
  ArrowDown: { x: 1, y: 0 },
  ArrowLeft: { x: 0, y: -1 },
  ArrowRight: { x: 0, y: 1 },
};

const getEmptyCells = (board) => {
  const empty = [];
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      if (!board[row][col]) {
        empty.push({ row, col });
      }
    }
  }
  return empty;
};

const addRandomTile = (board) => {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) return board;

  const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const value = Math.random() < 0.9 ? 2 : 4;

  const newBoard = board.map((r) => [...r]);
  newBoard[row][col] = value;
  return newBoard;
};

const initializeBoard = () => {
  let board = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));

  for (let i = 0; i < START_TILES; i += 1) {
    board = addRandomTile(board);
  }

  return board;
};

const moveAndMerge = (board, directionKey) => {
  const direction = directions[directionKey];
  if (!direction) return { board, moved: false, scoreGain: 0, targetReached: false };

  const newBoard = board.map((row) => [...row]);
  let moved = false;
  let scoreGain = 0;
  let targetReached = false;

  const traverseRows = direction.x === 1 ? [...Array(GRID_SIZE).keys()].reverse() : [...Array(GRID_SIZE).keys()];
  const traverseCols = direction.y === 1 ? [...Array(GRID_SIZE).keys()].reverse() : [...Array(GRID_SIZE).keys()];

  traverseRows.forEach((row) => {
    traverseCols.forEach((col) => {
      if (newBoard[row][col] === 0) return;

      let currentRow = row;
      let currentCol = col;

      while (true) {
        const nextRow = currentRow + direction.x;
        const nextCol = currentCol + direction.y;

        if (
          nextRow < 0 ||
          nextRow >= GRID_SIZE ||
          nextCol < 0 ||
          nextCol >= GRID_SIZE
        ) {
          break;
        }

        if (newBoard[nextRow][nextCol] === 0) {
          newBoard[nextRow][nextCol] = newBoard[currentRow][currentCol];
          newBoard[currentRow][currentCol] = 0;
          currentRow = nextRow;
          currentCol = nextCol;
          moved = true;
        } else if (newBoard[nextRow][nextCol] === newBoard[currentRow][currentCol]) {
          newBoard[nextRow][nextCol] *= 2;
          scoreGain += newBoard[nextRow][nextCol];
          if (newBoard[nextRow][nextCol] === TARGET_TILE) {
            targetReached = true;
          }
          newBoard[currentRow][currentCol] = 0;
          moved = true;
          break;
        } else {
          break;
        }
      }
    });
  });

  return { board: newBoard, moved, scoreGain, targetReached };
};

const hasMovesAvailable = (board) => {
  if (getEmptyCells(board).length > 0) return true;

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const current = board[row][col];
      if (col + 1 < GRID_SIZE && board[row][col + 1] === current) return true;
      if (row + 1 < GRID_SIZE && board[row + 1][col] === current) return true;
    }
  }

  return false;
};

const Game2048 = ({ onRestart }) => {
  const [board, setBoard] = useState(() => initializeBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('game2048-best') : null;
    return stored ? parseInt(stored, 10) : 0;
  });
  const [status, setStatus] = useState('playing'); // playing | won | lost
  const [moveCount, setMoveCount] = useState(0);

  const leaderboard = useMemo(
    () => [
      { name: 'Atif', score: 524288 },
      { name: 'Cascade Bot', score: 131072 },
      { name: 'You?', score: 16384 },
    ],
    []
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('game2048-best', String(Math.max(bestScore, score)));
    }
  }, [bestScore, score]);

  const resetGame = useCallback(() => {
    setBoard(initializeBoard());
    setScore(0);
    setStatus('playing');
    setMoveCount(0);
  }, []);

  const updateBestScore = useCallback(
    (newScore) => {
      setBestScore((prev) => (newScore > prev ? newScore : prev));
    },
    []
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (status !== 'playing') return;
      if (!directions[event.key]) return;

      event.preventDefault();

      const { board: movedBoard, moved, scoreGain, targetReached } = moveAndMerge(board, event.key);
      if (!moved) return;

      let updatedBoard = addRandomTile(movedBoard);
      let newStatus = status;

      if (targetReached) {
        newStatus = 'won';
      } else if (!hasMovesAvailable(updatedBoard)) {
        newStatus = 'lost';
      }

      const newScore = score + scoreGain;
      setBoard(updatedBoard);
      setScore(newScore);
      setStatus(newStatus);
      setMoveCount((prev) => prev + 1);
      updateBestScore(newScore);
    },
    [board, score, status, updateBestScore]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (status === 'won') {
      updateBestScore(score);
    }
  }, [status, score, updateBestScore]);

  const boardTiles = useMemo(() => board.flat().filter(Boolean), [board]);
  const maxTile = boardTiles.length ? Math.max(...boardTiles) : 0;

  const handleOnReset = useCallback(() => {
    resetGame();
    if (onRestart) onRestart();
  }, [onRestart, resetGame]);

  return (
    <div className="game2048" role="region" aria-label="2048 game board">
      <div className="game2048-header">
        <div>
          <div className="game2048-title">2048</div>
          <div className="game2048-subtitle">Reach {TARGET_TILE}</div>
        </div>
        <div className="game2048-stats">
          <div className="game2048-stat">
            <span className="game2048-stat-label">Score</span>
            <span className="game2048-stat-value">{score}</span>
          </div>
          <div className="game2048-stat">
            <span className="game2048-stat-label">Best</span>
            <span className="game2048-stat-value">{bestScore}</span>
          </div>
          <div className="game2048-stat">
            <span className="game2048-stat-label">Moves</span>
            <span className="game2048-stat-value">{moveCount}</span>
          </div>
        </div>
      </div>

      <div className="game2048-info">
        <p className="game2048-tip">Use your arrow keys to move the tiles.</p>
        {status === 'won' && (
          <div className="game2048-status game2048-status--won">🎉 You made it to {TARGET_TILE}!</div>
        )}
        {status === 'lost' && (
          <div className="game2048-status game2048-status--lost">Game over! Try again?</div>
        )}
        <div className="game2048-progress">Highest tile: {maxTile}</div>
      </div>

      <div className="game2048-leaderboard" role="group" aria-label="Hall of fame">
        <h4>Leaderboard</h4>
        <ol>
          {leaderboard.map((entry, index) => (
            <li key={entry.name} className={index === 0 ? 'game2048-leaderboard-item game2048-leaderboard-item--top' : 'game2048-leaderboard-item'}>
              <span className="game2048-leaderboard-rank">#{index + 1}</span>
              <span className="game2048-leaderboard-name">{entry.name}</span>
              <span className="game2048-leaderboard-score">{entry.score.toLocaleString()}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="game2048-board" role="grid">
        {board.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="game2048-row" role="row">
            {row.map((cell, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}-${cell}-${moveCount}`}
                className={`game2048-cell${cell ? ` game2048-cell--${cell} game2048-cell--occupied` : ''}`}
                role="gridcell"
                aria-label={cell ? `${cell}` : 'empty'}
              >
                {cell || ''}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="game2048-actions">
        <button type="button" className="game2048-button" onClick={resetGame}>
          Reset
        </button>
        <button type="button" className="game2048-button game2048-button--secondary" onClick={handleOnReset}>
          Close & Reset
        </button>
      </div>
    </div>
  );
};

export default Game2048;
