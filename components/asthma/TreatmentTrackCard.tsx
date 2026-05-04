import { StyleSheet, Text, View } from 'react-native';

export function TreatmentTrackCard({
  title,
  summary,
  items,
}: {
  title: string;
  summary: string;
  items: string[];
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.summary}>{summary}</Text>
      {items.map((item) => (
        <Text key={item} style={styles.item}>
          {item}
        </Text>
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
    gap: 8,
    padding: 14,
  },
  title: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  summary: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  item: {
    color: '#686868',
    fontSize: 13,
    lineHeight: 18,
  },
});
