import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClickSpark from './ClickSpark';
import './Contact.css';
import './SectionTitle.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'New message from EzyPath.in',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit form to Formspree
      const response = await fetch('https://formspree.io/f/xblzjong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Form successfully submitted
        setFormData({ name: '', email: '', subject: 'New message from EzyPath.in', message: '' });
        setShowSuccess(true);
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        // Handle error
        console.error('Form submission failed');
        alert('There was an error submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div
          className="section-title-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Ready to transform your business? Let's talk about your project.
          </p>
        </motion.div>

        <motion.div
          className="contact-form-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form className="contact-form" action="https://formspree.io/f/xblzjong" method="POST" onSubmit={handleSubmit}>
            {/* Honeypot field to prevent spam - not visible to users */}
            <input type="text" name="_gotcha" style={{ display: 'none' }} />
            
            {/* Hidden subject field */}
            <input type="hidden" name="_subject" value="New message from EzyPath.in" />
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-textarea"
                rows="5"
                placeholder="Tell us about your project..."
              />
            </div>

            <ClickSpark>
              <motion.button
                type="submit"
                className="form-submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="loading-spinner">Sending...</span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </ClickSpark>
          </form>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="success-toast"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
              >
                ✨ Message sent successfully! We'll get back to you soon.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
