export type TracheostomyTubeSuggestion = {
  ageLabel: string;
  suggestedId: string;
  backupSmaller: string;
  note: string;
};

export const tracheostomySource = {
  badge:
    'Kaynak: pediatrik trakeostomi pratik boyut önerileri ve NTSP/GOSH acil yaklaşım ilkeleri — üretici ölçüleri ve KBB/yoğun bakım protokolü ile doğrulanmalıdır.',
  warning:
    'Kanül boyutu yalnızca yaş veya kilo ile seçilmez. Trakea çapı, endikasyon, ventilasyon gereksinimi, cuff gereksinimi, stoma maturasyonu, bronkoskopi bulgusu, aspirasyon kateteri geçişi, hava kaçağı ve üretici OD/uzunluk bilgileri birlikte değerlendirilmelidir.',
  sources: [
    {
      title: 'Great Ormond Street Hospital. Resuscitation and emergency care for children with tracheostomy.',
      url: 'https://www.gosh.nhs.uk/wards-and-departments/departments/clinical-specialties/tracheostomy-information-children-parents-and-healthcare-professionals/resuscitation-and-emergency-care/',
    },
    {
      title: 'Great Ormond Street Hospital. Living with a tracheostomy.',
      url: 'https://www.gosh.nhs.uk/conditions-and-treatments/procedures-and-treatments/living-tracheostomy/',
    },
    {
      title: 'Wetmore pediatric tracheostomy tube size estimates as summarized in pediatric tracheostomy references.',
      url: 'https://emedicine.medscape.com/article/873805-overview',
    },
  ],
};

export const tracheostomyEmergencySteps = [
  'Yardım çağır, monitörize et, oksijen ver ve çocuğun solunum/renk/bilinç durumunu değerlendir.',
  'Aspirasyon kateteri kanülden geçiyor mu kontrol et; geçmiyorsa tıkaç veya yanlış yerleşim düşün.',
  'İç kanül varsa çıkar, temizle veya değiştir.',
  'Ventilasyon sağlanamıyorsa aynı boy yedek kanül ile değişim; girmezse bir küçük boy kanül hazır olmalı.',
  'Kanül ile ventilasyon sağlanamıyorsa stoma ve ağız/burun yoluyla ventilasyon planı kurum protokolüne göre uygulanır.',
  'Acil kutuda aynı boy kanül, bir küçük boy kanül, obturator, aspirasyon kateteri, ambu, oksijen, kayganlaştırıcı ve bağ olmalı.',
];

export const tracheostomyCareNotes = [
  'Çocuk büyüdükçe kanül iç çapı ve uzunluğu yeniden değerlendirilmelidir.',
  'Düşük basınç alarmı, kaçak, gece desatürasyonu veya artan solunum işi kanül boyutu/pozisyonu açısından ipucu olabilir.',
  'Aspirasyon kateteri rahat geçmeli; çok sıkı kanül veya sekresyon tıkacı acil risk oluşturabilir.',
  'Dış çap ve uzunluk markadan markaya değişir; yalnız ID’ye göre karar verilmemelidir.',
  'Cuff basıncı gerekiyorsa düzenli izlenmeli ve mukozal hasar riski düşünülmelidir.',
];

export function getTracheostomyTubeSuggestion(
  ageMonths: number | null,
  weightKg: number | null,
): TracheostomyTubeSuggestion | null {
  if (ageMonths === null || ageMonths < 0) return null;

  if (ageMonths <= 2 && weightKg !== null && weightKg > 0 && weightKg < 1) {
    return {
      ageLabel: 'Prematüre / <1000 g',
      suggestedId: '2.5 mm ID',
      backupSmaller: 'En yakın bir küçük boy; lokal stok ve üretici ölçüsüne göre',
      note: 'Çok düşük doğum ağırlığında ileri merkez/KBB-yenidoğan yoğun bakım değerlendirmesi gerekir.',
    };
  }

  if (ageMonths <= 2 && weightKg !== null && weightKg >= 1 && weightKg < 2.5) {
    return {
      ageLabel: '1000–2500 g bebek',
      suggestedId: '3.0 mm ID',
      backupSmaller: '2.5 mm ID',
      note: 'Kilo, postmenstrüel yaş ve anatomik hava yolu bulguları birlikte değerlendirilmelidir.',
    };
  }

  if (ageMonths <= 6) {
    return {
      ageLabel: '0–6 ay',
      suggestedId: '3.0–3.5 mm ID',
      backupSmaller: '2.5–3.0 mm ID',
      note: 'Yenidoğan/bebekte boyut seçimi KBB ve yoğun bakım ekibiyle doğrulanmalıdır.',
    };
  }

  if (ageMonths <= 12) {
    return {
      ageLabel: '6–12 ay',
      suggestedId: '3.5–4.0 mm ID',
      backupSmaller: '3.0–3.5 mm ID',
      note: 'Ventilasyon kaçağı, sekresyon ve aspirasyon kateteri geçişi klinik uygunluğu etkiler.',
    };
  }

  if (ageMonths <= 24) {
    return {
      ageLabel: '1–2 yaş',
      suggestedId: '4.0–4.5 mm ID',
      backupSmaller: '3.5–4.0 mm ID',
      note: 'Trakea çapı, boyun anatomisi ve kanül uzunluğu özellikle kontrol edilmelidir.',
    };
  }

  const ageYears = ageMonths / 12;
  const estimatedId = roundToNearestHalf((ageYears + 16) / 4);
  const lowerId = Math.max(3, estimatedId - 0.5);

  return {
    ageLabel: '>2 yaş',
    suggestedId: `${formatTubeSize(lowerId)}–${formatTubeSize(estimatedId)} mm ID`,
    backupSmaller: `${formatTubeSize(Math.max(2.5, lowerId - 0.5))}–${formatTubeSize(lowerId)} mm ID`,
    note: 'Pratik tahmin: iç çap yaklaşık (yaş + 16) / 4. Üretici dış çap/uzunluk ve bronkoskopi bulgusu ile doğrulanmalıdır.',
  };
}

function roundToNearestHalf(value: number) {
  return Math.round(value * 2) / 2;
}

function formatTubeSize(value: number) {
  return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
}
