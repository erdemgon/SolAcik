import {
  GliParameter,
  GliPredictionResult,
  GliReferenceSet,
  parameterUnit,
  Sex,
} from './gliLms';

export type GliInput = {
  parameter: GliParameter;
  sex: Sex;
  ageYears: number;
  heightCm: number;
  referenceSet: GliReferenceSet;
  observed?: number | null;
};

// Legacy synchronous adapter retained for older imports. The active spirometry module
// uses getGliSpirometryResult() from gliClient.ts so it can choose official_api or
// local_coefficients engines without exposing API keys in the Expo app.
export function predictGli(input: GliInput): GliPredictionResult {
  return {
    parameter: input.parameter,
    predicted: null,
    lln: null,
    uln: null,
    unit: parameterUnit(input.parameter),
    observed: input.observed ?? null,
    zScore: null,
    percentPredicted: null,
    warning: 'Use getGliSpirometryResult() instead of predictGli().',
  };
}
