import { StyleSheet, Text, View } from 'react-native';

const rows = [
  ['0–3 yaş', 'pMDI + spacer + maske veya nebül'],
  ['4–5 yaş', 'pMDI + spacer; beceriye göre ağızlık; nebül seçeneği'],
  ['6–11 yaş', 'pMDI + spacer, DPI/Turbuhaler/Diskus ancak teknik yeterliyse'],
  ['≥12 yaş', 'pMDI, DPI, Turbuhaler, Diskus; teknik ve tercih kontrolü'],
  ['Her kontrol', 'İnhaler tekniğini gösterterek değerlendir.'],
];

export function DeviceSelectionGuide() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Cihaz seçimi hatırlatıcı</Text>
      {rows.map(([age, note]) => (
        <View key={age} style={styles.row}>
          <Text style={styles.age}>{age}</Text>
          <Text style={styles.note}>{note}</Text>
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
    backgroundColor: '#fff',
    borderRadius: 8,
    gap: 3,
    padding: 10,
  },
  age: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '900',
  },
  note: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
});
