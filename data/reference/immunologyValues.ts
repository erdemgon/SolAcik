export type ImmunologyAnalyte = 'IgG' | 'IgA' | 'IgM' | 'IgG1' | 'IgG2' | 'IgG3' | 'IgG4';

export type ImmunologyReferenceRow = {
  ageLabel: string;
  minMonths: number;
  maxMonths: number | null;
  analyte: ImmunologyAnalyte;
  meanMgDl: number;
  minMgDl: number;
  maxMgDl: number;
  source: 'Bayram2019Turkey';
};

export const immunologySource = {
  badge:
    'Kaynak: Bayram ve ark. 2019, Turkish Journal of Medical Sciences — Türkiye sağlıklı çocuk verisi; laboratuvar yöntemi ve yerel referansla doğrulanmalıdır.',
  warning:
    'Bu modül tanı koymaz. İmmünoglobulin ve IgG alt grup değerleri yaş, yöntem, cihaz, laboratuvar referansı, enfeksiyon, aşı, protein kaybı, immünsüpresyon ve klinik bağlamla birlikte yorumlanmalıdır.',
  sourceLinks: [
    {
      title:
        'Bayram RO, Özdemir H, Emsen A, Türk Dağı H, Artaç H. Reference ranges for serum immunoglobulin and IgG subclass levels in healthy children. Turk J Med Sci. 2019.',
      url: 'https://doi.org/10.3906/sag-1807-282',
    },
    {
      title: 'TÜBİTAK Turkish Journal of Medical Sciences makale sayfası',
      url: 'https://journals.tubitak.gov.tr/medical/vol49/iss2/8/',
    },
    {
      title:
        'Aksu G, Genel F, Koturoğlu G, Kurugöl Z, Kütükçüler N. Serum immunoglobulin and IgG subclass concentrations in healthy children. Turk J Pediatr. 2006.',
      url: 'https://turkjpediatr.org/article/view/2590',
    },
    {
      title:
        'Berkel AI, Tezcan I, Ersoy F, Sanal O. Serum IgG subclass values in healthy Turkish children and adults. Turk J Pediatr. 1994.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/7974810/',
    },
  ],
};

const ageBands = [
  { ageLabel: '0–30 gün', minMonths: 0, maxMonths: 1 },
  { ageLabel: '1–3 ay', minMonths: 1, maxMonths: 3 },
  { ageLabel: '4–6 ay', minMonths: 4, maxMonths: 6 },
  { ageLabel: '7–12 ay', minMonths: 7, maxMonths: 12 },
  { ageLabel: '13–24 ay', minMonths: 13, maxMonths: 24 },
  { ageLabel: '25–36 ay', minMonths: 25, maxMonths: 36 },
  { ageLabel: '3–5 yaş', minMonths: 37, maxMonths: 71 },
  { ageLabel: '6–8 yaş', minMonths: 72, maxMonths: 107 },
  { ageLabel: '9–11 yaş', minMonths: 108, maxMonths: 143 },
  { ageLabel: '12–16 yaş', minMonths: 144, maxMonths: 191 },
  { ageLabel: '16–18 yaş', minMonths: 192, maxMonths: 216 },
];

const igData: Record<'IgG' | 'IgA' | 'IgM', { mean: number; min: number; max: number }[]> = {
  IgG: [
    { mean: 953, min: 399, max: 1480 },
    { mean: 429.5, min: 217, max: 981 },
    { mean: 482.43, min: 270, max: 1110 },
    { mean: 568.97, min: 242, max: 977 },
    { mean: 761.7, min: 389, max: 1260 },
    { mean: 811.5, min: 486, max: 1970 },
    { mean: 839.87, min: 457, max: 1120 },
    { mean: 1014.93, min: 483, max: 1580 },
    { mean: 1055.43, min: 642, max: 2290 },
    { mean: 1142.07, min: 636, max: 1610 },
    { mean: 1322.77, min: 688, max: 2430 },
  ],
  IgA: [
    { mean: 6.79, min: 6.67, max: 8.75 },
    { mean: 10.53, min: 6.67, max: 24.6 },
    { mean: 19.86, min: 6.67, max: 53 },
    { mean: 29.41, min: 6.68, max: 114 },
    { mean: 37.62, min: 13.1, max: 103 },
    { mean: 59.77, min: 6.67, max: 135 },
    { mean: 68.98, min: 35.7, max: 192 },
    { mean: 106.9, min: 44.8, max: 276 },
    { mean: 115.99, min: 32.6, max: 262 },
    { mean: 120.9, min: 36.4, max: 305 },
    { mean: 201.84, min: 46.3, max: 385 },
  ],
  IgM: [
    { mean: 20.38, min: 5.1, max: 50.9 },
    { mean: 36.66, min: 15.2, max: 68.5 },
    { mean: 75.44, min: 26.9, max: 130 },
    { mean: 81.05, min: 24.2, max: 162 },
    { mean: 122.57, min: 38.6, max: 195 },
    { mean: 111.31, min: 42.7, max: 236 },
    { mean: 121.79, min: 58.7, max: 198 },
    { mean: 114.73, min: 50.3, max: 242 },
    { mean: 113.18, min: 37.4, max: 213 },
    { mean: 125.78, min: 42.4, max: 197 },
    { mean: 142.54, min: 60.7, max: 323 },
  ],
};

const subclassAgeBands = ageBands.slice(5);

const iggSubclassData: Record<'IgG1' | 'IgG2' | 'IgG3' | 'IgG4', { mean: number; min: number; max: number }[]> = {
  IgG1: [
    { mean: 531.7, min: 309, max: 1450 },
    { mean: 513.93, min: 273, max: 679 },
    { mean: 581, min: 292, max: 781 },
    { mean: 660.23, min: 410, max: 1530 },
    { mean: 648.53, min: 344, max: 958 },
    { mean: 674.5, min: 403, max: 1520 },
  ],
  IgG2: [
    { mean: 141.98, min: 87.6, max: 289 },
    { mean: 151.95, min: 73.3, max: 271 },
    { mean: 213.67, min: 88.1, max: 408 },
    { mean: 265.56, min: 81, max: 442 },
    { mean: 270.23, min: 159, max: 406 },
    { mean: 375.9, min: 184, max: 696 },
  ],
  IgG3: [
    { mean: 18.37, min: 7.86, max: 57.5 },
    { mean: 40.75, min: 7.86, max: 122 },
    { mean: 50.94, min: 7.86, max: 157 },
    { mean: 35.51, min: 7.86, max: 93.8 },
    { mean: 39.51, min: 7.86, max: 119 },
    { mean: 50.16, min: 7.86, max: 157 },
  ],
  IgG4: [
    { mean: 51.73, min: 19.8, max: 75 },
    { mean: 45.26, min: 20.8, max: 93.2 },
    { mean: 65.53, min: 18.9, max: 135 },
    { mean: 84.19, min: 34.1, max: 200 },
    { mean: 81.39, min: 35.2, max: 150 },
    { mean: 95.12, min: 29.3, max: 200 },
  ],
};

export const immunologyReferenceRows: ImmunologyReferenceRow[] = [
  ...(['IgG', 'IgA', 'IgM'] as const).flatMap((analyte) =>
    ageBands.map((band, index) => ({
      ...band,
      analyte,
      meanMgDl: igData[analyte][index].mean,
      minMgDl: igData[analyte][index].min,
      maxMgDl: igData[analyte][index].max,
      source: 'Bayram2019Turkey' as const,
    })),
  ),
  ...(['IgG1', 'IgG2', 'IgG3', 'IgG4'] as const).flatMap((analyte) =>
    subclassAgeBands.map((band, index) => ({
      ...band,
      analyte,
      meanMgDl: iggSubclassData[analyte][index].mean,
      minMgDl: iggSubclassData[analyte][index].min,
      maxMgDl: iggSubclassData[analyte][index].max,
      source: 'Bayram2019Turkey' as const,
    })),
  ),
];

export const immunologyAnalytes: ImmunologyAnalyte[] = ['IgG', 'IgA', 'IgM', 'IgG1', 'IgG2', 'IgG3', 'IgG4'];

export function getImmunologyRowsForAge(ageMonths: number | null) {
  if (ageMonths === null) return [];
  return immunologyReferenceRows.filter((row) => {
    const aboveMin = ageMonths >= row.minMonths;
    const belowMax = row.maxMonths === null || ageMonths <= row.maxMonths;
    return aboveMin && belowMax;
  });
}

export function classifyImmunologyValue(value: number, row: ImmunologyReferenceRow) {
  if (value < row.minMgDl) return 'Düşük';
  if (value > row.maxMgDl) return 'Yüksek';
  return 'Referans aralıkta';
}

export const immunologyClinicalNotes = [
  'IgG yenidoğanda maternal geçiş nedeniyle yüksek olabilir; 1–6 ayda fizyolojik düşüş görülebilir.',
  'IgA bebeklikte çok düşük olabilir ve yaşla artar; tek başına düşük değer klinik bağlam olmadan tanı değildir.',
  'IgG alt grupları bu veri setinde 25–36 ay ve üzeri çocuklar için verilmiştir.',
  'Protein kaybı, nefrotik sendrom, enteropati, immünsüpresyon, sistemik steroid, biyolojik tedavi ve akut enfeksiyon sonuçları etkileyebilir.',
  'Lenfosit alt grupları için Türkiye pediatrik referans verisi bu ilk sürüme bağlanmadı; laboratuvar raporundaki yaşa özel aralık önceliklidir.',
  'Ege Üniversitesi 2006 ve Hacettepe 1994 Türkiye çocuk verileri kaynak notuna eklendi; bu ekranda ana tablo Bayram ve ark. 2019 değerleriyle çalışır.',
];
