import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
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
              <span className="footer-value">UDYAM-KR-05-0053516</span>
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
            <p className="footer-tagline">
              Simplify. Automate. Scale.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
