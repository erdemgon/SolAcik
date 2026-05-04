import { StyleSheet, Text, View } from 'react-native';
import type { PediatricTbDrugKey } from '../../data/tbDrugs';
import { DrugDoseCard } from './DrugDoseCard';
import { InfoCard } from './InfoCard';
import { tbColors } from './theme';

const firstLineDrugKeys: PediatricTbDrugKey[] = ['H', 'R', 'Z', 'E'];
const additionalDrugKeys: PediatricTbDrugKey[] = [
  'S',
  'AMK',
  'ETO_PTO',
  'CYC',
  'OFL',
  'LEV',
  'MFX',
  'KLF',
];

export function DrugDoseReferencePanel({ weightKg }: { weightKg: number }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.title}>Hesaplanan ilaç dozları</Text>
        <Text style={styles.subtitle}>
          Kilo {weightKg} kg için mg/kg hesabı. Tablet/süspansiyon formuna göre
          yuvarlama yapılmaz.
        </Text>
      </View>

      <InfoCard title="Birinci seçenek TB ilaçları" defaultExpanded>
        <View style={styles.list}>
          {firstLineDrugKeys.map((drugKey) => (
            <DrugDoseCard key={drugKey} drugKey={drugKey} weightKg={weightKg} />
          ))}
        </View>
      </InfoCard>

      <InfoCard title="Ek / dirençli TB senaryolarında kullanılan ilaç doz referansı" defaultExpanded={false}>
        <View style={styles.list}>
          <Text style={styles.warning}>
            Dirençli TB, RD/ÇİD-TB veya kompleks tedavi durumunda otomatik rejim
            seçimi yapılmaz; referans merkez / uzman konsültasyonu gerekir.
          </Text>
          {additionalDrugKeys.map((drugKey) => (
            <DrugDoseCard key={drugKey} drugKey={drugKey} weightKg={weightKg} />
          ))}
        </View>
      </InfoCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
  },
  header: {
    backgroundColor: tbColors.softAccent,
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
    padding: 14,
  },
  title: {
    color: tbColors.accent,
    fontSize: 18,
    fontWeight: '900',
  },
  subtitle: {
    color: tbColors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  list: {
    gap: 9,
  },
  warning: {
    color: tbColors.accent,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 19,
  },
});
