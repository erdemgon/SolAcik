import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import { CftrVariantInput } from '../components/cftr/CftrVariantInput';
import { EligibilityResultCard } from '../components/cftr/EligibilityResultCard';
import {
  RegionSelection,
  RegionSelector,
} from '../components/cftr/RegionSelector';
import { VariantNormalizationNote } from '../components/cftr/VariantNormalizationNote';
import {
  cftrSourceBadge,
} from '../data/cftr/modulatorEligibilityRules';
import { checkModulatorEligibility } from '../utils/cftr/checkModulatorEligibility';
import { normalizeCftrVariant } from '../utils/cftr/normalizeCftrVariant';

type TabKey = 'eligibility' | 'variant' | 'result' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'eligibility', label: 'Uygunluk' },
  { key: 'variant', label: 'Varyant Bilgisi' },
  { key: 'result', label: 'Sonuç' },
  { key: 'source', label: 'Uyarılar & Kaynak' },
];

const sourceWarnings = [
  'Bu modül yalnızca ön kontrol sağlar.',
  'Uygunluk ülkeye, ruhsata, geri ödeme koşullarına ve güncel etikete göre değişebilir.',
  'İlaç başlamadan önce karaciğer fonksiyonları, ilaç etkileşimleri, katarakt izlemi, gebelik/emzirme, karaciğer hastalığı ve diğer klinik durumlar değerlendirilmelidir.',
  'TRIKAFTA/KAFTRIO ve ALYFTREK farklı yaş ve ülke etiketlerine sahip olabilir.',
  'Varyant listeleri düzenli güncellenmelidir.',
  'Bu uygulama Vertex veya başka bir firma tarafından onaylanmış değildir.',
];

export function CftrModulatorScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('eligibility');
  const [ageYears, setAgeYears] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [region, setRegion] = useState<RegionSelection>('All');
  const [variant1, setVariant1] = useState('');
  const [variant2, setVariant2] = useState('');
  const [exactReportText, setExactReportText] = useState('');

  const parsedAge = parseOptionalNumber(ageYears);
  const normalizedVariants = useMemo(
    () =>
      [variant1, variant2]
        .map(normalizeCftrVariant)
        .filter((variant): variant is NonNullable<typeof variant> => variant !== null),
    [variant1, variant2],
  );

  const results = useMemo(
    () =>
      checkModulatorEligibility({
        ageYears: parsedAge,
        variant1,
        variant2,
        selectedRegion: region,
      }),
    [parsedAge, region, variant1, variant2],
  );

  const copyText = buildCopyText({
    ageYears,
    variant1,
    variant2,
    results,
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Kistik fibrozis</Text>
        <Text style={styles.title}>
          CFTR Modülatör Uygunluğu: Trikafta/Kaftrio ve Alyftrek için Yaş–Varyant Ön Kontrolü
        </Text>
        <Text style={styles.description}>
          Yaş ve CFTR varyantlarına göre eğitim amaçlı ön uygunluk kontrolü. Hasta
          kimliği toplanmaz, varyantlar dış servise gönderilmez.
        </Text>
      </View>

      <SourceVersionBadge text={cftrSourceBadge} />

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

      {activeTab === 'eligibility' ? (
        <>
          <RegionSelector selected={region} onSelect={setRegion} />
          <CftrVariantInput
            ageYears={ageYears}
            weightKg={weightKg}
            variant1={variant1}
            variant2={variant2}
            exactReportText={exactReportText}
            onAgeYears={setAgeYears}
            onWeightKg={setWeightKg}
            onVariant1={setVariant1}
            onVariant2={setVariant2}
            onExactReportText={setExactReportText}
          />
          {weightKg.trim() ? (
            <Text style={styles.smallNote}>
              Kilo bilgisi bu ön uygunluk kontrolünde doz hesaplaması için kullanılmaz.
            </Text>
          ) : null}
          <VariantNormalizationNote variants={normalizedVariants} />
          <InlineResultSection
            copyText={copyText}
            results={results}
            variant1={variant1}
            variant2={variant2}
          />
        </>
      ) : null}

      {activeTab === 'variant' ? (
        <>
          <VariantNormalizationNote variants={normalizedVariants} />
          <InfoCard
            title="Varyant yazımı"
            items={[
              'CFTR varyantları farklı formatlarda yazılabilir.',
              'Örnekler: F508del, G551D, N1303K, 3849+10kbC>T.',
              'c.1521_1523delCTT / p.Phe508del yazımları F508del ile eşleştirilebilir.',
              'HGVS nomenklatürü ve genetik rapor esas alınmalıdır.',
              'Belirsiz yazımlarda CFTR2, ClinVar/CFTR-France veya uzman genetik değerlendirme ile doğrulama gerekir.',
            ]}
          />
        </>
      ) : null}

      {activeTab === 'result' ? (
        <InlineResultSection
          copyText={copyText}
          results={results}
          variant1={variant1}
          variant2={variant2}
        />
      ) : null}

      {activeTab === 'source' ? (
        <>
          {sourceWarnings.map((warning) => (
            <WarningBox key={warning} tone="amber" title="Uyarı" text={warning} />
          ))}
          <InfoCard
            title="Yerel data dosyaları"
            items={[
              'Varyant alias dosyası: data/cftr/cftrVariantAliases.ts',
              'Uygunluk kuralları: data/cftr/modulatorEligibilityRules.ts',
              'Responsive variant seed listesi: data/cftr/sampleResponsiveVariants.ts',
              'Tam responsive mutation listeleri resmi ürün bilgisi kaynak tarihiyle kürate edilmelidir.',
            ]}
          />
          <Text style={styles.footer}>
            Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
          </Text>
        </>
      ) : null}
    </ScrollView>
  );
}

function InlineResultSection({
  copyText,
  results,
  variant1,
  variant2,
}: {
  copyText: string;
  results: ReturnType<typeof checkModulatorEligibility>;
  variant1: string;
  variant2: string;
}) {
  return (
    <View style={styles.resultSection}>
      <Text style={styles.resultSectionTitle}>Ön uygunluk sonucu</Text>
      {!variant1.trim() && !variant2.trim() ? (
        <WarningBox
          tone="amber"
          title="Varyant gerekli"
          text="CFTR varyantı girilmeden uygunluk değerlendirilemez. Varyant yazınca TRIKAFTA/KAFTRIO, ALYFTREK ve yerel koşul kartları burada güncellenir."
        />
      ) : null}
      <WarningBox
        tone="amber"
        title="Sonuç nasıl okunmalı?"
        text="Yeşil uygunluk, yalnızca seçilen FDA/EMA kaynak/veri dosyasına göre 'uygun olabilir' anlamına gelir. Yerel ruhsat, temin ve geri ödeme koşulları ayrıca doğrulanmalıdır."
      />
      <View style={styles.cardList}>
        {results.map((result) => (
          <EligibilityResultCard
            key={result.rule.id}
            result={result}
            summaryText={copyText}
          />
        ))}
      </View>
    </View>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoTitle}>{title}</Text>
      {items.map((item) => (
        <View key={item} style={styles.infoRow}>
          <View style={styles.dot} />
          <Text style={styles.infoText}>{item}</Text>
        </View>
      ))}
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

function parseOptionalNumber(value: string) {
  const normalized = value.replace(',', '.').trim();
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function buildCopyText({
  ageYears,
  variant1,
  variant2,
  results,
}: {
  ageYears: string;
  variant1: string;
  variant2: string;
  results: ReturnType<typeof checkModulatorEligibility>;
}) {
  const resultText = results
    .map((result) => `${result.drugName} ${result.rule.region}: ${result.status}; ${result.explanation}`)
    .join(' ');

  return `CFTR modülatör ön uygunluk özeti: Yaş ${ageYears || 'girilmedi'} yıl. Varyantlar: ${variant1 || 'boş'} / ${variant2 || 'boş'}. ${resultText} Bu çıktı reçete/geri ödeme kararı değildir; resmi ürün bilgisi, ülke etiketi ve uzman değerlendirmesi ile doğrulanmalıdır.`;
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
  smallNote: {
    color: '#686868',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
  resultSection: {
    gap: 12,
  },
  resultSectionTitle: {
    color: '#211f1f',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
  },
  cardList: {
    gap: 12,
  },
  infoCard: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 14,
  },
  infoTitle: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  infoRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 9,
  },
  dot: {
    backgroundColor: '#8f1d2c',
    borderRadius: 4,
    height: 8,
    marginTop: 7,
    width: 8,
  },
  infoText: {
    color: '#211f1f',
    flex: 1,
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
