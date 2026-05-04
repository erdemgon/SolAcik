export type AsthmaBiologicId =
  | 'omalizumab'
  | 'mepolizumab'
  | 'benralizumab'
  | 'dupilumab'
  | 'tezepelumab';

export type AsthmaBiologic = {
  id: AsthmaBiologicId;
  genericName: string;
  brandNames: string[];
  target: string;
  phenotype: string[];
  minimumAgeYears: number;
  pediatricDoseSummary: string;
  doseRules: {
    ageMinYears: number;
    ageMaxYears?: number;
    weightMinKg?: number;
    weightMaxKg?: number;
    doseText: string;
  }[];
  eligibilityClues: string[];
  monitoring: string[];
  cautions: string[];
  sourceNote: string;
};

export const asthmaBiologicSourceBadge =
  'Kaynak sürümü: FDA/ürün bilgisi 2025–2026 özeti — Türkiye KÜB/KT, SGK/SUT ve ağır astım merkezi kararı ile doğrulanmalıdır.';

export const asthmaBiologicCoreWarning =
  'Bu ekran reçete veya geri ödeme kararı vermez. Biyolojik tedavi seçimi; ağır astım tanısının doğrulanması, fenotip, biyobelirteçler, komorbiditeler, alevlenme öyküsü, Türkiye KÜB/KT, SGK/SUT ve ağır astım merkezi/uzman değerlendirmesi ile yapılmalıdır.';

export const biologicReadinessChecklist = [
  'Astım tanısı objektif olarak doğrulandı mı?',
  'Zor tedavi edilen astım nedenleri dışlandı mı? Teknik, uyum, maruziyet ve komorbiditeler değerlendirildi mi?',
  'Yüksek doz İKS-LABA veya uygun basamak tedavisine rağmen kontrolsüzlük/sık alevlenme var mı?',
  'Son 12 ay alevlenme, acil başvuru, yatış veya OCS gereksinimi belgelendi mi?',
  'Kan eozinofil, total IgE, spesifik IgE/prick, FeNO ve alerjik komorbiditeler gözden geçirildi mi?',
  'Parazit riski, canlı aşılar, gebelik/adolesan gebelik, anafilaksi öyküsü ve eşlik eden hastalıklar sorgulandı mı?',
];

export const asthmaBiologics: AsthmaBiologic[] = [
  {
    id: 'omalizumab',
    genericName: 'Omalizumab',
    brandNames: ['Xolair'],
    target: 'Anti-IgE',
    phenotype: ['Alerjik astım', 'Perennial aeroalerjen duyarlılığı', 'IgE/kilo tablosuna uygunluk'],
    minimumAgeYears: 6,
    pediatricDoseSummary:
      'Astımda 6 yaş ve üzeri: başlangıç total IgE ve vücut ağırlığına göre 75–375 mg SC 2 veya 4 haftada bir; resmi doz tablosu zorunludur.',
    doseRules: [
      {
        ageMinYears: 6,
        doseText:
          'Doz otomatik hesaplanmaz: başlangıç total IgE (IU/mL) ve kilo (kg) ile resmi omalizumab astım doz tablosundan seçilir.',
      },
    ],
    eligibilityClues: [
      'Orta-ağır/ağır persistan alerjik astım',
      'Perennial aeroalerjene pozitif deri testi veya in vitro duyarlılık',
      'Yüksek basamak tedaviye rağmen kontrolsüzlük veya alevlenme',
      'Total IgE ve kilo resmi doz tablosu aralığında',
    ],
    monitoring: [
      'Anafilaksi ve enjeksiyon reaksiyonu izlemi',
      'Alevlenme sıklığı, OCS gereksinimi, ACT/ACQ ve solunum fonksiyonu',
      'Tedavi yanıtı periyodik olarak yeniden değerlendirilir',
    ],
    cautions: [
      'Akut bronkospazm veya status asthmaticus tedavisi değildir.',
      'Başlangıç IgE değeri kullanılır; tedavi sırasında total IgE doz ayarı için uygun değildir.',
      'Türkiye erişim/geri ödeme koşulları ayrıca doğrulanmalıdır.',
    ],
    sourceNote: 'FDA/ürün bilgisi: doz başlangıç total IgE ve kilo tablosuna göre seçilir.',
  },
  {
    id: 'mepolizumab',
    genericName: 'Mepolizumab',
    brandNames: ['Nucala'],
    target: 'Anti-IL-5',
    phenotype: ['Eozinofilik ağır astım'],
    minimumAgeYears: 6,
    pediatricDoseSummary:
      '6–11 yaş: 40 mg SC 4 haftada bir. 12 yaş ve üzeri: 100 mg SC 4 haftada bir.',
    doseRules: [
      { ageMinYears: 6, ageMaxYears: 11, doseText: '40 mg SC 4 haftada bir' },
      { ageMinYears: 12, doseText: '100 mg SC 4 haftada bir' },
    ],
    eligibilityClues: [
      'Eozinofilik fenotip',
      'Sık alevlenme veya OCS gereksinimi',
      'Yüksek doz kontrol edici tedaviye rağmen kontrolsüzlük',
    ],
    monitoring: [
      'Kan eozinofil trendi, alevlenme sıklığı ve OCS azaltma planı',
      'Herpes zoster/aşı durumu ve hipersensitivite reaksiyonları',
    ],
    cautions: [
      'Akut atak tedavisi değildir.',
      'Sistemik steroidler ani kesilmemelidir.',
      'Paraziter enfeksiyon riski değerlendirilmelidir.',
    ],
    sourceNote: 'Ürün bilgisi/HCP doz kaynakları: 6–11 yaş 40 mg, ≥12 yaş 100 mg SC q4w.',
  },
  {
    id: 'benralizumab',
    genericName: 'Benralizumab',
    brandNames: ['Fasenra'],
    target: 'Anti-IL-5Rα',
    phenotype: ['Eozinofilik ağır astım'],
    minimumAgeYears: 6,
    pediatricDoseSummary:
      '6–11 yaş <35 kg: 10 mg SC 4 haftada bir ilk 3 doz, sonra 8 haftada bir. 6–11 yaş ≥35 kg ve ≥12 yaş: 30 mg aynı şema.',
    doseRules: [
      {
        ageMinYears: 6,
        ageMaxYears: 11,
        weightMaxKg: 34.999,
        doseText: '10 mg SC 4 haftada bir ilk 3 doz, sonra 8 haftada bir',
      },
      {
        ageMinYears: 6,
        ageMaxYears: 11,
        weightMinKg: 35,
        doseText: '30 mg SC 4 haftada bir ilk 3 doz, sonra 8 haftada bir',
      },
      {
        ageMinYears: 12,
        doseText: '30 mg SC 4 haftada bir ilk 3 doz, sonra 8 haftada bir',
      },
    ],
    eligibilityClues: [
      'Eozinofilik ağır astım',
      'Sık alevlenme ve yüksek eozinofil yükü',
      'İdame OCS azaltma hedefi olan seçilmiş hastalar',
    ],
    monitoring: [
      'Alevlenme, OCS ihtiyacı, solunum fonksiyonu ve semptom kontrolü',
      'Hipersensitivite ve enjeksiyon reaksiyonları',
    ],
    cautions: [
      'Akut bronkospazm/status asthmaticus için kullanılmaz.',
      'Helmint enfeksiyonu varsa tedavi öncesi değerlendirilir.',
      'Steroid azaltımı kademeli yapılmalıdır.',
    ],
    sourceNote: 'Ürün bilgisi: 6–11 yaş kilo bandına göre 10/30 mg; ≥12 yaş 30 mg şema.',
  },
  {
    id: 'dupilumab',
    genericName: 'Dupilumab',
    brandNames: ['Dupixent'],
    target: 'Anti-IL-4Rα; IL-4/IL-13 yolak inhibisyonu',
    phenotype: ['Tip 2 inflamasyon', 'Eozinofilik astım', 'OCS bağımlı astım', 'Atopik dermatit/CRSwNP komorbiditesi'],
    minimumAgeYears: 6,
    pediatricDoseSummary:
      '6–11 yaş: 15–<30 kg 300 mg SC 4 haftada bir; ≥30 kg 200 mg SC 2 haftada bir. 12 yaş ve üzeri: 400→200 mg q2w veya 600→300 mg q2w; OCS bağımlı/komorbid AD-CRSwNP için 600→300 mg q2w.',
    doseRules: [
      {
        ageMinYears: 6,
        ageMaxYears: 11,
        weightMinKg: 15,
        weightMaxKg: 29.999,
        doseText: 'Yükleme dozu yok; 300 mg SC 4 haftada bir',
      },
      {
        ageMinYears: 6,
        ageMaxYears: 11,
        weightMinKg: 30,
        doseText: 'Yükleme dozu yok; 200 mg SC 2 haftada bir',
      },
      {
        ageMinYears: 12,
        doseText:
          '400 mg yükleme, sonra 200 mg SC 2 haftada bir veya 600 mg yükleme, sonra 300 mg SC 2 haftada bir',
      },
      {
        ageMinYears: 12,
        doseText:
          'OCS bağımlı astım veya komorbid orta-ağır atopik dermatit/CRSwNP varsa genellikle 600 mg yükleme, sonra 300 mg SC 2 haftada bir',
      },
    ],
    eligibilityClues: [
      'Tip 2 inflamasyon bulguları: eozinofili ve/veya yüksek FeNO',
      'OCS bağımlı astım',
      'Atopik dermatit veya nazal polip komorbiditesi',
    ],
    monitoring: [
      'Eozinofili/eozinofilik durumlar, konjonktivit ve hipersensitivite',
      'OCS azaltımı planlı ve kademeli yapılır',
    ],
    cautions: [
      'Akut bronkospazm tedavisi değildir.',
      'Helmint enfeksiyonları tedavi öncesi değerlendirilmelidir.',
      'Canlı aşılar ve eşlik eden atopik hastalık endikasyonları ürün bilgisiyle doğrulanmalıdır.',
    ],
    sourceNote: 'Ürün bilgisi/HCP doz kaynakları: 6–11 yaş kilo bandı; ≥12 yaş yükleme ve q2w idame.',
  },
  {
    id: 'tezepelumab',
    genericName: 'Tezepelumab',
    brandNames: ['Tezspire'],
    target: 'Anti-TSLP',
    phenotype: ['Ağır astım', 'Fenotip/biyobelirteç kısıtı olmayan etiket bağlamı'],
    minimumAgeYears: 12,
    pediatricDoseSummary: '12 yaş ve üzeri: 210 mg SC 4 haftada bir.',
    doseRules: [
      { ageMinYears: 12, doseText: '210 mg SC 4 haftada bir' },
    ],
    eligibilityClues: [
      'Ağır astım; fenotip net değil veya Tip 2 biyobelirteçler düşük olabilir',
      'Sık alevlenme ve yüksek basamak tedaviye rağmen kontrolsüzlük',
      'Diğer biyolojik seçeneklerle uygunluk/yanıt değerlendirmesi sonrası seçilmiş hasta',
    ],
    monitoring: [
      'Alevlenme sıklığı, semptom kontrolü, solunum fonksiyonu',
      'Hipersensitivite, artralji/sırt ağrısı gibi yan etkiler',
    ],
    cautions: [
      'Akut bronkospazm veya status asthmaticus tedavisi değildir.',
      'Steroidler ani kesilmemelidir.',
      'Helmint enfeksiyonu ve canlı aşılar açısından ürün bilgisi kontrol edilmelidir.',
    ],
    sourceNote: 'Ürün bilgisi: ≥12 yaş ağır astımda 210 mg SC q4w.',
  },
];

export const biologicDecisionSteps = [
  {
    title: '1. Ağır astımı doğrula',
    text: 'Yüksek basamak tedaviye rağmen kontrolsüzlük varsa önce tanı, spirometri, teknik, uyum, tetikleyiciler ve komorbiditeleri kontrol et.',
  },
  {
    title: '2. Fenotipi belirle',
    text: 'Alerjik duyarlanma + IgE/kilo tablosu omalizumabı; eozinofilik fenotip IL-5/IL-5R ajanlarını; Tip 2/OCS bağımlı/atopik komorbidite dupilumabı; fenotip belirsiz ağır astımda tezepelumabı düşündürebilir.',
  },
  {
    title: '3. Yaş ve kilo uygunluğunu kontrol et',
    text: 'Her biyolojik için yaş alt sınırı ve bazı ajanlarda kilo bandı farklıdır. Türkiye KÜB/KT ve geri ödeme koşulları ayrıca kontrol edilir.',
  },
  {
    title: '4. Tedavi öncesi güvenlik taraması',
    text: 'Anafilaksi öyküsü, paraziter enfeksiyon, canlı aşılar, gebelik/adolesan gebelik, eşlik eden hastalıklar ve steroid azaltma planı değerlendirilir.',
  },
  {
    title: '5. Yanıtı düzenli değerlendir',
    text: 'Alevlenme, OCS ihtiyacı, semptom kontrolü, yaşam kalitesi ve solunum fonksiyonu ile 4–6 ay içinde yanıt gözden geçirilir.',
  },
];

