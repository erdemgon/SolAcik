import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GliReferenceSet } from '../../utils/spirometry/gliTypes';

export const gliReferenceOptions: { label: string; value: GliReferenceSet }[] = [
  { label: 'GLI-2012 Other/Mixed', value: 'GLI2012_OTHER_MIXED' },
  { label: 'GLI-2012 Caucasian', value: 'GLI2012_CAUCASIAN' },
  { label: 'GLI-2012 North East Asian', value: 'GLI2012_NE_ASIAN' },
  { label: 'GLI-2012 South East Asian', value: 'GLI2012_SE_ASIAN' },
  { label: 'GLI-2012 African American', value: 'GLI2012_AFRICAN_AMERICAN' },
  { label: 'GLI Global 2022 / race-neutral', value: 'GLI2022_GLOBAL' },
];

export function GliReferenceSelector({
  selected,
  onSelect,
}: {
  selected: GliReferenceSet;
  onSelect: (reference: GliReferenceSet) => void;
}) {
  return (
    <View style={styles.wrap}>
      {gliReferenceOptions.map((option) => (
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
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  text: {
    color: '#211f1f',
    fontSize: 13,
    fontWeight: '800',
  },
  selectedText: {
    color: '#fff',
  },
});
