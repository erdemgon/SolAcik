export type CftrVariantUpdateSource = {
  id: 'trikafta_vertex_pi' | 'alyftrek_vertex_pi';
  drugName: 'TRIKAFTA' | 'ALYFTREK';
  sourceOwner: 'Vertex';
  url: string;
  sourceType: 'official_prescribing_information_pdf';
  expectedTableLabel: string;
  updateCadence: 'daily_server_side_check';
  parserStatus: 'requires_server_pdf_text_extraction';
  lastManualCheckDate: string;
  notes: string;
};

export const cftrVariantUpdatePolicy = {
  statusLabel: 'Otomatik Vertex varyant güncellemesi: backend bağlanınca günlük kontrol',
  currentAppBehavior:
    'Uygulama şu an yerel kürate edilmiş seed listeyi kullanır. Vertex/FDA PI listesi günlük sunucu tarafı iş ile kontrol edilmeden otomatik klinik uygunluk sonucu güncellenmiş kabul edilmez.',
  safety:
    'Responsive varyant listesi değişirse sonuçlar resmi ürün bilgisi, ülke etiketi ve uzman değerlendirmesiyle doğrulanmalıdır. İstemci uygulama Vertex sitesini doğrudan kazımaz.',
};

export const cftrVariantUpdateSources: CftrVariantUpdateSource[] = [
  {
    id: 'trikafta_vertex_pi',
    drugName: 'TRIKAFTA',
    sourceOwner: 'Vertex',
    url: 'https://pi.vrtx.com/files/uspi_elexacaftor_tezacaftor_ivacaftor.pdf',
    sourceType: 'official_prescribing_information_pdf',
    expectedTableLabel: 'List of CFTR Gene Mutations that are Responsive to TRIKAFTA',
    updateCadence: 'daily_server_side_check',
    parserStatus: 'requires_server_pdf_text_extraction',
    lastManualCheckDate: '2026-05-14',
    notes:
      'Vertex resmi PI PDF kaynağıdır. Günlük iş PDF ETag/Last-Modified/hash değişimini kontrol etmeli, PDF metnini sunucuda çıkarmalı ve tabloyu klinik editör onayına göndermelidir.',
  },
  {
    id: 'alyftrek_vertex_pi',
    drugName: 'ALYFTREK',
    sourceOwner: 'Vertex',
    url: 'https://pi.vrtx.com/files/uspi_vanzacaftor_tezacaftor_deutivacaftor.pdf',
    sourceType: 'official_prescribing_information_pdf',
    expectedTableLabel: 'List of CFTR Gene Variants Responsive to ALYFTREK',
    updateCadence: 'daily_server_side_check',
    parserStatus: 'requires_server_pdf_text_extraction',
    lastManualCheckDate: '2026-05-14',
    notes:
      'Vertex resmi PI PDF kaynağıdır. ALYFTREK listesi FDA label güncellemeleriyle değişebilir; otomatik uygulama güncellemesi öncesi kaynak tarihi ve editör onayı saklanmalıdır.',
  },
];
