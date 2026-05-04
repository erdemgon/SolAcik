import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Sex } from '../../utils/spirometry/gliTypes';

export function SexSelector({
  selected,
  onSelect,
}: {
  selected: Sex;
  onSelect: (sex: Sex) => void;
}) {
  return (
    <View style={styles.row}>
      {[
        { label: 'Kız', value: 'female' as const },
        { label: 'Erkek', value: 'male' as const },
      ].map((option) => (
        <Pressable
          accessibilityRole="button"
          key={option.value}
          onPress={() => onSelect(option.value)}
          style={[styles.button, selected === option.value ? styles.selected : undefined]}
        >
          <Text style={[styles.text, selected === option.value ? styles.selectedText : undefined]}>
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minHeight: 44,
    padding: 11,
  },
  selected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  text: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '900',
  },
  selectedText: {
    color: '#fff',
  },
});
