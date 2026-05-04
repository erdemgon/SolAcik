import { StyleSheet, Text, View } from 'react-native';
import { GliSpirometryParameterResult } from '../../utils/spirometry/gliTypes';

const labels = {
  FEV1: 'FEV1',
  FVC: 'FVC',
  FEV1_FVC: 'FEV1/FVC',
  FEF25_75: 'MEF25–75 / FEF25–75',
};

export function SpirometryResultCard({ result }: { result: GliSpirometryParameterResult }) {
  const status = result.interpretation;
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{labels[result.parameter]}</Text>
        <Text style={[styles.status, status.includes('LLN') ? styles.low : undefined]}>
          {status}
        </Text>
      </View>

      <View style={styles.grid}>
        <Metric label="Beklenen" value={formatValue(result.predicted, result.unit)} />
        <Metric label="LLN" value={formatValue(result.lln, result.unit)} />
        <Metric label="ULN" value={formatValue(result.uln ?? null, result.unit)} />
        <Metric label="Ölçülen" value={formatValue(result.measured ?? null, result.unit)} />
        <Metric
          label="% beklenen"
          value={result.percentPredicted ? `${Math.round(result.percentPredicted)}%` : '—'}
        />
        <Metric
          label="z-skor"
          value={result.zScore !== null && result.zScore !== undefined ? result.zScore.toFixed(2) : '—'}
        />
      </View>

      {result.warning ? <Text style={styles.warning}>{result.warning}</Text> : null}
      {result.parameter === 'FEF25_75' ? (
        <Text style={styles.note}>
          MEF25–75 değişkenliği yüksek olduğundan tek başına karar parametresi değildir.
        </Text>
      ) : null}
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function formatValue(
  value: number | null | undefined,
  unit: GliSpirometryParameterResult['unit'],
) {
  if (value === null || value === undefined) return '—';
  if (unit === 'ratio') return `${value.toFixed(2)} (${Math.round(value * 100)}%)`;
  return `${value.toFixed(2)} ${unit}`;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  title: {
    color: '#211f1f',
    flex: 1,
    fontSize: 18,
    fontWeight: '900',
  },
  status: {
    backgroundColor: '#ececef',
    borderRadius: 999,
    color: '#686868',
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  low: {
    backgroundColor: '#f9e9ec',
    color: '#8f1d2c',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metric: {
    backgroundColor: '#fff',
    borderColor: '#e1e1e4',
    borderRadius: 8,
    borderWidth: 1,
    flexGrow: 1,
    minWidth: 96,
    padding: 10,
  },
  metricLabel: {
    color: '#686868',
    fontSize: 11,
    fontWeight: '800',
  },
  metricValue: {
    color: '#211f1f',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 3,
  },
  warning: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
  },
  note: {
    color: '#686868',
    fontSize: 13,
    lineHeight: 18,
  },
});
