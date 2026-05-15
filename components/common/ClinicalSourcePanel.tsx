import { StyleSheet, Text, View } from 'react-native';
import type { ClinicalModuleMetadata } from '../../data/contentGovernance';

export function ClinicalSourcePanel({ metadata }: { metadata: ClinicalModuleMetadata }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.meta} numberOfLines={1}>
        {metadata.sourceTitle} · {metadata.sourceVersion} · Kontrol {metadata.lastCheckedDate} · Editör {metadata.clinicalEditor}
      </Text>
      <Text style={styles.disclaimer} numberOfLines={2}>{metadata.disclaimer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#fafafa',
    borderTopColor: '#eeeeef',
    borderTopWidth: 1,
    gap: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  meta: {
    color: '#8f1d2c',
    fontSize: 9,
    fontWeight: '700',
    lineHeight: 12,
    textAlign: 'center',
  },
  disclaimer: {
    color: '#686868',
    fontSize: 9,
    lineHeight: 12,
    textAlign: 'center',
  },
});
