import { StyleSheet, Text, View } from 'react-native';
import type { NormalizedCftrVariant } from '../../utils/cftr/normalizeCftrVariant';

export function VariantNormalizationNote({
  variants,
}: {
  variants: NormalizedCftrVariant[];
}) {
  if (variants.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Varyant yazımı</Text>
        <Text style={styles.text}>
          Örnekler: F508del, G551D, N1303K, 3849+10kbC&gt;T,
          c.1521_1523delCTT / p.Phe508del. HGVS nomenklatürü ve genetik rapor
          esas alınmalıdır.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Normalize edilen varyantlar</Text>
      {variants.map((variant) => (
        <View key={`${variant.original}-${variant.canonicalName}`} style={styles.row}>
          <Text style={styles.variant}>{variant.original.trim()} → {variant.canonicalName}</Text>
          <Text style={styles.text}>{variant.note}</Text>
        </View>
      ))}
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
  row: {
    backgroundColor: '#fff',
    borderRadius: 8,
    gap: 4,
    padding: 10,
  },
  variant: {
    color: '#8f1d2c',
    fontSize: 14,
    fontWeight: '900',
  },
  text: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
});
