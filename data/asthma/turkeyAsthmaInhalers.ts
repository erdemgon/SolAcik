export type AsthmaMedicationRole =
  | 'low_dose_ics_pmdi_nebule'
  | 'medium_dose_ics'
  | 'ics_laba_formoterol_child'
  | 'ics_laba_formoterol_adolescent'
  | 'ics_laba_salmeterol_child'
  | 'ics_laba_salmeterol_adolescent'
  | 'saba_pmdi_nebule'
  | 'sama_acute'
  | 'saba_sama_acute'
  | 'ltra'
  | 'lama'
  | 'biologics';

export type TurkeyAsthmaInhaler = {
  id: string;
  role: AsthmaMedicationRole;
  activeIngredientTr: string;
  brandExamplesTr: string[];
  formsAndStrengths: string[];
  asthmaUseNote: string;
  martSmart: '+' | '-' | 'doğrula';
  ageNote: string;
  sourceVersion: string;
  sourceNote: string;
};

const SOURCE_VERSION = 'Türkiye KÜB/KT ürün bilgileri + GINA 2026 ile klinik editör doğrulaması gerekir; taslak 2026-05-05';
const SOURCE_NOTE = 'Ticari isimler ve formlar değişebilir. Bu liste reçete listesi değildir; editör kurulu KÜB/KT, ruhsat yaşı, geri ödeme ve piyasa durumunu düzenli doğrulamalıdır.';

export const turkeyAsthmaInhalers: TurkeyAsthmaInhaler[] = [
  {
    id: 'fluticasone_pmdi_diskus',
    role: 'low_dose_ics_pmdi_nebule',
    activeIngredientTr: 'Flutikazon propiyonat',
    brandExamplesTr: ['Flixotide Inhaler', 'Flixotide Diskus', 'flutikazon propiyonat eşdeğerleri'],
    formsAndStrengths: ['50 mcg', '100 mcg', '125 mcg', '250 mcg; cihaz/form ürüne göre'],
    asthmaUseNote: 'İKS kontrol edici; küçük çocukta pMDI + spacer/maske, büyük çocukta uygun cihaz tekniğiyle.',
    martSmart: '-',
    ageNote: 'Yaş sınırı ve doz ürün KÜB/KT ile doğrulanır.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
  {
    id: 'fluticasone_nebule',
    role: 'medium_dose_ics',
    activeIngredientTr: 'Flutikazon propiyonat nebül',
    brandExamplesTr: ['Flixotide Nebules', 'Flixair nebül', 'FLOBEN vb. jenerikler'],
    formsAndStrengths: ['0.5 mg/2 mL', '2 mg/2 mL; ürün formuna göre'],
    asthmaUseNote: 'Nebül İKS; yüksek steroid yükü olabileceği için özel durum/uzman izlemiyle değerlendirilir.',
    martSmart: '-',
    ageNote: 'Pediatrik yaş aralığı ve endikasyon ürün bazında kontrol edilir.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
  {
    id: 'budesonide_nebule',
    role: 'low_dose_ics_pmdi_nebule',
    activeIngredientTr: 'Budesonid nebül',
    brandExamplesTr: ['Pulmicort nebül', 'budesonid nebül jenerikleri'],
    formsAndStrengths: ['0.25 mg/mL', '0.5 mg/mL', 'tek doz nebül formları'],
    asthmaUseNote: 'Okul öncesi ve cihaz tekniği sınırlı çocukta sık kullanılan İKS seçeneği.',
    martSmart: '-',
    ageNote: '6 ay ve üzeri gibi kullanımlar ürün KÜB/KT ile doğrulanır.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
  {
    id: 'ciclesonide_pmdi',
    role: 'low_dose_ics_pmdi_nebule',
    activeIngredientTr: 'Siklesonid',
    brandExamplesTr: ['Alvesco'],
    formsAndStrengths: ['80 mcg/puf', '160 mcg/puf'],
    asthmaUseNote: 'İKS kontrol edici; pMDI tekniği ve gerekirse spacer değerlendirilir.',
    martSmart: '-',
    ageNote: 'Genellikle 6 yaş ve üzeri kullanımlar için KÜB/KT doğrulanır.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
  {
    id: 'beclomethasone_ics',
    role: 'low_dose_ics_pmdi_nebule',
    activeIngredientTr: 'Beklometazon dipropiyonat',
    brandExamplesTr: ['Beklometazon içeren ürünler: editör/KÜB kontrolü bekliyor'],
    formsAndStrengths: ['50 mcg', '100 mcg', '250 mcg veya ürün formuna göre'],
    asthmaUseNote: 'İKS kontrol edici; standard/extrafine ayrımı doz kategorisi açısından önemlidir.',
    martSmart: '-',
    ageNote: 'Türkiye ürünü ve yaş sınırı mutlaka doğrulanır.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
  {
    id: 'budesonide_formoterol_80',
    role: 'ics_laba_formoterol_child',
    activeIngredientTr: 'Budesonid + formoterol',
    brandExamplesTr: ['Symbicort Pediatrik Turbuhaler 80/4.5'],
    formsAndStrengths: ['80/4.5 mcg delivered veya ürün eşdeğerliği KÜB’e göre'],
    asthmaUseNote: '6-11 yaşta seçilmiş Step 3-4 MART bağlamında değerlendirilebilir; AIR-only Step 1-2 rutin değildir.',
    martSmart: '+',
    ageNote: 'Yaş ve MART kullanımı GINA 2026 + ürün KÜB/KT ile doğrulanır.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
  {
    id: 'budesonide_formoterol_160',
    role: 'ics_laba_formoterol_adolescent',
    activeIngredientTr: 'Budesonid + formoterol',
    brandExamplesTr: ['Symbicort Turbuhaler 160/4.5', 'Fenoster 160/4.5', 'Fornit 160/4.5', 'Forbuday 160/4.5', 'diğer budesonid-formoterol jenerikleri'],
    formsAndStrengths: ['160/4.5 mcg delivered veya ürün formuna göre'],
    asthmaUseNote: 'Adolesanda AIR/MART için ana formoterol kombinasyonu; toplam günlük inhalasyon sınırı doğrulanır.',
    martSmart: '+',
    ageNote: '12 yaş ve üzeri bağlamında ürün/KÜB doğrulanır.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
  {
    id: 'beclomethasone_formoterol',
    role: 'ics_laba_formoterol_adolescent',
    activeIngredientTr: 'Beklometazon dipropiyonat + formoterol',
    brandExamplesTr: ['Foster 100/6 aerosol', 'Foster Nexthaler 100/6'],
    formsAndStrengths: ['100/6 mcg/doz; cihaz ve delivered/metered ayrımı ürüne göre'],
    asthmaUseNote: 'Formoterol içerdiği için MART potansiyeli vardır; Türkiye KÜB/KT ve yaşa göre ayrıca doğrulanır.',
    martSmart: 'doğrula',
    ageNote: '12 yaş altı için otomatik önerilmez; ürün etiketi kontrol edilir.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
  {
    id: 'fluticasone_salmeterol_diskus',
    role: 'ics_laba_salmeterol_child',
    activeIngredientTr: 'Flutikazon propiyonat + salmeterol',
    brandExamplesTr: ['Seretide Diskus', 'Pavtide Diskus', 'Neutec/diğer eşdeğer diskus formları'],
    formsAndStrengths: ['50/100 mcg', '50/250 mcg', '50/500 mcg; ürün formuna göre'],
    asthmaUseNote: 'İKS/LABA kontrol edici; salmeterol içerdiği için rahatlatıcı/MART değildir.',
    martSmart: '-',
    ageNote: '4 yaş ve üzeri gibi kullanımlar ürün bazında doğrulanır.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
  {
    id: 'fluticasone_salmeterol_pmdi_capsule',
    role: 'ics_laba_salmeterol_adolescent',
    activeIngredientTr: 'Flutikazon propiyonat + salmeterol',
    brandExamplesTr: ['Seretide Inhaler', 'PEFSAL inhaler', 'RESPİRO inhaler', 'Fludalt Duo', 'eşdeğer pMDI/kapsül formları'],
    formsAndStrengths: ['25/50 mcg', '25/125 mcg', '25/250 mcg', '50/100-250-500 mcg kapsül formları'],
    asthmaUseNote: 'Kontrol edici İKS/LABA; akut rahatlatıcı veya MART değildir.',
    martSmart: '-',
    ageNote: 'Yaş, doz ve cihaz tipi KÜB/KT ile doğrulanır.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
  {
    id: 'salbutamol',
    role: 'saba_pmdi_nebule',
    activeIngredientTr: 'Salbutamol',
    brandExamplesTr: ['Ventolin inhaler/nebül', 'Salbutol inhaler', 'Vent-O-Sal inhaler', 'Salres nebül', 'Ventosal nebül', 'diğer salbutamol formları'],
    formsAndStrengths: ['100 mcg/puf', '2.5 mg/2.5 mL', '5 mg/2.5 mL bazı formlar'],
    asthmaUseNote: 'Rahatlatıcı/atak bronkodilatörü; İKS içeren kontrol planının yerine geçmez.',
    martSmart: '-',
    ageNote: 'Doz ve sıklık kurum protokolü/KÜB ile doğrulanır.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
  {
    id: 'ipratropium',
    role: 'sama_acute',
    activeIngredientTr: 'İpratropium bromür',
    brandExamplesTr: ['Atrovent', 'Atrivo', 'Iprabul vb. jenerikler'],
    formsAndStrengths: ['250 mcg/2 mL', '500 mcg/2 mL veya ürün formuna göre'],
    asthmaUseNote: 'Özellikle akut ağır atakta SABA ile birlikte düşünülebilir; idame astım kontrol edicisi değildir.',
    martSmart: '-',
    ageNote: 'Pediatrik doz/yaş KÜB ve acil protokolle doğrulanır.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
  {
    id: 'salbutamol_ipratropium',
    role: 'saba_sama_acute',
    activeIngredientTr: 'Salbutamol + ipratropium',
    brandExamplesTr: ['Combivent tek dozluk flakon', 'eşdeğer salbutamol/ipratropium nebül formları'],
    formsAndStrengths: ['Salbutamol 2.5 mg + ipratropium 0.5 mg / 2.5 mL gibi formlar'],
    asthmaUseNote: 'Akut bronkospazm bağlamında protokole göre; kontrol edici değildir.',
    martSmart: '-',
    ageNote: 'Çocuk yaş grubunda ürün KÜB ve kurum protokolü özellikle kontrol edilir.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
  {
    id: 'montelukast',
    role: 'ltra',
    activeIngredientTr: 'Montelukast',
    brandExamplesTr: ['Singulair', 'Notta', 'Aircomb monoterapi değildir; montelukast jenerikleri editörce tamamlanacak'],
    formsAndStrengths: ['4 mg saşe/çiğneme', '5 mg çiğneme', '10 mg tablet; ürün formuna göre'],
    asthmaUseNote: 'İnhaler değildir; seçilmiş hastada alternatif/ek kontrol edici olarak değerlendirilir.',
    martSmart: '-',
    ageNote: 'Yaş ve endikasyon KÜB/KT ile doğrulanır; nöropsikiyatrik yan etki danışmanlığı gerekir.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
  {
    id: 'tiotropium',
    role: 'lama',
    activeIngredientTr: 'Tiotropium',
    brandExamplesTr: ['Spiriva Respimat veya tiotropium içeren ürünler: astım endikasyonu editör/KÜB kontrolü bekliyor'],
    formsAndStrengths: ['Respimat dozları ürün formuna göre'],
    asthmaUseNote: 'Step 5/ek tedavi bağlamında uzman değerlendirmesiyle düşünülür.',
    martSmart: '-',
    ageNote: 'Pediatrik astım endikasyonu ve yaş sınırı KÜB/KT ile doğrulanır.',
    sourceVersion: SOURCE_VERSION,
    sourceNote: SOURCE_NOTE,
  },
];

export function getAsthmaInhalersByRoles(roleIds: string[]) {
  return turkeyAsthmaInhalers.filter((item) => roleIds.includes(item.role));
}
