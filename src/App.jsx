import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
// WorkedWith component temporarily hidden - uncomment the import when restoring
// import WorkedWith from './components/WorkedWith'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('home')

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentView(hash || 'home');
    };

    // Set initial view
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Set canonical URL and update on hash changes
  useEffect(() => {
    const updateCanonicalUrl = () => {
      const baseUrl = 'https://ezypath.in';
      const hash = window.location.hash;
      const canonicalUrl = hash ? `${baseUrl}/${hash}` : baseUrl + '/';
      
      // Update or create canonical link
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonicalUrl);
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        canonicalLink.setAttribute('href', canonicalUrl);
        document.head.appendChild(canonicalLink);
      }
    };

    // Update on mount and hash changes
    updateCanonicalUrl();
    window.addEventListener('hashchange', updateCanonicalUrl);

    return () => {
      window.removeEventListener('hashchange', updateCanonicalUrl);
    };
  }, []);

  // Render privacy policy page
  if (currentView === 'privacy-policy') {
    return (
      <div className="app">
        <Navbar />
        <PrivacyPolicy />
        <Footer />
      </div>
    );
  }

  // Render main home page
  return (
    <div className="app">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        {/* WorkedWith section temporarily hidden - uncomment the line below to restore */}
        {/* <WorkedWith /> */}
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
