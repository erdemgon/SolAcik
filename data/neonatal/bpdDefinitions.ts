export type BpdRespiratorySupport =
  | 'room_air'
  | 'oxygen_only'
  | 'nasal_cannula'
  | 'hfnc'
  | 'cpap'
  | 'nippv'
  | 'invasive_ventilation';

export type BpdGrade = {
  label: string;
  tone: 'green' | 'amber' | 'red' | 'gray';
  explanation: string;
  nextChecks: string[];
};

export type BpdInput = {
  gestationalAgeWeeks: number | null;
  gestationalAgeDays: number | null;
  postnatalAgeDays: number | null;
  oxygenFor28Days: boolean;
  support: BpdRespiratorySupport;
  nasalCannulaFlowLMin: number | null;
  fio2Percent: number | null;
};

export const bpdSource = {
  badge: 'Ana kaynak: Türk Neonatoloji Derneği 2018 BPD Korunma ve İzlem Rehberi — seçimlik Jensen/NICHD 2019 karşılaştırması.',
  warning:
    'Bu ekran eğitim ve sınıflama hatırlatıcısıdır; BPD tanısı veya tedavi kararı yerine geçmez. Ana sınıflama Türk Neonatoloji Derneği 2018 rehberindeki NIH 2001 tabanlı tanıma göre yapılır. Değerlendirme zamanı, oksijen ihtiyacı, solunum desteği, prematürelik haftası, akut olaylar ve yerel yenidoğan protokolü ile birlikte yorumlanmalıdır.',
  sourceLinks: [
    {
      title:
        'Arsan S, Korkmaz A, Oğuz S. Türk Neonatoloji Derneği bronkopulmoner displazi korunma ve izlem rehberi. Turk Pediatri Ars. 2018;53(Suppl 1):S138-S150.',
      url: 'https://doi.org/10.5152/TurkPediatriArs.2018.01814',
    },
    {
      title: 'Türk Neonatoloji Derneği BPD rehberi PDF',
      url: 'https://turkarchpediatr.org/Content/files/sayilar/35/TPA-27576-ARSAN%281%29.pdf',
    },
    {
      title:
        'Jensen EA, Dysart K, Gantz MG, et al. The Diagnosis of Bronchopulmonary Dysplasia in Very Preterm Infants. Am J Respir Crit Care Med. 2019;200(6):751-759.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30995069/',
    },
    {
      title:
        'Jobe AH, Bancalari E. Bronchopulmonary dysplasia. Am J Respir Crit Care Med. 2001;163(7):1723-1729.',
      url: 'https://doi.org/10.1164/ajrccm.163.7.2011060',
    },
    {
      title:
        'NICHD Neonatal Research Network diagnostic criteria summary for BPD severity by respiratory support at 36 weeks PMA.',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11075436/',
    },
  ],
};

export const bpdSupportLabels: Record<BpdRespiratorySupport, string> = {
  room_air: 'Oda havası / destek yok',
  oxygen_only: 'Sadece oksijen',
  nasal_cannula: 'Nazal kanül',
  hfnc: 'HFNC / yüksek akımlı nazal kanül',
  cpap: 'CPAP',
  nippv: 'NIPPV / NIV',
  invasive_ventilation: 'İnvaziv mekanik ventilasyon',
};

export const bpdSupportOptions: { key: BpdRespiratorySupport; label: string }[] = [
  { key: 'room_air', label: bpdSupportLabels.room_air },
  { key: 'oxygen_only', label: bpdSupportLabels.oxygen_only },
  { key: 'nasal_cannula', label: bpdSupportLabels.nasal_cannula },
  { key: 'hfnc', label: bpdSupportLabels.hfnc },
  { key: 'cpap', label: bpdSupportLabels.cpap },
  { key: 'nippv', label: bpdSupportLabels.nippv },
  { key: 'invasive_ventilation', label: bpdSupportLabels.invasive_ventilation },
];

export function calculatePostmenstrualAgeWeeks(input: BpdInput) {
  if (input.gestationalAgeWeeks === null || input.postnatalAgeDays === null) return null;
  const gaDays = input.gestationalAgeWeeks * 7 + (input.gestationalAgeDays ?? 0);
  const totalDays = gaDays + input.postnatalAgeDays;
  return totalDays / 7;
}

export function getBpdAssessmentTiming(input: BpdInput) {
  const pmaWeeks = calculatePostmenstrualAgeWeeks(input);
  if (input.gestationalAgeWeeks === null || input.postnatalAgeDays === null || pmaWeeks === null) {
    return {
      label: 'Değerlendirme zamanı hesaplanamadı',
      explanation: 'Gestasyon haftası ve postnatal gün girildiğinde değerlendirme zamanı gösterilir.',
      isAtStandardAssessment: false,
    };
  }

  const gaDays = input.gestationalAgeWeeks * 7 + (input.gestationalAgeDays ?? 0);
  if (gaDays < 32 * 7) {
    return {
      label: `${formatNumber(pmaWeeks)} hafta PMA`,
      explanation:
        pmaWeeks >= 36
          ? 'TND 2018’e göre GA <32 hafta için değerlendirme PM 36. hafta veya daha erken taburculuk sırasında yapılır.'
          : 'TND 2018’e göre GA <32 hafta için standart BPD değerlendirmesine henüz erken olabilir; PM 36. hafta veya taburculukta yeniden değerlendir.',
      isAtStandardAssessment: pmaWeeks >= 36,
    };
  }

  return {
    label: `${input.postnatalAgeDays}. postnatal gün`,
    explanation:
      input.postnatalAgeDays >= 56
        ? 'TND 2018’e göre GA ≥32 hafta için değerlendirme doğum sonrası 56. gün veya daha erken taburculuk sırasında yapılır.'
        : 'TND 2018’e göre GA ≥32 hafta için değerlendirmeye henüz erken olabilir; doğum sonrası 56. gün veya taburculukta yeniden değerlendir.',
    isAtStandardAssessment: input.postnatalAgeDays >= 56,
  };
}

export function classifyJensen2019Bpd(input: BpdInput): BpdGrade {
  if (input.support === 'room_air') {
    return {
      label: 'BPD yok / solunum desteği yok',
      tone: 'green',
      explanation:
        'Jensen 2019 yaklaşımında 36 hafta PMA’da solunum desteği yoksa BPD sınıflaması yok olarak görünür.',
      nextChecks: [
        'Bu sınıflama 36 hafta PMA’daki olağan destek düzeyine göre yapılmalıdır.',
        'Akut enfeksiyon, prosedür veya geçici desatürasyon için kısa süreli destek artışları ayrı değerlendirilmelidir.',
      ],
    };
  }

  if (input.support === 'invasive_ventilation') {
    return {
      label: 'Grade 3 BPD',
      tone: 'red',
      explanation:
        '36 hafta PMA’da invaziv mekanik ventilasyon gereksinimi Jensen/NICHD 2019 tanımında Grade 3 BPD ile uyumludur.',
      nextChecks: [
        'BPD ilişkili pulmoner hipertansiyon açısından ekokardiyografi değerlendirmesini düşün.',
        'Beslenme, büyüme, ventilasyon hedefleri, enfeksiyon ve aspirasyon riskleri multidisipliner izlenmelidir.',
      ],
    };
  }

  if (input.support === 'cpap' || input.support === 'nippv' || input.support === 'hfnc') {
    return {
      label: 'Grade 2 BPD',
      tone: 'amber',
      explanation:
        '36 hafta PMA’da CPAP/NIPPV veya yüksek akımlı nazal destek gereksinimi pratikte Grade 2 BPD uyarısı doğurur; kullanılan yerel tanım doğrulanmalıdır.',
      nextChecks: [
        'Destek modunun yerel protokolde CPAP/NIPPV/HFNC olarak nasıl sınıflandığını kontrol et.',
        'Pulmoner hipertansiyon taraması ve taburculuk öncesi oksijen/monitor planı değerlendirilebilir.',
      ],
    };
  }

  if (input.support === 'nasal_cannula') {
    if (input.nasalCannulaFlowLMin === null) {
      return {
        label: 'Nazal kanül akımı gerekli',
        tone: 'gray',
        explanation: 'Jensen 2019 sınıflaması için nazal kanül akımı ≤2 L/dk veya >2 L/dk olarak ayrılır.',
        nextChecks: ['Nazal kanül akımını L/dk olarak gir.'],
      };
    }

    if (input.nasalCannulaFlowLMin <= 2) {
      return {
        label: 'Grade 1 BPD',
        tone: 'amber',
        explanation:
          '36 hafta PMA’da nazal kanül ≤2 L/dk gereksinimi Jensen/NICHD 2019 tanımında Grade 1 BPD ile uyumludur.',
        nextChecks: [
          'Ev oksijeni gereksinimi, beslenme-büyüme ve taburculuk güvenliği yerel protokolle değerlendirilmelidir.',
        ],
      };
    }

    return {
      label: 'Grade 2 BPD',
      tone: 'amber',
      explanation:
        '36 hafta PMA’da nazal kanül >2 L/dk gereksinimi Jensen/NICHD 2019 tanımında Grade 2 BPD ile uyumludur.',
      nextChecks: [
        'Yüksek akım/pozitif basınç eşdeğerliği ve oksijen ihtiyacı yerel yenidoğan protokolüyle doğrulanmalıdır.',
        'Pulmoner hipertansiyon ve taburculuk sonrası solunum desteği planı gözden geçirilmelidir.',
      ],
    };
  }

  return {
    label: 'Grade 1 BPD olası',
    tone: 'amber',
    explanation:
      'Sadece oksijen gereksinimi varsa Jensen 2019 desteğe dayalı sınıflamada düşük dereceli BPD olarak ele alınabilir; tanım ve akım bilgisi doğrulanmalıdır.',
    nextChecks: [
      'Oksijenin nazal kanül akımı, FiO2 karşılığı ve standart değerlendirme zamanı netleştirilmelidir.',
    ],
  };
}

export function classifyTnd2018Bpd(input: BpdInput): BpdGrade {
  if (!input.oxygenFor28Days) {
    return {
      label: 'TND 2018 için BPD ön koşulu tamamlanmamış',
      tone: 'gray',
      explanation:
        'Türk Neonatoloji Derneği 2018 rehberi, NIH 2001 tanımını esas alır; BPD sınıflaması için en az 28 gün ≥%21 ek oksijen gereksinimi ön koşuldur.',
      nextChecks: ['Oksijen maruziyetinin gün sayısı ve FiO2 >%21 gereksinimi doğrulanmalıdır.'],
    };
  }

  if (input.support === 'room_air') {
    return {
      label: 'Hafif BPD',
      tone: 'green',
      explanation:
        'En az 28 gün ek oksijen gereksinimi olup TND değerlendirme zamanında ek oksijen gereksinimi yoksa hafif BPD ile uyumludur.',
      nextChecks: ['Taburculuk sonrası solunum morbiditesi ve büyüme izlemi klinik bağlama göre planlanır.'],
    };
  }

  if (
    input.support === 'invasive_ventilation' ||
    input.support === 'cpap' ||
    input.support === 'nippv' ||
    input.support === 'hfnc'
  ) {
    return {
      label: 'Ağır BPD',
      tone: 'red',
      explanation:
        'TND/NIH 2001 tabanlı sınıflamada pozitif basınç desteği, nCPAP veya invaziv ventilasyon ağır BPD ile uyumludur.',
      nextChecks: [
        'Pulmoner hipertansiyon taraması, beslenme-büyüme ve taburculuk sonrası solunum destek planı gerekir.',
      ],
    };
  }

  if (input.fio2Percent === null) {
    return {
      label: 'FiO2 gerekli',
      tone: 'gray',
      explanation:
        'TND/NIH 2001 tabanlı şiddet ayrımı için değerlendirme zamanındaki oksijen yüzdesi <%30 veya ≥%30 olarak bilinmelidir.',
      nextChecks: ['FiO2 veya düşük akım oksijen eşdeğeri kurum protokolüne göre girilmelidir.'],
    };
  }

  if (input.fio2Percent < 30) {
    return {
      label: 'Orta BPD',
      tone: 'amber',
      explanation:
        'En az 28 gün ek oksijen gereksinimi ve TND değerlendirme zamanında <%30 ek oksijen gereksinimi orta BPD ile uyumludur.',
      nextChecks: ['Oksijen hedefleri, beslenme ve pulmoner hipertansiyon riski klinik bağlamla değerlendirilmelidir.'],
    };
  }

  return {
    label: 'Ağır BPD',
    tone: 'red',
    explanation:
      'En az 28 gün ek oksijen gereksinimi ve TND değerlendirme zamanında ≥%30 oksijen gereksinimi ağır BPD ile uyumludur.',
    nextChecks: [
      'Pulmoner hipertansiyon taraması ve multidisipliner taburculuk planı güçlü biçimde değerlendirilmelidir.',
    ],
  };
}

export const classifyNichd2001Bpd = classifyTnd2018Bpd;

export function getBpdInputWarnings(input: BpdInput) {
  const warnings: string[] = [];
  const gaDays =
    input.gestationalAgeWeeks === null
      ? null
      : input.gestationalAgeWeeks * 7 + (input.gestationalAgeDays ?? 0);

  if (input.gestationalAgeWeeks === null) warnings.push('Gestasyon yaşı girilmedi.');
  if (input.postnatalAgeDays === null) warnings.push('Postnatal gün girilmedi.');
  if (gaDays !== null && (gaDays < 22 * 7 || gaDays > 42 * 7)) {
    warnings.push('Gestasyon yaşı olağandışı görünüyor; veri girişini kontrol edin.');
  }
  if (input.postnatalAgeDays !== null && input.postnatalAgeDays < 0) {
    warnings.push('Postnatal gün negatif olamaz.');
  }
  if (
    input.support === 'nasal_cannula' &&
    input.nasalCannulaFlowLMin !== null &&
    input.nasalCannulaFlowLMin < 0
  ) {
    warnings.push('Nazal kanül akımı negatif olamaz.');
  }
  if (input.fio2Percent !== null && (input.fio2Percent < 21 || input.fio2Percent > 100)) {
    warnings.push('FiO2 yüzde olarak 21–100 aralığında girilmelidir.');
  }

  return warnings;
}

export function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
