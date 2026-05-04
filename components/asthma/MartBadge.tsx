import { StyleSheet, Text } from 'react-native';

export function MartBadge({ eligible }: { eligible: boolean }) {
  return (
    <Text style={[styles.badge, eligible ? styles.yes : styles.no]}>
      {eligible ? 'MART seçeneği' : 'MART değil'}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  yes: {
    backgroundColor: '#e7f5ed',
    color: '#166534',
  },
  no: {
    backgroundColor: '#eeeeef',
    color: '#5f6268',
  },
});
