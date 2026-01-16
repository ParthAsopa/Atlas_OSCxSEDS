
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { News } from './components/News';
import { Forbidden } from './components/Forbidden';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState<'home' | 'gallery' | 'news' | 'forbidden'>('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (newView: 'home' | 'gallery' | 'news' | 'forbidden') => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-cyan-500/30">
      <div className="relative z-10">
        <Navbar isScrolled={scrolled} onNavigate={handleNavigate} currentView={view} />
        
        <main className="transition-all duration-500">
          {view === 'home' && (
            <div className="animate-in fade-in duration-700">
              <Hero onNavigate={handleNavigate} />
            </div>
          )}
          {view === 'gallery' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Gallery onBack={() => handleNavigate('home')} />
            </div>
          )}
          {view === 'news' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <News onBack={() => handleNavigate('home')} />
            </div>
          )}
          {view === 'forbidden' && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <Forbidden onBack={() => handleNavigate('home')} />
            </div>
          )}
        </main>

        {view !== 'forbidden' && <Footer />}
      </div>
    </div>
  );
};

export default App;
