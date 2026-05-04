import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  advancedWorkupItems,
  ageBandNotes,
  baselineWorkupItems,
  childSource,
  childSuspicionSignals,
  classifyChildSuspicion,
  exclusionChecklist,
  patternOptions,
  type ChildAgeBand,
  type ChildPatternKey,
  type ChildSignalKey,
} from '../data/child/childGuide';

type TabKey = 'tree' | 'exclusions' | 'patterns' | 'workup' | 'followup' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'tree', label: 'Karar Ağacı' },
  { key: 'exclusions', label: 'Dışla' },
  { key: 'patterns', label: 'Patern' },
  { key: 'workup', label: 'İleri İşup' },
  { key: 'followup', label: 'İzlem' },
  { key: 'source', label: 'Kaynak' },
];

const ageBands: { key: ChildAgeBand; label: string }[] = [
  { key: 'infant', label: '0–2 yaş' },
  { key: 'preschool', label: '3–5 yaş' },
  { key: 'school', label: '6–11 yaş' },
  { key: 'adolescent', label: '12+ yaş' },
];

export function ChildInterstitialLungDiseaseScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('tree');
  const [ageBand, setAgeBand] = useState<ChildAgeBand>('school');
  const [selectedSignals, setSelectedSignals] = useState<ChildSignalKey[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<ChildPatternKey>('undefined');

  const suspicion = useMemo(
    () => classifyChildSuspicion(selectedSignals),
    [selectedSignals],
  );

  const pattern = patternOptions.find((item) => item.key === selectedPattern) ?? patternOptions[0];

  function toggleSignal(key: ChildSignalKey) {
    setSelectedSignals((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>ChILD</Text>
        <Text style={styles.title}>Çocukluk Çağı İnterstisyel Akciğer Hastalıkları</Text>
        <Text style={styles.description}>
          Diffüz parankimal akciğer hastalığı şüphesinde alarm bulguları, temel
          dışlamalar, patern yönlendirme ve uzman merkez işup karar ağacı.
        </Text>
      </View>

      <SourceVersionBadge text={childSource.badge} />

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

      {activeTab === 'tree' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Yaş grubu</Text>
            <View style={styles.chipWrap}>
              {ageBands.map((item) => (
                <Chip
                  key={item.key}
                  label={item.label}
                  selected={ageBand === item.key}
                  onPress={() => setAgeBand(item.key)}
                />
              ))}
            </View>
            <BulletList items={ageBandNotes[ageBand]} />
          </View>

          <View style={[styles.resultCard, styles[`${suspicion.tone}Result`]]}>
            <Text style={styles.resultKicker}>Ön triyaj</Text>
            <Text style={styles.resultTitle}>{suspicion.status}</Text>
            <Text style={styles.resultText}>{suspicion.action}</Text>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>chILD şüphesini artıran bulgular</Text>
            {childSuspicionSignals.map((signal) => (
              <Toggle
                key={signal.key}
                label={signal.label}
                note={signal.note}
                selected={selectedSignals.includes(signal.key)}
                onPress={() => toggleSignal(signal.key)}
              />
            ))}
          </View>

          <FlowCard
            title="Pratik karar akışı"
            items={[
              'En az 3 çekirdek kriter veya ağır seyir varsa chILD gibi düşün.',
              'Önce sık ve tedavi edilebilir nedenleri sistematik dışla.',
              'HRCT görüntüsünü deneyimli pediatrik toraks radyoloğu ile yorumla.',
              'Fenotip paternine göre genetik, immünoloji/enfeksiyon, BAL veya biyopsi yolunu seç.',
              'Tanı belirsiz kalırsa “tanımlanamayan chILD” olarak bırakma; belirli aralıklarla yeniden değerlendir.',
            ]}
          />
        </>
      ) : null}

      {activeTab === 'exclusions' ? (
        <>
          <WarningBox
            tone="amber"
            title="Önce dışlanacaklar"
            text="chILD tanısı koymadan önce kistik fibrozis, PCD, aspirasyon, immün yetmezlik, enfeksiyon ve kardiyak/vasküler nedenler aktif olarak değerlendirilmelidir."
          />
          <ChecklistCard title="Temel dışlama listesi" items={exclusionChecklist} />
        </>
      ) : null}

      {activeTab === 'patterns' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Klinik patern seç</Text>
            <View style={styles.chipWrap}>
              {patternOptions.map((item) => (
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
            <Text style={styles.subTitle}>İpuçları</Text>
            <BulletList items={pattern.clues} />
            <View style={styles.nextStepBox}>
              <Text style={styles.nextStepTitle}>Sonraki adım</Text>
              <Text style={styles.nextStepText}>{pattern.nextStep}</Text>
            </View>
          </View>
        </>
      ) : null}

      {activeTab === 'workup' ? (
        <>
          <ChecklistCard title="Temel işup" items={baselineWorkupItems} />
          <ChecklistCard title="Uzman merkez / ileri işup" items={advancedWorkupItems} />
        </>
      ) : null}

      {activeTab === 'followup' ? (
        <>
          <FlowCard
            title="İzlemde pratik kontrol"
            items={[
              'Tanı, ağırlık ve ilerleme hızına göre izlem sıklığını bireyselleştir.',
              'SpO2, büyüme, beslenme, egzersiz toleransı, alevlenme ve enfeksiyon yükünü takip et.',
              'Uygun yaşta SFT, DLCO, 6 dakika yürüme ve gerekirse uyku/efor oksijenasyonunu izle.',
              'HRCT tekrarı rutin değil; klinik kötüleşme veya tedavi yanıtı sorusu varsa gerekçelendir.',
              'Steroid, hidroksiklorokin, azitromisin veya immünsüpresif tedavileri otomatik önerme; tanı ve merkez kararına bağla.',
              'Aileye alarm bulguları, oksijen planı, enfeksiyon önleme ve aşılama konusunda yapılandırılmış eğitim ver.',
            ]}
          />
          <WarningBox
            title="Acil / hızlı yönlendirme"
            text="Persistan hipoksemi, hızlı ilerleme, pulmoner hipertansiyon, hemoptizi/alveoler hemoraji, ağır büyüme geriliği, immün yetmezlik veya neonatal başlangıç varsa referans merkez değerlendirmesi geciktirilmemelidir."
          />
        </>
      ) : null}

      {activeTab === 'source' ? (
        <>
          <WarningBox title="Klinik sınır" text={childSource.warning} />
          <ChecklistCard
            title="Kaynak ve yaklaşım notu"
            items={[
              'ERS CRC chILD-EU tanısal iş akışı; öykü, klinik bulgular, görüntüleme, genetik ve seçilmiş invaziv işlemlerle basamaklı etiyolojik tanıyı vurgular.',
              'ATS infant chILD rehberi; özellikle süt çocuklarında sınıflama, değerlendirme ve uzman merkez yaklaşımını destekler.',
              'Bu ekranda ERS/ATS tabloları birebir kopyalanmamış, klinik karar ağacı olarak özetlenmiştir.',
              'Tedavi seçenekleri tanıya özgüdür; bu modül ilaç veya immünsüpresyon kararı vermez.',
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
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

function Toggle({
  label,
  note,
  selected,
  onPress,
}: {
  label: string;
  note?: string;
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
        {note ? <Text style={styles.toggleNote}>{note}</Text> : null}
      </View>
    </Pressable>
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
  subTitle: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
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
