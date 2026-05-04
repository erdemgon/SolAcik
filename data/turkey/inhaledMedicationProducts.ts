export type InhaledMedicationProduct = {
  id: string;
  displayName: string;
  molecule: string;
  classLabel: string;
  device: string;
  strengths: string[];
  commonUse: string;
  ageNote: string;
  kubKtNote: string;
  counseling: string[];
};

export const inhaledMedicationProducts: InhaledMedicationProduct[] = [
  {
    id: 'budesonide_nebule',
    displayName: 'Budesonid nebül',
    molecule: 'Budesonid',
    classLabel: 'ICS',
    device: 'Nebül',
    strengths: ['0.25 mg/mL', '0.5 mg/mL veya ürün formuna göre değişebilir'],
    commonUse: 'Çocuklarda inhale steroid tedavisi; yaş ve endikasyon KÜB/KT ile doğrulanır.',
    ageNote: 'Yaş sınırı ve endikasyon ürün bazında kontrol edilmelidir.',
    kubKtNote: 'Türkiye KÜB/KT güncel ürün bilgisi ile doğrulanmalıdır.',
    counseling: [
      'Nebül maske uyumu ve cihaz temizliği kontrol edilir.',
      'Steroid sonrası ağız/maske çevresi temizliği anlatılır.',
    ],
  },
  {
    id: 'budesonide_formoterol_dpi',
    displayName: 'Budesonid-formoterol DPI',
    molecule: 'Budesonid + formoterol',
    classLabel: 'ICS-LABA / MART uygunluğu ürün ve rehbere bağlı',
    device: 'DPI',
    strengths: ['80/4.5 mcg delivered', '160/4.5 mcg delivered veya ürün formuna göre'],
    commonUse: 'İdame tedavi veya uygun hastada MART/AIR yaklaşımı için değerlendirilir.',
    ageNote: 'Çocuk/adolesan yaş sınırları ve MART endikasyonu KÜB/KT ile doğrulanmalıdır.',
    kubKtNote: 'MART kullanımı için ürünün KÜB/KT onayı ve GINA rehberi birlikte kontrol edilmelidir.',
    counseling: [
      'DPI için yeterli inspiratuvar akım ve doğru cihaz tekniği gösterilir.',
      'Rahatlatıcı olarak kullanım varsa maksimum günlük inhalasyon sınırı ayrıca anlatılır.',
    ],
  },
  {
    id: 'beclometasone_pmdi',
    displayName: 'Beklometazon pMDI',
    molecule: 'Beklometazon dipropiyonat',
    classLabel: 'ICS',
    device: 'pMDI',
    strengths: ['50 mcg', '100 mcg', '250 mcg veya ürün formuna göre'],
    commonUse: 'İnhale steroid idame tedavisi.',
    ageNote: 'Pediatrik yaş onayı ve doz aralığı ürün bazında kontrol edilmelidir.',
    kubKtNote: 'Extrafine/standard partikül ayrımı KÜB/KT ve GINA doz tablosuyla eşleştirilmelidir.',
    counseling: [
      'Çocuklarda hazne ile kullanım tekniği değerlendirilir.',
      'Steroid sonrası ağız çalkalama önerilir.',
    ],
  },
  {
    id: 'fluticasone_propionate_pmdi_dpi',
    displayName: 'Flutikazon propiyonat pMDI/DPI',
    molecule: 'Flutikazon propiyonat',
    classLabel: 'ICS',
    device: 'pMDI veya DPI',
    strengths: ['50 mcg', '125 mcg', '250 mcg veya ürün formuna göre'],
    commonUse: 'İnhale steroid idame tedavisi.',
    ageNote: 'Yaş sınırı, cihaz tipi ve doz KÜB/KT ile doğrulanmalıdır.',
    kubKtNote: 'pMDI ve DPI formları GINA doz kategorisinde ayrı satırlara karşılık gelebilir.',
    counseling: [
      'Cihaz tekniği her vizitte tekrar gösterilir.',
      'DPI kullanımında inspiratuvar akım yeterliliği kontrol edilir.',
    ],
  },
  {
    id: 'salbutamol_pmdi_nebule',
    displayName: 'Salbutamol pMDI/nebül',
    molecule: 'Salbutamol',
    classLabel: 'SABA',
    device: 'pMDI veya nebül',
    strengths: ['100 mcg/puf', 'nebül formu ürün bazında değişebilir'],
    commonUse: 'Semptom rahatlatıcı bronkodilatör; kontrol edici tedavinin yerine geçmez.',
    ageNote: 'Yaş ve doz KÜB/KT ile doğrulanmalıdır.',
    kubKtNote: 'Sık SABA gereksinimi kontrolsüz astım ve atak riski açısından değerlendirilmelidir.',
    counseling: [
      'pMDI için hazne kullanımı özellikle küçük çocuklarda tercih edilir.',
      'Artan kullanım ihtiyacı eylem planı ve kontrol tedavisi açısından sorgulanır.',
    ],
  },
  {
    id: 'ipratropium_nebule_pmdi',
    displayName: 'İpratropium pMDI/nebül',
    molecule: 'İpratropium bromür',
    classLabel: 'SAMA',
    device: 'pMDI veya nebül',
    strengths: ['Ürün formuna göre değişir'],
    commonUse: 'Akut atak bağlamında SABA ile birlikte değerlendirilebilir.',
    ageNote: 'Pediatrik kullanım ve doz KÜB/KT ile doğrulanmalıdır.',
    kubKtNote: 'Rutin idame astım tedavisi yerine akut klinik bağlamda düşünülür.',
    counseling: [
      'Nebül uygulamasında göz temasından kaçınılır.',
      'Atak yönetimi yerel protokole göre yapılır.',
    ],
  },
];
