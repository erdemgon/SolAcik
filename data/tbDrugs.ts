export type PediatricTbDrugKey =
  | 'H'
  | 'R'
  | 'Z'
  | 'E'
  | 'S'
  | 'AMK'
  | 'ETO_PTO'
  | 'CYC'
  | 'OFL'
  | 'LEV'
  | 'MFX'
  | 'KLF'
  | 'H_weekly'
  | 'RPT_weekly'
  | 'H_daily_1m'
  | 'RPT_daily_1m'
  | 'E_optional';

export type PediatricTbDrug = {
  name: string;
  abbreviation: string;
  dailyDoseMgKg: number;
  rangeMgKg: [number, number];
  maxDailyMg: number;
  dosing: string;
  keyAdverseEffects: string;
  notes: string[];
};

export const pediatricTbDrugs: Record<
  Exclude<
    PediatricTbDrugKey,
    'H_weekly' | 'RPT_weekly' | 'H_daily_1m' | 'RPT_daily_1m' | 'E_optional'
  >,
  PediatricTbDrug
> = {
  H: {
    name: 'İzoniyazid',
    abbreviation: 'H / İNH',
    dailyDoseMgKg: 10,
    rangeMgKg: [10, 15],
    maxDailyMg: 300,
    dosing: 'Günde tek doz',
    keyAdverseEffects:
      'Karaciğer enzimlerinde yükselme, hepatit, gastrit, periferik nöropati, hipersensitivite',
    notes: [
      'Malnütrisyon, diabetes mellitus, kronik böbrek yetmezliği, epilepsi, gebe veya emziren ergenlerde piridoksin 10 mg/gün eklenmesi gerekir.',
    ],
  },
  R: {
    name: 'Rifampisin',
    abbreviation: 'R / RİF',
    dailyDoseMgKg: 15,
    rangeMgKg: [10, 20],
    maxDailyMg: 600,
    dosing: 'Günde tek doz',
    keyAdverseEffects: 'Salgıların turuncu olması, kusma, hepatit, grip benzeri tablo',
    notes: ['İlaç etkileşimleri açısından dikkatli olunmalıdır.'],
  },
  Z: {
    name: 'Pirazinamid',
    abbreviation: 'Z / PZA',
    dailyDoseMgKg: 35,
    rangeMgKg: [30, 40],
    maxDailyMg: 2000,
    dosing: 'Günde tek doz',
    keyAdverseEffects: 'Hepatotoksisite, hiperürisemi, artralji',
    notes: [],
  },
  E: {
    name: 'Etambutol',
    abbreviation: 'E / EMB',
    dailyDoseMgKg: 20,
    rangeMgKg: [15, 25],
    maxDailyMg: 1000,
    dosing: 'Günde tek doz',
    keyAdverseEffects:
      'Optik nörit, kırmızı-yeşil renk ayrım bozukluğu, görmede azalma, gastrointestinal yan etkiler',
    notes: [
      'Tedavi başlangıcında göz muayenesi önerilir.',
      'Etambutol kullanan çocuklar optik nörit açısından sorgulanmalı ve izlenmelidir.',
    ],
  },
  S: {
    name: 'Streptomisin',
    abbreviation: 'S / SM',
    dailyDoseMgKg: 30,
    rangeMgKg: [20, 40],
    maxDailyMg: 1000,
    dosing: 'İM, günde tek doz',
    keyAdverseEffects: 'Ototoksisite, nefrotoksisite, nörotoksisite',
    notes: ['Denge, işitme ve böbrek fonksiyonları açısından izlem gerekir.'],
  },
  AMK: {
    name: 'Amikasin',
    abbreviation: 'AMK',
    dailyDoseMgKg: 17.5,
    rangeMgKg: [15, 20],
    maxDailyMg: 1000,
    dosing: 'İM/İV, günde tek doz',
    keyAdverseEffects: 'Ototoksisite, nefrotoksisite, nörotoksisite',
    notes: ['Dirençli TB tedavisi uzman/referans merkez kapsamında değerlendirilmelidir.'],
  },
  ETO_PTO: {
    name: 'Etyonamid / Protiyonamid',
    abbreviation: 'ETO / PTO',
    dailyDoseMgKg: 15,
    rangeMgKg: [15, 20],
    maxDailyMg: 1000,
    dosing: 'İki dozda',
    keyAdverseEffects: 'Gastrointestinal yan etkiler, hepatit',
    notes: ['Dirençli TB tedavisi uzman/referans merkez kapsamında değerlendirilmelidir.'],
  },
  CYC: {
    name: 'Sikloserin',
    abbreviation: 'CYC',
    dailyDoseMgKg: 15,
    rangeMgKg: [10, 20],
    maxDailyMg: 1000,
    dosing: 'İki dozda',
    keyAdverseEffects: 'Depresyon, nöbet',
    notes: ['Nöropsikiyatrik yan etkiler açısından dikkat.'],
  },
  OFL: {
    name: 'Ofloksasin',
    abbreviation: 'OFL',
    dailyDoseMgKg: 17.5,
    rangeMgKg: [15, 20],
    maxDailyMg: 800,
    dosing: 'İki dozda',
    keyAdverseEffects: 'Abdominal ağrı, artropati, artrit',
    notes: ['Kinolonlar uzman/referans merkez kararı ile kullanılmalıdır.'],
  },
  LEV: {
    name: 'Levofloksasin',
    abbreviation: 'LEV',
    dailyDoseMgKg: 17.5,
    rangeMgKg: [15, 20],
    maxDailyMg: 1000,
    dosing: 'Günde tek doz',
    keyAdverseEffects: 'Abdominal ağrı, artropati, artrit',
    notes: [
      'RD/ÇİD-TB temaslısında koruyucu tedavi veya dirençli TB senaryosunda uzman değerlendirmesi gerekir.',
      'TBE RD/ÇİD temaslısı için ayrı maksimum 1500 mg/gün uyarısı da gösterilebilir.',
    ],
  },
  MFX: {
    name: 'Moksifloksasin',
    abbreviation: 'MFX / MOKS',
    dailyDoseMgKg: 10,
    rangeMgKg: [10, 10],
    maxDailyMg: 400,
    dosing: 'Günde tek doz',
    keyAdverseEffects: 'Abdominal ağrı, artropati, artrit',
    notes: [
      'Levofloksasin kullanılamazsa bazı dirençli temaslı senaryolarında uzman kararıyla düşünülebilir.',
    ],
  },
  KLF: {
    name: 'Klofazimin',
    abbreviation: 'KLF',
    dailyDoseMgKg: 3,
    rangeMgKg: [2, 5],
    maxDailyMg: 100,
    dosing: 'Günde tek doz',
    keyAdverseEffects:
      'Fotosensitivite, deri renginde koyulaşma, iktiyozis, QTc uzaması, gastrointestinal yakınmalar',
    notes: ['Dirençli TB tedavisi uzman/referans merkez kapsamında değerlendirilmelidir.'],
  },
};
