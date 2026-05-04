export const parapneumonicEffusionSource = {
  badge:
    'Kaynak: Çocuk pnömoni/parapnömonik efüzyon rehber mantığı — TTD pnömoni raporları, yerel protokol ve uzman değerlendirmesi ile doğrulanmalıdır.',
  title: 'Parapnömonik Efüzyon ve Ampiyem',
  warning:
    'Bu modül eğitim ve hızlı hatırlatma amaçlıdır. Drenaj, antibiyotik ve cerrahi kararları hastanın klinik durumu, görüntüleme, plevra sıvısı, yerel protokol ve çocuk göğüs/çocuk cerrahisi/enfeksiyon değerlendirmesi ile verilmelidir.',
};

export const initialAssessmentItems = [
  'Ateş süresi ve 48–72 saatte antibiyotik yanıtı',
  'Solunum sıkıntısı, hipoksemi, takipne veya göğüs ağrısı',
  'Toksik görünüm, sepsis bulgusu veya klinik kötüleşme',
  'Akciğer grafisinde efüzyon, opasite artışı veya mediastinal itim',
  'Aşı durumu, MRSA riski, altta yatan hastalık ve immünsüpresyon',
];

export const imagingItems = [
  'USG efüzyon miktarı, serbest/loküle yapı, septasyon ve fibrin için ilk tercih görüntülemedir.',
  'Akciğer grafisi efüzyon şüphesi ve pnömoni dağılımı için yararlıdır.',
  'BT rutin değildir; nekrotizan pnömoni, apse, kitle, yabancı cisim veya komplike olguda düşünülebilir.',
  'USG drenaj yeri seçimi ve takipte de kullanılabilir.',
];

export const pleuralFluidItems = [
  'Görünüm: berrak, bulanık, pürülan, kanlı',
  'pH, glukoz, LDH, protein',
  'Gram boyama ve kültür',
  'Hücre sayımı ve diferansiyel',
  'Klinik bağlama göre ADA/TB incelemesi, sitoloji, trigliserid veya ek testler',
];

export const drainageDecisionItems = [
  'Pürülan sıvı / ampiyem',
  'Gram boyama veya kültür pozitif plevra sıvısı',
  'Plevra pH düşük, özellikle <7.2',
  'Glukoz düşük veya LDH çok yüksek',
  'Loküle/septalı efüzyon',
  'Büyük efüzyon, mediastinal itim veya belirgin solunum sıkıntısı',
  'Antibiyotiğe rağmen persistan ateş, hipoksemi veya klinik kötüleşme',
];

export const conservativeItems = [
  'Küçük, serbest ve komplike olmayan efüzyon',
  'Klinik stabil, hipoksemi veya belirgin solunum sıkıntısı yok',
  'Antibiyotik tedavisine iyi klinik yanıt',
  'Yakın klinik izlem ve gerekirse USG takibi mümkün',
];

export const treatmentFollowUpItems = [
  'Ampirik antibiyotik pnömoni rehberi, yaş, aşı durumu, lokal direnç ve risk faktörlerine göre seçilir.',
  'MRSA, hastane ilişkili etken, aspirasyon veya immünsüpresyon varsa kapsam yeniden değerlendirilir.',
  'Drenaj seçenekleri: göğüs tüpü, intraplevral fibrinolitik veya seçilmiş olguda VATS/cerrahi.',
  'Yanıt izlemi: ateş trendi, solunum işi, oksijen ihtiyacı, ağrı, oral alım ve CRP/lökosit trendi.',
  'Klinik iyileşme yoksa drenaj yeterliliği, lokülasyon, nekrotizan pnömoni, apse veya yanlış etken düşünülür.',
];

export type LightCriteriaInput = {
  pleuralProtein: number | null;
  serumProtein: number | null;
  pleuralLdh: number | null;
  serumLdh: number | null;
  serumLdhUpperLimit: number | null;
};

export function calculateLightCriteria(input: LightCriteriaInput) {
  const proteinRatio =
    input.pleuralProtein !== null && input.serumProtein !== null && input.serumProtein > 0
      ? input.pleuralProtein / input.serumProtein
      : null;
  const ldhRatio =
    input.pleuralLdh !== null && input.serumLdh !== null && input.serumLdh > 0
      ? input.pleuralLdh / input.serumLdh
      : null;
  const ldhUlnRatio =
    input.pleuralLdh !== null &&
    input.serumLdhUpperLimit !== null &&
    input.serumLdhUpperLimit > 0
      ? input.pleuralLdh / input.serumLdhUpperLimit
      : null;

  const criteria = [
    {
      label: 'Plevra protein / serum protein > 0.5',
      met: proteinRatio !== null ? proteinRatio > 0.5 : null,
      value: proteinRatio,
    },
    {
      label: 'Plevra LDH / serum LDH > 0.6',
      met: ldhRatio !== null ? ldhRatio > 0.6 : null,
      value: ldhRatio,
    },
    {
      label: 'Plevra LDH > serum LDH üst sınırının 2/3’ü',
      met: ldhUlnRatio !== null ? ldhUlnRatio > 2 / 3 : null,
      value: ldhUlnRatio,
    },
  ];
  const metCount = criteria.filter((item) => item.met === true).length;

  return {
    criteria,
    metCount,
    interpretation:
      metCount > 0
        ? 'Eksüda lehine'
        : criteria.some((item) => item.met === null)
          ? 'Eksik veri; yorum sınırlı'
          : 'Transüda olasılığı daha yüksek',
  };
}

export function getDrainageSignal({
  purulent,
  positiveGramCulture,
  phLow,
  glucoseLow,
  loculated,
  largeEffusion,
  clinicalWorse,
}: {
  purulent: boolean;
  positiveGramCulture: boolean;
  phLow: boolean;
  glucoseLow: boolean;
  loculated: boolean;
  largeEffusion: boolean;
  clinicalWorse: boolean;
}) {
  const score = [
    purulent,
    positiveGramCulture,
    phLow,
    glucoseLow,
    loculated,
    largeEffusion,
    clinicalWorse,
  ].filter(Boolean).length;

  if (score >= 1) {
    return {
      title: 'Komplike efüzyon / drenaj değerlendirmesi',
      text:
        'Çocuk göğüs, çocuk cerrahisi ve/veya enfeksiyon hastalıkları ile drenaj, antibiyotik kapsamı ve ileri görüntüleme gereksinimi değerlendirilmelidir.',
    };
  }

  return {
    title: 'Komplike olmayan küçük efüzyon olabilir',
    text:
      'Klinik stabilse antibiyotik + yakın izlem uygun olabilir; kötüleşme veya yanıtsızlıkta yeniden değerlendir.',
  };
}

