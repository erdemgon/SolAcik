export type RiskProfile =
  | 'none'
  | 'chronic_lung'
  | 'immunocompromised'
  | 'asplenia'
  | 'chd'
  | 'prematurity_bpd'
  | 'cf'
  | 'other';

export type RsvSeasonContext = 'first_season' | 'second_season' | 'out_of_scope';

export type RespiratoryImmunizationInput = {
  ageMonths: number | null;
  weightKg: number | null;
  riskProfile: RiskProfile;
  receivedTwoPriorFluDoses: boolean;
  rsvSeasonContext: RsvSeasonContext;
};

export const respiratoryImmunizationSource = {
  badge:
    'Kaynak sürümü: CDC/ACIP 2025-2026 + EMA/FDA ürün bilgileri — Türkiye KÜB/KT, Ulusal Aşı Takvimi, SUT/geri ödeme ve kurum protokolü ile doğrulanmalıdır.',
  warning:
    'Bu modül aşı veya monoklonal antikor uygulama kararı vermez; eğitim ve hızlı hatırlatma amacı taşır. Endikasyon, kontrendikasyon, ürün yaşı, sezon, önceki dozlar, risk grubu, stok/geri ödeme ve kurum protokolü klinisyen tarafından doğrulanmalıdır.',
  sourceLinks: [
    {
      title: 'CDC. Pneumococcal Vaccine Recommendations. Updated 2026.',
      url: 'https://www.cdc.gov/pneumococcal/hcp/vaccine-recommendations/index.html',
    },
    {
      title: 'CDC. Summary of Risk-based Pneumococcal Vaccination Recommendations. Updated 2026.',
      url: 'https://www.cdc.gov/pneumococcal/hcp/vaccine-recommendations/risk-indications.html',
    },
    {
      title: 'CDC. RSV Immunization: Information for Health Care Providers.',
      url: 'https://www.cdc.gov/vaccines/hcp/by-disease/rsv.html',
    },
    {
      title: 'EMA. Beyfortus EPAR: nirsevimab.',
      url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/beyfortus',
    },
    {
      title: 'DailyMed. SYNAGIS palivizumab prescribing information.',
      url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=3a0096c7-8139-44cd-bba4-520ab05c2cb2',
    },
    {
      title: 'CDC. ACIP Recommendations Summary: Influenza 2025-2026.',
      url: 'https://www.cdc.gov/flu/hcp/acip/index.html',
    },
  ],
};

export const riskProfiles: { key: RiskProfile; label: string; note: string }[] = [
  { key: 'none', label: 'Risk yok / rutin', note: 'Rutin yaşa uygun koruma önerileri.' },
  { key: 'chronic_lung', label: 'Kronik akciğer hastalığı', note: 'Orta-ağır astım, BPD, kronik solunum yetmezliği gibi durumlar.' },
  { key: 'prematurity_bpd', label: 'Prematürite / BPD', note: 'RSV ikinci sezon ve pnömokok risk değerlendirmesi için önemli.' },
  { key: 'cf', label: 'Kistik fibrozis', note: 'Grip ve pnömokok risk değerlendirmesinde özellikle not edilir.' },
  { key: 'chd', label: 'Hemodinamik anlamlı KKH', note: 'RSV ve pnömokok risk değerlendirmesinde önemlidir.' },
  { key: 'immunocompromised', label: 'İmmünsüpresyon', note: 'Pnömokok ek doz ve canlı aşı uyarıları için kritik.' },
  { key: 'asplenia', label: 'Aspleni / orak hücre', note: 'İnvaziv pnömokok riski yüksek kabul edilir.' },
  { key: 'other', label: 'Diğer risk', note: 'Yerel protokol ve ilgili uzmanlık önerisiyle değerlendirilir.' },
];

export const pneumococcalCards = [
  {
    title: 'PCV20 — 20 valanlı konjuge pnömokok',
    role: 'Konjuge pnömokok aşısı',
    dose: '0.5 mL IM; ürün KÜB/KT’ye göre uygulanır.',
    schedule:
      'CDC rutin çocuk şemasında PCV15 veya PCV20: 2, 4, 6 ve 12–15 ay. Riskli 2–18 yaş çocuklarda önceki PCV durumuna göre tek PCV20 dozu birçok senaryoda PPSV23 gereksinimini kaldırabilir.',
    interval:
      'Riskli çocukta son PCV dozundan sonra PCV20/PPSV23 için genellikle en az 8 hafta aralık kullanılır; önceki aşı geçmişiyle doğrula.',
    turkeyNote:
      'Türkiye Ulusal Aşı Takvimi, piyasadaki ürün, ruhsat yaşı ve geri ödeme koşulları ayrıca kontrol edilmelidir.',
  },
  {
    title: 'PPSV23 — 23 valanlı polisakkarit pnömokok',
    role: 'Polisakkarit pnömokok aşısı',
    dose: '0.5 mL IM veya SC; 2 yaş altında kullanılmaz.',
    schedule:
      '≥2 yaş risk grubunda, PCV serisi tamamlandıktan sonra ve PCV20 kullanılmadıysa düşünülebilir. İmmünsüpresif/aspleni gibi yüksek riskte ikinci PPSV23 veya PCV20/PPSV23 dozu en az 5 yıl sonra gündeme gelebilir.',
    interval:
      'PCV sonrası PPSV23 için pediatrik riskli çocuklarda en az 8 hafta aralık pratik kuraldır; ürün ve ulusal protokolle doğrula.',
    turkeyNote:
      'PPSV23 kısa süreli immünite sağlar, konjuge aşı gibi güçlü immün hafıza oluşturmaz; risk grubu ve yaş mutlaka doğrulanmalıdır.',
  },
];

export const rsvCards = [
  {
    title: 'Nirsevimab',
    brands: 'Beyfortus',
    role: 'Uzun etkili RSV monoklonal antikoru',
    dose: '<8 ay ilk RSV sezonu: <5 kg 50 mg IM tek doz; ≥5 kg 100 mg IM tek doz. 8–19 ay yüksek riskli ikinci sezon: 200 mg IM, iki ayrı 100 mg enjeksiyon.',
    interval:
      'Sezon başlamadan hemen önce veya RSV sezonunda doğan bebekte doğumdan sonra mümkün olan erken dönemde uygulanır. Çocukluk aşılarıyla zamanlama açısından birlikte uygulanabilir; farklı enjektör ve farklı bölge kullanılır.',
    note:
      'Maternal RSV aşısı uygulanmışsa çoğu bebekte ayrıca RSV antikoru gerekmeyebilir; ülke/kurum önerisiyle doğrula.',
  },
  {
    title: 'Palivizumab',
    brands: 'Synagis',
    role: 'Aylık RSV monoklonal antikoru',
    dose: '15 mg/kg IM, RSV sezonu boyunca ayda bir. Konsantrasyon 100 mg/mL ise hacim: kilo × 15 / 100 mL.',
    interval:
      'İlk doz sezon öncesi; kalan dozlar yaklaşık aylık. Kardiyopulmoner bypass sonrası ek doz gerekebilir.',
    note:
      'Nirsevimab erişimi ve yerel geri ödeme koşullarına göre rolü değişebilir. Endikasyon ve SUT/kurum kriterleri mutlaka doğrulanmalıdır.',
  },
];

export const influenzaCards = [
  {
    title: 'İnaktive influenza aşısı',
    dose: '6–35 ayda ürün bazlı 0.25 mL veya 0.5 mL; ≥3 yaşta çoğu inaktive ürün 0.5 mL IM.',
    schedule:
      '6 ay ve üzeri çocuklarda her sezon. 6 ay–8 yaşta daha önce ≥2 influenza dozu yoksa veya öykü bilinmiyorsa 2 doz, en az 4 hafta arayla. Daha önce ≥2 doz almışsa 1 doz. ≥9 yaşta 1 doz.',
    note:
      'Ürün yaş endikasyonu, yumurta/alerji öyküsü, immünsüpresyon ve Türkiye’deki mevcut preparat KÜB/KT ile doğrulanmalıdır.',
  },
  {
    title: 'Canlı attenüe nazal influenza aşısı',
    dose: 'Ürün/ülke ruhsatına göre intranazal; her çocuk için uygun değildir.',
    schedule:
      'Astım, hışıltı öyküsü, immünsüpresyon, gebelik ve ağır komorbiditelerde uygun olmayabilir. Türkiye erişimi ve KÜB/KT kontrol edilmelidir.',
    note:
      'Çocuk göğüs pratiğinde özellikle astım/hışıltılı çocukta dikkatli değerlendirme gerekir.',
  },
];

export function getInfluenzaRecommendation(input: RespiratoryImmunizationInput) {
  const age = input.ageMonths;
  if (age === null) return 'Yaş girildiğinde grip aşısı doz sayısı gösterilir.';
  if (age < 6) return '6 ay altında influenza aşısı uygulanmaz; çevreleyenlerin aşılanması ve gebelikte maternal koruma değerlendirilir.';
  if (age <= 8 * 12 + 11) {
    if (input.receivedTwoPriorFluDoses) {
      return 'Bu sezon 1 doz influenza aşısı gerekir. Ürün hacmi yaş ve preparata göre doğrulanmalıdır.';
    }
    return 'Bu sezon 2 doz influenza aşısı gerekir; dozlar arasında en az 4 hafta olmalıdır.';
  }
  return '9 yaş ve üzerinde bu sezon 1 doz influenza aşısı gerekir.';
}

export function getRsvRecommendation(input: RespiratoryImmunizationInput) {
  const age = input.ageMonths;
  const weight = input.weightKg;
  if (age === null) return 'Yaş girildiğinde RSV monoklonal antikor notu gösterilir.';

  if (input.rsvSeasonContext === 'first_season' && age < 8) {
    if (weight === null) return 'İlk RSV sezonunda <8 ay bebek için nirsevimab düşünülebilir; doz için kilo gerekir.';
    if (weight < 5) return 'Nirsevimab: 50 mg IM tek doz; resmi ürün bilgisi ve yerel erişimle doğrula.';
    return 'Nirsevimab: 100 mg IM tek doz; resmi ürün bilgisi ve yerel erişimle doğrula.';
  }

  if (input.rsvSeasonContext === 'second_season' && age >= 8 && age <= 19) {
    const highRisk =
      input.riskProfile === 'prematurity_bpd' ||
      input.riskProfile === 'chronic_lung' ||
      input.riskProfile === 'immunocompromised' ||
      input.riskProfile === 'cf' ||
      input.riskProfile === 'chd';
    if (highRisk) {
      return 'Yüksek riskli 8–19 ay çocukta ikinci RSV sezonu için nirsevimab 200 mg IM, iki ayrı 100 mg enjeksiyon olarak düşünülebilir; kriterleri doğrula.';
    }
    return '8–19 ay ikinci RSV sezonunda nirsevimab yalnızca belirli yüksek risk gruplarında önerilir; risk kriterlerini doğrula.';
  }

  if (input.rsvSeasonContext === 'out_of_scope') {
    return 'RSV sezon bağlamı dışında otomatik öneri verme; yerel sezon ve risk değerlendirmesi gerekir.';
  }

  return 'Bu yaş/sezon bağlamında RSV monoklonal antikor otomatik önerilmez; özel risk varsa uzman/kurum protokolüyle değerlendir.';
}

export function calculatePalivizumabDose(weightKg: number | null) {
  if (weightKg === null || weightKg <= 0) return null;
  const doseMg = Math.round(weightKg * 15);
  const volumeMl = Math.round((doseMg / 100) * 100) / 100;
  return {
    doseMg,
    volumeMl,
    splitDose: volumeMl > 1,
  };
}

export function getPneumococcalQuickNote(input: RespiratoryImmunizationInput) {
  const age = input.ageMonths;
  if (age === null) return 'Yaş girildiğinde pnömokok hızlı notu gösterilir.';
  if (age < 24) {
    return '2 yaş altında rutin konjuge pnömokok serisi esastır; PPSV23 kullanılmaz. PCV20 kullanımı ürün/ülke takvimiyle doğrulanmalıdır.';
  }
  if (input.riskProfile === 'none') {
    return 'Risk durumu yoksa yaşa uygun rutin pnömokok serisinin tamamlanmış olması beklenir; ek PPSV23/PCV20 gereksinimi önceki aşı geçmişiyle değerlendirilir.';
  }
  if (input.riskProfile === 'immunocompromised' || input.riskProfile === 'asplenia') {
    return '≥2 yaş immünsüpresyon/aspleni gibi yüksek riskte PCV geçmişi, PCV20 kullanımı ve PPSV23 gereksinimi ayrı değerlendirilir; PPSV23 kullanıldıysa ikinci doz/ek doz için ≥5 yıl kuralı gündeme gelebilir.';
  }
  return '≥2 yaş risk grubunda PCV geçmişi tamamlandıktan sonra PCV20 veya PPSV23 ek dozu düşünülebilir; PCV20 kullanıldıysa PPSV23 çoğu CDC senaryosunda gerekmez.';
}
