import React, { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Game2048 from './Game2048';
import UnsplashPuzzle from './UnsplashPuzzle';
import './Footer.css';

const Footer = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [udyamClickCount, setUdyamClickCount] = useState(0);
  const [showUdyamHint, setShowUdyamHint] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);

  const hintThreshold = 5;
  const activationThreshold = 8;

  const hintMessage = useMemo(() => {
    if (!showHint) return null;
    if (clickCount < activationThreshold) {
      return 'Click a few more times to start the game...';
    }
    return 'Game unlocked!';
  }, [showHint, clickCount, activationThreshold]);

  const handleTaglineClick = useCallback(() => {
    setClickCount((prev) => {
      const next = prev + 1;

      if (!showHint && next >= hintThreshold) {
        setShowHint(true);
      }

      if (!showGame && next >= activationThreshold) {
        setShowPuzzle(false);
        setShowGame(true);
      }

      return next;
    });
  }, [activationThreshold, hintThreshold, showGame, showHint]);

  const handleCloseGame = useCallback(() => {
    setShowGame(false);
    setShowHint(false);
    setClickCount(0);
  }, []);

  const udyamHintMessage = useMemo(() => {
    if (!showUdyamHint) return null;
    if (udyamClickCount < activationThreshold) {
      return 'Almost there—keep tapping for a surprise!';
    }
    return 'Art puzzle unlocked!';
  }, [showUdyamHint, udyamClickCount, activationThreshold]);

  const handleUdyamClick = useCallback(() => {
    setUdyamClickCount((prev) => {
      const next = prev + 1;

      if (!showUdyamHint && next >= hintThreshold) {
        setShowUdyamHint(true);
      }

      if (!showPuzzle && next >= activationThreshold) {
        setShowGame(false);
        setShowPuzzle(true);
      }

      return next;
    });
  }, [activationThreshold, hintThreshold, showPuzzle, showUdyamHint]);

  const handleClosePuzzle = useCallback(() => {
    setShowPuzzle(false);
    setShowUdyamHint(false);
    setUdyamClickCount(0);
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-logo">
            <span>EzyPath Solutions India</span>
          </div>

          <div className="footer-info">
            <div className="footer-item">
              <span className="footer-label">UDYAM No:</span>
              <button
                type="button"
                className="footer-value footer-value--interactive"
                onClick={handleUdyamClick}
              >
                UDYAM-KR-05-0053516
              </button>
              {udyamHintMessage && (
                <p className="footer-hint footer-hint--subtle" aria-live="polite">
                  {udyamHintMessage}
                </p>
              )}
            </div>
            <div className="footer-item">
              <span className="footer-label">Email:</span>
              <a href="mailto:info@ezypath.in" className="footer-link">
                info@ezypath.in
              </a>
            </div>
            <div className="footer-item">
              <span className="footer-label">Website:</span>
              <a href="https://ezypath.in" className="footer-link">
                EzyPath.in
              </a>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} EzyPath Solutions India. All rights reserved.
            </p>
            <button
              type="button"
              className="footer-tagline"
              onClick={handleTaglineClick}
            >
              Simplify. Automate. Scale.
            </button>
            {hintMessage && (
              <p className="footer-hint" aria-live="polite">
                {hintMessage}
              </p>
            )}
          </div>
        </motion.div>
      </div>
      {showGame && (
        <div className="footer-game-overlay" role="dialog" aria-modal="true">
          <div className="footer-game-container">
            <div className="footer-game-header">
              <h3>2048 Playground</h3>
              <button
                type="button"
                className="footer-game-close"
                onClick={handleCloseGame}
              >
                Back to work
              </button>
            </div>
            <div className="footer-game-body">
              <Game2048 onRestart={handleCloseGame} />
            </div>
          </div>
        </div>
      )}
      {showPuzzle && (
        <div className="footer-game-overlay" role="dialog" aria-modal="true">
          <div className="footer-puzzle-container">
            <div className="footer-game-header footer-puzzle-header">
              <h3>Unsplash Muse Puzzle</h3>
              <button
                type="button"
                className="footer-game-close"
                onClick={handleClosePuzzle}
              >
                Back to work
              </button>
            </div>
            <div className="footer-game-body">
              <UnsplashPuzzle onClose={handleClosePuzzle} />
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
