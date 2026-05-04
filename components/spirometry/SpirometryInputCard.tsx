import { StyleSheet, Text, TextInput, View } from 'react-native';

export function SpirometryInputCard({
  ageMonths,
  heightCm,
  weightKg,
  onAgeMonths,
  onHeightCm,
  onWeightKg,
}: {
  ageMonths: string;
  heightCm: string;
  weightKg: string;
  onAgeMonths: (value: string) => void;
  onHeightCm: (value: string) => void;
  onWeightKg: (value: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Yaş, boy ve ağırlık</Text>
      <View style={styles.row}>
        <Field label="Yaş (ay)" value={ageMonths} onChangeText={onAgeMonths} />
        <Field label="Boy (cm)" value={heightCm} onChangeText={onHeightCm} />
      </View>
      <Field label="Ağırlık (kg, opsiyonel)" value={weightKg} onChangeText={onWeightKg} />
    </View>
  );
}

function Field({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType="decimal-pad"
        onChangeText={onChangeText}
        placeholder="0"
        placeholderTextColor="#999"
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  title: {
    color: '#211f1f',
    fontSize: 16,
    fontWeight: '900',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  field: {
    flex: 1,
    gap: 6,
  },
  label: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '800',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#dddddf',
    borderRadius: 8,
    borderWidth: 1,
    color: '#211f1f',
    fontSize: 16,
    minHeight: 44,
    paddingHorizontal: 12,
  },
});
