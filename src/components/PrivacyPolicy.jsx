import React from 'react';
import { motion } from 'framer-motion';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="privacy-container"
      >
        {/* Header */}
        <header className="privacy-header">
          <div className="privacy-header-content">
            <div className="privacy-header-left">
              <h1 className="privacy-title">EzyTracker</h1>
              <p className="privacy-subtitle">Privacy Policy & Support</p>
            </div>
            <a href="#support" className="privacy-support-link">
              Get Support
            </a>
          </div>
        </header>

        {/* Privacy Policy Section */}
        <section id="privacy" className="privacy-section">
          <div className="privacy-section-header">
            <span className="privacy-icon">🔒</span>
            <h2 className="privacy-section-title">Privacy Policy</h2>
          </div>
          
          <p className="privacy-updated">Last updated: May 2026</p>

          <div className="privacy-content">
            <p className="privacy-intro">
              <strong>EzyTracker</strong> was built with your family's privacy as the absolute top priority. We believe that your personal data, daily routines, and health tracking information belong exclusively to you.
            </p>

            <div className="privacy-subsection">
              <h3 className="privacy-subsection-title">1. Data Storage & Collection</h3>
              <p className="privacy-text">
                We do not collect, transmit, or store any of your data on external servers. <strong>Everything stays entirely on your device.</strong>
              </p>
              <p className="privacy-text">
                All tasks, profiles, completions, and settings are saved securely within your device's local storage. Because we do not use a cloud backend or account system, we have no access to your information.
              </p>
            </div>

            <div className="privacy-subsection">
              <h3 className="privacy-subsection-title">2. Third-Party Services</h3>
              <p className="privacy-text">
                EzyTracker does not include any third-party tracking, analytics, or advertising SDKs. We do not sell or share any information because we do not have any information to share.
              </p>
            </div>

            <div className="privacy-subsection">
              <h3 className="privacy-subsection-title">3. App Permissions</h3>
              <p className="privacy-text">
                The app requests permission to send <strong>Local Notifications</strong>. These are scheduled entirely on your device to remind you of tasks and streaks. We do not use push notifications from external servers.
              </p>
            </div>

            <div className="privacy-subsection">
              <h3 className="privacy-subsection-title">4. Changes to This Policy</h3>
              <p className="privacy-text">
                If we ever decide to introduce cloud syncing features in the future, it will be strictly opt-in, and this privacy policy will be updated to reflect exactly how that works. Until then, your data is 100% offline.
              </p>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section id="support" className="privacy-support-section">
          <div className="privacy-section-header">
            <span className="privacy-icon">👋</span>
            <h2 className="privacy-section-title">Support</h2>
          </div>
          
          <p className="privacy-support-text">
            Have a question, feature request, or running into a bug? We'd love to hear from you. 
          </p>

          <div className="privacy-contact-card">
            <p className="privacy-contact-label">Email Us</p>
            <a href="mailto:support@atifalin.in" className="privacy-contact-link">
              support@atifalin.in
              <svg className="privacy-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </section>

        <footer className="privacy-footer">
          <p>&copy; 2026 EzyTracker. All rights reserved.</p>
        </footer>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
