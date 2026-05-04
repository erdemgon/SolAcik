export type InhaledMedication = {
  id: string;
  category: 'İKS' | 'İKS/LABA' | 'SABA' | 'SAMA' | 'SABA/SAMA' | 'Nebül İKS' | 'Diğer';
  genericName: string;
  brandExamples: string[];
  deviceTypes: string[];
  strengths: string[];
  ageMinMonths: number;
  ageMaxMonths: number | null;
  ageLabel: string;
  usualDoseText: string;
  maxDoseText?: string;
  martStatus:
    | 'MART uygun'
    | 'MART değil'
    | 'MART potansiyeli var / doğrula'
    | 'Uygun değil';
  martNote?: string;
  clinicalRole:
    | 'Kontrol edici'
    | 'Rahatlatıcı'
    | 'Atak / akut'
    | 'Kontrol edici + rahatlatıcı'
    | 'Özel durum';
  spacerNote?: string;
  warning?: string;
  sourceNote: string;
};

export const inhaledMedications: InhaledMedication[] = [
  {
    id: 'budesonide_nebule',
    category: 'Nebül İKS',
    genericName: 'Budesonid nebül',
    brandExamples: ['Pulmicort nebül', 'Budesonid nebül jenerikleri'],
    deviceTypes: ['Nebül', 'Kontrol edici'],
    strengths: ['0.25 mg/mL', '0.5 mg/mL', 'tek doz nebül formları'],
    ageMinMonths: 6,
    ageMaxMonths: null,
    ageLabel: '6 ay ve üzeri',
    usualDoseText:
      'Başlangıç: toplam günlük 0.25–0.5 mg. Oral steroid kullanan veya daha ağır olgularda başlangıçta toplam 1 mg/gün düşünülebilir. İdame: toplam günlük 0.25–2 mg.',
    maxDoseText:
      'Çocuklarda idame aralığı genellikle 0.25–2 mg/gün; yüksek doz gereksinimi uzman değerlendirmesi gerektirir.',
    martStatus: 'MART değil',
    martNote: 'Tek başına nebulize İKS’dir; rahatlatıcı olarak kullanılmaz.',
    clinicalRole: 'Kontrol edici',
    spacerNote: 'Nebülizatör ile uygulanır.',
    warning: 'Ağız çalkalama/yüz yıkama, büyüme ve sistemik steroid etkileri açısından izlem hatırlat.',
    sourceNote: 'KÜB/KT ve güncel rehberle doğrulanmalıdır.',
  },
  {
    id: 'fluticasone_pmdi',
    category: 'İKS',
    genericName: 'Flutikazon propiyonat aerosol',
    brandExamples: ['Flixotide Inhaler', 'Flutikazon propiyonat jenerikleri'],
    deviceTypes: ['ÖDİ / aerosol', 'Spacer + maske', 'Spacer + ağızlık', 'Kontrol edici'],
    strengths: ['50 mcg/puf', '125 mcg/puf', '250 mcg/puf'],
    ageMinMonths: 12,
    ageMaxMonths: null,
    ageLabel: '1 yaş ve üzeri; doz/cihaz yaşa göre',
    usualDoseText:
      '1–4 yaş: genellikle yüz maskesi + pediatrik spacer ile günde 2 kez 100 mcg. 4 yaş ve üzeri: günde 2 kez 50–200 mcg; çoğu çocukta 50–100 mcg x 2 yeterli olabilir.',
    maxDoseText:
      '4 yaş ve üzeri çocuklarda günde 2 kez 200 mcg’ye kadar; yüksek dozda adrenal baskılanma riski için izlem gerekir.',
    martStatus: 'MART değil',
    martNote: 'Tek başına İKS’dir; rahatlatıcı olarak kullanılmaz.',
    clinicalRole: 'Kontrol edici',
    spacerNote: 'pMDI ile çocuklarda spacer kullanılmalıdır; küçük çocukta maske, büyük çocukta ağızlık.',
    warning: 'Ağız çalkalama, büyüme izlemi, yüksek dozda adrenal baskılanma uyarısı.',
    sourceNote: 'KÜB/KT ve güncel rehberle doğrulanmalıdır.',
  },
  {
    id: 'fluticasone_diskus',
    category: 'İKS',
    genericName: 'Flutikazon propiyonat Diskus',
    brandExamples: ['Flixotide Diskus'],
    deviceTypes: ['Diskus', 'DPI', 'Kontrol edici'],
    strengths: ['50 mcg/doz', '100 mcg/doz', '250 mcg/doz', '500 mcg/doz'],
    ageMinMonths: 48,
    ageMaxMonths: null,
    ageLabel: '4 yaş ve üzeri',
    usualDoseText: '4 yaş ve üzeri: günde 2 kez 50–200 mcg. 1–4 yaşta Diskus önerilmez.',
    maxDoseText: 'Çocukta günde 2 kez 200 mcg’ye kadar; yüksek dozlar uzman izleminde.',
    martStatus: 'MART değil',
    martNote: 'Tek başına İKS’dir; rahatlatıcı olarak kullanılmaz.',
    clinicalRole: 'Kontrol edici',
    spacerNote: 'DPI cihazdır; spacer kullanılmaz. Yeterli inspiratuvar akım gerekir.',
    warning: 'DPI kullanımı yaş ve teknik beceriye bağlıdır.',
    sourceNote: 'KÜB/KT ve güncel rehberle doğrulanmalıdır.',
  },
  {
    id: 'fluticasone_nebule',
    category: 'Nebül İKS',
    genericName: 'Flutikazon propiyonat nebül',
    brandExamples: ['Flixotide Nebules', 'Flixair nebül', 'FLOBEN vb. jenerikler'],
    deviceTypes: ['Nebül', 'Kontrol edici'],
    strengths: ['0.5 mg/2 mL', '2 mg/2 mL'],
    ageMinMonths: 48,
    ageMaxMonths: 192,
    ageLabel: '4–16 yaş',
    usualDoseText:
      '4–16 yaş: günde 2 kez 1000 mcg. Daha sonraki idame çoğu zaman pMDI veya DPI formülasyonlarla daha rahat yapılabilir.',
    maxDoseText: 'Yüksek doz İKS kabul edilir; uzman izleminde kullanılmalıdır.',
    martStatus: 'MART değil',
    martNote: 'Nebül İKS’dir; rahatlatıcı değildir.',
    clinicalRole: 'Özel durum',
    spacerNote: 'Nebülizatör ile uygulanır.',
    warning: 'Yüksek doz steroid yükü nedeniyle sistemik yan etki ve adrenal baskılanma açısından dikkat.',
    sourceNote: 'KÜB/KT ve güncel rehberle doğrulanmalıdır.',
  },
  {
    id: 'ciclesonide_pmdi',
    category: 'İKS',
    genericName: 'Siklesonid aerosol',
    brandExamples: ['Alvesco'],
    deviceTypes: ['ÖDİ / aerosol', 'Spacer + ağızlık', 'Kontrol edici'],
    strengths: ['80 mcg/puf', '160 mcg/puf'],
    ageMinMonths: 72,
    ageMaxMonths: null,
    ageLabel: '6 yaş ve üzeri',
    usualDoseText:
      '6–11 yaş: astım şiddetine göre günde 1 kez 80–160 mcg. 12 yaş ve üzeri: başlangıç genellikle günde 1 kez 160 mcg; bazı hastalarda 80 mcg idame düşünülebilir.',
    maxDoseText: 'Yüksek doz gereksinimi uzman değerlendirmesi gerektirir.',
    martStatus: 'MART değil',
    martNote: 'Tek başına İKS’dir; rahatlatıcı olarak kullanılmaz.',
    clinicalRole: 'Kontrol edici',
    spacerNote: 'pMDI tekniği uygun değilse uygun spacer düşünülebilir.',
    warning: 'Ağız çalkalama ve büyüme izlemi hatırlat.',
    sourceNote: 'KÜB/KT ve güncel rehberle doğrulanmalıdır.',
  },
  {
    id: 'budesonide_formoterol_80_4_5_turbuhaler',
    category: 'İKS/LABA',
    genericName: 'Budesonid + formoterol',
    brandExamples: ['Symbicort Pediatrik Turbuhaler 80/4.5'],
    deviceTypes: ['Turbuhaler', 'DPI', 'MART uygun', 'Kontrol edici', 'Rahatlatıcı'],
    strengths: ['80/4.5 mcg/doz delivered'],
    ageMinMonths: 72,
    ageMaxMonths: 143,
    ageLabel: '6–11 yaş',
    usualDoseText:
      'İdame: yaş ve basamağa göre genellikle 1 inhalasyon günde 1 veya 2 kez. MART seçilirse ayrıca gerektiğinde 1 inhalasyon kullanılabilir.',
    maxDoseText:
      'MART toplam günlük maksimum: 8 inhalasyon/gün. Bu sınır aşılacaksa aynı gün tıbbi değerlendirme gerekir.',
    martStatus: 'MART uygun',
    martNote:
      '6–11 yaşta MART için budesonid-formoterol 80/4.5 delivered dose ana seçenektir. AIR-only Step 1–2 çocukta rutin önerilmez.',
    clinicalRole: 'Kontrol edici + rahatlatıcı',
    spacerNote: 'Turbuhaler/DPI; yeterli inspiratuvar akım ve teknik gerekir.',
    warning:
      'SABA ile birlikte kullanım planı ve toplam formoterol dozu karışıklığı önlenmelidir. Aynı anda başka LABA verilmemelidir.',
    sourceNote: 'GINA ve ürün KÜB/KT ile doğrulanmalıdır.',
  },
  {
    id: 'budesonide_formoterol_160_4_5',
    category: 'İKS/LABA',
    genericName: 'Budesonid + formoterol',
    brandExamples: [
      'Symbicort Turbuhaler 160/4.5',
      'Fenoster 160/4.5',
      'Fornit 160/4.5',
      'Forbuday 160/4.5',
      'diğer budesonid-formoterol jenerikleri',
    ],
    deviceTypes: ['Turbuhaler', 'Kapsül inhaler', 'DPI', 'MART uygun', 'Kontrol edici', 'Rahatlatıcı'],
    strengths: ['160/4.5 mcg/doz delivered veya eşdeğer ürün formuna göre'],
    ageMinMonths: 144,
    ageMaxMonths: null,
    ageLabel: '12 yaş ve üzeri',
    usualDoseText:
      'İdame: genellikle günde 2 kez 1 inhalasyon veya basamağa göre ayarlanır. MART seçilirse gerektiğinde 1 inhalasyon eklenebilir.',
    maxDoseText:
      'MART toplam günlük maksimum: 12 inhalasyon/gün. Bu sınır aşılacaksa aynı gün tıbbi değerlendirme gerekir.',
    martStatus: 'MART uygun',
    martNote: 'Formoterol içerdiği için MART için uygundur; ürün ve cihaz bazında KÜB doğrulanmalıdır.',
    clinicalRole: 'Kontrol edici + rahatlatıcı',
    spacerNote: 'Cihaza göre değişir; Turbuhaler/DPI/kapsül inhaler teknik eğitimi gerekir.',
    warning: 'Aynı anda başka LABA içeren kombinasyonla birlikte kullanılmamalıdır.',
    sourceNote: 'GINA ve ürün KÜB/KT ile doğrulanmalıdır.',
  },
  {
    id: 'beclomethasone_formoterol_foster_100_6',
    category: 'İKS/LABA',
    genericName: 'Beklometazon dipropiyonat + formoterol',
    brandExamples: ['Foster 100/6 aerosol', 'Foster Nexthaler 100/6'],
    deviceTypes: ['ÖDİ / aerosol', 'DPI', 'Spacer + ağızlık', 'Kontrol edici', 'MART uygun'],
    strengths: ['100/6 mcg/doz'],
    ageMinMonths: 144,
    ageMaxMonths: null,
    ageLabel: '12 yaş ve üzeri; ürün KÜB’e göre doğrula',
    usualDoseText:
      '12 yaş üzeri/adolesan ve erişkinlerde idame tedavide günde 2 kez 1 veya 2 inhalasyon. Ürün formuna göre doz farklılıkları olabilir.',
    maxDoseText: 'MART kullanımı düşünülüyorsa ürün KÜB ve güncel rehberle doğrula.',
    martStatus: 'MART potansiyeli var / doğrula',
    martNote:
      'Formoterol içerir; ancak Türkiye’de ürün/yaş/KÜB’e göre MART uygunluğu ayrıca doğrulanmalıdır. Şüphede otomatik MART önerisi verme.',
    clinicalRole: 'Kontrol edici',
    spacerNote: 'pMDI formda uygun spacer düşünülebilir; DPI formda spacer kullanılmaz.',
    warning: '12 yaş altı için kullanma. Akut atak tedavisi için otomatik önerme.',
    sourceNote: 'KÜB/KT ve güncel rehberle doğrulanmalıdır.',
  },
  {
    id: 'fluticasone_salmeterol_diskus',
    category: 'İKS/LABA',
    genericName: 'Flutikazon propiyonat + salmeterol',
    brandExamples: ['Seretide Diskus', 'Pavtide Diskus', 'Neutec/diğer eşdeğer diskus formları'],
    deviceTypes: ['Diskus', 'DPI', 'Kontrol edici'],
    strengths: ['50/100 mcg', '50/250 mcg', '50/500 mcg'],
    ageMinMonths: 48,
    ageMaxMonths: null,
    ageLabel: '4 yaş ve üzeri; doz yaşa göre',
    usualDoseText:
      '4–12 yaş: günde 2 kez 1 inhalasyon 50/100 mcg. 12 yaş ve üzeri: 50/100, 50/250 veya 50/500 mcg günde 2 kez 1 inhalasyon, astım şiddetine göre.',
    maxDoseText: 'Çocukta daha yüksek flutikazon dozları için uzman değerlendirmesi gerekir.',
    martStatus: 'MART değil',
    martNote: 'Salmeterol hızlı rahatlatıcı değildir; MART/SMART için kullanılmaz.',
    clinicalRole: 'Kontrol edici',
    spacerNote: 'Diskus/DPI; yeterli inspiratuvar akım gerekir.',
    warning: 'Akut semptom rahatlatıcı olarak kullanılmaz; hastanın ayrı rahatlatıcı planı olmalıdır.',
    sourceNote: 'KÜB/KT ve güncel rehberle doğrulanmalıdır.',
  },
  {
    id: 'fluticasone_salmeterol_pmdi',
    category: 'İKS/LABA',
    genericName: 'Flutikazon propiyonat + salmeterol aerosol',
    brandExamples: ['PEFSAL inhaler', 'RESPİRO inhaler', 'Fludalt Duo', 'diğer eşdeğer pMDI/kapsül formları'],
    deviceTypes: ['ÖDİ / aerosol', 'Spacer + ağızlık', 'Spacer + maske', 'Kapsül inhaler', 'Kontrol edici'],
    strengths: ['25/50 mcg', '25/125 mcg', '25/250 mcg', '50/100 mcg kapsül', '50/250 mcg kapsül', '50/500 mcg kapsül'],
    ageMinMonths: 48,
    ageMaxMonths: null,
    ageLabel: '4 yaş ve üzeri; ürün formuna göre',
    usualDoseText:
      '4–12 yaş pMDI örneği: günde 2 kez 2 inhalasyon 25/50 mcg. 12 yaş ve üzeri: form ve şiddete göre doz seçilir.',
    maxDoseText: 'Çocukta ürün KÜB’deki maksimum onaylı flutikazon dozu aşılmamalıdır.',
    martStatus: 'MART değil',
    martNote: 'Salmeterol içerir; MART/SMART için kullanılmaz.',
    clinicalRole: 'Kontrol edici',
    spacerNote: 'pMDI formda spacer önerilir; kapsül/DPI formda spacer kullanılmaz.',
    warning: 'Akut semptom rahatlatıcı değildir.',
    sourceNote: 'KÜB/KT ve güncel rehberle doğrulanmalıdır.',
  },
  {
    id: 'salbutamol_pmdi',
    category: 'SABA',
    genericName: 'Salbutamol aerosol',
    brandExamples: ['Ventolin inhaler', 'Salbutol inhaler', 'Vent-O-Sal inhaler', 'diğer salbutamol pMDI formları'],
    deviceTypes: ['ÖDİ / aerosol', 'Spacer + maske', 'Spacer + ağızlık', 'Rahatlatıcı'],
    strengths: ['100 mcg/puf'],
    ageMinMonths: 0,
    ageMaxMonths: null,
    ageLabel: 'Yaşa göre spacer/maske ile; klinik bağlama göre',
    usualDoseText:
      'Rahatlatıcı olarak genellikle 1–2 puf gerektiğinde; atakta doz protokolü kurum/rehbere göre uygulanır.',
    maxDoseText:
      'Sık SABA ihtiyacı astım kontrol bozukluğu göstergesidir; tedavi planı gözden geçirilmelidir.',
    martStatus: 'MART değil',
    martNote: 'SABA’dır; MART değildir. İKS içermeyen SABA-only yaklaşım uyarı vermelidir.',
    clinicalRole: 'Rahatlatıcı',
    spacerNote: 'Çocuklarda pMDI ile spacer; küçük çocuklarda maske kullanılır.',
    warning: 'Sık kullanım, kötü kontrol ve alevlenme riski göstergesidir.',
    sourceNote: 'KÜB/KT ve güncel rehberle doğrulanmalıdır.',
  },
  {
    id: 'salbutamol_nebule',
    category: 'SABA',
    genericName: 'Salbutamol nebül',
    brandExamples: ['Ventolin nebules', 'Salres nebül', 'Ventosal nebül', 'diğer salbutamol nebül formları'],
    deviceTypes: ['Nebül', 'Rahatlatıcı', 'Atak / akut'],
    strengths: ['2.5 mg/2.5 mL', '5 mg/2.5 mL bazı jenerikler'],
    ageMinMonths: 0,
    ageMaxMonths: null,
    ageLabel: '4–11 yaş için net doz; <4 yaşta ürün/form/klinik bağlama göre dikkat',
    usualDoseText:
      '4–11 yaş: 2.5–5 mg, günde 4 defaya kadar. 12 yaş ve üzeri: erişkin dozu gibi. 18 ay altında klinik etkililik belirsiz olabilir.',
    maxDoseText: 'Sık veya yüksek doz kullanım tıbbi gözetim gerektirir.',
    martStatus: 'MART değil',
    martNote: 'SABA’dır; kontrol edici değildir.',
    clinicalRole: 'Atak / akut',
    spacerNote: 'Nebülizatör ile uygulanır; oksijen/havalandırma ve enfeksiyon kontrolü dikkate alınır.',
    warning: 'Artan beta2 agonist ihtiyacı astım kötüleşmesi göstergesidir; hipoksemi ve taşikardi açısından izle.',
    sourceNote: 'KÜB/KT ve kurum atak protokolü ile doğrulanmalıdır.',
  },
  {
    id: 'ipratropium_nebule_250',
    category: 'SAMA',
    genericName: 'İpratropium bromür nebül',
    brandExamples: ['Atrovent 250 mcg/2 mL', 'Atrivo', 'Iprabul vb. jenerikler'],
    deviceTypes: ['Nebül', 'Atak / akut'],
    strengths: ['250 mcg/2 mL', '500 mcg/2 mL bazı formlar'],
    ageMinMonths: 0,
    ageMaxMonths: null,
    ageLabel: '6 yaş altı ve 6–12 yaşta tıbbi gözetim; 12 yaş üzeri erişkin/adolesan protokolü',
    usualDoseText:
      '6–12 yaş: 1 tek dozluk flakon; hasta stabilize olana kadar tekrarlanabilir. 6 yaş altı: veri kısıtlı; tıbbi gözetim altında 1 tek dozluk flakon tekrarlanabilir. Sıklık hekim tarafından belirlenir.',
    maxDoseText: '12 yaş altı çocuklarda 1 mg/gün üzerindeki dozlar tıbbi gözetim altında verilmelidir.',
    martStatus: 'MART değil',
    martNote: 'SAMA’dır; özellikle akut ağır atakta SABA ile birlikte düşünülebilir.',
    clinicalRole: 'Atak / akut',
    spacerNote: 'Nebül maske/ağızlık ile; göz temasından kaçın.',
    warning: 'Dar açılı glokom riski olanlarda göz temasına dikkat; ağız kuruluğu, taşikardi, paradoksal bronkospazm uyarısı.',
    sourceNote: 'KÜB/KT ve kurum atak protokolü ile doğrulanmalıdır.',
  },
  {
    id: 'ipratropium_salbutamol_nebule',
    category: 'SABA/SAMA',
    genericName: 'Salbutamol + ipratropium nebül',
    brandExamples: ['Combivent tek dozluk flakon', 'eşdeğer salbutamol/ipratropium nebül formları'],
    deviceTypes: ['Nebül', 'Atak / akut'],
    strengths: ['Salbutamol 2.5 mg + ipratropium 0.5 mg / 2.5 mL gibi formlar'],
    ageMinMonths: 144,
    ageMaxMonths: null,
    ageLabel: 'Genellikle 12 yaş ve üzeri; çocukta kurum/uzman protokolü ile doğrula',
    usualDoseText: 'Akut bronkospazmda ürün KÜB ve kurum protokolüne göre.',
    maxDoseText: 'Tekrarlayan dozlar tıbbi gözetim gerektirir.',
    martStatus: 'MART değil',
    martNote: 'Bronkodilatör kombinasyondur; kontrol edici değildir.',
    clinicalRole: 'Atak / akut',
    spacerNote: 'Nebülizatör ile uygulanır.',
    warning: 'Çocuk yaş grubunda ürün KÜB, yaş sınırı ve kurum protokolü mutlaka kontrol edilmelidir.',
    sourceNote: 'KÜB/KT ve kurum atak protokolü ile doğrulanmalıdır.',
  },
];
