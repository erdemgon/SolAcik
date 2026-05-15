import * as Clipboard from 'expo-clipboard';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SourceVersionBadge } from '../../components/common/SourceVersionBadge';
import { WarningBox } from '../../components/common/WarningBox';
import { OscResultCard } from '../../components/oscillometry/OscResultCard';
import { oscillometryReferenceSets } from '../../data/oscillometry/referenceSets';
import { calculateOscillometry } from '../../services/oscillometryReferenceEngine';
import {
  OscDevice,
  OscMeasuredInput,
  OscParameter,
  OscReferenceEngineResult,
} from '../../src/modules/oscillometry/referenceEngines/types';
import {
  AxUnit,
  axToKpa,
  ResistanceReactanceUnit,
  resistanceReactanceToKpa,
} from '../../utils/oscillometry/oscUnits';

type Sex = 'male' | 'female';

const devices: OscDevice[] = [
  'Vyaire/MasterScreen IOS',
  'Resmon PRO FULL',
  'Tremoflo/Thorasys',
  'Other / Unknown',
];

const parameters: OscParameter[] = [
  'R5',
  'R10',
  'R15',
  'R20',
  'R5_R20',
  'X5',
  'X10',
  'X15',
  'X20',
  'AX',
  'Fres',
  'Z5',
  'R8',
  'X8',
  'Z8',
];

const rrUnits: ResistanceReactanceUnit[] = ['kPa/L/s', 'hPa/L/s', 'cmH2O/L/s'];
const axUnits: AxUnit[] = ['kPa/L', 'hPa/L', 'cmH2O/L'];

export function OscillometryScreen() {
  const [ageYears, setAgeYears] = useState('');
  const [sex, setSex] = useState<Sex>('female');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [population, setPopulation] = useState('');
  const [testDate, setTestDate] = useState('');
  const [device, setDevice] = useState<OscDevice>('Other / Unknown');
  const [referenceSetId, setReferenceSetId] = useState('raw_values_only');
  const [resistanceReactanceUnit, setResistanceReactanceUnit] =
    useState<ResistanceReactanceUnit>('kPa/L/s');
  const [axUnit, setAxUnit] = useState<AxUnit>('kPa/L');
  const [values, setValues] = useState<Record<string, string>>({});
  const [numberOfTrials, setNumberOfTrials] = useState('');
  const [acquisitionDurationSeconds, setAcquisitionDurationSeconds] = useState('');
  const [withinSessionCvPercent, setWithinSessionCvPercent] = useState('');
  const [coherence5Hz, setCoherence5Hz] = useState('');
  const [coherence20Hz, setCoherence20Hz] = useState('');
  const [operatorNotes, setOperatorNotes] = useState('');
  const [result, setResult] = useState<OscReferenceEngineResult | null>(null);

  const measured = useMemo(
    () => buildMeasured(values, resistanceReactanceUnit, axUnit),
    [axUnit, resistanceReactanceUnit, values],
  );

  useEffect(() => {
    let isMounted = true;

    async function run() {
      const next = await calculateOscillometry({
        ageYears: parseNumber(ageYears),
        device,
        heightCm: parseNumber(heightCm),
        measured,
        population,
        quality: {
          acquisitionDurationSeconds: parseNumber(acquisitionDurationSeconds),
          coherence20Hz: parseNumber(coherence20Hz),
          coherence5Hz: parseNumber(coherence5Hz),
          numberOfTrials: parseNumber(numberOfTrials),
          operatorNotes,
          withinSessionCvPercent: parseNumber(withinSessionCvPercent),
        },
        referenceSetId,
        sex,
        testDate,
        weightKg: parseNumber(weightKg),
      });
      if (isMounted) setResult(next);
    }

    run();
    return () => {
      isMounted = false;
    };
  }, [
    acquisitionDurationSeconds,
    ageYears,
    coherence20Hz,
    coherence5Hz,
    device,
    heightCm,
    measured,
    numberOfTrials,
    operatorNotes,
    population,
    referenceSetId,
    sex,
    testDate,
    weightKg,
    withinSessionCvPercent,
  ]);

  const copyText = `${result?.reportTr ?? ''}\n\n${result?.reportEn ?? ''}`;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Solunum fonksiyon</Text>
        <Text style={styles.title}>IOS / Oscillometry</Text>
        <Text style={styles.description}>Device-specific oscillometry interpretation</Text>
      </View>

      <SourceVersionBadge text="Osilometri referansları cihaz, protokol, popülasyon ve denklem bağımlıdır; katsayı yoksa z-skor üretilmez." />

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Hasta ve cihaz</Text>
        <View style={styles.chipRow}>
          <Chip label="Kız" selected={sex === 'female'} onPress={() => setSex('female')} />
          <Chip label="Erkek" selected={sex === 'male'} onPress={() => setSex('male')} />
        </View>
        <NumberInput label="Yaş (yıl)" value={ageYears} onChange={setAgeYears} />
        <NumberInput label="Boy (cm)" value={heightCm} onChange={setHeightCm} />
        <NumberInput label="Kilo (kg, opsiyonel)" value={weightKg} onChange={setWeightKg} />
        <TextInput placeholder="Popülasyon/etnisite (opsiyonel)" placeholderTextColor="#8a8a8a" value={population} onChangeText={setPopulation} style={styles.input} />
        <TextInput placeholder="Test tarihi (opsiyonel)" placeholderTextColor="#8a8a8a" value={testDate} onChangeText={setTestDate} style={styles.input} />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Cihaz</Text>
        <View style={styles.chipRow}>
          {devices.map((item) => (
            <Chip key={item} label={item} selected={device === item} onPress={() => setDevice(item)} />
          ))}
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Referans seti</Text>
        {oscillometryReferenceSets.map((referenceSet) => (
          <Pressable
            accessibilityRole="button"
            key={referenceSet.id}
            onPress={() => setReferenceSetId(referenceSet.id)}
            style={[styles.referenceCard, referenceSetId === referenceSet.id ? styles.referenceCardSelected : undefined]}
          >
            <Text style={[styles.referenceTitle, referenceSetId === referenceSet.id ? styles.referenceTitleSelected : undefined]}>{referenceSet.label}</Text>
            <Text style={styles.referenceText}>{referenceSet.population}</Text>
            <Text style={styles.referenceText}>{referenceSet.coefficientsAvailable ? 'Katsayı bağlı' : 'Katsayı yok: ham değer / metadata'}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Birim</Text>
        <Text style={styles.subhead}>R/X/Z</Text>
        <View style={styles.chipRow}>
          {rrUnits.map((unit) => (
            <Chip key={unit} label={unit} selected={resistanceReactanceUnit === unit} onPress={() => setResistanceReactanceUnit(unit)} />
          ))}
        </View>
        <Text style={styles.subhead}>AX</Text>
        <View style={styles.chipRow}>
          {axUnits.map((unit) => (
            <Chip key={unit} label={unit} selected={axUnit === unit} onPress={() => setAxUnit(unit)} />
          ))}
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Ölçülen parametreler</Text>
        {parameters.map((parameter) => (
          <NumberInput
            key={parameter}
            label={parameter === 'R5_R20' ? 'R5-R20 (opsiyonel; R5 ve R20 ile hesaplanır)' : parameter}
            value={values[parameter] ?? ''}
            onChange={(value) => setValues((current) => ({ ...current, [parameter]: value }))}
          />
        ))}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Kalite kontrol</Text>
        <NumberInput label="Trial sayısı" value={numberOfTrials} onChange={setNumberOfTrials} />
        <NumberInput label="Acquisition duration (sn)" value={acquisitionDurationSeconds} onChange={setAcquisitionDurationSeconds} />
        <NumberInput label="Within-session CV (%)" value={withinSessionCvPercent} onChange={setWithinSessionCvPercent} />
        <NumberInput label="Coherence 5 Hz" value={coherence5Hz} onChange={setCoherence5Hz} />
        <NumberInput label="Coherence 20 Hz" value={coherence20Hz} onChange={setCoherence20Hz} />
        <TextInput
          multiline
          placeholder="Operator notu (opsiyonel, kimlik bilgisi yazmayın)"
          placeholderTextColor="#8a8a8a"
          value={operatorNotes}
          onChangeText={setOperatorNotes}
          style={[styles.input, styles.textArea]}
        />
      </View>

      <View style={styles.resultSection}>
        <Text style={styles.panelTitle}>Sonuç</Text>
        {result?.warnings.map((warning) => (
          <WarningBox key={warning} tone="amber" title="Uyarı" text={warning} />
        ))}
        {result && result.items.length > 0 ? (
          <>
            <View style={styles.cardList}>
              {result.items.map((item) => (
                <OscResultCard key={item.parameter} item={item} />
              ))}
            </View>
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Rapor</Text>
              <Text style={styles.paragraph}>{result.reportTr}</Text>
              <Text style={styles.paragraphMuted}>{result.reportEn}</Text>
              <View style={styles.chipRow}>
                <Chip label="Copy report" selected={false} onPress={() => Clipboard.setStringAsync(copyText)} />
                <Chip label="Reset" selected={false} onPress={() => setValues({})} />
                <Chip label="Export later" selected={false} onPress={() => undefined} />
              </View>
            </View>
          </>
        ) : (
          <WarningBox tone="amber" title="Ölçüm bekleniyor" text="Parametre girildiğinde ham değer kartları burada görünür." />
        )}
      </View>

      <WarningBox
        tone="amber"
        title="Uyarı"
        text="Osilometri sonuçları cihaz, protokol, kalite kontrol ve kullanılan referans denklemlerine duyarlıdır. Bu araç eğitimsel/klinik destek amaçlıdır; tanı veya tedavi kararının yerine geçmez."
      />
      <Text style={styles.footer}>Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı</Text>
    </ScrollView>
  );
}

function buildMeasured(
  values: Record<string, string>,
  resistanceReactanceUnit: ResistanceReactanceUnit,
  axUnit: AxUnit,
): OscMeasuredInput {
  return Object.fromEntries(
    parameters
      .map((parameter) => {
        const parsed = parseNumber(values[parameter] ?? '');
        if (parsed === null) return [parameter, null];
        if (parameter === 'AX') return [parameter, axToKpa(parsed, axUnit)];
        if (parameter === 'Fres') return [parameter, parsed];
        return [parameter, resistanceReactanceToKpa(parsed, resistanceReactanceUnit)];
      })
      .filter(([, value]) => value !== null),
  );
}

function NumberInput({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <TextInput
      keyboardType="decimal-pad"
      onChangeText={onChange}
      placeholder={label}
      placeholderTextColor="#8a8a8a"
      style={styles.input}
      value={value}
    />
  );
}

function Chip({
  label,
  onPress,
  selected,
}: {
  label: string;
  onPress: () => void;
  selected: boolean;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[styles.chip, selected ? styles.chipSelected : undefined]}>
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : undefined]}>{label}</Text>
    </Pressable>
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
  subhead: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '900',
  },
  chipRow: {
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
  input: {
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    color: '#211f1f',
    fontSize: 15,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textArea: {
    minHeight: 78,
    textAlignVertical: 'top',
  },
  referenceCard: {
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
    padding: 12,
  },
  referenceCardSelected: {
    backgroundColor: '#f9e9ec',
    borderColor: '#8f1d2c',
  },
  referenceTitle: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '900',
  },
  referenceTitleSelected: {
    color: '#8f1d2c',
  },
  referenceText: {
    color: '#686868',
    fontSize: 12,
    lineHeight: 17,
  },
  resultSection: {
    gap: 12,
  },
  cardList: {
    gap: 10,
  },
  paragraph: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  paragraphMuted: {
    color: '#686868',
    fontSize: 13,
    lineHeight: 19,
  },
  footer: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '700',
    paddingTop: 2,
    textAlign: 'center',
  },
});
