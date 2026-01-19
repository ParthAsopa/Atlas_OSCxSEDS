import React, { useState } from 'react';

interface NavbarProps {
  isScrolled: boolean;
  onNavigate: (view: 'home' | 'gallery' | 'news' | 'forbidden') => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ isScrolled, onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMissionOpen, setIsMissionOpen] = useState(false);
  const [isVanguardOpen, setIsVanguardOpen] = useState(false);

  const toggleMission = () => setIsMissionOpen(!isMissionOpen);
  const toggleVanguard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVanguardOpen(!isVanguardOpen);
  };

  const navigateTo = (view: 'home' | 'gallery' | 'news' | 'forbidden') => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-[110] flex justify-between items-center transition-all duration-500 ease-in-out
          ${isScrolled
            ? 'px-8 py-3 bg-[#1e293b]/80 nav-glass border-b border-white/10 shadow-lg shadow-black/20 backdrop-blur-xl'
            : 'px-8 py-4 bg-transparent nav-glass border-b border-white/10 backdrop-blur-xl'
          }`}
        style={{ borderRadius: 0 }}
      >
        {/* Top Left Logo Button */}
        <button
          onClick={() => navigateTo('home')}
          className="text-white font-black text-xl tracking-tighter hover:text-cyan-400 transition-colors uppercase"
        >
          SXO<span className="text-cyan-500">.</span>
        </button>

        {/* Top Right Menu Icon Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col gap-1.5 p-2 group outline-none transition-transform hover:scale-110 active:scale-95"
          aria-label="Open Menu"
        >
          <div className={`w-8 h-[2px] transition-colors ${currentView === 'forbidden' ? 'bg-red-500' : 'bg-white'}`}></div>
          <div className={`w-8 h-[2px] transition-colors ${currentView === 'forbidden' ? 'bg-red-500' : 'bg-white'}`}></div>
          <div className={`w-8 h-[2px] transition-colors ${currentView === 'forbidden' ? 'bg-red-500' : 'bg-white'}`}></div>
        </button>
      </div>

      {/* Menu Overlay - always rendered for smooth transition */}
      <div
        className={`fixed inset-0 z-[120] bg-[#020617]/70 backdrop-blur-xl transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Side Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-full z-[130] bg-[#020617] border-l border-slate-800 shadow-2xl flex flex-col items-stretch p-8 transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
        style={{ willChange: 'transform, opacity' }}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-2xl text-white focus:outline-none hover:text-cyan-400"
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="flex flex-col gap-2 mt-2 mb-8">
          <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em]">System Navigator</span>
          <div className="h-px w-full bg-white/5"></div>
        </div>

        <nav className="flex flex-col gap-6 select-none mb-8">
          <button
            onClick={() => navigateTo('gallery')}
            className={`text-left text-3xl font-black transition-colors tracking-tighter uppercase ${currentView === 'gallery' ? 'text-cyan-400' : 'text-white hover:text-cyan-400'}`}
          >
            Gallery
          </button>
          
          <button 
            onClick={() => navigateTo('news')}
            className={`text-left text-3xl font-black transition-colors tracking-tighter uppercase ${currentView === 'news' ? 'text-cyan-400' : 'text-white hover:text-cyan-400'}`}
          >
            News
          </button>
          
          {/* Mission Toggle Section */}
          { <div className="flex flex-col gap-4">
            <div 
              onClick={toggleMission}
              className="flex items-center justify-between cursor-pointer group"
            >
              <span className={`text-3xl font-black transition-colors tracking-tighter uppercase ${isMissionOpen ? 'text-cyan-400' : 'text-white hover:text-cyan-400'}`}>
                Mission
              </span>
              <svg 
                className={`w-5 h-5 text-white/20 transition-transform duration-300 ${isMissionOpen ? 'rotate-180 text-cyan-500' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            


            {isMissionOpen && (
              <div className="ml-6 border-l border-white/10 pl-6 flex flex-col gap-4 animate-in slide-in-from-left-4 duration-300">
                <div className="flex flex-col gap-3">
                  <div 
                    onClick={toggleVanguard}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <span className={`text-lg font-bold transition-colors uppercase tracking-tight ${isVanguardOpen ? 'text-cyan-400' : 'text-white/70 hover:text-cyan-400'}`}>
                      Vanguard
                    </span>
                    <svg 
                      className={`w-4 h-4 text-white/10 transition-transform duration-300 ${isVanguardOpen ? 'rotate-180 text-cyan-500' : ''}`} 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>



                  {isVanguardOpen && (
                    <div className="ml-4 border-l border-white/5 pl-6 flex flex-col gap-4 animate-in slide-in-from-left-4 duration-300">
                      <a href="/chat_webpage/index.html" target="_blank" rel="noopener noreferrer">
                      <button className="text-left text-[11px] font-bold text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-[0.3em]">
                        Chat
                        </button>
                      </a>
                      <button 
                        onClick={() => navigateTo('forbidden')}
                        className={`text-left text-[11px] font-bold transition-colors uppercase tracking-[0.3em] ${currentView === 'forbidden' ? 'text-red-500' : 'text-slate-500 hover:text-cyan-400'}`}
                      >
                        Control Panel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div> }
        </nav>

        <div className="mt-auto pt-12 pb-6">
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
            <p className="text-[10px] font-mono text-slate-500 uppercase leading-relaxed">
              Uplink encryption: 4096-bit AES<br/>
              Status: <span className="text-green-500">Authorized</span><br/>
              Node: OSC-MAIN-01
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
