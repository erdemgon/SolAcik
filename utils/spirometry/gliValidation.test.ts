import { GliSpirometryInput, GliSpirometryResult } from './gliTypes';

type ExpectedParameter = {
  predicted: number;
  lln: number;
  uln?: number;
  zScore?: number;
};

type GliValidationCase = {
  id: string;
  input: GliSpirometryInput;
  officialCalculatorExpected?: Partial<Record<string, ExpectedParameter>>;
};

export const GLI_VALIDATION_TOLERANCE = 0.01;

export const gliValidationCases: GliValidationCase[] = [
  {
    id: 'girl-5y-110cm-other-mixed',
    input: {
      sex: 'female',
      ageMonths: 60,
      heightCm: 110,
      referenceSet: 'GLI2012_OTHER_MIXED',
      observed: { fev1L: 0.9, fvcL: 1.0, fev1FvcRatio: 0.9, fef2575Lps: 1.1 },
    },
  },
  {
    id: 'boy-8y-128cm-other-mixed',
    input: {
      sex: 'male',
      ageMonths: 96,
      heightCm: 128,
      referenceSet: 'GLI2012_OTHER_MIXED',
      observed: { fev1L: 1.35, fvcL: 1.6, fev1FvcRatio: 0.84, fef2575Lps: 1.4 },
    },
  },
  {
    id: 'girl-10y-140cm-caucasian',
    input: {
      sex: 'female',
      ageMonths: 120,
      heightCm: 140,
      referenceSet: 'GLI2012_CAUCASIAN',
      observed: { fev1L: 1.8, fvcL: 2.05, fev1FvcRatio: 0.88, fef2575Lps: 2.1 },
    },
  },
  {
    id: 'boy-14y-165cm-global-2022',
    input: {
      sex: 'male',
      ageMonths: 168,
      heightCm: 165,
      referenceSet: 'GLI2022_GLOBAL',
      observed: { fev1L: 3.0, fvcL: 3.6, fev1FvcRatio: 0.83 },
    },
  },
  {
    id: 'girl-17y-160cm-ne-asian',
    input: {
      sex: 'female',
      ageMonths: 204,
      heightCm: 160,
      referenceSet: 'GLI2012_NE_ASIAN',
      observed: { fev1L: 2.65, fvcL: 3.05, fev1FvcRatio: 0.87, fef2575Lps: 2.6 },
    },
  },
];

export function compareGliResultToOfficialCalculator(
  actual: GliSpirometryResult,
  validationCase: GliValidationCase,
) {
  if (!validationCase.officialCalculatorExpected) {
    return {
      passed: false,
      skipped: true,
      message:
        'Official GLI calculator expected values have not been entered for this validation case.',
    };
  }

  for (const result of actual.results) {
    const expected = validationCase.officialCalculatorExpected[result.parameter];
    if (!expected) continue;
    assertClose(result.predicted, expected.predicted, `${result.parameter} predicted`);
    assertClose(result.lln, expected.lln, `${result.parameter} LLN`);
    if (expected.uln !== undefined) assertClose(result.uln ?? null, expected.uln, `${result.parameter} ULN`);
    if (expected.zScore !== undefined) {
      assertClose(result.zScore ?? null, expected.zScore, `${result.parameter} z-score`);
    }
  }

  return { passed: true, skipped: false, message: 'All values match within tolerance.' };
}

function assertClose(actual: number | null, expected: number, label: string) {
  if (actual === null || Math.abs(actual - expected) > GLI_VALIDATION_TOLERANCE) {
    throw new Error(
      `${label} differs from official calculator. Expected ${expected}, received ${actual}.`,
    );
  }
}
