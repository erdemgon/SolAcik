import { StyleSheet, Text, TextInput, View } from 'react-native';

export function CftrVariantInput({
  ageYears,
  weightKg,
  variant1,
  variant2,
  exactReportText,
  onAgeYears,
  onWeightKg,
  onVariant1,
  onVariant2,
  onExactReportText,
}: {
  ageYears: string;
  weightKg: string;
  variant1: string;
  variant2: string;
  exactReportText: string;
  onAgeYears: (value: string) => void;
  onWeightKg: (value: string) => void;
  onVariant1: (value: string) => void;
  onVariant2: (value: string) => void;
  onExactReportText: (value: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Yaş ve CFTR varyantları</Text>
      <Text style={styles.note}>
        Hasta adı, doğum tarihi, TC kimlik, protokol numarası veya iletişim bilgisi
        girmeyin. Bilgiler yalnızca geçici ekranda kullanılır.
      </Text>
      <View style={styles.row}>
        <Field label="Yaş (yıl)" value={ageYears} onChange={onAgeYears} placeholder="örn. 8" />
        <Field label="Kilo (kg, opsiyonel)" value={weightKg} onChange={onWeightKg} placeholder="örn. 24" />
      </View>
      <Field label="Varyant 1" value={variant1} onChange={onVariant1} placeholder="örn. F508del" />
      <Field label="Varyant 2" value={variant2} onChange={onVariant2} placeholder="örn. N1303K" />
      <Field
        label="Rapor yazımı notu (opsiyonel)"
        value={exactReportText}
        onChange={onExactReportText}
        placeholder="Varyant raporundaki yazımı aynen giriyorum"
      />
    </View>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        onChangeText={onChange}
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
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 11,
    padding: 14,
  },
  title: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  note: {
    color: '#686868',
    fontSize: 13,
    lineHeight: 18,
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
    color: '#211f1f',
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
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
