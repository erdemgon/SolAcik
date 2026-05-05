import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  bpdSource,
  bpdSupportOptions,
  calculatePostmenstrualAgeWeeks,
  classifyJensen2019Bpd,
  classifyTnd2018Bpd,
  formatNumber,
  getBpdAssessmentTiming,
  getBpdInputWarnings,
  type BpdGrade,
  type BpdInput,
  type BpdRespiratorySupport,
} from '../data/neonatal/bpdDefinitions';

type TabKey = 'calculator' | 'definitions' | 'followup' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'calculator', label: 'Hesaplayıcı' },
  { key: 'definitions', label: 'Tanımlar' },
  { key: 'followup', label: 'İzlem' },
  { key: 'source', label: 'Kaynak' },
];

export function BpdCalculatorScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('calculator');
  const [gestationalWeeks, setGestationalWeeks] = useState('');
  const [gestationalDays, setGestationalDays] = useState('');
  const [postnatalDays, setPostnatalDays] = useState('');
  const [oxygenFor28Days, setOxygenFor28Days] = useState(false);
  const [support, setSupport] = useState<BpdRespiratorySupport>('room_air');
  const [nasalFlow, setNasalFlow] = useState('');
  const [fio2, setFio2] = useState('');
  const [showInternational, setShowInternational] = useState(false);

  const input: BpdInput = useMemo(
    () => ({
      gestationalAgeWeeks: parseNumber(gestationalWeeks),
      gestationalAgeDays: parseNumber(gestationalDays),
      postnatalAgeDays: parseNumber(postnatalDays),
      oxygenFor28Days,
      support,
      nasalCannulaFlowLMin: parseNumber(nasalFlow),
      fio2Percent: parseNumber(fio2),
    }),
    [fio2, gestationalDays, gestationalWeeks, nasalFlow, oxygenFor28Days, postnatalDays, support],
  );

  const timing = getBpdAssessmentTiming(input);
  const pmaWeeks = calculatePostmenstrualAgeWeeks(input);
  const warnings = getBpdInputWarnings(input);
  const tndResult = classifyTnd2018Bpd(input);
  const jensenResult = classifyJensen2019Bpd(input);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Neonatal solunum</Text>
        <Text style={styles.title}>Bronkopulmoner Displazi: TND Temelli Sınıflama</Text>
        <Text style={styles.description}>
          Gestasyon yaşı, postnatal gün, oksijen ve solunum desteğine göre TND 2018
          rehberini ana alarak BPD şiddetini hızlıca yapılandırır. Girişler kalıcı saklanmaz.
        </Text>
      </View>

      <SourceVersionBadge text={bpdSource.badge} />
      <WarningBox text={bpdSource.warning} />

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

      {activeTab === 'calculator' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Girdi</Text>
            <View style={styles.inputGrid}>
              <InputBox
                label="Gestasyon haftası"
                onChangeText={setGestationalWeeks}
                placeholder="örn. 28"
                value={gestationalWeeks}
              />
              <InputBox
                label="Ek gün"
                onChangeText={setGestationalDays}
                placeholder="0–6"
                value={gestationalDays}
              />
              <InputBox
                label="Postnatal gün"
                onChangeText={setPostnatalDays}
                placeholder="örn. 84"
                value={postnatalDays}
              />
            </View>

            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: oxygenFor28Days }}
              onPress={() => setOxygenFor28Days((value) => !value)}
              style={styles.checkRow}
            >
              <View style={[styles.checkbox, oxygenFor28Days && styles.checkboxChecked]}>
                {oxygenFor28Days ? <Text style={styles.checkMark}>✓</Text> : null}
              </View>
              <Text style={styles.checkText}>En az 28 gün ≥%21 ek oksijen gereksinimi var</Text>
            </Pressable>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Değerlendirme anındaki destek</Text>
            <View style={styles.chipWrap}>
              {bpdSupportOptions.map((option) => (
                <Chip
                  key={option.key}
                  label={option.label}
                  selected={support === option.key}
                  onPress={() => setSupport(option.key)}
                />
              ))}
            </View>
            <View style={styles.inputGrid}>
              <InputBox
                label="Nazal kanül akımı, L/dk"
                onChangeText={setNasalFlow}
                placeholder="opsiyonel"
                value={nasalFlow}
              />
              <InputBox
                label="FiO2, %"
                onChangeText={setFio2}
                placeholder="örn. 25"
                value={fio2}
              />
            </View>
          </View>

          {warnings.length > 0 ? (
            <WarningBox tone="amber" title="Girdi kontrolü" text={warnings.join(' ')} />
          ) : null}

          <View style={styles.summaryCard}>
            <Text style={styles.panelTitle}>Değerlendirme zamanı</Text>
            <Text style={styles.bigMetric}>{timing.label}</Text>
            {pmaWeeks !== null ? (
              <Text style={styles.cardText}>Postmenstrüel yaş: {formatNumber(pmaWeeks)} hafta</Text>
            ) : null}
            <Text style={styles.cardText}>{timing.explanation}</Text>
          </View>

          <ResultCard title="Ana sonuç: Türk Neonatoloji Derneği 2018" result={tndResult} />

          <Pressable
            accessibilityRole="button"
            onPress={() => setShowInternational((value) => !value)}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>
              {showInternational ? 'Uluslararası karşılaştırmayı gizle' : 'Jensen/NICHD 2019 karşılaştırmasını göster'}
            </Text>
          </Pressable>

          {showInternational ? (
            <ResultCard title="Seçimlik karşılaştırma: Jensen/NICHD 2019" result={jensenResult} />
          ) : null}
        </>
      ) : null}

      {activeTab === 'definitions' ? <DefinitionsSection /> : null}
      {activeTab === 'followup' ? <FollowupSection /> : null}
      {activeTab === 'source' ? <SourceSection /> : null}

      <Text style={styles.footer}>
        Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
      </Text>
    </ScrollView>
  );
}

function DefinitionsSection() {
  return (
    <>
      <InfoCard
        title="TND 2018 ana tanım"
        items={[
          'Türk Neonatoloji Derneği rehberi NIH 2001 tanımını esas alır.',
          'BPD ön koşulu: en az 28 gün >%21 ek oksijen gereksinimi.',
          'GA <32 hafta: PM 36. hafta veya daha erken taburculukta değerlendirilir.',
          'GA ≥32 hafta: postnatal 56. gün veya daha erken taburculukta değerlendirilir.',
          'Hafif: değerlendirme zamanında ek oksijen gereksinimi yok.',
          'Orta: <%30 ek oksijen gereksinimi.',
          'Ağır: ≥%30 ek oksijen ve/veya pozitif basınç, nCPAP veya mekanik ventilasyon.',
        ]}
      />
      <InfoCard
        title="Jensen/NICHD 2019 karşılaştırması"
        items={[
          'Oksijen yüzdesinden çok 36 hafta PMA’daki solunum destek düzeyini kullanır.',
          'Grade 1: nazal kanül ≤2 L/dk.',
          'Grade 2: nazal kanül >2 L/dk veya noninvaziv pozitif basınç/yüksek akım desteği.',
          'Grade 3: invaziv mekanik ventilasyon.',
          'Bu modülde seçimlik karşılaştırma olarak gösterilir; ana sonuç TND 2018’dir.',
        ]}
      />
    </>
  );
}

function FollowupSection() {
  return (
    <>
      <InfoCard
        title="BPD izlem checklist’i"
        items={[
          'Büyüme, beslenme ve kalori gereksinimi.',
          'Oksijen hedefleri, desatürasyon ve ev oksijeni gereksinimi.',
          'Pulmoner hipertansiyon taraması ve ekokardiyografi gereksinimi.',
          'Aspirasyon, GER, yutma disfonksiyonu ve beslenme güvenliği.',
          'Aşılar, RSV profilaksisi uygunluğu ve enfeksiyon önleme.',
          'Diüretik, bronkodilatör veya inhaler steroid kullanımı için net endikasyon ve yan etki izlemi.',
          'Taburculukta ekipman, alarm, acil başvuru ve yeniden değerlendirme planı.',
        ]}
      />
      <WarningBox
        tone="amber"
        title="Önemli"
        text="BPD ağırlığı tek başına tedavi planı değildir. Oksijen azaltma, diüretik, bronkodilatör, steroid, beslenme ve pulmoner hipertansiyon kararları yenidoğan/çocuk göğüs/kardiyoloji ekipleriyle bireyselleştirilmelidir."
      />
    </>
  );
}

function SourceSection() {
  return (
    <>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Kaynaklar</Text>
        {bpdSource.sourceLinks.map((source) => (
          <View key={source.url} style={styles.sourceBox}>
            <Text style={styles.sourceTitle}>{source.title}</Text>
            <Text style={styles.sourceUrl}>{source.url}</Text>
          </View>
        ))}
      </View>
      <WarningBox
        title="Kullanım sınırı"
        text="Bu modül tanı koymaz, ventilatör/oksijen reçete etmez ve taburculuk kararı vermez. TND rehberi, kurum yenidoğan protokolü ve klinisyen değerlendirmesi önceliklidir."
      />
    </>
  );
}

function ResultCard({ title, result }: { title: string; result: BpdGrade }) {
  return (
    <View style={styles.resultCard}>
      <Text style={styles.panelTitle}>{title}</Text>
      <View style={[styles.resultBadge, badgeStyle(result.tone)]}>
        <Text style={[styles.resultBadgeText, badgeTextStyle(result.tone)]}>{result.label}</Text>
      </View>
      <Text style={styles.cardText}>{result.explanation}</Text>
      {result.nextChecks.map((check) => (
        <Text key={check} style={styles.bullet}>
          • {check}
        </Text>
      ))}
    </View>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      {items.map((item) => (
        <Text key={item} style={styles.bullet}>
          • {item}
        </Text>
      ))}
    </View>
  );
}

function InputBox({
  label,
  value,
  placeholder,
  onChangeText,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        keyboardType="decimal-pad"
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8a8a8a"
        style={styles.input}
        value={value}
      />
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
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

function parseNumber(value: string) {
  if (!value.trim()) return null;
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}

function badgeStyle(tone: BpdGrade['tone']) {
  if (tone === 'green') return styles.badgeGreen;
  if (tone === 'red') return styles.badgeRed;
  if (tone === 'gray') return styles.badgeGray;
  return styles.badgeAmber;
}

function badgeTextStyle(tone: BpdGrade['tone']) {
  if (tone === 'green') return styles.badgeTextGreen;
  if (tone === 'red') return styles.badgeTextRed;
  if (tone === 'gray') return styles.badgeTextGray;
  return styles.badgeTextAmber;
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
    gap: 14,
  },
  intro: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#efe3e5',
  },
  kicker: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },
  title: {
    color: '#211f1f',
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 30,
  },
  description: {
    color: '#5d5658',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    minHeight: 42,
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e3d6d8',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  chipText: {
    color: '#4b4446',
    fontSize: 14,
    fontWeight: '800',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
  panel: {
    backgroundColor: '#f7f7f8',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e7e2e3',
    gap: 10,
  },
  panelTitle: {
    color: '#211f1f',
    fontSize: 18,
    fontWeight: '900',
  },
  inputGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  inputWrap: {
    minWidth: 132,
    flexGrow: 1,
    flexBasis: '30%',
    gap: 6,
  },
  inputLabel: {
    color: '#4b4446',
    fontSize: 13,
    fontWeight: '800',
  },
  input: {
    minHeight: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dfd7d8',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    color: '#211f1f',
    fontSize: 15,
  },
  checkRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#cdbfc2',
    backgroundColor: '#ffffff',
  },
  checkboxChecked: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  checkMark: {
    color: '#ffffff',
    fontWeight: '900',
  },
  checkText: {
    color: '#302b2c',
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ece4e5',
    padding: 16,
    gap: 8,
  },
  bigMetric: {
    color: '#8f1d2c',
    fontSize: 25,
    fontWeight: '900',
  },
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ece4e5',
    padding: 16,
    gap: 10,
  },
  resultBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  resultBadgeText: {
    fontSize: 14,
    fontWeight: '900',
  },
  badgeGreen: {
    backgroundColor: '#e8f5ed',
  },
  badgeAmber: {
    backgroundColor: '#fff4db',
  },
  badgeRed: {
    backgroundColor: '#f9e9ec',
  },
  badgeGray: {
    backgroundColor: '#eeeeef',
  },
  badgeTextGreen: {
    color: '#1d6b3a',
  },
  badgeTextAmber: {
    color: '#8a5a00',
  },
  badgeTextRed: {
    color: '#8f1d2c',
  },
  badgeTextGray: {
    color: '#5d5658',
  },
  cardText: {
    color: '#5d5658',
    fontSize: 14,
    lineHeight: 20,
  },
  bullet: {
    color: '#4d4648',
    fontSize: 14,
    lineHeight: 21,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#8f1d2c',
    borderRadius: 999,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
  },
  sourceBox: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ece4e5',
    gap: 4,
  },
  sourceTitle: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  sourceUrl: {
    color: '#8f1d2c',
    fontSize: 12,
    lineHeight: 18,
  },
  footer: {
    color: '#7d7476',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
});
