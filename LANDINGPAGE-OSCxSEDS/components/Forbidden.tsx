
import React from 'react';

interface ForbiddenProps {
  onBack: () => void;
}

export const Forbidden: React.FC<ForbiddenProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#0a0202] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Red Pulse Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1),transparent_70%)] animate-pulse"></div>
      
      {/* Scanning Line Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="w-full h-[2px] bg-red-500 absolute animate-[scan_3s_linear_infinite]"></div>
      </div>

      <style>
        {`
          @keyframes scan {
            from { top: -10%; }
            to { top: 110%; }
          }
          .glitch {
            text-shadow: 2px 0 #ef4444, -2px 0 #3b82f6;
          }
        `}
      </style>

      <div className="z-10 text-center max-w-2xl space-y-12">
        {/* Error Code */}
        <div className="relative inline-block">
          <h1 className="text-9xl md:text-[12rem] font-black text-white leading-none tracking-tighter opacity-10 select-none">403</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-red-600 font-mono text-xl md:text-2xl font-bold tracking-[0.5em] animate-pulse uppercase">Access Denied</span>
          </div>
        </div>

        {/* Warning Message */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter glitch">
            Unauthorized Protocol<span className="text-red-600 animate-bounce">!</span>
          </h2>
          
          <div className="p-8 border border-red-900/50 bg-red-950/20 rounded-[32px] backdrop-blur-sm space-y-4">
            <p className="text-red-400 font-mono text-sm leading-relaxed uppercase tracking-tight">
              Attempted access to <span className="text-white font-bold">OSC-CORE-MAINFRAME</span> detected from unauthorized node. Your current clearance level (GUEST) is insufficient for this directory.
            </p>
            <div className="h-px w-full bg-red-900/30"></div>
            <p className="text-red-700 font-mono text-[10px] uppercase tracking-widest">
              Security Log ID: 0x9F32 - IP Logged - Biometric Sync Failure
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-8">
          <button 
            onClick={onBack}
            className="group relative px-10 py-4 overflow-hidden rounded-full border border-red-600/50 transition-all hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
          >
            <div className="absolute inset-0 bg-red-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 text-[11px] font-mono font-bold text-red-500 group-hover:text-white uppercase tracking-[0.4em]">
              Return to Safe Sector
            </span>
          </button>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-red-900/30"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-red-900/30"></div>

      {/* Terminal Text Footer */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <div className="text-[9px] font-mono text-red-900/50 space-y-1">
          <p>ERR_FORBIDDEN_ENTRY_LOG</p>
          <p>SYSTEM_REACTION: LOCKDOWN_INIT</p>
          <p>SENTINEL_UPLINK: ACTIVE</p>
        </div>
      </div>
    </div>
  );
};
