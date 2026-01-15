import React from 'react';

interface GaugeProps {
  value: number; // 0 to 100
  label: string;
  danger?: boolean;
  invertZones?: boolean;
}

export const Gauge: React.FC<GaugeProps> = ({ value, label, danger = false, invertZones = false }) => {
  // Calculate rotation for needle: -90deg (0%) to 90deg (100%)
  const rotation = -90 + (value / 100) * 180;
  
  // Random jitter for needle to make it look analog/unstable
  const [jitter, setJitter] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setJitter((Math.random() - 0.5) * 3);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Normal: Gray (Low) -> Red (High)
  // Inverted: Red (Low) -> Gray (High)
  const gradient = invertZones
    ? `conic-gradient(from 270deg, #b91c1c 0deg, #b91c1c 45deg, #44403c 45deg, #44403c 180deg, transparent 180deg)`
    : `conic-gradient(from 270deg, #44403c 0deg, #44403c 135deg, #b91c1c 135deg, #b91c1c 180deg, transparent 180deg)`;

  return (
    <div className="flex flex-col items-center justify-center bg-stone-800 border-4 border-stone-600 rounded-sm p-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
      {/* Gauge Container */}
      <div className="relative w-24 h-14 overflow-hidden">
        {/* Background Arc (Conic Gradient) */}
        {/* Starts at 270deg (Left/9 o'clock). Runs 180deg total (to Right/3 o'clock). */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bottom-[-2.5rem]"
          style={{ background: gradient }}
        />
        
        {/* Mask (Inner Circle) to create the arc effect */}
        <div className="absolute left-1/2 -translate-x-1/2 w-14 h-14 bg-stone-800 rounded-full bottom-[-1.75rem]" />

        {/* Needle */}
        <div 
          className="absolute bottom-0 left-1/2 w-1 h-[2.8rem] bg-red-600 origin-bottom transition-transform duration-300 ease-out z-10 shadow-[0_0_2px_rgba(0,0,0,0.5)]"
          style={{ transform: `translateX(-50%) rotate(${rotation + jitter}deg)` }}
        >
             {/* Needle Tip */}
             <div className="absolute -top-1 -left-0.5 w-2 h-2 bg-red-600 rounded-full" />
        </div>
        
        {/* Pivot Point */}
        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-400 rounded-full z-20 shadow-sm border border-stone-600" />
      </div>
      
      {/* Label */}
      <span className={`text-xs mt-1 font-mono tracking-widest ${danger ? 'text-red-500 animate-pulse' : 'text-stone-400'}`}>
        {label}
      </span>
    </div>
  );
};