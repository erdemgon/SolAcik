import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { InhaledMedication } from '../../data/inhaledMedications';

const columns = [
  { key: 'drug', title: 'İlaç', width: 280 },
  { key: 'dose', title: 'Doz', width: 360 },
  { key: 'age', title: 'Yaş', width: 170 },
  { key: 'device', title: 'Cihaz', width: 220 },
  { key: 'smart', title: 'SMART', width: 86 },
] as const;

export function FullMedicationTable({ meds }: { meds: InhaledMedication[] }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Tam tablo</Text>
      <Text style={styles.subtitle}>
        Sade görünüm: etken madde, Türkiye ticari ad örnekleri, doz ve SMART/MART uygunluğu.
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View style={styles.table}>
          <View style={[styles.row, styles.headerRow]}>
            {columns.map((column) => (
              <Text
                key={column.key}
                style={[styles.cell, styles.headerCell, { width: column.width }]}
              >
                {column.title}
              </Text>
            ))}
          </View>
          {meds.map((med) => (
            <View key={med.id} style={styles.row}>
              <Text style={[styles.cell, styles.drugCell, { width: columns[0].width }]}>
                {med.genericName}{' '}
                <Text style={styles.brandText}>({med.brandExamples.join(', ')})</Text>
              </Text>
              <Text style={[styles.cell, { width: columns[1].width }]}>
                {med.usualDoseText}
              </Text>
              <Text style={[styles.cell, { width: columns[2].width }]}>{med.ageLabel}</Text>
              <Text style={[styles.cell, { width: columns[3].width }]}>
                {med.deviceTypes.join(', ')}
              </Text>
              <View style={[styles.smartCell, { width: columns[4].width }]}>
                <Text style={[styles.smartMark, getSmartStyle(med.martStatus)]}>
                  {getSmartSymbol(med.martStatus)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function getSmartSymbol(status: InhaledMedication['martStatus']) {
  if (status === 'MART uygun') return '+';
  if (status === 'MART potansiyeli var / doğrula') return '±';
  return '-';
}

function getSmartStyle(status: InhaledMedication['martStatus']) {
  if (status === 'MART uygun') return styles.smartPositive;
  if (status === 'MART potansiyeli var / doğrula') return styles.smartMaybe;
  return styles.smartNegative;
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
  title: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  subtitle: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  table: {
    minWidth: 1116,
  },
  row: {
    borderBottomColor: '#e7e7e9',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  headerRow: {
    backgroundColor: '#f9e9ec',
  },
  cell: {
    color: '#211f1f',
    fontSize: 12,
    lineHeight: 17,
    padding: 9,
  },
  headerCell: {
    color: '#8f1d2c',
    fontWeight: '900',
  },
  drugCell: {
    fontWeight: '900',
  },
  brandText: {
    color: '#5f6f4f',
    fontWeight: '700',
  },
  smartCell: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
  smartMark: {
    borderRadius: 8,
    fontSize: 18,
    fontWeight: '900',
    minWidth: 36,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
  },
  smartPositive: {
    backgroundColor: '#e7f5ed',
    color: '#166534',
  },
  smartMaybe: {
    backgroundColor: '#fff7e6',
    color: '#8a5a00',
  },
  smartNegative: {
    backgroundColor: '#eeeeef',
    color: '#5f6268',
  },
});
