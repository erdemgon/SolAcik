import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PediatricTbDrugKey, pediatricTbDrugs } from '../data/tbDrugs';
import {
  diagnosticChecklist,
  monitoringCards,
  tbDiseaseRegimens,
  tbTestSelectionRules,
  tbeRegimens,
  tdtInterpretationNotes,
} from '../data/tbRegimens';
import { CopyTreatmentButton } from '../components/tb/CopyTreatmentButton';
import { DrugDoseReferencePanel } from '../components/tb/DrugDoseReferencePanel';
import { BulletList, InfoCard } from '../components/tb/InfoCard';
import { RegimenSelector } from '../components/tb/RegimenSelector';
import { TabButton } from '../components/tb/TabButton';
import { TestSelectionCard } from '../components/tb/TestSelectionCard';
import { TreatmentCategoryCard } from '../components/tb/TreatmentCategoryCard';
import { TreatmentSummaryCard } from '../components/tb/TreatmentSummaryCard';
import { TbWarningBox } from '../components/tb/WarningBox';
import { WeightAgeInput } from '../components/tb/WeightAgeInput';
import { tbColors } from '../components/tb/theme';
import {
  calculateDoseMg,
  calculateWeeklyRifapentine,
  parsePositiveNumber,
} from '../utils/tbDoseCalculator';

type TbTab = 'diagnosis' | 'classification' | 'calculator' | 'warnings';
type TreatmentCategory = 'tbe' | 'disease';

const tabs: { key: TbTab; label: string }[] = [
  { key: 'diagnosis', label: 'Tanı' },
  { key: 'classification', label: 'TBE / Hastalık' },
  { key: 'calculator', label: 'Tedavi Hesaplayıcı' },
  { key: 'warnings', label: 'Uyarılar & Kaynak' },
];

const resistanceOptions = [
  'Hayır / Bilinmiyor',
  'Rifampisin direnci',
  'ÇİD-TB temas/şüphe',
  'Önceden tedavi öyküsü',
  'Tedavi başarısızlığı',
  'Dirençli TB temaslısı',
];

const complexWarning =
  'Referans merkez / uzman konsültasyonu gerektirir.';

export function ChildhoodTbScreen() {
  const [activeTab, setActiveTab] = useState<TbTab>('diagnosis');
  const [category, setCategory] = useState<TreatmentCategory>('tbe');
  const [resistanceConcern, setResistanceConcern] = useState('Hayır / Bilinmiyor');
  const [ageYears, setAgeYears] = useState('');
  const [ageMonths, setAgeMonths] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [selectedTbeRegimenId, setSelectedTbeRegimenId] = useState(tbeRegimens[0].id);
  const [selectedDiseaseRegimenId, setSelectedDiseaseRegimenId] = useState(
    tbDiseaseRegimens[0].id,
  );

  const parsedWeight = parsePositiveNumber(weightKg);
  const parsedAgeYears = parsePositiveNumber(ageYears);
  const parsedAgeMonths = parsePositiveNumber(ageMonths);
  const hasResistanceConcern = resistanceConcern !== 'Hayır / Bilinmiyor';
  const selectedTbeRegimen = tbeRegimens.find(
    (regimen) => regimen.id === selectedTbeRegimenId,
  ) ?? tbeRegimens[0];
  const selectedDiseaseRegimen = tbDiseaseRegimens.find(
    (regimen) => regimen.id === selectedDiseaseRegimenId,
  ) ?? tbDiseaseRegimens[0];

  const validationMessage = useMemo(() => {
    if (parsedAgeYears !== null && parsedAgeYears < 0) return 'Yaş 0 veya daha büyük olmalıdır.';
    if (parsedAgeMonths !== null && parsedAgeMonths < 0) return 'Ay 0 veya daha büyük olmalıdır.';
    if (parsedWeight === null) return 'Doz hesaplamak için kilo girin.';
    if (parsedWeight <= 0) return 'Kilo 0’dan büyük olmalıdır.';
    if (parsedWeight < 2 || parsedWeight > 100) {
      return 'Kilo 2–100 kg dışında. Hesap klinik bağlam ve uzman değerlendirmesi ile doğrulanmalıdır.';
    }
    return null;
  }, [parsedAgeMonths, parsedAgeYears, parsedWeight]);

  const activeRegimen = category === 'tbe' ? selectedTbeRegimen : selectedDiseaseRegimen;
  const copyText = parsedWeight
    ? buildTreatmentSummaryText(
        parsedWeight,
        category,
        category === 'tbe' ? selectedTbeRegimen : selectedDiseaseRegimen,
      )
    : '';

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Çocuk TB</Text>
        <Text style={styles.title}>
          Çocukluk Çağı Tüberkülozu: Tanı, TBE ve TB Hastalığı Tedavi Asistanı
        </Text>
        <Text style={styles.description}>
          Pediatrik pulmonologlar ve yan dal asistanları için eğitim/checklist
          ekranı. Hasta kimliği toplanmaz; yaş ve kilo yalnızca geçici hesap için
          kullanılır.
        </Text>
      </View>
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            label={tab.label}
            selected={activeTab === tab.key}
            onPress={() => setActiveTab(tab.key)}
          />
        ))}
      </View>

      {activeTab === 'diagnosis' ? <DiagnosisTab /> : null}
      {activeTab === 'classification' ? (
        <ClassificationTab
          category={category}
          resistanceConcern={resistanceConcern}
          hasResistanceConcern={hasResistanceConcern}
          onCategoryChange={setCategory}
          onResistanceConcernChange={setResistanceConcern}
        />
      ) : null}
      {activeTab === 'calculator' ? (
        <CalculatorTab
          ageYears={ageYears}
          ageMonths={ageMonths}
          category={category}
          hasResistanceConcern={hasResistanceConcern}
          resistanceConcern={resistanceConcern}
          selectedDiseaseRegimenId={selectedDiseaseRegimenId}
          selectedTbeRegimenId={selectedTbeRegimenId}
          validationMessage={validationMessage}
          weightKg={weightKg}
          activeRegimen={activeRegimen}
          parsedWeight={parsedWeight}
          copyText={copyText}
          onAgeMonthsChange={setAgeMonths}
          onAgeYearsChange={setAgeYears}
          onCategoryChange={setCategory}
          onDiseaseRegimenChange={setSelectedDiseaseRegimenId}
          onTbeRegimenChange={setSelectedTbeRegimenId}
          onWeightKgChange={setWeightKg}
        />
      ) : null}
      {activeTab === 'warnings' ? <WarningsSourceTab /> : null}
    </ScrollView>
  );
}

function DiagnosisTab() {
  return (
    <>
      <InfoCard title="TBE ve TB hastalığı ayrımı">
        <View style={styles.twoCardGrid}>
          <View style={styles.plainCard}>
            <Text style={styles.cardTitle}>TB Enfeksiyonu (TBE)</Text>
            <BulletList
              items={[
                'Semptom, fizik muayene, laboratuvar ve radyolojik aktif hastalık bulgusu yoktur.',
                'TDT, TBDT veya İGST pozitifliği ile desteklenir.',
                'Bulaştırıcı değildir.',
                'Koruyucu tedavi endikasyonu varsa tedavi edilir.',
              ]}
            />
          </View>
          <View style={styles.plainCard}>
            <Text style={styles.cardTitle}>TB Hastalığı</Text>
            <BulletList
              items={[
                'Semptom, fizik muayene, radyoloji, mikrobiyoloji veya histopatoloji bulguları olabilir.',
                'En sık akciğer tutulur; ancak tüm organ sistemleri tutulabilir.',
                'TDT/İGST pozitifliği tek başına aktif hastalık tanısı koydurmaz.',
                'Aktif hastalık şüphesinde mikrobiyolojik değerlendirme ve uzman/VSD süreci gerekir.',
              ]}
            />
          </View>
        </View>
      </InfoCard>

      <InfoCard title="Çocukta TB hastalığı tanısını destekleyen ana bileşenler">
        <BulletList items={diagnosticChecklist} />
      </InfoCard>

      <InfoCard title="TDT / İGST / TBDT seçimi">
        <View style={styles.cardList}>
          {tbTestSelectionRules.map((rule) => (
            <TestSelectionCard key={rule.condition} rule={rule} />
          ))}
        </View>
      </InfoCard>

      <InfoCard title="TDT yorumlama pratik notları">
        <BulletList items={tdtInterpretationNotes} />
      </InfoCard>

      <TbWarningBox title="Test sonucu uyarısı" tone="amber">
        TDT/İGST sonucu tek başına tedavi kararı değildir. Temas, klinik, radyoloji
        ve aktif hastalık dışlanması birlikte değerlendirilmelidir.
      </TbWarningBox>
    </>
  );
}

function ClassificationTab({
  category,
  resistanceConcern,
  hasResistanceConcern,
  onCategoryChange,
  onResistanceConcernChange,
}: {
  category: TreatmentCategory;
  resistanceConcern: string;
  hasResistanceConcern: boolean;
  onCategoryChange: (value: TreatmentCategory) => void;
  onResistanceConcernChange: (value: string) => void;
}) {
  return (
    <>
      <View style={styles.cardList}>
        <TreatmentCategoryCard
          title="TB Enfeksiyonu (TBE) / Koruyucu Tedavi"
          selected={category === 'tbe'}
          onPress={() => onCategoryChange('tbe')}
          description={[
            'Aktif hastalık yok.',
            'Koruyucu tedavi endikasyonu var.',
            'Yaş ve kilo ile koruyucu tedavi dozu hesaplanabilir.',
            'Aktif hastalık dışlanmadan koruyucu tedavi başlanmaz.',
          ]}
        />
        <TreatmentCategoryCard
          title="TB Hastalığı"
          selected={category === 'disease'}
          onPress={() => onCategoryChange('disease')}
          description={[
            'Akciğer veya akciğer dışı TB hastalığı.',
            'Hastalık tipi seçilerek önerilen başlangıç/idame rejimi ve ilaç dozları gösterilir.',
            'Direnç şüphesi varsa referans merkez uyarısı verilir.',
          ]}
        />
      </View>

      <View style={styles.selectorCard}>
        <Text style={styles.sectionTitle}>Direnç şüphesi var mı?</Text>
        <View style={styles.chipWrap}>
          {resistanceOptions.map((option) => (
            <TabButton
              key={option}
              label={option}
              selected={resistanceConcern === option}
              onPress={() => onResistanceConcernChange(option)}
            />
          ))}
        </View>
      </View>

      {hasResistanceConcern ? (
        <TbWarningBox title="Direnç şüphesi" tone="red">
          Direnç şüphesi veya dirençli TB olasılığı varsa bu modül standart birinci
          seçenek tedavi hesaplaması yapmaz. Çocuk TB referans merkezi / uzman
          konsültasyonu gereklidir.
        </TbWarningBox>
      ) : null}
    </>
  );
}

function CalculatorTab({
  ageYears,
  ageMonths,
  category,
  hasResistanceConcern,
  resistanceConcern,
  selectedDiseaseRegimenId,
  selectedTbeRegimenId,
  validationMessage,
  weightKg,
  activeRegimen,
  parsedWeight,
  copyText,
  onAgeMonthsChange,
  onAgeYearsChange,
  onCategoryChange,
  onDiseaseRegimenChange,
  onTbeRegimenChange,
  onWeightKgChange,
}: {
  ageYears: string;
  ageMonths: string;
  category: TreatmentCategory;
  hasResistanceConcern: boolean;
  resistanceConcern: string;
  selectedDiseaseRegimenId: string;
  selectedTbeRegimenId: string;
  validationMessage: string | null;
  weightKg: string;
  activeRegimen: typeof tbeRegimens[number] | typeof tbDiseaseRegimens[number];
  parsedWeight: number | null;
  copyText: string;
  onAgeMonthsChange: (value: string) => void;
  onAgeYearsChange: (value: string) => void;
  onCategoryChange: (value: TreatmentCategory) => void;
  onDiseaseRegimenChange: (value: string) => void;
  onTbeRegimenChange: (value: string) => void;
  onWeightKgChange: (value: string) => void;
}) {
  const shouldShowComplexWarning =
    category === 'disease' &&
    'id' in activeRegimen &&
    [
      'miliary_tb',
      'congenital_neonatal_tb',
      'immunosuppressed_child_tb',
      'bone_joint_tb',
      'tb_meningitis',
    ].includes(activeRegimen.id);

  return (
    <>
      <InfoCard title="Anlık doz hesaplama">
        <Text style={styles.paragraph}>
          Yaş/kilo, kategori ve rejim seçildikten sonra doz kartları aynı ekranda
          otomatik güncellenir. Hasta kimliği kaydedilmez; pratik yuvarlama ilaç
          formuna ve klinisyen kararına göre yapılmalıdır.
        </Text>
      </InfoCard>

      <WeightAgeInput
        ageYears={ageYears}
        ageMonths={ageMonths}
        weightKg={weightKg}
        onAgeYearsChange={onAgeYearsChange}
        onAgeMonthsChange={onAgeMonthsChange}
        onWeightKgChange={onWeightKgChange}
      />

      <View style={styles.selectorCard}>
        <Text style={styles.sectionTitle}>Ana kategori</Text>
        <View style={styles.chipWrap}>
          <TabButton
            label="TBE / koruyucu tedavi"
            selected={category === 'tbe'}
            onPress={() => onCategoryChange('tbe')}
          />
          <TabButton
            label="TB hastalığı"
            selected={category === 'disease'}
            onPress={() => onCategoryChange('disease')}
          />
        </View>
      </View>

      {category === 'tbe' ? (
        <RegimenSelector
          title="TBE rejimi"
          options={tbeRegimens}
          selectedId={selectedTbeRegimenId}
          onSelect={onTbeRegimenChange}
        />
      ) : (
        <RegimenSelector
          title="Hastalık tipi"
          options={tbDiseaseRegimens}
          selectedId={selectedDiseaseRegimenId}
          onSelect={onDiseaseRegimenChange}
        />
      )}

      {hasResistanceConcern ? (
        <TbWarningBox title={`Direnç seçimi: ${resistanceConcern}`} tone="red">
          Direnç şüphesi veya dirençli TB olasılığı varsa standart birinci seçenek
          tedavi hesaplaması gösterilmez. Referans merkez / uzman konsültasyonu
          gerektirir.
        </TbWarningBox>
      ) : null}

      {shouldShowComplexWarning ? (
        <TbWarningBox title="Kompleks klinik durum" tone="red">
          Şüpheli ilaç direnci, MDR/RR-TB, TB menenjit, neonatal TB, immünsüpresyon,
          ağır hastalık, karaciğer hastalığı, böbrek hastalığı, HIV,
          gebelik/adolesan gebelik veya kompleks akciğer dışı hastalık varsa
          Referans merkez / uzman konsültasyonu gerektirir.
        </TbWarningBox>
      ) : null}

      {validationMessage ? (
        <TbWarningBox title="Hesaplama notu" tone="amber">
          {validationMessage}
        </TbWarningBox>
      ) : null}

      {parsedWeight && parsedWeight > 0 && !hasResistanceConcern ? (
        <>
          <DrugDoseReferencePanel weightKg={parsedWeight} />
          <TreatmentSummaryCard
            category={category === 'tbe' ? 'TBE / koruyucu tedavi' : 'TB hastalığı'}
            regimen={activeRegimen}
            weightKg={parsedWeight}
          />
          <CopyTreatmentButton text={copyText} />
        </>
      ) : null}

      {parsedWeight && parsedWeight > 0 && hasResistanceConcern ? (
        <DrugDoseReferencePanel weightKg={parsedWeight} />
      ) : null}

      <TbWarningBox title="Yuvarlama uyarısı" tone="amber">
        Dozun pratik yuvarlanması mevcut ilaç formuna ve klinisyen kararına göre
        yapılmalıdır.
      </TbWarningBox>
    </>
  );
}

function WarningsSourceTab() {
  return (
    <>
      <TbWarningBox title="Referans merkez uyarısı" tone="red">
        Dirençli TB, TB menenjit, neonatal TB, bağışıklığı baskılanmış çocuk, ciddi
        akciğer dışı TB veya tedavi başarısızlığı durumunda çocuk TB referans merkezi
        / uzman konsültasyonu gereklidir.
      </TbWarningBox>
      <InfoCard title="İzlem ve dikkat kartları">
        <View style={styles.cardList}>
          {monitoringCards.map((card) => (
            <View key={card.title} style={styles.plainCard}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <BulletList items={card.content} />
            </View>
          ))}
        </View>
      </InfoCard>
      <InfoCard title="Kaynak ve yasal uyarı">
        <View style={styles.cardList}>
          <Text style={styles.paragraph}>
            Bu modül, T.C. Sağlık Bakanlığı Halk Sağlığı Genel Müdürlüğü Tüberküloz
            Tanı ve Tedavi Rehberi 2026 temel alınarak eğitim ve hızlı hatırlatma
            amacıyla hazırlanmıştır.
          </Text>
          <Text style={styles.paragraph}>
            Bu uygulama tanı koymaz, reçete düzenlemez ve klinik kararın yerine
            geçmez. Tedavi kararı; hastanın klinik durumu, mikrobiyoloji, ilaç
            duyarlılığı, komorbiditeler, karaciğer/böbrek fonksiyonları, mevcut ilaç
            formülasyonları, VSD/referans merkez önerisi ve güncel resmi rehber ile
            doğrulanmalıdır.
          </Text>
          <Text style={styles.paragraph}>{complexWarning}</Text>
        </View>
      </InfoCard>
      <Text style={styles.footer}>
        Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
      </Text>
    </>
  );
}

function buildTreatmentSummaryText(
  weightKg: number,
  category: TreatmentCategory,
  regimen: typeof tbeRegimens[number] | typeof tbDiseaseRegimens[number],
) {
  const isDisease = 'initialPhase' in regimen;
  const initialDrugs = isDisease ? regimen.drugsInitial : regimen.drugs;
  const continuationDrugs = isDisease ? regimen.drugsContinuation : [];
  const allDrugs = Array.from(new Set([...initialDrugs, ...continuationDrugs]));
  const doseSummary = allDrugs.map((drugKey) => formatDoseForCopy(drugKey, weightKg)).join('; ');

  if (isDisease) {
    return `Çocuk TB tedavi özeti: Kilo ${weightKg} kg. Hastalık tipi: ${regimen.title}. Şema: ${regimen.initialPhase} + ${regimen.continuationPhase}. Toplam süre: ${regimen.totalDuration}. Hesaplanan günlük dozlar: ${doseSummary}. Bu çıktı klinik karar yerine geçmez; resmi rehber ve ilaç formülasyonu ile doğrulanmalıdır.`;
  }

  return `Çocuk TB koruyucu tedavi özeti: Kilo ${weightKg} kg. Rejim: ${regimen.title}. Süre: ${regimen.duration}. Hesaplanan dozlar: ${doseSummary}. Aktif TB hastalığı dışlanmadan koruyucu tedavi başlanmaz. Bu çıktı klinik karar yerine geçmez; resmi rehber ve ilaç formülasyonu ile doğrulanmalıdır.`;
}

function formatDoseForCopy(drugKey: PediatricTbDrugKey, weightKg: number) {
  if (drugKey === 'E_optional') return 'EMB opsiyonel, klinik bağlama göre değerlendirilir';
  if (drugKey === 'H_weekly') {
    const dose = calculateDoseMg(weightKg, 15, 900);
    return `İNH haftalık ${dose.cappedMg} mg`;
  }
  if (drugKey === 'RPT_weekly') {
    const rpt = calculateWeeklyRifapentine(weightKg);
    return rpt.doseMg ? `Rifapentin haftalık ${rpt.doseMg} mg` : rpt.note;
  }
  if (drugKey === 'H_daily_1m') {
    return weightKg >= 25 ? 'İNH günlük 300 mg' : 'İNH günlük 1 ay: 25 kg altı uzman kontrolü';
  }
  if (drugKey === 'RPT_daily_1m') {
    return weightKg >= 25
      ? 'Rifapentin günlük 600 mg'
      : 'Rifapentin günlük 1 ay: 25 kg altı uzman kontrolü';
  }

  const drug = pediatricTbDrugs[drugKey];
  const dose = calculateDoseMg(weightKg, drug.dailyDoseMgKg, drug.maxDailyMg);
  return `${drug.abbreviation} ${dose.cappedMg} mg/gün`;
}

const styles = StyleSheet.create({
  scrollContent: {
    gap: 14,
    padding: 18,
    paddingBottom: 34,
  },
  intro: {
    gap: 7,
  },
  kicker: {
    color: tbColors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  title: {
    color: tbColors.text,
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 31,
  },
  description: {
    color: tbColors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  twoCardGrid: {
    gap: 10,
  },
  plainCard: {
    backgroundColor: tbColors.white,
    borderColor: tbColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 13,
  },
  cardTitle: {
    color: tbColors.text,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 21,
  },
  cardList: {
    gap: 10,
  },
  selectorCard: {
    backgroundColor: tbColors.card,
    borderColor: tbColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  sectionTitle: {
    color: tbColors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  paragraph: {
    color: tbColors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    color: tbColors.muted,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
});
