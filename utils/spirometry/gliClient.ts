import { fetchOfficialGliSpirometry } from '../../services/gliApiClient';
import { runGliLocalEngine } from '../../services/gliLocalEngine';
import {
  GliSpirometryInput,
  GliSpirometryParameterResult,
  GliSpirometryResult,
} from './gliTypes';

export async function getGliSpirometryResult(
  input: GliSpirometryInput,
): Promise<GliSpirometryResult> {
  const engine = input.engine ?? 'official_api';
  if (engine === 'local_coefficients') return runGliLocalEngine(input);

  try {
    return await fetchOfficialGliSpirometry({ ...input, engine: 'official_api' });
  } catch {
    const localResult = await runGliLocalEngine({ ...input, engine: 'local_coefficients' });
    return {
      ...localResult,
      engine: 'local_coefficients',
      warnings: [
        'Resmi GLI API backend endpoint’i bağlanamadı; yerel katsayı motoru kullanıldı.',
        ...localResult.warnings,
      ],
    };
  }
}

function buildOfficialApiUnavailableResult(input: GliSpirometryInput): GliSpirometryResult {
  const results: GliSpirometryParameterResult[] = [
    ['FEV1', input.observed?.fev1L ?? null, 'L'],
    ['FVC', input.observed?.fvcL ?? null, 'L'],
    ['FEV1_FVC', input.observed?.fev1FvcRatio ?? null, 'ratio'],
    ['FEF25_75', input.observed?.fef2575Lps ?? null, 'L/s'],
  ].map(([parameter, measured, unit]) => ({
    parameter,
    predicted: null,
    lln: null,
    uln: null,
    measured,
    percentPredicted: null,
    zScore: null,
    interpretation: 'Hesaplanamadı / referans yok',
    unit,
    warning:
      input.referenceSet === 'GLI2022_GLOBAL' && parameter === 'FEF25_75'
        ? 'GLI Global 2022 race-neutral referansta FEF25–75 / MEF25–75 için predicted/z-skor mevcut değildir.'
        : 'Resmi GLI API backend endpoint’i bağlanmadı.',
  })) as GliSpirometryParameterResult[];

  return {
    engine: 'official_api',
    source: '/api/gli/spiro',
    sourceVersion: 'official GLI REST API via server-side proxy',
    results,
    warnings: [
      'Resmi GLI API backend endpoint’i bağlanmadı.',
      'GLI API anahtarı Expo uygulamasına konulmamalıdır; yalnızca server-side environment variable olarak kullanılmalıdır.',
    ],
  };
}
