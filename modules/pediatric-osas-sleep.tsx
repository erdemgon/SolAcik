import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  classifyOsasRisk,
  classifyPersistentOsas,
  interpretationNotes,
  osasRisks,
  osasSignals,
  osasSource,
  persistentOsasSignals,
  sleepStudyIndications,
  treatmentPathways,
  type OsasRiskKey,
  type OsasSignalKey,
  type PersistentOsasKey,
} from '../data/sleep/pediatricOsasGuide';

type TabKey = 'screening' | 'psg' | 'treatment' | 'persistent' | 'interpretation' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'screening', label: 'Tarama' },
  { key: 'psg', label: 'PSG / Test' },
  { key: 'treatment', label: 'Tedavi Yolu' },
  { key: 'persistent', label: 'Persistan OSAS' },
  { key: 'interpretation', label: 'Yorum' },
  { key: 'source', label: 'Kaynak' },
];

export function PediatricOsasSleepScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('screening');
  const [signals, setSignals] = useState<OsasSignalKey[]>([]);
  const [risks, setRisks] = useState<OsasRiskKey[]>([]);
  const [persistentSignals, setPersistentSignals] = useState<PersistentOsasKey[]>([]);

  const osasRisk = useMemo(() => classifyOsasRisk(signals, risks), [risks, signals]);
  const persistentRisk = useMemo(
    () => classifyPersistentOsas(persistentSignals),
    [persistentSignals],
  );

  function toggleSignal(key: OsasSignalKey) {
    setSignals((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  function toggleRisk(key: OsasRiskKey) {
    setRisks((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  function togglePersistent(key: PersistentOsasKey) {
    setPersistentSignals((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Uyku / OSAS</Text>
        <Text style={styles.title}>Çocuklarda OSAS ve Uyku Solunum Bozukluğu</Text>
        <Text style={styles.description}>
          Horlama, risk faktörleri, PSG gereksinimi, KBB/CPAP-NIV yolu ve
          adenotonsillektomi sonrası persistan OSAS için pratik karar ağacı.
        </Text>
      </View>

      <SourceVersionBadge text={osasSource.badge} />

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

      {activeTab === 'screening' ? (
        <>
          <View style={[styles.resultCard, styles[`${osasRisk.tone}Result`]]}>
            <Text style={styles.resultKicker}>Ön triyaj</Text>
            <Text style={styles.resultTitle}>{osasRisk.title}</Text>
            <Text style={styles.resultText}>{osasRisk.action}</Text>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Semptomlar</Text>
            {osasSignals.map((signal) => (
              <Toggle
                key={signal.key}
                label={signal.label}
                note={signal.note}
                selected={signals.includes(signal.key)}
                onPress={() => toggleSignal(signal.key)}
              />
            ))}
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Risk faktörleri</Text>
            {osasRisks.map((risk) => (
              <Toggle
                key={risk.key}
                label={risk.label}
                note={risk.note}
                selected={risks.includes(risk.key)}
                onPress={() => toggleRisk(risk.key)}
              />
            ))}
          </View>
        </>
      ) : null}

      {activeTab === 'psg' ? (
        <>
          <ChecklistCard title="PSG / objektif uyku testi endikasyonları" items={sleepStudyIndications} />
          <WarningBox
            tone="amber"
            title="Test seçimi"
            text="Altın standart PSG’dir. Poligrafi veya gece oksimetresi erişim kısıtlılığında yardımcı olabilir; negatif ya da uyumsuz sonuç klinik şüpheyi tamamen ortadan kaldırmayabilir."
          />
          <FlowCard
            title="Pratik akış"
            items={[
              'Horlama ve OSAS semptomlarını sistematik sor.',
              'Adenotonsil, burun, yüz-çene yapısı ve komorbiditeleri değerlendir.',
              'Yüksek risk veya klinik belirsizlik varsa PSG/uyku testi planla.',
              'Test sonucunu semptom, desatürasyon, CO2 ve komorbidite ile birlikte yorumla.',
            ]}
          />
        </>
      ) : null}

      {activeTab === 'treatment' ? (
        <>
          {treatmentPathways.map((pathway) => (
            <ChecklistCard key={pathway.title} title={pathway.title} items={pathway.items} />
          ))}
        </>
      ) : null}

      {activeTab === 'persistent' ? (
        <>
          <View style={[styles.resultCard, styles[`${persistentRisk.tone}Result`]]}>
            <Text style={styles.resultKicker}>Persistan OSAS</Text>
            <Text style={styles.resultTitle}>{persistentRisk.title}</Text>
            <Text style={styles.resultText}>{persistentRisk.action}</Text>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Persistan OSAS sinyalleri</Text>
            {persistentOsasSignals.map((signal) => (
              <Toggle
                key={signal.key}
                label={signal.label}
                note={signal.note}
                selected={persistentSignals.includes(signal.key)}
                onPress={() => togglePersistent(signal.key)}
              />
            ))}
          </View>
          <WarningBox
            title="ATS 2024 odak"
            text="Adenotonsillektomi sonrası persistan OSAS’ta CPAP, kilo yönetimi, ortodontik/dentofasiyal tedavi, lingual tonsil, supraglottoplasti ve seçilmiş medikal tedaviler multidisipliner değerlendirilir."
          />
        </>
      ) : null}

      {activeTab === 'interpretation' ? (
        <>
          <ChecklistCard title="Uyku testi yorum notları" items={interpretationNotes} />
          <WarningBox
            title="Hipoventilasyon ayrımı"
            text="Obezite, nöromüsküler hastalık, göğüs duvarı hastalığı veya kompleks akciğer hastalığında OSAS dışında uyku hipoventilasyonu da değerlendirilmelidir; CO2 takibi önemlidir."
          />
        </>
      ) : null}

      {activeTab === 'source' ? (
        <>
          <WarningBox title="Klinik sınır" text={osasSource.warning} />
          <ChecklistCard
            title="Kaynak notu"
            items={[
              'AAP pediatrik OSAS yaklaşımı; horlayan çocukta sistematik tarama, adenotonsiller hipertrofi ve PSG/tedavi kararını vurgular.',
              'ERS statement 1–23 aylık çocukta OSDB’nin multifaktöriyel olduğunu ve objektif değerlendirmeyi önerir.',
              'ATS 2024 rehberi adenotonsillektomi sonrası persistan OSAS yönetimine odaklanır.',
              'Bu ekran uyku testi raporu veya uzman uyku yorumu yerine geçmez.',
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
  scrollContent: { gap: 14, paddingBottom: 32 },
  intro: { gap: 8 },
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
  description: { color: '#686868', fontSize: 15, lineHeight: 22 },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e1e1e4',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  chipSelected: { backgroundColor: '#8f1d2c', borderColor: '#8f1d2c' },
  chipText: { color: '#211f1f', fontSize: 14, fontWeight: '800' },
  chipTextSelected: { color: '#ffffff' },
  panel: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e8e8eb',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  panelTitle: { color: '#211f1f', fontSize: 18, fontWeight: '900', lineHeight: 23 },
  resultCard: { borderRadius: 8, borderWidth: 1, gap: 6, padding: 14 },
  redResult: { backgroundColor: '#f9e9ec', borderColor: '#efcbd2' },
  amberResult: { backgroundColor: '#fff7e6', borderColor: '#f0c36a' },
  grayResult: { backgroundColor: '#f5f5f6', borderColor: '#e1e1e4' },
  resultKicker: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  resultTitle: { color: '#211f1f', fontSize: 19, fontWeight: '900' },
  resultText: { color: '#343131', fontSize: 15, lineHeight: 22 },
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
  toggleSelected: { backgroundColor: '#fff8f9', borderColor: '#8f1d2c' },
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
  flowNumber: {
    alignItems: 'center',
    backgroundColor: '#8f1d2c',
    borderRadius: 999,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  flowNumberText: { color: '#ffffff', fontSize: 13, fontWeight: '900' },
  flowText: { color: '#343131', flex: 1, fontSize: 14, lineHeight: 20 },
  footer: {
    color: '#8a8a8a',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    textAlign: 'center',
  },
});
