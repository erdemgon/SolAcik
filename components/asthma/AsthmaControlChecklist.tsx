import { Pressable, StyleSheet, Text, View } from 'react-native';

export function AsthmaControlChecklist({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: string[];
  selected: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {items.map((item) => {
        const checked = selected.includes(item);
        return (
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked }}
            key={item}
            onPress={() => onToggle(item)}
            style={styles.row}
          >
            <View style={[styles.box, checked ? styles.boxChecked : undefined]}>
              <Text style={styles.check}>{checked ? '✓' : ''}</Text>
            </View>
            <Text style={styles.item}>{item}</Text>
          </Pressable>
        );
      })}
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
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
  },
  box: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#8f1d2c',
    borderRadius: 5,
    borderWidth: 2,
    height: 22,
    justifyContent: 'center',
    marginTop: 1,
    width: 22,
  },
  boxChecked: {
    backgroundColor: '#8f1d2c',
  },
  check: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 16,
  },
  item: {
    color: '#211f1f',
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
});
