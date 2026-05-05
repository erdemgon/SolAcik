import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  BoScenario,
  boFamRegimens,
  boFamSafetyDisclaimer,
  boFamSourceBadge,
  calculateBoFamDoses,
} from '../data/bo/boFamRegimens';

const scenarioOptions: { label: string; value: BoScenario }[] = [
  { label: 'Post-enfeksiyöz BO / PIBO', value: 'postInfectious' },
  { label: 'Post-transplant / post-HCT BOS', value: 'postTransplant' },
];

export function BoFamCalculatorScreen() {
  const [scenario, setScenario] = useState<BoScenario>('postInfectious');
  const [ageText, setAgeText] = useState('5');
  const [weightText, setWeightText] = useState('20');

  const availableRegimens = boFamRegimens.filter((item) => item.scenario === scenario);
  const [selectedRegimenId, setSelectedRegimenId] = useState(availableRegimens[0]?.id ?? '');
  const selectedRegimen =
    boFamRegimens.find((item) => item.id === selectedRegimenId && item.scenario === scenario) ??
    availableRegimens[0];

  const ageYears = Number(ageText.replace(',', '.'));
  const weightKg = Number(weightText.replace(',', '.'));
  const inputValid = Number.isFinite(ageYears) && ageYears >= 0 && Number.isFinite(weightKg) && weightKg > 0;

  const doseResults = useMemo(() => {
    if (!inputValid || !selectedRegimen) return [];
    return calculateBoFamDoses({ ageYears, weightKg, regimenId: selectedRegimen.id });
  }, [ageYears, inputValid, selectedRegimen, weightKg]);

  function selectScenario(nextScenario: BoScenario) {
    setScenario(nextScenario);
    const first = boFamRegimens.find((item) => item.scenario === nextScenario);
    setSelectedRegimenId(first?.id ?? '');
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>BO FAM/BAM</Text>
        <Text style={styles.title}>Bronşiolitis Obliterans FAM/BAM Şema Hatırlatıcı</Text>
        <Text style={styles.description}>
          Post-enfeksiyöz BO ve post-transplant BOS bağlamında FAM/BAM literatür
          şemalarını, yaş-kilo ile hesaplanan pratik doz hatırlatıcılarıyla gösterir.
        </Text>
      </View>

      <SourceVersionBadge compact text={boFamSourceBadge} />
      <WarningBox tone="amber" title="Klinik sınır" text={boFamSafetyDisclaimer} />

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Senaryo</Text>
        <View style={styles.chipWrap}>
          {scenarioOptions.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              selected={scenario === option.value}
              onPress={() => selectScenario(option.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Yaş ve kilo</Text>
        <View style={styles.inputRow}>
          <InputBox label="Yaş, yıl" value={ageText} onChangeText={setAgeText} />
          <InputBox label="Kilo, kg" value={weightText} onChangeText={setWeightText} />
        </View>
        {!inputValid ? (
          <Text style={styles.errorText}>Doz hatırlatıcı için yaş ≥0 ve kilo &gt;0 girilmelidir.</Text>
        ) : null}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Şema seç</Text>
        <View style={styles.cardList}>
          {availableRegimens.map((regimen) => (
            <Pressable
              accessibilityRole="button"
              key={regimen.id}
              onPress={() => setSelectedRegimenId(regimen.id)}
              style={[
                styles.regimenCard,
                selectedRegimen?.id === regimen.id ? styles.regimenCardSelected : undefined,
              ]}
            >
              <Text style={styles.regimenTitle}>{regimen.title}</Text>
              <Text style={styles.regimenMeta}>{regimen.evidenceLevel} · {regimen.duration}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {selectedRegimen ? (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>{selectedRegimen.title}</Text>
          <Text style={styles.sourceText}>{selectedRegimen.sourceTitle}</Text>
          <Text style={styles.sourceText}>{selectedRegimen.sourceVersion}</Text>
          <BulletList items={selectedRegimen.notes} />
          <Text style={styles.sourceNote}>{selectedRegimen.sourceNote}</Text>
        </View>
      ) : null}

      {doseResults.length > 0 ? (
        <View style={styles.cardList}>
          {doseResults.map((dose) => (
            <View key={dose.drugId} style={styles.doseCard}>
              <Text style={styles.doseTitle}>{dose.label}</Text>
              <Text style={styles.doseCalc}>{dose.calculatedText}</Text>
              <Text style={styles.dosePractical}>{dose.practicalText}</Text>
              <Text style={styles.verification}>{dose.verification}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <WarningBox
        title="Özellikle dikkat"
        text="Post-transplant BOS’ta enfeksiyon, GVHD, ilaç etkileşimi ve immünsüpresyon durumu netleşmeden FAM şeması otomatik uygulanmamalıdır. PIBO’da optimal süre ve yanıt kriterleri uzman izlemiyle belirlenmelidir."
      />

      <Text style={styles.footer}>Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı</Text>
    </ScrollView>
  );
}

function InputBox({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.inputBox}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        keyboardType="decimal-pad"
        onChangeText={onChangeText}
        style={styles.input}
        value={value}
      />
    </View>
  );
}

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
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
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : undefined]}>{label}</Text>
    </Pressable>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View style={styles.bulletList}>
      {items.map((item) => (
        <Text key={item} style={styles.bullet}>• {item}</Text>
      ))}
    </View>
  );
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
  panel: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  panelTitle: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  chipWrap: {
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
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  inputBox: {
    flex: 1,
    gap: 6,
  },
  inputLabel: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '900',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    color: '#211f1f',
    fontSize: 17,
    minHeight: 44,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  errorText: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '800',
  },
  cardList: {
    gap: 10,
  },
  regimenCard: {
    backgroundColor: '#fff',
    borderColor: '#e2e2e5',
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
    padding: 12,
  },
  regimenCardSelected: {
    borderColor: '#8f1d2c',
    borderWidth: 2,
  },
  regimenTitle: {
    color: '#211f1f',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 20,
  },
  regimenMeta: {
    color: '#686868',
    fontSize: 12,
    lineHeight: 17,
  },
  sourceText: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
  },
  sourceNote: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
  },
  bulletList: {
    gap: 6,
  },
  bullet: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  doseCard: {
    backgroundColor: '#fff',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    gap: 7,
    padding: 14,
  },
  doseTitle: {
    color: '#8f1d2c',
    fontSize: 17,
    fontWeight: '900',
  },
  doseCalc: {
    color: '#211f1f',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 21,
  },
  dosePractical: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  verification: {
    color: '#686868',
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
});
