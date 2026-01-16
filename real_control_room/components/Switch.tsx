import React from 'react';
import { NozzleData } from '../types';

interface SwitchProps {
  data: NozzleData;
  isActive: boolean;
  isError: boolean;
  onClick: (id: number) => void;
  disabled: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ data, isActive, isError, onClick, disabled }) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const handleMouseDown = () => {
    if (disabled) return;
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (disabled) return;
    setIsPressed(false);
    onClick(data.id);
  };

  // Status Light Color
  let lightColor = "bg-stone-800"; // Off
  let glow = "";
  
  if (isActive) {
    lightColor = "bg-emerald-400";
    glow = "shadow-[0_0_10px_#34d399]";
  } else if (isError) {
    lightColor = "bg-red-500";
    glow = "shadow-[0_0_15px_#ef4444] animate-pulse";
  }

  return (
    <div className="relative flex flex-col items-center gap-2 select-none group">
      {/* Label (Tape Style) */}
      <div className="bg-[#f0e6d2] text-stone-900 px-2 py-0.5 text-sm font-bold tracking-widest -rotate-1 shadow-sm border border-stone-400 font-mono mb-1 w-24 text-center overflow-hidden whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
        {data.label}
      </div>

      {/* The Switch Mechanism */}
      <div 
        className={`
          relative w-20 h-20 rounded-md 
          bg-gradient-to-br from-stone-600 to-stone-800 
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_8px_rgba(0,0,0,0.5)]
          border border-stone-500
          flex items-center justify-center
          cursor-pointer
          active:scale-95 transition-transform
        `}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsPressed(false)}
      >
        {/* Screw heads */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-stone-400 shadow-[inset_0_1px_0_rgba(0,0,0,0.5)]" />
        <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-stone-400 shadow-[inset_0_1px_0_rgba(0,0,0,0.5)]" />
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-stone-400 shadow-[inset_0_1px_0_rgba(0,0,0,0.5)]" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-stone-400 shadow-[inset_0_1px_0_rgba(0,0,0,0.5)]" />

        {/* The Button/Knob itself */}
        <div className={`
          w-12 h-12 rounded-full 
          bg-stone-900 
          border-4 ${isActive ? 'border-emerald-700' : 'border-stone-700'}
          shadow-[0_4px_6px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.1)]
          flex items-center justify-center
          transition-all duration-100
          ${isPressed ? 'translate-y-1 shadow-none' : ''}
        `}>
           {/* Indent */}
           <div className="w-8 h-8 rounded-full bg-stone-950 shadow-[inset_0_1px_2px_rgba(0,0,0,1)]"></div>
        </div>
      </div>

      {/* Status Light */}
      <div className={`
        w-4 h-4 rounded-full border border-stone-950 
        transition-colors duration-200
        ${lightColor} ${glow}
      `} />
      
      {/* Dirty Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dust.png')]"></div>
    </div>
  );
};