import { StyleSheet, Text, View } from 'react-native';

const COLORS = {
  red: { bg: '#f9e9ec', border: '#efcbd2', title: '#8f1d2c' },
  amber: { bg: '#fff7e6', border: '#f0c36a', title: '#8a5a00' },
};

export function WarningBox({
  title = 'Uyarı',
  text,
  tone = 'red',
}: {
  title?: string;
  text: string;
  tone?: 'red' | 'amber';
}) {
  const color = COLORS[tone];
  return (
    <View style={[styles.box, { backgroundColor: color.bg, borderColor: color.border }]}>
      <Text style={[styles.title, { color: color.title }]}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    padding: 13,
  },
  title: {
    fontSize: 15,
    fontWeight: '900',
  },
  text: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
});
