import { StyleSheet, Text, View } from 'react-native';

export function SourceVersionBadge({ text, compact = false }: { text: string; compact?: boolean }) {
  return (
    <View style={[styles.badge, compact ? styles.compactBadge : undefined]}>
      <Text style={[styles.text, compact ? styles.compactText : undefined]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  compactBadge: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  text: {
    color: '#8f1d2c',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
  },
  compactText: {
    fontSize: 12,
    lineHeight: 17,
  },
});
