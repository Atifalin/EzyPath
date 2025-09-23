import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ClickSpark from './ClickSpark';
import ProfileCard from './ProfileCard';
import './About.css';

const About = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.3, 0.6], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.6], [0.6, 1]);
  
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="about-header"
        >
          <h2 className="section-title">
            <span className="text-gradient">About Me</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ scale, opacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="profile-card-container"
        >
          <ProfileCard 
            name="Mohammed Atif Ali Neranki"
            title="Founder of EzyPath Solutions India"
            avatarUrl="/photo.png"
            iconUrl="/logo-mark.svg"
            grainUrl="/grain.svg"
            handle="atifalin"
            status="Available"
            contactText="Get in Touch"
            onContactClick={scrollToContact}
            enableTilt={true}
            enableMobileTilt={true}
            showBehindGradient={true}
            innerGradient="linear-gradient(145deg,rgba(11, 110, 168, 0.7) 0%,rgba(242, 181, 68, 0.4) 100%)"
            behindGradient="radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(195,30%,90%,var(--card-opacity)) 4%,hsla(195,25%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(195,20%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(195,15%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,rgba(166, 189, 196, 0.8) 0%,rgba(11, 110, 168, 0) 100%),radial-gradient(100% 100% at 50% 50%,rgba(166, 189, 196, 1) 1%,rgba(11, 110, 168, 0) 76%),conic-gradient(from 124deg at 50% 50%,rgba(11, 110, 168, 1) 0%,rgba(242, 181, 68, 1) 40%,rgba(242, 181, 68, 1) 60%,rgba(11, 110, 168, 1) 100%)"
          />
          
          <motion.div 
            className="profile-bio"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              I am a strategic production planner and supply chain professional with global experience, specializing in digital transformation, automation, and data-driven decision making.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              At Kruger (Canada), I managed annual inventory exceeding $318 million USD, and over the past 3 years have overseen assets worth more than $1 billion USD. I optimized production schedules, improved forecast accuracy, and led AI-driven process improvements that reduced costs and enhanced operational efficiency.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              With an MBA in Supply Chain Management and a proven track record of delivering measurable results, I founded EzyPath Solutions India to bring the same operational excellence and technology-driven solutions to businesses here.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              At EzyPath, my mission is simple: to help companies simplify workflows, automate processes, and scale efficiently.
            </motion.p>
          </motion.div>

          <motion.div 
            className="profile-skills"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {[
              "Supply Chain Management",
              "Digital Transformation",
              "Process Automation",
              "Data-Driven Decision Making",
              "Production Planning",
              "Business Strategy"
            ].map((skill, index) => (
              <motion.span 
                key={skill}
                className="skill-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, backgroundColor: "var(--deep-blue)", color: "white" }}
                transition={{ duration: 0.3, delay: 1 + (index * 0.1) }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
