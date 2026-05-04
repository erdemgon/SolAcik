export type PcdFeatureKey =
  | 'dailyWetCough'
  | 'dailyRhinosinusitis'
  | 'neonatalDistress'
  | 'laterality'
  | 'chronicOtitis'
  | 'bronchiectasis'
  | 'infertility'
  | 'familyHistory';

export type PcdTestKey = 'nno' | 'genetics' | 'hsvm' | 'tem' | 'if' | 'repeat';

export type PcdResultKey =
  | 'highSuspicion'
  | 'lowNno'
  | 'biallelicPathogenic'
  | 'classicTem'
  | 'normalTem'
  | 'inconclusive';

export const pcdSource = {
  badge:
    'Kaynak yaklaşımı: ERS 2017 PCD tanı rehberi + ATS 2018 PCD tanı rehberi — uzman merkez ve yerel test erişimi ile doğrulanmalıdır.',
  warning:
    'Bu modül PCD için eğitim ve test seçimi kontrol aracıdır. PCD tanısı tek bir testle kesin dışlanmaz; klinik fenotip, CF dışlanması, nazal NO, genetik, TEM, HSVM ve/veya immünfloresan sonuçları uzman merkezde birlikte yorumlanmalıdır.',
};

export const pcdClinicalFeatures: {
  key: PcdFeatureKey;
  label: string;
  note: string;
}[] = [
  {
    key: 'dailyWetCough',
    label: 'Erken başlayan günlük ıslak öksürük',
    note: 'Yıl boyu, günlük, doğumdan/erken bebeklikten itibaren süren ıslak öksürük.',
  },
  {
    key: 'dailyRhinosinusitis',
    label: 'Yıl boyu burun/sinüs yakınması',
    note: 'Günlük burun tıkanıklığı/akıntı, kronik rinosinüzit; çoğu zaman bebeklikte başlar.',
  },
  {
    key: 'neonatalDistress',
    label: 'Term bebekte açıklanamayan neonatal solunum sıkıntısı',
    note: 'Term doğum sonrası >24 saat oksijen/solunum desteği gereksinimi; başka açıklama yoksa güçlü ipucu.',
  },
  {
    key: 'laterality',
    label: 'Situs anomalisi / laterality defekti',
    note: 'Situs inversus, heterotaksi, kompleks konjenital kalp hastalığı eşlik edebilir.',
  },
  {
    key: 'chronicOtitis',
    label: 'Kronik otit / işitme sorunu',
    note: 'Tekrarlayan otit, efüzyonlu otit ve iletim tipi işitme kaybı sık görülebilir.',
  },
  {
    key: 'bronchiectasis',
    label: 'Non-CF bronşektazi / kronik suppuratif akciğer hastalığı',
    note: 'Özellikle orta-alt lob ağırlıklı bronşektazi ve kronik ıslak öksürük.',
  },
  {
    key: 'infertility',
    label: 'Adolesan/erişkinde infertilite ipucu',
    note: 'Erkekte sperm motilite bozukluğu; kadında subfertilite/ektopik gebelik riski görülebilir.',
  },
  {
    key: 'familyHistory',
    label: 'Aile öyküsü / akrabalık',
    note: 'PCD, situs anomalisi, bebeklikte ağır solunum hastalığı veya akraba evliliği.',
  },
];

export const pcdDifferentials = [
  'Kistik fibrozis: ter testi ve CFTR değerlendirmesi',
  'İmmün yetmezlik: immünoglobulinler, lenfosit alt grupları ve aşı antikor yanıtı',
  'Aspirasyon / yutma disfonksiyonu / GÖR',
  'Astım ve tekrarlayan viral hışıltı',
  'Post-infeksiyöz bronşektazi / PIBO',
  'Yabancı cisim veya lokal hava yolu obstrüksiyonu',
  'Kronik rinosinüzit/otit için anatomik veya alerjik nedenler',
];

export const pcdTestCards: {
  key: PcdTestKey;
  title: string;
  use: string;
  limitations: string[];
}[] = [
  {
    key: 'nno',
    title: 'Nazal NO',
    use: 'Kooperatif, genellikle 5 yaş ve üzeri, CF dışlanmış ve PCD fenotipi olan çocukta güçlü tarama/tanı destek testidir.',
    limitations: [
      'Akut viral enfeksiyon veya sinüzitte geçici düşük olabilir; düşük sonuç tekrar edilmelidir.',
      'Küçük çocukta tidal breathing yöntemleri merkez deneyimine bağlıdır.',
      'Normal nNO PCD’yi tamamen dışlamaz; bazı genotiplerde nNO normal olabilir.',
    ],
  },
  {
    key: 'genetics',
    title: 'Genetik panel',
    use: 'Biallelik patojenik PCD varyantları tanıyı güçlü destekler; fenotip ve diğer testlerle birlikte yorumlanır.',
    limitations: [
      'Negatif panel PCD’yi dışlamaz; bilinen gen kapsamı ve VUS yorumu sınırlayıcıdır.',
      'Varyant sınıflaması zamanla değişebilir; genetik danışmanlık gerekebilir.',
    ],
  },
  {
    key: 'hsvm',
    title: 'Yüksek hızlı video mikroskopi',
    use: 'Silya vuruş paterni ve frekansını uzman laboratuvarda değerlendirir.',
    limitations: [
      'Sekonder diskinetik değişiklikler enfeksiyon/irritasyon sonrası yanıltıcı olabilir.',
      'Tek başına tanı testi olarak kullanılmamalı; tekrar/kültür ve diğer testlerle desteklenmelidir.',
    ],
  },
  {
    key: 'tem',
    title: 'Transmisyon elektron mikroskopisi',
    use: 'Klasik ultrastrüktürel defekt varsa tanıyı destekler.',
    limitations: [
      'PCD olgularının bir kısmında TEM normal olabilir.',
      'Sekonder değişiklikler ve örnek kalitesi yorumu etkileyebilir.',
    ],
  },
  {
    key: 'if',
    title: 'İmmünfloresan',
    use: 'Silyer proteinlerin yerleşimini göstererek bazı yapısal defektleri destekleyebilir.',
    limitations: [
      'Her merkezde yoktur; negatif sonuç PCD’yi dışlamaz.',
      'Genetik ve TEM ile birlikte yorumlanmalıdır.',
    ],
  },
  {
    key: 'repeat',
    title: 'Tekrar örnek / silya kültürü',
    use: 'Enfeksiyon sonrası sekonder değişiklikleri ayırmak ve belirsiz sonucu netleştirmek için kullanılır.',
    limitations: [
      'Zaman, uzman laboratuvar ve uygun örnek kalitesi gerektirir.',
      'Belirsiz sonuçta hastayı “PCD değil” diye kapatmamak gerekir.',
    ],
  },
];

export const pcdResultRules: {
  key: PcdResultKey;
  label: string;
  interpretation: string;
}[] = [
  {
    key: 'highSuspicion',
    label: 'Fenotip kuvvetli',
    interpretation:
      'En az iki ana klinik özellik varsa PCD test süreci başlatılmalı; CF dışlanmalı ve uzman merkezle plan yapılmalıdır.',
  },
  {
    key: 'lowNno',
    label: 'Nazal NO düşük',
    interpretation:
      'CF dışlandıysa ve fenotip uygunsa PCD olasılığı artar; düşük sonuç ayrı zamanda tekrar edilmeli ve genetik/TEM gibi testlerle desteklenmelidir.',
  },
  {
    key: 'biallelicPathogenic',
    label: 'Biallelik patojenik varyant',
    interpretation:
      'Fenotiple uyumlu iki patojenik PCD gen varyantı tanıyı güçlü destekler; genetik danışmanlık ve aile taraması düşünülür.',
  },
  {
    key: 'classicTem',
    label: 'Klasik TEM defekti',
    interpretation:
      'Uygun klinik fenotiple klasik ultrastrüktürel defekt PCD tanısını destekler; sekonder değişiklik ve örnek kalitesi dikkate alınmalıdır.',
  },
  {
    key: 'normalTem',
    label: 'TEM normal',
    interpretation:
      'Normal TEM PCD’yi dışlamaz. PCD olgularının bir bölümünde ultrastrüktür normal olabilir; genetik/nNO/HSVM ile sürdür.',
  },
  {
    key: 'inconclusive',
    label: 'Sonuç belirsiz',
    interpretation:
      'Belirsiz testlerde tekrar örnek, uzman merkez değerlendirmesi ve fenotip-temelli izlem gerekir; tanı süreci açık bırakılmalıdır.',
  },
];

export const pcdManagementChecklist = [
  'Çocuk göğüs + KBB + odyoloji + fizyoterapi + genetik ekip yaklaşımı',
  'Düzenli hava yolu temizleme eğitimi ve teknik kontrolü',
  'Alt hava yolu kültürü ve alevlenme döneminde kültür temelli antibiyotik yaklaşımı',
  'SFT uygun yaşta; bronşektazi varsa non-CF bronşektazi izlem ilkeleri',
  'Kronik rinosinüzit ve otit/işitme kaybı için KBB-odyoloji izlemi',
  'Aşıların tamamlanması; influenza ve pnömokok dahil yerel önerilerle doğrulama',
  'Sigara/pasif duman, hava kirliliği ve enfeksiyon maruziyetini azaltma',
  'Fertilite/adolesan danışmanlığı ve geçiş dönemi planı',
];

export function classifyPcdProbability(selected: PcdFeatureKey[]) {
  const major = ['dailyWetCough', 'dailyRhinosinusitis', 'neonatalDistress', 'laterality'];
  const majorCount = selected.filter((key) => major.includes(key)).length;

  if (majorCount >= 2 || (majorCount >= 1 && selected.includes('bronchiectasis'))) {
    return {
      tone: 'red' as const,
      title: 'PCD olasılığı yüksek',
      action:
        'CF dışlanarak PCD uzman merkezi/test erişimi planla; nNO, genetik ve silya incelemeleri kombine yorumlanmalıdır.',
    };
  }

  if (majorCount === 1 || selected.length >= 3) {
    return {
      tone: 'amber' as const,
      title: 'PCD açısından değerlendir',
      action:
        'Klinik öyküyü ayrıntılandır; kronik ıslak öksürük, rinosinüzit ve neonatal dönem bilgisi özellikle netleştir.',
    };
  }

  return {
    tone: 'gray' as const,
    title: 'PCD için veri sınırlı',
    action:
      'PCD fenotipi belirgin değil; ancak günlük ıslak öksürük, kronik rinosinüzit veya bronşektazi varsa yeniden değerlendir.',
  };
}
