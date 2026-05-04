export type PneumoniaTrack = 'cap' | 'immunocompromised';
export type SeveritySignalKey =
  | 'hypoxemia'
  | 'distress'
  | 'toxic'
  | 'poorFeeding'
  | 'dehydration'
  | 'apnea'
  | 'altered'
  | 'complication'
  | 'youngInfant'
  | 'comorbidity';
export type ImmunosuppressionKey =
  | 'neutropenia'
  | 'transplant'
  | 'steroidBiologic'
  | 'primaryImmunodeficiency'
  | 'hiv'
  | 'oncology'
  | 'asplenia'
  | 'malnutrition';

export type AntibioticScenario = {
  id: string;
  track: PneumoniaTrack;
  title: string;
  when: string;
  likelyPathogens: string;
  firstLine: string[];
  alternatives: string[];
  escalation: string[];
  notes: string[];
};

export const pneumoniaSource = {
  badge:
    'Kaynak yaklaşımı: Türk Toraks Derneği Çocuklarda TGP Uzlaşı Raporu 2023 + TTD bağışıklığı baskılanmış çocuk pnömonisi uzlaşı yaklaşımı — yerel protokol ile doğrulanmalıdır.',
  warning:
    'Bu modül reçete yazmaz. Antibiyotik seçimi; yaş, ağırlık, aşı durumu, klinik ağırlık, alerji, lokal direnç, mikrobiyoloji, böbrek/karaciğer fonksiyonu, ilaç etkileşimleri ve kurum protokolü ile doğrulanmalıdır.',
};

export const severitySignals: { key: SeveritySignalKey; label: string; note: string }[] = [
  {
    key: 'hypoxemia',
    label: 'Hipoksemi / oksijen ihtiyacı',
    note: 'SpO2 düşüklüğü, siyanoz veya oksijen gereksinimi yatış/ağır pnömoni açısından uyarıcıdır.',
  },
  {
    key: 'distress',
    label: 'Belirgin solunum sıkıntısı',
    note: 'Taşipne, retraksiyon, inleme, burun kanadı solunumu veya yorulma.',
  },
  {
    key: 'toxic',
    label: 'Toksik görünüm / sepsis şüphesi',
    note: 'Perfüzyon bozukluğu, hipotansiyon, uzamış kapiller dolum veya ağır genel durum.',
  },
  {
    key: 'poorFeeding',
    label: 'Beslenememe',
    note: 'Oral alımın belirgin azalması, kusma veya tedaviyi ağızdan alamama.',
  },
  {
    key: 'dehydration',
    label: 'Dehidratasyon',
    note: 'Sıvı tedavisi ve yakın izlem gereksinimi.',
  },
  {
    key: 'apnea',
    label: 'Apne',
    note: 'Özellikle küçük bebekte acil değerlendirme gerektirir.',
  },
  {
    key: 'altered',
    label: 'Bilinç değişikliği',
    note: 'Yaşamı tehdit eden enfeksiyon veya hipoksemi lehine olabilir.',
  },
  {
    key: 'complication',
    label: 'Komplikasyon şüphesi',
    note: 'Plevral efüzyon, ampiyem, nekrotizan pnömoni, apse veya pnömotoraks.',
  },
  {
    key: 'youngInfant',
    label: 'Küçük bebek',
    note: 'Özellikle 3 ay altı bebekte daha düşük yatış eşiği.',
  },
  {
    key: 'comorbidity',
    label: 'Komorbidite',
    note: 'Kronik akciğer/kalp hastalığı, nöromüsküler hastalık, immün baskılanma veya teknoloji bağımlılığı.',
  },
];

export const immunosuppressionSignals: {
  key: ImmunosuppressionKey;
  label: string;
  note: string;
}[] = [
  {
    key: 'neutropenia',
    label: 'Nötropeni',
    note: 'Gram negatif, Pseudomonas, invaziv fungal enfeksiyon ve hızlı kötüleşme riski.',
  },
  {
    key: 'transplant',
    label: 'Solid organ / KİT',
    note: 'Zamanlama, immünsüpresyon yoğunluğu ve profilaksiye göre bakteri, viral, fungal ve PJP riski değişir.',
  },
  {
    key: 'steroidBiologic',
    label: 'Steroid / biyolojik / immünsüpresif',
    note: 'PJP, viral, fungal ve fırsatçı enfeksiyon riski ilaç ve dozla değişir.',
  },
  {
    key: 'primaryImmunodeficiency',
    label: 'Primer immün yetmezlik',
    note: 'Defekt tipine göre kapsüllü bakteriler, fırsatçı patojenler veya fungal etkenler öne çıkabilir.',
  },
  {
    key: 'hiv',
    label: 'HIV / T hücre baskılanması',
    note: 'PJP, TB, bakteriyel ve viral pnömoni riski CD4 ve profilaksiye göre değerlendirilir.',
  },
  {
    key: 'oncology',
    label: 'Onkoloji hastası',
    note: 'Nötropeni, mukozit, kateter ve hastane temasına göre geniş spektrum gerekebilir.',
  },
  {
    key: 'asplenia',
    label: 'Aspleni / orak hücre',
    note: 'Kapsüllü bakteriler ve sepsis riski nedeniyle hızlı değerlendirme gerekir.',
  },
  {
    key: 'malnutrition',
    label: 'Ağır malnütrisyon / kronik hastalık',
    note: 'Etken spektrumu, klinik ağırlık ve tedavi yanıtı değişebilir.',
  },
];

export const diagnosticChecklist = [
  'Yaş, ateş süresi, öksürük tipi, solunum sayısı, SpO2, beslenme ve genel durum',
  'Aşı durumu: pnömokok, Hib, influenza ve COVID dahil',
  'Viral semptomlar, hışıltı/bronşiolit, astım, yabancı cisim ve TB ayırıcı tanısı',
  'Ağır hastalıkta tam kan, CRP/prokalsitonin, kan kültürü ve uygun mikrobiyoloji',
  'Ayaktan hafif pnömonide rutin laboratuvar ve grafi her zaman gerekli değildir; klinik bağlama göre',
  'Yatış, hipoksemi, komplikasyon veya tanı belirsizliğinde akciğer grafisi',
  'Efüzyon şüphesinde akciğer USG; gerekirse parapnömonik efüzyon modülüne geç',
  'Tedaviye yanıtsızlıkta komplikasyon, direnç, atipik etken, aspirasyon, TB, immün yetmezlik veya yanlış tanı düşün',
];

export const capSupportiveCare = [
  'Oksijen gereksinimini SpO2 ve klinikle değerlendir; hedefler kurum protokolüne göre uygulanır.',
  'Sıvı dengesini izle; gereksiz aşırı hidrasyondan kaçın.',
  'Ateş ve ağrı kontrolü sağla.',
  'Bronkodilatör yalnızca eşlik eden bronkospazm/hışıltı varsa klinik deneme olarak düşünülebilir.',
  'Öksürük kesici, rutin mukolitik ve gereksiz kontrol grafisinden kaçın.',
  'Aileye kötüleşme bulguları ve kontrol zamanı net yazılı anlatılmalıdır.',
];

export const antibioticScenarios: AntibioticScenario[] = [
  {
    id: 'cap_outpatient_preschool',
    track: 'cap',
    title: 'Ayaktan, hafif-orta TGP — okul öncesi',
    when: 'Genel durumu iyi, hipoksemi yok, oral alabiliyor, komplikasyon bulgusu yok.',
    likelyPathogens: 'Viral etkenler sık; bakteriyel düşünülürse Streptococcus pneumoniae ön planda.',
    firstLine: ['Amoksisilin yüksek doz yaklaşımı; doz ve süre KÜB/KT ve yerel rehberle doğrulanır.'],
    alternatives: [
      'Beta-laktam alerjisi veya özel durumlarda enfeksiyon/yerel rehberle alternatif seçilir.',
      'Belirgin viral klinikte antibiyotik gerekmeyebilir; klinik izlem önemlidir.',
    ],
    escalation: [
      '48–72 saatte kötüleşme/yanıtsızlık varsa yeniden değerlendirme.',
      'Efüzyon, nekrotizan pnömoni, apse veya sepsis bulgusu varsa yatış/ileri değerlendirme.',
    ],
    notes: [
      'Antibiyotik kararı yaş, ateş, odak bulgusu, laboratuvar ve radyoloji ile birlikte verilmelidir.',
    ],
  },
  {
    id: 'cap_outpatient_school',
    track: 'cap',
    title: 'Ayaktan, okul çağı/adolesan',
    when: 'Oral alabilen, hipoksemisi olmayan, ağır klinik bulgusu olmayan çocuk.',
    likelyPathogens: 'S. pneumoniae; okul çağında Mycoplasma pneumoniae ve Chlamydia pneumoniae düşünülebilir.',
    firstLine: [
      'Tipik bakteriyel klinikte amoksisilin temelli yaklaşım.',
      'Atipik pnömoni kliniği baskınsa makrolid seçeneği; yerel direnç ve KÜB/KT ile doğrula.',
    ],
    alternatives: [
      'Tipik-atipik ayrımı net değilse beta-laktam + makrolid kombinasyonu seçilmiş olguda düşünülebilir.',
    ],
    escalation: [
      'Klinik yanıt yoksa komplikasyon, direnç, TB, aspirasyon veya alternatif tanı düşün.',
    ],
    notes: [
      'Makrolid kullanımı otomatik olmamalı; atipik klinik ve yerel direnç dikkate alınmalıdır.',
    ],
  },
  {
    id: 'cap_inpatient_nonsevere',
    track: 'cap',
    title: 'Yatan hasta — ağır olmayan TGP',
    when: 'Yatış gerektiriyor ancak sepsis/yoğun bakım bulgusu yok.',
    likelyPathogens: 'S. pneumoniae başta; aşı durumu ve yaşa göre H. influenzae, S. aureus ve atipikler.',
    firstLine: [
      'Ampisilin / penisilin G veya üçüncü kuşak sefalosporin seçenekleri; aşı durumu ve yerel dirençle belirlenir.',
    ],
    alternatives: [
      'Atipik etken şüphesinde makrolid eklenmesi değerlendirilebilir.',
      'Beta-laktam alerjisinde uzman/yerel protokol seçimi gerekir.',
    ],
    escalation: [
      'Klinik kötüleşme, ampiyem veya nekrotizan pnömonide spektrum ve kaynak kontrolü yeniden değerlendirilir.',
    ],
    notes: [
      'IV tedaviden oral tedaviye geçiş; ateş, solunum işi, oksijen ihtiyacı ve oral alım düzelince düşünülür.',
    ],
  },
  {
    id: 'cap_severe_icu',
    track: 'cap',
    title: 'Ağır TGP / yoğun bakım olasılığı',
    when: 'Hipoksemi, sepsis, belirgin solunum sıkıntısı, bilinç değişikliği veya komplikasyon bulgusu.',
    likelyPathogens: 'Pnömokok, S. aureus, komplike bakteriyel pnömoni; influenza sonrası MRSA riski.',
    firstLine: [
      'Geniş etkili beta-laktam: sefotaksim/seftriakson gibi seçenekler yerel protokole göre.',
      'MRSA/nekrotizan pnömoni riski varsa vankomisin veya klindamisin/linezolid seçenekleri uzmanla değerlendirilir.',
    ],
    alternatives: [
      'Atipik veya ağır adolesan pnömonisinde makrolid eklenmesi düşünülebilir.',
    ],
    escalation: [
      'Yoğun bakım, oksijen/solunum desteği, mikrobiyolojik örnekleme ve komplikasyon için USG/BT değerlendirmesi.',
      'Kaynak kontrolü: ampiyem varsa drenaj/fibrinolitik/cerrahi yaklaşım için ilgili modüle geç.',
    ],
    notes: [
      'Ağır pnömonide antibiyotik gecikmemeli; kültürler mümkünse antibiyotik öncesi alınmalıdır.',
    ],
  },
  {
    id: 'immunocompromised_initial',
    track: 'immunocompromised',
    title: 'Bağışıklığı baskılanmış çocukta ilk yaklaşım',
    when: 'Herhangi bir immün baskılanma + yeni infiltrasyon, ateş, öksürük, dispne veya hipoksemi.',
    likelyPathogens:
      'Bakteriler, Pseudomonas, viral etkenler, PJP, fungal etkenler, Nocardia, mikobakteriler; immün defekt ve zamanlamaya göre değişir.',
    firstLine: [
      'Standart ayaktan CAP algoritmasını otomatik uygulama.',
      'Çoğu olguda erken yatış/uzman görüşü ve geniş mikrobiyolojik değerlendirme gerekir.',
      'Ampirik tedavi; anti-psödomonal beta-laktam temelli geniş spektrum olarak kurum/uzman protokolüne göre seçilir.',
    ],
    alternatives: [
      'MRSA/kateter/cilt odak riski varsa gram pozitif kapsama eklenmesi değerlendirilir.',
      'PJP riski varsa TMP-SMX tedavi dozu uzman kararıyla eklenir.',
      'Viral, CMV veya influenza şüphesinde hedefe yönelik antiviral değerlendirilir.',
    ],
    escalation: [
      'Nötropeni veya hızlı kötüleşmede yoğun bakım ve invaziv/noninvaziv örnekleme eşiği düşüktür.',
      'Uzamış nötropeni veya nodüler/halo bulgusu varsa invaziv fungal enfeksiyon açısından erken değerlendirme.',
    ],
    notes: [
      'Profilaksi kullanımı etken olasılığını değiştirir; kullanılan profilaksi ve son immünsüpresyon zamanı sorgulanmalıdır.',
    ],
  },
  {
    id: 'immunocompromised_pjp',
    track: 'immunocompromised',
    title: 'PJP olasılığı',
    when: 'T hücre baskılanması, steroid/kemoterapi/KİT, HIV veya profilaksi almama + hipoksemi ve yaygın interstisyel/buzlu cam bulgular.',
    likelyPathogens: 'Pneumocystis jirovecii; eş zamanlı viral/bakteriyel enfeksiyon olabilir.',
    firstLine: ['TMP-SMX temel tedavi seçeneğidir; doz, süre ve steroid endikasyonu uzman protokolüyle belirlenir.'],
    alternatives: [
      'TMP-SMX kullanılamıyorsa alternatif ajanlar enfeksiyon/immünoloji uzmanıyla seçilir.',
    ],
    escalation: [
      'Hipoksemi belirginse destek tedavisi, yoğun bakım ve eşlik eden etkenler için geniş tanısal çalışma.',
    ],
    notes: [
      'PJP şüphesinde normal oskültasyon yanıltıcı olabilir; oksijenasyon ve görüntüleme önemlidir.',
    ],
  },
  {
    id: 'immunocompromised_fungal',
    track: 'immunocompromised',
    title: 'İnvaziv fungal pnömoni olasılığı',
    when: 'Uzamış nötropeni, KİT, yoğun immünsüpresyon, persistan ateş, nodül/halo/kavitasyon.',
    likelyPathogens: 'Aspergillus ve diğer küfler; Candida genellikle primer pnömoni etkeni değildir.',
    firstLine: [
      'Antifungal tedavi seçimi görüntüleme, galaktomannan/BDG, kültür/PCR ve uzman değerlendirmesi ile yapılır.',
    ],
    alternatives: [
      'Vorikonazol, liposomal amfoterisin B veya ekinokandin seçenekleri klinik senaryoya göre değerlendirilir.',
    ],
    escalation: [
      'Toraks BT, fungal belirteçler, BAL ve hematoloji/enfeksiyon/yoğun bakım iş birliği.',
    ],
    notes: ['Fungal tedavi ampirik başlanacaksa ilaç etkileşimleri ve karaciğer fonksiyonları kritik önemdedir.'],
  },
];

export const followUpItems = [
  '48–72 saat içinde klinik yanıt: ateş, solunum işi, SpO2, oral alım ve genel durum',
  'Yanıtsızlıkta tanı, komplikasyon, direnç, uygunsuz antibiyotik, uyumsuzluk ve alternatif hastalıkları yeniden değerlendir',
  'Rutin kontrol grafisi her hastada gerekmez; persistan semptom, lobar kollaps, yuvarlak pnömoni, komplikasyon veya tekrarlayan pnömonide planlanır',
  'Tekrarlayan pnömonide aspirasyon, yabancı cisim, bronşektazi, CF, PCD, immün yetmezlik ve anatomik lezyon araştır',
  'Aşı eksikleri ve sigara/pasif duman maruziyeti kontrol edilmelidir',
];

export function classifyPneumoniaSeverity(selected: SeveritySignalKey[]) {
  const critical = ['hypoxemia', 'toxic', 'altered', 'apnea', 'complication'];
  const criticalCount = selected.filter((item) => critical.includes(item)).length;

  if (criticalCount > 0 || selected.length >= 4) {
    return {
      tone: 'red' as const,
      title: 'Ağır pnömoni / yatış değerlendirmesi',
      action:
        'Oksijenasyon, sepsis, komplikasyon ve yoğun bakım gereksinimi açısından acil değerlendirme; ampirik tedavi ve mikrobiyoloji kurum protokolüne göre.',
    };
  }

  if (selected.length >= 2) {
    return {
      tone: 'amber' as const,
      title: 'Yakın izlem / yatış eşiği düşük',
      action:
        'Beslenme, solunum işi, sosyal koşullar ve 24–48 saat kontrol imkanı ile birlikte yatış veya yakın poliklinik izlem kararı.',
    };
  }

  return {
    tone: 'gray' as const,
    title: 'Ayaktan izlem düşünülebilir',
    action:
      'Genel durum iyi, hipoksemi yok, oral alım yeterli ve aile uyarı bulgularını anlayabiliyorsa ayaktan yaklaşım düşünülebilir.',
  };
}

export function getTrackWarning(track: PneumoniaTrack, immunosuppressionCount: number) {
  if (track === 'immunocompromised' || immunosuppressionCount > 0) {
    return 'Bağışıklığı baskılanmış çocukta etken spektrumu geniştir; standart TGP antibiyotik algoritması tek başına yeterli değildir. Enfeksiyon/immünoloji/ilgili primer ekip konsültasyonu gerekir.';
  }

  return 'Toplumda gelişen pnömonide antibiyotik gereksinimi klinik olasılığa göre belirlenir; viral klinikte gereksiz antibiyotikten kaçınılmalıdır.';
}
