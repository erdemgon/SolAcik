import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  balDifferentialRows,
  balLymphocyteSubsetRows,
  balReferenceSource,
} from '../data/bronchoscopy/balReferenceValues';

type TabKey = 'summary' | 'differential' | 'subsets' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'summary', label: 'Özet' },
  { key: 'differential', label: 'Hücreler' },
  { key: 'subsets', label: 'Lenfosit' },
  { key: 'source', label: 'Kaynak' },
];

export function BalReferenceScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('summary');

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Normal değerler</Text>
        <Text style={styles.title}>BAL Hücre Popülasyon Değerleri</Text>
        <Text style={styles.description}>
          Çocuklarda bronkoalveoler lavaj diferansiyel hücre dağılımı ve lenfosit alt
          popülasyonlarını hızlı referans olarak gösterir.
        </Text>
      </View>

      <SourceVersionBadge text={balReferenceSource.source} />
      <WarningBox tone="amber" title="Normal değer uyarısı" text={balReferenceSource.warning} />

      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <Chip
            key={tab.key}
            label={tab.label}
            selected={activeTab === tab.key}
            onPress={() => setActiveTab(tab.key)}
          />
        ))}
      </View>

      {activeTab === 'summary' ? (
        <>
          <View style={styles.highlightCard}>
            <Text style={styles.highlightTitle}>Pratik normal patern</Text>
            <Text style={styles.highlightText}>
              Sağlıklı çocuk BAL’ında baskın hücre genellikle alveoler makrofajdır.
              Lenfosit oranı çocuk çalışmalarında değişken olmakla birlikte çoğunlukla
              düşük-orta düzeydedir; nötrofil ve eozinofil normalde düşük beklenir.
            </Text>
          </View>
          <ValueSnapshot />
          <WarningBox
            title="Yorum sınırı"
            text="BAL sonucu tek başına tanı koydurmaz. Örnekleme lobu, lavaj hacmi, geri dönüş oranı, enfeksiyon, sedasyon ve laboratuvar yöntemi sonuçları belirgin etkiler."
          />
        </>
      ) : null}

      {activeTab === 'differential' ? (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>BAL diferansiyel hücre değerleri</Text>
          {balDifferentialRows.map((row) => (
            <View key={row.study} style={styles.valueCard}>
              <Text style={styles.valueTitle}>{row.study}</Text>
              <Text style={styles.valueText}>n: {row.n}; yaş: {row.ageRange}</Text>
              <Text style={styles.valueText}>Sedasyon: {row.sedation}</Text>
              <Text style={styles.valueText}>Lavaj hacmi: {row.lavageVolume}</Text>
              {row.recoveryPercent ? (
                <Text style={styles.valueText}>Geri dönüş: {row.recoveryPercent}</Text>
              ) : null}
              {row.totalCells10e4PerMl ? (
                <Text style={styles.valueText}>Total hücre x10^4/mL: {row.totalCells10e4PerMl}</Text>
              ) : null}
              <MetricGrid
                items={[
                  ['Makrofaj', row.macrophagePercent],
                  ['Lenfosit', row.lymphocytePercent],
                  ['Nötrofil', row.neutrophilPercent],
                  ['Eozinofil', row.eosinophilPercent],
                ]}
              />
              {row.note ? <Text style={styles.noteText}>{row.note}</Text> : null}
            </View>
          ))}
        </View>
      ) : null}

      {activeTab === 'subsets' ? (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>BAL lenfosit alt popülasyonları</Text>
          {balLymphocyteSubsetRows.map((row) => (
            <View key={row.study} style={styles.valueCard}>
              <Text style={styles.valueTitle}>{row.study}</Text>
              <Text style={styles.valueText}>n: {row.n}; yaş: {row.ageRange}</Text>
              <MetricGrid
                items={[
                  ['CD3', row.cd3],
                  ['CD4', row.cd4],
                  ['CD8', row.cd8],
                  ['CD4/CD8', row.cd4Cd8],
                  ['CD19', row.cd19],
                  ['CD25', row.cd25],
                  ['CD3/HLA-DR', row.cd3HlaDr],
                  ['CD56', row.cd56],
                ]}
              />
              {row.note ? <Text style={styles.noteText}>{row.note}</Text> : null}
            </View>
          ))}
        </View>
      ) : null}

      {activeTab === 'source' ? (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>{balReferenceSource.title}</Text>
          <Text style={styles.sourceText}>{balReferenceSource.source}</Text>
          <Text style={styles.sourceText}>
            Yüklenen BAL çocuk normal değerleri dosyalarındaki Tablo 3 ve Tablo 4 özet
            veri olarak yapılandırılmıştır. Kurum laboratuvarı ve işlem tekniği ile
            karşılaştırılarak kullanılmalıdır.
          </Text>
        </View>
      ) : null}

      <Text style={styles.footer}>
        Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
      </Text>
    </ScrollView>
  );
}

function ValueSnapshot() {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Hızlı bakış</Text>
      {balDifferentialRows.slice(0, 3).map((row) => (
        <View key={row.study} style={styles.snapshotRow}>
          <Text style={styles.snapshotTitle}>
            {row.study} — {row.ageRange}
          </Text>
          <Text style={styles.snapshotText}>
            Makrofaj {row.macrophagePercent}; lenfosit {row.lymphocytePercent};
            nötrofil {row.neutrophilPercent}; eozinofil {row.eosinophilPercent}.
          </Text>
        </View>
      ))}
    </View>
  );
}

function MetricGrid({ items }: { items: [string, string][] }) {
  return (
    <View style={styles.metricGrid}>
      {items.map(([label, value]) => (
        <View key={label} style={styles.metricBox}>
          <Text style={styles.metricLabel}>{label}</Text>
          <Text style={styles.metricValue}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected ? styles.chipSelected : undefined]}>
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    backgroundColor: '#fff',
    gap: 14,
    padding: 18,
    paddingBottom: 34,
  },
  intro: {
    gap: 7,
  },
  kicker: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '900',
  },
  title: {
    color: '#211f1f',
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 31,
  },
  description: {
    color: '#686868',
    fontSize: 15,
    lineHeight: 22,
  },
  tabs: {
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
  chipSelected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  chipText: {
    color: '#211f1f',
    fontSize: 13,
    fontWeight: '900',
  },
  chipTextSelected: {
    color: '#fff',
  },
  panel: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  panelTitle: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  highlightCard: {
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    padding: 15,
  },
  highlightTitle: {
    color: '#8f1d2c',
    fontSize: 17,
    fontWeight: '900',
  },
  highlightText: {
    color: '#211f1f',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    marginTop: 6,
  },
  valueCard: {
    backgroundColor: '#fff',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 12,
  },
  valueTitle: {
    color: '#211f1f',
    fontSize: 16,
    fontWeight: '900',
  },
  valueText: {
    color: '#4b4b50',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricBox: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e2e2e5',
    borderRadius: 8,
    borderWidth: 1,
    flexGrow: 1,
    minWidth: 132,
    padding: 10,
  },
  metricLabel: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
  },
  metricValue: {
    color: '#211f1f',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
    marginTop: 3,
  },
  noteText: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
  },
  snapshotRow: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 11,
  },
  snapshotTitle: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '900',
  },
  snapshotText: {
    color: '#4b4b50',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
    marginTop: 4,
  },
  sourceText: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  footer: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '700',
    paddingTop: 2,
    textAlign: 'center',
  },
});
