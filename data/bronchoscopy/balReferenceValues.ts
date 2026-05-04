export type BalDifferentialRow = {
  study: string;
  n: number;
  ageRange: string;
  sedation: string;
  lavageVolume: string;
  recoveryPercent?: string;
  totalCells10e4PerMl?: string;
  macrophagePercent: string;
  lymphocytePercent: string;
  neutrophilPercent: string;
  eosinophilPercent: string;
  note?: string;
};

export type BalLymphocyteSubsetRow = {
  study: string;
  n: number;
  ageRange: string;
  cd3: string;
  cd4: string;
  cd8: string;
  cd4Cd8: string;
  cd19: string;
  cd25: string;
  cd3HlaDr: string;
  cd56: string;
  note?: string;
};

export const balReferenceSource = {
  title: 'BAL normal çocuk değerleri',
  source:
    'ERS Task Force. Bronchoalveolar lavage in children. Eur Respir J 2000;15:217-231. Kullanıcının yüklediği Tablo 3 ve Tablo 4 özetlenmiştir.',
  warning:
    'BAL normal değerleri tek bir evrensel aralık değildir; yaş, örnekleme yeri, lavaj hacmi, geri dönüş oranı, sedasyon, teknik, enfeksiyon ve laboratuvar yöntemi sonuçları etkiler. Klinik yorum uzman merkez ve laboratuvar referansı ile yapılmalıdır.',
};

export const balDifferentialRows: BalDifferentialRow[] = [
  {
    study: 'Clement et al.',
    n: 11,
    ageRange: '1-15 yıl',
    sedation: 'Lokal anestezi',
    lavageVolume: 'FRC’nin %10’u',
    totalCells10e4PerMl: 'ortalama 25.5±13.6; medyan 24; aralık 7.0-50.0',
    macrophagePercent: 'ortalama 89.7±5.2; medyan 89; aralık 85-97',
    lymphocytePercent: 'ortalama 8.7±4.6; medyan 10; aralık 1-17',
    neutrophilPercent: 'ortalama 1.3±0.9; medyan 1; aralık 0-3',
    eosinophilPercent: 'ND',
  },
  {
    study: 'Ratjen et al.',
    n: 48,
    ageRange: '3-5 yıl',
    sedation: 'Genel anestezi',
    lavageVolume: '3 mL/kg',
    recoveryPercent: 'ortalama 58±15',
    totalCells10e4PerMl: 'ortalama 10.3±11.1; medyan 7.3; aralık 0.5-57.1',
    macrophagePercent: 'ortalama 81.2±12.7; medyan 84; aralık 34.6-94',
    lymphocytePercent: 'ortalama 16.2±12.4; medyan 12.5; aralık 2-61',
    neutrophilPercent: 'ortalama 1.9±2.9; medyan 0.9; aralık 0-17',
    eosinophilPercent: 'ortalama 0.4±0.6; medyan 0.2; aralık 0-3.6',
  },
  {
    study: 'Riedler et al.',
    n: 18,
    ageRange: '1-10 ay',
    sedation: 'Genel anestezi',
    lavageVolume: '3 mL/kg',
    recoveryPercent: 'medyan 62.5; IQR 42.5-71.5',
    totalCells10e4PerMl: 'medyan 15.5; IQR 7.5-25.8',
    macrophagePercent: 'medyan 91; IQR 84.2-94',
    lymphocytePercent: 'medyan 7.5; IQR 4.7-12.8',
    neutrophilPercent: 'medyan 1.7; IQR 0.6-3.5',
    eosinophilPercent: 'medyan 0.2; IQR 0-0.3',
    note: 'Tabloda * IQR olarak verilmiştir.',
  },
  {
    study: 'Midulla et al.',
    n: 16,
    ageRange: '2-3 ay',
    sedation: 'Lokal anestezi',
    lavageVolume: '20 mL',
    recoveryPercent: 'ortalama 43.1±12.2; medyan 42.5; aralık 20-65',
    totalCells10e4PerMl: 'ortalama 59.9±32.9; medyan 51; aralık 20-130',
    macrophagePercent: 'ortalama 86±7.8; medyan 87; aralık 71-98',
    lymphocytePercent: 'ortalama 8.7±5.8; medyan 7; aralık 2-22',
    neutrophilPercent: 'ortalama 5.5±4.8; medyan 3.5; aralık 0-17',
    eosinophilPercent: 'ortalama 0.2±0.3; medyan 0; aralık 0-1',
  },
  {
    study: 'Tessier et al.',
    n: 11,
    ageRange: '4-16 yıl',
    sedation: 'Lokal anestezi',
    lavageVolume: 'FRC’nin %10’u',
    recoveryPercent: 'ortalama 69.7±9.6; medyan 68; aralık 52-87',
    totalCells10e4PerMl: 'ortalama 35.1±18.4; medyan 30.5; aralık 9-68',
    macrophagePercent: 'ortalama 89.9±5.5; medyan 92.5; aralık 77-98',
    lymphocytePercent: 'ortalama 8.9±5.6; medyan 8; aralık 2-22',
    neutrophilPercent: 'ortalama 1.2±1.2; medyan 1; aralık 0-3',
    eosinophilPercent: '0',
  },
];

export const balLymphocyteSubsetRows: BalLymphocyteSubsetRow[] = [
  {
    study: 'Ratjen et al.',
    n: 28,
    ageRange: '3-14 yıl',
    cd3: 'ortalama 85.8; medyan 87; aralık 72-92',
    cd4: 'ortalama 35.1; medyan 34.5; aralık 10-57',
    cd8: 'ortalama 56.8; medyan 57; aralık 30-84',
    cd4Cd8: 'ortalama 0.7; medyan 0.6; aralık 0.1-1.9',
    cd19: 'ortalama 0.9; medyan 0.5; aralık 0-7',
    cd25: 'ortalama 1.9; medyan 2; aralık 0-4',
    cd3HlaDr: 'ortalama 1.4; medyan 1; aralık 0-7',
    cd56: 'ortalama 7.8; medyan 5',
  },
  {
    study: 'Riedler et al.',
    n: 10,
    ageRange: '3-10 yıl',
    cd3: 'medyan 81; IQR 75.5-88',
    cd4: 'medyan 27; IQR 22-32',
    cd8: 'medyan 45; IQR 33.8-57',
    cd4Cd8: 'medyan 0.6; IQR 0.4-1',
    cd19: 'medyan 5; IQR 4-9.5',
    cd25: 'medyan 2; IQR 0-3',
    cd3HlaDr: 'ND',
    cd56: 'medyan 4',
    note: 'Tabloda * IQR olarak verilmiştir.',
  },
];
