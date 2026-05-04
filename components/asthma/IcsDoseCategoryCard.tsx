import { StyleSheet, Text, View } from 'react-native';
import type { AsthmaIcsDoseRow } from '../../data/asthma/gina2025IcsDoseCategories';

export function AsthmaIcsDoseCategoryCard({ row }: { row: AsthmaIcsDoseRow }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{row.molecule}</Text>
      <View style={styles.grid}>
        <Dose label="Düşük" value={row.low} />
        <Dose label="Orta" value={row.medium} />
        <Dose label="Yüksek" value={row.high} />
      </View>
    </View>
  );
}

function Dose({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 12,
  },
  title: {
    color: '#211f1f',
    fontSize: 16,
    fontWeight: '900',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  box: {
    backgroundColor: '#f5f5f6',
    borderRadius: 8,
    flexGrow: 1,
    minWidth: 100,
    padding: 9,
  },
  label: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '900',
  },
  value: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '900',
    marginTop: 3,
  },
});
