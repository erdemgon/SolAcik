export type AsthmaAgeGroup2026 = '0-5' | '6-11' | '12plus';
export type AsthmaCareMode = 'emergency' | 'stable';
export type AsthmaStepNumber = 1 | 2 | 3 | 4 | 5;

export type AsthmaStep2026 = {
  ageGroup: AsthmaAgeGroup2026;
  step: AsthmaStepNumber;
  title: string;
  whenToThink: string;
  controller: string;
  reliever: string;
  practicalNotes: string[];
  turkeyMedicationRoles: string[];
  martStatus: 'uygun değil' | 'seçilmiş hastada' | 'uygun';
  specialistNote?: string;
  sourceVersion: string;
  sourceNote: string;
};

export type AsthmaEmergencySection = {
  ageGroup: AsthmaAgeGroup2026 | 'all';
  title: string;
  items: string[];
  alert?: string;
  sourceVersion: string;
  sourceNote: string;
};

export type AsthmaEditorCheckpoint = {
  title: string;
  items: string[];
};

export type AsthmaAgeHighlight = {
  ageGroup: AsthmaAgeGroup2026;
  title: string;
  items: string[];
};

export const gina2026AsthmaSource = {
  badge: 'Kaynak sürümü: GINA 2026 — Türkiye KÜB/KT ve kurum protokolü ile doğrulanmalıdır',
  title: 'Astım Yönetimi: GINA 2026 Temelli Sade Klinik Akış',
  disclaimer:
    'Bu içerik GINA 2026’nın birebir çevirisi değildir; eğitim amaçlı, telif uyumlu klinik özet/parafrazdır. Reçete veya klinik karar yerine geçmez.',
  sourceVersion: 'GINA 2026 Strategy Report; Sol Açık editör taslağı 2026-05-05',
  sourceNote:
    'GINA belgeleri telif koruması altındadır; tablolar/görseller birebir çoğaltılmaz. Basamak özetleri resmi rapor ve Türkiye KÜB/KT ile klinik editör kurulunca doğrulanmalıdır.',
};

export const asthmaAgeNotes2026: Record<AsthmaAgeGroup2026, string[]> = {
  '0-5': [
    'Okul öncesi hışıltıda astım tanısı klinik bağlama çok bağımlıdır; alternatif tanılar aktif düşünülür.',
    'MART/AIR bu yaş grubunda rutin gösterilmez.',
    'Çoğu çocukta anti-inflamatuvar tedavi gereksinimi, atak riski ve interval semptomlarla birlikte değerlendirilir.',
  ],
  '6-11': [
    '6-11 yaşta her basamakta İKS içeren strateji ve inhaler teknik/uyum kontrolü öne çıkar.',
    'AIR-only ICS-formoterol Step 1-2 çocuklarda rutin seçenek olarak sunulmaz.',
    'MART yalnızca seçilmiş Step 3-4 bağlamında ve formoterol içeren İKS/LABA ile düşünülür.',
  ],
  '12plus': [
    'Adolesanda Track 1 mantığı: uygun hastada ICS-formoterol rahatlatıcı, Step 3-4’te MART.',
    'Track 2 seçiliyorsa hasta düzenli İKS içeren kontrol edici almalı veya rahatlatıcıyla birlikte İKS planı net olmalıdır.',
    'SABA-only yaklaşımından kaçınılır.',
  ],
};

export const gina2026AsthmaKeyMessages = [
  'GINA 2026 çocuk ve adolesan astımında, rahatlatıcı kullanımını tek başına bronkodilatör mantığıyla bırakmamak ve mümkün olduğunca İKS içeren bir güvenlik çerçevesi kurmak ana klinik mesajlardan biridir.',
  'SABA-only yaklaşımı özellikle alevlenme riski açısından güvenli kabul edilmemelidir; her yaş grubunda tanı, risk ve uygulanabilirlik birlikte değerlendirilir.',
  'Basamak artırmadan önce tanı doğruluğu, inhaler tekniği, tedavi uyumu, tetikleyiciler ve komorbiditeler sistematik olarak kontrol edilmelidir.',
  '0-5 yaşta okul öncesi hışıltı ile astım ayrımı zor olabilir; alternatif tanılar ve izlem yanıtı tedavi kararının merkezindedir.',
  '6-11 yaşta İKS içeren yaklaşım korunur; AIR-only ICS-formoterol Step 1-2 için rutin çocuk seçeneği gibi sunulmamalıdır.',
  '6-11 yaşta MART, yalnızca seçilmiş Step 3-4 bağlamında ve formoterol içeren İKS/LABA ile düşünülmelidir.',
  '12 yaş ve üzeri adolesanda Track 1 mantığı, uygun hastada ICS-formoterol rahatlatıcı ve Step 3-4 MART yaklaşımını öne çıkarır.',
  'Salmeterol veya vilanterol içeren İKS/LABA kombinasyonları MART/SMART için kullanılmaz; bu ayrım ilaç kartlarında özellikle görünür olmalıdır.',
  'Step 5, sık alevlenme, düşük akciğer fonksiyonu, yüksek doz gereksinimi veya tanı belirsizliğinde ağır astım merkezi/uzman değerlendirmesi gerektirir.',
  'Bu özet GINA 2026’nın birebir çevirisi değildir; Sol Açık editör kurulunun klinik uygulama notu olarak resmi rapor ve Türkiye KÜB/KT ile doğrulanmalıdır.',
];

export const gina2026AsthmaAgeHighlights: AsthmaAgeHighlight[] = [
  {
    ageGroup: '0-5',
    title: '0-5 yaş klinik vurgu',
    items: [
      'Astım tanısı, tekrarlayan hışıltı fenotipi ve alternatif tanılar birlikte ele alınır.',
      'MART/AIR rutin yaklaşım olarak gösterilmez.',
      'Spacer + maske/ağızlık uyumu ve aile eğitimi tedavi başarısının belirleyicisidir.',
      'Düşük doz İKS çerçevesi, interval semptom ve atak riskiyle birlikte düşünülür.',
      'Kontrolsüz tabloda aspirasyon, PCD, KF, immün yetmezlik ve anatomik hava yolu sorunları yeniden sorgulanır.',
    ],
  },
  {
    ageGroup: '6-11',
    title: '6-11 yaş klinik vurgu',
    items: [
      'Tamamen İKS’siz SABA-only yaklaşımından kaçınılır.',
      'Step 1-2 için AIR-only ICS-formoterol çocuklarda rutin seçenek gibi sunulmaz.',
      'Günlük düşük doz İKS, düşük doz İKS-LABA, orta doz İKS ve seçilmiş MART seçenekleri basamak ve riskle eşleştirilir.',
      'MART yalnızca formoterol içeren İKS/LABA ile olur; salmeterol/vilanterol kombinasyonları dışarıda bırakılır.',
      'Step 4 ve üzeri gereksinimde çocuk astım uzmanı değerlendirmesi erken düşünülür.',
    ],
  },
  {
    ageGroup: '12plus',
    title: '12 yaş ve üzeri klinik vurgu',
    items: [
      'Track 1, uygun hastada ICS-formoterol rahatlatıcı yaklaşımını öne çıkarır.',
      'Step 1-2’de AIR, Step 3-4’te MART mantığı adolesan için pratik akışın merkezindedir.',
      'Track 2 seçilecekse düzenli İKS içeren kontrol edici veya SABA ile eş zamanlı İKS planı net olmalıdır.',
      'SABA-only yaklaşımı güvenli bir varsayım olarak bırakılmaz.',
      'Step 5’te fenotipleme, biyolojik uygunluğu ve komorbiditeler uzman merkezde değerlendirilir.',
    ],
  },
];

export const gina2026AsthmaSteps: AsthmaStep2026[] = [
  {
    ageGroup: '0-5',
    step: 1,
    title: 'Seyrek semptom / düşük risk: rahatlatıcı ve izlem',
    whenToThink: 'Nadir viral hışıltı, interval semptom yok veya çok seyrek, ağır atak öyküsü yok.',
    controller: 'Günlük kontrol edici çoğu hastada gerekmez; risk varsa düşük doz İKS düşünülür.',
    reliever: 'SABA; cihaz ve doz kurum protokolü/KÜB ile doğrulanır.',
    practicalNotes: [
      'Tanı belirsizse alternatif tanıları dışla.',
      'Aileye atak eylem planı ve inhaler/spacer eğitimi ver.',
      'Sık SABA veya tekrar atak olursa Step 2 mantığına geçmeden önce tekrar değerlendir.',
    ],
    turkeyMedicationRoles: ['saba_pmdi_nebule', 'low_dose_ics_pmdi_nebule'],
    martStatus: 'uygun değil',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: '0-5',
    step: 2,
    title: 'Tekrarlayan semptom/atak riski: düşük doz İKS çerçevesi',
    whenToThink: 'Tekrarlayan hışıltı, interval semptom, atak riski veya daha önce sistemik steroid/acil başvuru öyküsü.',
    controller: 'Düşük doz İKS; seçilmiş olguda LTRA veya aralıklı İKS stratejisi uzman kararıyla.',
    reliever: 'SABA.',
    practicalNotes: [
      'Spacer + maske/ağızlık uyumu belirleyicidir.',
      'Montelukast düşünülürse nöropsikiyatrik yan etki danışmanlığı gerekir.',
      'Tedavi yanıtı ve tanı 2-3 ay içinde yeniden sorgulanır.',
    ],
    turkeyMedicationRoles: ['low_dose_ics_pmdi_nebule', 'saba_pmdi_nebule', 'ltra'],
    martStatus: 'uygun değil',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: '0-5',
    step: 3,
    title: 'Düşük doz İKS yetersiz: tanı/teknik/uyum kontrolü',
    whenToThink: 'Kontrolsüz semptom veya tekrarlayan atak; önce tanı, teknik, uyum ve tetikleyiciler kontrol edilir.',
    controller: 'İKS dozu artırma veya ek tedavi yalnızca klinik bağlam ve uzman değerlendirmesiyle.',
    reliever: 'SABA.',
    practicalNotes: [
      'Aspirasyon, anatomik hava yolu, PCD, KF, immün yetmezlik ve yabancı cisim gibi alternatifleri düşün.',
      'Objektif veri mümkünse kaydet; büyüme ve yan etki izlemini planla.',
    ],
    turkeyMedicationRoles: ['low_dose_ics_pmdi_nebule', 'saba_pmdi_nebule', 'ltra'],
    martStatus: 'uygun değil',
    specialistNote: 'Çocuk göğüs/alerji değerlendirmesi uygundur.',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: '0-5',
    step: 4,
    title: 'Kalıcı kontrolsüz okul öncesi hışıltı: uzman planı',
    whenToThink: 'Sık atak, kalıcı semptom, yüksek doz gereksinimi veya tanı belirsizliği.',
    controller: 'Uzman tarafından bireyselleştirilir; otomatik yüksek doz önerme.',
    reliever: 'SABA; acil plan yazılı olmalı.',
    practicalNotes: ['Komorbiditeleri ve çevresel maruziyeti sistematik gözden geçir.', 'Aileye cihaz tekniğini gösterterek kontrol ettir.'],
    turkeyMedicationRoles: ['low_dose_ics_pmdi_nebule', 'saba_pmdi_nebule'],
    martStatus: 'uygun değil',
    specialistNote: 'Uzman/referans merkez gerekir.',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: '0-5',
    step: 5,
    title: 'Ağır/dirençli tablo: referans merkez',
    whenToThink: 'Tedaviye direnç, ağır atak, büyüme/yan etki sorunu veya atipik bulgu.',
    controller: 'Referans merkezde fenotip ve ayırıcı tanıya göre planlanır.',
    reliever: 'Bireyselleştirilmiş yazılı acil plan.',
    practicalNotes: ['Bu yaşta biyolojik/ileri tedavi otomatik önerilmez.', 'Kurum protokolü ve uzman kurul kararı önceliklidir.'],
    turkeyMedicationRoles: [],
    martStatus: 'uygun değil',
    specialistNote: 'Referans merkez gerekir.',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: '6-11',
    step: 1,
    title: 'Seyrek semptom: SABA ile birlikte İKS güvenliği',
    whenToThink: 'Semptomlar seyrek; atak riski ve SABA kullanım sıklığı düşük.',
    controller: 'Rahatlatıcı kullanıldığında düşük doz İKS verilmesini sağlayan plan; tamamen İKS’siz yaklaşım risklidir.',
    reliever: 'SABA; eş zamanlı İKS planı net yazılır.',
    practicalNotes: ['AIR-only ICS-formoterol bu yaşta rutin Step 1 seçeneği olarak gösterilmez.', 'Spacer tekniği ve yazılı aksiyon planı gerekir.'],
    turkeyMedicationRoles: ['saba_pmdi_nebule', 'low_dose_ics_pmdi_nebule'],
    martStatus: 'uygun değil',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: '6-11',
    step: 2,
    title: 'Düşük doz İKS idame',
    whenToThink: 'Semptomlar Step 1’den daha sık veya kontrol edici gereksinimi belirgin.',
    controller: 'Günlük düşük doz İKS; alternatifler klinik bağlama göre değerlendirilir.',
    reliever: 'SABA.',
    practicalNotes: ['Kontrol, alevlenme riski, büyüme ve teknik düzenli izlenir.', 'Sık SABA ihtiyacı basamak/uyum değerlendirmesi gerektirir.'],
    turkeyMedicationRoles: ['low_dose_ics_pmdi_nebule', 'saba_pmdi_nebule', 'ltra'],
    martStatus: 'uygun değil',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: '6-11',
    step: 3,
    title: 'Düşük doz İKS-LABA / orta doz İKS / seçilmiş MART',
    whenToThink: 'Günlük düşük doz İKS ile kontrol yetersiz; önce tanı, uyum ve teknik doğrulanır.',
    controller: 'Düşük doz İKS-LABA veya orta doz İKS; seçilmiş hastada çok düşük/düşük doz ICS-formoterol MART.',
    reliever: 'SABA veya MART seçildiyse aynı ICS-formoterol inhaleri.',
    practicalNotes: ['MART sadece formoterol içeren İKS/LABA ile olur.', 'Salmeterol/vilanterol kombinasyonları MART değildir.', 'Montelukast alternatifi daha düşük etkinlik ve yan etki danışmanlığıyla düşünülür.'],
    turkeyMedicationRoles: ['ics_laba_formoterol_child', 'ics_laba_salmeterol_child', 'medium_dose_ics', 'saba_pmdi_nebule', 'ltra'],
    martStatus: 'seçilmiş hastada',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: '6-11',
    step: 4,
    title: 'Orta doz İKS-LABA veya düşük doz MART; uzman düşün',
    whenToThink: 'Step 3’e rağmen kontrolsüzlük veya alevlenme riski sürüyor.',
    controller: 'Orta doz İKS-LABA + SABA veya uygun hastada düşük doz ICS-formoterol MART.',
    reliever: 'SABA veya MART seçildiyse ICS-formoterol.',
    practicalNotes: ['Basamak artırmadan önce teknik/uyum/tetikleyici/komorbidite kontrol listesi zorunlu.', 'Yüksek doz İKS yan etki riski nedeniyle otomatik tercih edilmez.'],
    turkeyMedicationRoles: ['ics_laba_formoterol_child', 'ics_laba_salmeterol_child', 'medium_dose_ics', 'saba_pmdi_nebule'],
    martStatus: 'seçilmiş hastada',
    specialistNote: 'Çocuk astım uzmanı değerlendirmesi düşünülür.',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: '6-11',
    step: 5,
    title: 'Ağır astım değerlendirmesi',
    whenToThink: 'Step 4’e rağmen kontrolsüzlük, sık ağır atak, düşük akciğer fonksiyonu veya tanı belirsizliği.',
    controller: 'Fenotipleme, biyolojik uygunluğu ve ek tedaviler uzman merkezde değerlendirilir.',
    reliever: 'Bireyselleştirilir.',
    practicalNotes: ['Zor tedavi edilen astım nedenleri dışlanmadan ağır astım tanısı koyma.', 'Biyolojik ajan seçimi ayrı modüldeki KÜB/KT ve doz tablosuyla doğrulanır.'],
    turkeyMedicationRoles: ['biologics', 'medium_dose_ics', 'ics_laba_formoterol_child', 'ics_laba_salmeterol_child'],
    martStatus: 'uygun değil',
    specialistNote: 'Ağır astım merkezi/uzman gerekir.',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: '12plus',
    step: 1,
    title: 'Track 1: gerektiğinde düşük doz ICS-formoterol',
    whenToThink: 'Seyrek semptomlu adolesan; alevlenme riskini azaltacak İKS içeren rahatlatıcı tercih edilir.',
    controller: 'Ayrı günlük idame gerekmeyebilir; rahatlatıcı düşük doz ICS-formoterol anti-inflamatuvar etki sağlar.',
    reliever: 'Düşük doz ICS-formoterol; ürün/KÜB ve yaş uygunluğu doğrulanır.',
    practicalNotes: ['Track 2 gerekiyorsa SABA kullanıldığında İKS alma planı açık olmalıdır.', 'SABA-only yaklaşımından kaçın.'],
    turkeyMedicationRoles: ['ics_laba_formoterol_adolescent', 'saba_pmdi_nebule', 'low_dose_ics_pmdi_nebule'],
    martStatus: 'uygun',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: '12plus',
    step: 2,
    title: 'Track 1: gerektiğinde düşük doz ICS-formoterol veya düşük doz İKS',
    whenToThink: 'Semptom sıklığı artmış ama ağır olmayan hasta; uyum ve erişim belirleyicidir.',
    controller: 'Track 1’de gerektiğinde ICS-formoterol; Track 2’de günlük düşük doz İKS.',
    reliever: 'ICS-formoterol veya Track 2’de SABA/ICS-SABA planı.',
    practicalNotes: ['Düzenli İKS’ye uyum zayıfsa SABA temelli Track 2 riskli olabilir.', 'Cihaz eğitimi ve eylem planı ver.'],
    turkeyMedicationRoles: ['ics_laba_formoterol_adolescent', 'low_dose_ics_pmdi_nebule', 'saba_pmdi_nebule'],
    martStatus: 'uygun',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: '12plus',
    step: 3,
    title: 'Düşük doz ICS-formoterol MART',
    whenToThink: 'Günlük idame gerektiren adolesan; alevlenme riskini azaltmak için tek inhaler strateji uygunsa.',
    controller: 'Düşük doz ICS-formoterol idame.',
    reliever: 'Aynı ICS-formoterol inhaleri gerektiğinde.',
    practicalNotes: ['Formoterol dışı LABA kombinasyonları MART değildir.', 'Toplam günlük inhalasyon sınırı ürün ve rehberle doğrulanır.', 'Aynı anda başka LABA verilmemelidir.'],
    turkeyMedicationRoles: ['ics_laba_formoterol_adolescent', 'ics_laba_salmeterol_adolescent'],
    martStatus: 'uygun',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: '12plus',
    step: 4,
    title: 'Orta doz ICS-formoterol MART veya orta doz İKS-LABA',
    whenToThink: 'Step 3’e rağmen semptom/atak riski sürüyor.',
    controller: 'Track 1: orta doz ICS-formoterol MART; Track 2: orta doz İKS-LABA + uygun rahatlatıcı.',
    reliever: 'ICS-formoterol veya Track 2’ye göre SABA/ICS-SABA.',
    practicalNotes: ['Basamak artırmadan önce tanı, teknik, uyum, maruziyet ve komorbidite kontrol edilir.', 'Yüksek doz gereksinimi uzman değerlendirmesine yaklaştırır.'],
    turkeyMedicationRoles: ['ics_laba_formoterol_adolescent', 'ics_laba_salmeterol_adolescent', 'medium_dose_ics'],
    martStatus: 'uygun',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: '12plus',
    step: 5,
    title: 'Uzman merkez: fenotipleme ve ek tedavi',
    whenToThink: 'Sık atak, düşük fonksiyon, Step 4’e rağmen kontrolsüzlük veya ağır astım şüphesi.',
    controller: 'LAMA, biyolojikler, yüksek doz stratejiler ve komorbidite yönetimi uzman merkezde değerlendirilir.',
    reliever: 'Bireyselleştirilir; MART sürüyorsa ürün sınırları doğrulanır.',
    practicalNotes: ['Alerjik/eozinofilik/Tip 2 fenotip; FeNO, eozinofil, IgE ve komorbiditeler değerlendirilir.', 'Biyolojik ilaç dozu ve endikasyonları ayrı modülde KÜB/KT ile kontrol edilir.'],
    turkeyMedicationRoles: ['biologics', 'ics_laba_formoterol_adolescent', 'ics_laba_salmeterol_adolescent', 'lama'],
    martStatus: 'uygun',
    specialistNote: 'Ağır astım merkezi gerekir.',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
];

export const asthmaEmergencySections2026: AsthmaEmergencySection[] = [
  {
    ageGroup: 'all',
    title: 'İlk 1 dakika: ağırlığı fark et',
    items: [
      'Bilinç, konuşma/beslenme, siyanoz, yardımcı kas kullanımı ve sessiz akciğer kontrolü.',
      'SpO2, nabız, solunum sayısı ve mümkünse PEF/FEV1 değerlendirilir.',
      'Anafilaksi, yabancı cisim, pnömoni, pnömotoraks ve kalp hastalığı ayırıcı tanıda tutulur.',
    ],
    alert: 'Konfüzyon, sessiz akciğer, konuşamama, ağır hipoksemi veya kötü SABA yanıtı varsa yaşamı tehdit eden atak olabilir; kurum acil protokolü uygulanır.',
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: 'all',
    title: 'Acil tedavi checklist’i',
    items: [
      'Oksijen hedefi, tekrarlayan hızlı bronkodilatör, sistemik steroid ve gerekirse ipratropium/magnezyum kurum protokolüne göre planlanır.',
      'Bu modül akut ilaç doz tablosu değildir; dozlar yerel acil protokol ve KÜB/KT ile doğrulanır.',
      'Yanıt yetersizse yoğun bakım/çocuk göğüs/acil uzmanı erken çağrılır.',
    ],
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
  {
    ageGroup: 'all',
    title: 'Taburculuk/atak sonrası',
    items: [
      'İKS içeren tedavi başlat/optimize et; SABA-only kalmasın.',
      'İnhaler tekniğini gösterterek kontrol et; yazılı astım eylem planı ver.',
      'Tetikleyiciler, komorbiditeler ve sık rahatlatıcı kullanımı sorgulanır.',
      '2-7 gün içinde kontrol veya ağır atak sonrası uzman değerlendirmesi planlanır.',
    ],
    sourceVersion: gina2026AsthmaSource.sourceVersion,
    sourceNote: gina2026AsthmaSource.sourceNote,
  },
];

export const asthmaEditorCheckpoints2026: AsthmaEditorCheckpoint[] = [
  {
    title: 'GINA 2026 karşılaştırma',
    items: [
      'Her yaş grubunda Step 1-5 özetleri resmi GINA 2026 raporuyla satır satır klinik olarak doğrulanacak.',
      'GINA tabloları/görselleri birebir alınmayacak; Sol Açık dili parafraz ve klinik checklist olarak kalacak.',
      'AIR/MART sınırları ve yaş grubu uygunluğu ürün bazında tekrar kontrol edilecek.',
    ],
  },
  {
    title: 'Türkiye ürün doğrulaması',
    items: [
      'Tüm ticari isimler, formlar, kuvvetler ve yaş sınırları Türkiye KÜB/KT ve güncel piyasa bilgisiyle kontrol edilecek.',
      'Muadil ürünler eksikse data/asthma/turkeyAsthmaInhalers.ts dosyasına eklenecek.',
      'Geri ödeme/ruhsat notları reçete kararı gibi gösterilmeyecek.',
    ],
  },
  {
    title: 'Klinik güvenlik',
    items: [
      'Modül reçete çıktısı üretmeyecek; her kartta doğrulama ve klinisyen sorumluluğu korunacak.',
      'Acil dozlar ayrı doğrulanmış protokol olmadan ayrıntılı doz olarak gösterilmeyecek.',
      'Step 5 ve biyolojik tedaviler uzman merkez uyarısıyla sınırlandırılacak.',
    ],
  },
];
