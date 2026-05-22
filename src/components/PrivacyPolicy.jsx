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
        className="max-w-3xl mx-auto px-4 py-12"
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 py-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">EzyTracker</h1>
            <a href="#support" className="text-indigo-500 hover:text-indigo-600 font-semibold transition">
              Get Support
            </a>
          </div>
        </header>

        {/* Privacy Policy Section */}
        <section id="privacy" className="mb-16 bg-white p-8 rounded-b-2xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">🔒</span>
            <h2 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h2>
          </div>
          
          <p className="text-sm text-gray-500 mb-8 font-medium">Last updated: May 2026</p>

          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              <strong>EzyTracker</strong> was built with your family's privacy as the absolute top priority. We believe that your personal data, daily routines, and health tracking information belong exclusively to you.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-3">1. Data Storage & Collection</h3>
            <p>
              We do not collect, transmit, or store any of your data on external servers. <strong>Everything stays entirely on your device.</strong>
            </p>
            <p>
              All tasks, profiles, completions, and settings are saved securely within your device's local storage. Because we do not use a cloud backend or account system, we have no access to your information.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-3">2. Third-Party Services</h3>
            <p>
              EzyTracker does not include any third-party tracking, analytics, or advertising SDKs. We do not sell or share any information because we do not have any information to share.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-3">3. App Permissions</h3>
            <p>
              The app requests permission to send <strong>Local Notifications</strong>. These are scheduled entirely on your device to remind you of tasks and streaks. We do not use push notifications from external servers.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-3">4. Changes to This Policy</h3>
            <p>
              If we ever decide to introduce cloud syncing features in the future, it will be strictly opt-in, and this privacy policy will be updated to reflect exactly how that works. Until then, your data is 100% offline.
            </p>
          </div>
        </section>

        {/* Support Section */}
        <section id="support" className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 shadow-sm">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">👋</span>
            <h2 className="text-3xl font-extrabold text-indigo-900">Support</h2>
          </div>
          
          <p className="text-indigo-800 mb-6 text-lg leading-relaxed">
            Have a question, feature request, or running into a bug? We'd love to hear from you. 
          </p>

          <div className="bg-white p-6 rounded-xl shadow-sm inline-block">
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Email Us</p>
            <a href="mailto:support@atifalin.in" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition flex items-center">
              support@atifalin.in
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </section>

        <footer className="text-center py-8 text-gray-400 text-sm mt-12">
          <p>&copy; 2026 EzyTracker. All rights reserved.</p>
        </footer>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
