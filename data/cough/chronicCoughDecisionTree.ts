export type CoughTreeNode = {
  id: string;
  title: string;
  body: string[];
  warning?: string;
  options: {
    label: string;
    nextId?: string;
    result?: string;
  }[];
};

export const chronicCoughSource = {
  title: 'Kronik Öksürük: Çocukta Öksürüğe Yaklaşım',
  basis:
    'Hocanın kronik öksürük sunumu; CHEST 2020, ERS 2020 ve Italian Algorithm 2020 akışlarının eğitim amaçlı özetlenmiş klinik mantığı.',
  note:
    'Bu modül sunumdaki algoritma mantığını karar ağacı olarak düzenler; özgün slayt veya kılavuz tablolarını birebir çoğaltmaz.',
};

export const specificCoughPointers = [
  'Ani başlangıç, boğulma/nefes tıkanması öyküsü',
  'Monofonik veya tek taraflı wheezing',
  'Persistan ıslak/sekretuar öksürük',
  'Hemoptizi, kilo kaybı, büyüme geriliği, gece terlemesi',
  'Rekürren pnömoni veya persistan radyolojik anormallik',
  'Fokal oskültasyon bulgusu, çomak parmak, hipoksemi',
  'Yutma güçlüğü, aspirasyon riski, nöromusküler hastalık',
  'Kistik fibrozis, PCD, immün yetmezlik, TB temas veya nadir enfeksiyon riski',
  'Kardiyak hastalık, pulmoner hipertansiyon veya ödem şüphesi',
];

export const chronicCoughTree: CoughTreeNode[] = [
  {
    id: 'start',
    title: 'Kronik öksürük tanımı',
    body: [
      '<15 yaş çocukta 4 haftadan uzun süren öksürük kronik öksürük olarak ele alınır.',
      'İlk değerlendirmede öykü, öksürük tipi, fizik muayene, akciğer grafisi ve işbirliği yapan çocukta spirometri düşünülür.',
    ],
    options: [
      { label: '4 haftadan uzun', nextId: 'initial' },
      {
        label: '4 haftadan kısa',
        result:
          'Akut/subakut öksürük olarak değerlendir; ağır bulgu, boğulma öyküsü veya altta yatan hastalık varsa erken uzman değerlendirmesi düşün.',
      },
    ],
  },
  {
    id: 'initial',
    title: 'İlk değerlendirme',
    body: [
      'Spesifik öksürük ipuçları ve klasik öksürük özelliklerini sorgula.',
      'Akciğer grafisi çek; çocuk yapabiliyorsa spirometri yap. FeNO varsa astım olasılığında yardımcı olabilir.',
    ],
    options: [
      { label: 'Astım lehine bulgu var', nextId: 'asthma' },
      { label: 'Yabancı cisim şüphesi var', nextId: 'foreignBody' },
      { label: 'Klasik öksürük paterni var', nextId: 'classicPattern' },
      { label: 'Islak/sekretuar öksürük', nextId: 'wetCough' },
      { label: 'Kuru ve spesifik bulgu yok', nextId: 'dryNonspecific' },
      { label: 'Diğer spesifik ipucu var', nextId: 'specificWorkup' },
    ],
  },
  {
    id: 'asthma',
    title: 'Astım olasılığı',
    body: [
      'Kuru öksürük + bilateral hışıltı veya eforla dispne öyküsü astım lehine olabilir.',
      'Muayenede ekspiryumda wheezing, reversibl obstrüksiyon veya FeNO yüksekliği destekleyebilir.',
    ],
    options: [
      {
        label: '2–4 hafta tedavi denemesiyle düzeldi',
        result: 'Astım tedavisi ve izlemi sürdür; inhaler teknik ve uyumu kontrol et.',
      },
      {
        label: 'Düzelmedi',
        nextId: 'initial',
      },
    ],
  },
  {
    id: 'foreignBody',
    title: 'Retansiyone yabancı cisim olasılığı',
    body: [
      'Boğulma/nefes tıkanması öyküsü, ani başlangıç, tek taraflı bulgu veya grafide hava hapsi yabancı cismi düşündürür.',
    ],
    warning:
      'Yabancı cisim olasılığı dışlanmadan uzun izlem veya ampirik tedaviyle zaman kaybedilmemelidir.',
    options: [
      {
        label: 'Şüphe yüksek',
        result:
          'Yabancı cismin çıkarılması/dışlanması için acil rijid bronkoskopi amacıyla yönlendir.',
      },
      { label: 'Şüphe düşük', nextId: 'initial' },
    ],
  },
  {
    id: 'classicPattern',
    title: 'Klasik öksürük özellikleri',
    body: [
      'Baskılanabilirlik, dikkat dağılınca azalma veya telkine yatkınlık habitüel öksürüğü düşündürebilir.',
      'Havlar/metalik öksürük ve bebeklikten beri varlık trakeomalazi lehine olabilir.',
      'Paroksismal öksürük ve inspiratuvar derin soluk boğmaca açısından sorgulanır.',
    ],
    options: [
      {
        label: 'Habitüel / tik öksürük düşündürüyor',
        result:
          'Tanıyı klinik bağlamla doğrula; aile eğitimi, tetikleyici yönetimi ve gerekirse psikososyal destek düşün.',
      },
      {
        label: 'Trakeomalazi düşündürüyor',
        result:
          'Havayolu anomalisi açısından çocuk göğüs uzmanı değerlendirmesi; gerekirse bronkoskopi planı.',
      },
      {
        label: 'Boğmaca düşündürüyor',
        result: 'Boğmaca için uygun test ve tedavi/izolasyon yaklaşımını yerel protokolle değerlendir.',
      },
    ],
  },
  {
    id: 'wetCough',
    title: 'Persistan ıslak / sekretuar öksürük',
    body: [
      '4 haftadan uzun süren ıslak öksürük PBB, bronşektazi, TB, KF, PCD veya aspirasyon gibi nedenleri düşündürür.',
      'Balgam kültürü alınabiliyorsa alınır; PBB olasılığında kılavuza uygun antibiyotik tedavisi düşünülür.',
    ],
    options: [
      {
        label: '2–4 hafta antibiyotikle düzeldi',
        result:
          'Muhtemel PBB; 3–4 ay içinde tekrar ve risk faktörleri açısından yeniden değerlendir.',
      },
      {
        label: '4 hafta tedaviye rağmen sürüyor',
        nextId: 'wetPersistent',
      },
      {
        label: 'Tekrarlıyor',
        nextId: 'wetPersistent',
      },
    ],
  },
  {
    id: 'wetPersistent',
    title: 'Persistan/tekrarlayan ıslak öksürük',
    body: [
      'Bronşektazi, rekürren pnömoni, aspirasyon, kronik/nadir enfeksiyon, interstisyel hastalık, havayolu anomalisi ve kardiyak nedenler düşünülür.',
      'HRCT, bronkoskopi/BAL, ter testi, PCD taraması, immün değerlendirme, TB testleri ve yutma çalışmaları klinik bağlama göre planlanabilir.',
    ],
    warning: 'Erken çocuk göğüs uzmanı değerlendirmesi uygundur.',
    options: [
      {
        label: 'Bronşektazi/KF/PCD/immün yetmezlik riski',
        result:
          'Ter testi, PCD taraması, immün değerlendirme, HRCT ve mikrobiyolojik incelemeleri klinik bağlama göre planla.',
      },
      {
        label: 'Aspirasyon/yutma riski',
        result:
          'Yutma çalışması, videofloroskopi, pH-impedans/pHmetri, bronkoskopi+BAL veya ilgili değerlendirmeleri düşün.',
      },
      {
        label: 'Kronik/nadir enfeksiyon riski',
        result:
          'TB, non-TB mikobakteri, mantar/parazit ve diğer enfeksiyonlar için balgam/BAL, kan testleri ve görüntüleme planla.',
      },
      {
        label: 'Kardiyak/pulmoner HT şüphesi',
        result: 'Pediatrik kardiyoloji, EKG, EKO ve gerekirse ileri kardiyak değerlendirme düşün.',
      },
    ],
  },
  {
    id: 'dryNonspecific',
    title: 'Kuru nonspesifik öksürük',
    body: [
      'Spesifik bulgu yoksa 2–4 hafta izlem ve yeniden değerlendirme uygundur.',
      'İrritanlar, enfeksiyon, alerji ve çevresel tetikleyiciler gözden geçirilir.',
    ],
    options: [
      {
        label: 'Kendiliğinden düzeldi',
        result: 'Tam düzelene kadar izle; gereksiz tetkik/tedaviden kaçın.',
      },
      {
        label: 'Islak hale geldi veya spesifik bulgu gelişti',
        nextId: 'wetCough',
      },
      {
        label: 'Persistan kuru öksürük',
        nextId: 'dryPersistent',
      },
    ],
  },
  {
    id: 'dryPersistent',
    title: 'Persistan kuru öksürük',
    body: [
      'Alerji testi, eşlik eden enfeksiyonların dışlanması ve irritan kontrolü düşünülür.',
      'Seçilmiş olgularda 4–8 haftalık İKS tedavi denemesi sunumdaki akışta yer alır.',
    ],
    options: [
      {
        label: 'İKS denemesiyle düzeldi',
        result:
          'Tedaviyi planlı sürede kesip nüks açısından izle; astım olasılığı ve inhaler teknik/uyumu yeniden değerlendir.',
      },
      {
        label: 'Düzelmedi veya nüks etti',
        nextId: 'specificWorkup',
      },
    ],
  },
  {
    id: 'specificWorkup',
    title: 'Spesifik hastalık araştırması',
    body: [
      'Anormal grafi, anormal spirometri, fokal bulgu veya sistemik ipuçları varsa özgül tanıya yönelik değerlendirme yapılır.',
      'Gereksinime göre kan testleri, IgE/RAST/prick, CRP/ESR, FeNO, balgam, ter testi, PPD/IGRA, KBB, HRCT, FOB/BAL ve diğer testler düşünülür.',
    ],
    warning: 'Spesifik ipucu veya kırmızı bayrak varsa çocuk göğüs uzmanı değerlendirmesi geciktirilmemelidir.',
    options: [
      { label: 'Başa dön', nextId: 'start' },
    ],
  },
];

