import { StyleSheet, Text, View } from 'react-native';
import type { PediatricTbDrugKey } from '../../data/tbDrugs';
import type { TbDiseaseRegimen, TbeRegimen } from '../../data/tbRegimens';
import { DrugDoseCard } from './DrugDoseCard';
import { BulletList } from './InfoCard';
import { tbColors } from './theme';

export function TreatmentSummaryCard({
  title = 'Önerilen şema',
  category,
  regimen,
  weightKg,
}: {
  title?: string;
  category: 'TBE / koruyucu tedavi' | 'TB hastalığı';
  regimen: TbeRegimen | TbDiseaseRegimen;
  weightKg: number;
}) {
  const isDisease = 'initialPhase' in regimen;
  const initialDrugs: PediatricTbDrugKey[] = isDisease
    ? regimen.drugsInitial
    : regimen.drugs;
  const continuationDrugs: PediatricTbDrugKey[] = isDisease
    ? regimen.drugsContinuation
    : [];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Field label="Kategori" value={category} />
      <Field label={isDisease ? 'Hastalık tipi' : 'Koruyucu tedavi'} value={regimen.title} />
      {isDisease ? (
        <>
          <Field label="Başlangıç dönemi" value={regimen.initialPhase} />
          <Field label="İdame dönemi" value={regimen.continuationPhase} />
          <Field label="Toplam süre" value={regimen.totalDuration} />
        </>
      ) : (
        <Field label="Süre" value={regimen.duration} />
      )}

      <Text style={styles.subhead}>
        {isDisease ? 'Başlangıç döneminde ilaç ve dozlar' : 'İlaç ve dozlar'}
      </Text>
      <View style={styles.doseList}>
        {initialDrugs.map((drugKey) => (
          <DrugDoseCard key={drugKey} drugKey={drugKey} weightKg={weightKg} />
        ))}
      </View>

      {continuationDrugs.length > 0 ? (
        <>
          <Text style={styles.subhead}>İdame döneminde ilaç ve dozlar</Text>
          <View style={styles.doseList}>
            {continuationDrugs.map((drugKey) => (
              <DrugDoseCard
                key={`continuation-${drugKey}`}
                drugKey={drugKey}
                weightKg={weightKg}
              />
            ))}
          </View>
        </>
      ) : null}

      <Text style={styles.subhead}>Özel uyarılar</Text>
      <BulletList items={regimen.notes} />

      <Text style={styles.subhead}>İzlem notları</Text>
      <BulletList
        items={[
          'Yan etki, klinik yanıt, tedavi uyumu ve kilo değişimi izlenmelidir.',
          'Dozlar çocuk kilo aldıkça yeni vücut ağırlığına göre yeniden değerlendirilmelidir.',
          'Bu ekran klinik kararın yerine geçmez; resmi rehber, ilaç formülasyonu, hasta özellikleri ve kurum protokolü ile doğrulanmalıdır.',
        ]}
      />
    </View>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tbColors.card,
    borderColor: tbColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  title: {
    color: tbColors.text,
    fontSize: 19,
    fontWeight: '900',
    lineHeight: 24,
  },
  field: {
    backgroundColor: tbColors.white,
    borderRadius: 8,
    padding: 11,
  },
  label: {
    color: tbColors.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  value: {
    color: tbColors.text,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 21,
    marginTop: 3,
  },
  subhead: {
    color: tbColors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  doseList: {
    gap: 9,
  },
});
