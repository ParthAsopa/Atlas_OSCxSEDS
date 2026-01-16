
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#010811] py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="text-[10px] font-mono text-slate-600 tracking-[0.4em] uppercase">
            SEDS X OSC Collaboration Node
          </div>
          <div className="h-px w-24 bg-cyan-900/50 my-4" />
          <p className="text-slate-700 text-[9px] mt-4">
            &copy; {new Date().getFullYear()} SEDS X OSC. Unauthorized access is strictly monitored.
          </p>
        </div>
      </div>
    </footer>
  );
};
