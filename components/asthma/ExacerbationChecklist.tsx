import { Pressable, StyleSheet, Text, View } from 'react-native';

export function ExacerbationChecklist({
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
          <Pressable key={item} onPress={() => onToggle(item)} style={styles.row}>
            <View style={[styles.box, checked ? styles.checked : undefined]} />
            <Text style={styles.text}>{item}</Text>
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
    gap: 10,
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
    backgroundColor: '#fff',
    borderColor: '#8f1d2c',
    borderRadius: 5,
    borderWidth: 2,
    height: 22,
    marginTop: 1,
    width: 22,
  },
  checked: {
    backgroundColor: '#8f1d2c',
  },
  text: {
    color: '#211f1f',
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
});
