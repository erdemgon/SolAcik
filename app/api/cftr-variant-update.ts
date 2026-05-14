export const cftrVariantUpdateEndpointDocumentation = {
  route: '/api/cftr/vertex-variant-update',
  schedule: 'daily',
  runtime: 'server-only',
  purpose:
    'Vertex resmi PI PDF kaynaklarında responsive CFTR varyant listesi değişmiş mi kontrol eder; klinik data dosyasını otomatik değiştirmez.',
  environment: [
    'CFTR_VERTEX_UPDATE_TOKEN: cron endpoint çağrısını yetkilendirmek için',
    'CFTR_VARIANT_SNAPSHOT_STORE: önceki hash/snapshot kaydı için sunucu tarafı depolama',
  ],
  steps: [
    'Vertex PI PDF kaynaklarını sunucuda indir.',
    'ETag/Last-Modified ve içerik hash değerini önceki snapshot ile karşılaştır.',
    'PDF metnini sunucuda çıkar.',
    'parseVertexResponsiveVariantsFromText ile aday varyant listesini oluştur.',
    'Değişiklik varsa editör onay kaydı üret; uygulama data dosyasını otomatik değiştirme.',
    'Editör onayından sonra data/cftr/sampleResponsiveVariants.ts ve source/version metadata güncellenir.',
  ],
  safety:
    'Expo istemcisi Vertex sitesini doğrudan çağırmamalı; responsive varyant listesi klinik editör onayı olmadan uygunluk motoruna yansıtılmamalıdır.',
};
