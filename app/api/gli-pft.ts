export const gliPftBackendEndpointDocumentation = {
  baseRoute: '/api/gli',
  endpoints: {
    spiro: '/api/gli/spiro',
    tlco: '/api/gli/tlco',
    volume: '/api/gli/volume',
    washout: '/api/gli/washout',
    all: '/api/gli/all',
  },
  apiKeyLocation: 'server-side environment variable only',
  clientRule:
    'Expo istemcisi resmi GLI servisini doğrudan çağırmaz; API anahtarı mobil uygulamaya veya public .env dosyasına konulmaz.',
  currentStatus:
    'Backend/proxy yapılandırılmadığı için TLCO, volume ve MBW API motoru disabled kabul edilir.',
};
