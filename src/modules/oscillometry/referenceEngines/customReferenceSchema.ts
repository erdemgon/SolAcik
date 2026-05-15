import { OscFormulaType, OscParameter } from './types';

export type OscLinearCoefficient = {
  parameter: OscParameter;
  formulaType: Extract<OscFormulaType, 'linear' | 'logLinear'>;
  intercept: number;
  bHeight?: number;
  bAge?: number;
  bWeight?: number;
  bSexMale?: number;
  residualSd?: number;
  llnZ?: number;
  ulnZ?: number;
};

export type OscLmsCoefficient = {
  parameter: OscParameter;
  formulaType: 'LMS';
  l: number | OscSimplePredictor;
  m: number | OscSimplePredictor;
  s: number | OscSimplePredictor;
};

export type OscSimplePredictor = {
  intercept: number;
  bHeight?: number;
  bAge?: number;
  bWeight?: number;
  bSexMale?: number;
};

export type OscCustomReferenceJson = {
  schemaVersion: 1;
  sourceCitation: string;
  referenceSetId: string;
  coefficients: (OscLinearCoefficient | OscLmsCoefficient)[];
};

export const oscCustomReferenceSchemaNote =
  'Custom JSON coefficient dosyaları klinik editör tarafından kaynak, cihaz ve popülasyon uyumu doğrulandıktan sonra etkinleştirilmelidir.';
