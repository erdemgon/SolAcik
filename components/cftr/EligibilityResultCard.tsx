import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import type { EligibilityResult } from '../../utils/cftr/checkModulatorEligibility';
import { CopyEligibilitySummaryButton } from './CopyEligibilitySummaryButton';

export function EligibilityResultCard({
  result,
  summaryText,
}: {
  result: EligibilityResult;
  summaryText: string;
}) {
  const tone = getTone(result.status);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{result.drugName}</Text>
        <Text style={[styles.badge, tone]}>{result.status}</Text>
      </View>
      <Text style={styles.meta}>
        {result.rule.region} • {result.rule.sourceVersion}
      </Text>
      <Info
        label="Yaş koşulu"
        value={
          result.ageKnown
            ? `≥${result.rule.minAgeYears} yıl — ${result.ageEligible ? 'sağlanıyor' : 'sağlanmıyor / doğrula'}`
            : `≥${result.rule.minAgeYears} yıl — yaş girilmedi / doğrula`
        }
      />
      <Info
        label="Varyant koşulu"
        value={
          result.variantEligible === true
            ? 'Yerel data setine göre karşılanıyor olabilir'
            : result.variantEligible === false
              ? 'Yerel data setine göre karşılanmıyor görünüyor'
              : 'Doğrulanmalı'
        }
      />
      <Text style={styles.explanation}>{result.explanation}</Text>
      {result.warnings.map((warning) => (
        <Text key={warning} style={styles.warning}>
          {warning}
        </Text>
      ))}
      <Text style={styles.source}>{result.rule.sourceNote}</Text>
      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={() => Linking.openURL('https://www.fda.gov/drugs')}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryText}>Resmi kaynakla doğrula</Text>
        </Pressable>
        <CopyEligibilitySummaryButton text={summaryText} />
      </View>
    </View>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.info}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function getTone(status: EligibilityResult['status']) {
  if (status === 'Uygun olabilir') return styles.green;
  if (status === 'Doğrulanmalı') return styles.amber;
  if (status === 'Yerel koşul doğrulanmalı') return styles.blue;
  return styles.gray;
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
  title: {
    color: '#211f1f',
    flex: 1,
    fontSize: 19,
    fontWeight: '900',
  },
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
  blue: {
    backgroundColor: '#e8f1fb',
    color: '#1d4f91',
  },
  meta: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '800',
  },
  info: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  infoLabel: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '900',
  },
  infoValue: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginTop: 3,
  },
  explanation: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  warning: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
  },
  source: {
    color: '#686868',
    fontSize: 12,
    lineHeight: 17,
  },
  actions: {
    gap: 8,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 42,
    padding: 10,
  },
  secondaryText: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '900',
  },
});
