export type ChildAgeBand = 'infant' | 'preschool' | 'school' | 'adolescent';

export type ChildSignalKey =
  | 'respSymptoms'
  | 'respSigns'
  | 'hypoxemia'
  | 'diffuseImaging'
  | 'poorGrowth'
  | 'crackles'
  | 'clubbing'
  | 'severeCourse';

export type ChildPatternKey =
  | 'neonateInfant'
  | 'immune'
  | 'surfactant'
  | 'alveolarHemorrhage'
  | 'aspiration'
  | 'systemic'
  | 'exposure'
  | 'vascular'
  | 'undefined';

export type ChildSignal = {
  key: ChildSignalKey;
  label: string;
  note: string;
};

export type PatternOption = {
  key: ChildPatternKey;
  title: string;
  clues: string[];
  nextStep: string;
};

export const childSource = {
  badge: 'Kaynak yaklaşımı: ERS CRC chILD-EU tanısal iş akışı + ATS infant chILD rehberi — yerel uzman merkez ile doğrulanmalıdır.',
  title: 'Çocukluk Çağı İnterstisyel Akciğer Hastalıkları',
  warning:
    'Bu modül tanı koymaz ve tedavi önermez. chILD şüphesi olan çocuklar çocuk göğüs hastalıkları / chILD deneyimli merkez, radyoloji, genetik, immünoloji/enfeksiyon ve patoloji iş birliği ile değerlendirilmelidir.',
};

export const ageBandNotes: Record<ChildAgeBand, string[]> = {
  infant: [
    'İnfantta persistan takipne, hipoksemi, beslenme güçlüğü ve yaygın parankimal bulgu chILD için güçlü uyarıdır.',
    'Sürfaktan metabolizma bozuklukları, nöroendokrin hücre hiperplazisi, pulmoner interstisyel glikojenozis, gelişimsel akciğer hastalıkları ve genetik nedenler daha ön plandadır.',
  ],
  preschool: [
    'Tekrarlayan hışıltı/astım etiketi alan ama hipoksemi, çomak parmak, büyüme geriliği veya yaygın radyolojik bulgusu olan çocukta alternatif tanılar düşünülmelidir.',
    'Aspirasyon, immün yetmezlik, enfeksiyon sekeli, hipersensitivite pnömonisi ve sistemik hastalıklar aktif dışlanmalıdır.',
  ],
  school: [
    'Okul çağında efor dispnesi, kronik kuru öksürük, krepitan raller, restriktif patern veya difüzyon bozukluğu varsa chILD değerlendirmesi uygundur.',
    'Hipersensitivite pnömonisi, bağ dokusu hastalığı ilişkili ILD, sarkoidoz, alveoler hemoraji ve immünolojik nedenler sorgulanmalıdır.',
  ],
  adolescent: [
    'Adolesanda erişkin ILD benzeri paternler, bağ dokusu hastalığı, inhalasyon/mesleki-hobi maruziyetleri ve ilaç ilişkili akciğer hastalığı daha görünür olabilir.',
    'Sigara/vape, kuş/küf maruziyeti, otoimmün semptomlar ve ilaç öyküsü özellikle sorgulanmalıdır.',
  ],
};

export const childSuspicionSignals: ChildSignal[] = [
  {
    key: 'respSymptoms',
    label: 'Solunum semptomu',
    note: 'Kronik öksürük, efor dispnesi, takipne, hışıltı dışı açıklanamayan solunum yakınması.',
  },
  {
    key: 'respSigns',
    label: 'Solunum yetmezliği bulgusu',
    note: 'Takipne, retraksiyon, beslenme güçlüğü, egzersiz intoleransı veya solunum işi artışı.',
  },
  {
    key: 'hypoxemia',
    label: 'Hipoksemi / düşük SpO2',
    note: 'İstirahatte, uykuda veya eforda oksijen desatürasyonu.',
  },
  {
    key: 'diffuseImaging',
    label: 'Yaygın parankimal görüntüleme bulgusu',
    note: 'Akciğer grafisi veya HRCT’de difüz infiltrasyon, buzlu cam, retikülasyon, kistik değişiklik ya da mozaik patern.',
  },
  {
    key: 'poorGrowth',
    label: 'Büyüme geriliği / beslenme sorunu',
    note: 'Kronik hastalık yükü, aspirasyon veya sistemik hastalık açısından uyarıcıdır.',
  },
  {
    key: 'crackles',
    label: 'Krepitan ral',
    note: 'Özellikle persistan ince inspiratuvar raller interstisyel süreç lehine olabilir.',
  },
  {
    key: 'clubbing',
    label: 'Çomak parmak',
    note: 'Kronik hipoksemi veya kronik akciğer hastalığı göstergesi olabilir.',
  },
  {
    key: 'severeCourse',
    label: 'Ağır / ilerleyici seyir',
    note: 'Yoğun bakım, persistan oksijen ihtiyacı, hızlı kötüleşme veya tedaviye yanıtsızlık.',
  },
];

export const exclusionChecklist = [
  'Kistik fibrozis: ter testi / CFTR değerlendirmesi',
  'Primer siliyer diskinezi: nazal NO, silya analizi ve genetik değerlendirme',
  'Tekrarlayan aspirasyon / yutma disfonksiyonu / GÖR',
  'İmmün yetmezlik: immünoglobulinler, lenfosit alt grupları ve enfeksiyon öyküsü',
  'Kronik enfeksiyon: TB, atipik mikobakteri, fungal ve viral nedenler',
  'Konjenital kalp hastalığı, pulmoner hipertansiyon veya pulmoner venöz dönüş anomalisi',
  'Bronkopulmoner displazi ve prematürite ilişkili kronik akciğer hastalığı',
  'İlaç, radyasyon, inhalasyon, kuş/küf veya çevresel maruziyet',
];

export const baselineWorkupItems = [
  'Ayrıntılı perinatal, aile, akrabalık, ölüm, enfeksiyon, maruziyet ve sistemik semptom öyküsü',
  'Büyüme eğrisi, SpO2 istirahat/uyku/efor, solunum işi ve çomak parmak değerlendirmesi',
  'Akciğer grafisi ve deneyimli radyolog ile düşük doz pediatrik HRCT planı',
  'Tam kan, CRP/ESH, karaciğer-böbrek fonksiyonları ve temel metabolik değerlendirme',
  'İmmünolojik tarama ve enfeksiyon dışlama testleri',
  'Solunum fonksiyon testi, DLCO ve 6 dakika yürüme testi uygun yaşta',
  'Ekokardiyografi: pulmoner hipertansiyon ve kardiyak nedenler açısından',
  'Multidisipliner tartışma: çocuk göğüs, radyoloji, genetik, immünoloji/enfeksiyon ve patoloji',
];

export const advancedWorkupItems = [
  'Hedefli veya panel genetik test: sürfaktan metabolizması, NKX2-1, FOXF1 ve fenotipe uygun genler',
  'BAL: enfeksiyon, alveoler hemoraji, proteinozis, lipid yüklü makrofaj ve inflamatuvar hücre paterni için seçilmiş olguda',
  'Otoimmün / vaskülit taraması: ANA, ENA, ANCA, anti-GBM ve klinik bağlama göre genişletilmiş testler',
  'Maruziyet şüphesinde antijen sorgulama, ev/okul değerlendirmesi ve hipersensitivite pnömonisi çalışması',
  'Akciğer biyopsisi: genetik ve noninvaziv değerlendirme tanı koydurmadığında, uzman merkezde ve MDT kararıyla',
  'Tanı “tanımlanamayan chILD” kalırsa düzenli yeniden değerlendirme; yeni genetik bilgi ve fenotip değişimiyle tanıyı güncelleme',
];

export const patternOptions: PatternOption[] = [
  {
    key: 'neonateInfant',
    title: 'Neonatal / infant başlangıç',
    clues: [
      'Term bebekte açıklanamayan respiratuvar distres',
      'Persistan takipne, beslenme güçlüğü, büyüme geriliği',
      'Ailede bebek ölümü veya akrabalık',
    ],
    nextStep:
      'Sürfaktan metabolizması ve gelişimsel akciğer hastalığı için erken genetik değerlendirme ve chILD merkezi görüşü.',
  },
  {
    key: 'immune',
    title: 'İmmün yetmezlik / enfeksiyon ağırlıklı',
    clues: [
      'Tekrarlayan ağır enfeksiyonlar',
      'Fırsatçı enfeksiyon, uzamış ateş veya lenfopeni',
      'Bronşektazi veya yaygın nodüler/infiltratif patern',
    ],
    nextStep:
      'İmmünoloji ve enfeksiyon hastalıkları ile birlikte immün tarama, mikrobiyoloji ve gerekirse BAL.',
  },
  {
    key: 'surfactant',
    title: 'Sürfaktan disfonksiyonu şüphesi',
    clues: [
      'İnfant/çocukta buzlu cam, septal kalınlaşma veya yaygın interstisyel patern',
      'Aile öyküsü veya açıklanamayan persistan oksijen ihtiyacı',
      'Astım/bronşiolit tedavisine yanıtsızlık',
    ],
    nextStep:
      'SFTPB, SFTPC, ABCA3, NKX2-1 gibi genler için panel ve uzman merkezde takip planı.',
  },
  {
    key: 'alveolarHemorrhage',
    title: 'Alveoler hemoraji',
    clues: [
      'Hemoptizi olabilir veya olmayabilir',
      'Demir eksikliği/anemi, yaygın buzlu cam',
      'BAL’da hemosiderin yüklü makrofaj şüphesi',
    ],
    nextStep:
      'Acil hemoraji değerlendirmesi, otoimmün/vaskülit taraması, enfeksiyon dışlama ve uzman merkez yönetimi.',
  },
  {
    key: 'aspiration',
    title: 'Aspirasyon / yutma disfonksiyonu',
    clues: [
      'Beslenme ile öksürük, nörogelişimsel sorun, reflü',
      'Tekrarlayan pnömoni veya sağ/üst lob ağırlıklı infiltrasyon',
      'Kronik ıslak öksürük ve bronşektazi eşlik edebilir',
    ],
    nextStep:
      'Yutma değerlendirmesi, reflü/aspirasyon çalışması ve bronşektazi/PCD/CF ayırıcı tanısı.',
  },
  {
    key: 'systemic',
    title: 'Sistemik / romatolojik hastalık',
    clues: [
      'Artralji, döküntü, Raynaud, kas güçsüzlüğü',
      'Restriktif patern veya DLCO düşüklüğü',
      'Ailede otoimmün hastalık',
    ],
    nextStep:
      'Romatoloji ile otoimmün panel, kapilleroskopi/klinik fenotipleme ve ILD paterni değerlendirmesi.',
  },
  {
    key: 'exposure',
    title: 'Maruziyet / hipersensitivite pnömonisi',
    clues: [
      'Kuş, küf, nemli ev, hobi veya okul maruziyeti',
      'Semptomların ortamla değişmesi',
      'HRCT’de mozaik attenüasyon, hava hapsi veya sentrilobüler nodüller',
    ],
    nextStep:
      'Maruziyeti kesme, çevresel değerlendirme, BAL lenfositozu ve uzman merkez izlemi.',
  },
  {
    key: 'vascular',
    title: 'Vasküler / pulmoner hipertansiyon ilişkili',
    clues: [
      'Orantısız hipoksemi, senkop veya egzersiz intoleransı',
      'Ekokardiyografide pulmoner hipertansiyon',
      'Pulmoner venöz hastalık veya vasküler malformasyon şüphesi',
    ],
    nextStep:
      'Kardiyoloji/pulmoner hipertansiyon ekibi ile ileri görüntüleme ve hemodinamik değerlendirme.',
  },
  {
    key: 'undefined',
    title: 'Tanımlanamayan chILD',
    clues: [
      'Temel ve ileri değerlendirmeye rağmen etiyoloji bulunamıyor',
      'Klinik fenotip zamanla değişiyor',
      'Genetik sonuç VUS veya negatif',
    ],
    nextStep:
      'Uzman merkez izleminde tanıyı periyodik yeniden gözden geçir; yeni genetik veri ve MDT kararlarını güncelle.',
  },
];

export function classifyChildSuspicion(selectedSignals: ChildSignalKey[]) {
  const coreCount = ['respSymptoms', 'respSigns', 'hypoxemia', 'diffuseImaging'].filter((key) =>
    selectedSignals.includes(key as ChildSignalKey),
  ).length;
  const hasSevere = selectedSignals.includes('severeCourse');
  const hasClubbingOrHypoxemia =
    selectedSignals.includes('clubbing') || selectedSignals.includes('hypoxemia');

  if (coreCount >= 3 || (coreCount >= 2 && (hasSevere || hasClubbingOrHypoxemia))) {
    return {
      status: 'chILD şüphesi güçlü',
      tone: 'red' as const,
      action:
        'Difüz parankimal akciğer hastalığı için gecikmeden çocuk göğüs / chILD deneyimli merkez ve multidisipliner değerlendirme planla.',
    };
  }

  if (coreCount >= 2 || selectedSignals.length >= 3) {
    return {
      status: 'chILD olasılığı değerlendirilmeli',
      tone: 'amber' as const,
      action:
        'Temel dışlamaları, görüntülemeyi ve oksijenasyon değerlendirmesini tamamla; persistan bulgu varsa uzman merkezle görüş.',
    };
  }

  return {
    status: 'chILD için veri sınırlı',
    tone: 'gray' as const,
    action:
      'Tek başına bu bulgular chILD düşündürmeyebilir; ancak persistan/ilerleyici semptom, hipoksemi veya yaygın görüntüleme bulgusu gelişirse yeniden değerlendir.',
  };
}
