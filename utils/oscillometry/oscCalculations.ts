import {
  OscLinearCoefficient,
  OscLmsCoefficient,
  OscSimplePredictor,
} from '../../src/modules/oscillometry/referenceEngines/customReferenceSchema';
import { OscPatientInput } from '../../src/modules/oscillometry/referenceEngines/types';

export function calculateR5R20({
  r5,
  r20,
}: {
  r5: number | null | undefined;
  r20: number | null | undefined;
}) {
  if (r5 === null || r5 === undefined || r20 === null || r20 === undefined) return null;
  return r5 - r20;
}

export function calculateLinearPredicted(
  coefficient: OscLinearCoefficient,
  input: OscPatientInput,
) {
  const predicted =
    coefficient.intercept +
    (coefficient.bHeight ?? 0) * (input.heightCm ?? 0) +
    (coefficient.bAge ?? 0) * (input.ageYears ?? 0) +
    (coefficient.bWeight ?? 0) * (input.weightKg ?? 0) +
    (coefficient.bSexMale ?? 0) * (input.sex === 'male' ? 1 : 0);

  return coefficient.formulaType === 'logLinear' ? Math.exp(predicted) : predicted;
}

export function calculateLinearZScore({
  coefficient,
  input,
  measured,
}: {
  coefficient: OscLinearCoefficient;
  input: OscPatientInput;
  measured: number;
}) {
  const predicted = calculateLinearPredicted(coefficient, input);
  if (!coefficient.residualSd || coefficient.residualSd <= 0) return null;
  return (measured - predicted) / coefficient.residualSd;
}

export function calculateLmsZScore({
  coefficient,
  input,
  measured,
}: {
  coefficient: OscLmsCoefficient;
  input: OscPatientInput;
  measured: number;
}) {
  const l = resolvePredictor(coefficient.l, input);
  const m = resolvePredictor(coefficient.m, input);
  const s = resolvePredictor(coefficient.s, input);
  if (m <= 0 || s <= 0 || measured <= 0) return null;
  if (Math.abs(l) < 0.000001) return Math.log(measured / m) / s;
  return ((measured / m) ** l - 1) / (l * s);
}

function resolvePredictor(value: number | OscSimplePredictor, input: OscPatientInput) {
  if (typeof value === 'number') return value;
  return (
    value.intercept +
    (value.bHeight ?? 0) * (input.heightCm ?? 0) +
    (value.bAge ?? 0) * (input.ageYears ?? 0) +
    (value.bWeight ?? 0) * (input.weightKg ?? 0) +
    (value.bSexMale ?? 0) * (input.sex === 'male' ? 1 : 0)
  );
}
