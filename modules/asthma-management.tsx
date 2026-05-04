import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  AsthmaAgeOption,
  AsthmaAgeSelector,
} from '../components/asthma/AsthmaAgeSelector';
import { AsthmaControlChecklist } from '../components/asthma/AsthmaControlChecklist';
import { AsthmaStepCard } from '../components/asthma/AsthmaStepCard';
import { ExacerbationChecklist } from '../components/asthma/ExacerbationChecklist';
import { AsthmaIcsDoseCategoryCard } from '../components/asthma/IcsDoseCategoryCard';
import { RelieverRuleCard } from '../components/asthma/RelieverRuleCard';
import { TreatmentTrackCard } from '../components/asthma/TreatmentTrackCard';
import {
  AsthmaAgeGroup,
  asthmaSourceBadge,
  gina2025AsthmaSteps,
} from '../data/asthma/gina2025AsthmaSteps';
import {
  gina2025IcsDoseCategories,
  icsDoseCategoryNote,
} from '../data/asthma/gina2025IcsDoseCategories';
import {
  gina2025RelieverRules,
  relieverCards,
} from '../data/asthma/gina2025RelieverRules';

type TabKey = 'age' | 'control' | 'steps' | 'reliever' | 'exacerbation' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'age', label: 'Yaş' },
  { key: 'control', label: 'Kontrol' },
  { key: 'steps', label: 'Basamak' },
  { key: 'reliever', label: 'Rahatlatıcı' },
  { key: 'exacerbation', label: 'Alevlenme' },
  { key: 'source', label: 'Uyarılar & Kaynak' },
];

const ageOptions: AsthmaAgeOption[] = [
  { label: '0–5 yaş', value: '0-5' },
  { label: '6–11 yaş', value: '6-11' },
  { label: '12 yaş ve üzeri', value: '12plus' },
  { label: 'Tümü', value: 'all' },
];

const symptomQuestions = [
  'Son 4 haftada gündüz semptomları haftada 2’den fazla mı?',
  'Son 4 haftada astım nedeniyle gece uyanma var mı?',
  'Son 4 haftada rahatlatıcı ihtiyacı haftada 2’den fazla mı?',
  'Son 4 haftada aktivite kısıtlanması var mı?',
];

const riskFactors = [
  'Son 12 ayda ağır alevlenme / acil başvuru / hastane yatışı',
  'Sık SABA kullanımı',
  'Düşük FEV1',
  'Kötü inhaler tekniği',
  'Tedavi uyumsuzluğu',
  'Sigara / pasif duman',
  'Obezite',
  'Rinit / sinüzit / GERD',
  'Eozinofili / yüksek FeNO / Tip 2 inflamasyon',
  'Psikososyal sorunlar',
  'Gıda alerjisi + astım',
  'İKS almama veya İKS yetersizliği',
];

const acuteChecklist = [
  'Bilinç durumu',
  'Konuşma / beslenme güçlüğü',
  'Siyanoz',
  'Sessiz akciğer',
  'SpO2',
  'Solunum sayısı / yardımcı kas kullanımı',
  'Nabız',
  'PEF/FEV1 yapılabiliyorsa',
  'Önceki yoğun bakım / entübasyon öyküsü',
  'Son SABA yanıtı',
  'Anafilaksi / yabancı cisim / pnömoni ayırıcı tanısı',
];

const redFlags = [
  'SpO2 düşük',
  'Sessiz akciğer',
  'Konfüzyon/uykuya meyil',
  'Konuşamama',
  'SABA’ya kötü yanıt',
  'Exhaustion',
  'PEF/FEV1 çok düşük',
];

const afterAttack = [
  'İnhaler tedaviyi optimize et',
  'İKS içeren tedavi başla veya artır',
  'İnhaler tekniğini gösterterek kontrol et',
  'Yazılı astım aksiyon planı ver',
  'Tetikleyicileri değerlendir',
  '2–7 gün içinde kontrol planla',
  'Sık SABA kullanımını sorgula',
  'Ağır atak sonrası uzman değerlendirmesi düşün',
];

const sourceWarnings = [
  'Bu modül GINA 2025’in özetlenmiş klinik mantığına göre hazırlanmıştır; GINA materyali birebir kopyalanmamıştır.',
  'GINA belgeleri telif koruması altındadır. Bu nedenle uygulamada GINA tabloları/görselleri birebir çoğaltılmamalı; kullanıcı resmi GINA kaynağına yönlendirilmelidir.',
  'Türkiye’de ilaç ruhsat yaşları, KÜB/KT, geri ödeme ve piyasadaki preparatlar değişebilir. Her ilaç kartı yerel ürün bilgisi ile doğrulanmalıdır.',
  'SABA-only yaklaşımından kaçınılmalıdır. Her yaş grubunda uygun olduğunda İKS içeren tedavi düşünülmelidir.',
  'Basamak artırmadan önce tanı, inhaler teknik, uyum, tetikleyiciler ve komorbiditeler kontrol edilmelidir.',
  'Yüksek doz İKS uzun süreli yan etki riski taşır; büyüme, adrenal baskılanma, oral kandidiyazis, ses kısıklığı ve sistemik etkiler açısından izlem gerekir.',
  'Montelukast reçetelenirse aileye nöropsikiyatrik yan etkiler konusunda bilgi verilmelidir.',
  'Step 5, sık alevlenme, düşük akciğer fonksiyonu, tedaviye direnç, atipik bulgular veya tanı belirsizliğinde çocuk göğüs/astım uzmanı veya ağır astım merkezi değerlendirmesi gereklidir.',
];

export function AsthmaManagementScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('age');
  const [ageGroup, setAgeGroup] = useState<AsthmaAgeOption['value']>('6-11');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [risks, setRisks] = useState<string[]>([]);
  const [selectedStep, setSelectedStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [redFlagSelections, setRedFlagSelections] = useState<string[]>([]);
  const [acuteSelections, setAcuteSelections] = useState<string[]>([]);
  const [afterSelections, setAfterSelections] = useState<string[]>([]);
  const [icsGroup, setIcsGroup] = useState<'children' | 'adult'>('children');

  const controlResult = getControlResult(symptoms.length);
  const visibleSteps = useMemo(() => {
    if (ageGroup === 'all') return gina2025AsthmaSteps;
    return gina2025AsthmaSteps.filter((step) => step.ageGroup === ageGroup);
  }, [ageGroup]);
  const stepCards = visibleSteps.filter((step) => step.step === selectedStep);
  const hasRedFlag = redFlagSelections.length > 0;

  function toggle(list: string[], setter: (value: string[]) => void, item: string) {
    setter(list.includes(item) ? list.filter((value) => value !== item) : [...list, item]);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Astım</Text>
        <Text style={styles.title}>
          Astım Yönetimi: GINA 2025 Temelli Basamak, Kontrol ve Tedavi Asistanı
        </Text>
        <Text style={styles.description}>
          Pediatrik pulmonologlar ve yan dal asistanları için eğitim/checklist
          modülü. Hasta kimliği toplanmaz; seçimler geçici ekranda tutulur.
        </Text>
      </View>

      <SourceVersionBadge text={asthmaSourceBadge} />

      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <Chip
            key={tab.key}
            label={tab.label}
            selected={activeTab === tab.key}
            onPress={() => setActiveTab(tab.key)}
          />
        ))}
      </View>

      {activeTab === 'age' ? (
        <AgeTab ageGroup={ageGroup} onAgeGroup={setAgeGroup} />
      ) : null}

      {activeTab === 'control' ? (
        <>
          <AsthmaControlChecklist
            title="Semptom kontrolü"
            items={symptomQuestions}
            selected={symptoms}
            onToggle={(item) => toggle(symptoms, setSymptoms, item)}
          />
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>{controlResult}</Text>
            <Text style={styles.resultText}>
              Evet sayısı: {symptoms.length}. 0: iyi kontrollü, 1–2: kısmen
              kontrollü, 3–4: kontrolsüz.
            </Text>
          </View>
          {symptoms.length > 0 ? (
            <WarningBox
              tone="amber"
              title="Basamak artırmadan önce"
              text="Basamak artırmadan önce tanıyı, inhaler tekniğini, tedavi uyumunu, tetikleyicileri, komorbiditeleri ve risk faktörlerini kontrol et."
            />
          ) : null}
          <AsthmaControlChecklist
            title="Alevlenme risk faktörleri"
            items={riskFactors}
            selected={risks}
            onToggle={(item) => toggle(risks, setRisks, item)}
          />
        </>
      ) : null}

      {activeTab === 'steps' ? (
        <>
          <StepSelector selectedStep={selectedStep} onSelect={setSelectedStep} />
          <IcsDoseHelper group={icsGroup} onGroup={setIcsGroup} />
          <View style={styles.cardList}>
            {stepCards.map((step) => (
              <AsthmaStepCard
                key={`${step.ageGroup}-${step.step}`}
                step={step}
              />
            ))}
          </View>
        </>
      ) : null}

      {activeTab === 'reliever' ? (
        <>
          <View style={styles.cardList}>
            {relieverCards.map((card) => (
              <RelieverRuleCard key={card.title} title={card.title} items={card.items} />
            ))}
          </View>
          <TreatmentTrackCard
            title="MART maksimum inhalasyon notları"
            summary="Bu sınırlar ürün, yaş ve KÜB/KT ile doğrulanmalıdır; reçete çıktısı değildir."
            items={gina2025RelieverRules.maxDailyInhalations.map(
              (rule) =>
                `${rule.ageGroup}: ${rule.product} — toplam maksimum ${rule.maxTotalInhalationsAnyDay} inhalasyon/gün. ${rule.note}`,
            )}
          />
        </>
      ) : null}

      {activeTab === 'exacerbation' ? (
        <>
          <ExacerbationChecklist
            title="Acil değerlendirme"
            items={acuteChecklist}
            selected={acuteSelections}
            onToggle={(item) => toggle(acuteSelections, setAcuteSelections, item)}
          />
          <ExacerbationChecklist
            title="Ağır alevlenme kırmızı bayrakları"
            items={redFlags}
            selected={redFlagSelections}
            onToggle={(item) => toggle(redFlagSelections, setRedFlagSelections, item)}
          />
          {hasRedFlag ? (
            <WarningBox
              title="Kırmızı bayrak"
              text="Ağır alevlenme / yaşamı tehdit eden atak olabilir. Acil tedavi, oksijen, tekrarlayan bronkodilatör, sistemik steroid, magnezyum ve yoğun bakım değerlendirmesi kurum protokolüne göre yapılmalıdır."
            />
          ) : null}
          {ageGroup === '0-5' || ageGroup === 'all' ? (
            <WarningBox
              tone="amber"
              title="0–5 yaş akut doz notu"
              text="GINA 2025 minor update’te 5 yaş ve altı akut alevlenmede nebül salbutamol dozu ile ilgili düzeltme yapılmıştır; akut dozlar kurum protokolü ve güncel GINA 2025 tam raporu ile doğrulanmalıdır."
            />
          ) : null}
          <ExacerbationChecklist
            title="Atak sonrası"
            items={afterAttack}
            selected={afterSelections}
            onToggle={(item) => toggle(afterSelections, setAfterSelections, item)}
          />
        </>
      ) : null}

      {activeTab === 'source' ? (
        <>
          {sourceWarnings.map((warning) => (
            <WarningBox key={warning} tone="amber" title="Uyarı" text={warning} />
          ))}
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Kaynak</Text>
            <Text style={styles.resultText}>
              Kaynak: Global Initiative for Asthma. GINA 2025 Summary Guide and
              2025 Strategy Report. Bu modül eğitim ve hızlı hatırlatma amacıyla
              hazırlanmıştır.
            </Text>
          </View>
          <Text style={styles.footer}>
            Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
          </Text>
        </>
      ) : null}
    </ScrollView>
  );
}

function AgeTab({
  ageGroup,
  onAgeGroup,
}: {
  ageGroup: AsthmaAgeOption['value'];
  onAgeGroup: (value: AsthmaAgeOption['value']) => void;
}) {
  return (
    <>
      <AsthmaAgeSelector options={ageOptions} selected={ageGroup} onSelect={onAgeGroup} />
      {ageGroup === '0-5' ? (
        <>
          <WarningBox
            title="0–5 yaş uyarısı"
            text="0–5 yaşta astım tanısı ve tedavi basamaklandırması klinik bağlama çok bağımlıdır; GINA 2025 tam raporu, Türkiye KÜB/KT ve uzman değerlendirmesi ile doğrulanmalıdır."
          />
          <TreatmentTrackCard
            title="Okul öncesi hışıltı yaklaşımı"
            summary="Tanısal belirsizlik, tekrarlayan hışıltı fenotipleri, alternatif tanılar ve uzman değerlendirmesi ön plandadır."
            items={[
              'MART rutin öneri olarak gösterilmez.',
              'SABA rahatlatıcı ve düşük doz İKS kontrol edici çerçevesi yalnızca yüksek düzey checklist olarak gösterilir.',
              'Aspirasyon, immün yetmezlik, PCD, KF ve anatomik hava yolu sorunları düşünülmelidir.',
            ]}
          />
        </>
      ) : null}
      {ageGroup === '6-11' ? (
        <WarningBox
          tone="amber"
          title="6–11 yaş uyarısı"
          text="6–11 yaşta ICS-formoterol AIR-only Step 1–2 rutin öneri olarak gösterilmemelidir."
        />
      ) : null}
      {ageGroup === '12plus' ? (
        <TreatmentTrackCard
          title="12 yaş ve üzeri mantık"
          summary="Track 1 tercih edilen yaklaşımdır; ICS-formoterol rahatlatıcı Step 1–4 boyunca kullanılır."
          items={[
            'Track 1: AIR Step 1–2, MART Step 3–4.',
            'Track 2: SABA veya ICS-SABA rahatlatıcı + düzenli İKS içeren kontrol edici.',
            'SABA-only yaklaşımından kaçınılır.',
          ]}
        />
      ) : null}
    </>
  );
}

function StepSelector({
  selectedStep,
  onSelect,
}: {
  selectedStep: 1 | 2 | 3 | 4 | 5;
  onSelect: (step: 1 | 2 | 3 | 4 | 5) => void;
}) {
  return (
    <View style={styles.tabs}>
      {([1, 2, 3, 4, 5] as const).map((step) => (
        <Chip
          key={step}
          label={`Basamak ${step}`}
          selected={selectedStep === step}
          onPress={() => onSelect(step)}
        />
      ))}
    </View>
  );
}

function IcsDoseHelper({
  group,
  onGroup,
}: {
  group: 'children' | 'adult';
  onGroup: (group: 'children' | 'adult') => void;
}) {
  const rows =
    group === 'children'
      ? gina2025IcsDoseCategories.children6to11
      : gina2025IcsDoseCategories.adultsAdolescents;

  return (
    <View style={styles.helperCard}>
      <Text style={styles.helperTitle}>İKS doz kategorisi</Text>
      <Text style={styles.helperText}>{icsDoseCategoryNote}</Text>
      <View style={styles.tabs}>
        <Chip
          label="6–11 yaş"
          selected={group === 'children'}
          onPress={() => onGroup('children')}
        />
        <Chip
          label="≥12 yaş"
          selected={group === 'adult'}
          onPress={() => onGroup('adult')}
        />
      </View>
      <View style={styles.cardList}>
        {rows.map((row) => (
          <AsthmaIcsDoseCategoryCard key={row.molecule} row={row} />
        ))}
      </View>
    </View>
  );
}

function Chip({
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
        styles.chip,
        selected ? styles.chipSelected : undefined,
        pressed ? styles.pressed : undefined,
      ]}
    >
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

function getControlResult(yesCount: number) {
  if (yesCount === 0) return 'İyi kontrollü';
  if (yesCount <= 2) return 'Kısmen kontrollü';
  return 'Kontrolsüz';
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
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '900',
  },
  title: {
    color: '#211f1f',
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 31,
  },
  description: {
    color: '#686868',
    fontSize: 15,
    lineHeight: 22,
  },
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 42,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  chipSelected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  chipText: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '800',
  },
  chipTextSelected: {
    color: '#fff',
  },
  pressed: {
    opacity: 0.72,
  },
  resultCard: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    padding: 14,
  },
  resultTitle: {
    color: '#8f1d2c',
    fontSize: 18,
    fontWeight: '900',
  },
  resultText: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  cardList: {
    gap: 12,
  },
  helperCard: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  helperTitle: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  helperText: {
    color: '#686868',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
});
