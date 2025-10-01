import React from 'react';
import { motion } from 'framer-motion';
import ClickSpark from './ClickSpark';
import './NotFound.css';

const NotFound = () => {
  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="not-found section">
      <div className="container not-found-container">
        <motion.div
          className="not-found-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="not-found-number"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            404
          </motion.div>
          
          <motion.h1
            className="not-found-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Page Not Found
          </motion.h1>
          
          <motion.p
            className="not-found-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </motion.p>

          <motion.div
            className="not-found-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ClickSpark>
              <motion.button
                className="btn btn-primary"
                onClick={scrollToHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Go back to homepage"
              >
                Back to Home
              </motion.button>
            </ClickSpark>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
