export type BronchiectasisSignalKey =
  | 'wetCough'
  | 'recurrentExacerbations'
  | 'abnormalAuscultation'
  | 'growthFailure'
  | 'clubbing'
  | 'hemoptysis'
  | 'persistentLobarChange'
  | 'riskHistory';

export type ExacerbationSignalKey =
  | 'increasedCough'
  | 'sputumChange'
  | 'dyspnea'
  | 'systemic'
  | 'hemoptysis'
  | 'hypoxemia'
  | 'feedingActivity';

export type CausePathwayKey =
  | 'cf'
  | 'pcd'
  | 'immunodeficiency'
  | 'aspiration'
  | 'postInfectious'
  | 'airwayObstruction'
  | 'asthmaOverlap'
  | 'systemicDisease'
  | 'unknown';

export const bronchiectasisSource = {
  badge:
    'Kaynak yaklaşımı: ERS 2021 çocuk/adolesan bronşektazi kılavuzu + kalite standartları — yerel merkez protokolü ile doğrulanmalıdır.',
  warning:
    'Bu modül non-CF bronşektazi için eğitim ve kontrol listesi aracıdır; tanı, BT yorumu, antibiyotik, eradikasyon ve uzun dönem tedavi kararları çocuk göğüs hastalıkları uzmanı ve kurum protokolü ile doğrulanmalıdır.',
};

export const bronchiectasisSuspicionSignals: {
  key: BronchiectasisSignalKey;
  label: string;
  note: string;
}[] = [
  {
    key: 'wetCough',
    label: 'Kronik ıslak / prodüktif öksürük',
    note: 'Çocukta bronşektazinin en önemli klinik ipuçlarından biridir.',
  },
  {
    key: 'recurrentExacerbations',
    label: 'Tekrarlayan alt solunum yolu alevlenmeleri',
    note: 'Antibiyotik gerektiren, uzayan veya sık tekrarlayan ataklar.',
  },
  {
    key: 'abnormalAuscultation',
    label: 'Persistan oskültasyon bulgusu',
    note: 'Lokalize veya yaygın krepitan ral/ronküs, tedavi sonrası düzelmeyen bulgular.',
  },
  {
    key: 'growthFailure',
    label: 'Büyüme geriliği / beslenme sorunu',
    note: 'Kronik enfeksiyon, aspirasyon veya sistemik hastalık açısından uyarır.',
  },
  {
    key: 'clubbing',
    label: 'Çomak parmak',
    note: 'İleri/kronik suppuratif akciğer hastalığı bulgusu olabilir.',
  },
  {
    key: 'hemoptysis',
    label: 'Hemoptizi',
    note: 'Bronşektazi komplikasyonu veya alternatif ciddi patoloji açısından değerlendirilir.',
  },
  {
    key: 'persistentLobarChange',
    label: 'Persistan/lokalize radyolojik değişiklik',
    note: 'Aynı lobda tekrarlayan pnömoni, atelektazi veya infiltrasyon.',
  },
  {
    key: 'riskHistory',
    label: 'Riskli öykü',
    note: 'Ağır pnömoni, yoğun bakım, yabancı cisim, aspirasyon, immün yetmezlik, PCD veya CF şüphesi.',
  },
];

export const diagnosisCriteria = [
  'Bronşektazi klinik sendrom + BT ile objektif bronş dilatasyonu gerektirir.',
  'Klinik sendrom: kronik ıslak/prodüktif öksürük, tekrarlayan alevlenme ve alt hava yolu enfeksiyon/inflamasyon bulguları.',
  'Akciğer grafisi bronşektaziyi dışlamak için yeterli değildir.',
  'Çocuklarda BT yorumu pediatrik ölçütlerle ve deneyimli radyologla yapılmalıdır; erişkin bronkoarteriyel oran kriterleri aynen uygulanmamalıdır.',
  'Mümkünse düşük doz, pediatrik protokollü, kaliteli inspiryum/ekspiryum değerlendirmesi olan BT tercih edilir.',
  'BT kararı klinik şüphe, risk, önceki görüntüleme ve tedaviye yanıtla birlikte verilmelidir.',
];

export const minimumEtiologyPanel = [
  'Ter testi ve gerektiğinde CFTR değerlendirmesi',
  'Tam kan sayımı ve ayırıcı sayım',
  'İmmünoglobulinler: IgG, IgA, IgM, gerekirse IgE',
  'Aşı antikor yanıtları: pnömokok/tetanoz gibi fonksiyonel antikor yanıtı',
  'Alt hava yolu mikrobiyolojisi: balgam, indükte balgam veya seçilmiş olguda BAL',
  'Solunum fonksiyon testi uygun yaşta',
  'PCD değerlendirmesi: klinik skor, nazal NO, silya analizi/genetik; her hastada otomatik değil, klinik ipucuna göre',
  'Aspirasyon/yutma değerlendirmesi: beslenme ile öksürük, nörogelişimsel sorun veya tekrarlayan lokal pnömoni varsa',
  'Yabancı cisim veya hava yolu obstrüksiyonu şüphesinde bronkoskopi',
];

export const causePathways: {
  key: CausePathwayKey;
  title: string;
  clues: string[];
  action: string;
}[] = [
  {
    key: 'cf',
    title: 'Kistik fibrozis dışlandı mı?',
    clues: ['Kronik ıslak öksürük', 'Büyüme geriliği', 'Pankreatik bulgular', 'Pseudomonas veya S. aureus'],
    action: 'Ter testi ve CFTR değerlendirmesi tamamlanmadan non-CF etiketi kesinleştirilmemelidir.',
  },
  {
    key: 'pcd',
    title: 'Primer siliyer diskinezi ipucu var mı?',
    clues: ['Yenidoğan solunum sıkıntısı', 'Situs anomalisi', 'Kronik rinosinüzit/otit', 'Günlük ıslak öksürük'],
    action: 'Nazal NO, silya yapısal/fonksiyonel analiz ve genetik değerlendirme planlanır.',
  },
  {
    key: 'immunodeficiency',
    title: 'İmmün yetmezlik olabilir mi?',
    clues: ['Tekrarlayan ağır enfeksiyon', 'Aile öyküsü', 'Fırsatçı enfeksiyon', 'Zayıf aşı yanıtı'],
    action: 'İmmünoglobulinler, lenfosit alt grupları ve fonksiyonel antikor yanıtı ile immünoloji görüşü.',
  },
  {
    key: 'aspiration',
    title: 'Aspirasyon / yutma disfonksiyonu?',
    clues: ['Beslenme ile öksürük', 'Nörolojik sorun', 'GÖR', 'Tekrarlayan lokal infiltrasyon'],
    action: 'Yutma değerlendirmesi, aspirasyon çalışması ve beslenme planı.',
  },
  {
    key: 'postInfectious',
    title: 'Post-infeksiyöz bronşektazi?',
    clues: ['Ağır pnömoni/adenovirüs/boğmaca/TB öyküsü', 'Başlangıç sonrası persistan ıslak öksürük'],
    action: 'Sekel paternini, PIBO eşlik durumunu ve enfeksiyon önleme/ACT planını değerlendir.',
  },
  {
    key: 'airwayObstruction',
    title: 'Lokal obstrüksiyon?',
    clues: ['Aynı lobda tekrarlayan pnömoni', 'Ani başlangıç', 'Tek taraflı hışıltı', 'Persistan atelektazi'],
    action: 'Yabancı cisim, malazi, stenoz veya dış bası için bronkoskopi/görüntüleme değerlendirmesi.',
  },
  {
    key: 'asthmaOverlap',
    title: 'Astım eşlik ediyor mu, yoksa yanlış etiket mi?',
    clues: ['Hışıltı ve reversibilite', 'Atopi', 'Ancak günlük ıslak öksürük ve antibiyotik yanıtı'],
    action: 'Astım tedavisi bronşektazi yönetiminin yerine geçmez; ıslak öksürük odağı ayrı izlenir.',
  },
  {
    key: 'systemicDisease',
    title: 'Sistemik hastalık?',
    clues: ['Romatolojik bulgu', 'İBH', 'Siliyer/immün sendrom', 'Tekrarlayan sinopulmoner hastalık'],
    action: 'Klinik fenotipe göre romatoloji, gastroenteroloji veya genetik değerlendirme.',
  },
  {
    key: 'unknown',
    title: 'Neden bulunamadı',
    clues: ['Minimum panel tamam', 'Klinik stabil veya izlemde yeni ipucu yok'],
    action: 'İdiyopatik olarak bırakmadan önce panelin tamlığını kontrol et; izlemde etiyolojiyi yeniden gözden geçir.',
  },
];

export const exacerbationSignals: {
  key: ExacerbationSignalKey;
  label: string;
  note: string;
}[] = [
  {
    key: 'increasedCough',
    label: 'Öksürük artışı',
    note: 'Günlük ıslak öksürüğün belirgin artması veya yeni gece öksürüğü.',
  },
  {
    key: 'sputumChange',
    label: 'Balgam değişikliği',
    note: 'Miktar, renk, kıvam veya kötü kokuda artış.',
  },
  {
    key: 'dyspnea',
    label: 'Dispne / solunum işi artışı',
    note: 'Efor kapasitesinde düşme, takipne veya retraksiyon.',
  },
  {
    key: 'systemic',
    label: 'Sistemik bulgu',
    note: 'Ateş, halsizlik, iştah azalması veya okul/aktivite kaybı.',
  },
  {
    key: 'hemoptysis',
    label: 'Hemoptizi',
    note: 'Alevlenme veya komplikasyon açısından ciddiye alınır.',
  },
  {
    key: 'hypoxemia',
    label: 'Hipoksemi',
    note: 'Oksijen ihtiyacı veya desatürasyon gelişmesi.',
  },
  {
    key: 'feedingActivity',
    label: 'Beslenme / aktivite azalması',
    note: 'Küçük çocukta alevlenme bulgusu olarak özellikle önemlidir.',
  },
];

export const managementCards = [
  {
    title: 'Hava yolu temizleme',
    items: [
      'Her çocuk pediatrik deneyimli fizyoterapist tarafından değerlendirilmelidir.',
      'Teknik yaş, bilişsel düzey, sekresyon yükü ve aile kapasitesine göre bireyselleştirilir.',
      'Stabil dönemde plan, alevlenmede sıklık/yoğunluk artırımı öğretilir.',
      'Teknik en az 6 ayda bir ve klinik değişimde yeniden gözden geçirilmelidir.',
    ],
  },
  {
    title: 'Antibiyotik yaklaşımı',
    items: [
      'Alevlenmede antibiyotik seçimi önceki kültür, lokal direnç, ağırlık ve ilaç alerjisine göre yapılır.',
      'Ampirik tedavi reçete gibi otomatik verilmemelidir; kurum protokolü ve kültürle doğrulanmalıdır.',
      'Klinik yanıtsızlıkta örnekleme, komplikasyon ve alternatif tanı yeniden değerlendirilir.',
    ],
  },
  {
    title: 'Pseudomonas aeruginosa',
    items: [
      'Yeni Pseudomonas izolasyonu doğrulanınca eradikasyon yaklaşımı değerlendirilmelidir.',
      'Tedavi rejimi merkez protokolüne, duyarlılığa ve çocuğun klinik durumuna göre seçilir.',
      'Kronik kolonizasyon ve sık alevlenmede uzman merkez izlemi gerekir.',
    ],
  },
  {
    title: 'Uzun dönem bakım',
    items: [
      'Aşılar, beslenme, egzersiz, pasif duman önleme ve komorbidite yönetimi temel bakımdır.',
      'Solunum kültürü, SFT ve alevlenme sıklığı düzenli izlenmelidir.',
      'Gereksiz inhale steroid, rhDNase ve CF’ye özgü tedavileri non-CF bronşektazide otomatik uygulama.',
    ],
  },
];

export const monitoringItems = [
  'Alevlenme sayısı, antibiyotik ihtiyacı ve hastane yatışı',
  'Günlük ıslak öksürük yükü ve balgam miktarı',
  'Büyüme, beslenme ve egzersiz kapasitesi',
  'SFT: FEV1 ve klinik değişim uygun yaşta',
  'Alt hava yolu kültürü: stabil ve alevlenme dönemlerinde imkan dahilinde',
  'Hava yolu temizleme tekniği ve uyum',
  'Aşı durumu ve sigara/pasif duman maruziyeti',
  'BT tekrarı yalnızca klinik gerekçe varsa; rutin sık BT’den kaçın',
];

export function classifyBronchiectasisSuspicion(selected: BronchiectasisSignalKey[]) {
  const hasWetCough = selected.includes('wetCough');
  const highRisk =
    selected.includes('clubbing') ||
    selected.includes('hemoptysis') ||
    selected.includes('persistentLobarChange') ||
    selected.includes('riskHistory');

  if ((hasWetCough && selected.length >= 3) || (hasWetCough && highRisk)) {
    return {
      tone: 'red' as const,
      title: 'Bronşektazi / CSLD şüphesi güçlü',
      action:
        'Kronik suppuratif akciğer hastalığı gibi değerlendir; pediatrik BT, minimum etiyoloji paneli ve çocuk göğüs izlemi planla.',
    };
  }

  if (hasWetCough || selected.length >= 3) {
    return {
      tone: 'amber' as const,
      title: 'Bronşektazi açısından değerlendir',
      action:
        'Persistan ıslak öksürük varsa antibiyotik yanıtı, risk faktörleri ve görüntüleme gereksinimi gözden geçir.',
    };
  }

  return {
    tone: 'gray' as const,
    title: 'Veri sınırlı',
    action:
      'Bronşektazi için tipik tablo yok; ancak kronik ıslak öksürük, tekrarlayan pnömoni veya riskli öykü gelişirse yeniden değerlendir.',
  };
}

export function classifyExacerbation(selected: ExacerbationSignalKey[]) {
  const severe =
    selected.includes('hypoxemia') || selected.includes('hemoptysis') || selected.length >= 5;

  if (severe) {
    return {
      tone: 'red' as const,
      title: 'Ağır alevlenme / yatış değerlendirmesi',
      action:
        'Oksijenasyon, hemoptizi, oral alım ve komplikasyon açısından değerlendir; kültür ve antibiyotik planı merkez protokolüne göre.',
    };
  }

  if (selected.length >= 3) {
    return {
      tone: 'amber' as const,
      title: 'Bronşektazi alevlenmesi olası',
      action:
        'Önceki kültürlere göre antibiyotik, hava yolu temizleme artırımı ve 48–72 saat yanıt kontrolü planla.',
    };
  }

  return {
    tone: 'gray' as const,
    title: 'Alevlenme için kriter sınırlı',
    action:
      'Semptom değişimini izle; günlük ıslak öksürükte belirgin artış veya sistemik bulgu gelişirse yeniden değerlendir.',
  };
}
