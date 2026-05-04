export type AsthmaAgeGroup = '0-5' | '6-11' | '12plus';

export type AsthmaStep = {
  ageGroup: AsthmaAgeGroup;
  step: 1 | 2 | 3 | 4 | 5;
  preferredTitle: string;
  preferredSummary: string;
  alternativeTitle?: string;
  alternativeSummary?: string;
  reliever: string;
  martEligible: boolean;
  specialistReferral: boolean;
  notes: string[];
};

export const asthmaSourceBadge =
  'Kaynak sürümü: GINA 2025 — GINA 2026 ile güncellenecek';

export const asthmaSafetyDisclaimer =
  'Bu modül klinik kararın yerine geçmez. Tedavi basamağı; tanı doğruluğu, semptom kontrolü, alevlenme riski, inhaler tekniği, uyum, komorbiditeler, Türkiye KÜB/KT ve güncel rehberlerle doğrulanmalıdır.';

export const gina2025AsthmaSteps: AsthmaStep[] = [
  {
    ageGroup: '0-5',
    step: 1,
    preferredTitle: 'Rahatlatıcı gerektiğinde SABA',
    preferredSummary:
      'Nadir viral hışıltı/seyrek semptomlarda günlük kontrol edici verilmeyebilir; alternatif tanılar ve risk faktörleri değerlendirilir.',
    alternativeTitle: 'Risk varsa düşük doz İKS düşün',
    alternativeSummary:
      'Sık viral hışıltı, alevlenme riski veya arada semptom varsa düşük doz İKS stratejisi uzman değerlendirmesiyle düşünülür.',
    reliever: 'SABA',
    martEligible: false,
    specialistReferral: false,
    notes: [
      '0–5 yaşta tanı ve tedavi kararı klinik bağlama bağımlıdır.',
      'MART rutin öneri olarak gösterilmemelidir.',
      'Nebül salbutamol dozu ve atak protokolü GINA 2025 güncel metni ve kurum protokolü ile doğrulanmalıdır.',
    ],
  },
  {
    ageGroup: '0-5',
    step: 2,
    preferredTitle: 'Günlük düşük doz İKS',
    preferredSummary:
      'Tekrarlayan semptom veya alevlenme riski olan okul öncesi çocukta günlük düşük doz İKS temel kontrol edici seçenektir.',
    alternativeTitle: 'LTRA veya aralıklı İKS stratejileri',
    alternativeSummary:
      'Seçilmiş olgularda LTRA veya viral enfeksiyon başlangıcında kısa süreli İKS stratejisi uzman değerlendirmesiyle düşünülebilir.',
    reliever: 'SABA',
    martEligible: false,
    specialistReferral: false,
    notes: [
      'Montelukast için nöropsikiyatrik yan etki uyarısı göster.',
      'İnhaler teknik, spacer/maske uyumu ve aile eğitimi kritik.',
    ],
  },
  {
    ageGroup: '0-5',
    step: 3,
    preferredTitle: 'Düşük doz İKS yetersizse tedaviyi gözden geçir',
    preferredSummary:
      'Tanı, uyum, inhaler teknik ve tetikleyiciler kontrol edildikten sonra İKS dozu artırma veya ek tedavi uzman değerlendirmesiyle düşünülür.',
    alternativeTitle: 'Uzman görüşü',
    alternativeSummary:
      'Kontrolsüz okul öncesi astım/hışıltıda çocuk göğüs uzmanı değerlendirmesi uygundur.',
    reliever: 'SABA',
    martEligible: false,
    specialistReferral: true,
    notes: ['0–5 yaşta basamak artırma öncesi alternatif tanılar düşünülmelidir.'],
  },
  {
    ageGroup: '0-5',
    step: 4,
    preferredTitle: 'Uzman değerlendirmesi',
    preferredSummary:
      'Kalıcı kontrolsüz semptom, sık alevlenme veya yüksek doz gereksiniminde uzman değerlendirmesi gerekir.',
    reliever: 'SABA',
    martEligible: false,
    specialistReferral: true,
    notes: [
      'Komorbidite, aspirasyon, immün yetmezlik, kistik fibrozis, primer siliyer diskinezi ve anatomik hava yolu sorunları dışlanmalıdır.',
    ],
  },
  {
    ageGroup: '0-5',
    step: 5,
    preferredTitle: 'Referans merkez / uzman',
    preferredSummary:
      'Ağır veya tedaviye dirençli okul öncesi astım/hışıltıda ileri değerlendirme gerekir.',
    reliever: 'SABA',
    martEligible: false,
    specialistReferral: true,
    notes: ['Bu yaş grubunda biyolojik/ileri tedaviler otomatik önerilmemelidir.'],
  },
  {
    ageGroup: '6-11',
    step: 1,
    preferredTitle: 'SABA alındığında düşük doz İKS',
    preferredSummary:
      'Seyrek semptomlarda rahatlatıcı SABA kullanıldığında eş zamanlı düşük doz İKS alınması yaklaşımı.',
    alternativeTitle: 'Günlük kontrol edici yok; ancak İKS’siz SABA-only kullanımından kaçın',
    alternativeSummary:
      'Çocukta tamamen İKS’siz yaklaşım risklidir; eğitim ve yazılı aksiyon planı verilir.',
    reliever: 'SABA + eş zamanlı düşük doz İKS',
    martEligible: false,
    specialistReferral: false,
    notes: [
      'AIR-only ICS-formoterol Step 1–2 çocuklarda rutin önerilmez.',
      'İnhaler teknik ve spacer kullanımı kontrol edilmelidir.',
    ],
  },
  {
    ageGroup: '6-11',
    step: 2,
    preferredTitle: 'Günlük düşük doz İKS',
    preferredSummary:
      'Semptomlar haftada 2–5 gün civarındaysa günlük düşük doz İKS + gerektiğinde SABA.',
    alternativeTitle: 'Düşük doz İKS SABA ile birlikte',
    alternativeSummary:
      'Uyum ve klinik bağlama göre semptom olduğunda SABA ile birlikte İKS stratejisi düşünülebilir.',
    reliever: 'SABA',
    martEligible: false,
    specialistReferral: false,
    notes: ['Kontrol ve alevlenme riski düzenli izlenmelidir.'],
  },
  {
    ageGroup: '6-11',
    step: 3,
    preferredTitle: 'Düşük doz İKS-LABA veya orta doz İKS veya çok düşük doz MART',
    preferredSummary:
      'Seçenekler: düşük doz İKS-LABA + SABA, orta doz İKS + SABA veya çok düşük doz ICS-formoterol MART.',
    alternativeTitle: 'Düşük doz İKS + LTRA',
    alternativeSummary:
      'LTRA daha az etkili olabilir; montelukast nöropsikiyatrik yan etki uyarısı gösterilmelidir.',
    reliever: 'SABA veya MART seçildiyse ICS-formoterol',
    martEligible: true,
    specialistReferral: false,
    notes: [
      'MART yalnızca formoterol içeren İKS/LABA ile olur.',
      'Salmeterol veya vilanterol içeren kombinasyonlar MART değildir.',
    ],
  },
  {
    ageGroup: '6-11',
    step: 4,
    preferredTitle: 'Orta doz İKS-LABA veya düşük doz MART; uzman değerlendirmesi düşün',
    preferredSummary:
      'Kontrolsüz hastada orta doz İKS-LABA + SABA veya düşük doz ICS-formoterol MART seçenekleri.',
    alternativeTitle: 'Tedavi artırmadan önce uyum/teknik/risk faktörlerini kontrol et',
    alternativeSummary:
      'Step 4 gereksinimi varsa çocuk astım uzmanına yönlendirme uygundur.',
    reliever: 'SABA veya MART seçildiyse ICS-formoterol',
    martEligible: true,
    specialistReferral: true,
    notes: [
      'Step 4 ihtiyacı çocuk astım uzmanı değerlendirmesi gerektirir.',
      'Tiotropium veya LTRA eklenmesi bazı olgularda düşünülebilir.',
    ],
  },
  {
    ageGroup: '6-11',
    step: 5,
    preferredTitle: 'Uzman değerlendirmesi, fenotipleme ve ek tedavi',
    preferredSummary:
      'Ağır astım şüphesinde fenotipleme, biyolojik uygunluğu ve ek tedaviler değerlendirilir.',
    alternativeTitle: 'Yüksek doz stratejiler otomatik önerilmez',
    alternativeSummary: 'Yüksek doz İKS uzun süreli yan etki riski taşır.',
    reliever: 'Bireyselleştir',
    martEligible: false,
    specialistReferral: true,
    notes: [
      'Budesonid-formoterol çocuklarda Step 5 MART olarak otomatik önerilmemelidir.',
      'Biyolojik tedavi uygunluğu yerel ruhsat/geri ödeme ve fenotipe göre değerlendirilmelidir.',
    ],
  },
  {
    ageGroup: '12plus',
    step: 1,
    preferredTitle: 'Track 1: Gerektiğinde düşük doz ICS-formoterol',
    preferredSummary: 'Seyrek semptomlarda rahatlatıcı olarak düşük doz ICS-formoterol kullanılır.',
    alternativeTitle: 'Track 2: SABA kullanıldığında düşük doz İKS',
    alternativeSummary:
      'ICS-formoterol yoksa veya uygun değilse SABA ile birlikte İKS alınması alternatiftir.',
    reliever: 'Düşük doz ICS-formoterol',
    martEligible: false,
    specialistReferral: false,
    notes: ['Track 1 tercih edilir.', 'SABA-only kullanım önerilmez.'],
  },
  {
    ageGroup: '12plus',
    step: 2,
    preferredTitle: 'Track 1: Gerektiğinde düşük doz ICS-formoterol',
    preferredSummary: 'Semptomları daha sık ama ağır olmayan adolesanda AIR-only yaklaşımı.',
    alternativeTitle: 'Track 2: Günlük düşük doz İKS + gerektiğinde SABA veya ICS-SABA',
    alternativeSummary:
      'Düzenli kontrol ediciye uyum iyi olacaksa Track 2 düşünülebilir.',
    reliever: 'Düşük doz ICS-formoterol',
    martEligible: false,
    specialistReferral: false,
    notes: ['Tedavi uyumu düşükse Track 2 riskli olabilir.'],
  },
  {
    ageGroup: '12plus',
    step: 3,
    preferredTitle: 'Track 1: Düşük doz ICS-formoterol MART',
    preferredSummary:
      'Günlük düşük doz ICS-formoterol idame + aynı inhalerden gerektiğinde rahatlatıcı.',
    alternativeTitle: 'Track 2: Düşük doz İKS-LABA + SABA veya ICS-SABA',
    alternativeSummary: 'ICS-formoterol uygun değilse veya tercih edilmiyorsa alternatif.',
    reliever: 'ICS-formoterol',
    martEligible: true,
    specialistReferral: false,
    notes: [
      'MART yalnızca formoterol içeren kombinasyonlarla yapılır.',
      'Salmeterol/vilanterol içeren İKS-LABA ile MART yapılmaz.',
    ],
  },
  {
    ageGroup: '12plus',
    step: 4,
    preferredTitle: 'Track 1: Orta doz ICS-formoterol MART',
    preferredSummary: 'Orta doz idame ICS-formoterol + gerektiğinde aynı inhaler.',
    alternativeTitle: 'Track 2: Orta doz İKS-LABA + SABA veya ICS-SABA',
    alternativeSummary: 'Kontrolsüz semptomda önce uyum/teknik/komorbidite kontrolü yapılır.',
    reliever: 'ICS-formoterol',
    martEligible: true,
    specialistReferral: false,
    notes: [
      'Alevlenme riski yüksekse Track 1 avantajlıdır.',
      'Yüksek doz gereksinimi yan etki riski nedeniyle dikkatli değerlendirilmelidir.',
    ],
  },
  {
    ageGroup: '12plus',
    step: 5,
    preferredTitle: 'Uzman değerlendirmesi, fenotipleme ve ek tedavi',
    preferredSummary:
      'Ağır astımda LAMA, biyolojik tedaviler ve fenotipe dayalı yaklaşım değerlendirilir.',
    alternativeTitle: 'Yüksek doz İKS-LABA seçilmiş olguda',
    alternativeSummary: 'Yüksek doz İKS-LABA yan etki riski nedeniyle uzman izleminde düşünülür.',
    reliever: 'Bireyselleştir',
    martEligible: true,
    specialistReferral: true,
    notes: [
      'Ağır astım tanısı öncesi zor tedavi edilen astım nedenleri dışlanmalıdır.',
      'Fenotipleme: alerjik/eozinofilik/Tip 2 inflamasyon, FeNO, eozinofil, IgE, komorbiditeler.',
    ],
  },
];
