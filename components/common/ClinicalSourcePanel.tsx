import { StyleSheet, Text, View } from 'react-native';
import type { ClinicalModuleMetadata } from '../../data/contentGovernance';

export function ClinicalSourcePanel({ metadata }: { metadata: ClinicalModuleMetadata }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.title}>{metadata.sourceTitle}</Text>
      <Text style={styles.meta}>
        Kaynak sürümü: {metadata.sourceVersion} · Son kontrol: {metadata.lastCheckedDate}
      </Text>
      <Text style={styles.meta}>Klinik editör: {metadata.clinicalEditor}</Text>
      <Text style={styles.disclaimer}>{metadata.disclaimer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
    marginHorizontal: 18,
    marginTop: 12,
    padding: 12,
  },
  title: {
    color: '#8f1d2c',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 19,
  },
  meta: {
    color: '#5d5658',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },
  disclaimer: {
    color: '#211f1f',
    fontSize: 12,
    lineHeight: 17,
  },
});
