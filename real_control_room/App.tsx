import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Power, RotateCcw, Skull, Lock } from 'lucide-react';
import { CRTOverlay } from './components/CRTOverlay';
import { Gauge } from './components/Gauge';
import { Switch } from './components/Switch';
import { SystemTerminal } from './components/SystemTerminal';
import { NOZZLES, REQUIRED_ACTIVATIONS, MAX_STABILITY, DAMAGE_PENALTY } from './constants';
import { GameState, SystemLog, NozzleType } from './types';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.BOOT);
  const [stability, setStability] = useState(MAX_STABILITY);
  
  // Nozzle State
  const [activatedIds, setActivatedIds] = useState<number[]>([]);
  const [errorIds, setErrorIds] = useState<number[]>([]);
  
  // Logic for unlocking mechanism
  const [pendingAuthNozzleId, setPendingAuthNozzleId] = useState<number | null>(null);

  const [logs, setLogs] = useState<SystemLog[]>([]);

  const addLog = useCallback((message: string, type: SystemLog['type'] = 'info') => {
    const now = new Date();
    const timeStr = [
      now.getHours().toString().padStart(2, '0'),
      now.getMinutes().toString().padStart(2, '0'),
      now.getSeconds().toString().padStart(2, '0')
    ].join(':');

    setLogs(prev => [...prev, {
      id: Date.now(),
      timestamp: timeStr,
      message: message.toUpperCase(),
      type
    }].slice(-20)); // Keep last 20
  }, []);

  // Boot Sequence
  useEffect(() => {
    if (gameState === GameState.BOOT) {
      const timeouts = [
        setTimeout(() => addLog("System initialization...", 'info'), 500),
        setTimeout(() => addLog("Checking core integrity...", 'info'), 1200),
        setTimeout(() => addLog("Radiation levels nominal.", 'info'), 2000),
        setTimeout(() => addLog("WARNING: SECURITY LOCKDOWN ACTIVE", 'warn'), 3000),
        setTimeout(() => setGameState(GameState.ACTIVE), 3500),
      ];
      return () => timeouts.forEach(clearTimeout);
    }
  }, [gameState, addLog]);

  // Stability Check
  useEffect(() => {
    if (stability <= 0 && gameState === GameState.ACTIVE) {
      setGameState(GameState.MELTDOWN);
      addLog("CRITICAL FAILURE. CORE MELTDOWN IMMINENT.", 'error');
    }
  }, [stability, gameState, addLog]);

  // Win Check
  useEffect(() => {
    if (gameState === GameState.ACTIVE && activatedIds.length === REQUIRED_ACTIVATIONS) {
      setTimeout(() => {
        setGameState(GameState.SUCCESS);
        addLog("ALL SECURITY LOCKS DISENGAGED. REDIRECTING...", 'success');
      }, 1000);
    }
  }, [activatedIds, gameState, addLog]);

  const handleSwitchClick = (id: number) => {
    if (gameState !== GameState.ACTIVE) return;

    // Reset error visuals on click
    setErrorIds(prev => prev.filter(eid => eid !== id));
    
    // If we were waiting for another nozzle, cancel it
    if (pendingAuthNozzleId && pendingAuthNozzleId !== id) {
       addLog("AUTH SEQUENCE ABORTED.", 'warn');
       setPendingAuthNozzleId(null);
    }

    // Don't interact if already active
    if (activatedIds.includes(id)) {
        addLog("UNIT ALREADY OPERATIONAL.", 'info');
        return;
    }

    const nozzle = NOZZLES.find(n => n.id === id);
    if (!nozzle) return;

    // BROKEN LOGIC
    if (nozzle.type === NozzleType.BROKEN) {
      setStability(prev => Math.max(0, prev - DAMAGE_PENALTY));
      addLog(`ERROR: UNIT ${nozzle.label} MALFUNCTION. STABILITY -${DAMAGE_PENALTY}%`, 'error');
      setErrorIds(prev => [...prev, id]);
      setPendingAuthNozzleId(null);
      return;
    }

    // LOCKED LOGIC (Previously Working)
    if (nozzle.unlockCode) {
      setPendingAuthNozzleId(id);
      addLog(`UNIT ${nozzle.label} LOCKED. ENTER AUTH CODE FOR ACTIVATION:`, 'warn');
      return;
    }

    // PROXY LOGIC (Generic unworking buttons)
    if (nozzle.type === NozzleType.PROXY) {
      addLog(`UNIT ${nozzle.label} CONNECTION REFUSED.`, 'warn');
    }
  };

  const handleCodeSubmit = (code: string) => {
    if (!pendingAuthNozzleId) return;

    const nozzle = NOZZLES.find(n => n.id === pendingAuthNozzleId);
    if (!nozzle) {
        setPendingAuthNozzleId(null);
        return;
    }

    if (code === nozzle.unlockCode) {
        setActivatedIds(prev => [...prev, pendingAuthNozzleId]);
        addLog(`AUTH ACCEPTED. UNIT ${nozzle.label} ACTIVATED.`, 'success');
    } else {
        setStability(prev => Math.max(0, prev - 5));
        addLog(`INVALID CODE. ACCESS DENIED. STABILITY -5%`, 'error');
        setErrorIds(prev => [...prev, pendingAuthNozzleId]);
    }

    // Reset input state
    setPendingAuthNozzleId(null);
  };

  const handleRestart = () => {
    setStability(MAX_STABILITY);
    setActivatedIds([]);
    setErrorIds([]);
    setLogs([]);
    setPendingAuthNozzleId(null);
    setGameState(GameState.BOOT);
  };

  // Render Methods
  if (gameState === GameState.SUCCESS) {
    return (
      <div className="min-h-screen bg-emerald-950 text-emerald-100 flex items-center justify-center font-mono relative overflow-hidden">
        <CRTOverlay />
        <div className="z-10 text-center space-y-8 p-8 border-4 border-emerald-800 bg-black/50 backdrop-blur-sm max-w-2xl mx-4">
          <div className="flex justify-center mb-4">
             <Lock className="w-16 h-16 text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-widest text-emerald-400 animate-pulse">
            ACCESS GRANTED
          </h1>
          <p className="text-xl">REACTOR CORE STABILIZED.</p>
          <p className="text-sm opacity-70">
            Welcome to the secure archive. The protocol was followed correctly.
          </p>
          <div className="pt-8 border-t border-emerald-800">
             <button className="px-6 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest" onClick={() => window.location.reload()}>
                Enter Secure Site
             </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === GameState.MELTDOWN) {
    return (
      <div className="min-h-screen bg-red-950 text-red-500 flex items-center justify-center font-mono relative overflow-hidden">
        <CRTOverlay />
        <div className="absolute inset-0 bg-red-500/10 animate-pulse z-0" />
        <div className="z-10 text-center space-y-6 border-4 border-red-800 p-12 bg-black/80 mx-4">
          <Skull className="w-24 h-24 mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">CRITICAL FAILURE</h1>
          <p className="text-2xl blink">EVACUATE FACILITY</p>
          <div className="text-xs border border-red-900 p-2 mt-4 text-left font-mono">
            ERR_CODE: 0xDEAD<br/>
            CORE_TEMP: 4000K<br/>
            CONTAINMENT: BREACHED
          </div>
          <button 
            onClick={handleRestart}
            className="mt-8 px-8 py-3 border-2 border-red-600 hover:bg-red-600 hover:text-black transition-colors uppercase font-bold flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" /> Initialize Emergency Reset
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#b5b0a3] relative flex flex-col overflow-x-hidden select-none">
      <CRTOverlay />
      
      {/* Background Texture/Grime */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-50 mix-blend-multiply pointer-events-none fixed" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/10 to-stone-900/40 pointer-events-none fixed" />

      {/* Main Header Panel */}
      <header className="relative z-10 bg-stone-800 border-b-4 border-stone-900 p-4 shadow-xl flex flex-col md:flex-row justify-between items-center text-stone-300 gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
          <div className="w-16 h-16 border-2 border-stone-500 rounded bg-stone-900 flex items-center justify-center shrink-0">
             <Power className={`w-8 h-8 ${gameState === GameState.ACTIVE ? 'text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'text-stone-600'}`} />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-wider font-vt323 text-stone-200">РБМК-1000</h1>
            <p className="text-xs text-stone-500 tracking-[0.2em] uppercase">Control Station 4</p>
          </div>
        </div>
        
        {/* Status Cluster */}
        <div className="flex gap-4 flex-wrap justify-center">
           <Gauge value={stability} label="STABILITY" danger={stability < 40} invertZones={true} />
           <Gauge value={Math.random() * 20 + 70} label="PRESSURE" />
           <Gauge value={Math.random() * 10 + 30} label="RADS" />
        </div>
      </header>

      {/* Main Control Surface */}
      <main className="relative z-10 flex-1 p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start justify-center max-w-7xl mx-auto w-full">
        
        {/* Left: Instructions/Warning */}
        <div className="lg:col-span-3 space-y-4 order-3 lg:order-1">
          <div className="bg-[#e8e4d9] border border-stone-400 p-4 shadow-[2px_2px_5px_rgba(0,0,0,0.2)] lg:rotate-1 relative mx-auto max-w-sm lg:max-w-none">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-yellow-100/50 backdrop-blur border border-white/20 shadow-sm rotate-1"></div>
             <h3 className="font-bold text-red-800 underline decoration-2 underline-offset-4 mb-2">OPERATOR INSTRUCTIONS</h3>
             <ul className="text-sm text-stone-800 font-mono space-y-2 list-disc pl-4 leading-tight">
                <li>System Lockdown in effect.</li>
                <li>Manual override required.</li>
                <li>Identify valid control nodes.</li>
                <li>Enter authorization codes.</li>
                <li><strong>DO NOT</strong> engage faulty circuits.</li>
             </ul>
             <div className="mt-4 text-xs text-red-600 font-bold border-2 border-red-600 p-1 inline-block rotate-[-2deg]">
                CLASSIFIED
             </div>
          </div>
        </div>

        {/* Center: The Grid */}
        <div className="col-span-1 lg:col-span-6 order-1 lg:order-2">
          <div className="bg-stone-700/50 p-6 rounded-lg border-2 border-stone-600 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-12 gap-x-4 md:gap-x-8 justify-items-center">
              {NOZZLES.map((nozzle) => (
                <Switch 
                  key={nozzle.id}
                  data={nozzle}
                  isActive={activatedIds.includes(nozzle.id)}
                  isError={errorIds.includes(nozzle.id)}
                  onClick={handleSwitchClick}
                  disabled={gameState !== GameState.ACTIVE}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Terminal */}
        <div className="col-span-1 lg:col-span-3 h-64 lg:h-96 order-2 lg:order-3 w-full">
          <SystemTerminal 
            logs={logs} 
            isInputActive={pendingAuthNozzleId !== null} 
            onCommandSubmit={handleCodeSubmit}
            promptLabel={pendingAuthNozzleId ? `UNIT-${pendingAuthNozzleId}` : undefined}
          />
        </div>

      </main>

      {/* Footer / Floor */}
      <footer className="relative z-10 bg-[#1c1917] p-2 text-center border-t-4 border-stone-800 shrink-0">
         <div className="flex justify-center items-center gap-2 text-stone-600 text-xs font-mono">
            <AlertTriangle className="w-4 h-4" />
            <span>DANGER: HIGH VOLTAGE // RESTRICTED ACCESS AREA // SECTOR 7G</span>
            <AlertTriangle className="w-4 h-4" />
         </div>
      </footer>
    </div>
  );
}