import { StyleSheet, Text, View } from 'react-native';
import { tbColors } from './theme';

export function TbWarningBox({
  title = 'Uyarı',
  children,
  tone = 'red',
}: {
  title?: string;
  children: string;
  tone?: 'red' | 'amber';
}) {
  const isAmber = tone === 'amber';

  return (
    <View style={[styles.box, isAmber ? styles.amberBox : styles.redBox]}>
      <Text style={[styles.title, isAmber ? styles.amberTitle : styles.redTitle]}>
        {title}
      </Text>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 8,
    borderWidth: 1,
    gap: 7,
    padding: 14,
  },
  redBox: {
    backgroundColor: tbColors.softAccent,
    borderColor: '#efcbd2',
  },
  amberBox: {
    backgroundColor: tbColors.amber,
    borderColor: tbColors.amberBorder,
  },
  title: {
    fontSize: 15,
    fontWeight: '900',
  },
  redTitle: {
    color: tbColors.accent,
  },
  amberTitle: {
    color: '#8a5a00',
  },
  text: {
    color: tbColors.text,
    fontSize: 14,
    lineHeight: 20,
  },
});
