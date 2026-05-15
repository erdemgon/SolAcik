export type ResistanceReactanceUnit = 'kPa/L/s' | 'hPa/L/s' | 'cmH2O/L/s';
export type AxUnit = 'kPa/L' | 'hPa/L' | 'cmH2O/L';

const HPA_PER_KPA = 10;
const CMH2O_PER_KPA = 10.1972;

export function resistanceReactanceToKpa(value: number, unit: ResistanceReactanceUnit) {
  if (unit === 'hPa/L/s') return value / HPA_PER_KPA;
  if (unit === 'cmH2O/L/s') return value / CMH2O_PER_KPA;
  return value;
}

export function axToKpa(value: number, unit: AxUnit) {
  if (unit === 'hPa/L') return value / HPA_PER_KPA;
  if (unit === 'cmH2O/L') return value / CMH2O_PER_KPA;
  return value;
}

export function kpaToDisplay(value: number, unit: ResistanceReactanceUnit | AxUnit) {
  if (unit === 'hPa/L/s' || unit === 'hPa/L') return value * HPA_PER_KPA;
  if (unit === 'cmH2O/L/s' || unit === 'cmH2O/L') return value * CMH2O_PER_KPA;
  return value;
}
