export type AsthmaIcsDoseRow = {
  molecule: string;
  low: string;
  medium: string;
  high: string;
};

export const gina2025IcsDoseCategories: {
  adultsAdolescents: AsthmaIcsDoseRow[];
  children6to11: AsthmaIcsDoseRow[];
} = {
  adultsAdolescents: [
    { molecule: 'Beklometazon pMDI', low: '200–500 mcg/gün', medium: '>500–1000 mcg/gün', high: '>1000 mcg/gün' },
    { molecule: 'Beklometazon extrafine DPI/pMDI', low: '100–200 mcg/gün', medium: '>200–400 mcg/gün', high: '>400 mcg/gün' },
    { molecule: 'Budesonid DPI/pMDI', low: '200–400 mcg/gün', medium: '>400–800 mcg/gün', high: '>800 mcg/gün' },
    { molecule: 'Siklesonid extrafine pMDI', low: '80–160 mcg/gün', medium: '>160–320 mcg/gün', high: '>320 mcg/gün' },
    { molecule: 'Flutikazon propiyonat DPI/pMDI', low: '100–250 mcg/gün', medium: '>250–500 mcg/gün', high: '>500 mcg/gün' },
  ],
  children6to11: [
    { molecule: 'Beklometazon pMDI', low: '100–200 mcg/gün', medium: '>200–400 mcg/gün', high: '>400 mcg/gün' },
    { molecule: 'Beklometazon extrafine pMDI', low: '50–100 mcg/gün', medium: '>100–200 mcg/gün', high: '>200 mcg/gün' },
    { molecule: 'Budesonid DPI', low: '100–200 mcg/gün', medium: '>200–400 mcg/gün', high: '>400 mcg/gün' },
    { molecule: 'Budesonid nebül', low: '250–500 mcg/gün', medium: '>500–1000 mcg/gün', high: '>1000 mcg/gün' },
    { molecule: 'Siklesonid extrafine pMDI', low: '80 mcg/gün', medium: '>80–160 mcg/gün', high: '>160 mcg/gün' },
    { molecule: 'Flutikazon propiyonat DPI/pMDI', low: '50–100 mcg/gün', medium: '>100–200 mcg/gün', high: '>200 mcg/gün' },
  ],
};

export const icsDoseCategoryNote =
  'Bu dozlar eşdeğer doz değildir; düşük/orta/yüksek günlük toplam İKS doz kategorileridir. Ürün KÜB/KT ve cihaz formuna göre doğrulanmalıdır.';
