import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './UnsplashPuzzle.css';

const IMAGE_SOURCES = [
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526481280695-3c4691f18781?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
];

const GRID_SIZE = 3;

const getNeighbors = (index) => {
  const neighbors = [];
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;

  const positions = [
    { row: row - 1, col },
    { row: row + 1, col },
    { row, col: col - 1 },
    { row, col: col + 1 },
  ];

  positions.forEach(({ row: r, col: c }) => {
    if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
      neighbors.push(r * GRID_SIZE + c);
    }
  });

  return neighbors;
};

const createShuffledTiles = (imageUrl) => {
  const tiles = [];
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const isLastTile = row === GRID_SIZE - 1 && col === GRID_SIZE - 1;
      tiles.push({
        id: row * GRID_SIZE + col,
        position: row * GRID_SIZE + col,
        correctPosition: row * GRID_SIZE + col,
        imageUrl,
        hidden: isLastTile,
      });
    }
  }

  let shuffled = [...tiles];
  let hiddenIndex = shuffled.length - 1;
  const shuffleMoves = 120;

  for (let i = 0; i < shuffleMoves; i += 1) {
    const neighbors = getNeighbors(hiddenIndex);
    const target = neighbors[Math.floor(Math.random() * neighbors.length)];
    [shuffled[hiddenIndex], shuffled[target]] = [shuffled[target], shuffled[hiddenIndex]];
    hiddenIndex = target;
  }

  return shuffled;
};

const isSolved = (tiles) => tiles.every((tile, index) => tile.correctPosition === index);

const UnsplashPuzzle = ({ onClose }) => {
  const [imageIndex, setImageIndex] = useState(() => Math.floor(Math.random() * IMAGE_SOURCES.length));
  const [tiles, setTiles] = useState(() => createShuffledTiles(IMAGE_SOURCES[imageIndex]));
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  const hiddenTileIndex = useMemo(() => tiles.findIndex((tile) => tile.hidden), [tiles]);

  useEffect(() => {
    if (isSolved(tiles)) {
      setIsComplete(true);
    }
  }, [tiles]);

  const shufflePuzzle = useCallback(() => {
    const nextIndex = (imageIndex + 1) % IMAGE_SOURCES.length;
    setImageIndex(nextIndex);
    setTiles(createShuffledTiles(IMAGE_SOURCES[nextIndex]));
    setMoves(0);
    setIsComplete(false);
  }, [imageIndex]);

  const handleTileClick = useCallback(
    (index) => {
      if (isComplete) return;

      const neighbors = getNeighbors(hiddenTileIndex);
      if (!neighbors.includes(index)) return;

      const newTiles = tiles.map((tile) => ({ ...tile }));
      [newTiles[index], newTiles[hiddenTileIndex]] = [newTiles[hiddenTileIndex], newTiles[index]];

      setTiles(newTiles);
      setMoves((prev) => prev + 1);
    },
    [hiddenTileIndex, tiles, isComplete]
  );

  useEffect(() => {
    let timeout;
    if (previewVisible) {
      timeout = setTimeout(() => {
        setPreviewVisible(false);
      }, 2000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [previewVisible]);

  const revealPreview = useCallback(() => {
    setPreviewVisible(true);
  }, []);

  const handleCelebrate = useCallback(() => {
    shufflePuzzle();
  }, [shufflePuzzle]);

  const currentImage = IMAGE_SOURCES[imageIndex];
  const positionPercent = GRID_SIZE > 1 ? 100 / (GRID_SIZE - 1) : 0;

  return (
    <div className="puzzle" role="region" aria-label="Unsplash sliding puzzle">
      <div className="puzzle-header">
        <div>
          <h4 className="puzzle-title">Unsplash Muse</h4>
          <p className="puzzle-subtitle">Slide tiles to reveal the full photo.</p>
        </div>
        <div className="puzzle-controls">
          <button type="button" className="puzzle-button" onClick={shufflePuzzle}>
            Shuffle image
          </button>
          <button type="button" className="puzzle-button" onClick={revealPreview}>
            Preview
          </button>
        </div>
      </div>

      <div className="puzzle-meta">
        <span>Moves: {moves}</span>
        {isComplete && <span className="puzzle-complete">✨ Completed!</span>}
      </div>

      <div className="puzzle-grid" role="grid">
        {tiles.map((tile, index) => (
          <button
            key={tile.id}
            type="button"
            className={`puzzle-tile${tile.hidden ? ' puzzle-tile--hidden' : ''}`}
            role="gridcell"
            aria-label={tile.hidden ? 'empty space' : `tile ${tile.id + 1}`}
            onClick={() => handleTileClick(index)}
            style={
              tile.hidden
                ? undefined
                : {
                    backgroundImage: `url(${tile.imageUrl})`,
                    backgroundPosition: `${(tile.correctPosition % GRID_SIZE) * positionPercent}% ${Math.floor(
                      tile.correctPosition / GRID_SIZE
                    ) * positionPercent}%`,
                    backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                  }
            }
          >
            {tile.hidden ? '' : ''}
          </button>
        ))}
      </div>

      <div className="puzzle-actions">
        <button type="button" className="puzzle-button puzzle-button--secondary" onClick={onClose}>
          Close puzzle
        </button>
        {isComplete && (
          <button type="button" className="puzzle-button" onClick={handleCelebrate}>
            Next image
          </button>
        )}
      </div>

      <div className={`puzzle-preview${previewVisible ? ' puzzle-preview--visible' : ''}`}>
        <img src={currentImage} alt="Puzzle preview" />
      </div>
    </div>
  );
};

export default UnsplashPuzzle;
