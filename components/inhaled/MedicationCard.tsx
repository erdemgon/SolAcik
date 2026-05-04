import { StyleSheet, Text, View } from 'react-native';
import type { InhaledMedication } from '../../data/inhaledMedications';
import { CopyMedicationSummaryButton } from './CopyMedicationSummaryButton';

export function MedicationCard({
  med,
  selectedAgeLabel,
}: {
  med: InhaledMedication;
  selectedAgeLabel: string;
}) {
  const tradeNames = med.brandExamples.join(', ');
  const smartMark = getSmartMark(med.martStatus);
  const summary = `İnhale ilaç özeti: Yaş grubu ${selectedAgeLabel}. ${med.genericName} (${tradeNames}). Doz: ${med.usualDoseText} SMART/MART: ${smartMark.label}. Doz/ürün KÜB ve klinik durumla doğrulanmalıdır.`;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>
            {med.genericName} <Text style={styles.tradeNames}>({tradeNames})</Text>
          </Text>
          <Text style={styles.category}>{med.category} • {med.ageLabel}</Text>
        </View>
        <View style={[styles.smartBadge, smartMark.style]}>
          <Text style={[styles.smartSymbol, smartMark.textStyle]}>{smartMark.symbol}</Text>
          <Text style={[styles.smartLabel, smartMark.textStyle]}>SMART</Text>
        </View>
      </View>

      <View style={styles.quickGrid}>
        <Info label="Doz" value={med.usualDoseText} />
        <Info label="Form" value={`${med.deviceTypes.join(', ')} • ${med.strengths.join(', ')}`} />
      </View>
      {med.maxDoseText ? <Text style={styles.compactNote}>Üst sınır: {med.maxDoseText}</Text> : null}
      {med.martNote ? <Text style={styles.compactNote}>SMART/MART: {med.martNote}</Text> : null}
      {med.warning ? <Text style={styles.warning}>{med.warning}</Text> : null}
      <Text style={styles.source}>{med.sourceNote}</Text>
      <CopyMedicationSummaryButton summary={summary} />
    </View>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.info}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function getSmartMark(status: InhaledMedication['martStatus']) {
  if (status === 'MART uygun') {
    return {
      label: '+',
      symbol: '+',
      style: styles.smartPositive,
      textStyle: styles.smartPositiveText,
    };
  }

  if (status === 'MART potansiyeli var / doğrula') {
    return {
      label: '+/- doğrula',
      symbol: '±',
      style: styles.smartMaybe,
      textStyle: styles.smartMaybeText,
    };
  }

  return {
    label: '-',
    symbol: '-',
    style: styles.smartNegative,
    textStyle: styles.smartNegativeText,
  };
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 15,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  titleWrap: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: '#211f1f',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
  },
  tradeNames: {
    color: '#5f6f4f',
    fontSize: 15,
    fontWeight: '800',
  },
  category: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '800',
  },
  smartBadge: {
    alignItems: 'center',
    borderRadius: 8,
    minWidth: 58,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  smartPositive: {
    backgroundColor: '#e7f5ed',
  },
  smartMaybe: {
    backgroundColor: '#fff7e6',
  },
  smartNegative: {
    backgroundColor: '#eeeeef',
  },
  smartSymbol: {
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 20,
  },
  smartLabel: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0,
  },
  smartPositiveText: {
    color: '#166534',
  },
  smartMaybeText: {
    color: '#8a5a00',
  },
  smartNegativeText: {
    color: '#5f6268',
  },
  quickGrid: {
    gap: 8,
  },
  info: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  label: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '900',
  },
  value: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginTop: 3,
  },
  compactNote: {
    color: '#3f3f46',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
  },
  warning: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 19,
  },
  source: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
  },
});
