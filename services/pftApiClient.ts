import {
  PftReferenceEngineResult,
  PftReferenceInput,
} from '../src/modules/pft/referenceEngines/types';

export const pftApiEndpointDocumentation = {
  baseRoute: '/api/gli',
  endpoints: ['spiro', 'tlco', 'volume', 'washout', 'all'],
  apiKeyRule:
    'GLI API anahtarı Expo/mobil istemciye konulmaz; yalnızca server-side environment variable olarak tutulur.',
  status: 'disabled_until_backend_configured',
};

export async function fetchPftReferenceFromBackend(
  _input: PftReferenceInput,
): Promise<PftReferenceEngineResult> {
  return {
    engineStatus: 'unavailable',
    engineMessageTr:
      'GLI API yapılandırılmamış. Backend/proxy ve server-side API anahtarı eklenmeden API motoru çalışmaz.',
    items: [],
    warnings: [
      'GLI API yapılandırılmamış.',
      'API anahtarı public .env veya mobil uygulama içine gömülmemelidir.',
    ],
  };
}
