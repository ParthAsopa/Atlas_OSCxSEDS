import React from 'react';

export const ProjectCard: React.FC<ProjectCardProps> = ({ fileName, command, description }) => {
  return (
    /* Changed: Added min-h-[300px] and increased padding to fill the area better */
    <div className="w-full min-h-[300px] rounded-xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col">
      {/* Mac-style Header - Slightly taller for the larger card */}
      <div className="flex items-center gap-3 px-6 py-4 bg-slate-800/40 border-b border-slate-700/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-slate-400 text-xs font-mono uppercase tracking-[0.2em]">{fileName}</span>
        </div>
      </div>

      {/* Terminal Content - Increased text size and padding */}
      <div className="p-8 font-mono flex-grow flex flex-col justify-center">
        <div className="flex gap-4 mb-4 text-lg">
          <span className="text-emerald-400">$</span>
          <div>
            <span className="text-emerald-400">./run</span>
            <span className="text-cyan-400 ml-3">{command}</span>
          </div>
        </div>
        <p className="text-slate-300 text-base md:text-lg mb-6 w-full leading-relaxed">
          {description}
        </p>
        <div className="text-slate-500 text-sm animate-pulse tracking-widest">[SYSTEM_ACTIVE_STABLE]</div>
      </div>
    </div>
  );
};