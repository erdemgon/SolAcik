export type BronchiolitisSeverity = 'mild' | 'moderate' | 'severe';

export const bronchiolitisSource = {
  badge:
    'Kaynak sürümü: Türk Toraks Derneği Akut Bronşiyolit Tanı ve Tedavi Rehberi 2024 — yerel protokol ile doğrulanmalıdır.',
  title: 'Akut Bronşiyolit Hızlı Yaklaşım',
  summary:
    'İki yaş altı çocukta viral alt solunum yolu enfeksiyonu; tanı çoğunlukla öykü ve fizik muayene ile konur, tedavinin temeli destek bakımıdır.',
};

export const bronchiolitisRiskFactors = [
  '3 aydan küçük bebek',
  'Prematürite öyküsü',
  'Bronkopulmoner displazi / kronik akciğer hastalığı',
  'Hemodinamik anlamlı konjenital kalp hastalığı',
  'İmmün yetmezlik',
  'Nöromusküler hastalık veya zayıf öksürük refleksi',
  'Beslenme güçlüğü, dehidratasyon riski veya apne öyküsü',
  'Sosyal destek/ulaşım/evde izlem güçlüğü',
];

export const bronchiolitisRedFlags = [
  'Apne veya siyanoz',
  'Letarji, toksik görünüm veya bilinç değişikliği',
  'Ağır solunum sıkıntısı, belirgin çekilme, inleme',
  'Beslenememe veya dehidratasyon',
  'Persistan hipoksemi',
  'Hızla kötüleşme veya ayırıcı tanı şüphesi',
];

export const bronchiolitisSupportiveCare = [
  'Hafif olguda aile eğitimi, burun temizliği, beslenme desteği ve yakın izlem',
  'Hipoksemi varsa oksijen desteği',
  'Oral alım yetersizse enteral veya IV sıvı desteği',
  'Beslenme öncesi nazal serum fizyolojik ve nazal aspirasyon düşünülebilir',
  'Solunum işi, hidrasyon, beslenme, apne ve oksijen gereksinimi izlenir',
  'El hijyeni, sigara dumanından korunma ve ev içi bulaşı azaltma önerilir',
];

export const bronchiolitisAvoidRoutine = [
  'Rutin antibiyotik',
  'Rutin oral veya nebülize salbutamol',
  'Rutin sistemik veya inhaler kortikosteroid',
  'Rutin adrenalin nebül',
  'Rutin antihistaminik, oral dekonjestan veya buhar tedavisi',
  'Rutin akciğer grafisi',
  'Rutin kan tetkiki veya viral test',
  'Rutin göğüs fizyoterapisi',
];

export const bronchiolitisDischargeCriteria = [
  'Solunum sıkıntısı belirgin azalmış',
  'Oksijen ihtiyacı yok veya yerel protokole göre güvenli düzeyde',
  'Oral beslenme/hidrasyon yeterli',
  'Apne, siyanoz veya hızlı kötüleşme bulgusu yok',
  'Aile uyarı bulgularını ve ne zaman başvuracağını anladı',
  'Kontrol planı ve evde bakım önerileri verildi',
];

export function classifyBronchiolitis({
  riskCount,
  redFlagCount,
  feedingPoor,
  oxygenLow,
  respiratoryDistress,
}: {
  riskCount: number;
  redFlagCount: number;
  feedingPoor: boolean;
  oxygenLow: boolean;
  respiratoryDistress: 'none' | 'mild' | 'moderate' | 'severe';
}): {
  severity: BronchiolitisSeverity;
  title: string;
  action: string;
} {
  if (redFlagCount > 0 || respiratoryDistress === 'severe' || oxygenLow) {
    return {
      severity: 'severe',
      title: 'Ağır bronşiolit / acil değerlendirme',
      action:
        'Acil değerlendirme, oksijen/solunum desteği, hidrasyon ve yatış/yoğun bakım gereksinimi kurum protokolüne göre değerlendirilmelidir.',
    };
  }

  if (respiratoryDistress === 'moderate' || feedingPoor || riskCount > 0) {
    return {
      severity: 'moderate',
      title: 'Orta risk / gözlem veya yatış düşün',
      action:
        'Beslenme, hidrasyon, oksijen satürasyonu ve solunum işi yakından izlenir; risk faktörleri varsa yatış eşiği düşük tutulur.',
    };
  }

  return {
    severity: 'mild',
    title: 'Hafif bronşiolit / evde destek',
    action:
      'Aile eğitimi, burun temizliği, beslenme desteği, sigara dumanından korunma ve uyarı bulgularıyla evde izlem düşünülebilir.',
  };
}

