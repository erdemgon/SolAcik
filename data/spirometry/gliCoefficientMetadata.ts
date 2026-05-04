export const gliCoefficientMetadata = {
  sourceBadge:
    'Kaynak: GLI Global 2022 / race-neutral — resmi GLI hesaplayıcı ve katsayı dosyaları ile doğrulanmalıdır.',
  engineStatus: 'GLI referans motoru bağlanmadı',
  sourceText:
    'Kaynak: Global Lung Function Initiative reference equations and official GLI calculator. GLI-2012 spirometry equations cover ages 3–95 years. GLI Global 2022 race-neutral estimates are available for selected spirometric indices; FEF25–75 may not be available in race-neutral mode.',
  notes: [
    'Bu depoda resmi GLI katsayı tabloları henüz bulunmadığı için sahte predicted/z-skor üretilemez.',
    'Katsayılar resmi GLI kaynağından lisans ve kullanım koşulları kontrol edilerek ayrı veri dosyalarına eklenmelidir.',
    'UI bileşenleri katsayı dosyası ve getGliLms adaptörü bağlandığında değişmeden çalışacak şekilde tasarlanmıştır.',
  ],
};

export const spirometryCoreWarning =
  'Bu ekran eğitim ve hızlı referans amacı taşır. Spirometri yorumu; test kalitesi, ATS/ERS kabul edilebilirlik-tekrarlanabilirlik kriterleri, klinik bağlam, bronkodilatör yanıtı ve resmi GLI referansları ile birlikte yapılmalıdır.';
