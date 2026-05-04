import { Pressable, StyleSheet, Text } from 'react-native';
import { tbColors } from './theme';

export function TabButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.tab,
        selected ? styles.selectedTab : undefined,
        pressed ? styles.pressed : undefined,
      ]}
    >
      <Text style={[styles.text, selected ? styles.selectedText : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    backgroundColor: tbColors.white,
    borderColor: tbColors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexGrow: 1,
    minHeight: 44,
    minWidth: 132,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  selectedTab: {
    backgroundColor: tbColors.accent,
    borderColor: tbColors.accent,
  },
  text: {
    color: tbColors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  selectedText: {
    color: tbColors.white,
  },
  pressed: {
    opacity: 0.72,
  },
});
