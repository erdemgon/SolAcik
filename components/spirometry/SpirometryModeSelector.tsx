import { Pressable, StyleSheet, Text, View } from 'react-native';

export type SpirometryMode = 'predicted' | 'interpret';

export function SpirometryModeSelector({
  selected,
  onSelect,
}: {
  selected: SpirometryMode;
  onSelect: (mode: SpirometryMode) => void;
}) {
  return (
    <View style={styles.wrap}>
      {[
        { label: 'Sadece normal değer', value: 'predicted' as const },
        { label: 'Sonuç yorumla', value: 'interpret' as const },
      ].map((option) => (
        <Pressable
          accessibilityRole="button"
          key={option.value}
          onPress={() => onSelect(option.value)}
          style={[styles.chip, selected === option.value ? styles.selected : undefined]}
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
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 42,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  selected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  text: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '800',
  },
  selectedText: {
    color: '#fff',
  },
});
