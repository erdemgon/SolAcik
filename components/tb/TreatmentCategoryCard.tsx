import { Pressable, StyleSheet, Text, View } from 'react-native';
import { tbColors } from './theme';

export function TreatmentCategoryCard({
  title,
  description,
  selected,
  onPress,
}: {
  title: string;
  description: string[];
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected ? styles.selected : undefined,
        pressed ? styles.pressed : undefined,
      ]}
    >
      <Text style={[styles.title, selected ? styles.selectedText : undefined]}>
        {title}
      </Text>
      <View style={styles.list}>
        {description.map((item) => (
          <Text
            key={item}
            style={[styles.description, selected ? styles.selectedDescription : undefined]}
          >
            {item}
          </Text>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tbColors.card,
    borderColor: tbColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 15,
  },
  selected: {
    backgroundColor: tbColors.accent,
    borderColor: tbColors.accent,
  },
  title: {
    color: tbColors.text,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
  },
  selectedText: {
    color: tbColors.white,
  },
  list: {
    gap: 5,
  },
  description: {
    color: tbColors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  selectedDescription: {
    color: '#fff4f5',
  },
  pressed: {
    opacity: 0.75,
  },
});
