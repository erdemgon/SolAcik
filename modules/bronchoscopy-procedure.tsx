import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  CLINICAL_NOTE_SAFETY_SENTENCE,
  CopyClinicalNoteButton,
} from '../components/common/CopyClinicalNoteButton';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  anesthesiaChecklist,
  balOrderSets,
  balPatternCards,
  balTechniqueChecklist,
  bronchoscopyIndications,
  bronchoscopyRiskSignals,
  bronchoscopySource,
  classifyBronchoscopyRisk,
  postProcedureChecklist,
  preProcedureChecklist,
  type BalPatternKey,
  type BronchoscopyRiskKey,
} from '../data/bronchoscopy/bronchoscopyGuide';
import {
  balDifferentialRows,
  balLymphocyteSubsetRows,
  balReferenceSource,
} from '../data/bronchoscopy/balReferenceValues';

type TabKey = 'prep' | 'anesthesia' | 'bal' | 'normal' | 'patterns' | 'post' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'prep', label: 'Hazırlık' },
  { key: 'anesthesia', label: 'Anestezi' },
  { key: 'bal', label: 'BAL' },
  { key: 'normal', label: 'BAL Normal' },
  { key: 'patterns', label: 'Patern' },
  { key: 'post', label: 'İşlem Sonrası' },
  { key: 'source', label: 'Kaynak' },
];

export function BronchoscopyProcedureScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('prep');
  const [riskSignals, setRiskSignals] = useState<BronchoscopyRiskKey[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<BalPatternKey>('neutrophilic');

  const risk = useMemo(() => classifyBronchoscopyRisk(riskSignals), [riskSignals]);
  const pattern =
    balPatternCards.find((item) => item.key === selectedPattern) ?? balPatternCards[0];
  const clinicalNote = buildBronchoscopyClinicalNote({
    pattern,
    risk,
    riskSignals,
  });

  function toggleRisk(key: BronchoscopyRiskKey) {
    setRiskSignals((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Girişimsel İşlemler</Text>
        <Text style={styles.title}>Bronkoskopi ve BAL Modülü</Text>
        <Text style={styles.description}>
          Pediatrik bronkoskopi hazırlığı, anestezi güvenliği, BAL örnekleme,
          laboratuvar istemleri, normal hücre değerleri ve patern yorumları.
        </Text>
      </View>

      <SourceVersionBadge text={bronchoscopySource.badge} />
      <CopyClinicalNoteButton note={clinicalNote} />

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

      {activeTab === 'prep' ? (
        <>
          <View style={[styles.resultCard, styles[`${risk.tone}Result`]]}>
            <Text style={styles.resultKicker}>İşlem riski</Text>
            <Text style={styles.resultTitle}>{risk.title}</Text>
            <Text style={styles.resultText}>{risk.action}</Text>
          </View>
          <ChecklistCard title="Endikasyon örnekleri" items={bronchoscopyIndications} />
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Risk uyarıları</Text>
            {bronchoscopyRiskSignals.map((signal) => (
              <Toggle
                key={signal.key}
                label={signal.label}
                note={signal.note}
                selected={riskSignals.includes(signal.key)}
                onPress={() => toggleRisk(signal.key)}
              />
            ))}
          </View>
          <ChecklistCard title="İşlem öncesi hazırlık" items={preProcedureChecklist} />
        </>
      ) : null}

      {activeTab === 'anesthesia' ? (
        <>
          <ChecklistCard title="Anestezi / sedasyon checklist’i" items={anesthesiaChecklist} />
          <WarningBox
            title="Havayolu planı"
            text="Bronkoskop çapı, ETT/LMA iç çapı ve ventilasyon gereksinimi işlem öncesi netleşmelidir. Bronkoskop–ETT–LMA uyumluluk modülü bu plan için ayrıca kullanılabilir."
          />
        </>
      ) : null}

      {activeTab === 'bal' ? (
        <>
          <ChecklistCard title="BAL teknik checklist’i" items={balTechniqueChecklist} />
          {balOrderSets.map((set) => (
            <ChecklistCard key={set.title} title={set.title} items={set.items} />
          ))}
        </>
      ) : null}

      {activeTab === 'normal' ? (
        <>
          <WarningBox tone="amber" title="Normal değer uyarısı" text={balReferenceSource.warning} />
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>BAL diferansiyel hücre değerleri</Text>
            {balDifferentialRows.map((row) => (
              <View key={row.study} style={styles.valueCard}>
                <Text style={styles.valueTitle}>{row.study}</Text>
                <Text style={styles.valueText}>n: {row.n}; yaş: {row.ageRange}; sedasyon: {row.sedation}</Text>
                <Text style={styles.valueText}>Makrofaj: {row.macrophagePercent}</Text>
                <Text style={styles.valueText}>Lenfosit: {row.lymphocytePercent}</Text>
                <Text style={styles.valueText}>Nötrofil: {row.neutrophilPercent}</Text>
                <Text style={styles.valueText}>Eozinofil: {row.eosinophilPercent}</Text>
                {row.totalCells10e4PerMl ? (
                  <Text style={styles.valueText}>Total hücre x10^4/mL: {row.totalCells10e4PerMl}</Text>
                ) : null}
              </View>
            ))}
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>BAL lenfosit alt popülasyonları</Text>
            {balLymphocyteSubsetRows.map((row) => (
              <View key={row.study} style={styles.valueCard}>
                <Text style={styles.valueTitle}>{row.study}</Text>
                <Text style={styles.valueText}>n: {row.n}; yaş: {row.ageRange}</Text>
                <Text style={styles.valueText}>CD3: {row.cd3}</Text>
                <Text style={styles.valueText}>CD4: {row.cd4}</Text>
                <Text style={styles.valueText}>CD8: {row.cd8}</Text>
                <Text style={styles.valueText}>CD4/CD8: {row.cd4Cd8}</Text>
                <Text style={styles.valueText}>CD19: {row.cd19}</Text>
                <Text style={styles.valueText}>CD25: {row.cd25}</Text>
                <Text style={styles.valueText}>CD3/HLA-DR: {row.cd3HlaDr}</Text>
                <Text style={styles.valueText}>CD56: {row.cd56}</Text>
              </View>
            ))}
          </View>
        </>
      ) : null}

      {activeTab === 'patterns' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>BAL patern seç</Text>
            <View style={styles.chipWrap}>
              {balPatternCards.map((item) => (
                <Chip
                  key={item.key}
                  label={item.title}
                  selected={selectedPattern === item.key}
                  onPress={() => setSelectedPattern(item.key)}
                />
              ))}
            </View>
          </View>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>{pattern.title}</Text>
            <Text style={styles.cardLabel}>Düşündürebilir</Text>
            <BulletList items={pattern.clues} />
            <WarningBox tone="amber" title="Yorum sınırı" text={pattern.caution} />
          </View>
        </>
      ) : null}

      {activeTab === 'post' ? (
        <ChecklistCard title="İşlem sonrası izlem" items={postProcedureChecklist} />
      ) : null}

      {activeTab === 'source' ? (
        <>
          <WarningBox title="Klinik sınır" text={bronchoscopySource.warning} />
          <ChecklistCard
            title="Kaynak notu"
            items={[
              balReferenceSource.source,
              'BAL hücre değerleri sağlıklı çocuk çalışmalarından alınmış özet referanslardır; laboratuvar ve teknik değişkenlik büyüktür.',
              'BAL sonucu tek başına tanı koydurmaz; klinik, HRCT, mikrobiyoloji ve patoloji ile birlikte yorumlanır.',
              'Bu modül işlem talimatı veya anestezi emri üretmez; kurum protokolü önceliklidir.',
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

function buildBronchoscopyClinicalNote({
  pattern,
  risk,
  riskSignals,
}: {
  pattern: (typeof balPatternCards)[number];
  risk: ReturnType<typeof classifyBronchoscopyRisk>;
  riskSignals: BronchoscopyRiskKey[];
}) {
  const selectedSignals = bronchoscopyRiskSignals
    .filter((signal) => riskSignals.includes(signal.key))
    .map((signal) => signal.label);

  return [
    'Bronkoskopi/BAL klinik notu:',
    `İşlem riski: ${risk.title}; önerilen aksiyon: ${risk.action}.`,
    selectedSignals.length
      ? `İşaretli risk uyarıları: ${selectedSignals.join(', ')}.`
      : 'İşaretli risk uyarısı yok.',
    `Seçili BAL patern kartı: ${pattern.title}.`,
    `Patern notu: ${pattern.caution}`,
    CLINICAL_NOTE_SAFETY_SENTENCE,
  ].join(' ');
}

const styles = StyleSheet.create({
  scrollContent: { gap: 14, paddingBottom: 32 },
  intro: { gap: 8 },
  kicker: { color: '#8f1d2c', fontSize: 13, fontWeight: '900', letterSpacing: 0, textTransform: 'uppercase' },
  title: { color: '#211f1f', fontSize: 25, fontWeight: '900', lineHeight: 31 },
  description: { color: '#686868', fontSize: 15, lineHeight: 22 },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#f5f5f6', borderColor: '#e1e1e4', borderRadius: 999, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 9 },
  chipSelected: { backgroundColor: '#8f1d2c', borderColor: '#8f1d2c' },
  chipText: { color: '#211f1f', fontSize: 14, fontWeight: '800' },
  chipTextSelected: { color: '#ffffff' },
  panel: { backgroundColor: '#f5f5f6', borderColor: '#e8e8eb', borderRadius: 8, borderWidth: 1, gap: 12, padding: 14 },
  panelTitle: { color: '#211f1f', fontSize: 18, fontWeight: '900', lineHeight: 23 },
  resultCard: { borderRadius: 8, borderWidth: 1, gap: 6, padding: 14 },
  redResult: { backgroundColor: '#f9e9ec', borderColor: '#efcbd2' },
  amberResult: { backgroundColor: '#fff7e6', borderColor: '#f0c36a' },
  grayResult: { backgroundColor: '#f5f5f6', borderColor: '#e1e1e4' },
  resultKicker: { color: '#8f1d2c', fontSize: 12, fontWeight: '900', textTransform: 'uppercase' },
  resultTitle: { color: '#211f1f', fontSize: 19, fontWeight: '900' },
  resultText: { color: '#343131', fontSize: 15, lineHeight: 22 },
  toggle: { alignItems: 'flex-start', backgroundColor: '#ffffff', borderColor: '#e1e1e4', borderRadius: 8, borderWidth: 1, flexDirection: 'row', gap: 10, padding: 12 },
  toggleSelected: { backgroundColor: '#fff8f9', borderColor: '#8f1d2c' },
  checkbox: { alignItems: 'center', borderColor: '#c8c8ce', borderRadius: 6, borderWidth: 1, height: 22, justifyContent: 'center', marginTop: 1, width: 22 },
  checkboxSelected: { backgroundColor: '#8f1d2c', borderColor: '#8f1d2c' },
  checkmark: { color: '#ffffff', fontSize: 14, fontWeight: '900' },
  toggleTextWrap: { flex: 1, gap: 4 },
  toggleLabel: { color: '#211f1f', fontSize: 15, fontWeight: '900', lineHeight: 20 },
  toggleNote: { color: '#686868', fontSize: 13, lineHeight: 18 },
  cardLabel: { color: '#8f1d2c', fontSize: 12, fontWeight: '900', textTransform: 'uppercase' },
  bulletList: { gap: 8 },
  bulletRow: { flexDirection: 'row', gap: 8 },
  bullet: { color: '#8f1d2c', fontSize: 16, fontWeight: '900', width: 12 },
  bulletText: { color: '#343131', flex: 1, fontSize: 14, lineHeight: 20 },
  valueCard: { backgroundColor: '#ffffff', borderColor: '#e1e1e4', borderRadius: 8, borderWidth: 1, gap: 5, padding: 12 },
  valueTitle: { color: '#8f1d2c', fontSize: 15, fontWeight: '900' },
  valueText: { color: '#343131', fontSize: 13, lineHeight: 18 },
  footer: { color: '#8a8a8a', fontSize: 12, fontWeight: '700', lineHeight: 18, textAlign: 'center' },
});
