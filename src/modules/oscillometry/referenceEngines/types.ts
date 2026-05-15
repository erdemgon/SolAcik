export type OscParameter =
  | 'R5'
  | 'R10'
  | 'R15'
  | 'R20'
  | 'R5_R20'
  | 'X5'
  | 'X10'
  | 'X15'
  | 'X20'
  | 'AX'
  | 'Fres'
  | 'Z5'
  | 'R8'
  | 'X8'
  | 'Z8';

export type OscDevice =
  | 'Vyaire/MasterScreen IOS'
  | 'Resmon PRO FULL'
  | 'Tremoflo/Thorasys'
  | 'Other / Unknown';

export type OscTechnique = 'IOS' | 'FOT' | 'AOS' | 'unknown';

export type OscFormulaType = 'linear' | 'logLinear' | 'LMS' | 'custom';

export type OscInterpretation = 'low' | 'normal' | 'high' | 'not_interpretable';

export type OscReferenceSet = {
  id: string;
  label: string;
  device: OscDevice | 'Any IOS/FOT device' | 'IOS';
  technique: OscTechnique;
  population: string;
  ageMin: number | null;
  ageMax: number | null;
  heightMinCm: number | null;
  heightMaxCm: number | null;
  sexSpecific: boolean;
  parametersSupported: OscParameter[];
  formulaType: OscFormulaType;
  unit: string;
  sourceCitation: string;
  coefficientsAvailable: boolean;
  notes: string;
};

export type OscResultItem = {
  parameter: OscParameter;
  measured: number | null;
  predicted: number | null;
  zScore: number | null;
  lln: number | null;
  uln: number | null;
  percentPredicted?: number | null;
  unit: 'kPa/L/s' | 'kPa/L' | 'Hz';
  interpretation: OscInterpretation;
  messageTr: string;
  messageEn: string;
  sourceReferenceSet: OscReferenceSet;
};

export type OscPatientInput = {
  ageYears: number | null;
  sex: 'male' | 'female';
  heightCm: number | null;
  weightKg?: number | null;
  population?: string;
  testDate?: string;
};

export type OscMeasuredInput = Partial<Record<OscParameter, number | null>>;

export type OscQualityInput = {
  numberOfTrials?: number | null;
  acquisitionDurationSeconds?: number | null;
  withinSessionCvPercent?: number | null;
  coherence5Hz?: number | null;
  coherence20Hz?: number | null;
  operatorNotes?: string;
};

export type OscReferenceEngineInput = OscPatientInput & {
  device: OscDevice;
  referenceSetId: string;
  measured: OscMeasuredInput;
  quality: OscQualityInput;
};

export type OscReferenceEngineResult = {
  referenceSet: OscReferenceSet;
  items: OscResultItem[];
  warnings: string[];
  reportTr: string;
  reportEn: string;
};
