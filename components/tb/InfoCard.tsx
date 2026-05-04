import { ReactNode, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { tbColors } from './theme';

export function InfoCard({
  title,
  children,
  defaultExpanded = true,
}: {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        onPress={() => setExpanded((value) => !value)}
        style={styles.header}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.toggle}>{expanded ? 'Kapat' : 'Aç'}</Text>
      </Pressable>
      {expanded ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <View style={styles.list}>
      {items.map((item) => (
        <View key={item} style={styles.row}>
          <View style={styles.dot} />
          <Text style={styles.item}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tbColors.card,
    borderColor: tbColors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    minHeight: 30,
  },
  title: {
    color: tbColors.text,
    flex: 1,
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 22,
  },
  toggle: {
    color: tbColors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  body: {
    marginTop: 12,
  },
  list: {
    gap: 9,
  },
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 9,
  },
  dot: {
    backgroundColor: tbColors.accent,
    borderRadius: 4,
    height: 8,
    marginTop: 7,
    width: 8,
  },
  item: {
    color: tbColors.text,
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
});
