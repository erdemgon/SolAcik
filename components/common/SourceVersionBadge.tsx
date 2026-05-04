import { StyleSheet, Text, View } from 'react-native';

export function SourceVersionBadge({ text }: { text: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{text}</Text>
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
  text: {
    color: '#8f1d2c',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
  },
});
