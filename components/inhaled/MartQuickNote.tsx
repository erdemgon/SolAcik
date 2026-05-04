import { StyleSheet, Text, View } from 'react-native';

const notes = [
  'MART sadece ICS-formoterol kombinasyonları ile yapılır.',
  'Budesonid-formoterol ana seçenektir.',
  'Salmeterol veya vilanterol içeren kombinasyonlar MART değildir.',
  '6–11 yaşta budesonid-formoterol 80/4.5 için toplam maksimum 8 inhalasyon/gün.',
  '≥12 yaşta budesonid-formoterol 160/4.5 için toplam maksimum 12 inhalasyon/gün.',
  'Maksimum ihtiyacı olan hasta aynı gün tıbbi değerlendirme gerektirir.',
];

export function MartQuickNote() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>MART hızlı notu</Text>
      {notes.map((note) => (
        <View key={note} style={styles.row}>
          <View style={styles.dot} />
          <Text style={styles.text}>{note}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    gap: 9,
    padding: 14,
  },
  title: {
    color: '#8f1d2c',
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
