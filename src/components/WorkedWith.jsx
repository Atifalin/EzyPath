import React from 'react';
import { motion } from 'framer-motion';
import useAutoScroll from '../hooks/useAutoScroll';
import './WorkedWith.css';

const WorkedWith = () => {
  // Use our custom auto-scrolling hook
  const scrollRef = useAutoScroll(20, false);
  
  // Duplicate logos for a continuous scrolling effect
  const logos = [
    { name: 'Kruger', src: '/kruger-logo.svg', alt: 'Kruger company logo' },
    { name: 'Compugen', src: '/compugen-logo.svg', alt: 'Compugen company logo' },
    { name: 'HomeHeros', src: '/homeheros-logo.svg', alt: 'HomeHeros company logo' },
    { name: 'Kruger', src: '/kruger-logo.svg', alt: 'Kruger company logo' },
    { name: 'Compugen', src: '/compugen-logo.svg', alt: 'Compugen company logo' },
    { name: 'HomeHeros', src: '/homeheros-logo.svg', alt: 'HomeHeros company logo' },
  ];

  return (
    <section id="worked-with" className="worked-with section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">We've worked with</h2>
          <p className="section-subtitle">
            Trusted by leading companies to deliver exceptional results
          </p>
        </motion.div>

        {/* Single Scrolling Row */}
        <div className="logos-scroll-container">
          <motion.div 
            className="logos-row"
            ref={scrollRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {logos.map((logo, index) => (
              <motion.div
                key={index}
                className="logo-item"
                whileHover={{ scale: 1.1, boxShadow: 'var(--shadow-lg)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400,
                  delay: index * 0.1 % 0.3 // Create groups of animations
                }}
              >
                <img src={logo.src} alt={logo.alt} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Grid Fallback */}
        <div className="logos-grid">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className="logo-grid-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <img src={logo.src} alt={logo.alt} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkedWith;
