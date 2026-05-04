import { StyleSheet, Text, View } from 'react-native';
import type { PediatricTbDrug, PediatricTbDrugKey } from '../../data/tbDrugs';
import { pediatricTbDrugs } from '../../data/tbDrugs';
import {
  calculateDoseMg,
  calculateDoseRangeMg,
  calculateWeeklyRifapentine,
} from '../../utils/tbDoseCalculator';
import { tbColors } from './theme';

export function DrugDoseCard({
  drugKey,
  weightKg,
}: {
  drugKey: PediatricTbDrugKey;
  weightKg: number;
}) {
  if (drugKey === 'E_optional') {
    return (
      <SpecialDoseCard
        title="E / EMB opsiyonel"
        body="Etambutol seçimi klinik bağlama, hastalık ağırlığına, direnç olasılığına ve rehber değerlendirmesine göre yapılmalıdır."
      />
    );
  }

  if (drugKey === 'H_weekly') {
    const dose = calculateDoseMg(weightKg, 15, 900);
    return (
      <SpecialDoseCard
        title="H / İNH haftalık"
        body={`15 mg/kg/hafta → hesaplanan ${dose.calculatedMg} mg; maksimum 900 mg; gösterilen ${dose.cappedMg} mg. Gözetimli uygulanmalıdır.`}
      />
    );
  }

  if (drugKey === 'RPT_weekly') {
    const rpt = calculateWeeklyRifapentine(weightKg);
    return (
      <SpecialDoseCard
        title="Rifapentin haftalık"
        body={
          rpt.doseMg
            ? `Kilo bandı ${rpt.note}; rifapentin ${rpt.doseMg} mg haftada 1.`
            : rpt.note
        }
      />
    );
  }

  if (drugKey === 'H_daily_1m') {
    return (
      <SpecialDoseCard
        title="H / İNH günlük 1 ay"
        body={
          weightKg >= 25
            ? '25 kg ve üzeri: İNH 300 mg/gün.'
            : '25 kg altı için otomatik doz gösterilmez; rehber/uzman kontrolü gerekir.'
        }
      />
    );
  }

  if (drugKey === 'RPT_daily_1m') {
    return (
      <SpecialDoseCard
        title="Rifapentin günlük 1 ay"
        body={
          weightKg >= 25
            ? '25 kg ve üzeri: rifapentin 600 mg/gün.'
            : '25 kg altı için otomatik doz gösterilmez; rehber/uzman kontrolü gerekir.'
        }
      />
    );
  }

  const drug = pediatricTbDrugs[drugKey];
  const dose = calculateDoseMg(weightKg, drug.dailyDoseMgKg, drug.maxDailyMg);
  const range = calculateDoseRangeMg(
    weightKg,
    drug.rangeMgKg[0],
    drug.dailyDoseMgKg,
    drug.rangeMgKg[1],
    drug.maxDailyMg,
  );

  return <StandardDoseCard drug={drug} dose={dose} range={range} />;
}

function StandardDoseCard({
  drug,
  dose,
  range,
}: {
  drug: PediatricTbDrug;
  dose: ReturnType<typeof calculateDoseMg>;
  range: ReturnType<typeof calculateDoseRangeMg>;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {drug.abbreviation}: {drug.name}
      </Text>
      <Text style={styles.mainLine}>
        {drug.dailyDoseMgKg} mg/kg/gün → hesaplanan {dose.calculatedMg} mg/gün;
        maksimum {drug.maxDailyMg} mg/gün; önerilen gösterim: {dose.cappedMg} mg/gün.
      </Text>
      <Text style={styles.detail}>
        Kabul edilen aralık {drug.rangeMgKg[0]}–{drug.rangeMgKg[1]} mg/kg/gün:
        {` ${range.minMg}–${range.highMg} mg/gün`} (hedef {range.targetMg} mg/gün).
      </Text>
      {dose.isCapped || range.isCapped ? (
        <Text style={styles.capped}>Maksimum günlük doz sınırına ulaşıldı.</Text>
      ) : null}
      <Text style={styles.detail}>Uygulama: {drug.dosing}</Text>
      <Text style={styles.detail}>Önemli yan etkiler: {drug.keyAdverseEffects}</Text>
      {drug.notes.map((note) => (
        <Text key={note} style={styles.note}>
          {note}
        </Text>
      ))}
      <Text style={styles.rounding}>
        Pratik yuvarlama mevcut ilaç formuna ve klinisyen kararına göre yapılmalıdır.
      </Text>
    </View>
  );
}

function SpecialDoseCard({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.mainLine}>{body}</Text>
      <Text style={styles.rounding}>
        Pratik yuvarlama mevcut ilaç formuna ve klinisyen kararına göre yapılmalıdır.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tbColors.white,
    borderColor: tbColors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 7,
    padding: 13,
  },
  title: {
    color: tbColors.text,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 21,
  },
  mainLine: {
    color: tbColors.text,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 21,
  },
  detail: {
    color: tbColors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  note: {
    color: tbColors.text,
    fontSize: 13,
    lineHeight: 19,
  },
  capped: {
    color: tbColors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  rounding: {
    color: tbColors.accent,
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 17,
  },
});
