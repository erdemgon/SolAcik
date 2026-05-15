import { fetchPftReferenceFromBackend } from '../../services/pftApiClient';
import { pftLocalEngine } from '../../services/pftLocalEngine';
import {
  PftReferenceEngineResult,
  PftReferenceInput,
} from '../../src/modules/pft/referenceEngines/types';

export async function getPftReferenceResult(
  input: PftReferenceInput,
): Promise<PftReferenceEngineResult> {
  if (input.engine === 'official_api') {
    const apiResult = await fetchPftReferenceFromBackend(input);
    if (apiResult.engineStatus !== 'unavailable') return apiResult;
  }

  return pftLocalEngine.calculate({ ...input, engine: 'local_coefficients' });
}
