import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  classifyPcdProbability,
  pcdClinicalFeatures,
  pcdDifferentials,
  pcdManagementChecklist,
  pcdResultRules,
  pcdSource,
  pcdTestCards,
  type PcdFeatureKey,
  type PcdResultKey,
  type PcdTestKey,
} from '../data/pcd/pcdGuide';

type TabKey = 'suspicion' | 'tests' | 'results' | 'differential' | 'followup' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'suspicion', label: 'Şüphe' },
  { key: 'tests', label: 'Test Seçimi' },
  { key: 'results', label: 'Sonuç' },
  { key: 'differential', label: 'Ayırıcı Tanı' },
  { key: 'followup', label: 'İzlem' },
  { key: 'source', label: 'Kaynak' },
];

export function PrimaryCiliaryDyskinesiaScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('suspicion');
  const [features, setFeatures] = useState<PcdFeatureKey[]>([]);
  const [selectedTest, setSelectedTest] = useState<PcdTestKey>('nno');
  const [selectedResult, setSelectedResult] = useState<PcdResultKey>('highSuspicion');

  const probability = useMemo(() => classifyPcdProbability(features), [features]);
  const test = pcdTestCards.find((item) => item.key === selectedTest) ?? pcdTestCards[0];
  const result = pcdResultRules.find((item) => item.key === selectedResult) ?? pcdResultRules[0];

  function toggleFeature(key: PcdFeatureKey) {
    setFeatures((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>PCD</Text>
        <Text style={styles.title}>Primer Siliyer Diskinezi Rehberi</Text>
        <Text style={styles.description}>
          PCD şüphesi, test seçimi, belirsiz sonuç yönetimi, ayırıcı tanı ve uzun
          dönem izlem için pratik karar ağacı.
        </Text>
      </View>

      <SourceVersionBadge text={pcdSource.badge} />

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

      {activeTab === 'suspicion' ? (
        <>
          <View style={[styles.resultCard, styles[`${probability.tone}Result`]]}>
            <Text style={styles.resultKicker}>Ön olasılık</Text>
            <Text style={styles.resultTitle}>{probability.title}</Text>
            <Text style={styles.resultText}>{probability.action}</Text>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>PCD ipuçları</Text>
            {pcdClinicalFeatures.map((feature) => (
              <Toggle
                key={feature.key}
                label={feature.label}
                note={feature.note}
                selected={features.includes(feature.key)}
                onPress={() => toggleFeature(feature.key)}
              />
            ))}
          </View>

          <WarningBox
            tone="amber"
            title="Pratik kural"
            text="ATS yaklaşımında en az iki ana klinik özellik PCD olasılığını belirgin artırır: günlük ıslak öksürük, günlük rinosinüzit, açıklanamayan neonatal solunum sıkıntısı ve laterality defekti."
          />
        </>
      ) : null}

      {activeTab === 'tests' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Test seç</Text>
            <View style={styles.chipWrap}>
              {pcdTestCards.map((item) => (
                <Chip
                  key={item.key}
                  label={item.title}
                  selected={selectedTest === item.key}
                  onPress={() => setSelectedTest(item.key)}
                />
              ))}
            </View>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>{test.title}</Text>
            <Text style={styles.cardLabel}>Ne işe yarar?</Text>
            <Text style={styles.cardText}>{test.use}</Text>
            <Text style={styles.cardLabel}>Sınırlar</Text>
            <BulletList items={test.limitations} />
          </View>

          <FlowCard
            title="Tanısal akış"
            items={[
              'PCD fenotipini netleştir ve CF’yi dışla.',
              'Test erişimine göre nNO, genetik, TEM, HSVM ve/veya immünfloresan kombinasyonu planla.',
              'Akut enfeksiyon sonrası silya örneği yanıltıcıysa tekrar veya kültür sonrası değerlendirme düşün.',
              'Tek negatif testle PCD’yi kapatma; fenotip güçlü ise uzman merkezde süreci sürdür.',
            ]}
          />
        </>
      ) : null}

      {activeTab === 'results' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Sonuç senaryosu</Text>
            <View style={styles.chipWrap}>
              {pcdResultRules.map((item) => (
                <Chip
                  key={item.key}
                  label={item.label}
                  selected={selectedResult === item.key}
                  onPress={() => setSelectedResult(item.key)}
                />
              ))}
            </View>
          </View>
          <View style={styles.resultCard}>
            <Text style={styles.resultKicker}>Yorum</Text>
            <Text style={styles.resultTitle}>{result.label}</Text>
            <Text style={styles.resultText}>{result.interpretation}</Text>
          </View>
        </>
      ) : null}

      {activeTab === 'differential' ? (
        <>
          <ChecklistCard title="PCD benzeri tabloda dışlanacaklar" items={pcdDifferentials} />
          <WarningBox
            tone="amber"
            title="Non-CF bronşektazi bağlantısı"
            text="PCD, çocukta non-CF bronşektazinin tedavi edilebilir nedenlerinden biridir. Bronşektazi varsa etiyoloji panelinde PCD mutlaka klinik ipucuna göre değerlendirilmelidir."
          />
        </>
      ) : null}

      {activeTab === 'followup' ? (
        <>
          <ChecklistCard title="PCD izlem checklist’i" items={pcdManagementChecklist} />
          <WarningBox
            title="Alevlenme / kültür"
            text="PCD’de alt hava yolu kültürleri ve önceki mikrobiyoloji antibiyotik seçiminde önemlidir. Alevlenme tedavisi kurum protokolü ve uzman değerlendirmesi ile doğrulanmalıdır."
          />
        </>
      ) : null}

      {activeTab === 'source' ? (
        <>
          <WarningBox title="Klinik sınır" text={pcdSource.warning} />
          <ChecklistCard
            title="Kaynak notu"
            items={[
              'ERS 2017 rehberi PCD tanısında klinik sunum, nazal NO, HSVM, TEM, genetik ve immünfloresan testlerini birlikte ele alır.',
              'ATS 2018 rehberi yüksek olasılıklı fenotipte nNO, genetik panel ve TEM yaklaşımını klinik karar akışı içinde tanımlar.',
              'PCD tanısında tek altın standart yoktur; testler merkez deneyimi ve klinik olasılıkla birlikte yorumlanır.',
              'Bu modül tanı koymaz ve tedavi reçetesi üretmez; PCD uzman merkezi değerlendirmesini kolaylaştıran checklist sunar.',
            ]}
          />
        </>
      ) : null}

      <Text style={styles.footer}>
        Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
      </Text>
    </ScrollView>
  );
}

function ChecklistCard({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      <BulletList items={items} />
    </View>
  );
}

function FlowCard({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      {items.map((item, index) => (
        <View key={item} style={styles.flowRow}>
          <View style={styles.flowNumber}>
            <Text style={styles.flowNumberText}>{index + 1}</Text>
          </View>
          <Text style={styles.flowText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function Toggle({
  label,
  note,
  selected,
  onPress,
}: {
  label: string;
  note: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[styles.toggle, selected && styles.toggleSelected]}
    >
      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected ? <Text style={styles.checkmark}>✓</Text> : null}
      </View>
      <View style={styles.toggleTextWrap}>
        <Text style={styles.toggleLabel}>{label}</Text>
        <Text style={styles.toggleNote}>{note}</Text>
      </View>
    </Pressable>
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
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View style={styles.bulletList}>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    gap: 14,
    paddingBottom: 32,
  },
  intro: {
    gap: 8,
  },
  kicker: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
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
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e1e1e4',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  chipSelected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  chipText: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '800',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
  panel: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e8e8eb',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  panelTitle: {
    color: '#211f1f',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
  },
  resultCard: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e1e1e4',
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    padding: 14,
  },
  redResult: {
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
  },
  amberResult: {
    backgroundColor: '#fff7e6',
    borderColor: '#f0c36a',
  },
  grayResult: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e1e1e4',
  },
  resultKicker: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  resultTitle: {
    color: '#211f1f',
    fontSize: 19,
    fontWeight: '900',
  },
  resultText: {
    color: '#343131',
    fontSize: 15,
    lineHeight: 22,
  },
  toggle: {
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderColor: '#e1e1e4',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    padding: 12,
  },
  toggleSelected: {
    backgroundColor: '#fff8f9',
    borderColor: '#8f1d2c',
  },
  checkbox: {
    alignItems: 'center',
    borderColor: '#c8c8ce',
    borderRadius: 6,
    borderWidth: 1,
    height: 22,
    justifyContent: 'center',
    marginTop: 1,
    width: 22,
  },
  checkboxSelected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  toggleTextWrap: {
    flex: 1,
    gap: 4,
  },
  toggleLabel: {
    color: '#211f1f',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 20,
  },
  toggleNote: {
    color: '#686868',
    fontSize: 13,
    lineHeight: 18,
  },
  cardLabel: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  cardText: {
    color: '#343131',
    fontSize: 14,
    lineHeight: 20,
  },
  bulletList: {
    gap: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 8,
  },
  bullet: {
    color: '#8f1d2c',
    fontSize: 16,
    fontWeight: '900',
    width: 12,
  },
  bulletText: {
    color: '#343131',
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  flowRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
  },
  flowNumber: {
    alignItems: 'center',
    backgroundColor: '#8f1d2c',
    borderRadius: 999,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  flowNumberText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
  flowText: {
    color: '#343131',
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    color: '#8a8a8a',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    textAlign: 'center',
  },
});
