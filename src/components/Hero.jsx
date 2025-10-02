import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ClickSpark from './ClickSpark';
import Ballpit from './Ballpit';
import './Hero.css';

const Hero = () => {
  const [ballpitConfig, setBallpitConfig] = useState({
    count: 180,
    minSize: 0.5,
    maxSize: 1.5,
    size0: 2,
    maxX: 20,
    maxY: 15,
    maxZ: 8
  });

  useEffect(() => {
    const updateBallpitConfig = () => {
      const width = window.innerWidth;
      
      if (width >= 2560) {
        // 2K and above
        setBallpitConfig({
          count: 200,
          minSize: 0.4,
          maxSize: 1.2,
          size0: 1.5,
          maxX: 25,
          maxY: 18,
          maxZ: 10
        });
      } else if (width >= 1920) {
        // Full HD
        setBallpitConfig({
          count: 180,
          minSize: 0.5,
          maxSize: 1.5,
          size0: 2,
          maxX: 20,
          maxY: 15,
          maxZ: 8
        });
      } else if (width >= 1440) {
        // Laptop
        setBallpitConfig({
          count: 150,
          minSize: 0.5,
          maxSize: 1.4,
          size0: 1.8,
          maxX: 18,
          maxY: 13,
          maxZ: 7
        });
      } else {
        // Tablet and below
        setBallpitConfig({
          count: 120,
          minSize: 0.5,
          maxSize: 1.3,
          size0: 1.6,
          maxX: 15,
          maxY: 12,
          maxZ: 6
        });
      }
    };

    updateBallpitConfig();
    window.addEventListener('resize', updateBallpitConfig);
    
    return () => window.removeEventListener('resize', updateBallpitConfig);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <div className="container hero-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1 id="hero-heading" className="hero-title">
            EzyPath Solutions India
          </h1>
          
          <motion.div 
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span 
              className="tagline-static"
              whileHover={{ scale: 1.05, color: 'var(--deep-blue)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Simplify
            </motion.span>
            <motion.span 
              className="tagline-static"
              whileHover={{ scale: 1.05, color: 'var(--deep-blue)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Automate
            </motion.span>
            <motion.span 
              className="tagline-static"
              whileHover={{ scale: 1.05, color: 'var(--deep-blue)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Scale
            </motion.span>
          </motion.div>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Digital solutions to simplify workflows, automate tasks, and scale your business.
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <ClickSpark>
              <motion.button
                className="btn btn-primary"
                onClick={() => scrollToSection('#contact')}
                whileHover={{ scale: 1.05, backgroundColor: 'var(--sunrise-gold)', borderColor: 'var(--sunrise-gold)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                Talk to us
              </motion.button>
            </ClickSpark>
          </motion.div>
        </motion.div>

        <div className="hero-background">
          <Ballpit 
            key={JSON.stringify(ballpitConfig)}
            className="ballpit-canvas" 
            followCursor={true} 
            count={ballpitConfig.count}
            colors={['#0B6EA8', '#A6BDC4', '#F2B544']} 
            minSize={ballpitConfig.minSize}
            maxSize={ballpitConfig.maxSize}
            size0={ballpitConfig.size0}
            gravity={0.15}
            friction={0.995}
            maxVelocity={0.1}
            maxX={ballpitConfig.maxX}
            maxY={ballpitConfig.maxY}
            maxZ={ballpitConfig.maxZ}
            materialParams={{
              metalness: 0.4,
              roughness: 0.3,
              clearcoat: 1,
              clearcoatRoughness: 0.1
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
