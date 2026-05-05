export type GliParameter = 'FEV1' | 'FVC' | 'FEV1_FVC' | 'FEF25_75';

export type GliReferenceSet =
  | 'GLI2012_OTHER_MIXED'
  | 'GLI2012_CAUCASIAN'
  | 'GLI2012_NE_ASIAN'
  | 'GLI2012_SE_ASIAN'
  | 'GLI2012_AFRICAN_AMERICAN'
  | 'GLI2022_GLOBAL';

export type Sex = 'female' | 'male';

export type GliEngine = 'official_api' | 'local_coefficients';

export type GliValidationStatus = 'official_api' | 'local_coefficients' | 'unavailable';

export type GliObservedValues = {
  fev1L?: number | null;
  fvcL?: number | null;
  fev1FvcRatio?: number | null;
  fef2575Lps?: number | null;
};

export type GliSpirometryInput = {
  sex: Sex;
  ageMonths: number;
  heightCm: number;
  referenceSet: GliReferenceSet;
  observed?: GliObservedValues;
  engine?: GliEngine;
};

export type GliSpirometryParameterResult = {
  parameter: GliParameter;
  predicted: number | null;
  lln: number | null;
  uln?: number | null;
  measured?: number | null;
  percentPredicted?: number | null;
  zScore?: number | null;
  interpretation: string;
  warning?: string;
  unit: 'L' | 'ratio' | 'L/s';
};

export type GliSpirometryResult = {
  engine: GliEngine;
  validationStatus?: GliValidationStatus;
  validationMessage?: string;
  source: string;
  sourceVersion?: string;
  results: GliSpirometryParameterResult[];
  warnings: string[];
};
