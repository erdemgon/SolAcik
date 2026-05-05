import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import { CdcGrowthPanel } from '../components/growth/CdcGrowthPanel';
import { CopySpirometrySummaryButton } from '../components/spirometry/CopySpirometrySummaryButton';
import {
  ObservedValueInputs,
  ObservedValues,
} from '../components/spirometry/ObservedValueInputs';
import { SexSelector } from '../components/spirometry/SexSelector';
import { SpirometryInputCard } from '../components/spirometry/SpirometryInputCard';
import {
  SpirometryMode,
  SpirometryModeSelector,
} from '../components/spirometry/SpirometryModeSelector';
import { SpirometryInterpretationBox } from '../components/spirometry/SpirometryInterpretationBox';
import { SpirometryQualityWarning } from '../components/spirometry/SpirometryQualityWarning';
import { SpirometryResultCard } from '../components/spirometry/SpirometryResultCard';
import {
  gliCoefficientMetadata,
} from '../data/spirometry/gliCoefficientMetadata';
import { getGliSpirometryResult } from '../utils/spirometry/gliClient';
import {
  GliReferenceSet,
  GliSpirometryResult,
  Sex,
} from '../utils/spirometry/gliTypes';
import {
  buildSpirometryInterpretation,
  SPIROMETRY_SAFETY_WARNING,
} from '../utils/spirometry/gliInterpretation';
import {
  normalizeFev1FvcRatioInput,
  parseSpirometryNumber,
  validateSpirometryInputs,
  type SpirometryInputValidation,
} from '../utils/spirometry/spirometryInputValidation';
import { calculateCdcGrowth } from '../utils/growth/cdcGrowth';
import { cdcGrowthSource } from '../data/growth/cdcGrowthData';

type TabKey = 'input' | 'result' | 'interpretation' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'input', label: 'Girdi' },
  { key: 'result', label: 'Sonuç' },
  { key: 'interpretation', label: 'Yorum' },
  { key: 'source', label: 'Kaynak & Uyarı' },
];

const DEFAULT_REFERENCE_SET: GliReferenceSet = 'GLI2022_GLOBAL';
const DEFAULT_REFERENCE_LABEL = 'GLI Global 2022 / race-neutral';

const warnings = [
  'GLI hesaplaması yaş, cinsiyet, boy ve race-neutral referans setine bağlıdır.',
  '3 yaş altı için bu modül GLI spirometri normal değeri hesaplamaz.',
  '% predicted tek başına yorum için yeterli değildir; z-skor ve LLN temel alınmalıdır.',
  'FEV1/FVC obstrüksiyon değerlendirmesinde temel parametredir.',
  'Düşük FVC tek başına restriksiyon tanısı koydurmaz; test kalitesi, hava hapsi ve statik akciğer volümleri ile değerlendirilmelidir.',
  'MEF25–75 / FEF25–75 küçük hava yolu hakkında fikir verebilir, ancak değişkenliği yüksektir ve tek başına tanı koydurmaz.',
  'GLI Global 2022 race-neutral seçeneğinde FEF25–75 / MEF25–75 için predicted/z-skor mevcut olmayabilir.',
  SPIROMETRY_SAFETY_WARNING,
];

export function SpirometryGliScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('input');
  const [mode, setMode] = useState<SpirometryMode>('predicted');
  const [sex, setSex] = useState<Sex>('female');
  const [ageMonths, setAgeMonths] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [gliResult, setGliResult] = useState<GliSpirometryResult | null>(null);
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const [observed, setObserved] = useState<ObservedValues>({
    fev1: '',
    fvc: '',
    fev1Fvc: '',
    fef25_75: '',
  });

  const parsedAgeMonths = parseSpirometryNumber(ageMonths);
  const parsedHeightCm = parseSpirometryNumber(heightCm);
  const parsedWeightKg = parseSpirometryNumber(weightKg);
  const validation = validateSpirometryInputs(parsedAgeMonths, parsedHeightCm);
  const ageYearsDecimal = parsedAgeMonths === null ? null : parsedAgeMonths / 12;
  const growthResults = useMemo(
    () =>
      calculateCdcGrowth({
        ageMonths: parsedAgeMonths,
        heightCm: parsedHeightCm,
        sex,
        weightKg: parsedWeightKg,
      }),
    [parsedAgeMonths, parsedHeightCm, parsedWeightKg, sex],
  );
  const canCalculate = validation.blocking.length === 0;
  const parsedObserved = useMemo(
    () => ({
      fev1L: parseSpirometryNumber(observed.fev1),
      fvcL: parseSpirometryNumber(observed.fvc),
      fev1FvcRatio: normalizeFev1FvcRatioInput(observed.fev1Fvc),
      fef2575Lps: parseSpirometryNumber(observed.fef25_75),
    }),
    [observed],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadResult() {
      if (!canCalculate || parsedAgeMonths === null || parsedHeightCm === null) {
        setGliResult(null);
        return;
      }

      setIsLoadingResult(true);
      const result = await getGliSpirometryResult({
        ageMonths: parsedAgeMonths,
        heightCm: parsedHeightCm,
        referenceSet: DEFAULT_REFERENCE_SET,
        sex,
        observed: mode === 'interpret' ? parsedObserved : undefined,
        engine: 'official_api',
      });
      if (isMounted) {
        setGliResult(result);
        setIsLoadingResult(false);
      }
    }

    loadResult();

    return () => {
      isMounted = false;
    };
  }, [canCalculate, mode, parsedAgeMonths, parsedHeightCm, parsedObserved, sex]);

  const results = gliResult?.results ?? [];
  const interpretation = gliResult
    ? buildSpirometryInterpretation(gliResult)
    : [
        SPIROMETRY_SAFETY_WARNING,
      ];
  const summary = buildSummary({
    ageMonths,
    heightCm,
    mode,
    observed,
    referenceLabel: DEFAULT_REFERENCE_LABEL,
    results,
    sex,
  });

  function updateObserved(key: keyof ObservedValues, value: string) {
    setObserved((current) => ({ ...current, [key]: value }));
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Normal değerler</Text>
        <Text style={styles.title}>
          Spirometri GLI: Çocuklarda Yaş, Cinsiyet ve Boya Göre Normal Değer ve Z-Skor Hesaplayıcı
        </Text>
        <Text style={styles.description}>
          GLI LMS motoru için hazırlanmış, hasta kimliği toplamayan geçici hesap
          ekranı. Resmi katsayı dosyası bağlanmadıkça sahte sonuç üretmez.
        </Text>
      </View>

      <SourceVersionBadge text="Kaynak: GLI Global 2022 / race-neutral — resmi GLI hesaplayıcı ve katsayı dosyaları ile doğrulanmalıdır." />
      <WarningBox tone="amber" title="Güvenlik notu" text={SPIROMETRY_SAFETY_WARNING} />

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

      {activeTab === 'input' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Hesaplama modu</Text>
            <SpirometryModeSelector selected={mode} onSelect={setMode} />
          </View>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Cinsiyet</Text>
            <SexSelector selected={sex} onSelect={setSex} />
          </View>
          <SpirometryInputCard
            ageMonths={ageMonths}
            heightCm={heightCm}
            weightKg={weightKg}
            onAgeMonths={setAgeMonths}
            onHeightCm={setHeightCm}
            onWeightKg={setWeightKg}
          />
          <CdcGrowthPanel
            ageYearsDecimal={ageYearsDecimal}
            results={growthResults}
            showWeightPrompt={parsedWeightKg === null}
          />
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Referans</Text>
            <Text style={styles.referenceText}>{DEFAULT_REFERENCE_LABEL}</Text>
            <Text style={styles.referenceNote}>
              Karışıklığı azaltmak için bu ekranda yalnızca race-neutral referans gösterilir.
            </Text>
          </View>
          <WarningBox
            tone="amber"
            title="GLI Global 2022 notu"
            text="GLI Global 2022 race-neutral modunda FEF25–75 / MEF25–75 için predicted ve z-skor mevcut olmayabilir."
          />
          {mode === 'interpret' ? (
            <ObservedValueInputs values={observed} onChange={updateObserved} />
          ) : null}
          <ValidationMessages validation={validation} />
          <SpirometryInlineResults
            canCalculate={canCalculate}
            gliResult={gliResult}
            isLoadingResult={isLoadingResult}
            results={results}
            summary={summary}
            validation={validation}
          />
          {mode === 'interpret' ? (
            <>
              <SpirometryQualityWarning />
              <SpirometryInterpretationBox messages={interpretation} />
            </>
          ) : null}
        </>
      ) : null}

      {activeTab === 'result' ? (
          <SpirometryInlineResults
          canCalculate={canCalculate}
          gliResult={gliResult}
          isLoadingResult={isLoadingResult}
          results={results}
          summary={summary}
          validation={validation}
        />
      ) : null}

      {activeTab === 'interpretation' ? (
        <>
          <SpirometryQualityWarning />
          <SpirometryInterpretationBox messages={interpretation} />
        </>
      ) : null}

      {activeTab === 'source' ? (
        <>
          {warnings.map((warning) => (
            <WarningBox key={warning} tone="amber" title="Uyarı" text={warning} />
          ))}
          <WarningBox
            tone="amber"
            title="CDC büyüme verisi"
            text={`${cdcGrowthSource.text} Kaynak: ${cdcGrowthSource.url}`}
          />
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Kaynak</Text>
            <Text style={styles.paragraph}>{gliCoefficientMetadata.sourceText}</Text>
            {gliCoefficientMetadata.notes.map((note) => (
              <Text key={note} style={styles.bullet}>• {note}</Text>
            ))}
          </View>
        </>
      ) : null}

      <Text style={styles.footer}>
        Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
      </Text>
    </ScrollView>
  );
}

function SpirometryInlineResults({
  canCalculate,
  gliResult,
  isLoadingResult,
  results,
  summary,
  validation,
}: {
  canCalculate: boolean;
  gliResult: GliSpirometryResult | null;
  isLoadingResult: boolean;
  results: GliSpirometryResult['results'];
  summary: string;
  validation: SpirometryInputValidation;
}) {
  return (
    <View style={styles.inlineResultSection}>
      <Text style={styles.inlineResultTitle}>Hesap sonucu</Text>
      <ValidationMessages validation={validation} />
      {!canCalculate ? null : results.length > 0 ? (
        <>
          {isLoadingResult ? (
            <WarningBox tone="amber" title="Hesaplanıyor" text="GLI referans motoru çalışıyor." />
          ) : null}
          {results.every((result) => result.predicted === null) ? (
            <WarningBox
              title="GLI referans motoru bağlanmadı"
              text={gliResult?.warnings.join(' ') || 'Resmi GLI API endpoint’i veya katsayı motoru bağlanmadan predicted, LLN, z-skor veya % beklenen hesaplanmaz.'}
            />
          ) : null}
          {gliResult ? <GliValidationStatusBox result={gliResult} /> : null}
          <View style={styles.cardList}>
            {results.map((result) => (
              <SpirometryResultCard key={result.parameter} result={result} />
            ))}
          </View>
          <CopySpirometrySummaryButton summary={summary} />
        </>
      ) : (
        <WarningBox
          tone="amber"
          title="Girdi gerekli"
          text="Yaş ve boy girildiğinde beklenen değerler aynı ekranda burada gösterilir."
        />
      )}
    </View>
  );
}

function ValidationMessages({
  validation,
}: {
  validation: SpirometryInputValidation;
}) {
  return (
    <>
      {validation.blocking.map((message) => (
        <WarningBox key={message} title="Hesaplama durduruldu" text={message} />
      ))}
      {validation.amber.map((message) => (
        <WarningBox key={message} tone="amber" title="Veri kontrolü" text={message} />
      ))}
    </>
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

function buildSummary({
  ageMonths,
  heightCm,
  mode,
  observed,
  referenceLabel,
  results,
  sex,
}: {
  ageMonths: string;
  heightCm: string;
  mode: SpirometryMode;
  observed: ObservedValues;
  referenceLabel: string;
  results: GliSpirometryResult['results'];
  sex: Sex;
}) {
  const sexLabel = sex === 'female' ? 'Kız' : 'Erkek';
  const prefix =
    mode === 'interpret' ? 'Spirometri GLI özeti' : 'Spirometri GLI normal değer özeti';

  const resultText = results.length
    ? results
        .map((result) => {
          const label = result.parameter === 'FEV1_FVC' ? 'FEV1/FVC' : result.parameter;
          if (!result.predicted) return `${label}: GLI referans motoru bağlanmadı`;
          return `${label}: beklenen ${result.predicted.toFixed(2)}, LLN ${result.lln?.toFixed(2) ?? '—'}, z ${result.zScore?.toFixed(2) ?? '—'}`;
        })
        .join('. ')
    : 'Hesaplama sonucu yok';

  const observedText =
    mode === 'interpret'
      ? ` Ölçülenler: FEV1 ${observed.fev1 || '—'} L, FVC ${observed.fvc || '—'} L, FEV1/FVC ${observed.fev1Fvc || '—'}, MEF25–75 ${observed.fef25_75 || '—'} L/s.`
      : '';

  return `${prefix}: ${sexLabel}, ${ageMonths || '—'} ay, boy ${heightCm || '—'} cm, referans ${referenceLabel}.${observedText} ${resultText}. Test kalitesi ve klinik bağlamla yorumlanmalıdır.`;
}

function GliValidationStatusBox({ result }: { result: GliSpirometryResult }) {
  const status = result.validationStatus ?? (result.results.every((item) => item.predicted === null) ? 'unavailable' : result.engine);
  const title =
    status === 'official_api'
      ? 'GLI motor durumu: resmi API'
      : status === 'local_coefficients'
        ? 'GLI motor durumu: yerel katsayı'
        : 'GLI motor durumu: kullanılamıyor';
  const text =
    result.validationMessage ??
    (status === 'official_api'
      ? 'Sonuç resmi GLI backend/proxy yanıtından geldi.'
      : status === 'local_coefficients'
        ? 'Sonuç yerel katsayı motorundan geldi; resmi GLI örnekleriyle validasyon gereklidir.'
        : 'Predicted, LLN, z-skor veya % beklenen hesaplanmadı.');

  return (
    <View style={[styles.statusPanel, status === 'official_api' ? styles.statusPanelOfficial : undefined]}>
      <Text style={[styles.statusTitle, status === 'official_api' ? styles.statusTitleOfficial : undefined]}>
        {title}
      </Text>
      <Text style={styles.statusText}>{text}</Text>
      {status === 'local_coefficients' ? (
        <Text style={styles.statusWarning}>
          Validasyon gerekli: yerel GLI motoru resmi GLI hesaplayıcı örnekleriyle çapraz kontrol edilmeden klinik karar için tek başına kullanılmamalıdır.
        </Text>
      ) : null}
    </View>
  );
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
    gap: 12,
    padding: 14,
  },
  panelTitle: {
    color: '#211f1f',
    fontSize: 16,
    fontWeight: '900',
  },
  referenceText: {
    color: '#211f1f',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 21,
  },
  referenceNote: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
  },
  cardList: {
    gap: 10,
  },
  inlineResultSection: {
    gap: 12,
  },
  inlineResultTitle: {
    color: '#211f1f',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
  },
  paragraph: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 21,
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
    paddingTop: 2,
    textAlign: 'center',
  },
  statusPanel: {
    backgroundColor: '#fff7e6',
    borderColor: '#f0c36a',
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
    padding: 12,
  },
  statusPanelOfficial: {
    backgroundColor: '#e8f5ed',
    borderColor: '#b9e1c6',
  },
  statusTitle: {
    color: '#8a5a00',
    fontSize: 14,
    fontWeight: '900',
  },
  statusTitleOfficial: {
    color: '#1d6b3a',
  },
  statusText: {
    color: '#211f1f',
    fontSize: 13,
    lineHeight: 18,
  },
  statusWarning: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
  },
});
