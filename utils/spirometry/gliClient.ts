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
    const officialResult = await fetchOfficialGliSpirometry({ ...input, engine: 'official_api' });
    return {
      ...officialResult,
      engine: 'official_api',
      validationStatus: officialResult.validationStatus ?? 'official_api',
      validationMessage:
        officialResult.validationMessage ??
        'Sonuç server-side resmi GLI API/proxy yanıtından geldi; API anahtarı Expo uygulamasında tutulmaz.',
    };
  } catch {
    const localResult = await runGliLocalEngine({ ...input, engine: 'local_coefficients' });
    return {
      ...localResult,
      engine: 'local_coefficients',
      validationStatus: localResult.validationStatus ?? 'local_coefficients',
      validationMessage:
        localResult.validationMessage ??
        'Yerel GLI katsayı motoru kullanıldı; resmi GLI örnekleriyle validasyon gereklidir.',
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
    validationStatus: 'unavailable',
    validationMessage: 'Resmi GLI API ve yerel katsayı motoru kullanılamadığı için hesaplama yapılmadı.',
    source: '/api/gli/spiro',
    sourceVersion: 'official GLI REST API via server-side proxy',
    results,
    warnings: [
      'Resmi GLI API backend endpoint’i bağlanmadı.',
      'GLI API anahtarı Expo uygulamasına konulmamalıdır; yalnızca server-side environment variable olarak kullanılmalıdır.',
    ],
  };
}
