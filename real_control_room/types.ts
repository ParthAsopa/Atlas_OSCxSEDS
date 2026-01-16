export enum NozzleType {
  WORKING = 'WORKING',
  BROKEN = 'BROKEN',
  PROXY = 'PROXY'
}

export interface NozzleData {
  id: number;
  label: string; // Cyrillic or numeric label
  type: NozzleType;
  x: number; // Grid position for uneven layouts
  y: number;
  unlockCode?: string; // If present, requires terminal input to activate
}

export enum GameState {
  BOOT = 'BOOT',
  ACTIVE = 'ACTIVE',
  MELTDOWN = 'MELTDOWN',
  SUCCESS = 'SUCCESS'
}

export interface SystemLog {
  id: number;
  timestamp: string;
  message: string;
  type: 'info' | 'warn' | 'error' | 'success';
}