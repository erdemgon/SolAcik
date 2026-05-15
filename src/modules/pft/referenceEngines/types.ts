export type PftTestType = 'spirometry' | 'tlco' | 'lungVolume' | 'mbw';

export type PftParameter =
  | 'FEV1'
  | 'FVC'
  | 'FEV1_FVC'
  | 'FEF25_75'
  | 'TLCO'
  | 'VA'
  | 'KCO'
  | 'FRC'
  | 'TLC'
  | 'RV'
  | 'RV_TLC'
  | 'ERV'
  | 'IC'
  | 'VC'
  | 'FRC_MBW'
  | 'LCI';

export type PftInterpretation = 'low' | 'normal' | 'high' | 'not_interpretable';

export type PftReferenceEngineStatus = 'official_api' | 'local_coefficients' | 'unavailable';

export type PftResultItem = {
  testType: PftTestType;
  parameter: PftParameter;
  measured: number | null;
  predicted: number | null;
  zScore: number | null;
  lln: number | null;
  uln: number | null;
  percentPredicted: number | null;
  unit: 'L' | 'ratio' | 'L/s' | 'mmol/min/kPa' | 'mL/min/mmHg' | 'mmol/min/kPa/L';
  interpretation: PftInterpretation;
  messageTr: string;
  messageEn: string;
  source: string;
};

export type PftPatientInput = {
  ageYears: number | null;
  sex: 'male' | 'female';
  heightCm: number | null;
  weightKg?: number | null;
  spiroEthnicity?: string;
  testDate?: string;
  notes?: string;
};

export type PftReferenceInput = PftPatientInput & {
  testType: PftTestType;
  engine?: PftReferenceEngineStatus;
  measured: Partial<Record<PftParameter, number | null>>;
  unitSystem?: 'SI' | 'traditional';
};

export type PftReferenceEngineResult = {
  engineStatus: PftReferenceEngineStatus;
  engineMessageTr: string;
  items: PftResultItem[];
  warnings: string[];
};

export interface PftReferenceEngine {
  calculate(input: PftReferenceInput): Promise<PftReferenceEngineResult>;
}
