export type HomeVentProblemKey =
  | 'desaturation'
  | 'highPressure'
  | 'lowPressure'
  | 'apneaLowVentilation'
  | 'powerFailure'
  | 'secretions'
  | 'interfaceInjury'
  | 'feverDistress'
  | 'trachDislodgement'
  | 'caregiverExhaustion';

export type HomeVentSupportType = 'cpap' | 'niv' | 'invasive';
export type HomeVentAgeBandKey = 'infant' | 'preschool' | 'school' | 'adolescent';

export const homeVentilationSource = {
  badge:
    'Kaynak yaklaşımı: Kullanıcı kitap bölümü taslağı 01.09.2025 + ATS 2016 pediatrik kronik ev invaziv ventilasyon + ERS 2022 pediatrik uzun dönem noninvaziv solunum desteği + ATS 2019 çocukta ev oksijeni + CHEST 2023 nöromüsküler zayıflık solunum yönetimi',
  warning:
    'Bu modül ev ventilatörü ayarı önermez, reçete üretmez ve acil müdahale protokolünün yerine geçmez. Ventilatör modu/ayarları, oksijen eklenmesi, alarm sınırları, maske/kanül seçimi ve izlem sıklığı çocuk göğüs, yoğun bakım, uyku/ventilasyon ekibi, cihaz firması eğitimi ve kurum protokolü ile doğrulanmalıdır.',
  sources: [
    {
      title: 'ATS Clinical Practice Guideline: Pediatric Chronic Home Invasive Ventilation, 2016',
      url: 'https://pubmed.ncbi.nlm.nih.gov/27082538/',
    },
    {
      title: 'ERS Statement on paediatric long-term noninvasive respiratory support, 2022',
      url: 'https://doi.org/10.1183/13993003.01404-2021',
    },
    {
      title: 'ATS Clinical Practice Guideline: Home Oxygen Therapy for Children, 2019',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30707039/',
    },
    {
      title: 'CHEST Guideline: Respiratory Management of Patients with Neuromuscular Weakness, 2023',
      url: 'https://journal.chestnet.org/article/S0012-3692(22)04064-4/fulltext',
    },
  ],
};

export const supportTypeCards: {
  key: HomeVentSupportType;
  title: string;
  shortUse: string;
  whatToCheck: string[];
}[] = [
  {
    key: 'cpap',
    title: 'CPAP',
    shortUse:
      'Obstrüktif uyku ilişkili solunum bozukluğu veya üst hava yolu kollapsında pozitif basınç desteği.',
    whatToCheck: [
      'Maske uyumu, kaçak, bası yarası ve nazal konfor',
      'Uyku semptomları, horlama, desatürasyon ve gündüz uykululuk',
      'Cihaz kullanım süresi, kaçak raporu ve aile uyumu',
    ],
  },
  {
    key: 'niv',
    title: 'NIV / bilevel ventilasyon',
    shortUse:
      'Kronik alveoler hipoventilasyon, nöromüsküler zayıflık, göğüs duvarı hastalığı veya seçilmiş kronik akciğer/hava yolu yükünde uzun dönem destek.',
    whatToCheck: [
      'Gece hipoventilasyon bulguları ve CO2 izlemi',
      'Gündüz semptomları, sabah baş ağrısı, yorgunluk ve büyüme',
      'İnterfaz, kaçak, senkroni, tetikleme ve tolerans',
    ],
  },
  {
    key: 'invasive',
    title: 'Trakeostomi ile invaziv ventilasyon',
    shortUse:
      'NIV ile yeterli destek sağlanamayan, hava yolu koruma/sekresyon veya uzun süreli yüksek destek gereksinimi olan kompleks çocuklarda uzman ekip kararı.',
    whatToCheck: [
      'Trakeostomi acil planı, yedek kanül ve aspirasyon ekipmanı',
      'Uyanık eğitimli bakım veren sürekliliği',
      'Yedek ventilatör, batarya, ambu ve acil iletişim planı',
    ],
  },
];

export const homeVentReadinessSections = [
  {
    title: 'Tıbbi stabilite',
    items: [
      'Ventilatör modu ve ayarları klinik olarak stabil dönemde netleşmiş',
      'Oksijen gereksinimi ve hedef satürasyon aralığı yazılı planda belirtilmiş',
      'Beslenme, aspirasyon riski, sekresyon ve hava yolu temizliği planı düzenlenmiş',
      'Son enfeksiyon/alevlenme sonrası stabil izlem süresi kurum protokolüne uygun',
      'Taburculuk öncesi gece izlemi veya uygun uyku/CO2 değerlendirmesi planlanmış',
    ],
  },
  {
    title: 'Bakım veren eğitimi',
    items: [
      'En az iki aile bakım vereni cihaz, alarm, maske/kanül ve aspirasyon eğitimini tamamlamış',
      'Bakım verenler acil senaryoda ambu, aspirasyon ve cihaz değişimini gösterebilmiş',
      'Yazılı acil plan, cihaz firma iletişimi ve hastane/112 başvuru eşiği aileye verilmiş',
      'Gece uykusunda gözetim gereksinimi ve bakım yükü gerçekçi biçimde konuşulmuş',
    ],
  },
  {
    title: 'Ev ve ekipman hazırlığı',
    items: [
      'Elektrik altyapısı, priz, uzatma/çoklayıcı güvenliği ve batarya süresi değerlendirilmiş',
      'Cihaz, devre, filtre, humidifikasyon, maske/kanül ve sarf malzeme listesi tamamlanmış',
      'Pulse oksimetre, aspiratör, ambu ve yedek ekipman evde hazır',
      'Evde sigara/duman, enfeksiyon kontrolü ve cihaz temizlik rutini konuşulmuş',
    ],
  },
];

export const homeVentEquipmentChecklist = [
  'Ana ventilatör ve çocuk için tanımlı ayar/profil',
  'İnvaziv veya ventilatöre tam bağımlı çocukta yedek ventilatör',
  'Yeterli batarya ve şarj planı',
  'Kendiliğinden şişen balon, uygun maske veya trakeostomi bağlantısı',
  'Taşınabilir aspiratör ve aspirasyon kateterleri',
  'Pulse oksimetre ve uygun prob',
  'Nemlendirici veya HME planı; devre ve su haznesi bakımı',
  'Yedek devre, filtre, maske, başlık, adaptör ve bağlantılar',
  'Trakeostomili çocukta aynı boy ve bir küçük boy yedek kanül',
  'Oksijen yalnızca reçete/protokol varsa; bağlantı ve güvenlik eğitimi',
  'Nebülizatör, airway clearance ve MI-E/cough assist gereksinimi varsa cihaz planı',
  'Acil iletişim listesi, cihaz firması, servis ve hastane başvuru planı',
];

export const homeVentFollowUpChecklist = [
  'Cihaz kullanım saati, kaçak, alarm kayıtları ve aile gözlemi',
  'Uyku kalitesi, horlama, uyanma, sabah baş ağrısı, gündüz uyuklama',
  'SpO2 trendi; gereğinde transkutan CO2, kapiller/venöz kan gazı veya PSG/uyku çalışması',
  'Büyüme, kilo alımı, beslenme ve enerji düzeyi',
  'Maske bası yarası, nazal tıkanıklık, göz irritasyonu, midface etkisi',
  'Sekresyon yükü, öksürük etkinliği ve hava yolu temizliği rutini',
  'Enfeksiyon, hastane başvurusu, antibiyotik ve steroid öyküsü',
  'Trakeostomi stoma, granülasyon, kanül değişim sıklığı ve acil set kontrolü',
  'Aile bakım yükü, tükenmişlik, okul/ulaşım ve sosyal destek',
  'Cihaz bakım tarihi, filtre/devre değişimi ve üretici bakım önerileri',
];

export const homeVentParameterPrinciples = [
  'Ayarlar ideal ağırlık, akciğer mekaniği, altta yatan hastalık ve yoğun bakımda tolere edilen parametreler üzerinden bireyselleştirilir.',
  'Tidal volüm hedefi çoğu olguda yaklaşık 8–10 ml/kg ideal ağırlık olarak düşünülür; restriktif hastalıkta daha düşük hedef gerekebilir.',
  'PEEP sıklıkla 4–6 cmH2O aralığındadır; havayolu malazisi veya parankimal akciğer hastalığında daha yüksek gereksinim olabilir.',
  'FiO2 mümkün olan en düşük etkili düzeyde tutulur; kaynak metinde SpO2 >%92 hedefi vurgulanmıştır.',
  'Tetik hassasiyeti, rise time ve alarm sınırları hasta-ventilatör senkronisi ve güvenlik için hastaya özgü ayarlanmalıdır.',
  'Kan gazı, gece oksimetri, transkütan/ETCO2 ve gerekirse PSG ile ventilasyon yeterliliği periyodik değerlendirilmelidir.',
];

export const homeVentAgeParameterRanges: {
  key: HomeVentAgeBandKey;
  label: string;
  rate: string;
  ti: string;
  ie: string;
  peep: string;
  pressureNote: string;
  targetNote: string;
}[] = [
  {
    key: 'infant',
    label: 'İnfant',
    rate: '25–40/dk',
    ti: '0.3–0.6 sn',
    ie: 'Yaklaşık 1:2–1:4',
    peep: 'Genelde 4–6 cmH2O',
    pressureNote:
      'PIP/IPAP sayısı tek başına verilmez; ideal ağırlığa göre yaklaşık VT 8–10 ml/kg, göğüs ekspansiyonu, kaçak ve PaCO2 hedefi ile titrasyon.',
    targetNote: 'PaCO2 35–45 mmHg ve SpO2 >%92 hedefi klinik bağlamla doğrulanır.',
  },
  {
    key: 'preschool',
    label: 'Okul öncesi',
    rate: '20–30/dk',
    ti: '0.5–0.8 sn',
    ie: 'Yaklaşık 1:2–1:3',
    peep: 'Genelde 4–6 cmH2O',
    pressureNote:
      'Basınç, hedef VT/CO2 ve hasta-ventilatör uyumuna göre ayarlanır; malazi veya akciğer hastalığında PEEP gereksinimi artabilir.',
    targetNote: 'FiO2 en düşük etkili düzeyde; klinik, SpO2 ve CO2 birlikte izlenir.',
  },
  {
    key: 'school',
    label: 'Okul çağı',
    rate: '12–20/dk',
    ti: '0.7–1.0 sn',
    ie: 'Yaklaşık 1:2–1:3',
    peep: 'Genelde 4–6 cmH2O',
    pressureNote:
      'Basınç ayarı CO2, kaçak, konfor, senkroni ve altta yatan hastalığa göre titrasyon gerektirir.',
    targetNote: 'Stabil çocukta ayar değişikliği gereksinimi olmaması taburculuk için önemli ipucudur.',
  },
  {
    key: 'adolescent',
    label: 'Adolesan',
    rate: '10–16/dk',
    ti: '0.8–1.0 sn',
    ie: 'Yaklaşık 1:2–1:3',
    peep: 'Genelde 4–6 cmH2O',
    pressureNote:
      'Daha büyük çocukta erişkin benzeri tolerans olabilir; yine de basınç hedefleri hastalık ve gaz değişimine göre bireyselleştirilir.',
    targetNote: 'Gündüz semptomları, uyku kalitesi, cihaz verisi ve gaz değişimi birlikte değerlendirilir.',
  },
];

export const homeVentBloodGasAdjustmentCards = [
  {
    title: 'PaCO2 yüksek / hipoventilasyon',
    interpretation:
      'Yetersiz dakika ventilasyonu, kaçak, tıkaç/sekresyon, düşük basınç desteği, düşük hız, kısa kullanım süresi veya hasta-ventilatör uyumsuzluğu düşünülebilir.',
    checks: [
      'Önce çocuk ve devre güvenliği: kaçak, ayrılma, sekresyon ve kanül/maske pozisyonu',
      'Cihaz kullanım süresi ve gece toleransı',
      'Tetikleme, rise time, Ti ve senkroni',
      'Basınç desteği, solunum sayısı veya hedef VT değişikliği yalnızca uzman/kurum protokolüyle',
    ],
  },
  {
    title: 'PaCO2 düşük / aşırı ventilasyon',
    interpretation:
      'Gereğinden fazla dakika ventilasyonu, yüksek basınç desteği, yüksek hız veya rahatsızlık/ağlama sırasında örnek alma olabilir.',
    checks: [
      'Kan gazı örneğinin zamanı ve klinik durumunu doğrula',
      'Aşırı göğüs hareketi, rahatsızlık, uyku bölünmesi ve aerofaji sor',
      'Basınç/hız azaltımı gibi değişiklikleri ventilasyon ekibiyle değerlendir',
    ],
  },
  {
    title: 'Hipoksemi / SpO2 düşük',
    interpretation:
      'Ventilasyon sorunu, sekresyon/tıkaç, atelektazi, enfeksiyon, V/Q uyumsuzluğu, oksijen kaynağı veya prob hatası olabilir.',
    checks: [
      'Prob ve ölçüm hatasını dışla; klinik görünümle karşılaştır',
      'Devre, kaçak, kanül/maske, nemlendirme ve sekresyonu kontrol et',
      'FiO2 artırımı yerine önce ventilasyon ve hava yolu güvenliği değerlendirilmeli',
      'Düzelmeyen hipoksemi acil değerlendirme gerektirir',
    ],
  },
  {
    title: 'HCO3 yüksek / kronik CO2 retansiyonu şüphesi',
    interpretation:
      'Gündüz kan gazı normal görünse bile gece hipoventilasyonu veya kronik yetersiz ventilasyon olabilir.',
    checks: [
      'Gece oksimetri + transkütan CO2 veya PSG gereksinimini değerlendir',
      'Sabah baş ağrısı, gündüz uyuklama, büyüme duraklaması ve yorgunluk sor',
      'Cihaz kullanım süresi, kaçak ve maske toleransını kontrol et',
    ],
  },
];

export const homeVentDailyCareChecklist = [
  'Kullanılan ilaç ve malzeme stoğu günlük kontrol edilir',
  'Kullanılmış kateter ve eldivenler uygun şekilde uzaklaştırılır',
  'Aspiratör şişesi günlük boşaltılıp temizlenir',
  'Nemlendirici su seviyesi günlük kontrol edilir ve gerekiyorsa tamamlanır',
  'Oksijen tüplerinin doluluğu haftada iki kez kontrol edilir',
  'Aspirasyon ve aspiratör ihtiyacı günlük değerlendirilir',
  'Aktivite ve hastaneye gidiş planı gerektiğinde güncellenir',
];

export const homeVentProblems: {
  key: HomeVentProblemKey;
  label: string;
  immediateAction: string;
  checkSteps: string[];
  urgent: boolean;
}[] = [
  {
    key: 'desaturation',
    label: 'SpO2 düşüklüğü / morarma',
    immediateAction:
      'Çocuğu değerlendir, hava yolu-solunum-dolaşım yaklaşımı yap, oksijen/ventilasyon planını kurum protokolüne göre uygula.',
    checkSteps: [
      'Prob ve ölçüm hatasını dışla; klinik görünümle karşılaştır',
      'Maske/kanül, devre ayrılması, kaçak ve ventilatör çalışmasını kontrol et',
      'Sekresyon/tıkaç varsa aspirasyon ve hava yolu temizliği planını uygula',
      'Düzelmiyorsa acil yardım ve hastane değerlendirmesi gerekir',
    ],
    urgent: true,
  },
  {
    key: 'highPressure',
    label: 'Yüksek basınç alarmı',
    immediateAction:
      'Obstrüksiyon, bükülme, sekresyon, bronkospazm veya hasta-ventilatör uyumsuzluğu düşün.',
    checkSteps: [
      'Devrede bükülme/su birikimi var mı kontrol et',
      'Trakeostomi veya hava yolunda sekresyon/tıkaç açısından değerlendir',
      'Aspirasyon ve nemlendirme rutini yeterli mi gözden geçir',
      'Solunum sıkıntısı eşlik ediyorsa acil değerlendirme gerekir',
    ],
    urgent: true,
  },
  {
    key: 'lowPressure',
    label: 'Düşük basınç / kaçak / bağlantı alarmı',
    immediateAction:
      'Devre ayrılması, maske kaçağı, cuff/kanül kaçağı veya gevşek bağlantı olasılığını kontrol et.',
    checkSteps: [
      'Devre ve cihaz bağlantılarını baştan sona kontrol et',
      'Maske oturumu, başlık gevşekliği ve ağız kaçağını değerlendir',
      'Trakeostomide kanül pozisyonu ve bağlantıyı kontrol et',
      'Tekrarlayan alarmda cihaz firması ve ventilasyon ekibiyle görüş',
    ],
    urgent: false,
  },
  {
    key: 'apneaLowVentilation',
    label: 'Apne / düşük dakika ventilasyonu alarmı',
    immediateAction:
      'Çocuğun solunum eforu, bilinç durumu, cihaz tetikleme ve devre bütünlüğünü kontrol et.',
    checkSteps: [
      'Çocuğu uyandırmadan klinik görünümü değerlendir; solunum eforu var mı bak',
      'Devre ayrılması/kaçak ve maske kaymasını kontrol et',
      'Tekrarlıyorsa ayar/tetikleme/senkroni için ventilasyon ekibi değerlendirmesi gerekir',
    ],
    urgent: true,
  },
  {
    key: 'powerFailure',
    label: 'Elektrik kesintisi / batarya alarmı',
    immediateAction:
      'Batarya süresini, yedek güç planını ve manuel ventilasyon gereksinimini hızlıca değerlendir.',
    checkSteps: [
      'Cihaz bataryaya geçti mi ve kalan süre yeterli mi kontrol et',
      'Yedek ventilatör/batarya/ambu hazır mı bak',
      'Uzayan kesintide acil servis/112 ve cihaz firması planı devreye girer',
    ],
    urgent: true,
  },
  {
    key: 'secretions',
    label: 'Sekresyon artışı / tıkaç şüphesi',
    immediateAction:
      'Hava yolu temizliği planını uygula; invaziv ventilasyonda kanül tıkanıklığını gecikmeden düşün.',
    checkSteps: [
      'Nemlendirme ve sıvı durumu yeterli mi kontrol et',
      'Aspirasyon tekniği ve kateter geçişini değerlendir',
      'Etkisiz öksürük varsa MI-E/cough assist planı gereksinimini gözden geçir',
      'Kanlı sekresyon, ateş veya artan oksijen ihtiyacı varsa klinik değerlendirme gerekir',
    ],
    urgent: false,
  },
  {
    key: 'interfaceInjury',
    label: 'Maske bası yarası / tolere edememe',
    immediateAction:
      'İnterfaz uyumu, bası noktaları ve kaçak-konfor dengesini değerlendir.',
    checkSteps: [
      'Maske boyutu, başlık gerginliği ve cilt bariyeri gereksinimini kontrol et',
      'Burun tıkanıklığı, göz kaçağı ve ağız kuruluğu sor',
      'Tekrarlayan yarada maske değişimi ve ekip değerlendirmesi gerekir',
    ],
    urgent: false,
  },
  {
    key: 'feverDistress',
    label: 'Ateş / solunum sıkıntısı / yeni hastalık',
    immediateAction:
      'Akut enfeksiyon veya alevlenme ev ventilasyonu ile maskelenebilir; düşük eşikle klinik değerlendirme planla.',
    checkSteps: [
      'Bazal ventilatör/oksijen gereksiniminden sapma var mı bak',
      'Beslenme, hidrasyon, sekresyon ve bilinç durumunu değerlendir',
      'Artan destek ihtiyacı veya kötü görünümde acil başvuru gerekir',
    ],
    urgent: true,
  },
  {
    key: 'trachDislodgement',
    label: 'Trakeostomi çıkması / yanlış yerleşim',
    immediateAction:
      'Trakeostomi acil algoritmasını uygula; ventilasyon sağlanamıyorsa acil yardım çağır.',
    checkSteps: [
      'Aynı boy ve bir küçük boy yedek kanül hazır olmalı',
      'Ambu ile ventilasyon yolu ve oksijen planı bilinmeli',
      'Bakım veren kanül değişimini eğitimde gösterebilmiş olmalı',
    ],
    urgent: true,
  },
  {
    key: 'caregiverExhaustion',
    label: 'Bakım veren tükenmişliği / evde güvenlik sorunu',
    immediateAction:
      'Ev ventilasyonu yalnızca cihaz değil, sürdürülebilir bakım sistemi gerektirir; sosyal destek ve bakım planı yeniden değerlendirilmelidir.',
    checkSteps: [
      'Gece bakım yükü, uyku bölünmesi ve ikinci eğitimli bakım veren varlığını sor',
      'Ev hemşireliği, sosyal hizmet, okul ve ulaşım gereksinimlerini değerlendir',
      'Güvenli bakım sürdürülemiyorsa taburculuk/evde izlem planı yeniden ele alınır',
    ],
    urgent: false,
  },
];

export const homeVentRedFlags = [
  'Yeni veya düzelmeyen siyanoz/desatürasyon',
  'Bilinç değişikliği, apne, belirgin yorgunluk veya sessiz solunum',
  'Ventilatörle yeterli göğüs hareketi sağlanamaması',
  'Trakeostomi kanülünün çıkması, tıkanması veya aspirasyon kateterinin geçmemesi',
  'Tekrarlayan yüksek basınç alarmı ve artan solunum sıkıntısı',
  'Elektrik/batarya sorunu nedeniyle ventilasyonun sürdürülememesi',
  'Ateşle birlikte bazal oksijen/ventilatör gereksiniminde artış',
  'Bakım verenin uyanık ve güvenli bakım sağlayamaması',
];

export const homeVentSourceNotes = [
  'ATS invaziv ev ventilasyonu rehberi; tıbbi ev modeli, standart taburculuk kriterleri, eğitimli bakım veren, ekipman ve acil hazırlığı vurgular.',
  'ERS pediatrik uzun dönem noninvaziv solunum desteği bildirisi; CPAP/NIV’in uzman pediatrik multidisipliner ekip tarafından yönetilmesi, eğitim, takip ve yaşam kalitesi odağını vurgular.',
  'ATS çocukta ev oksijen rehberi; ev oksijeninin endikasyon, izlem ve sonlandırma kararlarının çocuk hastalık grubu ve klinik bağlama göre doğrulanmasını vurgular.',
  'CHEST nöromüsküler zayıflık rehberi; ventilasyon geçişi, ağızlık ventilasyonu, sekresyon yönetimi ve airway clearance konularını öne çıkarır.',
  'Bu modülde sayısal ventilatör ayarı, alarm limiti veya oksijen akımı önerisi verilmez.',
];
