import { Pressable, StyleSheet, Text, View } from 'react-native';

export function DeviceFilterChips({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <View style={styles.panel}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.wrap}>
        {options.map((option) => {
          const isSelected = option === selected;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              key={option}
              onPress={() => onSelect(option)}
              style={({ pressed }) => [
                styles.chip,
                isSelected ? styles.selected : undefined,
                pressed ? styles.pressed : undefined,
              ]}
            >
              <Text style={[styles.text, isSelected ? styles.selectedText : undefined]}>
                {option}
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
    gap: 10,
    padding: 14,
  },
  title: {
    color: '#211f1f',
    fontSize: 16,
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
    paddingHorizontal: 12,
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
