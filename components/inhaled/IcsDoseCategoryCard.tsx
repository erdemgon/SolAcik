import { StyleSheet, Text, View } from 'react-native';
import type { IcsDoseCategory } from '../../data/icsDoseCategories';

export function IcsDoseCategoryCard({ row }: { row: IcsDoseCategory }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{row.molecule}</Text>
      <Text style={styles.age}>{row.ageGroup}</Text>
      <View style={styles.grid}>
        <Dose label="Düşük" value={row.low} />
        <Dose label="Orta" value={row.medium} />
        <Dose label="Yüksek" value={row.high} />
      </View>
      <Text style={styles.note}>GINA 2025 temelli — 2026 güncellemesi bekleniyor.</Text>
      <Text style={styles.note}>{row.note}</Text>
    </View>
  );
}

function Dose({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.doseBox}>
      <Text style={styles.doseLabel}>{label}</Text>
      <Text style={styles.doseValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 14,
  },
  title: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  age: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  doseBox: {
    backgroundColor: '#fff',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    flexGrow: 1,
    minWidth: 105,
    padding: 10,
  },
  doseLabel: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '900',
  },
  doseValue: {
    color: '#211f1f',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 4,
  },
  note: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 17,
  },
});
