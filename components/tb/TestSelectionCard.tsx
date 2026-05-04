import { StyleSheet, Text, View } from 'react-native';
import type { TbTestSelectionRule } from '../../data/tbRegimens';
import { tbColors } from './theme';

export function TestSelectionCard({ rule }: { rule: TbTestSelectionRule }) {
  return (
    <View style={styles.card}>
      <Text style={styles.condition}>{rule.condition}</Text>
      <Text style={styles.recommendation}>{rule.recommendation}</Text>
      <Text style={styles.note}>{rule.note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tbColors.white,
    borderColor: tbColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 7,
    padding: 13,
  },
  condition: {
    color: tbColors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  recommendation: {
    color: tbColors.accent,
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 20,
  },
  note: {
    color: tbColors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
});
