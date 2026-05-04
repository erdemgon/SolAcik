import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  bronchiectasisSource,
  bronchiectasisSuspicionSignals,
  causePathways,
  classifyBronchiectasisSuspicion,
  classifyExacerbation,
  diagnosisCriteria,
  exacerbationSignals,
  managementCards,
  minimumEtiologyPanel,
  monitoringItems,
  type BronchiectasisSignalKey,
  type CausePathwayKey,
  type ExacerbationSignalKey,
} from '../data/bronchiectasis/nonCfBronchiectasisGuide';

type TabKey = 'diagnosis' | 'causes' | 'exacerbation' | 'management' | 'monitoring' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'diagnosis', label: 'Tanı Ağacı' },
  { key: 'causes', label: 'Neden Ara' },
  { key: 'exacerbation', label: 'Alevlenme' },
  { key: 'management', label: 'Yönetim' },
  { key: 'monitoring', label: 'İzlem' },
  { key: 'source', label: 'Kaynak' },
];

export function NonCfBronchiectasisScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('diagnosis');
  const [selectedSignals, setSelectedSignals] = useState<BronchiectasisSignalKey[]>([]);
  const [selectedExacerbation, setSelectedExacerbation] = useState<ExacerbationSignalKey[]>([]);
  const [selectedCause, setSelectedCause] = useState<CausePathwayKey>('cf');

  const suspicion = useMemo(
    () => classifyBronchiectasisSuspicion(selectedSignals),
    [selectedSignals],
  );
  const exacerbation = useMemo(
    () => classifyExacerbation(selectedExacerbation),
    [selectedExacerbation],
  );
  const cause = causePathways.find((item) => item.key === selectedCause) ?? causePathways[0];

  function toggleSignal(key: BronchiectasisSignalKey) {
    setSelectedSignals((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  function toggleExacerbation(key: ExacerbationSignalKey) {
    setSelectedExacerbation((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Non-CF Bronşektazi</Text>
        <Text style={styles.title}>Çocuklarda Bronşektazi Karar Ağacı</Text>
        <Text style={styles.description}>
          Kronik ıslak öksürük, BT doğrulama, tedavi edilebilir nedenler,
          alevlenme ve uzun dönem izlem için pratik pediatrik algoritma.
        </Text>
      </View>

      <SourceVersionBadge text={bronchiectasisSource.badge} />

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

      {activeTab === 'diagnosis' ? (
        <>
          <View style={[styles.resultCard, styles[`${suspicion.tone}Result`]]}>
            <Text style={styles.resultKicker}>Ön değerlendirme</Text>
            <Text style={styles.resultTitle}>{suspicion.title}</Text>
            <Text style={styles.resultText}>{suspicion.action}</Text>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Şüphe kriterleri</Text>
            {bronchiectasisSuspicionSignals.map((signal) => (
              <Toggle
                key={signal.key}
                label={signal.label}
                note={signal.note}
                selected={selectedSignals.includes(signal.key)}
                onPress={() => toggleSignal(signal.key)}
              />
            ))}
          </View>

          <ChecklistCard title="Tanı kriterleri ve BT notu" items={diagnosisCriteria} />
        </>
      ) : null}

      {activeTab === 'causes' ? (
        <>
          <WarningBox
            tone="amber"
            title="Non-CF demeden önce"
            text="CF dışlanmadan, immün yetmezlik ve diğer tedavi edilebilir nedenler taranmadan çocuk bronşektazisi idiyopatik/non-CF diye bırakılmamalıdır."
          />
          <ChecklistCard title="Minimum etiyoloji paneli" items={minimumEtiologyPanel} />

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Neden arama yolu</Text>
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

      {activeTab === 'exacerbation' ? (
        <>
          <View style={[styles.resultCard, styles[`${exacerbation.tone}Result`]]}>
            <Text style={styles.resultKicker}>Alevlenme triyajı</Text>
            <Text style={styles.resultTitle}>{exacerbation.title}</Text>
            <Text style={styles.resultText}>{exacerbation.action}</Text>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Alevlenme bulguları</Text>
            {exacerbationSignals.map((signal) => (
              <Toggle
                key={signal.key}
                label={signal.label}
                note={signal.note}
                selected={selectedExacerbation.includes(signal.key)}
                onPress={() => toggleExacerbation(signal.key)}
              />
            ))}
          </View>
          <WarningBox
            tone="amber"
            title="Antibiyotik notu"
            text="Alevlenmede antibiyotik seçimi önceki kültürler, duyarlılık, lokal direnç, klinik ağırlık ve kurum protokolüne göre doğrulanmalıdır. Bu ekran doz/reçete üretmez."
          />
        </>
      ) : null}

      {activeTab === 'management' ? (
        <>
          {managementCards.map((card) => (
            <ChecklistCard key={card.title} title={card.title} items={card.items} />
          ))}
        </>
      ) : null}

      {activeTab === 'monitoring' ? (
        <>
          <ChecklistCard title="Rutin izlem checklist’i" items={monitoringItems} />
          <WarningBox
            title="Kötüleşme"
            text="Alevlenme sıklığı artıyor, FEV1 düşüyor, Pseudomonas tekrarlıyor, büyüme etkileniyor veya hemoptizi/hipoksemi gelişiyorsa ileri merkez değerlendirmesi gerekir."
          />
        </>
      ) : null}

      {activeTab === 'source' ? (
        <>
          <WarningBox title="Klinik sınır" text={bronchiectasisSource.warning} />
          <ChecklistCard
            title="Kaynak notu"
            items={[
              'ERS 2021 kılavuzu çocuk/adolesan bronşektazisini CF dışı pediatrik klinik bağlamda ele alan ana uluslararası kaynaktır.',
              'Kılavuz tanı, altta yatan nedenlerin araştırılması, alevlenme yönetimi, hava yolu temizleme, Pseudomonas ve sistematik izlem başlıklarını kapsar.',
              'Bu modül kılavuz tablolarını birebir kopyalamaz; klinik karar ağacı ve checklist formatında özetler.',
              'Non-CF bronşektazide CF tedavileri otomatik uygulanmamalı; tedavi her zaman etiyoloji ve kültürlerle bireyselleştirilmelidir.',
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
  nextStepBox: {
    backgroundColor: '#ffffff',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
    padding: 12,
  },
  nextStepTitle: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  nextStepText: {
    color: '#211f1f',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 21,
  },
  footer: {
    color: '#8a8a8a',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    textAlign: 'center',
  },
});
