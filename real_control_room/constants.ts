import { NozzleType, NozzleData } from './types';

// Total number of secure nozzles the user must unlock to win
export const REQUIRED_ACTIVATIONS = 3;

export const NOZZLES: NozzleData[] = [
  { id: 1, label: "АЗ-5", type: NozzleType.BROKEN, x: 0, y: 0 },
  { id: 2, label: "НАСОС-1", type: NozzleType.WORKING, x: 1, y: 0, unlockCode: "PUMP-1" },
  { id: 3, label: "ВКЛ", type: NozzleType.PROXY, x: 2, y: 0 },
  { id: 4, label: "ТЕМП", type: NozzleType.PROXY, x: 3, y: 0 },
  
  { id: 5, label: "ДАВЛ", type: NozzleType.PROXY, x: 0, y: 1 },
  { id: 6, label: "СБРОС", type: NozzleType.BROKEN, x: 1, y: 1 },
  { id: 7, label: "ОХЛ-2", type: NozzleType.WORKING, x: 2, y: 1, unlockCode: "COOL-X" },
  { id: 8, label: "РЕЗЕРВ", type: NozzleType.PROXY, x: 3, y: 1 },

  { id: 9, label: "ТЕСТ", type: NozzleType.PROXY, x: 0, y: 2 },
  { id: 10, label: "СТЕРЖ", type: NozzleType.WORKING, x: 1, y: 2, unlockCode: "ROD-99" },
  { id: 11, label: "ВЕНТ", type: NozzleType.PROXY, x: 2, y: 2 },
  { id: 12, label: "АВАР", type: NozzleType.BROKEN, x: 3, y: 2 },
];

export const MAX_STABILITY = 100;
export const DAMAGE_PENALTY = 15;
export const STABILITY_REGEN = 0.5;