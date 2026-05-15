import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import { PftResultCard } from '../components/pft/PftResultCard';
import { SpirometryGliScreen } from './spirometry-gli';
import {
  PftParameter,
  PftReferenceEngineResult,
  PftTestType,
} from '../src/modules/pft/referenceEngines/types';
import { getPftReferenceResult } from '../utils/pft/pftReferenceClient';
import { buildPftReport } from '../utils/pft/pftReport';

type PftTab = 'spirometry' | 'tlco' | 'lungVolume' | 'mbw';
type Sex = 'male' | 'female';

const tabs: { key: PftTab; label: string }[] = [
  { key: 'spirometry', label: 'Spirometry' },
  { key: 'tlco', label: 'TLCO / DLCO' },
  { key: 'lungVolume', label: 'Lung Volumes' },
  { key: 'mbw', label: 'MBW' },
];

const safetyText =
  'Bu araç eğitimsel/klinik destek amaçlıdır; tanı veya tedavi kararının yerine geçmez. Sonuçlar ilgili cihaz çıktısı, kalite kriterleri ve klinik bağlamla birlikte değerlendirilmelidir.';

export function PulmonaryFunctionScreen() {
  const [activeTab, setActiveTab] = useState<PftTab>('spirometry');
  const [ageYears, setAgeYears] = useState('');
  const [sex, setSex] = useState<Sex>('female');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [testDate, setTestDate] = useState('');
  const [notes, setNotes] = useState('');
  const [unitSystem, setUnitSystem] = useState<'SI' | 'traditional'>('SI');
  const [barometricPressureCorrected, setBarometricPressureCorrected] = useState(false);
  const [barometricPressureValue, setBarometricPressureValue] = useState('');
  const [barometricPressureUnit, setBarometricPressureUnit] = useState<'kPa' | 'mmHg'>('kPa');
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<PftReferenceEngineResult | null>(null);

  const parsedAgeYears = parseNumber(ageYears);
  const parsedHeightCm = parseNumber(heightCm);
  const parsedWeightKg = parseNumber(weightKg);
  const validationWarnings = validateCommonInputs(parsedAgeYears, parsedHeightCm);
  const measured = useMemo(() => buildMeasured(activeTab, values), [activeTab, values]);
  const report = result ? buildPftReport(result.items) : null;

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (activeTab === 'spirometry') {
        setResult(null);
        return;
      }

      const nextResult = await getPftReferenceResult({
        ageYears: parsedAgeYears,
        heightCm: parsedHeightCm,
        measured,
        notes,
        sex,
        spiroEthnicity: 'GLI2022_GLOBAL',
        testDate,
        testType: toTestType(activeTab),
        unitSystem,
        weightKg: parsedWeightKg,
      });
      if (isMounted) setResult(nextResult);
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [
    activeTab,
    measured,
    notes,
    parsedAgeYears,
    parsedHeightCm,
    parsedWeightKg,
    sex,
    testDate,
    unitSystem,
  ]);

  function updateValue(key: string, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Normal değerler</Text>
        <Text style={styles.title}>Pulmonary Function / Solunum Fonksiyonları</Text>
        <Text style={styles.description}>
          Spirometri, TLCO/DLCO, akciğer volümleri ve MBW sonuçlarını tek ekranda
          yapılandırmak için eğitimsel referans aracı.
        </Text>
      </View>

      <SourceVersionBadge text="Kaynak: GLI spirometri motoru korunur; TLCO/volüm/MBW için GLI veri dosyası veya backend bağlanana kadar sahte predicted üretilmez." />

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

      {activeTab === 'spirometry' ? (
        <SpirometryGliScreen />
      ) : (
        <>
          <CommonInputs
            ageYears={ageYears}
            heightCm={heightCm}
            notes={notes}
            onAgeYears={setAgeYears}
            onHeightCm={setHeightCm}
            onNotes={setNotes}
            onSex={setSex}
            onTestDate={setTestDate}
            onWeightKg={setWeightKg}
            sex={sex}
            testDate={testDate}
            weightKg={weightKg}
          />

          {validationWarnings.map((warning) => (
            <WarningBox key={warning} tone="amber" title="Veri kontrolü" text={warning} />
          ))}

          {activeTab === 'tlco' ? (
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>TLCO/DLCO girdileri</Text>
              <View style={styles.chipRow}>
                <Chip label="SI" selected={unitSystem === 'SI'} onPress={() => setUnitSystem('SI')} />
                <Chip
                  label="Traditional"
                  selected={unitSystem === 'traditional'}
                  onPress={() => setUnitSystem('traditional')}
                />
              </View>
              <NumberInput label="TLCO (DLCO)" value={values.TLCO ?? ''} onChange={(value) => updateValue('TLCO', value)} />
              <NumberInput label="VA" value={values.VA ?? ''} onChange={(value) => updateValue('VA', value)} />
              <NumberInput label="KCO" value={values.KCO ?? ''} onChange={(value) => updateValue('KCO', value)} />
              <View style={styles.chipRow}>
                <Chip
                  label="Barometrik basınç düzeltilmiş"
                  selected={barometricPressureCorrected}
                  onPress={() => setBarometricPressureCorrected((value) => !value)}
                />
                <Chip
                  label={barometricPressureUnit}
                  selected
                  onPress={() => setBarometricPressureUnit((value) => (value === 'kPa' ? 'mmHg' : 'kPa'))}
                />
              </View>
              <NumberInput
                label={`Barometrik basınç (${barometricPressureUnit})`}
                value={barometricPressureValue}
                onChange={setBarometricPressureValue}
              />
            </View>
          ) : null}

          {activeTab === 'lungVolume' ? (
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Akciğer volümleri</Text>
              {['FRC', 'TLC', 'RV', 'ERV', 'IC', 'VC'].map((parameter) => (
                <NumberInput
                  key={parameter}
                  label={parameter}
                  value={values[parameter] ?? ''}
                  onChange={(value) => updateValue(parameter, value)}
                />
              ))}
              <Text style={styles.note}>RV/TLC, RV ve TLC girildiğinde otomatik hesaplanır.</Text>
            </View>
          ) : null}

          {activeTab === 'mbw' ? (
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>MBW girdileri</Text>
              <NumberInput
                label="MBW-FRC"
                value={values.FRC_MBW ?? ''}
                onChange={(value) => updateValue('FRC_MBW', value)}
              />
              <NumberInput label="LCI" value={values.LCI ?? ''} onChange={(value) => updateValue('LCI', value)} />
              <WarningBox
                tone="amber"
                title="MBW notu"
                text="Ham MBW eğrisinden LCI hesaplanmaz; yalnızca cihazdan gelen LCI ve MBW-FRC değerleri yorumlanır."
              />
            </View>
          ) : null}

          <ResultSection result={result} report={report} />
        </>
      )}

      <WarningBox tone="amber" title="Güvenlik notu" text={safetyText} />
      <Text style={styles.footer}>
        Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
      </Text>
    </ScrollView>
  );
}

function CommonInputs({
  ageYears,
  heightCm,
  notes,
  onAgeYears,
  onHeightCm,
  onNotes,
  onSex,
  onTestDate,
  onWeightKg,
  sex,
  testDate,
  weightKg,
}: {
  ageYears: string;
  heightCm: string;
  notes: string;
  onAgeYears: (value: string) => void;
  onHeightCm: (value: string) => void;
  onNotes: (value: string) => void;
  onSex: (value: Sex) => void;
  onTestDate: (value: string) => void;
  onWeightKg: (value: string) => void;
  sex: Sex;
  testDate: string;
  weightKg: string;
}) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Ortak girdi</Text>
      <View style={styles.chipRow}>
        <Chip label="Kız" selected={sex === 'female'} onPress={() => onSex('female')} />
        <Chip label="Erkek" selected={sex === 'male'} onPress={() => onSex('male')} />
      </View>
      <NumberInput label="Yaş (yıl, örn. 8.5)" value={ageYears} onChange={onAgeYears} />
      <NumberInput label="Boy (cm)" value={heightCm} onChange={onHeightCm} />
      <NumberInput label="Kilo (kg, opsiyonel)" value={weightKg} onChange={onWeightKg} />
      <TextInput
        placeholder="Test tarihi (opsiyonel)"
        placeholderTextColor="#8a8a8a"
        value={testDate}
        onChangeText={onTestDate}
        style={styles.input}
      />
      <TextInput
        multiline
        placeholder="Not (opsiyonel, kimlik bilgisi yazmayın)"
        placeholderTextColor="#8a8a8a"
        value={notes}
        onChangeText={onNotes}
        style={[styles.input, styles.textArea]}
      />
    </View>
  );
}

function ResultSection({
  report,
  result,
}: {
  report: ReturnType<typeof buildPftReport> | null;
  result: PftReferenceEngineResult | null;
}) {
  return (
    <View style={styles.resultSection}>
      <Text style={styles.panelTitle}>Sonuç</Text>
      {!result || result.items.length === 0 ? (
        <WarningBox
          tone="amber"
          title="Ölçüm girin"
          text="Ölçüm girildiğinde ilgili parametre kartları burada görünür. Eksik parametreler atlanır."
        />
      ) : (
        <>
          <WarningBox tone="amber" title="Referans motoru" text={result.engineMessageTr} />
          {result.warnings.map((warning) => (
            <WarningBox key={warning} tone="amber" title="Uyarı" text={warning} />
          ))}
          <View style={styles.cardList}>
            {result.items.map((item) => (
              <PftResultCard key={`${item.testType}-${item.parameter}`} item={item} />
            ))}
          </View>
          {report ? (
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Kısa rapor</Text>
              <Text style={styles.paragraph}>{report.tr}</Text>
              <Text style={styles.paragraphMuted}>{report.en}</Text>
            </View>
          ) : null}
        </>
      )}
    </View>
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

function buildMeasured(activeTab: PftTab, values: Record<string, string>) {
  const keysByTab: Record<Exclude<PftTab, 'spirometry'>, PftParameter[]> = {
    tlco: ['TLCO', 'VA', 'KCO'],
    lungVolume: ['FRC', 'TLC', 'RV', 'ERV', 'IC', 'VC'],
    mbw: ['FRC_MBW', 'LCI'],
  };
  if (activeTab === 'spirometry') return {};
  return Object.fromEntries(
    keysByTab[activeTab]
      .map((key) => [key, parseNumber(values[key] ?? '')])
      .filter(([, value]) => value !== null),
  );
}

function toTestType(tab: Exclude<PftTab, 'spirometry'>): PftTestType {
  if (tab === 'tlco') return 'tlco';
  if (tab === 'lungVolume') return 'lungVolume';
  return 'mbw';
}

function parseNumber(value: string) {
  if (!value.trim()) return null;
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}

function validateCommonInputs(ageYears: number | null, heightCm: number | null) {
  const warnings: string[] = [];
  if (ageYears !== null && (ageYears < 0 || ageYears > 95)) {
    warnings.push('Yaş değeri referans aralığı dışında görünüyor; veri girişini kontrol edin.');
  }
  if (heightCm !== null && (heightCm < 40 || heightCm > 230)) {
    warnings.push('Boy 40–230 cm dışında. Referans hesaplaması için veri girişini kontrol edin.');
  }
  return warnings;
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
  note: {
    color: '#686868',
    fontSize: 13,
    lineHeight: 18,
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
