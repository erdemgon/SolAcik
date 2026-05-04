import { Pressable, StyleSheet, Text, View } from 'react-native';

export type AsthmaAgeOption = {
  label: string;
  value: '0-5' | '6-11' | '12plus' | 'all';
};

export function AsthmaAgeSelector({
  options,
  selected,
  onSelect,
}: {
  options: AsthmaAgeOption[];
  selected: AsthmaAgeOption['value'];
  onSelect: (value: AsthmaAgeOption['value']) => void;
}) {
  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Yaş grubu</Text>
      <View style={styles.wrap}>
        {options.map((option) => {
          const isSelected = option.value === selected;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              key={option.value}
              onPress={() => onSelect(option.value)}
              style={({ pressed }) => [
                styles.chip,
                isSelected ? styles.selected : undefined,
                pressed ? styles.pressed : undefined,
              ]}
            >
              <Text style={[styles.text, isSelected ? styles.selectedText : undefined]}>
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
  text: {
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
