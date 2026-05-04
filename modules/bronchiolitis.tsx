import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  bronchiolitisAvoidRoutine,
  bronchiolitisDischargeCriteria,
  bronchiolitisRedFlags,
  bronchiolitisRiskFactors,
  bronchiolitisSource,
  bronchiolitisSupportiveCare,
  classifyBronchiolitis,
} from '../data/bronchiolitis/bronchiolitisGuide';

type TabKey = 'algorithm' | 'severity' | 'treatment' | 'avoid' | 'discharge' | 'source';
type Distress = 'none' | 'mild' | 'moderate' | 'severe';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'algorithm', label: 'Algoritma' },
  { key: 'severity', label: 'Ağırlık / Yatış' },
  { key: 'treatment', label: 'Tedavi' },
  { key: 'avoid', label: 'Yapılmaması Gerekenler' },
  { key: 'discharge', label: 'Taburculuk' },
  { key: 'source', label: 'Kaynak' },
];

const distressOptions: { label: string; value: Distress }[] = [
  { label: 'Yok', value: 'none' },
  { label: 'Hafif', value: 'mild' },
  { label: 'Orta', value: 'moderate' },
  { label: 'Ağır', value: 'severe' },
];

export function BronchiolitisScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('algorithm');
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
  const [selectedRedFlags, setSelectedRedFlags] = useState<string[]>([]);
  const [feedingPoor, setFeedingPoor] = useState(false);
  const [oxygenLow, setOxygenLow] = useState(false);
  const [distress, setDistress] = useState<Distress>('mild');

  const assessment = useMemo(
    () =>
      classifyBronchiolitis({
        riskCount: selectedRisks.length,
        redFlagCount: selectedRedFlags.length,
        feedingPoor,
        oxygenLow,
        respiratoryDistress: distress,
      }),
    [distress, feedingPoor, oxygenLow, selectedRedFlags.length, selectedRisks.length],
  );

  function toggle(list: string[], setter: (items: string[]) => void, item: string) {
    setter(list.includes(item) ? list.filter((value) => value !== item) : [...list, item]);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Bronşiolit</Text>
        <Text style={styles.title}>Bronşiolit Hızlı Yaklaşım</Text>
        <Text style={styles.description}>
          Akut bronşiolitte risk sınıflama, destek tedavisi ve gereksiz tedavilerden
          kaçınma için kısa klinik algoritma.
        </Text>
      </View>

      <SourceVersionBadge text={bronchiolitisSource.badge} />

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

      {activeTab === 'algorithm' ? (
        <>
          <View style={styles.resultCard}>
            <Text style={styles.resultKicker}>Ön değerlendirme sonucu</Text>
            <Text style={styles.resultTitle}>{assessment.title}</Text>
            <Text style={styles.resultText}>{assessment.action}</Text>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Solunum sıkıntısı</Text>
            <View style={styles.chipWrap}>
              {distressOptions.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  selected={distress === option.value}
                  onPress={() => setDistress(option.value)}
                />
              ))}
            </View>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Hızlı uyarı soruları</Text>
            <Toggle
              label="Beslenememe / dehidratasyon riski"
              selected={feedingPoor}
              onPress={() => setFeedingPoor((value) => !value)}
            />
            <Toggle
              label="Hipoksemi / oksijen ihtiyacı"
              selected={oxygenLow}
              onPress={() => setOxygenLow((value) => !value)}
            />
          </View>

          <Checklist
            title="Risk faktörleri"
            items={bronchiolitisRiskFactors}
            selected={selectedRisks}
            onToggle={(item) => toggle(selectedRisks, setSelectedRisks, item)}
          />
          <Checklist
            title="Ağır bronşiolit kırmızı bayrakları"
            items={bronchiolitisRedFlags}
            selected={selectedRedFlags}
            onToggle={(item) => toggle(selectedRedFlags, setSelectedRedFlags, item)}
          />
        </>
      ) : null}

      {activeTab === 'severity' ? (
        <>
          <InfoCard
            title="Yatış / gözlem düşündüren durumlar"
            items={[
              '3 aydan küçük bebek veya ciddi altta yatan hastalık',
              'Apne, siyanoz, toksik görünüm veya ağır solunum sıkıntısı',
              'Hipoksemi veya oksijen gereksinimi',
              'Beslenememe, dehidratasyon veya oral alımın belirgin azalması',
              'Evde güvenli izlem/ulaşım/sosyal destek yetersizliği',
            ]}
          />
          <WarningBox
            title="Acil/yoğun bakım değerlendirmesi"
            text="Apne, siyanoz, letarji, ağır çekilme, inleme, persistan hipoksemi veya hızla kötüleşme varsa kurum protokolüne göre acil tedavi ve yoğun bakım değerlendirmesi yapılmalıdır."
          />
        </>
      ) : null}

      {activeTab === 'treatment' ? (
        <InfoCard title="Destek tedavisi" items={bronchiolitisSupportiveCare} />
      ) : null}

      {activeTab === 'avoid' ? (
        <>
          <InfoCard title="Rutin önerilmeyenler" items={bronchiolitisAvoidRoutine} />
          <WarningBox
            tone="amber"
            title="Nüans"
            text="Bronkodilatör, antibiyotik veya ek tedavi kararı rutin değildir; seçilmiş olguda ayırıcı tanı, eşlik eden hastalık, yerel protokol ve klinisyen değerlendirmesiyle düşünülmelidir."
          />
        </>
      ) : null}

      {activeTab === 'discharge' ? (
        <>
          <InfoCard title="Taburculuk / ev izlemi kriterleri" items={bronchiolitisDischargeCriteria} />
          <InfoCard
            title="Aileye anlatılacak uyarı bulguları"
            items={[
              'Solunum sıkıntısında artış, morarma, apne veya belirgin halsizlik',
              'Beslenememe, kusma, idrar azalması veya dehidratasyon bulguları',
              'Ateşin uzaması, kötüleşme veya beklenmeyen yeni bulgu',
              'Hastalığın 3–5. günlerde ağırlaşabileceği ve öksürüğün haftalarca sürebileceği',
            ]}
          />
        </>
      ) : null}

      {activeTab === 'source' ? (
        <>
          <InfoCard
            title={bronchiolitisSource.title}
            items={[
              bronchiolitisSource.summary,
              'Bu modül TTD 2024 rehberindeki ana yaklaşımı eğitim amaçlı kısa algoritma haline getirir.',
              'Tanı ve tedavi kararı; yaş, klinik ağırlık, risk faktörleri, ayırıcı tanı, yerel protokol ve güncel rehberle birlikte verilmelidir.',
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
      style={[styles.chip, selected ? styles.chipSelected : undefined]}
    >
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

function Toggle({
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
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[styles.toggle, selected ? styles.toggleSelected : undefined]}
    >
      <Text style={[styles.toggleText, selected ? styles.toggleTextSelected : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

function Checklist({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: string[];
  selected: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      {items.map((item) => (
        <Toggle
          key={item}
          label={item}
          selected={selected.includes(item)}
          onPress={() => onToggle(item)}
        />
      ))}
    </View>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      {items.map((item) => (
        <Text key={item} style={styles.bullet}>• {item}</Text>
      ))}
    </View>
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
  chipWrap: {
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
    gap: 10,
    padding: 14,
  },
  panelTitle: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  resultCard: {
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    gap: 7,
    padding: 15,
  },
  resultKicker: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
  },
  resultTitle: {
    color: '#211f1f',
    fontSize: 20,
    fontWeight: '900',
  },
  resultText: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  toggle: {
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 40,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  toggleSelected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  toggleText: {
    color: '#211f1f',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
  },
  toggleTextSelected: {
    color: '#fff',
  },
  bullet: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
});
