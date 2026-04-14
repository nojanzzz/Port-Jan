import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  const [active, setActive] = useState('home');

  const navigate = (id) => {
    setActive(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSection = () => {
    switch (active) {
      case 'home':     return <Home onNavigate={navigate} />;
      case 'about':    return <About />;
      case 'resume':   return <Resume />;
      case 'projects': return <Projects />;
      case 'contact':  return <Contact />;
      default:         return <Home onNavigate={navigate} />;
    }
  };

  return (
    <>
      <div className="glow-orb-left" />
      <Navbar activeSection={active} onNavigate={navigate} />
      {renderSection()}
    </>
  );
}
