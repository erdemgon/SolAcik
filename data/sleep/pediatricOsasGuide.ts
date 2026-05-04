export type OsasSignalKey =
  | 'snoring'
  | 'witnessedApnea'
  | 'laboredBreathing'
  | 'mouthBreathing'
  | 'daytimeSleepiness'
  | 'behaviorLearning'
  | 'growthFailure'
  | 'hypertension'
  | 'enuresis'
  | 'morningHeadache';

export type OsasRiskKey =
  | 'obesity'
  | 'downSyndrome'
  | 'craniofacial'
  | 'neuromuscular'
  | 'prematurity'
  | 'sickleCell'
  | 'mucopolysaccharidosis'
  | 'praderWilli'
  | 'complexCardiopulmonary'
  | 'ageUnder2';

export type PersistentOsasKey =
  | 'postAdenotonsillectomy'
  | 'severeBaseline'
  | 'obesity'
  | 'craniofacial'
  | 'lingualTonsil'
  | 'laryngomalacia'
  | 'cpapIntolerance';

export const osasSource = {
  badge:
    'Kaynak yaklaşımı: AAP pediatrik OSAS rehberi + ERS 1–23 ay OSDB statement + ATS 2024 persistan OSAS rehberi — uyku laboratuvarı ve yerel protokol ile doğrulanmalıdır.',
  warning:
    'Bu modül OSAS tanısı koymaz ve tedavi reçetesi vermez. Horlama/OSAS değerlendirmesi; klinik muayene, polisomnografi veya uygun uyku testi, KBB/uyku/çocuk göğüs değerlendirmesi, komorbiditeler ve kurum protokolü ile doğrulanmalıdır.',
};

export const osasSignals: { key: OsasSignalKey; label: string; note: string }[] = [
  {
    key: 'snoring',
    label: 'Haftada ≥3 gece horlama',
    note: 'Primer horlama ile OSAS ayrımı yalnız klinikle güvenilir yapılamaz.',
  },
  {
    key: 'witnessedApnea',
    label: 'Tanıklı apne / boğulur gibi olma',
    note: 'Aile videosu yardımcı olabilir; PSG gereksinimini güçlendirir.',
  },
  {
    key: 'laboredBreathing',
    label: 'Uykuda zor soluma / retraksiyon',
    note: 'Pozisyonla artan solunum işi, paradoksal solunum veya terleme.',
  },
  {
    key: 'mouthBreathing',
    label: 'Ağız solunumu / burun tıkanıklığı',
    note: 'Adenotonsiller hipertrofi, rinit veya kraniofasiyal darlık düşündürebilir.',
  },
  {
    key: 'daytimeSleepiness',
    label: 'Gündüz uykululuk',
    note: 'Çocukta erişkinden daha az belirgin olabilir; yorgunluk da sorulmalıdır.',
  },
  {
    key: 'behaviorLearning',
    label: 'Davranış / dikkat / okul sorunu',
    note: 'Hiperaktivite, irritabilite, öğrenme güçlüğü OSAS ile ilişkili olabilir.',
  },
  {
    key: 'growthFailure',
    label: 'Büyüme geriliği',
    note: 'Ağır OSAS veya beslenme/komorbidite yükü açısından uyarıcıdır.',
  },
  {
    key: 'hypertension',
    label: 'Hipertansiyon / kardiyak bulgu',
    note: 'Pulmoner hipertansiyon veya sistemik hipertansiyon varsa hızlı değerlendirme gerekir.',
  },
  {
    key: 'enuresis',
    label: 'Enürezis',
    note: 'OSAS ile ilişkili olabilir; tek başına tanı koydurmaz.',
  },
  {
    key: 'morningHeadache',
    label: 'Sabah baş ağrısı',
    note: 'Hipoventilasyon veya uyku bölünmesi ile birlikte değerlendirilir.',
  },
];

export const osasRisks: { key: OsasRiskKey; label: string; note: string }[] = [
  {
    key: 'obesity',
    label: 'Obezite',
    note: 'Persistan OSAS ve CPAP gereksinimi riski artar.',
  },
  {
    key: 'downSyndrome',
    label: 'Down sendromu',
    note: 'OSAS sık ve adenotonsillektomi sonrası kalıcılık olasıdır.',
  },
  {
    key: 'craniofacial',
    label: 'Kraniofasiyal anomali / mikrognati',
    note: 'Üst hava yolu anatomisi ve cerrahi/ortodontik seçenekler değerlendirilir.',
  },
  {
    key: 'neuromuscular',
    label: 'Nöromüsküler hastalık',
    note: 'OSAS yanında hipoventilasyon ve NIV ihtiyacı açısından değerlendirilir.',
  },
  {
    key: 'prematurity',
    label: 'Prematürite / BPD',
    note: 'Komorbid kardiyopulmoner hastalıkla birlikte daha düşük PSG eşiği.',
  },
  {
    key: 'sickleCell',
    label: 'Orak hücre hastalığı',
    note: 'Hipoksemi ve komplikasyon riski nedeniyle dikkatli değerlendirme gerekir.',
  },
  {
    key: 'mucopolysaccharidosis',
    label: 'Mukopolisakkaridoz',
    note: 'Üst hava yolu darlığı, restriktif hastalık ve persistan OSAS riski.',
  },
  {
    key: 'praderWilli',
    label: 'Prader-Willi sendromu',
    note: 'Obezite, hipoventilasyon ve büyüme hormonu süreciyle birlikte değerlendirilir.',
  },
  {
    key: 'complexCardiopulmonary',
    label: 'Kompleks kalp/akciğer hastalığı',
    note: 'Pulmoner hipertansiyon ve oksijenasyon riski nedeniyle uzman merkez.',
  },
  {
    key: 'ageUnder2',
    label: '2 yaş altı',
    note: 'Infant/toddler OSDB çok faktörlüdür; objektif değerlendirme ve uzman yaklaşımı gerekir.',
  },
];

export const sleepStudyIndications = [
  'Horlama + tanıklı apne, zor soluma veya gündüz nörodavranışsal bulgu',
  'Adenotonsillektomi öncesi ağır OSAS şüphesi veya klinik-belirti uyumsuzluğu',
  '2 yaş altı çocukta belirgin OSDB bulgusu',
  'Obezite, Down sendromu, kraniofasiyal anomali, nöromüsküler hastalık veya kompleks kardiyopulmoner hastalık',
  'Pulmoner hipertansiyon, büyüme geriliği, hipoksemi veya hipoventilasyon şüphesi',
  'Adenotonsillektomi sonrası persistan horlama/semptom veya yüksek riskli hasta',
  'CPAP/NIV başlanması veya titrasyon gereksinimi',
];

export const treatmentPathways = [
  {
    title: 'Adenotonsiller hipertrofi baskın',
    items: [
      'KBB değerlendirmesi ve adenotonsillektomi uygunluğu değerlendirilir.',
      'Yüksek riskli çocukta ameliyat öncesi PSG ve ameliyat sonrası izlem planı gerekir.',
      'Adenotonsillektomi OSAS’ı düzeltebilir ancak obezite/sendrom/kompleks hastalıkta kalıcılık sıktır.',
    ],
  },
  {
    title: 'CPAP / NIV yolu',
    items: [
      'Cerrahi uygun değilse, OSAS persistan ise veya hipoventilasyon eşlik ediyorsa PAP tedavisi düşünülür.',
      'Maske uyumu, aile eğitimi, titrasyon ve cihaz verisi takibi gerekir.',
      'Nöromüsküler hastalık ve hipoventilasyonda CPAP yerine bilevel/NIV gerekebilir.',
    ],
  },
  {
    title: 'Medikal / destek seçenekleri',
    items: [
      'Hafif OSAS ve eşlik eden rinitte intranazal steroid seçilmiş olguda düşünülebilir.',
      'Montelukast bazı persistan/hafif olgularda düşünülebilir; nöropsikiyatrik yan etki uyarısı verilir.',
      'Kilo yönetimi obez çocukta tedavi planının parçasıdır; tek başına akut çözüm olarak sunulmaz.',
    ],
  },
  {
    title: 'Anatomiye yönelik ek tedavi',
    items: [
      'Lingual tonsil hipertrofisi, laringomalazi, kraniofasiyal darlık veya maksiller dar ark varsa hedefe yönelik ekip değerlendirmesi gerekir.',
      'Ortodontik/dentofasiyal tedaviler seçilmiş çocuklarda uyku ekibi ve diş/çene ekibi ile değerlendirilir.',
      'İleri cerrahi kararları PSG, endoskopi/DISE ve multidisipliner değerlendirmeye dayanmalıdır.',
    ],
  },
];

export const persistentOsasSignals: {
  key: PersistentOsasKey;
  label: string;
  note: string;
}[] = [
  {
    key: 'postAdenotonsillectomy',
    label: 'Adenotonsillektomi sonrası semptom sürüyor',
    note: 'Horlama, apne, gündüz bulguları veya uyku testi anormalliği devam ediyor.',
  },
  {
    key: 'severeBaseline',
    label: 'Başlangıçta ağır OSAS',
    note: 'Ağır başlangıç persistan OSAS riskini artırır.',
  },
  {
    key: 'obesity',
    label: 'Obezite',
    note: 'ATS 2024 persistan OSAS rehberinde yüksek riskli gruplardan biridir.',
  },
  {
    key: 'craniofacial',
    label: 'Kraniofasiyal / sendromik risk',
    note: 'Down sendromu, MPS, mikrognati ve benzeri durumlarda kalıcılık sık olabilir.',
  },
  {
    key: 'lingualTonsil',
    label: 'Lingual tonsil hipertrofisi şüphesi',
    note: 'KBB/uyku endoskopisi ile hedefe yönelik değerlendirme gerekebilir.',
  },
  {
    key: 'laryngomalacia',
    label: 'Uyku ilişkili laringomalazi',
    note: 'Özellikle küçük çocukta supraglottik obstrüksiyon katkıda bulunabilir.',
  },
  {
    key: 'cpapIntolerance',
    label: 'CPAP uyumsuzluğu',
    note: 'Maske, basınç, davranışsal destek ve alternatif tedavi seçenekleri değerlendirilir.',
  },
];

export const interpretationNotes = [
  'Çocukta OSAS yorumunda PSG parametreleri, semptomlar ve komorbidite birlikte değerlendirilir.',
  'AHI/oAHI eşikleri merkez ve yaşa göre yorumlanır; sayı tek başına tedavi kararı değildir.',
  'Oksijen desatürasyonu, CO2 retansiyonu, uyku mimarisi ve klinik morbidite özellikle önemlidir.',
  'Primer horlama, üst hava yolu rezistans sendromu, santral apne ve hipoventilasyon ayrımı gerekebilir.',
  'Ev tipi sınırlı testler erişilebilirliği artırabilir ancak negatif/şüpheli sonuç PSG gereksinimini ortadan kaldırmayabilir.',
];

export function classifyOsasRisk(signals: OsasSignalKey[], risks: OsasRiskKey[]) {
  const highSignal =
    signals.includes('witnessedApnea') ||
    signals.includes('laboredBreathing') ||
    signals.includes('hypertension') ||
    signals.includes('growthFailure');
  const complexRisk = risks.length > 0;

  if ((signals.includes('snoring') && highSignal) || (signals.length >= 3 && complexRisk)) {
    return {
      tone: 'red' as const,
      title: 'OSAS olasılığı yüksek / PSG öncelikli',
      action:
        'Objektif uyku değerlendirmesi, KBB ve çocuk göğüs/uyku ekibi planı yapılmalıdır; komorbidite varsa öncelik artar.',
    };
  }

  if (signals.includes('snoring') || signals.length >= 2 || complexRisk) {
    return {
      tone: 'amber' as const,
      title: 'Uyku ilişkili solunum bozukluğu açısından değerlendir',
      action:
        'Horlama sıklığı, tanıklı apne, gündüz etkilenme ve risk faktörleri netleştir; PSG/uyku testi eşiğini düşük tut.',
    };
  }

  return {
    tone: 'gray' as const,
    title: 'Veri sınırlı',
    action:
      'Belirgin horlama veya OSAS bulgusu yoksa takip edilebilir; semptom gelişirse yeniden değerlendir.',
  };
}

export function classifyPersistentOsas(selected: PersistentOsasKey[]) {
  if (
    selected.includes('postAdenotonsillectomy') &&
    (selected.includes('severeBaseline') ||
      selected.includes('obesity') ||
      selected.includes('craniofacial') ||
      selected.includes('cpapIntolerance'))
  ) {
    return {
      tone: 'red' as const,
      title: 'Persistan OSAS için uzman tedavi planı',
      action:
        'PSG ile doğrula; CPAP/NIV, kilo yönetimi, ortodontik/anatomik hedefler ve KBB seçenekleri multidisipliner değerlendirilmeli.',
    };
  }

  if (selected.length > 0) {
    return {
      tone: 'amber' as const,
      title: 'Persistan OSAS riski var',
      action:
        'Semptom ve objektif test gereksinimini değerlendir; yüksek riskli çocukta ameliyat sonrası takip planı yapılmalı.',
    };
  }

  return {
    tone: 'gray' as const,
    title: 'Persistan OSAS sinyali seçilmedi',
    action: 'Adenotonsillektomi veya tedavi sonrası semptom takibi ve risk temelli kontrol yeterli olabilir.',
  };
}
