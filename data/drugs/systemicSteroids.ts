export type SystemicSteroidKey =
  | 'hydrocortisone'
  | 'cortisone'
  | 'prednisone'
  | 'prednisolone'
  | 'methylprednisolone'
  | 'triamcinolone'
  | 'dexamethasone'
  | 'betamethasone';

export type RespiratorySteroidDoseCard = {
  id: string;
  title: string;
  drugKeys: SystemicSteroidKey[];
  doseText: string;
  maxText: string;
  durationText: string;
  calculation?: {
    steroidKey: SystemicSteroidKey;
    minMgKg: number;
    maxMgKg: number;
    maxDailyMg: number;
    unit: 'mg/gün' | 'mg/doz';
  };
  notes: string[];
};

export const systemicSteroidSource = {
  badge:
    'Kaynak: Endotext/NCBI glukokortikoid eşdeğerleri + pediatrik solunum kısa kür dozları — KÜB/KT ve kurum protokolü ile doğrulanmalıdır.',
  warning:
    'Bu modül reçete yazmaz. Sistemik steroid seçimi ve dozu; endikasyon, hastalık ağırlığı, yaş, kilo, formülasyon, eşlik eden enfeksiyon, diyabet, hipertansiyon, immünsüpresyon, adrenal baskılanma riski ve kurum protokolü ile doğrulanmalıdır.',
  sourceLinks: [
    {
      title: 'Endotext / NCBI Bookshelf: Glucocorticoid Equivalencies',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK279156/table/adrenal_glucocorticoid-therapy-and-adrenal-suppression.T./',
    },
    {
      title: 'NCBI Bookshelf StatPearls: Corticosteroid Adverse Effects',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK531462/',
    },
    {
      title: 'MSF Medical Guidelines: Acute asthma corticosteroid dosing',
      url: 'https://medicalguidelines.msf.org/en/viewport/CG/english/asthma-attack-acute-asthma-16689575.html',
    },
  ],
};

export const systemicSteroids: {
  key: SystemicSteroidKey;
  name: string;
  turkishName: string;
  equivalentDoseMg: number;
  duration: 'Kısa' | 'Orta' | 'Uzun';
  biologicHalfLife: string;
  mineralocorticoid: 'Belirgin' | 'Az' | 'Yok/çok az';
  commonForms: string[];
  turkeyProducts: string[];
  note: string;
}[] = [
  {
    key: 'hydrocortisone',
    name: 'Hydrocortisone',
    turkishName: 'Hidrokortizon',
    equivalentDoseMg: 20,
    duration: 'Kısa',
    biologicHalfLife: '8–12 saat',
    mineralocorticoid: 'Belirgin',
    commonForms: ['PO', 'IV'],
    turkeyProducts: [
      'HİDROZON 100 mg İ.M./İ.V enjeksiyon/İ.V infüzyon için liyofilize flakon + çözücü ampul',
      'HYDROCORT-LİYO 100 mg İ.M./İ.V enjeksiyon/İ.V infüzyon için liyofilize ampul',
      'STERON 100 mg İ.M./İ.V enjeksiyon/İ.V infüzyon için liyofilize flakon + çözücü ampul',
    ],
    note: 'Mineralokortikoid etkisi belirgindir; eşdeğer hesapta antiinflamatuvar etki temel alınır.',
  },
  {
    key: 'cortisone',
    name: 'Cortisone',
    turkishName: 'Kortizon',
    equivalentDoseMg: 25,
    duration: 'Kısa',
    biologicHalfLife: '8–12 saat',
    mineralocorticoid: 'Belirgin',
    commonForms: ['PO'],
    turkeyProducts: [
      'Sistemik kortizon asetat müstahzarı yerel piyasa/KÜB üzerinden doğrulanmalı',
    ],
    note: 'Klinik solunum pratiğinde akut kısa kür için daha az kullanılır.',
  },
  {
    key: 'prednisone',
    name: 'Prednisone',
    turkishName: 'Prednizon',
    equivalentDoseMg: 5,
    duration: 'Orta',
    biologicHalfLife: '18–36 saat',
    mineralocorticoid: 'Az',
    commonForms: ['PO'],
    turkeyProducts: [
      'Prednizon için yerel piyasada güncel müstahzar varlığı doğrulanmalı; pratikte prednizolon/metilprednizolon ürünleri daha sık kullanılır',
    ],
    note: 'Karaciğerde prednizolona dönüşür; ağır karaciğer hastalığında klinik bağlam önemlidir.',
  },
  {
    key: 'prednisolone',
    name: 'Prednisolone',
    turkishName: 'Prednizolon',
    equivalentDoseMg: 5,
    duration: 'Orta',
    biologicHalfLife: '18–36 saat',
    mineralocorticoid: 'Az',
    commonForms: ['PO'],
    turkeyProducts: [
      'DELTACORTRİL 5 mg tablet',
      'DELTACORTRIL 5 mg tablet',
    ],
    note: 'Pediatrik astım atağı kısa kürlerinde sık kullanılan sistemik steroiddir.',
  },
  {
    key: 'methylprednisolone',
    name: 'Methylprednisolone',
    turkishName: 'Metilprednizolon',
    equivalentDoseMg: 4,
    duration: 'Orta',
    biologicHalfLife: '18–36 saat',
    mineralocorticoid: 'Yok/çok az',
    commonForms: ['PO', 'IV'],
    turkeyProducts: [
      'PREDNOL 4 mg tablet',
      'PREDNOL 16 mg tablet',
      'PRECORT 16 mg tablet',
      'PREDNOL-L 20 mg liyofilize enjeksiyonluk ampul',
      'PREDNOL-L 40 mg liyofilize enjeksiyonluk ampul',
      'PREDNOL-L 250 mg liyofilize enjektabl ampul',
    ],
    note: 'IV kullanımda ağır atak/yoğun bakım protokolü ile doz doğrulanmalıdır.',
  },
  {
    key: 'triamcinolone',
    name: 'Triamcinolone',
    turkishName: 'Triamsinolon',
    equivalentDoseMg: 4,
    duration: 'Orta',
    biologicHalfLife: '18–36 saat',
    mineralocorticoid: 'Yok/çok az',
    commonForms: ['IM', 'lokal formlar'],
    turkeyProducts: [
      'Sistemik triamsinolon müstahzar/formu lokal piyasa ve KÜB üzerinden doğrulanmalı',
    ],
    note: 'Rutin pediatrik akut solunum atağı kısa kür seçeneği olarak gösterilmez.',
  },
  {
    key: 'dexamethasone',
    name: 'Dexamethasone',
    turkishName: 'Deksametazon',
    equivalentDoseMg: 0.75,
    duration: 'Uzun',
    biologicHalfLife: '36–54 saat',
    mineralocorticoid: 'Yok/çok az',
    commonForms: ['PO', 'IV', 'IM'],
    turkeyProducts: [
      'DEKORT 0.75 mg tablet',
      'DEKORT 8 mg/2 mL İ.M./İ.V enjeksiyonluk çözelti ampul',
      'DEKSAMET 8 mg/2 mL ampul',
      'DEKSAMET şurup 0.25 mg/5 mL',
    ],
    note: 'Uzun etkili olduğu için kısa doz şemalarında kullanılır; doz tekrarında adrenal/yan etki riski düşünülür.',
  },
  {
    key: 'betamethasone',
    name: 'Betamethasone',
    turkishName: 'Betametazon',
    equivalentDoseMg: 0.6,
    duration: 'Uzun',
    biologicHalfLife: '36–54 saat',
    mineralocorticoid: 'Yok/çok az',
    commonForms: ['PO', 'IM', 'lokal formlar'],
    turkeyProducts: [
      'CELESTONE Chronodose enjektabl ampul: 3 mg betametazon asetat + 3 mg betametazon eşdeğeri betametazon disodyum fosfat',
    ],
    note: 'Eşdeğer tabloda yer alır; pediatrik solunum kısa kürlerinde lokal ürün/formülasyon KÜB ile doğrulanmalıdır.',
  },
];

export const respiratorySteroidDoseCards: RespiratorySteroidDoseCard[] = [
  {
    id: 'asthma_prednisolone',
    title: 'Astım atağı — oral prednizolon/prednizon',
    drugKeys: ['prednisolone', 'prednisone'],
    doseText: '1–2 mg/kg/gün PO',
    maxText: 'Maksimum genellikle 40–60 mg/gün aralığında kurum protokolüyle belirlenir.',
    durationText: 'Sıklıkla 3–5 gün kısa kür',
    calculation: {
      steroidKey: 'prednisolone',
      minMgKg: 1,
      maxMgKg: 2,
      maxDailyMg: 50,
      unit: 'mg/gün',
    },
    notes: [
      'Ağır atak, kusma veya oral alamama durumunda IV seçenek kurum protokolüyle değerlendirilir.',
      'Kısa kürlerde taper çoğu zaman gerekmez; sık tekrarlayan kürlerde adrenal baskılanma riski değerlendirilir.',
    ],
  },
  {
    id: 'asthma_dexamethasone',
    title: 'Astım atağı — deksametazon alternatifi',
    drugKeys: ['dexamethasone'],
    doseText: '0.3–0.6 mg/kg/doz PO/IV/IM',
    maxText: 'Maksimum 16 mg/doz sık kullanılan üst sınırdır; yerel protokolle doğrula.',
    durationText: '1–2 doz veya 1–2 gün kısa şema',
    calculation: {
      steroidKey: 'dexamethasone',
      minMgKg: 0.3,
      maxMgKg: 0.6,
      maxDailyMg: 16,
      unit: 'mg/doz',
    },
    notes: [
      'Uzun etkili steroiddir; prednizolonla aynı anda rutin kombine edilmemelidir.',
      'Kullanılacak form ve doz tekrar sayısı kurum protokolüyle doğrulanmalıdır.',
    ],
  },
  {
    id: 'severe_asthma_methylpred',
    title: 'Ağır astım atağı — IV metilprednizolon hatırlatıcı',
    drugKeys: ['methylprednisolone'],
    doseText: 'Sıklıkla toplam 1–2 mg/kg/gün IV aralığı protokollerde kullanılır.',
    maxText: 'Üst sınır ve bölünmüş doz sıklığı kurum/yoğun bakım protokolüne göre doğrulanır.',
    durationText: 'Klinik yanıt ve oral geçiş planına göre',
    calculation: {
      steroidKey: 'methylprednisolone',
      minMgKg: 1,
      maxMgKg: 2,
      maxDailyMg: 60,
      unit: 'mg/gün',
    },
    notes: [
      'Bu kart otomatik IV tedavi önerisi değildir.',
      'Magnezyum, oksijen, bronkodilatör sıklığı ve yoğun bakım kararı ayrı akut atak protokolüyle yürütülür.',
    ],
  },
  {
    id: 'croup_dexamethasone',
    title: 'Krup — deksametazon',
    drugKeys: ['dexamethasone'],
    doseText: '0.15–0.6 mg/kg tek doz PO/IM/IV',
    maxText: 'Maksimum 10–16 mg aralığı protokole göre değişebilir.',
    durationText: 'Genellikle tek doz',
    calculation: {
      steroidKey: 'dexamethasone',
      minMgKg: 0.15,
      maxMgKg: 0.6,
      maxDailyMg: 10,
      unit: 'mg/doz',
    },
    notes: [
      'Stridor, solunum sıkıntısı ve nebül adrenalin gereksinimi ayrı acil değerlendirme gerektirir.',
      'Doz aralığı ve maksimum doz yerel çocuk acil protokolüyle doğrulanmalıdır.',
    ],
  },
];

export const systemicSteroidSafetyNotes = [
  'Eşdeğer dozlar antiinflamatuvar glukokortikoid etkiye göredir; mineralokortikoid etki ve biyolojik yarı ömür aynı değildir.',
  'Deksametazon/betametazon uzun etkilidir; prednizolon veya metilprednizolonla birebir gün sayısı değişimi yapılmamalıdır.',
  'Sık kısa kür, uzun süreli kullanım veya yüksek dozda adrenal baskılanma, hiperglisemi, hipertansiyon, enfeksiyon, gastrit, duygudurum/uyku değişikliği ve büyüme etkileri izlenmelidir.',
  'Canlı aşı, tüberküloz/varisella teması, immünsüpresyon, diyabet, hipertansiyon, karaciğer/böbrek hastalığı ve ilaç etkileşimlerinde uzman değerlendirmesi gerekir.',
  'Dozun pratik yuvarlanması mevcut preparat, tablet/şurup konsantrasyonu ve klinisyen kararına göre yapılmalıdır.',
  'Türkiye’de müstahzar adları, formlar, ruhsat durumu ve bulunabilirlik değişebilir; her ürün güncel KÜB/KT ve eczane/kurum listesiyle doğrulanmalıdır.',
];

export function calculateSteroidEquivalentDose({
  sourceDoseMg,
  sourceKey,
  targetKey,
}: {
  sourceDoseMg: number;
  sourceKey: SystemicSteroidKey;
  targetKey: SystemicSteroidKey;
}) {
  const source = systemicSteroids.find((steroid) => steroid.key === sourceKey);
  const target = systemicSteroids.find((steroid) => steroid.key === targetKey);

  if (!source || !target || sourceDoseMg <= 0) return null;

  const equivalentUnits = sourceDoseMg / source.equivalentDoseMg;
  const targetDoseMg = equivalentUnits * target.equivalentDoseMg;

  return {
    source,
    target,
    targetDoseMg,
  };
}

export function calculateWeightBasedSteroidDose({
  card,
  weightKg,
}: {
  card: RespiratorySteroidDoseCard;
  weightKg: number;
}) {
  if (!card.calculation || weightKg <= 0) return null;

  const min = weightKg * card.calculation.minMgKg;
  const max = weightKg * card.calculation.maxMgKg;

  return {
    minMg: Math.round(Math.min(min, card.calculation.maxDailyMg)),
    maxMg: Math.round(Math.min(max, card.calculation.maxDailyMg)),
    maxDailyMg: card.calculation.maxDailyMg,
    unit: card.calculation.unit,
    isCapped: max > card.calculation.maxDailyMg,
  };
}
