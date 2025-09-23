import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ClickSpark = ({ children, sparkColor = '#F2B544' }) => {
  const [sparks, setSparks] = useState([]);

  const createSpark = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSpark = {
      id: Date.now() + Math.random(),
      x,
      y
    };
    
    setSparks(prev => [...prev, newSpark]);
    
    setTimeout(() => {
      setSparks(prev => prev.filter(spark => spark.id !== newSpark.id));
    }, 1000);
  };

  return (
    <div className="relative inline-block" onClick={createSpark}>
      {children}
      <AnimatePresence>
        {sparks.map(spark => (
          <motion.div
            key={spark.id}
            className="absolute pointer-events-none"
            style={{
              left: spark.x,
              top: spark.y,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path 
                d="M10 2L11.5 7.5L17 9L11.5 10.5L10 16L8.5 10.5L3 9L8.5 7.5L10 2Z" 
                fill={sparkColor}
                stroke={sparkColor}
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ClickSpark;
