
import React from 'react';

interface NewsProps {
  onBack: () => void;
}

export const News: React.FC<NewsProps> = ({ onBack }) => {
  const newsItems = [
    {
      id: 'URGENT-01',
      date: '2025.05.12',
      title: '31 ATLAS: PERIHELION LOCK CONFIRMED',
      summary: 'Orbital mechanics indicate a successful perihelion lock. Comet 31 ATLAS has reached its maximum velocity relative to the sun. Tail length now exceeds 15 million kilometers.',
      tag: 'ORBITAL MECHANICS',
      status: 'CRITICAL'
    },
    {
      id: 'DATA-24',
      date: '2025.05.08',
      title: 'SPECTRAL ANOMALY DETECTED IN 31 ATLAS COMA',
      summary: 'Automated sensors on OSC-MAIN-01 have identified unusual neon signatures within the comet\'s inner coma. This suggests 31 ATLAS may have originated from a chemically distinct region of the outer Oort cloud.',
      tag: 'SPECTROSCOPY',
      status: 'INVESTIGATING'
    },
    {
      id: 'UPLINK-09',
      date: '2025.05.01',
      title: 'SEDS X OSC DEPLOYS TRACKING NODE FOR 31 ATLAS',
      summary: 'A joint collaboration has successfully launched the "ATLAS-SCAN-01" probe. High-resolution telemetry is now being streamed directly to the mission intelligence dashboard.',
      tag: 'MISSION LOGS',
      status: 'STABLE'
    },
    {
      id: 'INTEL-77',
      date: '2025.04.25',
      title: 'FIRST IMAGERY OF 31 ATLAS NUCLEUS RELEASED',
      summary: 'De-noised imagery from the deep-space array reveals a highly irregular, binary-contact nucleus. Fragmentation risks remain at 12% for the upcoming sun-grazing phase.',
      tag: 'IMAGING',
      status: 'ARCHIVED'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-40 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-white/5 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-mono text-orange-500 uppercase tracking-[0.5em]">Global Intelligence Feed</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              Intelligence<span className="text-orange-500">_</span>
            </h2>
            <p className="mt-6 text-slate-500 font-mono text-xs uppercase tracking-widest">Tracking Cometary Asset: <span className="text-white">31 ATLAS</span></p>
          </div>
          <button 
            onClick={onBack}
            className="group flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
          >
            <span className="text-[10px] font-mono text-slate-400 group-hover:text-white uppercase tracking-widest transition-colors">Abort to Mainframe</span>
            <div className="w-8 h-[1px] bg-slate-700 group-hover:w-12 group-hover:bg-orange-500 transition-all"></div>
          </button>
        </div>

        {/* News Feed */}
        <div className="space-y-8">
          {newsItems.map((item) => (
            <div 
              key={item.id}
              className="group relative bg-[#050a15] border border-white/5 p-8 rounded-[32px] hover:border-orange-500/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Metadata Column */}
                <div className="md:w-32 flex-shrink-0">
                  <div className="text-[10px] font-mono text-slate-600 mb-2 uppercase tracking-tighter">TIMESTAMP</div>
                  <div className="text-xs font-mono text-white mb-4">{item.date}</div>
                  <div className={`text-[9px] font-mono px-2 py-0.5 rounded-full inline-block border ${
                    item.status === 'CRITICAL' ? 'border-red-500/50 text-red-500' : 
                    item.status === 'INVESTIGATING' ? 'border-orange-500/50 text-orange-500' : 'border-green-500/50 text-green-500'
                  }`}>
                    {item.status}
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono text-orange-500/70 uppercase tracking-widest">{item.tag}</span>
                    <span className="text-slate-800 text-xs">//</span>
                    <span className="text-[9px] font-mono text-slate-700 uppercase">{item.id}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light max-w-2xl">
                    {item.summary}
                  </p>
                </div>

                {/* Visual Accent */}
                <div className="hidden md:flex flex-col justify-center">
                  <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:border-orange-500/30 transition-all">
                    <svg className="w-4 h-4 text-slate-700 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="w-[1px] h-20 bg-gradient-to-b from-orange-500 to-transparent"></div>
          <span className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.6em]">End of Transmission</span>
        </div>
      </div>
    </div>
  );
};
