
import React, { useState, useRef, useEffect } from 'react';
import { askMissionExpert } from '../services/geminiService';
import { ChatMessage, GroundingSource } from '../types';

export const MissionIntelligence: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'SESSION STARTED. SXO NEURAL LINK INITIALIZED. SYSTEM READY FOR COMMANDS.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const result = await askMissionExpert(userMessage);
    
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: result.text.toUpperCase(), 
      sources: result.sources 
    }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[600px] gap-6">
      {/* Terminal Header */}
      <div className="flex items-center justify-center">
        <div className="px-4 py-1.5 glass rounded-full border border-white/5 flex items-center gap-3">
          <span className="text-green-400 font-mono text-[9px] font-bold">izhaan@rustbox:</span>
          <span className="text-blue-400 font-mono text-[9px]">~</span>
          <span className="text-slate-400 font-mono text-[9px]">$ cargo run --release</span>
        </div>
      </div>

      {/* Messages Window */}
      <div className="flex-1 glass rounded-[40px] border border-white/5 flex flex-col overflow-hidden shadow-2xl">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-6 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-6 rounded-[32px] font-mono text-xs leading-relaxed max-w-[85%] ${
                msg.role === 'user' 
                  ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-100 rounded-tr-none' 
                  : 'bg-white/5 border border-white/5 text-slate-300 rounded-tl-none'
              }`}>
                {msg.content}
                
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                    {msg.sources.map((s, si) => (
                      <a 
                        key={si} 
                        href={s.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[9px] px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-slate-500 hover:text-cyan-400 transition-all"
                      >
                        DATA_NODE_{si}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="px-6 py-4 bg-white/5 border border-white/5 rounded-full text-[10px] text-cyan-500/50 font-mono animate-pulse uppercase tracking-[0.2em]">
                Synchronizing core...
              </div>
            </div>
          )}
        </div>

        {/* Input Field - Pill shaped as requested */}
        <form onSubmit={handleSubmit} className="p-8 border-t border-white/5 bg-white/[0.02]">
          <div className="relative flex items-center">
            <span className="absolute left-6 text-green-500 font-mono font-bold">&gt;_</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ENTER COMMAND..."
              className="w-full bg-[#020c1b]/50 border border-white/10 focus:border-cyan-500/50 rounded-full py-4 pl-14 pr-24 focus:outline-none transition-all text-sm font-mono text-cyan-400 placeholder:text-slate-800"
              autoFocus
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="absolute right-3 px-6 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 text-[10px] font-bold tracking-widest uppercase transition-all rounded-full border border-cyan-500/20 disabled:opacity-30"
            >
              Execute
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
