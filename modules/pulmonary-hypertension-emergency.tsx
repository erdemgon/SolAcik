import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  acuteTherapyNotes,
  classifyPhEmergency,
  evaluationItems,
  firstActions,
  phCrisisSignals,
  phEmergencySource,
  phTriggers,
  type PhCrisisKey,
  type PhTriggerKey,
} from '../data/emergency/pulmonaryHypertensionEmergencyGuide';

type TabKey = 'triage' | 'first' | 'triggers' | 'therapy' | 'evaluation' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'triage', label: 'Triyaj' },
  { key: 'first', label: 'İlk Yaklaşım' },
  { key: 'triggers', label: 'Tetikleyici' },
  { key: 'therapy', label: 'Akut Tedavi' },
  { key: 'evaluation', label: 'Değerlendirme' },
  { key: 'source', label: 'Kaynak' },
];

export function PulmonaryHypertensionEmergencyScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('triage');
  const [signals, setSignals] = useState<PhCrisisKey[]>([]);
  const [triggers, setTriggers] = useState<PhTriggerKey[]>([]);

  const risk = useMemo(() => classifyPhEmergency(signals), [signals]);

  function toggleSignal(key: PhCrisisKey) {
    setSignals((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  function toggleTrigger(key: PhTriggerKey) {
    setTriggers((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Acil</Text>
        <Text style={styles.title}>Pulmoner Hipertansiyon Acil Yaklaşım</Text>
        <Text style={styles.description}>
          PH krizi, akut sağ kalp yetmezliği, prostasiklin kesintisi, hipoksi/asidoz
          tetikleyicileri ve PH merkezi koordinasyonu için hızlı checklist.
        </Text>
      </View>

      <SourceVersionBadge text={phEmergencySource.badge} />

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
          <View style={[styles.resultCard, styles[`${risk.tone}Result`]]}>
            <Text style={styles.resultKicker}>Ön triyaj</Text>
            <Text style={styles.resultTitle}>{risk.title}</Text>
            <Text style={styles.resultText}>{risk.action}</Text>
          </View>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>PH krizi / yüksek risk bulguları</Text>
            {phCrisisSignals.map((signal) => (
              <Toggle
                key={signal.key}
                label={signal.label}
                note={signal.note}
                selected={signals.includes(signal.key)}
                onPress={() => toggleSignal(signal.key)}
              />
            ))}
          </View>
        </>
      ) : null}

      {activeTab === 'first' ? (
        <>
          <WarningBox
            title="Kritik uyarı"
            text="Bilinen PH hastasında epoprostenol/prostasiklin infüzyonu kesilirse dakikalar içinde ağır PH krizi gelişebilir. Pompa/hat/ilaç sürekliliği acil önceliktir."
          />
          <FlowCard title="İlk yaklaşım" items={firstActions} />
        </>
      ) : null}

      {activeTab === 'triggers' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Düzeltilebilir tetikleyiciler</Text>
            {phTriggers.map((trigger) => (
              <Toggle
                key={trigger.key}
                label={trigger.label}
                note={trigger.note}
                selected={triggers.includes(trigger.key)}
                onPress={() => toggleTrigger(trigger.key)}
              />
            ))}
          </View>
          <WarningBox
            tone="amber"
            title="Fizyoloji"
            text="Hipoksi, asidoz, hiperkapni, ağrı/ajitasyon ve uygun olmayan sıvı yönetimi pulmoner vasküler direnci artırabilir. Bunları düzeltmek tedavinin parçasıdır."
          />
        </>
      ) : null}

      {activeTab === 'therapy' ? (
        <>
          <ChecklistCard title="Akut tedavi notları" items={acuteTherapyNotes} />
          <WarningBox
            title="Entübasyon riski"
            text="PH krizinde entübasyon/sedasyon hemodinamik çöküşü tetikleyebilir. Acil zorunluluk dışında PH, yoğun bakım ve anestezi ekibiyle planlanmalıdır."
          />
        </>
      ) : null}

      {activeTab === 'evaluation' ? (
        <ChecklistCard title="Acil değerlendirme checklist’i" items={evaluationItems} />
      ) : null}

      {activeTab === 'source' ? (
        <>
          <WarningBox title="Klinik sınır" text={phEmergencySource.warning} />
          <ChecklistCard
            title="Kaynak notu"
            items={[
              'AHA/ATS pediatrik PH rehberi çocuk PH’nin erişkinden farklı olduğunu ve yüksek risk bulgularını vurgular.',
              'AHA PALS önerileri PH krizinde inhale nitrik oksit veya prostasiklin, oksijenasyon ve asidoz düzeltmeyi öne çıkarır.',
              'Pediatrik acil yaklaşımda bilinen PH hastasında PH ekibiyle erken iletişim ve prostasiklin kesintisini önleme kritik önemdedir.',
              'Bu ekran ilaç dozu veya bağımsız tedavi emri üretmez; PH merkezi ve yoğun bakım protokolü önceliklidir.',
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
  bulletList: { gap: 8 },
  bulletRow: { flexDirection: 'row', gap: 8 },
  bullet: { color: '#8f1d2c', fontSize: 16, fontWeight: '900', width: 12 },
  bulletText: { color: '#343131', flex: 1, fontSize: 14, lineHeight: 20 },
  flowRow: { alignItems: 'flex-start', flexDirection: 'row', gap: 10 },
  flowNumber: { alignItems: 'center', backgroundColor: '#8f1d2c', borderRadius: 999, height: 24, justifyContent: 'center', width: 24 },
  flowNumberText: { color: '#ffffff', fontSize: 13, fontWeight: '900' },
  flowText: { color: '#343131', flex: 1, fontSize: 14, lineHeight: 20 },
  footer: { color: '#8a8a8a', fontSize: 12, fontWeight: '700', lineHeight: 18, textAlign: 'center' },
});
