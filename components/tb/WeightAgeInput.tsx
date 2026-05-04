import { StyleSheet, Text, TextInput, View } from 'react-native';
import { tbColors } from './theme';

export function WeightAgeInput({
  ageYears,
  ageMonths,
  weightKg,
  onAgeYearsChange,
  onAgeMonthsChange,
  onWeightKgChange,
}: {
  ageYears: string;
  ageMonths: string;
  weightKg: string;
  onAgeYearsChange: (value: string) => void;
  onAgeMonthsChange: (value: string) => void;
  onWeightKgChange: (value: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Yaş ve kilo</Text>
      <Text style={styles.note}>
        Gerçek hasta kimliği girmeyin. Bu alanlar yalnızca geçici doz hesabı içindir.
      </Text>
      <View style={styles.row}>
        <LabeledInput
          label="Yaş (yıl)"
          value={ageYears}
          onChangeText={onAgeYearsChange}
          placeholder="örn. 4"
        />
        <LabeledInput
          label="Ay"
          value={ageMonths}
          onChangeText={onAgeMonthsChange}
          placeholder="örn. 6"
        />
      </View>
      <LabeledInput
        label="Kilo (kg)"
        value={weightKg}
        onChangeText={onWeightKgChange}
        placeholder="örn. 18"
      />
    </View>
  );
}

function LabeledInput({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType="decimal-pad"
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8b8b8b"
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tbColors.card,
    borderColor: tbColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 11,
    padding: 14,
  },
  title: {
    color: tbColors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  note: {
    color: tbColors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  inputWrap: {
    flex: 1,
    gap: 6,
  },
  label: {
    color: tbColors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  input: {
    backgroundColor: tbColors.white,
    borderColor: '#dddddf',
    borderRadius: 8,
    borderWidth: 1,
    color: tbColors.text,
    fontSize: 16,
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
