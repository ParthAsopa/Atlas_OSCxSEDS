import React from 'react';
import { ProjectCard } from './ProjectCard';

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative flex flex-col bg-[#020617] min-h-screen">
      {/* Background Image Container */}
      <div className="absolute inset-0 h-[100vh] w-full overflow-hidden bg-black">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072" 
          className="w-full h-full object-cover opacity-70"
          style={{ filter: 'contrast(1.1) brightness(0.7)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />
      </div>

      {/* Main Content: Changed to relative and flex-col for natural stacking */}
      <div className="relative z-10 flex flex-col items-start px-4 md:px-10 pt-32 pb-20 w-full max-w-7xl mx-auto">
        
        {/* 1. Title Section */}
        <h1 className="text-5xl md:text-[6rem] font-black text-white uppercase tracking-tighter leading-none select-none drop-shadow-[0_20px_80px_rgba(0,0,0,1)] mb-12">
          SEDS X OSC<span className="text-cyan-500 custom-blink">_</span>
        </h1>

        {/* 2. Terminal Card Section: Now sits naturally below the title */}
        <div className="w-full mb-12">
          <ProjectCard 
            fileName="system_core.sh"
            command="initialize_full_interface"
            description="Following the catastrophic thermal fragmentation of the 3I/ATLAS debris monitor in Low Earth Orbit, the Vanguard Module has simultaneously gone dark due to a total hijack of its primary command uplink by a rogue actor who has scrambled communication frequencies and locked the physical thrusters. Drifting dead in the water directly into the path of the incoming debris field, the module faces an imminent collision that would trigger a massive Kessler Syndrome cascade, destroying global satellite infrastructure and effectively trapping humanity on Earth for generations. As the Emergency Response Team (ERT), you have established a fragile link to the module's public data portal, but with core systems locked down, you must navigate the compromised network, bypass the intruder's security protocols, and manually override the ship's stabilization systems before the impact window closes; the stars are watching, so do not let them go dark."
          />
        </div>

        {/* 3. Register Button: Now sits naturally below the card */}
        <div className="w-full flex justify-center">
          <a href="https://forms.gle/kMH9poFATDV3RrVP9" target="_blank" rel="noopener noreferrer">
            <button className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[12px] font-black uppercase tracking-[0.6em] rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all shadow-xl border border-white/10 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]">
              Register
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};