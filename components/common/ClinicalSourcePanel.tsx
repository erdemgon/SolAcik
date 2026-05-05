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
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  title: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 17,
  },
  meta: {
    color: '#5d5658',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 15,
  },
  disclaimer: {
    color: '#211f1f',
    fontSize: 11,
    lineHeight: 15,
  },
});
