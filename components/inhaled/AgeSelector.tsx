import { Pressable, StyleSheet, Text, View } from 'react-native';

export type AgeOption = {
  label: string;
  ageMonths: number | null;
};

export function AgeSelector({
  options,
  selectedLabel,
  onSelect,
}: {
  options: AgeOption[];
  selectedLabel: string;
  onSelect: (option: AgeOption) => void;
}) {
  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Yaş seçimi</Text>
      <View style={styles.wrap}>
        {options.map((option) => {
          const selected = option.label === selectedLabel;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={option.label}
              onPress={() => onSelect(option)}
              style={({ pressed }) => [
                styles.chip,
                selected ? styles.selected : undefined,
                pressed ? styles.pressed : undefined,
              ]}
            >
              <Text style={[styles.chipText, selected ? styles.selectedText : undefined]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  title: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
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
  chipText: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '800',
  },
  selectedText: {
    color: '#fff',
  },
  pressed: {
    opacity: 0.72,
  },
});
