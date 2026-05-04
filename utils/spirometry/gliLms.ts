export type GliParameter = 'FEV1' | 'FVC' | 'FEV1_FVC' | 'FEF25_75';

export type GliReferenceSet =
  | 'GLI2012_OTHER_MIXED'
  | 'GLI2012_CAUCASIAN'
  | 'GLI2012_NE_ASIAN'
  | 'GLI2012_SE_ASIAN'
  | 'GLI2012_AFRICAN_AMERICAN'
  | 'GLI2022_GLOBAL';

export type Sex = 'female' | 'male';

export type GliLms = {
  l: number;
  m: number;
  s: number;
};

export type GliPredictionResult = {
  parameter: GliParameter;
  predicted: number | null;
  lln: number | null;
  uln?: number | null;
  unit: 'L' | 'ratio' | 'L/s';
  zScore?: number | null;
  percentPredicted?: number | null;
  observed?: number | null;
  warning?: string;
};

export function calculateZScore(observed: number, lms: GliLms) {
  if (observed <= 0 || lms.m <= 0 || lms.s <= 0) return null;
  if (lms.l === 0) return Math.log(observed / lms.m) / lms.s;
  return ((observed / lms.m) ** lms.l - 1) / (lms.l * lms.s);
}

export function valueAtZ(z: number, lms: GliLms) {
  if (lms.m <= 0 || lms.s <= 0) return null;
  if (lms.l === 0) return lms.m * Math.exp(lms.s * z);
  const base = 1 + lms.l * lms.s * z;
  if (base <= 0) return null;
  return lms.m * base ** (1 / lms.l);
}

export function parameterUnit(parameter: GliParameter): GliPredictionResult['unit'] {
  if (parameter === 'FEV1_FVC') return 'ratio';
  if (parameter === 'FEF25_75') return 'L/s';
  return 'L';
}
