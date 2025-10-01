import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClickSpark from './ClickSpark';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container navbar-container">
        <ClickSpark>
          <motion.a 
            href="#home" 
            className="navbar-logo" 
            onClick={(e) => scrollToSection(e, '#home')}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>EzyPath</span>
          </motion.a>
        </ClickSpark>

        <AnimatePresence>
          <motion.div 
            id="navbar-menu"
            className={`navbar-menu ${isMobileMenuOpen ? 'navbar-menu-open' : ''}`}
            role="navigation"
            aria-label="Main navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, staggerChildren: 0.1 }}
          >
            {navItems.map((item, index) => (
              <ClickSpark key={item.name}>
                <motion.a
                  href={item.href}
                  className="navbar-link"
                  onClick={(e) => scrollToSection(e, item.href)}
                  whileHover={{ y: -3, color: 'var(--deep-blue)' }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              </ClickSpark>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.button
          className="navbar-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="navbar-menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'hamburger-open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </motion.button>

        <motion.div 
          className="navbar-cta-desktop"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ClickSpark>
            <motion.button 
              className="btn btn-primary"
              onClick={(e) => scrollToSection(e, '#contact')}
              whileHover={{ y: -3, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
              whileTap={{ scale: 0.95 }}
            >
              Talk to us
            </motion.button>
          </ClickSpark>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
