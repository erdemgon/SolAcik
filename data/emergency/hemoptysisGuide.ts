export type HemoptysisSeverityKey =
  | 'airwayThreat'
  | 'hypoxemia'
  | 'hemodynamic'
  | 'ongoingBleeding'
  | 'largeVolume'
  | 'clot'
  | 'singleLung'
  | 'coagulopathy'
  | 'cfBronchiectasis'
  | 'tbFungal';

export type HemoptysisCauseKey =
  | 'infection'
  | 'bronchiectasis'
  | 'foreignBody'
  | 'tb'
  | 'vascular'
  | 'coagulopathy'
  | 'diffuseAlveolarHemorrhage'
  | 'traumaIatrogenic'
  | 'cardiac';

export const hemoptysisSource = {
  badge:
    'Kaynak yaklaşımı: pediatrik hemoptizi derlemeleri + masif hemoptizi hava yolu/embolizasyon algoritmaları — yerel acil ve bronkoskopi protokolü ile doğrulanmalıdır.',
  warning:
    'Bu modül acil hemoptizi için eğitim ve checklist aracıdır. Masif/yaşamı tehdit eden hemoptizide öncelik hava yolu, oksijenasyon, kanama tarafının korunması ve erken çocuk göğüs–yoğun bakım–KBB/bronşoskopi–girişimsel radyoloji ekip koordinasyonudur.',
};

export const severitySignals: {
  key: HemoptysisSeverityKey;
  label: string;
  note: string;
}[] = [
  {
    key: 'airwayThreat',
    label: 'Hava yolu tehdidi',
    note: 'Kan pıhtısı, boğulma hissi, sekresyonu temizleyememe veya aspirasyon riski.',
  },
  {
    key: 'hypoxemia',
    label: 'Hipoksemi / artan oksijen ihtiyacı',
    note: 'Kan hacminden bağımsız olarak yaşamı tehdit eden hemoptizi kabul edilir.',
  },
  {
    key: 'hemodynamic',
    label: 'Hemodinamik bozulma',
    note: 'Taşikardi, hipotansiyon, solukluk, şok veya transfüzyon ihtiyacı.',
  },
  {
    key: 'ongoingBleeding',
    label: 'Devam eden aktif kanama',
    note: 'Tekrarlayan veya durmayan kanama acil ekip koordinasyonu gerektirir.',
  },
  {
    key: 'largeVolume',
    label: 'Büyük hacimli kanama',
    note: 'Çocuk kanı yutabilir; görülen hacim kanama miktarını olduğundan az gösterebilir.',
  },
  {
    key: 'clot',
    label: 'Pıhtı / hava yolu tıkanması',
    note: 'Aspirasyon, bronkoskopik temizlik ve yoğun bakım gereksinimi açısından uyarıcıdır.',
  },
  {
    key: 'singleLung',
    label: 'Tek taraflı yoğun kanama şüphesi',
    note: 'Kanayan taraf aşağı pozisyon ve bronkoskopi/BT anjiyo planı düşünülebilir.',
  },
  {
    key: 'coagulopathy',
    label: 'Koagülopati / antikoagülan',
    note: 'Trombositopeni, INR/aPTT bozukluğu, karaciğer hastalığı veya ilaç öyküsü.',
  },
  {
    key: 'cfBronchiectasis',
    label: 'CF / bronşektazi',
    note: 'Bronşiyal arter kaynaklı kanama ve embolizasyon gereksinimi riski.',
  },
  {
    key: 'tbFungal',
    label: 'TB / fungal / kaviter hastalık',
    note: 'Kavite, aspergilloma veya aktif TB ayırıcı tanısı acil izolasyon ve görüntüleme gerektirebilir.',
  },
];

export const firstFiveMinutes = [
  'A-B-C: hava yolu açıklığı, oksijenasyon, dolaşım ve bilinç durumunu değerlendir.',
  'Yardım çağır: çocuk yoğun bakım, çocuk göğüs/bronşoskopi, anestezi, KBB ve girişimsel radyoloji.',
  'Çocuğu kanayan taraf biliniyorsa kanayan taraf aşağı olacak şekilde pozisyonla.',
  'Yüksek akımlı oksijen ver; aspirasyon/suction hazır olsun.',
  'İki damar yolu, kan grubu-crossmatch, tam kan, trombosit, PT/INR, aPTT, fibrinojen ve biyokimya hazırla.',
  'Antikoagülan/antiagregan, koagülopati ve trombositopeni varsa hızlı düzeltme için hematoloji/yoğun bakım ile görüş.',
  'Kanama durumu stabil değilse görüntüleme beklemeden hava yolu ve ekip koordinasyonunu önceliklendir.',
];

export const diagnosticWorkup = [
  'Kan gerçekten alt hava yolundan mı? Epistaksis, hematemez ve orofaringeal kanama dışlanır.',
  'Akciğer grafisi ilk tarama olabilir; normal grafi hemoptiziyi dışlamaz.',
  'Stabil hastada kontrastlı BT / BT anjiyo kanama kaynağı, bronşektazi, kavite, yabancı cisim veya vasküler lezyon için değerlidir.',
  'Bronkoskopi hava yolu temizleme, taraf lokalizasyonu, yabancı cisim ve seçilmiş tedavi için gerekir.',
  'Enfeksiyon şüphesinde balgam/BAL kültürü, TB ve fungal inceleme klinik bağlama göre.',
  'Diffüz alveoler hemoraji şüphesinde Hb düşüşü, yaygın infiltrasyon, otoimmün/vaskülit testleri ve BAL değerlendirilir.',
];

export const causePathways: {
  key: HemoptysisCauseKey;
  title: string;
  clues: string[];
  action: string;
}[] = [
  {
    key: 'infection',
    title: 'Enfeksiyon / pnömoni',
    clues: ['Ateş', 'Yeni infiltrasyon', 'Balgam artışı', 'Plevritik ağrı'],
    action: 'Klinik ağırlığa göre antibiyotik, kültür ve komplikasyon değerlendirmesi; pnömoni modülüne bağla.',
  },
  {
    key: 'bronchiectasis',
    title: 'Bronşektazi / CF / PCD',
    clues: ['Kronik ıslak öksürük', 'Bilinen bronşektazi', 'Pseudomonas', 'Tekrarlayan hemoptizi'],
    action: 'Önceki kültürler, BT anjiyo ve bronşiyal arter embolizasyon gereksinimi değerlendirilir.',
  },
  {
    key: 'foreignBody',
    title: 'Yabancı cisim',
    clues: ['Ani başlangıç', 'Tek taraflı hışıltı', 'Lokal havalanma farkı', 'Tekrarlayan lokal pnömoni'],
    action: 'Bronkoskopi ekibiyle acil değerlendirme; görüntüleme normal olsa bile şüphe sürerse bronkoskopi.',
  },
  {
    key: 'tb',
    title: 'TB / mikobakteri / fungal kavite',
    clues: ['Kilo kaybı', 'Gece terlemesi', 'Kavite', 'Temas', 'İmmün baskı'],
    action: 'İzolasyon, mikrobiyoloji ve çocuk TB/enfeksiyon süreci başlatılır.',
  },
  {
    key: 'vascular',
    title: 'Vasküler malformasyon / pulmoner AVM',
    clues: ['Tekrarlayan kanama', 'Siyanoz', 'HHT öyküsü', 'BT’de vasküler lezyon'],
    action: 'BT anjiyo ve girişimsel radyoloji/kardiyoloji değerlendirmesi.',
  },
  {
    key: 'coagulopathy',
    title: 'Koagülopati',
    clues: ['Peteşi', 'Burun/diş eti kanaması', 'Trombositopeni', 'INR/aPTT bozukluğu'],
    action: 'Koagülopatiyi düzelt; hematoloji ve yoğun bakım ile kan ürünleri planı.',
  },
  {
    key: 'diffuseAlveolarHemorrhage',
    title: 'Diffüz alveoler hemoraji',
    clues: ['Anemi', 'Yaygın buzlu cam/infiltrasyon', 'Hemoptizi olmayabilir', 'Romatolojik bulgu'],
    action: 'Acil romatoloji/enfeksiyon/yoğun bakım; vaskülit, anti-GBM ve immün nedenler değerlendirilir.',
  },
  {
    key: 'traumaIatrogenic',
    title: 'Travma / girişim sonrası',
    clues: ['Bronkoskopi, entübasyon, aspirasyon, biyopsi veya göğüs travması öyküsü'],
    action: 'İşleme bağlı kanama, hava yolu yaralanması ve pnömotoraks açısından değerlendirme.',
  },
  {
    key: 'cardiac',
    title: 'Kardiyak / pulmoner venöz hipertansiyon',
    clues: ['Kalp hastalığı', 'Pulmoner ödem', 'Mitral/pulmoner venöz sorun', 'PH bulguları'],
    action: 'Kardiyoloji, ekokardiyografi ve pulmoner hipertansiyon değerlendirmesi.',
  },
];

export const treatmentTools = [
  'Masif hemoptizide kesin tedavi nedeni ve kaynağa göre değişir; algoritma ekip koordinasyonudur.',
  'Stabil hastada BT anjiyo kanama kaynağını ve embolizasyon planını yönlendirebilir.',
  'Bronkoskopi; hava yolu temizleme, kanama tarafını bulma, lokal soğuk serum/adrenalin veya balon tamponad gibi seçilmiş işlemler için uzman ekip gerektirir.',
  'Bronşiyal arter embolizasyonu tekrarlayan veya yaşamı tehdit eden bronşiyal sistem kanamalarında önemli seçenektir.',
  'Cerrahi nadiren, lokalize ve kontrol edilemeyen kanamada, uygun merkezde değerlendirilir.',
  'Traneksamik asit inhaler/IV kullanımı bazı merkezlerde düşünülebilir; pediatrik doz ve endikasyon kurum protokolüyle doğrulanmalıdır.',
];

export function classifyHemoptysisSeverity(selected: HemoptysisSeverityKey[]) {
  const critical =
    selected.includes('airwayThreat') ||
    selected.includes('hypoxemia') ||
    selected.includes('hemodynamic') ||
    selected.includes('ongoingBleeding') ||
    selected.includes('clot');

  if (critical) {
    return {
      tone: 'red' as const,
      title: 'Yaşamı tehdit eden hemoptizi olabilir',
      action:
        'Hava yolu ve oksijenasyon önceliklidir. Çocuk yoğun bakım, bronkoskopi/anestezi ve girişimsel radyoloji erken çağrılmalıdır.',
    };
  }

  if (selected.length >= 2) {
    return {
      tone: 'amber' as const,
      title: 'Yakın değerlendirme gerekir',
      action:
        'Kanama miktarı çocukta düşük tahmin edilebilir; laboratuvar, görüntüleme ve altta yatan hastalık yönünden hızlı değerlendirme yap.',
    };
  }

  return {
    tone: 'gray' as const,
    title: 'Hafif hemoptizi olabilir',
    action:
      'Stabil ve küçük miktarlı kanamada enfeksiyon/epistaksis gibi sık nedenler değerlendirilir; tekrar veya risk faktörü varsa ileri inceleme gerekir.',
  };
}
