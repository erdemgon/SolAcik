export type BoScenario = 'postInfectious' | 'postTransplant';

export type BoFamDrugId = 'fluticasone' | 'budesonideNebule' | 'azithromycin' | 'montelukast' | 'acetylcysteine';

export type BoFamRegimen = {
  id: string;
  scenario: BoScenario;
  title: string;
  evidenceLevel: 'pediatrik retrospektif veri' | 'post-HCT prospektif faz II / erişkin ağırlıklı' | 'ekstrapolasyon / uzman doğrulaması';
  duration: string;
  drugs: BoFamDrugId[];
  notes: string[];
  sourceTitle: string;
  sourceVersion: string;
  sourceUrl: string;
  sourceNote: string;
};

export type BoFamDoseResult = {
  drugId: BoFamDrugId;
  label: string;
  calculatedText: string;
  practicalText: string;
  verification: string;
};

export const boFamSourceBadge =
  'Kaynak sürümü: FAM/BAM BO literatür özeti — 2026-05-05; uzman merkez ve KÜB/KT ile doğrulanmalıdır';

export const boFamSafetyDisclaimer =
  'Bu ekran reçete veya tedavi kararı üretmez. PIBO, post-HCT BOS ve post-transplant BO yönetimi; tanı doğruluğu, enfeksiyon dışlanması, immünsüpresyon durumu, QT/karaciğer riski, ilaç etkileşimleri, transplant ekibi ve çocuk göğüs uzmanı kararı ile doğrulanmalıdır.';

export const boFamRegimens: BoFamRegimen[] = [
  {
    id: 'pibo_bam_chen_2020',
    scenario: 'postInfectious',
    title: 'PIBO çocuk BAM şeması — budesonid + azitromisin + montelukast',
    evidenceLevel: 'pediatrik retrospektif veri',
    duration: 'En az 3 ay çalışılmıştır; sürdürme/sonlandırma uzman izlemiyle.',
    drugs: ['budesonideNebule', 'azithromycin', 'montelukast'],
    notes: [
      'Çalışmada <5 yaş PIBO çocuklarında budesonid nebül, montelukast ve azitromisin kombinasyonu değerlendirilmiştir.',
      'Bu veri FAM’ın doğrudan post-HCT BOS protokolüyle aynı değildir; PIBO için ayrı okunmalıdır.',
      'Uzun dönem yarar, optimal süre ve hasta seçimi net değildir.',
    ],
    sourceTitle:
      'Chen et al. Therapeutic effect of budesonide, montelukast and azithromycin on post-infectious bronchiolitis obliterans in children.',
    sourceVersion: 'Exp Ther Med 2020; retrospektif pediatrik kohort',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7401899/',
    sourceNote:
      'Çalışma rejimi: budesonid 1 mg nebül günde iki kez; montelukast 4 mg günde bir; azitromisin 5 mg/kg günde bir, haftanın ilk 3 günü; en az 3 ay.',
  },
  {
    id: 'pibo_bama_followup_2021',
    scenario: 'postInfectious',
    title: 'PIBO BAMA izlem şeması — budesonid + azitromisin + montelukast + asetilsistein',
    evidenceLevel: 'pediatrik retrospektif veri',
    duration: 'Akut fazda 3 ay kombinasyon tedavisi olarak bildirilmiştir.',
    drugs: ['budesonideNebule', 'azithromycin', 'montelukast', 'acetylcysteine'],
    notes: [
      'BAMA çalışması PIBO için pediatrik izlem verisi sağlar; FAM’ın post-HCT protokolüyle karıştırılmamalıdır.',
      'Asetilsistein eklenmesi yerel uygulama ve toleransla değerlendirilmelidir.',
    ],
    sourceTitle:
      'Follow-up on therapeutic effects of budesonide, azithromycin, montelukast, and acetylcysteine regimen in children with PIBO.',
    sourceVersion: 'Front Pediatr/PMC 2021; pediatrik PIBO izlem çalışması',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8411176/',
    sourceNote:
      'Çalışma rejimi: budesonid 0.5 mg nebül günde iki kez; azitromisin 5 mg/kg gün aşırı; montelukast 4 mg gece; asetilsistein yaşa göre.',
  },
  {
    id: 'post_hct_fam_williams_2016',
    scenario: 'postTransplant',
    title: 'Post-HCT BOS FAM — flutikazon + azitromisin + montelukast',
    evidenceLevel: 'post-HCT prospektif faz II / erişkin ağırlıklı',
    duration: 'Çalışmada yeni başlangıç BOS için 6 ay FAM ve kısa steroid pulse/taper yaklaşımı değerlendirilmiştir.',
    drugs: ['fluticasone', 'azithromycin', 'montelukast'],
    notes: [
      'Bu şema post-HCT BOS bağlamında çalışılmıştır; post-enfeksiyöz BO için birebir pediatrik standart değildir.',
      'Çalışma, FEV1 düşüşünü sınırlama ve steroid maruziyetini azaltma hipoteziyle yapılmıştır.',
      'Çocuk/adolesan transplant hastasında doz ve eşlik eden immünsüpresyon transplant ekibiyle doğrulanmalıdır.',
    ],
    sourceTitle:
      'Williams et al. Fluticasone, azithromycin, and montelukast treatment for new-onset BOS after HCT.',
    sourceVersion: 'Biol Blood Marrow Transplant 2016; faz II açık etiketli çalışma',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/26475726/',
    sourceNote:
      'FAM bileşenleri literatürde flutikazon inhaler, azitromisin ve montelukast olarak bildirilmiştir; orijinal doz uygulaması uzman/transplant protokolüyle doğrulanmalıdır.',
  },
  {
    id: 'post_hct_fam_case_series_2011',
    scenario: 'postTransplant',
    title: 'Post-HCT BOS FAM — steroid azaltıcı vaka serisi',
    evidenceLevel: 'post-HCT prospektif faz II / erişkin ağırlıklı',
    duration: '6 aylık takipte steroid maruziyeti ve FEV1 değişimi değerlendirilmiştir.',
    drugs: ['fluticasone', 'azithromycin', 'montelukast'],
    notes: [
      'Vaka serisi FAM’ın steroid maruziyetini azaltma amacıyla kullanımını tanımlar.',
      'Klinik karar için tek başına yeterli değildir; yeni BOS, enfeksiyon dışlanması ve GVHD durumu birlikte ele alınır.',
    ],
    sourceTitle:
      'Norman et al. FAM therapy in reducing corticosteroid exposure in BOS after allogeneic HCT.',
    sourceVersion: 'Bone Marrow Transplant 2011; vaka serisi',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3987109/',
    sourceNote:
      'Vaka serisinde flutikazon 440 mcg inhaler günde iki kez, azitromisin 250 mg Pazartesi-Çarşamba-Cuma ve montelukast 10 mg günlük uygulanmıştır.',
  },
];

function roundToNearest(value: number, step: number) {
  return Math.round(value / step) * step;
}

export function calculateBoFamDoses({
  ageYears,
  weightKg,
  regimenId,
}: {
  ageYears: number;
  weightKg: number;
  regimenId: string;
}): BoFamDoseResult[] {
  const regimen = boFamRegimens.find((item) => item.id === regimenId) ?? boFamRegimens[0];
  const results: BoFamDoseResult[] = [];

  for (const drug of regimen.drugs) {
    if (drug === 'fluticasone') {
      results.push({
        drugId: drug,
        label: 'Flutikazon inhaler',
        calculatedText: 'Post-HCT FAM literatüründe sabit erişkin/erişkin ağırlıklı doz kullanılmıştır.',
        practicalText: '440 mcg inhaler günde 2 kez olarak bildirilmiştir; pediatrik ürün/doz KÜB ile doğrulanır.',
        verification: 'Çocuk/adolesan transplant hastasında otomatik doz değildir; transplant ekibi ve ürün KÜB/KT zorunludur.',
      });
    }

    if (drug === 'budesonideNebule') {
      const dose = regimen.id === 'pibo_bama_followup_2021' ? '0.5 mg nebül günde 2 kez' : '1 mg nebül günde 2 kez';
      results.push({
        drugId: drug,
        label: 'Budesonid nebül',
        calculatedText: 'Çalışma protokolünde sabit nebül doz kullanılmıştır.',
        practicalText: dose,
        verification: 'Formülasyon, yaş, toplam steroid yükü, büyüme/adrenal risk ve yerel KÜB/KT ile doğrulanmalıdır.',
      });
    }

    if (drug === 'azithromycin') {
      if (regimen.scenario === 'postTransplant') {
        const pediatricCandidate = roundToNearest(Math.min(weightKg * 5, 250), 10);
        results.push({
          drugId: drug,
          label: 'Azitromisin',
          calculatedText: `5 mg/kg hesap: ${Math.round(weightKg * 5)} mg; 250 mg tavanla yaklaşık ${pediatricCandidate} mg/doz.`,
          practicalText: 'Post-HCT FAM vaka serisinde 250 mg Pazartesi-Çarşamba-Cuma bildirilmiştir.',
          verification: 'QT, karaciğer, etkileşim, transplant profilaksileri ve yaş/kilo için transplant ekibi doğrulaması gerekir.',
        });
      } else if (regimen.id === 'pibo_bama_followup_2021') {
        const dose = roundToNearest(weightKg * 5, 10);
        results.push({
          drugId: drug,
          label: 'Azitromisin',
          calculatedText: `5 mg/kg/doz hesap: yaklaşık ${dose} mg/doz.`,
          practicalText: 'BAMA izlem çalışmasında gün aşırı verilmiştir.',
          verification: 'Makrolid direnci, QT, karaciğer ve ilaç etkileşimi açısından doğrulanmalıdır.',
        });
      } else {
        const dose = roundToNearest(weightKg * 5, 10);
        results.push({
          drugId: drug,
          label: 'Azitromisin',
          calculatedText: `5 mg/kg/doz hesap: yaklaşık ${dose} mg/doz.`,
          practicalText: 'PIBO BAM çalışmasında haftanın ilk 3 günü günde 1 doz bildirilmiştir.',
          verification: 'Makrolid direnci, QT, karaciğer ve ilaç etkileşimi açısından doğrulanmalıdır.',
        });
      }
    }

    if (drug === 'montelukast') {
      const dose = ageYears < 6 ? 4 : ageYears < 15 ? 5 : 10;
      results.push({
        drugId: drug,
        label: 'Montelukast',
        calculatedText: `Yaşa göre hatırlatıcı doz: ${dose} mg gece/günlük.`,
        practicalText: regimen.scenario === 'postTransplant' ? 'Post-HCT FAM literatüründe 10 mg günlük bildirilmiştir.' : `${dose} mg gece/günlük.`,
        verification: 'Nöropsikiyatrik yan etki danışmanlığı, yaş/form ve KÜB/KT doğrulaması gerekir.',
      });
    }

    if (drug === 'acetylcysteine') {
      const dose = ageYears < 0.5 ? 33 : ageYears < 1 ? 50 : 100;
      results.push({
        drugId: drug,
        label: 'Asetilsistein',
        calculatedText: `BAMA yaş bandı hatırlatıcı: ${dose} mg/doz.`,
        practicalText: `${dose} mg günde 3 kez olarak çalışmada bildirilmiştir.`,
        verification: 'Formülasyon, tolerans, bronkospazm/sekresyon etkisi ve yerel protokol ile doğrulanmalıdır.',
      });
    }
  }

  return results;
}
