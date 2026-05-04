import { StyleSheet, Text, TextInput, View } from 'react-native';

export type ObservedValues = {
  fev1: string;
  fvc: string;
  fev1Fvc: string;
  fef25_75: string;
};

export function ObservedValueInputs({
  values,
  onChange,
}: {
  values: ObservedValues;
  onChange: (key: keyof ObservedValues, value: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ölçülen değerler</Text>
      <View style={styles.grid}>
        <Field label="FEV1 (L)" value={values.fev1} onChangeText={(value) => onChange('fev1', value)} />
        <Field label="FVC (L)" value={values.fvc} onChangeText={(value) => onChange('fvc', value)} />
        <Field
          label="FEV1/FVC (% veya oran)"
          value={values.fev1Fvc}
          onChangeText={(value) => onChange('fev1Fvc', value)}
        />
        <Field
          label="MEF25–75 (L/s)"
          value={values.fef25_75}
          onChangeText={(value) => onChange('fef25_75', value)}
        />
      </View>
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
  grid: {
    gap: 10,
  },
  field: {
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
