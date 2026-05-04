import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  causePathways,
  classifyHemoptysisSeverity,
  diagnosticWorkup,
  firstFiveMinutes,
  hemoptysisSource,
  severitySignals,
  treatmentTools,
  type HemoptysisCauseKey,
  type HemoptysisSeverityKey,
} from '../data/emergency/hemoptysisGuide';

type TabKey = 'triage' | 'first' | 'causes' | 'workup' | 'treatment' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'triage', label: 'Triyaj' },
  { key: 'first', label: 'İlk 5 dk' },
  { key: 'causes', label: 'Neden' },
  { key: 'workup', label: 'İşup' },
  { key: 'treatment', label: 'Kontrol' },
  { key: 'source', label: 'Kaynak' },
];

export function HemoptysisEmergencyScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('triage');
  const [selectedSignals, setSelectedSignals] = useState<HemoptysisSeverityKey[]>([]);
  const [selectedCause, setSelectedCause] = useState<HemoptysisCauseKey>('infection');

  const severity = useMemo(
    () => classifyHemoptysisSeverity(selectedSignals),
    [selectedSignals],
  );
  const cause = causePathways.find((item) => item.key === selectedCause) ?? causePathways[0];

  function toggleSignal(key: HemoptysisSeverityKey) {
    setSelectedSignals((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Acil</Text>
        <Text style={styles.title}>Hemoptizi Acil Yaklaşım</Text>
        <Text style={styles.description}>
          Çocukta hemoptizide hava yolu tehdidi, ilk stabilizasyon, neden arama ve
          bronkoskopi/BT anjiyo/embolizasyon ekip koordinasyonu için hızlı karar ağacı.
        </Text>
      </View>

      <SourceVersionBadge text={hemoptysisSource.badge} />

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

      {activeTab === 'triage' ? (
        <>
          <View style={[styles.resultCard, styles[`${severity.tone}Result`]]}>
            <Text style={styles.resultKicker}>Ön triyaj</Text>
            <Text style={styles.resultTitle}>{severity.title}</Text>
            <Text style={styles.resultText}>{severity.action}</Text>
          </View>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Yaşamı tehdit eden bulgular</Text>
            {severitySignals.map((signal) => (
              <Toggle
                key={signal.key}
                label={signal.label}
                note={signal.note}
                selected={selectedSignals.includes(signal.key)}
                onPress={() => toggleSignal(signal.key)}
              />
            ))}
          </View>
        </>
      ) : null}

      {activeTab === 'first' ? (
        <>
          <WarningBox title="Öncelik" text="Hemoptizide ölüm çoğu zaman kan kaybından değil, hava yolu tıkanması ve aspirasyon/asfiksiden olur. Hava yolu ve oksijenasyon ilk önceliktir." />
          <FlowCard title="İlk 5 dakika" items={firstFiveMinutes} />
        </>
      ) : null}

      {activeTab === 'causes' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Olası neden seç</Text>
            <View style={styles.chipWrap}>
              {causePathways.map((item) => (
                <Chip
                  key={item.key}
                  label={item.title}
                  selected={selectedCause === item.key}
                  onPress={() => setSelectedCause(item.key)}
                />
              ))}
            </View>
          </View>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>{cause.title}</Text>
            <Text style={styles.cardLabel}>İpuçları</Text>
            <BulletList items={cause.clues} />
            <View style={styles.nextStepBox}>
              <Text style={styles.nextStepTitle}>Sonraki adım</Text>
              <Text style={styles.nextStepText}>{cause.action}</Text>
            </View>
          </View>
        </>
      ) : null}

      {activeTab === 'workup' ? <ChecklistCard title="Tanısal işup" items={diagnosticWorkup} /> : null}

      {activeTab === 'treatment' ? (
        <>
          <ChecklistCard title="Kanama kontrol araçları" items={treatmentTools} />
          <WarningBox
            tone="amber"
            title="Doz/işlem sınırı"
            text="Traneksamik asit, lokal bronkoskopik ajanlar, balon tamponad, embolizasyon ve cerrahi kararları merkez deneyimi ve protokolüne göre verilmelidir; bu ekran doz veya işlem talimatı üretmez."
          />
        </>
      ) : null}

      {activeTab === 'source' ? (
        <>
          <WarningBox title="Klinik sınır" text={hemoptysisSource.warning} />
          <ChecklistCard
            title="Kaynak notu"
            items={[
              'Pediatrik hemoptizi nadirdir; enfeksiyon ve yabancı cisim sık nedenlerdendir, bronşektazi/CF/PCD özel risk taşır.',
              'Masif hemoptizi hacimden çok hava yolu tıkanması, hipoksemi, hemodinami ve kanamanın sürekliliği ile tanımlanmalıdır.',
              'Stabil hastada BT anjiyo ve bronkoskopi birbirini tamamlar; yaşamı tehdit eden kanamada hava yolu yönetimi görüntülemeden önce gelir.',
              'Bu modül acil ekip koordinasyonu için checklist sunar; merkez protokolü ve uzman kararı önceliklidir.',
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
    <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: selected }} onPress={onPress} style={[styles.toggle, selected && styles.toggleSelected]}>
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

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
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
  flowRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 10 },
  flowNumber: { alignItems: 'center', backgroundColor: '#8f1d2c', borderRadius: 999, height: 24, justifyContent: 'center', width: 24 },
  flowNumberText: { color: '#ffffff', fontSize: 13, fontWeight: '900' },
  flowText: { color: '#343131', flex: 1, fontSize: 14, lineHeight: 20 },
  nextStepBox: { backgroundColor: '#ffffff', borderColor: '#efcbd2', borderRadius: 8, borderWidth: 1, gap: 5, padding: 12 },
  nextStepTitle: { color: '#8f1d2c', fontSize: 13, fontWeight: '900', textTransform: 'uppercase' },
  nextStepText: { color: '#211f1f', fontSize: 15, fontWeight: '800', lineHeight: 21 },
  footer: { color: '#8a8a8a', fontSize: 12, fontWeight: '700', lineHeight: 18, textAlign: 'center' },
});
