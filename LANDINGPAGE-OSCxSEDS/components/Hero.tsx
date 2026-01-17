
import React from 'react';

interface HeroProps {
  onNavigate?: (view: 'home' | 'gallery') => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative flex flex-col bg-[#020617]">
      {/* Top Banner: Large Hero Image Section */}
      <div className="relative h-[85vh] w-full overflow-hidden bg-black">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072" 
          alt="Deep Space" 
          className="w-full h-full object-cover opacity-60"
          style={{ filter: 'contrast(1.2) brightness(0.6)' }}
        />
        
        {/* Gradient Overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-black/20" />
        
        {/* Main Branding */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-4 md:px-10">
          <div className="max-w-7xl pb-40">
            <h1 className="text-5xl md:text-[6rem] font-black text-white uppercase tracking-tighter leading-none select-none drop-shadow-[0_20px_80px_rgba(0,0,0,1)]">
              SEDS X OSC<span className="text-cyan-500">_</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Action Area - Refined Register Button */}
      <div className="relative z-10 -mt-16 px-4 pb-32 flex justify-center">
        <a href="https://forms.gle/kMH9poFATDV3RrVP9" target="_blank" rel="noopener noreferrer">
        <button className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[12px] font-black uppercase tracking-[0.6em] rounded-full hover:from-cyan-400 hover:to-blue-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-1 active:scale-[0.98] shadow-xl border border-white/10">
          Register
        </button>
        </a>
        {/* </a> */}
      </div>
    </section>
  );
};
