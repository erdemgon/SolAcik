import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  calculateLightCriteria,
  conservativeItems,
  drainageDecisionItems,
  getDrainageSignal,
  imagingItems,
  initialAssessmentItems,
  parapneumonicEffusionSource,
  pleuralFluidItems,
  treatmentFollowUpItems,
} from '../data/pleural/parapneumonicEffusion';

type TabKey = 'initial' | 'imaging' | 'fluid' | 'light' | 'drainage' | 'treatment' | 'source';
type BooleanKey =
  | 'purulent'
  | 'positiveGramCulture'
  | 'phLow'
  | 'glucoseLow'
  | 'loculated'
  | 'largeEffusion'
  | 'clinicalWorse';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'initial', label: 'İlk Değerlendirme' },
  { key: 'imaging', label: 'USG / Görüntüleme' },
  { key: 'fluid', label: 'Plevra Sıvısı' },
  { key: 'light', label: 'Light Kriterleri' },
  { key: 'drainage', label: 'Drenaj Kararı' },
  { key: 'treatment', label: 'Antibiyotik & İzlem' },
  { key: 'source', label: 'Kaynak' },
];

export function ParapneumonicEffusionScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('initial');
  const [pleuralProtein, setPleuralProtein] = useState('');
  const [serumProtein, setSerumProtein] = useState('');
  const [pleuralLdh, setPleuralLdh] = useState('');
  const [serumLdh, setSerumLdh] = useState('');
  const [serumLdhUpperLimit, setSerumLdhUpperLimit] = useState('');
  const [signals, setSignals] = useState<Record<BooleanKey, boolean>>({
    purulent: false,
    positiveGramCulture: false,
    phLow: false,
    glucoseLow: false,
    loculated: false,
    largeEffusion: false,
    clinicalWorse: false,
  });

  const light = useMemo(
    () =>
      calculateLightCriteria({
        pleuralProtein: parseNumber(pleuralProtein),
        serumProtein: parseNumber(serumProtein),
        pleuralLdh: parseNumber(pleuralLdh),
        serumLdh: parseNumber(serumLdh),
        serumLdhUpperLimit: parseNumber(serumLdhUpperLimit),
      }),
    [pleuralLdh, pleuralProtein, serumLdh, serumLdhUpperLimit, serumProtein],
  );
  const drainage = getDrainageSignal(signals);

  function toggleSignal(key: BooleanKey) {
    setSignals((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Plevra</Text>
        <Text style={styles.title}>Parapnömonik Efüzyon ve Ampiyem</Text>
        <Text style={styles.description}>
          Efüzyon değerlendirmesi, Light kriterleri, plevra sıvısı yorumu ve drenaj
          kararı için pratik çocuk odaklı rehber.
        </Text>
      </View>

      <SourceVersionBadge text={parapneumonicEffusionSource.badge} />

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

      {activeTab === 'initial' ? (
        <InfoCard title="İlk değerlendirme" items={initialAssessmentItems} />
      ) : null}

      {activeTab === 'imaging' ? (
        <InfoCard title="USG / görüntüleme" items={imagingItems} />
      ) : null}

      {activeTab === 'fluid' ? (
        <>
          <InfoCard title="Plevra sıvısı incelemesi" items={pleuralFluidItems} />
          <WarningBox
            tone="amber"
            title="Yorum notu"
            text="Parapnömonik efüzyonda pürülan görünüm, pH, glukoz, LDH, lokülasyon ve klinik durum drenaj kararında Light kriterlerinden daha doğrudan belirleyicidir."
          />
        </>
      ) : null}

      {activeTab === 'light' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Light kriterleri hesaplayıcı</Text>
            <View style={styles.inputGrid}>
              <Field label="Plevra protein" value={pleuralProtein} onChangeText={setPleuralProtein} />
              <Field label="Serum protein" value={serumProtein} onChangeText={setSerumProtein} />
              <Field label="Plevra LDH" value={pleuralLdh} onChangeText={setPleuralLdh} />
              <Field label="Serum LDH" value={serumLdh} onChangeText={setSerumLdh} />
              <Field
                label="Serum LDH üst sınırı"
                value={serumLdhUpperLimit}
                onChangeText={setSerumLdhUpperLimit}
              />
            </View>
          </View>
          <View style={styles.resultCard}>
            <Text style={styles.resultKicker}>Sonuç</Text>
            <Text style={styles.resultTitle}>{light.interpretation}</Text>
            <Text style={styles.resultText}>{light.metCount}/3 kriter pozitif</Text>
          </View>
          <View style={styles.panel}>
            {light.criteria.map((criterion) => (
              <View key={criterion.label} style={styles.criteriaRow}>
                <Text style={styles.criteriaText}>{criterion.label}</Text>
                <Text style={styles.criteriaValue}>
                  {criterion.value !== null ? criterion.value.toFixed(2) : '—'} •{' '}
                  {criterion.met === null ? 'Eksik' : criterion.met ? 'Pozitif' : 'Negatif'}
                </Text>
              </View>
            ))}
          </View>
          <WarningBox
            tone="amber"
            title="Light kriterleri sınırı"
            text="Light kriterleri transüda/eksüda ayrımı içindir. Parapnömonik bağlamda drenaj kararı yalnızca Light kriterleriyle verilmez."
          />
        </>
      ) : null}

      {activeTab === 'drainage' ? (
        <>
          <View style={styles.resultCard}>
            <Text style={styles.resultKicker}>Drenaj sinyali</Text>
            <Text style={styles.resultTitle}>{drainage.title}</Text>
            <Text style={styles.resultText}>{drainage.text}</Text>
          </View>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Drenaj lehine bulgular</Text>
            <Toggle label="Pürülan sıvı / ampiyem" selected={signals.purulent} onPress={() => toggleSignal('purulent')} />
            <Toggle label="Gram/kültür pozitif plevra sıvısı" selected={signals.positiveGramCulture} onPress={() => toggleSignal('positiveGramCulture')} />
            <Toggle label="Plevra pH düşük, özellikle <7.2" selected={signals.phLow} onPress={() => toggleSignal('phLow')} />
            <Toggle label="Glukoz düşük veya LDH çok yüksek" selected={signals.glucoseLow} onPress={() => toggleSignal('glucoseLow')} />
            <Toggle label="Loküle/septalı efüzyon" selected={signals.loculated} onPress={() => toggleSignal('loculated')} />
            <Toggle label="Büyük efüzyon veya solunum sıkıntısı" selected={signals.largeEffusion} onPress={() => toggleSignal('largeEffusion')} />
            <Toggle label="Antibiyotiğe rağmen kötüleşme/persistan ateş" selected={signals.clinicalWorse} onPress={() => toggleSignal('clinicalWorse')} />
          </View>
          <InfoCard title="Drenaj düşün" items={drainageDecisionItems} />
          <InfoCard title="Sadece antibiyotik + izlem olabilir" items={conservativeItems} />
        </>
      ) : null}

      {activeTab === 'treatment' ? (
        <InfoCard title="Antibiyotik & izlem" items={treatmentFollowUpItems} />
      ) : null}

      {activeTab === 'source' ? (
        <>
          <InfoCard
            title={parapneumonicEffusionSource.title}
            items={[
              parapneumonicEffusionSource.warning,
              'Çocuklarda parapnömonik efüzyonda USG, klinik ağırlık, plevra sıvısı ve drenaj gereksinimi birlikte değerlendirilir.',
              'Genel pediatri, çocuk göğüs, enfeksiyon ve çocuk cerrahisi arasında ortak dil oluşturmak için hazırlanmıştır.',
            ]}
          />
        </>
      ) : null}

      <Text style={styles.footer}>
        Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
      </Text>
    </ScrollView>
  );
}

function Field({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        keyboardType="decimal-pad"
        onChangeText={onChangeText}
        placeholder="0"
        placeholderTextColor="#999"
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
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.chip, selected ? styles.chipSelected : undefined]}
    >
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

function Toggle({
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
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[styles.toggle, selected ? styles.toggleSelected : undefined]}
    >
      <Text style={[styles.toggleText, selected ? styles.toggleTextSelected : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      {items.map((item) => (
        <Text key={item} style={styles.bullet}>• {item}</Text>
      ))}
    </View>
  );
}

function parseNumber(value: string) {
  if (!value.trim()) return null;
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}

const styles = StyleSheet.create({
  scrollContent: {
    backgroundColor: '#fff',
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
    fontSize: 13,
    fontWeight: '900',
  },
  chipTextSelected: {
    color: '#fff',
  },
  panel: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 14,
  },
  panelTitle: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  inputGrid: {
    gap: 10,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '800',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#dddddf',
    borderRadius: 8,
    borderWidth: 1,
    color: '#211f1f',
    fontSize: 16,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  resultCard: {
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    gap: 7,
    padding: 15,
  },
  resultKicker: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
  },
  resultTitle: {
    color: '#211f1f',
    fontSize: 20,
    fontWeight: '900',
  },
  resultText: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  criteriaRow: {
    backgroundColor: '#fff',
    borderColor: '#e1e1e4',
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    padding: 11,
  },
  criteriaText: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '800',
  },
  criteriaValue: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '800',
  },
  toggle: {
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 40,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  toggleSelected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  toggleText: {
    color: '#211f1f',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
  },
  toggleTextSelected: {
    color: '#fff',
  },
  bullet: {
    color: '#211f1f',
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
