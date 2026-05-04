export type BronchoscopyRiskKey =
  | 'hypoxemia'
  | 'ph'
  | 'difficultAirway'
  | 'bleedingRisk'
  | 'icu'
  | 'infectionIsolation'
  | 'foreignBody'
  | 'neonate';

export type BalPatternKey = 'neutrophilic' | 'lymphocytic' | 'eosinophilic' | 'hemorrhage' | 'aspiration' | 'infection';

export const bronchoscopySource = {
  badge:
    'Kaynak yaklaşımı: ERS Task Force BAL in children + pediatrik fleksibl bronkoskopi güvenlik/hazırlık pratikleri — kurum protokolü ile doğrulanmalıdır.',
  warning:
    'Bu modül bronkoskopi ve BAL için eğitim/checklist aracıdır. İşlem endikasyonu, anestezi planı, hava yolu güvenliği, BAL istemleri ve sonuç yorumu; çocuk göğüs, anestezi, yoğun bakım ve yerel kurum protokolü ile doğrulanmalıdır.',
};

export const bronchoscopyIndications = [
  'Persistan veya açıklanamayan atelektazi / lokal hiperinflasyon',
  'Yabancı cisim aspirasyonu şüphesi',
  'Tekrarlayan lokalize pnömoni veya aynı lobda infiltrasyon',
  'Stridor, havayolu anomalisi, malazi veya stenoz değerlendirmesi',
  'Kronik ıslak öksürük / bronşektazi mikrobiyoloji ve anatomik değerlendirme',
  'Hemoptizi lokalizasyonu ve hava yolu değerlendirmesi',
  'İmmün baskılı çocukta tanısal örnekleme',
  'ChILD / alveoler hemoraji / pulmoner alveoler proteinozis gibi seçilmiş parankimal hastalıklar',
  'Trakeostomi, ETT pozisyonu, granülasyon veya hava yolu tıkanıklığı değerlendirmesi',
];

export const preProcedureChecklist = [
  'Endikasyon ve beklenen klinik soruyu tek cümleyle yaz: anatomik değerlendirme, mikrobiyoloji, BAL, hemoptizi, yabancı cisim vb.',
  'Önceki görüntüleme, SpO2, solunum desteği, SFT/eko ve komorbiditeleri gözden geçir.',
  'Açlık, damar yolu, onam, alerji, ilaçlar, antikoagülan/antiagregan ve kanama öyküsünü kontrol et.',
  'Tam kan/trombosit ve koagülasyon testleri kanama riski veya biyopsi/hemoptizi varsa doğrulanır.',
  'Planlanan bronkoskop dış çapı ile ETT/LMA/nazal yol uyumluluğunu kontrol et.',
  'BAL yapılacaksa örnek sırası ve laboratuvar istemleri işlem öncesi hazırlanır.',
  'Acil ekipman: aspirasyon, oksijen, ventilasyon, uygun ETT/LMA, bronkoskop yedeği ve resüsitasyon ilaçları.',
];

export const anesthesiaChecklist = [
  'Anestezi/sedasyon planı yaş, havayolu, hipoksemi, pulmoner hipertansiyon, komorbidite ve işlem amacına göre yapılır.',
  'Spontan solunum korunacak mı, LMA/ETT kullanılacak mı, rijid bronkoskopi gerekebilir mi önceden netleştirilir.',
  'Pulmoner hipertansiyon, ağır OSAS, nöromüsküler hastalık veya yoğun bakım hastasında anestezi riski ayrıca tartışılır.',
  'Bronkoskopi ventilasyonu bozabilir; işlem boyunca SpO2, kalp hızı, kan basıncı ve tercihen kapnografi izlenir.',
  'Yabancı cisim veya masif hemoptizi şüphesinde fleksibl bronkoskopi tek başına yeterli olmayabilir; rijid bronkoskopi/cerrahi ekip erişimi planlanır.',
  'Lidokain/topikal ajan dozları toplam güvenli doz açısından kurum protokolüyle izlenir.',
];

export const bronchoscopyRiskSignals: { key: BronchoscopyRiskKey; label: string; note: string }[] = [
  { key: 'hypoxemia', label: 'Bazal hipoksemi / yüksek O2 ihtiyacı', note: 'İşlem sırasında desatürasyon riski artar.' },
  { key: 'ph', label: 'Pulmoner hipertansiyon', note: 'Hipoksi/asidoz PH krizini tetikleyebilir; PH/anestezi planı gerekir.' },
  { key: 'difficultAirway', label: 'Zor havayolu / kraniofasiyal risk', note: 'Alternatif havayolu planı ve deneyimli ekip gerekir.' },
  { key: 'bleedingRisk', label: 'Kanama riski', note: 'Trombositopeni, koagülopati, hemoptizi veya biyopsi planı.' },
  { key: 'icu', label: 'Yoğun bakım / ventilatör', note: 'Ventilasyon stratejisi ve tüp uyumu önceden belirlenir.' },
  { key: 'infectionIsolation', label: 'Enfeksiyon izolasyonu', note: 'TB, viral enfeksiyon veya dirençli patojen için önlem.' },
  { key: 'foreignBody', label: 'Yabancı cisim', note: 'Rijid bronkoskopi ve cerrahi/KBB erişimi gerekebilir.' },
  { key: 'neonate', label: 'Neonat / küçük infant', note: 'Havayolu çapı, hızlı desatürasyon ve ısı kaybı açısından dikkat.' },
];

export const balTechniqueChecklist = [
  'BAL endikasyonunu belirle: enfeksiyon, immün baskı, ILD/chILD, alveoler hemoraji, aspirasyon, proteinozis vb.',
  'Örnekleme yeri klinik soruya göre seçilir: yaygın hastalıkta orta lob/lingula sık tercih edilir; lokal hastalıkta ilgili segment.',
  'İlk aspirat kontaminasyon/mikrobiyoloji için ayrı değerlendirilebilir; laboratuvar protokolüne göre ayır.',
  'Verilen serum fizyolojik hacmi, aliquot sayısı, geri dönen hacim ve görünüm mutlaka raporlanır.',
  'Örnekler hızlıca laboratuvara ulaştırılır; sitoloji/akım sitometri/mikrobiyoloji için doğru tüp ve taşıma koşulu önemlidir.',
  'Kanlı BAL’da ardışık aliquotların giderek kanlanması alveoler hemoraji lehine olabilir; travmatik kanama ile ayrım klinik bağlama göre yapılır.',
];

export const balOrderSets = [
  {
    title: 'Rutin BAL istemleri',
    items: [
      'Hücre sayısı ve diferansiyel',
      'Gram boyama ve bakteriyel kültür',
      'Gerektiğinde fungal kültür ve mikobakteri/TB incelemesi',
      'Viral PCR paneli klinik bağlama göre',
      'Sitoloji ve hemosiderin yüklü makrofaj değerlendirmesi seçilmiş olguda',
    ],
  },
  {
    title: 'İmmün baskılı çocuk',
    items: [
      'Bakteriyel, fungal, mikobakteriyel kültür',
      'PJP PCR/boyama, galaktomannan veya fungal belirteçler kurum protokolüne göre',
      'CMV/viral PCR ve geniş moleküler panel klinik bağlama göre',
      'Hücre sayımı; nötrofil/lenfosit paterni tek başına etken belirlemez.',
    ],
  },
  {
    title: 'chILD / alveoler hastalık',
    items: [
      'Hücre sayısı ve diferansiyel',
      'Lenfosit alt grupları / CD4-CD8 oranı seçilmiş olguda',
      'Hemosiderin yüklü makrofaj',
      'PAS pozitif materyal / proteinozis değerlendirmesi klinik şüphede',
      'Enfeksiyon dışlama testleri mutlaka düşünülür.',
    ],
  },
];

export const balPatternCards: { key: BalPatternKey; title: string; clues: string[]; caution: string }[] = [
  {
    key: 'neutrophilic',
    title: 'Nötrofilik BAL paterni',
    clues: ['Bakteriyel enfeksiyon', 'Bronşektazi / suppuratif inflamasyon', 'Aspirasyon', 'İrritan maruziyet'],
    caution: 'Nötrofil yüksekliği spesifik değildir; kültür, klinik ve görüntüleme ile birlikte yorumlanır.',
  },
  {
    key: 'lymphocytic',
    title: 'Lenfositik BAL paterni',
    clues: ['Hipersensitivite pnömonisi', 'Sarkoidoz benzeri tablo', 'Bazı chILD/ILD paternleri', 'Viral/atipik enfeksiyon'],
    caution: 'Lenfositoz tanı koydurmaz; CD4/CD8 oranı da tek başına karar parametresi değildir.',
  },
  {
    key: 'eosinophilic',
    title: 'Eozinofilik BAL paterni',
    clues: ['Eozinofilik pnömoni', 'Alerjik bronkopulmoner aspergilloz', 'İlaç reaksiyonu', 'Paraziter/enfeksiyöz nedenler'],
    caution: 'Kan eozinofili, IgE, görüntüleme ve ilaç/maruziyet öyküsü ile birlikte değerlendirilir.',
  },
  {
    key: 'hemorrhage',
    title: 'Alveoler hemoraji paterni',
    clues: ['Kanlı ardışık aliquotlar', 'Hemosiderin yüklü makrofaj', 'Anemi', 'Yaygın buzlu cam'],
    caution: 'Travmatik bronkoskopi kanaması ile ayrım önemlidir; vaskülit/anti-GBM/kardiyak nedenler düşünülür.',
  },
  {
    key: 'aspiration',
    title: 'Aspirasyon paterni',
    clues: ['Lipid yüklü makrofaj', 'Beslenme ile öksürük', 'Tekrarlayan lokal pnömoni', 'Nörogelişimsel risk'],
    caution: 'Lipid yüklü makrofaj özgül değildir; aspirasyon tanısı klinik ve yutma değerlendirmesiyle konur.',
  },
  {
    key: 'infection',
    title: 'Enfeksiyon paterni',
    clues: ['Pozitif kültür/PCR', 'Nötrofilik inflamasyon', 'Ateş/infiltrasyon', 'İmmün baskı'],
    caution: 'Kolonizasyon, kontaminasyon ve gerçek enfeksiyon ayrımı klinik bağlamla yapılır.',
  },
];

export const postProcedureChecklist = [
  'SpO2, solunum işi, öksürük, stridor, bronkospazm ve kanama açısından izlem.',
  'Ateş ve geçici infiltrasyon/öksürük BAL sonrası görülebilir; klinik kötüleşme ayrı değerlendirilir.',
  'Yoğun bakım/komorbid hastada ventilasyon ve oksijen ihtiyacı işlem sonrası yeniden ayarlanır.',
  'BAL örneklerinin laboratuvara ulaştığı ve istemlerin doğru açıldığı doğrulanır.',
  'Aileye beklenen bulgular ve acil başvuru uyarıları anlatılır.',
];

export function classifyBronchoscopyRisk(selected: BronchoscopyRiskKey[]) {
  const high =
    selected.includes('ph') ||
    selected.includes('hypoxemia') ||
    selected.includes('difficultAirway') ||
    selected.includes('foreignBody') ||
    selected.includes('bleedingRisk');

  if (high || selected.length >= 3) {
    return {
      tone: 'red' as const,
      title: 'Yüksek riskli bronkoskopi',
      action: 'Anestezi, yoğun bakım ve ilgili ekiplerle işlem öncesi ortak plan yapılmalı; alternatif havayolu ve acil senaryo hazır olmalıdır.',
    };
  }

  if (selected.length > 0) {
    return {
      tone: 'amber' as const,
      title: 'Ek risk var',
      action: 'Riskleri işlem amacı, bronkoskop çapı, havayolu yolu ve sedasyon planıyla birlikte yeniden değerlendir.',
    };
  }

  return {
    tone: 'gray' as const,
    title: 'Standart hazırlık',
    action: 'Yine de işlem endikasyonu, onam, açlık, monitörizasyon ve acil ekipman checklist’i tamamlanmalıdır.',
  };
}
