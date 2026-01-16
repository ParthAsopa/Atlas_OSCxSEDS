
import React from 'react';

interface GalleryProps {
  onBack: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onBack }) => {
  const images = [
    {
      id: 'DATA-CAPTURE-31',
      title: '31 ATLAS',
      description: 'Ultra-long exposure of the ATLAS nucleus trajectory. Significant gas discharge and ion tail separation observed in the northern quadrant.',
      url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200',
      coords: 'RA 21h 29m 58s | Dec +12° 10′ 01″',
    },
    {
      id: 'DATA-CAPTURE-TSU',
      title: 'TSUCHINSHAN CORE',
      description: 'Luminous coma analysis focusing on the hyper-active sublimation zones. Spectrographic data indicates high carbon monoxide concentration.',
      url: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=1200',
      coords: 'RA 15h 32m 04s | Dec +02° 11′ 45″',
    },
    {
      id: 'DATA-CAPTURE-WIDE',
      title: 'DEEP FIELD C/2023',
      description: 'Wide-field grainy sensor capture of the outer Oort cloud visitor. Multiple background starfield artifacts removed for clarity.',
      url: 'https://images.unsplash.com/photo-1506318137071-a8e063b46282?auto=format&fit=crop&q=80&w=1200',
      coords: 'RA 10h 45m 03s | Dec −59° 41′ 04″',
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.5em]">Orbital Intelligence Hub</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              Cometary Data<span className="text-cyan-500">_</span>
            </h2>
          </div>
          <button 
            onClick={onBack}
            className="group flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
          >
            <span className="text-[10px] font-mono text-slate-400 group-hover:text-white uppercase tracking-widest transition-colors">Abort to Mainframe</span>
            <div className="w-8 h-[1px] bg-slate-700 group-hover:w-12 group-hover:bg-cyan-500 transition-all"></div>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {images.map((image) => (
            <div 
              key={image.id}
              className="group relative flex flex-col bg-[#050a15] border border-white/5 rounded-[40px] overflow-hidden hover:border-cyan-500/30 transition-all duration-500 shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 opacity-80"
                />
                {/* Tech Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a15] via-transparent to-transparent opacity-60"></div>
                
                {/* Visual Artifacts to mimic scientific sensor look */}
                <div className="absolute inset-0 pointer-events-none border-[12px] border-black/10"></div>
                
                <div className="absolute top-6 left-6">
                   <div className="w-4 h-4 border-l border-t border-cyan-500/30"></div>
                </div>
                <div className="absolute bottom-20 right-6">
                   <div className="w-4 h-4 border-r border-b border-cyan-500/30"></div>
                </div>

                <div className="absolute top-6 right-6 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                  <span className="text-[9px] font-mono text-cyan-400/80 uppercase tracking-widest">{image.id}</span>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-8 space-y-4">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  {image.title}
                  {image.title === '31 ATLAS' && <span className="ml-2 text-cyan-500 animate-pulse">●</span>}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-light min-h-[60px]">
                  {image.description}
                </p>
                
                <div className="pt-6 border-t border-white/5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Telemetry Uplink</span>
                    <span className="text-[10px] font-mono text-cyan-500/60 truncate tracking-tight">{image.coords}</span>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_100px_rgba(6,182,212,0.15)]"></div>
            </div>
          ))}
        </div>

        {/* System Footer Note */}
        <div className="mt-20 flex justify-center">
          <div className="px-10 py-5 border border-white/5 rounded-full flex items-center gap-6 bg-white/[0.01]">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em]">Active Node: ATLAS Systems Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
