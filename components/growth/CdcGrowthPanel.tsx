import { StyleSheet, Text, View } from 'react-native';
import type { GrowthResult } from '../../utils/growth/cdcGrowth';

export function CdcGrowthPanel({
  ageYearsDecimal,
  results,
  showWeightPrompt,
}: {
  ageYearsDecimal: number | null;
  results: GrowthResult[];
  showWeightPrompt: boolean;
}) {
  return (
    <View style={styles.panel}>
      <Text style={styles.title}>CDC büyüme hesaplaması</Text>
      {ageYearsDecimal !== null ? (
        <Text style={styles.note}>Ondalık yaş: {ageYearsDecimal.toFixed(2)} yıl</Text>
      ) : null}
      {showWeightPrompt ? (
        <Text style={styles.note}>
          Ağırlık girildiğinde ağırlık ve VKİ persentil/z-skoru da hesaplanır.
        </Text>
      ) : null}
      {results.length > 0 ? (
        results.map((result) => <GrowthResultRow key={result.metric} result={result} />)
      ) : (
        <Text style={styles.note}>CDC hesaplaması için yaş ve boy girin.</Text>
      )}
      <Text style={styles.warning}>
        CDC 2000 büyüme eğrileri 2-20 yaş için referans araçtır; tek başına klinik
        karar değildir.
      </Text>
    </View>
  );
}

function GrowthResultRow({ result }: { result: GrowthResult }) {
  return (
    <View style={styles.resultCard}>
      <Text style={styles.resultTitle}>{result.label}</Text>
      <Text style={styles.resultValue}>
        {formatNumber(result.value, result.metric === 'bmi' ? 1 : 1)} {result.unit}
      </Text>
      {result.zScore !== null && result.percentile !== null ? (
        <Text style={styles.resultMeta}>
          Persentil {formatPercentile(result.percentile)} • z-skor {result.zScore.toFixed(2)}
        </Text>
      ) : (
        <Text style={styles.resultMeta}>{result.warning ?? 'Hesaplanamadı'}</Text>
      )}
    </View>
  );
}

function formatNumber(value: number, digits: number) {
  return value.toFixed(digits);
}

function formatPercentile(value: number) {
  if (value < 0.1) return '<0.1';
  if (value > 99.9) return '>99.9';
  return value.toFixed(1);
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 14,
  },
  title: {
    color: '#211f1f',
    fontSize: 16,
    fontWeight: '900',
  },
  note: {
    color: '#686868',
    fontSize: 13,
    lineHeight: 19,
  },
  warning: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderColor: '#dedee2',
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    padding: 11,
  },
  resultTitle: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '900',
  },
  resultValue: {
    color: '#8f1d2c',
    fontSize: 18,
    fontWeight: '900',
  },
  resultMeta: {
    color: '#343131',
    fontSize: 13,
    fontWeight: '800',
  },
});
