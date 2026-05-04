import { StyleSheet, Text } from 'react-native';
import type { InhaledMedication } from '../../data/inhaledMedications';

export function MartBadge({ status }: { status: InhaledMedication['martStatus'] }) {
  const tone =
    status === 'MART uygun'
      ? styles.green
      : status === 'MART potansiyeli var / doğrula'
        ? styles.amber
        : status === 'MART değil'
          ? styles.gray
          : styles.red;

  return <Text style={[styles.badge, tone]}>{status}</Text>;
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  green: {
    backgroundColor: '#e7f5ed',
    color: '#166534',
  },
  amber: {
    backgroundColor: '#fff7e6',
    color: '#8a5a00',
  },
  gray: {
    backgroundColor: '#eeeeef',
    color: '#5f6268',
  },
  red: {
    backgroundColor: '#f9e9ec',
    color: '#8f1d2c',
  },
});
