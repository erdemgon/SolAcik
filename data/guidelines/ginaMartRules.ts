import { ginaAsthmaVersion } from './ginaAsthmaVersion';

export type MartRule = {
  id: string;
  ageGroup: string;
  medicine: string;
  strength: string;
  useType: string;
  step: string;
  maintenance: string;
  reliever: string;
  maxInhalationsPerDay: string;
  notes: string[];
  guidelineLabel: string;
};

export const ginaMartRules: MartRule[] = [
  {
    id: 'adult_bud_form_160_45_air_step_1_2',
    ageGroup: 'Erişkin / adolesan yaş grubu; yaş uygunluğu KÜB/KT ile kontrol edilir',
    medicine: 'Budesonid-formoterol',
    strength: '200/6 mcg metered [160/4.5 mcg delivered]',
    useType: 'AIR-only',
    step: 'Basamak 1–2',
    maintenance: 'Düzenli idame yok',
    reliever: 'Gerektikçe 1 inhalasyon',
    maxInhalationsPerDay: 'En fazla 12 inhalasyon/gün',
    notes: [
      'MART/AIR yaklaşımı yalnızca hızlı etkili formoterol içeren ICS-formoterol kombinasyonları için geçerlidir.',
      'Türkiye KÜB/KT endikasyon, yaş ve maksimum doz sınırları ayrıca kontrol edilmelidir.',
    ],
    guidelineLabel: ginaAsthmaVersion.recommendationLabel,
  },
  {
    id: 'adult_bud_form_160_45_mart_step_3',
    ageGroup: 'Erişkin / adolesan yaş grubu; yaş uygunluğu KÜB/KT ile kontrol edilir',
    medicine: 'Budesonid-formoterol',
    strength: '200/6 mcg metered [160/4.5 mcg delivered]',
    useType: 'MART',
    step: 'Basamak 3',
    maintenance: 'Günde 2 kez 1 inhalasyon veya günde 1 kez 1 inhalasyon',
    reliever: 'Gerektikçe 1 inhalasyon',
    maxInhalationsPerDay: 'En fazla 12 inhalasyon/gün',
    notes: ['İdame sıklığı klinik durum ve resmi rehbere göre doğrulanmalıdır.'],
    guidelineLabel: ginaAsthmaVersion.recommendationLabel,
  },
  {
    id: 'adult_bud_form_160_45_mart_step_4_5',
    ageGroup: 'Erişkin / adolesan yaş grubu; yaş uygunluğu KÜB/KT ile kontrol edilir',
    medicine: 'Budesonid-formoterol',
    strength: '200/6 mcg metered [160/4.5 mcg delivered]',
    useType: 'MART',
    step: 'Basamak 4–5',
    maintenance: 'Günde 2 kez 2 inhalasyon',
    reliever: 'Gerektikçe 1 inhalasyon',
    maxInhalationsPerDay: 'En fazla 12 inhalasyon/gün',
    notes: ['Basamak 5 uzman değerlendirmesi gerektirir.'],
    guidelineLabel: ginaAsthmaVersion.recommendationLabel,
  },
  {
    id: 'adult_bud_form_80_225_air_step_1_2',
    ageGroup: 'Erişkin / adolesan yaş grubu; yaş uygunluğu KÜB/KT ile kontrol edilir',
    medicine: 'Budesonid-formoterol pMDI',
    strength: '100/3 mcg metered [80/2.25 mcg delivered]',
    useType: 'AIR-only',
    step: 'Basamak 1–2',
    maintenance: 'Düzenli idame yok',
    reliever: 'Gerektikçe 2 inhalasyon',
    maxInhalationsPerDay: 'En fazla 24 inhalasyon/gün',
    notes: [
      'Bu satır yalnızca 3 mcg metered [2.25 mcg delivered] formoterol içeren pMDI ürünleri içindir.',
    ],
    guidelineLabel: ginaAsthmaVersion.recommendationLabel,
  },
  {
    id: 'adult_bud_form_80_225_mart_step_3',
    ageGroup: 'Erişkin / adolesan yaş grubu; yaş uygunluğu KÜB/KT ile kontrol edilir',
    medicine: 'Budesonid-formoterol pMDI',
    strength: '100/3 mcg metered [80/2.25 mcg delivered]',
    useType: 'MART',
    step: 'Basamak 3',
    maintenance: 'Günde 2 kez 2 inhalasyon veya günde 1 kez 2 inhalasyon',
    reliever: 'Gerektikçe 2 inhalasyon',
    maxInhalationsPerDay: 'En fazla 24 inhalasyon/gün',
    notes: [
      'Bu doz şeması yalnızca 3 mcg metered [2.25 mcg delivered] formoterol içeren pMDI ürünleri içindir.',
    ],
    guidelineLabel: ginaAsthmaVersion.recommendationLabel,
  },
  {
    id: 'adult_bud_form_80_225_mart_step_4_5',
    ageGroup: 'Erişkin / adolesan yaş grubu; yaş uygunluğu KÜB/KT ile kontrol edilir',
    medicine: 'Budesonid-formoterol pMDI',
    strength: '100/3 mcg metered [80/2.25 mcg delivered]',
    useType: 'MART',
    step: 'Basamak 4–5',
    maintenance: 'Günde 2 kez 4 inhalasyon',
    reliever: 'Gerektikçe 2 inhalasyon',
    maxInhalationsPerDay: 'En fazla 24 inhalasyon/gün',
    notes: ['Basamak 5 ve yüksek gereksinim uzman değerlendirmesi gerektirir.'],
    guidelineLabel: ginaAsthmaVersion.recommendationLabel,
  },
  {
    id: 'child_mart_placeholder',
    ageGroup: 'Çocuk yaş grubu',
    medicine: 'ICS-formoterol MART',
    strength: 'Ürün ve yaşa göre değişir',
    useType: 'MART değerlendirme notu',
    step: 'Çocuk basamak tedavisi',
    maintenance: 'Yaş, ürün ve ülke onayına göre değişir',
    reliever: 'Yaş ve ürün bilgisine göre değişir',
    maxInhalationsPerDay: 'Resmi rehber ve KÜB/KT ile doğrulanmalı',
    notes: [
      'Çocuk yaş grubunda MART sınırları ve ürün onayları GINA 2026 yayımlandığında yeniden kontrol edilmelidir.',
      'Bu satır otomatik reçete önerisi değildir.',
    ],
    guidelineLabel: ginaAsthmaVersion.recommendationLabel,
  },
];
