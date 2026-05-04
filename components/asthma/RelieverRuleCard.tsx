import { StyleSheet, Text, View } from 'react-native';

export function RelieverRuleCard({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {items.map((item) => (
        <View key={item} style={styles.row}>
          <View style={styles.dot} />
          <Text style={styles.text}>{item}</Text>
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
    gap: 9,
    padding: 14,
  },
  title: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 9,
  },
  dot: {
    backgroundColor: '#8f1d2c',
    borderRadius: 4,
    height: 8,
    marginTop: 7,
    width: 8,
  },
  text: {
    color: '#211f1f',
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
