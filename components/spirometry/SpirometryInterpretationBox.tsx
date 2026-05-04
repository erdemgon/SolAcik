import { StyleSheet, Text, View } from 'react-native';

export function SpirometryInterpretationBox({ messages }: { messages: string[] }) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Yorum notları</Text>
      {messages.map((message) => (
        <Text key={message} style={styles.text}>
          • {message}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff7e6',
    borderColor: '#f0c36a',
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 13,
  },
  title: {
    color: '#8a5a00',
    fontSize: 15,
    fontWeight: '900',
  },
  text: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
});
