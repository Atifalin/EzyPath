import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountUp from './CountUp';
import RotatingText from './RotatingText';
import ClickSpark from './ClickSpark';
import './Services.css';

const Services = () => {
  const [clickCount, setClickCount] = useState(0);
  const { scrollYProgress } = useScroll();
  // Adjusted scroll trigger values since WorkedWith section is hidden
  const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);

  const services = [
    {
      title: 'Simplify',
      rotatingWords: ['complexity', 'processes', 'workflows', 'operations'],
      description: 'Cut complexity from digital workflows.',
      icon: '✨'
    },
    {
      title: 'Automate',
      rotatingWords: ['tasks', 'workflows', 'invoices', 'reports'],
      description: 'Build reliable automations and tools.',
      icon: '⚡'
    },
    {
      title: 'Scale',
      rotatingWords: ['teams', 'systems', 'revenue', 'impact'],
      description: 'Grow teams, systems, and business without friction.',
      icon: '🚀'
    }
  ];

  const handleCTAClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <section id="services" className="services section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="services-header"
        >
          <h2 className="section-title">
            <span className="text-gradient">Our Services</span>
          </h2>
          <p className="section-subtitle">
            Transform your business with our comprehensive solutions
          </p>
        </motion.div>

        <motion.div 
          className="services-grid"
          style={{ opacity, y }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <motion.div 
                className="service-icon"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 + 0.3,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {service.icon}
              </motion.div>
              <h3 className="service-title">
                {service.title}{' '}
                <RotatingText 
                  words={service.rotatingWords}
                  className="service-rotating"
                />
              </h3>
              <p className="service-description">{service.description}</p>
              <ClickSpark>
                <motion.button 
                  className="service-cta"
                  onClick={handleCTAClick}
                  whileHover={{ x: 5, backgroundColor: "var(--deep-blue)", color: "white" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Learn More →
                </motion.button>
              </ClickSpark>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="metrics-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="metric-item">
            <h4 className="metric-value">
              <CountUp end={7 + clickCount} duration={2} suffix="+" />
            </h4>
            <p className="metric-label">Projects Delivered</p>
          </div>
          <div className="metric-item">
            <h4 className="metric-value">
              <CountUp end={100000 + clickCount * 1000} duration={2.5} suffix="+" />
            </h4>
            <p className="metric-label">Lines of Code</p>
          </div>
          <div className="metric-item">
            <h4 className="metric-value">
              <CountUp end={50 + clickCount * 10} duration={2} suffix="+" />
            </h4>
            <p className="metric-label">Cups of Coffee</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
