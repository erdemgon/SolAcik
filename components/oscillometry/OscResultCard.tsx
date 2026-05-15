import { StyleSheet, Text, View } from 'react-native';
import { OscResultItem } from '../../src/modules/oscillometry/referenceEngines/types';
import { parameterLabel } from '../../utils/oscillometry/oscInterpretation';

export function OscResultCard({ item }: { item: OscResultItem }) {
  const abnormal = item.interpretation === 'high' || item.interpretation === 'low';

  return (
    <View style={[styles.card, abnormal ? styles.cardAbnormal : undefined]}>
      <View style={styles.header}>
        <Text style={styles.title}>{parameterLabel(item.parameter)}</Text>
        <Text style={[styles.badge, abnormal ? styles.badgeAbnormal : undefined]}>
          {statusLabel(item.interpretation)}
        </Text>
      </View>
      <View style={styles.grid}>
        <Metric label="Ölçülen" value={format(item.measured, item.unit)} />
        <Metric label="Beklenen" value={format(item.predicted, item.unit)} />
        <Metric label="LLN" value={format(item.lln, item.unit)} />
        <Metric label="ULN" value={format(item.uln, item.unit)} />
        <Metric label="% beklenen" value={item.percentPredicted ? `${Math.round(item.percentPredicted)}%` : '—'} />
        <Metric label="z-skor" value={item.zScore !== null ? item.zScore.toFixed(2) : '—'} />
      </View>
      <Text style={styles.message}>{item.messageTr}</Text>
      <Text style={styles.source}>{item.sourceReferenceSet.label}</Text>
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

function statusLabel(status: OscResultItem['interpretation']) {
  if (status === 'high') return 'Yüksek';
  if (status === 'low') return 'Düşük';
  if (status === 'normal') return 'Normal';
  return 'Referans yok';
}

function format(value: number | null | undefined, unit: OscResultItem['unit']) {
  if (value === null || value === undefined) return '—';
  return `${value.toFixed(3)} ${unit}`;
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
  cardAbnormal: {
    backgroundColor: '#fff8f0',
    borderColor: '#efcfaa',
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
    fontSize: 17,
    fontWeight: '900',
  },
  badge: {
    backgroundColor: '#ececef',
    borderRadius: 999,
    color: '#686868',
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  badgeAbnormal: {
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
    fontSize: 14,
    fontWeight: '900',
    marginTop: 3,
  },
  message: {
    color: '#211f1f',
    fontSize: 13,
    lineHeight: 18,
  },
  source: {
    color: '#686868',
    fontSize: 11,
    fontWeight: '700',
  },
});
