import { GliReferenceSet } from '../../utils/spirometry/gliTypes';

export const gliBackendEndpointDocumentation = {
  route: '/api/gli/spiro',
  method: 'POST',
  apiKeyLocation: 'server-side environment variable, for example GLI_API_KEY',
  expoSafetyRule:
    'The Expo app must never contain the official GLI API key. It calls only this backend proxy endpoint.',
  requestBody: {
    ageYears: 'number',
    ageMonths: 'number',
    heightCm: 'number',
    sex: '"male" | "female"',
    referenceSet:
      'GLI2012_OTHER_MIXED | GLI2012_CAUCASIAN | GLI2012_NE_ASIAN | GLI2012_SE_ASIAN | GLI2012_AFRICAN_AMERICAN | GLI2022_GLOBAL',
    observed: {
      fev1L: 'optional number',
      fvcL: 'optional number',
      fev1FvcRatio: 'optional number',
      fef2575Lps: 'optional number',
    },
  },
  responseBody:
    'GliSpirometryResult: only predicted, LLN, ULN, measured, percent predicted, z-score, interpretation and warnings required by the app.',
  implementationSteps: [
    'Validate age, height and sex on the server.',
    'Map Sol Açık referenceSet values to official GLI API variables.',
    'Call the official GLI REST API with GLI_API_KEY from server-side environment.',
    'Normalize the official API response into GliSpirometryResult.',
    'For GLI2022_GLOBAL, do not return FEF25_75 unless verified official support exists.',
  ],
};

export function mapReferenceSetToGliApiVariables(referenceSet: GliReferenceSet) {
  switch (referenceSet) {
    case 'GLI2012_CAUCASIAN':
      return { equation: 'GLI-2012', ethnicity: 'Caucasian' };
    case 'GLI2012_NE_ASIAN':
      return { equation: 'GLI-2012', ethnicity: 'North East Asian' };
    case 'GLI2012_SE_ASIAN':
      return { equation: 'GLI-2012', ethnicity: 'South East Asian' };
    case 'GLI2012_AFRICAN_AMERICAN':
      return { equation: 'GLI-2012', ethnicity: 'African American' };
    case 'GLI2022_GLOBAL':
      return { equation: 'GLI Global 2022', ethnicity: 'race-neutral' };
    case 'GLI2012_OTHER_MIXED':
    default:
      return { equation: 'GLI-2012', ethnicity: 'Other/Mixed' };
  }
}

// Example server-only pseudo-flow:
// const apiResponse = await fetch(OFFICIAL_GLI_REST_URL, {
//   method: 'POST',
//   headers: { Authorization: `Bearer ${process.env.GLI_API_KEY}` },
//   body: JSON.stringify(mappedGliRequest),
// });
// return normalizeOfficialGliApiResponse(apiResponse);
