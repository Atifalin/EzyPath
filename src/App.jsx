import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
// WorkedWith component temporarily hidden - uncomment the import when restoring
// import WorkedWith from './components/WorkedWith'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      {/* WorkedWith section temporarily hidden - uncomment the line below to restore */}
      {/* <WorkedWith /> */}
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
