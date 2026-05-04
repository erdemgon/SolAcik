import { Pressable, StyleSheet, Text, View } from 'react-native';
import { tbColors } from './theme';

export function RegimenSelector<T extends { id: string; title: string }>({
  title,
  options,
  selectedId,
  onSelect,
}: {
  title: string;
  options: T[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.options}>
        {options.map((option) => {
          const selected = option.id === selectedId;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={option.id}
              onPress={() => onSelect(option.id)}
              style={({ pressed }) => [
                styles.option,
                selected ? styles.selected : undefined,
                pressed ? styles.pressed : undefined,
              ]}
            >
              <Text style={[styles.optionText, selected ? styles.selectedText : undefined]}>
                {option.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tbColors.card,
    borderColor: tbColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  title: {
    color: tbColors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  options: {
    gap: 8,
  },
  option: {
    backgroundColor: tbColors.white,
    borderColor: '#dddddf',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 44,
    padding: 12,
  },
  selected: {
    backgroundColor: tbColors.accent,
    borderColor: tbColors.accent,
  },
  optionText: {
    color: tbColors.text,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  selectedText: {
    color: tbColors.white,
  },
  pressed: {
    opacity: 0.72,
  },
});
