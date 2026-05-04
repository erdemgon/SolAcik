export type PhCrisisKey =
  | 'knownPh'
  | 'syncope'
  | 'hypoxemia'
  | 'hypotension'
  | 'altered'
  | 'poorPerfusion'
  | 'rvFailure'
  | 'prostacyclinProblem'
  | 'infectionTrigger'
  | 'perioperative';

export type PhTriggerKey =
  | 'hypoxia'
  | 'acidosis'
  | 'painAgitation'
  | 'dehydration'
  | 'fluidOverload'
  | 'sepsis'
  | 'arrhythmia'
  | 'anemia'
  | 'medicationInterruption';

export const phEmergencySource = {
  badge:
    'Kaynak yaklaşımı: AHA/ATS pediatrik pulmoner hipertansiyon rehberi + AHA PALS PH kriz önerileri + pediatrik acil PH yaklaşımları — PH merkezi ile doğrulanmalıdır.',
  warning:
    'Bu modül pulmoner hipertansiyon acil yaklaşımı için checklist aracıdır. PH krizi hayatı tehdit eder; çocuk kardiyoloji/PH merkezi, çocuk yoğun bakım ve anestezi ekipleri erken dahil edilmelidir.',
};

export const phCrisisSignals: { key: PhCrisisKey; label: string; note: string }[] = [
  {
    key: 'knownPh',
    label: 'Bilinen pulmoner hipertansiyon',
    note: 'Acil başvuruda takip eden PH/kardiyoloji ekibi erken aranmalıdır.',
  },
  {
    key: 'syncope',
    label: 'Senkop / presenkop',
    note: 'Özellikle eforla veya siyanozla birlikteyse yüksek risk bulgusudur.',
  },
  {
    key: 'hypoxemia',
    label: 'Hipoksemi / siyanoz',
    note: 'Hipoksi pulmoner vazokonstriksiyonu artırır ve krizi derinleştirir.',
  },
  {
    key: 'hypotension',
    label: 'Hipotansiyon',
    note: 'Sağ kalp yetmezliği ve düşük kardiyak debi göstergesi olabilir.',
  },
  {
    key: 'altered',
    label: 'Bilinç değişikliği',
    note: 'Düşük debi, hipoksemi veya asidoz açısından acil uyarıdır.',
  },
  {
    key: 'poorPerfusion',
    label: 'Kötü perfüzyon',
    note: 'Soğuk ekstremite, uzamış kapiller dolum, laktat artışı veya oligüri.',
  },
  {
    key: 'rvFailure',
    label: 'Sağ kalp yetmezliği bulgusu',
    note: 'Hepatomegali, ödem, belirgin juguler dolgunluk veya ekoda RV disfonksiyonu.',
  },
  {
    key: 'prostacyclinProblem',
    label: 'Prostasiklin infüzyon sorunu',
    note: 'Epoprostenol kesilmesi dakikalar içinde ağır PH krizine yol açabilir.',
  },
  {
    key: 'infectionTrigger',
    label: 'Enfeksiyon / ateş tetikleyici',
    note: 'Sepsis, pnömoni veya viral enfeksiyon PH krizini tetikleyebilir.',
  },
  {
    key: 'perioperative',
    label: 'Sedasyon/anestezi/perioperatif dönem',
    note: 'Entübasyon, ağrı, ajitasyon ve ventilasyon değişiklikleri kriz riski taşır.',
  },
];

export const phTriggers: { key: PhTriggerKey; label: string; note: string }[] = [
  {
    key: 'hypoxia',
    label: 'Hipoksi',
    note: 'Oksijenasyon hızlı optimize edilir.',
  },
  {
    key: 'acidosis',
    label: 'Asidoz / hiperkapni',
    note: 'Ventilasyon, perfüzyon ve metabolik nedenler düzeltilir.',
  },
  {
    key: 'painAgitation',
    label: 'Ağrı / ajitasyon',
    note: 'Kontrollü analjezi-sedasyon gerekir; aşırı sedasyon/hipoventilasyon da risklidir.',
  },
  {
    key: 'dehydration',
    label: 'Hipovolemi',
    note: 'Preload düşerse kardiyak debi azalır; küçük boluslarla dikkatli yaklaşılır.',
  },
  {
    key: 'fluidOverload',
    label: 'Sıvı yükü',
    note: 'RV yetmezliğini artırabilir; sıvı dengesi yakından izlenir.',
  },
  {
    key: 'sepsis',
    label: 'Sepsis',
    note: 'Sistemik vazodilatasyon ve hipoksi PH krizini ağırlaştırabilir.',
  },
  {
    key: 'arrhythmia',
    label: 'Aritmi / bradikardi',
    note: 'Çocuk PH krizinde kardiyak debi kalp hızına duyarlı olabilir.',
  },
  {
    key: 'anemia',
    label: 'Anemi',
    note: 'Oksijen taşıma kapasitesi azalır; PH ekibiyle hedefler değerlendirilir.',
  },
  {
    key: 'medicationInterruption',
    label: 'PH ilacı kesilmesi',
    note: 'Özellikle prostasiklin infüzyonu kesintisi acil durumdur.',
  },
];

export const firstActions = [
  'Yardım çağır: çocuk kardiyoloji/PH merkezi, çocuk yoğun bakım, anestezi ve gerekirse ECMO merkezi.',
  'Oksijen ver; hipoksemi ve siyanozu agresif düzelt.',
  'Asidoz, hiperkapni, ağrı/ajitasyon, hipotermi ve hipoglisemi gibi tetikleyicileri düzelt.',
  'Damar yolu ve monitörizasyon: EKG, SpO2, kan basıncı, mümkünse kapnografi ve kan gazı.',
  'Sıvıyı dikkatli yönet: hipovolemide küçük boluslar, sıvı yükünde diürez/yoğun bakım planı.',
  'Prostasiklin infüzyonu varsa asla kesilmemeli; hat/pompa sorunu varsa acil yeniden başlat.',
  'Entübasyon/sedasyon yüksek risklidir; mümkünse PH/anestezi/yoğun bakım ekibiyle planlanır.',
];

export const acuteTherapyNotes = [
  'İnhale nitrik oksit veya inhale prostasiklin PH krizinde ilk pulmoner vazodilatör seçeneklerdendir; kurum ve uzman protokolüne göre uygulanır.',
  'Oksijen, ventilasyon ve alkalinizasyon stratejileri pulmoner vazokonstriksiyonu azaltmak için kullanılabilir.',
  'Sistemik hipotansiyonda inotrop/vazopresör seçimi RV perfüzyonu ve sistemik basıncı koruyacak şekilde yoğun bakım/PH ekibiyle yapılır.',
  'Sildenafil veya diğer PAH hedefli ilaçlar akut durumda yalnız uzman önerisiyle; etkileşim ve hipotansiyon riski dikkate alınarak.',
  'Refrakter düşük debi, ağır hipoksemi veya kardiyak arrest riskinde ECMO merkeziyle erken iletişim.',
  'PH dışı tetikleyici tedavisi: enfeksiyon, pnömoni, pulmoner emboli, aritmi, anemi veya ilaç kesintisi.',
];

export const evaluationItems = [
  'Bilinen PH tanısı, etiyoloji, son ekokardiyografi/kateter ve risk sınıfı',
  'Kullanılan PH ilaçları, doz saati, pompa/kateter sorunu ve ilaç kesintisi',
  'EKG: aritmi, sağ kalp yüklenmesi, iskemi bulgusu',
  'Ekokardiyografi: RV fonksiyonu, septal düzleşme, perikardiyal efüzyon, şant ve LV dolumu',
  'Kan gazı, laktat, elektrolit, glukoz, Hb, enfeksiyon belirteçleri',
  'BNP/NT-proBNP klinik kararı destekleyebilir; tek başına kriz tanısı değildir',
  'Akciğer grafisi/USG: pnömoni, ödem, atelektazi veya plevral sorun',
  'Pulmoner emboli, miyokardit, sepsis ve akut solunum hastalığı ayırıcı tanısı',
];

export function classifyPhEmergency(selected: PhCrisisKey[]) {
  const critical =
    selected.includes('hypotension') ||
    selected.includes('altered') ||
    selected.includes('poorPerfusion') ||
    selected.includes('prostacyclinProblem') ||
    selected.includes('rvFailure');

  if (critical || (selected.includes('knownPh') && selected.length >= 3)) {
    return {
      tone: 'red' as const,
      title: 'PH krizi / akut sağ kalp yetmezliği riski',
      action:
        'Oksijenasyon, perfüzyon ve tetikleyiciler hızla düzeltilmeli; PH merkezi ve çocuk yoğun bakım acilen dahil edilmelidir.',
    };
  }

  if (selected.includes('knownPh') || selected.length >= 2) {
    return {
      tone: 'amber' as const,
      title: 'PH açısından yüksek dikkat',
      action:
        'Klinik kötüleşme hızlı olabilir; kardiyoloji/PH ekibiyle erken görüş ve yakın monitörizasyon uygundur.',
    };
  }

  return {
    tone: 'gray' as const,
    title: 'PH krizi için veri sınırlı',
    action:
      'Belirti seçilmedi; ancak senkop, hipoksemi, sağ kalp bulgusu veya bilinen PH varsa yeniden değerlendir.',
  };
}
