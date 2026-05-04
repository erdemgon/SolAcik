import type { PediatricTbDrugKey } from './tbDrugs';

export type TbTestSelectionRule = {
  condition: string;
  recommendation: string;
  note: string;
};

export type TbeRegimen = {
  id: string;
  title: string;
  duration: string;
  drugs: PediatricTbDrugKey[];
  notes: string[];
};

export type TbDiseaseRegimen = {
  id: string;
  title: string;
  initialPhase: string;
  continuationPhase: string;
  totalDuration: string;
  drugsInitial: PediatricTbDrugKey[];
  drugsContinuation: PediatricTbDrugKey[];
  notes: string[];
};

export const tbTestSelectionRules: TbTestSelectionRule[] = [
  {
    condition: '2 yaş altı çocuk',
    recommendation: 'TDT önerilir; İGST veya TBDT yapılabilir.',
    note: 'İGST bu yaşta belirsiz/geçersiz sonuç verebilir; pozitif sonuç anlamlı kabul edilmelidir.',
  },
  {
    condition: '2 yaş üstü ve BCG aşılı çocuk',
    recommendation: 'İGST veya TBDT önerilir.',
    note: 'BCG, TDT özgüllüğünü azaltabilir; İGST/TBDT BCG’den etkilenmez.',
  },
  {
    condition: '2 yaş üstü, deri testi sonucunu okutmak için geri gelme olasılığı düşük',
    recommendation: 'İGST önerilir.',
    note: 'Okuma gerektirmediği için pratik olabilir.',
  },
  {
    condition: 'TDT kontrendike veya yapılamıyor',
    recommendation: 'İGST önerilir.',
    note: 'İGST belirsiz/geçersiz ise TBDT/TDT veya İGST tekrarı düşünülebilir.',
  },
  {
    condition: 'Başlangıç TDT veya İGST negatif ama TB hastalığı şüphesi yüksek',
    recommendation: 'Yapılmamış olan diğer test yapılır.',
    note: 'Test negatifliği aktif TB’yi dışlamaz.',
  },
  {
    condition: 'Başlangıç TDT pozitif, 2 yaş üstü çocukta ek destek gerekli',
    recommendation: 'TBDT veya İGST önerilir.',
    note: 'Özellikle TB dışı mikobakteri hastalığı ayırıcı tanısında yardımcı olabilir.',
  },
  {
    condition: 'Bağışıklığı baskılanmış çocuk',
    recommendation: 'Duyarlılığı artırmak için TDT ve İGST birlikte düşünülebilir.',
    note: 'Negatif test aktif TB’yi dışlamaz.',
  },
];

export const tdtInterpretationNotes = [
  'TDT aktif hastalık ile TBE ayrımını yapmaz.',
  'TDT tedavi başarısını değerlendirmek için kullanılmaz.',
  'TDT pozitifliği tedaviden sonra genellikle negatifleşmez.',
  'BCG aşısı TDT pozitifliğine katkıda bulunabilir.',
  'İGST BCG aşısından etkilenmez.',
  'Aktif TB, özellikle ağır TB formlarında TDT yalancı negatif olabilir.',
  'TBE veya TB hastalığı düşünülen çocukta sonuç her zaman klinik bağlamla yorumlanmalıdır.',
];

export const diagnosticChecklist = [
  'Temas öyküsü',
  'Uyumlu semptomlar',
  'Uyumlu fizik muayene',
  'Uyumlu akciğer grafisi / BT bulguları',
  'TDT / TBDT / İGST sonucu',
  'Mikrobiyolojik inceleme: balgam, indükte balgam, açlık mide suyu, BAL',
  'NAAT / moleküler test',
  'Kültür ve ilaç duyarlılık testi',
  'Gerektiğinde histopatoloji',
];

export const tbeRegimens: TbeRegimen[] = [
  {
    id: 'inh_6m',
    title: 'İNH 6 ay',
    duration: '6 ay',
    drugs: ['H'],
    notes: [
      'Çocuklarda İNH 10 mg/kg/gün, maksimum 300 mg/gün.',
      'Aktif TB hastalığı dışlanmadan başlanmaz.',
    ],
  },
  {
    id: 'inh_9m',
    title: 'İNH 9 ay',
    duration: '9 ay',
    drugs: ['H'],
    notes: [
      'HIV pozitif, silikozis, TNF-alfa blokörü veya diğer bağışıklığı baskılayıcı tedavi alanlarda 9 ay önerilebilir.',
      'Çocuklarda İNH 10 mg/kg/gün, maksimum 300 mg/gün.',
    ],
  },
  {
    id: 'rif_4m',
    title: 'RİF 4 ay',
    duration: '4 ay',
    drugs: ['R'],
    notes: ['Çocuklarda RİF 15 mg/kg/gün, maksimum 600 mg/gün.'],
  },
  {
    id: 'inh_rif_3m',
    title: 'İNH + RİF 3 ay',
    duration: '3 ay',
    drugs: ['H', 'R'],
    notes: ['İNH ve RİF dozları günlük koruyucu tedavi dozları ile hesaplanır.'],
  },
  {
    id: 'inh_rpt_weekly_3m',
    title: 'İNH + Rifapentin 3 ay, haftada 1, 12 doz',
    duration: '3 ay / 12 haftalık doz',
    drugs: ['H_weekly', 'RPT_weekly'],
    notes: [
      'İNH 15 mg/kg, maksimum 900 mg, haftada 1.',
      'Rifapentin kilo bandına göre hesaplanır.',
      'Gözetimli uygulanmalıdır.',
    ],
  },
  {
    id: 'inh_rpt_daily_1m',
    title: 'İNH + Rifapentin 1 ay, günlük',
    duration: '1 ay / 30 doz',
    drugs: ['H_daily_1m', 'RPT_daily_1m'],
    notes: [
      '25 kg ve üzeri kişilerde günlük İNH 300 mg + Rifapentin 600 mg.',
      '25 kg altı için bu ekranda otomatik öneri verme; uzman/rehber kontrolü uyarısı göster.',
    ],
  },
  {
    id: 'levo_6m_mdr_contact',
    title: 'Levofloksasin 6 ay — RD/ÇİD-TB temaslısı',
    duration: '6 ay',
    drugs: ['LEV'],
    notes: [
      'Yalnızca RD/ÇİD-TB temaslısı için; aktif TB hastalığı dışlanmalıdır.',
      '<30 kg çocuklarda 15–20 mg/kg/gün; ≥30 kg çocuk/erişkinde 750–1000 mg/gün; maksimum 1500 mg/gün.',
      'Uzman/VSD/referans merkez süreci ile değerlendirilmelidir.',
    ],
  },
];

export const tbDiseaseRegimens: TbDiseaseRegimen[] = [
  {
    id: 'pulmonary_or_lymphadenitis_or_nonsevere_eptb',
    title: 'Akciğer TB / TB lenfadenit / ağır olmayan akciğer dışı TB',
    initialPhase: '2 ay HRZ(E)',
    continuationPhase: '4 ay HR',
    totalDuration: '6 ay',
    drugsInitial: ['H', 'R', 'Z', 'E_optional'],
    drugsContinuation: ['H', 'R'],
    notes: [
      'Ağır olmayan TB formları: periferik lenf nodu TB, havayolu basısı yapmayan intratorasik lenf nodu TB, düşük bakteri yükü, yayma negatif, kavitesiz/miliyer olmayan, tek lobla sınırlı yaygın olmayan akciğer TB, komplike olmayan TB plörezi.',
      'Etambutol seçimi klinik bağlama göre değerlendirilmelidir.',
    ],
  },
  {
    id: 'cavitary_extensive_smear_positive_or_severe_eptb',
    title: 'Kaviteli/yaygın/yayma pozitif akciğer TB veya ağır akciğer dışı TB',
    initialPhase: '2 ay HRZE',
    continuationPhase: '4 ay HR',
    totalDuration: '6 ay',
    drugsInitial: ['H', 'R', 'Z', 'E'],
    drugsContinuation: ['H', 'R'],
    notes: ['Yaygın, kaviteli veya yayma pozitif hastalıkta dört ilaçlı başlangıç tedavisi göster.'],
  },
  {
    id: 'miliary_tb',
    title: 'Miliyer TB',
    initialPhase: '2 ay HRZE',
    continuationPhase: '4 ay HR',
    totalDuration: '6 ay; SSS veya kemik-eklem tutulumu varsa 12 ay',
    drugsInitial: ['H', 'R', 'Z', 'E'],
    drugsContinuation: ['H', 'R'],
    notes: [
      'Miliyer TB’de SSS veya kemik-eklem tutulumu varsa toplam tedavi 12 ay olarak göster.',
      'Kompleks hastalık uyarısı ver.',
    ],
  },
  {
    id: 'congenital_neonatal_tb',
    title: 'Konjenital / neonatal TB',
    initialPhase: '2 ay HRZE',
    continuationPhase: '4 ay HR',
    totalDuration: '6 ay; SSS veya kemik-eklem tutulumu varsa 12 ay',
    drugsInitial: ['H', 'R', 'Z', 'E'],
    drugsContinuation: ['H', 'R'],
    notes: [
      'Neonatal TB referans merkez/uzman konsültasyonu gerektirir.',
      'Konjenital TB araştırması ve mikrobiyolojik değerlendirme vurgulanmalıdır.',
    ],
  },
  {
    id: 'immunosuppressed_child_tb',
    title: 'Bağışıklığı baskılanmış çocukta TB',
    initialPhase: '2 ay HRZE',
    continuationPhase: '7–10 ay HR',
    totalDuration: '9–12 ay',
    drugsInitial: ['H', 'R', 'Z', 'E'],
    drugsContinuation: ['H', 'R'],
    notes: [
      'İmmünsüpresyon varlığında uzman/referans merkez değerlendirmesi önerilir.',
      'Tedavi süresi ve takip klinik duruma göre netleştirilmelidir.',
    ],
  },
  {
    id: 'bone_joint_tb',
    title: 'Kemik-eklem TB',
    initialPhase: '2 ay HRZE',
    continuationPhase: '10 ay HR',
    totalDuration: '12 ay',
    drugsInitial: ['H', 'R', 'Z', 'E'],
    drugsContinuation: ['H', 'R'],
    notes: ['Ortopedi/enfeksiyon/çocuk TB uzman değerlendirmesi gerekebilir.'],
  },
  {
    id: 'tb_meningitis',
    title: 'TB menenjit',
    initialPhase: '2 ay HRZE',
    continuationPhase: '10 ay HR',
    totalDuration: '12 ay',
    drugsInitial: ['H', 'R', 'Z', 'E'],
    drugsContinuation: ['H', 'R'],
    notes: [
      'Acil ve ağır klinik durumdur; mutlaka referans merkez/uzman konsültasyonu uyarısı ver.',
      'Kortikosteroid gereksinimi klinisyen tarafından değerlendirilmelidir.',
    ],
  },
];

export const monitoringCards = [
  {
    title: 'Aktif hastalık dışlanmadan koruyucu tedavi başlanmaz',
    content: [
      'Öykü, fizik muayene ve akciğer grafisi ile TB hastalığı araştırılmalıdır.',
      'TB hastalığından şüphelenilirse bakteriyolojik değerlendirme gerekir.',
      'Hastalık varsa koruyucu tedavi değil, standart hastalık tedavisi verilir.',
    ],
  },
  {
    title: 'Etambutol uyarısı',
    content: [
      'Görme ile ilgili yan etkiler açısından aile bilgilendirilmeli.',
      'Tedavi başlangıcında göz muayenesi önerilir.',
      'Kullanım süresince optik nörit bulguları sorgulanmalı.',
    ],
  },
  {
    title: 'Piridoksin uyarısı',
    content: [
      'Malnütrisyon, diabetes mellitus, kronik böbrek yetmezliği, epilepsi, gebe veya emziren ergenlerde piridoksin 10 mg/gün eklenmelidir.',
    ],
  },
  {
    title: 'Direnç şüphesi',
    content: [
      'RD/ÇİD-TB temaslısı, tedavi başarısızlığı, önceki tedavi öyküsü, dirençli hasta teması veya yüksek dirençli bölgeden gelme varsa standart hesaplayıcı ile otomatik tedavi önerme.',
      'Referans merkez/uzman konsültasyonu öner.',
    ],
  },
  {
    title: 'Doz güncelleme',
    content: ['Çocuk kilo aldıkça dozlar yeni vücut ağırlığına göre yeniden değerlendirilmelidir.'],
  },
];
