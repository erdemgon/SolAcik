export const gina2025RelieverRules = {
  martEligibleComponents: ['budesonide-formoterol', 'beclomethasone-formoterol'],
  notMartComponents: [
    'fluticasone-salmeterol',
    'fluticasone-vilanterol',
    'salmeterol-fluticasone',
    'ICS-SABA',
    'SABA',
    'SAMA',
  ],
  maxDailyInhalations: [
    {
      ageGroup: '6-11',
      product: 'budesonide-formoterol 100/6 metered [80/4.5 delivered]',
      maxTotalInhalationsAnyDay: 8,
      note: 'Bu sınır aşılacak gibi olursa aynı gün tıbbi değerlendirme gerekir.',
    },
    {
      ageGroup: '12plus',
      product: 'budesonide-formoterol 200/6 metered [160/4.5 delivered]',
      maxTotalInhalationsAnyDay: 12,
      note: 'Bu sınır aşılacak gibi olursa aynı gün tıbbi değerlendirme gerekir.',
    },
    {
      ageGroup: '12plus',
      product: 'beclomethasone-formoterol 100/6',
      maxTotalInhalationsAnyDay: 12,
      note: 'Türkiye KÜB/KT ve ürün bazında doğrulanmalıdır.',
    },
  ],
};

export const relieverCards = [
  {
    title: 'AIR',
    items: [
      'Anti-inflammatory reliever.',
      'Düşük doz ICS-formoterol gerektiğinde kullanılır.',
      '12 yaş ve üzeri Step 1–2’de yalnızca gerektiğinde kullanılabilir.',
      '6–11 yaşta AIR-only Step 1–2 rutin öneri olarak gösterilmemelidir.',
    ],
  },
  {
    title: 'MART',
    items: [
      'Maintenance and reliever therapy.',
      'Aynı ICS-formoterol inhaleri hem idame hem rahatlatıcı olarak kullanılır.',
      '12 yaş ve üzeri Step 3–4’te tercih edilen Track 1 yaklaşımıdır.',
      '6–11 yaşta seçilmiş Step 3–4 olgularında kullanılabilir.',
      'Sadece formoterol içeren İKS/LABA kombinasyonları MART için uygundur.',
    ],
  },
  {
    title: 'SABA / Track 2',
    items: [
      'SABA hızlı rahatlatıcıdır ama İKS’siz SABA-only yaklaşım önerilmez.',
      'Track 2’de hasta düzenli İKS içeren kontrol edici almalı veya SABA ile eş zamanlı İKS kullanmalıdır.',
      'Sık SABA kullanımı kötü kontrol ve alevlenme riski göstergesidir.',
    ],
  },
  {
    title: 'MART değildir',
    items: [
      'Flutikazon-salmeterol MART değildir.',
      'Salmeterol içeren kombinasyonlar MART değildir.',
      'Vilanterol içeren kombinasyonlar MART değildir.',
      'Nebül salbutamol/ipratropium MART değildir.',
      'ICS-SABA MART değildir; idame + rahatlatıcı rejim olarak kullanılmaz.',
    ],
  },
];
