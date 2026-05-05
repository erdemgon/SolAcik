import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ChildhoodTbScreen } from './modules/childhood-tb';
import { AsthmaManagementScreen } from './modules/asthma-management';
import { CftrModulatorScreen } from './modules/cftr-modulator';
import { InhaledMedicationsScreen } from './modules/inhaled-medications';
import { SpirometryGliScreen } from './modules/spirometry-gli';
import { ChronicCoughScreen } from './modules/chronic-cough';
import { AsthmaBiologicsScreen } from './modules/asthma-biologics';
import { BronchiolitisScreen } from './modules/bronchiolitis';
import { ParapneumonicEffusionScreen } from './modules/parapneumonic-effusion';
import { ChildInterstitialLungDiseaseScreen } from './modules/child-interstitial-lung-disease';
import { PediatricPneumoniaScreen } from './modules/pediatric-pneumonia';
import { NonCfBronchiectasisScreen } from './modules/non-cf-bronchiectasis';
import { PrimaryCiliaryDyskinesiaScreen } from './modules/primary-ciliary-dyskinesia';
import { PediatricOsasSleepScreen } from './modules/pediatric-osas-sleep';
import { HemoptysisEmergencyScreen } from './modules/hemoptysis-emergency';
import { PulmonaryHypertensionEmergencyScreen } from './modules/pulmonary-hypertension-emergency';
import { BronchoscopyProcedureScreen } from './modules/bronchoscopy-procedure';
import { HomeVentilationScreen } from './modules/home-ventilation';
import { SystemicSteroidsScreen } from './modules/systemic-steroids';
import { ImmunologyReferenceScreen } from './modules/immunology-reference';
import { TracheostomyScreen } from './modules/tracheostomy';
import { BalReferenceScreen } from './modules/bal-reference';

const solAcikLogo = require('./assets/sol-acik-logo.png');

type ScreenKey =
  | 'home'
  | 'asthma'
  | 'asthmaManagement'
  | 'asthmaBiologics'
  | 'chronicCough'
  | 'bronchiolitis'
  | 'parapneumonicEffusion'
  | 'childInterstitial'
  | 'pediatricPneumonia'
  | 'nonCfBronchiectasis'
  | 'primaryCiliaryDyskinesia'
  | 'pediatricOsasSleep'
  | 'hemoptysisEmergency'
  | 'pulmonaryHypertensionEmergency'
  | 'categoryDiseases'
  | 'categoryProcedures'
  | 'categoryTechnology'
  | 'categoryReferences'
  | 'pibo'
  | 'cf'
  | 'trach'
  | 'homeVentilation'
  | 'bronchoscopyProcedure'
  | 'bronchoscopeCompat'
  | 'childhoodTb'
  | 'cftrModulator'
  | 'inhaledMedications'
  | 'systemicSteroids'
  | 'spirometryGli'
  | 'immunologyReference'
  | 'balReference'
  | 'inhaler'
  | 'notes'
  | 'resources';

type GuideScreen = {
  key: ScreenKey;
  title: string;
  shortTitle: string;
  description: string;
  sections: {
    heading: string;
    items: string[];
  }[];
};

type Bronchoscope = {
  brand: string;
  model: string;
  useProfile: string;
  distalTipOD: number;
  insertionTubeOD: number | null;
  workingChannelID: number | null;
  minETT: string;
  minLMA: string;
  shortNote: string;
  sourceNote: string;
};

type DiameterFilter = {
  label: string;
  min: number | null;
  max: number | null;
};

type HomeCategory = {
  key: ScreenKey;
  title: string;
  description: string;
};

type ModuleLink = {
  title: string;
  description: string;
  target?: ScreenKey;
  status?: string;
  group?: string;
};

type SearchIndexItem = ModuleLink & {
  categoryTitle: string;
  searchText: string;
};

const ACCENT = '#8f1d2c';
const SOFT_ACCENT = '#f9e9ec';
const TEXT = '#211f1f';
const MUTED = '#686868';
const CARD = '#f5f5f6';

const homeCategories: HomeCategory[] = [
  {
    key: 'categoryDiseases',
    title: 'Çocuk Solunum Yolu Hastalıkları',
    description: 'Astım, kistik fibrozis, tüberküloz, bronşiolit, pnömoni ve diğer hastalık modülleri.',
  },
  {
    key: 'categoryProcedures',
    title: 'Girişimsel İşlemler',
    description: 'Bronkoskopi, silya biyopsisi ve girişimsel bronkoskopi araçları.',
  },
  {
    key: 'categoryTechnology',
    title: 'Solunum Teknolojileri',
    description: 'Trakeostomi, ev ventilatörü ve solunum destek teknolojileri.',
  },
  {
    key: 'categoryReferences',
    title: 'Normal Değerler, İlaç Dozları ve Sık Kullanılanlar',
    description: 'İnhaler ilaçlar, immünolojik değerler, BAL ve spirometri referansları.',
  },
];

const categoryModules: Record<string, ModuleLink[]> = {
  categoryDiseases: [
    {
      title: 'Astım Yönetimi',
      description: 'GINA 2025 temelli basamak, kontrol, rahatlatıcı ve alevlenme checklist’i.',
      target: 'asthmaManagement',
      group: 'Astım',
    },
    {
      title: 'Astım Biyolojik Tedaviler',
      description: 'Ağır astımda biyolojik ilaç seçici, karar ağacı ve doz kartları.',
      target: 'asthmaBiologics',
      group: 'Astım',
    },
    {
      title: 'Kistik Fibrozis Yıllık İzlem Checklist’i',
      description: 'Yıllık değerlendirmede atlanmaması gereken başlıklar.',
      target: 'cf',
      group: 'Kistik Fibrozis',
    },
    {
      title: 'CFTR Modülatör',
      description: 'Trikafta/Kaftrio ve Alyftrek için yaş-varyant ön uygunluk kontrolü.',
      target: 'cftrModulator',
      group: 'Kistik Fibrozis',
    },
    {
      title: 'Öksürüğe Yaklaşım',
      description: 'Kronik öksürükte spesifik ipuçları, ıslak/kuru öksürük ve karar ağacı.',
      target: 'chronicCough',
      group: 'Kronik Öksürük ve Hava Yolu',
    },
    {
      title: 'Non-CF Bronşektazi',
      description: 'Kronik ıslak öksürük, BT tanısı, etiyoloji ve alevlenme karar ağacı.',
      target: 'nonCfBronchiectasis',
      group: 'Kronik Öksürük ve Hava Yolu',
    },
    {
      title: 'Primer Siliyer Diskinezi',
      description: 'PCD şüphesi, tanısal test seçimi, sonuç yorumu ve izlem checklist’i.',
      target: 'primaryCiliaryDyskinesia',
      group: 'Kronik Öksürük ve Hava Yolu',
    },
    {
      title: 'Çocuk TB',
      description: 'Çocukluk çağı tüberkülozu tanı, TBE ve tedavi doz hatırlatıcıları.',
      target: 'childhoodTb',
      group: 'Enfeksiyonlar',
    },
    {
      title: 'Bronşiolit',
      description: 'Akut bronşiolit değerlendirme ve izlem checklist’i.',
      target: 'bronchiolitis',
      group: 'Enfeksiyonlar',
    },
    {
      title: 'Pnömoni',
      description: 'Toplumda gelişen ve immün baskılanmış çocukta pnömoni algoritması.',
      target: 'pediatricPneumonia',
      group: 'Enfeksiyonlar',
    },
    {
      title: 'Parapnömonik Efüzyon',
      description: 'Efüzyon değerlendirme, Light kriterleri ve drenaj karar uyarıları.',
      target: 'parapneumonicEffusion',
      group: 'Enfeksiyonlar',
    },
    {
      title: 'Çocukluk Çağı İnterstisyel Akciğer Hastalıkları',
      description: 'ChILD şüphesi, dışlama listesi, patern ve uzman merkez karar ağacı.',
      target: 'childInterstitial',
      group: 'Nadir / Kompleks Hastalıklar',
    },
    {
      title: 'OSAS ve Uyku',
      description: 'Horlama, PSG gereksinimi, CPAP/NIV yolu ve persistan OSAS karar ağacı.',
      target: 'pediatricOsasSleep',
      group: 'Uyku ve Solunum Kontrolü',
    },
    {
      title: 'Hemoptizi Acil',
      description: 'Hava yolu tehdidi, ilk 5 dakika, neden ve kanama kontrol karar ağacı.',
      target: 'hemoptysisEmergency',
      group: 'Acil Yaklaşım',
    },
    {
      title: 'Pulmoner Hipertansiyon Acil',
      description: 'PH krizi, prostasiklin kesintisi, tetikleyici düzeltme ve yoğun bakım koordinasyonu.',
      target: 'pulmonaryHypertensionEmergency',
      group: 'Acil Yaklaşım',
    },
    {
      title: 'PIBO Takip Checklist’i',
      description: 'Post-infeksiyöz bronşiolitis obliterans izlemi.',
      target: 'pibo',
      group: 'Nadir / Kompleks Hastalıklar',
    },
  ],
  categoryProcedures: [
    {
      title: 'Bronkoskopi ve BAL',
      description: 'Hazırlık, anestezi, BAL istemleri, normal hücre değerleri ve patern yorumları.',
      target: 'bronchoscopyProcedure',
      group: 'Bronkoskopi',
    },
    {
      title: 'Bronkoskop Uyumluluk',
      description: 'Fleksibl bronkoskop, ETT ve LMA uyumluluğu için hızlı eğitim tablosu.',
      target: 'bronchoscopeCompat',
      group: 'Bronkoskopi',
    },
    {
      title: 'Silya Biyopsisi Alma',
      description: 'Örnek alma, taşıma ve kalite notları için modül alanı.',
      status: 'Planlandı',
      group: 'Örnek Alma',
    },
    {
      title: 'Girişimsel Bronkoskopi',
      description: 'Girişimsel bronkoskopi hazırlık ve güvenlik checklist’i.',
      status: 'Planlandı',
      group: 'Bronkoskopi',
    },
  ],
  categoryTechnology: [
    {
      title: 'Trakeostomi',
      description: 'Acil algoritma, acil set ve yaşa göre yaklaşık kanül boyutu hatırlatıcı.',
      target: 'trach',
      group: 'Trakeostomi',
    },
    {
      title: 'Ev Ventilatörü',
      description: 'Ev tipi ventilatör izlem ve alarm değerlendirme araçları.',
      target: 'homeVentilation',
      group: 'Ev Solunum Desteği',
    },
  ],
  categoryReferences: [
    {
      title: 'İnhale İlaçlar',
      description: 'Yaşa göre inhaler, nebül ve kuru toz seçici.',
      target: 'inhaledMedications',
      group: 'İlaçlar',
    },
    {
      title: 'Sistemik Steroidler',
      description: 'Glukokortikoid eşdeğerleri ve pediatrik solunum kısa kür doz hatırlatıcıları.',
      target: 'systemicSteroids',
      group: 'İlaçlar',
    },
    {
      title: 'İnhaler Cihaz Eğitim Kartları',
      description: 'Hasta ve aile eğitiminde hızlı cihaz tekniği kontrolü.',
      target: 'inhaler',
      group: 'İlaçlar',
    },
    {
      title: 'İmmünolojik Değerler',
      description: 'Türkiye çocuk verisiyle yaşa göre IgG, IgA, IgM ve IgG alt grup referansları.',
      target: 'immunologyReference',
      group: 'Normal Değerler',
    },
    {
      title: 'BAL Hücre Popülasyon Değerleri',
      description: 'Yüklenen çocuk BAL normal hücre ve lenfosit alt popülasyon değerleri.',
      target: 'balReference',
      group: 'Normal Değerler',
    },
    {
      title: 'Spirometri GLI',
      description: 'Çocuklarda yaş, cinsiyet ve boya göre normal değer ve z-skor hesaplayıcı.',
      target: 'spirometryGli',
      group: 'Normal Değerler',
    },
    {
      title: 'Kaynaklar ve Yasal Uyarı',
      description: 'Açık kaynak, eğitim amacı ve kullanım sınırları.',
      target: 'resources',
      group: 'Uygulama',
    },
    {
      title: 'Notlarım',
      description: 'Kişisel hatırlatmalar ve kurum içi kısa notlar.',
      target: 'notes',
      group: 'Uygulama',
    },
  ],
};

const moduleSearchIndex: SearchIndexItem[] = homeCategories.flatMap((category) =>
  (categoryModules[category.key] ?? []).map((module) => ({
    ...module,
    categoryTitle: category.title,
    searchText: normalizeSearchText(
      `${category.title} ${module.title} ${module.description} ${module.status ?? ''}`,
    ),
  })),
);

function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const brandFilters = ['Tümü', 'Olympus', 'Pentax', 'Fujifilm', 'Karl Storz', 'Ambu'];

const diameterFilters: DiameterFilter[] = [
  { label: 'Tümü', min: null, max: null },
  { label: '≤3.0 mm', min: null, max: 3.0 },
  { label: '3.1–3.5 mm', min: 3.1, max: 3.5 },
  { label: '3.6–4.0 mm', min: 3.6, max: 4.0 },
  { label: '4.1–4.5 mm', min: 4.1, max: 4.5 },
  { label: '>4.5 mm', min: 4.5, max: null },
];

const bronchoscopes: Bronchoscope[] = [
  {
    brand: 'Olympus',
    model: 'BF-XP190',
    useProfile: 'Ultra-slim video bronkoskop; küçük çocuk ve periferik hava yolu için uygun',
    distalTipOD: 3.1,
    insertionTubeOD: 2.8,
    workingChannelID: 1.2,
    minETT: '3.5 mm çok sıkı / ≥4.0 mm daha pratik',
    minLMA: 'LMA 2.0 civarı',
    shortNote: 'Küçük çocuklarda erişim avantajı sağlar; çalışma kanalı sınırlıdır.',
    sourceNote: 'Üretici katalog/IFU ile doğrulanmalıdır.',
  },
  {
    brand: 'Olympus',
    model: 'BF-MP190F',
    useProfile: 'Ultra-thin video bronkoskop; periferik erişim ve küçük hava yolu değerlendirmesi',
    distalTipOD: 3.0,
    insertionTubeOD: 3.7,
    workingChannelID: 1.7,
    minETT: '4.5 mm geçebilir / ≥5.0 mm daha pratik',
    minLMA: 'LMA 2.5 civarı',
    shortNote:
      'Distal uç ince olsa da insersiyon tüp çapı daha büyüktür; filtrelemede büyük çap dikkate alınmalıdır.',
    sourceNote: 'Üretici katalog/IFU ile doğrulanmalıdır.',
  },
  {
    brand: 'Olympus',
    model: 'BF-P190',
    useProfile: 'Daha büyük çocuk/adolesan; daha iyi aspirasyon ve aksesuar kullanımı',
    distalTipOD: 4.2,
    insertionTubeOD: 4.1,
    workingChannelID: 2.0,
    minETT: '5.0 mm geçiş / ≥5.5 mm daha pratik',
    minLMA: 'LMA 3.0 civarı',
    shortNote: '2.0 mm kanal avantajı vardır; küçük ETT içinde uygun değildir.',
    sourceNote: 'Üretici katalog/IFU ile doğrulanmalıdır.',
  },
  {
    brand: 'Pentax',
    model: 'FB-8V',
    useProfile: 'Ultra-slim fiberoptik bronkoskop; neonatal/küçük pediatrik kullanım için uygun',
    distalTipOD: 2.7,
    insertionTubeOD: 2.8,
    workingChannelID: 1.15,
    minETT: '3.5 mm sıkı / ≥4.0 mm daha pratik',
    minLMA: 'LMA 1.5–2.0 civarı',
    shortNote: 'Küçük çap avantajı vardır; çalışma kanalı sınırlıdır.',
    sourceNote: 'Üretici katalog/IFU ile doğrulanmalıdır.',
  },
  {
    brand: 'Pentax',
    model: 'FB-10V',
    useProfile: 'Slim fiberoptik bronkoskop; küçük-orta çocuklarda kullanım',
    distalTipOD: 3.4,
    insertionTubeOD: 3.5,
    workingChannelID: 2.1,
    minETT: '4.5 mm geçiş / ≥5.0 mm daha pratik',
    minLMA: 'LMA 2.0–2.5 civarı',
    shortNote:
      'Kanal çapı avantajlı görünebilir; yerel model ve IFU bilgisi mutlaka doğrulanmalıdır.',
    sourceNote: 'Bazı kaynaklarda çalışma kanalı farklı bildirilebilir; resmi IFU ile doğrulanmalıdır.',
  },
  {
    brand: 'Pentax',
    model: 'FB-15V',
    useProfile: 'Daha büyük çocuk/adolesan; geniş çalışma kanalı ihtiyacı olan işlemler',
    distalTipOD: 4.9,
    insertionTubeOD: 4.9,
    workingChannelID: 1.95,
    minETT: '6.0 mm civarı / ≥6.0–6.5 mm daha pratik',
    minLMA: 'LMA 3.0 civarı',
    shortNote:
      'Küçük çocuk ETT içinde uygun değildir; büyük çocuk/adolesan için daha mantıklıdır.',
    sourceNote: 'Üretici katalog/IFU ile doğrulanmalıdır.',
  },
  {
    brand: 'Fujifilm',
    model: 'EB-530P',
    useProfile: 'Ultra-slim video bronkoskop; pediatrik alternatif',
    distalTipOD: 3.8,
    insertionTubeOD: 3.8,
    workingChannelID: 1.2,
    minETT: '4.5 mm geçiş / ≥5.0 mm daha pratik',
    minLMA: 'LMA 2.5 civarı',
    shortNote: 'Video görüntüleme avantajı vardır; çalışma kanalı sınırlıdır.',
    sourceNote: 'Üretici katalog/IFU ile doğrulanmalıdır.',
  },
  {
    brand: 'Karl Storz',
    model: 'Intubation Fiberscope 2.8 × 65',
    useProfile: 'Pediatrik hava yolu ve fiberoptik entübasyon odaklı kullanım',
    distalTipOD: 2.8,
    insertionTubeOD: 2.8,
    workingChannelID: 1.2,
    minETT: '≥3.5 mm',
    minLMA: 'LMA 1.5–2.0 civarı',
    shortNote: 'Özellikle küçük çocuk hava yolu ve entübasyon senaryolarında faydalı olabilir.',
    sourceNote: 'Üretici katalog/IFU ile doğrulanmalıdır.',
  },
  {
    brand: 'Ambu',
    model: 'aScope 4 Broncho Slim 3.8/1.2',
    useProfile: 'Tek kullanımlık slim bronkoskop; yoğun bakım ve enfeksiyon kontrolü açısından avantajlı',
    distalTipOD: 3.8,
    insertionTubeOD: 3.8,
    workingChannelID: 1.2,
    minETT: '4.5 mm geçiş / ≥5.0 mm daha pratik',
    minLMA: 'LMA 2.5 civarı',
    shortNote: 'Disposable olması enfeksiyon kontrolü ve erişilebilirlik açısından avantaj sağlayabilir.',
    sourceNote: 'Üretici katalog/IFU ile doğrulanmalıdır.',
  },
];

const warningTexts = [
  'Bu tablo eğitim ve hızlı hatırlatma amacıyla hazırlanmıştır. ETT ve LMA uyumluluğu yalnızca çapla belirlenmez. Bronkoskopun distal uç çapı, insersiyon tüp çapı, ETT/LMA markası, cuff durumu, ventilasyon gereksinimi, sekresyon yükü, işlem süresi ve oksijenasyon riski dikkate alınmalıdır. Klinik kullanım öncesinde cihazın resmi IFU/katalog bilgisi ve kurum protokolü kontrol edilmelidir.',
  'Çalışma kanalı iç çapı, bronkoskopun iç çapı anlamına gelmez; aspirasyon, BAL ve aksesuar geçiş kapasitesini gösterir.',
  'Minimum ETT değerleri fiziksel geçiş ve pratik ventilasyon açısından farklı olabilir. Pratikte ventilasyon güvenliği için bronkoskop dış çapından daha geniş ETT lümeni tercih edilmelidir.',
];

const screens: GuideScreen[] = [
  {
    key: 'asthma',
    title: 'Astım Hızlı Rehber',
    shortTitle: 'Astım',
    description: 'Poliklinikte hızlı özet, eğitim ve kontrol basamakları.',
    sections: [
      {
        heading: 'Kontrol ve risk sorgusu',
        items: [
          'Gündüz/gece semptom sıklığı ve aktivite kısıtlılığı',
          'Son 12 ay atak, acil başvuru, sistemik steroid gereksinimi',
          'İnhaler teknik, uyum, tetikleyici ve sigara maruziyeti',
        ],
      },
      {
        heading: 'Kayıt notu',
        items: [
          'Fenotip ipuçları, eşlik eden rinit/GER/obezite',
          'Spirometri/PEF sonucu ve önceki değerlerle karşılaştırma',
          'Hasta-aile eğitim ihtiyacı ve yazılı eylem planı durumu',
        ],
      },
    ],
  },
  {
    key: 'pibo',
    title: 'PIBO Takip Checklist’i',
    shortTitle: 'PIBO',
    description: 'Post-infeksiyöz bronşiolitis obliterans izlemi için hatırlatıcı.',
    sections: [
      {
        heading: 'Her vizitte',
        items: [
          'Egzersiz toleransı, hışıltı, öksürük ve oksijen ihtiyacı',
          'Beslenme, büyüme eğrisi ve okul/oyun katılımı',
          'Aşı durumu ve enfeksiyon önleme danışmanlığı',
        ],
      },
      {
        heading: 'Periyodik değerlendirme',
        items: [
          'Solunum fonksiyon testi uygun yaşta planlandı mı?',
          'Görüntüleme gereksinimi klinik değişiklikle birlikte düşünüldü mü?',
          'Pulmoner rehabilitasyon/egzersiz önerileri güncellendi mi?',
        ],
      },
    ],
  },
  {
    key: 'cf',
    title: 'Kistik Fibrozis Yıllık İzlem Checklist’i',
    shortTitle: 'KF Yıllık',
    description: 'Yıllık değerlendirmede atlanmaması gereken başlıklar.',
    sections: [
      {
        heading: 'Solunum ve mikrobiyoloji',
        items: [
          'Yıllık kültür paterni, alevlenme sıklığı ve antibiyotik öyküsü',
          'Spirometri trendi ve hava yolu temizliği rutini',
          'Görüntüleme ve komplikasyon taramaları merkezin protokolüne göre',
        ],
      },
      {
        heading: 'Sistemik izlem',
        items: [
          'Beslenme, pankreas enzimleri, vitaminler ve büyüme',
          'OGTT, karaciğer, kemik sağlığı ve psikososyal değerlendirme',
          'Tedavi erişimi, uyum ve aile yükü konuşuldu mu?',
        ],
      },
    ],
  },
  {
    key: 'trach',
    title: 'Trakeostomi Acil Algoritması',
    shortTitle: 'Trakeostomi',
    description: 'Acil durumda ekip içi ortak dil ve hızlı kontrol sırası.',
    sections: [
      {
        heading: 'İlk dakika',
        items: [
          'Yardım çağır, monitörize et, oksijen ver, hastayı değerlendir',
          'Kanül tıkanıklığı, yer değiştirme ve ekipman eksikliği olasılığını düşün',
          'Acil set: yedek aynı boy, bir küçük boy kanül, aspirasyon, ambu hazır mı?',
        ],
      },
      {
        heading: 'Kontrol adımları',
        items: [
          'Aspirasyon kateteri geçiyor mu?',
          'İç kanül varsa çıkarılıp temizlendi/değiştirildi mi?',
          'Ventilasyon sağlanamıyorsa kurum protokolüne göre acil yol haritası izlendi mi?',
        ],
      },
    ],
  },
  {
    key: 'inhaler',
    title: 'İnhaler Cihaz Eğitim Kartları',
    shortTitle: 'İnhaler',
    description: 'Hasta ve aile eğitiminde hızlı cihaz tekniği kontrolü.',
    sections: [
      {
        heading: 'Ölçülü doz inhaler + hazne',
        items: [
          'Çalkala, hazneye yerleştir, maske/ağızlık sızdırmazlığını kontrol et',
          'Tek puf uygula, 5-6 sakin nefes aldır, puflar arasında bekle',
          'Steroid sonrası ağız çalkalama ve hazne temizliği anlatıldı mı?',
        ],
      },
      {
        heading: 'Kuru toz inhaler',
        items: [
          'Cihaz yükleme adımı doğru gösterildi mi?',
          'Hızlı ve derin inspirasyon yapabiliyor mu?',
          'Cihaza nefes verme hatası özellikle kontrol edildi mi?',
        ],
      },
    ],
  },
  {
    key: 'resources',
    title: 'Kaynaklar ve Yasal Uyarı',
    shortTitle: 'Kaynaklar',
    description: 'Açık kaynak yaklaşımı, eğitim amacı ve sorumluluk sınırları.',
    sections: [
      {
        heading: 'Kullanım ilkesi',
        items: [
          'Sol Açık açık kaynaklı bir eğitim ve checklist aracıdır.',
          'Tanı koymaz, tedavi kararı vermez, klinisyenin yerini almaz.',
          'Yerel protokoller, güncel kılavuzlar ve uzman klinik değerlendirme esastır.',
        ],
      },
      {
        heading: 'Kaynak yaklaşımı',
        items: [
          'İçerik, pediatrik göğüs hastalıkları pratiğinde sık kullanılan kontrol başlıkları olarak düzenlenmiştir.',
          'Kılavuz bağlantıları ve kurum protokol notları ilerleyen sürümlerde eklenebilir.',
        ],
      },
    ],
  },
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenKey>('home');
  const [notes, setNotes] = useState('');
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
  const [isDisclaimerChecked, setIsDisclaimerChecked] = useState(false);

  const selectedScreen = useMemo(
    () => screens.find((screen) => screen.key === activeScreen),
    [activeScreen],
  );
  const selectedCategory = categoryModules[activeScreen] ? activeScreen : null;

  if (!hasAcceptedDisclaimer) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.appFrame}>
          <View style={styles.header}>
            <View style={styles.logoMark}>
              <Image
                accessibilityLabel="Sol Açık logosu"
                source={solAcikLogo}
                style={styles.headerLogoImage}
              />
            </View>
            <View style={styles.headerTextWrap}>
              <Text style={styles.appName}>Sol Açık</Text>
              <Text style={styles.appSubtitle}>
                Açık Kaynak Çocuk Göğüs Klinik Asistanı
              </Text>
            </View>
          </View>
          <ConsentScreen
            checked={isDisclaimerChecked}
            onToggle={() => setIsDisclaimerChecked((value) => !value)}
            onAccept={() => setHasAcceptedDisclaimer(true)}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appFrame}>
        <View style={styles.header}>
          {activeScreen !== 'home' ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Ana sayfaya dön"
              onPress={() => setActiveScreen('home')}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>‹</Text>
            </Pressable>
          ) : (
            <View style={styles.logoMark}>
              <Image
                accessibilityLabel="Sol Açık logosu"
                source={solAcikLogo}
                style={styles.headerLogoImage}
              />
            </View>
          )}
          <View style={styles.headerTextWrap}>
            <Text style={styles.appName}>Sol Açık</Text>
            <Text style={styles.appSubtitle}>
              Açık Kaynak Çocuk Göğüs Klinik Asistanı
            </Text>
          </View>
        </View>

        {activeScreen === 'home' ? (
          <HomeScreen onOpen={setActiveScreen} />
        ) : selectedCategory ? (
          <CategoryScreen categoryKey={selectedCategory} onOpen={setActiveScreen} />
        ) : activeScreen === 'notes' ? (
          <NotesScreen notes={notes} onChangeNotes={setNotes} />
        ) : activeScreen === 'bronchoscopeCompat' ? (
          <BronchoscopeCompatibilityScreen />
        ) : activeScreen === 'bronchoscopyProcedure' ? (
          <BronchoscopyProcedureScreen />
        ) : activeScreen === 'childhoodTb' ? (
          <ChildhoodTbScreen />
        ) : activeScreen === 'asthmaManagement' ? (
          <AsthmaManagementScreen />
        ) : activeScreen === 'asthmaBiologics' ? (
          <AsthmaBiologicsScreen />
        ) : activeScreen === 'chronicCough' ? (
          <ChronicCoughScreen />
        ) : activeScreen === 'bronchiolitis' ? (
          <BronchiolitisScreen />
        ) : activeScreen === 'parapneumonicEffusion' ? (
          <ParapneumonicEffusionScreen />
        ) : activeScreen === 'childInterstitial' ? (
          <ChildInterstitialLungDiseaseScreen />
        ) : activeScreen === 'pediatricPneumonia' ? (
          <PediatricPneumoniaScreen />
        ) : activeScreen === 'nonCfBronchiectasis' ? (
          <NonCfBronchiectasisScreen />
        ) : activeScreen === 'primaryCiliaryDyskinesia' ? (
          <PrimaryCiliaryDyskinesiaScreen />
        ) : activeScreen === 'pediatricOsasSleep' ? (
          <PediatricOsasSleepScreen />
        ) : activeScreen === 'hemoptysisEmergency' ? (
          <HemoptysisEmergencyScreen />
        ) : activeScreen === 'pulmonaryHypertensionEmergency' ? (
          <PulmonaryHypertensionEmergencyScreen />
        ) : activeScreen === 'homeVentilation' ? (
          <HomeVentilationScreen />
        ) : activeScreen === 'trach' ? (
          <TracheostomyScreen />
        ) : activeScreen === 'cftrModulator' ? (
          <CftrModulatorScreen />
        ) : activeScreen === 'inhaledMedications' ? (
          <InhaledMedicationsScreen />
        ) : activeScreen === 'systemicSteroids' ? (
          <SystemicSteroidsScreen />
        ) : activeScreen === 'spirometryGli' ? (
          <SpirometryGliScreen />
        ) : activeScreen === 'immunologyReference' ? (
          <ImmunologyReferenceScreen />
        ) : activeScreen === 'balReference' ? (
          <BalReferenceScreen />
        ) : selectedScreen ? (
          <GuideDetail screen={selectedScreen} />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

function ConsentScreen({
  checked,
  onToggle,
  onAccept,
}: {
  checked: boolean;
  onToggle: () => void;
  onAccept: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.consentCard}>
        <Text style={styles.screenKicker}>İlk kullanım onayı</Text>
        <Text style={styles.screenTitle}>Klinik Kullanım Sınırı</Text>
        <Text style={styles.screenDescription}>
          Sol Açık açık kaynaklı bir eğitim, hatırlatma ve checklist aracıdır.
          Klinik karar desteği, tanı koyucu sistem veya tedavi belirleyici araç
          değildir.
        </Text>

        <View style={styles.consentTextBlock}>
          <Text style={styles.consentBody}>
            Yerel protokoller, güncel resmi kılavuzlar, kurum uygulamaları ve
            klinisyen değerlendirmesi her zaman önceliklidir. Bilgiler gözden
            geçirilerek hazırlanmış olsa da güncellik, uygunluk ve klinik kullanım
            sorumluluğu kullanıcıdadır.
          </Text>
          <Text style={styles.consentBody}>
            Bu uygulamaya hasta adı, TC kimlik numarası, doğum tarihi, telefon,
            adres, hastane numarası veya tanımlanabilir sağlık verisi girilmemelidir.
          </Text>
        </View>

        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked }}
          onPress={onToggle}
          style={styles.consentCheckRow}
        >
          <View
            style={[
              styles.consentCheckbox,
              checked ? styles.consentCheckboxChecked : undefined,
            ]}
          >
            {checked ? <Text style={styles.consentCheckMark}>✓</Text> : null}
          </View>
          <Text style={styles.consentCheckText}>
            Okudum, anladım; Sol Açık’ı klinik kararın yerine kullanmayacağımı
            kabul ediyorum.
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          disabled={!checked}
          onPress={onAccept}
          style={[
            styles.consentButton,
            !checked ? styles.consentButtonDisabled : undefined,
          ]}
        >
          <Text style={styles.consentButtonText}>Devam et</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function HomeScreen({ onOpen }: { onOpen: (screen: ScreenKey) => void }) {
  const [query, setQuery] = useState('');
  const normalizedQuery = normalizeSearchText(query.trim());
  const searchResults = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return moduleSearchIndex
      .filter((item) => item.searchText.includes(normalizedQuery))
      .slice(0, 12);
  }, [normalizedQuery]);
  const isSearching = normalizedQuery.length > 0;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.hero}>
        <Image
          accessibilityLabel="Sol Açık logosu"
          resizeMode="contain"
          source={solAcikLogo}
          style={styles.heroLogo}
        />
        <Text style={styles.heroEyebrow}>Eğitim ve checklist aracı</Text>
        <Text style={styles.heroTitle}>
          Sol Açık: Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
        </Text>
        <Text style={styles.heroBody}>
          Pediatrik pulmonologlar ve çocuk göğüs hastalıkları yan dal asistanları
          için, yoğun klinik akışta okunabilir kısa kontrol ekranları.
        </Text>
      </View>

      <View style={styles.searchPanel}>
        <Text style={styles.searchLabel}>Modül ara</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={setQuery}
          placeholder="Örn. BAL, PCD, hemoptizi, inhaler..."
          placeholderTextColor="#8a8a8a"
          style={styles.searchInput}
          value={query}
        />
        {isSearching ? (
          <View style={styles.searchResults}>
            <Text style={styles.searchResultsHeader}>
              {searchResults.length > 0
                ? `${searchResults.length} sonuç`
                : 'Sonuç bulunamadı'}
            </Text>
            {searchResults.length > 0 ? (
              searchResults.map((module) => (
                <SearchResultCard key={`${module.categoryTitle}-${module.title}`} module={module} onOpen={onOpen} />
              ))
            ) : (
              <Text style={styles.noResultsText}>
                Daha genel bir kelime deneyin veya kategori başlıklarından ilerleyin.
              </Text>
            )}
          </View>
        ) : null}
      </View>

      <View style={styles.grid}>
        {homeCategories.map((category) => (
          <Pressable
            accessibilityRole="button"
            key={category.key}
            onPress={() => onOpen(category.key)}
            style={({ pressed }) => [
              styles.card,
              styles.categoryCard,
              pressed ? styles.cardPressed : undefined,
            ]}
          >
            <Text style={styles.categoryBadge}>
              {categoryModules[category.key]?.length ?? 0} modül
            </Text>
            <Text style={styles.cardTitle}>{category.title}</Text>
            <Text style={styles.cardDescription}>{category.description}</Text>
            <Text style={styles.cardAction}>Kategoriye gir</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

function SearchResultCard({
  module,
  onOpen,
}: {
  module: SearchIndexItem;
  onOpen: (screen: ScreenKey) => void;
}) {
  const isPlanned = !module.target;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isPlanned}
      onPress={() => module.target && onOpen(module.target)}
      style={({ pressed }) => [
        styles.searchResultCard,
        isPlanned ? styles.plannedCard : undefined,
        pressed ? styles.cardPressed : undefined,
      ]}
    >
      <Text style={styles.searchResultCategory}>{module.categoryTitle}</Text>
      <Text style={styles.cardTitle}>{module.title}</Text>
      <Text style={styles.cardDescription}>{module.description}</Text>
      <Text style={[styles.cardAction, isPlanned ? styles.plannedAction : undefined]}>
        {isPlanned ? 'Yakında' : 'Aç'}
      </Text>
    </Pressable>
  );
}

function CategoryScreen({
  categoryKey,
  onOpen,
}: {
  categoryKey: ScreenKey;
  onOpen: (screen: ScreenKey) => void;
}) {
  const category = homeCategories.find((item) => item.key === categoryKey);
  const modules = categoryModules[categoryKey] ?? [];
  const groupedModules = groupModules(modules);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.detailIntro}>
        <Text style={styles.screenKicker}>Modül kategorisi</Text>
        <Text style={styles.screenTitle}>{category?.title}</Text>
        <Text style={styles.screenDescription}>{category?.description}</Text>
      </View>

      <View style={styles.groupStack}>
        {groupedModules.map((group) => (
          <View key={group.title} style={styles.moduleGroup}>
            <View style={styles.moduleGroupHeader}>
              <Text style={styles.moduleGroupTitle}>{group.title}</Text>
              <Text style={styles.moduleGroupCount}>{group.modules.length}</Text>
            </View>
            <View style={styles.grid}>
              {group.modules.map((module) => (
                <ModuleListCard key={module.title} module={module} onOpen={onOpen} />
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function groupModules(modules: ModuleLink[]) {
  const groups: { title: string; modules: ModuleLink[] }[] = [];

  modules.forEach((module) => {
    const title = module.group ?? 'Diğer';
    const existing = groups.find((group) => group.title === title);
    if (existing) {
      existing.modules.push(module);
    } else {
      groups.push({ title, modules: [module] });
    }
  });

  return groups;
}

function ModuleListCard({
  module,
  onOpen,
}: {
  module: ModuleLink;
  onOpen: (screen: ScreenKey) => void;
}) {
  const isPlanned = !module.target;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isPlanned}
      onPress={() => module.target && onOpen(module.target)}
      style={({ pressed }) => [
        styles.card,
        isPlanned ? styles.plannedCard : undefined,
        pressed ? styles.cardPressed : undefined,
      ]}
    >
      {module.status ? <Text style={styles.plannedBadge}>{module.status}</Text> : null}
      <Text style={styles.cardTitle}>{module.title}</Text>
      <Text style={styles.cardDescription}>{module.description}</Text>
      <Text style={[styles.cardAction, isPlanned ? styles.plannedAction : undefined]}>
        {isPlanned ? 'Yakında' : 'Aç'}
      </Text>
    </Pressable>
  );
}

function GuideDetail({ screen }: { screen: GuideScreen }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.detailIntro}>
        <Text style={styles.screenKicker}>{screen.shortTitle}</Text>
        <Text style={styles.screenTitle}>{screen.title}</Text>
        <Text style={styles.screenDescription}>{screen.description}</Text>
      </View>

      {screen.sections.map((section) => (
        <View key={section.heading} style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{section.heading}</Text>
          {section.items.map((item) => (
            <View key={item} style={styles.checkRow}>
              <View style={styles.checkBox} />
              <Text style={styles.checkText}>{item}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

function BronchoscopeCompatibilityScreen() {
  const [selectedBrand, setSelectedBrand] = useState('Tümü');
  const [selectedDiameter, setSelectedDiameter] = useState('Tümü');
  const [showFullTable, setShowFullTable] = useState(false);
  const [showWarnings, setShowWarnings] = useState(false);

  const filteredBronchoscopes = useMemo(() => {
    const diameterFilter = diameterFilters.find(
      (filter) => filter.label === selectedDiameter,
    );

    return bronchoscopes.filter((scope) => {
      const effectiveDiameter = getEffectiveDiameter(scope);
      const brandMatches = selectedBrand === 'Tümü' || scope.brand === selectedBrand;
      const minMatches =
        !diameterFilter?.min || effectiveDiameter >= diameterFilter.min;
      const maxMatches =
        !diameterFilter?.max || effectiveDiameter <= diameterFilter.max;

      return brandMatches && minMatches && maxMatches;
    });
  }, [selectedBrand, selectedDiameter]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.detailIntro}>
        <Text style={styles.screenKicker}>Uyumluluk kontrolü</Text>
        <Text style={styles.screenTitle}>Bronkoskop–ETT–LMA Uyumluluk</Text>
        <Text style={styles.screenDescription}>
          Pediatrik fleksibl bronkoskopların ETT ve LMA ile yaklaşık uyumluluğunu
          hızlıca gözden geçirmek için eğitim/checklist ekranı.
        </Text>
      </View>

      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>Klinik kullanım öncesi doğrulayın</Text>
        <Text style={styles.noticeBody}>
          Ölçümler resmi üretici IFU/katalog bilgisi ve yerel kurum protokolü ile
          doğrulanmadan cihaz seçimi için kullanılmamalıdır. Hasta verisi toplanmaz.
        </Text>
      </View>

      <View style={styles.filterPanel}>
        <Text style={styles.filterTitle}>Bronkoskop markası</Text>
        <View style={styles.chipWrap}>
          {brandFilters.map((brand) => (
            <FilterChip
              key={brand}
              label={brand}
              selected={selectedBrand === brand}
              onPress={() => setSelectedBrand(brand)}
            />
          ))}
        </View>
      </View>

      <View style={styles.filterPanel}>
        <Text style={styles.filterTitle}>Dış çap aralığı</Text>
        <Text style={styles.filterHint}>
          Filtreleme distal uç ve insersiyon tüp çapının büyük olanına göre yapılır.
        </Text>
        <View style={styles.chipWrap}>
          {diameterFilters.map((filter) => (
            <FilterChip
              key={filter.label}
              label={filter.label}
              selected={selectedDiameter === filter.label}
              onPress={() => setSelectedDiameter(filter.label)}
            />
          ))}
        </View>
      </View>

      <View style={styles.actionRow}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setShowFullTable((value) => !value)}
          style={({ pressed }) => [
            styles.primaryAction,
            pressed ? styles.cardPressed : undefined,
          ]}
        >
          <Text style={styles.primaryActionText}>
            {showFullTable ? 'Tam tabloyu gizle' : 'Tam tabloyu göster'}
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => setShowWarnings((value) => !value)}
          style={({ pressed }) => [
            styles.secondaryAction,
            pressed ? styles.cardPressed : undefined,
          ]}
        >
          <Text style={styles.secondaryActionText}>
            {showWarnings ? 'Uyarıları gizle' : 'Uyarıları göster'}
          </Text>
        </Pressable>
      </View>

      {showFullTable ? <FullTableView scopes={bronchoscopes} /> : null}

      <View style={styles.resultHeader}>
        <Text style={styles.resultTitle}>Eşleşen bronkoskoplar</Text>
        <Text style={styles.resultCount}>{filteredBronchoscopes.length} kayıt</Text>
      </View>

      {filteredBronchoscopes.length > 0 ? (
        filteredBronchoscopes.map((scope) => (
          <BronchoscopeCard key={`${scope.brand}-${scope.model}`} scope={scope} />
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Bu filtrelere uygun bronkoskop bulunamadı. Daha geniş çap aralığı seçin
            veya tam tabloyu görüntüleyin.
          </Text>
        </View>
      )}

      {showWarnings ? <WarningBox /> : null}

      <Text style={styles.moduleFooter}>
        Sol Açık — Açık kaynak çocuk göğüs klinik asistanı
      </Text>
    </ScrollView>
  );
}

function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.filterChip,
        selected ? styles.filterChipSelected : undefined,
        pressed ? styles.cardPressed : undefined,
      ]}
    >
      <Text
        style={[
          styles.filterChipText,
          selected ? styles.filterChipTextSelected : undefined,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function BronchoscopeCard({ scope }: { scope: Bronchoscope }) {
  return (
    <View style={styles.scopeCard}>
      <View style={styles.scopeHeader}>
        <View style={styles.brandPill}>
          <Text style={styles.brandPillText}>{scope.brand}</Text>
        </View>
        <Text style={styles.effectiveDiameter}>
          Filtre çapı {formatMm(getEffectiveDiameter(scope))}
        </Text>
      </View>

      <Text style={styles.scopeModel}>{scope.model}</Text>
      <Text style={styles.scopeProfile}>{scope.useProfile}</Text>

      <View style={styles.metricGrid}>
        <Metric label="Distal uç OD" value={formatMm(scope.distalTipOD)} />
        <Metric
          label="İnsersiyon OD"
          value={scope.insertionTubeOD ? formatMm(scope.insertionTubeOD) : 'Yok'}
        />
        <Metric
          label="Çalışma kanalı ID"
          value={scope.workingChannelID ? formatMm(scope.workingChannelID) : 'Yok'}
        />
      </View>

      <View style={styles.compatBlock}>
        <Text style={styles.compatLabel}>Önerilen minimum ETT ID</Text>
        <Text style={styles.compatValue}>{scope.minETT}</Text>
      </View>

      <View style={styles.compatBlock}>
        <Text style={styles.compatLabel}>Önerilen minimum LMA</Text>
        <Text style={styles.compatValue}>{scope.minLMA}</Text>
      </View>

      <Text style={styles.scopeNote}>{scope.shortNote}</Text>
      <Text style={styles.sourceNote}>{scope.sourceNote}</Text>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricBox}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function FullTableView({ scopes }: { scopes: Bronchoscope[] }) {
  return (
    <View style={styles.tableCard}>
      <Text style={styles.sectionTitle}>Tam tablo</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            {[
              'Marka',
              'Model',
              'Profil',
              'Distal OD',
              'İnsersiyon OD',
              'Kanal ID',
              'Min ETT',
              'Min LMA',
              'Not',
            ].map((heading) => (
              <Text key={heading} style={[styles.tableCell, styles.tableHeaderCell]}>
                {heading}
              </Text>
            ))}
          </View>

          {scopes.map((scope) => (
            <View key={`${scope.brand}-${scope.model}`} style={styles.tableRow}>
              <Text style={styles.tableCell}>{scope.brand}</Text>
              <Text style={styles.tableCell}>{scope.model}</Text>
              <Text style={[styles.tableCell, styles.tableWideCell]}>
                {scope.useProfile}
              </Text>
              <Text style={styles.tableCell}>{formatMm(scope.distalTipOD)}</Text>
              <Text style={styles.tableCell}>
                {scope.insertionTubeOD ? formatMm(scope.insertionTubeOD) : 'Yok'}
              </Text>
              <Text style={styles.tableCell}>
                {scope.workingChannelID ? formatMm(scope.workingChannelID) : 'Yok'}
              </Text>
              <Text style={[styles.tableCell, styles.tableMediumCell]}>
                {scope.minETT}
              </Text>
              <Text style={styles.tableCell}>{scope.minLMA}</Text>
              <Text style={[styles.tableCell, styles.tableWideCell]}>
                {scope.shortNote}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function WarningBox() {
  return (
    <View style={styles.warningBox}>
      <Text style={styles.warningTitle}>Uyarılar</Text>
      {warningTexts.map((warning) => (
        <Text key={warning} style={styles.warningText}>
          {warning}
        </Text>
      ))}
    </View>
  );
}

function getEffectiveDiameter(scope: Bronchoscope) {
  return Math.max(scope.distalTipOD, scope.insertionTubeOD ?? scope.distalTipOD);
}

function formatMm(value: number) {
  return `${value.toFixed(1)} mm`;
}

function NotesScreen({
  notes,
  onChangeNotes,
}: {
  notes: string;
  onChangeNotes: (value: string) => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.detailIntro}>
        <Text style={styles.screenKicker}>Kişisel alan</Text>
        <Text style={styles.screenTitle}>Notlarım</Text>
        <Text style={styles.screenDescription}>
          Klinik akışta hızlı hatırlatmalar için yerel taslak alanı.
        </Text>
      </View>

      <TextInput
        accessibilityLabel="Notlarım"
        multiline
        onChangeText={onChangeNotes}
        placeholder="Örn. Poliklinik checklist düzeni, kurum protokol bağlantıları, eğitimde vurgulanacak noktalar..."
        placeholderTextColor="#8b8b8b"
        style={styles.notesInput}
        textAlignVertical="top"
        value={notes}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appFrame: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#ececef',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  logoMark: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#e4e4e7',
    borderWidth: 1,
    borderRadius: 8,
    height: 42,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 42,
  },
  logoText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  headerLogoImage: {
    height: 38,
    width: 38,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: SOFT_ACCENT,
    borderRadius: 8,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  backButtonText: {
    color: ACCENT,
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 34,
  },
  headerTextWrap: {
    flex: 1,
  },
  appName: {
    color: TEXT,
    fontSize: 19,
    fontWeight: '800',
  },
  appSubtitle: {
    color: MUTED,
    fontSize: 12,
    marginTop: 2,
  },
  scrollContent: {
    gap: 14,
    padding: 18,
    paddingBottom: 34,
  },
  hero: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#eeeeef',
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  heroLogo: {
    height: 172,
    marginBottom: 10,
    width: '100%',
  },
  heroEyebrow: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroTitle: {
    color: TEXT,
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 32,
    textAlign: 'center',
  },
  heroBody: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    textAlign: 'center',
  },
  searchPanel: {
    backgroundColor: '#fff',
    borderColor: '#eeeeef',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 14,
  },
  searchLabel: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  searchInput: {
    backgroundColor: CARD,
    borderColor: '#dfdfe3',
    borderRadius: 8,
    borderWidth: 1,
    color: TEXT,
    fontSize: 16,
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchResults: {
    gap: 10,
    paddingTop: 2,
  },
  searchResultsHeader: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '800',
  },
  searchResultCard: {
    backgroundColor: CARD,
    borderColor: '#e9e9eb',
    borderRadius: 8,
    borderWidth: 1,
    padding: 13,
  },
  searchResultCategory: {
    color: ACCENT,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 6,
  },
  noResultsText: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
  },
  notice: {
    backgroundColor: SOFT_ACCENT,
    borderLeftColor: ACCENT,
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 14,
  },
  noticeTitle: {
    color: ACCENT,
    fontSize: 15,
    fontWeight: '800',
  },
  noticeBody: {
    color: TEXT,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
  consentCard: {
    backgroundColor: '#fff',
    borderColor: '#ececee',
    borderRadius: 8,
    borderWidth: 1,
    gap: 16,
    padding: 18,
  },
  consentTextBlock: {
    backgroundColor: CARD,
    borderRadius: 8,
    gap: 10,
    padding: 14,
  },
  consentBody: {
    color: TEXT,
    fontSize: 15,
    lineHeight: 22,
  },
  consentCheckRow: {
    alignItems: 'flex-start',
    backgroundColor: SOFT_ACCENT,
    borderColor: '#ebc8cf',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 14,
  },
  consentCheckbox: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: ACCENT,
    borderRadius: 5,
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    marginTop: 1,
    width: 24,
  },
  consentCheckboxChecked: {
    backgroundColor: ACCENT,
  },
  consentCheckMark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 18,
  },
  consentCheckText: {
    color: TEXT,
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  consentButton: {
    alignItems: 'center',
    backgroundColor: ACCENT,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  consentButtonDisabled: {
    backgroundColor: '#cfcfd2',
  },
  consentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
  grid: {
    gap: 12,
  },
  groupStack: {
    gap: 14,
  },
  moduleGroup: {
    gap: 10,
  },
  moduleGroupHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  moduleGroupTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '900',
  },
  moduleGroupCount: {
    backgroundColor: SOFT_ACCENT,
    borderRadius: 999,
    color: ACCENT,
    fontSize: 12,
    fontWeight: '900',
    minWidth: 28,
    overflow: 'hidden',
    paddingHorizontal: 9,
    paddingVertical: 5,
    textAlign: 'center',
  },
  card: {
    backgroundColor: CARD,
    borderColor: '#e9e9eb',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  categoryCard: {
    backgroundColor: '#f7f7f8',
    minHeight: 132,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderColor: '#e3e3e6',
    borderRadius: 999,
    borderWidth: 1,
    color: ACCENT,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  plannedCard: {
    opacity: 0.74,
  },
  plannedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ececef',
    borderRadius: 999,
    color: MUTED,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  plannedAction: {
    color: MUTED,
  },
  notesCard: {
    backgroundColor: '#f2f6f5',
  },
  compatCard: {
    backgroundColor: '#f7f3f4',
  },
  tbCard: {
    backgroundColor: '#f9f4f1',
  },
  asthmaManagementCard: {
    backgroundColor: '#f8f5f7',
  },
  cftrCard: {
    backgroundColor: '#f4f7fa',
  },
  inhaledMedicationCard: {
    backgroundColor: '#f3f7f6',
  },
  cardPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.99 }],
  },
  cardTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
  },
  cardDescription: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  cardAction: {
    color: ACCENT,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 12,
  },
  detailIntro: {
    gap: 7,
    paddingVertical: 4,
  },
  screenKicker: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: '900',
  },
  screenTitle: {
    color: TEXT,
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 31,
  },
  screenDescription: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 22,
  },
  sectionCard: {
    backgroundColor: CARD,
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: '800',
  },
  checkRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
  },
  checkBox: {
    backgroundColor: '#fff',
    borderColor: ACCENT,
    borderRadius: 4,
    borderWidth: 2,
    height: 20,
    marginTop: 1,
    width: 20,
  },
  checkText: {
    color: TEXT,
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
  notesInput: {
    backgroundColor: CARD,
    borderColor: '#e1e1e4',
    borderRadius: 8,
    borderWidth: 1,
    color: TEXT,
    fontSize: 16,
    lineHeight: 23,
    minHeight: 280,
    padding: 16,
  },
  filterPanel: {
    backgroundColor: CARD,
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 14,
  },
  filterTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: '800',
  },
  filterHint: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 18,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 42,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  filterChipSelected: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },
  filterChipText: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '700',
  },
  filterChipTextSelected: {
    color: '#fff',
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  primaryAction: {
    backgroundColor: ACCENT,
    borderRadius: 8,
    minHeight: 46,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  primaryActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryAction: {
    backgroundColor: SOFT_ACCENT,
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 46,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  secondaryActionText: {
    color: ACCENT,
    fontSize: 14,
    fontWeight: '800',
  },
  resultHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '900',
  },
  resultCount: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '700',
  },
  scopeCard: {
    backgroundColor: CARD,
    borderColor: '#e6e6e8',
    borderRadius: 8,
    borderWidth: 1,
    gap: 11,
    padding: 15,
  },
  scopeHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  brandPill: {
    backgroundColor: SOFT_ACCENT,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  brandPillText: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: '900',
  },
  effectiveDiameter: {
    color: MUTED,
    flexShrink: 1,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'right',
  },
  scopeModel: {
    color: TEXT,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 25,
  },
  scopeProfile: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricBox: {
    backgroundColor: '#fff',
    borderColor: '#e3e3e5',
    borderRadius: 8,
    borderWidth: 1,
    flexGrow: 1,
    minWidth: 98,
    padding: 10,
  },
  metricLabel: {
    color: MUTED,
    fontSize: 11,
    fontWeight: '800',
  },
  metricValue: {
    color: TEXT,
    fontSize: 15,
    fontWeight: '900',
    marginTop: 3,
  },
  compatBlock: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 11,
  },
  compatLabel: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '800',
  },
  compatValue: {
    color: TEXT,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 20,
    marginTop: 3,
  },
  scopeNote: {
    color: TEXT,
    fontSize: 14,
    lineHeight: 20,
  },
  sourceNote: {
    color: ACCENT,
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
  },
  emptyState: {
    backgroundColor: CARD,
    borderColor: '#e5e5e7',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  emptyStateText: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 22,
  },
  tableCard: {
    backgroundColor: CARD,
    borderColor: '#e5e5e7',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  table: {
    minWidth: 1260,
  },
  tableRow: {
    borderBottomColor: '#e5e5e7',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  tableHeaderRow: {
    backgroundColor: SOFT_ACCENT,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableCell: {
    color: TEXT,
    fontSize: 12,
    lineHeight: 17,
    padding: 9,
    width: 118,
  },
  tableHeaderCell: {
    color: ACCENT,
    fontWeight: '900',
  },
  tableWideCell: {
    width: 190,
  },
  tableMediumCell: {
    width: 165,
  },
  warningBox: {
    backgroundColor: SOFT_ACCENT,
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 14,
  },
  warningTitle: {
    color: ACCENT,
    fontSize: 16,
    fontWeight: '900',
  },
  warningText: {
    color: TEXT,
    fontSize: 14,
    lineHeight: 20,
  },
  moduleFooter: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '700',
    paddingTop: 2,
    textAlign: 'center',
  },
});
