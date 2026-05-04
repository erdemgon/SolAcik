import { GliSpirometryInput, GliSpirometryResult } from '../utils/spirometry/gliTypes';

const BACKEND_ENDPOINT = '/api/gli/spiro';

export async function fetchOfficialGliSpirometry(
  input: GliSpirometryInput,
): Promise<GliSpirometryResult> {
  const response = await fetch(BACKEND_ENDPOINT, {
    body: JSON.stringify({
      sex: input.sex,
      ageYears: input.ageMonths / 12,
      ageMonths: input.ageMonths,
      heightCm: input.heightCm,
      referenceSet: input.referenceSet,
      observed: input.observed,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`GLI backend endpoint failed with ${response.status}`);
  }

  return response.json() as Promise<GliSpirometryResult>;
}
