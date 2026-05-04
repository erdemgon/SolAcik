export type IcsDoseAgeGroup = '6–11 yaş' | '≥12 yaş';

export type IcsDoseCategory = {
  id: string;
  ageGroup: IcsDoseAgeGroup;
  molecule: string;
  low: string;
  medium: string;
  high: string;
  note: string;
};

export const icsDoseCategories: IcsDoseCategory[] = [
  {
    id: 'child_budesonide_dpi_pmdi',
    ageGroup: '6–11 yaş',
    molecule: 'Budesonid DPI/pMDI',
    low: '100–200 mcg/gün',
    medium: '>200–400 mcg/gün',
    high: '>400 mcg/gün',
    note: 'Toplam günlük metered doz; reçete talimatı değildir.',
  },
  {
    id: 'child_budesonide_nebule',
    ageGroup: '6–11 yaş',
    molecule: 'Budesonid nebül',
    low: '250–500 mcg/gün',
    medium: '>500–1000 mcg/gün',
    high: '>1000 mcg/gün',
    note: 'Nebül formu cihaz ve uygulama tekniğine duyarlıdır.',
  },
  {
    id: 'child_fluticasone_propionate',
    ageGroup: '6–11 yaş',
    molecule: 'Flutikazon propiyonat pMDI/DPI',
    low: '50–100 mcg/gün',
    medium: '>100–200 mcg/gün',
    high: '>200 mcg/gün',
    note: 'pMDI/DPI formu KÜB/KT ve cihaz tekniği ile doğrulanmalıdır.',
  },
  {
    id: 'child_ciclesonide',
    ageGroup: '6–11 yaş',
    molecule: 'Siklesonid pMDI',
    low: '80 mcg/gün',
    medium: '>80–160 mcg/gün',
    high: '>160 mcg/gün',
    note: 'Extrafine ürün bilgisi ve yaş onayı kontrol edilmelidir.',
  },
  {
    id: 'child_beclomethasone_pmdi',
    ageGroup: '6–11 yaş',
    molecule: 'Beklometazon pMDI',
    low: '100–200 mcg/gün',
    medium: '>200–400 mcg/gün',
    high: '>400 mcg/gün',
    note: 'Standard partikül pMDI kategorisi.',
  },
  {
    id: 'child_beclomethasone_extrafine',
    ageGroup: '6–11 yaş',
    molecule: 'Beklometazon extrafine pMDI/DPI',
    low: '50–100 mcg/gün',
    medium: '>100–200 mcg/gün',
    high: '>200 mcg/gün',
    note: 'Extrafine ürünler standard partikül ürünlerle birebir eşdeğer değildir.',
  },
  {
    id: 'adult_budesonide_dpi_pmdi',
    ageGroup: '≥12 yaş',
    molecule: 'Budesonid DPI/pMDI',
    low: '200–400 mcg/gün',
    medium: '>400–800 mcg/gün',
    high: '>800 mcg/gün',
    note: 'Toplam günlük metered doz.',
  },
  {
    id: 'adult_fluticasone_propionate',
    ageGroup: '≥12 yaş',
    molecule: 'Flutikazon propiyonat pMDI/DPI',
    low: '100–250 mcg/gün',
    medium: '>250–500 mcg/gün',
    high: '>500 mcg/gün',
    note: 'pMDI/DPI cihaz ve ürün bilgisi kontrol edilmelidir.',
  },
  {
    id: 'adult_ciclesonide',
    ageGroup: '≥12 yaş',
    molecule: 'Siklesonid pMDI',
    low: '80–160 mcg/gün',
    medium: '>160–320 mcg/gün',
    high: '>320 mcg/gün',
    note: 'Extrafine pMDI kategorisi.',
  },
  {
    id: 'adult_beclomethasone_pmdi',
    ageGroup: '≥12 yaş',
    molecule: 'Beklometazon pMDI',
    low: '200–500 mcg/gün',
    medium: '>500–1000 mcg/gün',
    high: '>1000 mcg/gün',
    note: 'Standard partikül pMDI kategorisi.',
  },
  {
    id: 'adult_beclomethasone_extrafine',
    ageGroup: '≥12 yaş',
    molecule: 'Beklometazon extrafine pMDI/DPI',
    low: '100–200 mcg/gün',
    medium: '>200–400 mcg/gün',
    high: '>400 mcg/gün',
    note: 'Extrafine pMDI/DPI kategorisi.',
  },
];
