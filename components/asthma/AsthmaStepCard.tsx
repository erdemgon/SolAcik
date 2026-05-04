import { StyleSheet, Text, View } from 'react-native';
import type { AsthmaStep } from '../../data/asthma/gina2025AsthmaSteps';
import { MartBadge } from './MartBadge';

export function AsthmaStepCard({ step }: { step: AsthmaStep }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.step}>Basamak {step.step}</Text>
        <MartBadge eligible={step.martEligible} />
      </View>
      <Text style={styles.title}>{step.preferredTitle}</Text>
      <Text style={styles.text}>{step.preferredSummary}</Text>
      {step.alternativeTitle ? (
        <View style={styles.altBox}>
          <Text style={styles.altTitle}>{step.alternativeTitle}</Text>
          <Text style={styles.text}>{step.alternativeSummary}</Text>
        </View>
      ) : null}
      <Text style={styles.reliever}>Rahatlatıcı: {step.reliever}</Text>
      {step.specialistReferral ? (
        <Text style={styles.referral}>Uzman / referans merkez değerlendirmesi düşün.</Text>
      ) : null}
      {step.notes.map((note) => (
        <Text key={note} style={styles.note}>
          {note}
        </Text>
      ))}
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
    padding: 15,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  step: {
    color: '#8f1d2c',
    fontSize: 14,
    fontWeight: '900',
  },
  title: {
    color: '#211f1f',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
  },
  text: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  altBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    gap: 5,
    padding: 11,
  },
  altTitle: {
    color: '#211f1f',
    fontSize: 15,
    fontWeight: '900',
  },
  reliever: {
    color: '#8f1d2c',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 19,
  },
  referral: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '900',
  },
  note: {
    color: '#686868',
    fontSize: 13,
    lineHeight: 18,
  },
});
