import React, { useRef, useEffect, useState } from 'react';
import { SystemLog } from '../types';

interface SystemTerminalProps {
  logs: SystemLog[];
  isInputActive: boolean;
  onCommandSubmit: (cmd: string) => void;
  promptLabel?: string;
}

export const SystemTerminal: React.FC<SystemTerminalProps> = ({ 
  logs, 
  isInputActive, 
  onCommandSubmit,
  promptLabel = "INPUT_KEY" 
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  // Auto-scroll on log update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Auto-focus input when active
  useEffect(() => {
    if (isInputActive && inputRef.current) {
      inputRef.current.focus();
    }
    // Clear input when deactivated (or re-activated)
    if (!isInputActive) {
      setInputValue("");
    }
  }, [isInputActive, logs]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onCommandSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="h-full bg-black border-2 border-stone-600 rounded p-4 font-mono text-sm shadow-[inset_0_0_20px_rgba(0,0,0,1)] flex flex-col relative overflow-hidden">
      {/* Screen Glare */}
      <div className="absolute top-0 right-0 w-full h-24 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      <div className="text-emerald-500 border-b border-emerald-900 pb-2 mb-2 uppercase tracking-widest text-xs flex justify-between shrink-0">
        <span>SYS.LOG.V.3.04</span>
        <span className="animate-pulse">{isInputActive ? 'WAITING FOR INPUT...' : 'ONLINE'}</span>
      </div>

      <div 
        className="flex-1 overflow-y-auto space-y-1 scrollbar-hide cursor-text" 
        onClick={() => isInputActive && inputRef.current?.focus()}
      >
        {logs.map((log) => (
          <div key={log.id} className={`font-mono text-xs opacity-90 ${
            log.type === 'error' ? 'text-red-500' : 
            log.type === 'warn' ? 'text-amber-500' :
            log.type === 'success' ? 'text-blue-400' : 'text-emerald-700'
          }`}>
            <span className="opacity-50">[{log.timestamp}]</span> {log.message}
          </div>
        ))}
        
        {isInputActive && (
          <div className="flex items-center gap-2 text-emerald-400 animate-pulse mt-2 border-t border-emerald-900/50 pt-1">
             <span className="text-xs font-bold">{'>'} {promptLabel}:</span>
             <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-emerald-300 font-mono text-xs uppercase flex-1 caret-emerald-500"
                autoComplete="off"
             />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};